---
name: repository-search
description: Use across the repository when searching files or source code; prefer ripgrep (rg) over grep whenever rg is available.
---

# Repository Search

Use `rg` for repository text searches whenever it is available. This applies
to every package and service in the monorepo, not only React Native work.

## Rules

- Check for `rg` with `command -v rg` if availability is uncertain.
- Prefer `rg "pattern"` over `grep "pattern"`.
- Prefer `rg --files` over `find` when locating files by name or extension.
- Use `rg -n` when line numbers are useful for code references.
- Respect `.gitignore` by default; do not search `node_modules`, `dist`,
  `target`, generated native directories, or build output unless the task
  specifically requires it.
- Quote patterns and paths that contain shell metacharacters or spaces.
- Use fixed-string matching with `rg -F` when the search text is not a regex.
- Use an explicit file glob such as `-g '*.tsx'` to narrow broad searches.

When the environment provides a dedicated repository search tool, it may be
used for discovery, but shell searches should still use `rg` rather than
`grep` when `rg` is installed.
