function getBasicWindowDelineations(windowLength, lines) {
  let windows = [],
    length = lines.length;
  if (length == 0) return [];
  if (length < windowLength) return [[0, length]];
  for (let startLine = 0; startLine < length - windowLength + 1; startLine++) windows.push([startLine, startLine + windowLength]);
  return windows;
},var init_windowDelineations = __esmMin(() => {
  "use strict";

  init_manipulation();
  init_parsing();
  __name(getBasicWindowDelineations, "getBasicWindowDelineations");
});