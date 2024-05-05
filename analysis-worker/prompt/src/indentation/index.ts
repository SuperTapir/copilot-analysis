var init_indentation = __esmMin(() => {
  "use strict";

  init_java();
  init_markdown();
  init_parsing();
  init_classes();
  init_description();
  init_manipulation();
  init_parsing();
  registerLanguageSpecificParser("markdown", processMarkdown);
  registerLanguageSpecificParser("java", processJava);
});