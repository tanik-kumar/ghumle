'use client';

import { startTransition, useState } from 'react';
import { Clock3, Hotel, Utensils } from 'lucide-react';

import { generateItinerary, mockDestinations } from '@ghumle/contracts';
import { Button, Card } from '@ghumle/ui';

export function PlannerStudio() {
  const [slug, setSlug] = useState('bali');
  const [durationDays, setDurationDays] = useState(6);
  const [travelers, setTravelers] = useState(2);
  const [pace, setPace] = useState<'RELAXED' | 'BALANCED' | 'PACKED'>('BALANCED');
  const [days, setDays] = useState(
    generateItinerary({
      destinationSlug: 'bali',
      durationDays: 6,
      travelers: 2,
      pace: 'BALANCED',
    }),
  );

  const destination = mockDestinations.find((item) => item.slug === slug);

  const regenerate = () => {
    startTransition(() => {
      setDays(
        generateItinerary({
          destinationSlug: slug,
          durationDays,
          travelers,
          pace,
        }),
      );
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <div className="grid gap-4 md:grid-cols-4">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Destination</span>
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={slug} onChange={(event) => setSlug(event.target.value)}>
              {mockDestinations.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Duration</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="number" min={2} max={14} value={durationDays} onChange={(event) => setDurationDays(Number(event.target.value))} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Travelers</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="number" min={1} max={8} value={travelers} onChange={(event) => setTravelers(Number(event.target.value))} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Pace</span>
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3" value={pace} onChange={(event) => setPace(event.target.value as 'RELAXED' | 'BALANCED' | 'PACKED')}>
              <option value="RELAXED">Relaxed</option>
              <option value="BALANCED">Balanced</option>
              <option value="PACKED">Packed</option>
            </select>
          </label>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Suggested stay zones for {destination?.name ?? 'this destination'}:{' '}
            {destination?.hotelAreas.slice(0, 3).join(', ') ?? 'Select a destination to see stay suggestions'}.
          </p>
          <Button onClick={regenerate}>Generate itinerary</Button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {days.map((day) => (
          <Card key={day.day} className="bg-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">{day.title}</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">{day.summary}</p>
              </div>
              <span className="rounded-full bg-[var(--ghumle-color-mist)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ghumle-color-ocean)]">
                Day {day.day}
              </span>
            </div>
            <div className="mt-5 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <Clock3 className="size-4 text-[var(--ghumle-color-coral)]" />
                  Local travel
                </div>
                <p className="mt-2">{day.localTravelMinutes} mins</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <Hotel className="size-4 text-[var(--ghumle-color-coral)]" />
                  Stay area
                </div>
                <p className="mt-2">{day.hotelArea}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <Utensils className="size-4 text-[var(--ghumle-color-coral)]" />
                  Meals
                </div>
                <p className="mt-2">{day.meals[0]}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Visits</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {day.visits.map((visit) => (
                    <li key={visit}>{visit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Activities</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {day.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Meals</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {day.meals.map((meal) => (
                    <li key={meal}>{meal}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
