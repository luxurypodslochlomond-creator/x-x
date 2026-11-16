import React from 'react';
import { X, Plus, Check } from 'lucide-react';
import SignalCode from '@/components/climate/SignalCode';

// ── THE CONTENTS SHEET ──────────────────────────────────────────────────────────
// This used to be a full-screen overlay: a second window with its own scroll, its own
// stacking order and a body-scroll lock underneath it — four things that can each go
// wrong on a phone, and they did. It opens in the page now, and it opens flush under
// the tab that asked for it, so tab and sheet are one printed object: the tab is the
// divider, this is the page behind it.
//
// What changed this time is the reading, not the layout. Every row used to be a small
// uppercase machine label with a number pinned to the end of it — the record's filing
// cabinet, which is why choosing a subject felt like operating a filter. A subject is
// set in the record's READING voice now, its count sits where a page number goes, and
// the two are joined by a run of dots. Leader dots are four hundred years old and
// nobody puts them in a web app, which is exactly why they belong here: this is the
// contents sheet of a record, not a menu of tags.
//
// Nothing is hidden or softened. A subject with nothing under it is still a door
// rather than a dead end — it opens the form with the subject already set — and the
// line at the foot still says out loud that the taxonomy was given, not harvested.
const Leader = () => (
  <span
    aria-hidden="true"
    className="flex-1 min-w-[14px] mx-2 border-b border-dotted border-[#141210]/45"
    style={{ transform: 'translateY(-3px)' }}
  />
);

export default function SubjectIndexSheet({ open, onClose, filled, empty, totalEntries, selected, allLabel, onSelect, onAdd }) {
  if (!open) return null;

  return (
    <div className="lg:hidden bg-[#f7f1e5] border-b border-[#141210]/25">
      <div className="flex items-center justify-between gap-3 pl-3.5 pr-2 py-2 border-b border-[#141210]/20">
        <span className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#141210]">
          Contents · {filled.length + empty.length} subjects · {totalEntries} entries
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the contents"
          className="w-9 h-9 -mr-1 flex items-center justify-center text-[#141210] active:text-[#b3261e]"
        >
          <X className="w-[18px] h-[18px]" />
        </button>
      </div>

      <div className="px-3.5 pb-1">
        <button
          type="button"
          onClick={() => onSelect('all')}
          className="w-full flex items-center gap-2 py-3 min-h-[46px] border-b border-[#141210]/15 text-left"
        >
          <span className="truncate text-[#141210]" style={{ fontFamily: 'var(--font-reading)', fontSize: 15 }}>
            {allLabel}
          </span>
          <Leader />
          <span className="flex-shrink-0 text-[12px] font-mono text-[#141210] tabular-nums">{totalEntries}</span>
          {selected === 'all'
            ? <Check className="w-3.5 h-3.5 flex-shrink-0 text-[#141210]" />
            : <span className="w-3.5 flex-shrink-0" aria-hidden="true" />}
        </button>

        <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246] pt-4 pb-1">
          On the record
        </div>
        {filled.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className="w-full flex items-center gap-2 py-3 min-h-[46px] border-b border-[#141210]/15 text-left active:bg-[#efe7d6]"
          >
            <SignalCode code={s.code} />
            <span className="min-w-0 truncate text-[#141210]" style={{ fontFamily: 'var(--font-reading)', fontSize: 15 }}>
              {s.label}
            </span>
            <Leader />
            <span className="flex-shrink-0 text-[12px] font-mono text-[#141210] tabular-nums">{s.count}</span>
            {selected === s.id
              ? <Check className="w-3.5 h-3.5 flex-shrink-0 text-[#141210]" />
              : <span className="w-3.5 flex-shrink-0" aria-hidden="true" />}
          </button>
        ))}

        {empty.length > 0 && (
          <>
            <div className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246] pt-4 pb-1">
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
                className="w-full flex items-center gap-2 py-3 min-h-[46px] border-b border-[#141210]/10 text-left active:bg-[#efe7d6]"
              >
                <SignalCode code={s.code} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)', fontSize: 15 }}>
                    {s.label}
                  </span>
                  <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-[#141210] mt-0.5">
                    Send one in
                  </span>
                </span>
                <Plus className="w-3.5 h-3.5 flex-shrink-0 text-[#141210]" />
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