var import_vscode = require("vscode");,var _ExtensionFileSystem = class _ExtensionFileSystem extends FileSystem {
  async readFileString(uri) {
    return new TextDecoder().decode(await cq.workspace.fs.readFile(uri));
  }
  async stat(uri) {
    return await cq.workspace.fs.stat(uri);
  }
};,__name(_ExtensionFileSystem, "ExtensionFileSystem");,var ExtensionFileSystem = _ExtensionFileSystem,
  extensionFileSystem = new ExtensionFileSystem();