async function getDebounceLimit(ctx, telemetryData) {
  let expDebounce;
  if (ctx.get(Features).debouncePredict(telemetryData) && telemetryData.measurements.contextualFilterScore) {
    let acceptProbability = telemetryData.measurements.contextualFilterScore;
    expDebounce = 25 + 250 / (1 + Math.pow(acceptProbability / .3475, 7));
  } else expDebounce = ctx.get(Features).debounceMs(telemetryData);
  return expDebounce > 0 ? expDebounce : 75;
},__name(getDebounceLimit, "getDebounceLimit");