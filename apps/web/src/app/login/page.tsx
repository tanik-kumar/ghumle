import Link from 'next/link';

import { Card, SectionHeading } from '@ghumle/ui';

import { AuthForm } from '../../components/auth-form';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Login"
        title="Sign in to sync trips, wishlist, savings, and matching"
        description="The backend already exposes JWT and refresh-token ready auth endpoints for the Phase 1 platform."
      />
      <Card className="mt-8 bg-white">
        <AuthForm mode="login" />
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
