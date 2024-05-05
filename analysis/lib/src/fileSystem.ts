var _FileSystem = class _FileSystem {};,__name(_FileSystem, "FileSystem");,var FileSystem = _FileSystem;,async function getUserKind(ctx) {
  var _a, _b;
  let orgs = (_a = (await ctx.get(CopilotTokenManager).getCopilotToken(ctx, !1)).organization_list) != null ? _a : [];
  return (_b = ["a5db0bcaae94032fe715fb34a5e4bce2", "7184f66dfcee98cb5f08a1cb936d5225", "4535c7beffc844b46bb1ed4aa04d759a"].find(org => orgs.includes(org))) != null ? _b : "";
},__name(getUserKind, "getUserKind");,async function getFtFlag(ctx) {
  var _a;
  return (_a = (await ctx.get(CopilotTokenManager).getCopilotToken(ctx, !1)).getTokenValue("ft")) != null ? _a : "";
},__name(getFtFlag, "getFtFlag");,async function getRagFlag(ctx) {
  var _a;
  return (_a = (await ctx.get(CopilotTokenManager).getCopilotToken(ctx, !1)).getTokenValue("rag")) != null ? _a : "";
},__name(getRagFlag, "getRagFlag");,function getDogFood(repoInfo) {
  var _a;
  if (repoInfo === void 0 || repoInfo === 0) return "";
  let ghnwo = tryGetGitHubNWO(repoInfo);
  if (ghnwo === "github/github") return ghnwo;
  let adoNwo = (_a = tryGetADONWO(repoInfo)) == null ? void 0 : _a.toLowerCase();
  return adoNwo !== void 0 ? adoNwo : "";
},__name(getDogFood, "getDogFood");,function tryGetGitHubNWO(repoInfo) {
  if (repoInfo !== void 0 && repoInfo !== 0 && repoInfo.hostname === "github.com") return repoInfo.owner + "/" + repoInfo.repo;
},__name(tryGetGitHubNWO, "tryGetGitHubNWO");,function tryGetADONWO(repoInfo) {
  if (repoInfo !== void 0 && repoInfo !== 0 && (repoInfo.hostname.endsWith("azure.com") || repoInfo.hostname.endsWith("visualstudio.com"))) return repoInfo.owner + "/" + repoInfo.repo;
},__name(tryGetADONWO, "tryGetADONWO");,async function getExPFilters(ctx, document) {
  var _a;
  let repoInfo = extractRepoInfoInBackground(ctx, document.uri),
    repoNwo = (_a = tryGetGitHubNWO(repoInfo)) != null ? _a : "",
    dogFood = getDogFood(repoInfo),
    userKind = await getUserKind(ctx),
    customModel = await getFtFlag(ctx),
    retrievalOrg = await getRagFlag(ctx);
  return {
    repoNwo: repoNwo,
    userKind: userKind,
    dogFood: dogFood,
    fileType: document.languageId,
    customModel: customModel,
    retrievalOrg: retrievalOrg
  };
},__name(getExPFilters, "getExPFilters");,function extractRepoInfoInBackground(ctx, uri) {
  let baseFolder = TB.Utils.dirname(uri);
  return backgroundRepoInfo(ctx, baseFolder);
},__name(extractRepoInfoInBackground, "extractRepoInfoInBackground");,var backgroundRepoInfo = computeInBackgroundAndMemoize(extractRepoInfo, 1e4);,async function extractRepoInfo(ctx, uri) {
  var _a;
  if (!isSupportedUriScheme(uri.scheme)) return;
  let baseFolder = await getRepoBaseFolder(ctx, uri.fsPath);
  if (!baseFolder) return;
  let fs = ctx.get(FileSystem),
    configPath = (0, NB.join)(baseFolder, ".git", "config"),
    gitConfig;
  try {
    gitConfig = await fs.readFileString(TB.URI.file(configPath));
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
    if (parsedUrl = (0, CK.GitUrlParse)(url), parsedUrl.host == "" || parsedUrl.owner == "" || parsedUrl.name == "" || parsedUrl.pathname == "") return;
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
    let configPath = (0, NB.join)(uri, ".git", "config"),
      result = !1;
    try {
      await fs.stat(TB.URI.file(configPath)), result = !0;
    } catch {
      result = !1;
    }
    if (result) return uri;
    previousUri = uri, uri = (0, NB.dirname)(uri);
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