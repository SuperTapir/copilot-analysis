var _TelemetryUserConfig = class _TelemetryUserConfig {
  constructor(ctx, trackingId, optedIn, ftFlag) {
    this.trackingId = trackingId, this.optedIn = optedIn != null ? optedIn : !1, this.ftFlag = ftFlag != null ? ftFlag : "", this.setupUpdateOnToken(ctx);
  }
  setupUpdateOnToken(ctx) {
    ctx.get(CopilotTokenNotifier).on("onCopilotToken", copilotToken => {
      var _a;
      let restrictedTelemetry = copilotToken.getTokenValue("rt") === "1",
        ftFlag = (_a = copilotToken.getTokenValue("ft")) != null ? _a : "",
        trackingId = copilotToken.getTokenValue("tid"),
        organizationsList = copilotToken.organization_list,
        enterpriseList = copilotToken.enterprise_list,
        sku = copilotToken.getTokenValue("sku");
      trackingId !== void 0 && (this.trackingId = trackingId, this.organizationsList = organizationsList == null ? void 0 : organizationsList.toString(), this.enterpriseList = enterpriseList == null ? void 0 : enterpriseList.toString(), this.sku = sku, this.optedIn = restrictedTelemetry, this.ftFlag = ftFlag);
    });
  }
};,__name(_TelemetryUserConfig, "TelemetryUserConfig");,var TelemetryUserConfig = _TelemetryUserConfig;,var frameRegexp = /^(\s+at)?(.*?)(@|\s\(|\s)([^(\n]+?)(:\d+)?(:\d+)?(\)?)$/;,function buildExceptionDetail(error) {
  var _a, _b, _c, _d, _e, _f;
  let exceptionDetail = {
      type: error.name,
      value: error.message
    },
    originalStack = (_a = error.stack) == null ? void 0 : _a.replace(/^.*?:\d+\n.*\n *\^?\n\n/, "");
  if (originalStack != null && originalStack.startsWith(error.toString() + `
`)) {
    exceptionDetail.stacktrace = [];
    for (let assembly of originalStack.slice(error.toString().length + 1).split(/\n/).reverse()) {
      let matches = assembly.match(frameRegexp),
        frame = {
          filename: "",
          function: ""
        };
      matches && (frame.function = (_d = (_c = (_b = matches[2]) == null ? void 0 : _b.trim()) == null ? void 0 : _c.replace(/^[^.]{1,2}(\.|$)/, "_$1")) != null ? _d : frame.function, frame.filename = (_f = (_e = matches[4]) == null ? void 0 : _e.trim()) != null ? _f : frame.filename, matches[5] && matches[5] !== ":0" && (frame.lineno = matches[5].slice(1)), matches[6] && matches[5] !== ":0" && (frame.colno = matches[6].slice(1)), frame.in_app = !/[[<:]|(?:^|\/)node_modules\//.test(frame.filename)), exceptionDetail.stacktrace.push(frame);
    }
  }
  return exceptionDetail;
},__name(buildExceptionDetail, "buildExceptionDetail");,function buildContext(ctx, extraProperties) {
  var _a, _b;
  let epInfo = ctx.get(EditorAndPluginInfo),
    editorInfo = epInfo.getEditorInfo(),
    telemetryConfig = ctx.get(TelemetryUserConfig),
    context = {
      "#editor": (_a = editorInfo.devName) != null ? _a : editorInfo.name,
      "#editor_version": formatNameAndVersion({
        name: (_b = editorInfo.devName) != null ? _b : editorInfo.name,
        version: editorInfo.version
      }),
      "#plugin": epInfo.getEditorPluginInfo().name,
      "#plugin_version": formatNameAndVersion(epInfo.getEditorPluginInfo()),
      "#session_id": ctx.get(EditorSession).sessionId,
      "#machine_id": ctx.get(EditorSession).machineId,
      "#architecture": KQ.arch(),
      "#os_platform": KQ.platform(),
      ...extraProperties
    };
  return telemetryConfig.trackingId && (context.user = telemetryConfig.trackingId, context["#tracking_id"] = telemetryConfig.trackingId), context;
},__name(buildContext, "buildContext");,function buildPayload(ctx, redactedError) {
  var _a, _b, _c, _d;
  let buildInfo = ctx.get(BuildInfo),
    editorInfo = ctx.get(EditorAndPluginInfo).getEditorInfo(),
    payload = {
      app: "copilot-client",
      rollup_id: "auto",
      platform: "node",
      release: buildInfo.getBuildType() !== "dev" ? `copilot-client@${buildInfo.getVersion()}` : void 0,
      deployed_to: buildInfo.getBuildType(),
      catalog_service: editorInfo.name === "vscode" ? "CopilotCompletionsVSCode" : "CopilotIDEAgent",
      context: buildContext(ctx, {
        "#node_version": process.versions.node
      }),
      sensitive_context: {}
    },
    exceptionsWithDetails = [];
  payload.exception_detail = [];
  let i = 0,
    exception = redactedError;
  for (; exception instanceof Error && i < 10;) {
    let detail = buildExceptionDetail(exception);
    payload.exception_detail.unshift(detail), exceptionsWithDetails.unshift([exception, detail]), i += 1, exception = exception.cause;
  }
  let rollup = [];
  for (let [exception, detail] of exceptionsWithDetails) if (detail.stacktrace && detail.stacktrace.length > 0) {
    rollup.push(`${detail.type}: ${(_a = exception.code) != null ? _a : ""}`);
    let stacktrace = [...detail.stacktrace].reverse();
    for (let frame of stacktrace) if ((_b = frame.filename) != null && _b.startsWith("./dist/")) return payload;
    for (let frame of stacktrace) if (frame.in_app) {
      rollup.push(`${(_c = frame.filename) == null ? void 0 : _c.replace(/^\.\//, "")}:${frame.lineno}:${frame.colno}`);
      break;
    }
    rollup.push(`${(_d = stacktrace[0].filename) == null ? void 0 : _d.replace(/^\.\//, "")}`);
  } else return payload;
  return payload.exception_detail.length > 0 && (payload.rollup_id = (0, WQ.SHA256)(WQ.enc.Utf16.parse(rollup.join(`
`))).toString()), payload;
},__name(buildPayload, "buildPayload");