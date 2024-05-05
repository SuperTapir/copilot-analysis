var LogLevel = (s => (LogLevel[s.DEBUG = 0] = "DEBUG", LogLevel[s.INFO = 1] = "INFO", LogLevel[s.WARN = 2] = "WARN", LogLevel[s.ERROR = 3] = "ERROR", LogLevel))(la || {}),
  _LogVerbose = class _LogVerbose {
    constructor(logVerbose) {
      this.logVerbose = logVerbose;
    }
  };,__name(_LogVerbose, "LogVerbose");,var LogVerbose = _LogVerbose;,function verboseLogging(ctx) {
  return ctx.get(LogVerbose).logVerbose;
},__name(verboseLogging, "verboseLogging");,var _LogTarget = class _LogTarget {
  shouldLog(ctx, level) {}
};,__name(_LogTarget, "LogTarget");,var LogTarget = _LogTarget,
  _ConsoleLog = class _ConsoleLog extends LogTarget {
    constructor(console) {
      super();
      this.console = console;
    }
    logIt(ctx, level, metadataStr, ...extra) {
      level == 3 ? this.console.error(metadataStr, ...extra) : (level == 2 || verboseLogging(ctx)) && this.console.warn(metadataStr, ...extra);
    }
  };,__name(_ConsoleLog, "ConsoleLog");,var ConsoleLog = _ConsoleLog;,var _Logger = class _Logger {
  constructor(minLoggedLevel, context) {
    this.minLoggedLevel = minLoggedLevel, this.context = context;
  }
  setLevel(level) {
    this.minLoggedLevel = level;
  }
  stringToLevel(s) {
    return LogLevel[s];
  }
  log(ctx, level, ...extra) {
    let logTarget = ctx.get(LogTarget),
      targetOverride = logTarget.shouldLog(ctx, level);
    if (targetOverride === !1 || targetOverride === void 0 && !this.shouldLog(ctx, level, this.context)) return;
    let metadataStr = `[${this.context}]`;
    logTarget.logIt(ctx, level, metadataStr, ...extra);
  }
  sendErrorTelemetry(ctx, name, secureMessage) {
    telemetryError(ctx, name, TelemetryData.createAndMarkAsIssued({
      context: this.context,
      level: LogLevel[3],
      message: secureMessage
    }), 1);
  }
  telemetryMessage(...extra) {
    return extra.length > 0 ? JSON.stringify(extra) : "no msg";
  }
  shouldLog(ctx, level, category) {
    var _a, _b;
    if (verboseLogging(ctx)) return !0;
    let levels = getConfig(ctx, ConfigKey.DebugFilterLogCategories);
    if (levels.length > 0 && !levels.includes(category)) return !1;
    if (isProduction(ctx)) return level >= this.minLoggedLevel;
    let overrides = getConfig(ctx, ConfigKey.DebugOverrideLogLevels),
      minLevel = (_b = (_a = this.stringToLevel(overrides["*"])) != null ? _a : this.stringToLevel(overrides[this.context])) != null ? _b : this.minLoggedLevel;
    return level >= minLevel;
  }
  debug(ctx, ...extra) {
    this.log(ctx, 0, ...extra);
  }
  info(ctx, ...extra) {
    this.log(ctx, 1, ...extra);
  }
  warn(ctx, ...extra) {
    this.log(ctx, 2, ...extra);
  }
  error(ctx, ...extra) {
    this.sendErrorTelemetry(ctx, "log", this.telemetryMessage(...extra)), this.log(ctx, 3, ...extra);
  }
  exception(ctx, error, origin) {
    if (error instanceof Error && error.name === "Canceled" && error.message === "Canceled") return;
    let message = origin;
    origin.startsWith(".") && (message = origin.substring(1), origin = `${this.context}${origin}`), telemetryException(ctx, error, origin);
    let safeError = error instanceof Error ? error : new Error("Non-error thrown: " + error);
    this.log(ctx, 3, `${message}:`, safeError);
  }
};,__name(_Logger, "Logger");,var Logger = _Logger;,var logger = new Logger(1, "default");,var _AppInsightsReporter = class _AppInsightsReporter {
  constructor(ctx, namespace, key, includeAuthorizationHeader = !1) {
    this.ctx = ctx;
    this.namespace = namespace;
    this.includeAuthorizationHeader = includeAuthorizationHeader;
    this.onCopilotToken = __name(copilotToken => {
      this.token = copilotToken;
      let userId = copilotToken.getTokenValue("tid");
      userId !== void 0 && (this.tags["ai.user.id"] = userId);
    }, "onCopilotToken");
    this.xhrOverride = {
      sendPOST: (payload, oncomplete) => {
        var _a;
        if (typeof payload.data != "string") throw new Error(`AppInsightsReporter only supports string payloads, received ${typeof payload.data}`);
        let headers = (_a = payload.headers) != null ? _a : {};
        headers["Content-Type"] = "application/json", this.includeAuthorizationHeader && this.token && (headers.Authorization = `Bearer ${this.token.token}`);
        let options = {
          method: "POST",
          headers: headers,
          body: payload.data,
          forceUseHelix: !0
        };
        this.ctx.get(Fetcher).fetch(payload.urlString, options).then(response => response.text().then(text => {
          oncomplete(response.status, response.headers, text);
        })).catch(err => {
          logger.error(this.ctx, "Error sending telemetry", err), oncomplete(0, {});
        });
      }
    };
    this.client = new ak.ApplicationInsights({
      instrumentationKey: key,
      disableAjaxTracking: !0,
      disableExceptionTracking: !0,
      disableFetchTracking: !0,
      disableCorrelationHeaders: !0,
      disableCookiesUsage: !0,
      autoTrackPageVisitTime: !1,
      emitLineDelimitedJson: !1,
      disableInstrumentationKeyValidation: !0,
      endpointUrl: ctx.get(NetworkConfiguration).getTelemetryUrl(),
      extensionConfig: {
        [ok.BreezeChannelIdentifier]: {
          alwaysUseXhrOverride: !0,
          httpXHROverride: this.xhrOverride
        }
      }
    }), this.tags = getTags(ctx), this.commonProperties = getCommonProperties(ctx), ctx.get(CopilotTokenNotifier).on("onCopilotToken", this.onCopilotToken);
  }
  sendTelemetryEvent(eventName, properties, measurements) {
    properties = {
      ...properties,
      ...this.commonProperties
    };
    let name = this.qualifyEventName(eventName);
    this.client.track({
      name: name,
      tags: this.tags,
      data: {
        ...properties,
        ...measurements
      },
      baseType: "EventData",
      baseData: {
        name: name,
        properties: properties,
        measurements: measurements
      }
    });
  }
  sendTelemetryErrorEvent(eventName, properties, measurements) {
    this.sendTelemetryEvent(this.qualifyEventName(eventName), properties, measurements);
  }
  async dispose() {
    this.ctx.get(CopilotTokenNotifier).removeListener("onCopilotToken", this.onCopilotToken), await this.client.unload(!0, void 0, 200);
  }
  qualifyEventName(eventName) {
    return eventName.startsWith(this.namespace) ? eventName : `${this.namespace}/${eventName}`;
  }
};,__name(_AppInsightsReporter, "AppInsightsReporter");,var AppInsightsReporter = _AppInsightsReporter;,function getTags(ctx) {
  let tags = {},
    editorSession = ctx.get(EditorSession);
  tags["ai.session.id"] = editorSession.sessionId;
  let telemetryConfig = ctx.get(TelemetryUserConfig);
  return telemetryConfig.trackingId && (tags["ai.user.id"] = telemetryConfig.trackingId), tags["ai.cloud.roleInstance"] = "REDACTED", tags["ai.device.osVersion"] = `${dc.type()} ${dc.release()}`, tags["ai.device.osArchitecture"] = dc.arch(), tags["ai.device.osPlatform"] = dc.platform(), tags["ai.cloud.role"] = "Web", tags["ai.application.ver"] = ctx.get(BuildInfo).getVersion(), tags;
},__name(getTags, "getTags");,function getCommonProperties(ctx) {
  let properties = {};
  properties.common_os = dc.platform(), properties.common_platformversion = dc.release();
  let editorSession = ctx.get(EditorSession);
  return properties.common_vscodemachineid = editorSession.machineId, properties.common_vscodesessionid = editorSession.sessionId, properties.common_uikind = "desktop", properties.common_remotename = "none", properties.common_isnewappinstall = "", properties;
},__name(getCommonProperties, "getCommonProperties");