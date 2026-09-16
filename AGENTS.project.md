# Project Standards Integration

For substantive project work, load and enforce the canonical standards from `https://github.com/brendanb-pm/Codex-Standards` at approved revision `2951a34c7d660add75ab530fac68ea500d4fc23d`.

At the first substantive task of a session, safely fetch the canonical repository without discarding local state. Verify `2951a34c7d660add75ab530fac68ea500d4fc23d^{commit}` resolves and read the core plus only task-triggered conditional modules from a read-only checkout or worktree whose `HEAD` is exactly that revision. Do not copy, edit, commit, push, reset, or otherwise mutate canonical standards during application execution.

If the approved revision cannot be resolved or read safely, report `CANONICAL STANDARDS UNAVAILABLE` and stop substantive execution. Preserve this project's existing workspace contract and load only the context needed for the task.

After implementation and required integration for a substantive tracked story or sprint, execute `DELIVERY_CLOSEOUT_PROMPT.md` from the approved canonical checkout; do not copy its contents into this repository.
