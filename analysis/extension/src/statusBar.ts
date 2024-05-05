var import_vscode = require("vscode");,var _CopilotStatusBar = class _CopilotStatusBar extends StatusReporter {
  constructor(ctx, outputChannel) {
    super();
    this.ctx = ctx;
    this.outputChannel = outputChannel;
    this.showingMessage = !1;
    this.delayedUpdateDisplay = debounce(100, () => {
      this.updateStatusBarIndicator();
    });
    this.item = lg.window.createStatusBarItem("status", lg.StatusBarAlignment.Right, 1), this.item.name = "Copilot Status", this.state = ctx.get(CopilotExtensionStatus), this.updateStatusBarIndicator(), this.item.show(), lg.window.onDidChangeActiveTextEditor(() => {
      this.updateStatusBarIndicator();
    }), lg.workspace.onDidCloseTextDocument(() => {
      !lg.window.activeTextEditor && this.state.status === "Inactive" && (this.state.status = "Normal"), this.updateStatusBarIndicator();
    }), lg.workspace.onDidOpenTextDocument(() => {
      this.updateStatusBarIndicator();
    });
  }
  checkEnabledForLanguage() {
    return getEnabledConfig(this.ctx) || !1;
  }
  updateStatusBarIndicator() {
    switch (this.state.status) {
      case "Error":
        this.item.text = "$(copilot-notconnected)", this.item.command = CMDToggleStatusMenu, this.item.tooltip = "Copilot error (click for details)";
        break;
      case "Warning":
        this.item.text = "$(copilot-warning)", this.item.command = this.state.errorMessage ? CMDToggleStatusMenu : void 0, this.item.tooltip = "Copilot is encountering temporary issues (click for details)";
        break;
      case "InProgress":
        this.item.text = "$(loading~spin)";
        break;
      case "Inactive":
        this.item.text = "$(copilot-blocked)", this.item.tooltip = this.state.errorMessage || "Copilot is currently inactive";
        break;
      case "Normal":
        this.item.text = this.checkEnabledForLanguage() ? "$(copilot-logo)" : "$(copilot-notconnected)", this.item.command = CMDToggleStatusMenu, this.item.tooltip = "Show Copilot status menu";
    }
  }
  getStatusBarItem() {
    return this.item;
  }
  setProgress() {
    this.state.status !== "Error" && (this.state.status = "InProgress", this.delayedUpdateDisplay());
  }
  removeProgress() {
    this.state.status !== "Error" && this.state.status !== "Warning" && (this.state.status = "Normal", this.delayedUpdateDisplay());
  }
  setWarning(warningMessage) {
    this.state.status !== "Error" && (this.state.status = "Warning", warningMessage && (this.state.errorMessage = warningMessage), this.updateStatusBarIndicator());
  }
  setError(errorMessage, errorRetry, showErrorPopup = !0) {
    this.state.status = "Error", this.state.errorMessage = errorMessage, this.errorRetry = errorRetry, this.updateStatusBarIndicator(), showErrorPopup && this.showErrorMessage();
  }
  setInactive(message) {
    this.state.status = "Inactive", this.state.errorMessage = message || "", this.errorRetry = void 0, this.updateStatusBarIndicator();
  }
  forceNormal() {
    this.state.status = "Normal", this.state.errorMessage = "", this.errorRetry = void 0, this.updateStatusBarIndicator();
  }
  showErrorMessage() {
    if (this.showingMessage) return;
    this.showingMessage = !0;
    let showOutputOption = "Show Output Log",
      options = [showOutputOption];
    this.errorRetry && options.push("Retry"), lg.window.showWarningMessage(this.state.errorMessage, ...options).then(res => {
      this.showingMessage = !1, res === showOutputOption && this.outputChannel.show(), res === "Retry" && this.errorRetry && this.errorRetry();
    });
  }
};,__name(_CopilotStatusBar, "CopilotStatusBar");,var CopilotStatusBar = _CopilotStatusBar;