function announceSnippet(snippet, targetDocLanguageId, defaultCommentMarker) {
  let semantics = snippetSemanticsToString[snippet.semantics],
    headlinedSnippet = (snippet.relativePath ? `Compare this ${semantics} from ${snippet.relativePath}:` : `Compare this ${semantics}:`) + `
` + snippet.snippet;
  return headlinedSnippet.endsWith(`
`) || (headlinedSnippet += `
`), commentBlockAsSingles(headlinedSnippet, targetDocLanguageId, defaultCommentMarker);
},function sortSnippetsDescending(snippets) {
  snippets.sort((a, b) => b.score - a.score);
},function selectSnippets(snippets, numberOfSnippets, promptPriorityList) {
  if (numberOfSnippets == 0) return [];
  let snippetsWithElementKind = snippets.map(snippet => ({
      ...snippet,
      kind: kindForSnippetProviderType(snippet.provider)
    })),
    allSnippets = [];
  return promptPriorityList.rankedList.forEach(promptElementKind => {
    let snippets = snippetsWithElementKind.filter(({
      kind: snippetKind
    }) => snippetKind === promptElementKind);
    sortSnippetsDescending(snippets), allSnippets.push(...snippets);
  }), allSnippets.slice(0, numberOfSnippets);
},function processSnippetsForWishlist(snippets, targetDocLanguageId, tokenizer, promptPriorityList, defaultCommentMarker, totalPrioritized) {
  let processedSnippets = selectSnippets(snippets, totalPrioritized, promptPriorityList).map(snippet => {
    let announced = announceSnippet(snippet, targetDocLanguageId, defaultCommentMarker),
      tokens = tokenizer.tokenLength(announced);
    return {
      announcedSnippet: announced,
      provider: snippet.provider,
      score: snippet.score,
      tokens: tokens,
      relativePath: snippet.relativePath
    };
  });
  return sortSnippetsDescending(processedSnippets), processedSnippets.reverse(), processedSnippets;
},var SnippetProviderType,
  SnippetSemantics,
  snippetSemanticsToString,
  init_snippets = __esmMin(() => {
    "use strict";

    init_languageMarker();
    init_wishlist();
    SnippetProviderType = (s => (SnippetProviderType.NeighboringTabs = "neighboring-tabs", SnippetProviderType.Retrieval = "retrieval", SnippetProviderType.Language = "language", SnippetProviderType.Path = "path", SnippetProviderType.TooltipSignature = "tooltip-signature", SnippetProviderType))($ || {}), SnippetSemantics = (c => (SnippetSemantics.Function = "function", SnippetSemantics.Snippet = "snippet", SnippetSemantics.Variable = "variable", SnippetSemantics.Parameter = "parameter", SnippetSemantics.Method = "method", SnippetSemantics.Class = "class", SnippetSemantics.Module = "module", SnippetSemantics.Alias = "alias", SnippetSemantics.Enum = "enum member", SnippetSemantics.Interface = "interface", SnippetSemantics))(me || {}), snippetSemanticsToString = {
      function: "function",
      snippet: "snippet",
      variable: "variable",
      parameter: "parameter",
      method: "method",
      class: "class",
      module: "module",
      alias: "alias",
      "enum member": "enum member",
      interface: "interface"
    };
    __name(announceSnippet, "announceSnippet");
    __name(sortSnippetsDescending, "sortSnippetsDescending");
    __name(selectSnippets, "selectSnippets");
    __name(processSnippetsForWishlist, "processSnippetsForWishlist");
  });