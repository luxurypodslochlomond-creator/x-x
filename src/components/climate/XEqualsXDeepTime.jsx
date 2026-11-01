import React from 'react';

// A million years, drawn to scale.
//
// The only honest way to make a thing for a million years is to say out loud how much of
// that span it actually occupies. So the span is drawn, full width, and everything anyone
// has ever written is set where it truly falls: the last two pixels.
//
// That is the whole argument of the page, made without a word of persuasion.

const SPAN_YEARS = 1000000;
const WRITING_YEARS = 5000;

export default function XEqualsXDeepTime() {
  return (
    <section aria-labelledby="the-measure" className="py-8 border-b-2 border-[#141210]">
      <p className="font-mono text-[8.5px] font-black uppercase tracking-[0.32em] text-[#6b6258]">
        The measure
      </p>

      <h2
        id="the-measure"
        className="mt-3 font-mono font-black text-[26px] leading-[1.05] tracking-[-0.03em] text-[#141210]"
      >
        One million years,<br />to scale.
      </h2>

      <div className="relative mt-7">
        <div className="absolute right-0 -top-6 flex items-center gap-1.5">
          <span className="w-px h-3 bg-[#e2602a]" />
          <span className="font-mono text-[8.5px] font-black uppercase tracking-[0.16em] text-[#e2602a] whitespace-nowrap">
            all of it
          </span>
        </div>

        <div className="relative h-px bg-[#141210]/35">
          <span className="absolute left-0 -top-1 w-px h-2 bg-[#141210]/35" />
          <span className="absolute right-0 -top-2 w-[2px] h-4 bg-[#e2602a]" />
        </div>

        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#6b6258]">
            −{SPAN_YEARS.toLocaleString()} yrs
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#6b6258]">
            now
          </span>
        </div>
      </div>

      <p className="mt-5 font-mono text-[12px] leading-relaxed text-[#141210]">
        Every law, poem, invoice, treaty and inscription ever written — around{' '}
        {WRITING_YEARS.toLocaleString()} years of it — is the orange sliver at the right hand.
        The rest of the line is the time a thing has to survive.
      </p>

      <p className="mt-3 font-mono text-[12px] leading-relaxed text-[#141210]">
        Nothing on a screen is on that line for long. The paper goes, the server goes, the
        language goes. So durability was never the plan — the plan is that somebody copies it,
        and the sentence is short enough to be carried by a person who is not a specialist.
      </p>

      <p className="mt-4 font-mono text-[10px] leading-relaxed text-[#6b6258]">
        The orange hairline at the edge of the page is not ornament: it is your own reading,
        drawn by your thumb. Nothing here cuts it for you.
      </p>
    </section>
  );
}