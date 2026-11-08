import React from 'react';

// ── THE LINE THE RECORD IS NAMED AFTER ─────────────────────────────────────────
// This block has been argued about twice, and both arguments were right.
//
// First it was printed plainly under her name — two lines of a song set as the record's
// own closing sentence, and on two other pages with no name on them at all. That is a
// borrow dressed as a thesis: the reader cannot tell where her thought stops and the
// record's starts, and a lyric with no credit is simply somebody else's words.
//
// Then it was taken out, which was tidy and gutless. The line is *why this thing is
// called a record of the time*. Removing it did not remove the debt, it only hid it.
//
// So it is put back as what it actually is: a quotation. Marked with quotation marks,
// set apart from the record's own voice, signed with her name, her song, her year, and
// followed in the same breath by the limit — she has not read this and has not agreed to
// it. A short quotation, attributed and framed as a quotation, is honest; a lyric used as
// your own closing statement is not, and the difference is entirely in whether the reader
// can see the seam between her voice and the record's.
//
// The design is the point of the honesty, not decoration: her two sentences are set in
// #cc2d2a — the red measured off her sleeve for O Superman, the only other thing the
// record ever took from her. So the two debts meet in one place and both are visible at a
// glance. Her words, her red, her name, and the limit said out loud under them.
export default function RecordEpigraph({ dark = false, compact = false, label = 'Quoted, not claimed' }) {
  const ink = dark ? '#efe7d6' : '#141210';
  const quiet = dark ? 'rgba(239,231,214,0.6)' : '#5a5246';
  const rule = dark ? 'rgba(239,231,214,0.22)' : 'rgba(20,18,16,0.22)';
  const red = '#cc2d2a';

  return (
    <figure className="mx-auto w-full max-w-[34rem] text-left">
      <div className="h-px w-full" style={{ backgroundColor: rule }} />

      <figcaption
        className="mt-3 text-[12px] font-mono uppercase tracking-[0.2em]"
        style={{ color: quiet }}
      >
        {label}
      </figcaption>

      <blockquote
        className={`mt-4 ${compact ? 'text-[17px] lg:text-[18px]' : 'text-[24px] lg:text-[31px]'} leading-[1.32]`}
        style={{ fontFamily: 'var(--font-reading)', color: ink, textWrap: 'pretty' }}
      >
        <span style={{ color: red }}>“</span>
        This is the time.{' '}
        <span style={{ color: red }}>And this is the record of the time.</span>
        <span style={{ color: red }}>”</span>
      </blockquote>

      <p
        className="mt-4 text-[12px] font-mono uppercase tracking-[0.14em]"
        style={{ color: quiet }}
      >
        Laurie Anderson <span style={{ color: red }}>·</span> From the Air{' '}
        <span style={{ color: red }}>·</span> Big Science, 1982
      </p>

      {/* ── THE PLAIN LINE, AND WHY IT HAD TO BE ADDED ────────────────────────────
          A reader met that quote with no way in. The founder himself, reading his own
          record back, called her "Maurice Anderson" — and when the person who built the
          page cannot hold the reference, no reviewer can either. A quotation that needs
          you to know a 1982 single before it means anything is not a quotation, it is a
          password.

          So the meaning is said here, in the record's own voice and its own reading size:
          what the line actually means, and what the record did with it. Nobody now has to
          know who she is to understand why the page is called what it is called. The debt
          itself — the red, the removal terms — is written in full under "What is owed",
          where it can be read as a debt rather than as a caption. */}
      <p
        className="mt-4 max-w-[54ch] text-[15px] leading-[1.6]"
        style={{ fontFamily: 'var(--font-reading)', color: ink }}
      >
        In plain words: the time is now, and this is the record of it. The record took its name
        from that second line, and she has not read this page — so it is a quotation, not an
        endorsement.
      </p>

      <div className="mt-4 h-px w-full" style={{ backgroundColor: rule }} />
    </figure>
  );
}