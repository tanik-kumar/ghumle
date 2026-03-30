import { notFound } from 'next/navigation';

import { Card, SectionHeading } from '@ghumle/ui';
import { generateItinerary } from '@ghumle/contracts';

import { getDestinationBySlug } from '../../../lib/api';
import { formatCurrency } from '../../../lib/format';

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const itineraryPreview = generateItinerary({
    destinationSlug: destination.slug,
    durationDays: destination.recommendedDuration.minDays,
    travelers: 2,
    pace: 'BALANCED',
  });
  const nights = Math.max(1, destination.recommendedDuration.minDays - 1);
  const estimatedTotal =
    destination.costTemplate.transportPerTraveler * 2 +
    destination.costTemplate.stayPerNight * nights +
    destination.costTemplate.foodPerTravelerPerDay * destination.recommendedDuration.minDays * 2 +
    destination.costTemplate.localTransportPerDay * destination.recommendedDuration.minDays +
    destination.costTemplate.activitiesPerTravelerPerDay * destination.recommendedDuration.minDays * 2;

  return (
    <div className="pb-16">
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8, 19, 29, 0.28), rgba(8, 19, 29, 0.82)), url(${destination.heroImage})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 text-white sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
            {destination.scope.toLowerCase()}
          </span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <h1 className="font-[family-name:var(--font-sora)] text-5xl font-semibold tracking-tight">
                {destination.name}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/80">{destination.summary}</p>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                    {tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
            <Card className="bg-white/12 p-6 text-white backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Typical plan snapshot</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Estimated total cost</span>
                  <strong>{formatCurrency(estimatedTotal, destination.currency)}</strong>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Best time to visit</span>
                  <strong>{destination.bestTimeToVisit}</strong>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Recommended duration</span>
                  <strong>
                    {destination.recommendedDuration.minDays}-{destination.recommendedDuration.maxDays} days
                  </strong>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Visa note</span>
                  <strong className="max-w-[55%] text-right">{destination.visaNote}</strong>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Planning signals"
              title="What makes this destination fit"
              description="Ghumle keeps the destination view grounded in budget signals, planning notes, and trip-shaping context."
            />
            <Card className="bg-white">
              <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Top attractions</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {destination.topAttractions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="bg-white">
              <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Stay, food, and safety</h2>
              <div className="mt-4 grid gap-5 text-sm leading-7 text-slate-600 md:grid-cols-3">
                <div>
                  <p className="font-semibold text-slate-900">Hotel areas</p>
                  <ul className="mt-2 space-y-2">
                    {destination.hotelAreas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Food suggestions</p>
                  <ul className="mt-2 space-y-2">
                    {destination.foodSuggestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Safety note</p>
                  <p className="mt-2">{destination.safetyNote}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="bg-white">
              <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Travel option bands</h2>
              <div className="mt-4 space-y-3">
                {destination.travelOptions.map((option) => (
                  <div key={`${destination.id}-${option.mode}`} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-slate-900">{option.mode.replace('_', ' ')}</span>
                      <span>
                        {option.minPrice === 0 && option.maxPrice === 0
                          ? 'N/A'
                          : `${formatCurrency(option.minPrice, destination.currency)} - ${formatCurrency(option.maxPrice, destination.currency)}`}
                      </span>
                    </div>
                    <p className="mt-2">{option.note}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="bg-white">
              <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Balanced itinerary preview</h2>
              <div className="mt-4 space-y-4">
                {itineraryPreview.map((day) => (
                  <div key={day.day} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{day.title}</p>
                        <p className="mt-1">{day.summary}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Day {day.day}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {day.visits.map((visit) => (
                        <span key={visit} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                          {visit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
