import { useCallback, useEffect, useState } from 'react';

// ── WHAT IS ACTUALLY ON THIS PHONE ────────────────────────────────────────────
// Brian, 26 November: "offline mode fully working… best possible and fast as fuck… don't
// make us look stupid in any way."
//
// The honest way to do that is to stop claiming and start counting. This hook asks the
// phone itself — not the record, not a guess — how many of the wall's drawings it is
// holding, and offers one tap that puts the rest there. It reads the same two caches the
// worker writes, so what it reports is what would still be there with the wifi off.
const PHOTO_CACHE = 'twcc-photos-v1';

async function countKept(urls) {
  if (typeof caches === 'undefined') return 0;
  try {
    const cache = await caches.open(PHOTO_CACHE);
    let kept = 0;
    for (const url of urls) {
      if (await cache.match(url)) kept += 1;
    }
    return kept;
  } catch {
    return 0;
  }
}

export default function useOfflineKept(cartoons) {
  const urls = cartoons.map((cartoon) => cartoon.display_image_url).filter(Boolean);
  const signature = urls.join('|');
  const [state, setState] = useState({ checked: false, kept: 0, total: urls.length, keeping: false });
  const [worker, setWorker] = useState(false);

  useEffect(() => {
    if (!urls.length) return undefined;
    let alive = true;
    countKept(urls).then((kept) => {
      if (alive) setState({ checked: true, kept, total: urls.length, keeping: false });
    });
    return () => { alive = false; };
  }, [signature]);

  // The worker that holds the pages is registered here as well as on the record's front
  // page, because somebody handed the wall's address straight from a message lands on this
  // page first — and if the worker is not started here, that is the person who arrives at a
  // workshop with nothing kept.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return undefined;
    navigator.serviceWorker.register('/api/functions/serveClimateServiceWorker', { scope: '/' }).catch(() => {});
    setWorker(!!navigator.serviceWorker.controller);
    const onControl = () => setWorker(true);
    navigator.serviceWorker.addEventListener('controllerchange', onControl);
    return () => navigator.serviceWorker.removeEventListener('controllerchange', onControl);
  }, []);

  const keep = useCallback(async () => {
    setState((previous) => ({ ...previous, keeping: true }));
    // Asking for each picture the way the page asks for it, so the worker sees an image
    // request and keeps it — the same route the drawings took when they were looked at.
    await Promise.all(urls.map((url) => new Promise((resolve) => {
      const picture = new Image();
      picture.onload = resolve;
      picture.onerror = resolve;
      picture.src = url;
    })));
    const kept = await countKept(urls);
    setState({ checked: true, kept, total: urls.length, keeping: false });
  }, [signature]);

  return {
    ...state,
    worker,
    keep,
    ready: state.checked && state.total > 0 && state.kept === state.total,
  };
}