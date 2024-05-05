function completionsFromGhostTextResults(ctx, completionResults, resultType, document, position, textEditorOptions, lastShownCompletionIndex) {
  let currentLine = document.lineAt(position),
    completions = completionResults.map(result => {
      let range = LocationFactory.range(LocationFactory.position(position.line, 0), LocationFactory.position(position.line, position.character + result.suffixCoverage)),
        insertText = "";
      if (textEditorOptions && (result.completion = normalizeIndentCharacter(textEditorOptions, result.completion, currentLine.isEmptyOrWhitespace)), currentLine.isEmptyOrWhitespace && (result.completion.displayNeedsWsOffset || result.completion.completionText.startsWith(currentLine.text))) insertText = result.completion.completionText;else {
        let rangeFromStart = LocationFactory.range(range.start, position);
        insertText = document.getText(rangeFromStart) + result.completion.displayText;
      }
      return {
        uuid: v4_default(),
        insertText: insertText,
        range: range,
        file: document.uri,
        index: result.completion.completionIndex,
        telemetry: result.telemetry,
        displayText: result.completion.displayText,
        position: position,
        offset: document.offsetAt(position),
        resultType: resultType
      };
    });
  if (resultType === 2 && lastShownCompletionIndex !== void 0) {
    let lastShownCompletion = completions.find(predicate => predicate.index === lastShownCompletionIndex);
    if (lastShownCompletion) {
      let restCompletions = completions.filter(predicate => predicate.index !== lastShownCompletionIndex);
      completions = [lastShownCompletion, ...restCompletions];
    }
  }
  return completions;
},__name(completionsFromGhostTextResults, "completionsFromGhostTextResults");