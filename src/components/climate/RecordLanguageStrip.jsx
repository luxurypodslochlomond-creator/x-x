import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import { LANGS } from './useClimateLanguage';

// ── EVERY TONGUE ON EARTH ──
// The record's own language control, in the record's own voice. It says which
// language the reader's device asked for, lets them overrule it, and takes any
// language on Earth that isn't on the list. The choice is announced platform-wide,
// so the tongue picked here holds in the nav, the tools and every other page.

const nameFor = (code) => {
  if (!code) return 'English';
  const hit = LANGS.find(l => l.code.toLowerCase() === code.toLowerCase());
  return hit ? hit.label : code;
};

export default function RecordLanguageStrip({ lang, detected, onChange, translating, tone = 'ink' }) {
  const [otherOpen, setOtherOpen] = useState(false);
  const [manual, setManual] = useState('');

  const ink = tone === 'ink';
  const dim = ink ? 'text-[#efe7d6]/60' : 'text-[#5a5246]';
  const accent = ink ? '#7fc9e4' : '#b3261e';
  const field = ink
    ? 'border-[#efe7d6]/25 bg-transparent text-[#efe7d6]'
    : 'border-[#141210] bg-[#f7f1e5] text-[#141210]';

  const commit = () => {
    if (!manual.trim()) return;
    onChange(manual.trim());
    setManual('');
    setOtherOpen(false);
  };

  return (
    <div className={ink ? 'bg-[#141210] border-b border-[#e2602a]/20' : 'bg-[#efe7d6] border-b-2 border-[#141210]'}>
      <div className="px-5 py-2.5 flex items-center gap-2.5">
        <Languages className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
        <span className={`flex-shrink-0 text-[9px] font-black font-mono uppercase tracking-widest ${dim}`}>Every tongue</span>
        <select
          value={lang}
          onChange={(e) => {
            if (e.target.value === '__other') setOtherOpen(true);
            else { setOtherOpen(false); onChange(e.target.value); }
          }}
          aria-label="Choose the record's language"
          className={`flex-1 min-w-0 border px-2 py-1.5 min-h-[36px] text-[13px] font-bold font-mono outline-none cursor-pointer truncate ${field}`}
        >
          <option value="auto" className="text-[#141210]">🌐 Auto — {nameFor(detected)}</option>
          {LANGS.map(l => <option key={l.code} value={l.code} className="text-[#141210]">{l.label}</option>)}
          <option value="__other" className="text-[#141210]">✨ Any other language…</option>
        </select>
        {translating && <span className="flex-shrink-0 text-[10px] font-mono animate-pulse" style={{ color: accent }}>…</span>}
      </div>
      {otherOpen && (
        <div className="px-5 pb-3 flex items-center gap-2">
          <input
            autoFocus
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') commit(); }}
            placeholder="e.g. Kiswahili, Basque, Bislama"
            aria-label="Type any language on Earth"
            className={`flex-1 min-w-0 border px-3 py-2 min-h-[38px] text-[11px] font-mono outline-none ${field}`}
          />
          <button
            type="button"
            onClick={commit}
            className="flex-shrink-0 px-3 py-2 min-h-[38px] text-[10px] font-black font-mono uppercase"
            style={{ background: accent, color: ink ? '#141210' : '#edf2f0' }}
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
}