'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, PlaneTakeoff } from 'lucide-react';

import { Button } from '@ghumle/ui';

import { clearAuthSession, getDisplayName } from '../lib/auth';
import { useAuthSession } from '../lib/use-auth-session';
import { primaryNavigation, secondaryNavigation } from '../lib/navigation';

export function SiteHeader() {
  const router = useRouter();
  const { session, isHydrated } = useAuthSession();
  const isSignedIn = Boolean(session);

  const handleStartPlanning = () => {
    router.push(isSignedIn ? '/planner' : '/signup');
  };

  const handleLogout = () => {
    clearAuthSession();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(8,19,29,0.8)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="rounded-full bg-white/10 p-2">
            <PlaneTakeoff className="size-5" />
          </span>
          <div>
            <p className="font-[family-name:var(--font-sora)] text-lg font-semibold">Ghumle</p>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Travel platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-white/80 lg:flex">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {secondaryNavigation.slice(0, isSignedIn ? 3 : 2).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/70 transition hover:text-white">
              {item.label}
            </Link>
          ))}
          {isSignedIn ? (
            <>
              <span className="text-sm text-white/60">Hi, {getDisplayName(session?.user)}</span>
              <Button type="button" variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-white/70 transition hover:text-white">
              Login
            </Link>
          )}
          <Button
            type="button"
            className={!isHydrated ? 'pointer-events-none opacity-60' : undefined}
            onClick={handleStartPlanning}
          >
            {isSignedIn ? 'Continue planning' : 'Start planning'}
          </Button>
        </div>

        <button className="inline-flex rounded-full border border-white/15 p-2 text-white lg:hidden" type="button" aria-label="Open navigation">
          <Menu className="size-5" />
        </button>
      </div>
    </header>
  );
}
