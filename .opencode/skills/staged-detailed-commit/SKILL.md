# Skill: staged-detailed-commit

# Staged-Only Detailed Commits

Commit **only the files the user has already staged** (`git diff --cached`),
never the whole working tree, and write a detailed commit message that also
credits opencode as a co-author alongside the user.

## When to use

Use when the user asks to commit staged changes, or asks for a "detailed
commit" of what they've staged. Do NOT use repo-wide blanket commits
(`git commit -am`) or `git add .` / `git add -A` — staging is the user's
responsibility and this skill must respect exactly what they staged.

## Step 1 — Inspect what is staged only

1. `git status` — confirm there are staged files. If nothing is staged,
   STOP and tell the user; never stage files on their behalf unless they
   explicitly ask.
2. `git diff --cached --stat` — the authoritative list of what will be
   committed. Everything unstaged must be left untouched.
3. `git diff --cached` — read the full staged diff to understand the change.
4. `git log --oneline -10` — match the repo's existing commit style.

## Step 2 — Write the detailed message

Write a full conventional-commit style message:

- **Subject line**: imperative, <= 72 chars, conventional prefix where the
  repo uses one (`feat:`, `fix:`, `chore:`, ...).
- **Body**: blank line after the subject, then 3-8 bullet lines explaining:
  - what changed and why (the intent, not a file list),
  - notable decisions, tradeoffs, or behavior changes,
  - anything a reviewer should pay attention to.
- Reference issues/PRs only if the user provides them.

If a `concise-commit-messages` skill exists and the user asks for short
messages there instead, that skill wins — this skill is for explicit
"detailed commit" requests.

## Step 3 — Commit with the co-author trailer

Commit ONLY the staged files with `git commit` (no `git add`, no `-a` flag).
Append the co-author trailer:

```
Co-authored-by: opencode <noreply@opencode.ai>
```

Use a heredoc so the multi-line message survives quoting:

```sh
git commit -m "$(cat <<'EOF'
feat: short imperative subject

- bullet explaining what and why
- bullet with notable decisions
- bullet for reviewer notes

Co-authored-by: opencode <noreply@opencode.ai>
EOF
)"
```

Alternative: `git commit --trailer "Co-authored-by=opencode <noreply@opencode.ai>"`.

If the user configures a different name/email for the opencode author in
their request, use theirs verbatim instead of the default above.

## Step 4 — Verify

1. `git show --stat HEAD` — confirm the commit contains exactly the files
   that were staged and nothing else.
2. `git status` — confirm previously-unstaged changes are still unstaged.
3. `git log -1 --format=%B` — confirm the message and trailer look right.

## Rules

- NEVER use `git add` (unless the user explicitly asks to stage something),
  `git commit -a`, or `git commit --amend` on commits the user made.
- NEVER commit files outside the staged set, even if they look related.
- Never commit secrets; if you spot one in the staged diff, stop and warn.
- Do not push unless the user asks.
