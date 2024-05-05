async function Match(ctx, source, signal) {
  let result = await call(ctx, "Match", {
    method: "POST",
    body: assertShape(MatchRequest, {
      source: source
    })
  }, signal);
  return assertShape(MatchResponse, result);
},__name(Match, "Match");,async function FilesForMatch(ctx, {
  cursor: cursor
}, signal) {
  let result = await call(ctx, "FilesForMatch", {
    method: "POST",
    body: assertShape(FileMatchRequest, {
      cursor: cursor
    })
  }, signal);
  return assertShape(FileMatchResponse, result);
},__name(FilesForMatch, "FilesForMatch");