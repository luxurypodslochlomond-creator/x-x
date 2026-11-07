import React from 'react';

// ── WHAT IS OWED ───────────────────────────────────────────────────────────────
// Two debts on this page are owed to people who never agreed to be on it, so they are
// stated for one reason each and nothing more is claimed.
//
// The temptation with a page like this is to start thanking everybody it admires, and
// that is exactly the noise this page is built to refuse: a name dropped in gratitude
// is still a name dropped. So each debt is named with the one concrete thing that was
// actually taken or learned, the limit of that debt, and what happens if the person
// would rather not be here.
//
// Laurie Anderson: one measured number, her red. Nothing else.
// Lou Reed: a habit of saying a thing once, plainly, and then stopping. Nothing quoted,
// nothing imitated — plainness is not a thing anybody can own, which is the honest way
// to put it, and the only reason he belongs on this page at all.
//
// Neither of them made this record, was asked, or agrees with it. That sentence is the
// whole difference between a thank-you and an implication.

function Debt({ name, reason, children }) {
  return (
    <div className="border-l-2 border-l-record-mark pl-3">
      <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#141210]">
        {name}
        <span className="font-mono font-normal normal-case tracking-normal text-[#5a5246]">
          {' '}— {reason}
        </span>
      </p>
      <p className="mt-1.5 font-mono text-[12.5px] leading-relaxed text-[#141210]">{children}</p>
    </div>
  );
}

export default function XEqualsXThanks() {
  return (
    <section aria-labelledby="what-is-owed" className="pb-7 border-b-2 border-[#141210]">
      <div className="border-2 border-[#141210] bg-[#f7f1e5] shadow-[5px_5px_0_0_rgba(20,18,16,0.14)]">
        <div className="flex items-center justify-between gap-2 border-b border-[#141210]/20 px-3.5 py-2">
          <h2
            id="what-is-owed"
            className="text-[12px] font-black font-mono uppercase tracking-[0.2em] text-[#5a5246]"
          >
            What is owed
          </h2>
          <span className="text-[12px] font-black font-mono uppercase tracking-[0.16em] text-[#b3261e]">
            Thanks, stated
          </span>
        </div>

        <div className="px-4 py-4 space-y-3.5">
          <p className="font-mono text-[12.5px] leading-relaxed text-[#141210]">
            Two people are thanked here, and each for one thing only. Both were taken from,
            or learned from, without being asked first — so the debt is written down rather
            than assumed, and it stops where the actual debt stops.
          </p>

          <Debt name="Laurie Anderson" reason="for the red">
            #CC2D2A is measured off her sleeve for O Superman (1982) and is the only thing on
            this page that came from somebody else’s work. Nothing else of hers is used, quoted
            or redrawn. If she would rather the colour or her name came off, both come off the
            same day — and the taking-off is printed here, not done quietly.
          </Debt>

          <Debt name="Lou Reed" reason="for saying it once">
            He is the reason this page says a thing in ordinary words and then stops, with no
            decoration standing in where a thought should be. Nothing of his is quoted,
            borrowed or imitated on this record — the debt is to plainness, and plainness is
            not a thing anybody can own.
          </Debt>

          <p className="border-t border-[#141210]/20 pt-3 font-mono text-[12px] leading-relaxed text-[#5a5246]">
            Thanks are not a claim of connection. Neither of them made this record, was asked
            to, or agrees with a word of it.
          </p>
        </div>

        <div className="border-t border-[#141210]/20 px-3.5 py-2">
          <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-[#5a5246]">
            Named for the debt only · no endorsement implied
          </p>
        </div>
      </div>
    </section>
  );
}