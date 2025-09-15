**Spec Summary**
- Problem: Scaffold and normalize Elm library projects by generating standard docs, Makefile targets, aliases, and boilerplate from minimal inputs.
- Core CLI: `baldrick-elm generate` via `commander` with options: `-f/--feature` (features like `lib`, `no:test`), `-ga/--github-account`, `-n/--name`, `-b/--bin`, `-l/--license` (`BSD3`, `UNLICENSED`), `-ch/--copyright-holder`, `-cy/--copyright-start-year`, `-cod/--codacy-id`, `-cd/--current-dir`.
- Behavior: Computes a core project model, then writes or updates `README.md`, `TECHNICAL_DESIGN.md`, `MAINTENANCE.md`, `LICENSE`, `Makefile`, `.aliases.zsh`, `commands.txt`, and appends a `.message` commit message. Creates `src/` and `tests/` directories.
- Markdown APIs: Simple parser/formatter for README-like docs (`parseMarkdown`, `markdownToString`, `commandToMd`) to preserve selected sections and rebuild with badges and standard chapters.
- Expected inputs: CLI args and optional existing `README.md`/`TECHNICAL_DESIGN.md` contents. Expected environment: Node ≥ 14, write access to working directory; optional external tools referenced in generated Makefile.
- Outputs: Updated markdown docs, Makefile tasks, shell aliases, and helper files in target directory; console info/error via term formatters.
- Assumptions/limitations:
  - Focused on Elm libraries; generated Makefile assumes external tools (`elm`, `elm-test`, `elm-format`, `baldrick-whisker`, `baldrick-dev-ts`, `elm-doc-preview`, `act`, `gh`).
  - Markdown parsing is heuristic (badge and section detection) and may mis-handle complex README layouts or inline links.
  - No dry-run, prompts, or backup; files are overwritten.
  - License text generation supports only `BSD3` or a placeholder; package itself is MIT-licensed.

**Salvageable Ideas**
- Option schema → `commander` adapter: Central `CmdOption` model and `toCommanderOption` reduce CLI duplication and keep flags, descriptions, defaults, and choices consistent.
- Context-to-core model: `computeCoreProject` derives defaults from `cwd` and inputs (e.g., name/bin from folder), a clean pattern for CLIs that scaffold repos.
- Terminal formatters: `basicFormatter`/`errorFormatter` with `human` vs `default` JSONish output is a compact console UX abstraction.
- Markdown structuring helpers: `parseMarkdown` + `markdownToString` + `commandToMd` provide a minimal, composable doc pipeline for rebuilding standard sections while retaining allowed content.
- Maintenance automation as data: Command descriptions (`MdCommand`) drive both rendered docs and Makefile generation (`getMakefileCommands`/`makefile`). This single-source-of-truth pattern is reusable.
- Workspace FS wrapper: Using `fs-jetpack` with a `createWorkspace` abstraction eases targeting a different `current-dir` and keeps IO concentrated in `io-sfx.ts`.
- Snapshot testing for docs: Tests assert full-document snapshots for README/TECHNICAL_DESIGN/Makefile and inline snapshots for small helpers; effective for content-heavy generators.
- Small utility set: `stringBetween`, `findHeader`, `findQuote` are simple, focused helpers useful across doc tooling.
- Separation of concerns: Thin CLI (`cli.mts`/`client.ts`), command declaration (`commanding.ts`), action (`commanding-action.ts`), and IO layer (`io-sfx.ts`).

**Pitfalls to Avoid**
- Feature mismatch: `cmdOptionsGenerator.feature` includes `'gen'` but `feature-helper` does not accept it; conversely `'no:lint'` is accepted by the helper but not offered in choices. Passing `'gen'` will throw at runtime.
- License inconsistencies: Package is MIT-licensed while generator defaults to producing `BSD3` or `CUSTOM` LICENSE files for targets; easy to confuse users and automation.
- Naive markdown parsing: Badge detection relies on patterns like `") !"` and `stringBetween`, which can break with inline links, footnotes, or multi-line constructs; may mis-extract badges or sections.
- Overwriting without guardrails: No dry-run, confirmation, or backup; can accidentally clobber handcrafted docs or Makefiles.
- Hidden side-effects: Writes `.aliases.zsh` and `.message` in project root; may surprise users or leak into source control.
- Implicit external dependencies: Generated Makefile assumes numerous CLIs are installed; no detection or graceful degradation.
- Year parsing: `copyrightStartYear` is parsed with `Number.parseInt` without validation; `NaN` can leak into outputs.
- Global usage ambiguity: `dev-tasks.ts` uses a `global` truthiness for labeling which version is used; this is unclear and environment-dependent.
- Sparse API docs: `API.md` is largely a stub (`commanding` shown as `undefined`), undermining discoverability.
- Testing gaps: No tests for CLI wiring or filesystem side-effects; failures would surface only at runtime.

**Recommendations**
- Align feature flags across option choices and validators; add validation with clear error messages.
- Unify license behavior and defaults; document expectations distinctly from this package’s own license.
- Improve markdown parsing with a real parser or more robust heuristics; add tests for edge cases.
- Add `--dry-run`, `--yes`, and backup/merge strategies for file updates; surface a clear diff.
- Detect external tools and surface helpful guidance if missing; optionally generate Makefile targets conditionally.
- Validate and sanitize numeric/string inputs; fail fast with context.
- Expand tests to cover CLI path, IO actions (using a temp dir), and end-to-end runs.

**Salvage Notes**
- Reuse the command model → multi-output generation approach to keep docs, Makefile, and help text in sync.
- Keep the `CmdOption` → `commander` adapter pattern for DRY CLI definitions.
- Preserve the `computeCoreProject` defaulting rules and `RunnerContext` idea for context-aware scaffolding.
- Port the terminal formatter helpers to future CLIs for consistent, compact logging.
- Extract markdown helpers and Makefile generator as standalone utilities with stronger parsing and validation.
