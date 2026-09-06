# DMAP-RCC Refactor — Progress

_Last updated: 2026-08-29_

Goal: strip the Replit-scaffolded site down to a lightweight, fast, self-contained
static site; run on Bun; Dockerize; deploy on personal hardware / EC2 behind a WAF.

Full plan: `~/.claude/plans/i-want-to-refactor-smooth-shell.md`
Backup of the original code: git tag **`pre-refactor`** + branch **`backup/pre-refactor`** (both on GitHub).

## Branches (stacked, not yet merged — `gh` CLI not installed)

| Order | Branch | Contents |
|---|---|---|
| 1 | `chore/localhost-bringup` | Windows localhost fixes |
| 2 | `refactor/phase1-drop-db` | DB removal |
| 3 | `refactor/phase2-bun-lean` | Bun + dependency prune + routing fix |

Merge in that order. PR compare URLs:
- https://github.com/CODERPP10/DMAP-RCC/pull/new/chore/localhost-bringup
- https://github.com/CODERPP10/DMAP-RCC/pull/new/refactor/phase1-drop-db
- https://github.com/CODERPP10/DMAP-RCC/pull/new/refactor/phase2-bun-lean

## Done

### Localhost bring-up (`chore/localhost-bringup`)
- `server/index.ts`: removed `reusePort: true` (threw `ENOTSUP` on Windows); `PORT` env
  configurable; removed the `throw err` after the response in the error middleware
  (double-fired / could crash the process).
- `dev` script loads `.env`; added `.env.example`; `.env` / `.claude/` gitignored.
- Committed the pending "DMAP Retrofit Constructions Company" name + About copy edits.

### Phase 1 — drop the database (`refactor/phase1-drop-db`)
- Deleted `server/db.ts`, `server/storage.ts`, `server/seed.ts`, `shared/schema.ts`,
  `drizzle.config.ts`.
- `server/routes.ts` → single **`POST /api/contact`** (zod via `shared/contact.ts`,
  Gmail SMTP through nodemailer, hidden honeypot field) + `/brochure.pdf`; unknown
  `/api/*` returns JSON 404.
- `/services` and `/projects` now render from `client/src/data/*.ts` (no `useQuery`,
  no loading/error states). Data files carry DMAP's **real** service/project names;
  descriptions + images are **placeholder copy** pending the detailed content JSON.
- Shared `client/src/components/ContactForm.tsx` (home + `/contact` both use it).
- `/contact` page address / phone / map corrected to the real Mumbai details.
- `Certifications` component now renders from `client/src/data/certifications.ts`
  (all 6 real items).
- Removed `@tanstack/react-query` + the DB/auth deps (−67 npm packages).

### Phase 2 — Bun + lean (`refactor/phase2-bun-lean`)
- **Runtime → Bun**: `dev` = `bun --bun server/index.ts`; `start` = `bun dist/index.js`.
  Dropped `tsx`. `package-lock.json` → `bun.lock`. `build` (esbuild) / `check` (tsc)
  unchanged. Verified on Windows: install, dev (Vite middleware + HMR clean), build,
  typecheck, contact endpoint.
- Removed all three `@replit/*` Vite plugins; `vite.config.ts` = `react()` only.
  The shadcn theme tokens that `theme.json` generated are inlined into
  `client/src/index.css` (verified byte-identical). `theme.json` deleted.
- Deleted 44 unused `client/src/components/ui/*` files + `use-mobile` hook
  (kept `card`, `toast`, `toaster`). Removed 35 more npm packages.
  **Net −69 packages across phases 1+2. CSS bundle 63 kB → 25 kB.**
- Trimmed `tailwind.config.ts`; dropped the unused `@assets` alias; declared `nanoid`.
- **Routing fix**: `<ScrollToTop>` in `App.tsx` resets scroll on navigation (footer
  links appeared broken because the page stayed scrolled at the bottom). Converted
  remaining plain `<a href>` internal links to wouter `<Link>`. Footer "Services"
  column now lists the real services.

## How to run

```
bun install
# create .env from .env.example; fill MAIL_USER / MAIL_PASS / MAIL_TO for the contact form
bun run dev        # http://localhost:5000
bun run build      # dist/public (client) + dist/index.js (server)
bun run check      # tsc
```

Contact form: needs a Gmail address + 16-char **App Password** (not an API key;
requires 2-Step Verification) in `.env`. Until then the endpoint returns
500 "Email is not configured".

## Open items

- **Content**: `client/src/data/{services,projects}.ts` rich fields are placeholder.
  Real source of truth = detailed JSON the owner will provide. `DMAP-db/*.csv`
  (external, `C:\Users\Pradhyuman Pandey\Desktop\Pradhyuman\Projects\DMAP-db`) is a
  stale DB dump — only `clients.csv` (10 names) still unused.
- Footer legal links `/privacy`, `/terms`, `/cookies` → no pages exist (404).
- Footer social icons are `href="#"` placeholders — need real URLs.
- JS bundle still ~520 kB (framer-motion + react-hook-form + react-helmet). Optional
  later optimization; `framer-motion` has a single use in `ServiceCard`.
- `docs/Manual.md` and `docs/Troubleshooting.md` predate the refactor (stale).

## Next

- **Phase 3** — multi-stage Dockerfile (Bun base) + `docker-compose.yml` + Caddy
  reverse proxy (auto-HTTPS). Under Bun, if the esbuild server-bundle step is dropped
  later, `serveStatic()` in `server/vite.ts` needs a one-line path fix.
- **Phase 4** — deploy on the server/EC2; WAF (Cloudflare proxy easiest, or AWS WAF);
  rate-limit the contact endpoint; harden headers.
- Consider installing `gh` to open/stack/merge the PRs properly.
