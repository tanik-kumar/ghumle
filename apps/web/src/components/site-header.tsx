'use client';

import Link from 'next/link';
import { Menu, PlaneTakeoff } from 'lucide-react';

import { Button } from '@ghumle/ui';

import { primaryNavigation, secondaryNavigation } from '../lib/navigation';

export function SiteHeader() {
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
          {secondaryNavigation.slice(0, 2).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/70 transition hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/signup">
            <Button>Start planning</Button>
          </Link>
        </div>

        <button className="inline-flex rounded-full border border-white/15 p-2 text-white lg:hidden" type="button" aria-label="Open navigation">
          <Menu className="size-5" />
        </button>
      </div>
    </header>
  );
}
