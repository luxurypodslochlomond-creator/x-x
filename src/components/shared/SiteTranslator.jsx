import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import translationSession from '@/components/shared/translation/translationSession';
import { scanWords } from '@/components/shared/translation/translationDom';

export default function SiteTranslator() {
  const { chosen, isRTL, setTranslating, setTranslationError, translationRevision, retryLanguage } = useSiteLanguage();
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('online', retryLanguage);
    return () => window.removeEventListener('online', retryLanguage);
  }, [retryLanguage]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dir = isRTL ? 'rtl' : 'ltr';
    root.lang = /^[a-z]{2,3}(-[a-z0-9]+)*$/i.test(chosen) ? chosen : 'und';
    root.dataset.tongue = chosen;
    const update = (busy, error) => { setTranslating(busy); setTranslationError(error); };
    if (chosen === 'en') { scanWords({}, true); update(false, ''); return; }
    return translationSession(chosen, update);
  }, [chosen, isRTL, location.pathname, translationRevision, setTranslating, setTranslationError]);

  return null;
}