import { Card, SectionHeading } from '@ghumle/ui';

import { PartnerCard } from '../../components/partner-card';
import { getTravelMatches } from '../../lib/api';

export default async function PartnersPage() {
  const matches = await getTravelMatches();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Travel partner match"
        title="Connect travelers with compatible budgets, dates, and destination intent"
        description="The initial implementation keeps privacy controls, basic moderation, and chat-ready backend placeholders in scope without pretending to solve trust through UI alone."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          {matches.map((match) => (
            <PartnerCard key={match.id} match={match} />
          ))}
        </div>
        <div className="space-y-4">
          <Card className="bg-white">
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Privacy controls</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>Private, matchable, and public visibility levels.</li>
              <li>Preference-based filtering on budget, destination, and travel month.</li>
              <li>Safety disclaimer and reporting flow designed into the backend surface.</li>
            </ul>
          </Card>
          <Card className="bg-white">
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Chat-ready design</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Phase 1 intentionally stops at request/connect flows, while the backend shape keeps room for notification events and future in-app chat threads.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
