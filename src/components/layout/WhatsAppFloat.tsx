/**
 * Pulsante flottante per aprire una chat WhatsApp con messaggio precompilato.
 *
 * Server Component: è un `<a>` con stili, non ha stato né effetti, quindi non
 * spedisce un solo byte di JavaScript al client.
 *
 * Sta in `layout/` e non in `ui/` perché legge il data layer, e la regola di
 * dipendenza del progetto vieta alle primitive di `ui/` di importare
 * `profileData`.
 */

import { socialLinks } from '../../data/profileData';
import { socialIcons } from '../ui/SocialIcons';

export function WhatsAppFloat() {
  const whatsapp = socialLinks.find((link) => link.platform === 'whatsapp');

  // Se il canale viene rimosso dal data layer il pulsante sparisce da sé, invece
  // di puntare a un URL inesistente.
  if (!whatsapp) return null;

  const Icon = socialIcons.whatsapp;

  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattami su WhatsApp"
      className={[
        // Sotto la navbar (z-50) e lo skip link (z-[60]): non deve mai coprirli.
        'fixed bottom-6 right-6 z-40',
        // 56px: sopra il minimo di 44px per i bersagli tattili.
        'flex size-14 items-center justify-center rounded-full',
        'bg-whatsapp text-whatsapp-foreground shadow-lg shadow-whatsapp/20',
        'transition-transform duration-200 hover:scale-110 active:scale-95',
        // Su touch un :hover resta incollato dopo il tap: `active:` è il compagno
        // obbligato finché `hoverOnlyWhenSupported` non è attivo.
        'motion-reduce:transition-none motion-reduce:hover:scale-100',
      ].join(' ')}
    >
      <Icon className="size-7" />
    </a>
  );
}
