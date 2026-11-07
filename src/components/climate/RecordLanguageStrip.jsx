import React from 'react';
import { Languages } from 'lucide-react';
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
  // record's own header. The record's colour of us is the signal — the same orange that marks
  // the masthead, the rule under the title and the way through to a crisis.
  const accent = ink ? '#e2602a' : '#b3261e';

  return (
    <div className={ink ? 'relative bg-[#141210] border-b border-[#e2602a]/20' : 'relative bg-[#efe7d6] border-b-2 border-[#141210]'}>
      <div className="px-5 py-2.5 flex items-center gap-2.5">
        <Languages className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
        <span className={`w-[5.5rem] flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap text-[9px] font-black font-mono uppercase tracking-widest ${dim}`}>Every tongue</span>
        <TonguePicker lang={lang} detected={detected} onChange={onChange} tone={tone} />
        <span data-no-translate role="status" aria-label={translating ? 'Translating' : undefined} className="w-3 flex-shrink-0 text-[10px] font-mono" style={{ color: accent }}>{translating ? '…' : ''}</span>
      </div>
    </div>
  );
}