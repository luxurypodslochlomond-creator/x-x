import React from 'react';
import RecordLanguageStrip from './RecordLanguageStrip';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import LanguageStatus from '@/components/climate/LanguageStatus';

// ── ONE TONGUE, THE WHOLE RECORD ──
// The tongue is chosen here, in the masthead, on every page of the climate record —
// Record, Wire, Map, Impact, Founder, Support, Method, Terms, Privacy and every
// entry. Nothing has to be picked twice, and nobody has to hunt for the control.
//
// No band, no rule, no box: the control is part of the same printed line as the
// record's mark. Its honesty note, when there is one, sits directly beneath it in
// the record's own small hand.
export default function ClimateLanguageBar({ tone = 'ink' }) {
  const { lang, autoLang, setLanguage, translating } = useSiteLanguage();

  return (
    <div className="min-w-0 flex-1">
      <RecordLanguageStrip lang={lang} detected={autoLang} onChange={setLanguage} translating={translating} tone={tone} />
      <LanguageStatus />
    </div>
  );
}