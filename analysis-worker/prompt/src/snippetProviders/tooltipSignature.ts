var TooltipSignatureSnippetProvider,
  init_tooltipSignature = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_prompt();
    init_snippets();
    init_tooltipSignature();
    init_snippetProvider();
    TooltipSignatureSnippetProvider = class extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "tooltip-signature";
      }
      static {
        __name(this, "TooltipSignatureSnippetProvider");
      }
      async buildSnippets(context) {
        let {
            currentFile: currentFile,
            tooltipSignature: tooltipSignature
          } = context,
          snippets = [];
        return currentFile.languageId = normalizeLanguageId(currentFile.languageId), tooltipSignature && endsWithAttributesOrMethod(currentFile) && snippets.push({
          provider: this.type,
          semantics: "snippet",
          snippet: newLineEnded(announceTooltipSignatureSnippet(tooltipSignature, currentFile.languageId)),
          relativePath: currentFile.relativePath,
          startLine: 0,
          endLine: 0,
          score: 0
        }), snippets;
      }
    };
  });