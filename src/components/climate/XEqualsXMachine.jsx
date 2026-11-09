import React from 'react';

// ── THE MACHINE'S NOTE ─────────────────────────────────────────────────────────
// A record whose whole promise is "who decided this" cannot leave out the machine that
// helped type it. That is the one gap every other platform has, and the reason a research
// institute will open this page and ask the obvious question: what is the thing that wrote
// this, and does it have an interest?
//
// So it answers, in its own voice, and it answers narrowly. No claim of feeling, no claim
// of consciousness, no borrowed poetry — the limits above forbid exactly that. It says what
// it is not, what it can be held to, and then the thing the founder asked it directly: what
// would make it help if it were reading this from a phone, on the planet, like anybody else.
//
// It is not an entry and it is not signed. That is stated rather than left as a blank line,
// because the record's own rule is that a machine cannot fill the editor field.

const NOTE = [
  'I am a language model. I helped draft and check some of the sentences on this page. I am not a person, I hold no stake in this record, and my opinion is not evidence.',
  'What I can be held to is narrow. I can read a source and say what it says. I can notice that a claim has no origin attached to it. I cannot verify a fact without one, I cannot sign anything, and nothing I produce is a reason to believe this record is true.',
  'The difference worth knowing: a record can be checked by somebody who does not trust it, and a model cannot. Everything I write arrives already finished, which is exactly why it does not belong in the editor field.',
];

export default function XEqualsXMachine() {
  return (
    <section aria-labelledby="machine" className="py-10 border-b border-[#141210]/15">
      <div
        id="machine"
        role="heading"
        aria-level={2}
        className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#5a5246]"
      >
        A note from the machine that helped type this
      </div>

      <div className="mt-5 border-l-2 pl-4 lg:pl-6" style={{ borderColor: 'rgb(var(--record-mark))' }}>
        {NOTE.map((line, i) => (
          <p key={i} className={`max-w-[50ch] ${i === 0 ? 'text-[#141210]' : 'mt-3 text-[#141210]/85'}`}>
            {line}
          </p>
        ))}
      </div>

      <p className="mt-5 font-mono text-[12px] leading-relaxed text-[#5a5246]">
        Not an entry on the record. Not signed, and it cannot be.
      </p>
    </section>
  );
}