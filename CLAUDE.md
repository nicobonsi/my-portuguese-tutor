# My Portuguese Tutor — Claude Operating Instructions

> This file is loaded automatically in every AI session. It is the operating system for this project.
> Process framework: see `Docs/AI_PRODUCT_MANAGEMENT.md`

---

## Product Vision

My Portuguese Tutor is a PWA (Progressive Web App) that acts as an AI-powered Portuguese language tutor. It works on desktop and smartphone, is fully responsive, and is installable from any browser. Users learn Portuguese through conversational AI, structured exercises, and personalized lessons.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Vue 3 + TypeScript (Composition API) |
| Build | Vite 8 |
| PWA | vite-plugin-pwa (Workbox) |
| Styling | Tailwind CSS v4 |
| Deployment | GitHub Pages (or TBD) |

---

## Build Commands

```bash
npm run dev       # Development server (localhost:5173)
npm run build     # Production build (dist/)
npm run preview   # Preview production build
```

---

## Versioning Rules

- **Sequential numbering:** v0.1.0, v0.1.1, v0.2.0 — no letter suffixes
- **One version = one commit** — focused scope per release
- **Patch versions** (v0.1.0.1) only for mid-build discoveries, never planned items
- **Small releases preferred** — reviewable in one sitting, revertable without collateral damage

---

## Documentation Trigger Table

Before modifying a file, read the relevant reference doc:

| If you're touching... | Read first... |
|----------------------|---------------|
| App shell, routing, layout | `Docs/ARCHITECTURE.md` (when created) |
| Any new feature/system | `Docs/Design/` relevant design doc |
| Lesson / curriculum logic | `Docs/CURRICULUM.md` (when created) |
| AI/LLM integration | `Docs/AI_INTEGRATION.md` (when created) |
| PWA manifest / service worker | `vite.config.ts` + `Docs/ARCHITECTURE.md` |

---

## Documentation Workflow

### Every Request
1. Assess scope: trivial fix or feature?
2. For features: create design doc in `Docs/Design/V[X.Y]_[FEATURE].md`
3. After committing: update affected reference docs

### Phase Rules
| Phase | Output |
|-------|--------|
| Research | `Docs/Research/[TOPIC].md` |
| Design | `Docs/Design/V[X.Y]_[FEATURE].md` |
| Build | Code + CHANGELOG.md + DEVELOPMENT_LOG.md |
| Release | Updated reference docs in `Docs/` |

### Automatic Steps (no need to be told)
- Planning a release → create release design doc
- Committing code → update CHANGELOG.md + ROADMAP.md
- Release complete → update reference docs, mark design doc "Implemented in vX.Y"

---

## Key Conventions

- **Component files:** PascalCase (`LessonCard.vue`, `VoiceInput.vue`)
- **Composables:** camelCase with `use` prefix (`useLesson.ts`, `useAudio.ts`)
- **Services:** camelCase (`tutorService.ts`, `lessonService.ts`)
- **Docs:** ALL_CAPS_WITH_UNDERSCORES (`ARCHITECTURE.md`, `CURRICULUM.md`)
- **Tailwind only** — no inline styles, no external CSS frameworks

---

## Security Rules

- Never commit API keys — use `.env.local` (gitignored)
- All AI API calls go through a backend proxy or secure serverless function — never expose keys client-side
- `.env.local` is gitignored — document required env vars in `Docs/SETUP.md`

---

## Known Mistakes

*(Rules accumulated from operator corrections — grows over time)*

- None yet — project just started

---

## Current Build Context

**Current:** v0.1.0 — Foundation setup (scaffold, PWA config, foundational docs)
- Status: Initial setup complete, awaiting product details from operator
- Design doc: none yet (scaffold phase)

**Previous:** N/A (new project)

---

## Process Reference

Full process: `Docs/AI_PRODUCT_MANAGEMENT.md`
