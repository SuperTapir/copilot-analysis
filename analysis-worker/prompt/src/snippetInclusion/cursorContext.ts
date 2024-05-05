function cursorContextOptions(options) {
  return {
    ...defaultCursorContextOptions,
    ...options
  };
},function getCursorContext(doc, options = {}) {
  let completeOptions = cursorContextOptions(options),
    tokenizer = getTokenizer(completeOptions.tokenizerName);
  if (completeOptions.maxLineCount !== void 0 && completeOptions.maxLineCount < 0) throw new Error("maxLineCount must be non-negative if defined");
  if (completeOptions.maxTokenLength !== void 0 && completeOptions.maxTokenLength < 0) throw new Error("maxTokenLength must be non-negative if defined");
  if (completeOptions.maxLineCount === 0 || completeOptions.maxTokenLength === 0) return {
    context: "",
    lineCount: 0,
    tokenLength: 0,
    tokenizerName: completeOptions.tokenizerName
  };
  let context = doc.source.slice(0, doc.offset);
  return completeOptions.maxLineCount !== void 0 && (context = context.split(`
`).slice(-completeOptions.maxLineCount).join(`
`)), completeOptions.maxTokenLength !== void 0 && (context = tokenizer.takeLastLinesTokens(context, completeOptions.maxTokenLength)), {
    context: context,
    lineCount: context.split(`
`).length,
    tokenLength: tokenizer.tokenLength(context),
    tokenizerName: completeOptions.tokenizerName
  };
},var defaultCursorContextOptions,
  init_cursorContext = __esmMin(() => {
    "use strict";

    init_tokenization();
    defaultCursorContextOptions = {
      tokenizerName: "cl100k"
    };
    __name(cursorContextOptions, "cursorContextOptions");
    __name(getCursorContext, "getCursorContext");
  });