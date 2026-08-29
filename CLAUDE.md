# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing website for DMAP Retrofit Construction Company. Vite/React SPA + a thin Express server in one process on **port 5000** (only port). Originally scaffolded on Replit; being stripped down (see "Refactor"). Runtime: **Bun**.

## Commands

- `bun run dev` — run app (Express + Vite middleware) on port 5000; Bun auto-loads `.env`
- `bun run build` — client → `dist/public`, server bundle → `dist/index.js` (esbuild)
- `bun run check` — TS typecheck (`tsc`; no lint, no tests)
- `bun run start` — run the build; inline `NODE_ENV=` breaks on cmd/PowerShell (fine in git-bash / Docker)
- `docker compose up -d` — full stack: `app` (internal only) behind `caddy` (:80/:443). Set `SITE_ADDRESS` in `.env` (`localhost` default, or a real domain for Let's Encrypt).
- `.env` (gitignored) holds `PORT` and `MAIL_USER`/`MAIL_PASS`/`MAIL_TO`; see `.env.example`

## Architecture

- Aliases: `@/*`→`client/src/*`, `@shared/*`→`shared/*`
- **All page content is static** in `client/src/data/*.ts` (services, projects, blog,
  testimonials, certifications). Other sections are hardcoded JSX. No database.
- `server/routes.ts` — the only endpoint is `POST /api/contact` (zod-validated via
  `shared/contact.ts`, emails via Gmail SMTP / nodemailer, honeypot field) plus
  `/brochure.pdf`. Unknown `/api/*` → JSON 404. Registered before the Vite catch-all.
- Client: Wouter routing (`App.tsx`), react-hook-form + `@shared/contact` for the form
  (`components/ContactForm.tsx`, used by home + `/contact`). Only 3 shadcn/ui files
  remain (`ui/card`, `ui/toast`, `ui/toaster`). shadcn design tokens are inlined in
  `client/src/index.css` (`:root` + inert `.dark`); extra `--primary-N`/`--secondary-N`
  color vars are injected in `main.tsx`. `vite.config.ts` = `react()` only.
- `server/index.ts` serves the SPA via `serveStatic` (`server/static.ts`) in production;
  in dev it `await import("./vite")` for the Vite middleware, so the prod esbuild bundle
  (built with `--splitting`, emits a dev-only `dist/vite-*.js` chunk) has no `vite` dep.

## Refactor

Goal: lightweight static site, Bun runtime, Dockerized behind a WAF.
Plan: `~/.claude/plans/i-want-to-refactor-smooth-shell.md`. Backup: tag `pre-refactor`.

- [x] Run on localhost (Windows) — `chore/localhost-bringup`
- [x] Phase 1: drop DB; static `/services` + `/projects`; `/api/contact` email — `refactor/phase1-drop-db`
- [x] Phase 2: Bun runtime; prune shadcn/ui + deps (−69 pkgs total); inline theme.json; drop `@replit/*` plugins — `refactor/phase2-bun-lean`
- [x] Phase 3: multi-stage Dockerfile + `docker-compose.yml` + `Caddyfile` — `refactor/phase3-docker`
- [ ] Phase 4: deploy + WAF

Known: `client/src/data/*.ts` rich fields are placeholder copy pending the real content JSON.
Optional later: `framer-motion` (~single use in `ServiceCard`), JS bundle still ~520 kB.
Docker image ~347 MB — client-only libs (react etc.) are in `dependencies` so they land
in the runtime stage; move them to `devDependencies` to slim it.

## Workflows

- New page: `client/src/pages/` → `<Route>` in `App.tsx` → nav link in `components/layout/Navbar.tsx`
- Deeper reference: `docs/Manual.md`, `docs/Troubleshooting.md` (both predate the refactor)
