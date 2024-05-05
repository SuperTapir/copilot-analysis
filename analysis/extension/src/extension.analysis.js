/**
 * 对插件进行激活
 */
async function activate(context) {
  // 创建并标记为已发出的遥测数据
  let activationTelemetry = TelemetryData.createAndMarkAsIssued();

  // 创建插件上下文，并等待其完成
  let ctx = await createExtensionContext(context);

  // 注册状态栏
  registerStatusBar(ctx, outputChannel);

  // 将 CopilotRepositoryControlManager 添加到上下文中
  ctx.set(CopilotRepositoryControlManager, new CopilotRepositoryControlManager(ctx));

  // 注册诊断命令
  registerDiagnosticCommands(ctx);

  // 注册带有遥测的命令
  registerCommandWithTelemetry(ctx, CMDSignIn, () => getSession(ctx, !0));
  
  // 添加 CodeReference 实例到订阅
  context.subscriptions.push(new CodeReference(ctx).register());

  // 添加 onDeactivate 方法到订阅
  context.subscriptions.push(onDeactivate(ctx));

  // 尝试激活插件
  let tryActivation = async () => {
    // 获取状态栏
    let statusBar = ctx.get(StatusReporter);

    // 设置状态栏进度，并尝试一次登录
    statusBar.setProgress();
    permitOneSignIn();

    // 检查 Node.js 版本是否支持
    let nodeVersionError = errorMessageForUnsupportedNodeVersion();
    // 如果 Node.js 版本不支持，则处理错误
    if (nodeVersionError) {
      await handleAuthenticationError(ctx, nodeVersionError, !1);
      return;
    }

    // 尝试登录
    attemptAuthentication(ctx)
      // 登录成功后
      .then(() => {
        // TODO: 未知变量
        var l, u;
        // 设置状态栏为正常状态
        statusBar.forceNormal();
        // 设置 github.copilot.activated 为 true
        vscode.commands.executeCommand('setContext', 'github.copilot.activated', !0);

        // 注册面板支持
        registerPanelSupport(ctx);

        // 注册 GhostText 支持
        registerGhostTextSupport(ctx);

        // 将文档跟踪器注册到订阅中
        context.subscriptions.push(registerDocumentTracker(ctx));

        // 当活动的文本编辑器改变时，提取相关的仓库信息
        context.subscriptions.push(
          vscode.window.onDidChangeActiveTextEditor(
            (p) => p && extractRepoInfoInBackground(ctx, p.document.uri)
          )
        );

        // 当打开一个新的文本文档时，预加载语言检测缓存
        context.subscriptions.push(
          vscode.workspace.onDidOpenTextDocument((p) =>
            primeLanguageDetectionCache(ctx, wrapDoc(ctx, p))
          )
        );

        // 当配置改变时，执行相应的处理函数
        context.subscriptions.push(
          vscode.workspace.onDidChangeConfiguration((p) =>
            onDidChangeConfigurationHandler(p, ctx)
          )
        );

        // 检查是否处于开发模式
        let isDevMode = context.extensionMode === vscode.ExtensionMode.Development;
        // 初始化，如果不是开发模式，则启动线程，并发送激活遥测
        init(ctx, !isDevMode, new Logger(1, 'promptlibProxy'));
        if (!isDevMode) {
          ctx.get(Eq.SnippetOrchestrator).startThreading();
        }
        telemetry(ctx, 'extension.activate', activationTelemetry);

        // 如果有活动的文本编辑器，更新其内容
        if ((l = vscode.window) != null && l.activeTextEditor) {
          ctx.get(CopilotRepositoryControlManager).evaluate(
            (u = vscode.window.activeTextEditor.document) == null ? void 0 : u.uri,
            vscode.window.activeTextEditor.document.getText(),
            'UPDATE'
          );
        }
      })
      .catch((err) => {
        // 处理登录错误
        handleAuthenticationError(ctx, err);
      });
  };

  // 监听身份验证会话的变化
  vscode.authentication.onDidChangeSessions(async (event) => {
    await onDidChangeSessionsHandler(event, ctx);
  });

  // 启动 VS Code 安装管理器
  new VsCodeInstallationManager().startup(ctx);
  // 尝试激活插件
  await tryActivation();

  // 返回 CopilotExtensionApi 实例
  return new CopilotExtensionApi(ctx);
}

export default {
  activate
};

// var extension_exports = {};,__export(extension_exports, {
//   Extension: () => Extension,
//   activate: () => activate,
//   createExtensionContext: () => createExtensionContext,
//   onDeactivate: () => onDeactivate
// });,module.exports = __toCommonJS(extension_exports);,var import_register = Dr(zS()),
//   import_copilot_promptlib = Dr(Dm()),
//   import_vscode = require("vscode");