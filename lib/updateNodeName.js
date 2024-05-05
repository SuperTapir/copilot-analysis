function updateNodeName(node, name) {
  if (node.type === "VariableDeclarator") {
    node.id.name = name;
  } else if (node.type === "Identifier") {
    node.name = name;
  } else if (node.type === "CallExpression") {
    updateNodeName(node.callee, name);
  } else if (node.type === "ArrowFunctionExpression") {
    node.params[0].name = name;
  } else if (node.type === "ExpressionStatement") {
    updateNodeName(node.expression, name);
  } else if (node.type === "AssignmentExpression") {
    updateNodeName(node.left, name);
  } else if (node.type === "MemberExpression") {
    updateNodeName(node.object, name);
  } else if (node.type === "BinaryExpression") {
    updateNodeName(node.left, name);
  } else if (node.type === "ConditionalExpression") {
    updateNodeName(node.test, name);
  } else if (node.type === "LogicalExpression") {
    updateNodeName(node.left, name);
  } else if (node.type === "SequenceExpression") {
    updateNodeName(node.expressions[0], name);
  } else if (node.type === "UpdateExpression") {
    updateNodeName(node.argument, name);
  } else if (node.type === "StringLiteral") {
    node.value = name;
  } else if (node.type === "AssignmentPattern") {
    updateNodeName(node.left, name);
  } else if (node.type === "ReturnStatement") {
    updateNodeName(node.argument, name);
  } else if (node.type === "BlockStatement") {
    updateNodeName(node.body[0], name);
  } else if (node.type === "UnaryExpression") {
    updateNodeName(node.argument, name);
  } else if (node.type === "ObjectProperty") {
    updateNodeName(node.key, name);
  } else if (node.type === "EmptyStatement") {
    // 好像是start和end标记
    // console.log(name);
  } else if (node.type === "NumericLiteral") {
    node.value = name;
  } else if (node.type === "ThisExpression") {
    // console.log(name);
  } else if (node.type === "ForStatement") {
    updateNodeName(node.init, name);
  } else if (node.type === "OptionalMemberExpression") {
    updateNodeName(node.object, name);
  } else if (node.type === "OptionalCallExpression") {
    updateNodeName(node.callee, name);
  } else if (node.type === "LabeledStatement") {
    updateNodeName(node.label, name);
  } else if (node.type === "ClassPrivateProperty") {
    updateNodeName(node.key, name);
  } else if (node.type === "PrivateName") {
    updateNodeName(node.id, name);
  } else if (node.type === "ClassPrivateMethod") {
    updateNodeName(node.key, name);
  } else if (node.type === "VariableDeclaration") {
    updateNodeName(node.declarations[0], name);
  } else if (node.type === "IfStatement") {
    updateNodeName(node.test, name);
  } else if (node.type === "TryStatement") {
    updateNodeName(node.block, name);
  } else if (node.type === "SwitchStatement") {
    updateNodeName(node.discriminant, name);
  } else {
    // console.log(node);
  }
}

module.exports = updateNodeName;