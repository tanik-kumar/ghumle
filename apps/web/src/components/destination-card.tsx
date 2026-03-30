import Link from 'next/link';
import { Compass, MapPinned, ShieldCheck, Wallet } from 'lucide-react';

import type { DestinationRecord } from '@ghumle/contracts';
import { Badge, Card } from '@ghumle/ui';

import { formatCurrency } from '../lib/format';

export function DestinationCard({ destination }: { destination: DestinationRecord }) {
  return (
    <Card className="group overflow-hidden p-0">
      <div
        className="h-56 bg-cover bg-center transition duration-500 group-hover:scale-[1.01]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8, 19, 29, 0.08), rgba(8, 19, 29, 0.56)), url(${destination.heroImage})`,
        }}
      />
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">
              {destination.name}
            </h3>
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <MapPinned className="size-4" />
              {destination.country}, {destination.region}
            </p>
          </div>
          <Badge>{destination.scope.toLowerCase()}</Badge>
        </div>
        <p className="text-sm leading-7 text-slate-600">{destination.summary}</p>
        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Wallet className="size-4 text-[var(--ghumle-color-coral)]" />
            {formatCurrency(destination.averageDailyBudget)}
          </div>
          <div className="flex items-center gap-2">
            <Compass className="size-4 text-[var(--ghumle-color-coral)]" />
            {destination.recommendedDuration.minDays}-{destination.recommendedDuration.maxDays} days
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[var(--ghumle-color-coral)]" />
            Safety {destination.safetyScore}/100
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {destination.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {tag.toLowerCase()}
            </span>
          ))}
        </div>
        <Link
          href={`/destinations/${destination.slug}`}
          className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--ghumle-color-ocean)]"
        >
          View details
        </Link>
      </div>
    </Card>
  );
}
