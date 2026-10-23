import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';

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
//  2. What we hold is applied, and what we are missing is collected, in ONE pass, and one
//     ask then covers a whole page instead of a queue of them.
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

const BATCH_SIZE = 220;   // an ordinary page is one ask, not two
const BATCH_CHARS = 12000;
const DICT_LIMIT = 8000;
const SETTLE_MS = 260;    // let a new page render before the first ask
const REFRESH_MS = 120;   // a word React rewrote goes back at once, not after a beat

const originals = new Map(); // text node -> the words the app wrote in it

const dictKey = (lang) => `uf51_site_dict_${lang}`;

function loadDict(lang) {
  try { return JSON.parse(localStorage.getItem(dictKey(lang)) || '{}'); } catch { return {}; }
}

function saveDict(lang, dict) {
  try {
    if (Object.keys(dict).length > DICT_LIMIT) return;
    localStorage.setItem(dictKey(lang), JSON.stringify(dict));
  } catch { /* storage full or private mode — the page still reads, it just re-asks next time */ }
}

// ── OUR OWN WORDS ARE NEVER THE SOURCE ──
// Every word this translator has itself put on a page, in any tongue. A word in here is
// never treated as the words the app wrote: when a reader changes tongue, the page is
// holding OUR translation of the English, and taking that as the source asks for a
// translation of a translation — which is how one page ends up in two tongues at once.
let producedCache = null;
function producedWords() {
  if (producedCache) return producedCache;
  const out = new Set();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith('uf51_site_dict_')) continue;
      const dict = JSON.parse(localStorage.getItem(key) || '{}');
      Object.values(dict).forEach((v) => { if (typeof v === 'string' && v) out.add(v.trim()); });
    }
  } catch { /* private mode — the guard simply starts empty */ }
  producedCache = out;
  return out;
}

function translatable(node) {
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
  const asking = useRef(false);

  useEffect(() => { document.documentElement.dir = isRTL ? 'rtl' : 'ltr'; }, [isRTL]);

  // The chosen tongue on the root, so the layout can behave for any script (see index.css).
  useEffect(() => { document.documentElement.dataset.tongue = chosen || 'en'; }, [chosen]);

  const eachTextNode = useCallback((root, fn) => {
    if (root.nodeType === Node.TEXT_NODE) { fn(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.closest('[data-no-translate]')) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) fn(node);
  }, []);

  // One visit to one text node. If its translation is held, it goes on the page. If
  // nothing is held for it, the English it was written in comes back to be asked for.
  const visit = useCallback((node, dict) => {
    const raw = node.nodeValue;
    if (!raw || !translatable(node)) return null;
    const held = originals.get(node);
    if (held === undefined) originals.set(node, raw);
    // React rewrote this line itself (a counter, a list): that is the new English.
    else if (held !== raw && !translated.current.has(raw.trim()) && !producedWords().has(raw.trim())) originals.set(node, raw);
    const source = (originals.get(node) || raw).trim();
    if (!source) return null;

    const t = dict[source];
    if (t && t !== source && raw.includes(source)) {
      const next = raw.replace(source, t);
      if (node.nodeValue !== next) node.nodeValue = next;
      return null;
    }
    return worthAsking(source) && !dict[source] ? source : null;
  }, []);

  const paint = useCallback((dict) => {
    eachTextNode(document.body, (node) => { visit(node, dict); });
  }, [eachTextNode, visit]);

  const sweep = useCallback((dict) => {
    const missing = new Set();
    eachTextNode(document.body, (node) => {
      const need = visit(node, dict);
      if (need && !asked.current.has(need)) missing.add(need);
    });
    return [...missing];
  }, [eachTextNode, visit]);

  const restore = useCallback(() => {
    originals.forEach((raw, node) => {
      try { if (node.nodeValue !== raw) node.nodeValue = raw; } catch { /* node gone */ }
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
        const now = node.nodeValue;
        if (now && produced.has(now.trim())) node.nodeValue = raw;
      } catch { /* node gone */ }
    });
  }, []);

  const ask = useCallback(async (lang, strings, dict) => {
    if (!strings.length || asking.current) return false;
    asking.current = true;
    strings.forEach((s) => asked.current.add(s));
    setTranslating(true);
    try {
      const payload = Object.fromEntries(strings.map((s, i) => [`s${i}`, s]));
      const res = await base44.functions.invoke('translateClimate', { lang, strings: payload });
      const out = res?.data?.translations || res?.translations;
      if (!out || typeof out !== 'object') return false;
      strings.forEach((s, i) => {
        const t = out[`s${i}`];
        if (typeof t === 'string' && t.trim()) {
          dict[s] = t.trim();
          producedWords().add(t.trim()); // we made this word — it is never a source
        }
      });
      translated.current = new Set(Object.values(dict));
      saveDict(lang, dict);
      paint(dict); // the answer goes straight back onto the page
      return true;
    } catch {
      return false; // a word that never arrives simply stays English
    } finally {
      asking.current = false;
      setTranslating(false);
    }
  }, [paint, setTranslating]);

  const run = useCallback(async () => {
    const lang = chosen;
    if (!lang || lang === 'en') { restore(); setTranslating(false); return; }
    const dict = dictRef.current;
    const missing = sweep(dict);
    if (!missing.length) { setTranslating(false); return; }

    const batch = [];
    let chars = 0;
    for (const s of missing) {
      if (batch.length >= BATCH_SIZE || chars + s.length > BATCH_CHARS) break;
      batch.push(s);
      chars += s.length;
    }

    const answered = await ask(lang, batch, dict);
    // A very long page can hold more words than one ask. The rest follow, quietly.
    if (answered && missing.length > batch.length) setTimeout(run, 1200);
  }, [chosen, restore, sweep, ask, setTranslating]);

  // A new tongue, or a new page: the words we hold go in before the browser paints.
  useLayoutEffect(() => {
    originals.forEach((_, node) => { if (!node.isConnected) originals.delete(node); });
    asked.current = new Set();

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

    const timer = setTimeout(run, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [chosen, location.pathname, paint, restore, restoreTranslated, run, setTranslating]);

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
        record.addedNodes.forEach((node) => eachTextNode(node, (n) => touched.add(n)));
      }
      if (!touched.size) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const dict = dictRef.current;
        const missing = new Set();
        touched.forEach((node) => {
          if (!node.isConnected) return;
          const need = visit(node, dict);
          if (need && !asked.current.has(need)) missing.add(need);
        });
        touched.clear();
        if (missing.size) ask(chosen, [...missing], dict);
      }, REFRESH_MS);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [chosen, ask, eachTextNode, visit]);

  return null;
}