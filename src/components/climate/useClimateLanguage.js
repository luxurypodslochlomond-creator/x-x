import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { markProduced } from '@/components/shared/translationMemory';

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
  { code: 'chr', label: 'Cherokee (Tsalagi)' },
  // ── THE FIRST PEOPLES OF THIS CONTINENT ──
  // Cherokee was on the list and the nations beside it were not, which read as an accident
  // rather than a choice. These are the tongues of the land the record is being written on.
  { code: 'nv', label: 'Diné bizaad (Navajo)' },
  { code: 'lkt', label: 'Lakota' },
  { code: 'ojb', label: 'Anishinaabemowin (Ojibwe)' },
  { code: 'iu', label: 'Inuktitut (ᐃᓄᒃᑎᑐᑦ)' },
  { code: 'cr', label: 'Cree (ᓀᐦᐃᔭᐍᐏᐣ)' },
  { code: 'moh', label: 'Kanienʼkéha (Mohawk)' },
  { code: 'hop', label: 'Hopilavayi (Hopi)' },
  { code: 'apw', label: 'Ndee biyátiʼ (Apache)' },
  // ── AND THE ONES EASY TO FORGET ──
  { code: 'so', label: 'Soomaali' },
  { code: 'xh', label: 'isiXhosa' },
  { code: 'sn', label: 'chiShona' },
  { code: 'wo', label: 'Wolof' },
  { code: 'ay', label: 'Aymar aru' },
  { code: 'nah', label: 'Nāhuatl' },
  { code: 'yua', label: 'Maya (Yucatec)' },
  { code: 'eu', label: 'Euskara (Basque)' },
  { code: 'ca', label: 'Català' },
  { code: 'gl', label: 'Galego' },
  { code: 'ro', label: 'Română' },
  { code: 'hu', label: 'Magyar' },
  { code: 'bg', label: 'Български' },
  { code: 'hy', label: 'Հայերեն' },
  { code: 'ka', label: 'ქართული' },
  { code: 'ku', label: 'Kurdî' },
  { code: 'ps', label: 'پښتو' },
  { code: 'ne', label: 'नेपाली' },
  { code: 'si', label: 'සිංහල' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'to', label: 'Lea faka-Tonga' },
  { code: 'tpi', label: 'Tok Pisin' },
  { code: 'la', label: 'Latina (Latin)' },
  { code: 'grc', label: 'Ἀρχαία ἑλληνική (Ancient Greek)' },
  { code: 'egy', label: '𓂀 Ancient Egyptian (hieroglyphs)' },
  { code: 'sux', label: '𒀭 Sumerian (cuneiform)' },
  { code: 'akk', label: 'Akkadian (cuneiform)' },
  { code: 'annunaki', label: '𒀭 Annunaki (Sumerian)' },
  { code: 'rongorongo', label: '🗿 Rongorongo (Easter Island)' },
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

  // ── ONE TONGUE FOR THE WHOLE RECORD, PAGE BY PAGE ADDED TO IT ──
  // A tongue is held as one dictionary of English word → that tongue, so every page adds
  // to the same tongue instead of the first page's wording standing in for all of them.
  // That is what left a reader with a translated top and an English body: the page read a
  // dictionary made from another page's words, and its own words were never asked for.
  // Only what the tongue is actually missing is asked for, and every reply is merged in.
  const stringsKey = JSON.stringify(baseStrings || {});

  useEffect(() => {
    if (!chosen || chosen === 'auto' || chosen === 'en') { setLiveStrings(null); return; }
    const cacheKey = 'climate51_t_' + chosen;
    let dict = {};
    try { dict = JSON.parse(localStorage.getItem(cacheKey) || '{}') || {}; } catch { dict = {}; }

    // What the page shows for each of its own words: the tongue if the tongue has it,
    // the English if it does not — so no word is ever dropped from the page.
    const settle = () => {
      markProduced(Object.values(dict), chosen);
      setLiveStrings(Object.fromEntries(Object.entries(baseStrings || {})
        .map(([key, value]) => [key, (typeof value === 'string' && dict[value]) || value])));
    };

    const english = [...new Set(Object.values(baseStrings || {}).filter((value) => typeof value === 'string' && value.trim()))];
    const need = english.filter((word) => !dict[word]);
    if (!need.length) { settle(); return; }

    let cancelled = false;
    setTranslating(true);
    const strings = Object.fromEntries(need.map((word, index) => ['s' + index, word]));
    base44.functions.invoke('translateClimate', { lang: chosen, strings })
      .then((res) => {
        const out = res?.data?.translations || res?.translations || {};
        need.forEach((word, index) => {
          const value = out['s' + index];
          if (typeof value === 'string' && value.trim()) dict[word] = value.trim();
        });
        try { localStorage.setItem(cacheKey, JSON.stringify(dict)); } catch { /* storage full */ }
      })
      .catch(() => { /* the words we already hold are still shown */ })
      .finally(() => { if (!cancelled) { settle(); setTranslating(false); } });
    return () => { cancelled = true; };
  }, [chosen, stringsKey]);

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