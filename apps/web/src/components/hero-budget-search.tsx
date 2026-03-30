'use client';

import { startTransition, useState } from 'react';
import { CalendarClock, Coins, Globe2, Users } from 'lucide-react';

import { monthLabels, rankDestinations, type DestinationTag, type DiscoverySuggestion } from '@ghumle/contracts';
import { Button, Card } from '@ghumle/ui';

import { formatCurrency } from '../lib/format';

const defaultSuggestions = rankDestinations({
  totalBudget: 65000,
  scope: 'DOMESTIC',
  travelers: 2,
  placeTypes: ['BEACH', 'COUPLE'],
  tripDurationDays: 5,
  preferredMonth: 12,
});

export function HeroBudgetSearch() {
  const [budget, setBudget] = useState(65000);
  const [scope, setScope] = useState<'DOMESTIC' | 'INTERNATIONAL'>('DOMESTIC');
  const [travelers, setTravelers] = useState(2);
  const [duration, setDuration] = useState(5);
  const [preferredMonth, setPreferredMonth] = useState<1 | 12>(12);
  const [placeType, setPlaceType] = useState<DestinationTag>('BEACH');
  const [suggestions, setSuggestions] = useState<DiscoverySuggestion[]>(defaultSuggestions);

  const runSearch = () => {
    startTransition(() => {
      setSuggestions(
        rankDestinations({
          totalBudget: budget,
          scope,
          travelers,
          placeTypes: [placeType],
          tripDurationDays: duration,
          preferredMonth,
        }),
      );
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="border-white/15 bg-white/10 p-6 text-white shadow-[var(--ghumle-shadow-elevated)] backdrop-blur-xl">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="flex items-center gap-2 text-white/70">
              <Coins className="size-4" />
              Total budget
            </span>
            <input
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none ring-0 placeholder:text-white/40"
              type="number"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="flex items-center gap-2 text-white/70">
              <Globe2 className="size-4" />
              Scope
            </span>
            <select
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none"
              value={scope}
              onChange={(event) => setScope(event.target.value as 'DOMESTIC' | 'INTERNATIONAL')}
            >
              <option value="DOMESTIC">Domestic</option>
              <option value="INTERNATIONAL">International</option>
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="flex items-center gap-2 text-white/70">
              <Users className="size-4" />
              Travelers
            </span>
            <input
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none"
              type="number"
              min={1}
              max={10}
              value={travelers}
              onChange={(event) => setTravelers(Number(event.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="flex items-center gap-2 text-white/70">
              <CalendarClock className="size-4" />
              Duration
            </span>
            <input
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none"
              type="number"
              min={2}
              max={14}
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-white/70">Type of place</span>
            <select
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none"
              value={placeType}
              onChange={(event) => setPlaceType(event.target.value as DestinationTag)}
            >
              {[
                'BEACH',
                'MOUNTAINS',
                'NATURE',
                'ADVENTURE',
                'RELIGIOUS',
                'CITY',
                'LUXURY',
                'FAMILY',
                'COUPLE',
                'SOLO',
                'PARTY',
              ].map((option) => (
                <option key={option} value={option}>
                  {option.toLowerCase()}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-white/70">Preferred month</span>
            <select
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 outline-none"
              value={preferredMonth}
              onChange={(event) => setPreferredMonth(Number(event.target.value) as 1 | 12)}
            >
              <option value={12}>December</option>
              <option value={1}>January</option>
            </select>
          </label>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="max-w-xl text-sm leading-7 text-white/70">
            Ghumle ranks suggestions by budget fit, travel convenience, popularity, weather suitability, and value for money.
          </p>
          <Button onClick={runSearch}>Find trips</Button>
        </div>
      </Card>

      <div className="space-y-4">
        {suggestions.slice(0, 3).map((item) => (
          <Card key={item.destination.id} className="border-white/10 bg-white/12 p-5 text-white shadow-[var(--ghumle-shadow-soft)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[family-name:var(--font-sora)] text-lg font-semibold">{item.destination.name}</p>
                <p className="text-sm text-white/65">{item.destination.country}</p>
              </div>
              <span className="rounded-full bg-white/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80">
                {monthLabels[preferredMonth]}
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-white/80">
              <div className="flex items-center justify-between">
                <span>Estimated total</span>
                <strong>{formatCurrency(item.estimatedTotalCost)}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Score</span>
                <strong>{item.totalScore}/100</strong>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.whyItMatches.slice(0, 2).map((reason) => (
                <span key={reason} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  {reason}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
