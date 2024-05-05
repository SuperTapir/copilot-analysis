var init_elidableText = __esmMin(() => {
  "use strict";

  init_elidableText();
  init_fromDiff();
  init_fromIndentationTrees();
  init_fromSourceCode();
  init_lineWithValueAndCost();
});,function hasLanguageMarker({
  source: source
}) {
  return source.startsWith("#!") || source.startsWith("<!DOCTYPE");
},function comment(text, languageId, defaultCommentMarker) {
  var _a;
  let markers = (_a = languageCommentMarkers[languageId]) != null ? _a : defaultCommentMarker;
  if (markers) {
    let end = markers.end == "" ? "" : " " + markers.end;
    return `${markers.start} ${text}${end}`;
  }
  return "";
},function commentBlockAsSingles(text, languageId, defaultCommentMarker) {
  if (!languageCommentMarkers[languageId] && !defaultCommentMarker || text === "") return "";
  let trailingNewline = text.endsWith(`
`),
    commented = (trailingNewline ? text.slice(0, -1) : text).split(`
`).map(line => comment(line, languageId, defaultCommentMarker)).join(`
`);
  return trailingNewline ? commented + `
` : commented;
},function getLanguageMarker(doc, defaultCommentMarker) {
  let {
    languageId: languageId
  } = doc;
  return dontAddLanguageMarker.indexOf(languageId) === -1 && !hasLanguageMarker(doc) ? languageId in shebangLines ? shebangLines[languageId] : comment(`Language: ${languageId}`, languageId, defaultCommentMarker) : "";
},function getPathMarker(doc, defaultCommentMarker) {
  return doc.relativePath ? comment(`Path: ${doc.relativePath}`, doc.languageId, defaultCommentMarker) : "";
},function newLineEnded(str) {
  return str === "" || str.endsWith(`
`) ? str : str + `
`;
},var languageCommentMarkers,
  dontAddLanguageMarker,
  shebangLines,
  init_languageMarker = __esmMin(() => {
    "use strict";

    languageCommentMarkers = {
      abap: {
        start: '"',
        end: ""
      },
      aspdotnet: {
        start: "<%--",
        end: "--%>"
      },
      bat: {
        start: "REM",
        end: ""
      },
      bibtex: {
        start: "%",
        end: ""
      },
      blade: {
        start: "#",
        end: ""
      },
      BluespecSystemVerilog: {
        start: "//",
        end: ""
      },
      c: {
        start: "//",
        end: ""
      },
      clojure: {
        start: ";",
        end: ""
      },
      coffeescript: {
        start: "//",
        end: ""
      },
      cpp: {
        start: "//",
        end: ""
      },
      csharp: {
        start: "//",
        end: ""
      },
      css: {
        start: "/*",
        end: "*/"
      },
      cuda: {
        start: "//",
        end: ""
      },
      dart: {
        start: "//",
        end: ""
      },
      dockerfile: {
        start: "#",
        end: ""
      },
      dotenv: {
        start: "#",
        end: ""
      },
      elixir: {
        start: "#",
        end: ""
      },
      erb: {
        start: "<%#",
        end: "%>"
      },
      erlang: {
        start: "%",
        end: ""
      },
      fsharp: {
        start: "//",
        end: ""
      },
      go: {
        start: "//",
        end: ""
      },
      graphql: {
        start: "#",
        end: ""
      },
      groovy: {
        start: "//",
        end: ""
      },
      haml: {
        start: "-#",
        end: ""
      },
      handlebars: {
        start: "{{!",
        end: "}}"
      },
      haskell: {
        start: "--",
        end: ""
      },
      hlsl: {
        start: "//",
        end: ""
      },
      html: {
        start: "<!--",
        end: "-->"
      },
      ini: {
        start: ";",
        end: ""
      },
      java: {
        start: "//",
        end: ""
      },
      javascript: {
        start: "//",
        end: ""
      },
      javascriptreact: {
        start: "//",
        end: ""
      },
      jsonc: {
        start: "//",
        end: ""
      },
      jsx: {
        start: "//",
        end: ""
      },
      julia: {
        start: "#",
        end: ""
      },
      kotlin: {
        start: "//",
        end: ""
      },
      latex: {
        start: "%",
        end: ""
      },
      legend: {
        start: "//",
        end: ""
      },
      less: {
        start: "//",
        end: ""
      },
      lua: {
        start: "--",
        end: ""
      },
      makefile: {
        start: "#",
        end: ""
      },
      markdown: {
        start: "[]: #",
        end: ""
      },
      "objective-c": {
        start: "//",
        end: ""
      },
      "objective-cpp": {
        start: "//",
        end: ""
      },
      perl: {
        start: "#",
        end: ""
      },
      php: {
        start: "//",
        end: ""
      },
      powershell: {
        start: "#",
        end: ""
      },
      pug: {
        start: "//",
        end: ""
      },
      python: {
        start: "#",
        end: ""
      },
      ql: {
        start: "//",
        end: ""
      },
      r: {
        start: "#",
        end: ""
      },
      razor: {
        start: "<!--",
        end: "-->"
      },
      ruby: {
        start: "#",
        end: ""
      },
      rust: {
        start: "//",
        end: ""
      },
      sass: {
        start: "//",
        end: ""
      },
      scala: {
        start: "//",
        end: ""
      },
      scss: {
        start: "//",
        end: ""
      },
      shellscript: {
        start: "#",
        end: ""
      },
      slim: {
        start: "/",
        end: ""
      },
      solidity: {
        start: "//",
        end: ""
      },
      sql: {
        start: "--",
        end: ""
      },
      stylus: {
        start: "//",
        end: ""
      },
      svelte: {
        start: "<!--",
        end: "-->"
      },
      swift: {
        start: "//",
        end: ""
      },
      systemverilog: {
        start: "//",
        end: ""
      },
      terraform: {
        start: "#",
        end: ""
      },
      tex: {
        start: "%",
        end: ""
      },
      typescript: {
        start: "//",
        end: ""
      },
      typescriptreact: {
        start: "//",
        end: ""
      },
      vb: {
        start: "'",
        end: ""
      },
      verilog: {
        start: "//",
        end: ""
      },
      "vue-html": {
        start: "<!--",
        end: "-->"
      },
      vue: {
        start: "//",
        end: ""
      },
      xml: {
        start: "<!--",
        end: "-->"
      },
      xsl: {
        start: "<!--",
        end: "-->"
      },
      yaml: {
        start: "#",
        end: ""
      }
    }, dontAddLanguageMarker = ["php", "plaintext"], shebangLines = {
      html: "<!DOCTYPE html>",
      python: "#!/usr/bin/env python3",
      ruby: "#!/usr/bin/env ruby",
      shellscript: "#!/bin/sh",
      yaml: "# YAML data"
    };
    __name(hasLanguageMarker, "hasLanguageMarker");
    __name(comment, "comment");
    __name(commentBlockAsSingles, "commentBlockAsSingles");
    __name(getLanguageMarker, "getLanguageMarker");
    __name(getPathMarker, "getPathMarker");
    __name(newLineEnded, "newLineEnded");
  });,function cursorContextOptions(options) {
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
  });,function findEditDistanceScore(a, b) {
  if (a.length === 0 || b.length === 0) return {
    score: a.length + b.length
  };
  let matrix = Array.from({
    length: a.length
  }).map(() => Array.from({
    length: b.length
  }).map(() => 0));
  for (let i = 0; i < a.length; i++) matrix[i][0] = i;
  for (let i = 0; i < b.length; i++) matrix[0][i] = i;
  for (let j = 0; j < b.length; j++) for (let i = 0; i < a.length; i++) matrix[i][j] = Math.min((i == 0 ? j : matrix[i - 1][j]) + 1, (j == 0 ? i : matrix[i][j - 1]) + 1, (i == 0 || j == 0 ? Math.max(i, j) : matrix[i - 1][j - 1]) + (a[i] == b[j] ? 0 : 1));
  return {
    score: matrix[a.length - 1][b.length - 1]
  };
},var init_suffixMatchCriteria = __esmMin(() => {
  "use strict";

  __name(findEditDistanceScore, "findEditDistanceScore");
});,function kindForSnippetProviderType(provider) {
  switch (provider) {
    case "neighboring-tabs":
      return "SimilarFile";
    case "retrieval":
      return "RetrievalSnippet";
    case "path":
      return "PathMarker";
    case "language":
      return "LanguageMarker";
    case "tooltip-signature":
      return "TooltipSignature";
    default:
      throw new Error(`Unknown snippet provider type ${provider}`);
  }
},var MAX_EDIT_DISTANCE_LENGTH,
  TOKENS_RESERVED_FOR_SUFFIX_ENCODING,
  _PromptBackground,
  PromptBackground,
  _PromptChoices,
  PromptChoices,
  _PromptOrderList,
  PromptOrderList,
  _PromptPriorityList,
  PromptPriorityList,
  _PromptElementRanges,
  PromptElementRanges,
  _PromptWishlist,
  PromptWishlist,
  init_wishlist = __esmMin(() => {
    "use strict";

    init_lib();
    init_prompt();
    init_suffixMatchCriteria();
    MAX_EDIT_DISTANCE_LENGTH = 50, TOKENS_RESERVED_FOR_SUFFIX_ENCODING = 5, _PromptBackground = class _PromptBackground {
      constructor() {
        this.used = new Map();
        this.unused = new Map();
      }
      add(other) {
        for (let [id, element] of other.used) this.used.set(id, element);
        for (let [id, element] of other.unused) this.unused.set(id, element);
      }
      markUsed(element) {
        this.IsSnippet(element) && this.used.set(element.id, this.convert(element));
      }
      undoMarkUsed(element) {
        this.IsSnippet(element) && this.used.delete(element.id);
      }
      markUnused(element) {
        this.IsSnippet(element) && this.unused.set(element.id, this.convert(element));
      }
      convert(element) {
        return {
          score: element.score.toFixed(4),
          length: element.text.length
        };
      }
      IsSnippet(element) {
        return element.kind == "SimilarFile" || element.kind == "RetrievalSnippet" || element.kind == "TooltipSignature";
      }
    };
    __name(_PromptBackground, "PromptBackground");
    PromptBackground = _PromptBackground, _PromptChoices = class _PromptChoices {
      constructor() {
        this.used = new Map();
        this.unused = new Map();
        this.usedCounts = new Map();
        this.unusedCounts = new Map();
      }
      add(other) {
        for (let [kind, count] of other.used) this.used.set(kind, (this.used.get(kind) || 0) + count);
        for (let [kind, count] of other.unused) this.unused.set(kind, (this.unused.get(kind) || 0) + count);
        for (let [kind, count] of other.usedCounts) this.usedCounts.set(kind, (this.usedCounts.get(kind) || 0) + count);
        for (let [kind, count] of other.unusedCounts) this.unusedCounts.set(kind, (this.unusedCounts.get(kind) || 0) + count);
      }
      markUsed(element) {
        this.used.set(element.kind, (this.used.get(element.kind) || 0) + element.tokens), element.kind == "BeforeCursor" ? this.usedCounts.set(element.kind, (this.usedCounts.get(element.kind) || 0) + element.text.split(`
`).length) : this.usedCounts.set(element.kind, (this.usedCounts.get(element.kind) || 0) + 1);
      }
      undoMarkUsed(element) {
        this.used.set(element.kind, (this.used.get(element.kind) || 0) - element.tokens), element.kind == "BeforeCursor" ? this.usedCounts.set(element.kind, (this.usedCounts.get(element.kind) || 0) - element.text.split(`
`).length) : this.usedCounts.set(element.kind, (this.usedCounts.get(element.kind) || 0) - 1);
      }
      markUnused(element) {
        this.unused.set(element.kind, (this.unused.get(element.kind) || 0) + element.tokens), element.kind == "BeforeCursor" ? this.unusedCounts.set(element.kind, (this.unusedCounts.get(element.kind) || 0) + element.text.split(`
`).length) : this.unusedCounts.set(element.kind, (this.unusedCounts.get(element.kind) || 0) + 1);
      }
    };
    __name(_PromptChoices, "PromptChoices");
    PromptChoices = _PromptChoices, _PromptOrderList = class _PromptOrderList {
      constructor(preset = "default") {
        switch (preset) {
          default:
            this._rankedList = ["LanguageMarker", "PathMarker", "RetrievalSnippet", "SimilarFile", "BeforeCursor", "TooltipSignature"];
        }
      }
      get rankedList() {
        return this._rankedList;
      }
      sortElements(elements) {
        return elements.sort((a, b) => {
          let aIndex = this._rankedList.indexOf(a.kind),
            bIndex = this._rankedList.indexOf(b.kind);
          if (aIndex === -1 || bIndex === -1) throw `Invalid element kind: ${a.kind} or ${b.kind}, not found in prompt element ordering list`;
          return aIndex === bIndex ? a.id - b.id : aIndex - bIndex;
        });
      }
    };
    __name(_PromptOrderList, "PromptOrderList");
    PromptOrderList = _PromptOrderList, _PromptPriorityList = class _PromptPriorityList extends PromptOrderList {
      constructor(preset = "default") {
        switch (super(), preset) {
          case "office-exp":
            this._rankedList = ["PathMarker", "TooltipSignature", "BeforeCursor", "SimilarFile", "RetrievalSnippet", "LanguageMarker"];
            break;
          default:
            this._rankedList = ["TooltipSignature", "BeforeCursor", "SimilarFile", "RetrievalSnippet", "PathMarker", "LanguageMarker"];
        }
      }
      sortElements(elements) {
        return elements.sort((a, b) => {
          let aIndex = this._rankedList.indexOf(a.kind),
            bIndex = this._rankedList.indexOf(b.kind);
          if (aIndex === -1 || bIndex === -1) throw `Invalid element kind: ${a.kind} or ${b.kind}, not found in snippet provider priority list`;
          return aIndex === bIndex ? b.id - a.id : aIndex - bIndex;
        });
      }
    };
    __name(_PromptPriorityList, "PromptPriorityList");
    PromptPriorityList = _PromptPriorityList;
    __name(kindForSnippetProviderType, "kindForSnippetProviderType");
    _PromptElementRanges = class _PromptElementRanges {
      constructor(usedElements) {
        this.ranges = new Array();
        let nextRangeStart = 0,
          previousKind;
        for (let element of usedElements) element.text.length !== 0 && (previousKind === "BeforeCursor" && element.kind === "BeforeCursor" ? this.ranges[this.ranges.length - 1].end += element.text.length : this.ranges.push({
          kind: element.kind,
          start: nextRangeStart,
          end: nextRangeStart + element.text.length
        }), previousKind = element.kind, nextRangeStart += element.text.length);
      }
    };
    __name(_PromptElementRanges, "PromptElementRanges");
    PromptElementRanges = _PromptElementRanges, _PromptWishlist = class _PromptWishlist {
      constructor(tokenizer, lineEndingOption, orderingList, snippetTextProcessor, priorityList) {
        this.tokenizer = tokenizer;
        this.lineEndingOption = lineEndingOption;
        this.orderingList = orderingList;
        this.snippetTextProcessor = snippetTextProcessor;
        this.priorityList = priorityList;
        this.content = [];
        this.basePromptBackground = new PromptBackground();
        this.baseTallyOfChoices = new PromptChoices();
      }
      extMarkUnused(element) {
        this.basePromptBackground.markUnused(element), this.baseTallyOfChoices.markUnused(element);
      }
      getContent() {
        return [...this.content];
      }
      convertLineEndings(text) {
        return this.lineEndingOption === "unix" && (text = text.replace(/\r\n/g, `
`).replace(/\r/g, `
`)), text;
      }
      maxPrefixTokenLength() {
        return this.content.reduce((sum, element) => sum += element.tokens, 0);
      }
      append(text, kind, tokens = this.tokenizer.tokenLength(text), score = NaN) {
        text = this.convertLineEndings(text);
        let id = this.content.length;
        return this.content.push({
          id: id,
          text: text,
          kind: kind,
          tokens: tokens,
          score: score
        }), id;
      }
      fulfillPrefix(maxPromptLength) {
        let promptBackground = new PromptBackground();
        promptBackground.add(this.basePromptBackground);
        let tallyOfChoices = new PromptChoices();
        tallyOfChoices.add(this.baseTallyOfChoices);
        function markUsed(element) {
          promptBackground.markUsed(element), tallyOfChoices.markUsed(element);
        }
        __name(markUsed, "markUsed");
        function undoMarkUsed(element) {
          promptBackground.undoMarkUsed(element), tallyOfChoices.undoMarkUsed(element);
        }
        __name(undoMarkUsed, "undoMarkUsed");
        function markUnused(element) {
          promptBackground.markUnused(element), tallyOfChoices.markUnused(element);
        }
        __name(markUnused, "markUnused"), this.priorityList.sortElements(this.content);
        let budgetBreakingElement,
          remainingContent = [],
          remainingBudget = maxPromptLength;
        this.content.forEach(e => {
          if (remainingBudget > 0 || budgetBreakingElement === void 0) {
            let budgetUse = e.tokens;
            if (remainingBudget >= budgetUse) remainingBudget -= budgetUse, markUsed(e), remainingContent.push(e);else if (e.kind === "BeforeCursor") {
              let {
                summarizedElement: summarizedElement,
                removedMaterial: removedMaterial
              } = this.snippetTextProcessor.summarize(this.tokenizer, e, remainingBudget);
              e = summarizedElement, budgetUse = e.tokens, remainingBudget -= budgetUse, e.text.length > 0 && markUsed(e), removedMaterial.text.length > 0 && markUnused(removedMaterial), remainingContent.push(e);
            } else budgetBreakingElement === void 0 ? budgetBreakingElement = e : markUnused(e);
          } else markUnused(e);
        }), this.orderingList.sortElements(remainingContent);
        let prompt = remainingContent.reduce((a, b) => a + b.text, ""),
          promptLength = this.tokenizer.tokenLength(prompt);
        for (; promptLength > maxPromptLength;) {
          this.priorityList.sortElements(remainingContent);
          let removeAfterAll = remainingContent.pop();
          removeAfterAll && (undoMarkUsed(removeAfterAll), markUnused(removeAfterAll), budgetBreakingElement !== void 0 && markUnused(budgetBreakingElement), budgetBreakingElement = void 0), this.orderingList.sortElements(remainingContent), prompt = remainingContent.reduce((a, b) => a + b.text, ""), promptLength = this.tokenizer.tokenLength(prompt);
        }
        let extendedContent = [...remainingContent];
        if (budgetBreakingElement !== void 0) {
          extendedContent.push(budgetBreakingElement), this.orderingList.sortElements(extendedContent);
          let prompt = extendedContent.reduce((a, b) => a + b.text, ""),
            promptLength = this.tokenizer.tokenLength(prompt);
          if (promptLength <= maxPromptLength) {
            markUsed(budgetBreakingElement);
            let promptElementRanges = new PromptElementRanges(extendedContent);
            return {
              prefix: prompt,
              suffix: "",
              prefixLength: promptLength,
              suffixLength: 0,
              promptChoices: tallyOfChoices,
              promptBackground: promptBackground,
              promptElementRanges: promptElementRanges
            };
          } else markUnused(budgetBreakingElement);
        }
        let promptElementRanges = new PromptElementRanges(remainingContent);
        return {
          prefix: prompt,
          suffix: "",
          prefixLength: promptLength,
          suffixLength: 0,
          promptChoices: tallyOfChoices,
          promptBackground: promptBackground,
          promptElementRanges: promptElementRanges
        };
      }
      fulfill(suffixText, completeOptions, cachedSuffix) {
        var _a;
        if (completeOptions.suffixPercent === 0 || suffixText.length === 0) return {
          promptInfo: this.fulfillPrefix(completeOptions.maxPromptLength),
          newCachedSuffix: cachedSuffix
        };
        let availableTokens = completeOptions.maxPromptLength - TOKENS_RESERVED_FOR_SUFFIX_ENCODING,
          prefixTokenBudget = Math.floor(availableTokens * (100 - completeOptions.suffixPercent) / 100),
          suffixTokenBudget = availableTokens - prefixTokenBudget,
          trimmedSuffixText = suffixText.trimStart();
        if (availableTokens > MAX_EDIT_DISTANCE_LENGTH && suffixTokenBudget < MAX_EDIT_DISTANCE_LENGTH) throw new Error(`Suffix budget is smaller than MAX_EDIT_DISTANCE_LENGTH: ${suffixTokenBudget} < ${MAX_EDIT_DISTANCE_LENGTH}
`);
        let firstSuffixTokens = this.tokenizer.takeFirstTokens(trimmedSuffixText, MAX_EDIT_DISTANCE_LENGTH),
          useCachedSuffix = !1;
        firstSuffixTokens.tokens.length > 0 && completeOptions.suffixMatchThreshold > 0 && 100 * ((_a = findEditDistanceScore(firstSuffixTokens.tokens, cachedSuffix.tokens.slice(0, MAX_EDIT_DISTANCE_LENGTH))) == null ? void 0 : _a.score) < completeOptions.suffixMatchThreshold * firstSuffixTokens.tokens.length && (useCachedSuffix = !0);
        let newCachedSuffix;
        if (useCachedSuffix) prefixTokenBudget = availableTokens - cachedSuffix.tokens.length, newCachedSuffix = cachedSuffix;else {
          let maxPrefixTokenLength = this.maxPrefixTokenLength(),
            maxSuffixTokenLength = this.tokenizer.tokenLength(trimmedSuffixText);
          maxPrefixTokenLength < prefixTokenBudget ? (prefixTokenBudget = maxPrefixTokenLength, suffixTokenBudget = availableTokens - prefixTokenBudget) : maxSuffixTokenLength < suffixTokenBudget && (prefixTokenBudget = availableTokens - maxSuffixTokenLength, suffixTokenBudget = maxSuffixTokenLength), newCachedSuffix = this.tokenizer.takeFirstTokens(trimmedSuffixText, suffixTokenBudget);
        }
        let promptInfo = this.fulfillPrefix(prefixTokenBudget);
        return promptInfo.suffix = newCachedSuffix.text, promptInfo.suffixLength = newCachedSuffix.tokens.length, {
          promptInfo: promptInfo,
          newCachedSuffix: newCachedSuffix
        };
      }
    };
    __name(_PromptWishlist, "PromptWishlist");
    PromptWishlist = _PromptWishlist;
  });,function announceSnippet(snippet, targetDocLanguageId, defaultCommentMarker) {
  let semantics = snippetSemanticsToString[snippet.semantics],
    headlinedSnippet = (snippet.relativePath ? `Compare this ${semantics} from ${snippet.relativePath}:` : `Compare this ${semantics}:`) + `
` + snippet.snippet;
  return headlinedSnippet.endsWith(`
`) || (headlinedSnippet += `
`), commentBlockAsSingles(headlinedSnippet, targetDocLanguageId, defaultCommentMarker);
},function sortSnippetsDescending(snippets) {
  snippets.sort((a, b) => b.score - a.score);
},function selectSnippets(snippets, numberOfSnippets, promptPriorityList) {
  if (numberOfSnippets == 0) return [];
  let snippetsWithElementKind = snippets.map(snippet => ({
      ...snippet,
      kind: kindForSnippetProviderType(snippet.provider)
    })),
    allSnippets = [];
  return promptPriorityList.rankedList.forEach(promptElementKind => {
    let snippets = snippetsWithElementKind.filter(({
      kind: snippetKind
    }) => snippetKind === promptElementKind);
    sortSnippetsDescending(snippets), allSnippets.push(...snippets);
  }), allSnippets.slice(0, numberOfSnippets);
},function processSnippetsForWishlist(snippets, targetDocLanguageId, tokenizer, promptPriorityList, defaultCommentMarker, totalPrioritized) {
  let processedSnippets = selectSnippets(snippets, totalPrioritized, promptPriorityList).map(snippet => {
    let announced = announceSnippet(snippet, targetDocLanguageId, defaultCommentMarker),
      tokens = tokenizer.tokenLength(announced);
    return {
      announcedSnippet: announced,
      provider: snippet.provider,
      score: snippet.score,
      tokens: tokens,
      relativePath: snippet.relativePath
    };
  });
  return sortSnippetsDescending(processedSnippets), processedSnippets.reverse(), processedSnippets;
},var SnippetProviderType,
  SnippetSemantics,
  snippetSemanticsToString,
  init_snippets = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_wishlist();
    SnippetProviderType = (o => (SnippetProviderType.NeighboringTabs = "neighboring-tabs", SnippetProviderType.Retrieval = "retrieval", SnippetProviderType.Language = "language", SnippetProviderType.Path = "path", SnippetProviderType.TooltipSignature = "tooltip-signature", SnippetProviderType))(Ud || {}), SnippetSemantics = (m => (SnippetSemantics.Function = "function", SnippetSemantics.Snippet = "snippet", SnippetSemantics.Variable = "variable", SnippetSemantics.Parameter = "parameter", SnippetSemantics.Method = "method", SnippetSemantics.Class = "class", SnippetSemantics.Module = "module", SnippetSemantics.Alias = "alias", SnippetSemantics.Enum = "enum member", SnippetSemantics.Interface = "interface", SnippetSemantics))(g_ || {}), snippetSemanticsToString = {
      function: "function",
      snippet: "snippet",
      variable: "variable",
      parameter: "parameter",
      method: "method",
      class: "class",
      module: "module",
      alias: "alias",
      "enum member": "enum member",
      interface: "interface"
    };
    __name(announceSnippet, "announceSnippet");
    __name(sortSnippetsDescending, "sortSnippetsDescending");
    __name(selectSnippets, "selectSnippets");
    __name(processSnippetsForWishlist, "processSnippetsForWishlist");
  });,function splitIntoWords(a) {
  return a.split(/[^a-zA-Z0-9]/).filter(x => x.length > 0);
},var _FifoCache,
  FifoCache,
  _Tokenizer,
  Tokenizer,
  WINDOWED_TOKEN_SET_CACHE,
  _WindowedMatcher,
  WindowedMatcher,
  ENGLISH_STOPS,
  GENERIC_STOPS,
  SPECIFIC_STOPS,
  init_selectRelevance = __esmMin(() => {
    "use strict";

    init_snippets();
    _FifoCache = class _FifoCache {
      constructor(size) {
        this.keys = [];
        this.cache = {};
        this.size = size;
      }
      put(key, value) {
        var _a;
        if (this.cache[key] = value, this.keys.length > this.size) {
          this.keys.push(key);
          let leavingKey = (_a = this.keys.shift()) != null ? _a : "";
          delete this.cache[leavingKey];
        }
      }
      get(key) {
        return this.cache[key];
      }
    };
    __name(_FifoCache, "FifoCache");
    FifoCache = _FifoCache, _Tokenizer = class _Tokenizer {
      constructor(doc) {
        var _a;
        this.stopsForLanguage = (_a = SPECIFIC_STOPS.get(doc.languageId)) != null ? _a : GENERIC_STOPS;
      }
      tokenize(a) {
        return new Set(splitIntoWords(a).filter(x => !this.stopsForLanguage.has(x)));
      }
    };
    __name(_Tokenizer, "Tokenizer");
    Tokenizer = _Tokenizer, WINDOWED_TOKEN_SET_CACHE = new FifoCache(20), _WindowedMatcher = class _WindowedMatcher {
      constructor(referenceDoc) {
        this.referenceDoc = referenceDoc, this.tokenizer = new Tokenizer(referenceDoc);
      }
      get referenceTokens() {
        return this.tokenizer.tokenize(this._getCursorContextInfo(this.referenceDoc).context);
      }
      sortScoredSnippets(snippets, sortOption = "descending") {
        return sortOption == "ascending" ? snippets.sort((snippetA, snippetB) => snippetA.score > snippetB.score ? 1 : -1) : sortOption == "descending" ? snippets.sort((snippetA, snippetB) => snippetA.score > snippetB.score ? -1 : 1) : snippets;
      }
      retrieveAllSnippets(objectDoc, sortOption = "descending") {
        var _a;
        let snippets = [];
        if (objectDoc.source.length === 0 || this.referenceTokens.size === 0) return snippets;
        let lines = objectDoc.source.split(`
`),
          key = this.id() + ":" + objectDoc.source,
          tokensInWindows = (_a = WINDOWED_TOKEN_SET_CACHE.get(key)) != null ? _a : [],
          needToComputeTokens = tokensInWindows.length == 0,
          tokenizedLines = needToComputeTokens ? lines.map(this.tokenizer.tokenize, this.tokenizer) : [];
        for (let [index, [startLine, endLine]] of this.getWindowsDelineations(lines).entries()) {
          if (needToComputeTokens) {
            let tokensInWindow = new Set();
            tokenizedLines.slice(startLine, endLine).forEach(x => x.forEach(tokensInWindow.add, tokensInWindow)), tokensInWindows.push(tokensInWindow);
          }
          let tokensInWindow = tokensInWindows[index],
            score = this.similarityScore(tokensInWindow, this.referenceTokens);
          snippets.push({
            score: score,
            startLine: startLine,
            endLine: endLine
          });
        }
        return needToComputeTokens && WINDOWED_TOKEN_SET_CACHE.put(key, tokensInWindows), this.sortScoredSnippets(snippets, sortOption);
      }
      async findMatches(objectDoc) {
        let snippet = await this.findBestMatch(objectDoc);
        return snippet ? [snippet] : [];
      }
      async findBestMatch(objectDoc) {
        if (objectDoc.source.length === 0 || this.referenceTokens.size === 0) return;
        let lines = objectDoc.source.split(`
`),
          snippets = this.retrieveAllSnippets(objectDoc, "descending");
        return snippets.length === 0 || snippets[0].score === 0 ? void 0 : {
          snippet: lines.slice(snippets[0].startLine, snippets[0].endLine).join(`
`),
          semantics: "snippet",
          provider: "neighboring-tabs",
          ...snippets[0]
        };
      }
    };
    __name(_WindowedMatcher, "WindowedMatcher");
    WindowedMatcher = _WindowedMatcher;
    __name(splitIntoWords, "splitIntoWords");
    ENGLISH_STOPS = new Set(["we", "our", "you", "it", "its", "they", "them", "their", "this", "that", "these", "those", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "can", "don", "t", "s", "will", "would", "should", "what", "which", "who", "when", "where", "why", "how", "a", "an", "the", "and", "or", "not", "no", "but", "because", "as", "until", "again", "further", "then", "once", "here", "there", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "above", "below", "to", "during", "before", "after", "of", "at", "by", "about", "between", "into", "through", "from", "up", "down", "in", "out", "on", "off", "over", "under", "only", "own", "same", "so", "than", "too", "very", "just", "now"]), GENERIC_STOPS = new Set(["if", "then", "else", "for", "while", "with", "def", "function", "return", "TODO", "import", "try", "catch", "raise", "finally", "repeat", "switch", "case", "match", "assert", "continue", "break", "const", "class", "enum", "struct", "static", "new", "super", "this", "var", ...ENGLISH_STOPS]), SPECIFIC_STOPS = new Map([]);
  });,function getBasicWindowDelineations(windowLength, lines) {
  let windows = [],
    length = lines.length;
  if (length == 0) return [];
  if (length < windowLength) return [[0, length]];
  for (let startLine = 0; startLine < length - windowLength + 1; startLine++) windows.push([startLine, startLine + windowLength]);
  return windows;
},var init_windowDelineations = __esmMin(() => {
  "use strict";

  init_manipulation();
  init_parsing();
  __name(getBasicWindowDelineations, "getBasicWindowDelineations");
});,function computeScore(a, b) {
  let intersection = new Set();
  return a.forEach(x => {
    b.has(x) && intersection.add(x);
  }), intersection.size / (a.size + b.size - intersection.size);
},var _FixedWindowSizeJaccardMatcher,
  FixedWindowSizeJaccardMatcher,
  init_jaccardMatching = __esmMin(() => {
    "use strict";

    init_cursorContext();
    init_selectRelevance();
    init_windowDelineations();
    _FixedWindowSizeJaccardMatcher = class _FixedWindowSizeJaccardMatcher extends WindowedMatcher {
      constructor(referenceDoc, windowLength) {
        super(referenceDoc), this.windowLength = windowLength;
      }
      id() {
        return "fixed:" + this.windowLength;
      }
      getWindowsDelineations(lines) {
        return getBasicWindowDelineations(this.windowLength, lines);
      }
      _getCursorContextInfo(referenceDoc) {
        return getCursorContext(referenceDoc, {
          maxLineCount: this.windowLength
        });
      }
      similarityScore(a, b) {
        return computeScore(a, b);
      }
    };
    __name(_FixedWindowSizeJaccardMatcher, "FixedWindowSizeJaccardMatcher"), _FixedWindowSizeJaccardMatcher.FACTORY = __name(windowLength => ({
      to: referenceDoc => new _FixedWindowSizeJaccardMatcher(referenceDoc, windowLength)
    }), "FACTORY");
    FixedWindowSizeJaccardMatcher = _FixedWindowSizeJaccardMatcher;
    __name(computeScore, "computeScore");
  });,function getMatcher(doc, selection) {
  return FixedWindowSizeJaccardMatcher.FACTORY(selection.snippetLength).to(doc);
},async function getNeighborSnippets(doc, neighbors, options) {
  let selection = {
      ...neighborOptionToSelection[options]
    },
    matcher = getMatcher(doc, selection);
  return selection.numberOfSnippets === 0 ? [] : (await neighbors.filter(neighbor => neighbor.source.length < MAX_CHARACTERS_PER_FILE && neighbor.source.length > 0).slice(0, MAX_NUMBER_OF_FILES).reduce(async (acc, neighbor) => (await acc).concat((await matcher.findMatches(neighbor)).map(snippet => ({
    relativePath: neighbor.relativePath,
    ...snippet
  }))), Promise.resolve([]))).filter(neighbor => neighbor.score && neighbor.snippet && neighbor.score > selection.threshold).sort((a, b) => a.score - b.score).slice(-selection.numberOfSnippets);
},var NeighboringTabsOption,
  neighborOptionToSelection,
  MAX_CHARACTERS_PER_FILE,
  MAX_NUMBER_OF_FILES,
  init_neighboringFiles = __esmMin(() => {
    "use strict";

    init_jaccardMatching();
    NeighboringTabsOption = (u => (NeighboringTabsOption.None = "none", NeighboringTabsOption.Conservative = "conservative", NeighboringTabsOption.Medium = "medium", NeighboringTabsOption.Eager = "eager", NeighboringTabsOption.EagerButLittle = "eagerButLittle", NeighboringTabsOption.EagerButMedium = "eagerButMedium", NeighboringTabsOption.EagerButMuch = "eagerButMuch", NeighboringTabsOption.RetrievalComparable = "retrievalComparable", NeighboringTabsOption))(JB || {}), neighborOptionToSelection = {
      none: {
        snippetLength: 1,
        threshold: -1,
        numberOfSnippets: 0
      },
      conservative: {
        snippetLength: 10,
        threshold: .3,
        numberOfSnippets: 1
      },
      medium: {
        snippetLength: 20,
        threshold: .1,
        numberOfSnippets: 2
      },
      eager: {
        snippetLength: 60,
        threshold: 0,
        numberOfSnippets: 4
      },
      eagerButLittle: {
        snippetLength: 10,
        threshold: 0,
        numberOfSnippets: 1
      },
      eagerButMedium: {
        snippetLength: 20,
        threshold: 0,
        numberOfSnippets: 4
      },
      eagerButMuch: {
        snippetLength: 60,
        threshold: 0,
        numberOfSnippets: 6
      },
      retrievalComparable: {
        snippetLength: 30,
        threshold: 0,
        numberOfSnippets: 4
      }
    }, MAX_CHARACTERS_PER_FILE = 1e4, MAX_NUMBER_OF_FILES = 20;
    __name(getMatcher, "getMatcher");
    __name(getNeighborSnippets, "getNeighborSnippets");
  });,function truncateFirstLinesFirst(tokenizer, snippet, targetTokenBudget) {
  if (!targetTokenBudget) throw new Error("targetTokenBudget must be specified for the truncateFirstLinesFirst summarizer");
  let rawLines = snippet.text.split(`
`);
  for (let i = 0; i < rawLines.length - 1; i++) rawLines[i] += `
`;
  let lines = [];
  rawLines.forEach((line, i) => {
    line === `
` && lines.length > 0 && !lines[lines.length - 1].endsWith(`

`) ? lines[lines.length - 1] += `
` : lines.push(line);
  });
  let lineTokens = lines.map(line => tokenizer.tokenLength(line)),
    i = 1,
    tokens = 0;
  for (; i <= lineTokens.length; i++) {
    let t = lineTokens.at(-i);
    if (t) {
      if (t + tokens > targetTokenBudget) {
        i--;
        break;
      }
      tokens += t;
    }
  }
  let truncatedText = lines.slice(-i).join(""),
    newTokens = tokenizer.tokenLength(truncatedText),
    removedText = lines.slice(0, -i).join(""),
    removedTokens = tokenizer.tokenLength(removedText),
    summarizedElement = {
      id: snippet.id,
      kind: snippet.kind,
      text: truncatedText,
      tokens: newTokens,
      score: snippet.score
    },
    removedMaterial = {
      id: snippet.id,
      kind: snippet.kind,
      text: removedText,
      tokens: removedTokens,
      score: snippet.score
    };
  return {
    summarizedElement: summarizedElement,
    removedMaterial: removedMaterial
  };
},var init_truncateFirstLinesFirst = __esmMin(() => {
  "use strict";

  __name(truncateFirstLinesFirst, "truncateFirstLinesFirst");
});,var _SnippetTextProcessor,
  SnippetTextProcessor,
  init_snippetTextProcessing = __esmMin(() => {
    "use strict";

    init_truncateFirstLinesFirst();
    init_wishlist();
    _SnippetTextProcessor = class _SnippetTextProcessor {
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
    __name(_SnippetTextProcessor, "SnippetTextProcessor");
    SnippetTextProcessor = _SnippetTextProcessor;
  });,function announceTooltipSignatureSnippet(snippet, targetDocLanguageId) {
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
  });,function normalizeLanguageId(languageId) {
  var _a;
  return languageId = languageId.toLowerCase(), (_a = languageNormalizationMap[languageId]) != null ? _a : languageId;
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
  _PromptOptions,
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
    }, MAX_PROMPT_LENGTH = 1500, DEFAULT_NUM_OF_SNIPPETS = 4, MAX_TOOLTIP_SIGNATURE_TOKENS = 150, LineEndingOptions = (t => (LineEndingOptions.ConvertToUnix = "unix", LineEndingOptions.KeepOriginal = "keep", LineEndingOptions))(AN || {}), SuffixOption = (t => (SuffixOption.None = "none", SuffixOption.FifteenPercent = "fifteenPercent", SuffixOption))(IY || {}), SuffixMatchOption = (t => (SuffixMatchOption.Equal = "equal", SuffixMatchOption.Levenshtein = "levenshteineditdistance", SuffixMatchOption))(vY || {}), _PromptOptions = class _PromptOptions {
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
    };
    __name(_PromptOptions, "PromptOptions");
    PromptOptions = _PromptOptions, languageNormalizationMap = {
      javascriptreact: "javascript",
      jsx: "javascript",
      typescriptreact: "typescript",
      jade: "pug",
      cshtml: "razor",
      c: "cpp"
    };
    __name(normalizeLanguageId, "normalizeLanguageId");
    __name(getPrompt, "getPrompt");
  });,var _ProviderTimeoutError,
  ProviderTimeoutError,
  _SnippetProvider,
  SnippetProvider,
  init_snippetProvider = __esmMin(() => {
    "use strict";

    init_orchestrator();
    _ProviderTimeoutError = class _ProviderTimeoutError extends Error {
      constructor(message) {
        super(message), this.name = "ProviderTimeoutError";
      }
    };
    __name(_ProviderTimeoutError, "ProviderTimeoutError");
    ProviderTimeoutError = _ProviderTimeoutError, _SnippetProvider = class _SnippetProvider {
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
    __name(_SnippetProvider, "SnippetProvider");
    SnippetProvider = _SnippetProvider;
  });,var _LanguageSnippetProvider,
  LanguageSnippetProvider,
  init_language = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_prompt();
    init_snippets();
    init_snippetProvider();
    _LanguageSnippetProvider = class _LanguageSnippetProvider extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "language";
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
    __name(_LanguageSnippetProvider, "LanguageSnippetProvider");
    LanguageSnippetProvider = _LanguageSnippetProvider;
  });,var _NeighborFilesProvider,
  NeighborFilesProvider,
  init_neighborFiles = __esmMin(() => {
    "use strict";

    init_lib();
    init_neighboringFiles();
    init_snippetProvider();
    _NeighborFilesProvider = class _NeighborFilesProvider extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "neighboring-tabs";
      }
      async buildSnippets(context) {
        let {
          currentFile: currentFile,
          neighborFiles: neighborFiles,
          options: options
        } = context;
        return options && neighborFiles && neighborFiles.length && options.neighboringTabs !== "none" ? await this.api.getNeighborSnippets(currentFile, neighborFiles, options.neighboringTabs) : [];
      }
    };
    __name(_NeighborFilesProvider, "NeighborFilesProvider");
    NeighborFilesProvider = _NeighborFilesProvider;
  });,var _PathSnippetProvider,
  PathSnippetProvider,
  init_path = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_prompt();
    init_snippets();
    init_snippetProvider();
    _PathSnippetProvider = class _PathSnippetProvider extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "path";
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
    __name(_PathSnippetProvider, "PathSnippetProvider");
    PathSnippetProvider = _PathSnippetProvider;
  });,var _TooltipSignatureSnippetProvider,
  TooltipSignatureSnippetProvider,
  init_tooltipSignature = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_prompt();
    init_snippets();
    init_tooltipSignature();
    init_snippetProvider();
    _TooltipSignatureSnippetProvider = class _TooltipSignatureSnippetProvider extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "tooltip-signature";
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
    __name(_TooltipSignatureSnippetProvider, "TooltipSignatureSnippetProvider");
    TooltipSignatureSnippetProvider = _TooltipSignatureSnippetProvider;
  });,function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`delay: ${delay}`), delay);
  });
},var import_path,
  import_worker_threads,
  workerFns,
  _WorkerProxy,
  WorkerProxy,
  workerProxy,
  init_workerProxy = __esmMin(() => {
    "use strict";

    import_path = require("path"), import_worker_threads = require("worker_threads");
    init_neighboringFiles();
    __name(sleep, "sleep");
    workerFns = ["getNeighborSnippets", "sleep"], _WorkerProxy = class _WorkerProxy {
      constructor() {
        this.nextHandlerId = 0;
        this.handlers = new Map();
        this.fns = new Map();
        this.getNeighborSnippets = getNeighborSnippets;
        this.sleep = sleep;
        var _a;
        !Od.isMainThread && (_a = Od.workerData) != null && _a.port && (zS(), process.cwd = () => Od.workerData.cwd, this.configureWorkerResponse(Od.workerData.port));
      }
      initWorker() {
        let {
          port1: port1,
          port2: port2
        } = new Od.MessageChannel();
        this.port = port1, this.worker = new Od.Worker((0, NY.resolve)(__dirname, "..", "dist", "workerProxy.js"), {
          workerData: {
            port: port2,
            cwd: process.cwd()
          },
          transferList: [port2]
        }), this.port.on("message", m => this.handleMessage(m)), this.port.on("error", e => this.handleError(e));
      }
      startThreading() {
        if (this.worker) throw new Error("Worker thread already initialized.");
        this.proxyFunctions(), this.initWorker();
      }
      stopThreading() {
        this.worker && (this.worker.terminate(), this.worker.removeAllListeners(), this.worker = void 0, this.unproxyFunctions(), this.handlers.clear());
      }
      proxyFunctions() {
        for (let fn of workerFns) this.fns.set(fn, this[fn]), this.proxy(fn);
      }
      unproxyFunctions() {
        for (let fn of workerFns) {
          let originalFn = this.fns.get(fn);
          if (originalFn) this[fn] = originalFn;else throw new Error(`Unproxy function not found: ${fn}`);
        }
      }
      configureWorkerResponse(port) {
        this.port = port, this.port.on("message", async ({
          id: id,
          fn: fn,
          args: args
        }) => {
          let proxiedFunction = this[fn];
          if (!proxiedFunction) throw new Error(`Function not found: ${fn}`);
          try {
            let res = await proxiedFunction.apply(this, args);
            this.port.postMessage({
              id: id,
              res: res
            });
          } catch (err) {
            if (!(err instanceof Error)) throw err;
            typeof err.code == "string" ? this.port.postMessage({
              id: id,
              err: err,
              code: err.code
            }) : this.port.postMessage({
              id: id,
              err: err
            });
          }
        });
      }
      handleMessage({
        id: id,
        err: err,
        code: code,
        res: res
      }) {
        let handler = this.handlers.get(id);
        handler && (this.handlers.delete(id), err ? (err.code = code, handler.reject(err)) : handler.resolve(res));
      }
      handleError(maybeError) {
        var _a;
        console.log(maybeError);
        let err;
        if (maybeError instanceof Error) {
          err = maybeError, err.code === "MODULE_NOT_FOUND" && (_a = err.message) != null && _a.endsWith("workerProxy.js'") && (err = new Error("Failed to load workerProxy.js"), err.code = "CopilotPromptLoadFailure");
          let ourStack = new Error().stack;
          err.stack && ourStack != null && ourStack.match(/^Error\n/) && (err.stack += ourStack.replace(/^Error/, ""));
        } else (maybeError == null ? void 0 : maybeError.name) === "ExitStatus" && typeof maybeError.status == "number" ? (err = new Error(`workerProxy.js exited with status ${maybeError.status}`), err.code = `CopilotPromptWorkerExit${maybeError.status}`) : err = new Error(`Non-error thrown: ${maybeError}`);
        for (let handler of this.handlers.values()) handler.reject(err);
        throw err;
      }
      proxy(fn) {
        this[fn] = function (...args) {
          let id = this.nextHandlerId++;
          return new Promise((resolve, reject) => {
            var _a;
            this.handlers.set(id, {
              resolve: resolve,
              reject: reject
            }), (_a = this.port) == null || _a.postMessage({
              id: id,
              fn: fn,
              args: args
            });
          });
        };
      }
    };
    __name(_WorkerProxy, "WorkerProxy");
    WorkerProxy = _WorkerProxy, workerProxy = new WorkerProxy();
  });,function isFulfilledResult(result) {
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
  _SnippetOrchestrator,
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
    _SnippetOrchestrator = class _SnippetOrchestrator {
      constructor(providers = defaultProviders) {
        this.startThreading = __name(() => workerProxy.startThreading(), "startThreading");
        this.stopThreading = __name(() => workerProxy.stopThreading(), "stopThreading");
        this.providers = providers.map(provider => new provider(workerProxy));
      }
      async getSnippets(context) {
        let signal = AbortSignal.timeout(TIMEOUT_MS);
        return Promise.allSettled(this.providers.map(provider => provider.getSnippets(context, signal)));
      }
    };
    __name(_SnippetOrchestrator, "SnippetOrchestrator");
    SnippetOrchestrator = _SnippetOrchestrator;
  });,var require_tree_sitter = __commonJSMin((exports, module) => {
  var Module = Module !== void 0 ? Module : {},
    TreeSitter = function () {
      var initPromise,
        document = typeof window == "object" ? {
          currentScript: window.document.currentScript
        } : null;
      let _Parser = class _Parser {
        constructor() {
          this.initialize();
        }
        initialize() {
          throw new Error("cannot construct a Parser before calling `init()`");
        }
        static init(moduleOptions) {
          return initPromise || (Module = Object.assign({}, Module, moduleOptions), initPromise = new Promise(resolveInitPromise => {
            var moduleOverrides = Object.assign({}, Module),
              arguments_ = [],
              thisProgram = "./this.program",
              quit_ = __name((e, t) => {
                throw t;
              }, "quit_"),
              ENVIRONMENT_IS_WEB = typeof window == "object",
              ENVIRONMENT_IS_WORKER = typeof importScripts == "function",
              ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string",
              scriptDirectory = "",
              read_,
              readAsync,
              readBinary,
              setWindowTitle;
            function locateFile(e) {
              return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e;
            }
            __name(locateFile, "locateFile");
            function logExceptionOnExit(e) {
              e instanceof ExitStatus || err("exiting due to exception: " + e);
            }
            if (__name(logExceptionOnExit, "logExceptionOnExit"), ENVIRONMENT_IS_NODE) {
              var fs = require("fs"),
                nodePath = require("path");
              scriptDirectory = ENVIRONMENT_IS_WORKER ? nodePath.dirname(scriptDirectory) + "/" : __dirname + "/", read_ = __name((e, t) => (e = isFileURI(e) ? new URL(e) : nodePath.normalize(e), fs.readFileSync(e, t ? void 0 : "utf8")), "read_"), readBinary = __name(e => {
                var t = read_(e, !0);
                return t.buffer || (t = new Uint8Array(t)), t;
              }, "readBinary"), readAsync = __name((e, t, r) => {
                e = isFileURI(e) ? new URL(e) : nodePath.normalize(e), fs.readFile(e, function (e, _) {
                  e ? r(e) : t(_.buffer);
                });
              }, "readAsync"), process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), typeof module < "u" && (module.exports = Module), quit_ = __name((e, t) => {
                if (keepRuntimeAlive()) throw process.exitCode = e, t;
                logExceptionOnExit(t), process.exit(e);
              }, "quit_"), Module.inspect = function () {
                return "[Emscripten Module object]";
              };
            } else (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && (ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : document !== void 0 && document.currentScript && (scriptDirectory = document.currentScript.src), scriptDirectory = scriptDirectory.indexOf("blob:") !== 0 ? scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", read_ = __name(e => {
              var t = new XMLHttpRequest();
              return t.open("GET", e, !1), t.send(null), t.responseText;
            }, "read_"), ENVIRONMENT_IS_WORKER && (readBinary = __name(e => {
              var t = new XMLHttpRequest();
              return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
            }, "readBinary")), readAsync = __name((e, t, r) => {
              var _ = new XMLHttpRequest();
              _.open("GET", e, !0), _.responseType = "arraybuffer", _.onload = () => {
                _.status == 200 || _.status == 0 && _.response ? t(_.response) : r();
              }, _.onerror = r, _.send(null);
            }, "readAsync"), setWindowTitle = __name(e => document.title = e, "setWindowTitle"));
            var out = Module.print || console.log.bind(console),
              err = Module.printErr || console.warn.bind(console);
            Object.assign(Module, moduleOverrides), moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Module.thisProgram && (thisProgram = Module.thisProgram), Module.quit && (quit_ = Module.quit);
            var STACK_ALIGN = 16,
              dynamicLibraries = Module.dynamicLibraries || [],
              wasmBinary;
            Module.wasmBinary && (wasmBinary = Module.wasmBinary);
            var noExitRuntime = Module.noExitRuntime || !0,
              wasmMemory;
            typeof WebAssembly != "object" && abort("no native wasm support detected");
            var ABORT = !1,
              EXITSTATUS,
              UTF8Decoder = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0,
              buffer,
              HEAP8,
              HEAPU8,
              HEAP16,
              HEAPU16,
              HEAP32,
              HEAPU32,
              HEAPF32,
              HEAPF64;
            function UTF8ArrayToString(e, t, r) {
              for (var _ = t + r, n = t; e[n] && !(n >= _);) ++n;
              if (n - t > 16 && e.buffer && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t, n));
              for (var s = ""; t < n;) {
                var a = e[t++];
                if (128 & a) {
                  var o = 63 & e[t++];
                  if ((224 & a) != 192) {
                    var i = 63 & e[t++];
                    if ((a = (240 & a) == 224 ? (15 & a) << 12 | o << 6 | i : (7 & a) << 18 | o << 12 | i << 6 | 63 & e[t++]) < 65536) s += String.fromCharCode(a);else {
                      var l = a - 65536;
                      s += String.fromCharCode(55296 | l >> 10, 56320 | 1023 & l);
                    }
                  } else s += String.fromCharCode((31 & a) << 6 | o);
                } else s += String.fromCharCode(a);
              }
              return s;
            }
            __name(UTF8ArrayToString, "UTF8ArrayToString");
            function UTF8ToString(e, t) {
              return e ? UTF8ArrayToString(HEAPU8, e, t) : "";
            }
            __name(UTF8ToString, "UTF8ToString");
            function stringToUTF8Array(e, t, r, _) {
              if (!(_ > 0)) return 0;
              for (var n = r, s = r + _ - 1, a = 0; a < e.length; ++a) {
                var o = e.charCodeAt(a);
                if (o >= 55296 && o <= 57343 && (o = 65536 + ((1023 & o) << 10) | 1023 & e.charCodeAt(++a)), o <= 127) {
                  if (r >= s) break;
                  t[r++] = o;
                } else if (o <= 2047) {
                  if (r + 1 >= s) break;
                  t[r++] = 192 | o >> 6, t[r++] = 128 | 63 & o;
                } else if (o <= 65535) {
                  if (r + 2 >= s) break;
                  t[r++] = 224 | o >> 12, t[r++] = 128 | o >> 6 & 63, t[r++] = 128 | 63 & o;
                } else {
                  if (r + 3 >= s) break;
                  t[r++] = 240 | o >> 18, t[r++] = 128 | o >> 12 & 63, t[r++] = 128 | o >> 6 & 63, t[r++] = 128 | 63 & o;
                }
              }
              return t[r] = 0, r - n;
            }
            __name(stringToUTF8Array, "stringToUTF8Array");
            function stringToUTF8(e, t, r) {
              return stringToUTF8Array(e, HEAPU8, t, r);
            }
            __name(stringToUTF8, "stringToUTF8");
            function lengthBytesUTF8(e) {
              for (var t = 0, r = 0; r < e.length; ++r) {
                var _ = e.charCodeAt(r);
                _ <= 127 ? t++ : _ <= 2047 ? t += 2 : _ >= 55296 && _ <= 57343 ? (t += 4, ++r) : t += 3;
              }
              return t;
            }
            __name(lengthBytesUTF8, "lengthBytesUTF8");
            function updateGlobalBufferAndViews(e) {
              buffer = e, Module.HEAP8 = HEAP8 = new Int8Array(e), Module.HEAP16 = HEAP16 = new Int16Array(e), Module.HEAP32 = HEAP32 = new Int32Array(e), Module.HEAPU8 = HEAPU8 = new Uint8Array(e), Module.HEAPU16 = HEAPU16 = new Uint16Array(e), Module.HEAPU32 = HEAPU32 = new Uint32Array(e), Module.HEAPF32 = HEAPF32 = new Float32Array(e), Module.HEAPF64 = HEAPF64 = new Float64Array(e);
            }
            __name(updateGlobalBufferAndViews, "updateGlobalBufferAndViews");
            var INITIAL_MEMORY = Module.INITIAL_MEMORY || 33554432;
            wasmMemory = Module.wasmMemory ? Module.wasmMemory : new WebAssembly.Memory({
              initial: INITIAL_MEMORY / 65536,
              maximum: 32768
            }), wasmMemory && (buffer = wasmMemory.buffer), INITIAL_MEMORY = buffer.byteLength, updateGlobalBufferAndViews(buffer);
            var wasmTable = new WebAssembly.Table({
                initial: 20,
                element: "anyfunc"
              }),
              __ATPRERUN__ = [],
              __ATINIT__ = [],
              __ATMAIN__ = [],
              __ATPOSTRUN__ = [],
              __RELOC_FUNCS__ = [],
              runtimeInitialized = !1;
            function keepRuntimeAlive() {
              return noExitRuntime;
            }
            __name(keepRuntimeAlive, "keepRuntimeAlive");
            function preRun() {
              if (Module.preRun) for (typeof Module.preRun == "function" && (Module.preRun = [Module.preRun]); Module.preRun.length;) addOnPreRun(Module.preRun.shift());
              callRuntimeCallbacks(__ATPRERUN__);
            }
            __name(preRun, "preRun");
            function initRuntime() {
              runtimeInitialized = !0, callRuntimeCallbacks(__RELOC_FUNCS__), callRuntimeCallbacks(__ATINIT__);
            }
            __name(initRuntime, "initRuntime");
            function preMain() {
              callRuntimeCallbacks(__ATMAIN__);
            }
            __name(preMain, "preMain");
            function postRun() {
              if (Module.postRun) for (typeof Module.postRun == "function" && (Module.postRun = [Module.postRun]); Module.postRun.length;) addOnPostRun(Module.postRun.shift());
              callRuntimeCallbacks(__ATPOSTRUN__);
            }
            __name(postRun, "postRun");
            function addOnPreRun(e) {
              __ATPRERUN__.unshift(e);
            }
            __name(addOnPreRun, "addOnPreRun");
            function addOnInit(e) {
              __ATINIT__.unshift(e);
            }
            __name(addOnInit, "addOnInit");
            function addOnPostRun(e) {
              __ATPOSTRUN__.unshift(e);
            }
            __name(addOnPostRun, "addOnPostRun");
            var runDependencies = 0,
              runDependencyWatcher = null,
              dependenciesFulfilled = null;
            function addRunDependency(e) {
              runDependencies++, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies);
            }
            __name(addRunDependency, "addRunDependency");
            function removeRunDependency(e) {
              if (runDependencies--, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies), runDependencies == 0 && (runDependencyWatcher !== null && (clearInterval(runDependencyWatcher), runDependencyWatcher = null), dependenciesFulfilled)) {
                var t = dependenciesFulfilled;
                dependenciesFulfilled = null, t();
              }
            }
            __name(removeRunDependency, "removeRunDependency");
            function abort(e) {
              throw Module.onAbort && Module.onAbort(e), err(e = "Aborted(" + e + ")"), ABORT = !0, EXITSTATUS = 1, e += ". Build with -sASSERTIONS for more info.", new WebAssembly.RuntimeError(e);
            }
            __name(abort, "abort");
            var dataURIPrefix = "data:application/octet-stream;base64,",
              wasmBinaryFile,
              tempDouble,
              tempI64;
            function isDataURI(e) {
              return e.startsWith(dataURIPrefix);
            }
            __name(isDataURI, "isDataURI");
            function isFileURI(e) {
              return e.startsWith("file://");
            }
            __name(isFileURI, "isFileURI");
            function getBinary(e) {
              try {
                if (e == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
                if (readBinary) return readBinary(e);
                throw "both async and sync fetching of the wasm failed";
              } catch (e) {
                abort(e);
              }
            }
            __name(getBinary, "getBinary");
            function getBinaryPromise() {
              if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) return fetch(wasmBinaryFile, {
                  credentials: "same-origin"
                }).then(function (e) {
                  if (!e.ok) throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                  return e.arrayBuffer();
                }).catch(function () {
                  return getBinary(wasmBinaryFile);
                });
                if (readAsync) return new Promise(function (e, t) {
                  readAsync(wasmBinaryFile, function (t) {
                    e(new Uint8Array(t));
                  }, t);
                });
              }
              return Promise.resolve().then(function () {
                return getBinary(wasmBinaryFile);
              });
            }
            __name(getBinaryPromise, "getBinaryPromise");
            function createWasm() {
              var e = {
                env: asmLibraryArg,
                wasi_snapshot_preview1: asmLibraryArg,
                "GOT.mem": new Proxy(asmLibraryArg, GOTHandler),
                "GOT.func": new Proxy(asmLibraryArg, GOTHandler)
              };
              function t(e, t) {
                var r = e.exports;
                r = relocateExports(r, 1024);
                var _ = getDylinkMetadata(t);
                _.neededDynlibs && (dynamicLibraries = _.neededDynlibs.concat(dynamicLibraries)), mergeLibSymbols(r, "main"), Module.asm = r, addOnInit(Module.asm.__wasm_call_ctors), __RELOC_FUNCS__.push(Module.asm.__wasm_apply_data_relocs), removeRunDependency("wasm-instantiate");
              }
              __name(t, "t");
              function r(e) {
                t(e.instance, e.module);
              }
              __name(r, "r");
              function _(t) {
                return getBinaryPromise().then(function (t) {
                  return WebAssembly.instantiate(t, e);
                }).then(function (e) {
                  return e;
                }).then(t, function (e) {
                  err("failed to asynchronously prepare wasm: " + e), abort(e);
                });
              }
              if (__name(_, "_"), addRunDependency("wasm-instantiate"), Module.instantiateWasm) try {
                return Module.instantiateWasm(e, t);
              } catch (e) {
                return err("Module.instantiateWasm callback failed with error: " + e), !1;
              }
              return wasmBinary || typeof WebAssembly.instantiateStreaming != "function" || isDataURI(wasmBinaryFile) || isFileURI(wasmBinaryFile) || ENVIRONMENT_IS_NODE || typeof fetch != "function" ? _(r) : fetch(wasmBinaryFile, {
                credentials: "same-origin"
              }).then(function (t) {
                return WebAssembly.instantiateStreaming(t, e).then(r, function (e) {
                  return err("wasm streaming compile failed: " + e), err("falling back to ArrayBuffer instantiation"), _(r);
                });
              }), {};
            }
            __name(createWasm, "createWasm"), wasmBinaryFile = "tree-sitter.wasm", isDataURI(wasmBinaryFile) || (wasmBinaryFile = locateFile(wasmBinaryFile));
            var ASM_CONSTS = {};
            function ExitStatus(e) {
              this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e;
            }
            __name(ExitStatus, "ExitStatus");
            var GOT = {},
              CurrentModuleWeakSymbols = new Set([]),
              GOTHandler = {
                get: function (e, t) {
                  var r = GOT[t];
                  return r || (r = GOT[t] = new WebAssembly.Global({
                    value: "i32",
                    mutable: !0
                  })), CurrentModuleWeakSymbols.has(t) || (r.required = !0), r;
                }
              };
            function callRuntimeCallbacks(e) {
              for (; e.length > 0;) e.shift()(Module);
            }
            __name(callRuntimeCallbacks, "callRuntimeCallbacks");
            function getDylinkMetadata(e) {
              var t = 0,
                r = 0;
              function _() {
                for (var r = 0, _ = 1;;) {
                  var n = e[t++];
                  if (r += (127 & n) * _, _ *= 128, !(128 & n)) break;
                }
                return r;
              }
              __name(_, "_");
              function n() {
                var r = _();
                return UTF8ArrayToString(e, (t += r) - r, r);
              }
              __name(n, "n");
              function s(e, t) {
                if (e) throw new Error(t);
              }
              __name(s, "s");
              var a = "dylink.0";
              if (e instanceof WebAssembly.Module) {
                var o = WebAssembly.Module.customSections(e, a);
                o.length === 0 && (a = "dylink", o = WebAssembly.Module.customSections(e, a)), s(o.length === 0, "need dylink section"), r = (e = new Uint8Array(o[0])).length;
              } else {
                s(new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer)[0] != 1836278016, "need to see wasm magic number"), s(e[8] !== 0, "need the dylink section to be first"), t = 9;
                var i = _();
                r = t + i, a = n();
              }
              var l = {
                neededDynlibs: [],
                tlsExports: new Set(),
                weakImports: new Set()
              };
              if (a == "dylink") {
                l.memorySize = _(), l.memoryAlign = _(), l.tableSize = _(), l.tableAlign = _();
                for (var u = _(), d = 0; d < u; ++d) {
                  var c = n();
                  l.neededDynlibs.push(c);
                }
              } else for (s(a !== "dylink.0"); t < r;) {
                var m = e[t++],
                  p = _();
                if (m === 1) l.memorySize = _(), l.memoryAlign = _(), l.tableSize = _(), l.tableAlign = _();else if (m === 2) for (u = _(), d = 0; d < u; ++d) c = n(), l.neededDynlibs.push(c);else if (m === 3) for (var f = _(); f--;) {
                  var h = n();
                  256 & _() && l.tlsExports.add(h);
                } else if (m === 4) for (f = _(); f--;) n(), h = n(), (3 & _()) == 1 && l.weakImports.add(h);else t += p;
              }
              return l;
            }
            __name(getDylinkMetadata, "getDylinkMetadata");
            function getValue(e, t = "i8") {
              switch (t.endsWith("*") && (t = "*"), t) {
                case "i1":
                case "i8":
                  return HEAP8[e >> 0];
                case "i16":
                  return HEAP16[e >> 1];
                case "i32":
                case "i64":
                  return HEAP32[e >> 2];
                case "float":
                  return HEAPF32[e >> 2];
                case "double":
                  return HEAPF64[e >> 3];
                case "*":
                  return HEAPU32[e >> 2];
                default:
                  abort("invalid type for getValue: " + t);
              }
              return null;
            }
            __name(getValue, "getValue");
            function asmjsMangle(e) {
              return e.indexOf("dynCall_") == 0 || ["stackAlloc", "stackSave", "stackRestore", "getTempRet0", "setTempRet0"].includes(e) ? e : "_" + e;
            }
            __name(asmjsMangle, "asmjsMangle");
            function mergeLibSymbols(e, t) {
              for (var r in e) if (e.hasOwnProperty(r)) {
                asmLibraryArg.hasOwnProperty(r) || (asmLibraryArg[r] = e[r]);
                var _ = asmjsMangle(r);
                Module.hasOwnProperty(_) || (Module[_] = e[r]), r == "__main_argc_argv" && (Module._main = e[r]);
              }
            }
            __name(mergeLibSymbols, "mergeLibSymbols");
            var LDSO = {
              loadedLibsByName: {},
              loadedLibsByHandle: {}
            };
            function dynCallLegacy(e, t, r) {
              var _ = Module["dynCall_" + e];
              return r && r.length ? _.apply(null, [t].concat(r)) : _.call(null, t);
            }
            __name(dynCallLegacy, "dynCallLegacy");
            var wasmTableMirror = [];
            function getWasmTableEntry(e) {
              var t = wasmTableMirror[e];
              return t || (e >= wasmTableMirror.length && (wasmTableMirror.length = e + 1), wasmTableMirror[e] = t = wasmTable.get(e)), t;
            }
            __name(getWasmTableEntry, "getWasmTableEntry");
            function dynCall(e, t, r) {
              return e.includes("j") ? dynCallLegacy(e, t, r) : getWasmTableEntry(t).apply(null, r);
            }
            __name(dynCall, "dynCall");
            function createInvokeFunction(e) {
              return function () {
                var t = stackSave();
                try {
                  return dynCall(e, arguments[0], Array.prototype.slice.call(arguments, 1));
                } catch (e) {
                  if (stackRestore(t), e !== e + 0) throw e;
                  _setThrew(1, 0);
                }
              };
            }
            __name(createInvokeFunction, "createInvokeFunction");
            var ___heap_base = 78144;
            function zeroMemory(e, t) {
              return HEAPU8.fill(0, e, e + t), e;
            }
            __name(zeroMemory, "zeroMemory");
            function getMemory(e) {
              if (runtimeInitialized) return zeroMemory(_malloc(e), e);
              var t = ___heap_base,
                r = t + e + 15 & -16;
              return ___heap_base = r, GOT.__heap_base.value = r, t;
            }
            __name(getMemory, "getMemory");
            function isInternalSym(e) {
              return ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm"].includes(e);
            }
            __name(isInternalSym, "isInternalSym");
            function uleb128Encode(e, t) {
              e < 128 ? t.push(e) : t.push(e % 128 | 128, e >> 7);
            }
            __name(uleb128Encode, "uleb128Encode");
            function sigToWasmTypes(e) {
              for (var t = {
                  i: "i32",
                  j: "i32",
                  f: "f32",
                  d: "f64",
                  p: "i32"
                }, r = {
                  parameters: [],
                  results: e[0] == "v" ? [] : [t[e[0]]]
                }, _ = 1; _ < e.length; ++_) r.parameters.push(t[e[_]]), e[_] === "j" && r.parameters.push("i32");
              return r;
            }
            __name(sigToWasmTypes, "sigToWasmTypes");
            function generateFuncType(e, t) {
              var r = e.slice(0, 1),
                _ = e.slice(1),
                n = {
                  i: 127,
                  p: 127,
                  j: 126,
                  f: 125,
                  d: 124
                };
              t.push(96), uleb128Encode(_.length, t);
              for (var s = 0; s < _.length; ++s) t.push(n[_[s]]);
              r == "v" ? t.push(0) : t.push(1, n[r]);
            }
            __name(generateFuncType, "generateFuncType");
            function convertJsFunctionToWasm(e, t) {
              if (typeof WebAssembly.Function == "function") return new WebAssembly.Function(sigToWasmTypes(t), e);
              var r = [1];
              generateFuncType(t, r);
              var _ = [0, 97, 115, 109, 1, 0, 0, 0, 1];
              uleb128Encode(r.length, _), _.push.apply(_, r), _.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
              var n = new WebAssembly.Module(new Uint8Array(_));
              return new WebAssembly.Instance(n, {
                e: {
                  f: e
                }
              }).exports.f;
            }
            __name(convertJsFunctionToWasm, "convertJsFunctionToWasm");
            function updateTableMap(e, t) {
              if (functionsInTableMap) for (var r = e; r < e + t; r++) {
                var _ = getWasmTableEntry(r);
                _ && functionsInTableMap.set(_, r);
              }
            }
            __name(updateTableMap, "updateTableMap");
            var functionsInTableMap = void 0,
              freeTableIndexes = [];
            function getEmptyTableSlot() {
              if (freeTableIndexes.length) return freeTableIndexes.pop();
              try {
                wasmTable.grow(1);
              } catch (e) {
                throw e instanceof RangeError ? "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH." : e;
              }
              return wasmTable.length - 1;
            }
            __name(getEmptyTableSlot, "getEmptyTableSlot");
            function setWasmTableEntry(e, t) {
              wasmTable.set(e, t), wasmTableMirror[e] = wasmTable.get(e);
            }
            __name(setWasmTableEntry, "setWasmTableEntry");
            function addFunction(e, t) {
              if (functionsInTableMap || (functionsInTableMap = new WeakMap(), updateTableMap(0, wasmTable.length)), functionsInTableMap.has(e)) return functionsInTableMap.get(e);
              var r = getEmptyTableSlot();
              try {
                setWasmTableEntry(r, e);
              } catch (_) {
                if (!(_ instanceof TypeError)) throw _;
                setWasmTableEntry(r, convertJsFunctionToWasm(e, t));
              }
              return functionsInTableMap.set(e, r), r;
            }
            __name(addFunction, "addFunction");
            function updateGOT(e, t) {
              for (var r in e) if (!isInternalSym(r)) {
                var _ = e[r];
                r.startsWith("orig$") && (r = r.split("$")[1], t = !0), GOT[r] || (GOT[r] = new WebAssembly.Global({
                  value: "i32",
                  mutable: !0
                })), (t || GOT[r].value == 0) && (typeof _ == "function" ? GOT[r].value = addFunction(_) : typeof _ == "number" ? GOT[r].value = _ : err("unhandled export type for `" + r + "`: " + typeof _));
              }
            }
            __name(updateGOT, "updateGOT");
            function relocateExports(e, t, r) {
              var _ = {};
              for (var n in e) {
                var s = e[n];
                typeof s == "object" && (s = s.value), typeof s == "number" && (s += t), _[n] = s;
              }
              return updateGOT(_, r), _;
            }
            __name(relocateExports, "relocateExports");
            function resolveGlobalSymbol(e, t) {
              var r;
              return t && (r = asmLibraryArg["orig$" + e]), r || (r = asmLibraryArg[e]) && r.stub && (r = void 0), r || (r = Module[asmjsMangle(e)]), !r && e.startsWith("invoke_") && (r = createInvokeFunction(e.split("_")[1])), r;
            }
            __name(resolveGlobalSymbol, "resolveGlobalSymbol");
            function alignMemory(e, t) {
              return Math.ceil(e / t) * t;
            }
            __name(alignMemory, "alignMemory");
            function loadWebAssemblyModule(binary, flags, handle) {
              var metadata = getDylinkMetadata(binary);
              function loadModule() {
                var firstLoad = !handle || !HEAP8[handle + 12 >> 0];
                if (firstLoad) {
                  var memAlign = Math.pow(2, metadata.memoryAlign);
                  memAlign = Math.max(memAlign, STACK_ALIGN);
                  var memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0,
                    tableBase = metadata.tableSize ? wasmTable.length : 0;
                  handle && (HEAP8[handle + 12 >> 0] = 1, HEAPU32[handle + 16 >> 2] = memoryBase, HEAP32[handle + 20 >> 2] = metadata.memorySize, HEAPU32[handle + 24 >> 2] = tableBase, HEAP32[handle + 28 >> 2] = metadata.tableSize);
                } else memoryBase = HEAPU32[handle + 16 >> 2], tableBase = HEAPU32[handle + 24 >> 2];
                var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length,
                  moduleExports;
                function resolveSymbol(e) {
                  var t = resolveGlobalSymbol(e, !1);
                  return t || (t = moduleExports[e]), t;
                }
                __name(resolveSymbol, "resolveSymbol"), tableGrowthNeeded > 0 && wasmTable.grow(tableGrowthNeeded);
                var proxyHandler = {
                    get: function (e, t) {
                      switch (t) {
                        case "__memory_base":
                          return memoryBase;
                        case "__table_base":
                          return tableBase;
                      }
                      if (t in asmLibraryArg) return asmLibraryArg[t];
                      var r;
                      return t in e || (e[t] = function () {
                        return r || (r = resolveSymbol(t)), r.apply(null, arguments);
                      }), e[t];
                    }
                  },
                  proxy = new Proxy({}, proxyHandler),
                  info = {
                    "GOT.mem": new Proxy({}, GOTHandler),
                    "GOT.func": new Proxy({}, GOTHandler),
                    env: proxy,
                    wasi_snapshot_preview1: proxy
                  };
                function postInstantiation(instance) {
                  function addEmAsm(addr, body) {
                    for (var args = [], arity = 0; arity < 16 && body.indexOf("$" + arity) != -1; arity++) args.push("$" + arity);
                    args = args.join(",");
                    var func = "(" + args + " ) => { " + body + "};";
                    ASM_CONSTS[start] = eval(func);
                  }
                  if (__name(addEmAsm, "addEmAsm"), updateTableMap(tableBase, metadata.tableSize), moduleExports = relocateExports(instance.exports, memoryBase), flags.allowUndefined || reportUndefinedSymbols(), "__start_em_asm" in moduleExports) for (var start = moduleExports.__start_em_asm, stop = moduleExports.__stop_em_asm; start < stop;) {
                    var jsString = UTF8ToString(start);
                    addEmAsm(start, jsString), start = HEAPU8.indexOf(0, start) + 1;
                  }
                  var applyRelocs = moduleExports.__wasm_apply_data_relocs;
                  applyRelocs && (runtimeInitialized ? applyRelocs() : __RELOC_FUNCS__.push(applyRelocs));
                  var init = moduleExports.__wasm_call_ctors;
                  return init && (runtimeInitialized ? init() : __ATINIT__.push(init)), moduleExports;
                }
                if (__name(postInstantiation, "postInstantiation"), flags.loadAsync) {
                  if (binary instanceof WebAssembly.Module) {
                    var instance = new WebAssembly.Instance(binary, info);
                    return Promise.resolve(postInstantiation(instance));
                  }
                  return WebAssembly.instantiate(binary, info).then(function (e) {
                    return postInstantiation(e.instance);
                  });
                }
                var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary),
                  instance = new WebAssembly.Instance(module, info);
                return postInstantiation(instance);
              }
              return __name(loadModule, "loadModule"), CurrentModuleWeakSymbols = metadata.weakImports, flags.loadAsync ? metadata.neededDynlibs.reduce(function (e, t) {
                return e.then(function () {
                  return loadDynamicLibrary(t, flags);
                });
              }, Promise.resolve()).then(function () {
                return loadModule();
              }) : (metadata.neededDynlibs.forEach(function (e) {
                loadDynamicLibrary(e, flags);
              }), loadModule());
            }
            __name(loadWebAssemblyModule, "loadWebAssemblyModule");
            function loadDynamicLibrary(e, t, r) {
              t = t || {
                global: !0,
                nodelete: !0
              };
              var _ = LDSO.loadedLibsByName[e];
              if (_) return t.global && !_.global && (_.global = !0, _.module !== "loading" && mergeLibSymbols(_.module, e)), t.nodelete && _.refcount !== 1 / 0 && (_.refcount = 1 / 0), _.refcount++, r && (LDSO.loadedLibsByHandle[r] = _), !t.loadAsync || Promise.resolve(!0);
              function n(e) {
                if (t.fs && t.fs.findObject(e)) {
                  var r = t.fs.readFile(e, {
                    encoding: "binary"
                  });
                  return r instanceof Uint8Array || (r = new Uint8Array(r)), t.loadAsync ? Promise.resolve(r) : r;
                }
                if (e = locateFile(e), t.loadAsync) return new Promise(function (t, r) {
                  readAsync(e, e => t(new Uint8Array(e)), r);
                });
                if (!readBinary) throw new Error(e + ": file not found, and synchronous loading of external files is not available");
                return readBinary(e);
              }
              __name(n, "n");
              function s() {
                if (typeof preloadedWasm < "u" && preloadedWasm[e]) {
                  var _ = preloadedWasm[e];
                  return t.loadAsync ? Promise.resolve(_) : _;
                }
                return t.loadAsync ? n(e).then(function (e) {
                  return loadWebAssemblyModule(e, t, r);
                }) : loadWebAssemblyModule(n(e), t, r);
              }
              __name(s, "s");
              function a(t) {
                _.global && mergeLibSymbols(t, e), _.module = t;
              }
              return __name(a, "a"), _ = {
                refcount: t.nodelete ? 1 / 0 : 1,
                name: e,
                module: "loading",
                global: t.global
              }, LDSO.loadedLibsByName[e] = _, r && (LDSO.loadedLibsByHandle[r] = _), t.loadAsync ? s().then(function (e) {
                return a(e), !0;
              }) : (a(s()), !0);
            }
            __name(loadDynamicLibrary, "loadDynamicLibrary");
            function reportUndefinedSymbols() {
              for (var e in GOT) if (GOT[e].value == 0) {
                var t = resolveGlobalSymbol(e, !0);
                if (!t && !GOT[e].required) continue;
                if (typeof t == "function") GOT[e].value = addFunction(t, t.sig);else {
                  if (typeof t != "number") throw new Error("bad export type for `" + e + "`: " + typeof t);
                  GOT[e].value = t;
                }
              }
            }
            __name(reportUndefinedSymbols, "reportUndefinedSymbols");
            function preloadDylibs() {
              dynamicLibraries.length ? (addRunDependency("preloadDylibs"), dynamicLibraries.reduce(function (e, t) {
                return e.then(function () {
                  return loadDynamicLibrary(t, {
                    loadAsync: !0,
                    global: !0,
                    nodelete: !0,
                    allowUndefined: !0
                  });
                });
              }, Promise.resolve()).then(function () {
                reportUndefinedSymbols(), removeRunDependency("preloadDylibs");
              })) : reportUndefinedSymbols();
            }
            __name(preloadDylibs, "preloadDylibs");
            function setValue(e, t, r = "i8") {
              switch (r.endsWith("*") && (r = "*"), r) {
                case "i1":
                case "i8":
                  HEAP8[e >> 0] = t;
                  break;
                case "i16":
                  HEAP16[e >> 1] = t;
                  break;
                case "i32":
                  HEAP32[e >> 2] = t;
                  break;
                case "i64":
                  tempI64 = [t >>> 0, (tempDouble = t, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[e >> 2] = tempI64[0], HEAP32[e + 4 >> 2] = tempI64[1];
                  break;
                case "float":
                  HEAPF32[e >> 2] = t;
                  break;
                case "double":
                  HEAPF64[e >> 3] = t;
                  break;
                case "*":
                  HEAPU32[e >> 2] = t;
                  break;
                default:
                  abort("invalid type for setValue: " + r);
              }
            }
            __name(setValue, "setValue");
            var ___memory_base = new WebAssembly.Global({
                value: "i32",
                mutable: !1
              }, 1024),
              ___stack_pointer = new WebAssembly.Global({
                value: "i32",
                mutable: !0
              }, 78144),
              ___table_base = new WebAssembly.Global({
                value: "i32",
                mutable: !1
              }, 1),
              nowIsMonotonic = !0,
              _emscripten_get_now;
            function __emscripten_get_now_is_monotonic() {
              return nowIsMonotonic;
            }
            __name(__emscripten_get_now_is_monotonic, "__emscripten_get_now_is_monotonic");
            function _abort() {
              abort("");
            }
            __name(_abort, "_abort");
            function _emscripten_date_now() {
              return Date.now();
            }
            __name(_emscripten_date_now, "_emscripten_date_now");
            function _emscripten_memcpy_big(e, t, r) {
              HEAPU8.copyWithin(e, t, t + r);
            }
            __name(_emscripten_memcpy_big, "_emscripten_memcpy_big");
            function getHeapMax() {
              return 2147483648;
            }
            __name(getHeapMax, "getHeapMax");
            function emscripten_realloc_buffer(e) {
              try {
                return wasmMemory.grow(e - buffer.byteLength + 65535 >>> 16), updateGlobalBufferAndViews(wasmMemory.buffer), 1;
              } catch {}
            }
            __name(emscripten_realloc_buffer, "emscripten_realloc_buffer");
            function _emscripten_resize_heap(e) {
              var t = HEAPU8.length;
              e >>>= 0;
              var r = getHeapMax();
              if (e > r) return !1;
              for (var _ = 1; _ <= 4; _ *= 2) {
                var n = t * (1 + .2 / _);
                if (n = Math.min(n, e + 100663296), emscripten_realloc_buffer(Math.min(r, (s = Math.max(e, n)) + ((a = 65536) - s % a) % a))) return !0;
              }
              var s, a;
              return !1;
            }
            __name(_emscripten_resize_heap, "_emscripten_resize_heap"), __emscripten_get_now_is_monotonic.sig = "i", Module._abort = _abort, _abort.sig = "v", _emscripten_date_now.sig = "d", _emscripten_get_now = ENVIRONMENT_IS_NODE ? () => {
              var e = process.hrtime();
              return 1e3 * e[0] + e[1] / 1e6;
            } : () => performance.now(), _emscripten_get_now.sig = "d", _emscripten_memcpy_big.sig = "vppp", _emscripten_resize_heap.sig = "ip";
            var SYSCALLS = {
              DEFAULT_POLLMASK: 5,
              calculateAt: function (e, t, r) {
                if (PATH.isAbs(t)) return t;
                var _;
                if (e === -100 ? _ = FS.cwd() : _ = SYSCALLS.getStreamFromFD(e).path, t.length == 0) {
                  if (!r) throw new FS.ErrnoError(44);
                  return _;
                }
                return PATH.join2(_, t);
              },
              doStat: function (e, t, r) {
                try {
                  var _ = e(t);
                } catch (e) {
                  if (e && e.node && PATH.normalize(t) !== PATH.normalize(FS.getPath(e.node))) return -54;
                  throw e;
                }
                HEAP32[r >> 2] = _.dev, HEAP32[r + 8 >> 2] = _.ino, HEAP32[r + 12 >> 2] = _.mode, HEAPU32[r + 16 >> 2] = _.nlink, HEAP32[r + 20 >> 2] = _.uid, HEAP32[r + 24 >> 2] = _.gid, HEAP32[r + 28 >> 2] = _.rdev, tempI64 = [_.size >>> 0, (tempDouble = _.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 40 >> 2] = tempI64[0], HEAP32[r + 44 >> 2] = tempI64[1], HEAP32[r + 48 >> 2] = 4096, HEAP32[r + 52 >> 2] = _.blocks;
                var n = _.atime.getTime(),
                  s = _.mtime.getTime(),
                  a = _.ctime.getTime();
                return tempI64 = [Math.floor(n / 1e3) >>> 0, (tempDouble = Math.floor(n / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 56 >> 2] = tempI64[0], HEAP32[r + 60 >> 2] = tempI64[1], HEAPU32[r + 64 >> 2] = n % 1e3 * 1e3, tempI64 = [Math.floor(s / 1e3) >>> 0, (tempDouble = Math.floor(s / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 72 >> 2] = tempI64[0], HEAP32[r + 76 >> 2] = tempI64[1], HEAPU32[r + 80 >> 2] = s % 1e3 * 1e3, tempI64 = [Math.floor(a / 1e3) >>> 0, (tempDouble = Math.floor(a / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 88 >> 2] = tempI64[0], HEAP32[r + 92 >> 2] = tempI64[1], HEAPU32[r + 96 >> 2] = a % 1e3 * 1e3, tempI64 = [_.ino >>> 0, (tempDouble = _.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 104 >> 2] = tempI64[0], HEAP32[r + 108 >> 2] = tempI64[1], 0;
              },
              doMsync: function (e, t, r, _, n) {
                if (!FS.isFile(t.node.mode)) throw new FS.ErrnoError(43);
                if (2 & _) return 0;
                var s = HEAPU8.slice(e, e + r);
                FS.msync(t, s, n, r, _);
              },
              varargs: void 0,
              get: function () {
                return SYSCALLS.varargs += 4, HEAP32[SYSCALLS.varargs - 4 >> 2];
              },
              getStr: function (e) {
                return UTF8ToString(e);
              },
              getStreamFromFD: function (e) {
                var t = FS.getStream(e);
                if (!t) throw new FS.ErrnoError(8);
                return t;
              }
            };
            function _proc_exit(e) {
              EXITSTATUS = e, keepRuntimeAlive() || (Module.onExit && Module.onExit(e), ABORT = !0), quit_(e, new ExitStatus(e));
            }
            __name(_proc_exit, "_proc_exit");
            function exitJS(e, t) {
              EXITSTATUS = e, _proc_exit(e);
            }
            __name(exitJS, "exitJS"), _proc_exit.sig = "vi";
            var _exit = exitJS;
            function _fd_close(e) {
              try {
                var t = SYSCALLS.getStreamFromFD(e);
                return FS.close(t), 0;
              } catch (e) {
                if (typeof FS > "u" || !(e instanceof FS.ErrnoError)) throw e;
                return e.errno;
              }
            }
            __name(_fd_close, "_fd_close");
            function convertI32PairToI53Checked(e, t) {
              return t + 2097152 >>> 0 < 4194305 - !!e ? (e >>> 0) + 4294967296 * t : NaN;
            }
            __name(convertI32PairToI53Checked, "convertI32PairToI53Checked");
            function _fd_seek(e, t, r, _, n) {
              try {
                var s = convertI32PairToI53Checked(t, r);
                if (isNaN(s)) return 61;
                var a = SYSCALLS.getStreamFromFD(e);
                return FS.llseek(a, s, _), tempI64 = [a.position >>> 0, (tempDouble = a.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[n >> 2] = tempI64[0], HEAP32[n + 4 >> 2] = tempI64[1], a.getdents && s === 0 && _ === 0 && (a.getdents = null), 0;
              } catch (e) {
                if (typeof FS > "u" || !(e instanceof FS.ErrnoError)) throw e;
                return e.errno;
              }
            }
            __name(_fd_seek, "_fd_seek");
            function doWritev(e, t, r, _) {
              for (var n = 0, s = 0; s < r; s++) {
                var a = HEAPU32[t >> 2],
                  o = HEAPU32[t + 4 >> 2];
                t += 8;
                var i = FS.write(e, HEAP8, a, o, _);
                if (i < 0) return -1;
                n += i, _ !== void 0 && (_ += i);
              }
              return n;
            }
            __name(doWritev, "doWritev");
            function _fd_write(e, t, r, _) {
              try {
                var n = doWritev(SYSCALLS.getStreamFromFD(e), t, r);
                return HEAPU32[_ >> 2] = n, 0;
              } catch (e) {
                if (typeof FS > "u" || !(e instanceof FS.ErrnoError)) throw e;
                return e.errno;
              }
            }
            __name(_fd_write, "_fd_write");
            function _tree_sitter_log_callback(e, t) {
              if (currentLogCallback) {
                let r = UTF8ToString(t);
                currentLogCallback(r, e !== 0);
              }
            }
            __name(_tree_sitter_log_callback, "_tree_sitter_log_callback");
            function _tree_sitter_parse_callback(e, t, r, _, n) {
              var s = currentParseCallback(t, {
                row: r,
                column: _
              });
              typeof s == "string" ? (setValue(n, s.length, "i32"), stringToUTF16(s, e, 10240)) : setValue(n, 0, "i32");
            }
            __name(_tree_sitter_parse_callback, "_tree_sitter_parse_callback");
            function handleException(e) {
              if (e instanceof ExitStatus || e == "unwind") return EXITSTATUS;
              quit_(1, e);
            }
            __name(handleException, "handleException");
            function allocateUTF8OnStack(e) {
              var t = lengthBytesUTF8(e) + 1,
                r = stackAlloc(t);
              return stringToUTF8Array(e, HEAP8, r, t), r;
            }
            __name(allocateUTF8OnStack, "allocateUTF8OnStack");
            function stringToUTF16(e, t, r) {
              if (r === void 0 && (r = 2147483647), r < 2) return 0;
              for (var _ = t, n = (r -= 2) < 2 * e.length ? r / 2 : e.length, s = 0; s < n; ++s) {
                var a = e.charCodeAt(s);
                HEAP16[t >> 1] = a, t += 2;
              }
              return HEAP16[t >> 1] = 0, t - _;
            }
            __name(stringToUTF16, "stringToUTF16");
            function AsciiToString(e) {
              for (var t = "";;) {
                var r = HEAPU8[e++ >> 0];
                if (!r) return t;
                t += String.fromCharCode(r);
              }
            }
            __name(AsciiToString, "AsciiToString"), _exit.sig = "vi", _fd_close.sig = "ii", _fd_seek.sig = "iijip", _fd_write.sig = "iippp";
            var asmLibraryArg = {
                __heap_base: ___heap_base,
                __indirect_function_table: wasmTable,
                __memory_base: ___memory_base,
                __stack_pointer: ___stack_pointer,
                __table_base: ___table_base,
                _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
                abort: _abort,
                emscripten_get_now: _emscripten_get_now,
                emscripten_memcpy_big: _emscripten_memcpy_big,
                emscripten_resize_heap: _emscripten_resize_heap,
                exit: _exit,
                fd_close: _fd_close,
                fd_seek: _fd_seek,
                fd_write: _fd_write,
                memory: wasmMemory,
                tree_sitter_log_callback: _tree_sitter_log_callback,
                tree_sitter_parse_callback: _tree_sitter_parse_callback
              },
              asm = createWasm(),
              ___wasm_call_ctors = Module.___wasm_call_ctors = function () {
                return (___wasm_call_ctors = Module.___wasm_call_ctors = Module.asm.__wasm_call_ctors).apply(null, arguments);
              },
              ___wasm_apply_data_relocs = Module.___wasm_apply_data_relocs = function () {
                return (___wasm_apply_data_relocs = Module.___wasm_apply_data_relocs = Module.asm.__wasm_apply_data_relocs).apply(null, arguments);
              },
              _malloc = Module._malloc = function () {
                return (_malloc = Module._malloc = Module.asm.malloc).apply(null, arguments);
              },
              _calloc = Module._calloc = function () {
                return (_calloc = Module._calloc = Module.asm.calloc).apply(null, arguments);
              },
              _realloc = Module._realloc = function () {
                return (_realloc = Module._realloc = Module.asm.realloc).apply(null, arguments);
              },
              _free = Module._free = function () {
                return (_free = Module._free = Module.asm.free).apply(null, arguments);
              },
              _ts_language_symbol_count = Module._ts_language_symbol_count = function () {
                return (_ts_language_symbol_count = Module._ts_language_symbol_count = Module.asm.ts_language_symbol_count).apply(null, arguments);
              },
              _ts_language_version = Module._ts_language_version = function () {
                return (_ts_language_version = Module._ts_language_version = Module.asm.ts_language_version).apply(null, arguments);
              },
              _ts_language_field_count = Module._ts_language_field_count = function () {
                return (_ts_language_field_count = Module._ts_language_field_count = Module.asm.ts_language_field_count).apply(null, arguments);
              },
              _ts_language_symbol_name = Module._ts_language_symbol_name = function () {
                return (_ts_language_symbol_name = Module._ts_language_symbol_name = Module.asm.ts_language_symbol_name).apply(null, arguments);
              },
              _ts_language_symbol_for_name = Module._ts_language_symbol_for_name = function () {
                return (_ts_language_symbol_for_name = Module._ts_language_symbol_for_name = Module.asm.ts_language_symbol_for_name).apply(null, arguments);
              },
              _ts_language_symbol_type = Module._ts_language_symbol_type = function () {
                return (_ts_language_symbol_type = Module._ts_language_symbol_type = Module.asm.ts_language_symbol_type).apply(null, arguments);
              },
              _ts_language_field_name_for_id = Module._ts_language_field_name_for_id = function () {
                return (_ts_language_field_name_for_id = Module._ts_language_field_name_for_id = Module.asm.ts_language_field_name_for_id).apply(null, arguments);
              },
              _memset = Module._memset = function () {
                return (_memset = Module._memset = Module.asm.memset).apply(null, arguments);
              },
              _memcpy = Module._memcpy = function () {
                return (_memcpy = Module._memcpy = Module.asm.memcpy).apply(null, arguments);
              },
              _ts_parser_delete = Module._ts_parser_delete = function () {
                return (_ts_parser_delete = Module._ts_parser_delete = Module.asm.ts_parser_delete).apply(null, arguments);
              },
              _ts_parser_reset = Module._ts_parser_reset = function () {
                return (_ts_parser_reset = Module._ts_parser_reset = Module.asm.ts_parser_reset).apply(null, arguments);
              },
              _ts_parser_set_language = Module._ts_parser_set_language = function () {
                return (_ts_parser_set_language = Module._ts_parser_set_language = Module.asm.ts_parser_set_language).apply(null, arguments);
              },
              _ts_parser_timeout_micros = Module._ts_parser_timeout_micros = function () {
                return (_ts_parser_timeout_micros = Module._ts_parser_timeout_micros = Module.asm.ts_parser_timeout_micros).apply(null, arguments);
              },
              _ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = function () {
                return (_ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = Module.asm.ts_parser_set_timeout_micros).apply(null, arguments);
              },
              _memmove = Module._memmove = function () {
                return (_memmove = Module._memmove = Module.asm.memmove).apply(null, arguments);
              },
              _memcmp = Module._memcmp = function () {
                return (_memcmp = Module._memcmp = Module.asm.memcmp).apply(null, arguments);
              },
              _ts_query_new = Module._ts_query_new = function () {
                return (_ts_query_new = Module._ts_query_new = Module.asm.ts_query_new).apply(null, arguments);
              },
              _ts_query_delete = Module._ts_query_delete = function () {
                return (_ts_query_delete = Module._ts_query_delete = Module.asm.ts_query_delete).apply(null, arguments);
              },
              _iswspace = Module._iswspace = function () {
                return (_iswspace = Module._iswspace = Module.asm.iswspace).apply(null, arguments);
              },
              _iswalnum = Module._iswalnum = function () {
                return (_iswalnum = Module._iswalnum = Module.asm.iswalnum).apply(null, arguments);
              },
              _ts_query_pattern_count = Module._ts_query_pattern_count = function () {
                return (_ts_query_pattern_count = Module._ts_query_pattern_count = Module.asm.ts_query_pattern_count).apply(null, arguments);
              },
              _ts_query_capture_count = Module._ts_query_capture_count = function () {
                return (_ts_query_capture_count = Module._ts_query_capture_count = Module.asm.ts_query_capture_count).apply(null, arguments);
              },
              _ts_query_string_count = Module._ts_query_string_count = function () {
                return (_ts_query_string_count = Module._ts_query_string_count = Module.asm.ts_query_string_count).apply(null, arguments);
              },
              _ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = function () {
                return (_ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = Module.asm.ts_query_capture_name_for_id).apply(null, arguments);
              },
              _ts_query_string_value_for_id = Module._ts_query_string_value_for_id = function () {
                return (_ts_query_string_value_for_id = Module._ts_query_string_value_for_id = Module.asm.ts_query_string_value_for_id).apply(null, arguments);
              },
              _ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = function () {
                return (_ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = Module.asm.ts_query_predicates_for_pattern).apply(null, arguments);
              },
              _ts_tree_copy = Module._ts_tree_copy = function () {
                return (_ts_tree_copy = Module._ts_tree_copy = Module.asm.ts_tree_copy).apply(null, arguments);
              },
              _ts_tree_delete = Module._ts_tree_delete = function () {
                return (_ts_tree_delete = Module._ts_tree_delete = Module.asm.ts_tree_delete).apply(null, arguments);
              },
              _ts_init = Module._ts_init = function () {
                return (_ts_init = Module._ts_init = Module.asm.ts_init).apply(null, arguments);
              },
              _ts_parser_new_wasm = Module._ts_parser_new_wasm = function () {
                return (_ts_parser_new_wasm = Module._ts_parser_new_wasm = Module.asm.ts_parser_new_wasm).apply(null, arguments);
              },
              _ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = function () {
                return (_ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = Module.asm.ts_parser_enable_logger_wasm).apply(null, arguments);
              },
              _ts_parser_parse_wasm = Module._ts_parser_parse_wasm = function () {
                return (_ts_parser_parse_wasm = Module._ts_parser_parse_wasm = Module.asm.ts_parser_parse_wasm).apply(null, arguments);
              },
              _ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = function () {
                return (_ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = Module.asm.ts_language_type_is_named_wasm).apply(null, arguments);
              },
              _ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = function () {
                return (_ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = Module.asm.ts_language_type_is_visible_wasm).apply(null, arguments);
              },
              _ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = function () {
                return (_ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = Module.asm.ts_tree_root_node_wasm).apply(null, arguments);
              },
              _ts_tree_edit_wasm = Module._ts_tree_edit_wasm = function () {
                return (_ts_tree_edit_wasm = Module._ts_tree_edit_wasm = Module.asm.ts_tree_edit_wasm).apply(null, arguments);
              },
              _ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = function () {
                return (_ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = Module.asm.ts_tree_get_changed_ranges_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = function () {
                return (_ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = Module.asm.ts_tree_cursor_new_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = function () {
                return (_ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = Module.asm.ts_tree_cursor_delete_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = function () {
                return (_ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = Module.asm.ts_tree_cursor_reset_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = function () {
                return (_ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = Module.asm.ts_tree_cursor_goto_first_child_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = function () {
                return (_ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = Module.asm.ts_tree_cursor_goto_next_sibling_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = function () {
                return (_ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = Module.asm.ts_tree_cursor_goto_parent_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = function () {
                return (_ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = Module.asm.ts_tree_cursor_current_node_type_id_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = function () {
                return (_ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = Module.asm.ts_tree_cursor_current_node_is_named_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = function () {
                return (_ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = Module.asm.ts_tree_cursor_current_node_is_missing_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = function () {
                return (_ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = Module.asm.ts_tree_cursor_current_node_id_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = function () {
                return (_ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = Module.asm.ts_tree_cursor_start_position_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = function () {
                return (_ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = Module.asm.ts_tree_cursor_end_position_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = function () {
                return (_ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = Module.asm.ts_tree_cursor_start_index_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = function () {
                return (_ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = Module.asm.ts_tree_cursor_end_index_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = function () {
                return (_ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = Module.asm.ts_tree_cursor_current_field_id_wasm).apply(null, arguments);
              },
              _ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = function () {
                return (_ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = Module.asm.ts_tree_cursor_current_node_wasm).apply(null, arguments);
              },
              _ts_node_symbol_wasm = Module._ts_node_symbol_wasm = function () {
                return (_ts_node_symbol_wasm = Module._ts_node_symbol_wasm = Module.asm.ts_node_symbol_wasm).apply(null, arguments);
              },
              _ts_node_child_count_wasm = Module._ts_node_child_count_wasm = function () {
                return (_ts_node_child_count_wasm = Module._ts_node_child_count_wasm = Module.asm.ts_node_child_count_wasm).apply(null, arguments);
              },
              _ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = function () {
                return (_ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = Module.asm.ts_node_named_child_count_wasm).apply(null, arguments);
              },
              _ts_node_child_wasm = Module._ts_node_child_wasm = function () {
                return (_ts_node_child_wasm = Module._ts_node_child_wasm = Module.asm.ts_node_child_wasm).apply(null, arguments);
              },
              _ts_node_named_child_wasm = Module._ts_node_named_child_wasm = function () {
                return (_ts_node_named_child_wasm = Module._ts_node_named_child_wasm = Module.asm.ts_node_named_child_wasm).apply(null, arguments);
              },
              _ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = function () {
                return (_ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = Module.asm.ts_node_child_by_field_id_wasm).apply(null, arguments);
              },
              _ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = function () {
                return (_ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = Module.asm.ts_node_next_sibling_wasm).apply(null, arguments);
              },
              _ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = function () {
                return (_ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = Module.asm.ts_node_prev_sibling_wasm).apply(null, arguments);
              },
              _ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = function () {
                return (_ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = Module.asm.ts_node_next_named_sibling_wasm).apply(null, arguments);
              },
              _ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = function () {
                return (_ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = Module.asm.ts_node_prev_named_sibling_wasm).apply(null, arguments);
              },
              _ts_node_parent_wasm = Module._ts_node_parent_wasm = function () {
                return (_ts_node_parent_wasm = Module._ts_node_parent_wasm = Module.asm.ts_node_parent_wasm).apply(null, arguments);
              },
              _ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = function () {
                return (_ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = Module.asm.ts_node_descendant_for_index_wasm).apply(null, arguments);
              },
              _ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = function () {
                return (_ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = Module.asm.ts_node_named_descendant_for_index_wasm).apply(null, arguments);
              },
              _ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = function () {
                return (_ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = Module.asm.ts_node_descendant_for_position_wasm).apply(null, arguments);
              },
              _ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = function () {
                return (_ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = Module.asm.ts_node_named_descendant_for_position_wasm).apply(null, arguments);
              },
              _ts_node_start_point_wasm = Module._ts_node_start_point_wasm = function () {
                return (_ts_node_start_point_wasm = Module._ts_node_start_point_wasm = Module.asm.ts_node_start_point_wasm).apply(null, arguments);
              },
              _ts_node_end_point_wasm = Module._ts_node_end_point_wasm = function () {
                return (_ts_node_end_point_wasm = Module._ts_node_end_point_wasm = Module.asm.ts_node_end_point_wasm).apply(null, arguments);
              },
              _ts_node_start_index_wasm = Module._ts_node_start_index_wasm = function () {
                return (_ts_node_start_index_wasm = Module._ts_node_start_index_wasm = Module.asm.ts_node_start_index_wasm).apply(null, arguments);
              },
              _ts_node_end_index_wasm = Module._ts_node_end_index_wasm = function () {
                return (_ts_node_end_index_wasm = Module._ts_node_end_index_wasm = Module.asm.ts_node_end_index_wasm).apply(null, arguments);
              },
              _ts_node_to_string_wasm = Module._ts_node_to_string_wasm = function () {
                return (_ts_node_to_string_wasm = Module._ts_node_to_string_wasm = Module.asm.ts_node_to_string_wasm).apply(null, arguments);
              },
              _ts_node_children_wasm = Module._ts_node_children_wasm = function () {
                return (_ts_node_children_wasm = Module._ts_node_children_wasm = Module.asm.ts_node_children_wasm).apply(null, arguments);
              },
              _ts_node_named_children_wasm = Module._ts_node_named_children_wasm = function () {
                return (_ts_node_named_children_wasm = Module._ts_node_named_children_wasm = Module.asm.ts_node_named_children_wasm).apply(null, arguments);
              },
              _ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = function () {
                return (_ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = Module.asm.ts_node_descendants_of_type_wasm).apply(null, arguments);
              },
              _ts_node_is_named_wasm = Module._ts_node_is_named_wasm = function () {
                return (_ts_node_is_named_wasm = Module._ts_node_is_named_wasm = Module.asm.ts_node_is_named_wasm).apply(null, arguments);
              },
              _ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = function () {
                return (_ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = Module.asm.ts_node_has_changes_wasm).apply(null, arguments);
              },
              _ts_node_has_error_wasm = Module._ts_node_has_error_wasm = function () {
                return (_ts_node_has_error_wasm = Module._ts_node_has_error_wasm = Module.asm.ts_node_has_error_wasm).apply(null, arguments);
              },
              _ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = function () {
                return (_ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = Module.asm.ts_node_is_missing_wasm).apply(null, arguments);
              },
              _ts_query_matches_wasm = Module._ts_query_matches_wasm = function () {
                return (_ts_query_matches_wasm = Module._ts_query_matches_wasm = Module.asm.ts_query_matches_wasm).apply(null, arguments);
              },
              _ts_query_captures_wasm = Module._ts_query_captures_wasm = function () {
                return (_ts_query_captures_wasm = Module._ts_query_captures_wasm = Module.asm.ts_query_captures_wasm).apply(null, arguments);
              },
              ___cxa_atexit = Module.___cxa_atexit = function () {
                return (___cxa_atexit = Module.___cxa_atexit = Module.asm.__cxa_atexit).apply(null, arguments);
              },
              _iswdigit = Module._iswdigit = function () {
                return (_iswdigit = Module._iswdigit = Module.asm.iswdigit).apply(null, arguments);
              },
              _iswalpha = Module._iswalpha = function () {
                return (_iswalpha = Module._iswalpha = Module.asm.iswalpha).apply(null, arguments);
              },
              _iswlower = Module._iswlower = function () {
                return (_iswlower = Module._iswlower = Module.asm.iswlower).apply(null, arguments);
              },
              _memchr = Module._memchr = function () {
                return (_memchr = Module._memchr = Module.asm.memchr).apply(null, arguments);
              },
              _strlen = Module._strlen = function () {
                return (_strlen = Module._strlen = Module.asm.strlen).apply(null, arguments);
              },
              _towupper = Module._towupper = function () {
                return (_towupper = Module._towupper = Module.asm.towupper).apply(null, arguments);
              },
              _setThrew = Module._setThrew = function () {
                return (_setThrew = Module._setThrew = Module.asm.setThrew).apply(null, arguments);
              },
              stackSave = Module.stackSave = function () {
                return (stackSave = Module.stackSave = Module.asm.stackSave).apply(null, arguments);
              },
              stackRestore = Module.stackRestore = function () {
                return (stackRestore = Module.stackRestore = Module.asm.stackRestore).apply(null, arguments);
              },
              stackAlloc = Module.stackAlloc = function () {
                return (stackAlloc = Module.stackAlloc = Module.asm.stackAlloc).apply(null, arguments);
              },
              __Znwm = Module.__Znwm = function () {
                return (__Znwm = Module.__Znwm = Module.asm._Znwm).apply(null, arguments);
              },
              __ZdlPv = Module.__ZdlPv = function () {
                return (__ZdlPv = Module.__ZdlPv = Module.asm._ZdlPv).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm).apply(null, arguments);
              },
              __ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = Module.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = function () {
                return (__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = Module.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = Module.asm._ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = function () {
                return (__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = function () {
                return (__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = function () {
                return (__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw).apply(null, arguments);
              },
              __ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw = Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw = function () {
                return (__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw = Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw = Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw).apply(null, arguments);
              },
              dynCall_jiji = Module.dynCall_jiji = function () {
                return (dynCall_jiji = Module.dynCall_jiji = Module.asm.dynCall_jiji).apply(null, arguments);
              },
              _orig$ts_parser_timeout_micros = Module._orig$ts_parser_timeout_micros = function () {
                return (_orig$ts_parser_timeout_micros = Module._orig$ts_parser_timeout_micros = Module.asm.orig$ts_parser_timeout_micros).apply(null, arguments);
              },
              _orig$ts_parser_set_timeout_micros = Module._orig$ts_parser_set_timeout_micros = function () {
                return (_orig$ts_parser_set_timeout_micros = Module._orig$ts_parser_set_timeout_micros = Module.asm.orig$ts_parser_set_timeout_micros).apply(null, arguments);
              },
              calledRun;
            function callMain(e) {
              var t = Module._main;
              if (t) {
                (e = e || []).unshift(thisProgram);
                var r = e.length,
                  _ = stackAlloc(4 * (r + 1)),
                  n = _ >> 2;
                e.forEach(e => {
                  HEAP32[n++] = allocateUTF8OnStack(e);
                }), HEAP32[n] = 0;
                try {
                  var s = t(r, _);
                  return exitJS(s, !0), s;
                } catch (e) {
                  return handleException(e);
                }
              }
            }
            __name(callMain, "callMain"), Module.AsciiToString = AsciiToString, Module.stringToUTF16 = stringToUTF16, dependenciesFulfilled = __name(function e() {
              calledRun || run(), calledRun || (dependenciesFulfilled = e);
            }, "e");
            var dylibsLoaded = !1;
            function run(e) {
              function t() {
                calledRun || (calledRun = !0, Module.calledRun = !0, ABORT || (initRuntime(), preMain(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), shouldRunNow && callMain(e), postRun()));
              }
              __name(t, "t"), e = e || arguments_, runDependencies > 0 || !dylibsLoaded && (preloadDylibs(), dylibsLoaded = !0, runDependencies > 0) || (preRun(), runDependencies > 0 || (Module.setStatus ? (Module.setStatus("Running..."), setTimeout(function () {
                setTimeout(function () {
                  Module.setStatus("");
                }, 1), t();
              }, 1)) : t()));
            }
            if (__name(run, "run"), Module.preInit) for (typeof Module.preInit == "function" && (Module.preInit = [Module.preInit]); Module.preInit.length > 0;) Module.preInit.pop()();
            var shouldRunNow = !0;
            Module.noInitialRun && (shouldRunNow = !1), run();
            let C = Module,
              INTERNAL = {},
              SIZE_OF_INT = 4,
              SIZE_OF_NODE = 5 * SIZE_OF_INT,
              SIZE_OF_POINT = 2 * SIZE_OF_INT,
              SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT,
              ZERO_POINT = {
                row: 0,
                column: 0
              },
              QUERY_WORD_REGEX = /[\w-.]*/g,
              PREDICATE_STEP_TYPE_CAPTURE = 1,
              PREDICATE_STEP_TYPE_STRING = 2,
              LANGUAGE_FUNCTION_REGEX = /^_?tree_sitter_\w+/;
            var VERSION, MIN_COMPATIBLE_VERSION, TRANSFER_BUFFER, currentParseCallback, currentLogCallback;
            let _ParserImpl = class _ParserImpl {
              static init() {
                TRANSFER_BUFFER = C._ts_init(), VERSION = getValue(TRANSFER_BUFFER, "i32"), MIN_COMPATIBLE_VERSION = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
              }
              initialize() {
                C._ts_parser_new_wasm(), this[0] = getValue(TRANSFER_BUFFER, "i32"), this[1] = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
              }
              delete() {
                C._ts_parser_delete(this[0]), C._free(this[1]), this[0] = 0, this[1] = 0;
              }
              setLanguage(e) {
                let t;
                if (e) {
                  if (e.constructor !== Language) throw new Error("Argument must be a Language");
                  {
                    t = e[0];
                    let r = C._ts_language_version(t);
                    if (r < MIN_COMPATIBLE_VERSION || VERSION < r) throw new Error(`Incompatible language version ${r}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${VERSION}.`);
                  }
                } else t = 0, e = null;
                return this.language = e, C._ts_parser_set_language(this[0], t), this;
              }
              getLanguage() {
                return this.language;
              }
              parse(e, t, r) {
                if (typeof e == "string") currentParseCallback = __name((t, r, _) => e.slice(t, _), "currentParseCallback");else {
                  if (typeof e != "function") throw new Error("Argument must be a string or a function");
                  currentParseCallback = e;
                }
                this.logCallback ? (currentLogCallback = this.logCallback, C._ts_parser_enable_logger_wasm(this[0], 1)) : (currentLogCallback = null, C._ts_parser_enable_logger_wasm(this[0], 0));
                let _ = 0,
                  n = 0;
                if (r && r.includedRanges) {
                  _ = r.includedRanges.length, n = C._calloc(_, SIZE_OF_RANGE);
                  let e = n;
                  for (let t = 0; t < _; t++) marshalRange(e, r.includedRanges[t]), e += SIZE_OF_RANGE;
                }
                let s = C._ts_parser_parse_wasm(this[0], this[1], t ? t[0] : 0, n, _);
                if (!s) throw currentParseCallback = null, currentLogCallback = null, new Error("Parsing failed");
                let a = new Tree(INTERNAL, s, this.language, currentParseCallback);
                return currentParseCallback = null, currentLogCallback = null, a;
              }
              reset() {
                C._ts_parser_reset(this[0]);
              }
              setTimeoutMicros(e) {
                C._ts_parser_set_timeout_micros(this[0], e);
              }
              getTimeoutMicros() {
                return C._ts_parser_timeout_micros(this[0]);
              }
              setLogger(e) {
                if (e) {
                  if (typeof e != "function") throw new Error("Logger callback must be a function");
                } else e = null;
                return this.logCallback = e, this;
              }
              getLogger() {
                return this.logCallback;
              }
            };
            __name(_ParserImpl, "ParserImpl");
            let ParserImpl = _ParserImpl,
              _Tree = class _Tree {
                constructor(e, t, r, _) {
                  assertInternal(e), this[0] = t, this.language = r, this.textCallback = _;
                }
                copy() {
                  let e = C._ts_tree_copy(this[0]);
                  return new _Tree(INTERNAL, e, this.language, this.textCallback);
                }
                delete() {
                  C._ts_tree_delete(this[0]), this[0] = 0;
                }
                edit(e) {
                  marshalEdit(e), C._ts_tree_edit_wasm(this[0]);
                }
                get rootNode() {
                  return C._ts_tree_root_node_wasm(this[0]), unmarshalNode(this);
                }
                getLanguage() {
                  return this.language;
                }
                walk() {
                  return this.rootNode.walk();
                }
                getChangedRanges(e) {
                  if (e.constructor !== _Tree) throw new TypeError("Argument must be a Tree");
                  C._ts_tree_get_changed_ranges_wasm(this[0], e[0]);
                  let t = getValue(TRANSFER_BUFFER, "i32"),
                    r = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                    _ = new Array(t);
                  if (t > 0) {
                    let e = r;
                    for (let r = 0; r < t; r++) _[r] = unmarshalRange(e), e += SIZE_OF_RANGE;
                    C._free(r);
                  }
                  return _;
                }
              };
            __name(_Tree, "Tree");
            let Tree = _Tree,
              _Node = class _Node {
                constructor(e, t) {
                  assertInternal(e), this.tree = t;
                }
                get typeId() {
                  return marshalNode(this), C._ts_node_symbol_wasm(this.tree[0]);
                }
                get type() {
                  return this.tree.language.types[this.typeId] || "ERROR";
                }
                get endPosition() {
                  return marshalNode(this), C._ts_node_end_point_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
                }
                get endIndex() {
                  return marshalNode(this), C._ts_node_end_index_wasm(this.tree[0]);
                }
                get text() {
                  return getText(this.tree, this.startIndex, this.endIndex);
                }
                isNamed() {
                  return marshalNode(this), C._ts_node_is_named_wasm(this.tree[0]) === 1;
                }
                hasError() {
                  return marshalNode(this), C._ts_node_has_error_wasm(this.tree[0]) === 1;
                }
                hasChanges() {
                  return marshalNode(this), C._ts_node_has_changes_wasm(this.tree[0]) === 1;
                }
                isMissing() {
                  return marshalNode(this), C._ts_node_is_missing_wasm(this.tree[0]) === 1;
                }
                equals(e) {
                  return this.id === e.id;
                }
                child(e) {
                  return marshalNode(this), C._ts_node_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
                }
                namedChild(e) {
                  return marshalNode(this), C._ts_node_named_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
                }
                childForFieldId(e) {
                  return marshalNode(this), C._ts_node_child_by_field_id_wasm(this.tree[0], e), unmarshalNode(this.tree);
                }
                childForFieldName(e) {
                  let t = this.tree.language.fields.indexOf(e);
                  if (t !== -1) return this.childForFieldId(t);
                }
                get childCount() {
                  return marshalNode(this), C._ts_node_child_count_wasm(this.tree[0]);
                }
                get namedChildCount() {
                  return marshalNode(this), C._ts_node_named_child_count_wasm(this.tree[0]);
                }
                get firstChild() {
                  return this.child(0);
                }
                get firstNamedChild() {
                  return this.namedChild(0);
                }
                get lastChild() {
                  return this.child(this.childCount - 1);
                }
                get lastNamedChild() {
                  return this.namedChild(this.namedChildCount - 1);
                }
                get children() {
                  if (!this._children) {
                    marshalNode(this), C._ts_node_children_wasm(this.tree[0]);
                    let e = getValue(TRANSFER_BUFFER, "i32"),
                      t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                    if (this._children = new Array(e), e > 0) {
                      let r = t;
                      for (let t = 0; t < e; t++) this._children[t] = unmarshalNode(this.tree, r), r += SIZE_OF_NODE;
                      C._free(t);
                    }
                  }
                  return this._children;
                }
                get namedChildren() {
                  if (!this._namedChildren) {
                    marshalNode(this), C._ts_node_named_children_wasm(this.tree[0]);
                    let e = getValue(TRANSFER_BUFFER, "i32"),
                      t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                    if (this._namedChildren = new Array(e), e > 0) {
                      let r = t;
                      for (let t = 0; t < e; t++) this._namedChildren[t] = unmarshalNode(this.tree, r), r += SIZE_OF_NODE;
                      C._free(t);
                    }
                  }
                  return this._namedChildren;
                }
                descendantsOfType(e, t, r) {
                  Array.isArray(e) || (e = [e]), t || (t = ZERO_POINT), r || (r = ZERO_POINT);
                  let _ = [],
                    n = this.tree.language.types;
                  for (let t = 0, r = n.length; t < r; t++) e.includes(n[t]) && _.push(t);
                  let s = C._malloc(SIZE_OF_INT * _.length);
                  for (let e = 0, t = _.length; e < t; e++) setValue(s + e * SIZE_OF_INT, _[e], "i32");
                  marshalNode(this), C._ts_node_descendants_of_type_wasm(this.tree[0], s, _.length, t.row, t.column, r.row, r.column);
                  let a = getValue(TRANSFER_BUFFER, "i32"),
                    o = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                    i = new Array(a);
                  if (a > 0) {
                    let e = o;
                    for (let t = 0; t < a; t++) i[t] = unmarshalNode(this.tree, e), e += SIZE_OF_NODE;
                  }
                  return C._free(o), C._free(s), i;
                }
                get nextSibling() {
                  return marshalNode(this), C._ts_node_next_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                get previousSibling() {
                  return marshalNode(this), C._ts_node_prev_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                get nextNamedSibling() {
                  return marshalNode(this), C._ts_node_next_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                get previousNamedSibling() {
                  return marshalNode(this), C._ts_node_prev_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                get parent() {
                  return marshalNode(this), C._ts_node_parent_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                descendantForIndex(e, t = e) {
                  if (typeof e != "number" || typeof t != "number") throw new Error("Arguments must be numbers");
                  marshalNode(this);
                  let r = TRANSFER_BUFFER + SIZE_OF_NODE;
                  return setValue(r, e, "i32"), setValue(r + SIZE_OF_INT, t, "i32"), C._ts_node_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                namedDescendantForIndex(e, t = e) {
                  if (typeof e != "number" || typeof t != "number") throw new Error("Arguments must be numbers");
                  marshalNode(this);
                  let r = TRANSFER_BUFFER + SIZE_OF_NODE;
                  return setValue(r, e, "i32"), setValue(r + SIZE_OF_INT, t, "i32"), C._ts_node_named_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                descendantForPosition(e, t = e) {
                  if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
                  marshalNode(this);
                  let r = TRANSFER_BUFFER + SIZE_OF_NODE;
                  return marshalPoint(r, e), marshalPoint(r + SIZE_OF_POINT, t), C._ts_node_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                namedDescendantForPosition(e, t = e) {
                  if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
                  marshalNode(this);
                  let r = TRANSFER_BUFFER + SIZE_OF_NODE;
                  return marshalPoint(r, e), marshalPoint(r + SIZE_OF_POINT, t), C._ts_node_named_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                walk() {
                  return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(INTERNAL, this.tree);
                }
                toString() {
                  marshalNode(this);
                  let e = C._ts_node_to_string_wasm(this.tree[0]),
                    t = AsciiToString(e);
                  return C._free(e), t;
                }
              };
            __name(_Node, "Node");
            let Node = _Node,
              _TreeCursor = class _TreeCursor {
                constructor(e, t) {
                  assertInternal(e), this.tree = t, unmarshalTreeCursor(this);
                }
                delete() {
                  marshalTreeCursor(this), C._ts_tree_cursor_delete_wasm(this.tree[0]), this[0] = this[1] = this[2] = 0;
                }
                reset(e) {
                  marshalNode(e), marshalTreeCursor(this, TRANSFER_BUFFER + SIZE_OF_NODE), C._ts_tree_cursor_reset_wasm(this.tree[0]), unmarshalTreeCursor(this);
                }
                get nodeType() {
                  return this.tree.language.types[this.nodeTypeId] || "ERROR";
                }
                get nodeTypeId() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]);
                }
                get nodeId() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
                }
                get nodeIsNamed() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1;
                }
                get nodeIsMissing() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1;
                }
                get nodeText() {
                  marshalTreeCursor(this);
                  let e = C._ts_tree_cursor_start_index_wasm(this.tree[0]),
                    t = C._ts_tree_cursor_end_index_wasm(this.tree[0]);
                  return getText(this.tree, e, t);
                }
                get startPosition() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_start_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
                }
                get endPosition() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_end_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
                }
                get startIndex() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_start_index_wasm(this.tree[0]);
                }
                get endIndex() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_end_index_wasm(this.tree[0]);
                }
                currentNode() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_current_node_wasm(this.tree[0]), unmarshalNode(this.tree);
                }
                currentFieldId() {
                  return marshalTreeCursor(this), C._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
                }
                currentFieldName() {
                  return this.tree.language.fields[this.currentFieldId()];
                }
                gotoFirstChild() {
                  marshalTreeCursor(this);
                  let e = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
                  return unmarshalTreeCursor(this), e === 1;
                }
                gotoNextSibling() {
                  marshalTreeCursor(this);
                  let e = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
                  return unmarshalTreeCursor(this), e === 1;
                }
                gotoParent() {
                  marshalTreeCursor(this);
                  let e = C._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
                  return unmarshalTreeCursor(this), e === 1;
                }
              };
            __name(_TreeCursor, "TreeCursor");
            let TreeCursor = _TreeCursor,
              _Language = class _Language {
                constructor(e, t) {
                  assertInternal(e), this[0] = t, this.types = new Array(C._ts_language_symbol_count(this[0]));
                  for (let e = 0, t = this.types.length; e < t; e++) C._ts_language_symbol_type(this[0], e) < 2 && (this.types[e] = UTF8ToString(C._ts_language_symbol_name(this[0], e)));
                  this.fields = new Array(C._ts_language_field_count(this[0]) + 1);
                  for (let e = 0, t = this.fields.length; e < t; e++) {
                    let t = C._ts_language_field_name_for_id(this[0], e);
                    this.fields[e] = t !== 0 ? UTF8ToString(t) : null;
                  }
                }
                get version() {
                  return C._ts_language_version(this[0]);
                }
                get fieldCount() {
                  return this.fields.length - 1;
                }
                fieldIdForName(e) {
                  let t = this.fields.indexOf(e);
                  return t !== -1 ? t : null;
                }
                fieldNameForId(e) {
                  return this.fields[e] || null;
                }
                idForNodeType(e, t) {
                  let r = lengthBytesUTF8(e),
                    _ = C._malloc(r + 1);
                  stringToUTF8(e, _, r + 1);
                  let n = C._ts_language_symbol_for_name(this[0], _, r, t);
                  return C._free(_), n || null;
                }
                get nodeTypeCount() {
                  return C._ts_language_symbol_count(this[0]);
                }
                nodeTypeForId(e) {
                  let t = C._ts_language_symbol_name(this[0], e);
                  return t ? UTF8ToString(t) : null;
                }
                nodeTypeIsNamed(e) {
                  return !!C._ts_language_type_is_named_wasm(this[0], e);
                }
                nodeTypeIsVisible(e) {
                  return !!C._ts_language_type_is_visible_wasm(this[0], e);
                }
                query(e) {
                  let t = lengthBytesUTF8(e),
                    r = C._malloc(t + 1);
                  stringToUTF8(e, r, t + 1);
                  let _ = C._ts_query_new(this[0], r, t, TRANSFER_BUFFER, TRANSFER_BUFFER + SIZE_OF_INT);
                  if (!_) {
                    let t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                      _ = UTF8ToString(r, getValue(TRANSFER_BUFFER, "i32")).length,
                      n = e.substr(_, 100).split(`
`)[0],
                      s,
                      a = n.match(QUERY_WORD_REGEX)[0];
                    switch (t) {
                      case 2:
                        s = new RangeError(`Bad node name '${a}'`);
                        break;
                      case 3:
                        s = new RangeError(`Bad field name '${a}'`);
                        break;
                      case 4:
                        s = new RangeError(`Bad capture name @${a}`);
                        break;
                      case 5:
                        s = new TypeError(`Bad pattern structure at offset ${_}: '${n}'...`), a = "";
                        break;
                      default:
                        s = new SyntaxError(`Bad syntax at offset ${_}: '${n}'...`), a = "";
                    }
                    throw s.index = _, s.length = a.length, C._free(r), s;
                  }
                  let n = C._ts_query_string_count(_),
                    s = C._ts_query_capture_count(_),
                    a = C._ts_query_pattern_count(_),
                    o = new Array(s),
                    i = new Array(n);
                  for (let e = 0; e < s; e++) {
                    let t = C._ts_query_capture_name_for_id(_, e, TRANSFER_BUFFER),
                      r = getValue(TRANSFER_BUFFER, "i32");
                    o[e] = UTF8ToString(t, r);
                  }
                  for (let e = 0; e < n; e++) {
                    let t = C._ts_query_string_value_for_id(_, e, TRANSFER_BUFFER),
                      r = getValue(TRANSFER_BUFFER, "i32");
                    i[e] = UTF8ToString(t, r);
                  }
                  let l = new Array(a),
                    u = new Array(a),
                    d = new Array(a),
                    c = new Array(a),
                    m = new Array(a);
                  for (let e = 0; e < a; e++) {
                    let t = C._ts_query_predicates_for_pattern(_, e, TRANSFER_BUFFER),
                      r = getValue(TRANSFER_BUFFER, "i32");
                    c[e] = [], m[e] = [];
                    let n = [],
                      s = t;
                    for (let t = 0; t < r; t++) {
                      let t = getValue(s, "i32");
                      s += SIZE_OF_INT;
                      let r = getValue(s, "i32");
                      if (s += SIZE_OF_INT, t === PREDICATE_STEP_TYPE_CAPTURE) n.push({
                        type: "capture",
                        name: o[r]
                      });else if (t === PREDICATE_STEP_TYPE_STRING) n.push({
                        type: "string",
                        value: i[r]
                      });else if (n.length > 0) {
                        if (n[0].type !== "string") throw new Error("Predicates must begin with a literal value");
                        let t = n[0].value,
                          r = !0;
                        switch (t) {
                          case "not-eq?":
                            r = !1;
                          case "eq?":
                            if (n.length !== 3) throw new Error("Wrong number of arguments to `#eq?` predicate. Expected 2, got " + (n.length - 1));
                            if (n[1].type !== "capture") throw new Error(`First argument of \`#eq?\` predicate must be a capture. Got "${n[1].value}"`);
                            if (n[2].type === "capture") {
                              let t = n[1].name,
                                _ = n[2].name;
                              m[e].push(function (e) {
                                let n, s;
                                for (let r of e) r.name === t && (n = r.node), r.name === _ && (s = r.node);
                                return n === void 0 || s === void 0 || n.text === s.text === r;
                              });
                            } else {
                              let t = n[1].name,
                                _ = n[2].value;
                              m[e].push(function (e) {
                                for (let n of e) if (n.name === t) return n.node.text === _ === r;
                                return !0;
                              });
                            }
                            break;
                          case "not-match?":
                            r = !1;
                          case "match?":
                            if (n.length !== 3) throw new Error(`Wrong number of arguments to \`#match?\` predicate. Expected 2, got ${n.length - 1}.`);
                            if (n[1].type !== "capture") throw new Error(`First argument of \`#match?\` predicate must be a capture. Got "${n[1].value}".`);
                            if (n[2].type !== "string") throw new Error(`Second argument of \`#match?\` predicate must be a string. Got @${n[2].value}.`);
                            let _ = n[1].name,
                              s = new RegExp(n[2].value);
                            m[e].push(function (e) {
                              for (let t of e) if (t.name === _) return s.test(t.node.text) === r;
                              return !0;
                            });
                            break;
                          case "set!":
                            if (n.length < 2 || n.length > 3) throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${n.length - 1}.`);
                            if (n.some(e => e.type !== "string")) throw new Error('Arguments to `#set!` predicate must be a strings.".');
                            l[e] || (l[e] = {}), l[e][n[1].value] = n[2] ? n[2].value : null;
                            break;
                          case "is?":
                          case "is-not?":
                            if (n.length < 2 || n.length > 3) throw new Error(`Wrong number of arguments to \`#${t}\` predicate. Expected 1 or 2. Got ${n.length - 1}.`);
                            if (n.some(e => e.type !== "string")) throw new Error(`Arguments to \`#${t}\` predicate must be a strings.".`);
                            let a = t === "is?" ? u : d;
                            a[e] || (a[e] = {}), a[e][n[1].value] = n[2] ? n[2].value : null;
                            break;
                          default:
                            c[e].push({
                              operator: t,
                              operands: n.slice(1)
                            });
                        }
                        n.length = 0;
                      }
                    }
                    Object.freeze(l[e]), Object.freeze(u[e]), Object.freeze(d[e]);
                  }
                  return C._free(r), new Query(INTERNAL, _, o, m, c, Object.freeze(l), Object.freeze(u), Object.freeze(d));
                }
                static load(e) {
                  let t;
                  if (e instanceof Uint8Array) t = Promise.resolve(e);else {
                    let r = e;
                    if (typeof process < "u" && process.versions && process.versions.node) {
                      let e = require("fs");
                      t = Promise.resolve(e.readFileSync(r));
                    } else t = fetch(r).then(e => e.arrayBuffer().then(t => {
                      if (e.ok) return new Uint8Array(t);
                      {
                        let r = new TextDecoder("utf-8").decode(t);
                        throw new Error(`Language.load failed with status ${e.status}.

${r}`);
                      }
                    }));
                  }
                  let r = typeof loadSideModule == "function" ? loadSideModule : loadWebAssemblyModule;
                  return t.then(e => r(e, {
                    loadAsync: !0
                  })).then(e => {
                    let t = Object.keys(e),
                      r = t.find(e => LANGUAGE_FUNCTION_REGEX.test(e) && !e.includes("external_scanner_"));
                    r || console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(t, null, 2)}`);
                    let _ = e[r]();
                    return new _Language(INTERNAL, _);
                  });
                }
              };
            __name(_Language, "Language");
            let Language = _Language,
              _Query = class _Query {
                constructor(e, t, r, _, n, s, a, o) {
                  assertInternal(e), this[0] = t, this.captureNames = r, this.textPredicates = _, this.predicates = n, this.setProperties = s, this.assertedProperties = a, this.refutedProperties = o, this.exceededMatchLimit = !1;
                }
                delete() {
                  C._ts_query_delete(this[0]), this[0] = 0;
                }
                matches(e, t, r, _) {
                  t || (t = ZERO_POINT), r || (r = ZERO_POINT), _ || (_ = {});
                  let n = _.matchLimit;
                  if (n === void 0) n = 0;else if (typeof n != "number") throw new Error("Arguments must be numbers");
                  marshalNode(e), C._ts_query_matches_wasm(this[0], e.tree[0], t.row, t.column, r.row, r.column, n);
                  let s = getValue(TRANSFER_BUFFER, "i32"),
                    a = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                    o = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"),
                    i = new Array(s);
                  this.exceededMatchLimit = !!o;
                  let l = 0,
                    u = a;
                  for (let t = 0; t < s; t++) {
                    let r = getValue(u, "i32");
                    u += SIZE_OF_INT;
                    let _ = getValue(u, "i32");
                    u += SIZE_OF_INT;
                    let n = new Array(_);
                    if (u = unmarshalCaptures(this, e.tree, u, n), this.textPredicates[r].every(e => e(n))) {
                      i[l++] = {
                        pattern: r,
                        captures: n
                      };
                      let e = this.setProperties[r];
                      e && (i[t].setProperties = e);
                      let _ = this.assertedProperties[r];
                      _ && (i[t].assertedProperties = _);
                      let s = this.refutedProperties[r];
                      s && (i[t].refutedProperties = s);
                    }
                  }
                  return i.length = l, C._free(a), i;
                }
                captures(e, t, r, _) {
                  t || (t = ZERO_POINT), r || (r = ZERO_POINT), _ || (_ = {});
                  let n = _.matchLimit;
                  if (n === void 0) n = 0;else if (typeof n != "number") throw new Error("Arguments must be numbers");
                  marshalNode(e), C._ts_query_captures_wasm(this[0], e.tree[0], t.row, t.column, r.row, r.column, n);
                  let s = getValue(TRANSFER_BUFFER, "i32"),
                    a = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                    o = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"),
                    i = [];
                  this.exceededMatchLimit = !!o;
                  let l = [],
                    u = a;
                  for (let t = 0; t < s; t++) {
                    let t = getValue(u, "i32");
                    u += SIZE_OF_INT;
                    let r = getValue(u, "i32");
                    u += SIZE_OF_INT;
                    let _ = getValue(u, "i32");
                    if (u += SIZE_OF_INT, l.length = r, u = unmarshalCaptures(this, e.tree, u, l), this.textPredicates[t].every(e => e(l))) {
                      let e = l[_],
                        r = this.setProperties[t];
                      r && (e.setProperties = r);
                      let n = this.assertedProperties[t];
                      n && (e.assertedProperties = n);
                      let s = this.refutedProperties[t];
                      s && (e.refutedProperties = s), i.push(e);
                    }
                  }
                  return C._free(a), i;
                }
                predicatesForPattern(e) {
                  return this.predicates[e];
                }
                didExceedMatchLimit() {
                  return this.exceededMatchLimit;
                }
              };
            __name(_Query, "Query");
            let Query = _Query;
            function getText(e, t, r) {
              let _ = r - t,
                n = e.textCallback(t, null, r);
              for (t += n.length; t < r;) {
                let _ = e.textCallback(t, null, r);
                if (!(_ && _.length > 0)) break;
                t += _.length, n += _;
              }
              return t > r && (n = n.slice(0, _)), n;
            }
            __name(getText, "getText");
            function unmarshalCaptures(e, t, r, _) {
              for (let n = 0, s = _.length; n < s; n++) {
                let s = getValue(r, "i32"),
                  a = unmarshalNode(t, r += SIZE_OF_INT);
                r += SIZE_OF_NODE, _[n] = {
                  name: e.captureNames[s],
                  node: a
                };
              }
              return r;
            }
            __name(unmarshalCaptures, "unmarshalCaptures");
            function assertInternal(e) {
              if (e !== INTERNAL) throw new Error("Illegal constructor");
            }
            __name(assertInternal, "assertInternal");
            function isPoint(e) {
              return e && typeof e.row == "number" && typeof e.column == "number";
            }
            __name(isPoint, "isPoint");
            function marshalNode(e) {
              let t = TRANSFER_BUFFER;
              setValue(t, e.id, "i32"), t += SIZE_OF_INT, setValue(t, e.startIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.startPosition.row, "i32"), t += SIZE_OF_INT, setValue(t, e.startPosition.column, "i32"), t += SIZE_OF_INT, setValue(t, e[0], "i32");
            }
            __name(marshalNode, "marshalNode");
            function unmarshalNode(e, t = TRANSFER_BUFFER) {
              let r = getValue(t, "i32");
              if (r === 0) return null;
              let _ = getValue(t += SIZE_OF_INT, "i32"),
                n = getValue(t += SIZE_OF_INT, "i32"),
                s = getValue(t += SIZE_OF_INT, "i32"),
                a = getValue(t += SIZE_OF_INT, "i32"),
                o = new Node(INTERNAL, e);
              return o.id = r, o.startIndex = _, o.startPosition = {
                row: n,
                column: s
              }, o[0] = a, o;
            }
            __name(unmarshalNode, "unmarshalNode");
            function marshalTreeCursor(e, t = TRANSFER_BUFFER) {
              setValue(t + 0 * SIZE_OF_INT, e[0], "i32"), setValue(t + 1 * SIZE_OF_INT, e[1], "i32"), setValue(t + 2 * SIZE_OF_INT, e[2], "i32");
            }
            __name(marshalTreeCursor, "marshalTreeCursor");
            function unmarshalTreeCursor(e) {
              e[0] = getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32"), e[1] = getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32"), e[2] = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
            }
            __name(unmarshalTreeCursor, "unmarshalTreeCursor");
            function marshalPoint(e, t) {
              setValue(e, t.row, "i32"), setValue(e + SIZE_OF_INT, t.column, "i32");
            }
            __name(marshalPoint, "marshalPoint");
            function unmarshalPoint(e) {
              return {
                row: getValue(e, "i32"),
                column: getValue(e + SIZE_OF_INT, "i32")
              };
            }
            __name(unmarshalPoint, "unmarshalPoint");
            function marshalRange(e, t) {
              marshalPoint(e, t.startPosition), marshalPoint(e += SIZE_OF_POINT, t.endPosition), setValue(e += SIZE_OF_POINT, t.startIndex, "i32"), setValue(e += SIZE_OF_INT, t.endIndex, "i32"), e += SIZE_OF_INT;
            }
            __name(marshalRange, "marshalRange");
            function unmarshalRange(e) {
              let t = {};
              return t.startPosition = unmarshalPoint(e), e += SIZE_OF_POINT, t.endPosition = unmarshalPoint(e), e += SIZE_OF_POINT, t.startIndex = getValue(e, "i32"), e += SIZE_OF_INT, t.endIndex = getValue(e, "i32"), t;
            }
            __name(unmarshalRange, "unmarshalRange");
            function marshalEdit(e) {
              let t = TRANSFER_BUFFER;
              marshalPoint(t, e.startPosition), t += SIZE_OF_POINT, marshalPoint(t, e.oldEndPosition), t += SIZE_OF_POINT, marshalPoint(t, e.newEndPosition), t += SIZE_OF_POINT, setValue(t, e.startIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.oldEndIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.newEndIndex, "i32"), t += SIZE_OF_INT;
            }
            __name(marshalEdit, "marshalEdit");
            for (let e of Object.getOwnPropertyNames(ParserImpl.prototype)) Object.defineProperty(_Parser.prototype, e, {
              value: ParserImpl.prototype[e],
              enumerable: !1,
              writable: !1
            });
            _Parser.Language = Language, Module.onRuntimeInitialized = () => {
              ParserImpl.init(), resolveInitPromise();
            };
          }));
        }
      };
      __name(_Parser, "Parser");
      let Parser = _Parser;
      return Parser;
    }();
  typeof exports == "object" && (module.exports = TreeSitter);
});,function isSupportedLanguageId(languageId) {
  return languageId in languageIdToWasmLanguageMapping;
},function languageIdToWasmLanguage(languageId) {
  if (!(languageId in languageIdToWasmLanguageMapping)) throw new Error(`Unrecognized language: ${languageId}`);
  return languageIdToWasmLanguageMapping[languageId];
},async function loadWasmLanguage(language) {
  await f4.Parser.init();
  let wasmBytes;
  try {
    wasmBytes = await OY.fsp.readFile((0, GY.resolve)(__dirname, "..", "dist", `tree-sitter-${language}.wasm`));
  } catch (e) {
    if (typeof e.code == "string" && e instanceof Error && e.name === "Error") {
      let error = new Error(`Could not load tree-sitter-${language}.wasm`);
      throw error.code = "CopilotPromptLoadFailure", error.cause = e, error;
    }
    throw e;
  }
  return f4.Parser.Language.load(wasmBytes);
},async function getLanguage(language) {
  let wasmLanguage = languageIdToWasmLanguage(language);
  if (!loadedLanguages.has(wasmLanguage)) {
    let loadedLang = await loadWasmLanguage(wasmLanguage);
    loadedLanguages.set(wasmLanguage, loadedLang);
  }
  return loadedLanguages.get(wasmLanguage);
},async function parseTreeSitter(language, source) {
  let treeSitterLanguage = await getLanguage(language),
    parser = new f4.Parser();
  parser.setLanguage(treeSitterLanguage);
  let parsedTree = parser.parse(source);
  return parser.delete(), parsedTree;
},async function parsesWithoutError(language, source) {
  let tree = await parseTreeSitter(language, source),
    result = !tree.rootNode.hasError();
  return tree.delete(), result;
},function getBlockCloseToken(language) {
  switch (languageIdToWasmLanguage(language)) {
    case "python":
      return null;
    case "javascript":
    case "typescript":
    case "tsx":
    case "go":
      return "}";
    case "ruby":
      return "end";
  }
},function innerQuery(queries, root) {
  let matches = [];
  for (let query of queries) {
    if (!query[1]) {
      let lang = root.tree.getLanguage();
      query[1] = lang.query(query[0]);
    }
    matches.push(...query[1].matches(root));
  }
  return matches;
},function queryFunctions(language, root) {
  let queries = functionQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryImports(language, root) {
  let queries = importsQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryExports(language, root) {
  let queries = exportsQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryGlobalVars(language, root) {
  let queries = globalVarsQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryPythonIsDocstring(blockNode) {
  return innerQuery([docstringQuery], blockNode).length == 1;
},function getAncestorWithSiblingFunctions(language, nd) {
  let check = isFunctionParent[languageIdToWasmLanguage(language)];
  for (; nd.parent;) {
    if (check(nd.parent)) return nd;
    nd = nd.parent;
  }
  return nd.parent ? nd : null;
},function isFunction(language, nd) {
  return functionTypes[languageIdToWasmLanguage(language)].has(nd.type);
},function isFunctionDefinition(language, nd) {
  switch (languageIdToWasmLanguage(language)) {
    case "python":
    case "go":
    case "ruby":
      return isFunction(language, nd);
    case "javascript":
    case "typescript":
    case "tsx":
      if (nd.type === "function_declaration" || nd.type === "generator_function_declaration" || nd.type === "method_definition") return !0;
      if (nd.type === "lexical_declaration" || nd.type === "variable_declaration") {
        if (nd.namedChildCount > 1) return !1;
        let declarator = nd.namedChild(0);
        if (declarator == null) return !1;
        let init = declarator.namedChild(1);
        return init !== null && isFunction(language, init);
      }
      if (nd.type === "expression_statement") {
        let expr = nd.namedChild(0);
        if ((expr == null ? void 0 : expr.type) === "assignment_expression") {
          let rhs = expr.namedChild(1);
          return rhs !== null && isFunction(language, rhs);
        }
      }
      return !1;
  }
},function getFirstPrecedingComment(nd) {
  var _a;
  let cur = nd;
  for (; ((_a = cur.previousSibling) == null ? void 0 : _a.type) === "comment";) {
    let prev = cur.previousSibling;
    if (prev.endPosition.row < cur.startPosition.row - 1) break;
    cur = prev;
  }
  return (cur == null ? void 0 : cur.type) === "comment" ? cur : null;
},async function getFunctionPositions(language, source) {
  let tree = await parseTreeSitter(language, source),
    positions = queryFunctions(language, tree.rootNode).map(res => {
      let fn = res.captures.find(c => c.name === "function").node;
      return {
        startIndex: fn.startIndex,
        endIndex: fn.endIndex
      };
    });
  return tree.delete(), positions;
},var import_fs,
  import_path,
  import_web_tree_sitter,
  WASMLanguage,
  languageIdToWasmLanguageMapping,
  jsFunctionQuery,
  functionQuery,
  requireCall,
  declaratorWithRequire,
  commonJsImport,
  tsImportQueries,
  importsQuery,
  jsExportQueries,
  exportsQuery,
  globalVarsQuery,
  jsFunctionTypes,
  functionTypes,
  isFunctionParent,
  loadedLanguages,
  docstringQuery,
  init_parse = __esmMin(() => {
    "use strict";

    import_fs = require("fs"), import_path = require("path"), import_web_tree_sitter = Dr(jY()), WASMLanguage = (s => (WASMLanguage.Python = "python", WASMLanguage.JavaScript = "javascript", WASMLanguage.TypeScript = "typescript", WASMLanguage.TSX = "tsx", WASMLanguage.Go = "go", WASMLanguage.Ruby = "ruby", WASMLanguage))(zY || {}), languageIdToWasmLanguageMapping = {
      python: "python",
      javascript: "javascript",
      javascriptreact: "javascript",
      jsx: "javascript",
      typescript: "typescript",
      typescriptreact: "tsx",
      go: "go",
      ruby: "ruby"
    };
    __name(isSupportedLanguageId, "isSupportedLanguageId");
    __name(languageIdToWasmLanguage, "languageIdToWasmLanguage");
    jsFunctionQuery = `[
    (function body: (statement_block) @body)
    (function_declaration body: (statement_block) @body)
    (generator_function body: (statement_block) @body)
    (generator_function_declaration body: (statement_block) @body)
    (method_definition body: (statement_block) @body)
    (arrow_function body: (statement_block) @body)
  ] @function`, functionQuery = {
      python: [[`(function_definition body: (block
             (expression_statement (string))? @docstring) @body) @function`], ['(ERROR ("def" (identifier) (parameters))) @function']],
      javascript: [[jsFunctionQuery]],
      typescript: [[jsFunctionQuery]],
      tsx: [[jsFunctionQuery]],
      go: [[`[
            (function_declaration body: (block) @body)
            (method_declaration body: (block) @body)
          ] @function`]],
      ruby: [[`[
            (method name: (_) parameters: (method_parameters)? @params [(_)+ "end"] @body)
            (singleton_method name: (_) parameters: (method_parameters)? @params [(_)+ "end"] @body)
          ] @function`]]
    }, requireCall = '(call_expression function: ((identifier) @req (#eq? @req "require")))', declaratorWithRequire = `(variable_declarator value: ${requireCall})`, commonJsImport = `
    (lexical_declaration ${declaratorWithRequire}+)
    (variable_declaration ${declaratorWithRequire}+)
`, tsImportQueries = [[`(program [ ${commonJsImport} ] @import)`], ["(program [ (import_statement) (import_alias) ] @import)"]], importsQuery = {
      python: [["(module (future_import_statement) @import)"], ["(module (import_statement) @import)"], ["(module (import_from_statement) @import)"]],
      javascript: [[`(program [ ${commonJsImport} ] @import)`], ["(program [ (import_statement) ] @import)"]],
      typescript: tsImportQueries,
      tsx: tsImportQueries,
      go: [],
      ruby: []
    }, jsExportQueries = [["(program (export_statement) @export)"]], exportsQuery = {
      python: [],
      javascript: jsExportQueries,
      typescript: jsExportQueries,
      tsx: jsExportQueries,
      go: [],
      ruby: []
    }, globalVarsQuery = {
      python: [["(module (global_statement) @globalVar)"], ["(module (expression_statement) @globalVar)"]],
      javascript: [],
      typescript: [],
      tsx: [],
      go: [],
      ruby: []
    }, jsFunctionTypes = ["function", "function_declaration", "generator_function", "generator_function_declaration", "method_definition", "arrow_function"], functionTypes = {
      python: new Set(["function_definition"]),
      javascript: new Set(jsFunctionTypes),
      typescript: new Set(jsFunctionTypes),
      tsx: new Set(jsFunctionTypes),
      go: new Set(["function_declaration", "method_declaration"]),
      ruby: new Set(["method", "singleton_method"])
    }, isFunctionParent = {
      python: nd => {
        var _a;
        return nd.type === "module" || nd.type === "block" && ((_a = nd.parent) == null ? void 0 : _a.type) === "class_definition";
      },
      javascript: nd => nd.type === "program" || nd.type === "class_body",
      typescript: nd => nd.type === "program" || nd.type === "class_body",
      tsx: nd => nd.type === "program" || nd.type === "class_body",
      go: nd => nd.type === "source_file",
      ruby: nd => nd.type === "program" || nd.type === "class"
    }, loadedLanguages = new Map();
    __name(loadWasmLanguage, "loadWasmLanguage");
    __name(getLanguage, "getLanguage");
    __name(parseTreeSitter, "parseTreeSitter");
    __name(parsesWithoutError, "parsesWithoutError");
    __name(getBlockCloseToken, "getBlockCloseToken");
    __name(innerQuery, "innerQuery");
    __name(queryFunctions, "queryFunctions");
    __name(queryImports, "queryImports");
    __name(queryExports, "queryExports");
    __name(queryGlobalVars, "queryGlobalVars");
    docstringQuery = [`[
    (class_definition (block (expression_statement (string))))
    (function_definition (block (expression_statement (string))))
]`];
    __name(queryPythonIsDocstring, "queryPythonIsDocstring");
    __name(getAncestorWithSiblingFunctions, "getAncestorWithSiblingFunctions");
    __name(isFunction, "isFunction");
    __name(isFunctionDefinition, "isFunctionDefinition");
    __name(getFirstPrecedingComment, "getFirstPrecedingComment");
    __name(getFunctionPositions, "getFunctionPositions");
  });,function getLineAtOffset(text, offset) {
  let prevNewline = text.lastIndexOf(`
`, offset - 1),
    nextNewline = text.indexOf(`
`, offset);
  return nextNewline < 0 && (nextNewline = text.length), text.slice(prevNewline + 1, nextNewline);
},function rewindToNearestNonWs(text, offset) {
  let result = offset;
  for (; result > 0 && /\s/.test(text.charAt(result - 1));) result--;
  return result;
},function indent(nd, source) {
  let startIndex = nd.startIndex,
    lineStart = nd.startIndex - nd.startPosition.column,
    prefix = source.substring(lineStart, startIndex);
  if (/^\s*$/.test(prefix)) return prefix;
},function outdented(fst, snd, source) {
  if (snd.startPosition.row <= fst.startPosition.row) return !1;
  let fstIndent = indent(fst, source),
    sndIndent = indent(snd, source);
  return fstIndent !== void 0 && sndIndent !== void 0 && fstIndent.startsWith(sndIndent);
},function getBlockParser(languageId) {
  return wasmLanguageToBlockParser[languageIdToWasmLanguage(languageId)];
},async function isEmptyBlockStart(languageId, text, offset) {
  return isSupportedLanguageId(languageId) ? getBlockParser(languageId).isEmptyBlockStart(text, offset) : !1;
},async function isBlockBodyFinished(languageId, prefix, completion, offset) {
  if (isSupportedLanguageId(languageId)) return getBlockParser(languageId).isBlockBodyFinished(prefix, completion, offset);
},async function getNodeStart(languageId, text, offset) {
  if (isSupportedLanguageId(languageId)) return getBlockParser(languageId).getNodeStart(text, offset);
},var _BaseBlockParser,
  BaseBlockParser,
  _RegexBasedBlockParser,
  RegexBasedBlockParser,
  _TreeSitterBasedBlockParser,
  TreeSitterBasedBlockParser,
  wasmLanguageToBlockParser,
  init_parseBlock = __esmMin(() => {
    "use strict";

    init_parse();
    _BaseBlockParser = class _BaseBlockParser {
      constructor(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild) {
        this.languageId = languageId;
        this.nodeMatch = nodeMatch;
        this.nodeTypesWithBlockOrStmtChild = nodeTypesWithBlockOrStmtChild;
      }
      async getNodeMatchAtPosition(text, offset, cb) {
        let tree = await parseTreeSitter(this.languageId, text);
        try {
          let nodeToComplete = tree.rootNode.descendantForIndex(offset);
          for (; nodeToComplete;) {
            let blockNodeType = this.nodeMatch[nodeToComplete.type];
            if (blockNodeType) {
              if (!this.nodeTypesWithBlockOrStmtChild.has(nodeToComplete.type)) break;
              let fieldLabel = this.nodeTypesWithBlockOrStmtChild.get(nodeToComplete.type),
                childToCheck = fieldLabel == "" ? nodeToComplete.namedChildren[0] : nodeToComplete.childForFieldName(fieldLabel);
              if ((childToCheck == null ? void 0 : childToCheck.type) == blockNodeType) break;
            }
            nodeToComplete = nodeToComplete.parent;
          }
          return nodeToComplete ? cb(nodeToComplete) : void 0;
        } finally {
          tree.delete();
        }
      }
      getNextBlockAtPosition(text, offset, cb) {
        return this.getNodeMatchAtPosition(text, offset, nodeToComplete => {
          let block = nodeToComplete.children.reverse().find(x => x.type == this.nodeMatch[nodeToComplete.type]);
          if (block) {
            if (this.languageId == "python" && block.parent) {
              let parent = block.parent.type == ":" ? block.parent.parent : block.parent,
                nextComment = parent == null ? void 0 : parent.nextSibling;
              for (; nextComment && nextComment.type == "comment";) {
                let commentInline = nextComment.startPosition.row == block.endPosition.row && nextComment.startPosition.column >= block.endPosition.column,
                  commentAtEnd = nextComment.startPosition.row > parent.endPosition.row && nextComment.startPosition.column > parent.startPosition.column;
                if (commentInline || commentAtEnd) block = nextComment, nextComment = nextComment.nextSibling;else break;
              }
            }
            if (!(block.endIndex >= block.tree.rootNode.endIndex - 1 && (block.hasError() || block.parent.hasError()))) return cb(block);
          }
        });
      }
      async isBlockBodyFinished(prefix, completion, offset) {
        let solution = (prefix + completion).trimEnd(),
          endIndex = await this.getNextBlockAtPosition(solution, offset, block => block.endIndex);
        if (endIndex !== void 0 && endIndex < solution.length) {
          let lengthOfBlock = endIndex - prefix.length;
          return lengthOfBlock > 0 ? lengthOfBlock : void 0;
        }
      }
      getNodeStart(text, offset) {
        let solution = text.trimEnd();
        return this.getNodeMatchAtPosition(solution, offset, block => block.startIndex);
      }
    };
    __name(_BaseBlockParser, "BaseBlockParser");
    BaseBlockParser = _BaseBlockParser, _RegexBasedBlockParser = class _RegexBasedBlockParser extends BaseBlockParser {
      constructor(languageId, blockEmptyMatch, lineMatch, nodeMatch, nodeTypesWithBlockOrStmtChild) {
        super(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild);
        this.blockEmptyMatch = blockEmptyMatch;
        this.lineMatch = lineMatch;
      }
      isBlockStart(line) {
        return this.lineMatch.test(line.trimStart());
      }
      async isBlockBodyEmpty(text, offset) {
        let res = await this.getNextBlockAtPosition(text, offset, block => {
          block.startIndex < offset && (offset = block.startIndex);
          let blockText = text.substring(offset, block.endIndex).trim();
          return blockText == "" || blockText.replace(/\s/g, "") == this.blockEmptyMatch;
        });
        return res === void 0 || res;
      }
      async isEmptyBlockStart(text, offset) {
        return offset = rewindToNearestNonWs(text, offset), this.isBlockStart(getLineAtOffset(text, offset)) && this.isBlockBodyEmpty(text, offset);
      }
    };
    __name(_RegexBasedBlockParser, "RegexBasedBlockParser");
    RegexBasedBlockParser = _RegexBasedBlockParser;
    __name(getLineAtOffset, "getLineAtOffset");
    __name(rewindToNearestNonWs, "rewindToNearestNonWs");
    __name(indent, "indent");
    __name(outdented, "outdented");
    _TreeSitterBasedBlockParser = class _TreeSitterBasedBlockParser extends BaseBlockParser {
      constructor(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild, startKeywords, blockNodeType, emptyStatementType, curlyBraceLanguage) {
        super(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild);
        this.startKeywords = startKeywords;
        this.blockNodeType = blockNodeType;
        this.emptyStatementType = emptyStatementType;
        this.curlyBraceLanguage = curlyBraceLanguage;
      }
      isBlockEmpty(block, offset) {
        var _a, _b;
        let trimmed = block.text.trim();
        return this.curlyBraceLanguage && (trimmed.startsWith("{") && (trimmed = trimmed.slice(1)), trimmed.endsWith("}") && (trimmed = trimmed.slice(0, -1)), trimmed = trimmed.trim()), !!(trimmed.length == 0 || this.languageId == "python" && (((_a = block.parent) == null ? void 0 : _a.type) == "class_definition" || ((_b = block.parent) == null ? void 0 : _b.type) == "function_definition") && block.children.length == 1 && queryPythonIsDocstring(block.parent));
      }
      async isEmptyBlockStart(text, offset) {
        var _a, _b, _c, _d;
        if (offset > text.length) throw new RangeError("Invalid offset");
        for (let i = offset; i < text.length && text.charAt(i) != `
`; i++) if (/\S/.test(text.charAt(i))) return !1;
        offset = rewindToNearestNonWs(text, offset);
        let tree = await parseTreeSitter(this.languageId, text);
        try {
          let nodeAtPos = tree.rootNode.descendantForIndex(offset - 1);
          if (nodeAtPos == null || this.curlyBraceLanguage && nodeAtPos.type == "}") return !1;
          if ((this.languageId == "javascript" || this.languageId == "typescript") && nodeAtPos.parent && nodeAtPos.parent.type == "object" && nodeAtPos.parent.text.trim() == "{") return !0;
          if (this.languageId == "typescript") {
            let currNode = nodeAtPos;
            for (; currNode.parent;) {
              if (currNode.type == "function_signature" || currNode.type == "method_signature") {
                let next = nodeAtPos.nextSibling;
                return next && currNode.hasError() && outdented(currNode, next, text) ? !0 : !currNode.children.find(c => c.type == ";") && currNode.endIndex <= offset;
              }
              currNode = currNode.parent;
            }
          }
          let errorNode = null,
            blockNode = null,
            blockParentNode = null,
            currNode = nodeAtPos;
          for (; currNode != null;) {
            if (currNode.type == this.blockNodeType) {
              blockNode = currNode;
              break;
            }
            if (this.nodeMatch[currNode.type]) {
              blockParentNode = currNode;
              break;
            }
            if (currNode.type == "ERROR") {
              errorNode = currNode;
              break;
            }
            currNode = currNode.parent;
          }
          if (blockNode != null) {
            if (!blockNode.parent || !this.nodeMatch[blockNode.parent.type]) return !1;
            if (this.languageId == "python") {
              let prevSibling = blockNode.previousSibling;
              if (prevSibling != null && prevSibling.hasError() && (prevSibling.text.startsWith('"""') || prevSibling.text.startsWith("'''"))) return !0;
            }
            return this.isBlockEmpty(blockNode, offset);
          }
          if (errorNode != null) {
            if (((_a = errorNode.previousSibling) == null ? void 0 : _a.type) == "module" || ((_b = errorNode.previousSibling) == null ? void 0 : _b.type) == "internal_module" || ((_c = errorNode.previousSibling) == null ? void 0 : _c.type) == "def") return !0;
            let children = [...errorNode.children].reverse(),
              keyword = children.find(child => this.startKeywords.includes(child.type)),
              block = children.find(child => child.type == this.blockNodeType);
            if (keyword) {
              switch (this.languageId) {
                case "python":
                  {
                    keyword.type == "try" && nodeAtPos.type == "identifier" && nodeAtPos.text.length > 4 && (block = (_d = children.find(child => child.hasError())) == null ? void 0 : _d.children.find(child => child.type == "block"));
                    let colonNode,
                      parenCount = 0;
                    for (let child of errorNode.children) {
                      if (child.type == ":" && parenCount == 0) {
                        colonNode = child;
                        break;
                      }
                      child.type == "(" && (parenCount += 1), child.type == ")" && (parenCount -= 1);
                    }
                    if (colonNode && keyword.endIndex <= colonNode.startIndex && colonNode.nextSibling) {
                      if (keyword.type == "def") {
                        let sibling = colonNode.nextSibling;
                        if (sibling.type == '"' || sibling.type == "'" || sibling.type == "ERROR" && (sibling.text == '"""' || sibling.text == "'''")) return !0;
                      }
                      return !1;
                    }
                    break;
                  }
                case "javascript":
                  {
                    let formalParameters = children.find(child => child.type == "formal_parameters");
                    if (keyword.type == "class" && formalParameters) return !0;
                    let leftCurlyBrace = children.find(child => child.type == "{");
                    if (leftCurlyBrace && leftCurlyBrace.startIndex > keyword.endIndex && leftCurlyBrace.nextSibling != null || children.find(child => child.type == "do") && keyword.type == "while" || keyword.type == "=>" && keyword.nextSibling && keyword.nextSibling.type != "{") return !1;
                    break;
                  }
                case "typescript":
                  {
                    let leftCurlyBrace = children.find(child => child.type == "{");
                    if (leftCurlyBrace && leftCurlyBrace.startIndex > keyword.endIndex && leftCurlyBrace.nextSibling != null || children.find(child => child.type == "do") && keyword.type == "while" || keyword.type == "=>" && keyword.nextSibling && keyword.nextSibling.type != "{") return !1;
                    break;
                  }
              }
              return block && block.startIndex > keyword.endIndex ? this.isBlockEmpty(block, offset) : !0;
            }
          }
          if (blockParentNode != null) {
            let expectedType = this.nodeMatch[blockParentNode.type],
              block = blockParentNode.children.slice().reverse().find(x => x.type == expectedType);
            if (block) return this.isBlockEmpty(block, offset);
            if (this.nodeTypesWithBlockOrStmtChild.has(blockParentNode.type)) {
              let fieldLabel = this.nodeTypesWithBlockOrStmtChild.get(blockParentNode.type),
                child = fieldLabel == "" ? blockParentNode.children[0] : blockParentNode.childForFieldName(fieldLabel);
              if (child && child.type != this.blockNodeType && child.type != this.emptyStatementType) return !1;
            }
            return !0;
          }
          return !1;
        } finally {
          tree.delete();
        }
      }
    };
    __name(_TreeSitterBasedBlockParser, "TreeSitterBasedBlockParser");
    TreeSitterBasedBlockParser = _TreeSitterBasedBlockParser, wasmLanguageToBlockParser = {
      python: new TreeSitterBasedBlockParser("python", {
        class_definition: "block",
        elif_clause: "block",
        else_clause: "block",
        except_clause: "block",
        finally_clause: "block",
        for_statement: "block",
        function_definition: "block",
        if_statement: "block",
        try_statement: "block",
        while_statement: "block",
        with_statement: "block"
      }, new Map(), ["def", "class", "if", "elif", "else", "for", "while", "try", "except", "finally", "with"], "block", null, !1),
      javascript: new TreeSitterBasedBlockParser("javascript", {
        arrow_function: "statement_block",
        catch_clause: "statement_block",
        do_statement: "statement_block",
        else_clause: "statement_block",
        finally_clause: "statement_block",
        for_in_statement: "statement_block",
        for_statement: "statement_block",
        function: "statement_block",
        function_declaration: "statement_block",
        generator_function: "statement_block",
        generator_function_declaration: "statement_block",
        if_statement: "statement_block",
        method_definition: "statement_block",
        try_statement: "statement_block",
        while_statement: "statement_block",
        with_statement: "statement_block",
        class: "class_body",
        class_declaration: "class_body"
      }, new Map([["arrow_function", "body"], ["do_statement", "body"], ["else_clause", ""], ["for_in_statement", "body"], ["for_statement", "body"], ["if_statement", "consequence"], ["while_statement", "body"], ["with_statement", "body"]]), ["=>", "try", "catch", "finally", "do", "for", "if", "else", "while", "with", "function", "function*", "class"], "statement_block", "empty_statement", !0),
      typescript: new TreeSitterBasedBlockParser("typescript", {
        ambient_declaration: "statement_block",
        arrow_function: "statement_block",
        catch_clause: "statement_block",
        do_statement: "statement_block",
        else_clause: "statement_block",
        finally_clause: "statement_block",
        for_in_statement: "statement_block",
        for_statement: "statement_block",
        function: "statement_block",
        function_declaration: "statement_block",
        generator_function: "statement_block",
        generator_function_declaration: "statement_block",
        if_statement: "statement_block",
        internal_module: "statement_block",
        method_definition: "statement_block",
        module: "statement_block",
        try_statement: "statement_block",
        while_statement: "statement_block",
        abstract_class_declaration: "class_body",
        class: "class_body",
        class_declaration: "class_body"
      }, new Map([["arrow_function", "body"], ["do_statement", "body"], ["else_clause", ""], ["for_in_statement", "body"], ["for_statement", "body"], ["if_statement", "consequence"], ["while_statement", "body"], ["with_statement", "body"]]), ["declare", "=>", "try", "catch", "finally", "do", "for", "if", "else", "while", "with", "function", "function*", "class"], "statement_block", "empty_statement", !0),
      tsx: new TreeSitterBasedBlockParser("typescriptreact", {
        ambient_declaration: "statement_block",
        arrow_function: "statement_block",
        catch_clause: "statement_block",
        do_statement: "statement_block",
        else_clause: "statement_block",
        finally_clause: "statement_block",
        for_in_statement: "statement_block",
        for_statement: "statement_block",
        function: "statement_block",
        function_declaration: "statement_block",
        generator_function: "statement_block",
        generator_function_declaration: "statement_block",
        if_statement: "statement_block",
        internal_module: "statement_block",
        method_definition: "statement_block",
        module: "statement_block",
        try_statement: "statement_block",
        while_statement: "statement_block",
        abstract_class_declaration: "class_body",
        class: "class_body",
        class_declaration: "class_body"
      }, new Map([["arrow_function", "body"], ["do_statement", "body"], ["else_clause", ""], ["for_in_statement", "body"], ["for_statement", "body"], ["if_statement", "consequence"], ["while_statement", "body"], ["with_statement", "body"]]), ["declare", "=>", "try", "catch", "finally", "do", "for", "if", "else", "while", "with", "function", "function*", "class"], "statement_block", "empty_statement", !0),
      go: new RegexBasedBlockParser("go", "{}", /\b(func|if|else|for)\b/, {
        communication_case: "block",
        default_case: "block",
        expression_case: "block",
        for_statement: "block",
        func_literal: "block",
        function_declaration: "block",
        if_statement: "block",
        labeled_statement: "block",
        method_declaration: "block",
        type_case: "block"
      }, new Map()),
      ruby: new RegexBasedBlockParser("ruby", "end", /\b(BEGIN|END|case|class|def|do|else|elsif|for|if|module|unless|until|while)\b|->/, {
        begin_block: "}",
        block: "}",
        end_block: "}",
        lambda: "block",
        for: "do",
        until: "do",
        while: "do",
        case: "end",
        do: "end",
        if: "end",
        method: "end",
        module: "end",
        unless: "end",
        do_block: "end"
      }, new Map())
    };
    __name(getBlockParser, "getBlockParser");
    __name(isEmptyBlockStart, "isEmptyBlockStart");
    __name(isBlockBodyFinished, "isBlockBodyFinished");
    __name(getNodeStart, "getNodeStart");
  });,var lib_exports = {};,__export(lib_exports, {
  DEFAULT_NUM_OF_SNIPPETS: () => DEFAULT_NUM_OF_SNIPPETS,
  DEFAULT_TREE_TRAVERSAL_CONFIG: () => DEFAULT_TREE_TRAVERSAL_CONFIG,
  ElidableText: () => ElidableText,
  LineEndingOptions: () => LineEndingOptions,
  LineWithValueAndCost: () => LineWithValueAndCost,
  MAX_PROMPT_LENGTH: () => MAX_PROMPT_LENGTH,
  MAX_TOOLTIP_SIGNATURE_TOKENS: () => MAX_TOOLTIP_SIGNATURE_TOKENS,
  NeighboringTabsOption: () => NeighboringTabsOption,
  PromptOptions: () => PromptOptions,
  ProviderTimeoutError: () => ProviderTimeoutError,
  SnippetOrchestrator: () => SnippetOrchestrator,
  SnippetProviderType: () => SnippetProviderType,
  SnippetSemantics: () => SnippetSemantics,
  SuffixMatchOption: () => SuffixMatchOption,
  SuffixOption: () => SuffixOption,
  TokenizerName: () => TokenizerName,
  WASMLanguage: () => WASMLanguage,
  blankNode: () => blankNode,
  buildLabelRules: () => buildLabelRules,
  clearLabels: () => clearLabels,
  clearLabelsIf: () => clearLabelsIf,
  combineClosersAndOpeners: () => combineClosersAndOpeners,
  comment: () => comment,
  commentBlockAsSingles: () => commentBlockAsSingles,
  createWorker: () => createWorker,
  cutTreeAfterLine: () => cutTreeAfterLine,
  deparseAndCutTree: () => deparseAndCutTree,
  deparseLine: () => deparseLine,
  deparseTree: () => deparseTree,
  describeTree: () => describeTree,
  duplicateTree: () => duplicateTree,
  elidableTextForDiff: () => elidableTextForDiff,
  elidableTextForSourceCode: () => elidableTextForSourceCode,
  encodeTree: () => encodeTree,
  firstLineOf: () => firstLineOf,
  flattenVirtual: () => flattenVirtual,
  foldTree: () => foldTree,
  fromTreeWithFocussedLines: () => fromTreeWithFocussedLines,
  fromTreeWithValuedLines: () => fromTreeWithValuedLines,
  getAncestorWithSiblingFunctions: () => getAncestorWithSiblingFunctions,
  getBlockCloseToken: () => getBlockCloseToken,
  getBlockParser: () => getBlockParser,
  getCursorContext: () => getCursorContext,
  getFirstPrecedingComment: () => getFirstPrecedingComment,
  getFunctionPositions: () => getFunctionPositions,
  getLanguage: () => getLanguage,
  getNodeStart: () => getNodeStart,
  getPrompt: () => getPrompt,
  getTokenizer: () => getTokenizer,
  groupBlocks: () => groupBlocks,
  isBlank: () => isBlank,
  isBlockBodyFinished: () => isBlockBodyFinished,
  isEmptyBlockStart: () => isEmptyBlockStart,
  isFunction: () => isFunction,
  isFunctionDefinition: () => isFunctionDefinition,
  isLine: () => isLine,
  isSupportedLanguageId: () => isSupportedLanguageId,
  isTop: () => isTop,
  isVirtual: () => isVirtual,
  labelLines: () => labelLines,
  labelVirtualInherited: () => labelVirtualInherited,
  languageCommentMarkers: () => languageCommentMarkers,
  languageIdToWasmLanguage: () => languageIdToWasmLanguage,
  lastLineOf: () => lastLineOf,
  lineNode: () => lineNode,
  mapLabels: () => mapLabels,
  normalizeLanguageId: () => normalizeLanguageId,
  parseRaw: () => parseRaw,
  parseTree: () => parseTree,
  parseTreeSitter: () => parseTreeSitter,
  parsesWithoutError: () => parsesWithoutError,
  providersErrors: () => providersErrors,
  providersPerformance: () => providersPerformance,
  providersSnippets: () => providersSnippets,
  queryExports: () => queryExports,
  queryFunctions: () => queryFunctions,
  queryGlobalVars: () => queryGlobalVars,
  queryImports: () => queryImports,
  queryPythonIsDocstring: () => queryPythonIsDocstring,
  rebuildTree: () => rebuildTree,
  registerLanguageSpecificParser: () => registerLanguageSpecificParser,
  resetLineNumbers: () => resetLineNumbers,
  topNode: () => topNode,
  virtualNode: () => virtualNode,
  visitTree: () => visitTree,
  visitTreeConditionally: () => visitTreeConditionally
});,function createWorker() {
  return new XY.Worker((0, VY.resolve)(__dirname, "..", "dist", "worker.js"), {
    workerData: {
      cwd: process.cwd()
    }
  });
},var import_path,
  import_worker_threads,
  init_lib = __esmMin(() => {
    "use strict";

    import_path = require("path"), import_worker_threads = require("worker_threads");
    init_elidableText();
    init_indentation();
    init_languageMarker();
    init_orchestrator();
    init_parse();
    init_parseBlock();
    init_prompt();
    init_cursorContext();
    init_neighboringFiles();
    init_selectRelevance();
    init_snippets();
    init_snippetProvider();
    init_tokenization();
    __name(createWorker, "createWorker");
  });