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
  const accent = ink ? '#7fc9e4' : '#b3261e';

  return (
    <div className={ink ? 'relative bg-[#141210] border-b border-[#e2602a]/20' : 'relative bg-[#efe7d6] border-b-2 border-[#141210]'}>
      <div className="px-5 py-2.5 flex items-center gap-2.5">
        <Languages className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
        <span className={`flex-shrink-0 text-[9px] font-black font-mono uppercase tracking-widest ${dim}`}>Every tongue</span>
        <TonguePicker lang={lang} detected={detected} onChange={onChange} tone={tone} />
        {translating && <span className="flex-shrink-0 text-[10px] font-mono animate-pulse" style={{ color: accent }}>…</span>}
      </div>
    </div>
  );
}