var import_child_process = require("child_process");,var logger = new Logger(1, "repository"),
  _GitConfigData = class _GitConfigData {
    constructor() {
      this.data = {};
    }
    getKeys() {
      return Object.keys(this.data);
    }
    getEntries() {
      return Object.entries(this.data);
    }
    get(key) {
      let entries = this.getAll(key);
      return entries ? entries[entries.length - 1] : void 0;
    }
    getAll(key) {
      return this.data[this.normalizeKey(key)];
    }
    add(key, value) {
      key in this.data || (this.data[key] = []), this.data[key].push(value);
    }
    getSectionValues(base, withKey) {
      let prefix = `${base}.`.toLowerCase(),
        suffix = `.${withKey}`.toLowerCase();
      return Object.keys(this.data).filter(key => key.startsWith(prefix) && key.endsWith(suffix)).map(key => key.slice(prefix.length, -suffix.length));
    }
    concat(other) {
      return this.getEntries().concat(other.getEntries()).reduce((merged, [key, values]) => (values.forEach(value => merged.add(key, value)), merged), new _GitConfigData());
    }
    normalizeKey(key) {
      let parts = key.split(".");
      return parts[0] = parts[0].toLowerCase(), parts[parts.length - 1] = parts[parts.length - 1].toLowerCase(), parts.join(".");
    }
  };,__name(_GitConfigData, "GitConfigData");,var GitConfigData = _GitConfigData,
  _GitConfigLoader = class _GitConfigLoader {};,__name(_GitConfigLoader, "GitConfigLoader");,var GitConfigLoader = _GitConfigLoader,
  _GitCLIConfigLoader = class _GitCLIConfigLoader extends GitConfigLoader {
    runCommand(cwd, cmd, args) {
      return new Promise((resolve, reject) => {
        (0, UJ.execFile)(cmd, args, {
          cwd: cwd
        }, (err, stdout) => {
          err ? reject(err) : resolve(stdout);
        });
      });
    }
    async tryRunCommand(ctx, cwd, cmd, args) {
      try {
        return await this.runCommand(cwd, cmd, args);
      } catch (err) {
        logger.info(ctx, `Failed to run command '${cmd}' in ${cwd}: ${err}`);
        return;
      }
    }
    async getConfig(ctx, baseFolder) {
      let output = await this.tryRunCommand(ctx, baseFolder.fsPath, "git", ["config", "--list", "--null", ...this.extraArgs()]);
      return output ? this.extractConfig(output) : void 0;
    }
    extractConfig(output) {
      let config = new GitConfigData();
      for (let item of output.split("\0").filter(s => s)) {
        let key = item.split(`
`, 1)[0],
          value = item.slice(key.length + 1);
        config.add(key, value);
      }
      return config;
    }
    extraArgs() {
      return [];
    }
  };,__name(_GitCLIConfigLoader, "GitCLIConfigLoader");,var GitCLIConfigLoader = _GitCLIConfigLoader,
  _GitFallbackConfigLoader = class _GitFallbackConfigLoader extends GitConfigLoader {
    constructor(loaders) {
      super();
      this.loaders = loaders;
    }
    async getConfig(ctx, baseFolder) {
      for (let loader of this.loaders) {
        let config = await loader.getConfig(ctx, baseFolder);
        if (config) return config;
      }
    }
  };,__name(_GitFallbackConfigLoader, "GitFallbackConfigLoader");,var GitFallbackConfigLoader = _GitFallbackConfigLoader;