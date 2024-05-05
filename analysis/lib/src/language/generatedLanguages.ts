var knownLanguages = {
  abap: {
    extensions: [".abap"]
  },
  aspdotnet: {
    extensions: [".asax", ".ascx", ".ashx", ".asmx", ".aspx", ".axd"]
  },
  bat: {
    extensions: [".bat", ".cmd"]
  },
  bibtex: {
    extensions: [".bib", ".bibtex"]
  },
  blade: {
    extensions: [".blade", ".blade.php"]
  },
  BluespecSystemVerilog: {
    extensions: [".bsv"]
  },
  c: {
    extensions: [".c", ".cats", ".h", ".idc"]
  },
  csharp: {
    extensions: [".cake", ".cs", ".csx", ".linq"]
  },
  cpp: {
    extensions: [".c++", ".cc", ".cp", ".cpp", ".cppm", ".cxx", ".h", ".h++", ".hh", ".hpp", ".hxx", ".idl", ".inc", ".inl", ".ino", ".ipp", ".ixx", ".rc", ".re", ".tcc", ".tpp", ".txx", ".i"]
  },
  css: {
    extensions: [".css", ".wxss"]
  },
  clojure: {
    extensions: [".bb", ".boot", ".cl2", ".clj", ".cljc", ".cljs", ".cljs.hl", ".cljscm", ".cljx", ".edn", ".hic"],
    filenames: ["riemann.config"]
  },
  ql: {
    extensions: [".ql", ".qll"]
  },
  coffeescript: {
    extensions: ["._coffee", ".cake", ".cjsx", ".coffee", ".iced"],
    filenames: ["Cakefile"]
  },
  cuda: {
    extensions: [".cu", ".cuh"]
  },
  dart: {
    extensions: [".dart"]
  },
  dockerfile: {
    extensions: [".dockerfile"],
    filenames: ["Containerfile", "Dockerfile"]
  },
  dotenv: {
    extensions: [".env"],
    filenames: [".env", ".env.ci", ".env.dev", ".env.development", ".env.development.local", ".env.example", ".env.local", ".env.prod", ".env.production", ".env.staging", ".env.test", ".env.testing"]
  },
  html: {
    extensions: [".ect", ".ejs", ".ejs.t", ".jst", ".hta", ".htm", ".html", ".html.hl", ".html5", ".inc", ".jsp", ".njk", ".tpl", ".twig", ".wxml", ".xht", ".xhtml", ".phtml", ".liquid"]
  },
  elixir: {
    extensions: [".ex", ".exs"],
    filenames: ["mix.lock"]
  },
  erlang: {
    extensions: [".app", ".app.src", ".erl", ".es", ".escript", ".hrl", ".xrl", ".yrl"],
    filenames: ["Emakefile", "rebar.config", "rebar.config.lock", "rebar.lock"]
  },
  fsharp: {
    extensions: [".fs", ".fsi", ".fsx"]
  },
  go: {
    extensions: [".go"]
  },
  groovy: {
    extensions: [".gradle", ".groovy", ".grt", ".gtpl", ".gvy", ".jenkinsfile"],
    filenames: ["Jenkinsfile", "Jenkinsfile"]
  },
  graphql: {
    extensions: [".gql", ".graphql", ".graphqls"]
  },
  terraform: {
    extensions: [".hcl", ".nomad", ".tf", ".tfvars", ".workflow"]
  },
  hlsl: {
    extensions: [".cginc", ".fx", ".fxh", ".hlsl", ".hlsli"]
  },
  erb: {
    extensions: [".erb", ".erb.deface", ".rhtml"]
  },
  razor: {
    extensions: [".cshtml", ".razor"]
  },
  haml: {
    extensions: [".haml", ".haml.deface"]
  },
  handlebars: {
    extensions: [".handlebars", ".hbs"]
  },
  haskell: {
    extensions: [".hs", ".hs-boot", ".hsc"]
  },
  ini: {
    extensions: [".cfg", ".cnf", ".dof", ".ini", ".lektorproject", ".prefs", ".pro", ".properties", ".url"],
    filenames: [".coveragerc", ".flake8", ".pylintrc", "HOSTS", "buildozer.spec", "hosts", "pylintrc", "vlcrc"]
  },
  json: {
    extensions: [".4DForm", ".4DProject", ".JSON-tmLanguage", ".avsc", ".geojson", ".gltf", ".har", ".ice", ".json", ".jsonl", ".mcmeta", ".tfstate", ".tfstate.backup", ".topojson", ".webapp", ".webmanifest", ".yy", ".yyp"],
    filenames: [".all-contributorsrc", ".arcconfig", ".auto-changelog", ".c8rc", ".htmlhintrc", ".imgbotconfig", ".nycrc", ".tern-config", ".tern-project", ".watchmanconfig", "Pipfile.lock", "composer.lock", "deno.lock", "flake.lock", "mcmod.info"]
  },
  jsonc: {
    extensions: [".code-snippets", ".code-workspace", ".jsonc", ".sublime-build", ".sublime-commands", ".sublime-completions", ".sublime-keymap", ".sublime-macro", ".sublime-menu", ".sublime-mousemap", ".sublime-project", ".sublime-settings", ".sublime-theme", ".sublime-workspace", ".sublime_metrics", ".sublime_session"],
    filenames: [".babelrc", ".devcontainer.json", ".eslintrc.json", ".jscsrc", ".jshintrc", ".jslintrc", ".swcrc", "api-extractor.json", "argv.json", "devcontainer.json", "extensions.json", "jsconfig.json", "keybindings.json", "language-configuration.json", "launch.json", "profiles.json", "settings.json", "tasks.json", "tsconfig.json", "tslint.json"]
  },
  java: {
    extensions: [".jav", ".java", ".jsh"]
  },
  javascript: {
    extensions: ["._js", ".bones", ".cjs", ".es", ".es6", ".frag", ".gs", ".jake", ".javascript", ".js", ".jsb", ".jscad", ".jsfl", ".jslib", ".jsm", ".jspre", ".jss", ".mjs", ".njs", ".pac", ".sjs", ".ssjs", ".xsjs", ".xsjslib"],
    filenames: ["Jakefile"]
  },
  julia: {
    extensions: [".jl"]
  },
  python: {
    extensions: [".ipynb", ".cgi", ".codon", ".fcgi", ".gyp", ".gypi", ".lmi", ".py", ".py3", ".pyde", ".pyi", ".pyp", ".pyt", ".pyw", ".rpy", ".sage", ".spec", ".tac", ".wsgi", ".xpy"],
    filenames: ["Notebook", ".gclient", "DEPS", "SConscript", "SConstruct", "wscript"]
  },
  kotlin: {
    extensions: [".kt", ".ktm", ".kts"]
  },
  less: {
    extensions: [".less"]
  },
  lua: {
    extensions: [".fcgi", ".lua", ".luau", ".nse", ".p8", ".pd_lua", ".rbxs", ".rockspec", ".wlua"],
    filenames: [".luacheckrc"]
  },
  makefile: {
    extensions: [".d", ".mak", ".make", ".makefile", ".mk", ".mkfile"],
    filenames: ["BSDmakefile", "GNUmakefile", "Kbuild", "Makefile", "Makefile.am", "Makefile.boot", "Makefile.frag", "Makefile.in", "Makefile.inc", "Makefile.wat", "makefile", "makefile.sco", "mkfile"]
  },
  markdown: {
    extensions: [".livemd", ".markdown", ".md", ".mdown", ".mdwn", ".mdx", ".mkd", ".mkdn", ".mkdown", ".ronn", ".scd", ".workbook"],
    filenames: ["contents.lr"]
  },
  "objective-c": {
    extensions: [".h", ".m"]
  },
  "objective-cpp": {
    extensions: [".mm"]
  },
  php: {
    extensions: [".aw", ".ctp", ".fcgi", ".inc", ".install", ".module", ".php", ".php3", ".php4", ".php5", ".phps", ".phpt", ".theme"],
    filenames: [".php", ".php_cs", ".php_cs.dist", "Phakefile"]
  },
  perl: {
    extensions: [".al", ".cgi", ".fcgi", ".perl", ".ph", ".pl", ".plx", ".pm", ".psgi", ".t"],
    filenames: [".latexmkrc", "Makefile.PL", "Rexfile", "ack", "cpanfile", "latexmkrc"]
  },
  powershell: {
    extensions: [".ps1", ".psd1", ".psm1"]
  },
  pug: {
    extensions: [".jade", ".pug"]
  },
  r: {
    extensions: [".r", ".rd", ".rsx"],
    filenames: [".Rprofile", "expr-dist"]
  },
  ruby: {
    extensions: [".builder", ".eye", ".fcgi", ".gemspec", ".god", ".jbuilder", ".mspec", ".pluginspec", ".podspec", ".prawn", ".rabl", ".rake", ".rb", ".rbi", ".rbuild", ".rbw", ".rbx", ".ru", ".ruby", ".spec", ".thor", ".watchr"],
    filenames: [".irbrc", ".pryrc", ".simplecov", "Appraisals", "Berksfile", "Brewfile", "Buildfile", "Capfile", "Dangerfile", "Deliverfile", "Fastfile", "Gemfile", "Guardfile", "Jarfile", "Mavenfile", "Podfile", "Puppetfile", "Rakefile", "Snapfile", "Steepfile", "Thorfile", "Vagrantfile", "buildfile"]
  },
  rust: {
    extensions: [".rs", ".rs.in"]
  },
  scss: {
    extensions: [".scss"]
  },
  sql: {
    extensions: [".cql", ".ddl", ".inc", ".mysql", ".prc", ".sql", ".tab", ".udf", ".viw"]
  },
  sass: {
    extensions: [".sass"]
  },
  scala: {
    extensions: [".kojo", ".sbt", ".sc", ".scala"]
  },
  shellscript: {
    extensions: [".bash", ".bats", ".cgi", ".command", ".fcgi", ".fish", ".ksh", ".sh", ".sh.in", ".tmux", ".tool", ".trigger", ".zsh", ".zsh-theme"],
    filenames: [".bash_aliases", ".bash_functions", ".bash_history", ".bash_logout", ".bash_profile", ".bashrc", ".cshrc", ".flaskenv", ".kshrc", ".login", ".profile", ".zlogin", ".zlogout", ".zprofile", ".zshenv", ".zshrc", "9fs", "PKGBUILD", "bash_aliases", "bash_logout", "bash_profile", "bashrc", "cshrc", "gradlew", "kshrc", "login", "man", "profile", "zlogin", "zlogout", "zprofile", "zshenv", "zshrc"]
  },
  slim: {
    extensions: [".slim"]
  },
  solidity: {
    extensions: [".sol"]
  },
  stylus: {
    extensions: [".styl"]
  },
  svelte: {
    extensions: [".svelte"]
  },
  swift: {
    extensions: [".swift"]
  },
  systemverilog: {
    extensions: [".sv", ".svh", ".vh"]
  },
  typescriptreact: {
    extensions: [".tsx"]
  },
  latex: {
    extensions: [".aux", ".bbx", ".cbx", ".cls", ".dtx", ".ins", ".lbx", ".ltx", ".mkii", ".mkiv", ".mkvi", ".sty", ".tex", ".toc"]
  },
  typescript: {
    extensions: [".cts", ".mts", ".ts"]
  },
  verilog: {
    extensions: [".v", ".veo"]
  },
  vb: {
    extensions: [".vb", ".vbhtml", ".Dsr", ".bas", ".cls", ".ctl", ".frm", ".vbs"]
  },
  vue: {
    extensions: [".nvue", ".vue"]
  },
  xml: {
    extensions: [".adml", ".admx", ".ant", ".axaml", ".axml", ".builds", ".ccproj", ".ccxml", ".clixml", ".cproject", ".cscfg", ".csdef", ".csl", ".csproj", ".ct", ".depproj", ".dita", ".ditamap", ".ditaval", ".dll.config", ".dotsettings", ".filters", ".fsproj", ".fxml", ".glade", ".gml", ".gmx", ".grxml", ".gst", ".hzp", ".iml", ".ivy", ".jelly", ".jsproj", ".kml", ".launch", ".mdpolicy", ".mjml", ".mod", ".mxml", ".natvis", ".ncl", ".ndproj", ".nproj", ".nuspec", ".odd", ".osm", ".pkgproj", ".plist", ".pluginspec", ".proj", ".props", ".ps1xml", ".psc1", ".pt", ".pubxml", ".qhelp", ".rdf", ".res", ".resx", ".rss", ".sch", ".scxml", ".sfproj", ".shproj", ".srdf", ".storyboard", ".sublime-snippet", ".svg", ".sw", ".targets", ".tml", ".typ", ".ui", ".urdf", ".ux", ".vbproj", ".vcxproj", ".vsixmanifest", ".vssettings", ".vstemplate", ".vxml", ".wixproj", ".workflow", ".wsdl", ".wsf", ".wxi", ".wxl", ".wxs", ".x3d", ".xacro", ".xaml", ".xib", ".xlf", ".xliff", ".xmi", ".xml", ".xml.dist", ".xmp", ".xproj", ".xsd", ".xspec", ".xul", ".zcml"],
    filenames: [".classpath", ".cproject", ".project", "App.config", "NuGet.config", "Settings.StyleCop", "Web.Debug.config", "Web.Release.config", "Web.config", "packages.config"]
  },
  xsl: {
    extensions: [".xsl", ".xslt"]
  },
  yaml: {
    extensions: [".mir", ".reek", ".rviz", ".sublime-syntax", ".syntax", ".yaml", ".yaml-tmlanguage", ".yaml.sed", ".yml", ".yml.mysql"],
    filenames: [".clang-format", ".clang-tidy", ".gemrc", "CITATION.cff", "glide.lock", "yarn.lock"]
  },
  javascriptreact: {
    extensions: [".jsx"]
  },
  legend: {
    extensions: [".pure"]
  }
};