const METADATA = 'twcc_photos_v1';
const PHOTO_CACHE = 'twcc-photos-v1';

export function savedClimatePhotos() {
  try { return JSON.parse(localStorage.getItem(METADATA)) || []; }
  catch { return []; }
}

export function saveClimatePhotos(photos) {
  try { localStorage.setItem(METADATA, JSON.stringify(photos)); }
  catch { /* A full browser store must not stop online viewing. */ }
}

export async function storeClimatePhotos(photos) {
  if (!('caches' in window)) return;
  // A phone on a metered or slow link should not pull the whole photograph set down in
  // the background: the record still reads online, and the offline copy waits for a
  // connection that can afford it.
  const link = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (link?.saveData || /2g/.test(link?.effectiveType || '')) return;
  try {
    const cache = await caches.open(PHOTO_CACHE);
    for (let i = 0; i < photos.length; i += 4) {
      await Promise.all(photos.slice(i, i + 4).map(async ({ image_url }) => {
        if (await cache.match(image_url)) return;
        const response = await fetch(image_url, { credentials: 'omit', signal: AbortSignal.timeout(15000) });
        if (response.ok && response.headers.get('content-type')?.startsWith('image/')) await cache.put(image_url, response);
      }));
    }
    const current = new Set(photos.map(photo => photo.image_url));
    await Promise.all((await cache.keys()).filter(request => !current.has(request.url)).map(request => cache.delete(request)));
  } catch { /* Offline saving is optional when storage or connectivity is unavailable. */ }
}

export async function offlineClimatePhotos(photos) {
  if (!('caches' in window)) return photos;
  try {
    const cache = await caches.open(PHOTO_CACHE);
    return await Promise.all(photos.map(async photo => {
      const response = await cache.match(photo.image_url);
      return response ? { ...photo, display_url: URL.createObjectURL(await response.blob()) } : photo;
    }));
  } catch { return photos; }
}