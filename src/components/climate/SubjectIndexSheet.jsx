import React from 'react';
import { X, Plus, Check } from 'lucide-react';
import SignalCode from '@/components/climate/SignalCode';

// ── THE INDEX UNFOLDS IN THE PAGE ───────────────────────────────────────────────
// This used to be a full-screen overlay: a second window with its own scroll, its own
// stacking order, its own width and a body-scroll lock underneath it. On a phone that is
// four things that can each go wrong, and they did — the list ran past the right edge, the
// plus went with it, and the panel could open without the record underneath.
//
// The index now opens where it belongs: in the page, directly under the line that asked
// for it. Same paper, same hand, nothing covered, nothing to measure wrongly. A subject
// that holds nothing is still a door rather than a dead end — it opens the form with that
// subject already chosen — and the count at the top still says out loud how much of the
// taxonomy the record is carrying, because a record that admits where it is thin is worth
// more than one that hides it behind a scroll.
//
// The type is set at eleven to thirteen pixels on purpose: those sizes sit above the
// record's floor, so nothing here is quietly grown.
export default function SubjectIndexSheet({ open, onClose, filled, empty, totalEntries, selected, allLabel, onSelect, onAdd }) {
  if (!open) return null;

  return (
    <div className="lg:hidden mt-3 border border-[#141210] bg-[#f4efe4]">
      <div className="flex items-center justify-between gap-3 px-3 py-2 bg-[#efe7d6] border-b border-[#141210]">
        <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#141210]">
          {filled.length + empty.length} subjects · {totalEntries} entries
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the index"
          className="w-8 h-8 -mr-1 flex items-center justify-center text-[#141210] active:text-[#e2602a]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-3 pb-1">
        <button
          type="button"
          onClick={() => onSelect('all')}
          className="w-full flex items-center gap-2.5 py-3 min-h-[44px] border-b border-[#141210]/25 text-left"
        >
          <span className="w-6 h-4 border border-[#141210]/40 flex items-center justify-center flex-shrink-0">
            <span className="grid grid-cols-2 gap-[2px]">
              {[0, 1, 2, 3].map(i => <span key={i} className="w-[3px] h-[3px] bg-[#141210] block" />)}
            </span>
          </span>
          <span className="flex-1 min-w-0 truncate text-[12px] font-black font-mono uppercase text-[#141210]">{allLabel}</span>
          <span className="flex-shrink-0 text-[11px] font-mono text-[#5a5246]">{totalEntries}</span>
          {selected === 'all' ? <Check className="w-4 h-4 flex-shrink-0 text-[#e2602a]" /> : <span className="w-4 flex-shrink-0" />}
        </button>

        <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#5a5246] pt-4 pb-1">On the record</div>
        {filled.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className="w-full flex items-center gap-2.5 py-2.5 min-h-[44px] border-b border-[#141210]/15 text-left active:bg-[#141210]/5"
          >
            <SignalCode code={s.code} />
            <span className="flex-1 min-w-0 truncate text-[12px] font-black font-mono uppercase text-[#141210]">{s.label}</span>
            <span className="flex-shrink-0 text-[11px] font-mono text-[#5a5246]">{s.count}</span>
            {selected === s.id ? <Check className="w-4 h-4 flex-shrink-0 text-[#e2602a]" /> : <span className="w-4 flex-shrink-0" />}
          </button>
        ))}

        {empty.length > 0 && (
          <>
            <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#5a5246] pt-4 pb-1">
              Nothing yet — {empty.length}
            </div>
            <div className="text-[11px] font-mono text-[#5a5246] leading-relaxed pb-1">
              Where the record is thinnest. Each one opens the form with its subject already set.
            </div>
            {empty.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => onAdd(s)}
                className="w-full flex items-center gap-2.5 py-2.5 min-h-[44px] border-b border-[#141210]/10 text-left active:bg-[#e2602a]/10"
              >
                <SignalCode code={s.code} />
                <span className="flex-1 min-w-0">
                  <span className="block truncate text-[12px] font-black font-mono uppercase text-[#5a5246]">{s.label}</span>
                  <span className="block text-[11px] font-mono uppercase tracking-[0.1em] text-[#e2602a] mt-0.5">Send one in</span>
                </span>
                <Plus className="w-4 h-4 flex-shrink-0 text-[#e2602a]" />
              </button>
            ))}
          </>
        )}

        <div className="text-[11px] font-mono text-[#5a5246] leading-relaxed py-4">
          A subject is on this list whether or not the record holds anything under it — the taxonomy was
          given, not built from what we happened to have. Every entry still needs its source and a person to
          sign it.
        </div>
      </div>
    </div>
  );
}