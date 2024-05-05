var streamChoicesLogger = new Logger(1, "streamChoices"),
  _APIJsonDataStreaming = class _APIJsonDataStreaming {
    constructor() {
      this.logprobs = [];
      this.top_logprobs = [];
      this.text = [];
      this.tokens = [];
      this.text_offset = [];
      this.copilot_annotations = new StreamCopilotAnnotations();
      this.function_call = new StreamingFunctionCall();
    }
    append(choice) {
      var _a, _b, _c, _d, _e, _f, _g;
      choice.text && this.text.push(choice.text), (_a = choice.delta) != null && _a.content && this.text.push(choice.delta.content), choice.logprobs && (this.tokens.push((_b = choice.logprobs.tokens) != null ? _b : []), this.text_offset.push((_c = choice.logprobs.text_offset) != null ? _c : []), this.logprobs.push((_d = choice.logprobs.token_logprobs) != null ? _d : []), this.top_logprobs.push((_e = choice.logprobs.top_logprobs) != null ? _e : [])), choice.copilot_annotations && this.copilot_annotations.update(choice.copilot_annotations), (_f = choice.delta) != null && _f.copilot_annotations && this.copilot_annotations.update(choice.delta.copilot_annotations), (_g = choice.delta) != null && _g.function_call && this.function_call.update(choice.delta.function_call);
    }
  };,__name(_APIJsonDataStreaming, "APIJsonDataStreaming");,var APIJsonDataStreaming = _APIJsonDataStreaming;,function splitChunk(chunk) {
  let dataLines = chunk.split(`
`),
    newExtra = dataLines.pop();
  return [dataLines.filter(line => line != ""), newExtra];
},__name(splitChunk, "splitChunk");,var _StreamingFunctionCall = class _StreamingFunctionCall {
  constructor() {
    this.arguments = [];
  }
  update(functionCall) {
    functionCall.name && (this.name = functionCall.name), this.arguments.push(functionCall.arguments);
  }
};,__name(_StreamingFunctionCall, "StreamingFunctionCall");,var StreamingFunctionCall = _StreamingFunctionCall,
  _StreamCopilotAnnotations = class _StreamCopilotAnnotations {
    constructor() {
      this.current = {};
    }
    update(annotations) {
      Object.entries(annotations).forEach(([namespace, annotations]) => {
        annotations.forEach(a => this.update_namespace(namespace, a));
      });
    }
    update_namespace(namespace, annotation) {
      this.current[namespace] || (this.current[namespace] = []);
      let annotationToUpdate = this.current[namespace],
        index = annotationToUpdate.findIndex(a => a.id === annotation.id);
      index >= 0 ? annotationToUpdate[index] = annotation : annotationToUpdate.push(annotation);
    }
    for(namespace) {
      var _a;
      return (_a = this.current[namespace]) != null ? _a : [];
    }
  };,__name(_StreamCopilotAnnotations, "StreamCopilotAnnotations");,var StreamCopilotAnnotations = _StreamCopilotAnnotations,
  _SSEProcessor = class _SSEProcessor {
    constructor(ctx, expectedNumChoices, response, body, telemetryData, dropCompletionReasons, fastCancellation, cancellationToken) {
      this.ctx = ctx;
      this.expectedNumChoices = expectedNumChoices;
      this.response = response;
      this.body = body;
      this.telemetryData = telemetryData;
      this.dropCompletionReasons = dropCompletionReasons;
      this.fastCancellation = fastCancellation;
      this.cancellationToken = cancellationToken;
      this.requestId = getRequestId(this.response);
      this.stats = new ChunkStats(this.expectedNumChoices);
      this.solutions = {};
    }
    static async create(ctx, expectedNumChoices, response, telemetryData, dropCompletionReasons, cancellationToken) {
      let body = await response.body();
      body.setEncoding("utf8");
      let fastCancellation = ctx.get(Features).fastCancellation(telemetryData);
      return new _SSEProcessor(ctx, expectedNumChoices, response, body, telemetryData, dropCompletionReasons != null ? dropCompletionReasons : ["content_filter"], fastCancellation, cancellationToken);
    }
    async *processSSE(finishedCb = async () => {}) {
      try {
        yield* this.processSSEInner(finishedCb);
      } finally {
        this.fastCancellation && this.cancel(), streamChoicesLogger.info(this.ctx, `request done: headerRequestId: [${this.requestId.headerRequestId}] model deployment ID: [${this.requestId.deploymentId}]`), streamChoicesLogger.debug(this.ctx, `request stats: ${this.stats}`);
      }
    }
    async *processSSEInner(finishedCb) {
      var _a, _b, _c, _d;
      let extraData = "";
      networkRead: for await (let chunk of this.body) {
        if (this.maybeCancel("after awaiting body chunk")) return;
        streamChoicesLogger.debug(this.ctx, "chunk", chunk.toString());
        let [dataLines, remainder] = splitChunk(extraData + chunk.toString());
        extraData = remainder;
        for (let dataLine of dataLines) {
          let lineWithoutData = dataLine.slice(5).trim();
          if (lineWithoutData == "[DONE]") {
            yield* this.finishSolutions();
            return;
          }
          let json;
          try {
            json = JSON.parse(lineWithoutData);
          } catch {
            streamChoicesLogger.error(this.ctx, "Error parsing JSON stream data", dataLine);
            continue;
          }
          if (json.choices === void 0) {
            json.error !== void 0 ? streamChoicesLogger.error(this.ctx, "Error in response:", json.error.message) : streamChoicesLogger.error(this.ctx, "Unexpected response with no choices or error: " + lineWithoutData);
            continue;
          }
          if (this.requestId.created == 0 && (this.requestId = getRequestId(this.response, json), this.requestId.created == 0 && streamChoicesLogger.error(this.ctx, `Request id invalid, should have "completionId" and "created": ${this.requestId}`, this.requestId)), this.allSolutionsDone() && this.fastCancellation) break networkRead;
          for (let i = 0; i < json.choices.length; i++) {
            let choice = json.choices[i];
            streamChoicesLogger.debug(this.ctx, "choice", choice), this.stats.add(choice.index), choice.index in this.solutions || (this.solutions[choice.index] = new APIJsonDataStreaming());
            let solution = this.solutions[choice.index];
            if (solution == null) continue;
            solution.append(choice);
            let finishOffset,
              hasNewLine = ((_a = choice.text) == null ? void 0 : _a.indexOf(`
`)) > -1 || ((_c = (_b = choice.delta) == null ? void 0 : _b.content) == null ? void 0 : _c.indexOf(`
`)) > -1;
            if ((choice.finish_reason || hasNewLine) && (finishOffset = await finishedCb(solution.text.join(""), solution.copilot_annotations), this.maybeCancel("after awaiting finishedCb"))) return;
            if (!(choice.finish_reason || finishOffset !== void 0)) continue;
            let loggedReason = (_d = choice.finish_reason) != null ? _d : "client-trimmed";
            if (telemetry(this.ctx, "completion.finishReason", this.telemetryData.extendedBy({
              completionChoiceFinishReason: loggedReason
            })), this.dropCompletionReasons.includes(choice.finish_reason) ? this.solutions[choice.index] = null : (this.stats.markYielded(choice.index), yield {
              solution: solution,
              finishOffset: finishOffset,
              reason: choice.finish_reason,
              requestId: this.requestId,
              index: choice.index
            }), this.maybeCancel("after yielding finished choice")) return;
            this.solutions[choice.index] = null;
          }
        }
      }
      for (let [index, solution] of Object.entries(this.solutions)) {
        let solutionIndex = Number(index);
        if (solution != null && (this.stats.markYielded(solutionIndex), yield {
          solution: solution,
          finishOffset: void 0,
          reason: "Iteration Done",
          requestId: this.requestId,
          index: solutionIndex
        }, this.maybeCancel("after yielding after iteration done"))) return;
      }
      if (extraData.length > 0) try {
        let extraDataJson = JSON.parse(extraData);
        extraDataJson.error !== void 0 && streamChoicesLogger.error(this.ctx, `Error in response: ${extraDataJson.error.message}`, extraDataJson.error);
      } catch {
        streamChoicesLogger.error(this.ctx, `Error parsing extraData: ${extraData}`);
      }
    }
    async *finishSolutions() {
      for (let [index, solution] of Object.entries(this.solutions)) {
        let solutionIndex = Number(index);
        if (solution != null && (this.stats.markYielded(solutionIndex), yield {
          solution: solution,
          finishOffset: void 0,
          reason: "DONE",
          requestId: this.requestId,
          index: solutionIndex
        }, this.maybeCancel("after yielding on DONE"))) return;
      }
    }
    maybeCancel(description) {
      var _a;
      return (_a = this.cancellationToken) != null && _a.isCancellationRequested ? (streamChoicesLogger.debug(this.ctx, "Cancelled: " + description), this.cancel(), !0) : !1;
    }
    cancel() {
      this.body.destroy();
    }
    allSolutionsDone() {
      let solutions = Object.values(this.solutions);
      return solutions.length == this.expectedNumChoices && solutions.every(s => s == null);
    }
  };,__name(_SSEProcessor, "SSEProcessor");,var SSEProcessor = _SSEProcessor;,function prepareSolutionForReturn(ctx, c, telemetryData) {
  let completionText = c.solution.text.join(""),
    blockFinished = !1;
  c.finishOffset !== void 0 && (streamChoicesLogger.debug(ctx, `solution ${c.index}: early finish at offset ${c.finishOffset}`), completionText = completionText.substring(0, c.finishOffset), blockFinished = !0), streamChoicesLogger.info(ctx, `solution ${c.index} returned. finish reason: [${c.reason}]`), streamChoicesLogger.debug(ctx, `solution ${c.index} details: finishOffset: [${c.finishOffset}] completionId: [{${c.requestId.completionId}}] created: [{${c.requestId.created}}]`);
  let jsonData = convertToAPIJsonData(c.solution);
  return convertToAPIChoice(ctx, completionText, jsonData, c.index, c.requestId, blockFinished, telemetryData);
},__name(prepareSolutionForReturn, "prepareSolutionForReturn");,function convertToAPIJsonData(streamingData) {
  let joinedText = streamingData.text.join(""),
    functionCall = extractFunctionCall(streamingData),
    out = {
      text: joinedText,
      tokens: streamingData.text,
      function_call: functionCall
    };
  if (streamingData.logprobs.length === 0) return out;
  let flattenedLogprobs = streamingData.logprobs.reduce((acc, cur) => acc.concat(cur), []),
    flattenedTopLogprobs = streamingData.top_logprobs.reduce((acc, cur) => acc.concat(cur), []),
    flattenedOffsets = streamingData.text_offset.reduce((acc, cur) => acc.concat(cur), []),
    flattenedTokens = streamingData.tokens.reduce((acc, cur) => acc.concat(cur), []);
  return {
    ...out,
    logprobs: {
      token_logprobs: flattenedLogprobs,
      top_logprobs: flattenedTopLogprobs,
      text_offset: flattenedOffsets,
      tokens: flattenedTokens
    }
  };
},__name(convertToAPIJsonData, "convertToAPIJsonData");,function extractFunctionCall(streamingData) {
  if (streamingData.function_call.name) {
    let args = streamingData.function_call.arguments.length > 0 ? JSON.parse(streamingData.function_call.arguments.join("")) : [];
    return {
      name: streamingData.function_call.name,
      arguments: args
    };
  }
},__name(extractFunctionCall, "extractFunctionCall");,var _ChunkStats = class _ChunkStats {
  constructor(expectedNumChoices) {
    this.choices = new Map();
    for (let i = 0; i < expectedNumChoices; i++) this.choices.set(i, new ChoiceStats());
  }
  add(choiceIndex) {
    this.choices.get(choiceIndex).increment();
  }
  markYielded(choiceIndex) {
    this.choices.get(choiceIndex).markYielded();
  }
  toString() {
    return Array.from(this.choices.entries()).map(([index, stats]) => `${index}: ${stats.yieldedTokens} -> ${stats.seenTokens}`).join(", ");
  }
};,__name(_ChunkStats, "ChunkStats");,var ChunkStats = _ChunkStats,
  _ChoiceStats = class _ChoiceStats {
    constructor() {
      this.yieldedTokens = -1;
      this.seenTokens = 0;
    }
    increment() {
      this.seenTokens++;
    }
    markYielded() {
      this.yieldedTokens = this.seenTokens;
    }
  };,__name(_ChoiceStats, "ChoiceStats");,var ChoiceStats = _ChoiceStats;,var logger = new Logger(1, "fetchCompletions");,function getRequestId(response, json) {
  return {
    headerRequestId: response.headers.get("x-request-id") || "",
    completionId: json && json.id ? json.id : "",
    created: json && json.created ? json.created : 0,
    serverExperiments: response.headers.get("X-Copilot-Experiment") || "",
    deploymentId: response.headers.get("azureml-model-deployment") || ""
  };
},__name(getRequestId, "getRequestId");,function getProcessingTime(response) {
  let reqIdStr = response.headers.get("openai-processing-ms");
  return reqIdStr ? parseInt(reqIdStr, 10) : 0;
},__name(getProcessingTime, "getProcessingTime");,function extractEngineName(ctx, engineUrl) {
  let engineName = engineUrl.split("/").pop();
  return engineName || (logger.error(ctx, "Malformed engine URL: " + engineUrl), engineUrl);
},__name(extractEngineName, "extractEngineName");,function uiKindToIntent(uiKind) {
  switch (uiKind) {
    case "ghostText":
      return "copilot-ghost";
    case "synthesize":
      return "copilot-panel";
  }
},__name(uiKindToIntent, "uiKindToIntent");,var _OpenAIFetcher = class _OpenAIFetcher {};,__name(_OpenAIFetcher, "OpenAIFetcher");,var OpenAIFetcher = _OpenAIFetcher;,function fetchWithInstrumentation(ctx, prompt, engineUrl, endpoint, ourRequestId, request, secretKey, uiKind, cancel, telemetryProperties) {
  var _a;
  let statusReporter = ctx.get(StatusReporter),
    uri = oD.format("%s/%s", engineUrl, endpoint);
  if (!secretKey) {
    logger.error(ctx, `Failed to send request to ${uri} due to missing key`);
    return;
  }
  let telemetryData = TelemetryData.createAndMarkAsIssued({
    endpoint: endpoint,
    engineName: extractEngineName(ctx, engineUrl),
    uiKind: uiKind
  }, telemetrizePromptLength(prompt));
  telemetryProperties && (telemetryData = telemetryData.extendedBy(telemetryProperties));
  for (let [key, value] of Object.entries(request)) key == "prompt" || key == "suffix" || (telemetryData.properties[`request.option.${key}`] = (_a = JSON.stringify(value)) != null ? _a : "undefined");
  telemetryData.properties.headerRequestId = ourRequestId, telemetry(ctx, "request.sent", telemetryData);
  let requestStart = now(),
    intent = uiKindToIntent(uiKind);
  return postRequest(ctx, uri, secretKey, intent, ourRequestId, request, cancel).then(response => {
    let modelRequestId = getRequestId(response, void 0);
    telemetryData.extendWithRequestId(modelRequestId);
    let totalTimeMs = now() - requestStart;
    return telemetryData.measurements.totalTimeMs = totalTimeMs, logger.info(ctx, `request.response: [${uri}] took ${totalTimeMs} ms`), logger.debug(ctx, "request.response properties", telemetryData.properties), logger.debug(ctx, "request.response measurements", telemetryData.measurements), logger.debug(ctx, "prompt:", prompt), telemetry(ctx, "request.response", telemetryData), response;
  }).catch(error => {
    var _a, _b, _c, _d;
    if (isAbortError(error)) throw error;
    statusReporter.setWarning(error.message);
    let warningTelemetry = telemetryData.extendedBy({
      error: "Network exception"
    });
    telemetry(ctx, "request.shownWarning", warningTelemetry), telemetryData.properties.message = String((_a = error.name) != null ? _a : ""), telemetryData.properties.code = String((_b = error.code) != null ? _b : ""), telemetryData.properties.errno = String((_c = error.errno) != null ? _c : ""), telemetryData.properties.type = String((_d = error.type) != null ? _d : "");
    let totalTimeMs = now() - requestStart;
    throw telemetryData.measurements.totalTimeMs = totalTimeMs, logger.debug(ctx, `request.response: [${uri}] took ${totalTimeMs} ms`), logger.debug(ctx, "request.error properties", telemetryData.properties), logger.debug(ctx, "request.error measurements", telemetryData.measurements), telemetry(ctx, "request.error", telemetryData), error;
  }).finally(() => {
    logEnginePrompt(ctx, prompt, telemetryData);
  });
},__name(fetchWithInstrumentation, "fetchWithInstrumentation");,function postProcessChoices(choices, allowEmptyChoices) {
  return allowEmptyChoices != null && allowEmptyChoices ? choices : asyncIterableFilter(choices, async choice => choice.completionText.trim().length > 0);
},__name(postProcessChoices, "postProcessChoices");,var _LiveOpenAIFetcher = class _LiveOpenAIFetcher extends OpenAIFetcher {
  async fetchAndStreamCompletions(ctx, params, baseTelemetryData, finishedCb, cancel, telemetryProperties) {
    let statusReporter = ctx.get(StatusReporter),
      endpoint = "completions",
      response = await this.fetchWithParameters(ctx, endpoint, params, baseTelemetryData, cancel, telemetryProperties);
    if (response === "not-sent") return {
      type: "canceled",
      reason: "before fetch request"
    };
    if (cancel != null && cancel.isCancellationRequested) {
      let body = await response.body();
      try {
        body.destroy();
      } catch (e) {
        logger.exception(ctx, e, "Error destroying stream");
      }
      return {
        type: "canceled",
        reason: "after fetch request"
      };
    }
    if (response === void 0) {
      let telemetryData = this.createTelemetryData(endpoint, ctx, params);
      return statusReporter.setWarning(), telemetryData.properties.error = "Response was undefined", telemetry(ctx, "request.shownWarning", telemetryData), {
        type: "failed",
        reason: "fetch response was undefined"
      };
    }
    if (response.status !== 200) {
      let telemetryData = this.createTelemetryData(endpoint, ctx, params);
      return this.handleError(ctx, statusReporter, telemetryData, response);
    }
    let dropCompletionReasons = ctx.get(Features).dropCompletionReasons(baseTelemetryData),
      finishedCompletions = (await SSEProcessor.create(ctx, params.count, response, baseTelemetryData, dropCompletionReasons, cancel)).processSSE(finishedCb),
      choices = asyncIterableMap(finishedCompletions, async solution => prepareSolutionForReturn(ctx, solution, baseTelemetryData));
    return {
      type: "success",
      choices: postProcessChoices(choices, params.allowEmptyChoices),
      getProcessingTime: () => getProcessingTime(response)
    };
  }
  createTelemetryData(endpoint, ctx, params) {
    return TelemetryData.createAndMarkAsIssued({
      endpoint: endpoint,
      engineName: extractEngineName(ctx, params.engineUrl),
      uiKind: params.uiKind,
      headerRequestId: params.ourRequestId
    });
  }
  async fetchWithParameters(ctx, endpoint, params, baseTelemetryData, cancel, telemetryProperties) {
    let disableLogProb = ctx.get(Features).disableLogProb(baseTelemetryData),
      request = {
        prompt: params.prompt.prefix,
        suffix: params.prompt.suffix,
        max_tokens: getMaxSolutionTokens(ctx),
        temperature: getTemperatureForSamples(ctx, params.count),
        top_p: getTopP(ctx),
        n: params.count,
        stop: getStops(ctx, params.languageId)
      };
    (params.requestLogProbs || !disableLogProb) && (request.logprobs = 2);
    let githubNWO = tryGetGitHubNWO(params.repoInfo);
    return githubNWO !== void 0 && (request.nwo = githubNWO), params.postOptions && Object.assign(request, params.postOptions), await new Promise((resolve, _reject) => {
      setImmediate(resolve);
    }), cancel != null && cancel.isCancellationRequested ? "not-sent" : await fetchWithInstrumentation(ctx, params.prompt, params.engineUrl, endpoint, params.ourRequestId, request, (await ctx.get(CopilotTokenManager).getCopilotToken(ctx)).token, params.uiKind, cancel, telemetryProperties);
  }
  async handleError(ctx, statusReporter, telemetryData, response) {
    if (statusReporter.setWarning(), telemetryData.properties.error = `Response status was ${response.status}`, telemetryData.properties.status = String(response.status), telemetry(ctx, "request.shownWarning", telemetryData), response.status === 401 || response.status === 403) return ctx.get(CopilotTokenManager).resetCopilotToken(ctx, response.status), {
      type: "failed",
      reason: `token expired or invalid: ${response.status}`
    };
    if (response.status === 499) return logger.info(ctx, "Cancelled by server"), {
      type: "failed",
      reason: "canceled by server"
    };
    let text = await response.text();
    return response.status === 466 ? (statusReporter.setError(text), logger.info(ctx, text), {
      type: "failed",
      reason: `client not supported: ${text}`
    }) : (logger.error(ctx, "Unhandled status from server:", response.status, text), {
      type: "failed",
      reason: `unhandled status from server: ${response.status} ${text}`
    });
  }
};,__name(_LiveOpenAIFetcher, "LiveOpenAIFetcher");,var LiveOpenAIFetcher = _LiveOpenAIFetcher;