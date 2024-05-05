function virtualNode(indentation, subs, label) {
  return {
    type: "virtual",
    indentation: indentation,
    subs: subs,
    label: label
  };
},function lineNode(indentation, lineNumber, sourceLine, subs, label) {
  if (sourceLine === "") throw new Error("Cannot create a line node with an empty source line");
  return {
    type: "line",
    indentation: indentation,
    lineNumber: lineNumber,
    sourceLine: sourceLine,
    subs: subs,
    label: label
  };
},function blankNode(line) {
  return {
    type: "blank",
    lineNumber: line,
    subs: []
  };
},function topNode(subs) {
  return {
    type: "top",
    indentation: -1,
    subs: subs ?? []
  };
},function isBlank(tree) {
  return tree.type === "blank";
},function isLine(tree) {
  return tree.type === "line";
},function isVirtual(tree) {
  return tree.type === "virtual";
},function isTop(tree) {
  return tree.type === "top";
},function cutTreeAfterLine(tree, lineNumber) {
  function cut(tree) {
    if (!isVirtual(tree) && !isTop(tree) && tree.lineNumber === lineNumber) return tree.subs = [], !0;
    for (let i = 0; i < tree.subs.length; i++) if (cut(tree.subs[i])) return tree.subs = tree.subs.slice(0, i + 1), !0;
    return !1;
  }
  __name(cut, "cut"), cut(tree);
},function duplicateTree(tree) {
  return JSON.parse(JSON.stringify(tree));
},var init_classes = __esmMin(() => {
  "use strict";

  __name(virtualNode, "virtualNode");
  __name(lineNode, "lineNode");
  __name(blankNode, "blankNode");
  __name(topNode, "topNode");
  __name(isBlank, "isBlank");
  __name(isLine, "isLine");
  __name(isVirtual, "isVirtual");
  __name(isTop, "isTop");
  __name(cutTreeAfterLine, "cutTreeAfterLine");
  __name(duplicateTree, "duplicateTree");
});