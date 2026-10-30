import React from 'react';
import { Link } from 'react-router-dom';

// One of Janine's questions, with the answer in the record's own hand.
// Her words are quoted exactly and never tidied. The verdict is said first,
// in one word, so nobody has to read to the bottom to find out whether the
// answer is yes, no, or not yet. Nothing here is rounded up in her favour.

const TONES = {
  yes: { text: 'text-[#1e3a2b]', border: 'border-[#1e3a2b]', bg: 'bg-[#1e3a2b]/5' },
  open: { text: 'text-[#b3261e]', border: 'border-[#b3261e]', bg: 'bg-[#b3261e]/5' },
  part: { text: 'text-[#8a5a12]', border: 'border-[#8a5a12]', bg: 'bg-[#8a5a12]/5' },
};

export default function HostAnswer({ n, ask, verdict, tone = 'yes', label = 'you asked', children, doors = [] }) {
  const t = TONES[tone] || TONES.yes;

  return (
    <section className="mb-8 lg:mb-11">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[10px] font-black font-mono text-[#e2602a]">{n}</span>
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
          {label}
        </span>
      </div>

      <p className="text-[12px] lg:text-[13.5px] font-mono italic leading-relaxed text-[#5a5246] border-l-2 border-l-[#141210]/25 pl-3 mb-3">
        “{ask}”
      </p>

      <p className={`inline-block px-2.5 py-1 border-2 ${t.border} ${t.bg} ${t.text} text-[10px] font-black font-mono uppercase tracking-[0.14em] mb-3`}>
        {verdict}
      </p>

      <div className="space-y-2.5 lg:space-y-3.5 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">
        {children}
      </div>

      {doors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {doors.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className="inline-flex items-center gap-1.5 px-3 py-2 border-2 border-[#141210] bg-[#f7f1e5] text-[#141210] text-[10px] font-black font-mono uppercase tracking-wide active:bg-[#e2602a] transition-colors"
            >
              {d.label} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}