import type { Metadata } from 'next';

import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ghumle | Travel discovery, planning, savings, and partner matching',
  description:
    'Ghumle helps travelers discover destinations by budget, build itineraries, track dream trips, save monthly, and find compatible travel partners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
