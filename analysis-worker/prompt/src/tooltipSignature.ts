function announceTooltipSignatureSnippet(snippet, targetDocLanguageId) {
  let formattedSnippet = `Use ${snippet}`;
  return commentBlockAsSingles(formattedSnippet, targetDocLanguageId);
},function endsWithAttributesOrMethod(doc) {
  let directContext = doc.source.substring(0, doc.offset);
  return regexAttributeOrMethod.test(directContext);
},function transferLastLineToTooltipSignature(directContext, tooltipSignatureSnippet) {
  let lastLineStart = directContext.lastIndexOf(`
`) + 1,
    directContextBeforePartialLastLine = directContext.substring(0, lastLineStart),
    partialLastLine = directContext.substring(lastLineStart);
  return tooltipSignatureSnippet.snippet = tooltipSignatureSnippet.snippet + partialLastLine, [directContextBeforePartialLastLine, tooltipSignatureSnippet];
},var regexAttributeOrMethod,
  init_tooltipSignature = __esmMin(() => {
    "use strict";

    init_languageMarker();
    regexAttributeOrMethod = /(\.|\->|::)\w+$/;
    __name(announceTooltipSignatureSnippet, "announceTooltipSignatureSnippet");
    __name(endsWithAttributesOrMethod, "endsWithAttributesOrMethod");
    __name(transferLastLineToTooltipSignature, "transferLastLineToTooltipSignature");
  });