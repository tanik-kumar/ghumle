import Link from 'next/link';

import { Button, Card } from '@ghumle/ui';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Card className="w-full bg-white text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">404</p>
        <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950">
          Destination not found
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          The requested page does not exist in this Phase 1 Ghumle web app scaffold.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
