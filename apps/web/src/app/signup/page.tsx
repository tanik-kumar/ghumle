import Link from 'next/link';

import { Button, Card, SectionHeading } from '@ghumle/ui';

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Signup"
        title="Create your Ghumle account"
        description="Authentication is structured around JWT access, refresh tokens, privacy-aware profile data, and later Google or Apple OAuth support."
      />
      <Card className="mt-8 bg-white">
        <form className="space-y-4">
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Full name</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="text" placeholder="Demo Traveler" />
          </label>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="email" placeholder="traveler@ghumle.app" />
          </label>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Password</span>
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="password" placeholder="Minimum 8 characters" />
          </label>
          <Button className="w-full" type="submit">
            Create account
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-[var(--ghumle-color-ocean)]">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
