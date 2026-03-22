# Roadmap — My Portuguese Tutor

> Active roadmap. Completed versions archive to `ROADMAP_ARCHIVE.md`.
> Last updated: 2026-03-22

---

## Phase Summary (Quick-Scan Index)

| Version | Goal | Status | Depends On |
|---------|------|--------|------------|
| v0.1.0 | Foundation: scaffold, PWA, docs setup | ✅ Complete | — |
| v0.2.0 | Infrastructure: Supabase auth + Vercel deployment | Planned | v0.1.0 |
| v0.3.0 | Progress tracking, gamification, leaderboard | Planned | v0.2.0 |
| v0.4.0 | Curriculum: first lessons (A1), lesson engine | Planned | v0.3.0 |
| v0.5.0 | AI tutor: conversational practice | Planned | v0.4.0 |

---

## v0.1.0 — Foundation Setup ✅

**Goal:** Initialize project structure, PWA configuration, and process documentation.

**Scope:**
- Vite + Vue 3 + TypeScript scaffold
- PWA manifest + service worker (vite-plugin-pwa)
- Tailwind CSS v4
- Foundational docs: CLAUDE.md, ROADMAP.md, CHANGELOG.md, AI_PRODUCT_MANAGEMENT.md
- Memory system initialized
- GitHub repository connected

**Status:** Complete — 2026-03-22

---

## v0.2.0 — Infrastructure

**Goal:** Connect Supabase backend and deploy to Vercel. Foundation for all user-specific features.

**Scope:**
- Supabase project connected (auth, database)
- Email + Google OAuth login
- User profile (display name, avatar)
- Vercel deployment + CI/CD from GitHub
- Environment variables documented in `Docs/SETUP.md`

**Design doc:** TBD
**Status:** Planned

---

## v0.3.0 — Progress Tracking, Gamification & Leaderboard

**Goal:** Every session knows where the user left off. XP, streaks, badges, and a live leaderboard make learning competitive and fun.

**Scope:**
- Per-user lesson progress + spaced repetition (vocabulary retention)
- XP system + levels (8 levels, Beginner → Native Heart)
- Streaks + streak freeze
- Badges (milestone achievements)
- Global leaderboard — Weekly and All-Time views, realtime via Supabase Realtime

**Design doc:** `Docs/Design/V0.3_PROGRESS_GAMIFICATION_LEADERBOARD.md`
**Status:** Planned

---

## v0.4.0 — Curriculum: A1 Lessons

**Goal:** First real learning content. Beginner lessons built around real-life European Portuguese scenarios.

**Scope:** TBD — depends on curriculum design

**Status:** Planned

---

## v0.5.0 — AI Conversational Tutor

**Goal:** AI-powered conversation practice embedded in lessons.

**Scope:** TBD — depends on AI integration design

**Status:** Planned

---

## Dependency Notes

- v0.2.0 is the infrastructure gate — all user features depend on it
- Curriculum (v0.4.0+) methodology follows Portuguese with Carla approach: European Portuguese, scenario-based, spaced repetition, speak from day 1
- Learning resources: portuguesewithcarla.com, PDF books in `Docs/Resources/Books/`
