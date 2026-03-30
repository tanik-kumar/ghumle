import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-slate-600 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-sora)] text-lg font-semibold text-slate-950">Ghumle</p>
          <p>
            Global trip discovery, planning, savings, and matching designed to scale across web and future mobile apps.
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-slate-900">Product</p>
          <Link href="/explore">Explore destinations</Link>
          <Link href="/planner">Itinerary planner</Link>
          <Link href="/partners">Travel partners</Link>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-slate-900">Planning</p>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/savings">Savings planner</Link>
          <Link href="/my-trips">My trips</Link>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-slate-900">Operations</p>
          <Link href="/admin">Admin dashboard</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Create account</Link>
        </div>
      </div>
    </footer>
  );
}
