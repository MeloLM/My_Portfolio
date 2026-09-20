import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

const control =
  'w-full rounded-lg border border-input bg-muted/30 px-3.5 py-2.5 text-sm text-foreground ' +
  'placeholder:text-muted-foreground/60 transition-colors duration-200 ' +
  'hover:border-border focus:border-primary focus:bg-muted/50 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'aria-[invalid=true]:border-red-500/70';

interface FieldProps {
  /** Collega `<label>` al controllo: sempre esplicito, mai label implicite. */
  htmlFor: string;
  label: string;
  /** Messaggio d'errore; se presente viene annunciato dagli screen reader. */
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Contenitore di campo: label visibile, controllo, messaggio d'errore. */
export function Field({ htmlFor, label, error, className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground/90">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, 'resize-y', className)} {...props} />;
}
