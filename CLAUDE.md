# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing website for DMAP Retrofit Construction Company. Vite/React SPA + a thin Express server in one process on **port 5000** (only port). Originally scaffolded on Replit; being stripped down (see "Refactor").

## Commands

- `npm run dev` — run app (Express + Vite middleware) on port 5000; loads `.env`
- `npm run build` — client → `dist/public`, server bundle → `dist/index.js`
- `npm run check` — TS typecheck (no lint, no tests)
- `npm run start` — runs the build; inline `NODE_ENV=` breaks on Windows (fine in Docker/Linux)
- `.env` (gitignored) holds `PORT` and `MAIL_USER`/`MAIL_PASS`/`MAIL_TO`; see `.env.example`

## Architecture

- Aliases: `@/*`→`client/src/*`, `@shared/*`→`shared/*`, `@assets/*`→`attached_assets/*`
- **All page content is static** in `client/src/data/*.ts` (services, projects, blog,
  testimonials). Other sections are hardcoded JSX. No database.
- `server/routes.ts` — the only endpoint is `POST /api/contact` (zod-validated via
  `shared/contact.ts`, emails via Gmail SMTP / nodemailer, honeypot field) plus
  `/brochure.pdf`. Unknown `/api/*` → JSON 404. Registered before the Vite catch-all.
- Client: Wouter routing (`App.tsx`), react-hook-form + `@shared/contact` for the form
  (`components/ContactForm.tsx`, used by home + `/contact`), shadcn/ui in `components/ui/`,
  Tailwind theme from `theme.json` (via `@replit/vite-plugin-shadcn-theme-json`),
  extra color vars injected in `main.tsx`.

## Refactor

Goal: lightweight static site, Bun runtime, Dockerized behind a WAF.
Plan: `~/.claude/plans/i-want-to-refactor-smooth-shell.md`. Backup: tag `pre-refactor`.

- [x] Run on localhost (Windows) — `chore/localhost-bringup`
- [x] Phase 1: drop DB; static `/services` + `/projects`; `/api/contact` email — `refactor/phase1-drop-db`
- [ ] Phase 2: switch to Bun; prune unused shadcn/ui + radix deps; inline theme.json, drop @replit/* plugins
- [ ] Phase 3: multi-stage Dockerfile + compose + Caddy
- [ ] Phase 4: deploy + WAF

Known: `client/src/data/*.ts` rich fields are placeholder copy pending the real content JSON.

## Workflows

- New page: `client/src/pages/` → `<Route>` in `App.tsx` → nav link in `components/layout/Navbar.tsx`
- Deeper reference: `docs/Manual.md`, `docs/Troubleshooting.md` (both predate the refactor)
