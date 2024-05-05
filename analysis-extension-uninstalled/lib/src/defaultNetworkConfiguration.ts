var import_vscode_uri = bn(Q5());,var DotComAuthority = "github.com",
  DotComUrl = `https://${DotComAuthority}`,
  CAPIDotComUrl = "https://api.githubcopilot.com",
  TelemetryDotComUrl = "https://copilot-telemetry.githubusercontent.com/telemetry",
  _DefaultNetworkConfiguration = class _DefaultNetworkConfiguration extends NetworkConfiguration {
    constructor(url = DotComUrl, env = process.env) {
      super();
      this.env = env;
      this.recalculateUrls(url);
    }
    isGitHubEnterprise() {
      return this.isEnterprise;
    }
    getAuthAuthority() {
      return this.baseUri.authority;
    }
    getTokenUrl(githubToken) {
      var _a, _b;
      return (_b = (_a = githubToken.devOverride) == null ? void 0 : _a.copilotTokenUrl) != null ? _b : this.tokenUrl;
    }
    getNotificationUrl(githubToken) {
      var _a, _b;
      return (_b = (_a = githubToken.devOverride) == null ? void 0 : _a.notificationUrl) != null ? _b : this.notificationUrl;
    }
    getContentRestrictionsUrl(githubToken) {
      var _a, _b;
      return (_b = (_a = githubToken.devOverride) == null ? void 0 : _a.contentRestrictionsUrl) != null ? _b : this.contentRestrictionsUrl;
    }
    getBlackbirdIndexingStatusUrl() {
      return this.blackbirdIndexingStatusUrl;
    }
    getDeviceFlowStartUrl() {
      return this.deviceFlowStartUrl;
    }
    getDeviceFlowCompletionUrl() {
      return this.deviceFlowCompletionUrl;
    }
    getUserInfoUrl() {
      return this.userInfoUrl;
    }
    getCAPIUrl(ctx) {
      let override = isRunningInTest(ctx) ? getConfig(ctx, ConfigKey.DebugTestOverrideCapiUrl) : getConfig(ctx, ConfigKey.DebugOverrideCapiUrl);
      return override.length == 0 ? this.capiUrl : override;
    }
    getBlackbirdCodeSearchUrl(ctx) {
      let capiUrl = this.getCAPIUrl(ctx);
      return xa.Utils.joinPath(xa.URI.parse(capiUrl), "/search/code").toString();
    }
    getBlackbirdDocsSearchUrl(ctx) {
      let capiUrl = this.getCAPIUrl(ctx);
      return xa.Utils.joinPath(xa.URI.parse(capiUrl), "/search/docs").toString();
    }
    getEmbeddingsUrl(ctx) {
      let capiUrl = this.getCAPIUrl(ctx);
      return xa.Utils.joinPath(xa.URI.parse(capiUrl), "/embeddings").toString();
    }
    getTelemetryUrl() {
      return this.telemetryUrl;
    }
    setTelemetryUrlForTesting(url) {
      this.telemetryUrl = url;
    }
    updateBaseUrl(ctx, newUrl) {
      newUrl || (n = DotComUrl);
      let oldUri = this.baseUri;
      if (this.recalculateUrls(newUrl), oldUri.toString() !== this.baseUri.toString()) {
        ctx.get(CopilotTokenManager).resetCopilotToken(ctx);
        let telemetry = ctx.get(TelemetryInitialization);
        telemetry.isInitialized && telemetry.reInitialize(ctx);
      }
    }
    recalculateUrls(url) {
      let uris = this.parseUris(url);
      this.baseUri = uris.base;
      let apiUri = uris.api;
      this.isEnterprise = this.baseUri.authority !== DotComAuthority, this.tokenUrl = xa.Utils.joinPath(apiUri, "/copilot_internal/v2/token").toString(), this.notificationUrl = xa.Utils.joinPath(apiUri, "/copilot_internal/notification").toString(), this.contentRestrictionsUrl = xa.Utils.joinPath(apiUri, "/copilot_internal/content_exclusion").toString(), this.blackbirdIndexingStatusUrl = xa.Utils.joinPath(apiUri, "/copilot_internal/check_indexing_status").toString(), this.deviceFlowStartUrl = xa.Utils.joinPath(this.baseUri, "/login/device/code").toString(), this.deviceFlowCompletionUrl = xa.Utils.joinPath(this.baseUri, "/login/oauth/access_token").toString(), this.userInfoUrl = xa.Utils.joinPath(apiUri, "/user").toString(), this.capiUrl = this.isEnterprise ? this.baseUri.with({
        authority: `copilot-api.${this.baseUri.authority}`
      }).toString() : CAPIDotComUrl, this.telemetryUrl = this.isEnterprise ? this.baseUri.with({
        authority: `copilot-telemetry-service.${this.baseUri.authority}`,
        path: "/telemetry"
      }).toString() : TelemetryDotComUrl;
    }
    parseUris(url) {
      if (this.env.CODESPACES === "true" && this.env.GITHUB_TOKEN && this.env.GITHUB_SERVER_URL && this.env.GITHUB_API_URL) try {
        return {
          base: xa.URI.parse(this.env.GITHUB_SERVER_URL, !0),
          api: xa.URI.parse(this.env.GITHUB_API_URL, !0)
        };
      } catch {}
      let base = xa.URI.parse(url),
        api = xa.URI.parse(`${base.scheme}://api.${base.authority}`);
      return {
        base: base,
        api: api
      };
    }
  };,__name(_DefaultNetworkConfiguration, "DefaultNetworkConfiguration");,var DefaultNetworkConfiguration = _DefaultNetworkConfiguration;