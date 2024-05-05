function editDistance(haystack, needle, compare = (h, n) => h === n ? 0 : 1) {
  if (needle.length === 0 || haystack.length === 0) return {
    distance: needle.length,
    startOffset: 0,
    endOffset: 0
  };
  let curRow = new Array(needle.length + 1).fill(0),
    curStart = new Array(needle.length + 1).fill(0),
    prevRow = new Array(haystack.length + 1).fill(0),
    prevStart = new Array(haystack.length + 1).fill(0),
    c = needle[0];
  for (let i = 0; i < haystack.length + 1; i++) i === 0 ? curRow[i] = 1 : curRow[i] = compare(haystack[i - 1], c, i - 1, 0), curStart[i] = i > 0 ? i - 1 : 0;
  for (let j = 1; j < needle.length; j++) {
    let swap = prevRow;
    prevRow = curRow, curRow = swap, swap = prevStart, prevStart = curStart, curStart = swap, c = needle[j], curRow[0] = j + 1;
    for (let i = 1; i < haystack.length + 1; i++) {
      let inserted = 1 + prevRow[i],
        deleted = 1 + curRow[i - 1],
        substituted = compare(haystack[i - 1], c, i - 1, j) + prevRow[i - 1];
      curRow[i] = Math.min(deleted, inserted, substituted), curRow[i] === substituted ? curStart[i] = prevStart[i - 1] : curRow[i] === inserted ? curStart[i] = prevStart[i] : curStart[i] = curStart[i - 1];
    }
  }
  let best = 0;
  for (let i = 0; i < haystack.length + 1; i++) curRow[i] < curRow[best] && (best = i);
  return {
    distance: curRow[best],
    startOffset: curStart[best],
    endOffset: best
  };
},__name(editDistance, "editDistance");,function emptyLexDictionary() {
  return new Map();
},__name(emptyLexDictionary, "emptyLexDictionary");,function reverseLexDictionary(d) {
  let lookup = new Array(d.size);
  for (let [lexeme, idx] of d) lookup[idx] = lexeme;
  return lookup;
},__name(reverseLexDictionary, "reverseLexDictionary");,function* lexGeneratorWords(s) {
  let buffer = "",
    State;
  (l => (State[l.Word = 0] = "Word", State[l.Space = 1] = "Space", State[l.Other = 2] = "Other"))(State || (t = {}));
  let state = 0;
  for (let c of s) {
    let newState;
    new RegExp("(\\p{L}|\\p{Nd}|_)", "u").test(c) ? newState = 0 : c === " " ? newState = 1 : newState = 2, newState === state && newState !== 2 ? buffer += c : (buffer.length > 0 && (yield buffer), buffer = c, state = newState);
  }
  buffer.length > 0 && (yield buffer);
},__name(lexGeneratorWords, "lexGeneratorWords");,function lexicalAnalyzer(s, d, lexGenerator, lexFilter) {
  let lexed = [],
    offset = 0;
  for (let lexeme of lexGenerator(s)) lexFilter(lexeme) && (d.has(lexeme) || d.set(lexeme, d.size), lexed.push([d.get(lexeme), offset])), offset += lexeme.length;
  return [lexed, d];
},__name(lexicalAnalyzer, "lexicalAnalyzer");,function notSingleSpace(s) {
  return s !== " ";
},__name(notSingleSpace, "notSingleSpace");,function lexEditDistance(haystack, needle, lexGenerator = lexGeneratorWords) {
  let [haystackLexed, d] = lexicalAnalyzer(haystack, emptyLexDictionary(), lexGenerator, notSingleSpace),
    [needleLexed, dBoth] = lexicalAnalyzer(needle, d, lexGenerator, notSingleSpace);
  if (needleLexed.length === 0 || haystackLexed.length === 0) return {
    lexDistance: needleLexed.length,
    startOffset: 0,
    endOffset: 0,
    haystackLexLength: haystackLexed.length,
    needleLexLength: needleLexed.length
  };
  let lookupId = reverseLexDictionary(dBoth),
    needleLexedLength = needleLexed.length,
    needleFirst = lookupId[needleLexed[0][0]],
    needleLast = lookupId[needleLexed[needleLexedLength - 1][0]];
  function compare(hLexId, nLexId, hIndex, nIndex) {
    if (nIndex === 0 || nIndex === needleLexedLength - 1) {
      let haystackLexeme = lookupId[haystackLexed[hIndex][0]];
      return nIndex == 0 && haystackLexeme.endsWith(needleFirst) || nIndex == needleLexedLength - 1 && haystackLexeme.startsWith(needleLast) ? 0 : 1;
    } else return hLexId === nLexId ? 0 : 1;
  }
  __name(compare, "compare");
  let alignment = editDistance(haystackLexed.map(x => x[0]), needleLexed.map(x => x[0]), compare),
    startOffset = haystackLexed[alignment.startOffset][1],
    endOffset = alignment.endOffset < haystackLexed.length ? haystackLexed[alignment.endOffset][1] : haystack.length;
  return endOffset > 0 && haystack[endOffset - 1] === " " && --endOffset, {
    lexDistance: alignment.distance,
    startOffset: startOffset,
    endOffset: endOffset,
    haystackLexLength: haystackLexed.length,
    needleLexLength: needleLexed.length
  };
},__name(lexEditDistance, "lexEditDistance");,var equal = QV(),
  logger = new Logger(0, "retrieval");,function snippetFromRetrievalResult(result) {
  return {
    snippet: result.text.before + result.text.snippet + result.text.after,
    score: result.distance * -1,
    startLine: result.line_info.before_start_line,
    endLine: result.line_info.after_end_line,
    relativePath: result.file,
    restrictedTelemetry: {
      corpusId: result.corpus_config.corpus_id,
      repoNwo: result.corpus_config.repo_nwo,
      repoSha: result.corpus_config.repo_sha,
      indexTimestamp: result.corpus_config.index_timestamp
    }
  };
},__name(snippetFromRetrievalResult, "snippetFromRetrievalResult");,function buildSnippetMatcher(matcherName, matcherThreshold) {
  switch (matcherName) {
    case "exact":
      return exactSnippetMatcher;
    case "editDistanceRelative":
      if (matcherThreshold === void 0 || matcherThreshold < 0 || matcherThreshold > 100) throw new Error("Invalid threshold for editDistanceRelative matcher");
      return editDistanceSnippetMatcher(matcherThreshold / 100, "relative");
    case "editDistanceAbsolute":
      if (matcherThreshold === void 0 || matcherThreshold < 0) throw new Error("Invalid threshold for editDistanceAbsolute matcher");
      return editDistanceSnippetMatcher(matcherThreshold, "absolute");
    case "lineBasedRelative":
      if (matcherThreshold === void 0 || matcherThreshold < 0 || matcherThreshold > 100) throw new Error("Invalid threshold for lineBasedRelative matcher");
      return lineBasedSnippetMatcher(matcherThreshold / 100, "relative", 100);
    case "lineBasedAbsolute":
      if (matcherThreshold === void 0 || matcherThreshold < 0) throw new Error("Invalid threshold for lineBasedAbsolute matcher");
      return lineBasedSnippetMatcher(matcherThreshold, "absolute", 100);
    default:
      return exactSnippetMatcher;
  }
},__name(buildSnippetMatcher, "buildSnippetMatcher");,function exactSnippetMatcher(queryKey, cacheKey) {
  return queryKey.querySnippet === cacheKey.querySnippet;
},__name(exactSnippetMatcher, "exactSnippetMatcher");,function breakUpLongLines(text, maxLineCharLength) {
  let lines = new Set();
  for (let line of text.split(`
`)) {
    if (line.length <= maxLineCharLength) {
      lines.add(line);
      continue;
    }
    let i = 0;
    for (; i < line.length;) lines.add(line.substring(i, i + maxLineCharLength)), i += maxLineCharLength;
  }
  return lines;
},__name(breakUpLongLines, "breakUpLongLines");,function lineBasedSnippetMatcher(threshold, thresholdType, maxLineCharLength) {
  return (queryKey, cacheKey) => {
    let queryLines = breakUpLongLines(queryKey.querySnippet, maxLineCharLength),
      cacheLines = breakUpLongLines(cacheKey.querySnippet, maxLineCharLength),
      intersection = new Set([...queryLines].filter(line => cacheLines.has(line)));
    return thresholdType === "relative" ? 1 - intersection.size / (queryLines.size + cacheLines.size - intersection.size) <= threshold : Math.max(queryLines.size, cacheLines.size) - intersection.size <= threshold;
  };
},__name(lineBasedSnippetMatcher, "lineBasedSnippetMatcher");,function editDistanceSnippetMatcher(threshold, thresholdType) {
  return (queryKey, cacheKey) => {
    let res = editDistance(queryKey.querySnippet, cacheKey.querySnippet);
    return thresholdType === "relative" ? res.distance <= threshold * Math.max(queryKey.querySnippet.length, cacheKey.querySnippet.length) : res.distance <= threshold;
  };
},__name(editDistanceSnippetMatcher, "editDistanceSnippetMatcher");,function getRetrievalContext(docInfo, options) {
  let contextInfo = (0, s1.getCursorContext)(docInfo, options);
  return {
    querySnippet: contextInfo.context,
    offset: docInfo.offset,
    tokenLength: contextInfo.tokenLength,
    lineCount: contextInfo.lineCount
  };
},__name(getRetrievalContext, "getRetrievalContext");,var _RetrievalCache = class _RetrievalCache {
  constructor(matcher, maxUriCacheSize) {
    this.uriToCache = new Map();
    this.matcher = matcher, this.maxUriCacheSize = maxUriCacheSize;
  }
  hashContext(context) {
    return (0, TV.createHash)("sha1").update(context.querySnippet).digest("hex");
  }
  get(uri, queryContext) {
    let uriCache = this.uriToCache.get(uri);
    if (uriCache !== void 0) for (let hash of uriCache.keys()) {
      let {
        context: context,
        retrievalId: retrievalId,
        snippets: snippets
      } = uriCache.get(hash);
      if (this.matcher(queryContext, context)) return {
        retrievalId: retrievalId,
        snippets: snippets
      };
    }
  }
  put(uri, retrievalId, retrievalContext, snippets) {
    let uriCache = this.uriToCache.get(uri);
    uriCache === void 0 && (uriCache = new LRUCacheMap(this.maxUriCacheSize), this.uriToCache.set(uri, uriCache)), uriCache.set(this.hashContext(retrievalContext), {
      context: retrievalContext,
      retrievalId: retrievalId,
      snippets: snippets
    });
  }
};,__name(_RetrievalCache, "RetrievalCache");,var RetrievalCache = _RetrievalCache;,function lookupCache(ctx, retrievalCache, docInfo, retrievalContext, telemetryData) {
  let cacheLookupStart = Date.now(),
    cacheHit = retrievalCache.get(docInfo.uri, retrievalContext),
    cacheLookupElapsed = Date.now() - cacheLookupStart;
  return telemetrizeCacheLookup(ctx, cacheHit !== void 0, cacheLookupElapsed, telemetryData), cacheHit;
},__name(lookupCache, "lookupCache");,function telemetrizeCacheLookup(ctx, cacheHit, cacheLookupElapsed, telemetryData) {
  telemetry(ctx, "retrieval.cacheLookup", telemetryData.extendedBy({
    cacheHit: cacheHit ? "true" : "false"
  }, {
    cacheLookupElapsed: cacheLookupElapsed
  }), 0);
},__name(telemetrizeCacheLookup, "telemetrizeCacheLookup");,function telemetrizeTooShortContext(ctx, docInfo, retrievalContext, telemetryData) {
  let commonMeasurements = {
    retrievalContextTokens: retrievalContext.tokenLength,
    retrievalLineCount: retrievalContext.lineCount,
    cursorPos: docInfo.offset
  };
  telemetry(ctx, "retrieval.tooShortContext", telemetryData.extendedBy({}, commonMeasurements), 0), telemetry(ctx, "retrieval.tooShortContext", telemetryData.extendedBy({
    file: docInfo.uri,
    retrievalContext: retrievalContext.querySnippet
  }, commonMeasurements), 1);
},__name(telemetrizeTooShortContext, "telemetrizeTooShortContext");,function telemetrizePostRetrievalRequest(ctx, docInfo, retrievalId, retrievalContext, retrievalOptions, telemetryData) {
  let commonMeasurements = {
    retrievalContextTokens: retrievalContext.tokenLength,
    retrievalLineCount: retrievalContext.lineCount,
    cursorPos: docInfo.offset
  };
  telemetry(ctx, "retrieval.issued", telemetryData.extendedBy({
    retrievalId: retrievalId
  }, commonMeasurements), 0), telemetry(ctx, "retrieval.issued", telemetryData.extendedBy({
    retrievalId: retrievalId,
    file: docInfo.uri,
    retrievalContext: retrievalContext.querySnippet
  }, commonMeasurements), 1);
},__name(telemetrizePostRetrievalRequest, "telemetrizePostRetrievalRequest");,function telemetrizePostRetrievalResponse(ctx, retrievalId, response, telemetryData) {
  telemetry(ctx, "retrieval.response", telemetryData.extendedBy({
    retrievalId: retrievalId
  }), 0);
},__name(telemetrizePostRetrievalResponse, "telemetrizePostRetrievalResponse");,function telemetrizePostRetrievalRequestError(ctx, retrievalId, error, telemetryData) {
  var _a;
  telemetry(ctx, "retrieval.error", telemetryData.extendedBy({
    retrievalId: retrievalId,
    error: (_a = JSON.stringify(error)) != null ? _a : "unknown"
  }), 0);
},__name(telemetrizePostRetrievalRequestError, "telemetrizePostRetrievalRequestError");,function telemetrizeProcessRetrievalResponse(ctx, retrievalId, body, snippets, telemetryData) {
  var _a, _b, _c, _d;
  let commonMeasurements = {
    numSnippetsFromServer: ((_a = body == null ? void 0 : body.results) == null ? void 0 : _a.length) || -1,
    numFilteredSnippets: snippets.length
  };
  telemetry(ctx, "retrieval.retrieved", telemetryData.extendedBy({
    retrievalId: retrievalId
  }, {
    ...commonMeasurements,
    elapsedEmbeddingNs: ((_b = body == null ? void 0 : body.metadata) == null ? void 0 : _b.elapsed_embedding_ns) || -1,
    elapsedKnnNs: ((_c = body == null ? void 0 : body.metadata) == null ? void 0 : _c.elapsed_knn_ns) || -1,
    elapsedFindSourceNs: ((_d = body == null ? void 0 : body.metadata) == null ? void 0 : _d.elapsed_find_source_ns) || -1
  }), 0), telemetry(ctx, "retrieval.retrieved", telemetryData.extendedBy({
    retrievalId: retrievalId,
    snippets: JSON.stringify(snippets.map(snippet => {
      let {
        restrictedTelemetry: restrictedTelemetry,
        ...rest
      } = snippet;
      return {
        ...rest,
        ...restrictedTelemetry
      };
    }))
  }, {
    ...commonMeasurements
  }), 1);
},__name(telemetrizeProcessRetrievalResponse, "telemetrizeProcessRetrievalResponse");,function telemetrizeProcessRetrievalError(ctx, retrievalId, body, error, telemetryData) {
  var _a, _b;
  telemetry(ctx, "retrieval.errorProcess", telemetryData.extendedBy({
    retrievalId: retrievalId
  }), 0), telemetry(ctx, "retrieval.errorProcess", telemetryData.extendedBy({
    retrievalId: retrievalId,
    body: (_a = JSON.stringify(body)) != null ? _a : "unknown",
    error: (_b = JSON.stringify(error)) != null ? _b : "unknown"
  }), 1);
},__name(telemetrizeProcessRetrievalError, "telemetrizeProcessRetrievalError");,function telemetrizeQueryRetrievalDebounce(ctx, pendingRetrievalId, telemetryData) {
  telemetry(ctx, "retrieval.debounced", telemetryData.extendedBy({
    pendingRetrievalId: pendingRetrievalId
  }), 0);
},__name(telemetrizeQueryRetrievalDebounce, "telemetrizeQueryRetrievalDebounce");,function telemetrizeQueryRetrievalFromCache(ctx, cachedRetrievalId, cachedSnippets, telemetryData) {
  telemetry(ctx, "retrieval.cacheHit", telemetryData.extendedBy({
    cachedRetrievalId: cachedRetrievalId
  }, {
    numSnippetsReturned: cachedSnippets.length
  }), 0);
},__name(telemetrizeQueryRetrievalFromCache, "telemetrizeQueryRetrievalFromCache");,var documentRequestStates = new Map();,function retrievalRequestUrl(repoNwo, serverRouteImpl) {
  return OPENAI_PROXY_HOST + `/v0/retrieval?repo=${repoNwo}&impl=${serverRouteImpl}`;
},__name(retrievalRequestUrl, "retrievalRequestUrl");,function filterQuerySnippets(docInfo) {
  return snippet => snippet.relativePath === void 0 ? !0 : !(docInfo.uri.endsWith(snippet.relativePath) || snippet.relativePath.endsWith(docInfo.uri));
},__name(filterQuerySnippets, "filterQuerySnippets");,async function postRetrievalRequest(ctx, docInfo, retrievalContext, retrievalOptions, telemetryData) {
  let retrievalId = v4_default();
  documentRequestStates.set(docInfo.uri, {
    state: "pending",
    retrievalId: retrievalId
  });
  let secretKey = (await ctx.get(CopilotTokenManager).getCopilotToken(ctx)).token;
  telemetrizePostRetrievalRequest(ctx, docInfo, retrievalId, retrievalContext, retrievalOptions, telemetryData), postRequest(ctx, retrievalRequestUrl(retrievalOptions.repoNwo, retrievalOptions.serverRouteImpl), secretKey, void 0, v4_default(), {
    query: retrievalContext.querySnippet,
    options: {
      ...retrievalOptions.server
    }
  }).then(async response => {
    if (logger.info(ctx, `Retrieval request for ${docInfo.uri} finished`), response.status === 200) documentRequestStates.set(docInfo.uri, {
      state: "response",
      retrievalId: retrievalId,
      retrievalContext: retrievalContext,
      response: response,
      retrievalOptions: retrievalOptions
    }), telemetrizePostRetrievalResponse(ctx, retrievalId, response, telemetryData);else throw new Error(`Retrieval request failed with status ${response.status}`);
  }).catch(error => {
    logger.info(ctx, `Retrieval request for ${docInfo.uri} failed. Error: ${error}`), telemetrizePostRetrievalRequestError(ctx, retrievalId, error, telemetryData), documentRequestStates.set(docInfo.uri, {
      state: "idle"
    });
  });
},__name(postRetrievalRequest, "postRetrievalRequest");,async function processRetrievalResponse(ctx, docInfo, retrievalId, retrievalContext, response, retrievalOptions, telemetryData) {
  var _a;
  if (documentRequestStates.set(docInfo.uri, {
    state: "idle"
  }), !equal(retrievalOptions, currentRetrievalOptions)) return;
  let {
      data: unparsedData,
      impl: impl
    } = await response.json(),
    data = JSON.parse(unparsedData);
  try {
    if (impl !== retrievalOptions.serverRouteImpl) throw new Error(`Wrong retrieval implementation returned from the proxy: expected ${retrievalOptions.serverRouteImpl}, got ${impl}`);
    if (data === null) throw new Error("Retrieval response body is null");
    logger.info(ctx, `Retrieval request for ${docInfo.uri} processed. Got ${(_a = data == null ? void 0 : data.results) == null ? void 0 : _a.length} snippets back`);
    let snippets = data.results.map(snippetFromRetrievalResult).filter(filterQuerySnippets(docInfo));
    logger.info(ctx, `There were ${snippets.length} after filtering`), retrievalCache == null || retrievalCache.put(docInfo.uri, retrievalId, retrievalContext, snippets.map(snippet => {
      let {
        restrictedTelemetry: restrictedTelemetry,
        ...rest
      } = snippet;
      return rest;
    })), telemetrizeProcessRetrievalResponse(ctx, retrievalId, data, snippets, telemetryData);
  } catch (error) {
    logger.exception(ctx, error, "Error while processing retrieval response"), telemetrizeProcessRetrievalError(ctx, retrievalId, data, error, telemetryData);
  }
},__name(processRetrievalResponse, "processRetrievalResponse");,var retrievalCache, currentRetrievalOptions;,async function queryRetrievalSnippets(ctx, docInfo, retrievalOptions, telemetryData) {
  var _a, _b, _c;
  if (retrievalCache === void 0 || !equal(currentRetrievalOptions, retrievalOptions)) {
    let matcher = buildSnippetMatcher(retrievalOptions.cache.snippetMatcherName, retrievalOptions.cache.snippetMatcherThreshold);
    currentRetrievalOptions = retrievalOptions, retrievalCache = new RetrievalCache(matcher, retrievalOptions.cache.maxUriCacheSize);
  }
  let requestState = (_a = documentRequestStates.get(docInfo.uri)) != null ? _a : {
    state: "idle"
  };
  if (requestState.state === "pending") return telemetrizeQueryRetrievalDebounce(ctx, requestState.retrievalId, telemetryData), [];
  requestState.state === "response" && (await processRetrievalResponse(ctx, docInfo, requestState.retrievalId, requestState.retrievalContext, requestState.response, requestState.retrievalOptions, telemetryData));
  let retrievalContext = getRetrievalContext(docInfo, retrievalOptions.context);
  if (retrievalContext.lineCount < ((_b = retrievalOptions.context.minLineCount) != null ? _b : 0) || retrievalContext.tokenLength < ((_c = retrievalOptions.context.minTokenLength) != null ? _c : 0)) return telemetrizeTooShortContext(ctx, docInfo, retrievalContext, telemetryData), [];
  let cacheHit = lookupCache(ctx, retrievalCache, docInfo, retrievalContext, telemetryData);
  return cacheHit === void 0 ? (await postRetrievalRequest(ctx, docInfo, retrievalContext, retrievalOptions, telemetryData), []) : (telemetrizeQueryRetrievalFromCache(ctx, cacheHit.retrievalId, cacheHit.snippets, telemetryData), logger.debug(ctx, `Retrieval cache hit for ${docInfo.uri}`), cacheHit.snippets.map(snippet => ({
    provider: s1.SnippetProviderType.Retrieval,
    semantics: s1.SnippetSemantics.Snippet,
    ...snippet
  })));
},__name(queryRetrievalSnippets, "queryRetrievalSnippets");,async function getRetrievalOptions(ctx, featuresFilterArgs, telemetryData) {
  if (!ctx.get(Features).retrievalStrategy(telemetryData)) return;
  let serverRouteImpl = ctx.get(Features).retrievalServerRoute(telemetryData),
    repoNwo;
  return featuresFilterArgs.repoNwo && featuresFilterArgs.repoNwo.length > 0 ? repoNwo = featuresFilterArgs.repoNwo : featuresFilterArgs.dogFood && featuresFilterArgs.dogFood.length > 0 ? repoNwo = featuresFilterArgs.dogFood : repoNwo = "", {
    repoNwo: repoNwo,
    serverRouteImpl: serverRouteImpl,
    context: {
      maxLineCount: 30,
      maxTokenLength: 1e3,
      minLineCount: 8,
      minTokenLength: 30
    },
    server: {
      results: 10,
      language: featuresFilterArgs.fileType,
      range_from: -10,
      range_to: 10,
      max_length: 192
    },
    cache: {
      snippetMatcherName: "lineBasedRelative",
      snippetMatcherThreshold: 40,
      maxUriCacheSize: 5
    }
  };
},__name(getRetrievalOptions, "getRetrievalOptions");,var MIN_PROMPT_CHARS = 10,
  _contextTooShort = {
    type: "contextTooShort"
  },
  _copilotNotAvailable = {
    type: "copilotNotAvailable"
  };,async function getPromptForSource(ctx, source, offset, relativePath, uri, languageId, telemetryData, ifInserted) {
  var _a;
  let docInfo = {
      uri: uri.toString(),
      source: source,
      offset: offset,
      relativePath: relativePath,
      languageId: languageId
    },
    repoInfo = extractRepoInfoInBackground(ctx, uri),
    repoNwo = (_a = tryGetGitHubNWO(repoInfo)) != null ? _a : "",
    userKind = await getUserKind(ctx),
    dogFood = getDogFood(repoInfo),
    customModel = await getFtFlag(ctx),
    retrievalOrg = await getRagFlag(ctx),
    featuresFilterArgs = {
      repoNwo: repoNwo,
      userKind: userKind,
      dogFood: dogFood,
      fileType: languageId,
      retrievalOrg: retrievalOrg,
      customModel: customModel
    },
    tokenizerName = NA.TokenizerName.cl100k,
    defaultPromptCompletionTokens = (await ctx.get(CopilotTokenManager).getCopilotToken(ctx)).getTokenValue("8kp") === "1" ? 8192 : 2048,
    maxPromptLength = ctx.get(Features).maxPromptCompletionTokens(telemetryData, defaultPromptCompletionTokens) - getMaxSolutionTokens(ctx),
    neighboringTabs = ctx.get(Features).neighboringTabsOption(telemetryData),
    numberOfSnippets = ctx.get(Features).numberOfSnippets(telemetryData),
    promptOrderListPreset = ctx.get(Features).promptOrderListPreset(telemetryData),
    defaultCommentMarker = ctx.get(Features).defaultCommentMarker(telemetryData),
    promptPriorityPreset = ctx.get(Features).promptPriorityPreset(telemetryData),
    promptOptions = {
      maxPromptLength: maxPromptLength,
      neighboringTabs: neighboringTabs,
      tokenizerName: tokenizerName,
      numberOfSnippets: numberOfSnippets,
      promptOrderListPreset: promptOrderListPreset,
      defaultCommentMarker: defaultCommentMarker,
      promptPriorityPreset: promptPriorityPreset
    },
    suffixPercent = ctx.get(Features).suffixPercent(telemetryData),
    suffixMatchThreshold = ctx.get(Features).suffixMatchThreshold(telemetryData);
  suffixPercent > 0 && (promptOptions = {
    ...promptOptions,
    suffixPercent: suffixPercent,
    suffixMatchThreshold: suffixMatchThreshold
  });
  let promptInfo,
    snippets = [],
    retrievalOptions = await getRetrievalOptions(ctx, featuresFilterArgs, telemetryData);
  retrievalOptions && (snippets = await queryRetrievalSnippets(ctx, docInfo, retrievalOptions, telemetryData));
  let docs = new Map(),
    neighborSource = new Map();
  try {
    let files = await NeighborSource.getNeighborFiles(ctx, uri, featuresFilterArgs, telemetryData);
    docs = files.docs, neighborSource = files.neighborSource;
  } catch (e) {
    telemetryException(ctx, e, "prompt.getPromptForSource.exception");
  }
  try {
    let spContext = {
        currentFile: docInfo,
        neighborFiles: Array.from(docs.values()),
        tooltipSignature: ifInserted == null ? void 0 : ifInserted.tooltipSignature,
        options: new NA.PromptOptions(promptOptions)
      },
      snippetProviderResults = await ctx.get(NA.SnippetOrchestrator).getSnippets(spContext),
      orchestratorSnippets = (0, NA.providersSnippets)(snippetProviderResults),
      errors = (0, NA.providersErrors)(snippetProviderResults),
      {
        runtimes: runtimes,
        timeouts: timeouts
      } = (0, NA.providersPerformance)(snippetProviderResults);
    telemetryData.extendWithConfigProperties(ctx), telemetryData.sanitizeKeys(), await telemetryRaw(ctx, "prompt.stat", {
      ...mkBasicResultTelemetry(telemetryData),
      neighborFilesTimeout: `${timeouts[NA.SnippetProviderType.NeighboringTabs]}`
    }, {
      neighborFilesRuntimeMs: runtimes[NA.SnippetProviderType.NeighboringTabs]
    });
    for (let e of errors) e.error instanceof NA.ProviderTimeoutError || (await telemetryException(ctx, e.error, "getSnippets"));
    snippets.push(...orchestratorSnippets);
  } catch (e) {
    throw await telemetryException(ctx, e, "prompt.orchestrator.getSnippets.exception"), e;
  }
  try {
    promptInfo = await promptLibProxy.getPrompt(docInfo, promptOptions, snippets);
  } catch (e) {
    throw await telemetryException(ctx, e, "prompt.getPromptForSource.exception"), e;
  }
  return {
    neighborSource: neighborSource,
    ...promptInfo
  };
},__name(getPromptForSource, "getPromptForSource");,function trimLastLine(source) {
  let lines = source.split(`
`),
    lastLine = lines[lines.length - 1],
    extraSpace = lastLine.length - lastLine.trimRight().length,
    promptTrim = source.slice(0, source.length - extraSpace),
    trailingWs = source.slice(promptTrim.length);
  return [lastLine.length == extraSpace ? promptTrim : source, trailingWs];
},__name(trimLastLine, "trimLastLine");,async function extractPromptForSource(ctx, source, offset, relativePath, uri, languageId, telemetryData, ifInserted) {
  if ((await ctx.get(CopilotRepositoryControlManager).evaluate(uri, source, "UPDATE")).isBlocked) return _copilotNotAvailable;
  let suffixPercent = ctx.get(Features).suffixPercent(telemetryData);
  if ((suffixPercent > 0 ? source.length : offset) < MIN_PROMPT_CHARS) return _contextTooShort;
  let startTime = Date.now(),
    {
      prefix: prefix,
      suffix: suffix,
      prefixLength: prefixLength,
      suffixLength: suffixLength,
      promptChoices: promptChoices,
      promptBackground: promptBackground,
      promptElementRanges: promptElementRanges,
      neighborSource: neighborSource
    } = await getPromptForSource(ctx, source, offset, relativePath, uri, languageId, telemetryData, ifInserted),
    [resPrompt, trailingWs] = trimLastLine(prefix),
    endTime = Date.now();
  return {
    type: "prompt",
    prompt: {
      prefix: resPrompt,
      suffix: suffix,
      prefixTokens: prefixLength,
      suffixTokens: suffixLength,
      isFimEnabled: suffixPercent > 0 && suffix.length > 0,
      promptElementRanges: promptElementRanges.ranges
    },
    trailingWs: trailingWs,
    promptChoices: promptChoices,
    computeTimeMs: endTime - startTime,
    promptBackground: promptBackground,
    neighborSource: neighborSource
  };
},__name(extractPromptForSource, "extractPromptForSource");,async function extractPromptForDocument(ctx, doc, position, telemetryData, ifInserted) {
  let relativePath = await ctx.get(TextDocumentManager).getRelativePath(doc);
  return extractPromptForSource(ctx, doc.getText(), doc.offsetAt(position), relativePath, doc.uri, doc.languageId, telemetryData, ifInserted);
},__name(extractPromptForDocument, "extractPromptForDocument");,function addNeighboringCellsToPrompt(neighboringCell, activeCellLanguageId, defaultCommentMarker) {
  let languageId = neighboringCell.document.languageId,
    text = neighboringCell.document.getText();
  return languageId === activeCellLanguageId ? text : (0, NA.commentBlockAsSingles)(text, activeCellLanguageId, defaultCommentMarker);
},__name(addNeighboringCellsToPrompt, "addNeighboringCellsToPrompt");,async function extractPromptForNotebook(ctx, doc, notebook, position, telemetryData, ifInserted) {
  let activeCell = notebook.getCells().find(cell => cell.document.uri.toString() === doc.uri.toString());
  if (activeCell) {
    let beforeCells = notebook.getCells().filter(cell => cell.index < activeCell.index && considerNeighborFile(activeCell.document.languageId, cell.document.languageId)),
      defaultCommentMarker = ctx.get(Features).defaultCommentMarker(telemetryData),
      beforeSource = beforeCells.length > 0 ? beforeCells.map(cell => addNeighboringCellsToPrompt(cell, activeCell.document.languageId, defaultCommentMarker)).join(`

`) + `

` : "",
      source = beforeSource + doc.getText(),
      offset = beforeSource.length + doc.offsetAt(position);
    return extractPromptForSource(ctx, source, offset, void 0, doc.uri, activeCell.document.languageId, telemetryData, ifInserted);
  } else return extractPromptForDocument(ctx, doc, position, telemetryData, ifInserted);
},__name(extractPromptForNotebook, "extractPromptForNotebook");,function extractPrompt(ctx, doc, position, telemetryData, ifInserted) {
  let notebook = ctx.get(TextDocumentManager).findNotebook(doc);
  return notebook === void 0 ? extractPromptForDocument(ctx, doc, position, telemetryData, ifInserted) : extractPromptForNotebook(ctx, doc, notebook, position, telemetryData, ifInserted);
},__name(extractPrompt, "extractPrompt");