var GITHUB_MINIMAL_SCOPE = ["user:email"];,var GITHUB_SCOPE_READ_USER = ["read:user"],
  GITHUB_SCOPE_ALIGNED = ["read:user", "user:email", "repo", "workflow"],
  SESSION_LOGIN_MESSAGE = "You are not signed in to GitHub. Please sign in to use Copilot.",
  shownSignInMessage = !1;,function permitOneSignIn() {
  shownSignInMessage = !1;
},__name(permitOneSignIn, "permitOneSignIn");,var dismissedAuthNotify = !1;,function setDismissedAuthNotify(dismissed) {
  dismissedAuthNotify = dismissed;
},__name(setDismissedAuthNotify, "setDismissedAuthNotify");,function authProviderId() {
  var _a;
  return ((_a = _b.workspace.getConfiguration(CopilotConfigPrefix).get("advanced")) == null ? void 0 : _a.authProvider) === "github-enterprise" ? "github-enterprise" : "github";
},__name(authProviderId, "authProviderId");,async function onDidChangeSessionsHandler(event, ctx) {
  let provider = event.provider,
    providerId = authProviderId();
  if (provider.id === providerId) {
    let statusReporter = ctx.get(StatusReporter);
    (await getSessionHelper({
      createIfNone: !1
    })) ? (statusReporter.forceNormal(), await ctx.get(CopilotTokenManager).getCopilotToken(ctx, !0)) : (ctx.get(CopilotTokenManager).resetCopilotToken(ctx), statusReporter.setWarning(SESSION_LOGIN_MESSAGE));
  }
},__name(onDidChangeSessionsHandler, "onDidChangeSessionsHandler");,async function getSessionHelper(options) {
  let providerId = authProviderId(),
    scope_options = {
      silent: !0
    };
  options.forceNewSession && (scope_options = options);
  let session = await _b.authentication.getSession(providerId, GITHUB_SCOPE_ALIGNED, scope_options);
  return session != null || (session = await _b.authentication.getSession(providerId, GITHUB_SCOPE_READ_USER, scope_options)), session != null || (session = await _b.authentication.getSession(providerId, GITHUB_MINIMAL_SCOPE, options)), session;
},__name(getSessionHelper, "getSessionHelper");,async function getSession(ctx, fromCommand = !1) {
  let session = await getSessionHelper({
    createIfNone: !1
  });
  if (!session) if (shownSignInMessage) fromCommand && (telemetryAuthNotifyShown(ctx, "command"), telemetryNewGitHubLogin(ctx, "command", "editorAuth"), session = await getOrCreateSession());else {
    shownSignInMessage = !0, telemetryAuthNotifyShown(ctx, "toast");
    let choice = await _b.window.showInformationMessage("Sign in to use GitHub Copilot.", "Sign in to GitHub");
    if (session = await getSessionHelper({
      createIfNone: !1
    }), !session) if (choice === "Sign in to GitHub") telemetryNewGitHubLogin(ctx, "toast", "editorAuth"), session = await getOrCreateSession();else throw setDismissedAuthNotify(!0), telemetryAuthNotifyDismissed(ctx), new CopilotAuthError("GitHubLoginFailed");
  }
  return session;
},__name(getSession, "getSession");,async function hasExistingSession() {
  return (await getSessionHelper({
    createIfNone: !1
  })) !== void 0;
},__name(hasExistingSession, "hasExistingSession");,async function getOrCreateSession() {
  return getSessionHelper({
    createIfNone: !0
  });
},__name(getOrCreateSession, "getOrCreateSession");,async function forceNewSession() {
  return getSessionHelper({
    forceNewSession: !0
  });
},__name(forceNewSession, "forceNewSession");,var authLogger = new Logger(1, "auth"),
  shown401Message = !1,
  everActivated = !1;,async function auth(ctx) {
  let session = await getSession(ctx);
  if (!session) {
    let message = "GitHub login failed";
    return authLogger.info(ctx, message), telemetryGitHubLoginFailed(ctx), {
      kind: "failure",
      reason: "GitHubLoginFailed",
      message: message
    };
  }
  authLogger.debug(ctx, `Logged in as ${session.account.label}, oauth token ${session.accessToken}`);
  let tokenResult = await authFromGitHubToken(ctx, {
    token: session.accessToken
  });
  if (tokenResult.kind == "success") {
    let token = tokenResult.envelope.token;
    authLogger.debug(ctx, `Copilot HMAC for ${session.account.label}: ${token}`);
  }
  return tokenResult;
},__name(auth, "auth");,var _ExtensionNotificationSender = class _ExtensionNotificationSender extends NotificationSender {
  async showWarningMessage(message, ...actions) {
    return {
      title: await T1.window.showWarningMessage(message, ...actions.map(action => action.title))
    };
  }
};,__name(_ExtensionNotificationSender, "ExtensionNotificationSender");,var ExtensionNotificationSender = _ExtensionNotificationSender;,async function attemptAuthentication(ctx) {
  ctx.get(StatusReporter).setProgress(), permitOneSignIn();
  try {
    await ctx.get(CopilotTokenManager).getCopilotToken(ctx);
  } catch (error) {
    if (error.message === "GitHubLoginFailed") {
      if (dismissedAuthNotify) {
        await handleAuthenticationError(ctx, new CopilotAuthError("GitHubLoginFailed"), !1, !1);
        return;
      }
      telemetryAuthNotifyShown(ctx, "toast"), (await T1.window.showInformationMessage("Sign in to use GitHub Copilot.", "Sign in to GitHub")) === "Sign in to GitHub" ? (telemetryNewGitHubLogin(ctx, "toast", "editorAuth"), await retryAuthentication(ctx)) : (telemetryAuthNotifyDismissed(ctx), await handleAuthenticationError(ctx, new CopilotAuthError("GitHubLoginFailed")));
    } else await handleAuthenticationError(ctx, error);
  }
  authLogger.info(ctx, "Sucessfully authenticated");
},__name(attemptAuthentication, "attemptAuthentication");,async function retryAuthentication(ctx) {
  ctx.get(StatusReporter).setProgress();
  try {
    let session = await forceNewSession();
    if (authLogger.debug(ctx, `Session: ${session}`), !session) return handleAuthenticationError(ctx, new CopilotAuthError("GitHubLoginFailed"));
    await ctx.get(CopilotTokenManager).getCopilotToken(ctx);
  } catch (error) {
    return authLogger.debug(ctx, `Oops error: ${error}`), handleAuthenticationError(ctx, error);
  }
},__name(retryAuthentication, "retryAuthentication");,async function handleAuthenticationError(ctx, error, allowRetry = !0, showErrorPopup = !0) {
  return new Promise(resolve => {
    let reason = error.message || error;
    telemetryError(ctx, "activationFailed", TelemetryData.createAndMarkAsIssued({
      reason: reason
    })), ctx.get(TelemetryReporters).deactivate();
    let message = reason === "GitHubLoginFailed" ? SESSION_LOGIN_MESSAGE : `Extension activation failed: "${reason}"`,
      statusBar = ctx.get(StatusReporter),
      retryCTA = __name(async () => {
        if (allowRetry) return authLogger.error(ctx, "Retrying auth"), await retryAuthentication(ctx);
      }, "retryCTA");
    statusBar.setError(message, retryCTA, showErrorPopup), authLogger.error(ctx, message), T1.commands.executeCommand("setContext", "github.copilot.activated", !1);
  });
},__name(handleAuthenticationError, "handleAuthenticationError");,async function authShowWarnings(ctx) {
  var _a;
  let tokenResult = await auth(ctx);
  if (tokenResult.kind === "failure" && tokenResult.reason === "HTTP401" && everActivated && !shown401Message && (shown401Message = !0, T1.window.showWarningMessage("Your GitHub token is invalid. Please sign out from your GitHub account using VSCode UI and try again.")), tokenResult.kind === "failure" && tokenResult.message) throw new CopilotAuthError(tokenResult.message);
  if (tokenResult.kind === "failure") {
    let error = new Error(`Unexpected error getting Copilot token: ${(_a = tokenResult.reason) != null ? _a : "no reason given"}`);
    throw error.code = `CopilotToken.${tokenResult.reason}`, error;
  }
  return everActivated = !0, new CopilotToken(tokenResult.envelope);
},__name(authShowWarnings, "authShowWarnings");,var _VSCodeCopilotTokenManager = class _VSCodeCopilotTokenManager extends CopilotTokenManager {
  constructor() {
    super(), this.copilotToken = void 0;
  }
  async getGitHubSession(ctx) {
    let session = await getSession(ctx);
    return session ? {
      token: session.accessToken
    } : void 0;
  }
  async getCopilotToken(ctx, force) {
    return (!this.copilotToken || this.copilotToken.isExpired() || force) && (this.copilotToken = await authShowWarnings(ctx), refreshToken(ctx, this, this.copilotToken.refreshIn)), this.copilotToken;
  }
  resetCopilotToken(ctx, httpError) {
    httpError !== void 0 && telemetry(ctx, "auth.reset_token_" + httpError), authLogger.debug(ctx, `Resetting copilot token on HTTP error ${httpError || "unknown"}`), this.copilotToken = void 0;
  }
};,__name(_VSCodeCopilotTokenManager, "VSCodeCopilotTokenManager");,var VSCodeCopilotTokenManager = _VSCodeCopilotTokenManager;