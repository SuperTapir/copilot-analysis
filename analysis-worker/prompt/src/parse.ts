function isSupportedLanguageId(languageId) {
  return languageId in languageIdToWasmLanguageMapping;
},function languageIdToWasmLanguage(languageId) {
  if (!(languageId in languageIdToWasmLanguageMapping)) throw new Error(`Unrecognized language: ${languageId}`);
  return languageIdToWasmLanguageMapping[languageId];
},async function loadWasmLanguage(language) {
  await Vt.Parser.init();
  let wasmBytes;
  try {
    wasmBytes = await Vo.fsp.readFile((0, qo.resolve)(__dirname, "..", "dist", `tree-sitter-${language}.wasm`));
  } catch (e) {
    if (typeof e.code == "string" && e instanceof Error && e.name === "Error") {
      let error = new Error(`Could not load tree-sitter-${language}.wasm`);
      throw error.code = "CopilotPromptLoadFailure", error.cause = e, error;
    }
    throw e;
  }
  return Vt.Parser.Language.load(wasmBytes);
},async function getLanguage(language) {
  let wasmLanguage = languageIdToWasmLanguage(language);
  if (!loadedLanguages.has(wasmLanguage)) {
    let loadedLang = await loadWasmLanguage(wasmLanguage);
    loadedLanguages.set(wasmLanguage, loadedLang);
  }
  return loadedLanguages.get(wasmLanguage);
},async function parseTreeSitter(language, source) {
  let treeSitterLanguage = await getLanguage(language),
    parser = new Vt.Parser();
  parser.setLanguage(treeSitterLanguage);
  let parsedTree = parser.parse(source);
  return parser.delete(), parsedTree;
},async function parsesWithoutError(language, source) {
  let tree = await parseTreeSitter(language, source),
    result = !tree.rootNode.hasError();
  return tree.delete(), result;
},function getBlockCloseToken(language) {
  switch (languageIdToWasmLanguage(language)) {
    case "python":
      return null;
    case "javascript":
    case "typescript":
    case "tsx":
    case "go":
      return "}";
    case "ruby":
      return "end";
  }
},function innerQuery(queries, root) {
  let matches = [];
  for (let query of queries) {
    if (!query[1]) {
      let lang = root.tree.getLanguage();
      query[1] = lang.query(query[0]);
    }
    matches.push(...query[1].matches(root));
  }
  return matches;
},function queryFunctions(language, root) {
  let queries = functionQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryImports(language, root) {
  let queries = importsQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryExports(language, root) {
  let queries = exportsQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryGlobalVars(language, root) {
  let queries = globalVarsQuery[languageIdToWasmLanguage(language)];
  return innerQuery(queries, root);
},function queryPythonIsDocstring(blockNode) {
  return innerQuery([docstringQuery], blockNode).length == 1;
},function getAncestorWithSiblingFunctions(language, nd) {
  let check = isFunctionParent[languageIdToWasmLanguage(language)];
  for (; nd.parent;) {
    if (check(nd.parent)) return nd;
    nd = nd.parent;
  }
  return nd.parent ? nd : null;
},function isFunction(language, nd) {
  return functionTypes[languageIdToWasmLanguage(language)].has(nd.type);
},function isFunctionDefinition(language, nd) {
  switch (languageIdToWasmLanguage(language)) {
    case "python":
    case "go":
    case "ruby":
      return isFunction(language, nd);
    case "javascript":
    case "typescript":
    case "tsx":
      if (nd.type === "function_declaration" || nd.type === "generator_function_declaration" || nd.type === "method_definition") return !0;
      if (nd.type === "lexical_declaration" || nd.type === "variable_declaration") {
        if (nd.namedChildCount > 1) return !1;
        let declarator = nd.namedChild(0);
        if (declarator == null) return !1;
        let init = declarator.namedChild(1);
        return init !== null && isFunction(language, init);
      }
      if (nd.type === "expression_statement") {
        let expr = nd.namedChild(0);
        if (expr?.type === "assignment_expression") {
          let rhs = expr.namedChild(1);
          return rhs !== null && isFunction(language, rhs);
        }
      }
      return !1;
  }
},function getFirstPrecedingComment(nd) {
  let cur = nd;
  for (; cur.previousSibling?.type === "comment";) {
    let prev = cur.previousSibling;
    if (prev.endPosition.row < cur.startPosition.row - 1) break;
    cur = prev;
  }
  return cur?.type === "comment" ? cur : null;
},async function getFunctionPositions(language, source) {
  let tree = await parseTreeSitter(language, source),
    positions = queryFunctions(language, tree.rootNode).map(res => {
      let fn = res.captures.find(c => c.name === "function").node;
      return {
        startIndex: fn.startIndex,
        endIndex: fn.endIndex
      };
    });
  return tree.delete(), positions;
},var import_fs,
  import_path,
  import_web_tree_sitter,
  WASMLanguage,
  languageIdToWasmLanguageMapping,
  jsFunctionQuery,
  functionQuery,
  requireCall,
  declaratorWithRequire,
  commonJsImport,
  tsImportQueries,
  importsQuery,
  jsExportQueries,
  exportsQuery,
  globalVarsQuery,
  jsFunctionTypes,
  functionTypes,
  isFunctionParent,
  loadedLanguages,
  docstringQuery,
  init_parse = __esmMin(() => {
    "use strict";

    import_fs = require("fs"), import_path = require("path"), import_web_tree_sitter = $t(Wo()), WASMLanguage = (a => (WASMLanguage.Python = "python", WASMLanguage.JavaScript = "javascript", WASMLanguage.TypeScript = "typescript", WASMLanguage.TSX = "tsx", WASMLanguage.Go = "go", WASMLanguage.Ruby = "ruby", WASMLanguage))(Ho || {}), languageIdToWasmLanguageMapping = {
      python: "python",
      javascript: "javascript",
      javascriptreact: "javascript",
      jsx: "javascript",
      typescript: "typescript",
      typescriptreact: "tsx",
      go: "go",
      ruby: "ruby"
    };
    __name(isSupportedLanguageId, "isSupportedLanguageId");
    __name(languageIdToWasmLanguage, "languageIdToWasmLanguage");
    jsFunctionQuery = `[
    (function body: (statement_block) @body)
    (function_declaration body: (statement_block) @body)
    (generator_function body: (statement_block) @body)
    (generator_function_declaration body: (statement_block) @body)
    (method_definition body: (statement_block) @body)
    (arrow_function body: (statement_block) @body)
  ] @function`, functionQuery = {
      python: [[`(function_definition body: (block
             (expression_statement (string))? @docstring) @body) @function`], ['(ERROR ("def" (identifier) (parameters))) @function']],
      javascript: [[jsFunctionQuery]],
      typescript: [[jsFunctionQuery]],
      tsx: [[jsFunctionQuery]],
      go: [[`[
            (function_declaration body: (block) @body)
            (method_declaration body: (block) @body)
          ] @function`]],
      ruby: [[`[
            (method name: (_) parameters: (method_parameters)? @params [(_)+ "end"] @body)
            (singleton_method name: (_) parameters: (method_parameters)? @params [(_)+ "end"] @body)
          ] @function`]]
    }, requireCall = '(call_expression function: ((identifier) @req (#eq? @req "require")))', declaratorWithRequire = `(variable_declarator value: ${requireCall})`, commonJsImport = `
    (lexical_declaration ${declaratorWithRequire}+)
    (variable_declaration ${declaratorWithRequire}+)
`, tsImportQueries = [[`(program [ ${commonJsImport} ] @import)`], ["(program [ (import_statement) (import_alias) ] @import)"]], importsQuery = {
      python: [["(module (future_import_statement) @import)"], ["(module (import_statement) @import)"], ["(module (import_from_statement) @import)"]],
      javascript: [[`(program [ ${commonJsImport} ] @import)`], ["(program [ (import_statement) ] @import)"]],
      typescript: tsImportQueries,
      tsx: tsImportQueries,
      go: [],
      ruby: []
    }, jsExportQueries = [["(program (export_statement) @export)"]], exportsQuery = {
      python: [],
      javascript: jsExportQueries,
      typescript: jsExportQueries,
      tsx: jsExportQueries,
      go: [],
      ruby: []
    }, globalVarsQuery = {
      python: [["(module (global_statement) @globalVar)"], ["(module (expression_statement) @globalVar)"]],
      javascript: [],
      typescript: [],
      tsx: [],
      go: [],
      ruby: []
    }, jsFunctionTypes = ["function", "function_declaration", "generator_function", "generator_function_declaration", "method_definition", "arrow_function"], functionTypes = {
      python: new Set(["function_definition"]),
      javascript: new Set(jsFunctionTypes),
      typescript: new Set(jsFunctionTypes),
      tsx: new Set(jsFunctionTypes),
      go: new Set(["function_declaration", "method_declaration"]),
      ruby: new Set(["method", "singleton_method"])
    }, isFunctionParent = {
      python: nd => nd.type === "module" || nd.type === "block" && nd.parent?.type === "class_definition",
      javascript: nd => nd.type === "program" || nd.type === "class_body",
      typescript: nd => nd.type === "program" || nd.type === "class_body",
      tsx: nd => nd.type === "program" || nd.type === "class_body",
      go: nd => nd.type === "source_file",
      ruby: nd => nd.type === "program" || nd.type === "class"
    }, loadedLanguages = new Map();
    __name(loadWasmLanguage, "loadWasmLanguage");
    __name(getLanguage, "getLanguage");
    __name(parseTreeSitter, "parseTreeSitter");
    __name(parsesWithoutError, "parsesWithoutError");
    __name(getBlockCloseToken, "getBlockCloseToken");
    __name(innerQuery, "innerQuery");
    __name(queryFunctions, "queryFunctions");
    __name(queryImports, "queryImports");
    __name(queryExports, "queryExports");
    __name(queryGlobalVars, "queryGlobalVars");
    docstringQuery = [`[
    (class_definition (block (expression_statement (string))))
    (function_definition (block (expression_statement (string))))
]`];
    __name(queryPythonIsDocstring, "queryPythonIsDocstring");
    __name(getAncestorWithSiblingFunctions, "getAncestorWithSiblingFunctions");
    __name(isFunction, "isFunction");
    __name(isFunctionDefinition, "isFunctionDefinition");
    __name(getFirstPrecedingComment, "getFirstPrecedingComment");
    __name(getFunctionPositions, "getFunctionPositions");
  });