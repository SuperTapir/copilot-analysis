function fromTreeWithFocussedLines(tree, config = DEFAULT_TREE_TRAVERSAL_CONFIG) {
  let treeWithDistances = mapLabels(tree, x => x ? 1 : void 0);
  return visitTree(treeWithDistances, node => {
    if (isBlank(node)) return;
    let maxChildLabel = node.subs.reduce((memo, child) => Math.max(memo, child.label ?? 0), 0);
    node.label = Math.max(node.label ?? 0, maxChildLabel * config.worthUp);
  }, "bottomUp"), visitTree(treeWithDistances, node => {
    if (isBlank(node)) return;
    let values = node.subs.map(sub => sub.label ?? 0),
      new_values = [...values];
    for (let i = 0; i < values.length; i++) values[i] !== 0 && (new_values = new_values.map((v, j) => Math.max(v, Math.pow(config.worthSibling, Math.abs(i - j)) * values[i])));
    let nodeLabel = node.label;
    nodeLabel !== void 0 && (new_values = new_values.map(v => Math.max(v, config.worthDown * nodeLabel))), node.subs.forEach((sub, i) => sub.label = new_values[i]);
  }, "topDown"), fromTreeWithValuedLines(treeWithDistances);
},function fromTreeWithValuedLines(tree) {
  let valuedLines = foldTree(tree, [], (node, acc) => ((node.type === "line" || node.type === "blank") && acc.push(node.type === "line" ? [deparseLine(node).trimEnd(), node.label ?? 0] : ["", node.label ?? 0]), acc), "topDown");
  return new ElidableText(valuedLines);
},var DEFAULT_TREE_TRAVERSAL_CONFIG,
  init_fromIndentationTrees = __esmMin(() => {
    "use strict";

    init_indentation();
    init_elidableText();
    DEFAULT_TREE_TRAVERSAL_CONFIG = {
      worthUp: .9,
      worthSibling: .88,
      worthDown: .8
    };
    __name(fromTreeWithFocussedLines, "fromTreeWithFocussedLines");
    __name(fromTreeWithValuedLines, "fromTreeWithValuedLines");
  });