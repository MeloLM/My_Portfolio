'use client';

/**
 * Invio del form contatti tramite EmailJS.
 *
 * L'hook non conosce il DOM: riceve i dati già raccolti e restituisce uno stato
 * di invio. Usa `emailjs.send` con parametri espliciti invece di `sendForm`, così
 * il contratto col template è una struttura tipizzata e non gli attributi `name`
 * sparsi nel markup.
 *
 * @module hooks/useEmail
 */

import { useCallback, useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, VALIDATION, isEmailJsConfigured } from '../constants';

export interface EmailFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

/** Errori di validazione, indicizzati per campo. */
export type EmailFormErrors = Partial<Record<keyof EmailFormData, string>>;

export type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

/**
 * Natura dell'ultimo errore.
 *
 * Serve a chi renderizza: un campo sbagliato si corregge nel form, un invio
 * fallito no — lì l'unica via d'uscita utile è il recapito diretto. Distinguerli
 * con un valore tipizzato evita di far dipendere la UI dal testo del messaggio.
 */
export type EmailErrorKind = 'validation' | 'config' | 'send';

export interface UseEmailReturn {
  status: EmailStatus;
  /** Messaggio di esito, pensato per essere annunciato agli screen reader. */
  feedback: string;
  errors: EmailFormErrors;
  /** Valorizzato solo quando `status` è `'error'`. */
  errorKind: EmailErrorKind | null;
  sendEmail: (data: EmailFormData) => Promise<boolean>;
  reset: () => void;
  /** False quando mancano le variabili d'ambiente: il form va disabilitato. */
  isConfigured: boolean;
}

/** Valida i campi obbligatori, restituendo una mappa vuota se è tutto corretto. */
export function validateEmailForm(data: EmailFormData): EmailFormErrors {
  const errors: EmailFormErrors = {};

  if (data.firstName.trim().length < VALIDATION.minNameLength) {
    errors.firstName = `Il nome deve avere almeno ${VALIDATION.minNameLength} caratteri.`;
  }

  if (!VALIDATION.emailRegex.test(data.email.trim())) {
    errors.email = 'Inserisci un indirizzo email valido.';
  }

  if (data.message.trim().length < VALIDATION.minMessageLength) {
    errors.message = `Il messaggio deve avere almeno ${VALIDATION.minMessageLength} caratteri.`;
  }

  return errors;
}

export function useEmail(): UseEmailReturn {
  const [status, setStatus] = useState<EmailStatus>('idle');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<EmailFormErrors>({});
  const [errorKind, setErrorKind] = useState<EmailErrorKind | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setFeedback('');
    setErrors({});
    setErrorKind(null);
  }, []);

  const sendEmail = useCallback(async (data: EmailFormData): Promise<boolean> => {
    const validationErrors = validateEmailForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setErrorKind('validation');
      setFeedback('Controlla i campi evidenziati.');
      return false;
    }

    const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;

    // Il narrowing esplicito serve al compilatore: le tre variabili sono
    // `string | undefined` e senza questo controllo non compilerebbero.
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setErrorKind('config');
      setFeedback('Invio non disponibile: configurazione email mancante.');
      return false;
    }

    setStatus('sending');
    setErrorKind(null);
    setFeedback('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: `${data.firstName} ${data.lastName}`.trim(),
          from_email: data.email.trim(),
          phone: data.phone.trim(),
          message: data.message.trim(),
        },
        publicKey
      );

      setStatus('success');
      setErrorKind(null);
      setFeedback('Messaggio inviato. Ti rispondo al più presto.');
      return true;
    } catch {
      setStatus('error');
      setErrorKind('send');
      // La frase si chiude sul recapito: chi renderizza vi aggancia il link.
      setFeedback('Invio non riuscito. Riprova o scrivimi direttamente a');
      return false;
    }
  }, []);

  return {
    status,
    feedback,
    errors,
    errorKind,
    sendEmail,
    reset,
    isConfigured: isEmailJsConfigured,
  };
}

export default useEmail;
