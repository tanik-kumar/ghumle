import { Card, SectionHeading } from '@ghumle/ui';

import { SavingsPlannerWidget } from '../../components/savings-planner-widget';

export default function SavingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Savings planner"
        title="Turn trip goals into a realistic monthly contribution plan"
        description="Savings is treated as a first-class travel planning tool rather than a side note. Users can track deposits, see progress, and adjust timing or spend assumptions."
      />
      <div className="mt-8">
        <SavingsPlannerWidget />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <p className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Can I afford this trip?</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Ghumle uses goal amount, saved amount, and target date to estimate monthly burden and suggest plan adjustments.
          </p>
        </Card>
        <Card className="bg-white">
          <p className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Budget optimization tips</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            The recommendation engine can later lower hotel or activity assumptions to make a trip reachable sooner.
          </p>
        </Card>
        <Card className="bg-white">
          <p className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Deposit tracking</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Savings goals are modeled independently so each traveler can maintain multiple trip funds with timeline context.
          </p>
        </Card>
      </div>
    </div>
  );
}
