var vscode = Dr(require("vscode"));,var packageJson = d7();,function stringOrStringify(value) {
  return typeof value == "string" ? value : JSON.stringify(value);
},__name(stringOrStringify, "stringOrStringify");,var _VSCodeConfigProvider = class _VSCodeConfigProvider extends ConfigProvider {
  constructor() {
    super(), this.config = Yl.workspace.getConfiguration(CopilotConfigPrefix), Yl.workspace.onDidChangeConfiguration(changeEvent => {
      changeEvent.affectsConfiguration(CopilotConfigPrefix) && (this.config = Yl.workspace.getConfiguration(CopilotConfigPrefix));
    });
  }
  getConfig(key) {
    var _a;
    return (_a = getConfigKeyRecursively(this.config, key)) != null ? _a : getConfigDefaultForKey(key);
  }
  getOptionalConfig(key) {
    var _a;
    return (_a = getConfigKeyRecursively(this.config, key)) != null ? _a : getOptionalConfigDefaultForKey(key);
  }
  dumpForTelemetry() {
    let configProperties = {};
    try {
      for (let localKey of [ConfigKey.InlineSuggestEnable]) {
        let value = localKey.split(".").reduce((o, i) => o[i], this.config);
        configProperties[`${CopilotConfigPrefix}.${localKey}`] = stringOrStringify(value);
      }
    } catch (ex) {
      console.error(`Failed to retrieve configuration properties ${ex}`);
    }
    return configProperties;
  }
  getLanguageConfig(key, language) {
    var _a;
    let obj = this.getConfig(key);
    if (language === void 0) {
      let editor = Yl.window.activeTextEditor;
      language = editor && editor.document.languageId;
    }
    return (_a = obj == null ? void 0 : obj[language != null ? language : "*"]) != null ? _a : obj == null ? void 0 : obj["*"];
  }
  updateEnabledConfig(ctx, language, enabled) {
    var _a;
    let enabledConfig = (_a = this.config.get(ConfigKey.Enable)) != null ? _a : getConfigDefaultForKey(ConfigKey.Enable);
    return this.config.update(ConfigKey.Enable, {
      ...enabledConfig,
      [language]: enabled
    }, !0);
  }
};,__name(_VSCodeConfigProvider, "VSCodeConfigProvider");,var VSCodeConfigProvider = _VSCodeConfigProvider,
  telemetryAllowedAuthorities = new Set(["ssh-remote", "dev-container", "attached-container", "wsl", "tunnel", "codespaces", "amlext"]),
  _VSCodeEditorInfo = class _VSCodeEditorInfo extends EditorAndPluginInfo {
    getEditorInfo() {
      let devName = Yl.env.uriScheme;
      Yl.version.endsWith("-insider") && (devName = devName.replace(/-insiders$/, ""));
      let remoteName = Yl.env.remoteName;
      return remoteName && (devName += `@${telemetryAllowedAuthorities.has(remoteName) ? remoteName : "other"}`), {
        name: "vscode",
        devName: devName,
        version: Yl.version,
        root: Yl.env.appRoot
      };
    }
    getEditorPluginInfo() {
      return {
        name: "copilot",
        version: packageJson.version
      };
    }
  };,__name(_VSCodeEditorInfo, "VSCodeEditorInfo");,var VSCodeEditorInfo = _VSCodeEditorInfo;,async function toggleCopilotEnablement(ctx, scope) {
  var _a;
  let configProvider = ctx.get(ConfigProvider),
    isEnabled = getEnabledConfig(ctx) || !1,
    currentLanguage = (_a = Yl.window.activeTextEditor) == null ? void 0 : _a.document.languageId;
  isEnabled && Yl.commands.executeCommand("editor.action.inlineSuggest.hide"), scope === "global" ? await configProvider.updateEnabledConfig(ctx, "*", !getEnabledConfig(ctx, "*")) : await configProvider.updateEnabledConfig(ctx, currentLanguage || "*", !isEnabled);
},__name(toggleCopilotEnablement, "toggleCopilotEnablement");