// ── HOW WELL AN ENTRY IS KNOWN ────────────────────────────────────────────────
//
// One word per level, written once and here only, so the card, the entry's own page
// and the wire cannot drift apart about it. The record's method rests on saying this
// out loud: a claim propped on one origin must never look as solid as one that two
// independent origins agree on.
//
//   official_record — the body itself has put this on the record
//   corroborated    — two independent origins agree
//   single_source   — one origin says so
//
// Absent a value, the honest answer is the lowest one: single_source. That is the
// default on the entities themselves, so an entry cannot buy certainty by staying
// quiet. Only a person (an admin) may raise it.

export const VERIFICATION = {
  official_record: { label: 'Official record', tone: 'bg-[#1e3a2b] text-[#efe7d6]' },
  corroborated: { label: 'Corroborated', tone: 'bg-[#e2602a] text-[#141210]' },
  single_source: { label: 'Single source', tone: 'bg-[#141210] text-[#efe7d6]' },
};

// A second, independent origin actually named on the entry — the only thing that makes
// 'corroborated' true. A label with nothing beside it is a claim the record cannot show,
// so it is read back as what it really is: one origin, standing alone.
const secondOriginNamed = (entry) => String(entry?.corroborating_source || '').trim().length > 0;
const unbacked = (entry) => entry?.verification === 'corroborated' && !secondOriginNamed(entry);

// The badge for an entry, with the lowest level standing in when nothing is recorded —
// and 'corroborated' standing only where a second origin is named on the entry itself.
export const verificationOf = (entry) => {
  if (unbacked(entry)) return VERIFICATION.single_source;
  return VERIFICATION[entry?.verification] || VERIFICATION.single_source;
};

// The same three levels said in full, for under an entry — plain speech, no spin.
export const VERIFICATION_NOTE = {
  official_record: 'The body itself put this on the record. This is the record, not a report of it.',
  corroborated: 'Two independent origins agree on this. Both are named on the entry.',
  single_source: 'One origin says this, and the record says so. It stands alone here until a second, independent origin agrees.',
};

// The line under an entry, held to the same rule as its badge, so what a reader reads and
// what the badge claims can never disagree about how well something is known.
export const verificationNoteOf = (entry) => {
  if (unbacked(entry)) return VERIFICATION_NOTE.single_source;
  return VERIFICATION_NOTE[entry?.verification] || VERIFICATION_NOTE.single_source;
};