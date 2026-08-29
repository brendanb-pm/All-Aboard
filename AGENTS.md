# All-Aboard — Repository Instructions

These rules apply repository-wide unless a more-specific descendant `AGENTS.md` overrides them.

## Canonical standards

Canonical standards are maintained only in:

`https://github.com/brendanb-pm/Codex-Standards`

Use one shared local read-only checkout for all projects.

Resolve the checkout path in this order:

1. `CODEX_STANDARDS_HOME`, when set.
2. Otherwise `$HOME/.codex/Codex-Standards`.

At the first substantive task of a session, refresh that checkout once:

- if missing, clone `https://github.com/brendanb-pm/Codex-Standards`;
- if present and clean, update it with a fast-forward-only pull from `main`;
- do not refresh again for every task in the same session;
- agents must never edit, commit, push, reset, or otherwise mutate the canonical standards repository except for the refresh operation above.

If the checkout is dirty, conflicted, or cannot be safely refreshed, do not reset or discard anything automatically. Report the condition. A previously cached clean checkout may be used only when `Codex-Standards.md` is present; report `STANDARDS SOURCE: CACHED; FRESHNESS: UNVERIFIED`. If no usable checkout exists, stop substantive execution and report `CANONICAL STANDARDS UNAVAILABLE`.

Load only:

- `<standards-home>/Codex-Standards.md`; and
- conditional modules triggered by the task.

Do not copy canonical standards into this repository. Do not load every module by default. Use the core deterministic model/priority policy: select once before execution and do not continue discussing model choice during the run.

## Project state

All-Aboard is an evolving product. Do not invent architecture, data contracts, integrations, or security assumptions when they have not yet been made durable in the repository.

Before substantive implementation:

- inspect the current PRD/specification and architecture artifacts actually present in the repository;
- preserve explicit scope boundaries and integration assumptions;
- surface material ambiguity rather than silently choosing a product direction;
- create or update durable architecture/contract documentation when a decision becomes implementation-critical.

## Integration and data boundaries

Treat HRIS, identity, messaging/collaboration, employee-profile, mentor/agent, or other external-system integrations as explicit adapters rather than hidden sources of truth.

For production/external integrations, load `modules/PRODUCTION-EXTERNAL-SYSTEMS.md`. For auth/identity/permissions, load `modules/SECURITY-AUTH.md`. For schema/migrations, load `modules/DATA-MIGRATIONS.md`. For user-facing workflows, load `modules/UI-UX.md`.

Do not expose secrets, internal persistence identifiers, or sensitive employee information in routine UI, logs, fixtures, or prompts.

## Tests and reporting

Use proportional verification under the core standard. Keep completion reports concise and include applicable changed files, tests/results, loaded modules, blockers/deferred scope, commit/push state, and the core `EFF` line for substantive story work.
