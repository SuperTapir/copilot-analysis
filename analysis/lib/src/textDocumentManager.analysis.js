var path = require('path');

class TextDocumentManager {
  // 构造函数，接收一个上下文对象
  constructor(ctx) {
    this.ctx = ctx;
  }

  // 获取所有有效的文本文档
  async textDocuments() {
    let documents = await this.getOpenTextDocuments(),
      filteredDocuments = [];
    for (let doc of documents)
      (await isDocumentValid(this.ctx, doc)).status === 'valid' && filteredDocuments.push(doc);
    return filteredDocuments;
  }

  // 获取一个文本文档，如果文档有效，则返回文档
  getTextDocument(uri) {
    return this.getTextDocumentWithValidation(uri).then((result) => {
      if (result.status === 'valid') return result.document;
    });
  }

  // 获取一个文本文档并验证其有效性
  async getTextDocumentWithValidation(uri) {
    try {
      let document = (await this.getOpenTextDocuments()).find(
        (t) => t.uri.toString() == uri.toString()
      );
      return !document && ((document = await this.openTextDocument(uri)), !document)
        ? await this.notFoundResult(uri)
        : isDocumentValid(this.ctx, document);
    } catch {
      return await this.notFoundResult(uri);
    }
  }

  // 如果找不到文档，返回一个包含错误信息的对象
  async notFoundResult(uri) {
    let knownDocs = (await this.textDocuments()).map((doc) => doc.uri).join(', ');
    return {
      status: 'notfound',
      message: `Document for URI could not be found: ${uri}, URIs of the known document are: ${knownDocs}`,
    };
  }

  // 打开一个文本文档，这个方法默认会抛出一个错误，需要在子类中重写
  openTextDocument(uri) {
    return Promise.reject(new Error('Not found'));
  }

  // 获取文档所在的工作区文件夹
  async getWorkspaceFolder(doc) {
    return this.getWorkspaceFolders().find((folder) => {
      if (doc.uri.toString().startsWith(folder.toString())) return folder;
    });
  }

  // 获取文档相对于工作区的路径
  async getRelativePath(doc) {
    if (doc.uri.scheme !== 'untitled') {
      for (let uri of this.getWorkspaceFolders()) {
        let parentURI = uri
          .with({
            query: '',
            fragment: '',
          })
          .toString()
          .replace(/\/?$/, '/');
        if (doc.uri.toString().startsWith(parentURI))
          return doc.uri.toString().slice(parentURI.length);
      }
      return path.basename(doc.uri.fsPath);
    }
  }
}
