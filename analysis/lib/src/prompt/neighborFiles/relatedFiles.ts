var _LRURelatedFileCacheMap = class _LRURelatedFileCacheMap extends LRUCacheMap {
  constructor(size, defaultEvictionTimeMs = 5 * 60 * 1e3) {
    super(size);
    this.defaultEvictionTimeMs = defaultEvictionTimeMs;
    this._cacheTimestamps = new Map();
  }
  get(key) {
    let entry = super.get(key);
    if (this.isValid(key)) return entry;
    this.deleteExpiredEntry(key);
  }
  set(key, value) {
    return this._cacheTimestamps.set(key, Date.now()), super.set(key, value);
  }
  clear() {
    super.clear(), this._cacheTimestamps.clear();
  }
  isValid(key) {
    let ts = this._cacheTimestamps.get(key);
    return ts !== void 0 && Date.now() - ts < this.defaultEvictionTimeMs;
  }
  deleteExpiredEntry(key) {
    this._cacheTimestamps.has(key) && this._cacheTimestamps.delete(key), super.get(key) && super.delete(key);
  }
};,__name(_LRURelatedFileCacheMap, "LRURelatedFileCacheMap");,var LRURelatedFileCacheMap = _LRURelatedFileCacheMap,
  relatedFilesLogger = new Logger(1, "relatedFiles"),
  lruCacheSize = 1e3,
  _RelatedFilesProvider = class _RelatedFilesProvider {};,__name(_RelatedFilesProvider, "RelatedFilesProvider");,var RelatedFilesProvider = _RelatedFilesProvider,
  EmptyRelatedFiles = new Map(),
  getRelatedFiles = __name(async function (ctx, docInfo, wksFolder, telemetryData, relatedFilesProvider) {
    try {
      return await relatedFilesProvider.getRelatedFiles(docInfo, wksFolder, telemetryData);
    } catch (error) {
      return relatedFilesLogger.debug(ctx, "Error retrieving related files", error), EmptyRelatedFiles;
    }
  }, "getRelatedFiles");,getRelatedFiles = memoize(getRelatedFiles, {
  cache: new LRURelatedFileCacheMap(lruCacheSize),
  hash: (ctx, docInfo, wksFolder, telemetryData, symbolDefinitionProvider) => `${docInfo.uri}`
});,getRelatedFiles = shortCircuit(getRelatedFiles, 200, EmptyRelatedFiles);,async function getRelatedFilesList(ctx, docInfo, wksFolder, telemetryData) {
  let relatedFilesProvider = ctx.get(RelatedFilesProvider);
  return getRelatedFiles(ctx, docInfo, wksFolder, telemetryData, relatedFilesProvider);
},__name(getRelatedFilesList, "getRelatedFilesList");,function considerNeighborFile(languageId, neighborLanguageId) {
  return (0, ZT.normalizeLanguageId)(languageId) === (0, ZT.normalizeLanguageId)(neighborLanguageId);
},__name(considerNeighborFile, "considerNeighborFile");,var _NeighborSource = class _NeighborSource {
  static reset() {
    _NeighborSource.instance = void 0;
  }
  static async getNeighborFiles(ctx, uri, featuresFilterArgs, telemetryData) {
    let docManager = ctx.get(TextDocumentManager);
    _NeighborSource.instance === void 0 && (_NeighborSource.instance = new OpenTabFiles(docManager));
    let result = await _NeighborSource.instance.getNeighborFiles(uri, featuresFilterArgs.fileType, _NeighborSource.MAX_NEIGHBOR_FILES),
      doc = await docManager.getTextDocument(uri);
    if (!doc) return relatedFilesLogger.debug(ctx, "neighborFiles.getNeighborFiles", "Failed to get the document"), result;
    let wksFolder = await docManager.getWorkspaceFolder(doc),
      folder = wksFolder ? getFsPath(wksFolder) : void 0;
    if (wksFolder && folder) {
      let docInfo = {
          relativePath: (0, YT.relative)(folder, uri.fsPath),
          uri: doc.uri.toString(),
          languageId: doc.languageId,
          source: doc.getText()
        },
        relatedFiles = await getRelatedFilesList(ctx, docInfo, wksFolder, telemetryData);
      if (relatedFiles != null && relatedFiles.size) {
        let addedDocs = [];
        relatedFiles.forEach((value, key) => {
          let uri = xV.URI.file(key).toString(),
            relatedFileDocInfo = {
              relativePath: (0, YT.relative)(folder, key),
              uri: uri,
              languageId: doc.languageId,
              source: value
            };
          result.docs.has(uri) || (addedDocs.unshift(relatedFileDocInfo), result.docs.set(uri, relatedFileDocInfo));
        }), addedDocs.length > 0 && result.neighborSource.set("languageservice", addedDocs.map(doc => doc.uri.toString()));
      }
    } else relatedFilesLogger.debug(ctx, "neighborFiles.getNeighborFiles", "Failed to get the workspace folder");
    return result;
  }
};,__name(_NeighborSource, "NeighborSource"), _NeighborSource.MAX_NEIGHBOR_AGGREGATE_LENGTH = 2e5, _NeighborSource.MAX_NEIGHBOR_FILES = 20, _NeighborSource.EXCLUDED_NEIGHBORS = ["node_modules", "dist", "site-packages"];,var NeighborSource = _NeighborSource;