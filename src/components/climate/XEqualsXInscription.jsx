import React from 'react';

// The mark, in its own colour.
//
// Cobalt is the only colour on this page that is allowed to mean something: it belongs to
// x = x and to nothing else here. The record's own signal is orange; the mark is not the
// record's branding, it is the one line the record rests on, so it gets its own field.
//
// No engraving filter, no stone, no turbulence. A colour, a letterform and two hairlines.
// That is the whole design, and it is enough — a thing that has to look ancient is asking
// to be believed, which is the opposite of what this page is for.

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-8 border-b-2 border-[#141210]">
      <div className="relative bg-record-mark overflow-hidden -mx-4 px-5 py-14">
        <div className="absolute inset-x-0 top-0 h-px bg-[#efe7d6]/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#efe7d6]/25" />

        <div className="relative flex flex-col items-center text-center">
          <h2
            id="the-mark"
            className="font-mono text-[8.5px] font-black uppercase tracking-[0.32em] text-[#efe7d6]/70"
          >
            The mark
          </h2>

          <p className="mt-6 select-none font-mono font-black text-[78px] leading-[0.8] tracking-[-0.06em] text-[#efe7d6]">
            x = x
          </p>

          <p className="mt-7 max-w-[26ch] font-mono text-[11.5px] leading-relaxed text-[#efe7d6]/85">
            Not a slogan and not a hope. True before anyone agrees with it — and chosen where it
            is not.
          </p>
        </div>
      </div>

      {/* The voice — why a recording is here at all */}
      <div className="mt-7">
        <p className="font-mono text-[15px] leading-[1.85] text-[#141210]">
          <span className="font-black">Big Science</span>, 1982 — a recorded voice on a
          telephone line, still speaking into a room that has emptied out.
        </p>
        <p className="mt-3 font-mono text-[15px] leading-[1.85] text-[#141210]">
          A recording does not travel in time. It waits. That is the only technology on this
          page, and it is older than print: someone says a thing now, and a stranger hears it
          later.
        </p>
        <p className="mt-3 font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-[#6b6258]">
          Laurie Anderson · Big Science · 1982
        </p>
      </div>

      <p className="mt-4 border-t-2 border-[#141210] pt-4 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Addressed to whoever arrives later. The record is not conscious and does not love you
        back. The people keeping it might.
      </p>
    </section>
  );
}