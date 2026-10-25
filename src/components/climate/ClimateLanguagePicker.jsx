import React, { useEffect, useRef, useState } from 'react';
import { Languages } from 'lucide-react';
import { LANGS } from './useClimateLanguage';
import { refuseAncientScript } from './ancientScripts';

// The record's own language control, in one place: the preset list, plus
// "type any language on Earth" for anything not on it.
export default function ClimateLanguagePicker({ lang, onChange, translating, t }) {
  const [otherOpen, setOtherOpen] = useState(false);
  const [manual, setManual] = useState('');
  const [refusal, setRefusal] = useState('');
  const manualRef = useRef(null);

  // Never hand a finger the keyboard before the field is on screen, or the keys come up
  // over the very box being typed into. Desktop goes straight in.
  useEffect(() => {
    if (!otherOpen) return;
    if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) { manualRef.current?.focus(); return; }
    const timer = setTimeout(() => manualRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 260);
    return () => clearTimeout(timer);
  }, [otherOpen]);

  const commit = () => {
    const typed = manual.trim();
    if (!typed) return;
    // An ancient script is refused here, in the open, rather than silently swapped for a guess.
    const refused = refuseAncientScript(typed);
    if (refused) { setRefusal(refused); return; }
    setRefusal('');
    onChange(typed);
    setManual('');
    setOtherOpen(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Languages className="w-4 h-4 text-record-ink flex-shrink-0" />
        <select
          value={lang}
          onChange={e => {
            if (e.target.value === '__other') setOtherOpen(true);
            else { setOtherOpen(false); onChange(e.target.value); }
          }}
          aria-label={t.lang_aria}
          size={1}
          className="flex-1 min-w-0 bg-transparent text-record-ink border border-record-ink px-2 py-2 min-h-[40px] text-[13px] font-bold outline-none cursor-pointer truncate"
        >
          <option value="auto">🌐 {t.lang_auto}</option>
          {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
          <option value="__other">✨ {t.lang_other}</option>
        </select>
        {translating && <span className="text-[10px] text-record-muted animate-pulse">…</span>}
      </div>

      {otherOpen && (
        <div className="mt-2 flex items-center gap-2">
          <input
            ref={manualRef}
            value={manual}
            onChange={e => { setManual(e.target.value); if (refusal) setRefusal(''); }}
            onKeyDown={e => { if (e.key === 'Enter') commit(); }}
            placeholder={t.lang_placeholder}
            autoComplete="off"
            autoCapitalize="words"
            className="flex-1 min-w-0 bg-record-paper border border-record-ink px-3 py-2 min-h-[40px] text-[16px] sm:text-[12px] text-record-ink outline-none"
          />
          <button
            type="button"
            onClick={commit}
            className="px-3 py-2 min-h-[40px] bg-record-ink text-record-bone text-[10px] font-black uppercase"
          >
            {t.lang_go}
          </button>
          <button
            type="button"
            onClick={() => setOtherOpen(false)}
            aria-label="Close"
            className="w-10 h-10 flex items-center justify-center flex-shrink-0 border border-record-ink bg-record-paper text-record-ink text-base leading-none"
          >
            ×
          </button>
        </div>
      )}

      {refusal && (
        <p className="mt-2 text-[11px] leading-relaxed text-record-ink border-l-2 border-record-red pl-2">
          {refusal}
        </p>
      )}
    </div>
  );
}