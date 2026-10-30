import { base44 } from '@/api/base44Client';
import { markProduced } from '@/components/shared/translationMemory';

// ── ONE TONGUE, HELD IN MEMORY, WRITTEN TO THE DEVICE ONCE ─────────────────────
// Every word this platform puts on a screen in a tongue other than English is held here:
// read from the device, grown by whatever the page is missing, and written back once at
// the end of a pass rather than after every piece. On a long page that is the difference
// between ten slow saves and one — the reader sees the same tongue either way.
const dictionaries = new Map();
const published = new Map();
const keyFor = (lang) => `uf51_tongue_${lang}`;

export function getDictionary(lang) {
  if (!dictionaries.has(lang)) {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(keyFor(lang)) || '{}'); } catch { /* Private browsing still has memory. */ }
    dictionaries.set(lang, Object.assign(Object.create(null), Object.fromEntries(Object.entries(saved || {}).filter(([, value]) => typeof value === 'string' && value.trim()))));
  }
  return dictionaries.get(lang);
}

// Words land in memory now; the device is written once, when the pass is done.
export function mergeDictionary(lang, words) {
  const dict = getDictionary(lang);
  for (const [source, value] of Object.entries(words || {})) {
    if (typeof value === 'string' && value.trim()) dict[source] = value.trim();
  }
  // Everything we produce is ours from now on: never a source, never translated again.
  markProduced(Object.values(words || {}), lang);
  return dict;
}

export function saveDictionary(lang) {
  try { localStorage.setItem(keyFor(lang), JSON.stringify(getDictionary(lang))); } catch { /* Memory remains usable. */ }
}

// Existing hand-written wording becomes a source-keyed dictionary, not a second DOM translator.
export function seedTranslations(versions) {
  for (const [lang, strings] of Object.entries(versions)) {
    if (lang === 'en') continue;
    const dict = getDictionary(lang);
    for (const [key, value] of Object.entries(strings)) {
      if (versions.en[key] && !dict[versions.en[key]] && typeof value === 'string' && value) dict[versions.en[key]] = value;
    }
    saveDictionary(lang);
  }
}

export function pullDictionary(lang) {
  if (!published.has(lang)) {
    const request = base44.functions.invoke('serveClimateTongue', { lang }).then((response) => {
      const body = response.data || response;
      if (body.error) throw new Error(body.error);
      mergeDictionary(lang, body.dict);
      saveDictionary(lang);
      return getDictionary(lang);
    }).catch((error) => { published.delete(lang); throw error; });
    published.set(lang, request);
  }
  return published.get(lang);
}

export function splitWords(words, maxChars = 3200, maxItems = 45) {
  const pieces = [];
  let piece = [], chars = 0;
  for (const word of new Set(words)) {
    if (piece.length && (piece.length >= maxItems || chars + word.length > maxChars)) {
      pieces.push(piece); piece = []; chars = 0;
    }
    piece.push(word); chars += word.length;
  }
  if (piece.length) pieces.push(piece);
  return pieces;
}

// ── NOTHING IS LEFT IN ENGLISH BY ACCIDENT ─────────────────────────────────────
// The nav is already held, so it turns over at once; the body's words have to be made.
// Pieces are asked for three at a time so a whole page arrives in one wave rather than in
// pairs, and anything that does not come back is asked for once more, in halves, before
// the record gives up on it. `incomplete` is then the honest answer: these words really
// could not be made, and the original stands in their place.
const AT_ONCE = 3;

async function askPieces(lang, words, isCurrent) {
  const pieces = splitWords(words.filter((word) => !getDictionary(lang)[word]));
  for (let i = 0; i < pieces.length && isCurrent(); i += AT_ONCE) {
    await Promise.allSettled(pieces.slice(i, i + AT_ONCE).map(async (piece) => {
      const strings = Object.fromEntries(piece.map((word, index) => [`s${index}`, word]));
      const response = await base44.functions.invoke('translateClimate', { lang, strings });
      const body = response.data || response;
      if (body.error || !body.translations) throw new Error(body.error || 'Translation unavailable');
      const fresh = {};
      piece.forEach((source, index) => {
        const value = body.translations[`s${index}`];
        if (typeof value === 'string' && value.trim()) fresh[source] = value;
      });
      mergeDictionary(lang, { ...fresh, ...body.frame });
    }));
  }
  saveDictionary(lang);
}

export async function translateWords(lang, words, isCurrent = () => true) {
  const missing = () => [...new Set(words)].filter((word) => !getDictionary(lang)[word]);
  await askPieces(lang, words, isCurrent);
  if (missing().length && isCurrent()) await askPieces(lang, missing(), isCurrent);
  return { incomplete: missing().length > 0 };
}