# Documentation Workflow — My Portuguese Tutor

> Procedures for maintaining all project documents. Reference before any documentation task.

---

## The Four Document Categories

| Category | Location | Purpose | Update Cadence |
|----------|----------|---------|----------------|
| **Reference** | `Docs/` top-level | Current system state | On each release |
| **Design** | `Docs/Design/` | Proposals & specs | During planning |
| **Research** | `Docs/Research/` | Persistent findings | When complete |
| **Testing** | `Docs/Testing/` | Test logs & analysis | During QA |

## Session Logs

| File | What Goes There |
|------|----------------|
| `Docs/REQUEST_LOG.md` | Every user request — intent + context |
| `Docs/DEVELOPMENT_LOG.md` | Every session — what was done, decisions, next steps |
| `CHANGELOG.md` | Every commit — user-facing summary |
| `ROADMAP.md` | Release status + dependency graph |

## Automatic Documentation Steps

The AI agent does these WITHOUT being told:

1. **Planning a release** → create `Docs/Design/V[X.Y]_[FEATURE].md`
2. **Committing code** → update `CHANGELOG.md` + `ROADMAP.md`
3. **Release complete** → update affected reference docs in `Docs/`
4. **Release complete** → mark design doc "Implemented in vX.Y"

## Design Doc Naming

| Type | Pattern | Example |
|------|---------|---------|
| Stub/draft | `V[X.Y].x_[FEATURE].md` | `V0.2.x_LESSON_ENGINE.md` |
| Final (locked design) | `V[X.Y]_[FEATURE].md` | `V0.2.0_LESSON_ENGINE.md` |

## Archive Rotation

At major version boundaries (v0.1 → v0.2, v0.2 → v0.3):
- Completed ROADMAP sections → `ROADMAP_ARCHIVE.md`
- Old DEVELOPMENT_LOG entries → `Docs/DEVELOPMENT_LOG_ARCHIVE.md`

## Cross-Reference Conventions

- Reference docs → link to their design docs
- Design docs → link to research that informed them
- Implemented design docs → note "Implemented in vX.Y — see [REF_DOC.md]"
