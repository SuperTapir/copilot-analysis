function isFulfilledResult(result) {
  return result.status === "fulfilled";
},function isRejectedResult(result) {
  return result.status === "rejected";
},function providersSnippets(results) {
  return results.filter(isFulfilledResult).flatMap(r => r.value.snippets);
},function providersErrors(results) {
  return results.filter(isRejectedResult).flatMap(r => r.reason);
},function providersPerformance(results) {
  let runtimes = {},
    timeouts = {};
  return results.forEach(result => {
    isFulfilledResult(result) ? (runtimes[result.value.providerType] = Math.round(result.value.runtime), timeouts[result.value.providerType] = !1) : result.reason.error instanceof ProviderTimeoutError && (timeouts[result.reason.providerType] = !0, runtimes[result.reason.providerType] = 0);
  }), {
    runtimes: runtimes,
    timeouts: timeouts
  };
},var TIMEOUT_MS,
  defaultProviders,
  SnippetOrchestrator,
  init_orchestrator = __esmMin(() => {
    "use strict";

    init_language();
    init_neighborFiles();
    init_path();
    init_snippetProvider();
    init_tooltipSignature();
    init_workerProxy();
    TIMEOUT_MS = 300, defaultProviders = [LanguageSnippetProvider, PathSnippetProvider, NeighborFilesProvider, TooltipSignatureSnippetProvider];
    __name(isFulfilledResult, "isFulfilledResult");
    __name(isRejectedResult, "isRejectedResult");
    __name(providersSnippets, "providersSnippets");
    __name(providersErrors, "providersErrors");
    __name(providersPerformance, "providersPerformance");
    SnippetOrchestrator = class {
      constructor(providers = defaultProviders) {
        this.startThreading = () => workerProxy.startThreading();
        this.stopThreading = () => workerProxy.stopThreading();
        this.providers = providers.map(provider => new provider(workerProxy));
      }
      static {
        __name(this, "SnippetOrchestrator");
      }
      async getSnippets(context) {
        let signal = AbortSignal.timeout(TIMEOUT_MS);
        return Promise.allSettled(this.providers.map(provider => provider.getSnippets(context, signal)));
      }
    };
  });