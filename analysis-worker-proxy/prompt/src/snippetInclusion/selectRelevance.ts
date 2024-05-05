var FifoCache = class {
  constructor(size) {
    this.keys = [];
    this.cache = {};
    this.size = size;
  }
  static {
    __name(this, "FifoCache");
  }
  put(key, value) {
    if (this.cache[key] = value, this.keys.length > this.size) {
      this.keys.push(key);
      let leavingKey = this.keys.shift() ?? "";
      delete this.cache[leavingKey];
    }
  }
  get(key) {
    return this.cache[key];
  }
};,var Tokenizer = class {
    static {
      __name(this, "Tokenizer");
    }
    constructor(doc) {
      this.stopsForLanguage = SPECIFIC_STOPS.get(doc.languageId) ?? GENERIC_STOPS;
    }
    tokenize(a) {
      return new Set(splitIntoWords(a).filter(x => !this.stopsForLanguage.has(x)));
    }
  },
  WINDOWED_TOKEN_SET_CACHE = new FifoCache(20),
  WindowedMatcher = class {
    static {
      __name(this, "WindowedMatcher");
    }
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
      let snippets = [];
      if (objectDoc.source.length === 0 || this.referenceTokens.size === 0) return snippets;
      let lines = objectDoc.source.split(`
`),
        key = this.id() + ":" + objectDoc.source,
        tokensInWindows = WINDOWED_TOKEN_SET_CACHE.get(key) ?? [],
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
  };,function splitIntoWords(a) {
  return a.split(/[^a-zA-Z0-9]/).filter(x => x.length > 0);
},__name(splitIntoWords, "splitIntoWords");,var ENGLISH_STOPS = new Set(["we", "our", "you", "it", "its", "they", "them", "their", "this", "that", "these", "those", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "can", "don", "t", "s", "will", "would", "should", "what", "which", "who", "when", "where", "why", "how", "a", "an", "the", "and", "or", "not", "no", "but", "because", "as", "until", "again", "further", "then", "once", "here", "there", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "above", "below", "to", "during", "before", "after", "of", "at", "by", "about", "between", "into", "through", "from", "up", "down", "in", "out", "on", "off", "over", "under", "only", "own", "same", "so", "than", "too", "very", "just", "now"]),
  GENERIC_STOPS = new Set(["if", "then", "else", "for", "while", "with", "def", "function", "return", "TODO", "import", "try", "catch", "raise", "finally", "repeat", "switch", "case", "match", "assert", "continue", "break", "const", "class", "enum", "struct", "static", "new", "super", "this", "var", ...ENGLISH_STOPS]),
  SPECIFIC_STOPS = new Map([]);