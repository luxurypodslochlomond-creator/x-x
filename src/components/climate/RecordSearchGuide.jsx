import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// What a search actually reads, and where all of it comes from — shown before anyone has
// typed a word. A reader, or a panel, sees the shape of the record without having to guess
// at the right keywords first. Nothing here is a hint about ranking: the record has none.
//
// It used to be five bordered cards of identically weighted mono text — five bricks of the
// same size in the same voice, which is what made the front of the search feel like a
// leaflet about a product. It is an index sheet now: one rule per room, the room's name in
// its own colour, and the sentence in the record's reading face. Same words, same honesty,
// and the eye has somewhere to start.

const KINDS = [
  {
    label: 'Solutions',
    body: 'What works — something done in a place, that another community can copy.',
  },
  {
    label: 'Climate emergencies',
    body: 'Emergencies the world needs to know about, each labelled with how well it is known.',
  },
  {
    label: 'Actions',
    body: 'Cleanups, plantings, meetings, policy submissions — what is happening, and when.',
  },
  {
    label: 'Groups',
    body: 'People on the same work in one region. The record carries one contact line, never a conversation.',
  },
  {
    label: 'The Wire',
    body: 'Dated changes: what happened, where, who says so, and what can be copied from it.',
  },
  {
    label: 'The music',
    body: 'Pieces given to the record by the artists who made them — searchable by their words as well as their names.',
  },
  {
    label: 'The drawings',
    body: 'Pictures on the wall of the cartoons room, each with the hand that drew it and where it came from.',
  },
  {
    label: 'The pictures',
    body: 'Credited photographs on the record — searchable by what they show and by the hand that made them.',
  },
  {
    label: 'What readers said',
    body: 'Published comments under entries, with the name each writer signed. Never their address.',
  },
  {
    label: 'The roll',
    body: 'The people who check this record — findable only by the line each of them wrote for themselves.',
  },
];

export default function RecordSearchGuide() {
  return (
    <div className="record-search-guide">
      <h2 className="base-one-label font-mono uppercase mb-3 text-record-mark">
        What the search reads
      </h2>
      <p className="text-[11px] lg:text-[12px] font-mono text-record-muted leading-relaxed mb-3">
        One question reaches all of it, in whatever tongue each entry was written in.
      </p>

      <div className="border-t border-record-ink/20">
        {KINDS.map((k) => (
          <div key={k.label} className="flex items-start gap-3 border-b border-record-ink/20 py-2.5">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-record-mark" />
            <p
              className="font-mono text-sm leading-relaxed text-record-ink"
            >
              <span
                className="base-one-label font-mono uppercase mr-3 inline-block text-record-ink"
              >
                {k.label}
              </span>
              {k.body}
            </p>
          </div>
        ))}
      </div>

      {/* The origins. This is the line a research panel is really looking for: nothing on
          the record stands on our word alone, and the method is one tap away. */}
      <div className="record-search-origin mt-5 bg-cartoon-sun p-5">
        <p className="base-one-label font-mono uppercase mb-3 text-record-mark">
          Search by origin, too
        </p>
        <p className="text-[11px] lg:text-[12px] font-mono text-record-ink leading-relaxed">
          Every entry carries the body, journal, organisation or person it came from, and that origin is
          searchable. Name one — Horizon International, a journal, an official body — and everything resting
          on it comes back.
        </p>
        <p className="text-[11px] lg:text-[12px] font-mono text-record-ink leading-relaxed mt-2.5">
          The record answers for itself as well: the founder, who built it, how it is made, who decides, who
          holds the keys, what it costs to keep alive, and what is still open. None of that is behind an
          address you have to be given.
        </p>
        <div className="flex flex-wrap gap-2 mt-3.5">
          <Link
            to="/ClimateMethod"
            className="base-one-label font-mono uppercase inline-flex min-h-11 items-center gap-1.5 border-b border-record-ink/40 py-2 text-record-ink transition-colors hover:text-record-mark"
          >
            How this record is made <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/ClimateFounder"
            className="base-one-label font-mono uppercase inline-flex min-h-11 items-center gap-1.5 border-b border-record-ink/40 py-2 text-record-ink transition-colors hover:text-record-mark"
          >
            The founder <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}