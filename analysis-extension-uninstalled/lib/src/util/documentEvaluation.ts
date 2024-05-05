function isDocumentTooLarge(document) {
  try {
    return document.getText(), !1;
  } catch (e) {
    if (e instanceof RangeError) return !0;
    throw e;
  }
},__name(isDocumentTooLarge, "isDocumentTooLarge");,async function isDocumentValid(ctx, document) {
  var _a;
  if (isDocumentTooLarge(document)) return {
    status: "invalid",
    reason: "Document is too large"
  };
  let rcmResult = await ctx.get(CopilotRepositoryControlManager).evaluate(document.uri, document.getText());
  return rcmResult.isBlocked ? {
    status: "invalid",
    reason: (_a = rcmResult.message) != null ? _a : "Document is blocked by repository policy"
  } : {
    status: "valid",
    document: document
  };
},__name(isDocumentValid, "isDocumentValid");