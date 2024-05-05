var _RuntimeMode = class _RuntimeMode {
  constructor(flags) {
    this.flags = flags;
  }
  static fromEnvironment(isRunningInTest) {
    return new _RuntimeMode({
      debug: determineDebugFlag(process.argv, process.env),
      verboseLogging: determineVerboseLoggingEnabled(process.env),
      telemetryLogging: determineTelemetryLoggingEnabled(process.env),
      testMode: isRunningInTest
    });
  }
};,__name(_RuntimeMode, "RuntimeMode");,var RuntimeMode = _RuntimeMode;,function isRunningInTest(ctx) {
  return ctx.get(RuntimeMode).flags.testMode;
},__name(isRunningInTest, "isRunningInTest");,function shouldFailForDebugPurposes(ctx) {
  return isRunningInTest(ctx);
},__name(shouldFailForDebugPurposes, "shouldFailForDebugPurposes");,function isVerboseLoggingEnabled(ctx) {
  return ctx.get(RuntimeMode).flags.verboseLogging;
},__name(isVerboseLoggingEnabled, "isVerboseLoggingEnabled");,function determineDebugFlag(argv, env) {
  return argv.includes("--debug") || determineEnvFlagEnabled(env, "DEBUG");
},__name(determineDebugFlag, "determineDebugFlag");,function determineVerboseLoggingEnabled(env) {
  var _a;
  return env.COPILOT_AGENT_VERBOSE === "1" || ((_a = env.COPILOT_AGENT_VERBOSE) == null ? void 0 : _a.toLowerCase()) === "true" || determineEnvFlagEnabled(env, "VERBOSE");
},__name(determineVerboseLoggingEnabled, "determineVerboseLoggingEnabled");,function determineTelemetryLoggingEnabled(env) {
  return determineEnvFlagEnabled(env, "LOG_TELEMETRY");
},__name(determineTelemetryLoggingEnabled, "determineTelemetryLoggingEnabled");,function determineEnvFlagEnabled(env, name) {
  for (let prefix of ["GH_COPILOT_", "GITHUB_COPILOT_"]) {
    let val = env[`${prefix}${name}`];
    if (val) return val === "1" || (val == null ? void 0 : val.toLowerCase()) === "true";
  }
  return !1;
},__name(determineEnvFlagEnabled, "determineEnvFlagEnabled");