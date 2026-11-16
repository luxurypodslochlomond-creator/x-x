import React from 'react';
import { ChevronDown } from 'lucide-react';

// ── THE CONTENTS TAB ────────────────────────────────────────────────────────────
// Three attempts came before this one and each failed for a reason worth keeping.
// First a filled box with four parts to say one thing. Then a bare hairline line,
// which was quieter and read as nothing at all — a marginal note where a door should
// be. Then four variations on a "bar", all of which were still a filter widget wearing
// a different colour, which is why none of them passed: the fault was never the shape.
//
// The fault was that the subject was the only thing on the page with no weight and no
// voice. Everything around it — the kind filters, the submit slab, the live strip —
// spoke in the same small machine label, and the subject spoke it smallest of all, so
// nothing led the eye and the whole toolbar read as one flat grey band. And it stood
// *under* the submit button, which made the one control that says where on the record
// you are reading look like a footnote to a form.
//
// So this is not a bar. It is the divider tab out of the side of a printed book:
//   · a spine of solid ink down the page edge, which is the only element here that
//     carries weight as a mark rather than as type — quiet, but impossible to miss;
//   · the subject set in the record's READING voice, larger than any button near it,
//     because it is a place in the record and not a setting;
//   · its count set where a page number goes, with the word under it, so the number
//     arrives as a folio rather than as a statistic;
//   · no red and no orange anywhere in it, on purpose. This record spends red on
//     crises and orange on action, and a subject is neither — a colour used here
//     would be a colour that means something else.
// And it opens into the contents sheet below it, flush, so the tab and the index are
// one printed object rather than a menu that happened to land on the page.
export default function SubjectDoor({ active, totalEntries, allLabel, open = false, onOpen, onClose }) {
  const label = active ? active.label : allLabel;
  const count = active ? active.count : totalEntries;

  return (
    <button
      type="button"
      onClick={onClose ? () => (open ? onClose() : onOpen()) : onOpen}
      aria-expanded={open}
      aria-haspopup="true"
      className="lg:hidden w-full flex items-stretch text-left bg-[#f7f1e5] border-y border-[#141210]/25 active:bg-[#efe7d6] transition-colors"
    >
      {/* The spine. Seven pixels of ink at the page edge — the tab of a divider. */}
      <span aria-hidden="true" className="w-[7px] flex-shrink-0 bg-[#141210]" />

      <span className="flex-1 min-w-0 pl-3.5 pr-2 py-2.5">
        <span className="block text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246]">
          Subject
        </span>
        <span
          className="block truncate text-[#141210] mt-[3px]"
          style={{ fontFamily: 'var(--font-reading)', fontSize: 21, lineHeight: 1.14 }}
        >
          {label}
        </span>
      </span>

      {/* The folio: the count where a printed page number sits, the word beneath it. */}
      <span className="flex flex-col items-end justify-center flex-shrink-0 pr-2">
        <span
          className="text-[#141210]"
          style={{ fontFamily: 'var(--font-reading)', fontSize: 19, lineHeight: 1 }}
        >
          {count}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#5a5246] mt-1">
          {count === 1 ? 'entry' : 'entries'}
        </span>
      </span>

      <span className="flex items-center pl-1.5 pr-3 flex-shrink-0">
        <ChevronDown
          className={`w-[18px] h-[18px] text-[#141210] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </span>
    </button>
  );
}