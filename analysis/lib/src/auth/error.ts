var _CopilotAuthError = class _CopilotAuthError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "CopilotAuthError";
  }
};,__name(_CopilotAuthError, "CopilotAuthError");,var CopilotAuthError = _CopilotAuthError;