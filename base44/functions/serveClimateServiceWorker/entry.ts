/**
 * Serve Climate Platform Service Worker
 * Registers at /api/functions/serveClimateServiceWorker
 * Caches page assets for offline PWA use — network first, cache fallback.
 */

import { serviceWorkerFetch } from '../../shared/serviceWorkerFetch.ts';

export default async function(req) {
  try {
  const swCode = `
const CACHE = 'twcc-v4';
const PHOTO_CACHE = 'twcc-photos-v1';

self.addEventListener('install', (e) => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => /^twcc-v[0-9]+$/.test(k) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

${serviceWorkerFetch}
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
  appFetch(e, CACHE);
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