var authLogger = new Logger(1, "auth");,var authLogger = new Logger(1, "auth"),
  _CopilotTokenManager = class _CopilotTokenManager {
    constructor() {
      this.tokenRefreshEventEmitter = new Mk.EventEmitter();
    }
    async getGitHubToken(ctx) {
      let token = await this.getGitHubSession(ctx);
      return token == null ? void 0 : token.token;
    }
  };,__name(_CopilotTokenManager, "CopilotTokenManager");,var CopilotTokenManager = _CopilotTokenManager;