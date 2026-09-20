/**
 * 🧪 Test Suite: Field, Input, Textarea
 *
 * Il contratto di accessibilità di `Field` è diviso fra il contenitore e chi lo
 * usa: `Field` produce il paragrafo d'errore con `id={htmlFor}-error`, ma è il
 * chiamante a cablare `aria-describedby` sul controllo. In `Contact.tsx` quel
 * valore è una stringa letterale (`'email-error'`), non derivata: se il template
 * dell'id cambiasse qui, il form perderebbe l'annuncio dell'errore senza che né
 * TypeScript né il compilatore se ne accorgano.
 *
 * Per questo i test qui sotto bloccano il formato dell'id e verificano il
 * risultato finale — la descrizione accessibile del controllo — invece di
 * fermarsi alla presenza del testo.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Field, Input, Textarea } from '../../../components/ui/Field';

const tokens = (classes: string): string[] => classes.split(/\s+/).filter(Boolean);

describe('Field', () => {
  describe('label association', () => {
    it('should associate the visible label with the control it wraps', () => {
      render(
        <Field htmlFor="firstName" label="Nome">
          <Input id="firstName" />
        </Field>
      );

      // `getByLabelText` risolve l'associazione come farebbe uno screen reader:
      // se `htmlFor` e `id` divergessero, questa query non troverebbe nulla.
      expect(screen.getByLabelText('Nome')).toBe(screen.getByRole('textbox'));
    });

    it('should render the label as a real label element pointing at htmlFor', () => {
      render(
        <Field htmlFor="email" label="Email">
          <Input id="email" />
        </Field>
      );

      const label = screen.getByText('Email');

      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', 'email');
    });

    it('should keep the label visible rather than hiding it from sighted users', () => {
      render(
        <Field htmlFor="phone" label="Telefono (facoltativo)">
          <Input id="phone" />
        </Field>
      );

      expect(screen.getByText('Telefono (facoltativo)')).toBeVisible();
    });

    it('should give the control an accessible name taken from the label', () => {
      render(
        <Field htmlFor="message" label="Messaggio">
          <Textarea id="message" />
        </Field>
      );

      expect(screen.getByRole('textbox')).toHaveAccessibleName('Messaggio');
    });
  });

  describe('error message', () => {
    it('should not render an error paragraph when no error is given', () => {
      const { container } = render(
        <Field htmlFor="email" label="Email">
          <Input id="email" />
        </Field>
      );

      expect(container.querySelector('#email-error')).toBeNull();
    });

    it('should render the error text when an error is given', () => {
      render(
        <Field htmlFor="email" label="Email" error="Inserisci un indirizzo email valido">
          <Input id="email" />
        </Field>
      );

      expect(screen.getByText('Inserisci un indirizzo email valido')).toBeVisible();
    });

    it('should derive the error id from htmlFor', () => {
      // Questo formato è un contratto pubblico: `Contact.tsx` scrive a mano
      // `aria-describedby="message-error"`. Cambiarlo qui rompe il form.
      render(
        <Field htmlFor="message" label="Messaggio" error="Il messaggio è troppo corto">
          <Textarea id="message" />
        </Field>
      );

      expect(screen.getByText('Il messaggio è troppo corto')).toHaveAttribute(
        'id',
        'message-error'
      );
    });

    it('should render the error inside a paragraph, after the control', () => {
      const { container } = render(
        <Field htmlFor="email" label="Email" error="Campo obbligatorio">
          <Input id="email" />
        </Field>
      );

      const error = screen.getByText('Campo obbligatorio');
      const input = screen.getByRole('textbox');

      expect(error.tagName).toBe('P');
      // L'errore segue il controllo nell'ordine del DOM, così la lettura
      // sequenziale resta label → campo → motivo dell'errore.
      expect(container.firstChild).toContainElement(input);
      expect(input.compareDocumentPosition(error) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  describe('accessible description wiring', () => {
    it('should expose the error as the accessible description of the control', () => {
      // Replica esatta del pattern usato in `Contact.tsx`.
      const message = 'Inserisci un indirizzo email valido';

      render(
        <Field htmlFor="email" label="Email" error={message}>
          <Input id="email" aria-invalid aria-describedby="email-error" />
        </Field>
      );

      const input = screen.getByLabelText('Email');

      expect(input).toHaveAccessibleDescription(message);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should leave the control without a description when there is no error', () => {
      render(
        <Field htmlFor="email" label="Email">
          <Input id="email" aria-invalid={false} />
        </Field>
      );

      const input = screen.getByLabelText('Email');

      expect(input).toHaveAccessibleDescription('');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('should keep name and description independent', () => {
      render(
        <Field htmlFor="email" label="Email" error="Campo obbligatorio">
          <Input id="email" aria-describedby="email-error" />
        </Field>
      );

      const input = screen.getByLabelText('Email');

      expect(input).toHaveAccessibleName('Email');
      expect(input).toHaveAccessibleDescription('Campo obbligatorio');
    });
  });

  describe('className merging via cn()', () => {
    it('should append a custom class that conflicts with nothing', () => {
      const { container } = render(
        <Field htmlFor="email" label="Email" className="sm:col-span-2">
          <Input id="email" />
        </Field>
      );

      expect(container.firstChild).toHaveClass('sm:col-span-2', 'flex', 'flex-col', 'gap-2');
    });

    it('should let a custom class override a base class of the same family', () => {
      const { container } = render(
        <Field htmlFor="email" label="Email" className="gap-6">
          <Input id="email" />
        </Field>
      );

      expect(container.firstChild).toHaveClass('gap-6');
      expect(container.firstChild).not.toHaveClass('gap-2');
    });
  });

  describe('children', () => {
    it('should render whatever control it is given, not only Input', () => {
      render(
        <Field htmlFor="role" label="Ruolo">
          <select id="role">
            <option>Frontend</option>
          </select>
        </Field>
      );

      expect(screen.getByLabelText('Ruolo')).toBe(screen.getByRole('combobox'));
    });
  });
});

describe('Input', () => {
  it('should render a native input element', () => {
    render(<Input aria-label="Nome" />);

    expect(screen.getByRole('textbox').tagName).toBe('INPUT');
  });

  it('should apply the shared control classes', () => {
    render(<Input aria-label="Nome" />);

    expect(screen.getByRole('textbox')).toHaveClass(
      'w-full',
      'rounded-lg',
      'border',
      'border-input',
      'text-sm'
    );
  });

  it('should let className override a conflicting control class', () => {
    render(<Input aria-label="Nome" className="rounded-none" />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('rounded-none');
    expect(input).not.toHaveClass('rounded-lg');
  });

  it('should append a custom class that conflicts with nothing', () => {
    render(<Input aria-label="Nome" className="font-mono" />);

    expect(screen.getByRole('textbox')).toHaveClass('font-mono', 'w-full', 'border-input');
  });

  it('should forward input attributes to the DOM node', () => {
    render(
      <Input
        aria-label="Email"
        type="email"
        name="email"
        placeholder="mario.rossi@example.com"
        autoComplete="email"
        inputMode="email"
        required
      />
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('placeholder', 'mario.rossi@example.com');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveAttribute('inputmode', 'email');
    expect(input).toBeRequired();
  });

  it('should forward aria-invalid and aria-describedby', () => {
    render(<Input aria-label="Email" aria-invalid aria-describedby="email-error" />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('should forward typing to onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Input aria-label="Nome" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'Carmelo');

    expect(onChange).toHaveBeenCalledTimes(7);
    expect(screen.getByRole('textbox')).toHaveValue('Carmelo');
  });

  it('should not accept typing while disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Input aria-label="Nome" onChange={onChange} disabled />);

    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
    await user.type(input, 'Carmelo');
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('Textarea', () => {
  it('should render a native textarea element', () => {
    render(<Textarea aria-label="Messaggio" />);

    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('should be vertically resizable by default', () => {
    render(<Textarea aria-label="Messaggio" />);

    expect(screen.getByRole('textbox')).toHaveClass('resize-y');
  });

  it('should let className override the resize behaviour', () => {
    render(<Textarea aria-label="Messaggio" className="resize-none" />);

    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveClass('resize-none');
    expect(textarea).not.toHaveClass('resize-y');
  });

  it('should carry every control class that Input carries', () => {
    // Invariante: i due controlli condividono la costante `control`. Se qualcuno
    // ne modificasse uno solo, i campi del form divergerebbero visivamente.
    const { unmount } = render(<Input aria-label="Nome" />);
    const inputClasses = tokens(screen.getByRole('textbox').className);
    unmount();

    render(<Textarea aria-label="Messaggio" />);
    const textareaClasses = tokens(screen.getByRole('textbox').className);

    expect(inputClasses.every((token) => textareaClasses.includes(token))).toBe(true);
    expect(textareaClasses).toContain('resize-y');
  });

  it('should forward textarea attributes to the DOM node', () => {
    render(<Textarea aria-label="Messaggio" name="message" rows={6} placeholder="Scrivi qui" />);

    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('name', 'message');
    expect(textarea).toHaveAttribute('rows', '6');
    expect(textarea).toHaveAttribute('placeholder', 'Scrivi qui');
  });

  it('should forward typing to onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Textarea aria-label="Messaggio" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'Ciao');

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(screen.getByRole('textbox')).toHaveValue('Ciao');
  });
});
