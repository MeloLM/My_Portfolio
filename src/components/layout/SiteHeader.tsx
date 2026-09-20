'use client';

/**
 * Navbar sticky con fondo trasparente in cima e vetro smerigliato allo scroll.
 * Contiene il link al Blog, che nella V1 era una rotta raggiungibile solo
 * digitando l'URL a mano.
 */

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, SCROLL_THRESHOLD } from '../../constants';
import { personalInfo } from '../../data/profileData';
import { useScroll } from '../../hooks/useScroll';
import { ButtonLink } from '../ui/Button';
import { cn } from '../../lib/utils';

export function SiteHeader() {
  const { scrolled } = useScroll(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Escape chiude il menu mobile e blocca lo scroll del body mentre è aperto.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || menuOpen
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-md text-sm font-semibold tracking-tight text-foreground"
          onClick={closeMenu}
        >
          {personalInfo.name}
        </Link>

        <nav aria-label="Navigazione principale" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/#contact" size="sm">
            Lavoriamo insieme
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted/60 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Chiudi il menu' : 'Apri il menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Navigazione principale mobile"
          className="container flex flex-col gap-1 border-t border-border py-4 md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/#contact" className="mt-2" onClick={closeMenu}>
            Lavoriamo insieme
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
