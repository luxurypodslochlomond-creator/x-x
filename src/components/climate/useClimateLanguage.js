import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── EVERY TONGUE · NOBODY LEFT BEHIND ──
// Janine's "all languages" spec, lifted to shared ground: a broad preset list, and
// free-typed any language on Earth — translated live by AI, then cached on the device.
export const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ga', label: 'Gaeilge' },
  { code: 'gd', label: 'Gàidhlig' },
  { code: 'cy', label: 'Cymraeg' },
  { code: 'sco', label: 'Scots' },
  { code: 'br', label: 'Brezhoneg' },
  { code: 'kw', label: 'Kernewek' },
  { code: 'es', label: 'Español' },
  { code: 'es-CO', label: 'Español (Colombia)' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'sv', label: 'Svenska' },
  { code: 'no', label: 'Norsk' },
  { code: 'da', label: 'Dansk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'is', label: 'Íslenska' },
  { code: 'pl', label: 'Polski' },
  { code: 'cs', label: 'Čeština' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'uk', label: 'Українська' },
  { code: 'ru', label: 'Русский' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ar', label: 'العربية' },
  { code: 'he', label: 'עברית' },
  { code: 'fa', label: 'فارسی' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'اردو' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'zh', label: '中文 (简体)' },
  { code: 'zh-TW', label: '中文 (繁體)' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ig', label: 'Igbo' },
  { code: 'zu', label: 'isiZulu' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'ha', label: 'Hausa' },
  { code: 'qu', label: 'Runasimi (Quechua)' },
  { code: 'gn', label: 'Avañeʼẽ (Guaraní)' },
  { code: 'haw', label: 'ʻŌlelo Hawaiʻi' },
  { code: 'mi', label: 'Te Reo Māori' },
  { code: 'sm', label: 'Gagana Sāmoa' },
  { code: 'fj', label: 'Vosa Vakaviti' },
  { code: 'la', label: 'Latina (Latin)' },
  { code: 'grc', label: 'Ἀρχαία ἑλληνική (Ancient Greek)' },
];

export const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur']);

// One chosen tongue across the whole record — the same key the record page reads,
// so a language picked in one place is the language everywhere on the platform.
const LANG_KEY = 'climate51_lang';

export function useClimateLanguage(baseStrings) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || 'auto'; } catch { return 'auto'; }
  });
  const [autoLang, setAutoLang] = useState('en');
  const [liveStrings, setLiveStrings] = useState(null);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    try {
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
      setAutoLang((nav || 'en').split('-')[0].toLowerCase() || 'en');
    } catch { setAutoLang('en'); }
  }, []);

  const chosen = lang === 'auto' ? autoLang : lang;

  useEffect(() => {
    if (!chosen || chosen === 'auto' || chosen === 'en') { setLiveStrings(null); return; }
    const cacheKey = 'climate51_t_support_' + chosen;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) { setLiveStrings(JSON.parse(cached)); return; }
    } catch { /* ignore */ }
    let cancelled = false;
    setTranslating(true);
    base44.functions.invoke('translateClimate', { lang: chosen, strings: { ...baseStrings } })
      .then(res => {
        if (cancelled) return;
        const out = res?.data?.translations || res?.translations;
        if (out && out.heading) {
          setLiveStrings(out);
          try { localStorage.setItem(cacheKey, JSON.stringify(out)); } catch { /* storage full */ }
        }
      })
      .catch(() => { /* fall back to English silently */ })
      .finally(() => { if (!cancelled) setTranslating(false); });
    return () => { cancelled = true; };
  }, [chosen, baseStrings]);

  const setLanguage = (code) => {
    setLang(code);
    try { localStorage.setItem(LANG_KEY, code); } catch { /* ignore */ }
    // Tell the rest of the platform, so a tongue picked here holds site-wide.
    window.dispatchEvent(new CustomEvent('uf51:lang', { detail: code }));
  };

  // And follow the platform if the tongue is changed somewhere else.
  useEffect(() => {
    const follow = (e) => setLang(e.detail);
    window.addEventListener('uf51:lang', follow);
    return () => window.removeEventListener('uf51:lang', follow);
  }, []);

  return {
    lang,
    setLanguage,
    chosen,
    isRTL: RTL_LANGS.has((chosen || '').split('-')[0]),
    translating,
    liveStrings,
  };
}