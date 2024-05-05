var SnippetTextProcessor,
  init_snippetTextProcessing = __esmMin(() => {
    "use strict";

    init_truncateFirstLinesFirst();
    init_wishlist();
    SnippetTextProcessor = class {
      static {
        __name(this, "SnippetTextProcessor");
      }
      constructor(preset = "default") {
        switch (preset) {
          case "default":
          default:
            this.kindToFunctionMap = new Map([["BeforeCursor", truncateFirstLinesFirst]]);
        }
      }
      isSummarizationAvailable(kind) {
        return this.kindToFunctionMap.has(kind);
      }
      summarize(tokenizer, snippet, targetTokenBudget) {
        return this.kindToFunctionMap.get(snippet.kind)(tokenizer, snippet, targetTokenBudget);
      }
    };
  });