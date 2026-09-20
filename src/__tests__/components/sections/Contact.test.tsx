/**
 * 🧪 Test Suite: Contact — graceful degradation
 *
 * Quando le credenziali EmailJS mancano, il form non deve fingere di funzionare:
 * si disabilita e propone l'email diretta. Questi test presidiano entrambi i
 * cancelli che lo garantiscono.
 *
 *   Cancello 1  `isEmailJsConfigured` → disabilita il bottone e mostra l'avviso
 *   Cancello 2  il controllo dentro `sendEmail` → blocca l'invio anche se il
 *               submit arriva comunque, per esempio via submit programmatico
 *
 * Perché qui si mocka: `EMAILJS_CONFIG` e `isEmailJsConfigured` sono calcolate
 * una sola volta al caricamento del modulo, a partire da variabili che in
 * produzione Next.js incastona nel bundle a build time. Per esercitare i due
 * stati nello stesso processo di test non basta cambiare `process.env`: serve
 * controllare il modulo. `VALIDATION` resta quella vera, così la validazione
 * testata è quella reale.
 */

import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { personalInfo, socialLinks } from '../../../data/profileData';

const state = vi.hoisted(() => ({ configured: false }));
const emailjsSend = vi.hoisted(() => vi.fn());

vi.mock('@emailjs/browser', () => ({
  default: { send: emailjsSend },
}));

vi.mock('../../../constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../constants')>();

  return {
    ...actual,
    get isEmailJsConfigured() {
      return state.configured;
    },
    get EMAILJS_CONFIG() {
      return state.configured
        ? { serviceId: 'service_test', templateId: 'template_test', publicKey: 'key_test' }
        : { serviceId: undefined, templateId: undefined, publicKey: undefined };
    },
  };
});

// Import statico: Vitest issa i `vi.mock` sopra gli import, quindi `Contact`
// riceve comunque la versione pilotata delle costanti.
import { Contact } from '../../../components/sections/Contact';

/** Compila i tre campi obbligatori con valori che superano la validazione reale. */
async function compilaFormValido(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Nome'), 'Mario');
  await user.type(screen.getByLabelText('Email'), 'mario.rossi@example.com');
  await user.type(screen.getByLabelText('Messaggio'), 'Un messaggio abbastanza lungo.');
}

beforeEach(() => {
  state.configured = false;
  emailjsSend.mockReset();
  emailjsSend.mockResolvedValue({ status: 200, text: 'OK' });
});

describe('Contact — credenziali mancanti', () => {
  it('non solleva eccezioni al rendering', () => {
    expect(() => render(<Contact />)).not.toThrow();
  });

  it('renderizza comunque la sezione e i suoi contatti diretti', () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { name: 'Parliamone' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: personalInfo.email }).length).toBeGreaterThan(0);
  });

  it('mostra l avviso con il riferimento all email diretta', () => {
    render(<Contact />);

    expect(screen.getByText(/Invio dal sito non configurato/i)).toBeVisible();
  });

  it('nell avviso il link punta davvero alla casella del profilo', () => {
    const { container } = render(<Contact />);

    const fallback = container.querySelector(`a[href="mailto:${personalInfo.email}"]`);

    expect(fallback).toBeInTheDocument();
  });

  it('disabilita il bottone di invio', () => {
    render(<Contact />);

    expect(screen.getByRole('button', { name: /Invia messaggio/i })).toBeDisabled();
  });

  it('lascia i campi compilabili: la sezione non è una pagina morta', async () => {
    const user = userEvent.setup();

    render(<Contact />);
    const nome = screen.getByLabelText('Nome');
    await user.type(nome, 'Mario');

    expect(nome).toHaveValue('Mario');
    expect(nome).toBeEnabled();
  });

  it('non chiama emailjs.send nemmeno se il submit arriva comunque', async () => {
    // Il bottone è disabilitato, quindi il click non passa: si forza il submit
    // del form per esercitare il secondo cancello in isolamento.
    const user = userEvent.setup();
    const { container } = render(<Contact />);

    await user.type(screen.getByLabelText('Nome'), 'Mario');
    await user.type(screen.getByLabelText('Email'), 'mario.rossi@example.com');
    await user.type(screen.getByLabelText('Messaggio'), 'Un messaggio abbastanza lungo.');

    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    expect(emailjsSend).not.toHaveBeenCalled();
    expect(await screen.findByText(/configurazione email mancante/i)).toBeVisible();
  });
});

describe('Contact — credenziali presenti', () => {
  beforeEach(() => {
    state.configured = true;
  });

  it('non mostra alcun avviso di configurazione mancante', () => {
    render(<Contact />);

    expect(screen.queryByText(/Invio dal sito non configurato/i)).not.toBeInTheDocument();
  });

  it('abilita il bottone di invio', () => {
    render(<Contact />);

    expect(screen.getByRole('button', { name: /Invia messaggio/i })).toBeEnabled();
  });

  it('invia il messaggio con i parametri attesi dal template', async () => {
    const user = userEvent.setup();

    render(<Contact />);

    await user.type(screen.getByLabelText('Nome'), 'Mario');
    await user.type(screen.getByLabelText('Cognome'), 'Rossi');
    await user.type(screen.getByLabelText('Email'), 'mario.rossi@example.com');
    await user.type(screen.getByLabelText('Messaggio'), 'Un messaggio abbastanza lungo.');
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));

    expect(emailjsSend).toHaveBeenCalledTimes(1);

    // I nomi delle variabili sono un contratto con il template EmailJS: se
    // cambiano qui senza cambiarli là, l'email arriva vuota.
    const [serviceId, templateId, params, publicKey] = emailjsSend.mock.calls[0];

    expect(serviceId).toBe('service_test');
    expect(templateId).toBe('template_test');
    expect(publicKey).toBe('key_test');
    expect(params).toEqual({
      from_name: 'Mario Rossi',
      from_email: 'mario.rossi@example.com',
      phone: '',
      message: 'Un messaggio abbastanza lungo.',
    });
  });

  it('non invia nulla se la validazione fallisce', async () => {
    const user = userEvent.setup();

    render(<Contact />);
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));

    expect(emailjsSend).not.toHaveBeenCalled();
    expect(await screen.findByText(/Controlla i campi evidenziati/i)).toBeVisible();
  });

  it('non offre il recapito diretto quando l errore è di validazione', async () => {
    // Un campo sbagliato si corregge nel form: proporre l'email sarebbe un invito
    // ad abbandonare il modulo per un problema risolvibile in due secondi.
    const user = userEvent.setup();

    render(<Contact />);
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));
    await screen.findByText(/Controlla i campi evidenziati/i);

    expect(within(screen.getByRole('status')).queryByRole('link')).toBeNull();
  });

  it('non offre il recapito diretto dopo un invio riuscito', async () => {
    const user = userEvent.setup();

    render(<Contact />);
    await compilaFormValido(user);
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));
    await screen.findByText(/Messaggio inviato/i);

    expect(within(screen.getByRole('status')).queryByRole('link')).toBeNull();
  });
});

describe('Contact — invio fallito', () => {
  beforeEach(() => {
    state.configured = true;
    emailjsSend.mockRejectedValue(new Error('quota exceeded'));
  });

  it('dichiara il fallimento senza far crashare la pagina', async () => {
    const user = userEvent.setup();

    render(<Contact />);
    await compilaFormValido(user);
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));

    expect(await screen.findByText(/Invio non riuscito/i)).toBeVisible();
  });

  it('rende il recapito diretto un link cliccabile dentro il messaggio d errore', async () => {
    // È lo scenario della quota esaurita: il form non funziona e l'unica via
    // d'uscita utile è scrivere via email, quindi deve bastare un click.
    const user = userEvent.setup();

    render(<Contact />);
    await compilaFormValido(user);
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));
    await screen.findByText(/Invio non riuscito/i);

    const link = within(screen.getByRole('status')).getByRole('link');

    expect(link).toHaveAttribute('href', `mailto:${personalInfo.email}`);
    expect(link).toHaveTextContent(personalInfo.email);
  });

  it('annuncia il messaggio agli screen reader tramite la live region', async () => {
    const user = userEvent.setup();

    render(<Contact />);
    await compilaFormValido(user);
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));
    await screen.findByText(/Invio non riuscito/i);

    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent(personalInfo.email);
  });

  it('lascia il form compilato, così il messaggio non va perso', async () => {
    const user = userEvent.setup();

    render(<Contact />);
    await compilaFormValido(user);
    await user.click(screen.getByRole('button', { name: /Invia messaggio/i }));
    await screen.findByText(/Invio non riuscito/i);

    expect(screen.getByLabelText('Nome')).toHaveValue('Mario');
    expect(screen.getByLabelText('Messaggio')).toHaveValue('Un messaggio abbastanza lungo.');
  });
});

describe('Contact — canali social', () => {
  /** I link social stanno fuori dal form: non dipendono dalla configurazione. */
  function linkSocial() {
    return socialLinks.map(({ label }) => screen.getByRole('link', { name: label }));
  }

  it('renderizza un link per ogni canale del data layer', () => {
    // Prima della V2.1 erano due link scritti a mano: togliere un canale da
    // `profileData` non lo avrebbe rimosso da qui.
    render(<Contact />);

    expect(linkSocial()).toHaveLength(socialLinks.length);
  });

  it('include WhatsApp fra i canali', () => {
    render(<Contact />);

    const whatsapp = socialLinks.find((link) => link.platform === 'whatsapp');

    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', whatsapp?.href);
  });

  it('prende href e aria-label dalla fonte unica', () => {
    render(<Contact />);

    for (const { label, href } of socialLinks) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('apre ogni canale in sicurezza', () => {
    render(<Contact />);

    for (const link of linkSocial()) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
