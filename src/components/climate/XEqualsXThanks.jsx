import React from 'react';

// ── WHAT IS OWED ───────────────────────────────────────────────────────────────
// Two debts on this page are owed to people who never agreed to be on it, so each is
// stated for one reason and nothing more is claimed.
//
// The temptation here is to thank everybody the page admires, and that is exactly the
// noise the rest of the page refuses: a name dropped in gratitude is still a name dropped.
// So each debt carries the one concrete thing taken or learned, the limit of that debt,
// and what happens if the person would rather not be named.
//
// It was built as a framed box with an all-caps label at each end, a red rule down the
// side of each name and a line at the foot. Four devices for two sentences. Hairlines now,
// and the names carry themselves.

function Debt({ name, reason, children }) {
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span
          className="text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: '17px', lineHeight: 1.3 }}
        >
          {name}
        </span>
        <span className="font-mono text-[12.5px] text-[#5a5246]">{reason}</span>
      </p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

export default function XEqualsXThanks() {
  return (
    <section aria-labelledby="what-is-owed" className="pb-9 border-b border-[#141210]/15">
      <h2 id="what-is-owed" className="font-mono text-[12.5px] tracking-[0.06em] text-[#5a5246]">
        What is owed
      </h2>

      <p className="mt-3">
        Two people are thanked here, each for something specific. Both were learned from without
        being asked first, so the debt is written down rather than assumed, and it stops where
        the actual debt stops.
      </p>

      <div className="mt-6 space-y-5">
        <Debt name="Laurie Anderson" reason="for the red, and for the name">
          #CC2D2A is measured off her sleeve for O Superman (1982). The phrase the record is
          named after — “the record of the time” — is hers too, from <em>From the Air</em> on{' '}
          <em>Big Science</em>. Those two things, one colour and five words used as a name, are
          the whole of what has been taken.
          {' '}Her lyrics are not printed anywhere on this record. A line of somebody’s song set
          as the record’s own closing sentence is a borrow, however neatly it is signed, so the
          pages that used to carry it now say the sentence in their own voice and credit the
          naming here instead. If she would rather the colour or the name came off, both come
          off the same day, and the taking-off is printed on this page rather than done quietly.
        </Debt>

        <Debt name="Lou Reed" reason="for saying it once">
          He is the reason this page says a thing in ordinary words and then stops, with no
          decoration standing in where a thought should be. Nothing of his is quoted, borrowed
          or imitated on this record. The debt is to plainness, and plainness is not a thing
          anybody can own.
        </Debt>
      </div>

      <p className="mt-6 border-t border-[#141210]/20 pt-4 text-[#5a5246]">
        Thanks are not a claim of connection. Neither of them made this record, was asked to,
        or agrees with a word of it.
      </p>
    </section>
  );
}