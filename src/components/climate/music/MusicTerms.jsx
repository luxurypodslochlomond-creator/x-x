import React from 'react';

// ── THE TERMS OF THIS MUSIC RECORD ──────────────────────────────────────────────
// Four terms, not seven. The page had grown into a prospectus: a label, a body and a
// test for each of seven claims, plus a paragraph before and after explaining what the
// terms were for. A reader could not see the music for the arguing, which is the wrong
// way round on a page whose whole argument is that a gift needs no argument.
//
// So this is the short version: what the record promises, and one line per term on how
// a stranger can test it without trusting the page, the platform or a name on it. Nothing
// was dropped that a reader needs — free, uncounted, whole, and nobody studied are the
// promises a musician actually cares about, and the two that came off (the fingerprint
// and the presence mark) are still printed on the tracks themselves where they belong.

const TERMS = [
  {
    label: 'Free, and it stays free',
    body: 'No price, no account, no trial. No one can buy a place on this page.',
    check: 'There is no checkout and no field a payment could set.',
  },
  {
    label: 'Nothing is counted',
    body: 'No plays, no likes, no ranking. The order is the order the music was given.',
    check: 'Listen twenty times; nothing on the page changes.',
  },
  {
    label: 'The master is whole, the name stays on it',
    body: 'Stored exactly as it was handed over and served whole. The artist keeps their name and their rights; the record earns nothing from it.',
    check: 'Its format and length are read from the file itself, never typed in.',
  },
  {
    label: 'Nobody is studied here',
    body: 'Listening leaves nothing behind: no account, no email, no record of what you heard.',
    check: 'A listener is never asked who they are.',
  },
];

export default function MusicTerms() {
  return (
    <section className="mt-8 border-t-2 border-[#141210] pt-5">
      <div className="flex items-center gap-2 mb-3">
        <h2
          className="font-black uppercase text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2vw, 30px)', letterSpacing: '-0.025em' }}
        >
          What the record promises
        </h2>
        <div className="flex-1 h-px bg-[#141210]/20" />
        <span className="text-[10px] font-black font-mono text-[#e2602a]">{TERMS.length}</span>
      </div>

      <div className="space-y-2.5 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {TERMS.map((term, i) => (
          <div key={term.label} className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#e2602a] p-4 flex flex-col">
            <div className="flex items-start gap-2 mb-1.5">
              <span className="text-[10px] font-black font-mono text-[#e2602a] pt-[2px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[12px] font-black font-mono uppercase text-[#141210] leading-tight">{term.label}</h3>
            </div>
            <p className="text-[12px] font-mono text-[#141210] leading-relaxed">{term.body}</p>
            <p className="mt-auto pt-3 text-[10px] font-mono text-[#5a5246] leading-relaxed">
              <span className="font-black uppercase tracking-wider text-[#1e3a2b]">Check it</span>
              <span className="block mt-0.5">{term.check}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}