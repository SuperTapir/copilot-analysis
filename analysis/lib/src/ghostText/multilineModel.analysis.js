async function getGhostText(ctx, document, position, isCycling, preIssuedTelemetryData, cancellationToken, ifInserted) {
  var _a, _b;
  // 生成一个唯一的请求ID
  let ourRequestId = v4_default();
  // 扩展预发的遥测数据
  preIssuedTelemetryData = preIssuedTelemetryData.extendedBy({
      headerRequestId: ourRequestId
  });
  // 获取文档内容，位置偏移，实际后缀，仓库信息，特性过滤参数，特性，预发的遥测数据，提示
  let documentSource = document.getText(),
      positionOffset = document.offsetAt(position),
      actualSuffix = documentSource.substring(positionOffset),
      repoInfo = extractRepoInfoInBackground(ctx, document.uri),
      featuresFilterArgs = await getExPFilters(ctx, document),
      features = ctx.get(Features),
      preIssuedTelemetryDataWithExp = await features.updateExPValuesAndAssignments(featuresFilterArgs, preIssuedTelemetryData),
      prompt = await extractPrompt(ctx, document, position, preIssuedTelemetryDataWithExp, ifInserted);
  // 如果Copilot不可用，返回相应的信息
  if (prompt.type === "copilotNotAvailable") return ghostTextLogger.debug(ctx, "Copilot not available, due to content exclusion"), {
      type: "abortedBeforeIssued",
      reason: "Copilot not available due to content exclusion"
  };
  // 如果上下文太短，返回相应的信息
  if (prompt.type === "contextTooShort") return ghostTextLogger.debug(ctx, "Breaking, not enough context"), {
      type: "abortedBeforeIssued",
      reason: "Not enough context"
  };
  // 如果请求被取消，返回相应的信息
  if (cancellationToken != null && cancellationToken.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled after extractPrompt"), {
      type: "abortedBeforeIssued",
      reason: "Cancelled after extractPrompt"
  };
  // 检查是否是行内建议
  let inlineSuggestion = isInlineSuggestion(document, position);
  if (inlineSuggestion === void 0) return ghostTextLogger.debug(ctx, "Breaking, invalid middle of the line"), {
      type: "abortedBeforeIssued",
      reason: "Invalid middle of the line"
  };
  // 获取状态栏项目和ghost文本策略
  let statusBarItem = ctx.get(StatusReporter),
      ghostTextStrategy = await getGhostTextStrategy(ctx, document, position, prompt, isCycling, inlineSuggestion, preIssuedTelemetryDataWithExp);
  // 如果请求被取消，返回相应的信息
  if (cancellationToken != null && cancellationToken.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled after requestMultiline"), {
      type: "abortedBeforeIssued",
      reason: "Cancelled after requestMultiline"
  };
  // 获取前缀，本地行内建议，引擎URL，延迟毫秒数，多logit偏差，请求上下文
  let [prefix] = trimLastLine(document.getText(LocationFactory.range(LocationFactory.position(0, 0), position))),
      choices = getLocalInlineSuggestion(ctx, prefix, prompt.prompt, ghostTextStrategy.requestMultiline),
      engineURL = await getEngineURL(ctx, preIssuedTelemetryDataWithExp),
      delayMs = features.beforeRequestWaitMs(preIssuedTelemetryDataWithExp),
      multiLogitBias = features.multiLogitBias(preIssuedTelemetryDataWithExp),
      requestContext = {
          blockMode: ghostTextStrategy.blockMode,
          languageId: document.languageId,
          repoInfo: repoInfo,
          engineURL: engineURL,
          ourRequestId: ourRequestId,
          prefix: prefix,
          prompt: prompt.prompt,
          multiline: ghostTextStrategy.requestMultiline,
          indentation: contextIndentation(document, position),
          isCycling: isCycling,
          delayMs: delayMs,
          multiLogitBias: multiLogitBias
      },
      debouncePredict = features.debouncePredict(preIssuedTelemetryDataWithExp),
      contextualFilterEnable = features.contextualFilterEnable(preIssuedTelemetryDataWithExp),
      contextualFilterAcceptThreshold = features.contextualFilterAcceptThreshold(preIssuedTelemetryDataWithExp),
      contextualFilterEnableTree = features.contextualFilterEnableTree(preIssuedTelemetryDataWithExp),
      contextualFilterExplorationTraffic = features.contextualFilterExplorationTraffic(preIssuedTelemetryDataWithExp),
      computeContextualFilterScore = !1;
  // 如果需要防抖预测或启用上下文过滤，计算上下文过滤分数
  (debouncePredict || contextualFilterEnable) && (computeContextualFilterScore = !0);
  // 获取遥测数据
  let telemetryData = telemetryIssued(ctx, document, requestContext, position, prompt, preIssuedTelemetryDataWithExp, computeContextualFilterScore, contextualFilterEnableTree);
  // 如果是循环请求并且有多个选择，或者不是循环请求并且有选择，记录日志
  if (ghostTextStrategy.isCyclingRequest && ((_a = choices == null ? void 0 : choices[0].length) != null ? _a : 0) > 1 || !ghostTextStrategy.isCyclingRequest && choices !== void 0) ghostTextLogger.debug(ctx, "Found inline suggestions locally");
  else {
      // 如果状态栏项目存在，设置进度
      if (statusBarItem == null || statusBarItem.setProgress(), ghostTextStrategy.isCyclingRequest) {
          // 获取所有网络完成的选择
          let networkChoices = await getAllCompletionsFromNetwork(ctx, requestContext, telemetryData, cancellationToken, ghostTextStrategy.finishedCb);
          // 如果网络选择成功，将结果添加到结果选择中
          if (networkChoices.type === "success") {
              let resultChoices = (_b = choices == null ? void 0 : choices[0]) != null ? _b : [];
              networkChoices.value.forEach(c => {
                  resultChoices.findIndex(v => v.completionText.trim() === c.completionText.trim()) === -1 && resultChoices.push(c);
              }), choices = [resultChoices, 3];
          } else if (choices === void 0) return statusBarItem == null || statusBarItem.removeProgress(), networkChoices;
      } else {
          // 获取防抖限制
          let debounceLimit = await getDebounceLimit(ctx, telemetryData);
          try {
              // 防抖
              await ghostTextDebouncer.debounce(debounceLimit);
          } catch {
              // 如果防抖失败，返回取消的结果
              return {
                  type: "canceled",
                  reason: "by debouncer",
                  telemetryData: mkCanceledResultTelemetry(telemetryData)
              };
          }
          // 如果请求被取消，返回相应的信息
          if (cancellationToken != null && cancellationToken.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled during debounce"), {
              type: "canceled",
              reason: "during debounce",
              telemetryData: mkCanceledResultTelemetry(telemetryData)
          };
          // 如果启用上下文过滤并且上下文过滤分数低于阈值，返回相应的信息
          if (contextualFilterEnable && telemetryData.measurements.contextualFilterScore && telemetryData.measurements.contextualFilterScore < contextualFilterAcceptThreshold / 100 && Math.random() < 1 - contextualFilterExplorationTraffic / 100) return ghostTextLogger.debug(ctx, "Cancelled by contextual filter"), {
              type: "canceled",
              reason: "contextualFilterScore below threshold",
              telemetryData: mkCanceledResultTelemetry(telemetryData)
          };
          // 获取网络完成的选择
          let c = await getCompletionsFromNetwork(ctx, requestContext, telemetryData, cancellationToken, ghostTextStrategy.finishedCb);
          // 如果获取失败，返回相应的信息
          if (c.type !== "success") return statusBarItem == null || statusBarItem.removeProgress(), c;
          choices = [
              [c.value], 0
          ];
      }
      // 如果状态栏项目存在，移除进度
      statusBarItem == null || statusBarItem.removeProgress();
  }
  // 如果没有选择，返回失败的信息
  if (choices === void 0) return {
      type: "failed",
      reason: "internal error: choices should be defined after network call",
      telemetryData: mkBasicResultTelemetry(telemetryData)
  };
  // 获取选择数组和结果类型，处理选择，获取结果
  let [choicesArray, resultType] = choices,
  postProcessedChoices = asyncIterableMapFilter(asyncIterableFromArray(choicesArray), async choice => postProcessChoice(ctx, document, position, choice, inlineSuggestion, ghostTextLogger, prompt.prompt, actualSuffix)),
      results = [];
  // 对每个处理过的选择进行处理
  for await (let choice of postProcessedChoices) {
      // 如果请求被取消，返回相应的信息
      if (cancellationToken != null && cancellationToken.isCancellationRequested) return ghostTextLogger.debug(ctx, "Cancelled after post processing completions"), {
          type: "canceled",
          reason: "after post processing completions",
          telemetryData: mkCanceledResultTelemetry(telemetryData)
      };
      // 获取选择的遥测数据，后缀覆盖，结果
      let choiceTelemetryData = telemetryWithAddData(ctx, choice),
          suffixCoverage = inlineSuggestion ? checkSuffix(document, position, choice) : 0,
          res = {
              completion: adjustLeadingWhitespace(choice.choiceIndex, choice.completionText, prompt.trailingWs),
              telemetry: choiceTelemetryData,
              isMiddleOfTheLine: inlineSuggestion,
              suffixCoverage: suffixCoverage
          };
      // 将结果添加到结果中
      results.push(res);
  }
  // 返回成功的结果，结果和结果类型，遥测数据
  return {
      type: "success",
      value: [results, resultType],
      telemetryData: mkBasicResultTelemetry(telemetryData),
      telemetryBlob: telemetryData
  };
}