var import_typebox = Dr($l()),
  import_net = require("net");,function getProxyFromEnvironment(env) {
  return env.HTTPS_PROXY || env.https_proxy || env.HTTP_PROXY || env.http_proxy;
},__name(getProxyFromEnvironment, "getProxyFromEnvironment");,var HttpSettings = lm.Type.Object({
  proxy: lm.Type.Optional(lm.Type.String()),
  proxyStrictSSL: lm.Type.Optional(lm.Type.Boolean()),
  proxyAuthorization: lm.Type.Optional(lm.Type.String()),
  proxyKerberosServicePrincipal: lm.Type.Optional(lm.Type.String()),
  clientFetch: lm.Type.Optional(lm.Type.Boolean())
});,function proxySettingFromUrl(proxyUrl) {
  (0, Lpe.isIPv6)(proxyUrl) ? proxyUrl = "https://[" + proxyUrl + "]" : /:\/\//.test(proxyUrl) || (proxyUrl = `https://${proxyUrl}`);
  let {
    hostname: hostname,
    port: port,
    username: username,
    password: password
  } = new URL(proxyUrl);
  return {
    host: hostname,
    port: parsePort(port),
    proxyAuth: getAuth(username, password)
  };
},__name(proxySettingFromUrl, "proxySettingFromUrl");,function parsePort(port) {
  if (!port) return 80;
  let portNumber = Number(port);
  if (isNaN(portNumber)) throw new TypeError("Invalid proxy port");
  return portNumber;
},__name(parsePort, "parsePort");,function getAuth(username, password) {
  return !username || !password ? "" : `${decodeURIComponent(username)}:${decodeURIComponent(password)}`;
},__name(getAuth, "getAuth");,function initProxyEnvironment(fetcher, env) {
  fq.workspace.onDidChangeConfiguration(event => {
    let hasProxyUrlChanged = event.affectsConfiguration("http.proxy");
    (event.affectsConfiguration("http.proxyStrictSSL") || event.affectsConfiguration("http.proxyAuthorization") || event.affectsConfiguration("http.proxyKerberosServicePrincipal") || hasProxyUrlChanged) && updateProxyEnvironment(fetcher, env, hasProxyUrlChanged);
  }), updateProxyEnvironment(fetcher, env);
},__name(initProxyEnvironment, "initProxyEnvironment");,var updateProxyEnvironment = __name((fetcher, env, hasProxyUrlChanged) => {
  let httpConfig = fq.workspace.getConfiguration("http"),
    httpProxy = httpConfig.get("proxy"),
    proxyUrl = httpProxy || getProxyFromEnvironment(env);
  if (proxyUrl) {
    let proxyAuthorization = httpConfig.get("proxyAuthorization"),
      proxyStrictSSL = httpConfig.get("proxyStrictSSL", !0),
      proxySettings = proxySettingFromUrl(proxyUrl);
    httpProxy && proxyAuthorization && (proxySettings.proxyAuth = proxyAuthorization);
    let spn = httpConfig.get("proxyKerberosServicePrincipal");
    spn && (proxySettings.kerberosServicePrincipal = spn), fetcher.proxySettings = proxySettings, fetcher.rejectUnauthorized = proxyStrictSSL;
  } else hasProxyUrlChanged && !proxyUrl && (fetcher.proxySettings = void 0);
}, "updateProxyEnvironment");