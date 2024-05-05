var promptlib = bn(gu());,var workerFuns = ["getFunctionPositions", "isEmptyBlockStart", "isBlockBodyFinished", "getNodeStart", "parsesWithoutError"],
  directFuns = ["isSupportedLanguageId", "getBlockCloseToken", "getPrompt"],
  allFuns = [...workerFuns, ...directFuns];