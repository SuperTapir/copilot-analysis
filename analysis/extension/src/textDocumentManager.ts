var import_vscode = require("vscode");,function wrapDoc(ctx, doc) {
  let language = ctx.get(LanguageDetection).detectLanguage(TextDocument.create(doc.uri, doc.languageId, doc.version, doc.getText()));
  return TextDocument.create(doc.uri, language.languageId, doc.version, doc.getText());
},__name(wrapDoc, "wrapDoc");,var _ExtensionTextDocumentManager = class _ExtensionTextDocumentManager extends TextDocumentManager {
  constructor(ctx) {
    super(ctx);
    this.onDidFocusTextDocument = C0.window.onDidChangeActiveTextEditor;
    this.onDidChangeTextDocument = __name((listener, thisArgs, disposables) => C0.workspace.onDidChangeTextDocument(e => listener({
      document: wrapDoc(this.ctx, e.document),
      contentChanges: e.contentChanges
    }), thisArgs, disposables), "onDidChangeTextDocument");
    this.onDidChangeCursor = __name((listener, thisArgs, disposables) => C0.window.onDidChangeTextEditorSelection(e => listener({
      textEditor: {
        document: wrapDoc(this.ctx, e.textEditor.document)
      },
      selections: e.selections
    }), thisArgs, disposables), "onDidChangeCursor");
  }
  async getOpenTextDocuments() {
    return C0.workspace.textDocuments.map(d => wrapDoc(this.ctx, d));
  }
  async openTextDocument(uri) {
    let doc = await C0.workspace.openTextDocument(uri);
    return wrapDoc(this.ctx, doc);
  }
  findNotebook(doc) {
    for (let notebook of C0.workspace.notebookDocuments) if (notebook.getCells().some(cell => cell.document.uri.toString() === doc.uri.toString())) return {
      getCells: () => notebook.getCells().map(cell => ({
        ...cell,
        document: TextDocument.create(cell.document.uri, cell.document.languageId, cell.document.version, cell.document.getText())
      }))
    };
  }
  getWorkspaceFolders() {
    var _a, _b;
    return (_b = (_a = C0.workspace.workspaceFolders) == null ? void 0 : _a.map(f => f.uri)) != null ? _b : [];
  }
};,__name(_ExtensionTextDocumentManager, "ExtensionTextDocumentManager");,var ExtensionTextDocumentManager = _ExtensionTextDocumentManager;,var postInsertCmdName = "_ghostTextPostInsert",
  ghostTextLogger = new Logger(1, "ghostText");,function ghostTextEnabled(ctx) {
  return getConfig(ctx, ConfigKey.InlineSuggestEnable);
},__name(ghostTextEnabled, "ghostTextEnabled");,function getTextEditorOptions(document) {
  let editor = Zl.window.visibleTextEditors.find(editor => editor.document.uri === document.uri);
  return editor == null ? void 0 : editor.options;
},__name(getTextEditorOptions, "getTextEditorOptions");,async function calculateInlineCompletions(ctx, vscodeDocument, position, context, token) {
  let textEditorOptions = getTextEditorOptions(vscodeDocument),
    telemetryData = TelemetryData.createAndMarkAsIssued();
  if (!ghostTextEnabled(ctx)) return {
    type: "abortedBeforeIssued",
    reason: "ghost text is disabled"
  };
  if (ignoreDocument(ctx, vscodeDocument)) return {
    type: "abortedBeforeIssued",
    reason: "document is ignored"
  };
  if (isDocumentTooLarge(vscodeDocument)) return {
    type: "abortedBeforeIssued",
    reason: "document is too large"
  };
  let document = wrapDoc(ctx, vscodeDocument);
  if (ghostTextLogger.debug(ctx, `Ghost text called at [${position.line}, ${position.character}], with triggerKind ${context.triggerKind}`), token.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled before extractPrompt"), {
    type: "abortedBeforeIssued",
    reason: "cancelled before extractPrompt"
  };
  let result = await getGhostText(ctx, document, position, context.triggerKind === Zl.InlineCompletionTriggerKind.Invoke, telemetryData, token);
  if (result.type !== "success") return ghostTextLogger.debug(ctx, "Breaking, no results from getGhostText -- " + result.type + ": " + result.reason), result;
  let [resultArray, resultType] = result.value,
    index = setLastShown(ctx, document, position, resultType);
  if (token.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled after getGhostText"), {
    type: "canceled",
    reason: "after getGhostText",
    telemetryData: {
      telemetryBlob: result.telemetryBlob
    }
  };
  let inlineCompletions = completionsFromGhostTextResults(ctx, resultArray, resultType, document, position, textEditorOptions, index).map(completion => {
    let {
        insertText: insertText,
        range: range
      } = completion,
      newRange = new Zl.Range(new Zl.Position(range.start.line, range.start.character), new Zl.Position(range.end.line, range.end.character));
    return new Zl.InlineCompletionItem(insertText, newRange, {
      title: "PostInsertTask",
      command: postInsertCmdName,
      arguments: [completion]
    });
  });
  return inlineCompletions.length === 0 ? {
    type: "empty",
    reason: "no completions in final result",
    telemetryData: result.telemetryData
  } : {
    ...result,
    value: inlineCompletions
  };
},__name(calculateInlineCompletions, "calculateInlineCompletions");,async function provideInlineCompletions(ctx, document, position, context, token) {
  let result = await calculateInlineCompletions(ctx, document, position, context, token);
  return handleGhostTextResultTelemetry(ctx, result);
},__name(provideInlineCompletions, "provideInlineCompletions");,var _Provider = class _Provider {
  constructor(ctx) {
    this.ctx = ctx;
  }
  async provideInlineCompletionItems(doc, position, context, token) {
    if (!(context.triggerKind === Zl.InlineCompletionTriggerKind.Automatic && !isAutoCompletionsEnabled(this.ctx))) try {
      let items = await provideInlineCompletions(this.ctx, doc, position, context, token);
      return items ? {
        items: items
      } : void 0;
    } catch (e) {
      exception(this.ctx, e, ".provideInlineCompletionItems", ghostTextLogger);
    }
  }
  handleDidShowCompletionItem(item) {
    try {
      let cmp = item.command.arguments[0];
      handleGhostTextShown(this.ctx, cmp);
    } catch (e) {
      exception(this.ctx, e, ".handleGhostTextShown", ghostTextLogger);
    }
  }
  handleDidPartiallyAcceptCompletionItem(item, acceptedLengthOrInfo) {
    if (typeof acceptedLengthOrInfo == "number") try {
      let cmp = item.command.arguments[0];
      handlePartialGhostTextPostInsert(this.ctx, cmp, acceptedLengthOrInfo);
    } catch (e) {
      exception(this.ctx, e, ".handleDidPartiallyAcceptCompletionItem", ghostTextLogger);
    }
  }
};,__name(_Provider, "Provider");,var Provider = _Provider;,function isAutoCompletionsEnabled(ctx) {
  return getConfig(ctx, ConfigKey.EnableAutoCompletions);
},__name(isAutoCompletionsEnabled, "isAutoCompletionsEnabled");,function registerGhostText(ctx) {
  let provider = new Provider(ctx),
    providerHandler = Zl.languages.registerInlineCompletionItemProvider({
      pattern: "**"
    }, provider),
    postCmdHandler = Zl.commands.registerCommand(postInsertCmdName, async e => handleGhostTextPostInsert(ctx, e));
  ctx.get(Extension).register(providerHandler, postCmdHandler);
},__name(registerGhostText, "registerGhostText");