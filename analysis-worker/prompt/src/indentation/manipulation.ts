function clearLabels(tree) {
  return visitTree(tree, tree => {
    tree.label = void 0;
  }, "bottomUp"), tree;
},function clearLabelsIf(tree, condition) {
  return visitTree(tree, tree => {
    tree.label = tree.label ? condition(tree.label) ? void 0 : tree.label : void 0;
  }, "bottomUp"), tree;
},function mapLabels(tree, map) {
  switch (tree.type) {
    case "line":
    case "virtual":
      let newSubs = tree.subs.map(sub => mapLabels(sub, map));
      return {
        ...tree,
        subs: newSubs,
        label: tree.label ? map(tree.label) : void 0
      };
    case "blank":
      return {
        ...tree,
        label: tree.label ? map(tree.label) : void 0
      };
    case "top":
      return {
        ...tree,
        subs: tree.subs.map(sub => mapLabels(sub, map)),
        label: tree.label ? map(tree.label) : void 0
      };
  }
},function resetLineNumbers(tree) {
  let lineNumber = 0;
  function visitor(tree) {
    !isVirtual(tree) && !isTop(tree) && (tree.lineNumber = lineNumber, lineNumber++);
  }
  __name(visitor, "visitor"), visitTree(tree, visitor, "topDown");
},function visitTree(tree, visitor, direction) {
  function _visit(tree) {
    direction === "topDown" && visitor(tree), tree.subs.forEach(subtree => {
      _visit(subtree);
    }), direction === "bottomUp" && visitor(tree);
  }
  __name(_visit, "_visit"), _visit(tree);
},function visitTreeConditionally(tree, visitor, direction) {
  function _visit(tree) {
    if (direction === "topDown" && !visitor(tree)) return !1;
    let shouldContinue = !0;
    return tree.subs.forEach(subtree => {
      shouldContinue = shouldContinue && _visit(subtree);
    }), direction === "bottomUp" && (shouldContinue = shouldContinue && visitor(tree)), shouldContinue;
  }
  __name(_visit, "_visit"), _visit(tree);
},function foldTree(tree, init, accumulator, direction) {
  let acc = init;
  function visitor(tree) {
    acc = accumulator(tree, acc);
  }
  return __name(visitor, "visitor"), visitTree(tree, visitor, direction), acc;
},function rebuildTree(tree, visitor, skip) {
  let rebuild = __name(tree => {
      if (skip !== void 0 && skip(tree)) return tree;
      {
        let newSubs = tree.subs.map(rebuild).filter(sub => sub !== void 0);
        return tree.subs = newSubs, visitor(tree);
      }
    }, "rebuild"),
    rebuilt = rebuild(tree);
  return rebuilt !== void 0 ? rebuilt : topNode();
},var init_manipulation = __esmMin(() => {
  "use strict";

  init_classes();
  __name(clearLabels, "clearLabels");
  __name(clearLabelsIf, "clearLabelsIf");
  __name(mapLabels, "mapLabels");
  __name(resetLineNumbers, "resetLineNumbers");
  __name(visitTree, "visitTree");
  __name(visitTreeConditionally, "visitTreeConditionally");
  __name(foldTree, "foldTree");
  __name(rebuildTree, "rebuildTree");
});