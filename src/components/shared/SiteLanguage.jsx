import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { LANGS, RTL_LANGS } from '@/components/climate/useClimateLanguage';
import { TONGUE_EN, foldTongue } from '@/components/climate/tongueNames';

// ── ONE TONGUE, EVERYWHERE ──
// The record already let a reader pick any language on Earth. This lifts that choice
// off the record and onto the whole platform: one picked tongue is the tongue in the
// nav, in the tools, in the record, on every page. Same storage key the record reads,
// so nothing has to be picked twice.

const LANG_KEY = 'climate51_lang';
const LANG_EVENT = 'uf51:lang';

const LanguageContext = createContext(null);

function normalizeLanguage(value) {
  const text = String(value || '').trim();
  // A tongue is matched by its own name, its English name, its code, and with accents off —
  // so "french", "Français" and "fr" all land on the same tongue everywhere on the platform.
  const match = LANGS.find((item) =>
    item.code.toLowerCase() === text.toLowerCase() ||
    item.label.toLowerCase() === text.toLowerCase() ||
    foldTongue(item.label) === foldTongue(text) ||
    foldTongue(TONGUE_EN[item.code]) === foldTongue(text)
  );
  if (match) return match.code;
  if (/^(cherokee|tsalagi|ᏣᎳᎩ)$/i.test(text)) return 'chr';
  return text || 'auto';
}

function deviceLanguage() {
  const code = (navigator.languages?.[0] || navigator.language || 'en').replace(/_/g, '-');
  return LANGS.find((item) => item.code.toLowerCase() === code.toLowerCase())?.code || code.split('-')[0].toLowerCase();
}

export function SiteLanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return normalizeLanguage(localStorage.getItem(LANG_KEY) || 'auto'); } catch { return 'auto'; }
  });
  const [autoLang] = useState(deviceLanguage);
  const [translating, setTranslating] = useState(false);
  const [translationError, setTranslationError] = useState('');
  const [translationRevision, setTranslationRevision] = useState(0);
  const retryLanguage = useCallback(() => setTranslationRevision((value) => value + 1), []);

  // Whoever changes the language — this provider or the record's own picker — everybody follows.
  useEffect(() => {
    const follow = (event) => setLangState(normalizeLanguage(event.detail));
    const storage = (event) => { if (event.key === LANG_KEY) setLangState(normalizeLanguage(event.newValue)); };
    window.addEventListener(LANG_EVENT, follow);
    window.addEventListener('storage', storage);
    return () => { window.removeEventListener(LANG_EVENT, follow); window.removeEventListener('storage', storage); };
  }, []);

  const setLanguage = useCallback((value) => {
    const code = normalizeLanguage(value);
    setLangState(code);
    setTranslationError('');
    setTranslationRevision((revision) => revision + 1);
    try { localStorage.setItem(LANG_KEY, code); } catch { /* private mode */ }
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: code }));
  }, []);

  const chosen = lang === 'auto' ? autoLang : lang;

  // Tell the machine the tongue, not just the page. Without this a screen reader
  // reads Yoruba, French or Cherokee with English pronunciation — the one barrier
  // a language-first record must never leave standing. data-tongue also switches
  // on the script coverage and the "let it wrap" rules already waiting in index.css.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = chosen || 'en';
    root.setAttribute('data-tongue', (chosen || 'en').split('-')[0].toLowerCase());
  }, [chosen]);

  return (
    <LanguageContext.Provider value={{
      lang,
      autoLang,
      chosen,
      setLanguage,
      translating,
      setTranslating,
      translationError,
      setTranslationError,
      translationRevision,
      retryLanguage,
      isRTL: RTL_LANGS.has((chosen || '').split('-')[0]),
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useSiteLanguage() {
  return useContext(LanguageContext) || {
    lang: 'en', chosen: 'en', setLanguage: () => {}, translating: false, setTranslating: () => {},
    translationError: '', setTranslationError: () => {}, translationRevision: 0, retryLanguage: () => {}, isRTL: false,
  };
}

export { LANGS };