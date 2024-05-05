var import_node_os = require("os"),
  import_vscode_uri = Dr(qp());,var logger = new Logger(1, "repository"),
  esc = "\\\\",
  comment = "(?:[#;].*)",
  stringChar = `(?:[^"${esc}]|${esc}.)`,
  keyChar = "[0-9A-Za-z-]",
  configKey = `[A-Za-z]${keyChar}*`,
  configValueTerminator = `\\s*${comment}?$`,
  valueChar = `(?:[^"${esc};#]|${esc}.)`,
  valueString = `(?:"${stringChar}*"|"${stringChar}*(?<strCont>${esc})$)`,
  value = `(?:${valueChar}|${valueString})+`,
  continuation = `(?:(?<cont>${esc})$)`,
  configValue = `(?<value>${value})${continuation}?${configValueTerminator}`,
  continuedValueRegex = new RegExp(`^${configValue}`),
  continuedStringRegex = new RegExp(`^(?<value>${stringChar}*(?:(?<strCont>${esc})$|(?<quote>")))`),
  configPairRegex = new RegExp(`^\\s*(?:(?<key>${configKey})\\s*=\\s*${configValue}|(?<soloKey>${configKey})${configValueTerminator})`),
  valueSearchRegex = new RegExp(`(?<value>${valueChar}+)|"(?<string>${stringChar}*)"`, "g"),
  simpleVar = "[-.0-9A-Za-z]+",
  extendedVar = `\\s+"(?<ext>${stringChar}*)"`,
  extendedVarOnly = `\\s+"(?<extOnly>${stringChar}*)"`,
  sectionRegex = new RegExp(`^\\s*\\[(?:(?<simple>${simpleVar})${extendedVar}|${extendedVarOnly}|(?<simpleOnly>${simpleVar}))\\]`),
  commentRegex = new RegExp(`^\\s*${comment}$`),
  _GitConfigParser = class _GitConfigParser {
    constructor(content) {
      this.content = content;
      this.stopped = !1;
      this.section = "";
      this.line = "";
      this.lineNum = 0;
      this.lines = [];
      this.linesWithErrors = [];
    }
    parse(configValueHandler) {
      for (this.stopped = !1, this.section = "", this.line = "", this.linesWithErrors = [], this.configValueHandler = configValueHandler, this.lines = this.content.split(/\r?\n/), this.lineNum = 0; !this.stopped && this.lineNum < this.lines.length; this.lineNum++) this.line = this.lines[this.lineNum], this.parseSectionStart(), this.parseConfigPair(), this.parseComment(), /^\s*$/.test(this.line) || this.errorAt(this.lineNum + 1);
    }
    stop() {
      this.stopped = !0;
    }
    hasErrors() {
      return this.linesWithErrors.length > 0;
    }
    errorAt(lineNum) {
      this.linesWithErrors.push(lineNum);
    }
    parseSectionStart() {
      var _a, _b;
      let match = this.line.match(sectionRegex);
      match && ((_a = match.groups) != null && _a.simple ? this.section = match.groups.simple.toLowerCase() + "." + this.unescapeBaseValue(match.groups.ext) : (_b = match.groups) != null && _b.extOnly ? this.section = "." + this.unescapeBaseValue(match.groups.extOnly) : this.section = match.groups.simpleOnly.toLowerCase(), this.line = this.line.slice(match[0].length));
    }
    unescapeBaseValue(value) {
      return value.replace(/\\(.)/g, "$1");
    }
    parseConfigPair() {
      var _a, _b, _c, _d;
      let match = this.line.match(configPairRegex);
      if (match) {
        if ((_a = match.groups) != null && _a.key) {
          let value = this.handleContinued(match);
          (_b = this.configValueHandler) == null || _b.call(this, this.nameWithSection(match.groups.key.toLowerCase()), value);
        } else (_c = match.groups) != null && _c.soloKey && ((_d = this.configValueHandler) == null || _d.call(this, this.nameWithSection(match.groups.soloKey.toLowerCase()), ""));
        this.line = "";
      }
    }
    handleContinued(lastMatch) {
      var _a, _b, _c;
      let match = lastMatch,
        values = [this.matchedValue(match)];
      for (; (_a = match == null ? void 0 : match.groups) != null && _a.cont || (_b = match == null ? void 0 : match.groups) != null && _b.strCont;) {
        if (this.line = this.lines[++this.lineNum], this.lineNum >= this.lines.length) {
          this.errorAt(this.lineNum);
          break;
        }
        match.groups.strCont ? (match = this.line.match(continuedStringRegex), match ? (values.push(this.matchedValue(match)), (_c = match.groups) != null && _c.quote && (match = this.line.slice(match[0].length).match(continuedValueRegex), match ? values.push(this.matchedValue(match)) : this.errorAt(this.lineNum + 1))) : this.errorAt(this.lineNum + 1)) : (match = this.line.match(continuedValueRegex), match ? values.push(this.matchedValue(match)) : this.errorAt(this.lineNum + 1));
      }
      return this.normalizeValue(values.join(""));
    }
    matchedValue(match) {
      return match.groups.strCont ? match.groups.value.slice(0, -1) : match.groups.value;
    }
    normalizeValue(value) {
      let trimEnd = !1,
        normalized = [...value.matchAll(valueSearchRegex)].map(match => {
          var _a;
          return (_a = match.groups) != null && _a.value ? (trimEnd = !0, this.unescapeValue(match.groups.value.replace(/\s/g, " "))) : (trimEnd = !1, this.unescapeValue(match.groups.string));
        }).join("");
      return trimEnd ? normalized.trimEnd() : normalized;
    }
    unescapeValue(value) {
      let replacements = {
        n: `
`,
        t: "	",
        b: "\b"
      };
      return value.replace(/\\(.)/g, (_match, char) => replacements[char] || char);
    }
    nameWithSection(name) {
      return this.section ? this.section + "." + name : name;
    }
    parseComment() {
      commentRegex.test(this.line) && (this.line = "");
    }
  };,__name(_GitConfigParser, "GitConfigParser");,var GitConfigParser = _GitConfigParser,
  _GitParsingConfigLoader = class _GitParsingConfigLoader extends GitConfigLoader {
    async getConfig(ctx, baseFolder) {
      let configFile = await RepositoryManager.getRepoConfigLocation(ctx, baseFolder);
      if (!configFile) return;
      let config = await this.getParsedConfig(ctx, configFile);
      if (config) return this.mergeConfig(await this.baseConfig(ctx, configFile), config);
    }
    mergeConfig(...configs) {
      return configs.filter(c => c !== void 0).reduce((merged, config) => merged.concat(config), new GitConfigData());
    }
    async getParsedConfig(ctx, configFile, warnIfNotExists = !0) {
      let configData = await this.tryLoadConfig(ctx, configFile, warnIfNotExists);
      if (!configData) return;
      let parser = new GitConfigParser(configData),
        config = new GitConfigData();
      return parser.parse((name, value) => config.add(name, value)), config;
    }
    async tryLoadConfig(ctx, configFile, warnIfNotExists) {
      try {
        return await ctx.get(FileSystem).readFileString(configFile);
      } catch (e) {
        (warnIfNotExists || e.code !== "ENOENT") && logger.warn(ctx, `Failed to load git config from ${configFile.toString()}: ${e}`);
        return;
      }
    }
    async baseConfig(ctx, baseConfigFile) {
      let commonUri = await this.commondirConfigUri(ctx, baseConfigFile),
        xdgUri = Wm.Utils.joinPath(this.xdgConfigUri(), "git", "config"),
        userUri = Wm.Utils.joinPath(this.homeUri(), ".gitconfig");
      return this.mergeConfig(await this.getParsedConfig(ctx, xdgUri, !1), await this.getParsedConfig(ctx, userUri, !1), commonUri ? await this.getParsedConfig(ctx, commonUri, !1) : void 0);
    }
    async commondirConfigUri(ctx, baseConfigFile) {
      if (Wm.Utils.basename(baseConfigFile).toLowerCase() !== "config.worktree") return;
      let dir = Wm.Utils.dirname(baseConfigFile),
        commondirFile = Wm.Utils.joinPath(dir, "commondir");
      try {
        let commondirPath = (await ctx.get(FileSystem).readFileString(commondirFile)).trimEnd();
        return Wm.Utils.joinPath(resolveFilePath(dir, commondirPath), "config");
      } catch {
        return;
      }
    }
    xdgConfigUri() {
      return process.env.XDG_CONFIG_HOME ? Wm.URI.file(process.env.XDG_CONFIG_HOME) : Wm.Utils.joinPath(this.homeUri(), ".config");
    }
    homeUri() {
      return Wm.URI.file((0, wte.homedir)());
    }
  };,__name(_GitParsingConfigLoader, "GitParsingConfigLoader");,var GitParsingConfigLoader = _GitParsingConfigLoader;