var import_vscode = require("vscode");,var GitHubCopilotChannelName = "GitHub Copilot Log";,function getCurrentTimestamp() {
  let toTwoDigits = __name(v => v < 10 ? `0${v}` : v, "toTwoDigits"),
    toThreeDigits = __name(v => v < 10 ? `00${v}` : v < 100 ? `0${v}` : v, "toThreeDigits"),
    currentTime = new Date();
  return `${currentTime.getFullYear()}-${toTwoDigits(currentTime.getMonth() + 1)}-${toTwoDigits(currentTime.getDate())} ${toTwoDigits(currentTime.getHours())}:${toTwoDigits(currentTime.getMinutes())}:${toTwoDigits(currentTime.getSeconds())}.${toThreeDigits(currentTime.getMilliseconds())}`;
},__name(getCurrentTimestamp, "getCurrentTimestamp");,var _CodeReferenceOutputChannel = class _CodeReferenceOutputChannel {
  constructor(output) {
    this.output = output;
  }
  info(...messages) {
    this.output.appendLine(`${getCurrentTimestamp()} [info] ${messages.join(" ")}`);
  }
  show(preserveFocus) {
    this.output.show(preserveFocus);
  }
  dispose() {
    this.output.dispose();
  }
};,__name(_CodeReferenceOutputChannel, "CodeReferenceOutputChannel");,var CodeReferenceOutputChannel = _CodeReferenceOutputChannel,
  _GitHubCopilotLogger = class _GitHubCopilotLogger {
    constructor(ctx) {
      this.ctx = ctx;
      this.tokenManager = void 0;
      this.checkCopilotToken = __name(token => {
        var _a;
        token.envelope.code_quote_enabled ? this.output = this.createChannel() : (_a = this.output) == null || _a.dispose();
      }, "checkCopilotToken");
      this.tokenManager = this.ctx.get(CopilotTokenNotifier), this.tokenManager.on("onCopilotToken", this.checkCopilotToken), this.output = this.createChannel();
    }
    static create(ctx) {
      return new _GitHubCopilotLogger(ctx);
    }
    createChannel() {
      return this.output ? this.output : new CodeReferenceOutputChannel(_ae.window.createOutputChannel(GitHubCopilotChannelName, "code-referencing"));
    }
    async log(type, ...messages) {
      this.output || (this.output = this.createChannel());
      let [base, ...rest] = messages;
      this.output[type](base, ...rest);
    }
    info(...messages) {
      this.log("info", ...messages);
    }
    forceShow() {
      var _a;
      (_a = this.output) == null || _a.show(!0);
    }
    dispose() {
      var _a;
      (_a = this.output) == null || _a.dispose();
    }
  };,__name(_GitHubCopilotLogger, "GitHubCopilotLogger");,var GitHubCopilotLogger = _GitHubCopilotLogger;,var pluralize = __name((count, noun, suffix = "s") => `${count} ${noun}${count !== 1 ? suffix : ""}`, "pluralize");,function isError(payload) {
  return wae.Value.Check(MatchError, payload);
},__name(isError, "isError");,async function snippyRequest(ctx, requestFn) {
  let res = await requestFn();
  if (isError(res)) {
    snippyTelemetry.handleSnippyNetworkError({
      context: ctx,
      origin: String(res.code),
      reason: res.reason,
      message: res.msg
    });
    return;
  }
  return res;
},__name(snippyRequest, "snippyRequest");,function handlePostInsertion(githubLogger) {
  return async event => {
    let {
        ctx: ctx,
        completionText: completionText,
        completionId: completionId,
        start: start,
        fileURI: fileURI,
        insertionOffset: insertionOffset
      } = event,
      insertionDoc = await ctx.get(TextDocumentManager).getTextDocument(fileURI);
    if (!insertionDoc) {
      codeReferenceLogger.debug(ctx, `Expected document matching ${fileURI}, got nothing.`);
      return;
    }
    if (!completionId || !start) {
      snippyTelemetry.handleCompletionMissing({
        context: ctx,
        origin: "onPostInsertion",
        reason: "No completion metadata found."
      });
      return;
    }
    let docText = insertionDoc.getText();
    if (!hasMinLexemeLength(docText)) return;
    let potentialMatchContext = completionText;
    if (!hasMinLexemeLength(completionText)) {
      let textWithoutCompletion = docText.slice(0, insertionOffset),
        minLexemeStartOffset = offsetLastLexemes(textWithoutCompletion, MinTokenLength);
      potentialMatchContext = docText.slice(minLexemeStartOffset, insertionOffset + completionText.length);
    }
    if (!hasMinLexemeLength(potentialMatchContext)) return;
    let matchResponse = await snippyRequest(ctx, () => Match(ctx, potentialMatchContext));
    if (!matchResponse || !matchResponse.snippets.length) {
      codeReferenceLogger.info(ctx, "No match found");
      return;
    }
    codeReferenceLogger.info(ctx, "Match found");
    let {
        snippets: snippets
      } = matchResponse,
      citationPromises = snippets.map(async snippet => {
        let response = await snippyRequest(ctx, () => FilesForMatch(ctx, {
          cursor: snippet.cursor
        }));
        if (!response) return;
        let files = response.file_matches,
          licenseStats = response.license_stats;
        return {
          match: snippet,
          files: files,
          licenseStats: licenseStats
        };
      });
    notify(ctx), Promise.all(citationPromises).then(citations => citations.filter(Boolean)).then(filtered => {
      var _a, _b, _c;
      if (filtered.length) for (let citation of filtered) {
        let licensesSet = new Set(Object.keys((_b = (_a = citation.licenseStats) == null ? void 0 : _a.count) != null ? _b : {}));
        licensesSet.has("NOASSERTION") && (licensesSet.delete("NOASSERTION"), licensesSet.add("unknown"));
        let allLicenses = Array.from(licensesSet).sort(),
          matchLocation = `[Ln ${start.line}, Col ${start.character}]`,
          shortenedMatchText = `${citation.match.matched_source.slice(0, 100).replace(/[\r\n\t]+|^[ \t]+/gm, " ").trim()}...`,
          workspaceFolders = (_c = R1.workspace.workspaceFolders) != null ? _c : [],
          fileName = fileURI.fsPath;
        for (let folder of workspaceFolders) if (fileURI.fsPath.startsWith(folder.uri.fsPath)) {
          fileName = fileURI.fsPath.replace(folder.uri.fsPath, "");
          break;
        }
        githubLogger.info(`'${fileName}'`, `Similar code with ${pluralize(allLicenses.length, "license type")}`, `[${allLicenses.join(", ")}]`, `${citation.match.github_url.replace(/,\s*$/, "")}&editor=vscode`, matchLocation, shortenedMatchText), copilotOutputLogTelemetry.handleWrite({
          context: ctx
        });
      }
    });
  };
},__name(handlePostInsertion, "handlePostInsertion");,function registerPostInsertionListener(ctx) {
  let logger = GitHubCopilotLogger.create(ctx),
    initialNotificationCommand = R1.commands.registerCommand(OutputPaneShowCommand, () => logger.forceShow()),
    insertionNotificationHandler = handlePostInsertion(logger),
    notifier = ctx.get(PostInsertionNotifier);
  return notifier.on("onPostInsertion", insertionNotificationHandler), new R1.Disposable(() => {
    notifier.off("onPostInsertion", insertionNotificationHandler), initialNotificationCommand.dispose();
  });
},__name(registerPostInsertionListener, "registerPostInsertionListener");,var _CodeReference = class _CodeReference {
  constructor(ctx) {
    this.ctx = ctx;
    this.onCopilotToken = __name(token => {
      var _a;
      if (!token.envelope.code_quote_enabled) {
        ConnectionState.setDisabled(), (_a = this.subscriptions) == null || _a.dispose(), this.subscriptions = void 0, codeReferenceLogger.debug(this.ctx, "Public code references are disabled.");
        return;
      }
      this.annotationsHeaderContributor.updateAnnotationsEnabled(token.envelope.annotations_enabled), ConnectionState.setConnected(), codeReferenceLogger.info(this.ctx, "Public code references are enabled."), this.subscriptions || (this.subscriptions = Eae.Disposable.from(registerCopilotEnvelopeListener(this.ctx), registerPostInsertionListener(this.ctx), registerCodeRefEngagementTracker(this.ctx)));
    }, "onCopilotToken");
    this.tokenNotifier = ctx.get(CopilotTokenNotifier), this.annotationsHeaderContributor = new AnnotationsHeaderContributor();
  }
  dispose() {
    var _a;
    (_a = this.subscriptions) == null || _a.dispose(), this.ctx.get(HeaderContributors).remove(this.annotationsHeaderContributor), this.tokenNotifier.off("onCopilotToken", this.onCopilotToken);
  }
  register() {
    return isRunningInTest(this.ctx) || this.tokenNotifier.on("onCopilotToken", this.onCopilotToken), this.ctx.get(HeaderContributors).add(this.annotationsHeaderContributor), this;
  }
};,__name(_CodeReference, "CodeReference");,var CodeReference = _CodeReference;