/**
 * Stato di caricamento delle rotte.
 *
 * Mostrato solo durante una navigazione reale: la landing non ha più il loading
 * screen artificiale da 800ms che la V1 anteponeva al contenuto.
 */

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Caricamento in corso"
      className="flex min-h-screen items-center justify-center"
    >
      <span className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}
