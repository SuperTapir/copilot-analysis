var path = require("path"),
  _Language = class _Language {
    constructor(languageId, isGuess, fileExtension) {
      this.languageId = languageId;
      this.isGuess = isGuess;
      this.fileExtension = fileExtension;
    }
  };,__name(_Language, "Language");,var Language = _Language,
  _LanguageDetection = class _LanguageDetection {};,__name(_LanguageDetection, "LanguageDetection");,var LanguageDetection = _LanguageDetection;,function primeLanguageDetectionCache(ctx, doc) {
  ctx.get(LanguageDetection).detectLanguage(doc);
},__name(primeLanguageDetectionCache, "primeLanguageDetectionCache");,function getLanguageDetection(ctx) {
  return new CachingLanguageDetection(new UntitledLanguageDetection(new GroupingLanguageDetection(new FilenameAndExensionLanguageDetection())), new NotebookLanguageDetection(ctx));
},__name(getLanguageDetection, "getLanguageDetection");,var _CachingLanguageDetection = class _CachingLanguageDetection extends LanguageDetection {
  constructor(delegate, notebookDelegate) {
    super();
    this.delegate = delegate;
    this.notebookDelegate = notebookDelegate;
    this.cache = new LRUCacheMap(100);
  }
  detectLanguage(doc) {
    let filename = path.basename(doc.uri.path);
    return isNotebook(filename) ? this.notebookDelegate.detectLanguage(doc) : this.detectLanguageForRegularFile(filename, doc);
  }
  detectLanguageForRegularFile(filename, doc) {
    let language = this.cache.get(filename);
    return language || (language = this.delegate.detectLanguage(doc), language.isGuess || this.cache.set(filename, language)), language;
  }
};,__name(_CachingLanguageDetection, "CachingLanguageDetection");,var CachingLanguageDetection = _CachingLanguageDetection;,function isNotebook(filename) {
  return filename.endsWith(".ipynb");
},__name(isNotebook, "isNotebook");,var _NotebookLanguageDetection = class _NotebookLanguageDetection extends LanguageDetection {
  constructor(ctx) {
    super();
    this.ctx = ctx;
  }
  detectLanguage(doc) {
    let notebook = this.ctx.get(TextDocumentManager).findNotebook(doc);
    return notebook ? this.detectCellLanguage(doc, notebook) : new Language("python", !1, ".ipynb");
  }
  detectCellLanguage(doc, notebook) {
    let activeCell = notebook.getCells().find(cell => cell.document.uri.toString() === doc.uri.toString());
    return activeCell ? new Language(activeCell.document.languageId, !1, ".ipynb") : new Language("unknown", !1, ".ipynb");
  }
};,__name(_NotebookLanguageDetection, "NotebookLanguageDetection");,var NotebookLanguageDetection = _NotebookLanguageDetection,
  _FilenameAndExensionLanguageDetection = class _FilenameAndExensionLanguageDetection extends LanguageDetection {
    detectLanguage(doc) {
      let filename = path.basename(doc.uri.path),
        extension = path.extname(filename).toLowerCase(),
        extensionWithoutTemplate = this.extensionWithoutTemplateLanguage(filename, extension),
        languageIdWithGuessing = this.detectLanguageId(filename, extensionWithoutTemplate);
      return new Language(languageIdWithGuessing.languageId, languageIdWithGuessing.isGuess, this.computeFullyQualifiedExtension(extension, extensionWithoutTemplate));
    }
    extensionWithoutTemplateLanguage(filename, extension) {
      if (knownTemplateLanguageExtensions.includes(extension)) {
        let filenameWithoutExtension = filename.substring(0, filename.lastIndexOf(".")),
          extensionWithoutTemplate = path.extname(filenameWithoutExtension).toLowerCase();
        if (extensionWithoutTemplate.length > 0 && knownFileExtensions.includes(extensionWithoutTemplate) && this.isExtensionValidForTemplateLanguage(extension, extensionWithoutTemplate)) return extensionWithoutTemplate;
      }
      return extension;
    }
    isExtensionValidForTemplateLanguage(extension, extensionWithoutTemplate) {
      let limitations = templateLanguageLimitations[extension];
      return !limitations || limitations.includes(extensionWithoutTemplate);
    }
    detectLanguageId(filename, extension) {
      var _a, _b;
      let candidatesByExtension = [],
        candidatesByFilename = [];
      for (let language in knownLanguages) {
        let info = knownLanguages[language];
        if (info.filenames) {
          if (info.filenames.includes(filename)) return {
            languageId: language,
            isGuess: !1
          };
          info.filenames.some(candidate => filename.startsWith(candidate + ".")) && candidatesByFilename.push(language);
        }
        info.extensions.includes(extension) && candidatesByExtension.push(language);
      }
      return (_b = (_a = this.determineLanguageIdByCandidates(candidatesByExtension)) != null ? _a : this.determineLanguageIdByCandidates(candidatesByFilename)) != null ? _b : {
        languageId: "unknown",
        isGuess: !0
      };
    }
    determineLanguageIdByCandidates(candidates) {
      if (candidates.length === 1) return {
        languageId: candidates[0],
        isGuess: !1
      };
      if (candidates.length > 1) return {
        languageId: candidates[0],
        isGuess: !0
      };
    }
    computeFullyQualifiedExtension(extension, extensionWithoutTemplate) {
      return extension !== extensionWithoutTemplate ? extensionWithoutTemplate + extension : extension;
    }
  };,__name(_FilenameAndExensionLanguageDetection, "FilenameAndExensionLanguageDetection");,var FilenameAndExensionLanguageDetection = _FilenameAndExensionLanguageDetection,
  _GroupingLanguageDetection = class _GroupingLanguageDetection extends LanguageDetection {
    constructor(delegate) {
      super();
      this.delegate = delegate;
    }
    detectLanguage(doc) {
      let language = this.delegate.detectLanguage(doc),
        languageId = language.languageId;
      return languageId === "c" || languageId === "cpp" ? new Language("cpp", language.isGuess, language.fileExtension) : language;
    }
  };,__name(_GroupingLanguageDetection, "GroupingLanguageDetection");,var GroupingLanguageDetection = _GroupingLanguageDetection,
  _UntitledLanguageDetection = class _UntitledLanguageDetection extends LanguageDetection {
    constructor(delegate) {
      super();
      this.delegate = delegate;
    }
    detectLanguage(doc) {
      return doc.uri.scheme === "untitled" ? new Language(doc.languageId, !0, "") : this.delegate.detectLanguage(doc);
    }
  };,__name(_UntitledLanguageDetection, "UntitledLanguageDetection");,var UntitledLanguageDetection = _UntitledLanguageDetection;