var _FixedBlockModeConfig = class _FixedBlockModeConfig extends BlockModeConfig {
  constructor(blockMode) {
    super();
    this.blockMode = blockMode;
  }
  async forLanguage(ctx, languageId) {
    return this.blockMode;
  }
};,__name(_FixedBlockModeConfig, "FixedBlockModeConfig");,var FixedBlockModeConfig = _FixedBlockModeConfig;,var _CopilotExtensionApi = class _CopilotExtensionApi {
  constructor(ctx) {
    this.ctx = ctx;
  }
  captureExtensionTelemetry(work) {
    return withTelemetryCapture(this.ctx, work);
  }
  setupNextCompletion(completions) {
    this.clearCompletionsCache(), this.ctx.forceSet(OpenAIFetcher, new SyntheticCompletions(completions)), this.ctx.forceSet(BlockModeConfig, new FixedBlockModeConfig("parsing"));
  }
  clearCompletionsCache() {
    this.ctx.get(CompletionsCache).clear(), clearUserTypingState();
  }
};,__name(_CopilotExtensionApi, "CopilotExtensionApi");,var CopilotExtensionApi = _CopilotExtensionApi;