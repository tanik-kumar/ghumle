'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, Card, SectionHeading } from '@ghumle/ui';

import { clearAuthSession, getDisplayName, saveAuthSession, type AuthUser } from '../lib/auth';
import { useAuthSession } from '../lib/use-auth-session';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export function ProfilePanel() {
  const router = useRouter();
  const { session, isHydrated } = useAuthSession();
  const accessToken = session?.tokens.accessToken;
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'signed-out' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!session) {
      setUser(null);
      setStatus('signed-out');
      return;
    }

    let active = true;

    const loadProfile = async () => {
      setStatus('loading');
      setMessage(null);

      try {
        const response = await fetch(`${apiBaseUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: 'no-store',
        });

        if (response.status === 401) {
          clearAuthSession();
          if (active) {
            setUser(null);
            setStatus('signed-out');
            setMessage('Your session expired. Please login again.');
          }
          return;
        }

        if (!response.ok) {
          throw new Error('Profile could not be loaded.');
        }

        const latestUser = (await response.json()) as AuthUser;

        if (!active) {
          return;
        }

        saveAuthSession({
          ...session,
          user: latestUser,
          savedAt: new Date().toISOString(),
        });
        setUser(latestUser);
        setStatus('ready');
      } catch (error) {
        if (!active) {
          return;
        }

        setUser(session.user);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Profile could not be refreshed.');
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [accessToken, isHydrated]);

  const currentUser = user ?? session?.user ?? null;
  const travelStyles = currentUser?.profile?.preferredTravelStyles ?? [];

  const handleLogout = () => {
    clearAuthSession();
    router.push('/login');
    router.refresh();
  };

  if (!isHydrated || status === 'idle' || status === 'loading') {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Profile"
          title="Loading your Ghumle identity"
          description="Fetching the saved account session and refreshing profile details."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="min-h-52 animate-pulse bg-white" />
          <Card className="min-h-52 animate-pulse bg-white" />
        </div>
      </div>
    );
  }

  if (status === 'signed-out') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Profile"
          title="Login to access your Ghumle profile"
          description="Your profile, saved trips, savings goals, and travel partner visibility all depend on an active account session."
        />
        <Card className="mt-8 bg-white">
          <p className="text-sm leading-7 text-slate-600">
            {message ?? 'No active session was found on this browser.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary">Create account</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Profile"
        title="Preferences, privacy, base currency, and travel identity"
        description="This screen now reflects the active browser session instead of static demo content."
      />
      {message ? (
        <Card className="mt-6 border-amber-200 bg-amber-50">
          <p className="text-sm text-amber-800">{message}</p>
        </Card>
      ) : null}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <p className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-950">
            {getDisplayName(currentUser)}
          </p>
          <p className="mt-2 text-sm text-slate-500">{currentUser?.email}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {currentUser?.role ?? 'USER'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(travelStyles.length > 0 ? travelStyles : ['PROFILE', 'TRAVELER']).map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {tag.toLowerCase()}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/planner">
              <Button>Continue planning</Button>
            </Link>
            <Button type="button" variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card>
        <Card className="bg-white">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-slate-950">Settings snapshot</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Base currency</span>
              <strong>{currentUser?.profile?.baseCurrency ?? 'INR'}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Timezone</span>
              <strong>{currentUser?.profile?.timezone ?? 'Asia/Kolkata'}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Partner visibility</span>
              <strong>{currentUser?.profile?.privacyLevel ?? 'PRIVATE'}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Country</span>
              <strong>{currentUser?.profile?.countryCode ?? 'Not set'}</strong>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            {currentUser?.profile?.bio?.trim() || 'Add a bio and preferences later as the profile editor is expanded.'}
          </div>
        </Card>
      </div>
    </div>
  );
}
