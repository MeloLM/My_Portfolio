'use client';

/**
 * Sezione contatti: recapiti diretti a sinistra, form in stile dashboard a destra.
 *
 * L'invio passa da `useEmail`, che legge le credenziali solo da variabili
 * `NEXT_PUBLIC_`. Se mancano, il form si disabilita e propone l'email diretta:
 * meglio un canale onesto che un pulsante che finge di funzionare grazie a
 * credenziali hardcodate nel bundle.
 */

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/profileData';
import { useEmail, type EmailFormData } from '../../hooks/useEmail';
import { Button } from '../ui/Button';
import { Field, Input, Textarea } from '../ui/Field';
import { SectionHeading } from '../ui/SectionHeading';
import { socialIcons } from '../ui/SocialIcons';

const emptyForm: EmailFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState<EmailFormData>(emptyForm);
  const { status, feedback, errors, errorKind, sendEmail, isConfigured } = useEmail();

  const isSending = status === 'sending';

  const update = (field: keyof EmailFormData) => (value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sent = await sendEmail(form);
    if (sent) setForm(emptyForm);
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/60 py-24 sm:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contatti"
              title="Lavoriamo insieme"
              description="Cerco un team dove applicare lo stack Next.js/Laravel su progetti reali. Scrivimi: rispondo a tutti."
              align="left"
            />

            <ul className="mt-10 flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-card/40 transition-colors group-hover:border-primary/50">
                    <Mail className="size-4 text-primary" aria-hidden="true" />
                  </span>
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-card/40 transition-colors group-hover:border-primary/50">
                    <Phone className="size-4 text-primary" aria-hidden="true" />
                  </span>
                  {personalInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-card/40">
                  <MapPin className="size-4 text-primary" aria-hidden="true" />
                </span>
                {personalInfo.location}
              </li>
            </ul>

            {/*
              Itera la fonte unica come Hero e SiteFooter: aggiungere o togliere un
              canale in `profileData` si riflette qui senza toccare questo file.
              Prima della V2.1 erano due link scritti a mano, GitHub e LinkedIn.
            */}
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map(({ platform, label, href }) => {
                const Icon = socialIcons[platform];

                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-lg border border-border bg-card/40 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-xl border border-border/80 bg-card/40 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field htmlFor="firstName" label="Nome" error={errors.firstName}>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Mario"
                  value={form.firstName}
                  onChange={(event) => update('firstName')(event.target.value)}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  disabled={isSending}
                />
              </Field>

              <Field htmlFor="lastName" label="Cognome">
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Rossi"
                  value={form.lastName}
                  onChange={(event) => update('lastName')(event.target.value)}
                  disabled={isSending}
                />
              </Field>

              <Field htmlFor="email" label="Email" error={errors.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="mario.rossi@email.com"
                  value={form.email}
                  onChange={(event) => update('email')(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isSending}
                />
              </Field>

              <Field htmlFor="phone" label="Telefono (facoltativo)">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+39 000 000 0000"
                  value={form.phone}
                  onChange={(event) => update('phone')(event.target.value)}
                  disabled={isSending}
                />
              </Field>

              <Field
                htmlFor="message"
                label="Messaggio"
                error={errors.message}
                className="sm:col-span-2"
              >
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Raccontami del progetto o della posizione."
                  value={form.message}
                  onChange={(event) => update('message')(event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  disabled={isSending}
                />
              </Field>
            </div>

            {!isConfigured && (
              <p className="mt-6 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  Invio dal sito non configurato su questo ambiente. Scrivimi direttamente a{' '}
                  <a href={`mailto:${personalInfo.email}`} className="underline">
                    {personalInfo.email}
                  </a>
                  .
                </span>
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={isSending || !isConfigured}>
                {isSending ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Invio in corso
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" />
                    Invia messaggio
                  </>
                )}
              </Button>

              <p
                role="status"
                aria-live="polite"
                className={`flex items-center gap-2 text-sm ${
                  status === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {status === 'success' && <CheckCircle2 className="size-4" aria-hidden="true" />}
                {status === 'error' && <AlertCircle className="size-4" aria-hidden="true" />}
                <span>
                  {feedback}
                  {/*
                    Solo su invio fallito: un errore di validazione si corregge nel
                    form, mentre qui il recapito diretto è l'unica via d'uscita utile.
                  */}
                  {errorKind === 'send' && (
                    <>
                      {' '}
                      <a href={`mailto:${personalInfo.email}`} className="underline">
                        {personalInfo.email}
                      </a>
                    </>
                  )}
                </span>
              </p>
            </div>

            {/*
              Nota informativa, non una checkbox: il consenso è prestato con
              l'invio. Sta sotto al pulsante perché è lì che l'utente decide, e
              usa `Link` perché /privacy è una rotta interna.
            */}
            <p className="mt-4 text-xs text-muted-foreground">
              Inviando il form accetti il trattamento dei dati personali secondo la{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
