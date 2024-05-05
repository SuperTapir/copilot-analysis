function labelLines(tree, labelRules) {
  function visitor(tree) {
    if (isLine(tree)) {
      let rule = labelRules.find(rule => rule.matches(tree.sourceLine));
      rule && (tree.label = rule.label);
    }
  }
  __name(visitor, "visitor"), visitTree(tree, visitor, "bottomUp");
},__name(labelLines, "labelLines");,function labelVirtualInherited(tree) {
  function visitor(tree) {
    if (isVirtual(tree) && tree.label === void 0) {
      let subs = tree.subs.filter(sub => !isBlank(sub));
      subs.length === 1 && (tree.label = subs[0].label);
    }
  }
  __name(visitor, "visitor"), visitTree(tree, visitor, "bottomUp");
},__name(labelVirtualInherited, "labelVirtualInherited");,function buildLabelRules(ruleMap) {
  return Object.keys(ruleMap).map(key => {
    let matches;
    return ruleMap[key].test ? matches = __name(sourceLine => ruleMap[key].test(sourceLine), "matches") : matches = ruleMap[key], {
      matches: matches,
      label: key
    };
  });
},__name(buildLabelRules, "buildLabelRules");,function combineClosersAndOpeners(tree) {
  let returnTree = rebuildTree(tree, __name(function (tree) {
    if (tree.subs.length === 0 || tree.subs.findIndex(sub => sub.label === "closer" || sub.label === "opener") === -1) return tree;
    let newSubs = [],
      lastNew;
    for (let i = 0; i < tree.subs.length; i++) {
      let sub = tree.subs[i],
        directOlderSibling = tree.subs[i - 1];
      if (sub.label === "opener" && directOlderSibling !== void 0 && isLine(directOlderSibling)) directOlderSibling.subs.push(sub), sub.subs.forEach(sub => directOlderSibling.subs.push(sub)), sub.subs = [];else if (sub.label === "closer" && lastNew !== void 0 && (isLine(sub) || isVirtual(sub)) && sub.indentation >= lastNew.indentation) {
        let j = newSubs.length - 1;
        for (; j > 0 && isBlank(newSubs[j]);) j -= 1;
        if (lastNew.subs.push(...newSubs.splice(j + 1)), sub.subs.length > 0) {
          let firstNonVirtual = lastNew.subs.findIndex(sub => sub.label !== "newVirtual"),
            subsToKeep = lastNew.subs.slice(0, firstNonVirtual),
            subsToWrap = lastNew.subs.slice(firstNonVirtual),
            wrappedSubs = subsToWrap.length > 0 ? [virtualNode(sub.indentation, subsToWrap, "newVirtual")] : [];
          lastNew.subs = [...subsToKeep, ...wrappedSubs, sub];
        } else lastNew.subs.push(sub);
      } else newSubs.push(sub), isBlank(sub) || (lastNew = sub);
    }
    return tree.subs = newSubs, tree;
  }, "rebuilder"));
  return clearLabelsIf(tree, arg => arg === "newVirtual"), returnTree;
},__name(combineClosersAndOpeners, "combineClosersAndOpeners");,function groupBlocks(tree, isDelimiter = isBlank, label) {
  return rebuildTree(tree, __name(function (tree) {
    if (tree.subs.length <= 1) return tree;
    let newSubs = [],
      nodesSinceLastFlush = [],
      currentBlockIndentation,
      lastNodeWasDelimiter = !1;
    function flushBlockIntoNewSubs(final = !1) {
      if (currentBlockIndentation !== void 0 && (newSubs.length > 0 || !final)) {
        let virtual = virtualNode(currentBlockIndentation, nodesSinceLastFlush, label);
        newSubs.push(virtual);
      } else nodesSinceLastFlush.forEach(node => newSubs.push(node));
    }
    __name(flushBlockIntoNewSubs, "flushBlockIntoNewSubs");
    for (let i = 0; i < tree.subs.length; i++) {
      let sub = tree.subs[i],
        subIsDelimiter = isDelimiter(sub);
      !subIsDelimiter && lastNodeWasDelimiter && (flushBlockIntoNewSubs(), nodesSinceLastFlush = []), lastNodeWasDelimiter = subIsDelimiter, nodesSinceLastFlush.push(sub), isBlank(sub) || (currentBlockIndentation = currentBlockIndentation ?? sub.indentation);
    }
    return flushBlockIntoNewSubs(!0), tree.subs = newSubs, tree;
  }, "rebuilder"));
},__name(groupBlocks, "groupBlocks");,function flattenVirtual(tree) {
  return rebuildTree(tree, __name(function (tree) {
    return isVirtual(tree) && tree.label === void 0 && tree.subs.length <= 1 ? tree.subs.length === 0 ? void 0 : tree.subs[0] : (tree.subs.length === 1 && isVirtual(tree.subs[0]) && tree.subs[0].label === void 0 && (tree.subs = tree.subs[0].subs), tree);
  }, "rebuilder"));
},__name(flattenVirtual, "flattenVirtual");,var _genericLabelRules = {
    opener: /^[\[({]/,
    closer: /^[\])}]/
  },
  genericLabelRules = buildLabelRules(_genericLabelRules),
  LANGUAGE_SPECIFIC_PARSERS = {};,function registerLanguageSpecificParser(language, parser) {
  LANGUAGE_SPECIFIC_PARSERS[language] = parser;
},__name(registerLanguageSpecificParser, "registerLanguageSpecificParser");