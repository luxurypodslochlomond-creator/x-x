import React from 'react';

/* ── WHY THIS PLATE IS ON THE RECORD ────────────────────────────────────────────────
   The map page showed a world with marks on it and never said what it was for. A reader
   arriving cold — or a cartoonist being shown it the night before a workshop — had to
   work out the argument from the legend.

   So the page says it, in three beats, in the record's own colours: the yellow plate, the
   red rule, the ink and the paper. Each beat is a claim the plate itself can be checked
   against, and none of them is a boast about reach.

   Kept as its own file because it is one thought, and because the numbers in the plate
   above it will change every week while this will not. */
const BEATS = [
  {
    mark: '01',
    line: 'A record nobody can find is a rumour.',
    body: 'Every published entry that names a place stands on this plate, so a reader sees the whole world the record is standing in rather than one newsroom’s corner of it.',
  },
  {
    mark: '02',
    line: 'Two observations, never one.',
    body: 'Where something happened is not where it was read. The plate holds both and joins neither, because a line drawn between them would be an invention dressed as a finding.',
  },
  {
    mark: '03',
    line: 'What is not here is counted, not guessed.',
    body: 'An entry with no place it can honestly be put is left off the plate and still counted in the record. Nothing is dropped onto a likely country to make the world look fuller.',
  },
];

export default function WhyThisPlate() {
  return (
    <section
      aria-labelledby="why-plate-title"
      className="border-t-[3px] border-record-red bg-record-paper px-4 py-6 lg:px-8 lg:py-7"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-record-red">
        Why this plate is on the record
      </p>
      <h2 id="why-plate-title" className="mt-2 max-w-[38ch] text-2xl font-bold leading-tight text-record-ink">
        A map is the one page where the record can be checked against the world.
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-6">
        {BEATS.map((beat) => (
          <div key={beat.mark} className="border-l-2 border-record-signal pl-3">
            <p className="font-mono text-[10px] font-black tracking-[0.18em] text-record-red">{beat.mark}</p>
            <p className="mt-1 text-[15px] font-bold leading-snug text-record-ink">{beat.line}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-record-muted">{beat.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}