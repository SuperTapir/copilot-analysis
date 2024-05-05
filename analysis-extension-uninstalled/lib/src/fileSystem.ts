var _FileSystem = class _FileSystem {};,__name(_FileSystem, "FileSystem");,var FileSystem = _FileSystem;,function tryGetGitHubNWO(repoInfo) {
  if (repoInfo !== void 0 && repoInfo !== 0 && repoInfo.hostname === "github.com") return repoInfo.owner + "/" + repoInfo.repo;
},__name(tryGetGitHubNWO, "tryGetGitHubNWO");,var backgroundRepoInfo = computeInBackgroundAndMemoize(extractRepoInfo, 1e4);,async function extractRepoInfo(ctx, uri) {
  var _a;
  if (!isSupportedUriScheme(uri.scheme)) return;
  let baseFolder = await getRepoBaseFolder(ctx, uri.fsPath);
  if (!baseFolder) return;
  let fs = ctx.get(FileSystem),
    configPath = (0, J9.join)(baseFolder, ".git", "config"),
    gitConfig;
  try {
    gitConfig = await fs.readFileString(Sy.URI.file(configPath));
  } catch {
    return;
  }
  let url = (_a = getRepoUrlFromConfigText(gitConfig)) != null ? _a : "",
    parsedResult = parseRepoUrl(url);
  return parsedResult === void 0 ? {
    baseFolder: baseFolder,
    url: url,
    hostname: "",
    owner: "",
    repo: "",
    pathname: ""
  } : {
    baseFolder: baseFolder,
    url: url,
    ...parsedResult
  };
},__name(extractRepoInfo, "extractRepoInfo");,function parseRepoUrl(url) {
  let parsedUrl = {};
  try {
    if (parsedUrl = (0, tD.GitUrlParse)(url), parsedUrl.host == "" || parsedUrl.owner == "" || parsedUrl.name == "" || parsedUrl.pathname == "") return;
  } catch {
    return;
  }
  return {
    hostname: parsedUrl.host,
    owner: parsedUrl.owner,
    repo: parsedUrl.name,
    pathname: parsedUrl.pathname
  };
},__name(parseRepoUrl, "parseRepoUrl");,async function getRepoBaseFolder(ctx, uri) {
  let previousUri = uri + "_add_to_make_longer",
    fs = ctx.get(FileSystem);
  for (; uri.length > 1 && uri.length < previousUri.length;) {
    let configPath = (0, J9.join)(uri, ".git", "config"),
      result = !1;
    try {
      await fs.stat(Sy.URI.file(configPath)), result = !0;
    } catch {
      result = !1;
    }
    if (result) return uri;
    previousUri = uri, uri = (0, J9.dirname)(uri);
  }
},__name(getRepoBaseFolder, "getRepoBaseFolder");,function getRepoUrlFromConfigText(gitConfig) {
  var _a;
  let remoteSectionRegex = /^\s*\[\s*remote\s+"((\\\\|\\"|[^\\"])+)"/,
    deprecatedRemoteSectionRegex = /^\s*\[remote.([^"\s]+)/,
    setUrlRegex = /^\s*url\s*=\s*([^\s#;]+)/,
    newSectionRegex = /^\s*\[/,
    remoteUrl,
    remoteSection,
    isWithinMultilineUrl = !1;
  for (let line of gitConfig.split(`
`)) if (isWithinMultilineUrl && remoteUrl !== void 0) {
    if (remoteUrl += line, line.endsWith("\\")) remoteUrl = remoteUrl.substring(0, remoteUrl.length - 1);else if (isWithinMultilineUrl = !1, remoteSection === "origin") return remoteUrl;
  } else {
    let remoteSectionMatch = (_a = line.match(remoteSectionRegex)) != null ? _a : line.match(deprecatedRemoteSectionRegex);
    if (remoteSectionMatch) remoteSection = remoteSectionMatch[1];else if (line.match(newSectionRegex)) remoteSection = void 0;else {
      if (remoteUrl && remoteSection !== "origin") continue;
      {
        let urlMatch = line.match(setUrlRegex);
        if (urlMatch) {
          if (remoteUrl = urlMatch[1], remoteUrl.endsWith("\\")) remoteUrl = remoteUrl.substring(0, remoteUrl.length - 1), isWithinMultilineUrl = !0;else if (remoteSection === "origin") return remoteUrl;
        }
      }
    }
  }
  return remoteUrl;
},__name(getRepoUrlFromConfigText, "getRepoUrlFromConfigText");,var _CompletedComputation = class _CompletedComputation {
  constructor(result) {
    this.result = result;
  }
};,__name(_CompletedComputation, "CompletedComputation");,var CompletedComputation = _CompletedComputation;,function computeInBackgroundAndMemoize(fct, cacheSize) {
  let resultsCache = new LRUCacheMap(cacheSize),
    inComputation = new Set();
  return (ctx, ...args) => {
    let key = JSON.stringify(args),
      memorizedComputation = resultsCache.get(key);
    if (memorizedComputation) return memorizedComputation.result;
    if (inComputation.has(key)) return 0;
    let computation = fct(ctx, ...args);
    return inComputation.add(key), computation.then(computedResult => {
      resultsCache.set(key, new CompletedComputation(computedResult)), inComputation.delete(key);
    }), 0;
  };
},__name(computeInBackgroundAndMemoize, "computeInBackgroundAndMemoize");