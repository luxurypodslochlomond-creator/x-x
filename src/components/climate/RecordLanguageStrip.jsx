import React from 'react';
import TonguePicker from './TonguePicker';

// ── EVERY TONGUE ON EARTH ──
// The record's own language control, in the record's own voice. It says which
// language the reader's device asked for, lets them overrule it, and takes any
// language on Earth that isn't on the list. The choice is announced platform-wide,
// so the tongue picked here holds in the nav, the tools and every other page.

export default function RecordLanguageStrip({ lang, detected, onChange, translating, tone = 'ink' }) {
  const ink = tone === 'ink';
  const dim = ink ? 'text-[#efe7d6]/60' : 'text-[#5a5246]';
  // The control's colour was a pale blue borrowed from the sky in the cover painting, and it
  // was the one cold thing in a warm room: it read as another product's button sitting in the
  // record's own header. It then wore the signal orange, which is the record's colour for a
  // way through to something urgent — and a language is not urgent, it is a promise.
  //
  // So the tongue wears the mark's red, the same ink as x = x, because it is the same
  // sentence: everyone is here on the same footing, in whatever tongue they arrived in. The
  // orange stays for what it was for — the crisis, the way through, the thing that cannot
  // wait — and the record stops needing a second red to say "this matters".
  const accent = ink ? '#cc2d2a' : '#b3261e';

  return (
    <div className={ink ? 'relative bg-[#141210] border-b border-[#cc2d2a]/25' : 'relative bg-[#efe7d6] border-b-2 border-[#141210]'}>
      <div className="px-5 py-2.5 flex items-center gap-2.5">
        <span className={`flex-shrink-0 text-xs font-body ${dim}`}>Language</span>
        <TonguePicker lang={lang} detected={detected} onChange={onChange} tone={tone} />
        <span data-no-translate role="status" aria-label={translating ? 'Translating' : undefined} className="w-3 flex-shrink-0 text-[10px] font-mono" style={{ color: accent }}>{translating ? '…' : ''}</span>
      </div>
    </div>
  );
}