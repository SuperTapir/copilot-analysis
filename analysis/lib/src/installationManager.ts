var _InstallationManager = class _InstallationManager {
  async startup(ctx) {
    (await this.isNewInstall(ctx)) ? (await this.handleInstall(ctx, await this.wasPreviouslyInstalled(ctx)), await this.markInstalled(ctx)) : (await this.isNewUpgrade(ctx)) && (await this.handleUpgrade(ctx), await this.markUpgraded(ctx));
  }
  async uninstall(ctx) {
    return await this.handleUninstall(ctx);
  }
  async handleInstall(ctx, previouslyInstalled) {
    previouslyInstalled ? telemetry(ctx, "installed.reinstall") : telemetry(ctx, "installed.new");
  }
  async handleUpgrade(ctx) {
    telemetry(ctx, "installed.upgrade");
  }
  async handleUninstall(ctx) {
    telemetry(ctx, "uninstalled");
  }
};,__name(_InstallationManager, "InstallationManager");,var InstallationManager = _InstallationManager;,var _VsCodeInstallationManager = class _VsCodeInstallationManager extends InstallationManager {
  async isNewInstall(ctx) {
    return !ctx.get(Extension).context.globalState.get("installedVersion") && !(await hasExistingSession());
  }
  async markInstalled(ctx) {
    let info = ctx.get(EditorAndPluginInfo).getEditorPluginInfo();
    ctx.get(Extension).context.globalState.update("installedVersion", info.version);
  }
  async wasPreviouslyInstalled(ctx) {
    return !1;
  }
  async isNewUpgrade(ctx) {
    let current = ctx.get(EditorAndPluginInfo).getEditorPluginInfo(),
      last = ctx.get(Extension).context.globalState.get("installedVersion");
    if (last === void 0) return !0;
    try {
      return (0, v2.gt)((0, v2.coerce)(current.version), (0, v2.coerce)(last));
    } catch {
      return !1;
    }
  }
  async markUpgraded(ctx) {
    await this.markInstalled(ctx);
  }
};,__name(_VsCodeInstallationManager, "VsCodeInstallationManager");,var VsCodeInstallationManager = _VsCodeInstallationManager;