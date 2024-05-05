var logger = new Logger(1, "exp");,function setupExperimentationService(ctx) {
  let features = ctx.get(Features);
  features.registerStaticFilters(createAllFilters(ctx)), features.registerDynamicFilter("X-Copilot-OverrideEngine", () => getConfig(ctx, ConfigKey.DebugOverrideEngine)), features.registerDynamicFilter("X-VSCode-ExtensionName", () => ctx.get(EditorAndPluginInfo).getEditorPluginInfo().name), features.registerDynamicFilter("X-VSCode-ExtensionVersion", () => trimVersionSuffix(ctx.get(EditorAndPluginInfo).getEditorPluginInfo().version)), features.registerDynamicFilter("X-VSCode-AppVersion", () => trimVersionSuffix(ctx.get(EditorAndPluginInfo).getEditorInfo().version));
},__name(setupExperimentationService, "setupExperimentationService");,function createAllFilters(ctx) {
  return createDefaultFilters(ctx);
},__name(createAllFilters, "createAllFilters");,function createDefaultFilters(ctx) {
  let editorSession = ctx.get(EditorSession);
  return {
    "X-MSEdge-ClientId": editorSession.machineId,
    "X-VSCode-TargetPopulation": "public"
  };
},__name(createDefaultFilters, "createDefaultFilters");,function trimVersionSuffix(version) {
  return version.split("-")[0];
},__name(trimVersionSuffix, "trimVersionSuffix");