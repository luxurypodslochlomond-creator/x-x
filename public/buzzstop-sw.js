// ── BUZZSTOP SERVICE WORKER ──
// Zero-tracking, offline-first tinnitus cancellation
// Cache all assets on first visit — works forever offline

const CACHE_NAME = 'buzzstop-v1';
const ASSETS = [
  '/',
  '/BuzzStop',
  '/index.html',
  // Core JS/CSS will be cached automatically on request
];

self.addEventListener('install', (e) => {
  console.log('[BuzzStop SW] Installing...');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {
        console.log('[BuzzStop SW] Some assets unavailable, continuing anyway');
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('[BuzzStop SW] Activating...');
  e.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[BuzzStop SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Skip non-GET requests and external APIs
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('stripe') || e.request.url.includes('analytics') || e.request.url.includes('tracking')) {
    return; // Don't cache tracking
  }

  // Cache first, fallback to network
  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(e.request)
          .then((response) => {
            // Cache successful responses
            if (response && response.status === 200 && e.request.method === 'GET') {
              cache.put(e.request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Return cached version if network fails
            return cache.match(e.request);
          });
      });
    })
  );
});

// Message handler for manual cache updates
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
