var lib_exports = {};,__export(lib_exports, {
  DEFAULT_NUM_OF_SNIPPETS: () => DEFAULT_NUM_OF_SNIPPETS,
  DEFAULT_TREE_TRAVERSAL_CONFIG: () => DEFAULT_TREE_TRAVERSAL_CONFIG,
  ElidableText: () => ElidableText,
  LineEndingOptions: () => LineEndingOptions,
  LineWithValueAndCost: () => LineWithValueAndCost,
  MAX_PROMPT_LENGTH: () => MAX_PROMPT_LENGTH,
  MAX_TOOLTIP_SIGNATURE_TOKENS: () => MAX_TOOLTIP_SIGNATURE_TOKENS,
  NeighboringTabsOption: () => NeighboringTabsOption,
  PromptOptions: () => PromptOptions,
  ProviderTimeoutError: () => ProviderTimeoutError,
  SnippetOrchestrator: () => SnippetOrchestrator,
  SnippetProviderType: () => SnippetProviderType,
  SnippetSemantics: () => SnippetSemantics,
  SuffixMatchOption: () => SuffixMatchOption,
  SuffixOption: () => SuffixOption,
  TokenizerName: () => TokenizerName,
  WASMLanguage: () => WASMLanguage,
  blankNode: () => blankNode,
  buildLabelRules: () => buildLabelRules,
  clearLabels: () => clearLabels,
  clearLabelsIf: () => clearLabelsIf,
  combineClosersAndOpeners: () => combineClosersAndOpeners,
  comment: () => comment,
  commentBlockAsSingles: () => commentBlockAsSingles,
  createWorker: () => createWorker,
  cutTreeAfterLine: () => cutTreeAfterLine,
  deparseAndCutTree: () => deparseAndCutTree,
  deparseLine: () => deparseLine,
  deparseTree: () => deparseTree,
  describeTree: () => describeTree,
  duplicateTree: () => duplicateTree,
  elidableTextForDiff: () => elidableTextForDiff,
  elidableTextForSourceCode: () => elidableTextForSourceCode,
  encodeTree: () => encodeTree,
  firstLineOf: () => firstLineOf,
  flattenVirtual: () => flattenVirtual,
  foldTree: () => foldTree,
  fromTreeWithFocussedLines: () => fromTreeWithFocussedLines,
  fromTreeWithValuedLines: () => fromTreeWithValuedLines,
  getAncestorWithSiblingFunctions: () => getAncestorWithSiblingFunctions,
  getBlockCloseToken: () => getBlockCloseToken,
  getBlockParser: () => getBlockParser,
  getCursorContext: () => getCursorContext,
  getFirstPrecedingComment: () => getFirstPrecedingComment,
  getFunctionPositions: () => getFunctionPositions,
  getLanguage: () => getLanguage,
  getNodeStart: () => getNodeStart,
  getPrompt: () => getPrompt,
  getTokenizer: () => getTokenizer,
  groupBlocks: () => groupBlocks,
  isBlank: () => isBlank,
  isBlockBodyFinished: () => isBlockBodyFinished,
  isEmptyBlockStart: () => isEmptyBlockStart,
  isFunction: () => isFunction,
  isFunctionDefinition: () => isFunctionDefinition,
  isLine: () => isLine,
  isSupportedLanguageId: () => isSupportedLanguageId,
  isTop: () => isTop,
  isVirtual: () => isVirtual,
  labelLines: () => labelLines,
  labelVirtualInherited: () => labelVirtualInherited,
  languageCommentMarkers: () => languageCommentMarkers,
  languageIdToWasmLanguage: () => languageIdToWasmLanguage,
  lastLineOf: () => lastLineOf,
  lineNode: () => lineNode,
  mapLabels: () => mapLabels,
  normalizeLanguageId: () => normalizeLanguageId,
  parseRaw: () => parseRaw,
  parseTree: () => parseTree,
  parseTreeSitter: () => parseTreeSitter,
  parsesWithoutError: () => parsesWithoutError,
  providersErrors: () => providersErrors,
  providersPerformance: () => providersPerformance,
  providersSnippets: () => providersSnippets,
  queryExports: () => queryExports,
  queryFunctions: () => queryFunctions,
  queryGlobalVars: () => queryGlobalVars,
  queryImports: () => queryImports,
  queryPythonIsDocstring: () => queryPythonIsDocstring,
  rebuildTree: () => rebuildTree,
  registerLanguageSpecificParser: () => registerLanguageSpecificParser,
  resetLineNumbers: () => resetLineNumbers,
  topNode: () => topNode,
  virtualNode: () => virtualNode,
  visitTree: () => visitTree,
  visitTreeConditionally: () => visitTreeConditionally
});,function createWorker() {
  return new Xo.Worker((0, Qo.resolve)(__dirname, "..", "dist", "worker.js"), {
    workerData: {
      cwd: process.cwd()
    }
  });
},var import_path,
  import_worker_threads,
  init_lib = __esmMin(() => {
    "use strict";

    import_path = require("path"), import_worker_threads = require("worker_threads");
    init_elidableText();
    init_indentation();
    init_languageMarker();
    init_orchestrator();
    init_parse();
    init_parseBlock();
    init_prompt();
    init_cursorContext();
    init_neighboringFiles();
    init_selectRelevance();
    init_snippets();
    init_snippetProvider();
    init_tokenization();
    __name(createWorker, "createWorker");
  });