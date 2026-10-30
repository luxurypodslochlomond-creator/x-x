/**
 * BuzzStop Service Worker
 * Served at /buzzstop-sw.js
 * Caches the app shell so BuzzStop works fully offline after first visit
 */

import { serviceWorkerFetch } from '../../shared/serviceWorkerFetch.ts';

export default async function(req) {
  const swCode = `
// BuzzStop Service Worker — Offline Cache
// Version bump to force fresh install
const CACHE_NAME = 'buzzstop-v4';

const CACHE_URLS = [
  '/BuzzStop',
  '/BuzzStopAbout',
  '/BuzzStopTerms',
  '/BuzzStopPrivacy',
];

// Install: cache the app shell immediately
self.addEventListener('install', (event) => {
  console.log('[BuzzStop SW] Installing...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_URLS).catch(err => {
        console.log('[BuzzStop SW] Pre-cache partial fail (ok):', err);
      });
    })
  );
});

// Activate: clear old caches
self.addEventListener('activate', (event) => {
  console.log('[BuzzStop SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => /^buzzstop-v[0-9]+$/.test(k) && k !== CACHE_NAME).map(k => {
          console.log('[BuzzStop SW] Clearing old cache:', k);
          return caches.delete(k);
        })
      )
    ).then(() => clients.claim())
  );
});

${serviceWorkerFetch}
self.addEventListener('fetch', (event) => appFetch(event, CACHE_NAME));

console.log('[BuzzStop SW] Loaded ✓ — offline ready');
`;

  return new Response(swCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Service-Worker-Allowed': '/',
    },
  });
}