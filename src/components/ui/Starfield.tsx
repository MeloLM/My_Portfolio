'use client';

/**
 * Campo stellare animato su canvas, pensato per stare dietro l'hero.
 *
 * È l'unico pezzo client della landing: `Hero` resta un Server Component e si
 * limita a montare questo canvas come fratello del proprio contenuto.
 *
 * Il loop non gira mai a vuoto. Si ferma quando l'hero esce dal viewport
 * (IntersectionObserver), quando la scheda passa in background
 * (`visibilitychange`) e non parte affatto se l'utente ha chiesto meno
 * animazioni: in quel caso le stelle vengono disegnate una volta sola e restano
 * ferme.
 */

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  /** Velocità verticale in px per frame, sempre verso l'alto. */
  speed: number;
  /** Fase del twinkle: determina l'alpha istante per istante. */
  phase: number;
}

/** Tetto al numero di stelle: oltre, il costo per frame cresce senza guadagno visivo. */
const MAX_STARS = 110;
/** Un astro ogni ~13000 px² di superficie, così la densità non dipende dallo schermo. */
const AREA_PER_STAR = 13000;

const RADIUS_MIN = 0.35;
const RADIUS_MAX = 1.65;
const SPEED_MIN = 0.04;
const SPEED_MAX = 0.2;

const PHASE_STEP = 0.012;
const ALPHA_BASE = 0.35;
const ALPHA_SWING = 0.3;

/**
 * Bianco appena virato al blu. Resta un letterale perché il canvas non legge le
 * custom property del tema: è l'unico colore del progetto fuori dai token, ed è
 * confinato qui.
 */
const STAR_RGB = '191, 214, 255';

/** Oltre questo margine la stella è fuori campo e viene riciclata dal basso. */
const EXIT_MARGIN = 4;
/** Il resize arriva a raffica: si ridisegna una volta sola a raffica finita. */
const RESIZE_DEBOUNCE_MS = 150;
/** Oltre 2x il guadagno percettivo è nullo e il costo di fill quadruplica. */
const MAX_DPR = 2;

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frameId: number | null = null;
    let resizeTimer: number | undefined;
    // Ottimista: se IntersectionObserver non risponde subito, l'animazione parte
    // comunque e viene semmai fermata al primo callback.
    let inViewport = true;

    /**
     * Allinea il buffer del canvas alla sua dimensione CSS tenendo conto del
     * device pixel ratio. Assegnare width/height azzera il contesto, quindi la
     * trasformazione va riapplicata ogni volta.
     */
    const measure = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = (): void => {
      const count = Math.max(0, Math.round(Math.min(MAX_STARS, (width * height) / AREA_PER_STAR)));

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: RADIUS_MIN + Math.random() * (RADIUS_MAX - RADIUS_MIN),
        speed: SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN),
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (): void => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${STAR_RGB}, ${ALPHA_BASE + Math.sin(star.phase) * ALPHA_SWING})`;
        ctx.fill();
      }
    };

    const step = (): void => {
      for (const star of stars) {
        star.y -= star.speed;
        star.phase += PHASE_STEP;

        if (star.y < -EXIT_MARGIN) {
          star.y = height + EXIT_MARGIN;
          star.x = Math.random() * width;
        }
      }

      draw();
      frameId = window.requestAnimationFrame(step);
    };

    const stop = (): void => {
      if (frameId === null) return;
      window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    const start = (): void => {
      if (frameId !== null) return;
      if (reducedMotion.matches || !inViewport || document.hidden) return;
      frameId = window.requestAnimationFrame(step);
    };

    /**
     * Unico punto che decide fra animazione e fotogramma fermo, così le tre
     * condizioni di stop non possono divergere fra loro.
     */
    const render = (): void => {
      if (reducedMotion.matches) {
        stop();
        // Le fasi iniziali sono già casuali: il cielo resta vario, solo immobile.
        draw();
        return;
      }

      start();
    };

    const handleResize = (): void => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        measure();
        seed();
        // Con il loop attivo ci pensa il frame successivo; da fermi no.
        if (reducedMotion.matches) draw();
      }, RESIZE_DEBOUNCE_MS);
    };

    const handleVisibilityChange = (): void => {
      if (document.hidden) stop();
      else render();
    };

    const handleMotionPreferenceChange = (): void => {
      render();
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        inViewport = entry.isIntersecting;
      }

      if (inViewport) render();
      else stop();
    });

    measure();
    seed();
    render();

    observer.observe(canvas);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[-1] h-full w-full"
    />
  );
}
