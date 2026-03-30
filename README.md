# Ghumle

Ghumle is a production-oriented Phase 1 travel platform scaffold built as a TypeScript monorepo. The current release focuses on a premium web experience with a shared backend foundation that can later support Android, iOS, and other website surfaces.

## Recommended architecture

- Frontend: `Next.js` App Router, TypeScript, Tailwind CSS v4, shared UI package, responsive mobile-first layout
- Backend: `NestJS` REST API with modular feature boundaries, DTO validation, JWT auth, admin surface, Swagger, health checks
- Data: `PostgreSQL` via Prisma, `Redis` placeholder wiring for cache/queue/rate-limit evolution
- Shared packages: domain contracts, mock/demo data, design tokens, reusable UI primitives
- Infra: Dockerfiles, `docker-compose`, CI workflow, environment-based config, API versioning, health route, deployment-ready reverse proxy stub

## Folder structure

```text
.
├── apps
│   ├── api
│   │   ├── prisma
│   │   └── src
│   │       ├── common
│   │       └── modules
│   └── web
│       └── src
│           ├── app
│           ├── components
│           └── lib
├── docs
├── infra
│   └── nginx
├── packages
│   ├── contracts
│   ├── design-tokens
│   └── ui
├── docker-compose.yml
└── package.json
```

## Backend modules

- `auth`: register, login, refresh token flow, `me`
- `users`: profile read/update
- `destinations`: listing, detail, admin CRUD hooks
- `discovery`: budget-based destination ranking
- `itineraries`: preview generation, save, duplicate, regenerate day, list my trips
- `travel-options`: provider-ready mock pricing bands
- `wishlist`: future trip tracking
- `savings`: savings goals, deposits, savings projection
- `matching`: partner profile, suggestions, request flow
- `admin`: overview, reports, FAQ/content placeholder
- `health`: service and dependency checks
- `notifications`: queue-ready placeholder service

## Frontend pages

- `/`: home
- `/explore`
- `/search/budget`
- `/destinations/[slug]`
- `/planner`
- `/my-trips`
- `/wishlist`
- `/savings`
- `/partners`
- `/profile`
- `/login`
- `/signup`
- `/admin`

## Data model

The Prisma schema includes the following core entities:

- `User`, `UserProfile`, `AdminUser`, `AuditLog`
- `Destination`, `DestinationCategory`, `DestinationCategoryLink`, `PriceEstimate`
- `BudgetPreference`, `TripPlan`, `Itinerary`, `ItineraryDay`
- `WishlistItem`
- `SavingsGoal`, `SavingsDeposit`
- `TravelMatchProfile`, `MatchRequest`
- `Notification`, `Review`, `ReportAbuse`

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start supporting services:

   ```bash
   docker-compose up -d postgres redis
   ```

4. Generate Prisma client and seed demo data:

   ```bash
   npm run db:generate
   npm run db:seed
   ```

5. Start development:

   ```bash
   npm run dev
   ```

## Useful scripts

- `npm run dev`
- `npm run build`
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:seed`
- `npm run format:write`

## Demo credentials

- Admin: `admin@ghumle.app` / `Password@123`
- Traveler: `traveler@ghumle.app` / `Password@123`

## API contracts

See [`docs/api-contracts.md`](./docs/api-contracts.md) for sample request and response shapes.

## Milestones

1. Workspace foundation: monorepo, shared contracts, design tokens, infra, CI
2. Core backend: auth, destinations, discovery, itineraries, wishlist, savings, matching, admin
3. Premium web UX: responsive pages, planner studio, savings widget, destination detail, admin overview
4. Hardening: real provider integrations, background jobs, automated tests, OAuth, analytics, mobile clients

## Scalability notes

- Start as a modular monolith with strict feature boundaries
- Keep transport providers abstracted for future flight/train/bus integrations
- Use Redis for caching, queue orchestration, and rate-limiting expansion
- Add job workers for alerts, notifications, and recommendation refresh
- Split services only when traffic or team boundaries justify it
