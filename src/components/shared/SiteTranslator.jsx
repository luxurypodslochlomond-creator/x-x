import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import { producedWords, markProduced } from '@/components/shared/translationMemory';

// ── EVERY TONGUE · NOBODY LEFT BEHIND, ON EVERY PAGE ──
// Rather than rewriting hundreds of pages, this reads the words actually on the screen,
// asks for the ones it has not seen before, and swaps them in place. Translations are
// kept in a dictionary on the device per language, so shared wording (the nav, the
// buttons) is only ever translated once, and switching back to English restores the
// original words instantly because every original is held in memory.
//
// Four things keep it smooth, and each one matters:
//  1. The words we already hold go in BEFORE the browser paints — a page read in this
//     tongue before is never seen in English, not even for a frame.
//  2. What we hold is applied and what we are missing is collected in ONE pass; the missing
//     words then leave in short pieces, one after another, instead of one lump that waits.
//  3. The English a word was written in is remembered per node, so a translated word is
//     never fed back in for a second translation, and the engine never chases its own
//     writes around the page.
//  4. When React rewrites a word on its own, only that word goes back — at once, not in a
//     beat — so a translated page does not flicker.
//
// Nothing here can break a page: if a translation never arrives, the words stay English.

const KEEP = new Set([
  'X = X', 'UF51', 'SORTED', 'CB51', 'PETSOUNDS51', 'PET SOUNDS51', 'ZAPP', 'MAGIC51', 'LEARN51',
  'TRACKT', 'BUZZSTOP', 'BUZZTRIP', 'CTRL51', 'SHED51', 'PROF51', 'EARTH51', 'ALETHEIA', 'HORIZON INTERNATIONAL',
]);
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'TITLE']);

// ── ONE PIECE AT A TIME ──
// A page is not asked for in one lump. It is asked for in pieces the record can answer quickly, and
// the next piece leaves the moment the last one lands. This matters more than it looks: a lump big
// enough to hold a whole page is a lump slow enough to time out, and a lump that times out leaves
// every word in it English AND refuses the words behind it while it hangs — which is how a page
// ends up half in a tongue and half in English. Short pieces mean the words arrive while the reader
// is already reading, and one slow piece never costs the rest.
const PIECE_SIZE = 40;      // words per ask, with room for the record's frame alongside them
const PIECE_CHARS = 1200;
const DICT_LIMIT = 8000;
const SETTLE_MS = 260;    // let a new page render before the first ask
const REFRESH_MS = 120;   // a word React rewrote goes back at once, not after a beat

const originals = new Map(); // text node -> the words the app wrote in it

// The tongue a reader already holds on this device. A new name for it, deliberately: every
// dictionary written under the old key was made while two engines were translating each
// other's words, so those words are left where they are and are never read again.
const dictKey = (lang) => `uf51_tongue_${lang}`;

function loadDict(lang) {
  try { return JSON.parse(localStorage.getItem(dictKey(lang)) || '{}'); } catch { return {}; }
}

function saveDict(lang, dict) {
  try {
    if (Object.keys(dict).length > DICT_LIMIT) return;
    localStorage.setItem(dictKey(lang), JSON.stringify(dict));
  } catch { /* storage full or private mode — the page still reads, it just re-asks next time */ }
}

// ── A MADE TONGUE IS READ LIKE A PUBLISHED FILE, NOT PUT TOGETHER FOR EACH READER ──
// The record's wording is finite and the same for everyone, so a made tongue is one small file:
// the browser holds it, the edge holds it, and the platform is only asked when a tongue has
// actually grown. A reader therefore costs the platform nothing for words, whether there are ten
// of them or ten million. The keys below are worded so they can never be mistaken for a tongue.
const versionKey = (lang) => `uf51_tonguever_${lang}`;

// Once per visit, not once every twelve hours. A tongue is a published file, and a reader who
// arrives holding an older copy of it must be handed the current one — otherwise a word the
// record has corrected stays wrong on their device, and the reader is shown wording the record
// no longer stands behind. The file is held at the edge, so this costs a reader almost nothing.
const checkedThisVisit = new Set();

async function pullTongue(lang, force = false) {
  try {
    if (!force && checkedThisVisit.has(lang)) return false;
    checkedThisVisit.add(lang);
    const mine = localStorage.getItem(versionKey(lang)) || '';
    const q = `lang=${encodeURIComponent(lang)}${mine ? `&v=${encodeURIComponent(mine)}` : ''}`;
    let res = await fetch(`/functions/serveClimateTongue?${q}`);
    if (!res.ok) res = await fetch(`/api/functions/serveClimateTongue?${q}`);
    if (!res.ok) return false;
    const body = await res.json();
    if (body.version) localStorage.setItem(versionKey(lang), String(body.version));
    else localStorage.removeItem(versionKey(lang));
    if (body.unchanged || !body.dict) return false;
    const made = Object.keys(body.dict).length;
    if (made) saveDict(lang, { ...loadDict(lang), ...body.dict });
    return made > 0;
  } catch {
    return false; // no signal, or held back: the copy already on the device still stands
  }
}

// Every word this platform has produced is remembered in translationMemory, shared with
// the record's own hand-written copy — one store, so no engine ever translates another's
// words. See that file for why this matters.

// ── A BOX'S HINT IS COPY TOO ──
// The grey line inside a box is the one piece of the record's writing every reader meets before
// they write anything, and it is held ON the element rather than written inside it — so the engine
// walked straight past it. It is read and written here like any other word: a hint is handed over
// in the reader's tongue, and put back into English the moment they leave that tongue.
const readWord = (node) => (node.nodeType === Node.TEXT_NODE ? node.nodeValue : node.getAttribute('placeholder'));
const writeWord = (node, value) => {
  if (node.nodeType === Node.TEXT_NODE) node.nodeValue = value;
  else node.setAttribute('placeholder', value);
};

function translatable(node) {
  if (node.nodeType !== Node.TEXT_NODE) return !node.closest('[data-no-translate]');
  const parent = node.parentElement;
  if (!parent) return false;
  if (SKIP_TAGS.has(parent.tagName)) return false;
  return !parent.closest('[data-no-translate]');
}

// A word worth asking about: real words, not a number, not a brand we keep in English.
function worthAsking(text) {
  if (text.length < 2 || text.length > 1000) return false;
  if (!/[A-Za-zÀ-ÿ]/.test(text)) return false;
  if (/^[\d\s.,:%£$€/-]+$/.test(text)) return false;
  if (KEEP.has(text.toUpperCase())) return false;
  return true;
}

export default function SiteTranslator() {
  const { chosen, isRTL, setTranslating } = useSiteLanguage();
  const location = useLocation();
  const dictRef = useRef({});
  const translated = useRef(new Set()); // every word this tongue has produced so far
  const asked = useRef(new Set());      // what we have sent for, so nothing is asked twice
  const queue = useRef(new Set());      // words met on the page, waiting their turn in a piece
  const working = useRef(false);        // one piece is in flight at a time — the rest follow it

  useEffect(() => { document.documentElement.dir = isRTL ? 'rtl' : 'ltr'; }, [isRTL]);

  // The chosen tongue on the root, so the layout can behave for any script (see index.css).
  useEffect(() => { document.documentElement.dataset.tongue = chosen || 'en'; }, [chosen]);

  // Every word in one piece of the page: the lines of text, and the hints held by the boxes.
  const eachWord = useCallback((root, fn) => {
    if (root.nodeType === Node.TEXT_NODE) { fn(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.closest('[data-no-translate]')) return;
    if (root.hasAttribute('placeholder') && translatable(root)) fn(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) fn(node);
    root.querySelectorAll('[placeholder]').forEach((el) => { if (translatable(el)) fn(el); });
  }, []);

  // One visit to one text node. If its translation is held, it goes on the page. If
  // nothing is held for it, the English it was written in comes back to be asked for.
  const visit = useCallback((node, dict) => {
    const raw = readWord(node);
    if (!raw || !translatable(node)) return null;
    const held = originals.get(node);
    if (held === undefined) originals.set(node, raw);
    // React rewrote this line itself (a counter, a list): that is the new English.
    else if (held !== raw && !translated.current.has(raw.trim()) && !producedWords().has(raw.trim())) originals.set(node, raw);
    const source = (originals.get(node) || raw).trim();
    if (!source) return null;

    // Our own words — the record's hand-written copy, or anything this engine has already
    // put on a page — are not English, and are never translated and never asked about.
    if (producedWords().has(source)) return null;

    const t = dict[source];
    if (t && t !== source && raw.includes(source)) {
      const next = raw.replace(source, t);
      if (readWord(node) !== next) writeWord(node, next);
      return null;
    }
    return worthAsking(source) && !dict[source] ? source : null;
  }, []);

  const paint = useCallback((dict) => {
    eachWord(document.body, (node) => { visit(node, dict); });
  }, [eachWord, visit]);

  const sweep = useCallback((dict) => {
    const missing = new Set();
    eachWord(document.body, (node) => {
      const need = visit(node, dict);
      if (need && !asked.current.has(need)) missing.add(need);
    });
    return [...missing];
  }, [eachWord, visit]);

  const restore = useCallback(() => {
    originals.forEach((raw, node) => {
      try { if (readWord(node) !== raw) writeWord(node, raw); } catch { /* node gone */ }
    });
  }, []);

  // A new tongue is about to go on: our own words come off first, so what is left on the
  // page is English — the words the record actually stands behind — and the new tongue is
  // translated from that. Only our own words are touched; a counter or a date the app wrote
  // itself is left exactly where it is.
  const restoreTranslated = useCallback(() => {
    const produced = producedWords();
    originals.forEach((raw, node) => {
      try {
        const now = readWord(node);
        if (now && produced.has(now.trim())) writeWord(node, raw);
      } catch { /* node gone */ }
    });
  }, []);

  // ── A CORRECTED WORD REPLACES THE ONE IT CORRECTS ──
  // Until now a word already standing on the page was left alone: the swap only happened while
  // the page still held the English to look the word up by. So a tongue the record had improved
  // could never reach the reader who most needed it — the one already reading in that tongue, who
  // would have kept the older wording for good. Here the English each node was written in is
  // looked up every time, so the record's current wording is what stands on the page. A count or
  // a date the app wrote itself is not ours, and is left exactly where it is.
  const repaint = useCallback((dict) => {
    const produced = producedWords();
    originals.forEach((raw, node) => {
      if (!node.isConnected) { originals.delete(node); return; }
      const source = (raw || '').trim();
      const fresh = source ? dict[source] : null;
      if (!fresh || fresh === source) return;
      const now = readWord(node);
      if (now === null || now === raw) return;
      const standing = now.trim();
      // Only a word we put there is replaced — the wording this tongue was showing a moment ago,
      // or any word this engine has produced. A count or a date the app wrote is left alone.
      if (!translated.current.has(standing) && !produced.has(standing)) return;
      const next = now.replace(source, fresh);
      if (next !== now) writeWord(node, next);
    });
  }, []);

  // The tongue as a whole, once — every page of the record at once, not one page's worth of words
  // at a time. It comes off the edge (see pullTongue), and the device keeps it from then on, so
  // this page and every page after it are read in the right tongue with nothing asked for at all.
  // When it arrives, it is put on the page as well as kept: a reader is never left standing in the
  // wording the record has just replaced.
  const refreshTongue = useCallback(async (lang, force = false) => {
    const arrived = await pullTongue(lang, force);
    if (!arrived) return;
    const dict = loadDict(lang);
    dictRef.current = dict;
    translated.current = new Set(Object.values(dict));
    markProduced(Object.values(dict)); // our own words — none of them is ever fed back in as English
    repaint(dict);
  }, [repaint]);

  // A word met on the page is put in the queue, once. One piece leaves at a time and the next goes
  // the moment the last has landed, so a long page fills in while the reader is reading it.
  const enqueue = useCallback((word) => {
    if (!word || asked.current.has(word)) return;
    asked.current.add(word);
    queue.current.add(word);
  }, []);

  // One short piece, answered. What comes back goes straight onto the page. If nothing comes back,
  // those words are free to be asked again rather than written off for the rest of the visit.
  const askPiece = useCallback(async (lang, words) => {
    const dict = dictRef.current; // the tongue this piece was asked for
    try {
      const payload = Object.fromEntries(words.map((s, i) => [`s${i}`, s]));
      const res = await base44.functions.invoke('translateClimate', { lang, strings: payload });
      const out = res?.data?.translations || res?.translations;
      if (!out || typeof out !== 'object') { words.forEach((w) => asked.current.delete(w)); return; }
      // The reader has moved to another tongue, or another page: this answer is not for what is on
      // the screen now, so it is let go. Nothing is lost — the words are kept on the record's side,
      // and the tongue is read again the moment it is wanted.
      if (dictRef.current !== dict) return;
      words.forEach((s, i) => {
        const t = out[`s${i}`];
        if (typeof t === 'string' && t.trim()) {
          dict[s] = t.trim();
          markProduced([t.trim()]); // we made this word — it is never a source
        }
      });
      translated.current = new Set(Object.values(dict));
      saveDict(lang, dict);
      paint(dict); // the answer goes straight back onto the page
      // The tongue has grown — which also means the record's frame may have just been corrected.
      // So the whole current tongue is taken once more, right now, and put on the page: a reader
      // reading in that tongue never has to come back to be given the better wording.
      if (Number(res?.data?.made || 0) > 0) await refreshTongue(lang, true);
    } catch {
      // A piece that does not arrive leaves its words in English for now and is asked again on the
      // next page. It never holds up the pieces behind it.
      words.forEach((w) => asked.current.delete(w));
    }
  }, [paint, refreshTongue]);

  // The queue, drained: pieces leave one after another until the page has nothing left waiting.
  const drain = useCallback(async () => {
    if (working.current) return; // the piece in flight picks up whatever is waiting when it lands
    const lang = chosen;
    if (!lang || lang === 'en') { queue.current.clear(); return; }
    if (!queue.current.size) { setTranslating(false); return; }
    working.current = true;
    setTranslating(true);
    const tongue = dictRef.current; // the tongue this page is reading in
    try {
      while (queue.current.size) {
        // The reader has changed tongue, or page: what is still waiting belongs to the new one,
        // which has its own pass. Nothing is lost by letting it go.
        if (dictRef.current !== tongue) { queue.current.clear(); break; }
        const piece = [];
        let chars = 0;
        for (const w of queue.current) {
          if (piece.length >= PIECE_SIZE || chars + w.length > PIECE_CHARS) break;
          piece.push(w);
        }
        piece.forEach((w) => queue.current.delete(w));
        await askPiece(lang, piece);
      }
    } finally {
      working.current = false;
      setTranslating(false);
      // A word that arrived as the last piece landed still gets its turn.
      if (queue.current.size && dictRef.current === tongue) drain();
    }
  }, [chosen, askPiece, setTranslating]);

  const run = useCallback(() => {
    const lang = chosen;
    if (!lang || lang === 'en') { restore(); setTranslating(false); return; }
    sweep(dictRef.current).forEach(enqueue);
    drain();
  }, [chosen, restore, sweep, enqueue, drain, setTranslating]);

  // A new tongue, or a new page: the words we hold go in before the browser paints.
  useLayoutEffect(() => {
    originals.forEach((_, node) => { if (!node.isConnected) originals.delete(node); });
    asked.current = new Set();   // what this page has sent for, so nothing is asked twice
    queue.current.clear();       // and what it had waiting: a new tongue is not served by old words

    const lang = chosen;
    if (!lang || lang === 'en') {
      dictRef.current = {};
      translated.current = new Set();
      restore();
      setTranslating(false);
      return;
    }

    restoreTranslated();

    const dict = loadDict(lang);
    dictRef.current = dict;
    translated.current = new Set(Object.values(dict));
    paint(dict);
    setTranslating(true); // what is left is on its way

    const timer = setTimeout(async () => {
      await refreshTongue(lang); // the whole tongue, off the edge — one cached read, once a visit
      run();
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [chosen, location.pathname, paint, refreshTongue, restore, restoreTranslated, run, setTranslating]);

  // Content that arrives late (lists, entries, lazy sections) and words React rewrites on
  // its own: only those nodes are visited, so a translated page never flickers and the
  // whole record is never walked again just to keep it in the right tongue.
  useEffect(() => {
    if (!chosen || chosen === 'en') return;
    let timer;
    const touched = new Set();
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'characterData') { touched.add(record.target); continue; }
        // A hint the app has just put back into English is a word that changed, like any other.
        if (record.type === 'attributes') { touched.add(record.target); continue; }
        record.addedNodes.forEach((node) => eachWord(node, (n) => touched.add(n)));
      }
      if (!touched.size) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        touched.forEach((node) => {
          if (!node.isConnected) return;
          enqueue(visit(node, dictRef.current));
        });
        touched.clear();
        if (queue.current.size) drain();
      }, REFRESH_MS);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] });
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [chosen, drain, eachWord, enqueue, visit]);

  return null;
}