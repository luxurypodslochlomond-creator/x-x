import React from 'react';

// The mark, performed once and then left alone.
//
// Built like a museum plate, not a poster: hairline rules, numbered evidence, nothing
// competing with the sentence it stands next to. Three of the four numbered lines are
// mathematics and cannot be argued with. The fourth is not mathematics at all, and
// saying so out loud is the only thing stopping the mark turning into a slogan.
//
// Then the voice. Big Science, 1982 — an answering machine as a voice talking into a
// room that has emptied out. It is here because a recording is the one piece of
// technology this page actually uses, and it was never a claim about the future.

const EVIDENCE = [
  {
    n: '01',
    mark: '1 = 1',
    origin: 'Identity',
    text: 'True by definition inside any system that has an equals sign — and empty, because it says nothing at all about the person reading it.',
  },
  {
    n: '02',
    mark: 'E = hν',
    origin: 'Planck 1900 · Einstein 1905',
    text: 'Energy is exchanged in whole multiples of hν, sized by its frequency. Planck found the rule and was uneasy about where it led; Einstein took it literally and said the light itself arrives in packets. Measured ever since, and indifferent to who is watching.',
  },
  {
    n: '03',
    mark: 'resonance',
    origin: 'Coupling',
    text: 'A thing driven near its own natural frequency answers with a large swing, and two things tuned alike pass energy between them — a glass, a bridge, a room, two clocks on one wall. A fact about coupling. Not a claim about intention.',
  },
  {
    n: '04',
    mark: 'equal worth',
    origin: 'Not physics',
    text: 'Nowhere in the mathematics. A decision, taken on purpose by people who could have decided otherwise, and the only line here that can be refused.',
  },
];

export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-mark" className="pb-8 border-b-2 border-[#141210]">
      <h2
        id="the-mark"
        className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#6b6258]"
      >
        The mark · read it as an equation
      </h2>

      <div className="mt-3 border-y-2 border-[#141210] py-6">
        <p className="font-mono font-black text-[60px] leading-[0.85] tracking-[-0.05em] text-[#141210]">
          x = x
        </p>
        <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210] max-w-[34ch]">
          An identity, not a promise. True before it is agreed with — and chosen where it is
          not.
        </p>
      </div>

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

      <div className="mt-8">
        {EVIDENCE.map(({ n, mark, origin, text }) => (
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