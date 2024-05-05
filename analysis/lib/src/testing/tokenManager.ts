var _FakeCopilotTokenManagerFromGitHubToken = class _FakeCopilotTokenManagerFromGitHubToken extends CopilotTokenManagerFromGitHubTokenBase {
  constructor(githubToken) {
    super();
    this.githubToken = githubToken;
  }
  getGitHubSession(ctx) {
    return Promise.resolve(this.githubToken);
  }
};,__name(_FakeCopilotTokenManagerFromGitHubToken, "FakeCopilotTokenManagerFromGitHubToken");,var FakeCopilotTokenManagerFromGitHubToken = _FakeCopilotTokenManagerFromGitHubToken;,var _FixedCopilotTokenManager = class _FixedCopilotTokenManager extends CopilotTokenManager {
  constructor(token) {
    super();
    this.token = token;
    this.wasReset = !1;
  }
  async getGitHubSession(ctx) {
    return Promise.resolve({
      token: "token"
    });
  }
  async getCopilotToken(ctx, force) {
    return CopilotToken.testToken({
      token: this.token
    });
  }
  resetCopilotToken(ctx, httpError) {
    this.wasReset = !0;
  }
  async checkCopilotToken(ctx) {
    return {
      status: "OK"
    };
  }
};,__name(_FixedCopilotTokenManager, "FixedCopilotTokenManager");,var FixedCopilotTokenManager = _FixedCopilotTokenManager;,var tokenFileName = `${process.env.HOME}/.copilot-testing-gh-token`,
  tokenManager;,function getTestingCopilotTokenManager() {
  return tokenManager || (tokenManager = createTokenManager()), tokenManager;
},__name(getTestingCopilotTokenManager, "getTestingCopilotTokenManager");,var createTokenManager = __name(() => {
  let tokenStr = readTestingGitHubToken();
  if (tokenStr) return new FakeCopilotTokenManagerFromGitHubToken({
    token: tokenStr
  });
  if (process.env.GH_COPILOT_TOKEN) return new FixedCopilotTokenManager(process.env.GH_COPILOT_TOKEN);
  if (process.env.GITHUB_TOKEN) return new FakeCopilotTokenManagerFromGitHubToken({
    token: process.env.GITHUB_TOKEN
  });
  throw new Error(`Tests: either GH_COPILOT_TOKEN, or GITHUB_TOKEN, must be set, or there must be a GitHub token from an app with access to Copilot in ${tokenFileName}. Run "npm run get_token" to get one.`);
}, "createTokenManager");,function readTestingGitHubToken() {
  if (s9.existsSync(tokenFileName)) return s9.readFileSync(tokenFileName).toString();
},__name(readTestingGitHubToken, "readTestingGitHubToken");