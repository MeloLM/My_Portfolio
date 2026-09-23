/**
 * 🧪 Test Suite: Metrics
 *
 * La striscia non ha logica: il rischio non è che calcoli male, è che smetta di
 * leggere il data layer o che perda l'accoppiamento fra numero e didascalia.
 * Una lista di definizioni sbagliata è invisibile a schermo e udibile solo da
 * chi usa uno screen reader, cioè esattamente il difetto che nessuno nota.
 */

import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Metrics } from '../../../components/sections/Metrics';
import { metrics } from '../../../data/profileData';

describe('Metrics', () => {
  it('rende una voce per ogni metrica del data layer', () => {
    render(<Metrics />);

    const gruppo = screen.getByRole('region', { name: 'Numeri in sintesi' });

    expect(within(gruppo).getAllByRole('term')).toHaveLength(metrics.length);
    expect(within(gruppo).getAllByRole('definition')).toHaveLength(metrics.length);
  });

  it('mostra valore ed etichetta di ciascuna metrica', () => {
    render(<Metrics />);

    for (const { value, label } of metrics) {
      expect(screen.getByText(value), `manca il valore ${value}`).toBeInTheDocument();
      expect(screen.getByText(label), `manca l'etichetta ${label}`).toBeInTheDocument();
    }
  });

  it('tiene ogni numero accoppiato alla propria didascalia', () => {
    render(<Metrics />);

    // `flex-col-reverse` inverte solo la resa: nel DOM la coppia resta
    // termine-descrizione, ed è quello che un assistive tech annuncia.
    for (const { value, label } of metrics) {
      const termine = screen.getByText(label);
      const descrizione = screen.getByText(value);

      expect(termine.parentElement).toBe(descrizione.parentElement);
    }
  });

  it('non scrive il maiuscolo nei dati', () => {
    // Il maiuscolo è una scelta tipografica applicata con `uppercase`. Scriverlo
    // nel data layer farebbe sillabare l'etichetta a uno screen reader e
    // impedirebbe di riusarla in tondo altrove.
    for (const { label } of metrics) {
      expect(label, `"${label}" è scritta tutta in maiuscolo`).not.toBe(label.toUpperCase());
    }
  });
});
