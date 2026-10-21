import React from 'react';

// The record's section heading — display voice, hairline, optional count.
// One place, so every page of the record wears the same band.

export default function RecordSectionHeading({ eyebrow, title, count }) {
  return (
    <>
      {eyebrow && (
        <p className="text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246] mb-1">{eyebrow}</p>
      )}
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', letterSpacing: '-0.025em' }}>
          {title}
        </h2>
        <div className="flex-1 h-px bg-[#141210]/20" />
        {count != null && <span className="text-[10px] font-black font-mono text-[#e2602a]">{count}</span>}
      </div>
    </>
  );
}