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
// So every word we produce is remembered in here, held apart per tongue — a French word
// never blocks the Spanish for the same English — and nothing in this store is ever asked
// to be translated again, or treated as a source.

const produced = new Map();
let loaded = false;

const bucket = (lang) => {
  const key = String(lang || 'und');
  if (!produced.has(key)) produced.set(key, new Set());
  return produced.get(key);
};

const add = (lang, values) => {
  const set = bucket(lang);
  values.forEach((v) => { if (typeof v === 'string' && v.trim()) set.add(v.trim()); });
};

// Tongues already translated on this device are ours too — a reader who comes back, or
// switches back, must never see them translated a second time.
function loadFromDevice() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
    for (const key of keys) {
      if (!key) continue;
      // A tongue as it stands now — made from the English, never from another tongue.
      // The record's own hand-written copy is held the same way, under its own key.
      const match = /^(?:uf51_tongue_|climate51_t_)(.+)$/.exec(key);
      if (match) {
        const dict = JSON.parse(localStorage.getItem(key) || '{}');
        add(match[1], Object.values(dict || {}));
      }
      // Words from before the record had one engine. Some were made out of other translations,
      // so they are neither trusted nor kept: they come off the device.
      else if (key.startsWith('uf51_site_dict_')) {
        localStorage.removeItem(key);
      }
    }
  } catch { /* private mode — we simply start with nothing remembered */ }
}

export function producedWords(lang) {
  if (!loaded) { loaded = true; loadFromDevice(); }
  return bucket(lang);
}

// A page that translates its own copy tells us what it put on the screen, so the shared
// engine leaves those words exactly where they are.
export function markProduced(values, lang) {
  if (!values) return;
  add(lang, values);
}