import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Compone classi Tailwind risolvendo i conflitti: l'ultima utility della stessa
 * famiglia vince, così una prop `className` può sovrascrivere lo stile di base
 * di un componente senza dipendere dall'ordine nel foglio di stile generato.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
