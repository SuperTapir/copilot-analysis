var os = Dr(require("os")),
  tls = Dr(require("tls"));,async function collectDiagnostics(ctx) {
  return {
    sections: [collectCopilotSection(ctx), collectEnvironmentSection(), await collectFeatureFlagsSection(ctx), collectNodeSection(), collectNetworkConfigSection(ctx), await collectReachabilitySection(ctx)]
  };
},__name(collectDiagnostics, "collectDiagnostics");,function formatDiagnosticsAsMarkdown(data) {
  return data.sections.map(formatSectionAsMarkdown).join(Am.EOL + Am.EOL);
},__name(formatDiagnosticsAsMarkdown, "formatDiagnosticsAsMarkdown");,function collectCopilotSection(ctx) {
  return {
    name: "Copilot",
    items: {
      Version: getVersion(ctx),
      Build: getBuildType(ctx),
      Editor: editorVersionHeaders(ctx)["Editor-Version"]
    }
  };
},__name(collectCopilotSection, "collectCopilotSection");,function collectEnvironmentSection() {
  return {
    name: "Environment",
    items: {
      http_proxy: findEnvironmentVariable("http_proxy"),
      https_proxy: findEnvironmentVariable("https_proxy"),
      no_proxy: findEnvironmentVariable("no_proxy"),
      SSL_CERT_FILE: findEnvironmentVariable("SSL_CERT_FILE"),
      SSL_CERT_DIR: findEnvironmentVariable("SSL_CERT_DIR"),
      OPENSSL_CONF: findEnvironmentVariable("OPENSSL_CONF")
    }
  };
},__name(collectEnvironmentSection, "collectEnvironmentSection");,function collectNodeSection() {
  return {
    name: "Node setup",
    items: {
      "Number of root certificates": iE.rootCertificates.length,
      "Operating system": Am.type(),
      "Operating system version": Am.release(),
      "Operating system architecture": Am.arch(),
      NODE_OPTIONS: findEnvironmentVariable("NODE_OPTIONS"),
      NODE_EXTRA_CA_CERTS: findEnvironmentVariable("NODE_EXTRA_CA_CERTS"),
      NODE_TLS_REJECT_UNAUTHORIZED: findEnvironmentVariable("NODE_TLS_REJECT_UNAUTHORIZED"),
      "tls default min version": iE.DEFAULT_MIN_VERSION,
      "tls default max version": iE.DEFAULT_MAX_VERSION
    }
  };
},__name(collectNodeSection, "collectNodeSection");,async function collectFeatureFlagsSection(ctx) {
  var _a;
  let items = {};
  try {
    let token = await ctx.get(CopilotTokenManager).getCopilotToken(ctx);
    items["Send Restricted Telemetry"] = token.getTokenValue("rt") === "1" ? "enabled" : "disabled", items.Chat = (_a = token.envelope) != null && _a.chat_enabled ? "enabled" : void 0;
  } catch {}
  return Object.keys(items).forEach(key => items[key] === void 0 && delete items[key]), {
    name: "Feature Flags",
    items: items
  };
},__name(collectFeatureFlagsSection, "collectFeatureFlagsSection");,function collectNetworkConfigSection(ctx) {
  var _a, _b, _c;
  let fetcher = ctx.get(Fetcher);
  return {
    name: "Network Configuration",
    items: {
      "Proxy host": (_a = fetcher.proxySettings) == null ? void 0 : _a.host,
      "Proxy port": (_b = fetcher.proxySettings) == null ? void 0 : _b.port,
      "Kerberos SPN": (_c = fetcher.proxySettings) == null ? void 0 : _c.kerberosServicePrincipal,
      "Reject unauthorized": fetcher.rejectUnauthorized ? "enabled" : "disabled",
      Fetcher: fetcher.name
    }
  };
},__name(collectNetworkConfigSection, "collectNetworkConfigSection");,async function collectReachabilitySection(ctx) {
  return {
    name: "Reachability",
    items: {
      "github.com": await determineReachability(ctx, "https://github.com"),
      "copilot-proxy.githubusercontent.com": await determineReachability(ctx, "https://copilot-proxy.githubusercontent.com/_ping"),
      "api.githubcopilot.com": await determineReachability(ctx, "https://api.githubcopilot.com/_ping"),
      "default.exp-tas.com": await determineReachability(ctx, "https://default.exp-tas.com/vscode/ab")
    }
  };
},__name(collectReachabilitySection, "collectReachabilitySection");,async function determineReachability(ctx, url) {
  try {
    let response = await ctx.get(Fetcher).fetch(url, {});
    return `HTTP ${response.status} - ${response.statusText}`;
  } catch (err) {
    return err.message;
  }
},__name(determineReachability, "determineReachability");,function findEnvironmentVariable(name) {
  let key = Object.keys(process.env).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? process.env[key] : void 0;
},__name(findEnvironmentVariable, "findEnvironmentVariable");,function formatSectionAsMarkdown(s) {
  return `## ${s.name}` + Am.EOL + Am.EOL + Object.keys(s.items).filter(k => k !== "name").map(k => {
    var _a;
    return `- ${k}: ${(_a = s.items[k]) != null ? _a : "n/a"}`;
  }).join(Am.EOL);
},__name(formatSectionAsMarkdown, "formatSectionAsMarkdown");,async function openDiagnosticReport(ctx) {
  let installationCheck = __name(name => uy.extensions.getExtension(name) !== void 0, "installationCheck"),
    reportData = await new DiagnosticReport(installationCheck).collectData(ctx),
    report = formatDiagnosticsAsMarkdown(reportData),
    doc = await uy.workspace.openTextDocument({
      language: "markdown",
      content: report
    });
  await uy.window.showTextDocument(doc);
},__name(openDiagnosticReport, "openDiagnosticReport");,var _DiagnosticReport = class _DiagnosticReport {
  constructor(installationCheck) {
    this.isExtensionInstalled = installationCheck;
  }
  async collectData(ctx) {
    return {
      sections: [...(await collectDiagnostics(ctx)).sections, this.collectConfigurationSection(), this.collectExtensionSection(ctx), await this.collectAuthSection(ctx)]
    };
  }
  collectConfigurationSection() {
    return {
      name: "VS Code Configuration",
      items: {
        "HTTP proxy": this.findVsCodeConfiguration("http", "proxy"),
        "HTTP proxy authentication": this.findVsCodeConfiguration("http", "proxyAuthorization"),
        "Proxy Strict SSL": this.findVsCodeConfiguration("http", "proxyStrictSSL"),
        "Extension HTTP proxy support": this.findVsCodeConfiguration("http", "proxySupport")
      }
    };
  }
  collectExtensionSection(ctx) {
    return {
      name: "Extensions",
      items: {
        "Is `win-ca` installed?": this.isExtensionInstalled("ukoloff.win-ca"),
        "Is `mac-ca` installed?": this.isExtensionInstalled("linhmtran168.mac-ca-vscode")
      }
    };
  }
  async collectAuthSection(ctx) {
    let user;
    if (await hasExistingSession()) {
      let session = await getSession(ctx);
      user = session == null ? void 0 : session.account.label;
    }
    return {
      name: "Authentication",
      items: {
        "GitHub username": user != null ? user : "Not signed in"
      }
    };
  }
  findVsCodeConfiguration(section, name) {
    return uy.workspace.getConfiguration(section).get(name);
  }
};,__name(_DiagnosticReport, "DiagnosticReport");,var DiagnosticReport = _DiagnosticReport;