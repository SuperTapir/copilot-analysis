var import_typebox = Dr($l());,var _CopilotRepositoryControl = class _CopilotRepositoryControl extends PolicyEvaluator {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.repoUriToPolicyMap = new Map();
    this.ruleLoaderCache = new LRUCacheMap(200);
    this.requestStatus = {
      status: "initial"
    };
    this.initialWaitMs = 30 * 1e3;
    this.maxRetryCount = 3;
    this.ruleLoader = o(async urls => {
      let url = new URL(POLICY_ENDPOINT),
        githubToken = await this.ctx.get(CopilotTokenManager).getGitHubToken(this.ctx);
      if (!githubToken) throw new CopilotAuthError("No GitHub token found");
      let editorSession = this.ctx.get(EditorSession),
        editorInfo = this.ctx.get(EditorAndPluginInfo),
        telemetryConfig = this.ctx.get(TelemetryUserConfig),
        fetcher = this.ctx.get(Fetcher),
        headers = {
          trackingid: `${telemetryConfig.trackingId}`,
          githubtoken: `${githubToken}`,
          machineid: `${editorSession.machineId}`,
          sessionid: `${editorSession.sessionId}`,
          extname: `${editorInfo.getEditorPluginInfo().name}`,
          extversion: `${editorInfo.getEditorPluginInfo().version}`
        },
        response = await fetcher.fetch(url.href, {
          headers: headers,
          method: "POST",
          json: {
            repos: urls
          }
        });
      if (response.ok) {
        let content = await response.json();
        return logger.debug(this.ctx, "repositoryControl.fetch", "success"), telemetry(this.ctx, "repositoryControl.fetch.success"), assertShape(RepositoryControlPolicyResponseSchema, content).map(r => r.rules);
      }
      logger.debug(this.ctx, "repositoryControl.fetch", "error"), telemetry(this.ctx, "repositoryControl.fetch.error");
      let err = new FetchResponseError(response);
      throw telemetryException(this.ctx, err, "repositoryControl.fetch"), err;
    }, this.ruleLoaderCache);
  }
  async refresh() {
    try {
      if (this.requestStatus.status !== "retrying") {
        this.requestStatus = {
          status: "initial"
        };
        let existingUrls = [...this.ruleLoaderCache.keys()];
        this.reset(), await Promise.all(existingUrls.map(url => this.ruleLoader(url)));
      }
    } catch (err) {
      telemetryException(this.ctx, err, "repositoryControl.refresh");
    }
  }
  reset() {
    this.repoUriToPolicyMap.clear(), this.ruleLoaderCache.clear();
  }
  async fetchRepositoryPolicy(repoUrl) {
    if (this.requestStatus.status === "retrying" || this.requestStatus.status === "maxRetries") return "POLICY_NOT_AVAILABLE";
    let result = await this.loaderWithRetry(repoUrl);
    return result ? result.length === 0 ? "NO_MATCHING_POLICY" : result[0] : "POLICY_NOT_AVAILABLE";
  }
  async loaderWithRetry(repoUrl) {
    if (this.requestStatus.status === "retrying") {
      let _waitMs = this.requestStatus.waitMs;
      await new Promise(resolve => setTimeout(resolve, _waitMs));
    }
    try {
      let result = await this.ruleLoader(repoUrl);
      return this.requestStatus = {
        status: "initial"
      }, result;
    } catch {
      let _retryCount = this.requestStatus.status === "retrying" ? this.requestStatus.retryCount + 1 : 0,
        _waitMs = this.requestStatus.status === "retrying" ? this.requestStatus.waitMs * 2 : this.initialWaitMs;
      if (_retryCount >= this.maxRetryCount) {
        telemetry(this.ctx, "repositoryControl.fetch.maxRetries"), this.requestStatus = {
          status: "maxRetries"
        };
        return;
      }
      this.requestStatus = {
        status: "retrying",
        retryCount: _retryCount,
        waitMs: _waitMs
      }, this.loaderWithRetry(repoUrl);
    }
  }
  async evaluate(uri, fileContent) {
    try {
      let repo = await this.ctx.get(RepositoryManager).getRepo(uri);
      if (!repo || !repo.remote) return NOT_BLOCKED_NO_MATCHING_POLICY_RESPONSE;
      let url = repo.remote.getUrlForApi();
      if (!url) return NOT_BLOCKED_NO_MATCHING_POLICY_RESPONSE;
      let policy = await this.fetchRepositoryPolicy(url);
      return policy === "POLICY_NOT_AVAILABLE" ? BLOCKED_POLICY_ERROR_RESPONSE : policy === "NO_MATCHING_POLICY" ? NOT_BLOCKED_NO_MATCHING_POLICY_RESPONSE : this._evaluate(uri, fileContent, policy);
    } catch (err) {
      return telemetryException(this.ctx, err, "repositoryControl.evaluate"), BLOCKED_POLICY_ERROR_RESPONSE;
    }
  }
  async _evaluate(uri, fileContent, policy) {
    if (policy != null && policy.blocked) return getBlockedRepoResponse(policy);
    if (policy.fileContent && fileContent) {
      let mustInclude = policy.fileContent.includes;
      if (fileContent && mustInclude && mustInclude.length > 0 && !new RegExp(mustInclude.join("|"), "i").test(fileContent)) return getBlockedRepoResponse(policy);
      let mustExclude = policy.fileContent.excludes;
      if (fileContent && mustExclude && mustExclude.length > 0 && new RegExp(mustExclude.join("|"), "i").test(fileContent)) return getBlockedRepoResponse(policy);
    }
    return NOT_BLOCKED_RESPONSE;
  }
};,__name(_CopilotRepositoryControl, "CopilotRepositoryControl");,var CopilotRepositoryControl = _CopilotRepositoryControl;,function getBlockedRepoResponse(policy) {
  return {
    isBlocked: !0,
    reason: "FILE_BLOCKED",
    message: `Your ${policy.source.type.toLowerCase()} '${policy.source.name}' has disabled Copilot for this file`
  };
},__name(getBlockedRepoResponse, "getBlockedRepoResponse");,var SourceSchema = xA.Type.Object({
    name: xA.Type.String(),
    type: xA.Type.Union([xA.Type.Literal("Organization"), xA.Type.Literal("Repository")])
  }),
  RepositoryControlPolicySchema = xA.Type.Object({
    fileContent: xA.Type.Optional(xA.Type.Object({
      includes: xA.Type.Optional(xA.Type.Array(xA.Type.String())),
      excludes: xA.Type.Optional(xA.Type.Array(xA.Type.String()))
    })),
    blocked: xA.Type.Optional(xA.Type.Boolean()),
    source: SourceSchema
  }),
  RepositoryControlPoliciesSchema = xA.Type.Array(RepositoryControlPolicySchema),
  RepositoryControlRulesSchema = xA.Type.Object({
    rules: RepositoryControlPoliciesSchema
  }),
  RepositoryControlPolicyResponseSchema = xA.Type.Array(RepositoryControlRulesSchema);