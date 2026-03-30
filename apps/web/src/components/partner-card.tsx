import { ShieldAlert, WalletCards } from 'lucide-react';

import type { TravelMatchPreview } from '@ghumle/contracts';
import { Card } from '@ghumle/ui';

import { formatCurrency } from '../lib/format';

export function PartnerCard({ match }: { match: TravelMatchPreview }) {
  return (
    <Card className="bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">
            {match.displayName}
          </p>
          <p className="text-sm text-slate-500">
            {match.destinationName} • {match.travelMonth}/{match.travelYear}
          </p>
        </div>
        <span className="rounded-full bg-[var(--ghumle-color-mist)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ghumle-color-ocean)]">
          {match.visibility.toLowerCase()}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{match.note}</p>
      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <WalletCards className="size-4 text-[var(--ghumle-color-coral)]" />
          {formatCurrency(match.minBudget)} - {formatCurrency(match.maxBudget)}
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-4 text-[var(--ghumle-color-coral)]" />
          Reporting and safety controls enabled
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {match.matchingTags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {tag.toLowerCase()}
          </span>
        ))}
      </div>
    </Card>
  );
}
