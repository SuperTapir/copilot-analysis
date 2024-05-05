var import_os = require("os"),
  path = bn(require("path"));,function redactPaths(input) {
  return input.replace(/(file:\/\/)([^\s<>]+)/gi, "$1[redacted]").replace(/(^|[\s|:=(<'"`])((?:\/(?=[^/])|\\|[a-zA-Z]:[\\/])[^\s:)>'"`]+)/g, "$1[redacted]");
},__name(redactPaths, "redactPaths");,var knownErrorLiterals = new Set(["Maximum call stack size exceeded", "Set maximum size exceeded", "Invalid arguments"]),
  knownErrorPatterns = [/^[\p{L}\p{Nl}$\p{Mn}\p{Mc}\p{Nd}\p{Pc}.]+ is not a function[ \w]*$/, /^Cannot read properties of undefined \(reading '[\p{L}\p{Nl}$\p{Mn}\p{Mc}\p{Nd}\p{Pc}]+'\)$/];,function redactMessage(input) {
  if (knownErrorLiterals.has(input)) return input;
  for (let pattern of knownErrorPatterns) if (pattern.test(input)) return input;
  return redactPaths(input).replace(/\bDNS:(?:\*\.)?[\w.-]+/gi, "DNS:[redacted]");
},__name(redactMessage, "redactMessage");,function escapeForRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
},__name(escapeForRegExp, "escapeForRegExp");,var homedirRegExp = new RegExp("(?<=^|[\\s|(\"'`]|file://)" + escapeForRegExp((0, dk.homedir)()) + "(?=$|[\\\\/:\"'`])", "gi");,function redactHomeDir(input) {
  return input.replace(homedirRegExp, "~");
},__name(redactHomeDir, "redactHomeDir");,var relativePathSuffix = "[\\\\/]?([^:)]*)(?=:\\d)",
  pathSepRegExp = new RegExp(escapeForRegExp(hk.sep), "g"),
  rootDirRegExp = new RegExp(escapeForRegExp(__dirname.replace(/[\\/]lib[\\/]src[\\/]util$|[\\/]dist$/, "")) + relativePathSuffix, "gi");,function cloneError(original, prepareMessage, allowUnknownPaths = !1, replacements = []) {
  var _a;
  let error = new Error(prepareMessage(original));
  error.name = original.name, typeof original.syscall == "string" && (error.syscall = original.syscall), typeof original.code == "string" && (error.code = original.code), typeof original.errno == "number" && (error.errno = original.errno), error.stack = void 0;
  let originalStack = (_a = original.stack) == null ? void 0 : _a.replace(/^.*?:\d+\n.*\n *\^?\n\n/, ""),
    stackFrames;
  for (let stackPrefix of [original.toString(), `${original.name}: ${original.message}`]) if (originalStack != null && originalStack.startsWith(stackPrefix + `
`)) {
    stackFrames = originalStack.slice(stackPrefix.length + 1).split(/\n/);
    break;
  }
  if (stackFrames) {
    error.stack = error.toString();
    for (let frame of stackFrames) if (rootDirRegExp.test(frame)) error.stack += `
${redactPaths(frame.replace(rootDirRegExp, (_, relative) => "./" + relative.replace(pathSepRegExp, "/")))}`;else if (/[ (]node:|[ (]wasm:\/\/wasm\/| \(<anonymous>\)$/.test(frame)) error.stack += `
${redactPaths(frame)}`;else {
      let found = !1;
      for (let {
        prefix: prefix,
        path: dir
      } of replacements) {
        let dirRegExp = new RegExp(escapeForRegExp(dir.replace(/[\\/]$/, "")) + relativePathSuffix, "gi");
        if (dirRegExp.test(frame)) {
          error.stack += `
${redactPaths(frame.replace(dirRegExp, (_, relative) => prefix + relative.replace(pathSepRegExp, "/")))}`, found = !0;
          break;
        }
      }
      if (found) continue;
      allowUnknownPaths ? error.stack += `
${redactHomeDir(frame)}` : error.stack += `
    at [redacted]:0:0`;
    }
  } else allowUnknownPaths && originalStack && (error.stack = redactHomeDir(originalStack));
  return original.cause instanceof Error && (error.cause = cloneError(original.cause, prepareMessage, allowUnknownPaths, replacements)), error;
},__name(cloneError, "cloneError");,function errorMessageWithoutPath(error) {
  let message = error.message;
  return typeof error.path == "string" && error.path.length > 0 && (message = message.replaceAll(error.path, "<path>")), message;
},__name(errorMessageWithoutPath, "errorMessageWithoutPath");,function prepareErrorForRestrictedTelemetry(original, replacements) {
  return cloneError(original, __name(function (e) {
    return redactHomeDir(errorMessageWithoutPath(e));
  }, "prepareMessage"), !0, replacements);
},__name(prepareErrorForRestrictedTelemetry, "prepareErrorForRestrictedTelemetry");,function redactError(original, replacements, telemetryOptIn = !1) {
  return cloneError(original, __name(function (e) {
    if (telemetryOptIn) return redactMessage(errorMessageWithoutPath(e));
    let message = "[redacted]";
    return e.syscall && e.code !== void 0 ? message = `${redactPaths(e.syscall.toString())} ${e.code} ${message}` : e instanceof FetchError && e.erroredSysCall && e.code !== void 0 ? message = `${e.erroredSysCall} ${e.code} ${message}` : e.code !== void 0 && (message = `${e.code} ${message}`), message;
  }, "prepareMessage"), !1, replacements);
},__name(redactError, "redactError");,function isRestricted(store) {
  return store === 1;
},__name(isRestricted, "isRestricted");,var ftTelemetryEvents = ["engine.prompt", "engine.completion", "ghostText.capturedAfterAccepted", "ghostText.capturedAfterRejected"];,var _TelemetryReporters = class _TelemetryReporters {
  getReporter(ctx, store = 0) {
    return isRestricted(store) ? this.getRestrictedReporter(ctx) : this.reporter;
  }
  getRestrictedReporter(ctx) {
    if (shouldSendRestricted(ctx)) return this.reporterRestricted;
    if (shouldFailForDebugPurposes(ctx)) return new FailingTelemetryReporter();
  }
  getFTReporter(ctx) {
    if (shouldSendFinetuningTelemetry(ctx)) return this.reporterFT;
    if (shouldFailForDebugPurposes(ctx)) return new FailingTelemetryReporter();
  }
  setReporter(reporter) {
    this.reporter = reporter;
  }
  setRestrictedReporter(reporter) {
    this.reporterRestricted = reporter;
  }
  setFTReporter(reporter) {
    this.reporterFT = reporter;
  }
  async deactivate() {
    let disposeReporter = Promise.resolve();
    this.reporter && (disposeReporter = this.reporter.dispose(), this.reporter = void 0);
    let disposeReporterRestricted = Promise.resolve();
    this.reporterRestricted && (disposeReporterRestricted = this.reporterRestricted.dispose(), this.reporterRestricted = void 0);
    let disposeReporterFT = Promise.resolve();
    this.reporterFT && (disposeReporterFT = this.reporterFT.dispose(), this.reporterFT = void 0), await Promise.all([disposeReporter, disposeReporterRestricted, disposeReporterFT]);
  }
};,__name(_TelemetryReporters, "TelemetryReporters");,var TelemetryReporters = _TelemetryReporters,
  propertiesSchema = Cu.Type.Object({}, {
    additionalProperties: Cu.Type.String()
  }),
  measurementsSchema = Cu.Type.Object({
    meanLogProb: Cu.Type.Optional(Cu.Type.Number()),
    meanAlternativeLogProb: Cu.Type.Optional(Cu.Type.Number())
  }, {
    additionalProperties: Cu.Type.Number()
  }),
  oomCodes = new Set(["ERR_WORKER_OUT_OF_MEMORY", "ENOMEM"]);,function isOomError(error) {
  var _a;
  return oomCodes.has((_a = error.code) != null ? _a : "") || error.name === "RangeError" && error.message === "WebAssembly.Memory(): could not allocate memory";
},__name(isOomError, "isOomError");,function getErrorType(error) {
  return isNetworkError(error) ? "network" : isOomError(error) || error.code === "EMFILE" || error.code === "ENFILE" || error.syscall === "uv_cwd" && (error.code === "ENOENT" || error.code == "EIO") || error.code === "CopilotPromptLoadFailure" || `${error.code}`.startsWith("CopilotPromptWorkerExit") ? "local" : "exception";
},__name(getErrorType, "getErrorType");,var _TelemetryData = class _TelemetryData {
  constructor(properties, measurements, issuedTime) {
    this.properties = properties, this.measurements = measurements, this.issuedTime = issuedTime;
  }
  static createAndMarkAsIssued(properties, measurements) {
    return new _TelemetryData(properties || {}, measurements || {}, now());
  }
  extendedBy(properties, measurements) {
    let newProperties = {
        ...this.properties,
        ...properties
      },
      newMeasurements = {
        ...this.measurements,
        ...measurements
      },
      newData = new _TelemetryData(newProperties, newMeasurements, this.issuedTime);
    return newData.displayedTime = this.displayedTime, newData;
  }
  markAsDisplayed() {
    this.displayedTime === void 0 && (this.displayedTime = now());
  }
  async extendWithExpTelemetry(ctx) {
    let {
      filters: filters,
      exp: exp
    } = await ctx.get(Features).getFallbackExpAndFilters();
    exp.addToTelemetry(this), filters.addToTelemetry(this);
  }
  extendWithEditorAgnosticFields(ctx) {
    this.properties.editor_version = formatNameAndVersion(ctx.get(EditorAndPluginInfo).getEditorInfo()), this.properties.editor_plugin_version = formatNameAndVersion(ctx.get(EditorAndPluginInfo).getEditorPluginInfo());
    let editorSession = ctx.get(EditorSession);
    this.properties.client_machineid = editorSession.machineId, this.properties.client_sessionid = editorSession.sessionId, this.properties.copilot_version = `copilot/${getVersion(ctx)}`, this.properties.runtime_version = `node/${process.versions.node}`;
    let editorInfo = ctx.get(EditorAndPluginInfo);
    this.properties.common_extname = editorInfo.getEditorPluginInfo().name, this.properties.common_extversion = editorInfo.getEditorPluginInfo().version, this.properties.common_vscodeversion = formatNameAndVersion(editorInfo.getEditorInfo());
    let fetcher = ctx.get(Fetcher);
    this.properties.fetcher = fetcher.name;
    let proxySettings = fetcher.proxySettings;
    this.properties.proxy_enabled = proxySettings ? "true" : "false", this.properties.proxy_auth = proxySettings != null && proxySettings.proxyAuth ? "true" : "false", this.properties.proxy_kerberos_spn = proxySettings != null && proxySettings.kerberosServicePrincipal ? "true" : "false", this.properties.reject_unauthorized = fetcher.rejectUnauthorized ? "true" : "false";
  }
  extendWithConfigProperties(ctx) {
    let configProperties = dumpForTelemetry(ctx);
    configProperties["copilot.build"] = getBuild(ctx), configProperties["copilot.buildType"] = getBuildType(ctx);
    let telemetryConfig = ctx.get(TelemetryUserConfig);
    telemetryConfig.trackingId && (configProperties["copilot.trackingId"] = telemetryConfig.trackingId), telemetryConfig.organizationsList && (configProperties.organizations_list = telemetryConfig.organizationsList), telemetryConfig.enterpriseList && (configProperties.enterprise_list = telemetryConfig.enterpriseList), telemetryConfig.sku && (configProperties.sku = telemetryConfig.sku), this.properties = {
      ...this.properties,
      ...configProperties
    };
  }
  extendWithRequestId(requestId) {
    let requestProperties = {
      completionId: requestId.completionId,
      created: requestId.created.toString(),
      headerRequestId: requestId.headerRequestId,
      serverExperiments: requestId.serverExperiments,
      deploymentId: requestId.deploymentId
    };
    this.properties = {
      ...this.properties,
      ...requestProperties
    };
  }
  static maybeRemoveRepoInfoFromPropertiesHack(store, map) {
    if (isRestricted(store)) return map;
    let returnValue = {};
    for (let key in map) _TelemetryData.keysToRemoveFromStandardTelemetryHack.includes(key) || (returnValue[key] = map[key]);
    return returnValue;
  }
  sanitizeKeys() {
    this.properties = _TelemetryData.sanitizeKeys(this.properties), this.measurements = _TelemetryData.sanitizeKeys(this.measurements);
    for (let key in this.measurements) isNaN(this.measurements[key]) && delete this.measurements[key];
  }
  static sanitizeKeys(map) {
    map = map || {};
    let returnValue = {};
    for (let key in map) {
      let newKey = _TelemetryData.keysExemptedFromSanitization.includes(key) ? key : key.replace(/\./g, "_");
      returnValue[newKey] = map[key];
    }
    return returnValue;
  }
  updateMeasurements() {
    let timeSinceIssued = now() - this.issuedTime;
    if (this.measurements.timeSinceIssuedMs = timeSinceIssued, this.displayedTime !== void 0) {
      let timeSinceDisplayed = now() - this.displayedTime;
      this.measurements.timeSinceDisplayedMs = timeSinceDisplayed;
    }
    this.measurements.current_time === void 0 && (this.measurements.current_time = nowSeconds());
  }
  validateData(ctx, store) {
    var _a;
    let invalid;
    if (_TelemetryData.validateTelemetryProperties.Check(this.properties) || (invalid = {
      problem: "properties",
      error: JSON.stringify([..._TelemetryData.validateTelemetryProperties.Errors(this.properties)])
    }), !_TelemetryData.validateTelemetryMeasurements.Check(this.measurements)) {
      let m_err = JSON.stringify([..._TelemetryData.validateTelemetryMeasurements.Errors(this.measurements)]);
      invalid === void 0 ? invalid = {
        problem: "measurements",
        error: m_err
      } : (invalid.problem = "both", invalid.error += `; ${m_err}`);
    }
    if (invalid === void 0) return !0;
    if (shouldFailForDebugPurposes(ctx)) throw new Error(`Invalid telemetry data: ${invalid.problem} ${invalid.error} properties=${JSON.stringify(this.properties)} measurements=${JSON.stringify(this.measurements)}`);
    return telemetryError(ctx, "invalidTelemetryData", _TelemetryData.createAndMarkAsIssued({
      properties: JSON.stringify(this.properties),
      measurements: JSON.stringify(this.measurements),
      problem: invalid.problem,
      validationError: invalid.error
    }), store), isRestricted(store) && telemetryError(ctx, "invalidTelemetryData_in_secure", _TelemetryData.createAndMarkAsIssued({
      problem: invalid.problem,
      requestId: (_a = this.properties.requestId) != null ? _a : "unknown"
    }), 0), !1;
  }
  async makeReadyForSending(ctx, store, includeExp) {
    this.extendWithConfigProperties(ctx), this.extendWithEditorAgnosticFields(ctx), this.sanitizeKeys(), includeExp === "IncludeExp" && (await this.extendWithExpTelemetry(ctx)), this.updateMeasurements(), this.validateData(ctx, store) || (this.properties.telemetry_failed_validation = "true"), addRequiredProperties(ctx, this.properties);
  }
};,__name(_TelemetryData, "TelemetryData"), _TelemetryData.validateTelemetryProperties = bE.TypeCompiler.Compile(propertiesSchema), _TelemetryData.validateTelemetryMeasurements = bE.TypeCompiler.Compile(measurementsSchema), _TelemetryData.keysExemptedFromSanitization = ["abexp.assignmentcontext", "VSCode.ABExp.Features"], _TelemetryData.keysToRemoveFromStandardTelemetryHack = ["gitRepoHost", "gitRepoName", "gitRepoOwner", "gitRepoUrl", "gitRepoPath", "repo", "request_option_nwo", "userKind"];,var TelemetryData = _TelemetryData,
  _TelemetryWithExp = class _TelemetryWithExp extends TelemetryData {
    constructor(properties, measurements, issuedTime, filtersAndExp) {
      super(properties, measurements, issuedTime), this.filtersAndExp = filtersAndExp;
    }
    extendedBy(properties, measurements) {
      let newProperties = {
          ...this.properties,
          ...properties
        },
        newMeasurements = {
          ...this.measurements,
          ...measurements
        },
        newData = new _TelemetryWithExp(newProperties, newMeasurements, this.issuedTime, this.filtersAndExp);
      return newData.displayedTime = this.displayedTime, newData;
    }
    async extendWithExpTelemetry(ctx) {
      this.filtersAndExp.exp.addToTelemetry(this), this.filtersAndExp.filters.addToTelemetry(this);
    }
    static createEmptyConfigForTesting() {
      return new _TelemetryWithExp({}, {}, 0, {
        filters: new FilterSettings({}),
        exp: ExpConfig.createEmptyConfig()
      });
    }
  };,__name(_TelemetryWithExp, "TelemetryWithExp");,var TelemetryWithExp = _TelemetryWithExp;,function sendTelemetryEvent(ctx, store, name, data) {
  var _a;
  (_a = ctx.get(TelemetryReporters).getReporter(ctx, store)) == null || _a.sendTelemetryEvent(name, TelemetryData.maybeRemoveRepoInfoFromPropertiesHack(store, data.properties), data.measurements);
},__name(sendTelemetryEvent, "sendTelemetryEvent");,function sendTelemetryErrorEvent(ctx, store, name, data) {
  var _a;
  (_a = ctx.get(TelemetryReporters).getReporter(ctx, store)) == null || _a.sendTelemetryErrorEvent(name, TelemetryData.maybeRemoveRepoInfoFromPropertiesHack(store, data.properties), data.measurements);
},__name(sendTelemetryErrorEvent, "sendTelemetryErrorEvent");,function sendFTTelemetryEvent(ctx, store, name, data) {
  var _a;
  (_a = ctx.get(TelemetryReporters).getFTReporter(ctx)) == null || _a.sendTelemetryEvent(name, TelemetryData.maybeRemoveRepoInfoFromPropertiesHack(store, data.properties), data.measurements);
},__name(sendFTTelemetryEvent, "sendFTTelemetryEvent");,function telemetrizePromptLength(prompt) {
  return prompt.isFimEnabled ? {
    promptPrefixCharLen: prompt.prefix.length,
    promptSuffixCharLen: prompt.suffix.length
  } : {
    promptCharLen: prompt.prefix.length
  };
},__name(telemetrizePromptLength, "telemetrizePromptLength");,function now() {
  return Date.now();
},__name(now, "now");,function nowSeconds() {
  return Math.floor(now() / 1e3);
},__name(nowSeconds, "nowSeconds");,function shouldSendRestricted(ctx) {
  return ctx.get(TelemetryUserConfig).optedIn;
},__name(shouldSendRestricted, "shouldSendRestricted");,function shouldSendFinetuningTelemetry(ctx) {
  return ctx.get(TelemetryUserConfig).ftFlag !== "";
},__name(shouldSendFinetuningTelemetry, "shouldSendFinetuningTelemetry");,async function telemetry(ctx, name, telemetryData, store) {
  await ctx.get(PromiseQueue).register(_telemetry(ctx, name, telemetryData, store));
},__name(telemetry, "telemetry");,async function _telemetry(ctx, name, telemetryData, store = 0) {
  let definedTelemetryData = telemetryData || TelemetryData.createAndMarkAsIssued({}, {});
  await definedTelemetryData.makeReadyForSending(ctx, store != null ? store : !1, "IncludeExp"), (!isRestricted(store) || shouldSendRestricted(ctx)) && sendTelemetryEvent(ctx, store, name, definedTelemetryData), isRestricted(store) && ftTelemetryEvents.includes(name) && shouldSendFinetuningTelemetry(ctx) && sendFTTelemetryEvent(ctx, store, name, definedTelemetryData);
},__name(_telemetry, "_telemetry");,async function telemetryExpProblem(ctx, telemetryProperties) {
  await ctx.get(PromiseQueue).register(_telemetryExpProblem(ctx, telemetryProperties));
},__name(telemetryExpProblem, "telemetryExpProblem");,async function _telemetryExpProblem(ctx, telemetryProperties) {
  let name = "expProblem",
    definedTelemetryData = TelemetryData.createAndMarkAsIssued(telemetryProperties, {});
  await definedTelemetryData.makeReadyForSending(ctx, 0, "SkipExp"), sendTelemetryEvent(ctx, 0, name, definedTelemetryData);
},__name(_telemetryExpProblem, "_telemetryExpProblem");,function addRequiredProperties(ctx, properties) {
  properties.unique_id = v4_default();
  let editorInfo = ctx.get(EditorAndPluginInfo);
  properties.common_extname = editorInfo.getEditorPluginInfo().name, properties.common_extversion = editorInfo.getEditorPluginInfo().version, properties.common_vscodeversion = formatNameAndVersion(editorInfo.getEditorInfo());
},__name(addRequiredProperties, "addRequiredProperties");,var _CopilotNonError = class _CopilotNonError extends Error {
  constructor(thrown) {
    let message;
    try {
      message = JSON.stringify(thrown);
    } catch {
      message = thrown.toString();
    }
    super(message), this.name = "CopilotNonError";
  }
};,__name(_CopilotNonError, "CopilotNonError");,var CopilotNonError = _CopilotNonError;,async function telemetryException(ctx, maybeError, transaction, properties, failbotPayload) {
  var _a;
  let error;
  if (maybeError instanceof Error) {
    if (error = maybeError, error.name === "Canceled" && error.message === "Canceled" || error.name === "CodeExpectedError" || error instanceof CopilotAuthError) return;
  } else if (error = new CopilotNonError(maybeError), (_a = error.stack) != null && _a.startsWith(`${error}
`)) {
    let frames = error.stack.slice(`${error}
`.length).split(`
`);
    /^\s*(?:at )?(?:\w+\.)*telemetryException\b/.test(frames[0]) && frames.shift(), error.stack = `${error}
${frames.join(`
`)}`;
  }
  await ctx.get(PromiseQueue).register(_telemetryException(ctx, error, transaction, properties, failbotPayload));
},__name(telemetryException, "telemetryException");,async function _telemetryException(ctx, error, transaction, properties, failbotPayload) {
  var _a, _b;
  let editorInfo = ctx.get(EditorAndPluginInfo).getEditorInfo(),
    stackPaths;
  editorInfo.root && (stackPaths = [{
    prefix: `${editorInfo.name}:`,
    path: editorInfo.root
  }]);
  let redactedError = redactError(error, stackPaths),
    sendRestricted = shouldSendRestricted(ctx),
    errorType = getErrorType(error),
    sendAsException = errorType === "exception",
    definedTelemetryDataStub = TelemetryData.createAndMarkAsIssued({
      origin: transaction != null ? transaction : "",
      type: error.name,
      code: `${(_a = error.code) != null ? _a : ""}`,
      reason: redactedError.stack || redactedError.toString(),
      message: redactedError.message,
      ...properties
    });
  if (await definedTelemetryDataStub.makeReadyForSending(ctx, 0, "IncludeExp"), failbotPayload != null && failbotPayload.exception_detail) for (let ed of failbotPayload.exception_detail) ed.value && (sendRestricted ? ed.value = redactMessage(ed.value) : ed.value = "[redacted]");
  if (failbotPayload != null || (failbotPayload = buildPayload(ctx, redactError(error, stackPaths, sendRestricted))), failbotPayload.context = {
    ...failbotPayload.context,
    "copilot_event.unique_id": definedTelemetryDataStub.properties.unique_id,
    "#restricted_telemetry": sendRestricted ? "true" : "false"
  }, transaction && (failbotPayload.context["#origin"] = transaction, failbotPayload.transaction = transaction), failbotPayload.rollup_id !== "auto" && (definedTelemetryDataStub.properties.errno = failbotPayload.rollup_id), failbotPayload.created_at = new Date(definedTelemetryDataStub.issuedTime).toISOString(), sendRestricted) {
    let restrictedError = prepareErrorForRestrictedTelemetry(error, stackPaths),
      definedTelemetryDataRestricted = TelemetryData.createAndMarkAsIssued({
        origin: transaction != null ? transaction : "",
        type: error.name,
        code: `${(_b = error.code) != null ? _b : ""}`,
        reason: restrictedError.stack || restrictedError.toString(),
        message: restrictedError.message,
        ...properties
      });
    failbotPayload.rollup_id !== "auto" && (definedTelemetryDataRestricted.properties.errno = failbotPayload.rollup_id), await definedTelemetryDataRestricted.makeReadyForSending(ctx, 1, "IncludeExp"), definedTelemetryDataRestricted.properties.unique_id = definedTelemetryDataStub.properties.unique_id, definedTelemetryDataStub.properties.restricted_unique_id = definedTelemetryDataRestricted.properties.unique_id, sendTelemetryEvent(ctx, 1, `error.${errorType}`, definedTelemetryDataRestricted);
  }
  sendAsException && (definedTelemetryDataStub.properties.failbot_payload = JSON.stringify(failbotPayload)), sendTelemetryEvent(ctx, 0, `error.${errorType}`, definedTelemetryDataStub);
},__name(_telemetryException, "_telemetryException");,async function telemetryError(ctx, name, telemetryData, store) {
  await ctx.get(PromiseQueue).register(_telemetryError(ctx, name, telemetryData, store));
},__name(telemetryError, "telemetryError");,async function _telemetryError(ctx, name, telemetryData, store = 0) {
  if (isRestricted(store) && !shouldSendRestricted(ctx)) return;
  let definedTelemetryData = telemetryData || TelemetryData.createAndMarkAsIssued({}, {});
  await definedTelemetryData.makeReadyForSending(ctx, store, "IncludeExp"), sendTelemetryErrorEvent(ctx, store, name, definedTelemetryData);
},__name(_telemetryError, "_telemetryError");,async function logEngineCompletion(ctx, completionText, jsonData, requestId, choiceIndex) {
  var _a;
  let telemetryData = TelemetryData.createAndMarkAsIssued({
    completionTextJson: JSON.stringify(completionText),
    choiceIndex: choiceIndex.toString()
  });
  if (jsonData.logprobs) for (let [key, value] of Object.entries(jsonData.logprobs)) telemetryData.properties["logprobs_" + key] = (_a = JSON.stringify(value)) != null ? _a : "unset";
  telemetryData.extendWithRequestId(requestId), await telemetry(ctx, "engine.completion", telemetryData, 1);
},__name(logEngineCompletion, "logEngineCompletion");,async function logEnginePrompt(ctx, prompt, telemetryData) {
  let promptTelemetry;
  prompt.isFimEnabled ? promptTelemetry = {
    promptPrefixJson: JSON.stringify(prompt.prefix),
    promptSuffixJson: JSON.stringify(prompt.suffix),
    promptElementRanges: JSON.stringify(prompt.promptElementRanges)
  } : promptTelemetry = {
    promptJson: JSON.stringify(prompt.prefix),
    promptElementRanges: JSON.stringify(prompt.promptElementRanges)
  };
  let telemetryDataWithPrompt = telemetryData.extendedBy(promptTelemetry);
  await telemetry(ctx, "engine.prompt", telemetryDataWithPrompt, 1);
},__name(logEnginePrompt, "logEnginePrompt");