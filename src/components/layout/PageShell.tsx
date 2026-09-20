/**
 * Guscio delle pagine interne (blog, case study): stessa navbar e stesso footer
 * della landing, contenuto in un contenitore stretto e leggibile.
 *
 * Server Component: nella V1 era un client component solo per poter importare
 * un foglio di stile.
 */

import type { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Vai al contenuto
      </a>

      <SiteHeader />

      <main id="main-content" className="pb-24 pt-32">
        {children}
      </main>

      <SiteFooter />
    </>
  );
}
