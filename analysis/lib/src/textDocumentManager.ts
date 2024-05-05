var path = require("path"),
  _TextDocumentManager = class _TextDocumentManager {
    constructor(ctx) {
      this.ctx = ctx;
    }
    async textDocuments() {
      let documents = await this.getOpenTextDocuments(),
        filteredDocuments = [];
      for (let doc of documents) (await isDocumentValid(this.ctx, doc)).status === "valid" && filteredDocuments.push(doc);
      return filteredDocuments;
    }
    getTextDocument(uri) {
      return this.getTextDocumentWithValidation(uri).then(result => {
        if (result.status === "valid") return result.document;
      });
    }
    async getTextDocumentWithValidation(uri) {
      try {
        let document = (await this.getOpenTextDocuments()).find(t => t.uri.toString() == uri.toString());
        return !document && (document = await this.openTextDocument(uri), !document) ? await this.notFoundResult(uri) : isDocumentValid(this.ctx, document);
      } catch {
        return await this.notFoundResult(uri);
      }
    }
    async notFoundResult(uri) {
      let knownDocs = (await this.textDocuments()).map(doc => doc.uri).join(", ");
      return {
        status: "notfound",
        message: `Document for URI could not be found: ${uri}, URIs of the known document are: ${knownDocs}`
      };
    }
    openTextDocument(uri) {
      return Promise.reject(new Error("Not found"));
    }
    async getWorkspaceFolder(doc) {
      return this.getWorkspaceFolders().find(folder => {
        if (doc.uri.toString().startsWith(folder.toString())) return folder;
      });
    }
    async getRelativePath(doc) {
      if (doc.uri.scheme !== "untitled") {
        for (let uri of this.getWorkspaceFolders()) {
          let parentURI = uri.with({
            query: "",
            fragment: ""
          }).toString().replace(/\/?$/, "/");
          if (doc.uri.toString().startsWith(parentURI)) return doc.uri.toString().slice(parentURI.length);
        }
        return path.basename(doc.uri.fsPath);
      }
    }
  };,__name(_TextDocumentManager, "TextDocumentManager");,var TextDocumentManager = _TextDocumentManager;