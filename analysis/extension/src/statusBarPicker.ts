var import_vscode = require("vscode");,var _CopilotStatusBarPickMenu = class _CopilotStatusBarPickMenu {
  constructor(ctx, afterCommandCallback) {
    this.ctx = ctx;
    this.afterCommandCallback = afterCommandCallback;
    this.state = ctx.get(CopilotExtensionStatus);
  }
  showStatusMenu() {
    let quickpickList = py.window.createQuickPick();
    return quickpickList.items = this.collectQuickPickItems(), quickpickList.onDidAccept(() => {
      this.handleItemSelection(quickpickList);
    }), quickpickList.show(), quickpickList;
  }
  async handleItemSelection(quickpickList) {
    return new Promise((resolve, reject) => {
      let selection = quickpickList.selectedItems[0];
      if (selection !== void 0) if ("command" in selection) {
        let commandSelection = selection;
        py.commands.executeCommand(commandSelection.command, ...commandSelection.commandArgs).then(() => {
          this.afterCommandCallback(), quickpickList.hide(), resolve();
        });
      } else reject("Unexpected selection");
    });
  }
  collectQuickPickItems() {
    return [this.newStatusItem(), this.newSeparator(), ...this.collectQuickPickChatItems(), ...this.collectLanguageSpecificItems(), this.newKeyboardItem(), this.newSettingsItem(), this.newDiagnosticsItem(), this.newOpenLogsItem(), this.newSeparator(), this.newDocsItem(), this.newForumItem(), ...this.collectQuickPickSignInItems()];
  }
  collectQuickPickChatItems() {
    return this.hasWarningOrErrorStatus() ? [] : [this.newChatItem(), this.newSeparator()];
  }
  collectQuickPickSignInItems() {
    return this.hasWarningOrErrorStatus() ? [this.newSeparator(), this.newSignInItem()] : [];
  }
  collectLanguageSpecificItems() {
    var _a;
    if (!this.hasActiveStatus()) return [];
    let currentLanguage = (_a = py.window.activeTextEditor) == null ? void 0 : _a.document.languageId;
    return currentLanguage ? [this.newPanelItem(), this.newGlobalEnablementItem(), ...this.newEnableLanguageItem(currentLanguage), this.newSeparator()] : [this.newGlobalEnablementItem(), this.newSeparator()];
  }
  hasActiveStatus() {
    return ["Normal", "InProgress"].includes(this.state.status);
  }
  hasWarningOrErrorStatus() {
    return ["Error", "Warning"].includes(this.state.status);
  }
  newEnableLanguageItem(currentLanguage) {
    let isEnabled = getEnabledConfig(this.ctx);
    if (isEnabled === void 0) return [];
    let enablementLabelPrefix = isEnabled ? "Disable" : "Enable";
    return [this.newCommandItem(enablementLabelPrefix + " Completions for '" + currentLanguage + "'", CMDToggleCopilot, [currentLanguage])];
  }
  newGlobalEnablementItem() {
    let prefix = getEnabledConfig(this.ctx, "*") ? "Disable" : "Enable";
    return this.newCommandItem(prefix + " Completions", CMDToggleCopilot);
  }
  newStatusItem() {
    let statusText,
      statusIcon = "copilot-logo";
    switch (this.state.status) {
      case "Normal":
      case "InProgress":
        statusText = "Ready", getEnabledConfig(this.ctx) || (statusText += " (Disabled)");
        break;
      case "Inactive":
        statusText = this.state.errorMessage || "Copilot is currently inactive", statusIcon = "copilot-blocked";
        break;
      default:
        statusText = this.state.errorMessage || "Copilot has encountered an error", statusIcon = "copilot-notconnected";
        break;
    }
    return this.newCommandItem(`$(${statusIcon}) Status: ${statusText}`, CMDOpenLogs);
  }
  newSignInItem() {
    return this.newCommandItem("Sign in to GitHub", CMDSignIn);
  }
  newOpenLogsItem() {
    return this.newCommandItem("Open Logs...", CMDOpenLogs);
  }
  newDiagnosticsItem() {
    return this.newCommandItem("Show Diagnostics...", CMDCollectDiagnostics);
  }
  newKeyboardItem() {
    return this.newCommandItem("$(keyboard) Edit Keyboard Shortcuts...", "workbench.action.openGlobalKeybindings", ["copilot"]);
  }
  newChatItem() {
    return this.newCommandItem("$(copilot-chat) GitHub Copilot Chat", "workbench.panel.chat.view.copilot.focus");
  }
  newSettingsItem() {
    return this.newCommandItem("$(settings-gear) Edit Settings...", "workbench.action.openSettings", ["GitHub Copilot"]);
  }
  newPanelItem() {
    return this.newCommandItem("Open Completions Panel...", CMDOpenPanel);
  }
  newForumItem() {
    return this.newCommandItem("$(comments-view-icon) View Copilot Forum...", CMDSendFeedback);
  }
  newDocsItem() {
    return this.newCommandItem("$(remote-explorer-documentation) View Copilot Documentation...", CMDOpenDocumentation);
  }
  newCommandItem(label, command, commandArgs) {
    return new CommandQuickItem(label, command, commandArgs || []);
  }
  newSeparator() {
    return {
      label: "",
      kind: py.QuickPickItemKind.Separator
    };
  }
};,__name(_CopilotStatusBarPickMenu, "CopilotStatusBarPickMenu");,var CopilotStatusBarPickMenu = _CopilotStatusBarPickMenu,
  _CommandQuickItem = class _CommandQuickItem {
    constructor(label, command, commandArgs) {
      this.label = label;
      this.command = command;
      this.commandArgs = commandArgs;
    }
  };,__name(_CommandQuickItem, "CommandQuickItem");,var CommandQuickItem = _CommandQuickItem;