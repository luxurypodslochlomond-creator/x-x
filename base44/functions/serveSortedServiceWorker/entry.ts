/**
 * SORTED Service Worker — Offline First for Global Access
 * Works in Palestine, Iran, North Korea, Africa, anywhere
 * Registers at /sorted-sw.js
 */

Deno.serve((req) => {
  const swCode = `
// SORTED Offline-First Service Worker
const CACHE_NAME = 'sorted-v1-offline';
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
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => clients.claim())
  );
});

// Fetch — offline first, then network
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests
  if (!url.startsWith(self.location.origin)) return;
  
  // API calls — network only (AI analysis needs server)
  if (url.includes('/api/functions/')) {
    event.respondWith(
      fetch(event.request).then(response => {
        // Cache successful API responses briefly
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => {
        // Offline — show cached if available
        return caches.match(event.request);
      })
    );
    return;
  }
  
  // Static assets — cache first, then network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Return cached immediately
        return cached;
      }
      // Fetch from network
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return response;
      });
    }).catch(() => {
      // Total offline — show fallback
      if (event.request.destination === 'document') {
        return caches.match('/');
      }
      return new Response('Offline', { status: 503 });
    })
  );
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
});