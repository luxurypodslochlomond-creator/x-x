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
    // Where the reader was standing when the sheet opened. If they are still there when it
    // closes, they go back to the same line. If they used the sheet to walk through a door,
    // they are on a page they have never read and the page itself has already been sent to
    // its top — putting them back at the old offset would drop them into the middle of it.
    const lockedPath = window.location.pathname;
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
      if (window.location.pathname === lockedPath) window.scrollTo(0, scrollY);
    };
  }, [active]);
}

export default useBodyScrollLock;