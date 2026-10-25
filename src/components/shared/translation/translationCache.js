import { base44 } from '@/api/base44Client';

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

export function mergeDictionary(lang, words) {
  const dict = getDictionary(lang);
  for (const [source, value] of Object.entries(words || {})) {
    if (typeof value === 'string' && value.trim()) dict[source] = value.trim();
  }
  try { localStorage.setItem(keyFor(lang), JSON.stringify(dict)); } catch { /* Memory remains usable. */ }
  return dict;
}

// Existing hand-written wording becomes a source-keyed dictionary, not a second DOM translator.
export function seedTranslations(versions) {
  for (const [lang, strings] of Object.entries(versions)) {
    if (lang === 'en') continue;
    const dict = getDictionary(lang);
    for (const [key, value] of Object.entries(strings)) {
      if (versions.en[key] && !dict[versions.en[key]] && typeof value === 'string' && value) dict[versions.en[key]] = value;
    }
  }
}

export function pullDictionary(lang) {
  if (!published.has(lang)) {
    const request = base44.functions.invoke('serveClimateTongue', { lang }).then((response) => {
      const body = response.data || response;
      if (body.error) throw new Error(body.error);
      return mergeDictionary(lang, body.dict);
    }).catch((error) => { published.delete(lang); throw error; });
    published.set(lang, request);
  }
  return published.get(lang);
}

export function splitWords(words, maxChars = 3000, maxItems = 40) {
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

export async function translateWords(lang, words, isCurrent = () => true) {
  const pieces = splitWords(words.filter((word) => !getDictionary(lang)[word]));
  let incomplete = false;
  // Two bounded requests at most; late answers only ever fill their OWN language's cache.
  for (let i = 0; i < pieces.length && isCurrent(); i += 2) {
    const answers = await Promise.allSettled(pieces.slice(i, i + 2).map(async (piece) => {
      const strings = Object.fromEntries(piece.map((word, index) => [`s${index}`, word]));
      const response = await base44.functions.invoke('translateClimate', { lang, strings });
      const body = response.data || response;
      if (body.error || body.refused || !body.translations) throw new Error(body.error || 'Translation unavailable');
      const fresh = {};
      piece.forEach((source, index) => {
        const value = body.translations[`s${index}`];
        if (typeof value === 'string' && value.trim()) fresh[source] = value;
      });
      mergeDictionary(lang, { ...fresh, ...body.frame });
      if (piece.some((word) => !fresh[word]) || body.incomplete) incomplete = true;
    }));
    if (answers.some((answer) => answer.status === 'rejected')) incomplete = true;
  }
  return { incomplete };
}