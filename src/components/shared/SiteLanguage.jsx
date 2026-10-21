import React, { createContext, useContext, useEffect, useState } from 'react';
import { LANGS, RTL_LANGS } from '@/components/climate/useClimateLanguage';

// ── ONE TONGUE, EVERYWHERE ──
// The record already let a reader pick any language on Earth. This lifts that choice
// off the record and onto the whole platform: one picked tongue is the tongue in the
// nav, in the tools, in the record, on every page. Same storage key the record reads,
// so nothing has to be picked twice.

const LANG_KEY = 'climate51_lang';
const LANG_EVENT = 'uf51:lang';

const LanguageContext = createContext(null);

export function SiteLanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || 'auto'; } catch { return 'auto'; }
  });
  const [autoLang, setAutoLang] = useState('en');
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    try {
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
      setAutoLang((nav || 'en').split('-')[0].toLowerCase() || 'en');
    } catch { setAutoLang('en'); }
  }, []);

  // Whoever changes the language — this provider or the record's own picker — everybody follows.
  useEffect(() => {
    const follow = (e) => setLangState(e.detail);
    window.addEventListener(LANG_EVENT, follow);
    return () => window.removeEventListener(LANG_EVENT, follow);
  }, []);

  const setLanguage = (code) => {
    setLangState(code);
    try { localStorage.setItem(LANG_KEY, code); } catch { /* private mode */ }
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: code }));
  };

  const chosen = lang === 'auto' ? autoLang : lang;

  return (
    <LanguageContext.Provider value={{
      lang,
      autoLang,
      chosen,
      setLanguage,
      translating,
      setTranslating,
      isRTL: RTL_LANGS.has((chosen || '').split('-')[0]),
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useSiteLanguage() {
  return useContext(LanguageContext) || {
    lang: 'en', chosen: 'en', setLanguage: () => {}, translating: false, setTranslating: () => {}, isRTL: false,
  };
}

export { LANGS };