# Codex Handoff

This file exists to help future Codex sessions resume work on Ghumle quickly.

## Project summary

Ghumle is a TypeScript monorepo for a scalable travel planning platform.

- Web: Next.js 16, App Router, TypeScript, Tailwind CSS v4
- API: NestJS 11, REST-first, Prisma 7
- Data: PostgreSQL primary, Redis planned for cache/queue/rate limit
- Shared packages: contracts, design tokens, UI primitives

## Repository layout

- `apps/web`: user-facing web app
- `apps/api`: backend API and Prisma schema
- `packages/contracts`: shared domain types, mock data, scoring helpers
- `packages/design-tokens`: shared colors, gradients, typography tokens
- `packages/ui`: reusable UI primitives
- `docs`: API contract docs and future technical notes

## Current state

- Phase 1 scaffold is implemented
- Core pages exist for home, explore, budget search, destination detail, planner, my trips, wishlist, savings, partners, profile, auth, and admin
- API modules exist for auth, users, destinations, discovery, itineraries, travel options, wishlist, savings, matching, notifications, health, and admin
- GitHub repo exists at `https://github.com/tanik-kumar/ghumle`
- Initial scaffold commit already pushed to `main`

## Important local/runtime notes

- The web app builds with `webpack` mode, not Turbopack
  - This was changed because Turbopack hit sandbox/process-binding issues in this environment
- Prisma 7 uses `@prisma/adapter-pg`
  - See `apps/api/src/common/database/prisma.service.ts`
  - See `apps/api/prisma.config.ts`
- The API dev script runs compiled JavaScript from `dist/apps/api/src/main.js`
  - Do not switch it back to `tsx watch`; `tsx` does not emit the Nest decorator metadata needed for constructor injection
- The API can start in degraded mode when PostgreSQL is unavailable
  - This is intentional for demo/public flows on machines without Docker or Postgres
- Full persistence features still need Postgres and Redis running

## Commands

Install:

```bash
npm install
```

Run web:

```bash
npm run dev --workspace @ghumle/web
```

Run API:

```bash
npm run dev --workspace @ghumle/api
```

Generate Prisma client:

```bash
npm run db:generate --workspace @ghumle/api
```

Full build:

```bash
npm run build
```

Smoke test web and API flows:

```bash
npm run test:smoke
```

## Full local stack

If Docker is available:

```bash
cp .env.example .env
docker compose up -d postgres redis
npm run db:generate
npm exec --workspace @ghumle/api prisma db push
npm run db:seed
```

## Verified working state

Previously verified in this repo:

- `npm run lint --workspace @ghumle/api`
- `npm run lint --workspace @ghumle/web`
- `npm run build`
- `npm run test:smoke`

## Recent repository housekeeping

Recent repo-health work added or in progress:

- community files like `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`
- issue templates and PR template in `.github`
- `CODEOWNERS`
- `dependabot.yml`
- `.editorconfig`
- `CHANGELOG.md`
- `.gitignore` updated to ignore `*.tsbuildinfo`

## Immediate next work candidates

Pick from these first if resuming:

1. Commit and push the repo-health and handoff files if they are still uncommitted
2. Add real database migrations instead of relying on `prisma db push`
3. Wire authenticated frontend flows to live API endpoints
4. Add unit and integration tests for API modules
5. Add Redis-backed queue/event processing for alerts and match workflows
6. Replace mock provider logic with pluggable travel API adapters

## Watchouts

- Do not switch the web build scripts back to Turbopack in this environment without revalidating the sandbox behavior
- Do not switch the API dev script back to `tsx watch`; it breaks Nest dependency injection metadata
- Do not remove degraded-start behavior from the API unless local DB requirements are made explicit
- Keep shared product/domain types in `packages/contracts`; do not duplicate them in app-level code

## Session resume checklist

When a new Codex session starts:

1. Read `README.md`
2. Read this file
3. Run `git status --short`
4. Check whether Postgres/Redis are available locally
5. Decide whether the task should use demo mode or full DB-backed mode
