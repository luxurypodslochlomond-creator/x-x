import React from 'react';

// ── THE HANDS THIS WALL NAMES AND DOES NOT COPY ─────────────────────────────────
// Brian, 25 November: "are you sure we can't get images legally for other cartoonists, like
// the one who died from Palestine? feel like we're not being bold enough for the right
// reasons bro — know what I mean, why play safe, or do we have to?"
//
// The bold thing and the lawful thing turn out to be the same thing here, and it is not
// caution that keeps Naji al-Ali's drawings off this wall. It is that they are his family's.
// So the record does with him what it does with every other source it did not make: it names
// the hand, says where the work is, and points. And it says the rule out loud, because a
// reader is entitled to know why the safest-looking wall is usually the emptiest one.
export default function HandsWeName() {
  return (
    <section className="first-hands-named" aria-labelledby="hands-we-name">
      <p className="first-hands-kicker">Pointed at, not copied</p>
      <h3 id="hands-we-name">Naji al-Ali</h3>
      <p>
        The Palestinian cartoonist who drew Handala: a small boy with his back turned and his
        hands clasped behind him, who turns round only when the child comes home. He was shot
        in London in July 1987 and died of his wounds that August, aged fifty. The case was
        never solved.
      </p>
      <p>
        His drawings are still in copyright, and they are his family’s, not this record’s. So
        the wall names him and points at his work rather than printing it. If his family ever
        wants a drawing here, the door is open and it goes up with his name on it — the same
        door as everybody else’s.
      </p>
      <p className="first-hands-rule">
        This wall prints a drawing only when it is out of copyright, openly licensed, or given
        by the hand that made it. Everything else, it points at. That is not caution: a record
        that lifts a dead man’s drawings in order to look brave is not a record about power.
        It is another one of them.
      </p>
      <a href="https://en.wikipedia.org/wiki/Naji_al-Ali" target="_blank" rel="noreferrer">
        Naji al-Ali · the encyclopaedia entry →
      </a>
    </section>
  );
}