var fs = Dr(require("fs/promises")),
  vscode = Dr(require("vscode")),
  import_vscode_uri = Dr(qp());,var _ExtensionRelatedCppFilesProvider = class _ExtensionRelatedCppFilesProvider extends RelatedFilesProvider {
  constructor(context) {
    super();
    this.context = context;
  }
  async getRelatedFiles(docInfo, wksFolder, telemetryData) {
    let relatedFiles = new Map(),
      startTime = Date.now();
    try {
      _ExtensionRelatedCppFilesProvider.relatedCppFilesTelemetry(this.context, telemetryData);
      let isActive = this.context.get(Features).cppHeaders(telemetryData) || getHiddenConfig(this.context, ConfigKey.DebugOverrideCppHeaders, {
        default: !1
      });
      if (relatedFilesLogger.debug(this.context, `Fetching related files for ${docInfo.uri.toString()}`), !isActive) return EmptyRelatedFiles;
      if (!_ExtensionRelatedCppFilesProvider.languageIds.includes(docInfo.languageId.toLowerCase())) return EmptyRelatedFiles;
      let wksFolderFsPath = getFsPath(wksFolder);
      if (!wksFolderFsPath) return EmptyRelatedFiles;
      let headers = {
        includedFiles: []
      };
      try {
        headers = await W8.commands.executeCommand(_ExtensionRelatedCppFilesProvider.getIncludesCommand, 1);
      } catch {
        return EmptyRelatedFiles;
      }
      let headerFiles = headers.includedFiles;
      for (let header of headerFiles) try {
        let uri = $pe.URI.file(header);
        if (!uri.fsPath.startsWith(wksFolderFsPath)) continue;
        let content = await this.readFile(uri);
        if (!content || (await this.isContentExcluded(uri, content))) continue;
        relatedFiles.set(uri.fsPath, _ExtensionRelatedCppFilesProvider.dropBOM(content)), relatedFilesLogger.debug(this.context, uri.toString());
      } catch (e) {
        relatedFilesLogger.warn(this.context, e);
      }
    } catch (e) {
      exception(this.context, e, ".getRelatedFiles", relatedFilesLogger);
    }
    let elapsedTime = Date.now() - startTime;
    return relatedFilesLogger.debug(this.context, `Fetched ${relatedFiles.size} related files in ${elapsedTime}ms.`), relatedFiles;
  }
  async isContentExcluded(uri, content) {
    return (await this.context.get(CopilotRepositoryControlManager).evaluate(uri, content)).isBlocked;
  }
  async readFile(uri) {
    try {
      return await Mpe.readFile(uri.fsPath, "utf-8");
    } catch (e) {
      relatedFilesLogger.debug(this.context, e);
    }
    return "";
  }
  static dropBOM(content) {
    return content.charCodeAt(0) === 65279 ? content.slice(1) : content;
  }
  static async relatedCppFilesTelemetry(ctx, telemetryData) {
    var _a;
    try {
      if (_ExtensionRelatedCppFilesProvider.telemetrySent) return;
      _ExtensionRelatedCppFilesProvider.telemetrySent = !0;
      let extension = W8.extensions.getExtension("ms-vscode.cpptools"),
        version = (_a = extension == null ? void 0 : extension.packageJSON) == null ? void 0 : _a.version,
        [major, minor] = (version == null ? void 0 : version.split(".").map(Number)) || [];
      version && (major == 1 && minor >= 20 || major >= 2) && (await telemetry(ctx, "relatedCppFiles.cppTools_v1_20_plus", telemetryData));
    } catch (e) {
      exception(ctx, e, "relatedCppFiles", relatedFilesLogger);
    }
  }
};,__name(_ExtensionRelatedCppFilesProvider, "ExtensionRelatedCppFilesProvider"), _ExtensionRelatedCppFilesProvider.cppLanguageId = "cpp", _ExtensionRelatedCppFilesProvider.cLanguageId = "c", _ExtensionRelatedCppFilesProvider.languageIds = [_ExtensionRelatedCppFilesProvider.cppLanguageId, _ExtensionRelatedCppFilesProvider.cLanguageId], _ExtensionRelatedCppFilesProvider.getIncludesCommand = "C_Cpp.getIncludes", _ExtensionRelatedCppFilesProvider.telemetrySent = !1;,var ExtensionRelatedCppFilesProvider = _ExtensionRelatedCppFilesProvider;