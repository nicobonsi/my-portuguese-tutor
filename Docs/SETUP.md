# Setup Guide — My Portuguese Tutor

## Prerequisites

- Node.js 20+
- npm 10+
- A Supabase account (project already created)
- A Vercel account (connected to GitHub repo)

---

## Local Development

### 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because `vite-plugin-pwa` does not yet declare support for Vite 8.

### 2. Create `.env.local`

Create a `.env.local` file in the project root (never commit this file — it is gitignored):

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-publishable-key>
```

Get these values from: **Supabase Dashboard → Settings → API**

### 3. Run the dev server

```bash
npm run dev
```

App will be available at http://localhost:5173

---

## Supabase Project

| Setting | Value |
|---------|-------|
| Project name | my-portuguese-tutor |
| Project URL | https://qpgwzzwriijlmamcidbn.supabase.co |
| Region | (as configured) |
| Auth providers | Email, Google OAuth |

**Never commit the anon key or service role key to git.**

---

## Vercel Deployment

### Environment variables to add in Vercel Dashboard → Project → Settings → Environment Variables:

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_SUPABASE_URL` | `https://qpgwzzwriijlmamcidbn.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | *(your publishable key)* | Production, Preview, Development |

### Build settings (Vercel auto-detects these for Vite):

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install --legacy-peer-deps` |

---

## Future Environment Variables (not yet needed)

| Name | Purpose |
|------|---------|
| `VITE_ANTHROPIC_API_KEY` | AI tutor — will be proxied through Vercel serverless function, NOT used client-side |
