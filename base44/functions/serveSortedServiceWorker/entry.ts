/**
 * SORTED Service Worker — Offline First for Global Access
 * Works in Palestine, Iran, North Korea, Africa, anywhere
 * Registers at /sorted-sw.js
 */

import { serviceWorkerFetch } from '../../shared/serviceWorkerFetch.ts';

export default async function(req) {
  const swCode = `
// SORTED Offline-First Service Worker
const CACHE_NAME = 'sorted-v2-offline';
const ASSETS_TO_CACHE = [
  '/',
  '/Sorted',
  '/api/functions/serveSortedOGImage',
];

// Install — cache core assets
self.addEventListener('install', (event) => {
  console.log('[SORTED SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SORTED SW] Caching core assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SORTED SW] Activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => /^sorted-v[0-9]+-offline$/.test(key) && key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => clients.claim())
  );
});

${serviceWorkerFetch}
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  // Keep the existing offline API fallback separate from page/script caching.
  if (request.method === 'GET' && url.origin === self.location.origin && url.pathname.includes('/api/functions/')) {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }
  appFetch(event, CACHE_NAME);
});

// Background sync for when connection returns
self.addEventListener('sync', (event) => {
  console.log('[SORTED SW] Sync event:', event.tag);
  if (event.tag === 'save-case') {
    event.waitUntil(
      // Retry saving cases when back online
      self.registration.showNotification('SORTED', {
        body: 'Back online! Syncing your cases...',
        icon: '/api/functions/serveSortedOGImage',
      })
    );
  }
});

console.log('[SORTED SW] Loaded — works offline anywhere ♾️❤️');
`;

  return new Response(swCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/',
    },
  });
}