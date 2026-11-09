import React from 'react';
import TonguePicker from './TonguePicker';

// ── EVERY TONGUE ON EARTH ──
// The record's own language control, in the record's own voice. It says which
// language the reader's device asked for, lets them overrule it, and takes any
// language on Earth that isn't on the list. The choice is announced platform-wide,
// so the tongue picked here holds in the nav, the tools and every other page.
//
// It used to sit in a band of its own with a background, a border and a heavy boxed
// trigger underneath the navigation — a form control dropped into a printed page,
// which is exactly why it read as another product's widget. Here it is a line of the
// masthead: a word, the tongue in its own letters, and nothing drawn around it.
export default function RecordLanguageStrip({ lang, detected, onChange, translating, tone = 'ink' }) {
  const ink = tone === 'ink';
  // The tongue wears the mark's red, the same ink as x = x, because it is the same
  // sentence: everyone is here on the same footing, in whatever tongue they arrived in.
  const accent = ink ? '#cc2d2a' : '#b3261e';

  return (
    <div className="flex min-w-0 max-w-[19rem] flex-1 items-center gap-2">
      <span
        data-no-translate
        className={`shrink-0 font-mono text-[12px] uppercase tracking-[0.14em] ${ink ? 'text-[#efe7d6]/60' : 'text-record-muted'}`}
      >
        Tongue
      </span>
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