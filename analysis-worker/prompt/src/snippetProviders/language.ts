var LanguageSnippetProvider,
  init_language = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_prompt();
    init_snippets();
    init_snippetProvider();
    LanguageSnippetProvider = class extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "language";
      }
      static {
        __name(this, "LanguageSnippetProvider");
      }
      async buildSnippets(context) {
        let {
          currentFile: currentFile,
          options: options
        } = context;
        return currentFile.languageId = normalizeLanguageId(currentFile.languageId), [{
          provider: this.type,
          semantics: "snippet",
          snippet: newLineEnded(getLanguageMarker(currentFile, options.defaultCommentMarker)),
          relativePath: currentFile.relativePath,
          startLine: 0,
          endLine: 0,
          score: 0
        }];
      }
    };
  });