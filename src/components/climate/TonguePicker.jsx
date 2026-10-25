import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { LANGS } from './useClimateLanguage';
import { refuseAncientScript } from './ancientScripts';

// ── EVERY TONGUE — the record's own list ──
// A browser's own dropdown cannot be dressed. It opens in the operating system's
// clothes: grey, foreign, and nothing like this record. So the tongue is chosen
// from the record's own panel instead — searchable, in the reader's own scripts,
// and drawn in the same ink, bone and signal as everything else on the record.

const nameFor = (code) => {
  if (!code) return 'English';
  const hit = LANGS.find(l => l.code.toLowerCase() === code.toLowerCase());
  return hit ? hit.label : code;
};

export default function TonguePicker({ lang, detected, onChange, tone = 'ink' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [otherOpen, setOtherOpen] = useState(false);
  const [manual, setManual] = useState('');
  const [refusal, setRefusal] = useState('');
  const wrapRef = useRef(null);
  const searchRef = useRef(null);
  const manualRef = useRef(null);

  const ink = tone === 'ink';
  const accent = ink ? '#e2602a' : '#b3261e';
  const field = ink
    ? 'border-[#efe7d6]/25 bg-transparent text-[#efe7d6]'
    : 'border-[#141210] bg-[#f7f1e5] text-[#141210]';

  const chosen = lang === 'auto' ? detected : lang;

  const found = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGS;
    return LANGS.filter(l => l.label.toLowerCase().includes(q) || l.code.toLowerCase().includes(q));
  }, [query]);

  // Escape closes it, and so does a tap anywhere else — the record never traps a reader.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // A mouse can be sent straight to the search box. A finger cannot: on a phone
  // that throws the keyboard up over the panel before the reader has looked at it,
  // so on touch the field waits to be tapped instead.
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) searchRef.current?.focus();
  }, [open]);

  // The same rule for the "type it yourself" field, which is at the very bottom of the
  // panel and so sits exactly where the keyboard comes up. A finger is never given the
  // keyboard before the field has been brought into view; a mouse can go straight in.
  useEffect(() => {
    if (!otherOpen) return;
    if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) { manualRef.current?.focus(); return; }
    const timer = setTimeout(() => manualRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 260);
    return () => clearTimeout(timer);
  }, [otherOpen]);

  const close = () => { setOpen(false); setQuery(''); setOtherOpen(false); };
  const choose = (code) => { onChange(code); close(); };
  const commit = () => {
    const typed = manual.trim();
    if (!typed) return;
    // An ancient script is refused here in the open, never quietly swapped for a guess.
    const refused = refuseAncientScript(typed);
    if (refused) { setRefusal(refused); return; }
    setRefusal('');
    onChange(typed);
    setManual('');
    close();
  };

  const panel = ink ? 'bg-[#141210] border-[#e2602a] text-[#efe7d6]' : 'bg-[#f7f1e5] border-[#141210] text-[#141210]';
  const divide = ink ? 'border-[#efe7d6]/15' : 'border-[#141210]/15';
  const rowIdle = ink ? 'text-[#efe7d6] hover:bg-[#efe7d6]/10' : 'text-[#141210] hover:bg-[#141210]/5';
  const rowOn = ink ? 'text-[#efe7d6] bg-[#e2602a]/20' : 'text-[#141210] bg-[#b3261e]/10';
  const dim = ink ? 'text-[#efe7d6]/55' : 'text-[#5a5246]';

  return (
    <div ref={wrapRef} className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose the record's language"
        className={`w-full flex items-center justify-between gap-2 border px-2 py-1.5 min-h-[36px] text-[13px] font-bold font-mono text-left outline-none cursor-pointer ${field}`}
      >
        {/* A language is named in its own words and never translated: a control that
            renames itself in the tongue you are leaving cannot be trusted or used. */}
        <span data-no-translate className="truncate">{lang === 'auto' ? `🌐 Auto — ${nameFor(detected)}` : nameFor(lang)}</span>
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className={`absolute right-0 top-full mt-1 z-[60] flex flex-col w-[calc(100vw_-_2.5rem)] max-h-[min(60vh,480px)] sm:w-[min(92vw,560px)] sm:max-h-[min(72vh,540px)] border-2 shadow-2xl shadow-black/50 ${panel}`}>
          {/* The panel names itself, so what opens reads as part of the record and not as a browser menu. */}
          <div className={`flex items-center justify-between gap-2 px-3 py-2 border-b-2 ${divide}`}>
            <span className="text-[9px] font-black font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>
              Every tongue on Earth
            </span>
            <span className={`text-[9px] font-mono ${dim}`}>{LANGS.length + 1} on the list</span>
          </div>

          <div className={`p-2 border-b ${divide}`}>
            <div className="relative">
              <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${dim}`} />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a language"
                aria-label="Search a language"
                className={`w-full border pl-8 pr-2 py-2 min-h-[38px] text-[16px] sm:text-[12px] font-mono outline-none ${field}`}
              />
            </div>
          </div>

          <div role="listbox" aria-label="Languages" className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
            {!query.trim() && (
              <button
                type="button"
                role="option"
                aria-selected={lang === 'auto'}
                onClick={() => choose('auto')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 min-h-[42px] text-left text-[13px] font-mono border-b ${divide} ${lang === 'auto' ? rowOn : rowIdle}`}
              >
                <span data-no-translate className="flex-1 min-w-0 truncate">🌐 Auto — {nameFor(detected)}</span>
                <span className={`flex-shrink-0 text-[9px] font-mono uppercase tracking-widest ${dim}`}>device</span>
                {lang === 'auto' && <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />}
              </button>
            )}

            <div className="sm:grid sm:grid-cols-2">
              {found.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={chosen === l.code}
                  onClick={() => choose(l.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 min-h-[42px] text-left text-[13px] font-mono border-b ${divide} ${chosen === l.code ? rowOn : rowIdle}`}
                >
                  <span data-no-translate className="flex-1 min-w-0 truncate">{l.label}</span>
                  {chosen === l.code && <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />}
                </button>
              ))}
            </div>

            {found.length === 0 && (
              <p className={`px-3 py-6 text-center text-[11px] font-mono leading-relaxed ${dim}`}>
                No language on the list by that name. Type it below and the record will speak it.
              </p>
            )}
          </div>

          <div className={`p-2 border-t-2 ${divide}`}>
            {otherOpen ? (
              <div className="flex items-center gap-2">
                <input
                  ref={manualRef}
                  value={manual}
                  onChange={(e) => { setManual(e.target.value); if (refusal) setRefusal(''); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') commit(); }}
                  placeholder="e.g. Kiswahili, Basque, Bislama"
                  aria-label="Type any language on Earth"
                  autoComplete="off"
                  autoCapitalize="words"
                  className={`flex-1 min-w-0 border px-3 py-2 min-h-[38px] text-[16px] sm:text-[12px] font-mono outline-none ${field}`}
                />
                <button
                  type="button"
                  onClick={commit}
                  className="flex-shrink-0 px-3 py-2 min-h-[38px] text-[10px] font-black font-mono uppercase"
                  style={{ background: accent, color: ink ? '#141210' : '#f7f1e5' }}
                >
                  Go
                </button>
                <button
                  type="button"
                  onClick={() => { setOtherOpen(false); setManual(''); }}
                  aria-label="Cancel"
                  className={`flex-shrink-0 w-[38px] h-[38px] flex items-center justify-center border text-base leading-none ${field}`}
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOtherOpen(true)}
                className={`w-full px-2 py-2.5 min-h-[42px] text-left text-[12px] font-mono ${rowIdle}`}
              >
                ✨ Any other language on Earth…
              </button>
            )}

            {refusal && (
              <p className={`mt-2 text-[11px] font-mono leading-relaxed ${dim}`} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 8 }}>
                {refusal}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}