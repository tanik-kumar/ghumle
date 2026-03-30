import { Card, SectionHeading } from '@ghumle/ui';

import { getWishlist } from '../../lib/api';
import { formatCurrency } from '../../lib/format';

export default async function WishlistPage() {
  const wishlist = await getWishlist();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Wishlist"
        title="Dream destinations, target budgets, and future trip intent"
        description="Wishlist items are modeled separately from confirmed trip plans so users can track aspirations without forcing a full itinerary too early."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {wishlist.map((item) => (
          <Card key={item.id} className="bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950">
                  {item.destinationName}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {item.targetMonth}/{item.targetYear}
                </p>
              </div>
              <span className="rounded-full bg-[var(--ghumle-color-mist)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ghumle-color-ocean)]">
                Future plan
              </span>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Target budget</p>
              <p className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950">
                {formatCurrency(item.targetBudget)}
              </p>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">{item.note}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
