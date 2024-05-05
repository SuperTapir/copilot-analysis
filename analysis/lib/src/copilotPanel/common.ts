var import_vscode_uri = Dr(qp());,var CopilotPanelScheme = "copilot",
  solutionCountTarget = 10;,function completionTypeToString(type) {
  switch (type) {
    case 2:
      return "open copilot";
    default:
      return "unknown";
  }
},__name(completionTypeToString, "completionTypeToString");,var _CompletionContext = class _CompletionContext {
  constructor(ctx, insertPosition, completionType) {
    this.prependToCompletion = "";
    this.appendToCompletion = "";
    this.indentation = null;
    this.completionType = 2;
    this.insertPosition = LocationFactory.position(insertPosition.line, insertPosition.character), this.completionType = completionType;
  }
  static fromJSONParse(ctx, contextObj) {
    let insertPosition = LocationFactory.position(contextObj.insertPosition.line, contextObj.insertPosition.character),
      context = new _CompletionContext(ctx, insertPosition, contextObj.completionType);
    return context.prependToCompletion = contextObj.prependToCompletion, context.appendToCompletion = contextObj.appendToCompletion, context.indentation = contextObj.indentation, context;
  }
};,__name(_CompletionContext, "CompletionContext");,var CompletionContext = _CompletionContext;,function completionContextForDocument(ctx, document, insertPosition) {
  let returnPosition = insertPosition,
    line = document.lineAt(insertPosition.line);
  return line.isEmptyOrWhitespace || (returnPosition = line.range.end), new CompletionContext(ctx, returnPosition, 2);
},__name(completionContextForDocument, "completionContextForDocument");,var seq = 0;,function encodeLocation(targetUri, completionContext) {
  let panelFileName = "GitHub Copilot Suggestions",
    target = targetUri.toString().split("#"),
    remain = target.length > 1 ? target[1] : "",
    query = JSON.stringify([target[0], completionContext, remain]),
    targetFileName = l9.Utils.basename(targetUri);
  return targetFileName.length > 0 && (panelFileName += ` for ${targetFileName}`), l9.URI.from({
    scheme: CopilotPanelScheme,
    path: panelFileName,
    query: query,
    fragment: `${seq++}`
  });
},__name(encodeLocation, "encodeLocation");