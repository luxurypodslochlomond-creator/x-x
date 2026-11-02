// ── THE PREVIEW HOST ────────────────────────────────────────────────────────────
// The editor's live preview runs on its own host, and a background worker stored
// there keeps handing an old copy of the app's code back to the browser. The
// startup script in index.html then reloads the page to "repair" it, forever, and
// the editor gives up before the app can start. Clearing the browser's stored data
// fixes it for a while, and then the old worker comes back.
//
// So on that host alone we install no workers at all. Everywhere else — the
// published app, the custom domains, real customers with push notifications — this
// returns false and nothing changes.

const PREVIEW_PREFIX = 'preview-sandbox--';

export function isPreviewSandbox() {
  return (
    typeof window !== 'undefined' &&
    typeof window.location?.hostname === 'string' &&
    window.location.hostname.startsWith(PREVIEW_PREFIX)
  );
}

// Registers a worker everywhere except the editor preview, where it does nothing
// and resolves to null so a caller waiting on a registration never hangs.
export function registerWorker(url, options) {
  if (isPreviewSandbox()) return Promise.resolve(null);
  if (!('serviceWorker' in navigator)) return Promise.resolve(null);
  return navigator.serviceWorker.register(url, options);
}