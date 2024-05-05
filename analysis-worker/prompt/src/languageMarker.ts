function hasLanguageMarker({
  source: source
}) {
  return source.startsWith("#!") || source.startsWith("<!DOCTYPE");
},function comment(text, languageId, defaultCommentMarker) {
  let markers = languageCommentMarkers[languageId] ?? defaultCommentMarker;
  if (markers) {
    let end = markers.end == "" ? "" : " " + markers.end;
    return `${markers.start} ${text}${end}`;
  }
  return "";
},function commentBlockAsSingles(text, languageId, defaultCommentMarker) {
  if (!languageCommentMarkers[languageId] && !defaultCommentMarker || text === "") return "";
  let trailingNewline = text.endsWith(`
`),
    commented = (trailingNewline ? text.slice(0, -1) : text).split(`
`).map(line => comment(line, languageId, defaultCommentMarker)).join(`
`);
  return trailingNewline ? commented + `
` : commented;
},function getLanguageMarker(doc, defaultCommentMarker) {
  let {
    languageId: languageId
  } = doc;
  return dontAddLanguageMarker.indexOf(languageId) === -1 && !hasLanguageMarker(doc) ? languageId in shebangLines ? shebangLines[languageId] : comment(`Language: ${languageId}`, languageId, defaultCommentMarker) : "";
},function getPathMarker(doc, defaultCommentMarker) {
  return doc.relativePath ? comment(`Path: ${doc.relativePath}`, doc.languageId, defaultCommentMarker) : "";
},function newLineEnded(str) {
  return str === "" || str.endsWith(`
`) ? str : str + `
`;
},var languageCommentMarkers,
  dontAddLanguageMarker,
  shebangLines,
  init_languageMarker = __esmMin(() => {
    "use strict";

    languageCommentMarkers = {
      abap: {
        start: '"',
        end: ""
      },
      aspdotnet: {
        start: "<%--",
        end: "--%>"
      },
      bat: {
        start: "REM",
        end: ""
      },
      bibtex: {
        start: "%",
        end: ""
      },
      blade: {
        start: "#",
        end: ""
      },
      BluespecSystemVerilog: {
        start: "//",
        end: ""
      },
      c: {
        start: "//",
        end: ""
      },
      clojure: {
        start: ";",
        end: ""
      },
      coffeescript: {
        start: "//",
        end: ""
      },
      cpp: {
        start: "//",
        end: ""
      },
      csharp: {
        start: "//",
        end: ""
      },
      css: {
        start: "/*",
        end: "*/"
      },
      cuda: {
        start: "//",
        end: ""
      },
      dart: {
        start: "//",
        end: ""
      },
      dockerfile: {
        start: "#",
        end: ""
      },
      dotenv: {
        start: "#",
        end: ""
      },
      elixir: {
        start: "#",
        end: ""
      },
      erb: {
        start: "<%#",
        end: "%>"
      },
      erlang: {
        start: "%",
        end: ""
      },
      fsharp: {
        start: "//",
        end: ""
      },
      go: {
        start: "//",
        end: ""
      },
      graphql: {
        start: "#",
        end: ""
      },
      groovy: {
        start: "//",
        end: ""
      },
      haml: {
        start: "-#",
        end: ""
      },
      handlebars: {
        start: "{{!",
        end: "}}"
      },
      haskell: {
        start: "--",
        end: ""
      },
      hlsl: {
        start: "//",
        end: ""
      },
      html: {
        start: "<!--",
        end: "-->"
      },
      ini: {
        start: ";",
        end: ""
      },
      java: {
        start: "//",
        end: ""
      },
      javascript: {
        start: "//",
        end: ""
      },
      javascriptreact: {
        start: "//",
        end: ""
      },
      jsonc: {
        start: "//",
        end: ""
      },
      jsx: {
        start: "//",
        end: ""
      },
      julia: {
        start: "#",
        end: ""
      },
      kotlin: {
        start: "//",
        end: ""
      },
      latex: {
        start: "%",
        end: ""
      },
      legend: {
        start: "//",
        end: ""
      },
      less: {
        start: "//",
        end: ""
      },
      lua: {
        start: "--",
        end: ""
      },
      makefile: {
        start: "#",
        end: ""
      },
      markdown: {
        start: "[]: #",
        end: ""
      },
      "objective-c": {
        start: "//",
        end: ""
      },
      "objective-cpp": {
        start: "//",
        end: ""
      },
      perl: {
        start: "#",
        end: ""
      },
      php: {
        start: "//",
        end: ""
      },
      powershell: {
        start: "#",
        end: ""
      },
      pug: {
        start: "//",
        end: ""
      },
      python: {
        start: "#",
        end: ""
      },
      ql: {
        start: "//",
        end: ""
      },
      r: {
        start: "#",
        end: ""
      },
      razor: {
        start: "<!--",
        end: "-->"
      },
      ruby: {
        start: "#",
        end: ""
      },
      rust: {
        start: "//",
        end: ""
      },
      sass: {
        start: "//",
        end: ""
      },
      scala: {
        start: "//",
        end: ""
      },
      scss: {
        start: "//",
        end: ""
      },
      shellscript: {
        start: "#",
        end: ""
      },
      slim: {
        start: "/",
        end: ""
      },
      solidity: {
        start: "//",
        end: ""
      },
      sql: {
        start: "--",
        end: ""
      },
      stylus: {
        start: "//",
        end: ""
      },
      svelte: {
        start: "<!--",
        end: "-->"
      },
      swift: {
        start: "//",
        end: ""
      },
      systemverilog: {
        start: "//",
        end: ""
      },
      terraform: {
        start: "#",
        end: ""
      },
      tex: {
        start: "%",
        end: ""
      },
      typescript: {
        start: "//",
        end: ""
      },
      typescriptreact: {
        start: "//",
        end: ""
      },
      vb: {
        start: "'",
        end: ""
      },
      verilog: {
        start: "//",
        end: ""
      },
      "vue-html": {
        start: "<!--",
        end: "-->"
      },
      vue: {
        start: "//",
        end: ""
      },
      xml: {
        start: "<!--",
        end: "-->"
      },
      xsl: {
        start: "<!--",
        end: "-->"
      },
      yaml: {
        start: "#",
        end: ""
      }
    }, dontAddLanguageMarker = ["php", "plaintext"], shebangLines = {
      html: "<!DOCTYPE html>",
      python: "#!/usr/bin/env python3",
      ruby: "#!/usr/bin/env ruby",
      shellscript: "#!/bin/sh",
      yaml: "# YAML data"
    };
    __name(hasLanguageMarker, "hasLanguageMarker");
    __name(comment, "comment");
    __name(commentBlockAsSingles, "commentBlockAsSingles");
    __name(getLanguageMarker, "getLanguageMarker");
    __name(getPathMarker, "getPathMarker");
    __name(newLineEnded, "newLineEnded");
  });