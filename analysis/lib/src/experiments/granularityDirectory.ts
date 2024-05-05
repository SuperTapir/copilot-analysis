var BUCKETFILTER = "X-Copilot-ClientTimeBucket",
  _GranularityDirectory = class _GranularityDirectory {
    constructor(prefix, clock) {
      this.specs = new Map();
      this.prefix = prefix, this.clock = clock, this.defaultGranularity = DEFAULT_GRANULARITY(prefix);
    }
    selectGranularity(filters) {
      for (let [rememberedFilters, granularity] of this.specs.entries()) if (filters.extends(rememberedFilters)) return granularity;
      return this.defaultGranularity;
    }
    update(filters, byCallBuckets, timePeriodSizeInH) {
      if (byCallBuckets = byCallBuckets > 1 ? byCallBuckets : NaN, timePeriodSizeInH = timePeriodSizeInH > 0 ? timePeriodSizeInH : NaN, isNaN(byCallBuckets) && isNaN(timePeriodSizeInH)) this.specs.delete(filters);else {
        let newGranularity = new TimeBucketGranularity(this.prefix);
        isNaN(byCallBuckets) || newGranularity.setByCallBuckets(byCallBuckets), isNaN(timePeriodSizeInH) || newGranularity.setTimePeriod(timePeriodSizeInH * 3600 * 1e3), this.specs.set(filters, newGranularity);
      }
    }
    extendFilters(filters) {
      let implementation = this.selectGranularity(filters),
        [value, upcomingValues] = implementation.getCurrentAndUpComingValues(this.clock.now());
      return {
        newFilterSettings: filters.withChange(BUCKETFILTER, value),
        otherFilterSettingsToPrefetch: upcomingValues.map(value => filters.withChange(BUCKETFILTER, value))
      };
    }
  };,__name(_GranularityDirectory, "GranularityDirectory");,var GranularityDirectory = _GranularityDirectory;,var _FilterSettingsToExpConfigs = class _FilterSettingsToExpConfigs {
  constructor(ctx) {
    this.ctx = ctx;
    this.cache = new LRUCacheMap(200);
  }
  async fetchExpConfig(settings) {
    let task = this.cache.get(settings.stringify());
    return task || (task = new Task(() => this.ctx.get(ExpConfigMaker).fetchExperiments(this.ctx, settings.toHeaders()), 1e3 * 60 * 60), this.cache.set(settings.stringify(), task)), task.run();
  }
  getCachedExpConfig(settings) {
    let task = this.cache.get(settings.stringify());
    return task == null ? void 0 : task.value();
  }
};,__name(_FilterSettingsToExpConfigs, "FilterSettingsToExpConfigs");,var FilterSettingsToExpConfigs = _FilterSettingsToExpConfigs,
  _Task = class _Task {
    constructor(producer, expirationMs = 1 / 0) {
      this.producer = producer;
      this.expirationMs = expirationMs;
    }
    async run() {
      return this.promise === void 0 && (this.promise = this.producer(), this.storeResult(this.promise).then(() => {
        this.expirationMs < 1 / 0 && this.promise !== void 0 && setTimeout(() => this.promise = void 0, this.expirationMs);
      })), this.promise;
    }
    async storeResult(promise) {
      try {
        this.result = await promise;
      } finally {
        this.result === void 0 && (this.promise = void 0);
      }
    }
    value() {
      return this.result;
    }
  };,__name(_Task, "Task");,var Task = _Task,
  _Features = class _Features {
    constructor(ctx) {
      this.ctx = ctx;
      this.staticFilters = {};
      this.dynamicFilters = {};
      this.upcomingDynamicFilters = {};
      this.assignments = new FilterSettingsToExpConfigs(this.ctx);
    }
    registerStaticFilters(filters) {
      Object.assign(this.staticFilters, filters);
    }
    registerDynamicFilter(filter, generator) {
      this.dynamicFilters[filter] = generator;
    }
    getDynamicFilterValues() {
      let values = {};
      for (let [filter, generator] of Object.entries(this.dynamicFilters)) values[filter] = generator();
      return values;
    }
    registerUpcomingDynamicFilter(filter, generator) {
      this.upcomingDynamicFilters[filter] = generator;
    }
    async updateExPValuesAndAssignments({
      repoNwo: repoNwo,
      fileType: fileType,
      userKind: userKind,
      dogFood: dogFood,
      retrievalOrg: retrievalOrg,
      customModel: customModel
    }, telemetryData) {
      var _a, _b;
      if (telemetryData instanceof TelemetryWithExp) throw new Error("updateExPValuesAndAssignments should not be called with TelemetryWithExp");
      let requestFilters = {
          "X-Copilot-Repository": repoNwo,
          "X-Copilot-FileType": fileType,
          "X-Copilot-UserKind": userKind,
          "X-Copilot-Dogfood": dogFood,
          "X-Copilot-CustomModel": customModel,
          "X-Copilot-RetrievalOrg": retrievalOrg
        },
        granularityDirectory = this.getGranularityDirectory(),
        preGranularityFilters = this.makeFilterSettings(requestFilters),
        rememberedGranularityExtension = granularityDirectory.extendFilters(preGranularityFilters),
        expAccordingToRememberedExtension = await this.getExpConfig(rememberedGranularityExtension.newFilterSettings);
      granularityDirectory.update(preGranularityFilters, +((_a = expAccordingToRememberedExtension.variables.copilotbycallbuckets) != null ? _a : NaN), +((_b = expAccordingToRememberedExtension.variables.copilottimeperiodsizeinh) != null ? _b : NaN));
      let currentGranularityExtension = granularityDirectory.extendFilters(preGranularityFilters),
        filters = currentGranularityExtension.newFilterSettings,
        exp = await this.getExpConfig(filters),
        backgroundQueue = new Promise(resolve => setTimeout(resolve, _Features.upcomingDynamicFilterCheckDelayMs));
      for (let upcomingFilter of currentGranularityExtension.otherFilterSettingsToPrefetch) backgroundQueue = backgroundQueue.then(async () => {
        await new Promise(resolve => setTimeout(resolve, _Features.upcomingDynamicFilterCheckDelayMs)), this.getExpConfig(upcomingFilter);
      });
      return this.prepareForUpcomingFilters(filters), new TelemetryWithExp(telemetryData.properties, telemetryData.measurements, telemetryData.issuedTime, {
        filters: filters,
        exp: exp
      });
    }
    getGranularityDirectory() {
      if (!this.granularityDirectory) {
        let machineId = this.ctx.get(EditorSession).machineId;
        this.granularityDirectory = new GranularityDirectory(machineId, this.ctx.get(Clock));
      }
      return this.granularityDirectory;
    }
    makeFilterSettings(requestFilters) {
      return new FilterSettings({
        ...this.staticFilters,
        ...this.getDynamicFilterValues(),
        ...requestFilters
      });
    }
    async getExpConfig(settings) {
      try {
        return this.assignments.fetchExpConfig(settings);
      } catch (e) {
        return ExpConfig.createFallbackConfig(this.ctx, `Error fetching ExP config: ${e}`);
      }
    }
    async prepareForUpcomingFilters(filters) {
      if (!(new Date().getMinutes() < 60 - _Features.upcomingTimeBucketMinutes)) for (let [filter, generator] of Object.entries(this.upcomingDynamicFilters)) await new Promise(resolve => setTimeout(resolve, _Features.upcomingDynamicFilterCheckDelayMs)), this.getExpConfig(filters.withChange(filter, generator()));
    }
    stringify() {
      var _a;
      let defaultExpConfig = this.assignments.getCachedExpConfig(new FilterSettings({}));
      return JSON.stringify((_a = defaultExpConfig == null ? void 0 : defaultExpConfig.variables) != null ? _a : {});
    }
    async getFallbackExpAndFilters() {
      let filters = this.makeFilterSettings({}),
        exp = await this.getExpConfig(filters);
      return {
        filters: filters,
        exp: exp
      };
    }
    debounceMs(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotdebouncems) != null ? _a : 0;
    }
    debouncePredict(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotdebouncepredict) != null ? _a : !1;
    }
    contextualFilterEnable(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotcontextualfilterenable) != null ? _a : !0;
    }
    contextualFilterEnableTree(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotcontextualfilterenabletree) != null ? _a : !0;
    }
    contextualFilterAcceptThreshold(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotcontextualfilteracceptthreshold) != null ? _a : 35;
    }
    contextualFilterExplorationTraffic(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotcontextualfilterexplorationtraffic) != null ? _a : 1;
    }
    disableLogProb(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotdisablelogprob) != null ? _a : !0;
    }
    overrideBlockMode(telemetryWithExp) {
      return telemetryWithExp.filtersAndExp.exp.variables.copilotoverrideblockmode || void 0;
    }
    fastCancellation(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotoverridefastcancellation) != null ? _a : !0;
    }
    overrideNumGhostCompletions(telemetryWithExp) {
      return telemetryWithExp.filtersAndExp.exp.variables.copilotoverridednumghostcompletions;
    }
    dropCompletionReasons(telemetryWithExp) {
      let reasons = telemetryWithExp.filtersAndExp.exp.variables.copilotdropcompletionreasons;
      if (reasons) return reasons.split(",");
    }
    customEngine(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotcustomengine) != null ? _a : "";
    }
    beforeRequestWaitMs(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotlms) != null ? _a : 0;
    }
    multiLogitBias(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotlbeot) != null ? _a : !1;
    }
    requestMultilineExploration(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotrequestmultilineexploration) != null ? _a : !1;
    }
    suffixPercent(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.CopilotSuffixPercent) != null ? _a : 15;
    }
    suffixMatchThreshold(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotsuffixmatchthreshold) != null ? _a : 10;
    }
    numberOfSnippets(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotnumberofsnippets) != null ? _a : jp.DEFAULT_NUM_OF_SNIPPETS;
    }
    neighboringTabsOption(telemetryWithExp) {
      switch (telemetryWithExp.filtersAndExp.exp.variables.copilotneighboringtabs) {
        case "none":
          return jp.NeighboringTabsOption.None;
        case "conservative":
          return jp.NeighboringTabsOption.Conservative;
        case "medium":
          return jp.NeighboringTabsOption.Medium;
        case "eager":
          return jp.NeighboringTabsOption.Eager;
        case "eagerbutlittle":
          return jp.NeighboringTabsOption.EagerButLittle;
        case "eagerbutmedium":
          return jp.NeighboringTabsOption.EagerButMedium;
        case "eagerbutmuch":
          return jp.NeighboringTabsOption.EagerButMuch;
        case "retrievalcomparable":
          return jp.NeighboringTabsOption.RetrievalComparable;
        default:
          return jp.NeighboringTabsOption.Eager;
      }
    }
    retrievalStrategy(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.retrieval) != null ? _a : !1;
    }
    cppHeaders(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotcppheaders) != null ? _a : !1;
    }
    retrievalServerRoute(telemetryWithExp) {
      let expvalue = telemetryWithExp.filtersAndExp.exp.variables.retrievalserverroute;
      switch (expvalue) {
        case "aims":
          return "2";
        case "devdiv":
          return "1";
        case "githubnext":
          return "0";
        default:
          return expvalue != null ? expvalue : "0";
      }
    }
    maxPromptCompletionTokens(telemetryWithExp, def) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.maxpromptcompletionTokens) != null ? _a : def;
    }
    hybridInference(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.hybridinference) != null ? _a : !1;
    }
    hybridInferenceThreshold(telemetryWithExp) {
      var _a;
      return ((_a = telemetryWithExp.filtersAndExp.exp.variables.hybridinferencethreshold) != null ? _a : -100) / 100;
    }
    requestMultiOnNewLine(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotrequestmultionnewline) != null ? _a : !1;
    }
    requestMultiModel(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotrequestmultimodel) != null ? _a : !1;
    }
    requestMultiModelThreshold(telemetryWithExp) {
      var _a;
      return ((_a = telemetryWithExp.filtersAndExp.exp.variables.copilotrequestmultimodelthreshold) != null ? _a : 100) / 100;
    }
    promptOrderListPreset(telemetryWithExp) {
      switch (telemetryWithExp.filtersAndExp.exp.variables.copilotpromptorderlistpreset) {
        default:
          return "default";
      }
    }
    defaultCommentMarker(telemetryWithExp) {
      var _a, _b;
      let start = (_a = telemetryWithExp.filtersAndExp.exp.variables.copilotlanguagedetectioncommentmarkerstart) != null ? _a : void 0,
        end = (_b = telemetryWithExp.filtersAndExp.exp.variables.copilotlanguagedetectioncommentmarkerend) != null ? _b : void 0;
      if (start || end) return {
        start: start != null ? start : "",
        end: end != null ? end : ""
      };
    }
    promptPriorityPreset(telemetryWithExp) {
      switch (telemetryWithExp.filtersAndExp.exp.variables.copilotpromptprioritypreset) {
        case "office-exp":
          return "office-exp";
        default:
          return "default";
      }
    }
    ideAgentChatGpt4MaxTokens(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.ideagentchatgpt4maxtokens) != null ? _a : -1;
    }
    ideAgentChatGpt4MaxRequestTokens(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.ideagentchatgpt4maxrequesttokens) != null ? _a : -1;
    }
    ideAgentChatExpTestModelGpt4(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.exptestmodelgpt4) != null ? _a : "";
    }
    ideAgentChatExpTestModelGpt35(telemetryWithExp) {
      var _a;
      return (_a = telemetryWithExp.filtersAndExp.exp.variables.exptestmodelgpt35) != null ? _a : "";
    }
  };,__name(_Features, "Features"), _Features.upcomingDynamicFilterCheckDelayMs = 20, _Features.upcomingTimeBucketMinutes = 5 + Math.floor(Math.random() * 11);,var Features = _Features;,var packageJson = d7(),
  ConfigKey = {
    Enable: "enable",
    InlineSuggestEnable: "inlineSuggest.enable",
    ShowEditorCompletions: "editor.showEditorCompletions",
    EnableAutoCompletions: "editor.enableAutoCompletions",
    DelayCompletions: "editor.delayCompletions",
    FilterCompletions: "editor.filterCompletions",
    DebugOverrideCppHeaders: "advanced.debug.overrideCppHeaders",
    DebugOverrideCapiUrl: "advanced.debug.overrideCapiUrl",
    DebugTestOverrideCapiUrl: "advanced.debug.testOverrideCapiUrl",
    DebugOverrideProxyUrl: "advanced.debug.overrideProxyUrl",
    DebugTestOverrideProxyUrl: "advanced.debug.testOverrideProxyUrl",
    DebugOverrideEngine: "advanced.debug.overrideEngine",
    DebugOverrideLogLevels: "advanced.debug.overrideLogLevels",
    DebugFilterLogCategories: "advanced.debug.filterLogCategories",
    DebugSnippyOverrideUrl: "advanced.debug.codeRefOverrideUrl",
    DebugUseElectronFetcher: "advanced.debug.useElectronFetcher",
    DebugUseEditorFetcher: "advanced.debug.useEditorFetcher"
  };,function shouldDoParsingTrimming(blockMode) {
  return ["parsing", "parsingandserver"].includes(blockMode);
},__name(shouldDoParsingTrimming, "shouldDoParsingTrimming");,function shouldDoServerTrimming(blockMode) {
  return ["server", "parsingandserver"].includes(blockMode);
},__name(shouldDoServerTrimming, "shouldDoServerTrimming");,var _BlockModeConfig = class _BlockModeConfig {};,__name(_BlockModeConfig, "BlockModeConfig");,var BlockModeConfig = _BlockModeConfig,
  _ConfigBlockModeConfig = class _ConfigBlockModeConfig extends BlockModeConfig {
    async forLanguage(ctx, languageId, telemetryData) {
      let overrideBlockMode = ctx.get(Features).overrideBlockMode(telemetryData);
      return overrideBlockMode ? toApplicableBlockMode(overrideBlockMode, languageId) : languageId == "ruby" ? "parsing" : (0, o3.isSupportedLanguageId)(languageId) ? "parsingandserver" : "server";
    }
  };,__name(_ConfigBlockModeConfig, "ConfigBlockModeConfig");,var ConfigBlockModeConfig = _ConfigBlockModeConfig;,function toApplicableBlockMode(blockMode, languageId) {
  switch (blockMode) {
    case "parsing":
      return (0, o3.isSupportedLanguageId)(languageId) ? "parsing" : "server";
    case "server":
      return "server";
    case "parsingandserver":
    default:
      return (0, o3.isSupportedLanguageId)(languageId) ? "parsingandserver" : "server";
  }
},__name(toApplicableBlockMode, "toApplicableBlockMode");,var _ConfigProvider = class _ConfigProvider {};,__name(_ConfigProvider, "ConfigProvider");,var ConfigProvider = _ConfigProvider;,function isContributesObject(obj) {
  return (obj == null ? void 0 : obj.type) === "object" && "properties" in obj;
},__name(isContributesObject, "isContributesObject");,function getConfigKeyRecursively(config, key) {
  let value = config,
    prefix = [];
  for (let segment of key.split(".")) {
    let child = [...prefix, segment].join(".");
    value && typeof value == "object" && child in value ? (value = value[child], prefix.length = 0) : prefix.push(segment);
  }
  if (!(value === void 0 || prefix.length > 0)) return value;
},__name(getConfigKeyRecursively, "getConfigKeyRecursively");,function getConfigDefaultForKey(key) {
  let maybeDefault = getOptionalConfigDefaultForKey(key);
  if (maybeDefault !== void 0) return maybeDefault;
  throw new Error(`Missing config default value: ${CopilotConfigPrefix}.${key}`);
},__name(getConfigDefaultForKey, "getConfigDefaultForKey");,function getOptionalConfigDefaultForKey(key) {
  try {
    let conf = packageJson.contributes.configuration[0],
      parents = [],
      segments = `${CopilotConfigPrefix}.${key}`.split(".");
    for (; segments.length > 0;) {
      parents.push(segments.shift());
      let maybeChild = conf.properties[parents.join(".")];
      if (isContributesObject(maybeChild)) parents.length = 0, conf = maybeChild;else if (segments.length == 0 && (maybeChild == null ? void 0 : maybeChild.default) !== void 0) return maybeChild.default;
    }
  } catch (e) {
    throw new Error(`Error inspecting config default value ${CopilotConfigPrefix}.${key}: ${e}`);
  }
},__name(getOptionalConfigDefaultForKey, "getOptionalConfigDefaultForKey");,function getConfig(ctx, key) {
  return ctx.get(ConfigProvider).getConfig(key);
},__name(getConfig, "getConfig");,function getHiddenConfig(ctx, key, options) {
  var _a;
  return (_a = ctx.get(ConfigProvider).getOptionalConfig(key)) != null ? _a : options.default;
},__name(getHiddenConfig, "getHiddenConfig");,function dumpForTelemetry(ctx) {
  return ctx.get(ConfigProvider).dumpForTelemetry();
},__name(dumpForTelemetry, "dumpForTelemetry");,function getLanguageConfig(ctx, key, language) {
  return ctx.get(ConfigProvider).getLanguageConfig(key, language);
},__name(getLanguageConfig, "getLanguageConfig");,function getEnabledConfig(ctx, language) {
  return getLanguageConfig(ctx, ConfigKey.Enable, language);
},__name(getEnabledConfig, "getEnabledConfig");,var _BuildInfo = class _BuildInfo {
  constructor() {
    this.packageJson = packageJson;
  }
  isProduction() {
    return this.getBuildType() != "dev";
  }
  getBuildType() {
    return this.packageJson.buildType;
  }
  getVersion() {
    return this.packageJson.version;
  }
  getDisplayVersion() {
    return this.getBuildType() === "dev" ? `${this.getVersion()}-dev` : this.getVersion();
  }
  getBuild() {
    return this.packageJson.build;
  }
  getName() {
    return this.packageJson.name;
  }
};,__name(_BuildInfo, "BuildInfo");,var BuildInfo = _BuildInfo;,function isProduction(ctx) {
  return ctx.get(BuildInfo).isProduction();
},__name(isProduction, "isProduction");,function getBuildType(ctx) {
  return ctx.get(BuildInfo).getBuildType();
},__name(getBuildType, "getBuildType");,function getBuild(ctx) {
  return ctx.get(BuildInfo).getBuild();
},__name(getBuild, "getBuild");,function getVersion(ctx) {
  return ctx.get(BuildInfo).getVersion();
},__name(getVersion, "getVersion");,var _EditorSession = class _EditorSession {
  constructor(sessionId, machineId) {
    this.sessionId = sessionId;
    this.machineId = machineId;
  }
};,__name(_EditorSession, "EditorSession");,var EditorSession = _EditorSession;,function formatNameAndVersion({
  name: name,
  version: version
}) {
  return `${name}/${version}`;
},__name(formatNameAndVersion, "formatNameAndVersion");,var _EditorAndPluginInfo = class _EditorAndPluginInfo {};,__name(_EditorAndPluginInfo, "EditorAndPluginInfo");,var EditorAndPluginInfo = _EditorAndPluginInfo;,function editorVersionHeaders(ctx) {
  let info = ctx.get(EditorAndPluginInfo);
  return {
    "Editor-Version": formatNameAndVersion(info.getEditorInfo()),
    "Editor-Plugin-Version": formatNameAndVersion(info.getEditorPluginInfo())
  };
},__name(editorVersionHeaders, "editorVersionHeaders");,var LogLevel = (r => (LogLevel[r.DEBUG = 0] = "DEBUG", LogLevel[r.INFO = 1] = "INFO", LogLevel[r.WARN = 2] = "WARN", LogLevel[r.ERROR = 3] = "ERROR", LogLevel))(Ic || {}),
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
  };,__name(_ConsoleLog, "ConsoleLog");,var ConsoleLog = _ConsoleLog,
  _OutputChannelLog = class _OutputChannelLog extends LogTarget {
    constructor(outputChannel, alwaysVerbose = !0) {
      super();
      this.outputChannel = outputChannel;
      this.alwaysVerbose = alwaysVerbose;
    }
    logIt(ctx, level, metadataStr, ...extra) {
      let shouldVerboseLog = this.alwaysVerbose || verboseLogging(ctx),
        message = [metadataStr, format(extra)].join(" ");
      level == 3 ? this.outputChannel.error(message) : level == 2 ? this.outputChannel.warn(message) : shouldVerboseLog && level == 1 ? this.outputChannel.info(message) : shouldVerboseLog && level == 0 && this.outputChannel.debug(message);
    }
  };,__name(_OutputChannelLog, "OutputChannelLog");,var OutputChannelLog = _OutputChannelLog,
  _MultiLog = class _MultiLog extends LogTarget {
    constructor(targets) {
      super();
      this.targets = targets;
    }
    logIt(ctx, level, metadataStr, ...extra) {
      this.targets.forEach(t => t.logIt(ctx, level, metadataStr, ...extra));
    }
  };,__name(_MultiLog, "MultiLog");,var MultiLog = _MultiLog,
  _Logger = class _Logger {
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
  };,__name(_Logger, "Logger");,var Logger = _Logger;,function format(args) {
  return x7.format(...args);
},__name(format, "format");,var logger = new Logger(1, "default");