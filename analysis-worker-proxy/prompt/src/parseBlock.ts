var BaseBlockParser = class {
    constructor(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild) {
      this.languageId = languageId;
      this.nodeMatch = nodeMatch;
      this.nodeTypesWithBlockOrStmtChild = nodeTypesWithBlockOrStmtChild;
    }
    static {
      __name(this, "BaseBlockParser");
    }
    async getNodeMatchAtPosition(text, offset, cb) {
      let tree = await parseTreeSitter(this.languageId, text);
      try {
        let nodeToComplete = tree.rootNode.descendantForIndex(offset);
        for (; nodeToComplete;) {
          let blockNodeType = this.nodeMatch[nodeToComplete.type];
          if (blockNodeType) {
            if (!this.nodeTypesWithBlockOrStmtChild.has(nodeToComplete.type)) break;
            let fieldLabel = this.nodeTypesWithBlockOrStmtChild.get(nodeToComplete.type);
            if ((fieldLabel == "" ? nodeToComplete.namedChildren[0] : nodeToComplete.childForFieldName(fieldLabel))?.type == blockNodeType) break;
          }
          nodeToComplete = nodeToComplete.parent;
        }
        return nodeToComplete ? cb(nodeToComplete) : void 0;
      } finally {
        tree.delete();
      }
    }
    getNextBlockAtPosition(text, offset, cb) {
      return this.getNodeMatchAtPosition(text, offset, nodeToComplete => {
        let block = nodeToComplete.children.reverse().find(x => x.type == this.nodeMatch[nodeToComplete.type]);
        if (block) {
          if (this.languageId == "python" && block.parent) {
            let parent = block.parent.type == ":" ? block.parent.parent : block.parent,
              nextComment = parent?.nextSibling;
            for (; nextComment && nextComment.type == "comment";) {
              let commentInline = nextComment.startPosition.row == block.endPosition.row && nextComment.startPosition.column >= block.endPosition.column,
                commentAtEnd = nextComment.startPosition.row > parent.endPosition.row && nextComment.startPosition.column > parent.startPosition.column;
              if (commentInline || commentAtEnd) block = nextComment, nextComment = nextComment.nextSibling;else break;
            }
          }
          if (!(block.endIndex >= block.tree.rootNode.endIndex - 1 && (block.hasError() || block.parent.hasError()))) return cb(block);
        }
      });
    }
    async isBlockBodyFinished(prefix, completion, offset) {
      let solution = (prefix + completion).trimEnd(),
        endIndex = await this.getNextBlockAtPosition(solution, offset, block => block.endIndex);
      if (endIndex !== void 0 && endIndex < solution.length) {
        let lengthOfBlock = endIndex - prefix.length;
        return lengthOfBlock > 0 ? lengthOfBlock : void 0;
      }
    }
    getNodeStart(text, offset) {
      let solution = text.trimEnd();
      return this.getNodeMatchAtPosition(solution, offset, block => block.startIndex);
    }
  },
  RegexBasedBlockParser = class extends BaseBlockParser {
    constructor(languageId, blockEmptyMatch, lineMatch, nodeMatch, nodeTypesWithBlockOrStmtChild) {
      super(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild);
      this.blockEmptyMatch = blockEmptyMatch;
      this.lineMatch = lineMatch;
    }
    static {
      __name(this, "RegexBasedBlockParser");
    }
    isBlockStart(line) {
      return this.lineMatch.test(line.trimStart());
    }
    async isBlockBodyEmpty(text, offset) {
      let res = await this.getNextBlockAtPosition(text, offset, block => {
        block.startIndex < offset && (offset = block.startIndex);
        let blockText = text.substring(offset, block.endIndex).trim();
        return blockText == "" || blockText.replace(/\s/g, "") == this.blockEmptyMatch;
      });
      return res === void 0 || res;
    }
    async isEmptyBlockStart(text, offset) {
      return offset = rewindToNearestNonWs(text, offset), this.isBlockStart(getLineAtOffset(text, offset)) && this.isBlockBodyEmpty(text, offset);
    }
  };,function getLineAtOffset(text, offset) {
  let prevNewline = text.lastIndexOf(`
`, offset - 1),
    nextNewline = text.indexOf(`
`, offset);
  return nextNewline < 0 && (nextNewline = text.length), text.slice(prevNewline + 1, nextNewline);
},__name(getLineAtOffset, "getLineAtOffset");,function rewindToNearestNonWs(text, offset) {
  let result = offset;
  for (; result > 0 && /\s/.test(text.charAt(result - 1));) result--;
  return result;
},__name(rewindToNearestNonWs, "rewindToNearestNonWs");,function indent(nd, source) {
  let startIndex = nd.startIndex,
    lineStart = nd.startIndex - nd.startPosition.column,
    prefix = source.substring(lineStart, startIndex);
  if (/^\s*$/.test(prefix)) return prefix;
},__name(indent, "indent");,function outdented(fst, snd, source) {
  if (snd.startPosition.row <= fst.startPosition.row) return !1;
  let fstIndent = indent(fst, source),
    sndIndent = indent(snd, source);
  return fstIndent !== void 0 && sndIndent !== void 0 && fstIndent.startsWith(sndIndent);
},__name(outdented, "outdented");,var TreeSitterBasedBlockParser = class extends BaseBlockParser {
    constructor(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild, startKeywords, blockNodeType, emptyStatementType, curlyBraceLanguage) {
      super(languageId, nodeMatch, nodeTypesWithBlockOrStmtChild);
      this.startKeywords = startKeywords;
      this.blockNodeType = blockNodeType;
      this.emptyStatementType = emptyStatementType;
      this.curlyBraceLanguage = curlyBraceLanguage;
    }
    static {
      __name(this, "TreeSitterBasedBlockParser");
    }
    isBlockEmpty(block, offset) {
      let trimmed = block.text.trim();
      return this.curlyBraceLanguage && (trimmed.startsWith("{") && (trimmed = trimmed.slice(1)), trimmed.endsWith("}") && (trimmed = trimmed.slice(0, -1)), trimmed = trimmed.trim()), !!(trimmed.length == 0 || this.languageId == "python" && (block.parent?.type == "class_definition" || block.parent?.type == "function_definition") && block.children.length == 1 && queryPythonIsDocstring(block.parent));
    }
    async isEmptyBlockStart(text, offset) {
      if (offset > text.length) throw new RangeError("Invalid offset");
      for (let i = offset; i < text.length && text.charAt(i) != `
`; i++) if (/\S/.test(text.charAt(i))) return !1;
      offset = rewindToNearestNonWs(text, offset);
      let tree = await parseTreeSitter(this.languageId, text);
      try {
        let nodeAtPos = tree.rootNode.descendantForIndex(offset - 1);
        if (nodeAtPos == null || this.curlyBraceLanguage && nodeAtPos.type == "}") return !1;
        if ((this.languageId == "javascript" || this.languageId == "typescript") && nodeAtPos.parent && nodeAtPos.parent.type == "object" && nodeAtPos.parent.text.trim() == "{") return !0;
        if (this.languageId == "typescript") {
          let currNode = nodeAtPos;
          for (; currNode.parent;) {
            if (currNode.type == "function_signature" || currNode.type == "method_signature") {
              let next = nodeAtPos.nextSibling;
              return next && currNode.hasError() && outdented(currNode, next, text) ? !0 : !currNode.children.find(c => c.type == ";") && currNode.endIndex <= offset;
            }
            currNode = currNode.parent;
          }
        }
        let errorNode = null,
          blockNode = null,
          blockParentNode = null,
          currNode = nodeAtPos;
        for (; currNode != null;) {
          if (currNode.type == this.blockNodeType) {
            blockNode = currNode;
            break;
          }
          if (this.nodeMatch[currNode.type]) {
            blockParentNode = currNode;
            break;
          }
          if (currNode.type == "ERROR") {
            errorNode = currNode;
            break;
          }
          currNode = currNode.parent;
        }
        if (blockNode != null) {
          if (!blockNode.parent || !this.nodeMatch[blockNode.parent.type]) return !1;
          if (this.languageId == "python") {
            let prevSibling = blockNode.previousSibling;
            if (prevSibling != null && prevSibling.hasError() && (prevSibling.text.startsWith('"""') || prevSibling.text.startsWith("'''"))) return !0;
          }
          return this.isBlockEmpty(blockNode, offset);
        }
        if (errorNode != null) {
          if (errorNode.previousSibling?.type == "module" || errorNode.previousSibling?.type == "internal_module" || errorNode.previousSibling?.type == "def") return !0;
          let children = [...errorNode.children].reverse(),
            keyword = children.find(child => this.startKeywords.includes(child.type)),
            block = children.find(child => child.type == this.blockNodeType);
          if (keyword) {
            switch (this.languageId) {
              case "python":
                {
                  keyword.type == "try" && nodeAtPos.type == "identifier" && nodeAtPos.text.length > 4 && (block = children.find(child => child.hasError())?.children.find(child => child.type == "block"));
                  let colonNode,
                    parenCount = 0;
                  for (let child of errorNode.children) {
                    if (child.type == ":" && parenCount == 0) {
                      colonNode = child;
                      break;
                    }
                    child.type == "(" && (parenCount += 1), child.type == ")" && (parenCount -= 1);
                  }
                  if (colonNode && keyword.endIndex <= colonNode.startIndex && colonNode.nextSibling) {
                    if (keyword.type == "def") {
                      let sibling = colonNode.nextSibling;
                      if (sibling.type == '"' || sibling.type == "'" || sibling.type == "ERROR" && (sibling.text == '"""' || sibling.text == "'''")) return !0;
                    }
                    return !1;
                  }
                  break;
                }
              case "javascript":
                {
                  let formalParameters = children.find(child => child.type == "formal_parameters");
                  if (keyword.type == "class" && formalParameters) return !0;
                  let leftCurlyBrace = children.find(child => child.type == "{");
                  if (leftCurlyBrace && leftCurlyBrace.startIndex > keyword.endIndex && leftCurlyBrace.nextSibling != null || children.find(child => child.type == "do") && keyword.type == "while" || keyword.type == "=>" && keyword.nextSibling && keyword.nextSibling.type != "{") return !1;
                  break;
                }
              case "typescript":
                {
                  let leftCurlyBrace = children.find(child => child.type == "{");
                  if (leftCurlyBrace && leftCurlyBrace.startIndex > keyword.endIndex && leftCurlyBrace.nextSibling != null || children.find(child => child.type == "do") && keyword.type == "while" || keyword.type == "=>" && keyword.nextSibling && keyword.nextSibling.type != "{") return !1;
                  break;
                }
            }
            return block && block.startIndex > keyword.endIndex ? this.isBlockEmpty(block, offset) : !0;
          }
        }
        if (blockParentNode != null) {
          let expectedType = this.nodeMatch[blockParentNode.type],
            block = blockParentNode.children.slice().reverse().find(x => x.type == expectedType);
          if (block) return this.isBlockEmpty(block, offset);
          if (this.nodeTypesWithBlockOrStmtChild.has(blockParentNode.type)) {
            let fieldLabel = this.nodeTypesWithBlockOrStmtChild.get(blockParentNode.type),
              child = fieldLabel == "" ? blockParentNode.children[0] : blockParentNode.childForFieldName(fieldLabel);
            if (child && child.type != this.blockNodeType && child.type != this.emptyStatementType) return !1;
          }
          return !0;
        }
        return !1;
      } finally {
        tree.delete();
      }
    }
  },
  wasmLanguageToBlockParser = {
    python: new TreeSitterBasedBlockParser("python", {
      class_definition: "block",
      elif_clause: "block",
      else_clause: "block",
      except_clause: "block",
      finally_clause: "block",
      for_statement: "block",
      function_definition: "block",
      if_statement: "block",
      try_statement: "block",
      while_statement: "block",
      with_statement: "block"
    }, new Map(), ["def", "class", "if", "elif", "else", "for", "while", "try", "except", "finally", "with"], "block", null, !1),
    javascript: new TreeSitterBasedBlockParser("javascript", {
      arrow_function: "statement_block",
      catch_clause: "statement_block",
      do_statement: "statement_block",
      else_clause: "statement_block",
      finally_clause: "statement_block",
      for_in_statement: "statement_block",
      for_statement: "statement_block",
      function: "statement_block",
      function_declaration: "statement_block",
      generator_function: "statement_block",
      generator_function_declaration: "statement_block",
      if_statement: "statement_block",
      method_definition: "statement_block",
      try_statement: "statement_block",
      while_statement: "statement_block",
      with_statement: "statement_block",
      class: "class_body",
      class_declaration: "class_body"
    }, new Map([["arrow_function", "body"], ["do_statement", "body"], ["else_clause", ""], ["for_in_statement", "body"], ["for_statement", "body"], ["if_statement", "consequence"], ["while_statement", "body"], ["with_statement", "body"]]), ["=>", "try", "catch", "finally", "do", "for", "if", "else", "while", "with", "function", "function*", "class"], "statement_block", "empty_statement", !0),
    typescript: new TreeSitterBasedBlockParser("typescript", {
      ambient_declaration: "statement_block",
      arrow_function: "statement_block",
      catch_clause: "statement_block",
      do_statement: "statement_block",
      else_clause: "statement_block",
      finally_clause: "statement_block",
      for_in_statement: "statement_block",
      for_statement: "statement_block",
      function: "statement_block",
      function_declaration: "statement_block",
      generator_function: "statement_block",
      generator_function_declaration: "statement_block",
      if_statement: "statement_block",
      internal_module: "statement_block",
      method_definition: "statement_block",
      module: "statement_block",
      try_statement: "statement_block",
      while_statement: "statement_block",
      abstract_class_declaration: "class_body",
      class: "class_body",
      class_declaration: "class_body"
    }, new Map([["arrow_function", "body"], ["do_statement", "body"], ["else_clause", ""], ["for_in_statement", "body"], ["for_statement", "body"], ["if_statement", "consequence"], ["while_statement", "body"], ["with_statement", "body"]]), ["declare", "=>", "try", "catch", "finally", "do", "for", "if", "else", "while", "with", "function", "function*", "class"], "statement_block", "empty_statement", !0),
    tsx: new TreeSitterBasedBlockParser("typescriptreact", {
      ambient_declaration: "statement_block",
      arrow_function: "statement_block",
      catch_clause: "statement_block",
      do_statement: "statement_block",
      else_clause: "statement_block",
      finally_clause: "statement_block",
      for_in_statement: "statement_block",
      for_statement: "statement_block",
      function: "statement_block",
      function_declaration: "statement_block",
      generator_function: "statement_block",
      generator_function_declaration: "statement_block",
      if_statement: "statement_block",
      internal_module: "statement_block",
      method_definition: "statement_block",
      module: "statement_block",
      try_statement: "statement_block",
      while_statement: "statement_block",
      abstract_class_declaration: "class_body",
      class: "class_body",
      class_declaration: "class_body"
    }, new Map([["arrow_function", "body"], ["do_statement", "body"], ["else_clause", ""], ["for_in_statement", "body"], ["for_statement", "body"], ["if_statement", "consequence"], ["while_statement", "body"], ["with_statement", "body"]]), ["declare", "=>", "try", "catch", "finally", "do", "for", "if", "else", "while", "with", "function", "function*", "class"], "statement_block", "empty_statement", !0),
    go: new RegexBasedBlockParser("go", "{}", /\b(func|if|else|for)\b/, {
      communication_case: "block",
      default_case: "block",
      expression_case: "block",
      for_statement: "block",
      func_literal: "block",
      function_declaration: "block",
      if_statement: "block",
      labeled_statement: "block",
      method_declaration: "block",
      type_case: "block"
    }, new Map()),
    ruby: new RegexBasedBlockParser("ruby", "end", /\b(BEGIN|END|case|class|def|do|else|elsif|for|if|module|unless|until|while)\b|->/, {
      begin_block: "}",
      block: "}",
      end_block: "}",
      lambda: "block",
      for: "do",
      until: "do",
      while: "do",
      case: "end",
      do: "end",
      if: "end",
      method: "end",
      module: "end",
      unless: "end",
      do_block: "end"
    }, new Map())
  };