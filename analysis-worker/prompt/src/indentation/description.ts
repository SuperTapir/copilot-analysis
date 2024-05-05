function deparseLine(node) {
  return " ".repeat(node.indentation) + node.sourceLine + `
`;
},function deparseTree(tree) {
  function accumulator(tree, accum) {
    let str = "";
    return isLine(tree) ? str = deparseLine(tree) : isBlank(tree) && (str = `
`), accum + str;
  }
  return __name(accumulator, "accumulator"), foldTree(tree, "", accumulator, "topDown");
},function deparseAndCutTree(tree, cutAt) {
  let cutAtSet = new Set(cutAt),
    cuts = [],
    curUndef = "";
  function visit(tree) {
    tree.label !== void 0 && cutAtSet.has(tree.label) ? (curUndef !== "" && cuts.push({
      label: void 0,
      source: curUndef
    }), cuts.push({
      label: tree.label,
      source: deparseTree(tree)
    }), curUndef = "") : (isLine(tree) && (curUndef += deparseLine(tree)), tree.subs.forEach(visit));
  }
  return __name(visit, "visit"), visit(tree), curUndef !== "" && cuts.push({
    label: void 0,
    source: curUndef
  }), cuts;
},function describeTree(tree, indent = 0) {
  let ind = " ".repeat(indent);
  if (tree === void 0) return "UNDEFINED NODE";
  let children;
  tree.subs === void 0 ? children = "UNDEFINED SUBS" : children = tree.subs.map(child => describeTree(child, indent + 2)).join(`,
`), children === "" ? children = "[]" : children = `[
${children}
      ${ind}]`;
  let prefix = (isVirtual(tree) || isTop(tree) ? "   " : String(tree.lineNumber).padStart(3, " ")) + `:  ${ind}`,
    labelString = tree.label === void 0 ? "" : JSON.stringify(tree.label);
  return isVirtual(tree) || isTop(tree) ? `${prefix}vnode(${tree.indentation}, ${labelString}, ${children})` : isBlank(tree) ? `${prefix}blank(${labelString ?? ""})` : `${prefix}lnode(${tree.indentation}, ${labelString}, ${JSON.stringify(tree.sourceLine)}, ${children})`;
},function encodeTree(tree, indent = "") {
  let labelString = tree.label === void 0 ? "" : `, ${JSON.stringify(tree.label)}`,
    subString = !isBlank(tree) && tree.subs.length > 0 ? `[
${tree.subs.map(node => encodeTree(node, indent + "  ")).join(`, 
`)}
${indent}]` : "[]";
  switch (tree.type) {
    case "blank":
      return `${indent}blankNode(${tree.lineNumber}${labelString})`;
    case "top":
      return `topNode(${subString}${labelString})`;
    case "virtual":
      return `${indent}virtualNode(${tree.indentation}, ${subString}${labelString})`;
    case "line":
      return `${indent}lineNode(${tree.indentation}, ${tree.lineNumber}, "${tree.sourceLine}", ${subString}${labelString})`;
  }
},function firstLineOf(tree) {
  if (isLine(tree) || isBlank(tree)) return tree.lineNumber;
  for (let sub of tree.subs) {
    let firstLine = firstLineOf(sub);
    if (firstLine !== void 0) return firstLine;
  }
},function lastLineOf(tree) {
  let lastLine,
    i = tree.subs.length - 1;
  for (; i >= 0 && lastLine === void 0;) lastLine = lastLineOf(tree.subs[i]), i--;
  return lastLine === void 0 && !isVirtual(tree) && !isTop(tree) ? tree.lineNumber : lastLine;
},var init_description = __esmMin(() => {
  "use strict";

  init_classes();
  init_manipulation();
  __name(deparseLine, "deparseLine");
  __name(deparseTree, "deparseTree");
  __name(deparseAndCutTree, "deparseAndCutTree");
  __name(describeTree, "describeTree");
  __name(encodeTree, "encodeTree");
  __name(firstLineOf, "firstLineOf");
  __name(lastLineOf, "lastLineOf");
});