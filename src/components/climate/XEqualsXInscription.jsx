import React from 'react';

// The mark, cut once into ink and left alone.
//
// The rest of this page is paper and hairlines, so the mark gets the one black stone on
// it: full-bleed, reversed out, framed like an engraved plate — the way a thing is set
// when it is meant to be read by someone who was not there when it was cut.
//
// No decoration. An inscription says the thing, once, and then it stops talking.

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-8 border-b-2 border-[#141210]">
      {/* The stone */}
      <div className="relative bg-[#141210] overflow-hidden -mx-4 px-5 py-10">
        {/* The letters are struck, not typed: the noise pushes their edges a fraction of a
            pixel, the way ink spreads into stone that was cut by a hand. */}
        <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
          <filter id="x-mark-strike">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)',
            animation: 'twcc-scan 3s linear infinite',
          }}
        />
        <div className="absolute inset-2 border border-[#efe7d6]/20 pointer-events-none" />
        <div className="absolute inset-[13px] border border-[#efe7d6]/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2
            id="the-mark"
            className="font-mono text-[8.5px] font-black uppercase tracking-[0.32em] text-[#efe7d6]/55"
          >
            The mark · read it as an equation
          </h2>

          <p
            className="mt-6 font-mono font-black text-[76px] leading-[0.8] tracking-[-0.06em] text-[#efe7d6]"
            style={{ filter: 'url(#x-mark-strike)' }}
          >
            x = x
          </p>

          <span className="mt-7 block w-10 h-px bg-[#e2602a]" />

          <p className="mt-5 font-mono text-[11.5px] leading-relaxed text-[#efe7d6]/80 max-w-[26ch]">
            An identity, not a promise. True before it is agreed with — and chosen where it is
            not.
          </p>

          <p className="mt-8 font-mono text-[9px] font-black uppercase tracking-[0.22em] text-[#e2602a]/85">
            A sentence can outlast the hand that cut it
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