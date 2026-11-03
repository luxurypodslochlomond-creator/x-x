// Shared by the app's service workers. Cache failures must never stop a download.
//
// ── THE RULE THAT MATTERS MOST ──────────────────────────────────────────────────
// A page shell (the HTML) is never kept and never served from the cache.
//
// The shell names the exact files of the build it came from. Those filenames carry
// a fingerprint that changes on every publish, so an older shell points at files
// that no longer exist. Handing one back on a weak signal does not feel like an
// offline page: the browser boots the old page, asks for its files, and every one
// of them is gone — which surfaces as "Importing a module script failed" and a
// dead screen. So when the network cannot be reached, this says so plainly instead
// of pretending with a stale shell. Files that do not name a build — pictures,
// styles, a script already on the device — are still served from the cache.
export const serviceWorkerFetch = `
const offlinePage = () => new Response(
  '<!doctype html><html lang="en"><meta charset="utf-8"><title>Offline</title>' +
  '<body style="margin:0;background:#f4efe4;color:#1a1612;font-family:ui-monospace,Menlo,monospace;' +
  'display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px">' +
  '<div><p style="font-size:14px;line-height:1.7;margin:0 0 8px">Reconnect to load this page.</p>' +
  '<p style="font-size:11px;color:#6b6258;margin:0">Nothing has been lost.</p></div></body></html>',
  { status: 503, headers: { 'Content-Type': 'text/html' } }
);

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
        if (cache && !navigation) event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
        return response;
      }
      if (navigation) return offlinePage();
      const cached = await cachedResponse();
      if (usable(cached)) return cached;
      // A missing script must never receive the HTML app shell.
      return script || style ? Response.error() : response;
    } catch (_) {
      if (navigation) return offlinePage();
      const cached = await cachedResponse();
      if (usable(cached)) return cached;
      return Response.error();
    }
  })());
}
`;