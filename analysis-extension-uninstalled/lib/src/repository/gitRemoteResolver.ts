var _GitRemoteResolver = class _GitRemoteResolver {
  async resolveRemote(ctx, baseFolder) {
    var _a, _b, _c, _d;
    let config = await ctx.get(GitConfigLoader).getConfig(ctx, baseFolder);
    if (!config) return;
    let remotes = this.getRemotes(config),
      gitHubRemotes = remotes.filter(r => r.url.isGitHub());
    if (gitHubRemotes.length) return (_b = (_a = gitHubRemotes.find(r => r.name === "origin")) == null ? void 0 : _a.url) != null ? _b : gitHubRemotes[0].url;
    if (remotes.length) return (_d = (_c = remotes.find(r => r.name === "origin")) == null ? void 0 : _c.url) != null ? _d : remotes[0].url;
  }
  getRemotes(config) {
    let rules = this.getInsteadOfRules(config);
    return config.getSectionValues("remote", "url").map(name => {
      var _a;
      return {
        name: name,
        url: new GitRemoteUrl(this.applyInsteadOfRules(rules, (_a = config.get(`remote.${name}.url`)) != null ? _a : ""))
      };
    }).filter(r => r.url.isRemote());
  }
  applyInsteadOfRules(rules, toValue) {
    for (let rule of rules) if (toValue.startsWith(rule.insteadOf)) return rule.base + toValue.slice(rule.insteadOf.length);
    return toValue;
  }
  getInsteadOfRules(config) {
    return config.getSectionValues("url", "insteadof").map(base => ({
      base: base,
      insteadOf: config.get(`url.${base}.insteadof`)
    })).sort((a, b) => b.base.length - a.base.length);
  }
};,__name(_GitRemoteResolver, "GitRemoteResolver");,var GitRemoteResolver = _GitRemoteResolver;,var maxRepoCacheSize = 100,
  _GitRepository = class _GitRepository {
    constructor(baseFolder, remote) {
      this.baseFolder = baseFolder;
      this.remote = remote;
      this.setNWO();
    }
    get tenant() {
      return this._tenant;
    }
    get owner() {
      return this._owner;
    }
    get name() {
      return this._name;
    }
    get adoOrganization() {
      return this._adoOrganization;
    }
    isGitHub() {
      var _a, _b;
      return (_b = (_a = this.remote) == null ? void 0 : _a.isGitHub()) != null ? _b : !1;
    }
    isADO() {
      var _a, _b;
      return (_b = (_a = this.remote) == null ? void 0 : _a.isADO()) != null ? _b : !1;
    }
    setNWO() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      let parts = (_b = (_a = this.remote) == null ? void 0 : _a.path) == null ? void 0 : _b.replace(/^\//, "").split("/");
      if (this.isGitHub()) {
        this._owner = parts == null ? void 0 : parts[0], this._name = (_c = parts == null ? void 0 : parts[1]) == null ? void 0 : _c.replace(/\.git$/, "");
        let match = /^(?<tenant>[^.]+)\.ghe\.com$/.exec((_e = (_d = this.remote) == null ? void 0 : _d.hostname) != null ? _e : "");
        match && (this._tenant = (_f = match.groups) == null ? void 0 : _f.tenant);
      } else if (this.isADO() && (parts == null ? void 0 : parts.length) === 4) {
        if (((_g = this.remote) == null ? void 0 : _g.scheme) === "ssh") {
          this._adoOrganization = parts == null ? void 0 : parts[1], this._owner = parts == null ? void 0 : parts[2], this._name = parts == null ? void 0 : parts[3];
          return;
        }
        let match = /(?:(?<org>[^.]+)\.)?visualstudio\.com$/.exec((_i = (_h = this.remote) == null ? void 0 : _h.hostname) != null ? _i : "");
        match ? (this._adoOrganization = (_j = match.groups) == null ? void 0 : _j.org, this._owner = parts == null ? void 0 : parts[1], this._name = parts == null ? void 0 : parts[3]) : (this._adoOrganization = parts == null ? void 0 : parts[0], this._owner = parts == null ? void 0 : parts[1], this._name = parts == null ? void 0 : parts[3]);
      }
    }
  };,__name(_GitRepository, "GitRepository");,var GitRepository = _GitRepository,
  _RepositoryManager = class _RepositoryManager {
    constructor(ctx) {
      this.ctx = ctx;
      this.remoteResolver = new GitRemoteResolver();
      this.cache = new LRUCacheMap(maxRepoCacheSize);
    }
    async getRepo(uri) {
      let lastFsPath,
        testedPaths = [];
      do {
        if (this.cache.has(uri.toString())) {
          let result = this.cache.get(uri.toString());
          return this.updateCache(testedPaths, result), result;
        }
        testedPaths.push(uri.toString());
        let repo = await this.tryGetRepoForFolder(uri);
        if (repo) return this.updateCache(testedPaths, repo), repo;
        lastFsPath = uri, uri = dirname(uri);
      } while (uri !== lastFsPath);
      this.updateCache(testedPaths, void 0);
    }
    updateCache(paths, repo) {
      paths.forEach(path => this.cache.set(path, repo));
    }
    async tryGetRepoForFolder(uri) {
      return (await this.isBaseRepoFolder(uri)) ? new GitRepository(uri, await this.repoUrl(uri)) : void 0;
    }
    async isBaseRepoFolder(uri) {
      return (await _RepositoryManager.getRepoConfigLocation(this.ctx, uri)) !== void 0;
    }
    async repoUrl(baseFolder) {
      return await this.remoteResolver.resolveRemote(this.ctx, baseFolder);
    }
    static async getRepoConfigLocation(ctx, baseFolder) {
      try {
        let fs = ctx.get(FileSystem),
          gitDir = bd.Utils.joinPath(baseFolder, ".git");
        if ((await fs.stat(gitDir)).type & 1) return await this.getConfigLocationForGitfile(fs, baseFolder, gitDir);
        let configPath = bd.Utils.joinPath(gitDir, "config");
        return await fs.stat(configPath), configPath;
      } catch {
        return;
      }
    }
    static async getConfigLocationForGitfile(fs, baseFolder, gitFile) {
      let match = (await fs.readFileString(gitFile)).match(/^gitdir:\s+(.+)$/m);
      if (!match) return;
      let gitDir = resolveFilePath(baseFolder, match[1]),
        configPath = bd.Utils.joinPath(gitDir, "config");
      if ((await this.tryStat(fs, configPath)) !== void 0) return configPath;
      let worktreeConfigPath = bd.Utils.joinPath(gitDir, "config.worktree");
      if ((await this.tryStat(fs, worktreeConfigPath)) !== void 0) return worktreeConfigPath;
      let commonDirPath = bd.Utils.joinPath(gitDir, "commondir");
      gitDir = resolveFilePath(gitDir, (await fs.readFileString(commonDirPath)).trimEnd());
      let commonConfigPath = bd.Utils.joinPath(gitDir, "config");
      return await fs.stat(commonConfigPath), commonConfigPath;
    }
    static async tryStat(fs, path) {
      try {
        return await fs.stat(path);
      } catch {
        return;
      }
    }
  };,__name(_RepositoryManager, "RepositoryManager");,var RepositoryManager = _RepositoryManager;