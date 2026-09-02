import { useEffect } from 'react';

/**
 * Locks background page scroll while an overlay/sheet is open.
 * Uses the position:fixed technique (not overflow:hidden) so iOS Safari
 * keeps native touch-scrolling INSIDE the fixed overlay — no freeze, no
 * rubber-band judder behind it. Scroll position is preserved and restored.
 */
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return;

    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [active]);
}

export default useBodyScrollLock;