// Shared by the app's service workers. Cache failures must never stop a download.
export const serviceWorkerFetch = `
function appFetch(event, cacheName) {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (/^\\/(?:api|functions|src|node_modules|@vite|@id|@fs|@react-refresh)(?:\\/|$)/.test(url.pathname)) return;
  const navigation = request.mode === 'navigate';
  const script = request.destination === 'script' || /\\.(?:m?js|jsx|tsx?)$/.test(url.pathname);
  const style = request.destination === 'style' || /\\.css$/.test(url.pathname);
  const usable = response => response && response.ok && response.status !== 206 && (
    script ? /(?:java|ecma)script/i.test(response.headers.get('Content-Type') || '') :
    style ? /text\\/css/i.test(response.headers.get('Content-Type') || '') :
    navigation ? /text\\/html/i.test(response.headers.get('Content-Type') || '') : true
  );
  event.respondWith((async () => {
    const cache = await caches.open(cacheName).catch(() => null);
    const cachedResponse = async () => cache ? cache.match(request).catch(() => null) : null;
    try {
      const response = await fetch(request, navigation ? { cache: 'no-cache' } : undefined);
      if (usable(response)) {
        if (cache) event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
        return response;
      }
      const cached = await cachedResponse();
      if (usable(cached)) return cached;
      // A missing script must never receive the HTML app shell.
      return script || style ? Response.error() : response;
    } catch (_) {
      const cached = await cachedResponse();
      if (usable(cached)) return cached;
      if (!navigation) return Response.error();
      return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><title>Offline</title><body><p>Reconnect to load this page.</p></body></html>', {
        status: 503, headers: { 'Content-Type': 'text/html' }
      });
    }
  })());
}
`;