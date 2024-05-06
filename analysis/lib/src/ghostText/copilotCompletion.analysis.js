// 从GhostText结果中获取补全
function completionsFromGhostTextResults(
  ctx, // 上下文
  completionResults, // 补全结果
  resultType, // 结果类型
  document, // 当前文档
  position, // 当前位置
  textEditorOptions, // 文本编辑器选项
  lastShownCompletionIndex // 最后显示的补全索引
) {
  // 获取当前行
  let currentLine = document.lineAt(position),
    // 将补全结果映射为补全对象
    completions = completionResults.map((result) => {
      // 创建一个范围，从行开始到补全文本的结束
      let range = LocationFactory.range(
          LocationFactory.position(position.line, 0),
          LocationFactory.position(position.line, position.character + result.suffixCoverage)
        ),
        insertText = '';
      // 如果文本编辑器选项存在，并且当前行为空或者是空白
      // 则将补全文本标准化
      if (
        (textEditorOptions &&
          (result.completion = normalizeIndentCharacter(
            textEditorOptions,
            result.completion,
            currentLine.isEmptyOrWhitespace
          )),
        currentLine.isEmptyOrWhitespace &&
          (result.completion.displayNeedsWsOffset ||
            result.completion.completionText.startsWith(currentLine.text)))
      )
        // 设置插入文本为补全文本
        insertText = result.completion.completionText;
      else {
        // 创建一个从范围开始到当前位置的范围
        let rangeFromStart = LocationFactory.range(range.start, position);
        // 设置插入文本为范围内的文本加上补全的显示文本
        insertText = document.getText(rangeFromStart) + result.completion.displayText;
      }
      // 返回一个补全对象
      return {
        uuid: v4_default(), // 生成一个UUID
        insertText: insertText, // 插入文本
        range: range, // 范围
        file: document.uri, // 文件URI
        index: result.completion.completionIndex, // 补全索引
        telemetry: result.telemetry, // 遥测数据
        displayText: result.completion.displayText, // 显示文本
        position: position, // 位置
        offset: document.offsetAt(position), // 偏移量
        resultType: resultType, // 结果类型
      };
    });
  // 如果结果类型为2，并且最后显示的补全索引不为undefined
  if (resultType === 2 && lastShownCompletionIndex !== void 0) {
    // 找到最后显示的补全
    let lastShownCompletion = completions.find(
      (predicate) => predicate.index === lastShownCompletionIndex
    );
    // 如果找到了最后显示的补全
    if (lastShownCompletion) {
      // 过滤出除了最后显示的补全以外的其他补全
      let restCompletions = completions.filter(
        (predicate) => predicate.index !== lastShownCompletionIndex
      );
      // 将补全数组设置为最后显示的补全加上其他补全
      completions = [lastShownCompletion, ...restCompletions];
    }
  }
  // 返回补全数组
  return completions;
}