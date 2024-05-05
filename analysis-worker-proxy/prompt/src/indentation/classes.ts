function virtualNode(indentation, subs, label) {
  return {
    type: "virtual",
    indentation: indentation,
    subs: subs,
    label: label
  };
},__name(virtualNode, "virtualNode");,function topNode(subs) {
  return {
    type: "top",
    indentation: -1,
    subs: subs ?? []
  };
},__name(topNode, "topNode");,function isBlank(tree) {
  return tree.type === "blank";
},__name(isBlank, "isBlank");,function isLine(tree) {
  return tree.type === "line";
},__name(isLine, "isLine");,function isVirtual(tree) {
  return tree.type === "virtual";
},__name(isVirtual, "isVirtual");