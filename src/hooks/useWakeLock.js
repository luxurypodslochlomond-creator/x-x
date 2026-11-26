import { useEffect } from 'react';

// ── THE SCREEN STAYS AWAKE WHILE A DRAWING IS UP ───────────────────────────────
// A cartoon is held up in a room: at a workshop, on a call, across a kitchen table while
// somebody reads the joke out loud. Every phone dims after thirty seconds, and the drawing
// goes with it — so the person holding it touches the glass to keep it alive, which is the
// one thing a picture should never make you do.
//
// This asks the device to keep its screen on for as long as the full-size reading is open,
// and lets go the moment it closes. Where the device has no such API, or refuses it (a
// battery saver, a browser that never shipped it), nothing happens and nothing breaks: the
// drawing simply behaves as it did before. It is never announced on screen, because a
// permission nobody asked about is noise, and this one needs no answer.
export default function useWakeLock(active) {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !navigator.wakeLock) return undefined;
    let sentinel = null;
    let live = true;
    const acquire = async () => {
      if (!live) return;
      try {
        sentinel = await navigator.wakeLock.request('screen');
      } catch {
        sentinel = null;
      }
    };
    // The device drops the lock whenever the tab is hidden; it has to be asked again when
    // the reader comes back to it, or the screen dims halfway through the next drawing.
    const onVisible = () => {
      if (document.visibilityState === 'visible') acquire();
    };
    acquire();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      live = false;
      document.removeEventListener('visibilitychange', onVisible);
      if (sentinel) sentinel.release().catch(() => {});
    };
  }, [active]);
}