import React from 'react';

// ── SIGNED BY ─────────────────────────────────────────────────────────────────
// One line, and it is the whole of the record's accountability: a named person put
// this here, and here is their name. Not a masthead, not a logo, not an anonymous
// "team" — a person, so a reader can hold someone to it.
//
// It says the gap out loud too. An entry with no signer shows "Unsigned" rather than
// showing nothing, because nothing looks like a design choice and a stated gap looks
// like what it is. A machine never appears on this line: it has no name to put on it.
export default function SignedBy({ name, date, compact = false, className = '' }) {
  const signer = (name || '').trim();

  if (!signer) {
    return compact ? (
      <span className={`text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e]/70 ${className}`}>
        Unsigned
      </span>
    ) : (
      <p className={`text-[10px] font-mono leading-relaxed text-[#b3261e]/80 ${className}`}>
        No signer recorded on this entry yet. That is a gap in this record, not a feature of it.
      </p>
    );
  }

  return (
    <span className={`text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246] ${className}`}>
      Signed{' '}
      <span className="text-[11px] font-black normal-case tracking-normal text-[#141210]">{signer}</span>
      {date && <span className="font-normal normal-case tracking-normal text-[#5a5246]"> · checked {date}</span>}
    </span>
  );
}