import React from 'react';
import TonguePicker from './TonguePicker';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';

// ── THE SEVENTH MARK ─────────────────────────────────────────────────────────────
// The tongue used to be a small control of its own, sitting beside the record's marks
// rather than among them: a mouth drawn at 26px next to a word with a rule under it. It
// read as a setting — one more thing to configure — when it is really the seventh way
// through the record, the one that changes the record's own voice.
//
// So it is a door now, cut at the same size as the other six, in the same rail, with its
// caption set the same way. Nothing else changed: the same list of every tongue, the same
// honesty line, the same promise that nobody is turned away.
export default function RecordTongueDoor({ size = 44, inline = false }) {
  const { lang, autoLang, setLanguage } = useSiteLanguage();
  return <TonguePicker lang={lang} detected={autoLang} onChange={setLanguage} tone="paper" size={size} inline={inline} />;
}