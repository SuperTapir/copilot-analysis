function elidableTextForSourceCode(contents, focusOnLastLeaf = !0, focusOnFirstLine = !0) {
  let tree = typeof contents == "string" ? parseTree(contents) : parseTree(contents.source, contents.languageId);
  flattenVirtual(tree);
  let treeWithFocussedLines = mapLabels(tree, label => focusOnLastLeaf && label !== "closer");
  return visitTree(treeWithFocussedLines, node => {
    node.label === void 0 && (node.label = focusOnLastLeaf && node.label !== !1);
  }, "topDown"), focusOnLastLeaf && visitTree(treeWithFocussedLines, node => {
    if (node.label) {
      let foundLastTrue = !1;
      for (let subnode of [...node.subs].reverse()) subnode.label && !foundLastTrue ? foundLastTrue = !0 : subnode.label = !1;
    } else for (let subnode of node.subs) subnode.label = !1;
    node.subs.length > 0 && (node.label = !1);
  }, "topDown"), focusOnFirstLine && visitTree(treeWithFocussedLines, node => {
    node.label ||= (isLine(node) || isBlank(node)) && node.lineNumber == 0;
  }, "topDown"), fromTreeWithFocussedLines(treeWithFocussedLines);
},var init_fromSourceCode = __esmMin(() => {
  "use strict";

  init_indentation();
  init_fromIndentationTrees();
  __name(elidableTextForSourceCode, "elidableTextForSourceCode");
});