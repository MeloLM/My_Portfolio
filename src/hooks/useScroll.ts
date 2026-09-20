/**
 * 🎣 useScroll Hook
 * Gestisce lo stato dello scroll per effetti sulla navbar
 * Ottimizzato con throttling via requestAnimationFrame per performance
 * 
 * @module hooks/useScroll
 * @example
 * const { scrolled, scrollDirection, isAtTop } = useScroll(50);
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseScrollReturn {
  /** True se scrollato oltre threshold */
  scrolled: boolean;
  /** Posizione scroll corrente in px */
  scrollY: number;
  /** Direzione scroll corrente */
  scrollDirection: 'up' | 'down';
  /** True se in cima alla pagina */
  isAtTop: boolean;
  /** True se scrollando verso il basso */
  isScrollingDown: boolean;
  /** True se scrollando verso l'alto */
  isScrollingUp: boolean;
}

/**
 * Custom hook per tracciare stato e direzione scroll
 * @param threshold - Soglia in px per attivare stato "scrolled" (default: 50)
 */
export const useScroll = (threshold: number = 50): UseScrollReturn => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determina direzione scroll
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection('up');
    }
    
    // Aggiorna stato scrolled
    setScrolled(currentScrollY > threshold);
    setScrollY(currentScrollY);
    
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, [threshold]);

  const handleScroll = useCallback(() => {
    // Throttling con requestAnimationFrame per performance
    if (!ticking.current) {
      window.requestAnimationFrame(updateScrollState);
      ticking.current = true;
    }
  }, [updateScrollState]);

  useEffect(() => {
    // Check iniziale
    updateScrollState();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, updateScrollState]);

  return {
    scrolled,
    scrollY,
    scrollDirection,
    isAtTop: scrollY === 0,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
  };
};

export default useScroll;
