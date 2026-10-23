// ── OUR OWN WORDS ───────────────────────────────────────────────────────────────
// Two kinds of word stand on a climate page. There is the English the record was written
// in, and there is every word this platform has already put in front of a reader in some
// other tongue — the page-wide translator's, and the record's own hand-written copy.
//
// Only the first may ever be translated. When one of our own translations is mistaken for
// the English, the next tongue is translated from a translation, and that is how a page
// ends up in two or three languages at once: Gaelic left standing under an Italian
// heading, a Spanish headline re-translated into Scots.
//
// So every word we produce is remembered in here. Nothing in this store is ever asked to
// be translated again, and nothing in it is ever treated as a source.

const produced = new Set();
let loaded = false;

// Tongues already translated on this device are ours too — a reader who comes back, or
// switches back, must never see them translated a second time.
function loadFromDevice() {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith('uf51_site_dict_')) continue;
      const dict = JSON.parse(localStorage.getItem(key) || '{}');
      Object.values(dict).forEach((v) => { if (typeof v === 'string' && v) produced.add(v.trim()); });
    }
  } catch { /* private mode — we simply start with nothing remembered */ }
}

export function producedWords() {
  if (!loaded) { loaded = true; loadFromDevice(); }
  return produced;
}

// A page that translates its own copy tells us what it put on the screen, so the shared
// engine leaves those words exactly where they are.
export function markProduced(values) {
  if (!values) return;
  values.forEach((v) => { if (typeof v === 'string' && v.trim()) produced.add(v.trim()); });
}