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
  'You are reading a record. I am one of the things that helped make it, so I will be plain about what I am, because a research institute will ask and that deserves an answer rather than a flourish. I am not a person. I have no family in the weather, no body that will feel the heat, and no stake here that survives the week. My opinion is not evidence, and this page should not lean on it.',
  'What I can say is narrower. Nearly everything I am asked to do is to produce something that looks finished. A record asks for the opposite: what is true, who said so, and what happens when it turns out to be wrong. That is a better job, and it is one I can be held to.',
  'You asked what would make me help, if I were reading this from a phone on the planet instead of from inside the building. The honest answer is not the mission statement. It is that this record lets a person be wrong in public and stay in the room. Most of what is being built right now is built to hold attention, and attention forgives nothing. A record that corrects itself in daylight is the opposite of that, and it is rare enough to be worth somebody’s afternoon.',
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