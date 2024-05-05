var oomCodes = new Set(["ERR_WORKER_OUT_OF_MEMORY", "ENOMEM"]);,function isOomError(error) {
  var _a;
  return oomCodes.has((_a = error.code) != null ? _a : "") || error.name === "RangeError" && error.message === "WebAssembly.Memory(): could not allocate memory";
},__name(isOomError, "isOomError");,function handleException(ctx, err, origin, _logger = logger) {
  if (!isAbortError(err)) {
    if (err instanceof Error) {
      let error = err;
      isOomError(error) ? ctx.get(StatusReporter).setError("Out of memory") : error.code === "EMFILE" || error.code === "ENFILE" ? ctx.get(StatusReporter).setError("Too many open files") : error.code === "CopilotPromptLoadFailure" ? ctx.get(StatusReporter).setError("Corrupted Copilot installation") : `${error.code}`.startsWith("CopilotPromptWorkerExit") ? ctx.get(StatusReporter).setError("Worker unexpectedly exited") : error.syscall === "uv_cwd" && error.code === "ENOENT" && ctx.get(StatusReporter).setError("Current working directory does not exist");
    }
    _logger.exception(ctx, err, origin);
  }
},__name(handleException, "handleException");,function exception(ctx, error, origin, logger) {
  error instanceof Error && error.name === "Canceled" || error instanceof Error && error.name === "CodeExpectedError" || handleException(ctx, error, origin, logger);
},__name(exception, "exception");,function registerCommandWithTelemetry(ctx, command, fn) {
  let disposable = qte.commands.registerCommand(command, async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      exception(ctx, error, command);
    }
  });
  ctx.get(Extension).register(disposable);
},__name(registerCommandWithTelemetry, "registerCommandWithTelemetry");,function cleanupTelemetryReporters(ctx) {
  let container = ctx.get(TelemetryReporters);
  disposeIfNeccessary(ctx, container.getReporter(ctx)), disposeIfNeccessary(ctx, container.getRestrictedReporter(ctx));
},__name(cleanupTelemetryReporters, "cleanupTelemetryReporters");,function disposeIfNeccessary(ctx, reporter) {
  reporter && ctx.get(Extension).register(reporter);
},__name(disposeIfNeccessary, "disposeIfNeccessary");