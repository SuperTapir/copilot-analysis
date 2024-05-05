var _ExpConfigMaker = class _ExpConfigMaker {};,__name(_ExpConfigMaker, "ExpConfigMaker");,var ExpConfigMaker = _ExpConfigMaker,
  ProdExpDomain = "https://default.exp-tas.com",
  _ExpConfigFromTAS = class _ExpConfigFromTAS extends ExpConfigMaker {
    constructor(expPath = "/vscode/ab") {
      super();
      this.expPath = expPath;
    }
    async fetchExperiments(ctx, filterHeaders) {
      var _a;
      let fetcher = ctx.get(Fetcher),
        resp;
      try {
        resp = await fetcher.fetch(ProdExpDomain + this.expPath, {
          method: "GET",
          headers: filterHeaders
        });
      } catch (e) {
        return ExpConfig.createFallbackConfig(ctx, `Error fetching ExP config: ${e}`);
      }
      if (!resp.ok) return ExpConfig.createFallbackConfig(ctx, `ExP responded with ${resp.status}`);
      let json;
      try {
        json = await resp.json();
      } catch (e) {
        if (e instanceof SyntaxError) return telemetryException(ctx, e, "fetchExperiments"), ExpConfig.createFallbackConfig(ctx, "ExP responded with invalid JSON");
        throw e;
      }
      let vscodeConfig = (_a = json.Configs.find(c => c.Id === "vscode")) != null ? _a : {
          Id: "vscode",
          Parameters: {}
        },
        features = Object.entries(vscodeConfig.Parameters).map(([name, value]) => name + (value ? "" : "cf"));
      return new ExpConfig(vscodeConfig.Parameters, json.AssignmentContext, features.join(";"));
    }
  };,__name(_ExpConfigFromTAS, "ExpConfigFromTAS");,var ExpConfigFromTAS = _ExpConfigFromTAS;