import { useEffect, useState } from 'react';
import { getDictionary, pullDictionary, translateWords } from '@/components/shared/translation/translationCache';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';

export function useEntryTranslation(record, lang) {
  const [ready, setReady] = useState('');
  const [translating, setTranslating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [error, setError] = useState(false);
  const { translationRevision } = useSiteLanguage();
  const identity = `${record?.id || ''}:${record?.updated_date || ''}:${lang}:${translationRevision}`;
  const fields = ['title', 'summary', 'details', 'description'];

  useEffect(() => {
    let active = true;
    setShowOriginal(false);
    setReady('');
    setError(false);
    if (!record || lang === 'en') { setTranslating(false); return; }
    const words = fields.map((key) => record[key]).filter(Boolean);
    setTranslating(true);
    pullDictionary(lang).catch(() => {}).then(() => translateWords(lang, words, () => active)).then((result) => {
      if (active) setError(result.incomplete);
    }).finally(() => {
      if (active) { setReady(identity); setTranslating(false); }
    });
    return () => { active = false; };
  }, [identity]);

  const dict = getDictionary(lang);
  const isTranslated = ready === identity && lang !== 'en' && fields.some((key) => dict[record?.[key]]);
  const field = (key) => !isTranslated || showOriginal ? record?.[key] || '' : dict[record?.[key]] || record?.[key] || '';
  return { field, translating, isTranslated, showOriginal, setShowOriginal, lang, error };
}