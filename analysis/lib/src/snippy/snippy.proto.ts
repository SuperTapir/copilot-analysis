var import_typebox = Dr($l()),
  MatchError = Zs.Type.Object({
    kind: Zs.Type.Literal("failure"),
    reason: Zs.Type.String(),
    code: Zs.Type.Number(),
    msg: Zs.Type.String(),
    meta: Zs.Type.Optional(Zs.Type.Any())
  }),
  Snippet = Zs.Type.Object({
    matched_source: Zs.Type.String(),
    occurrences: Zs.Type.String(),
    capped: Zs.Type.Boolean(),
    cursor: Zs.Type.String(),
    github_url: Zs.Type.String()
  }),
  MatchRequest = Zs.Type.Object({
    source: Zs.Type.String()
  }),
  MatchSuccess = Zs.Type.Object({
    snippets: Zs.Type.Array(Snippet)
  }),
  MatchResponse = Zs.Type.Union([MatchSuccess, MatchError]),
  FileMatchRequest = Zs.Type.Object({
    cursor: Zs.Type.String()
  }),
  FileMatch = Zs.Type.Object({
    commit_id: Zs.Type.String(),
    license: Zs.Type.String(),
    nwo: Zs.Type.String(),
    path: Zs.Type.String(),
    url: Zs.Type.String()
  }),
  PageInfo = Zs.Type.Object({
    has_next_page: Zs.Type.Boolean(),
    cursor: Zs.Type.String()
  }),
  LicenseStats = Zs.Type.Object({
    count: Zs.Type.Record(Zs.Type.String(), Zs.Type.String())
  }),
  FileMatchSuccess = Zs.Type.Object({
    file_matches: Zs.Type.Array(FileMatch),
    page_info: PageInfo,
    license_stats: LicenseStats
  }),
  FileMatchResponse = Zs.Type.Union([FileMatchSuccess, MatchError]);