function getMatcher(doc, selection) {
  return FixedWindowSizeJaccardMatcher.FACTORY(selection.snippetLength).to(doc);
},async function getNeighborSnippets(doc, neighbors, options) {
  let selection = {
      ...neighborOptionToSelection[options]
    },
    matcher = getMatcher(doc, selection);
  return selection.numberOfSnippets === 0 ? [] : (await neighbors.filter(neighbor => neighbor.source.length < MAX_CHARACTERS_PER_FILE && neighbor.source.length > 0).slice(0, MAX_NUMBER_OF_FILES).reduce(async (acc, neighbor) => (await acc).concat((await matcher.findMatches(neighbor)).map(snippet => ({
    relativePath: neighbor.relativePath,
    ...snippet
  }))), Promise.resolve([]))).filter(neighbor => neighbor.score && neighbor.snippet && neighbor.score > selection.threshold).sort((a, b) => a.score - b.score).slice(-selection.numberOfSnippets);
},var NeighboringTabsOption,
  neighborOptionToSelection,
  MAX_CHARACTERS_PER_FILE,
  MAX_NUMBER_OF_FILES,
  init_neighboringFiles = __esmMin(() => {
    "use strict";

    init_jaccardMatching();
    NeighboringTabsOption = (u => (NeighboringTabsOption.None = "none", NeighboringTabsOption.Conservative = "conservative", NeighboringTabsOption.Medium = "medium", NeighboringTabsOption.Eager = "eager", NeighboringTabsOption.EagerButLittle = "eagerButLittle", NeighboringTabsOption.EagerButMedium = "eagerButMedium", NeighboringTabsOption.EagerButMuch = "eagerButMuch", NeighboringTabsOption.RetrievalComparable = "retrievalComparable", NeighboringTabsOption))(et || {}), neighborOptionToSelection = {
      none: {
        snippetLength: 1,
        threshold: -1,
        numberOfSnippets: 0
      },
      conservative: {
        snippetLength: 10,
        threshold: .3,
        numberOfSnippets: 1
      },
      medium: {
        snippetLength: 20,
        threshold: .1,
        numberOfSnippets: 2
      },
      eager: {
        snippetLength: 60,
        threshold: 0,
        numberOfSnippets: 4
      },
      eagerButLittle: {
        snippetLength: 10,
        threshold: 0,
        numberOfSnippets: 1
      },
      eagerButMedium: {
        snippetLength: 20,
        threshold: 0,
        numberOfSnippets: 4
      },
      eagerButMuch: {
        snippetLength: 60,
        threshold: 0,
        numberOfSnippets: 6
      },
      retrievalComparable: {
        snippetLength: 30,
        threshold: 0,
        numberOfSnippets: 4
      }
    }, MAX_CHARACTERS_PER_FILE = 1e4, MAX_NUMBER_OF_FILES = 20;
    __name(getMatcher, "getMatcher");
    __name(getNeighborSnippets, "getNeighborSnippets");
  });