import React from 'react';

// ── THE PLATE ──────────────────────────────────────────────────────────────────
// The mark, printed in its own red, at the size it deserves: one field, one rule,
// three characters. Nothing else in the frame.
//
// What is NOT here is the point. The record borrows one measured number — #CC2D2A —
// and draws everything else itself. No sleeve, no cover, no portrait, no photograph
// of somebody's artwork sits behind these words. That is not caution for its own
// sake: a record that says it cannot be extracted from, and then takes an artist's
// cover because it would look good, has answered its own question badly.
//
// And the honest half: the colour is still borrowed, from a person who is alive and
// reachable. So the plate carries its own condition — if she ever asks for it to come
// down, it comes down, and the taking-down is written here rather than done quietly.
// That is the same rule as every correction on this record, applied to the record's
// own ink.

export default function XEqualsXPlate() {
  return (
    <section aria-labelledby="the-plate" className="pb-7 border-b-2 border-[#141210]">
      <div className="border-2 border-[#141210] bg-[#f7f1e5] shadow-[5px_5px_0_0_rgba(20,18,16,0.14)]">
        <div className="flex items-center justify-between gap-2 border-b border-[#141210]/20 px-3.5 py-2">
          <h2
            id="the-plate"
            className="text-[8.5px] font-black font-mono uppercase tracking-[0.28em] text-[#5a5246]"
          >
            The plate
          </h2>
          <span className="text-[8.5px] font-black font-mono uppercase tracking-[0.2em] text-[#b3261e]">
            Drawn, not borrowed
          </span>
        </div>

        {/* The field. Red to the edges, the mark in paper, one rule along the foot. */}
        <div
          className="relative overflow-hidden px-4 pb-14 pt-12 text-center"
          style={{ background: 'rgb(var(--record-mark))' }}
        >
          <p
            className="relative select-none font-black leading-[0.82]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 19vw, 104px)',
              letterSpacing: '-0.045em',
              color: '#f7f1e5',
            }}
          >
            x = x
          </p>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-[7px]"
            style={{ background: '#f7f1e5' }}
          />
        </div>

        <div className="px-4 py-4 space-y-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
          <p>
            Every line in the field above is drawn here: one red, one rule, three characters.
            No sleeve, no cover, no portrait, no scanned artwork of anybody's — because the
            page that promises nothing can be taken from a person cannot begin by taking
            something from one.
          </p>
          <p className="text-[11px] text-[#5a5246]">
            The red is the only borrowed thing on this page, and it is borrowed as a number
            rather than as a picture: #CC2D2A, measured off the sleeve of{' '}
            <em>O Superman</em>, 1982. Anyone can sample it and check.
          </p>
        </div>

        <div className="border-t border-[#141210]/20 px-4 py-3">
          <p className="font-mono text-[11px] leading-relaxed text-[#141210]">
            <span className="font-black uppercase tracking-[0.14em] text-[#b3261e]">
              If she says no.
            </span>{' '}
            If Laurie Anderson ever asks for this red to come off her record, it comes off —
            the same day, and the removal is printed here in the open rather than done
            quietly. The same rule as every correction on this record, turned on its own ink.
          </p>
        </div>
      </div>
    </section>
  );
}