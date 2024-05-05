var import_stream = require("stream");,var _ElectronFetcher = class _ElectronFetcher extends Fetcher {
  constructor(ctx, net) {
    super();
    this.net = net;
    this.name = "ElectronFetcher";
    this.userAgent = `GithubCopilot/${ctx.get(BuildInfo).getVersion()}`;
  }
  static create(ctx) {
    let net = loadNetModule();
    if (net) return new _ElectronFetcher(ctx, net);
  }
  async fetch(url, options) {
    let headers = options.headers || {};
    headers["User-Agent"] = this.userAgent;
    let body = options.body;
    if (options.json) {
      if (options.body) throw new Error("Illegal arguments! Cannot pass in both 'body' and 'json'!");
      headers["Content-Type"] = "application/json", body = JSON.stringify(options.json);
    }
    let method = options.method || "GET";
    if (method !== "GET" && method !== "POST") throw new Error("Illegal arguments! 'method' must be either 'GET' or 'POST'!");
    if (options.timeout && AbortSignal.timeout(options.timeout), options.signal && !(options.signal instanceof AbortSignal)) throw new Error("Illegal arguments! 'signal' must be an instance of AbortSignal!");
    let signal = AbortSignal.any([...(options.signal ? [options.signal] : []), ...(options.timeout ? [AbortSignal.timeout(options.timeout)] : [])]),
      resp = await this.net.fetch(url, {
        method: method,
        headers: headers,
        body: body,
        signal: signal
      });
    return new Response(resp.status, resp.statusText, resp.headers, async () => resp.text(), async () => {
      if (!resp.body) return eq.Readable.from([]);
      let iterator = resp.body[Symbol.asyncIterator]();
      return eq.Readable.from(iterator);
    }, async () => resp.json());
  }
  async disconnectAll() {}
  makeAbortController() {
    return new AbortController();
  }
};,__name(_ElectronFetcher, "ElectronFetcher");,var ElectronFetcher = _ElectronFetcher;,function loadNetModule() {
  try {
    return require("electron").net;
  } catch {}
},__name(loadNetModule, "loadNetModule");,var logger = new Logger(1, "fetcher"),
  _ExtensionDelegatingFetcher = class _ExtensionDelegatingFetcher extends Fetcher {
    constructor(ctx, helixFetcher = new HelixFetcher(ctx), electronFetcher = ElectronFetcher.create(ctx), versions = process.versions) {
      super();
      this.ctx = ctx;
      this.helixFetcher = helixFetcher;
      this.electronFetcher = electronFetcher;
      this.versions = versions;
      this.electronFetcherFeatureFlag = !1;
      this.currentFetcher = this.helixFetcher, this.ctx.get(CopilotTokenNotifier).on("onCopilotToken", token => {
        var _a;
        this.electronFetcherFeatureFlag = (_a = token.envelope.vsc_electron_fetcher) != null ? _a : !1, this.updateFetcher();
      }), this.updateFetcher();
    }
    updateFetcher() {
      if (!this.electronFetcher) {
        logger.info(this.ctx, "Using Helix fetcher, Electron fetcher is not available."), this.currentFetcher = this.helixFetcher;
        return;
      }
      let debugUseElectronFetcher = getHiddenConfig(this.ctx, ConfigKey.DebugUseElectronFetcher, {
        default: void 0
      });
      if (debugUseElectronFetcher === !0) {
        logger.info(this.ctx, "Using Electron fetcher, debug flag is enabled."), this.currentFetcher = this.electronFetcher;
        return;
      }
      if (debugUseElectronFetcher === !1) {
        logger.info(this.ctx, "Using Helix fetcher, debug flag is disabled."), this.currentFetcher = this.helixFetcher;
        return;
      }
      if (this.helixFetcher.proxySettings && !this.electronSupportsExplicitProxy()) {
        logger.info(this.ctx, "Using Helix fetcher, Electron version does not support explicit proxy."), this.currentFetcher = this.helixFetcher;
        return;
      }
      if (this.electronFetcherFeatureFlag === !0) {
        logger.info(this.ctx, "Using Electron fetcher, feature flag is enabled."), this.currentFetcher = this.electronFetcher;
        return;
      }
      logger.info(this.ctx, "Using Helix fetcher."), this.currentFetcher = this.helixFetcher;
    }
    electronSupportsExplicitProxy() {
      return (0, ype.gt)(this.versions.electron, "28.2.5");
    }
    get name() {
      return this.currentFetcher.name;
    }
    set proxySettings(value) {
      this.helixFetcher.proxySettings = value, this.updateFetcher();
    }
    get proxySettings() {
      return this.currentFetcher.proxySettings;
    }
    set rejectUnauthorized(value) {
      super.rejectUnauthorized = value, this.helixFetcher.rejectUnauthorized = value;
    }
    get rejectUnauthorized() {
      return super.rejectUnauthorized;
    }
    async fetch(url, options) {
      return options.forceUseHelix ? this.helixFetcher.fetch(url, options) : this.currentFetcher.fetch(url, options);
    }
    async disconnectAll() {
      return this.currentFetcher.disconnectAll();
    }
    makeAbortController() {
      return this.currentFetcher.makeAbortController();
    }
  };,__name(_ExtensionDelegatingFetcher, "ExtensionDelegatingFetcher");,var ExtensionDelegatingFetcher = _ExtensionDelegatingFetcher;