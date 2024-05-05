var EventEmitter = require("events"),
  _CopilotTokenNotifier = class _CopilotTokenNotifier extends EventEmitter {
    constructor() {
      super(), this.setMaxListeners(13);
    }
    emit(event, token) {
      return super.emit(event, token);
    }
  };,__name(_CopilotTokenNotifier, "CopilotTokenNotifier");,var CopilotTokenNotifier = _CopilotTokenNotifier;