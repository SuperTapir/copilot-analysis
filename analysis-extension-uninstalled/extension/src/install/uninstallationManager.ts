var _VsCodeUninstallationManager = class _VsCodeUninstallationManager extends InstallationManager {
  async isNewInstall(ctx) {
    throw new Error("not callable from an uninstall script");
  }
  async markInstalled(ctx) {
    throw new Error("not callable from an uninstall script");
  }
  async wasPreviouslyInstalled(ctx) {
    throw new Error("not callable from an uninstall script");
  }
  async isNewUpgrade(ctx) {
    throw new Error("not callable from an uninstall script");
  }
  async markUpgraded(ctx) {
    throw new Error("not callable from an uninstall script");
  }
};,__name(_VsCodeUninstallationManager, "VsCodeUninstallationManager");,var VsCodeUninstallationManager = _VsCodeUninstallationManager;