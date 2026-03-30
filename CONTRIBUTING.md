# Contributing

## Scope

This repository contains the Ghumle Phase 1 platform scaffold. Contributions should improve product quality, architecture, documentation, reliability, or developer workflow without weakening the long-term scalability direction.

## Before you start

- Read [README.md](./README.md) for local setup
- Check existing issues before opening a new one
- Keep changes focused; avoid unrelated drive-by refactors in the same PR

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local environment config:

   ```bash
   cp .env.example .env
   ```

3. Optional full local stack:

   ```bash
   docker compose up -d postgres redis
   npm run db:generate
   npm run db:seed
   ```

4. Start development:

   ```bash
   npm run dev --workspace @ghumle/api
   npm run dev --workspace @ghumle/web
   ```

## Required checks

Before opening a pull request, run:

```bash
npm run lint --workspace @ghumle/api
npm run lint --workspace @ghumle/web
npm run build
```

## Contribution expectations

- Use TypeScript consistently
- Keep modules cohesive and boundaries explicit
- Prefer shared contracts instead of duplicating domain types
- Preserve responsive behavior in the web app
- Keep API changes documented in [docs/api-contracts.md](./docs/api-contracts.md) when contracts change
- Avoid committing secrets, generated local env files, or build artifacts

## Pull requests

- Explain the problem clearly
- Summarize the solution and tradeoffs
- Mention validation steps
- Link the relevant issue when applicable

Use the PR template in `.github/PULL_REQUEST_TEMPLATE.md`.
