var _CodeQuoteHeaderContributor = class _CodeQuoteHeaderContributor {
  constructor(codequoteEnabled) {
    this.codequoteEnabled = codequoteEnabled != null ? codequoteEnabled : !1;
  }
  updateCodeQuoteEnabled(codequoteEnabled) {
    this.codequoteEnabled = codequoteEnabled != null ? codequoteEnabled : !1;
  }
  contributeHeaderValues(url, headers) {
    headers["Code-Quote-Enabled"] = String(this.codequoteEnabled);
  }
};,__name(_CodeQuoteHeaderContributor, "CodeQuoteHeaderContributor");,var CodeQuoteHeaderContributor = _CodeQuoteHeaderContributor,
  _AnnotationsHeaderContributor = class _AnnotationsHeaderContributor {
    constructor(annotationsEnabled) {
      this.annotationsEnabled = annotationsEnabled != null ? annotationsEnabled : !1;
    }
    updateAnnotationsEnabled(annotationsEnabled) {
      this.annotationsEnabled = annotationsEnabled != null ? annotationsEnabled : !1;
    }
    contributeHeaderValues(url, headers) {
      headers["Annotations-Enabled"] = String(this.annotationsEnabled);
    }
  };,__name(_AnnotationsHeaderContributor, "AnnotationsHeaderContributor");,var AnnotationsHeaderContributor = _AnnotationsHeaderContributor;,function registerCopilotEnvelopeListener(ctx) {
  function updateFromEnvelopeState() {
    let codeQuoteEnabled = !ConnectionState.isDisabled();
    codequoteHeaderContributor.updateCodeQuoteEnabled(codeQuoteEnabled);
  }
  __name(updateFromEnvelopeState, "updateFromEnvelopeState");
  let disposer = ConnectionState.listen(updateFromEnvelopeState),
    codequoteHeaderContributor = new CodeQuoteHeaderContributor(),
    headerContributors = ctx.get(HeaderContributors);
  return headerContributors.add(codequoteHeaderContributor), updateFromEnvelopeState(), new oae.Disposable(() => {
    headerContributors.remove(codequoteHeaderContributor), disposer.dispose();
  });
},__name(registerCopilotEnvelopeListener, "registerCopilotEnvelopeListener");