var continuations = ["\\{", "\\}", "\\[", "\\]", "\\(", "\\)"].concat(["then", "else", "elseif", "elif", "catch", "finally", "fi", "done", "end", "loop", "until", "where", "when"].map(s => s + "\\b")),
  continuationRegex = new RegExp(`^(${continuations.join("|")})`);