import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// What a search actually reads, and where all of it comes from — shown before anyone has
// typed a word. A reader, or a panel, sees the shape of the record without having to guess
// at the right keywords first. Nothing here is a hint about ranking: the record has none.

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
];

export default function RecordSearchGuide() {
  return (
    <div>
      <h2
        className="font-black uppercase text-[#141210] leading-tight mb-1"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '-0.02em' }}
      >
        What the search reads
      </h2>
      <p className="text-[11px] lg:text-[12px] font-mono text-[#5a5246] leading-relaxed mb-4">
        One question reaches all five, in whatever tongue each entry was written in.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {KINDS.map((k) => (
          <div key={k.label} className="bg-[#f7f1e5] border border-[#141210] border-t-4 p-3" style={{ borderTopColor: k.tone }}>
            <h3 className="text-[11px] font-black font-mono uppercase tracking-wide" style={{ color: k.tone }}>
              {k.label}
            </h3>
            <p className="text-[11px] font-mono text-[#141210] leading-relaxed mt-1.5">{k.body}</p>
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
          The record answers for itself as well: the founder, who built it, how it is made, who decides, and
          how to cite an entry.
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