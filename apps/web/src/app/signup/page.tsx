import Link from 'next/link';

import { Card, SectionHeading } from '@ghumle/ui';

import { AuthForm } from '../../components/auth-form';

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Signup"
        title="Create your Ghumle account"
        description="Authentication is structured around JWT access, refresh tokens, privacy-aware profile data, and later Google or Apple OAuth support."
      />
      <Card className="mt-8 bg-white">
        <AuthForm mode="signup" />
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
