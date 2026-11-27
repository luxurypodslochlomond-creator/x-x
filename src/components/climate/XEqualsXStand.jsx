import React from 'react';

const CASE_SOURCE = 'https://www.selendygay.com/news/general/2026-06-25-meta-sued-over-surveillance-and-gag-order-silencing-whistleblower-sarah-wynn-williams';

// ── THE WORLD WE ARE IN, SAID WITHOUT A LECTURE ────────────────────────────────
// Brian, 27 November: "can't point out Facebook … all the platforms doing this with ads".
// He is right, and naming one company would have made the argument smaller than it is. The
// trade is the industry's, not one firm's: attention sold to advertisers, and a feed that
// gives you what holds you rather than what helps you. Facebook is the example everybody
// already knows, so it is used as one — in the case note, where it belongs, and nowhere else.
//
// The case itself is written carefully, because a real person is inside it. She is named
// because she is named in public; the page says what she alleges, says plainly that these
// are allegations, and does not speak for her or turn her into a poster.
export default function XEqualsXStand() {
  return (
    <section className="covenant-world" aria-labelledby="the-world">
      <p className="covenant-kicker">The world we are in</p>
      <h2 id="the-world">The planet is not short of information.<br />It is short of a record.</h2>
      <ul className="covenant-world-lines">
        <li>
          <strong>Every big platform runs on the same trade.</strong>
          Attention sold to advertisers. The longer you stay, the more it earns — so the feed shows what holds you, not what helps you.
        </li>
        <li>
          <strong>So the work goes missing.</strong>
          A crisis becomes a clip. A working solution is gone by Thursday. The people best placed to act never see what already exists.
        </li>
        <li>
          <strong>Extraction is not only of forests and water.</strong>
          It is of attention, of evidence, and of the time people need to act on either. The planet is not losing for lack of facts. It is losing because the facts do not reach the people with the power to move.
        </li>
      </ul>
      <aside className="covenant-case" aria-label="A named example, in the open">
        <p className="covenant-case-label">What speaking up can cost</p>
        <p>Sarah Wynn-Williams, a former Facebook public-policy director, sued Meta in June 2026. She alleges the company surveilled her and used a private arbitration gag order to silence her. She is represented by Selendy Gay and Katz Banks Kumin.</p>
        <a href={CASE_SOURCE} target="_blank" rel="noopener noreferrer">Read the announcement, 25 June 2026 ↗<span className="sr-only"> (opens a new tab)</span></a>
        <p className="covenant-case-small">Allegations in a live case, not findings — and not one company’s fault alone. We name it because it shows the scale of what people are up against, not to speak for her.</p>
      </aside>
    </section>
  );
}