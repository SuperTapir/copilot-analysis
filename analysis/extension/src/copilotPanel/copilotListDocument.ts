var _CopilotListDocument = class _CopilotListDocument extends SolutionManager {
  constructor(ctx, uri, textDocument, completionContext, solutionCountTarget, token) {
    super(textDocument, completionContext.insertPosition, completionContext, token, solutionCountTarget);
    this._solutionCount = 0;
    this._solutions = [];
    this._updateHandlers = new Set();
    this.hasFinished = !1;
    this.debouncedEventFire = debounce(10, () => this._updateHandlers.forEach(handler => handler(this._uri)));
    this.onDidResultUpdated = __name(listener => (this._updateHandlers.add(listener), {
      dispose: () => {
        this._updateHandlers.delete(listener);
      }
    }), "onDidResultUpdated");
    this._ctx = ctx, this._uri = uri;
  }
  get targetUri() {
    return this.textDocument.uri;
  }
  areSolutionsDuplicates(solutionA, solutionB) {
    let stripA = normalizeCompletionText(solutionA.insertText),
      stripB = normalizeCompletionText(solutionB.insertText);
    return stripA === stripB;
  }
  insertSorted(list, newItem, keyFn) {
    if (!/^\s*$/.test(newItem.insertText)) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (this.areSolutionsDuplicates(item, newItem)) if (keyFn(item) < keyFn(newItem)) {
          list.splice(i, 1);
          break;
        } else return;
      }
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (keyFn(item) < keyFn(newItem)) {
          list.splice(i, 0, newItem);
          return;
        }
      }
      list.push(newItem);
    }
  }
  onSolution(unformatted) {
    let newItem = {
        displayText: unformatted.displayText,
        insertText: unformatted.completionText,
        meanProb: unformatted.meanProb,
        prependToCompletion: unformatted.prependToCompletion,
        requestId: unformatted.requestId,
        choiceIndex: unformatted.choiceIndex
      },
      keyFn = __name(item => item.meanProb, "keyFn");
    this.insertSorted(this._solutions, newItem, keyFn), this._solutionCount++, this.debouncedEventFire();
  }
  onFinishedNormally() {
    this.hasFinished = !0, this.debouncedEventFire();
  }
  onFinishedWithError(_) {
    return this.onFinishedNormally();
  }
  runQuery() {
    runSolutions(this._ctx, this, this);
  }
  solutionsReceived() {
    return this._solutionCount;
  }
  solutions() {
    return this._solutions;
  }
};,__name(_CopilotListDocument, "CopilotListDocument");,var CopilotListDocument = _CopilotListDocument;