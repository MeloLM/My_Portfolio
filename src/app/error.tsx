'use client';

/**
 * Error boundary di rotta. Sostituisce la schermata "YOU DIED" del vecchio tema
 * e gli stili inline con il design system condiviso.
 */

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button, ButtonLink } from '../components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // In produzione resta l'unico canale diagnostico lato client.
    console.error('Route error:', error);
  }, [error]);

  return (
    <div role="alert" className="flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-card/40">
          <AlertCircle className="size-5 text-primary" aria-hidden="true" />
        </span>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">Qualcosa è andato storto</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Si è verificato un errore nel caricamento di questa pagina. Puoi riprovare o tornare
          alla home.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>Riprova</Button>
          <ButtonLink href="/" variant="outline">
            Torna alla home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
