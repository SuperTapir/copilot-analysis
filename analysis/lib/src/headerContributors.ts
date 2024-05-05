var _HeaderContributors = class _HeaderContributors {
  constructor() {
    this.contributors = [];
  }
  add(contributor) {
    this.contributors.push(contributor);
  }
  remove(contributor) {
    let index = this.contributors.indexOf(contributor);
    index !== -1 && this.contributors.splice(index, 1);
  }
  contributeHeaders(url, headers) {
    for (let contributor of this.contributors) contributor.contributeHeaderValues(url, headers);
  }
  size() {
    return this.contributors.length;
  }
};,__name(_HeaderContributors, "HeaderContributors");,var HeaderContributors = _HeaderContributors;,var _rejectUnauthorized,
  _clientFetch,
  _Fetcher = class _Fetcher {
    constructor() {
      __privateAdd(this, _rejectUnauthorized, void 0);
      __privateAdd(this, _clientFetch, void 0);
    }
    set rejectUnauthorized(value) {
      __privateSet(this, _rejectUnauthorized, value);
    }
    get rejectUnauthorized() {
      return __privateGet(this, _rejectUnauthorized);
    }
    set clientFetch(value) {
      __privateSet(this, _clientFetch, value);
    }
    get clientFetch() {
      return __privateGet(this, _clientFetch);
    }
  };,_rejectUnauthorized = new WeakMap(), _clientFetch = new WeakMap(), __name(_Fetcher, "Fetcher");,var Fetcher = _Fetcher;,function isAbortError(e) {
  return e instanceof AbortError || e.name === "AbortError" || e instanceof FetchError && e.code === "ABORT_ERR";
},__name(isAbortError, "isAbortError");,var _JsonParseError = class _JsonParseError extends SyntaxError {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "JsonParseError";
  }
};,__name(_JsonParseError, "JsonParseError");,var JsonParseError = _JsonParseError,
  _FetchResponseError = class _FetchResponseError extends Error {
    constructor(response) {
      super(`HTTP ${response.status} ${response.statusText}`), this.name = "FetchResponseError", this.code = `HTTP${response.status}`;
    }
  };,__name(_FetchResponseError, "FetchResponseError");,var FetchResponseError = _FetchResponseError,
  networkErrorCodes = new Set(["ECONNABORTED", "ECONNRESET", "EHOSTUNREACH", "ENETUNREACH", "ENOTCONN", "ENOTFOUND", "ETIMEDOUT", "ERR_HTTP2_STREAM_ERROR", "ERR_SSL_BAD_DECRYPT", "ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC", "ERR_SSL_INVALID_LIBRARY_(0)", "ERR_SSL_SSLV3_ALERT_BAD_RECORD_MAC", "ERR_SSL_WRONG_VERSION_NUMBER", "ERR_STREAM_PREMATURE_CLOSE"]);,function isNetworkError(e) {
  var _a;
  return e instanceof FetchError || e instanceof Error && e.name === "FetchError" || e instanceof JsonParseError || e instanceof FetchResponseError || e instanceof Error && networkErrorCodes.has(e.code) || ((_a = e == null ? void 0 : e.message) == null ? void 0 : _a.startsWith("net::"));
},__name(isNetworkError, "isNetworkError");,var _Response = class _Response {
  constructor(status, statusText, headers, getText, getBody, getJson) {
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.getText = getText;
    this.getBody = getBody;
    this.getJson = getJson;
    this.ok = this.status >= 200 && this.status < 300;
  }
  async text() {
    return this.getText();
  }
  async json() {
    if (this.getJson) return this.getJson();
    let text = await this.text(),
      contentType = this.headers.get("content-type");
    if (!contentType || !contentType.includes("json")) throw new JsonParseError(`Response content-type is ${contentType != null ? contentType : "missing"} (status=${this.status})`, `ContentType=${contentType}`);
    try {
      return JSON.parse(text);
    } catch (e) {
      if (e instanceof SyntaxError) {
        let posMatch = e.message.match(/^(.*?) in JSON at position (\d+)$/);
        if (posMatch && parseInt(posMatch[2], 10) == text.length || e.message === "Unexpected end of JSON input") {
          let actualLength = new nW.TextEncoder().encode(text).length,
            headerLength = this.headers.get("content-length");
          throw headerLength === null ? new JsonParseError(`Response body truncated: actualLength=${actualLength}`, "Truncated") : new JsonParseError(`Response body truncated: actualLength=${actualLength}, headerLength=${headerLength}`, "Truncated");
        }
      }
      throw e;
    }
  }
  async body() {
    return this.getBody();
  }
};,__name(_Response, "Response");,var Response = _Response,
  requestTimeoutMs = 30 * 1e3;,function postRequest(ctx, url, secretKey, intent, requestId, body, cancelToken) {
  let headers = {
    Authorization: eW.format("Bearer %s", secretKey),
    "X-Request-Id": requestId,
    "Openai-Organization": "github-copilot",
    "VScode-SessionId": ctx.get(EditorSession).sessionId,
    "VScode-MachineId": ctx.get(EditorSession).machineId,
    ...editorVersionHeaders(ctx)
  };
  ctx.get(HeaderContributors).contributeHeaders(url, headers), intent && (headers["OpenAI-Intent"] = intent);
  let request = {
      method: "POST",
      headers: headers,
      json: body,
      timeout: requestTimeoutMs
    },
    fetcher = ctx.get(Fetcher);
  if (cancelToken) {
    let abort = fetcher.makeAbortController();
    cancelToken.onCancellationRequested(() => {
      telemetry(ctx, "networking.cancelRequest", TelemetryData.createAndMarkAsIssued({
        headerRequestId: requestId
      })), abort.abort();
    }), request.signal = abort.signal;
  }
  return fetcher.fetch(url, request).catch(reason => {
    if (reason.code == "ECONNRESET" || reason.code == "ETIMEDOUT" || reason.code == "ERR_HTTP2_INVALID_SESSION" || reason.message == "ERR_HTTP2_GOAWAY_SESSION") return telemetry(ctx, "networking.disconnectAll"), fetcher.disconnectAll().then(() => fetcher.fetch(url, request));
    throw reason;
  });
},__name(postRequest, "postRequest");