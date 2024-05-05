function normalizeLanguageId(languageId) {
  return languageId = languageId.toLowerCase(), languageNormalizationMap[languageId] ?? languageId;
},async function getPrompt(doc, options = {}, snippets = []) {
  let completeOptions = new PromptOptions(options),
    tokenizer = getTokenizer(completeOptions.tokenizerName),
    snippetTextProcessor = new SnippetTextProcessor(completeOptions.snippetTextProcessingPreset),
    promptOrderList = new PromptOrderList(completeOptions.promptOrderListPreset),
    promptPriorityList = new PromptPriorityList(completeOptions.promptPriorityPreset),
    {
      source: source,
      offset: offset
    } = doc;
  if (offset < 0 || offset > source.length) throw new Error(`Offset ${offset} is out of range.`);
  doc.languageId = normalizeLanguageId(doc.languageId);
  let promptWishlist = new PromptWishlist(tokenizer, completeOptions.lineEnding, promptOrderList, snippetTextProcessor, promptPriorityList),
    pathSnippet = snippets.find(s => s.provider === "path"),
    languageSnippet = snippets.find(s => s.provider === "language"),
    tooltipSignatureSnippet = snippets.find(s => s.provider === "tooltip-signature");
  pathSnippet !== void 0 && pathSnippet.snippet.length > 0 ? (promptWishlist.append(pathSnippet.snippet, "PathMarker"), languageSnippet && promptWishlist.extMarkUnused({
    text: languageSnippet.snippet,
    kind: "LanguageMarker",
    tokens: tokenizer.tokenLength(languageSnippet.snippet),
    id: NaN,
    score: NaN
  })) : languageSnippet && promptWishlist.append(languageSnippet.snippet, "LanguageMarker"), snippets = snippets.filter(s => s.provider !== "language" && s.provider !== "path" && s.provider !== "tooltip-signature");
  function addSnippetsNow() {
    processSnippetsForWishlist(snippets, doc.languageId, tokenizer, promptPriorityList, options.defaultCommentMarker, completeOptions.numberOfSnippets).forEach(snippet => {
      let kind = kindForSnippetProviderType(snippet.provider);
      promptWishlist.append(snippet.announcedSnippet, kind, snippet.tokens, snippet.score);
    });
  }
  __name(addSnippetsNow, "addSnippetsNow"), addSnippetsNow();
  let directContext = source.substring(0, offset);
  tooltipSignatureSnippet !== void 0 && tokenizer.tokenLength(tooltipSignatureSnippet.snippet) <= MAX_TOOLTIP_SIGNATURE_TOKENS ? ([directContext, tooltipSignatureSnippet] = transferLastLineToTooltipSignature(directContext, tooltipSignatureSnippet), promptWishlist.append(tooltipSignatureSnippet.snippet, "TooltipSignature")) : tooltipSignatureSnippet !== void 0 && promptWishlist.extMarkUnused({
    text: tooltipSignatureSnippet.snippet,
    kind: "TooltipSignature",
    tokens: tokenizer.tokenLength(tooltipSignatureSnippet.snippet),
    id: NaN,
    score: NaN
  }), promptWishlist.append(directContext, "BeforeCursor");
  let suffixText = source.slice(offset),
    {
      promptInfo: promptInfo,
      newCachedSuffix: newCachedSuffix
    } = promptWishlist.fulfill(suffixText, completeOptions, cachedSuffix);
  return cachedSuffix = newCachedSuffix, promptInfo;
},var cachedSuffix,
  MAX_PROMPT_LENGTH,
  DEFAULT_NUM_OF_SNIPPETS,
  MAX_TOOLTIP_SIGNATURE_TOKENS,
  LineEndingOptions,
  SuffixOption,
  SuffixMatchOption,
  PromptOptions,
  languageNormalizationMap,
  init_prompt = __esmMin(() => {
    "use strict";

    init_neighboringFiles();
    init_snippets();
    init_snippetTextProcessing();
    init_tokenization();
    init_tooltipSignature();
    init_wishlist();
    cachedSuffix = {
      text: "",
      tokens: []
    }, MAX_PROMPT_LENGTH = 1500, DEFAULT_NUM_OF_SNIPPETS = 4, MAX_TOOLTIP_SIGNATURE_TOKENS = 150, LineEndingOptions = (n => (LineEndingOptions.ConvertToUnix = "unix", LineEndingOptions.KeepOriginal = "keep", LineEndingOptions))(Rn || {}), SuffixOption = (n => (SuffixOption.None = "none", SuffixOption.FifteenPercent = "fifteenPercent", SuffixOption))(xo || {}), SuffixMatchOption = (n => (SuffixMatchOption.Equal = "equal", SuffixMatchOption.Levenshtein = "levenshteineditdistance", SuffixMatchOption))(Io || {}), PromptOptions = class {
      constructor(options) {
        this.maxPromptLength = MAX_PROMPT_LENGTH;
        this.numberOfSnippets = DEFAULT_NUM_OF_SNIPPETS;
        this.neighboringTabs = "eager";
        this.lineEnding = "unix";
        this.suffixPercent = 0;
        this.tokenizerName = "cl100k";
        this.suffixMatchThreshold = 0;
        this.promptOrderListPreset = "default";
        this.promptPriorityPreset = "default";
        this.snippetTextProcessingPreset = "default";
        this.defaultCommentMarker = void 0;
        if (Object.assign(this, options), this.suffixPercent < 0 || this.suffixPercent > 100) throw new Error(`suffixPercent must be between 0 and 100, but was ${this.suffixPercent}`);
        if (this.suffixMatchThreshold < 0 || this.suffixMatchThreshold > 100) throw new Error(`suffixMatchThreshold must be at between 0 and 100, but was ${this.suffixMatchThreshold}`);
      }
      static {
        __name(this, "PromptOptions");
      }
    }, languageNormalizationMap = {
      javascriptreact: "javascript",
      jsx: "javascript",
      typescriptreact: "typescript",
      jade: "pug",
      cshtml: "razor",
      c: "cpp"
    };
    __name(normalizeLanguageId, "normalizeLanguageId");
    __name(getPrompt, "getPrompt");
  });