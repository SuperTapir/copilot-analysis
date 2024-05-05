var _TestPromiseQueue = class _TestPromiseQueue extends PromiseQueue {
  async awaitPromises() {
    await Promise.all(this.promises);
  }
};,__name(_TestPromiseQueue, "TestPromiseQueue");,var TestPromiseQueue = _TestPromiseQueue;,var _FailingTelemetryReporter = class _FailingTelemetryReporter {
  sendTelemetryEvent(eventName, properties, measurements) {
    throw new Error("Telemetry disabled");
  }
  sendTelemetryErrorEvent(eventName, properties, measurements, errorProps) {
    throw new Error("Telemetry disabled");
  }
  dispose() {
    return Promise.resolve();
  }
  hackOptOutListener() {}
};,__name(_FailingTelemetryReporter, "FailingTelemetryReporter");,var FailingTelemetryReporter = _FailingTelemetryReporter;