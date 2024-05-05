var import_os = require("os"),
  import_vscode_uri = bn(Q5());,var _GitRemoteUrl = class _GitRemoteUrl {
  constructor(url) {
    this.url = url;
    this.isUrl() ? this.parseUrl() : this.tryParseSSHString() || (this._scheme = "file");
  }
  get scheme() {
    return this._scheme;
  }
  get authority() {
    return this._authority;
  }
  get hostname() {
    return this._hostname;
  }
  get path() {
    return this._path;
  }
  isInvalid() {
    return this._error !== void 0;
  }
  isRemote() {
    return this.scheme !== "file" && this.hostname !== void 0;
  }
  isGitHub() {
    var _a;
    return this.isRemote() && /(?:^|\.)(?:github\.com|ghe\.com)$/i.test((_a = this.hostname) != null ? _a : "");
  }
  isADO() {
    var _a;
    return this.isRemote() && /(?:^|\.)(?:visualstudio\.com|azure\.com)$/i.test((_a = this.hostname) != null ? _a : "");
  }
  getUrlForApi() {
    if (!this.isRemote()) return null;
    if (this.isUrl() && !this.isInvalid()) return VT.URI.from({
      scheme: this.scheme,
      authority: this.authority.replace(/^[^@]+@/, ""),
      path: this.path
    }).toString();
    if (this.scheme == "ssh" && this.isADO()) {
      let idx = this.url.indexOf(":");
      return this.url.substring(0, idx + 1) + this.path;
    }
    return this.url;
  }
  isUrl() {
    return /[A-Za-z0-9][A-Za-z0-9]+:\/\//.test(this.url);
  }
  parseUrl() {
    let uri;
    try {
      uri = VT.URI.parse(this.url);
    } catch (e) {
      this._error = e;
      return;
    }
    this._scheme = uri.scheme, this.setAuthority(uri.authority), this.setPath(uri.path);
  }
  setAuthority(authority) {
    this._authority = authority;
    let hostname = authority.replace(/^[^@]+@/, "").replace(/:\d*$/, "");
    hostname && (this._hostname = hostname);
  }
  tryParseSSHString() {
    var _a, _b, _c, _d, _e;
    let match = /^(?<host>[^:/\\[]*(?:\[[^/\\\]]*\])?):/.exec(this.url);
    if (match && ((0, HB.platform)() !== "win32" || ((_c = (_b = (_a = match.groups) == null ? void 0 : _a.host) == null ? void 0 : _b.length) != null ? _c : 0) > 1)) {
      let authority = (_e = (_d = match.groups) == null ? void 0 : _d.host) != null ? _e : "";
      return this._scheme = "ssh", this.setAuthority(authority), this.setPath(this.url.substring(authority.length + 1)), !0;
    }
    return !1;
  }
  setPath(path) {
    if (this.isADO()) try {
      this._path = decodeURIComponent(path);
      return;
    } catch {}
    this._path = path;
  }
};,__name(_GitRemoteUrl, "GitRemoteUrl");,var GitRemoteUrl = _GitRemoteUrl;