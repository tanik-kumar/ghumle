import Link from 'next/link';
import { ArrowRight, BellRing, Compass, PiggyBank, Route, UsersRound } from 'lucide-react';

import { SectionHeading, Surface } from '@ghumle/ui';

import { DestinationCard } from '../components/destination-card';
import { HeroBudgetSearch } from '../components/hero-budget-search';
import { getDestinations } from '../lib/api';

const featureCards = [
  {
    title: 'Budget-first destination discovery',
    description: 'Search by total budget, scope, travelers, trip style, duration, and season to surface realistic trip options.',
    icon: Compass,
  },
  {
    title: 'Editable itinerary generation',
    description: 'Generate day-wise itineraries, regenerate individual days, and structure relaxed, balanced, or packed trip modes.',
    icon: Route,
  },
  {
    title: 'Savings and affordability planning',
    description: 'Turn dream trips into achievable targets with monthly savings plans, progress tracking, and optimization advice.',
    icon: PiggyBank,
  },
  {
    title: 'Travel partner readiness',
    description: 'Match compatible travelers by budget, dates, destination intent, privacy visibility, and basic safety controls.',
    icon: UsersRound,
  },
];

export default async function HomePage() {
  const destinations = await getDestinations();

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(8,19,29,0.96),rgba(13,59,102,0.88)_55%,rgba(28,126,214,0.72))]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-18 text-white sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div className="space-y-7">
            <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Phase 1 web platform
            </span>
            <div className="space-y-5">
              <h1 className="font-[family-name:var(--font-sora)] text-5xl font-semibold tracking-tight text-white md:text-6xl">
                Discover the best trip your budget can actually support.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/76 md:text-lg">
                Ghumle combines destination discovery, itinerary planning, savings strategy, travel partner matching, and admin-ready controls in one scalable product foundation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/search/budget"
                className="inline-flex items-center rounded-full bg-[var(--ghumle-color-coral)] px-5 py-3 text-sm font-semibold text-white"
              >
                Search by budget
              </Link>
              <Link
                href="/planner"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white"
              >
                Open planner
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Surface className="border-white/10 bg-white/8 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Discovery</p>
                <p className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold">120+</p>
                <p className="mt-1 text-sm text-white/65">seed-ready travel patterns and ranking signals</p>
              </Surface>
              <Surface className="border-white/10 bg-white/8 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Planning</p>
                <p className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold">3</p>
                <p className="mt-1 text-sm text-white/65">itinerary modes with day regeneration support</p>
              </Surface>
              <Surface className="border-white/10 bg-white/8 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Operations</p>
                <p className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold">1</p>
                <p className="mt-1 text-sm text-white/65">shared backend foundation for web and future mobile</p>
              </Surface>
            </div>
          </div>
          <HeroBudgetSearch />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Popular right now"
          title="Explore premium-feel destination cards"
          description="The Phase 1 web experience stays comparison-friendly, budget-aware, and visually consistent with a reusable token system."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {destinations.slice(0, 6).map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Phase 1 modules"
            title="Built for feature breadth without a tangled codebase"
            description="The first release focuses on discovery, itinerary generation, savings, wishlist, matching, admin operations, and responsive UX. The same backend can later support Android, iOS, and future website experiences."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {featureCards.map((item) => (
              <Surface key={item.title} className="bg-white/88">
                <div className="inline-flex rounded-2xl bg-[var(--ghumle-color-mist)] p-3 text-[var(--ghumle-color-ocean)]">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Surface className="grid gap-8 overflow-hidden bg-[linear-gradient(120deg,rgba(247,237,216,0.92),rgba(255,255,255,0.92)_42%,rgba(217,236,255,0.8))] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Smart add-ons"
              title="Alerts, packing, comparison, and future deal intelligence"
              description="Phase 1 already creates space for seasonal deal alerts, fare-drop watchlists, packing checklists, visa prep, flexible-date suggestions, and budget optimization workflows."
            />
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              View admin surface
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Surface className="bg-white/90">
              <BellRing className="size-6 text-[var(--ghumle-color-coral)]" />
              <h3 className="mt-4 font-[family-name:var(--font-sora)] text-lg font-semibold text-slate-950">
                Seasonal deal alerts
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Hook-ready background jobs for notification and recommendation campaigns.
              </p>
            </Surface>
            <Surface className="bg-white/90">
              <Compass className="size-6 text-[var(--ghumle-color-coral)]" />
              <h3 className="mt-4 font-[family-name:var(--font-sora)] text-lg font-semibold text-slate-950">
                Best value engine
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Recommendation scoring already considers budget fit, convenience, popularity, weather, and value.
              </p>
            </Surface>
          </div>
        </Surface>
      </section>
    </div>
  );
}
