var APP_INSIGHTS_KEY = "7d7048df-6dd0-4048-bb23-b716c1461f8f",
  APP_INSIGHTS_KEY_SECURE = "3fdd7f28-937a-48c8-9a21-ba337db23bd1",
  APP_INSIGHTS_KEY_FT = "f0000000-0000-0000-0000-000000000000",
  _TelemetryInitialization = class _TelemetryInitialization {
    constructor() {
      this._initialized = !1;
    }
    get isInitialized() {
      return this._initialized;
    }
    async initialize(ctx, telemetryNamespace, telemetryEnabled) {
      let deactivation = ctx.get(TelemetryReporters).deactivate();
      if (this._namespace = telemetryNamespace, this._enabled = telemetryEnabled, this._initialized = !0, telemetryEnabled) {
        let container = ctx.get(TelemetryReporters);
        container.setReporter(new AppInsightsReporter(ctx, telemetryNamespace, APP_INSIGHTS_KEY)), container.setRestrictedReporter(new AppInsightsReporter(ctx, telemetryNamespace, APP_INSIGHTS_KEY_SECURE)), container.setFTReporter(new AppInsightsReporter(ctx, telemetryNamespace, APP_INSIGHTS_KEY_FT, !0));
      }
      await deactivation;
    }
    reInitialize(ctx) {
      return this._initialized ? this.initialize(ctx, this._namespace, this._enabled) : Promise.reject(new Error("Cannot re-initialize telemetry that has not been initialized."));
    }
  };,__name(_TelemetryInitialization, "TelemetryInitialization");,var TelemetryInitialization = _TelemetryInitialization;,function setupTelemetryReporters(ctx, telemetryNamespace, telemetryEnabled) {
  return ctx.get(TelemetryInitialization).initialize(ctx, telemetryNamespace, telemetryEnabled);
},__name(setupTelemetryReporters, "setupTelemetryReporters");