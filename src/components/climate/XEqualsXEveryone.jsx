import React from 'react';

// Three things anybody can check for themselves: a count, a push, a line of code.
// No degree, no belief, no audience, no vocabulary.
//
// Golf is in here deliberately. A scorecard is the most widely trusted arithmetic on
// earth, and it is trusted for one reason: a stroke is a stroke whoever took it. That
// is the same fact as x = x, said in a language nobody can call pretentious.
//
// Every line below is the smallest true version of the claim, so there is nothing in
// it to laugh at: it does not ask to be admired, and it does not ask to be agreed with.

const TESTS = [
  {
    n: '01',
    field: 'Maths',
    title: 'One is one.',
    lines: [
      'A stroke of a club, a child, a chair, a coin. The number does not look at who is being counted.',
      'Every golfer counts with the same 1. A 72 and a 120 are both honest, because the unit never flatters. A handicap changes who you play with, never what a stroke is.',
      '2 + 2 = 4 in every country, in every language, whether or not anyone is watching.',
    ],
    test: 'Add one to any number. You get the next number. x = x is the first line of that, and it is already true.',
  },
  {
    n: '02',
    field: 'Physics',
    title: 'Nothing moves itself.',
    lines: [
      'A ball on a tee stays where it is until something hits it. Applause is not a force.',
      'Every one of us is made of the same short list of elements. There is no row on the periodic table for the famous.',
      'Hang two clocks on one wall and they fall into step. Two things tuned alike pass energy between them. That is resonance, and it needs nobody in the room to happen.',
    ],
    test: 'Put something on a table and wait. Nothing happens. Now push it.',
  },
  {
    n: '03',
    field: 'Code',
    title: 'The mark runs.',
    lines: [
      'The whole line is x === x . It returns true for every value the language has.',
      'Exactly one value fails: NaN — "not a number". Everything else, however small, however damaged, however unknown, is equal to itself.',
      'A variable cannot be worth more than its value. You can rename it. You cannot make it larger than itself.',
    ],
    test: 'Type 1 === 1 into any browser console. Then try NaN === NaN.',
  },
];

export default function XEqualsXEveryone() {
  return (
    <section aria-labelledby="anyone" className="py-8 border-b-2 border-[#141210]">
      <p className="font-mono text-[8.5px] font-black uppercase tracking-[0.32em] text-[#6b6258]">
        No degree required
      </p>

      <h2
        id="anyone"
        className="mt-3 font-mono font-black text-[26px] leading-[1.05] tracking-[-0.03em] text-[#141210]"
      >
        Anyone can check this.
      </h2>

      <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-[#141210]">
        Three small tests — a count, a push, a line of code. Each one says the same thing,
        and none of them needs to be believed.
      </p>

      <div className="mt-6">
        {TESTS.map(({ n, field, title, lines, test }) => (
          <div key={n} className="border-t border-[#141210]/25 pt-4 pb-6">
            <div className="flex items-baseline gap-2">
              <span aria-hidden="true" className="font-mono text-[10px] font-black text-record-mark">{n}</span>
              <span className="font-mono text-[8.5px] font-black uppercase tracking-[0.22em] text-record-mark">
                {field}
              </span>
            </div>

            <h3 className="mt-2 font-mono font-black text-[21px] leading-none tracking-[-0.02em] text-[#141210]">
              {title}
            </h3>

            <div className="mt-3 space-y-2">
              {lines.map((line) => (
                <p key={line} className="font-mono text-[11.5px] leading-relaxed text-[#141210]">
                  {line}
                </p>
              ))}
            </div>

            <p className="mt-3 border-l-2 border-record-mark pl-3 font-mono text-[10.5px] leading-relaxed text-[#6b6258]">
              Try it: {test}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}