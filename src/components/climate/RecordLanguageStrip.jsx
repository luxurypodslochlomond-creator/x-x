import React from 'react';
import TonguePicker from './TonguePicker';

// ── EVERY TONGUE ON EARTH ──
// The record's own language control, in the record's own voice. The drawn mouth that
// used to sit beside this control now IS its trigger, so the tongue is a door cut in the
// same hand as the six at the foot of the glass, not a form control beside one.
export default function RecordLanguageStrip({ lang, detected, onChange, translating, tone = 'ink' }) {
  const ink = tone === 'ink';
  const accent = ink ? '#cc2d2a' : '#b3261e';

  return (
    <div className="flex min-w-0 max-w-[19rem] flex-1 items-center gap-2">
      <TonguePicker lang={lang} detected={detected} onChange={onChange} tone={tone} />
      <span
        data-no-translate
        role="status"
        aria-label={translating ? 'Translating' : undefined}
        className={`w-3 shrink-0 text-[13px] font-mono ${ink ? 'text-[#efe7d6]' : ''}`}
        style={{ color: ink ? undefined : accent }}
      >
        {translating ? '…' : ''}
      </span>
    </div>
  );
}