var import_fs = require("fs"),
  import_path = require("path"),
  import_web_tree_sitter = He(Gt());,var languageIdToWasmLanguageMapping = {
  python: "python",
  javascript: "javascript",
  javascriptreact: "javascript",
  jsx: "javascript",
  typescript: "typescript",
  typescriptreact: "tsx",
  go: "go",
  ruby: "ruby"
};,function languageIdToWasmLanguage(languageId) {
  if (!(languageId in languageIdToWasmLanguageMapping)) throw new Error(`Unrecognized language: ${languageId}`);
  return languageIdToWasmLanguageMapping[languageId];
},__name(languageIdToWasmLanguage, "languageIdToWasmLanguage");,var requireCall = '(call_expression function: ((identifier) @req (#eq? @req "require")))',
  declaratorWithRequire = `(variable_declarator value: ${requireCall})`,
  commonJsImport = `
    (lexical_declaration ${declaratorWithRequire}+)
    (variable_declaration ${declaratorWithRequire}+)
`,
  tsImportQueries = [[`(program [ ${commonJsImport} ] @import)`], ["(program [ (import_statement) (import_alias) ] @import)"]],
  importsQuery = {
    python: [["(module (future_import_statement) @import)"], ["(module (import_statement) @import)"], ["(module (import_from_statement) @import)"]],
    javascript: [[`(program [ ${commonJsImport} ] @import)`], ["(program [ (import_statement) ] @import)"]],
    typescript: tsImportQueries,
    tsx: tsImportQueries,
    go: [],
    ruby: []
  };,var jsFunctionTypes = ["function", "function_declaration", "generator_function", "generator_function_declaration", "method_definition", "arrow_function"],
  functionTypes = {
    python: new Set(["function_definition"]),
    javascript: new Set(jsFunctionTypes),
    typescript: new Set(jsFunctionTypes),
    tsx: new Set(jsFunctionTypes),
    go: new Set(["function_declaration", "method_declaration"]),
    ruby: new Set(["method", "singleton_method"])
  };,var loadedLanguages = new Map();,async function loadWasmLanguage(language) {
  await Ne.Parser.init();
  let wasmBytes;
  try {
    wasmBytes = await Xt.fsp.readFile((0, Yt.resolve)(__dirname, "..", "dist", `tree-sitter-${language}.wasm`));
  } catch (e) {
    if (typeof e.code == "string" && e instanceof Error && e.name === "Error") {
      let error = new Error(`Could not load tree-sitter-${language}.wasm`);
      throw error.code = "CopilotPromptLoadFailure", error.cause = e, error;
    }
    throw e;
  }
  return Ne.Parser.Language.load(wasmBytes);
},__name(loadWasmLanguage, "loadWasmLanguage");,async function getLanguage(language) {
  let wasmLanguage = languageIdToWasmLanguage(language);
  if (!loadedLanguages.has(wasmLanguage)) {
    let loadedLang = await loadWasmLanguage(wasmLanguage);
    loadedLanguages.set(wasmLanguage, loadedLang);
  }
  return loadedLanguages.get(wasmLanguage);
},__name(getLanguage, "getLanguage");,async function parseTreeSitter(language, source) {
  let treeSitterLanguage = await getLanguage(language),
    parser = new Ne.Parser();
  parser.setLanguage(treeSitterLanguage);
  let parsedTree = parser.parse(source);
  return parser.delete(), parsedTree;
},__name(parseTreeSitter, "parseTreeSitter");,function innerQuery(queries, root) {
  let matches = [];
  for (let query of queries) {
    if (!query[1]) {
      let lang = root.tree.getLanguage();
      query[1] = lang.query(query[0]);
    }
    matches.push(...query[1].matches(root));
  }
  return matches;
},__name(innerQuery, "innerQuery");,var docstringQuery = [`[
    (class_definition (block (expression_statement (string))))
    (function_definition (block (expression_statement (string))))
]`];,function queryPythonIsDocstring(blockNode) {
  return innerQuery([docstringQuery], blockNode).length == 1;
},__name(queryPythonIsDocstring, "queryPythonIsDocstring");