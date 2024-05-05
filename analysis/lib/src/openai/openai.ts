function convertToAPIChoice(ctx, completionText, jsonData, choiceIndex, requestId, blockFinished, telemetryData, modelInfo) {
  return logEngineCompletion(ctx, completionText, jsonData, requestId, choiceIndex), {
    completionText: completionText,
    meanLogProb: calculateMeanLogProb(ctx, jsonData),
    meanAlternativeLogProb: calculateMeanAlternativeLogProb(ctx, jsonData),
    choiceIndex: choiceIndex,
    requestId: requestId,
    modelInfo: modelInfo,
    blockFinished: blockFinished,
    tokens: jsonData.tokens,
    numTokens: jsonData.tokens.length,
    telemetryData: telemetryData
  };
},__name(convertToAPIChoice, "convertToAPIChoice");,async function* cleanupIndentChoices(choices, indentation) {
  for await (let choice of choices) {
    let choiceCopy = {
        ...choice
      },
      completionLines = choiceCopy.completionText.split(`
`);
    for (let i = 0; i < completionLines.length; ++i) {
      let newLine = completionLines[i].trimLeft();
      newLine === "" ? completionLines[i] = newLine : completionLines[i] = indentation + newLine;
    }
    choiceCopy.completionText = completionLines.join(`
`), yield choiceCopy;
  }
},__name(cleanupIndentChoices, "cleanupIndentChoices");,function calculateMeanLogProb(ctx, jsonData) {
  var _a;
  if ((_a = jsonData == null ? void 0 : jsonData.logprobs) != null && _a.token_logprobs) try {
    let logProbSum = 0,
      numTokens = 0,
      iterLimit = 50;
    for (let i = 0; i < jsonData.logprobs.token_logprobs.length - 1 && iterLimit > 0; i++, iterLimit--) logProbSum += jsonData.logprobs.token_logprobs[i], numTokens += 1;
    return numTokens > 0 ? logProbSum / numTokens : void 0;
  } catch (e) {
    logger.exception(ctx, e, "Error calculating mean prob");
  }
},__name(calculateMeanLogProb, "calculateMeanLogProb");,function calculateMeanAlternativeLogProb(ctx, jsonData) {
  var _a;
  if ((_a = jsonData == null ? void 0 : jsonData.logprobs) != null && _a.top_logprobs) try {
    let logProbSum = 0,
      numTokens = 0,
      iterLimit = 50;
    for (let i = 0; i < jsonData.logprobs.token_logprobs.length - 1 && iterLimit > 0; i++, iterLimit--) {
      let options = {
        ...jsonData.logprobs.top_logprobs[i]
      };
      delete options[jsonData.logprobs.tokens[i]], logProbSum += Math.max(...Object.values(options)), numTokens += 1;
    }
    return numTokens > 0 ? logProbSum / numTokens : void 0;
  } catch (e) {
    logger.exception(ctx, e, "Error calculating mean prob");
  }
},__name(calculateMeanAlternativeLogProb, "calculateMeanAlternativeLogProb");,function getTemperatureForSamples(ctx, numShots) {
  return isRunningInTest(ctx) || numShots <= 1 ? 0 : numShots < 10 ? .2 : numShots < 20 ? .4 : .8;
},__name(getTemperatureForSamples, "getTemperatureForSamples");,var stopsForLanguage = {
  markdown: [`


`],
  python: [`
def `, `
class `, `
if `, `

#`]
};,function getStops(ctx, languageId) {
  var _a;
  return (_a = stopsForLanguage[languageId != null ? languageId : ""]) != null ? _a : [`


`, "\n```"];
},__name(getStops, "getStops");,function getTopP(ctx) {
  return 1;
},__name(getTopP, "getTopP");,function getMaxSolutionTokens(ctx) {
  return 500;
},__name(getMaxSolutionTokens, "getMaxSolutionTokens");