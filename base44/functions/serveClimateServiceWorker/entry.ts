/**
 * Serve Climate Platform Service Worker
 * Registers at /api/functions/serveClimateServiceWorker
 * Caches page assets for offline PWA use — network first, cache fallback.
 */

export default async function(req) {
  try {
  const swCode = `
const CACHE = 'twcc-v2';
const PHOTO_CACHE = 'twcc-photos-v1';

self.addEventListener('install', (e) => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => /^twcc-v[0-9]+$/.test(k) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const publicPhoto = ['media.base44.com', 'base44.app'].includes(url.hostname)
    && url.pathname.includes('/public/6889f31e76713b9cd47e043c/');
  if (e.request.destination === 'image' && publicPhoto) {
    e.respondWith((async () => {
      const cache = await caches.open(PHOTO_CACHE);
      const cached = await cache.match(e.request.url);
      if (cached) return cached;
      const response = await fetch(e.request.url, { mode: 'cors', credentials: 'omit' });
      if (response.ok) {
        e.waitUntil(cache.put(e.request.url, response.clone()).catch(() => {}));
      }
      return response;
    })());
    return;
  }
  // Skip API/function calls — those are handled client-side via localStorage cache
  if (url.pathname.includes('/api/') || url.pathname.includes('/functions/')) return;

  if (url.origin !== self.location.origin) return;
  // Revalidate page HTML; an old shell can reference files from a previous publish.
  const navigation = e.request.mode === 'navigate';
  const script = e.request.destination === 'script';
  const style = e.request.destination === 'style';
  const usable = (res) => res && res.ok && (
    script ? /javascript|ecmascript/i.test(res.headers.get('Content-Type') || '') :
    style ? /text\\/css/i.test(res.headers.get('Content-Type') || '') : true
  );
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(e.request, navigation ? { cache: 'no-cache' } : undefined);
      if (usable(response)) {
        e.waitUntil(cache.put(e.request, response.clone()).catch(() => {}));
        return response;
      }
      // Never replace a working script with an HTML error/fallback page.
      const cached = await cache.match(e.request);
      return usable(cached) ? cached : response;
    } catch (_) {
      const cached = await cache.match(e.request);
      if (usable(cached)) return cached;
      // Only a page navigation can receive HTML, never a script or stylesheet.
      if (!navigation) return Response.error();
      return new Response(
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Offline</title></head><body style="background:#141210;color:#e9eeec;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0"><div style="text-align:center"><p style="color:#7fc9e4;font-size:12px;letter-spacing:0.2em">OFFLINE</p><p style="font-size:11px;opacity:0.5">Reconnect to continue</p></div></body></html>',
        { status: 503, headers: { 'Content-Type': 'text/html' } }
      );
    }
  })());
});
`;

  return new Response(swCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/',
    },
  });
  } catch (error) {
    console.error('Climate offline layer:', error);
    return Response.json({ error: 'Could not load offline support' }, { status: 500 });
  }
}