// BuzzStop Service Worker - Offline-First Audio Healing
const CACHE_NAME = 'buzzstop-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/BuzzStop',
];

// Install: cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // Graceful fail - assets will be cached on first load
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Block all tracking/analytics requests
  if (
    request.url.includes('analytics') ||
    request.url.includes('tracking') ||
    request.url.includes('gtag') ||
    request.url.includes('facebook.com') ||
    request.url.includes('google-analytics')
  ) {
    event.respondWith(new Response('Blocked', { status: 403 }));
    return;
  }

  // Network-first for HTML (but cache fallback for offline)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Cache-first for assets (images, CSS, JS)
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put(request, response.clone()));
          return response;
        });
      })
    );
    return;
  }

  // Default: network + cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && (request.method === 'GET')) {
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
