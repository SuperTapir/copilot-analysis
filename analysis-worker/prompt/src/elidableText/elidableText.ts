function makePrompt(lines, maxTokens, ellipsis, indentEllipses, strategy, tokenizer) {
  if (tokenizer.tokenLength(ellipsis + `
`) > maxTokens) throw new Error("maxTokens must be larger than the ellipsis length");
  strategy === "removeLeastBangForBuck" && lines.forEach(line => line.adjustValue(1 / line.cost));
  let infiniteWorth = lines.reduce((a, b) => Math.max(a, b.value), 0) + 1,
    infiniteIndentation = lines.reduce((a, b) => Math.max(a, b.text.length), 0) + 1,
    trimmedEllipsis = ellipsis.trim(),
    totalCost = lines.reduce((sum, line) => sum + line.cost, 0),
    defensiveCounter = lines.length + 1;
  for (; totalCost > maxTokens && defensiveCounter-- >= -1;) {
    let leastDesirable = lines.reduce((least, line) => line.value < least.value ? line : least),
      index = lines.indexOf(leastDesirable),
      mostRecentNonBlankLine = lines.slice(0, index + 1).reverse().find(line => line.text.trim() !== "") ?? {
        text: ""
      },
      indentation = indentEllipses ? Math.min(mostRecentNonBlankLine.text.match(/^\s*/)?.[0].length ?? 0, lines[index - 1]?.text.trim() === trimmedEllipsis ? lines[index - 1]?.text.match(/^\s*/)?.[0].length ?? 0 : infiniteIndentation, lines[index + 1]?.text.trim() === trimmedEllipsis ? lines[index + 1]?.text.match(/^\s*/)?.[0].length ?? 0 : infiniteIndentation) : 0,
      insert = " ".repeat(indentation) + ellipsis,
      newEllipis = new LineWithValueAndCost(insert, infiniteWorth, tokenizer.tokenLength(insert + `
`), "loose");
    lines.splice(index, 1, newEllipis), lines[index + 1]?.text.trim() === trimmedEllipsis && lines.splice(index + 1, 1), lines[index - 1]?.text.trim() === trimmedEllipsis && lines.splice(index - 1, 1);
    let newTotalCost = lines.reduce((sum, line) => sum + line.cost, 0);
    newTotalCost >= totalCost && lines.every(line => line.value === infiniteWorth) && (indentEllipses = !1), totalCost = newTotalCost;
  }
  if (defensiveCounter < 0) throw new Error("Infinite loop in ElidableText.makePrompt: Defensive counter < 0 in ElidableText.makePrompt with end text");
  return lines.map(line => line.text).join(`
`);
},var ElidableText,
  init_elidableText = __esmMin(() => {
    "use strict";

    init_tokenization();
    init_fromSourceCode();
    init_lineWithValueAndCost();
    ElidableText = class _ElidableText {
      constructor(chunks) {
        this.lines = [];
        let lines = [];
        for (let chunk of chunks) {
          let value = Array.isArray(chunk) ? chunk[1] : 1,
            input = Array.isArray(chunk) ? chunk[0] : chunk;
          typeof input == "string" ? input.split(`
`).forEach(line => lines.push(new LineWithValueAndCost(line, value))) : input instanceof _ElidableText ? input.lines.forEach(line => lines.push(line.copy().adjustValue(value))) : "source" in input && "languageId" in input && elidableTextForSourceCode(input).lines.forEach(line => lines.push(line.copy().adjustValue(value)));
        }
        this.lines = lines;
      }
      static {
        __name(this, "ElidableText");
      }
      adjust(multiplier) {
        this.lines.forEach(line => line.adjustValue(multiplier));
      }
      recost(coster = x => getTokenizer().tokenLength(x + `
`)) {
        this.lines.forEach(line => line.recost(coster));
      }
      makePrompt(maxTokens, ellipsis = "[...]", indentEllipses = !0, strategy = "removeLeastDesirable", tokenizer = getTokenizer()) {
        let lines = this.lines.map(line => line.copy());
        return makePrompt(lines, maxTokens, ellipsis, indentEllipses, strategy, tokenizer);
      }
    };
    __name(makePrompt, "makePrompt");
  });