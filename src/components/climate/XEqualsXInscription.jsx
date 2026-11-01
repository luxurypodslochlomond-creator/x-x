import React from 'react';

// The mark, cut once into ink and left alone.
//
// The rest of this page is paper and hairlines, so the mark gets the one black stone on
// it: full-bleed, reversed out, framed like an engraved plate — the way a thing is set
// when it is meant to be read by someone who was not there when it was cut.
//
// No decoration. An inscription says the thing, once, and then it stops talking.

const EVIDENCE = [
  {
    n: '01',
    mark: '1 = 1',
    origin: 'Identity',
    text: 'True by definition inside any system that has an equals sign — and empty, because it says nothing at all about the person reading it.',
    check: 'Needs no source, which is the whole point of it. It holds wherever an equals sign holds.',
  },
  {
    n: '02',
    mark: 'E = hν',
    origin: 'Planck 1900 · Einstein 1905',
    text: 'Energy is exchanged in whole multiples of hν, sized by its frequency. Planck found the rule and was uneasy about where it led; Einstein took it literally and said the light itself arrives in packets. Measured ever since, and indifferent to who is watching.',
    check: 'Planck, Zur Theorie des Gesetzes der Energieverteilung im Normalspectrum, 1900. Einstein, Annalen der Physik 17, 1905.',
  },
  {
    n: '03',
    mark: 'resonance',
    origin: 'Coupling',
    text: 'A thing driven near its own natural frequency answers with a large swing, and two things tuned alike pass energy between them — a glass, a bridge, a room, two clocks on one wall. A fact about coupling. Not a claim about intention.',
    check: 'Huygens, two pendulums hung on one beam falling into step, 1665. Any textbook on coupled oscillators since.',
  },
  {
    n: '04',
    mark: 'equal worth',
    origin: 'Not physics',
    text: 'Nowhere in the mathematics. A decision, taken on purpose by people who could have decided otherwise, and the only line here that can be refused.',
    check: 'No source exists for this one. It is a decision, and the plate under it is signed — or plainly unsigned.',
  },
];

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-8 border-b-2 border-[#141210]">
      {/* The stone */}
      <div className="relative bg-[#141210] overflow-hidden -mx-4 px-5 py-10">
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

          <p className="mt-6 font-mono font-black text-[76px] leading-[0.8] tracking-[-0.06em] text-[#efe7d6]">
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

      {/* The evidence */}
      <div className="mt-8">
        {EVIDENCE.map(({ n, mark, origin, text, check }) => (
          <div key={n} className="border-t border-[#141210]/25 pt-3 pb-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[9.5px] font-black tracking-[0.18em] text-[#6b6258]">
                {n}
              </p>
              <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-[#e2602a] text-right">
                {origin}
              </p>
            </div>
            <p className="mt-2 font-mono font-black text-[19px] leading-none tracking-[-0.02em] text-[#141210]">
              {mark}
            </p>
            <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-[#141210]">
              {text}
            </p>
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-[#6b6258]">
              {check}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t-2 border-[#141210] pt-4 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Addressed to whoever arrives later. The record is not conscious and does not love you
        back. The people keeping it might.
      </p>
    </section>
  );
}