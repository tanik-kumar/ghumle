import { Card, SectionHeading } from '@ghumle/ui';

import { getDemoTrips } from '../../lib/api';
import { formatCurrency } from '../../lib/format';

export default async function MyTripsPage() {
  const trips = await getDemoTrips();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="My trips"
        title="Saved plans, itinerary snapshots, and next planning actions"
        description="This page is structured for authenticated persistence, but remains demo-ready through seed-grade sample trips."
      />
      <div className="mt-10 space-y-6">
        {trips.map((trip) => (
          <Card key={trip.id} className="bg-white">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className="min-h-72 rounded-[1.5rem] bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(8,19,29,0.08), rgba(8,19,29,0.56)), url(${trip.destination?.heroImage ?? ''})`,
                }}
              />
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{trip.pace.toLowerCase()} itinerary</p>
                  <h2 className="mt-2 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950">
                    {trip.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {trip.destination?.name ?? 'Destination'} • {trip.travelers} travelers • {formatCurrency(trip.budget)}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {trip.itinerary.slice(0, 4).map((day) => (
                    <div key={day.day} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">{day.title}</p>
                      <p className="mt-2">{day.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
