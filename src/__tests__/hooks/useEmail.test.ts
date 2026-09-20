/**
 * Validazione del form contatti.
 *
 * Nella V1 `useEmail` era l'unico hook senza test, pur essendo il solo pezzo di
 * logica con una conseguenza visibile per un recruiter: il messaggio che parte
 * o non parte.
 */

import { describe, expect, it } from 'vitest';
import { validateEmailForm, type EmailFormData } from '../../hooks/useEmail';

const validForm: EmailFormData = {
  firstName: 'Mario',
  lastName: 'Rossi',
  email: 'mario.rossi@azienda.it',
  phone: '+39 000 000 0000',
  message: 'Ciao, vorrei parlarti di una posizione aperta nel nostro team.',
};

describe('validateEmailForm', () => {
  it('non segnala errori su un form completo', () => {
    expect(validateEmailForm(validForm)).toEqual({});
  });

  it('richiede un nome di lunghezza minima', () => {
    const errors = validateEmailForm({ ...validForm, firstName: 'M' });
    expect(errors.firstName).toBeDefined();
  });

  it('ignora gli spazi quando misura i campi', () => {
    const errors = validateEmailForm({ ...validForm, firstName: '   ' });
    expect(errors.firstName).toBeDefined();
  });

  it('rifiuta email senza dominio o senza chiocciola', () => {
    expect(validateEmailForm({ ...validForm, email: 'mario.rossi' }).email).toBeDefined();
    expect(validateEmailForm({ ...validForm, email: 'mario@azienda' }).email).toBeDefined();
    expect(validateEmailForm({ ...validForm, email: 'mario @azienda.it' }).email).toBeDefined();
  });

  it('rifiuta messaggi troppo corti', () => {
    const errors = validateEmailForm({ ...validForm, message: 'Ciao' });
    expect(errors.message).toBeDefined();
  });

  it('non considera obbligatori cognome e telefono', () => {
    const errors = validateEmailForm({ ...validForm, lastName: '', phone: '' });
    expect(errors).toEqual({});
  });

  it('segnala tutti i campi non validi in una volta sola', () => {
    const errors = validateEmailForm({
      firstName: '',
      lastName: '',
      email: 'non-una-email',
      phone: '',
      message: 'corto',
    });

    expect(Object.keys(errors).sort()).toEqual(['email', 'firstName', 'message']);
  });
});
