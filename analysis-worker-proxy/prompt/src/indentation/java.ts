var _javaLabelRules = {
    package: /^package /,
    import: /^import /,
    class: /\bclass /,
    interface: /\binterface /,
    javadoc: /^\/\*\*/,
    comment_multi: /^\/\*[^*]/,
    comment_single: /^\/\//,
    annotation: /^@/,
    opener: /^[\[({]/,
    closer: /^[\])}]/
  },
  javaLabelRules = buildLabelRules(_javaLabelRules);,function processJava(originalTree) {
  let tree = originalTree;
  return labelLines(tree, javaLabelRules), tree = combineClosersAndOpeners(tree), tree = flattenVirtual(tree), labelVirtualInherited(tree), visitTree(tree, tree => {
    if (tree.label === "class" || tree.label === "interface") for (let sub of tree.subs) !isBlank(sub) && (sub.label === void 0 || sub.label === "annotation") && (sub.label = "member");
  }, "bottomUp"), tree;
},__name(processJava, "processJava");