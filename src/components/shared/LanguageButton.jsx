import React, { useEffect, useRef, useState } from 'react';
import { Languages, X } from 'lucide-react';
import { LANGS, useSiteLanguage } from '@/components/shared/SiteLanguage';
import { refuseAncientScript } from '@/components/climate/ancientScripts';

// The one language control for the whole platform. Reads and writes the same choice the
// record uses, so a tongue picked here is already picked when the reader opens the record.
// Marked data-no-translate: the picker never translates itself, or you could not get back.

export default function LanguageButton({ tone = 'dark' }) {
  const { lang, chosen, setLanguage, translating } = useSiteLanguage();
  const [open, setOpen] = useState(false);
  const [other, setOther] = useState('');
  const [refusal, setRefusal] = useState('');
  const otherRef = useRef(null);

  // A phone is never handed the keyboard before the field is on screen: the keys would
  // come up over the box being typed into. Desktop may go straight in.
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      const field = otherRef.current;
      if (!field || document.activeElement === field) return;
      field.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(timer);
  }, [open]);

  // An ancient script is refused in the open, never quietly swapped for a machine's guess.
  const commitOther = () => {
    const typed = other.trim();
    if (!typed) return;
    const refused = refuseAncientScript(typed);
    if (refused) { setRefusal(refused); return; }
    setRefusal('');
    setLanguage(typed);
    setOther('');
    setOpen(false);
  };

  const current = LANGS.find(l => l.code === chosen);
  const label = lang === 'auto' ? 'Auto' : (current?.label || chosen);

  const dark = tone === 'dark';

  return (
    <div data-no-translate className="relative">
      <button
        onClick={() => setOpen(true)}
        aria-label="Language"
        className={`flex items-center gap-2 px-2.5 py-2 text-[10px] font-black font-mono uppercase tracking-wide border-2 transition-colors ${
          dark
            ? 'bg-[#141210] text-[#efe7d6]/70 border-[#141210] hover:text-[#efe7d6]'
            : 'bg-[#efe7d6] text-[#141210] border-[#141210]'
        }`}
      >
        <Languages className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="truncate max-w-[86px]">{label}</span>
        {translating && <span className="animate-pulse">·</span>}
      </button>

      {open && (
        <div className="fixed inset-0 z-[130] bg-[#efe7d6] overflow-y-auto" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
            <h2 className="font-black uppercase text-[#efe7d6]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
              Read this in your language
            </h2>
            <button onClick={() => setOpen(false)} aria-label="Close" className="w-10 h-10 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 max-w-[520px] mx-auto pb-12">
            <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mb-4">
              The whole platform follows your choice — every page, every tool, the record included. Translation happens as you read, and the English the app was written in is always the original.
            </p>

            <button
              onClick={() => { setLanguage('auto'); setOpen(false); }}
              className={`w-full text-left px-4 py-3 mb-2 min-h-[44px] border-2 text-[11px] font-black font-mono uppercase transition-colors ${
                lang === 'auto' ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-[#f7f1e5] text-[#141210] border-[#141210]/30'
              }`}
            >
              🌐 Follow this device
            </button>

            <div className="grid grid-cols-2 gap-2">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLanguage(l.code); setOpen(false); }}
                  className={`text-left px-3 py-3 min-h-[44px] border-2 text-[11px] font-mono transition-colors truncate ${
                    chosen === l.code ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-[#f7f1e5] text-[#141210] border-[#141210]/30'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="mt-5 border-t-2 border-[#141210]/20 pt-4">
              <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-2">Any language on Earth</p>
              <div className="flex items-center gap-2">
                <input
                  ref={otherRef}
                  value={other}
                  onChange={e => { setOther(e.target.value); if (refusal) setRefusal(''); }}
                  onKeyDown={e => { if (e.key === 'Enter') commitOther(); }}
                  placeholder="Type it, e.g. Yoruba, Scots Gaelic, Kurdish"
                  autoComplete="off"
                  autoCapitalize="words"
                  className="flex-1 min-w-0 bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[16px] sm:text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]"
                />
                <button
                  onClick={commitOther}
                  className="px-4 py-2.5 min-h-[44px] bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors"
                >
                  Go
                </button>
              </div>
              {refusal && (
                <p className="mt-3 text-[11px] font-mono leading-relaxed text-[#141210] border-l-2 border-[#b3261e] pl-2">
                  {refusal}
                </p>
              )}
              <p className="text-[10px] font-mono text-[#5a5246] mt-3 leading-relaxed">
                Machine translation runs as you read. A name, a number or a place may come back in English — and for anything that matters, the English on the page is the words the record stands behind.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}