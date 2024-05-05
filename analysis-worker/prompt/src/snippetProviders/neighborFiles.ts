var NeighborFilesProvider,
  init_neighborFiles = __esmMin(() => {
    "use strict";

    init_lib();
    init_neighboringFiles();
    init_snippetProvider();
    NeighborFilesProvider = class extends SnippetProvider {
      constructor() {
        super(...arguments);
        this.type = "neighboring-tabs";
      }
      static {
        __name(this, "NeighborFilesProvider");
      }
      async buildSnippets(context) {
        let {
          currentFile: currentFile,
          neighborFiles: neighborFiles,
          options: options
        } = context;
        return options && neighborFiles && neighborFiles.length && options.neighboringTabs !== "none" ? await this.api.getNeighborSnippets(currentFile, neighborFiles, options.neighboringTabs) : [];
      }
    };
  });