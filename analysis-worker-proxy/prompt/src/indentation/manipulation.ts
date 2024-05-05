function clearLabelsIf(tree, condition) {
  return visitTree(tree, tree => {
    tree.label = tree.label ? condition(tree.label) ? void 0 : tree.label : void 0;
  }, "bottomUp"), tree;
},__name(clearLabelsIf, "clearLabelsIf");,function visitTree(tree, visitor, direction) {
  function _visit(tree) {
    direction === "topDown" && visitor(tree), tree.subs.forEach(subtree => {
      _visit(subtree);
    }), direction === "bottomUp" && visitor(tree);
  }
  __name(_visit, "_visit"), _visit(tree);
},__name(visitTree, "visitTree");,function rebuildTree(tree, visitor, skip) {
  let rebuild = __name(tree => {
      if (skip !== void 0 && skip(tree)) return tree;
      {
        let newSubs = tree.subs.map(rebuild).filter(sub => sub !== void 0);
        return tree.subs = newSubs, visitor(tree);
      }
    }, "rebuild"),
    rebuilt = rebuild(tree);
  return rebuilt !== void 0 ? rebuilt : topNode();
},__name(rebuildTree, "rebuildTree");