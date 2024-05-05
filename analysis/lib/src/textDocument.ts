var import_vscode_uri = Dr(qp());,var _LocationFactory = class _LocationFactory {
  static range(x1, y1, x2, y2) {
    return x2 !== void 0 && y2 !== void 0 ? Range.create(x1, y1, x2, y2) : Range.create(x1, y1);
  }
  static position(line, character) {
    return Position.create(line, character);
  }
};,__name(_LocationFactory, "LocationFactory");,var LocationFactory = _LocationFactory,
  _TextDocument = class _TextDocument {
    constructor(_uri, _textDocument) {
      this._uri = _uri;
      this._textDocument = _textDocument;
    }
    static create(uri, languageId, version, text) {
      return uri instanceof R3.URI ? new _TextDocument(uri, TextDocument.create(uri.toString(), languageId, version, text)) : new _TextDocument(R3.URI.parse(uri), TextDocument.create(uri, languageId, version, text));
    }
    static wrap(textDocument) {
      return new _TextDocument(R3.URI.parse(textDocument.uri), textDocument);
    }
    get lspTextDocument() {
      return this._textDocument;
    }
    get uri() {
      return this._uri;
    }
    get vscodeUri() {
      return this._uri;
    }
    get languageId() {
      return this._textDocument.languageId;
    }
    get version() {
      return this._textDocument.version;
    }
    get lineCount() {
      return this._textDocument.lineCount;
    }
    getText(range) {
      return this._textDocument.getText(range);
    }
    positionAt(offset) {
      return this._textDocument.positionAt(offset);
    }
    offsetAt(position) {
      return this._textDocument.offsetAt(position);
    }
    lineAt(position) {
      let lineNumber = typeof position == "number" ? position : position.line;
      if (lineNumber < 0 || lineNumber >= this.lineCount) throw new RangeError("Illegal value for lineNumber");
      let text = this.getText().split(/\r\n|\r|\n/g)[lineNumber],
        range = Range.create(Position.create(lineNumber, 0), Position.create(lineNumber, text.length)),
        isEmptyOrWhitespace = text.trim().length === 0;
      return {
        text: text,
        range: range,
        isEmptyOrWhitespace: isEmptyOrWhitespace
      };
    }
    update(changes, version) {
      TextDocument.update(this._textDocument, changes, version);
    }
  };,__name(_TextDocument, "TextDocument");,var TextDocument = _TextDocument;