var PathSnippetProvider,
  init_path = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_prompt();
    init_snippets();
    init_snippetProvider();
    PathSnippetProvider = class extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "path";
      }
      static {
        __name(this, "PathSnippetProvider");
      }
      async buildSnippets(context) {
        let {
          currentFile: currentFile,
          options: options
        } = context;
        return currentFile.languageId = normalizeLanguageId(currentFile.languageId), [{
          provider: this.type,
          semantics: "snippet",
          snippet: newLineEnded(getPathMarker(currentFile, options.defaultCommentMarker)),
          relativePath: currentFile.relativePath,
          startLine: 0,
          endLine: 0,
          score: 0
        }];
      }
    };
  });