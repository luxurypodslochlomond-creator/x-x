import React from 'react';

// The mark, performed once and then left alone.
//
// Two of the three lines below are mathematics and cannot be argued with — they were
// true before anyone agreed, and they are true if nobody ever opens this page. The third
// line is not mathematics at all. Keeping those two kinds of sentence apart, out loud, is
// the only thing that stops the mark turning into a slogan.
//
// Nothing here is decorated. An inscription is not a poster: it says the thing, once, and
// then it stops talking.

const LINES = [
  {
    mark: '1 = 1',
    origin: 'Identity',
    text: 'True before anyone agrees with it, and true if nobody ever reads this. It is also empty — it tells the person reading it nothing whatsoever about themselves.',
  },
  {
    mark: 'E = hν',
    origin: 'Planck · 1900',
    text: 'Light arrives in packets, and each packet is sized by its frequency. Tested, exact, and indifferent to who is watching. Resonance is the ordinary consequence: two things tuned alike hand each other energy — a glass, a bridge, a room. Coupling, not intention.',
  },
  {
    mark: 'equal worth',
    origin: 'Not physics',
    text: 'This one is nowhere in the mathematics. It is a decision, taken on purpose by people who could have decided otherwise, and the only line on this page that can be refused.',
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

      <div className="mt-5 space-y-4">
        {LINES.map(({ mark, origin, text }) => (
          <div key={mark} className="border-l-4 border-l-[#e2602a] pl-3.5">
            <p className="font-mono font-black text-[17px] leading-none text-[#141210]">
              {mark}
            </p>
            <p className="mt-1 font-mono text-[9.5px] font-black uppercase tracking-[0.18em] text-[#6b6258]">
              {origin}
            </p>
            <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-[#141210]">
              {text}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 bg-[#f7f1e5] border-2 border-[#141210] border-l-8 border-l-[#e2602a] px-4 py-3 text-[11.5px] font-mono leading-relaxed text-[#141210]">
        Addressed to whoever arrives later. That is the oldest technology there is, and this
        record claims nothing newer. It is not conscious and it does not love you back. The
        people keeping it might.
      </p>
    </section>
  );
}