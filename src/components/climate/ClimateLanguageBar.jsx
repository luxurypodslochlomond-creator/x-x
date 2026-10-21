import React from 'react';
import RecordLanguageStrip from './RecordLanguageStrip';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';

// ── ONE TONGUE, THE WHOLE RECORD ──
// The tongue is chosen here, in the header, on every page of the climate record —
// Record, Wire, Map, Impact, Founder, Support, Method, Terms, Privacy and every
// entry. Nothing has to be picked twice, and nobody has to hunt for the control.

export default function ClimateLanguageBar() {
  const { lang, autoLang, setLanguage, translating } = useSiteLanguage();

  return (
    <RecordLanguageStrip
      lang={lang}
      detected={autoLang}
      onChange={setLanguage}
      translating={translating}
    />
  );
}