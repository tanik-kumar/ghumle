import Link from 'next/link';

import { Button, Card, SectionHeading } from '@ghumle/ui';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Login"
        title="Sign in to sync trips, wishlist, savings, and matching"
        description="The backend already exposes JWT and refresh-token ready auth endpoints for the Phase 1 platform."
      />
      <Card className="mt-8 bg-white">
        <form className="space-y-4">
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="email" placeholder="traveler@ghumle.app" />
          </label>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Password</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="password" placeholder="Password@123" />
          </label>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          New here?{' '}
          <Link href="/signup" className="font-semibold text-[var(--ghumle-color-ocean)]">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}
