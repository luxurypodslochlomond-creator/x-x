import React, { useCallback, useEffect, useRef } from 'react';
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
// Nothing here can break a page: if a translation never arrives, the words stay English.

const KEEP = new Set([
  'X = X', 'UF51', 'SORTED', 'CB51', 'PETSOUNDS51', 'PET SOUNDS51', 'ZAPP', 'MAGIC51', 'LEARN51',
  'TRACKT', 'BUZZSTOP', 'BUZZTRIP', 'CTRL51', 'SHED51', 'PROF51', 'EARTH51', 'ALETHEIA', 'HORIZON INTERNATIONAL',
]);
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'TITLE']);
const BATCH_SIZE = 120;
const BATCH_CHARS = 6000;
const DICT_LIMIT = 4000;

const originals = new Map(); // text node -> the words as the app wrote them

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

function translatable(node) {
  const parent = node.parentElement;
  if (!parent) return false;
  if (SKIP_TAGS.has(parent.tagName)) return false;
  if (parent.closest('[data-no-translate]')) return false;
  return true;
}

function collectSources() {
  const found = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const raw = node.nodeValue;
    if (!raw) continue;
    const text = raw.trim();
    if (text.length < 2 || text.length > 1000) continue;
    if (!/[A-Za-zÀ-ÿ]/.test(text)) continue;
    if (/^[\d\s.,:%£$€/-]+$/.test(text)) continue;
    if (KEEP.has(text.toUpperCase())) continue;
    if (!translatable(node)) continue;
    found.set(text, true);
  }
  return [...found.keys()];
}

function applyDict(dict) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const raw = node.nodeValue;
    if (!raw) continue;
    const text = raw.trim();
    if (!text || !translatable(node)) continue;
    if (!originals.has(node)) originals.set(node, raw);
    const translated = dict[text];
    if (translated && translated !== text && raw.includes(text)) {
      const next = raw.replace(text, translated);
      if (node.nodeValue !== next) node.nodeValue = next;
    }
  }
}

function restoreOriginals() {
  originals.forEach((raw, node) => {
    try { if (node.nodeValue !== raw) node.nodeValue = raw; } catch { /* node gone */ }
  });
}

export default function SiteTranslator() {
  const { chosen, isRTL, setTranslating } = useSiteLanguage();
  const location = useLocation();
  const running = useRef(false);
  const writing = useRef(false);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  const run = useCallback(async () => {
    if (running.current) return;
    const lang = chosen;
    if (!lang || lang === 'en') {
      writing.current = true;
      restoreOriginals();
      writing.current = false;
      setTranslating(false);
      return;
    }

    running.current = true;
    try {
      const dict = loadDict(lang);

      writing.current = true;
      applyDict(dict);
      writing.current = false;

      const missing = collectSources().filter(s => !dict[s]);
      if (missing.length === 0) { setTranslating(false); return; }

      const batch = [];
      let chars = 0;
      for (const s of missing) {
        if (batch.length >= BATCH_SIZE || chars + s.length > BATCH_CHARS) break;
        batch.push(s);
        chars += s.length;
      }

      setTranslating(true);
      const strings = Object.fromEntries(batch.map((s, i) => [`s${i}`, s]));
      const res = await base44.functions.invoke('translateClimate', { lang, strings });
      const out = res?.data?.translations || res?.translations;
      if (out && typeof out === 'object') {
        batch.forEach((s, i) => {
          const t = out[`s${i}`];
          if (typeof t === 'string' && t.trim()) dict[s] = t.trim();
        });
        saveDict(lang, dict);
        writing.current = true;
        applyDict(dict);
        writing.current = false;
      }
      setTranslating(false);

      // A page can hold more words than one ask. The rest follow on the next pass.
      if (missing.length > batch.length) setTimeout(run, 1600);
    } catch {
      setTranslating(false);
    } finally {
      running.current = false;
    }
  }, [chosen, setTranslating]);

  // On every page: give the page a moment to settle, then translate what is on it.
  useEffect(() => {
    const timers = [setTimeout(run, 700), setTimeout(run, 3200)];
    return () => timers.forEach(clearTimeout);
  }, [run, location.pathname]);

  // Content that arrives late (lists, entries, lazy sections) gets picked up too.
  useEffect(() => {
    if (!chosen || chosen === 'en') return;
    let timer;
    const observer = new MutationObserver(() => {
      if (writing.current) return;
      clearTimeout(timer);
      timer = setTimeout(run, 800);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [chosen, run]);

  return null;
}