MIN_PROMPT_CHARS = 10;
_contextTooShort = {
  type: 'contextTooShort',
};
_copilotNotAvailable = {
  type: 'copilotNotAvailable',
};

/**
 * 提取提示的函数
 * @param {Object} ctx - 上下文对象
 * @param {Object} doc - 文档或笔记本对象
 * @param {Object} position - 提示的位置
 * @param {Object} telemetryData - 遥测数据
 * @param {Boolean} ifInserted - 是否插入
 * @returns {Object} 提取的提示
 */
function extractPrompt(ctx, doc, position, telemetryData, ifInserted) {
  // 从上下文中获取文档管理器
  const textDocumentManager = ctx.get(TextDocumentManager);
  // 尝试在文档管理器中找到笔记本
  const notebook = textDocumentManager.findNotebook(doc);

  // 检查是否找到了笔记本
  if (notebook === void 0) {
    // 如果没有找到笔记本，从文档中提取提示
    return extractPromptForDocument(ctx, doc, position, telemetryData, ifInserted);
  } else {
    // 如果找到了笔记本，从笔记本中提取提示
    return extractPromptForNotebook(ctx, doc, notebook, position, telemetryData, ifInserted);
  }
}

/**
 * 从给定的文档中提取提示信息。
 *
 * @param {Object} ctx - 上下文对象，用于获取其他服务。
 * @param {TextDocument} doc - 要从中提取提示的文档。
 * @param {Position} position - 提取提示的位置。
 * @param {Object} telemetryData - 用于记录遥测数据的对象。
 * @param {boolean} ifInserted - 如果为 true，则在提取提示后插入到文档中。
 * @returns {Promise} 返回一个 Promise，当提示被成功提取时解析。
 */
async function extractPromptForDocument(ctx, doc, position, telemetryData, ifInserted) {
  let relativePath = await ctx.get(TextDocumentManager).getRelativePath(doc);
  return extractPromptForSource(
    ctx,
    doc.getText(),
    doc.offsetAt(position),
    relativePath,
    doc.uri,
    doc.languageId,
    telemetryData,
    ifInserted
  );
}

/**
 * 从给定的源代码中提取提示信息。
 *
 * @param {Object} ctx - 上下文对象，用于获取其他服务。
 * @param {string} source - 要从中提取提示的源代码。
 * @param {number} offset - 提取提示的位置（字符偏移量）。
 * @param {string} relativePath - 源代码的相对路径。
 * @param {string} uri - 源代码的 URI。
 * @param {string} languageId - 源代码的语言 ID。
 * @param {Object} telemetryData - 用于记录遥测数据的对象。
 * @param {boolean} ifInserted - 如果为 true，则在提取提示后插入到源代码中。
 * @returns {Promise} 返回一个 Promise，当提示被成功提取时解析，解析的值是一个包含提示信息的对象。
 */
async function extractPromptForSource(
  ctx,
  source,
  offset,
  relativePath,
  uri,
  languageId,
  telemetryData,
  ifInserted
) {
  // 检查是否被阻止
  if ((await ctx.get(CopilotRepositoryControlManager).evaluate(uri, source, 'UPDATE')).isBlocked)
    return _copilotNotAvailable;

  // 获取后缀百分比
  let suffixPercent = ctx.get(Features).suffixPercent(telemetryData);

  // 如果源代码长度小于最小提示字符数，则返回 _contextTooShort
  if ((suffixPercent > 0 ? source.length : offset) < MIN_PROMPT_CHARS) return _contextTooShort;

  // 记录开始时间
  let startTime = Date.now();

  // 获取提示信息
  let {
    prefix: prefix,
    suffix: suffix,
    prefixLength: prefixLength,
    suffixLength: suffixLength,
    promptChoices: promptChoices,
    promptBackground: promptBackground,
    promptElementRanges: promptElementRanges,
    neighborSource: neighborSource,
  } = await getPromptForSource(
    ctx,
    source,
    offset,
    relativePath,
    uri,
    languageId,
    telemetryData,
    ifInserted
  );

  // 去除前缀的最后一行的空白字符
  let [resPrompt, trailingWs] = trimLastLine(prefix);

  // 记录结束时间
  let endTime = Date.now();

  // 返回提示信息
  return {
    type: 'prompt',
    prompt: {
      prefix: resPrompt,
      suffix: suffix,
      prefixTokens: prefixLength,
      suffixTokens: suffixLength,
      isFimEnabled: suffixPercent > 0 && suffix.length > 0,
      promptElementRanges: promptElementRanges.ranges,
    },
    trailingWs: trailingWs,
    promptChoices: promptChoices,
    computeTimeMs: endTime - startTime,
    promptBackground: promptBackground,
    neighborSource: neighborSource,
  };
}

async function getPromptForSource(
  ctx, // 上下文对象
  source, // 源代码
  offset, // 偏移量
  relativePath, // 相对路径
  uri, // 统一资源标识符
  languageId, // 语言ID
  telemetryData, // 遥测数据
  ifInserted // 插入标志
) {
  // 定义文档信息对象
  let docInfo = {
      uri: uri.toString(),
      source: source,
      offset: offset,
      relativePath: relativePath,
      languageId: languageId,
    },
    // 提取仓库信息
    repoInfo = extractRepoInfoInBackground(ctx, uri),
    // 尝试获取GitHub的NWO（Name With Owner，即包含所有者的名称）
    repoNwo = (_a = tryGetGitHubNWO(repoInfo)) != null ? _a : '',
    // 获取用户类型
    userKind = await getUserKind(ctx),
    // 获取DogFood标志
    dogFood = getDogFood(repoInfo),
    // 获取自定义模型标志
    customModel = await getFtFlag(ctx),
    // 获取检索组织标志
    retrievalOrg = await getRagFlag(ctx),
    // 定义特性过滤参数
    featuresFilterArgs = {
      repoNwo: repoNwo,
      userKind: userKind,
      dogFood: dogFood,
      fileType: languageId,
      retrievalOrg: retrievalOrg,
      customModel: customModel,
    },
    // 定义分词器名称
    tokenizerName = NA.TokenizerName.cl100k,
    // 获取默认的提示完成令牌
    defaultPromptCompletionTokens =
      (await ctx.get(CopilotTokenManager).getCopilotToken(ctx)).getTokenValue('8kp') === '1'
        ? 8192
        : 2048,
    // 获取最大提示长度
    maxPromptLength =
      ctx.get(Features).maxPromptCompletionTokens(telemetryData, defaultPromptCompletionTokens) -
      getMaxSolutionTokens(ctx),
    // 获取邻近标签选项
    neighboringTabs = ctx.get(Features).neighboringTabsOption(telemetryData),
    // 获取片段数量
    numberOfSnippets = ctx.get(Features).numberOfSnippets(telemetryData),
    // 获取提示顺序列表预设
    promptOrderListPreset = ctx.get(Features).promptOrderListPreset(telemetryData),
    // 获取默认注释标记
    defaultCommentMarker = ctx.get(Features).defaultCommentMarker(telemetryData),
    // 获取提示优先级预设
    promptPriorityPreset = ctx.get(Features).promptPriorityPreset(telemetryData),
    // 定义提示选项
    promptOptions = {
      maxPromptLength: maxPromptLength,
      neighboringTabs: neighboringTabs,
      tokenizerName: tokenizerName,
      numberOfSnippets: numberOfSnippets,
      promptOrderListPreset: promptOrderListPreset,
      defaultCommentMarker: defaultCommentMarker,
      promptPriorityPreset: promptPriorityPreset,
    },
    // 获取后缀百分比
    suffixPercent = ctx.get(Features).suffixPercent(telemetryData),
    // 获取后缀匹配阈值
    suffixMatchThreshold = ctx.get(Features).suffixMatchThreshold(telemetryData);
  // 如果后缀百分比大于0，则更新提示选项
  suffixPercent > 0 &&
    (promptOptions = {
      ...promptOptions,
      suffixPercent: suffixPercent,
      suffixMatchThreshold: suffixMatchThreshold,
    });
  // 定义提示信息和片段数组
  let promptInfo,
    snippets = [],
    // 获取检索选项
    retrievalOptions = await getRetrievalOptions(ctx, featuresFilterArgs, telemetryData);
  // 如果存在检索选项，则查询检索片段
  retrievalOptions &&
    (snippets = await queryRetrievalSnippets(ctx, docInfo, retrievalOptions, telemetryData));
  // 定义文档和邻近源的Map
  let docs = new Map(),
    neighborSource = new Map();
  try {
    // 获取邻近文件
    let files = await NeighborSource.getNeighborFiles(ctx, uri, featuresFilterArgs, telemetryData);
    // 更新文档和邻近源的Map
    (docs = files.docs), (neighborSource = files.neighborSource);
  } catch (e) {
    // 如果出现异常，则记录遥测异常
    telemetryException(ctx, e, 'prompt.getPromptForSource.exception');
  }
  try {
    // 定义片段提供者上下文
    let spContext = {
        currentFile: docInfo,
        neighborFiles: Array.from(docs.values()),
        tooltipSignature: ifInserted == null ? void 0 : ifInserted.tooltipSignature,
        options: new NA.PromptOptions(promptOptions),
      },
      // 获取片段提供者结果
      snippetProviderResults = await ctx.get(NA.SnippetOrchestrator).getSnippets(spContext),
      // 获取片段提供者的片段
      orchestratorSnippets = (0, NA.providersSnippets)(snippetProviderResults),
      // 获取片段提供者的错误
      errors = (0, NA.providersErrors)(snippetProviderResults),
      // 获取片段提供者的性能数据
      { runtimes: runtimes, timeouts: timeouts } = (0, NA.providersPerformance)(
        snippetProviderResults
      );
    // 扩展遥测数据的配置属性
    telemetryData.extendWithConfigProperties(ctx),
      // 清理遥测数据的键
      telemetryData.sanitizeKeys(),
      // 发送原始遥测数据
      await telemetryRaw(
        ctx,
        'prompt.stat',
        {
          ...mkBasicResultTelemetry(telemetryData),
          neighborFilesTimeout: `${timeouts[NA.SnippetProviderType.NeighboringTabs]}`,
        },
        {
          neighborFilesRuntimeMs: runtimes[NA.SnippetProviderType.NeighboringTabs],
        }
      );
    // 遍历错误
    // 如果错误是提供者超时错误，则记录遥测异常
    for (let e of errors)
      e.error instanceof NA.ProviderTimeoutError ||
        (await telemetryException(ctx, e.error, 'getSnippets'));
    // 将片段提供者的片段添加到片段数组中
    snippets.push(...orchestratorSnippets);
  } catch (e) {
    // 如果出现异常，则记录遥测异常并抛出异常
    throw (await telemetryException(ctx, e, 'prompt.orchestrator.getSnippets.exception'), e);
  }
  try {
    // 获取提示信息
    promptInfo = await promptLibProxy.getPrompt(docInfo, promptOptions, snippets);
  } catch (e) {
    // 如果出现异常，则记录遥测异常并抛出异常
    throw (await telemetryException(ctx, e, 'prompt.getPromptForSource.exception'), e);
  }
  // 返回邻近源和提示信息
  return {
    neighborSource: neighborSource,
    ...promptInfo,
  };
}
