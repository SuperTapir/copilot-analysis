var _MarkdownLabelRules = {
    heading: /^# /,
    subheading: /^## /,
    subsubheading: /### /
  },
  MarkdownLabelRules = buildLabelRules(_MarkdownLabelRules);,function processMarkdown(originalTree) {
  let tree = originalTree;
  if (labelLines(tree, MarkdownLabelRules), isBlank(tree)) return tree;
  function headingLevel(sub) {
    if (sub.label === "heading") return 1;
    if (sub.label === "subheading") return 2;
    if (sub.label === "subsubheading") return 3;
  }
  __name(headingLevel, "headingLevel");
  let currentHierarchy = [tree],
    oldTreeSubs = [...tree.subs];
  tree.subs = [];
  for (let sub of oldTreeSubs) {
    let level = headingLevel(sub);
    if (level === void 0 || isBlank(sub)) currentHierarchy[currentHierarchy.length - 1].subs.push(sub);else {
      for (; currentHierarchy.length < level;) currentHierarchy.push(currentHierarchy[currentHierarchy.length - 1]);
      for (currentHierarchy[level - 1].subs.push(sub), currentHierarchy[level] = sub; currentHierarchy.length > level + 1;) currentHierarchy.pop();
    }
  }
  return tree = groupBlocks(tree), tree = flattenVirtual(tree), labelVirtualInherited(tree), tree;
},__name(processMarkdown, "processMarkdown");