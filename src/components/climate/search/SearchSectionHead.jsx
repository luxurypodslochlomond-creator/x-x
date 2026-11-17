import React from 'react';

// A room of results, headed the way the record heads its own pages: a numbered tone block,
// the room's name in the record's cut, a rule the colour of that room, and the count at the
// far end. Colour does the sorting, so nothing has to be read twice.
export default function SearchSectionHead({ index, label, count, tone }) {
  return (
    <div className="mb-2.5 flex items-stretch border-b-2" style={{ borderColor: tone }}>
      <span
        className="grid w-7 place-items-center font-mono text-[9px] font-black"
        style={{ backgroundColor: tone, color: 'rgb(var(--record-paper))' }}
      >
        {String(index).padStart(2, '0')}
      </span>
      <h2
        className="px-2 py-1 font-black uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(19px, 1.7vw, 25px)',
          letterSpacing: '-0.02em',
          color: tone,
        }}
      >
        {label}
      </h2>
      <span
        className="ml-auto self-center pr-1 font-mono text-[9px] uppercase tracking-[0.18em]"
        style={{ color: tone }}
      >
        {count}
      </span>
    </div>
  );
}