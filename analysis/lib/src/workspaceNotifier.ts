var import_node_events = Dr(require("events"));,var workspaceChangedEvent = "onWorkspaceChanged",
  _WorkspaceNotifier = class _WorkspaceNotifier {
    constructor() {
      this.emitter = new Ite.EventEmitter();
    }
    onChange(listener) {
      this.emitter.on(workspaceChangedEvent, listener);
    }
    emit(event) {
      this.emitter.emit(workspaceChangedEvent, event);
    }
  };,__name(_WorkspaceNotifier, "WorkspaceNotifier");,var WorkspaceNotifier = _WorkspaceNotifier;,function createProductionContext(configProvider) {
  let ctx = new Context();
  return ctx.set(ConfigProvider, configProvider), ctx.set(Clock, new Clock()), ctx.set(BuildInfo, new BuildInfo()), setupRudimentaryLogging(ctx), ctx.set(CompletionsCache, new CompletionsCache()), ctx.set(CopilotTokenNotifier, new CopilotTokenNotifier()), ctx.set(RootCertificateReader, getRootCertificateReader(ctx)), ctx.set(ProxySocketFactory, getProxySocketFactory(ctx)), ctx.set(LanguageDetection, getLanguageDetection(ctx)), ctx.set(Features, new Features(ctx)), ctx.set(PostInsertionNotifier, new PostInsertionNotifier()), ctx.set(TelemetryUserConfig, new TelemetryUserConfig(ctx)), ctx.set(TelemetryReporters, new TelemetryReporters()), ctx.set(TelemetryInitialization, new TelemetryInitialization()), ctx.set(HeaderContributors, new HeaderContributors()), ctx.set(UserErrorNotifier, new UserErrorNotifier()), ctx.set(ContextualFilterManager, new ContextualFilterManager()), ctx.set(OpenAIFetcher, new LiveOpenAIFetcher()), ctx.set(BlockModeConfig, new ConfigBlockModeConfig()), ctx.set(ExpConfigMaker, new ExpConfigFromTAS()), ctx.set(PromiseQueue, new PromiseQueue()), ctx.set(pM.SnippetOrchestrator, new pM.SnippetOrchestrator()), ctx.set(LastGhostText, new LastGhostText()), ctx.set(ForceMultiLine, ForceMultiLine.default), ctx.set(RepositoryManager, new RepositoryManager(ctx)), ctx.set(GitConfigLoader, new GitFallbackConfigLoader([new GitCLIConfigLoader(), new GitParsingConfigLoader()])), ctx.set(WorkspaceNotifier, new WorkspaceNotifier()), ctx;
},__name(createProductionContext, "createProductionContext");,function setupRudimentaryLogging(ctx) {
  ctx.set(RuntimeMode, RuntimeMode.fromEnvironment(!1)), ctx.set(LogVerbose, new LogVerbose(isVerboseLoggingEnabled(ctx))), ctx.set(LogTarget, new ConsoleLog(console));
},__name(setupRudimentaryLogging, "setupRudimentaryLogging");,var logger = new Logger(0, "context");