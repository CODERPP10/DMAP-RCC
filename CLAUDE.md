# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing website for DMAP Retrofit Construction Company. **Vite/React SPA** hosted on
**Cloudflare Pages**, plus one **Pages Function** for the contact form. No app server,
no database, no container. Runtime for tooling: **Bun**. Originally scaffolded on Replit;
stripped down over a 4-phase refactor (see "Refactor").

## Commands

- `bun run dev` — Vite dev server (SPA + HMR) on port 5173. The contact form's
  `POST /api/contact` is **not** served here — use `bun run preview` to exercise it.
- `bun run preview` — `vite build` then `wrangler pages dev`: serves `dist/public` +
  `functions/` locally on **:8788**, a faithful emulation of production (SPA fallback,
  `_headers`, the contact Function). Reads env from a gitignored `.dev.vars` (see
  `.env.example`).
- `bun run build` — client → `dist/public` (that's the whole deploy artifact).
- `bun run check` — TS typecheck: `tsc` (client + shared) then `tsc -p functions/tsconfig.json`
  (the Function, typed against `@cloudflare/workers-types`). No lint, no tests.
- Deploy is automatic: Cloudflare Pages builds on every push (production = `main`,
  preview = every other branch/PR). No manual deploy step, no `wrangler deploy`.

## Architecture

- Aliases: `@/*`→`client/src/*`, `@shared/*`→`shared/*` (Vite + tsconfig only —
  **not** available inside `functions/`, which must use relative imports).
- **All page content is static** in `client/src/data/*.ts` (services, projects, blog,
  testimonials, certifications). Other sections are hardcoded JSX.
- `functions/api/contact.ts` — the only dynamic code. `POST /api/contact`, Cloudflare
  routes it by path. Validates `shared/contact.ts` (zod, imported relatively), honeypot
  `company` field, then sends the submission via the **Resend HTTP API**
  (`fetch https://api.resend.com/emails`). Status contract: 400 zod error, 500 if
  `RESEND_API_KEY` unset, 502 on Resend failure, 200 on success.
  `functions/api/[[catchall]].ts` returns JSON 404 for any other `/api/*`.
- `client/public/` is Vite's publicDir → copied verbatim into `dist/public`:
  - `_redirects` (`/* /index.html 200`) — SPA fallback so Wouter can client-route.
    wrangler prints a cosmetic "infinite loop" warning; Pages handles it correctly.
  - `_headers` — forces `brochure.pdf` to download with a friendly filename.
  - `brochure.pdf` — the brochure asset (linked from Hero + BrochureDownload).
- Client: Wouter routing (`App.tsx`), react-hook-form + `@shared/contact` for the form
  (`components/ContactForm.tsx`, used by home + `/contact`; posts to `/api/contact`).
  Only 3 shadcn/ui files remain (`ui/card`, `ui/toast`, `ui/toaster`). shadcn design
  tokens are inlined in `client/src/index.css`; extra `--primary-N`/`--secondary-N`
  color vars are injected in `main.tsx`. `vite.config.ts` = `react()` only.

## Environment / secrets

- **Local:** copy `.env.example` values into a gitignored `.dev.vars` (KEY=VALUE).
  `wrangler pages dev` loads it. `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`.
- **Cloudflare:** set the same vars in the Pages project (Production **and** Preview);
  `RESEND_API_KEY` as an encrypted secret.
- **No custom domain yet:** site is on `*.pages.dev`. Resend without a verified domain
  only sends `from: onboarding@resend.dev` and only to the Resend account's own address.
  When a domain lands: add to Cloudflare + verify in Resend, then flip `MAIL_FROM` and
  attach the custom domain to the Pages project — no code change.
- `wrangler.toml` holds only `name` / `compatibility_date` / `pages_build_output_dir`
  for local `wrangler pages dev`. The real project config is in the Cloudflare dashboard.

## Refactor

Goal: lightweight static site on a CDN, minimal dynamic surface.
Plan: `~/.claude/plans/i-want-to-refactor-smooth-shell.md`. Backup: tag `pre-refactor`.

- [x] Run on localhost (Windows) — `chore/localhost-bringup`
- [x] Phase 1: drop DB; static `/services` + `/projects`; `/api/contact` email — `refactor/phase1-drop-db`
- [x] Phase 2: Bun runtime; prune shadcn/ui + deps (−69 pkgs); inline theme.json — `refactor/phase2-bun-lean`
- [x] Phase 3: multi-stage Dockerfile + compose + Caddy — `refactor/phase3-docker`
      **Superseded by Phase 4** — the Docker/Caddy/Express stack was removed. Kept from
      Phase 3: the `server/vite.ts` → static split was moot once the server went away.
- [x] Phase 4: Cloudflare Pages + Pages Function + Resend; deleted `server/`, Docker,
      Caddy, Express/nodemailer/esbuild — `refactor/phase4-cloudflare`

Known: `client/src/data/*.ts` rich fields are placeholder copy pending the real content JSON.
Follow-ups: buy a domain + verify it in Resend; add a Cloudflare WAF rate-limit rule on
`/api/contact`; optional Turnstile if spam appears; `framer-motion` (~single use) and the
~520 kB JS bundle are still on the "optional later" list.

## Workflows

- New page: `client/src/pages/` → `<Route>` in `App.tsx` → nav link in `components/layout/Navbar.tsx`
- Contact Function change: edit `functions/api/contact.ts`, test with `bun run preview`.
- Deeper reference: `docs/Manual.md`, `docs/Troubleshooting.md` (both predate the refactor
  and still describe the old DB/Express setup — treat as historical).
