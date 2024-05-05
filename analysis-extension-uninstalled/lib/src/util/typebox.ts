var import_value = bn(pL());,var assertShape = __name((schema, payload) => {
  if (CS.Value.Check(schema, payload)) return payload;
  let error = `Typebox schema validation failed:
${[...CS.Value.Errors(schema, payload)].map(i => `${i.path} ${i.message}`).join(`
`)}`;
  throw new Error(error);
}, "assertShape");,var TELEMETRY_NAME = "contentExclusion",
  _context,
  _evaluateResultCache,
  _ruleLoaderCache,
  _rulesForRepo,
  rulesForRepo_fn,
  _ruleLoader,
  _telemetry,
  telemetry_fn,
  _CopilotContentRestrictions = class _CopilotContentRestrictions extends PolicyEvaluator {
    constructor(context) {
      super();
      __privateAdd(this, _rulesForRepo);
      __privateAdd(this, _telemetry);
      __privateAdd(this, _context, void 0);
      __privateAdd(this, _evaluateResultCache, new LRUCacheMap(1e4));
      __privateAdd(this, _ruleLoaderCache, new LRUCacheMap(200));
      __privateAdd(this, _ruleLoader, o(async urls => {
        let session = await __privateGet(this, _context).get(CopilotTokenManager).getGitHubSession(__privateGet(this, _context));
        if (!session) throw new CopilotAuthError("No token found");
        let endpoint = __privateGet(this, _context).get(NetworkConfiguration).getContentRestrictionsUrl(session),
          url = new URL(endpoint);
        url.searchParams.set("repos", urls.join(","));
        let result = await __privateGet(this, _context).get(Fetcher).fetch(url.href, {
            method: "GET",
            headers: {
              Authorization: `token ${session.token}`
            }
          }),
          data = await result.json();
        if (!result.ok) {
          if (result.status === 404) return Array.from(urls, () => []);
          throw __privateMethod(this, _telemetry, telemetry_fn).call(this, "fetch.error", {
            message: data.message
          }), new FetchResponseError(result);
        }
        return __privateMethod(this, _telemetry, telemetry_fn).call(this, "fetch.success"), assertShape(ContentRestrictionsResponseSchema, data).map(r => r.rules);
      }, __privateGet(this, _ruleLoaderCache)));
      __privateSet(this, _context, context);
    }
    async evaluate(uri, fileContent) {
      try {
        let repoInfo = await this.getGitRepo(uri);
        if (!repoInfo) return NOT_BLOCKED_NO_MATCHING_POLICY_RESPONSE;
        let rules = await __privateMethod(this, _rulesForRepo, rulesForRepo_fn).call(this, repoInfo.url);
        if (!rules) return NOT_BLOCKED_NO_MATCHING_POLICY_RESPONSE;
        let filePathResult = await this.evaluateFilePathRules(uri, repoInfo, rules);
        if (filePathResult.isBlocked) return filePathResult;
        let textBasedResult = await this.evaluateTextBasedRules(rules, fileContent);
        if (textBasedResult.isBlocked) return textBasedResult;
      } catch (err) {
        return telemetryException(__privateGet(this, _context), err, `${TELEMETRY_NAME}.evaluate`), BLOCKED_POLICY_ERROR_RESPONSE;
      }
      return NOT_BLOCKED_RESPONSE;
    }
    async evaluateFilePathRules(uri, repoInfo, rules) {
      let cacheKey = uri.fsPath;
      if (__privateGet(this, _evaluateResultCache).has(cacheKey)) return __privateGet(this, _evaluateResultCache).get(cacheKey);
      let result = NOT_BLOCKED_RESPONSE,
        fileName = uri.path.replace(repoInfo.baseFolder.path, "");
      ruleLoop: for (let rule of rules) for (let pattern of rule.paths) if (minimatch(fileName, pattern, {
        nocase: !0,
        matchBase: !0,
        nonegate: !0,
        dot: !0
      })) {
        result = fileBlockedEvaluationResult(rule);
        break ruleLoop;
      }
      return __privateGet(this, _evaluateResultCache).set(cacheKey, result), result;
    }
    async evaluateTextBasedRules(rules, fileContent) {
      let blockedIfAnyMatchRules = rules.filter(r => r.ifAnyMatch),
        blockedIfNoneMatchRules = rules.filter(r => r.ifNoneMatch);
      return !fileContent || blockedIfAnyMatchRules.length === 0 && blockedIfNoneMatchRules.length === 0 ? NOT_BLOCKED_RESPONSE : this.evaluateFileContent(blockedIfAnyMatchRules, blockedIfNoneMatchRules, fileContent);
    }
    async evaluateFileContent(blockedIfAnyMatchRules, blockedIfNoneMatchRules, fileContent) {
      for (let rule of blockedIfAnyMatchRules) if (rule.ifAnyMatch && rule.ifAnyMatch.length > 0 && rule.ifAnyMatch.map(r => stringToRegex(r)).some(r => r.test(fileContent))) return fileBlockedEvaluationResult(rule);
      for (let rule of blockedIfNoneMatchRules) if (rule.ifNoneMatch && rule.ifNoneMatch.length > 0 && !rule.ifNoneMatch.map(r => stringToRegex(r)).some(r => r.test(fileContent))) return fileBlockedEvaluationResult(rule);
      return NOT_BLOCKED_RESPONSE;
    }
    async refresh() {
      try {
        let existingUrls = [...__privateGet(this, _ruleLoaderCache).keys()];
        this.reset(), await Promise.all(existingUrls.map(url => __privateGet(this, _ruleLoader).call(this, url)));
      } catch (err) {
        telemetryException(__privateGet(this, _context), err, `${TELEMETRY_NAME}.refresh`);
      }
    }
    reset() {
      __privateGet(this, _ruleLoaderCache).clear(), __privateGet(this, _evaluateResultCache).clear();
    }
    async getGitRepo(uri) {
      let repo = await __privateGet(this, _context).get(RepositoryManager).getRepo(dirname(uri));
      if (!repo || !(repo != null && repo.remote)) return;
      let strippedUrl = repo.remote.getUrlForApi();
      if (strippedUrl) return {
        baseFolder: repo.baseFolder,
        url: strippedUrl
      };
    }
  };,_context = new WeakMap(), _evaluateResultCache = new WeakMap(), _ruleLoaderCache = new WeakMap(), _rulesForRepo = new WeakSet(), rulesForRepo_fn = __name(async function (repoUrl) {
  let rules = await __privateGet(this, _ruleLoader).call(this, repoUrl.toLowerCase());
  if (rules.length !== 0) return rules;
}, "#rulesForRepo"), _ruleLoader = new WeakMap(), _telemetry = new WeakSet(), telemetry_fn = __name(function (event, properties, measurements) {
  telemetry(__privateGet(this, _context), `${TELEMETRY_NAME}.${event}`, TelemetryData.createAndMarkAsIssued(properties, measurements));
}, "#telemetry"), __name(_CopilotContentRestrictions, "CopilotContentRestrictions");,var CopilotContentRestrictions = _CopilotContentRestrictions;,function stringToRegex(str) {
  if (!str.startsWith("/") && !str.endsWith("/")) return new RegExp(str);
  let pattern = str.slice(1, str.lastIndexOf("/")),
    flags = str.slice(str.lastIndexOf("/") + 1);
  return new RegExp(pattern, flags);
},__name(stringToRegex, "stringToRegex");,function fileBlockedEvaluationResult(rule) {
  return {
    isBlocked: !0,
    reason: "FILE_BLOCKED",
    message: `Your ${rule.source.type.toLowerCase()} '${rule.source.name}' has disabled Copilot for this file`
  };
},__name(fileBlockedEvaluationResult, "fileBlockedEvaluationResult");,var SourceSchema = va.Type.Object({
    name: va.Type.String(),
    type: va.Type.Union([va.Type.Literal("Organization"), va.Type.Literal("Repository")])
  }),
  RuleSchema = va.Type.Object({
    paths: va.Type.Array(va.Type.String()),
    ifNoneMatch: va.Type.Optional(va.Type.Array(va.Type.String())),
    ifAnyMatch: va.Type.Optional(va.Type.Array(va.Type.String())),
    source: SourceSchema
  }),
  RulesSchema = va.Type.Array(RuleSchema),
  RepoRuleSchema = va.Type.Object({
    rules: RulesSchema,
    last_updated_at: va.Type.String()
  }),
  ContentRestrictionsResponseSchema = va.Type.Array(RepoRuleSchema);