var solutionsLogger = new Logger(1, "solutions");,async function* prependChoices(choices, prefix) {
  for await (let choice of choices) {
    let choiceCopy = {
      ...choice
    };
    choiceCopy.completionText = prefix + choiceCopy.completionText.trimRight(), yield choiceCopy;
  }
},__name(prependChoices, "prependChoices");,var _SolutionManager = class _SolutionManager {
  constructor(textDocument, startPosition, completionContext, cancellationToken, solutionCountTarget) {
    this.textDocument = textDocument;
    this.startPosition = startPosition;
    this.completionContext = completionContext;
    this.cancellationToken = cancellationToken;
    this.solutionCountTarget = solutionCountTarget;
  }
  get savedTelemetryData() {
    return this._savedTelemetryData;
  }
  set savedTelemetryData(data) {
    this._savedTelemetryData = data;
  }
};,__name(_SolutionManager, "SolutionManager");,var SolutionManager = _SolutionManager;,function normalizeCompletionText(text) {
  return text.replace(/\s+/g, "");
},__name(normalizeCompletionText, "normalizeCompletionText");,async function launchSolutions(ctx, solutionManager) {
  var _a, _b, _c, _d, _e;
  let insertPosition = solutionManager.completionContext.insertPosition,
    prependToCompletion = solutionManager.completionContext.prependToCompletion,
    indentation = solutionManager.completionContext.indentation,
    document = solutionManager.textDocument,
    documentSource = document.getText(),
    positionOffset = document.offsetAt(insertPosition),
    actualSuffix = documentSource.substring(positionOffset),
    repoInfo = extractRepoInfoInBackground(ctx, document.uri),
    featuresFilterArgs = await getExPFilters(ctx, document),
    ourRequestId = v4_default(),
    tempTelemetry = TelemetryData.createAndMarkAsIssued({
      headerRequestId: ourRequestId,
      languageId: document.languageId,
      source: completionTypeToString(solutionManager.completionContext.completionType)
    }, {});
  solutionManager.savedTelemetryData = await ctx.get(Features).updateExPValuesAndAssignments(featuresFilterArgs, tempTelemetry);
  let promptResponse = await extractPrompt(ctx, document, insertPosition, solutionManager.savedTelemetryData);
  if (promptResponse.type === "copilotNotAvailable") return {
    status: "FinishedNormally"
  };
  if (promptResponse.type === "contextTooShort") return {
    status: "FinishedWithError",
    error: "Context too short"
  };
  let prompt = promptResponse.prompt,
    trailingWs = promptResponse.trailingWs;
  trailingWs.length > 0 && (solutionManager.startPosition = LocationFactory.position(solutionManager.startPosition.line, solutionManager.startPosition.character - trailingWs.length));
  let cancellationToken = solutionManager.cancellationToken;
  solutionManager.savedTelemetryData = solutionManager.savedTelemetryData.extendedBy({}, {
    ...telemetrizePromptLength(prompt),
    solutionCount: solutionManager.solutionCountTarget,
    promptEndPos: document.offsetAt(insertPosition)
  }), solutionsLogger.debug(ctx, "prompt:", prompt), solutionsLogger.debug(ctx, `prependToCompletion: ${prependToCompletion}`), telemetry(ctx, "solution.requested", solutionManager.savedTelemetryData);
  let blockMode = await ctx.get(BlockModeConfig).forLanguage(ctx, document.languageId, solutionManager.savedTelemetryData),
    isSupportedLanguage = promptLibProxy.isSupportedLanguageId(document.languageId),
    contextIndent = contextIndentation(document, insertPosition),
    postOptions = {
      stream: !0,
      extra: {
        language: document.languageId,
        next_indent: (_a = contextIndent.next) != null ? _a : 0,
        prompt_tokens: (_b = prompt.prefixTokens) != null ? _b : 0,
        suffix_tokens: (_c = prompt.suffixTokens) != null ? _c : 0
      }
    };
  blockMode === "parsing" && !isSupportedLanguage && (postOptions.stop = [`

`, `\r
\r
`]);
  let completionParams = {
      prompt: prompt,
      languageId: document.languageId,
      repoInfo: repoInfo,
      ourRequestId: ourRequestId,
      engineUrl: await getEngineURL(ctx, solutionManager.savedTelemetryData),
      count: solutionManager.solutionCountTarget,
      uiKind: "synthesize",
      postOptions: postOptions,
      requestLogProbs: !0
    },
    finishedCb;
  switch (blockMode) {
    case "server":
      finishedCb = __name(async text => {}, "finishedCb"), postOptions.extra.force_indent = (_d = contextIndent.prev) != null ? _d : -1, postOptions.extra.trim_by_indentation = !0;
      break;
    case "parsingandserver":
      finishedCb = isSupportedLanguage ? parsingBlockFinished(ctx, document, solutionManager.startPosition) : async text => {}, postOptions.extra.force_indent = (_e = contextIndent.prev) != null ? _e : -1, postOptions.extra.trim_by_indentation = !0;
      break;
    case "parsing":
    default:
      finishedCb = isSupportedLanguage ? parsingBlockFinished(ctx, document, solutionManager.startPosition) : async text => {};
      break;
  }
  ctx.get(StatusReporter).setProgress();
  let telemetryData = solutionManager.savedTelemetryData,
    res = await ctx.get(OpenAIFetcher).fetchAndStreamCompletions(ctx, completionParams, telemetryData.extendedBy(), finishedCb, cancellationToken);
  if (res.type === "failed" || res.type === "canceled") return ctx.get(StatusReporter).removeProgress(), {
    status: "FinishedWithError",
    error: `${res.type}: ${res.reason}`
  };
  let choices = res.choices;
  choices = prependChoices(choices, prependToCompletion), indentation !== null && (choices = cleanupIndentChoices(choices, indentation)), choices = asyncIterableMapFilter(choices, async choice => postProcessChoice(ctx, document, insertPosition, choice, !1, solutionsLogger, promptResponse.prompt, actualSuffix));
  let solutions = asyncIterableMapFilter(choices, async apiChoice => {
    let display = apiChoice.completionText;
    solutionsLogger.info(ctx, `Open Copilot completion: [${apiChoice.completionText}]`);
    let displayBefore = "",
      displayStartPos = await getNodeStart(ctx, document, insertPosition, apiChoice.completionText);
    displayStartPos ? [displayBefore] = trimLastLine(document.getText(LocationFactory.range(LocationFactory.position(displayStartPos.line, displayStartPos.character), insertPosition))) : (displayStartPos = LocationFactory.position(insertPosition.line, 0), displayBefore = document.getText(LocationFactory.range(displayStartPos, insertPosition))), display = displayBefore + display;
    let completionText = apiChoice.completionText;
    trailingWs.length > 0 && completionText.startsWith(trailingWs) && (completionText = completionText.substring(trailingWs.length));
    let meanLogProb = apiChoice.meanLogProb,
      meanProb = meanLogProb !== void 0 ? Math.exp(meanLogProb) : 0,
      solutionTelemetryData = telemetryData.extendedBy({
        choiceIndex: apiChoice.choiceIndex.toString()
      });
    return {
      completionText: completionText,
      displayText: display,
      range: LocationFactory.range(displayStartPos, insertPosition),
      meanProb: meanProb,
      meanLogProb: meanLogProb || 0,
      requestId: apiChoice.requestId,
      choiceIndex: apiChoice.choiceIndex,
      prependToCompletion: prependToCompletion,
      telemetryData: solutionTelemetryData
    };
  });
  return generateSolutionsStream(ctx.get(StatusReporter), cancellationToken, solutions[Symbol.asyncIterator]());
},__name(launchSolutions, "launchSolutions");,async function reportSolutions(nextSolutionPromise, solutionHandler) {
  let nextSolution = await nextSolutionPromise;
  switch (nextSolution.status) {
    case "Solution":
      solutionHandler.onSolution(nextSolution.solution), await reportSolutions(nextSolution.next, solutionHandler);
      break;
    case "FinishedNormally":
      solutionHandler.onFinishedNormally();
      break;
    case "FinishedWithError":
      solutionHandler.onFinishedWithError(nextSolution.error);
      break;
  }
},__name(reportSolutions, "reportSolutions");,async function runSolutions(ctx, solutionManager, solutionHandler) {
  let nextSolution = launchSolutions(ctx, solutionManager);
  return await reportSolutions(nextSolution, solutionHandler);
},__name(runSolutions, "runSolutions");,async function generateSolutionsStream(statusReporter, cancellationToken, solutions) {
  if (cancellationToken.isCancellationRequested) return statusReporter.removeProgress(), {
    status: "FinishedWithError",
    error: "Cancelled"
  };
  let nextResult = await solutions.next();
  return nextResult.done === !0 ? (statusReporter.removeProgress(), {
    status: "FinishedNormally"
  }) : {
    status: "Solution",
    solution: nextResult.value,
    next: generateSolutionsStream(statusReporter, cancellationToken, solutions)
  };
},__name(generateSolutionsStream, "generateSolutionsStream");