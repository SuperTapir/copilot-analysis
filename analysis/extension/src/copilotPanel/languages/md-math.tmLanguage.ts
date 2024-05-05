var markdownMath = {
  information_for_contributors: ["This file includes some grammar rules copied from https://github.com/James-Yu/LaTeX-Workshop/blob/master/syntax/TeX.tmLanguage.json"],
  name: "markdown-math",
  scopeName: "text.html.markdown.math",
  patterns: [{
    include: "#math"
  }],
  repository: {
    math: {
      patterns: [{
        name: "comment.line.math.tex",
        match: "((?<!\\\\)%)(.+)$",
        captures: {
          1: {
            name: "punctuation.definition.comment.math.tex"
          }
        }
      }, {
        name: "line.separator.math.tex",
        match: "(\\\\\\\\)$",
        captures: {
          1: {
            name: "punctuation.line.separator.math.tex"
          }
        }
      }, {
        name: "meta.function.math.tex",
        begin: "((\\\\)([a-zA-Z_]+))\\s*(\\{)",
        beginCaptures: {
          1: {
            name: "storage.type.function.math.tex"
          },
          2: {
            name: "punctuation.definition.function.math.tex"
          },
          3: {
            name: "entity.name.function.math.tex"
          },
          4: {
            name: "punctuation.definition.arguments.begin.math.tex"
          }
        },
        end: "\\}",
        endCaptures: {
          0: {
            name: "punctuation.definition.arguments.end.math.tex"
          }
        },
        patterns: [{
          include: "$self"
        }]
      }, {
        captures: {
          1: {
            name: "punctuation.definition.constant.math.tex"
          }
        },
        match: "(\\\\)([a-zA-Z_]+)\\b",
        name: "constant.character.math.tex"
      }, {
        captures: {
          1: {
            name: "punctuation.definition.constant.math.tex"
          }
        },
        match: "(\\\\)(?!begin\\*\\{|verb)([A-Za-z]+)",
        name: "constant.other.general.math.tex"
      }, {
        match: "(?<!\\\\)\\{",
        name: "punctuation.math.begin.bracket.curly"
      }, {
        match: "(?<!\\\\)\\}",
        name: "punctuation.math.end.bracket.curly"
      }, {
        match: "\\(",
        name: "punctuation.math.begin.bracket.round"
      }, {
        match: "\\)",
        name: "punctuation.math.end.bracket.round"
      }, {
        match: "(([0-9]*[\\.][0-9]+)|[0-9]+)",
        name: "constant.numeric.math.tex"
      }, {
        match: "[\\+\\*/_\\^-]",
        name: "punctuation.math.operator.latex"
      }]
    }
  }
};