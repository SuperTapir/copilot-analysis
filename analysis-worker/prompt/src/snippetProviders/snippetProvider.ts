var ProviderTimeoutError,
  SnippetProvider,
  init_snippetProvider = __esmMin(() => {
    "use strict";

    init_orchestrator();
    ProviderTimeoutError = class extends Error {
      static {
        __name(this, "ProviderTimeoutError");
      }
      constructor(message) {
        super(message), this.name = "ProviderTimeoutError";
      }
    }, SnippetProvider = class {
      static {
        __name(this, "SnippetProvider");
      }
      constructor(workerProxy) {
        this.api = workerProxy;
      }
      getSnippets(context, signal) {
        return new Promise((resolve, reject) => {
          signal.aborted && reject({
            error: new ProviderTimeoutError("provider aborted"),
            providerType: this.type
          }), signal.addEventListener("abort", () => {
            reject({
              error: new ProviderTimeoutError(`max runtime exceeded: ${TIMEOUT_MS} ms`),
              providerType: this.type
            });
          }, {
            once: !0
          });
          let startTime = performance.now();
          this.buildSnippets(context).then(snippets => {
            let endTime = performance.now();
            resolve({
              snippets: snippets,
              providerType: this.type,
              runtime: endTime - startTime
            });
          }).catch(error => {
            reject({
              error: error,
              providerType: this.type
            });
          });
        });
      }
    };
  });