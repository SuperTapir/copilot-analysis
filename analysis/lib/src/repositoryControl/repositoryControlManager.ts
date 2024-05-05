var logger = new Logger(1, "contentExclusion");,var _featureEnabled,
  _repositoryControl,
  _contentRestrictions,
  _trackEvaluationResult,
  trackEvaluationResult_fn,
  _refreshMSFTRepoControl,
  refreshMSFTRepoControl_fn,
  _CopilotRepositoryControlManager = class _CopilotRepositoryControlManager {
    constructor(ctx) {
      this.ctx = ctx;
      __privateAdd(this, _trackEvaluationResult);
      __privateAdd(this, _refreshMSFTRepoControl);
      __privateAdd(this, _featureEnabled, !1);
      __privateAdd(this, _repositoryControl, null);
      __privateAdd(this, _contentRestrictions, new CopilotContentRestrictions(this.ctx));
      this.evaluateResultCache = new Map();
      this.onDidChangeActiveTextEditor = __name(async e => {
        if (!__privateGet(this, _featureEnabled) || !e) return;
        let result = await this.ctx.get(TextDocumentManager).getTextDocumentWithValidation(e.document.uri),
          isBlocked = result.status === "invalid",
          reason = result.status === "invalid" ? result.reason : void 0;
        this.updateStatusIcon(isBlocked, reason);
      }, "onDidChangeActiveTextEditor");
      this.ctx.get(TextDocumentManager).onDidFocusTextDocument(this.onDidChangeActiveTextEditor), this.ctx.get(CopilotTokenNotifier).on("onCopilotToken", token => {
        var _a, _b;
        __privateSet(this, _featureEnabled, (_a = token.envelope.copilotignore_enabled) != null ? _a : !1), this.evaluateResultCache.clear(), __privateGet(this, _contentRestrictions).refresh();
        let orgs = (_b = token.organization_list) != null ? _b : [];
        __privateMethod(this, _refreshMSFTRepoControl, refreshMSFTRepoControl_fn).call(this, orgs);
      });
    }
    get enabled() {
      return __privateGet(this, _featureEnabled);
    }
    async evaluate(uri, fileContent, shouldUpdateStatusBar) {
      var _a;
      if (!__privateGet(this, _featureEnabled) || !isSupportedUriScheme(uri.scheme)) return {
        isBlocked: !1
      };
      let events = [],
        track = __name(async (key, ev) => {
          let startTimeMs = Date.now(),
            result = await ev.evaluate(uri, fileContent),
            endTimeMs = Date.now();
          return events.push({
            key: key,
            result: result,
            elapsedMs: endTimeMs - startTimeMs
          }), result;
        }, "track"),
        result = (_a = (await Promise.all([__privateGet(this, _repositoryControl) && track("repositoryControl.evaluate", __privateGet(this, _repositoryControl)), track("contentExclusion.evaluate", __privateGet(this, _contentRestrictions))])).find(r => r == null ? void 0 : r.isBlocked)) != null ? _a : {
          isBlocked: !1
        };
      try {
        for (let event of events) __privateMethod(this, _trackEvaluationResult, trackEvaluationResult_fn).call(this, event.key, uri, event.result, event.elapsedMs);
      } catch (e) {
        console.log("Error tracking telemetry", e);
      }
      return shouldUpdateStatusBar === "UPDATE" && this.updateStatusIcon(result.isBlocked, result.message), result;
    }
    updateStatusIcon(isBlocked, reason) {
      __privateGet(this, _featureEnabled) && (isBlocked ? this.ctx.get(StatusReporter).setInactive(reason != null ? reason : "Copilot is disabled") : this.ctx.get(StatusReporter).forceNormal());
    }
    set __repositoryControl(repoControl) {
      __privateSet(this, _repositoryControl, repoControl);
    }
    get __repositoryControl() {
      return __privateGet(this, _repositoryControl);
    }
    set __contentRestrictions(contentRestrictions) {
      __privateSet(this, _contentRestrictions, contentRestrictions);
    }
    get __contentRestrictions() {
      return __privateGet(this, _contentRestrictions);
    }
  };,_featureEnabled = new WeakMap(), _repositoryControl = new WeakMap(), _contentRestrictions = new WeakMap(), _trackEvaluationResult = new WeakSet(), trackEvaluationResult_fn = __name(function (key, uri, result, elapsedMs) {
  var _a, _b;
  let cacheKey = uri.path + key;
  if (this.evaluateResultCache.get(cacheKey) === result.reason) return !1;
  if (this.evaluateResultCache.set(cacheKey, (_a = result.reason) != null ? _a : "UNKNOWN"), result.reason === NOT_BLOCKED_NO_MATCHING_POLICY_RESPONSE.reason) return logger.debug(this.ctx, `[${key}] No matching policy for this repository. uri: ${uri}`), !1;
  let properties = {
      isBlocked: result.isBlocked ? "true" : "false",
      reason: (_b = result.reason) != null ? _b : "UNKNOWN"
    },
    measurements = {
      elapsedMs: elapsedMs
    };
  return telemetry(this.ctx, key, TelemetryData.createAndMarkAsIssued(properties, measurements)), telemetry(this.ctx, key, TelemetryData.createAndMarkAsIssued({
    ...properties,
    path: uri.path
  }, measurements), 1), logger.debug(this.ctx, `[${key}] ${uri}`, result), !0;
}, "#trackEvaluationResult"), _refreshMSFTRepoControl = new WeakSet(), refreshMSFTRepoControl_fn = __name(function (user_orgs) {
  let knownOrg = ["a5db0bcaae94032fe715fb34a5e4bce2", "7184f66dfcee98cb5f08a1cb936d5225"].find(org => user_orgs.includes(org));
  __privateGet(this, _featureEnabled) && knownOrg ? (__privateGet(this, _repositoryControl) || __privateSet(this, _repositoryControl, new CopilotRepositoryControl(this.ctx)), __privateGet(this, _repositoryControl).refresh()) : __privateSet(this, _repositoryControl, null);
}, "#refreshMSFTRepoControl"), __name(_CopilotRepositoryControlManager, "CopilotRepositoryControlManager");,var CopilotRepositoryControlManager = _CopilotRepositoryControlManager;