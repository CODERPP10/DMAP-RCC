# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing website for DMAP Retrofit Construction Company. Vite/React SPA + Express API in one process on **port 5000** (only port; no separate frontend server). Scaffolded on Replit.

## Commands

- `npm run dev` — run app (Express + Vite middleware) on port 5000
- `npm run build` — client → `dist/public`, server bundle → `dist/index.js`
- `npm run check` — TS typecheck (no lint, no tests)
- `npm run db:push` — push `shared/schema.ts` to DB (drizzle-kit, no migration files)
- `tsx server/seed.ts` — wipe + reseed; seed data hardcoded in the script
- Needs `DATABASE_URL` (Neon serverless Postgres); server throws on startup if unset
- `npm run start` uses inline `NODE_ENV=` — breaks on Windows

## Architecture

- Aliases: `@/*`→`client/src/*`, `@shared/*`→`shared/*`, `@assets/*`→`attached_assets/*`
- `shared/schema.ts` — source of truth: Drizzle tables + drizzle-zod schemas + inferred types, used by client and server
- `server/storage.ts` — all DB access via the `storage` singleton (`IStorage`/`DatabaseStorage`); `company`/`about`/`contact` are upserted single-row tables
- `server/routes.ts` — `/api/*` REST in `registerRoutes(app)`; must register before Vite catch-all. Responses: `{ success, data?, message?, errors? }`; per-handler `errorHandler` wrapper catches Zod → 400
- Client: Wouter routing (`App.tsx`), TanStack Query (`lib/queryClient.ts`, default queryFn fetches `queryKey[0]` as URL, `staleTime: Infinity`, no retry), shadcn/ui in `components/ui/`, Tailwind theme from `theme.json`
- **UI mostly renders static data from `client/src/data/*.ts`, not the API** — the CRUD backend exists but is largely unconsumed. Check which source a page uses before changing it.
- No auth implemented (`users` table + passport/session deps exist but unused); write endpoints unprotected

## Refactor in progress

Goal: lightweight static site, no DB, Bun runtime, Dockerized behind a WAF.
Plan: `~/.claude/plans/i-want-to-refactor-smooth-shell.md`. Backup: tag `pre-refactor`.

- [x] Run on localhost (Windows) — `chore/localhost-bringup`
- [ ] Phase 1: drop DB, `/services` + `/projects` read `client/src/data/*.ts`,
      slim server to a single `/api/contact` (nodemailer + Gmail App Password)
- [ ] Phase 2: switch to Bun
- [ ] Phase 3: multi-stage Dockerfile + compose + Caddy
- [ ] Phase 4: deploy + WAF

## Workflows

- Schema change: `shared/schema.ts` → `npm run db:push` → `server/storage.ts` → `server/routes.ts`
- New page: `client/src/pages/` → `<Route>` in `App.tsx` → nav link in `components/layout/Navbar.tsx`
- Deeper reference: `docs/Manual.md`, `docs/Troubleshooting.md`
