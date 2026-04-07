/**
 * BuzzStop Service Worker
 * Served at /buzzstop-sw.js
 * Caches the app shell so BuzzStop works fully offline after first visit
 */

Deno.serve((req) => {
  const swCode = `
// BuzzStop Service Worker — Offline Cache
// Version bump to force fresh install
const CACHE_NAME = 'buzzstop-v3';

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
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[BuzzStop SW] Clearing old cache:', k);
          return caches.delete(k);
        })
      )
    ).then(() => clients.claim())
  );
});

// Fetch: Cache-first for pages, network-first for API calls
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Skip non-same-origin and API calls
  if (!event.request.url.startsWith(self.location.origin)) return;
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Serve from cache, refresh in background
        fetch(event.request).then(fresh => {
          if (fresh && fresh.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, fresh.clone()).catch(() => {});
            });
          }
        }).catch(() => {});
        return cached;
      }

      // Not in cache — fetch from network and cache it
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone).catch(() => {});
          });
        }
        return response;
      }).catch(() => {
        // Total offline fallback
        return caches.match('/BuzzStop');
      });
    })
  );
});

console.log('[BuzzStop SW] Loaded ✓ — offline ready');
`;

  return new Response(swCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Service-Worker-Allowed': '/',
    },
  });
});