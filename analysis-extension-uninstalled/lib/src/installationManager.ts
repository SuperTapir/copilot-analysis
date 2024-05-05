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
};,__name(_InstallationManager, "InstallationManager");,var InstallationManager = _InstallationManager;