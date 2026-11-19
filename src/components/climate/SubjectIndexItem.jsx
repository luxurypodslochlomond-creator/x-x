import React from 'react';
import { Check } from 'lucide-react';
import SubjectMark from '@/components/climate/SubjectMark';

// ── A SUBJECT IS A DOOR, NOT A TILE ───────────────────────────────────────────
// This was a ninety-two-pixel tile: mark on top, name under it, count under that, three
// across on a phone. It read as a gallery of specimens, and the name — the one thing a
// reader is actually choosing between — was set at twelve pixels in a hundred-pixel
// column, so half of them broke mid-word.
//
// It is the explorer's door now, down to the shape: the mark, the name beside it at the
// record's size, the count where the explorer puts a shelf's count, and a fingertip of
// height to tap. Same at both widths, two across on a phone and three on a desk, because a
// subject index and the record's index should not look like two different records.
export default function SubjectIndexItem({ subject, selected, onClick, empty = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={empty ? undefined : selected}
      aria-label={empty ? `${subject.label}, no entries yet. Send one in.` : `${subject.label}, ${subject.count} entries`}
      className={`flex min-h-12 min-w-0 items-center gap-2 py-1.5 text-left font-body outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark active:bg-record-paper ${selected ? 'text-record-mark' : 'text-record-ink'}`}
    >
      <SubjectMark subject={subject.id} size={24} active={selected} className="shrink-0" />
      {/* Words wrap at their spaces, never mid-word: a broken word put a single letter on
          a line of its own, which is what "some of words big and letter goes on other
          line" was seeing on a phone. */}
      <span className="min-w-0 flex-1 break-normal text-[13px] uppercase leading-[1.25] tracking-[0.03em]">{subject.label}</span>
      <span className="shrink-0 font-mono text-[11px] tabular-nums text-record-muted">{subject.count}</span>
      {selected && <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-record-mark" />}
    </button>
  );
}