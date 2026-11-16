import React, { useEffect } from 'react';
import { X, Plus, Check } from 'lucide-react';
import SignalCode from '@/components/climate/SignalCode';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

// ── THE INDEX ───────────────────────────────────────────────────────────────────
// The whole taxonomy, full height, laid out like the back of a book: name, classification
// code, and how many entries stand under it.
//
// The order is the honest one. What the record actually holds comes first, heaviest at the
// top, so a reader sees at a glance where it is strong — seagrasses, drought — instead of
// an alphabetical list of everything January wished for. The subjects holding nothing are
// not hidden: they sit under their own heading, faded, and each one is a door. Tapping one
// opens the entry form with that subject already chosen, through the same review as
// everything else. An empty subject stops being a dead end and becomes the shortest way to
// fill it.
//
// No sideways scrolling anywhere: a list down the page is what a thumb already knows.
export default function SubjectIndexSheet({ open, onClose, filled, empty, totalEntries, selected, allLabel, onSelect, onAdd }) {
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Every subject on the record"
      className="fixed inset-0 z-[110] bg-[#f4efe4] flex flex-col"
      style={{ animation: 'sorted-enter 0.2s cubic-bezier(0, 0, 0.2, 1)' }}
    >
      <div className="flex-shrink-0 bg-[#efe7d6] border-b-2 border-[#141210] px-4 pb-3 flex items-end justify-between gap-3"
        style={{ paddingTop: 'max(0.85rem, env(safe-area-inset-top))' }}>
        <div>
          <p className="text-[9px] font-black font-mono uppercase tracking-[0.25em] text-[#e2602a]">The index</p>
          <p className="text-[11px] font-mono text-[#5a5246] mt-1">
            {filled.length + empty.length} subjects · {totalEntries} entries
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the index"
          className="w-11 h-11 flex items-center justify-center border border-[#141210] bg-[#efe7d6] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-2"
        style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>

        <button
          type="button"
          onClick={() => onSelect('all')}
          className="w-full flex items-center gap-2.5 py-3.5 min-h-[52px] border-b border-[#141210]/25 text-left"
        >
          <span className="w-7 h-[18px] border border-[#141210]/40 flex items-center justify-center flex-shrink-0">
            <span className="grid grid-cols-2 gap-[2px]">
              {[0, 1, 2, 3].map(i => <span key={i} className="w-[3px] h-[3px] bg-[#141210] block" />)}
            </span>
          </span>
          <span className="flex-1 text-[12px] font-black font-mono uppercase text-[#141210]">{allLabel}</span>
          <span className="text-[10px] font-mono text-[#5a5246]">{totalEntries}</span>
          {selected === 'all' ? <Check className="w-4 h-4 text-[#e2602a]" /> : <span className="w-4" />}
        </button>

        <p className="text-[9px] font-black font-mono uppercase tracking-[0.25em] text-[#5a5246] mt-6 mb-1">On the record</p>
        {filled.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className="w-full flex items-center gap-2.5 py-3 min-h-[52px] border-b border-[#141210]/15 text-left active:bg-[#141210]/5"
          >
            <SignalCode code={s.code} />
            <span className="flex-1 text-[12px] font-black font-mono uppercase text-[#141210] truncate">{s.label}</span>
            <span className="text-[10px] font-mono text-[#5a5246]">{s.count}</span>
            {selected === s.id ? <Check className="w-4 h-4 text-[#e2602a]" /> : <span className="w-4" />}
          </button>
        ))}

        {empty.length > 0 && (
          <>
            <p className="text-[9px] font-black font-mono uppercase tracking-[0.25em] text-[#5a5246] mt-6 mb-1">
              Nothing yet — {empty.length}
            </p>
            <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-1">
              Where the record is thinnest. Each one opens the form with its subject already set.
            </p>
            {empty.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => onAdd(s)}
                className="w-full flex items-center gap-2.5 py-3 min-h-[52px] border-b border-[#141210]/10 text-left active:bg-[#e2602a]/10"
              >
                <SignalCode code={s.code} />
                <span className="flex-1 min-w-0">
                  <span className="block text-[12px] font-black font-mono uppercase text-[#5a5246] truncate">{s.label}</span>
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-[#e2602a] mt-0.5">Send one in</span>
                </span>
                <Plus className="w-4 h-4 text-[#e2602a] flex-shrink-0" />
              </button>
            ))}
          </>
        )}

        <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mt-6">
          A subject is on this list whether or not the record holds anything under it — the taxonomy was
          given, not built from what we happened to have. Every entry still needs its source and a person to
          sign it.
        </p>
      </div>
    </div>
  );
}