/**
 * Serve Climate Platform Service Worker
 * Registers at /api/functions/serveClimateServiceWorker
 * Caches page assets for offline PWA use — network first, cache fallback.
 */

import { serviceWorkerFetch } from '../../shared/serviceWorkerFetch.ts';

export default async function(req) {
  try {
  const swCode = `
const CACHE = 'twcc-v5';
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

// ── THE PHONE ANSWERS ─────────────────────────────────────────────────────────
// Until now the record's worker only knew how to serve pages offline, so a push arriving at
// an installed record had nothing to answer it and the notification never appeared. This is
// the missing half: a tap that says one thing and opens the one room where the work is.
//
// Nothing in it can reach the network on its own, and nothing in it is written by a visitor:
// the words come from the record's own server, and the only address it will ever open is the
// one the server put in the message.
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = {}; }
  e.waitUntil(self.registration.showNotification(d.title || 'The record', {
    body: d.body || '',
    icon: d.icon || '/api/functions/serveClimateIcon',
    badge: d.badge || '/api/functions/serveClimateIcon',
    tag: d.tag || 'record',
    data: { url: (d.data && d.data.url) || '/ClimateKeeperRoom' },
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || '/ClimateKeeperRoom';
  e.waitUntil((async () => {
    const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of open) {
      if ('focus' in c) {
        try { await c.navigate(target); } catch (err) { /* a window that will not move is still worth focusing */ }
        return c.focus();
      }
    }
    return self.clients.openWindow(target);
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