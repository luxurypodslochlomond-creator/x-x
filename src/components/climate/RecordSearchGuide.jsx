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
    tone: '#1e3a2b',
    body: 'What works — something done in a place, that another community can copy.',
  },
  {
    label: 'Climate crises',
    tone: '#b3261e',
    body: 'Emergencies the world needs to know about, each labelled with how well it is known.',
  },
  {
    label: 'Actions',
    tone: '#e2602a',
    body: 'Cleanups, plantings, meetings, policy submissions — what is happening, and when.',
  },
  {
    label: 'Gatherings',
    tone: '#1e3a2b',
    body: 'People on the same work in one region. The record carries one contact line, never a conversation.',
  },
  {
    label: 'On the wire',
    tone: '#141210',
    body: 'Dated entries: what changed, where, who says so, and what can be copied from it.',
  },
  {
    label: 'The music',
    tone: '#1e3a2b',
    body: 'Pieces given to the record by the artists who made them — searchable by their words as well as their names.',
  },
  {
    label: 'The drawings',
    tone: '#e2602a',
    body: 'Pictures on the wall of the cartoons room, each with the hand that drew it and where it came from.',
  },
  {
    label: 'The pictures',
    tone: '#1e3a2b',
    body: 'Credited photographs on the record — searchable by what they show and by the hand that made them.',
  },
  {
    label: 'What readers said',
    tone: '#b3261e',
    body: 'Published comments under entries, with the name each writer signed. Never their address.',
  },
  {
    label: 'The roll',
    tone: '#b3261e',
    body: 'The people who check this record — findable only by the line each of them wrote for themselves.',
  },
];

export default function RecordSearchGuide() {
  return (
    <div>
      <h2
        className="font-black uppercase text-[#141210] leading-tight mb-1.5"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '-0.02em' }}
      >
        What the search reads
      </h2>
      <p className="text-[11px] lg:text-[12px] font-mono text-[#5a5246] leading-relaxed mb-3">
        One question reaches all of it, in whatever tongue each entry was written in.
      </p>

      <div className="border-t border-[#141210]/20">
        {KINDS.map((k) => (
          <div key={k.label} className="flex items-start gap-3 border-b border-[#141210]/20 py-2.5">
            <span className="mt-[7px] h-2 w-2 flex-shrink-0" style={{ backgroundColor: k.tone }} />
            <p
              className="text-[13px] lg:text-[13.5px] leading-relaxed text-[#141210]"
              style={{ fontFamily: 'var(--font-reading)' }}
            >
              <span
                className="mr-2 inline-block text-[10px] font-black font-mono uppercase tracking-wide"
                style={{ color: k.tone }}
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
      <div className="mt-5 bg-[#141210] border-2 border-[#141210] p-4">
        <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#e2602a] mb-2">
          Search by origin, too
        </p>
        <p className="text-[11px] lg:text-[12px] font-mono text-[#efe7d6]/80 leading-relaxed">
          Every entry carries the body, journal, organisation or person it came from, and that origin is
          searchable. Name one — Horizon International, a journal, an official body — and everything resting
          on it comes back.
        </p>
        <p className="text-[11px] lg:text-[12px] font-mono text-[#efe7d6]/80 leading-relaxed mt-2.5">
          The record answers for itself as well: the founder, who built it, how it is made, who decides, who
          holds the keys, what it costs to keep alive, and what is still open. None of that is behind an
          address you have to be given.
        </p>
        <div className="flex flex-wrap gap-2 mt-3.5">
          <Link
            to="/ClimateMethod"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#efe7d6] text-[#141210] border-2 border-[#efe7d6] text-[10px] font-black font-mono uppercase tracking-wider active:bg-[#e2602a] transition-colors"
          >
            How this record is made <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/ClimateFounder"
            className="inline-flex items-center gap-1.5 px-3 py-2 border-2 border-[#efe7d6]/40 text-[#efe7d6] text-[10px] font-black font-mono uppercase tracking-wider hover:border-[#e2602a] hover:text-[#e2602a] transition-colors"
          >
            The founder <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}