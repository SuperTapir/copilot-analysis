var ghostTextLogger = new Logger(1, "ghostText"),
  _position,
  _uri,
  _shownCompletions,
  _LastGhostText = class _LastGhostText {
    constructor() {
      __privateAdd(this, _position, void 0);
      __privateAdd(this, _uri, void 0);
      __privateAdd(this, _shownCompletions, []);
    }
    get position() {
      return __privateGet(this, _position);
    }
    get shownCompletions() {
      return __privateGet(this, _shownCompletions) || [];
    }
    get uri() {
      return __privateGet(this, _uri);
    }
    resetState() {
      __privateSet(this, _uri, void 0), __privateSet(this, _position, void 0), __privateSet(this, _shownCompletions, []);
    }
    setState(uri, position) {
      __privateSet(this, _uri, uri), __privateSet(this, _position, position), __privateSet(this, _shownCompletions, []);
    }
    resetPartialAcceptanceState() {
      this.partiallyAcceptedLength = 0;
    }
  };,_position = new WeakMap(), _uri = new WeakMap(), _shownCompletions = new WeakMap(), __name(_LastGhostText, "LastGhostText");,var LastGhostText = _LastGhostText;