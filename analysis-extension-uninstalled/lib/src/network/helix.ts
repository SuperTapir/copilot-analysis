var _HelixFetcher = class _HelixFetcher extends Fetcher {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.name = "HelixFetcher";
    this.createSocketFactory = __name((userSettings, rejectUnauthorized) => async requestOptions => {
      requestOptions.rejectUnauthorized = rejectUnauthorized, requestOptions.timeout = userSettings.connectionTimeoutInMs, await this.certificateConfigurator.applyToRequestOptions(requestOptions);
      let proxySettings = await this.certificateConfigurator.enhanceProxySettings(userSettings);
      return await this.proxySocketFactory.createSocket(requestOptions, proxySettings);
    }, "createSocketFactory");
    this.fetchApi = this.createFetchApi(ctx), this.certificateConfigurator = new RootCertificateConfigurator(ctx), this.proxySocketFactory = ctx.get(ProxySocketFactory);
  }
  set proxySettings(value) {
    this._proxySettings = value, this.fetchApi = this.createFetchApi(this.ctx);
  }
  get proxySettings() {
    return this._proxySettings;
  }
  set rejectUnauthorized(value) {
    super.rejectUnauthorized = value, this.fetchApi = this.createFetchApi(this.ctx);
  }
  get rejectUnauthorized() {
    return super.rejectUnauthorized;
  }
  createFetchApi(ctx) {
    let buildInfo = ctx.get(BuildInfo);
    return super.rejectUnauthorized === !1 && (process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"), context({
      userAgent: `GithubCopilot/${buildInfo.getVersion()}`,
      socketFactory: this._proxySettings ? this.createSocketFactory(this._proxySettings, super.rejectUnauthorized) : void 0,
      rejectUnauthorized: super.rejectUnauthorized
    });
  }
  async fetch(url, options) {
    let helixOptions = {
      ...options,
      body: options.body ? options.body : options.json,
      signal: options.signal
    };
    await this.certificateConfigurator.applyToRequestOptions(helixOptions);
    let certs = await this.certificateConfigurator.getCertificates();
    this.fetchApi.setCA(certs);
    let resp = await this.fetchApi.fetch(url, helixOptions);
    return new Response(resp.status, resp.statusText, resp.headers, () => resp.text(), async () => resp.body);
  }
  disconnectAll() {
    return this.fetchApi.reset();
  }
  makeAbortController() {
    return new AbortController();
  }
};,__name(_HelixFetcher, "HelixFetcher");,var HelixFetcher = _HelixFetcher;,var packageJson = WC(),
  sessionId = v4_default() + Date.now();,async function createUninstallContext() {
  let ctx = createProductionContext(new DefaultsOnlyConfigProvider());
  return ctx.set(NetworkConfiguration, new DefaultNetworkConfiguration()), ctx.set(Fetcher, new HelixFetcher(ctx)), ctx.set(EditorAndPluginInfo, new UninstallEditorInfo(await lookupVscodeVersion())), ctx.set(EditorSession, new EditorSession(sessionId, getMachineId())), ctx.forceSet(PromiseQueue, new TestPromiseQueue()), await setupTelemetryReporters(ctx, packageJson.name, !0), ctx;
},__name(createUninstallContext, "createUninstallContext");,async function lookupVscodeVersion() {
  let version = "unknown";
  try {
    return await new Promise((resolve, reject) => {
      var _a;
      let child = (0, WM.spawn)("code -v", {
        shell: !0,
        stdio: "pipe"
      });
      (_a = child.stdout) == null || _a.on("data", chunk => {
        version === "unknown" && (version = chunk.toString("utf8").split(`
`)[0] || "unknown");
      }), child.on("exit", () => resolve(version)), child.on("error", err => reject(err));
    });
  } catch {
    return version;
  }
},__name(lookupVscodeVersion, "lookupVscodeVersion");,var _UninstallEditorInfo = class _UninstallEditorInfo extends EditorAndPluginInfo {
  constructor(vscodeVersion) {
    super();
    this.vscodeVersion = vscodeVersion;
  }
  getEditorInfo() {
    return {
      name: "vscode",
      version: this.vscodeVersion
    };
  }
  getEditorPluginInfo() {
    return {
      name: "copilot",
      version: packageJson.version
    };
  }
};,__name(_UninstallEditorInfo, "UninstallEditorInfo");,var UninstallEditorInfo = _UninstallEditorInfo;