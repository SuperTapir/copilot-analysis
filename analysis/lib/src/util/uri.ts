var import_os = require("os"),
  import_path = require("path"),
  import_vscode_uri = Dr(qp());,function isSupportedUriScheme(scheme) {
  return isFsScheme(scheme);
},__name(isSupportedUriScheme, "isSupportedUriScheme");,function isFsScheme(scheme) {
  return ["file", "notebook", "vscode-notebook", "vscode-notebook-cell"].includes(scheme);
},__name(isFsScheme, "isFsScheme");,function isFsUri(uri) {
  return isFsScheme(uri.scheme) && (!uri.authority || (0, eL.platform)() == "win32");
},__name(isFsUri, "isFsUri");,function getFsPath(uri) {
  if (isFsUri(uri)) if ((0, eL.platform)() === "win32") {
    let path = uri.path;
    return uri.authority ? path = `//${uri.authority}${uri.path}` : /^\/[A-Za-z]:/.test(path) && (path = path.substring(1)), (0, E3.normalize)(path);
  } else return uri.authority ? void 0 : uri.path;
},__name(getFsPath, "getFsPath");,function resolveFilePath(uri, fileSystemPath) {
  return isFsUri(uri) ? BC.URI.file((0, E3.resolve)(getFsPath(uri), fileSystemPath)) : BC.Utils.resolvePath(uri, pathToURIPath(fileSystemPath));
},__name(resolveFilePath, "resolveFilePath");,function pathToURIPath(fileSystemPath) {
  return isWinPath(fileSystemPath) ? fileSystemPath.replaceAll("\\", "/") : fileSystemPath;
},__name(pathToURIPath, "pathToURIPath");,function isWinPath(path) {
  return /^[^/\\]*\\/.test(path);
},__name(isWinPath, "isWinPath");,function dirname(uri) {
  return ["notebook", "vscode-notebook", "vscode-notebook-cell"].includes(uri.scheme) ? BC.Utils.dirname(uri).with({
    scheme: "file",
    fragment: ""
  }) : BC.Utils.dirname(uri);
},__name(dirname, "dirname");