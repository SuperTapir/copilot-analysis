function truncateFirstLinesFirst(tokenizer, snippet, targetTokenBudget) {
  if (!targetTokenBudget) throw new Error("targetTokenBudget must be specified for the truncateFirstLinesFirst summarizer");
  let rawLines = snippet.text.split(`
`);
  for (let i = 0; i < rawLines.length - 1; i++) rawLines[i] += `
`;
  let lines = [];
  rawLines.forEach((line, i) => {
    line === `
` && lines.length > 0 && !lines[lines.length - 1].endsWith(`

`) ? lines[lines.length - 1] += `
` : lines.push(line);
  });
  let lineTokens = lines.map(line => tokenizer.tokenLength(line)),
    i = 1,
    tokens = 0;
  for (; i <= lineTokens.length; i++) {
    let t = lineTokens.at(-i);
    if (t) {
      if (t + tokens > targetTokenBudget) {
        i--;
        break;
      }
      tokens += t;
    }
  }
  let truncatedText = lines.slice(-i).join(""),
    newTokens = tokenizer.tokenLength(truncatedText),
    removedText = lines.slice(0, -i).join(""),
    removedTokens = tokenizer.tokenLength(removedText),
    summarizedElement = {
      id: snippet.id,
      kind: snippet.kind,
      text: truncatedText,
      tokens: newTokens,
      score: snippet.score
    },
    removedMaterial = {
      id: snippet.id,
      kind: snippet.kind,
      text: removedText,
      tokens: removedTokens,
      score: snippet.score
    };
  return {
    summarizedElement: summarizedElement,
    removedMaterial: removedMaterial
  };
},var init_truncateFirstLinesFirst = __esmMin(() => {
  "use strict";

  __name(truncateFirstLinesFirst, "truncateFirstLinesFirst");
});