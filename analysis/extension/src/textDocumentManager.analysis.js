var postInsertCmdName = '_ghostTextPostInsert';

class Provider {
  // 构造函数，接收一个上下文对象
  constructor(ctx) {
    this.ctx = ctx;
  }

  // 提供内联补全项的异步方法
  async provideInlineCompletionItems(doc, position, context, token) {
    // 如果触发类型是自动的，并且自动补全被启用
    if (!(context.triggerKind === vscode.InlineCompletionTriggerKind.Automatic && !isAutoCompletionsEnabled(this.ctx))) {
      try {
        // 尝试提供内联补全
        let items = await provideInlineCompletions(this.ctx, doc, position, context, token);
        // 如果有补全项，返回它们，否则返回undefined
        return items ? {
          items: items
        } : void 0;
      } catch (e) {
        // 如果出现异常，记录异常信息
        exception(this.ctx, e, ".provideInlineCompletionItems", ghostTextLogger);
      }
    }
  }

  // 处理显示补全项的方法
  handleDidShowCompletionItem(item) {
    try {
      // 获取命令参数
      let cmp = item.command.arguments[0];
      // 处理显示的补全项
      handleGhostTextShown(this.ctx, cmp);
    } catch (e) {
      // 如果出现异常，记录异常信息
      exception(this.ctx, e, ".handleGhostTextShown", ghostTextLogger);
    }
  }

  // 处理部分接受补全项的方法
  handleDidPartiallyAcceptCompletionItem(item, acceptedLengthOrInfo) {
    // 如果接受的长度或信息是数字
    if (typeof acceptedLengthOrInfo == "number") {
      try {
        // 获取命令参数
        let cmp = item.command.arguments[0];
        // 处理部分接受的补全项
        handlePartialGhostTextPostInsert(this.ctx, cmp, acceptedLengthOrInfo);
      } catch (e) {
        // 如果出现异常，记录异常信息
        exception(this.ctx, e, ".handleDidPartiallyAcceptCompletionItem", ghostTextLogger);
      }
    }
  }
};

function registerGhostText(extensionCtx) {
  // 创建一个新的Provider实例
  let provider = new Provider(extensionCtx);

  // 注册内联完成项提供者
  let providerHandler = vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, provider);

  // 注册_ghostTextPostInsert命令
  let postCmdHandler = vscode.commands.registerCommand(postInsertCmdName, async (args) => handleGhostTextPostInsert(extensionCtx, args));

  // 在扩展上下文中注册提供者和命令
  extensionCtx.get(Extension).register(providerHandler, postCmdHandler);
}

/**
 * 此函数为给定文档的特定位置提供内联补全。
 *
 * @param {Object} ctx - 上下文对象，通常包含有关程序状态的信息。
 * @param {Object} document - 需要提供内联补全的文档。
 * @param {Object} position - 需要提供内联补全的文档中的位置。
 * @param {Object} context - 提供内联补全的上下文。
 * @param {Object} token - 可用于表示取消异步操作的令牌。
 * @returns {Promise} - 解析为内联补全结果的 Promise。
 */
async function provideInlineCompletions(ctx, document, position, context, token) {
  // 计算给定文档在指定位置的内联补全。
  let result = await calculateInlineCompletions(ctx, document, position, context, token);
  
  // 处理内联补全结果的遥测。
  return handleGhostTextResultTelemetry(ctx, result);
}

/**
 * 计算内联补全项
 * @param {Object} ctx - 上下文对象
 * @param {vscode.TextDocument} vscodeDocument - 当前VS Code文档对象
 * @param {vscode.Position} position - 光标位置
 * @param {vscode.InlineCompletionContext} context - 内联补全上下文
 * @param {vscode.CancellationToken} token - 取消令牌
 * @returns {Promise<Object>} 返回内联补全项的结果
 */
async function calculateInlineCompletions(ctx, vscodeDocument, position, context, token) {
  // 获取文本编辑器选项和遥测数据
  let textEditorOptions = getTextEditorOptions(vscodeDocument),
    telemetryData = TelemetryData.createAndMarkAsIssued();

  // 如果禁用了ghost text，就中止操作
  if (!ghostTextEnabled(ctx)) return {
    type: "abortedBeforeIssued",
    reason: "ghost text is disabled"
  };

  // 如果忽略了文档，就中止操作
  if (ignoreDocument(ctx, vscodeDocument)) return {
    type: "abortedBeforeIssued",
    reason: "document is ignored"
  };

  // 如果文档过大，就中止操作
  if (isDocumentTooLarge(vscodeDocument)) return {
    type: "abortedBeforeIssued",
    reason: "document is too large"
  };

  // 封装文档
  let document = wrapDoc(ctx, vscodeDocument);

  // 如果在提取提示前取消了操作，就中止操作
  if (ghostTextLogger.debug(ctx, `Ghost text called at [${position.line}, ${position.character}], with triggerKind ${context.triggerKind}`), token.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled before extractPrompt"), {
    type: "abortedBeforeIssued",
    reason: "cancelled before extractPrompt"
  };

  // 获取ghost text
  let result = await getGhostText(ctx, document, position, context.triggerKind === vscode.InlineCompletionTriggerKind.Invoke, telemetryData, token);

  // 如果获取ghost text失败，就中止操作
  if (result.type !== "success") return ghostTextLogger.debug(ctx, "Breaking, no results from getGhostText -- " + result.type + ": " + result.reason), result;

  // 设置最后显示的结果
  let [resultArray, resultType] = result.value,
    index = setLastShown(ctx, document, position, resultType);

  // 如果在获取ghost text后取消了操作，就中止操作
  if (token.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled after getGhostText"), {
    type: "canceled",
    reason: "after getGhostText",
    telemetryData: {
      telemetryBlob: result.telemetryBlob
    }
  };

  // 从ghost text结果中获取内联完成项
  let inlineCompletions = completionsFromGhostTextResults(ctx, resultArray, resultType, document, position, textEditorOptions, index).map(completion => {
    let {
        insertText: insertText,
        range: range
      } = completion,
      newRange = new vscode.Range(new vscode.Position(range.start.line, range.start.character), new vscode.Position(range.end.line, range.end.character));
    return new vscode.InlineCompletionItem(insertText, newRange, {
      title: "PostInsertTask",
      command: postInsertCmdName,
      arguments: [completion]
    });
  });

  // 如果最终结果中没有完成项，就返回空结果
  return inlineCompletions.length === 0 ? {
    type: "empty",
    reason: "no completions in final result",
    telemetryData: result.telemetryData
  } : {
    ...result,
    value: inlineCompletions
  };
}

// 包装文档对象
function wrapDoc(ctx, doc) {
  // 从上下文中获取语言检测服务，并使用它来检测文档的语言
  let language = ctx.get(LanguageDetection).detectLanguage(TextDocument.create(doc.uri, doc.languageId, doc.version, doc.getText()));
  
  // 使用检测到的语言创建一个新的文档对象，并返回
  return TextDocument.create(doc.uri, language.languageId, doc.version, doc.getText());
}