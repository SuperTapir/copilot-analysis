var searchResult = {
  information_for_contributors: "This file is generated from ./generateTMLanguage.js.",
  name: "search-result",
  scopeName: "text.searchResult",
  patterns: [{
    begin: "^(# Query): ",
    end: `
`,
    name: "meta.header.search keyword.operator.word.search",
    beginCaptures: {
      1: {
        name: "entity.other.attribute-name"
      }
    },
    patterns: [{
      match: "(\\\\n)|(\\\\\\\\)",
      name: "entity.other.attribute-value string.unquoted constant.character.escape"
    }, {
      match: "\\\\.|\\\\$",
      name: "entity.other.attribute-value string.unquoted invalid.illegal"
    }, {
      match: `[^\\\\\\
]+`,
      name: "entity.other.attribute-value string.unquoted"
    }]
  }, {
    begin: "^(# Flags): ",
    end: `
`,
    name: "meta.header.search keyword.operator.word.search",
    beginCaptures: {
      1: {
        name: "entity.other.attribute-name"
      }
    },
    patterns: [{
      match: "(RegExp|CaseSensitive|IgnoreExcludeSettings|WordMatch)",
      name: "entity.other.attribute-value string.unquoted keyword.other"
    }, {
      match: "."
    }]
  }, {
    begin: "^(# ContextLines): ",
    end: `
`,
    name: "meta.header.search keyword.operator.word.search",
    beginCaptures: {
      1: {
        name: "entity.other.attribute-name"
      }
    },
    patterns: [{
      match: "\\d",
      name: "entity.other.attribute-value string.unquoted constant.numeric.integer"
    }, {
      match: ".",
      name: "invalid.illegal"
    }]
  }, {
    match: "^(# (?:Including|Excluding)): (.*)$",
    name: "meta.header.search keyword.operator.word.search",
    captures: {
      1: {
        name: "entity.other.attribute-name"
      },
      2: {
        name: "entity.other.attribute-value string.unquoted"
      }
    }
  }, {
    include: "#bat"
  }, {
    include: "#c"
  }, {
    include: "#clj"
  }, {
    include: "#coffee"
  }, {
    include: "#cpp"
  }, {
    include: "#cs"
  }, {
    include: "#cshtml"
  }, {
    include: "#css"
  }, {
    include: "#dart"
  }, {
    include: "#diff"
  }, {
    include: "#dockerfile"
  }, {
    include: "#fs"
  }, {
    include: "#go"
  }, {
    include: "#groovy"
  }, {
    include: "#h"
  }, {
    include: "#handlebars"
  }, {
    include: "#hlsl"
  }, {
    include: "#hpp"
  }, {
    include: "#html"
  }, {
    include: "#ini"
  }, {
    include: "#java"
  }, {
    include: "#jl"
  }, {
    include: "#js"
  }, {
    include: "#json"
  }, {
    include: "#jsx"
  }, {
    include: "#less"
  }, {
    include: "#log"
  }, {
    include: "#lua"
  }, {
    include: "#m"
  }, {
    include: "#makefile"
  }, {
    include: "#md"
  }, {
    include: "#mm"
  }, {
    include: "#p6"
  }, {
    include: "#perl"
  }, {
    include: "#php"
  }, {
    include: "#ps1"
  }, {
    include: "#pug"
  }, {
    include: "#py"
  }, {
    include: "#r"
  }, {
    include: "#rb"
  }, {
    include: "#rs"
  }, {
    include: "#scala"
  }, {
    include: "#scss"
  }, {
    include: "#sh"
  }, {
    include: "#sql"
  }, {
    include: "#swift"
  }, {
    include: "#ts"
  }, {
    include: "#tsx"
  }, {
    include: "#vb"
  }, {
    include: "#xml"
  }, {
    include: "#yaml"
  }, {
    match: "^(?!\\s)(.*?)([^\\\\\\/\\n]*)(:)$",
    name: "meta.resultBlock.search string meta.path.search",
    captures: {
      1: {
        name: "meta.path.dirname.search"
      },
      2: {
        name: "meta.path.basename.search"
      },
      3: {
        name: "punctuation.separator"
      }
    }
  }, {
    match: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+)( ))(.*))",
    name: "meta.resultBlock.search meta.resultLine.search",
    captures: {
      1: {
        name: "constant.numeric.integer meta.resultLinePrefix.search meta.resultLinePrefix.matchLinePrefix.search"
      },
      2: {
        name: "meta.resultLinePrefix.lineNumber.search"
      },
      3: {
        name: "punctuation.separator"
      },
      4: {
        name: "constant.numeric.integer meta.resultLinePrefix.search meta.resultLinePrefix.contextLinePrefix.search"
      },
      5: {
        name: "meta.resultLinePrefix.lineNumber.search"
      }
    }
  }, {
    match: "\u27EA [0-9]+ characters skipped \u27EB",
    name: "meta.resultBlock.search comment meta.resultLine.elision"
  }],
  repository: {
    bat: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.bat)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.batchfile"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.batchfile"
        }]
      }]
    },
    c: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.c)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.c"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.c"
        }]
      }]
    },
    clj: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.clj)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.clojure"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.clojure"
        }]
      }]
    },
    coffee: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.coffee)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.coffee"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.coffee"
        }]
      }]
    },
    cpp: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.(?:cpp|c\\+\\+|cc|cxx|hxx|h\\+\\+|hh))(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.cpp"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.cpp"
        }]
      }]
    },
    cs: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.cs)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.cs"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.cs"
        }]
      }]
    },
    cshtml: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.cshtml)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "text.html.cshtml"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "text.html.cshtml"
        }]
      }]
    },
    css: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.css)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.css"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.css"
        }]
      }]
    },
    dart: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.dart)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.dart"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.dart"
        }]
      }]
    },
    diff: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.diff)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.diff"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.diff"
        }]
      }]
    },
    dockerfile: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*(?:dockerfile|Dockerfile|containerfile|Containerfile))(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.dockerfile"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.dockerfile"
        }]
      }]
    },
    fs: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.fs)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.fsharp"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.fsharp"
        }]
      }]
    },
    go: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.go)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.go"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.go"
        }]
      }]
    },
    groovy: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.groovy)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.groovy"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.groovy"
        }]
      }]
    },
    h: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.h)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.objc"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.objc"
        }]
      }]
    },
    handlebars: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.(?:handlebars|hbs))(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "text.html.handlebars"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "text.html.handlebars"
        }]
      }]
    },
    hlsl: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.hlsl)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.hlsl"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.hlsl"
        }]
      }]
    },
    hpp: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.hpp)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.objcpp"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.objcpp"
        }]
      }]
    },
    html: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.html)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "text.html.basic"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "text.html.basic"
        }]
      }]
    },
    ini: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.ini)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.ini"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.ini"
        }]
      }]
    },
    java: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.java)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.java"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.java"
        }]
      }]
    },
    jl: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.jl)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.julia"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.julia"
        }]
      }]
    },
    js: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.js)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.js"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.js"
        }]
      }]
    },
    json: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.json)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.json.comments"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.json.comments"
        }]
      }]
    },
    jsx: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.jsx)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.js.jsx"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.js.jsx"
        }]
      }]
    },
    less: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.less)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.css.less"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.css.less"
        }]
      }]
    },
    log: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.log)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "text.log"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "text.log"
        }]
      }]
    },
    lua: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.lua)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.lua"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.lua"
        }]
      }]
    },
    m: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.m)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.objc"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.objc"
        }]
      }]
    },
    makefile: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*(?:makefile|Makefile)(?:\\..*)?)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.makefile"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.makefile"
        }]
      }]
    },
    md: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.md)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "text.html.markdown"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "text.html.markdown"
        }]
      }]
    },
    mm: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.mm)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.objcpp"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.objcpp"
        }]
      }]
    },
    p6: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.p6)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.perl.6"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.perl.6"
        }]
      }]
    },
    perl: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.(?:perl|pl|pm))(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.perl"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.perl"
        }]
      }]
    },
    php: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.php)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.php"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.php"
        }]
      }]
    },
    ps1: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.ps1)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.powershell"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.powershell"
        }]
      }]
    },
    pug: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.pug)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "text.pug"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "text.pug"
        }]
      }]
    },
    py: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.py)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.python"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.python"
        }]
      }]
    },
    r: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.r)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.r"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.r"
        }]
      }]
    },
    rb: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.rb)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.ruby"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.ruby"
        }]
      }]
    },
    rs: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.rs)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.rust"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.rust"
        }]
      }]
    },
    scala: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.scala)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.scala"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.scala"
        }]
      }]
    },
    scss: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.scss)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.css.scss"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.css.scss"
        }]
      }]
    },
    sh: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.sh)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.shell"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.shell"
        }]
      }]
    },
    sql: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.sql)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.sql"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.sql"
        }]
      }]
    },
    swift: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.swift)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.swift"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.swift"
        }]
      }]
    },
    ts: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.ts)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.ts"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.ts"
        }]
      }]
    },
    tsx: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.tsx)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.tsx"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.tsx"
        }]
      }]
    },
    vb: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.vb)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.asp.vb.net"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.asp.vb.net"
        }]
      }]
    },
    xml: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.xml)(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "text.xml"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "text.xml"
        }]
      }]
    },
    yaml: {
      name: "meta.resultBlock.search",
      begin: "^(?!\\s)(.*?)([^\\\\\\/\\n]*\\.(?:ya?ml))(:)$",
      end: "^(?!\\s)",
      beginCaptures: {
        0: {
          name: "string meta.path.search"
        },
        1: {
          name: "meta.path.dirname.search"
        },
        2: {
          name: "meta.path.basename.search"
        },
        3: {
          name: "punctuation.separator"
        }
      },
      patterns: [{
        name: "meta.resultLine.search meta.resultLine.multiLine.search",
        begin: "^  (?:\\s*)((\\d+) )",
        while: "^  (?:\\s*)(?:((\\d+)(:))|((\\d+) ))",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        whileCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          },
          4: {
            name: "meta.resultLinePrefix.contextLinePrefix.search"
          },
          5: {
            name: "meta.resultLinePrefix.lineNumber.search"
          }
        },
        patterns: [{
          include: "source.yaml"
        }]
      }, {
        begin: "^  (?:\\s*)((\\d+)(:))",
        while: "(?=not)possible",
        name: "meta.resultLine.search meta.resultLine.singleLine.search",
        beginCaptures: {
          0: {
            name: "constant.numeric.integer meta.resultLinePrefix.search"
          },
          1: {
            name: "meta.resultLinePrefix.matchLinePrefix.search"
          },
          2: {
            name: "meta.resultLinePrefix.lineNumber.search"
          },
          3: {
            name: "punctuation.separator"
          }
        },
        patterns: [{
          include: "source.yaml"
        }]
      }]
    }
  }
};