import { SectionHeading, Surface } from '@ghumle/ui';

import { HeroBudgetSearch } from '../../../components/hero-budget-search';

const rankingSignals = [
  'Budget fit',
  'Travel convenience',
  'Popularity',
  'Weather suitability',
  'Value for money',
];

export default function SearchByBudgetPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Budget search"
        title="Find the best destinations for the money you can actually spend"
        description="Phase 1 focuses on realistic recommendation quality, clear cost breakup, and transparent ranking logic instead of vague inspiration-only discovery."
      />
      <div className="mt-8">
        <HeroBudgetSearch />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-5">
        {rankingSignals.map((signal) => (
          <Surface key={signal} className="bg-white/88 text-center">
            <p className="font-[family-name:var(--font-sora)] text-lg font-semibold text-slate-950">{signal}</p>
          </Surface>
        ))}
      </div>
    </div>
  );
}
