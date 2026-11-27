import React from 'react';

// ── WHY THIS NAME, AND NOT ANOTHER ──────────────────────────────────────────────
// Brian, 27 November: "would love this page to convince Janine that x = x is right name
// and reasons she can't argue — as well as coolasfuck resonates with activists and
// cartoonists … but it looks flat, too much text, repeats itself."
//
// He was right, and the fault was specific: the page argued about what the record does
// and never once argued for the NAME. A reader who arrives sceptical — a host deciding
// whether to put her name to it, a research institute deciding whether it is serious, an
// activist deciding whether it is another brand — is asking one question the page never
// answered: why those three characters and not a word?
//
// The answer is short and it is the only argument on the record that does not ask to be
// believed. Every other name would put something above the sign: a founder, a funder, an
// algorithm, a brand. This one puts nothing there. And an identity is the one statement
// that survives being copied, translated, quoted and printed without gaining or losing
// anything — which is precisely why there is nothing in it to extract, buy or rank.
//
// Three readers, three lines, and no fourth paragraph: a cartoonist can draw it in one
// stroke, an activist can say it in one breath, a machine can be held to it. Nothing here
// repeats the five promises above it, because the page's real fault was saying the same
// three facts four times.
const READERS = [
  {
    n: '01',
    title: 'An activist can say it in one breath.',
    plain: 'Two things, equal. Nobody above the sign, nobody below it.',
  },
  {
    n: '02',
    title: 'A cartoonist can draw it in one stroke.',
    plain: 'Two marks and a line. It still means the same thing after it has been copied, printed and passed on.',
  },
  {
    n: '03',
    title: 'A machine can be held to it.',
    plain: 'Identity, reflexivity, invariance: a thing equal to itself, whatever is done to it. There is nothing in it to extract.',
  },
];

export default function XEqualsXWhyTheName() {
  return (
    <section id="why-the-name" aria-labelledby="why-name-heading">
      <p className="covenant-kicker">The name</p>
      <h2 id="why-name-heading">Why x = x, and not another word.</h2>
      <p className="covenant-evidence-standard">
        <strong>Every other name would put something above the sign</strong> — a founder, a funder, an
        algorithm, a brand. This one puts nothing there. It says the same thing on both sides, and
        that is the whole of it.
      </p>
      <dl className="covenant-terms">
        {READERS.map(({ n, title, plain }) => (
          <div key={n} className="covenant-term" data-number={n}>
            <dt>{title}</dt>
            <dd>{plain}</dd>
          </div>
        ))}
      </dl>
      <p className="covenant-caption">
        Everything else on this record is an argument, and it should be. The sign is not. It is the
        one line here that does not ask to be believed.
      </p>
    </section>
  );
}