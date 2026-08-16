---
name: concise-commit-messages
description: Keep AI-generated Git commit messages extremely short, clear, and imperative.
---

# Concise Commit Messages

When creating a Git commit, use an extremely small commit message:

- One line only.
- Imperative mood.
- Prefer 3-6 words.
- Keep it under 50 characters when practical.
- Describe the primary change only.
- Do not add a body, explanation, attribution, emoji, or generated-by text.

Good examples:

```text
Split chat screen
Add repository search skill
Fix attachment picker
Update dark theme
```

Avoid vague messages such as `Updates`, `Fixes`, or `Changes`. If the change
contains multiple unrelated tasks, ask for separate commits rather than
combining details into a long message.
