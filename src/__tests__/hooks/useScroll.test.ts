/**
 * 🧪 Test Suite: useScroll Hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScroll } from '../../hooks/useScroll';

describe('useScroll', () => {
  let rafCallback: FrameRequestCallback | null = null;

  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    
    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 1;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    rafCallback = null;
  });

  const flushRAF = () => {
    if (rafCallback) {
      rafCallback(0);
      rafCallback = null;
    }
  };

  it('should return initial values correctly', () => {
    const { result } = renderHook(() => useScroll());

    expect(result.current.scrolled).toBe(false);
    expect(result.current.scrollY).toBe(0);
    expect(result.current.isAtTop).toBe(true);
    expect(result.current.scrollDirection).toBe('up');
  });

  it('should detect scroll past threshold', () => {
    const { result } = renderHook(() => useScroll(50));

    // Simula scroll oltre threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
      flushRAF();
    });

    expect(result.current.scrolled).toBe(true);
    expect(result.current.isAtTop).toBe(false);
  });

  it('should track scroll direction', () => {
    const { result } = renderHook(() => useScroll());

    // Scroll giù
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
      flushRAF();
    });

    expect(result.current.scrollDirection).toBe('down');
    expect(result.current.isScrollingDown).toBe(true);
    expect(result.current.isScrollingUp).toBe(false);

    // Scroll su
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      window.dispatchEvent(new Event('scroll'));
      flushRAF();
    });

    expect(result.current.scrollDirection).toBe('up');
    expect(result.current.isScrollingUp).toBe(true);
    expect(result.current.isScrollingDown).toBe(false);
  });

  it('should accept custom threshold', () => {
    const { result } = renderHook(() => useScroll(200));

    // Scroll sotto threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
      window.dispatchEvent(new Event('scroll'));
      flushRAF();
    });

    expect(result.current.scrolled).toBe(false);

    // Scroll sopra threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 250, writable: true });
      window.dispatchEvent(new Event('scroll'));
      flushRAF();
    });

    expect(result.current.scrolled).toBe(true);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useScroll());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
