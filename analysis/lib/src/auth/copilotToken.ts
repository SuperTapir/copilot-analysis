var authLogger = new Logger(1, "auth"),
  REFRESH_BUFFER_SECONDS = 60,
  refreshRunningCount = 0,
  TOKEN_REFRESHED_EVENT = "token_refreshed";,function nowSeconds() {
  return Math.floor(Date.now() / 1e3);
},__name(nowSeconds, "nowSeconds");,async function authFromGitHubToken(ctx, githubToken) {
  telemetry(ctx, "auth.new_login");
  let response = await fetchCopilotToken(ctx, githubToken),
    tokenEnvelope = await response.json();
  if (!tokenEnvelope) return authLogger.info(ctx, "Failed to get copilot token"), telemetryError(ctx, "auth.request_read_failed"), {
    kind: "failure",
    reason: "FailedToGetToken"
  };
  let notification = tokenEnvelope.user_notification;
  if (notifyUser(ctx, notification, githubToken), response.status === 401) {
    let message = "Failed to get copilot token due to 401 status. Please sign out and try again.";
    return authLogger.info(ctx, message), telemetryError(ctx, "auth.unknown_401"), {
      kind: "failure",
      reason: "HTTP401",
      message: message
    };
  }
  if (!response.ok || !tokenEnvelope.token) {
    authLogger.info(ctx, `Invalid copilot token: missing token: ${response.status} ${response.statusText}`), telemetryError(ctx, "auth.invalid_token", TelemetryData.createAndMarkAsIssued({
      status: response.status.toString(),
      status_text: response.statusText
    }));
    let error_details = tokenEnvelope.error_details;
    return notifyUser(ctx, error_details, githubToken), {
      kind: "failure",
      reason: "NotAuthorized",
      message: "User not authorized",
      ...error_details
    };
  }
  let expires_at = tokenEnvelope.expires_at;
  tokenEnvelope.expires_at = nowSeconds() + tokenEnvelope.refresh_in + REFRESH_BUFFER_SECONDS;
  let copilotToken = new CopilotToken(tokenEnvelope);
  return ctx.get(CopilotTokenNotifier).emit("onCopilotToken", copilotToken), telemetry(ctx, "auth.new_token", TelemetryData.createAndMarkAsIssued({}, {
    adjusted_expires_at: tokenEnvelope.expires_at,
    expires_at: expires_at,
    current_time: nowSeconds()
  })), {
    kind: "success",
    envelope: tokenEnvelope
  };
},__name(authFromGitHubToken, "authFromGitHubToken");,async function fetchCopilotToken(ctx, githubToken) {
  let copilotTokenUrl = ctx.get(NetworkConfiguration).getTokenUrl(githubToken);
  try {
    return await ctx.get(Fetcher).fetch(copilotTokenUrl, {
      headers: {
        Authorization: `token ${githubToken.token}`,
        ...editorVersionHeaders(ctx)
      }
    });
  } catch (err) {
    throw ctx.get(UserErrorNotifier).notifyUser(ctx, err), err;
  }
},__name(fetchCopilotToken, "fetchCopilotToken");,var recentNotifications = new Map();,function notifyUser(ctx, notification, githubToken) {
  if (!notification) return;
  let now = nowSeconds();
  recentNotifications.get(notification.message) || (recentNotifications.set(notification.message, now), ctx.get(NotificationSender).showWarningMessage(notification.message, {
    title: notification.title
  }, {
    title: "Dismiss"
  }).then(async r => {
    let showUrl = (r == null ? void 0 : r.title) === notification.title,
      ackNotification = showUrl || (r == null ? void 0 : r.title) === "Dismiss";
    if (showUrl) {
      let editorInfo = ctx.get(EditorAndPluginInfo).getEditorPluginInfo(),
        urlWithContext = notification.url.replace("{EDITOR}", encodeURIComponent(editorInfo.name + "_" + editorInfo.version));
      await ctx.get(UrlOpener).open(urlWithContext);
    }
    "notification_id" in notification && ackNotification && (await sendNotificationResultToGitHub(ctx, notification.notification_id, githubToken));
  }).catch(error => {
    authLogger.exception(ctx, error, "copilotToken.notification");
  }));
},__name(notifyUser, "notifyUser");,async function sendNotificationResultToGitHub(ctx, notification_id, githubToken) {
  let notificationUrl = ctx.get(NetworkConfiguration).getNotificationUrl(githubToken),
    response = await ctx.get(Fetcher).fetch(notificationUrl, {
      headers: {
        Authorization: `token ${githubToken.token}`,
        ...editorVersionHeaders(ctx)
      },
      method: "POST",
      body: JSON.stringify({
        notification_id: notification_id
      })
    });
  (!response || !response.ok) && authLogger.error(ctx, `Failed to send notification result to GitHub: ${response == null ? void 0 : response.status} ${response == null ? void 0 : response.statusText}`);
},__name(sendNotificationResultToGitHub, "sendNotificationResultToGitHub");,var _CopilotToken = class _CopilotToken {
  constructor(envelope) {
    this.envelope = envelope;
    this.token = envelope.token, this.organization_list = envelope.organization_list, this.enterprise_list = envelope.enterprise_list, this.tokenMap = this.parseToken(this.token);
  }
  get expiresAt() {
    return this.envelope.expires_at;
  }
  get refreshIn() {
    return this.envelope.refresh_in;
  }
  isExpired() {
    return this.expiresAt * 1e3 < Date.now();
  }
  static testToken(envelope = void 0) {
    return new _CopilotToken({
      token: "token",
      refresh_in: 0,
      expires_at: 0,
      ...envelope
    });
  }
  parseToken(token) {
    let result = new Map(),
      fields = (token != null ? token : "").split(":")[0].split(";");
    for (let field of fields) {
      let [key, value] = field.split("=");
      result.set(key, value);
    }
    return result;
  }
  getTokenValue(key) {
    return this.tokenMap.get(key);
  }
};,__name(_CopilotToken, "CopilotToken");,var CopilotToken = _CopilotToken;,function refreshToken(ctx, tokenManager, refreshIn) {
  let now = nowSeconds();
  refreshRunningCount > 0 || (refreshRunningCount++, setTimeout(async () => {
    let kind,
      error = "";
    try {
      refreshRunningCount--, await tokenManager.getCopilotToken(ctx, !0), kind = "success", tokenManager.tokenRefreshEventEmitter.emit(TOKEN_REFRESHED_EVENT);
    } catch (e) {
      kind = "failure", error = e.toString();
    }
    let data = TelemetryData.createAndMarkAsIssued({
      result: kind
    }, {
      time_taken: nowSeconds() - now,
      refresh_count: refreshRunningCount
    });
    error && (data.properties.reason = error), telemetry(ctx, "auth.token_refresh", data);
  }, refreshIn * 1e3));
},__name(refreshToken, "refreshToken");,var authLogger = new Logger(1, "auth"),
  _CopilotTokenManager = class _CopilotTokenManager {
    constructor() {
      this.tokenRefreshEventEmitter = new XW.EventEmitter();
    }
    async getGitHubToken(ctx) {
      let token = await this.getGitHubSession(ctx);
      return token == null ? void 0 : token.token;
    }
  };,__name(_CopilotTokenManager, "CopilotTokenManager");,var CopilotTokenManager = _CopilotTokenManager,
  _CopilotTokenManagerFromGitHubTokenBase = class _CopilotTokenManagerFromGitHubTokenBase extends CopilotTokenManager {
    constructor() {
      super(), this.copilotToken = void 0;
    }
    async getCopilotToken(ctx, force) {
      if (!this.copilotToken || this.copilotToken.isExpired() || force) {
        let gitHubToken = await this.getGitHubSession(ctx);
        if (!gitHubToken) throw new CopilotAuthError("Not signed in");
        let tokenResult = await authFromGitHubToken(ctx, gitHubToken);
        if (tokenResult.kind === "failure") {
          if (tokenResult.message) throw new CopilotAuthError(tokenResult.message);
          let error = new Error(`Unexpected error getting Copilot token: ${tokenResult.reason}`);
          throw error.code = `CopilotToken.${tokenResult.reason}`, error;
        }
        this.copilotToken = new CopilotToken(tokenResult.envelope), refreshToken(ctx, this, this.copilotToken.refreshIn);
      }
      return this.copilotToken;
    }
    async checkCopilotToken(ctx) {
      if (!this.copilotToken || this.copilotToken.isExpired()) {
        let gitHubToken = await this.getGitHubSession(ctx);
        if (!gitHubToken) throw new CopilotAuthError("Not signed in");
        let tokenResult = await authFromGitHubToken(ctx, gitHubToken);
        if (tokenResult.kind === "failure") return tokenResult;
        this.copilotToken = new CopilotToken(tokenResult.envelope), refreshToken(ctx, this, this.copilotToken.refreshIn);
      }
      return {
        status: "OK"
      };
    }
    resetCopilotToken(ctx, httpError) {
      httpError !== void 0 ? (telemetry(ctx, "auth.reset_token_" + httpError), authLogger.debug(ctx, `Resetting copilot token on HTTP error ${httpError}`)) : authLogger.debug(ctx, "Resetting copilot token"), this.copilotToken = void 0;
    }
  };,__name(_CopilotTokenManagerFromGitHubTokenBase, "CopilotTokenManagerFromGitHubTokenBase");,var CopilotTokenManagerFromGitHubTokenBase = _CopilotTokenManagerFromGitHubTokenBase;