function elidableTextForDiff(oldContent, newContent) {
  let languageId = typeof oldContent == "string" ? typeof newContent == "string" ? void 0 : newContent.languageId : typeof newContent == "string" || oldContent.languageId === newContent.languageId ? oldContent.languageId : void 0;
  oldContent = typeof oldContent == "string" ? oldContent : oldContent.source, newContent = typeof newContent == "string" ? newContent : newContent.source;
  let patch = structuredPatch("", "", oldContent, newContent),
    changedLinesOld = new Set(),
    changedLinesNew = new Set();
  for (let hunk of patch.hunks) {
    for (let i = hunk.oldStart; i < hunk.oldStart + hunk.oldLines; i++) changedLinesOld.add(i);
    for (let i = hunk.newStart; i < hunk.newStart + hunk.newLines; i++) changedLinesNew.add(i);
  }
  let oldTree = mapLabels(flattenVirtual(parseTree(oldContent, languageId)), () => !1),
    newTree = mapLabels(flattenVirtual(parseTree(newContent, languageId)), () => !1);
  return visitTree(oldTree, node => {
    (node.type === "line" || node.type === "blank") && changedLinesOld.has(node.lineNumber) && (node.label = !0);
  }, "topDown"), visitTree(newTree, node => {
    (node.type === "line" || node.type === "blank") && changedLinesNew.has(node.lineNumber) && (node.label = !0);
  }, "topDown"), [fromTreeWithFocussedLines(oldTree), fromTreeWithFocussedLines(newTree)];
},var init_fromDiff = __esmMin(() => {
  "use strict";

  init_lib();
  init_indentation();
  init_fromIndentationTrees();
  __name(elidableTextForDiff, "elidableTextForDiff");
});