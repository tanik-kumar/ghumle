# Ghumle API Contracts

All routes are exposed under `/api/v1`.

## Authentication

### `POST /auth/register`

```json
{
  "email": "traveler@ghumle.app",
  "password": "Password@123",
  "fullName": "Demo Traveler"
}
```

### `POST /auth/login`

```json
{
  "email": "traveler@ghumle.app",
  "password": "Password@123"
}
```

### `POST /auth/refresh`

```json
{
  "refreshToken": "<jwt>"
}
```

## Discovery

### `POST /discovery/search`

```json
{
  "totalBudget": 85000,
  "scope": "INTERNATIONAL",
  "travelers": 2,
  "placeTypes": ["BEACH", "COUPLE"],
  "tripDurationDays": 5,
  "preferredMonth": 12
}
```

Sample response shape:

```json
[
  {
    "destination": {
      "slug": "phuket",
      "name": "Phuket"
    },
    "estimatedTotalCost": 94400,
    "costBreakup": {
      "transport": 48000,
      "stay": 20800,
      "food": 13000,
      "localTransport": 5000,
      "activities": 17000,
      "contingency": 5600
    },
    "scoreBreakdown": {
      "budgetFit": 68,
      "convenience": 82,
      "popularity": 89,
      "weatherSuitability": 96,
      "valueForMoney": 74
    },
    "totalScore": 79,
    "whyItMatches": ["..."]
  }
]
```

## Destinations

### `GET /destinations`

Optional query params:

- `scope=DOMESTIC|INTERNATIONAL`
- `tag=BEACH|CITY|...`

### `GET /destinations/:slug`

Returns full destination detail including travel option price bands.

## Itineraries

### `POST /itineraries/generate`

```json
{
  "destinationSlug": "bali",
  "durationDays": 6,
  "travelers": 2,
  "pace": "BALANCED"
}
```

### `POST /itineraries/save`

```json
{
  "title": "Bali August Escape",
  "destinationSlug": "bali",
  "durationDays": 6,
  "travelers": 2,
  "pace": "BALANCED",
  "totalBudget": 110000,
  "travelMonth": 8,
  "travelYear": 2026,
  "notes": "Focus on Seminyak and Ubud."
}
```

### `PATCH /itineraries/:id/days/:dayNumber/regenerate`

Regenerates a single day while preserving the plan shell.

## Travel options

### `GET /travel-options/:destinationSlug`

Returns phase-one mock provider output for flights, trains, buses, local transport, self-drive, and pickup options.

## Wishlist

### `POST /wishlist`

```json
{
  "destinationSlug": "singapore",
  "targetBudget": 145000,
  "targetMonth": 3,
  "targetYear": 2027,
  "note": "Family trip target"
}
```

## Savings

### `POST /savings-goals`

```json
{
  "title": "Singapore family trip fund",
  "goalAmount": 145000,
  "savedAmount": 42000,
  "targetDate": "2027-03-01T00:00:00.000Z"
}
```

### `POST /savings-goals/:id/deposits`

```json
{
  "amount": 12000,
  "note": "Monthly transfer"
}
```

## Matching

### `POST /matches/profile`

```json
{
  "visibility": "MATCHABLE",
  "lookingForPartner": true,
  "destinationSlugs": ["bali"],
  "minBudget": 70000,
  "maxBudget": 110000,
  "tripMonth": 8,
  "tripYear": 2026,
  "preferredTags": ["BEACH", "COUPLE"],
  "about": "Looking for a balanced Bali trip."
}
```

### `POST /matches/requests`

```json
{
  "recipientId": "cuid_here",
  "destinationSlug": "bali",
  "message": "Interested in sharing transfers and a villa split."
}
```

## Admin

### `GET /admin/overview`

Returns total users, trips, savings tracked, reports, and featured destination counts.

### `GET /admin/reports`

Returns abuse/report queue entries for moderation.
