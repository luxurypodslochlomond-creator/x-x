import React from 'react';

// ── THE MARK, IN THE MIDDLE OF THE PAGE ────────────────────────────────────────
// The covenant sat in the top corner as a small label beside a heading, which made the one
// line the whole record rests on the quietest thing in it. It is now what the page opens
// with: the mark at the size a mark takes, centred, in the record's borrowed red, with the
// sentence it means underneath and nothing competing with it.
//
// The copy is written to be passed on. It has to land with a reader who has never heard of
// this record and already knows, in their gut, that something is wrong with a model that
// takes the work and loses the name. So it says the whole thing in two short paragraphs and
// one closing line — and every claim in it is one the rest of this page actually holds up:
// a source you can open, a correction you can see, a name kept on the work. No slogan the
// machinery underneath cannot carry.
//
// The last line is the honest limit, and it is printed, not buried: x = x is a principle
// this record chooses, not a scientific finding. A reader who disagrees with it is owed
// that sentence in the same breath as the claim.
export default function XEqualsXOpening() {
  return (
    <section aria-labelledby="the-terms" className="pb-9 pt-5 text-center">
      <div
        role="img"
        aria-label="x equals x"
        className="select-none text-record-mark"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(64px, 23vw, 120px)',
          lineHeight: 0.92,
          letterSpacing: '0.01em',
        }}
      >
        x&nbsp;=&nbsp;x
      </div>

      <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-record-mark">
        The principle
      </p>

      <h1
        id="the-terms"
        className="mx-auto mt-5 max-w-[16ch] text-[30px] leading-[1.08] text-record-ink lg:text-[42px]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Nobody above anybody.
      </h1>

      <div className="mx-auto mt-6 max-w-[38ch] space-y-4">
        <p>A solution is a solution. An action is an action. A person is a person.</p>
        <p>
          Nothing here is ranked by who shouts loudest, or lifted because somebody paid. Every
          entry stands on the same ground: a source you can open, a correction you can see, and a
          name kept on the work that made it.
        </p>
      </div>

      <p className="mx-auto mt-6 max-w-[34ch] italic text-record-muted">
        This is what the opposite of an extraction model looks like. It does not mine the reader,
        and it does not lose the name.
      </p>

      <p className="mx-auto mt-5 max-w-[34ch] font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">
        A principle we choose, not a scientific finding
      </p>

      <p className="mt-8 border-t border-record-ink/15 pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-record-muted">
        For Janine · for the planet · for all of us
      </p>
    </section>
  );
}