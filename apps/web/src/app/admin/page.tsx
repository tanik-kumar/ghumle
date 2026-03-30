import { Card, SectionHeading } from '@ghumle/ui';

import { getAdminOverview, getDestinations } from '../../lib/api';
import { formatCompactNumber } from '../../lib/format';

const reports = [
  { id: 'report_demo_1', reason: 'Spam match request', status: 'OPEN' },
  { id: 'report_demo_2', reason: 'Unsafe meetup request', status: 'REVIEWED' },
];

export default async function AdminPage() {
  const [overview, destinations] = await Promise.all([getAdminOverview(), getDestinations()]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Admin"
        title="Content operations, pricing controls, moderation, and analytics"
        description="The Phase 1 admin surface covers destination management, pricing estimates, report review, featured content, and analytics-oriented overview metrics."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <Card className="bg-white">
          <p className="text-sm text-slate-500">Users</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950">
            {formatCompactNumber(overview.totalUsers)}
          </p>
        </Card>
        <Card className="bg-white">
          <p className="text-sm text-slate-500">Trips</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950">
            {formatCompactNumber(overview.activeTrips)}
          </p>
        </Card>
        <Card className="bg-white">
          <p className="text-sm text-slate-500">Savings tracked</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950">
            {formatCompactNumber(overview.monthlySavingsTracked)}
          </p>
        </Card>
        <Card className="bg-white">
          <p className="text-sm text-slate-500">Open reports</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950">
            {overview.openReports}
          </p>
        </Card>
        <Card className="bg-white">
          <p className="text-sm text-slate-500">Featured destinations</p>
          <p className="mt-2 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950">
            {overview.featuredDestinations}
          </p>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="bg-white">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Manage destinations</h2>
          <div className="mt-4 space-y-3">
            {destinations.slice(0, 6).map((destination) => (
              <div key={destination.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                <div>
                  <p className="font-medium text-slate-900">{destination.name}</p>
                  <p>{destination.country}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {destination.scope.toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Reports and moderation</h2>
          <div className="mt-4 space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-slate-900">{report.reason}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {report.status.toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
