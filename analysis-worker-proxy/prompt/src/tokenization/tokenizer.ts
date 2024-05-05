var fs = He(require("fs")),
  path = He(require("path")),
  import_util = require("util");,var range = __name((x, y) => Array.from(Array(y).keys()).slice(x), "range"),
  ord = __name(x => x.charCodeAt(0), "ord"),
  chr = __name(x => String.fromCharCode(x), "chr"),
  textDecoder = new Ee.TextDecoder("utf-8"),
  decodeStr = __name(arr => textDecoder.decode(new Uint8Array(arr)), "decodeStr"),
  dictZip = __name((x, y) => {
    let result = new Map();
    return x.forEach((_, i) => {
      result.set(x[i], y[i]);
    }), result;
  }, "dictZip");,function bytes_to_unicode(map) {
  let bs = range(ord("!"), ord("~") + 1).concat(range(ord("\xA1"), ord("\xAC") + 1), range(ord("\xAE"), ord("\xFF") + 1)),
    cs = bs.slice(),
    n = 0;
  for (let b = 0; b < 2 ** 8; b++) bs.includes(b) || (bs.push(b), cs.push(2 ** 8 + n), n = n + 1);
  let cs_ = cs.map(x => chr(x));
  for (let i = 0; i < bs.length; i++) map.set(bs[i], cs_[i]);
},__name(bytes_to_unicode, "bytes_to_unicode");,function get_char_pairs(word) {
  let pairs = new Set(),
    prev_char = word[0];
  for (let i = 1; i < word.length; i++) {
    let char = word[i];
    pairs.add([prev_char, char]), prev_char = char;
  }
  return pairs;
},__name(get_char_pairs, "get_char_pairs");,var tokenizers = new Map();,function getTokenizer(name = "cl100k") {
  let tokenizer = tokenizers.get(name);
  return tokenizer !== void 0 || (name === "mock" ? tokenizer = new MockTokenizer() : tokenizer = new BPETokenizer(name), tokenizers.set(name, tokenizer)), tokenizer;
},__name(getTokenizer, "getTokenizer");,var BPETokenizer = class {
    constructor(name = "cl100k") {
      this.decoder = new Map();
      this.byte_encoder = new Map();
      this.byte_decoder = new Map();
      this.cache = new Map();
      this.textEncoder = new Ee.TextEncoder();
      this.encodeStr = str => Array.from(this.textEncoder.encode(str));
      let VOCAB = "",
        ENCODER = "";
      if (name === "cl100k") VOCAB = "vocab_cushman002.bpe", ENCODER = "tokenizer_cushman002.json", this.pat = /'s|'t|'re|'ve|'m|'ll|'d|[^\r\n\p{L}\p{N}]?\p{L}+|\p{N}{1,3}| ?[^\s\p{L}\p{N}]+[\r\n]*|\s*[\r\n]+|\s+(?!\S)|\s+/giu;else throw new Error(`Unknown tokenizer name: ${name}`);
      let encoder_json, bpe_file;
      try {
        let encoder_text = qe.readFileSync(je.resolve(__dirname, "resources", name, ENCODER));
        encoder_json = JSON.parse(encoder_text.toString()), bpe_file = qe.readFileSync(je.resolve(__dirname, "resources", name, VOCAB), "utf-8");
      } catch (e) {
        if (typeof e.code == "string" && e instanceof Error && e.name === "Error" || e instanceof SyntaxError) {
          let error = new Error(`Could not load tokenizer: ${name}`);
          throw error.code = "CopilotPromptLoadFailure", error.cause = e, error;
        }
        throw e;
      }
      this.encoder = new Map(Object.entries(encoder_json));
      for (let [key, value] of this.encoder) this.decoder.set(value, key);
      let bpe_merges = bpe_file.split(`
`).slice(1).filter(l => l.trim().length > 0);
      this.bpe_ranks = dictZip(bpe_merges, range(0, bpe_merges.length)), bytes_to_unicode(this.byte_encoder), this.byte_encoder.forEach((value, key, _) => {
        this.byte_decoder.set(value, key);
      });
    }
    static {
      __name(this, "BPETokenizer");
    }
    byteEncodeStr(s) {
      return this.encodeStr(s).map(x => this.byte_encoder.get(x));
    }
    mutatingConcat(dest, src) {
      for (let i = 0; i < src.length; i++) dest.push(src[i]);
      return dest;
    }
    bpe(chunk) {
      if (this.cache.has(chunk)) return this.cache.get(chunk);
      let bytes = this.byteEncodeStr(chunk),
        pairs = get_char_pairs(bytes);
      if (!pairs) return bytes.map(x => this.encoder.get(x));
      for (;;) {
        let minPairs = new Map();
        pairs.forEach(pair => {
          let joined_pair = pair.join(" "),
            rank = this.bpe_ranks.get(joined_pair);
          minPairs.set(rank === void 0 || isNaN(rank) ? 1e11 : rank, pair);
        });
        let minPairsKeys = Array.from(minPairs.keys()).map(x => Number(x)),
          bigram = minPairs.get(Math.min(...minPairsKeys));
        if (!bigram || !this.bpe_ranks.has(bigram.join(" "))) break;
        let first = bigram[0],
          second = bigram[1],
          new_bytes = [],
          i = 0;
        for (; i < bytes.length;) {
          let j = bytes.indexOf(first, i);
          if (j === -1) {
            this.mutatingConcat(new_bytes, bytes.slice(i));
            break;
          }
          this.mutatingConcat(new_bytes, bytes.slice(i, j)), i = j, bytes[i] === first && i < bytes.length - 1 && bytes[i + 1] === second ? (new_bytes.push(first + second), i = i + 2) : (new_bytes.push(bytes[i]), i = i + 1);
        }
        if (bytes = new_bytes, bytes.length === 1) break;
        pairs = get_char_pairs(bytes);
      }
      let tokens = bytes.map(x => this.encoder.get(x));
      return this.cache.set(chunk, tokens), tokens;
    }
    tokenize(text) {
      let tokens = [];
      for (let [chunk] of text.matchAll(this.pat)) {
        let chunk_tokens = this.bpe(chunk);
        this.mutatingConcat(tokens, chunk_tokens);
      }
      return tokens;
    }
    tokenLength(text) {
      return this.tokenize(text).length;
    }
    takeLastTokens(text, n) {
      if (n <= 0) return "";
      let CHARS_PER_TOKENS_START = 4,
        CHARS_PER_TOKENS_ADD = 1,
        chars = Math.min(text.length, n * CHARS_PER_TOKENS_START),
        suffix = text.slice(-chars),
        suffixT = this.tokenize(suffix);
      for (; suffixT.length < n + 2 && chars < text.length;) chars = Math.min(text.length, chars + n * CHARS_PER_TOKENS_ADD), suffix = text.slice(-chars), suffixT = this.tokenize(suffix);
      return suffixT.length < n ? text : (suffixT = suffixT.slice(-n), this.detokenize(suffixT));
    }
    takeFirstTokens(text, n) {
      if (n <= 0) return {
        text: "",
        tokens: []
      };
      let CHARS_PER_TOKENS_START = 4,
        CHARS_PER_TOKENS_ADD = 1,
        chars = Math.min(text.length, n * CHARS_PER_TOKENS_START),
        prefix = text.slice(0, chars),
        prefix_t = this.tokenize(prefix);
      for (; prefix_t.length < n + 2 && chars < text.length;) chars = Math.min(text.length, chars + n * CHARS_PER_TOKENS_ADD), prefix = text.slice(0, chars), prefix_t = this.tokenize(prefix);
      return prefix_t.length < n ? {
        text: text,
        tokens: prefix_t
      } : (prefix_t = prefix_t.slice(0, n), {
        text: this.detokenize(prefix_t),
        tokens: prefix_t
      });
    }
    takeLastLinesTokens(text, n) {
      let suffix = this.takeLastTokens(text, n);
      if (suffix.length === text.length || text[text.length - suffix.length - 1] === `
`) return suffix;
      let newline = suffix.indexOf(`
`);
      return suffix.substring(newline + 1);
    }
    detokenize(tokens) {
      let text = tokens.map(x => this.decoder.get(x)).join("");
      return text = decodeStr(text.split("").map(x => this.byte_decoder.get(x))), text;
    }
    tokenizeStrings(text) {
      return this.tokenize(text).map(token => decodeStr(this.decoder.get(token).split("").map(char => this.byte_decoder.get(char))));
    }
  },
  MockTokenizer = class {
    constructor() {
      this.hash = str => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          let char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char, hash &= hash & 65535;
        }
        return hash;
      };
    }
    static {
      __name(this, "MockTokenizer");
    }
    tokenize(text) {
      return this.tokenizeStrings(text).map(this.hash);
    }
    detokenize(tokens) {
      return tokens.map(token => token.toString()).join(" ");
    }
    tokenizeStrings(text) {
      return text.split(/\b/);
    }
    tokenLength(text) {
      return this.tokenizeStrings(text).length;
    }
    takeLastTokens(text, n) {
      return this.tokenizeStrings(text).slice(-n).join("");
    }
    takeFirstTokens(text, n) {
      let tokens = this.tokenizeStrings(text).slice(0, n);
      return {
        text: tokens.join(""),
        tokens: tokens.map(this.hash)
      };
    }
    takeLastLinesTokens(text, n) {
      let suffix = this.takeLastTokens(text, n);
      if (suffix.length === text.length || text[text.length - suffix.length - 1] === `
`) return suffix;
      let newline = suffix.indexOf(`
`);
      return suffix.substring(newline + 1);
    }
  };