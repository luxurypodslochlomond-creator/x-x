import React from 'react';

// ── 01 · THE QUESTION ──────────────────────────────────────────────────────────
// Janine asked, on 28 November 2026, what the last couple of years of work had been.
// It has one source, and it has not changed: a record of the climate that nobody can buy.
// Everything after this band is an attempt at that, and the attempt is the only claim.
export default function WorkOpening() {
  return (
    <section className="work-band work-band--open">
      <p className="work-band-head"><span>01</span>The question it all comes from</p>
      <p className="work-standfirst">
        What would a public record of the climate look like if nobody could buy a line of it?
      </p>
      <p>
        That is the whole idea. Not a campaign, not a platform in the venture sense, not a
        company that will one day be sold. A place where a solution, a crisis or a drawing is
        published with its date, its source and the name of the hand that made it, and where
        the money that keeps it alive is printed in the open beside it, so the reader can check
        both.
      </p>
      {/* ── THE HEAT, SAID ONCE AND NOT SHOUTED ──
          Brian, 28 November: "we know planet needing help it's fucked bri she knows it so want
          to be activist feeling cause that's who we are". She does know. So the page does not
          tell her the planet is in trouble; it says the one thing she has not been able to say,
          which is that the counting is not the problem. */}
      <p>
        Nobody reading this needs to be told how bad it is. Janine has been counting it for
        thirty years and the count has not improved. What is missing is not more alarm. It is a
        place where the alarm can be checked, and where the hand that did the work is named.
      </p>
      <p>
        Two years of work went into making that true rather than saying it. Some of the result
        is a tool a person can use tonight. Some of it is a room a child can walk into without
        an account. Some of it is a page of arithmetic written for someone who will not take our
        word for anything. None of it is an advertisement, none of it ranks a person above
        another, and none of it keeps a child’s data.
      </p>
      <p>
        It is built by one family in Scotland, a community interest company that is asset-locked
        by law, and a machine that is named on the record and argues back. There is no office, no
        investor and no marketing budget. Everything below can be opened.
      </p>
    </section>
  );
}