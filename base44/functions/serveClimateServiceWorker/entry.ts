/**
 * Serve Climate Platform Service Worker
 * Registers at /api/functions/serveClimateServiceWorker
 * Caches page assets for offline PWA use — network first, cache fallback.
 */

export default Deno.serve((req) => {
  const swCode = `
const CACHE = 'twcc-v1';

self.addEventListener('install', (e) => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Skip API/function calls — those are handled client-side via localStorage cache
  if (url.pathname.includes('/api/') || url.pathname.includes('/functions/')) return;

  // Network first, cache fallback
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone).catch(() => {}));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(cached =>
          cached || new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Offline</title></head><body style="background:#141210;color:#efe7d6;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0"><div style="text-align:center"><p style="color:#e2602a;font-size:12px;letter-spacing:0.2em">OFFLINE</p><p style="font-size:11px;opacity:0.5">Reconnect to continue</p></div></body></html>',
            { status: 503, headers: { 'Content-Type': 'text/html' } }
          )
        )
      )
  );
});
`;

  return new Response(swCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/',
    },
  });
});