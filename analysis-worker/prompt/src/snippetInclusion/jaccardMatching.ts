function computeScore(a, b) {
  let intersection = new Set();
  return a.forEach(x => {
    b.has(x) && intersection.add(x);
  }), intersection.size / (a.size + b.size - intersection.size);
},var FixedWindowSizeJaccardMatcher,
  init_jaccardMatching = __esmMin(() => {
    "use strict";

    init_cursorContext();
    init_selectRelevance();
    init_windowDelineations();
    FixedWindowSizeJaccardMatcher = class _FixedWindowSizeJaccardMatcher extends WindowedMatcher {
      static {
        __name(this, "FixedWindowSizeJaccardMatcher");
      }
      constructor(referenceDoc, windowLength) {
        super(referenceDoc), this.windowLength = windowLength;
      }
      static {
        this.FACTORY = windowLength => ({
          to: referenceDoc => new _FixedWindowSizeJaccardMatcher(referenceDoc, windowLength)
        });
      }
      id() {
        return "fixed:" + this.windowLength;
      }
      getWindowsDelineations(lines) {
        return getBasicWindowDelineations(this.windowLength, lines);
      }
      _getCursorContextInfo(referenceDoc) {
        return getCursorContext(referenceDoc, {
          maxLineCount: this.windowLength
        });
      }
      similarityScore(a, b) {
        return computeScore(a, b);
      }
    };
    __name(computeScore, "computeScore");
  });