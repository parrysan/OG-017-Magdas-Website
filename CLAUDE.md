---
title: "OG-017-Magdas-Website — Magda's Website"
type: project-bootstrap
created: "2026-04-13"
---

# OG-017-Magdas-Website — Magda's Website

> **Bootstrap order — read these in order before doing any work in this project:**
>
> 1. `~/.claude/CLAUDE.md` → `Open-Memory-Vault/system/identity/MASTER-PROMPT.md` — Phil's identity (auto-loaded via symlink in Claude Code; other tools should mirror this).
> 2. `~/AGENT.md` → `agent-config/AGENT.md` — global operating manual (work style, skills routing, secrets policy, layering rules in §2.10).
> 3. `Open-Memory-Vault/AGENTS.md` — vault operating contract (read **only** if you will write to the vault during this session).
> 4. `Open-Memory-Vault/projects/OG-017-Magdas-Website/README.md` — durable project page (status, decisions, recent activity, vault-side context).
> 5. **This file (`CLAUDE.md`)** — project-specific overrides and live operational references (below).
>
> **The project's `CLAUDE.md` is a bootstrap manifest, not a knowledge dump.** It points at everything else. Durable knowledge lives in the vault project page. Do not duplicate.

---

## At a glance

- **Code**: `OG-017`
- **Name**: Magda's Website
- **Stakeholder**: Phil (self)
- **Status**: `active`
- **Priority**: `medium`
- **Revenue lane**: `1-service`
- **Purpose** (one sentence): Magda is a solo entrepreneur in real estate based in Warsaw, Poland. She is building her brand in the Warsaw market, and the website will be a key promotional pillar.
- **Last touched**: `2026-04-13`

---

## Where things live

| Resource | Location |
|---|---|
| **Code root** | this folder (`dev/OG-017-Magdas-Website/`) |
| **Project docs** | `./docs/` |
| **Vault project page** | `Open-Memory-Vault/projects/OG-017-Magdas-Website/README.md` |
| **GitHub repo** | https://github.com/parrysan/OG-017-Magdas-Website |
| **External systems** | none |

---

## Live references

> **Operational facts that should never have to be re-discovered.** Deployed URLs, store handles, theme IDs, API endpoints, credentials *location* (never the credentials themselves — those live in the global `.env`, see global AGENT.md §2.5). Update this section whenever a fact changes — it is the canonical source.

- **Production URL**: TBD
- **Staging / preview URL**: TBD
- **Platform handle / project ID**: TBD
- **Other identifiers**: TBD
- **Credentials**: stored in global `.env` under `OG017_*`

---

## Tech stack

Inherits OS-000-Design-System defaults (see global AGENT.md §2.7):
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 + OS-000 design tokens
- **Components**: OS-000 shared component library
- **Hosting**: Firebase Hosting
- **Design viewer**: /design-system route

Overrides: none yet — add project-specific overrides here as they emerge.

---

## Project-specific rules

> Domain rules, naming conventions, "do not" lists. Anything an LLM working in this project must know that isn't true globally. If empty, write "None — global rules apply" and stop.

- Real estate industry — professional, trustworthy tone
- Warsaw/Poland market — Polish language support required
- Photography-led — Magda's personal brand imagery is central

---

## Skills

> List any project-specific skills in `./.claude/skills/`. If none, the project uses the global library at `agent-config/skills/`. Do not duplicate the global skills inventory here — see global AGENT.md §2.2.

- **Project-local skills**: none — uses global library
- **Most relevant global skills for this project**: `frontend-design`, `brand-guidelines`, `design-guide`, `ui-ux-pro-max`

---

## Notes for the next session

> **Optional, ephemeral.** A 2–3 line free-form scratch pad of "where I left off" — not durable knowledge. Durable decisions belong in the vault project page. Wipe and rewrite freely.

Last action: Re-scaffolded with canonical CLAUDE.md template on 2026-04-13. Apple design pack applied. Next.js + OS-000 design system already in place from prior session.
Next action: Run /brainstorming to explore site structure, then begin implementation.
Open question: Content strategy — what pages/sections does Magda need?
