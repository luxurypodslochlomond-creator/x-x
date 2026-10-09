import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Translates a climate record's text fields into the user's selected language.
// Caches per record+lang in localStorage. Falls back to original on failure.
// Transparency: exposes showOriginal so the UI can let readers verify against English.
export function useEntryTranslation(record, lang) {
  const [translated, setTranslated] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const resolvedLang = (() => {
    if (!lang || lang === 'auto') {
      try {
        const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
        return (nav.split('-')[0] || 'en').toLowerCase();
      } catch { return 'en'; }
    }
    return lang;
  })();

  useEffect(() => {
    if (!record || !record.id || resolvedLang === 'en') {
      setTranslated(null);
      setTranslating(false);
      return;
    }
    // Only translate the text fields that carry the actual content
    const strings = {};
    if (record.title) strings.title = record.title;
    if (record.summary) strings.summary = record.summary;
    if (record.details) strings.details = record.details;
    if (record.description) strings.description = record.description;
    if (Object.keys(strings).length === 0) { setTranslated(null); return; }

    const cacheKey = `climate51_entry_${record.id}_${resolvedLang}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) { setTranslated(JSON.parse(cached)); setTranslating(false); return; }
    } catch { /* ignore */ }

    let cancelled = false;
    setTranslating(true);
    base44.functions.invoke('translateClimate', { lang: resolvedLang, strings })
      .then(res => {
        if (cancelled) return;
        const out = res?.data?.translations || res?.translations;
        if (out && out.title) {
          setTranslated(out);
          try { localStorage.setItem(cacheKey, JSON.stringify(out)); } catch { /* storage full */ }
        }
      })
      .catch(() => { /* fall back to original silently */ })
      .finally(() => { if (!cancelled) setTranslating(false); });
    return () => { cancelled = true; };
  }, [record?.id, resolvedLang]);

  const isTranslated = !!translated && resolvedLang !== 'en';
  const field = (key) => {
    if (!isTranslated || showOriginal) return record?.[key] || '';
    return translated?.[key] || record?.[key] || '';
  };

  return { field, translating, isTranslated, showOriginal, setShowOriginal, lang: resolvedLang };
}