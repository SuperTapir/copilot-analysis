var import_applicationinsights_common = Dr(oW()),
  import_applicationinsights_web_basic = Dr(cW()),
  os = Dr(require("os"));,var _AppInsightsReporter = class _AppInsightsReporter {
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
    this.client = new lW.ApplicationInsights({
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
        [AW.BreezeChannelIdentifier]: {
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
  return telemetryConfig.trackingId && (tags["ai.user.id"] = telemetryConfig.trackingId), tags["ai.cloud.roleInstance"] = "REDACTED", tags["ai.device.osVersion"] = `${Nd.type()} ${Nd.release()}`, tags["ai.device.osArchitecture"] = Nd.arch(), tags["ai.device.osPlatform"] = Nd.platform(), tags["ai.cloud.role"] = "Web", tags["ai.application.ver"] = ctx.get(BuildInfo).getVersion(), tags;
},__name(getTags, "getTags");,function getCommonProperties(ctx) {
  let properties = {};
  properties.common_os = Nd.platform(), properties.common_platformversion = Nd.release();
  let editorSession = ctx.get(EditorSession);
  return properties.common_vscodemachineid = editorSession.machineId, properties.common_vscodesessionid = editorSession.sessionId, properties.common_uikind = "desktop", properties.common_remotename = "none", properties.common_isnewappinstall = "", properties;
},__name(getCommonProperties, "getCommonProperties");