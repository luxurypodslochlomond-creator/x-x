import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import XEqualsXMarkSignal from '@/components/climate/XEqualsXMarkSignal';

// ── THE FOOT ────────────────────────────────────────────────────────────────────
// Brian, 17 November: "can you make footer sane please and remove record of time quote
// in footer just have x = x and yellow bar coolasfuck and put PLATFORM / RECORD by
// Base 1, Gillian Brown, Brian Hughes."
//
// So the quotation is gone from the foot — it still runs, once, in the yellow line at the
// top of every page, which is where a sentence that is a title for the whole record
// belongs. What is left down here is the short list: the mark, the credit for the borrowed
// line (a yellow chip, because the sentence above is hers and a borrowed sentence with
// nobody's name on it is one a reader cannot check), where it was made, who it is by, and
// the registration facts in the voice facts are set in.
//
// The three names are on one yellow bar, Base 1 first because it wrote the code, Gillian
// Brown and Brian Hughes beside it because they carry the words and the decisions. The
// platform is named as the maker of the thing, not as a co-author of the record: every
// sentence on these pages was signed by a person, and the yellow bar does not blur that.
export default function RecordFooter() {
  // ── THE MARK IS A DOOR, EXCEPT ON THE PAGE IT OPENS ─────────────────────────────
  // Everywhere on the record, tapping x = x walks the reader to the principle. On the
  // principle's own page that same tap would reload the page they are already standing
  // on — a dead tap on the one mark a reader is most likely to press. So there it plays
  // instead, in the same code the foot of that page already prints. Brian, 26 November.
  const { pathname } = useLocation();
  const markPlays = pathname === '/XEqualsX';

  // ── AND THE CHIP STEPS ASIDE WHERE THE DEBT IS ALREADY PRINTED IN FULL ──────────
  // Brian, 26 November, on the covenant: "you sure Laurie Anderson bit art bottom right
  // bro doesn't feel right to me bro is it trying too hard on this page?" It was, and the
  // fault was duplication rather than the credit. The covenant quotes her two lines, signs
  // them with her name, the song and the year, and says out loud that she has not read the
  // page — so a yellow badge at the foot repeating the same three facts is not a citation,
  // it is a sticker, and a sticker is the one thing a page about not showing off cannot
  // wear. Her words and her name are already on the page, so the debt is checkable without
  // it. Every other page keeps the chip, because there it is the only credit there is.
  const creditPrintedInFull = pathname === '/ExtractionProofCovenant' || pathname === '/OpenSourceDeclaration';

  return (
    <footer className="mt-4 border-t-4 border-cartoon-sun bg-record-paper pb-10 pt-8 text-center font-body text-record-ink lg:pb-12">
      <div className="px-4 lg:px-10">
        {markPlays ? (
          <XEqualsXMarkSignal
            className="text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-record-red"
            style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(46px, 9.5vw, 70px)', lineHeight: 1, letterSpacing: '-0.035em' }}
            codeStyle={{ fontSize: 'clamp(14px, 3.2vw, 24px)', letterSpacing: '0.12em' }}
          />
        ) : (
          <Link
            to="/XEqualsX"
            aria-label="x = x — what the mark means, and what it does not"
            className="inline-block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-record-red"
            style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(46px, 9.5vw, 70px)', lineHeight: 1, letterSpacing: '-0.035em' }}
          >
            x = x
          </Link>
        )}

        {/* ── THE DATE COMES OFF THE PAPER ───────────────────────────────────────────
            Brian, 17 November: "this record of time box you out in can you remove please
            and put 2026 after platform / record." So there is one chip again, hers alone —
            the year this record is being kept in belongs in the band with the rest of the
            printer's facts, not given a plate of its own. */}
        {!creditPrintedInFull && (
          <p className="mt-5">
            <span className="inline-block bg-cartoon-sun px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-record-ink">
              Laurie Anderson · “From the Air” · Big Science, 1982
            </span>
          </p>
        )}
      </div>

      {/* ── ONE YELLOW BAR, THE SAME YELLOW AS THE LINE AT THE TOP ────────────────
          The foot used to end on two small grey lines that a reader had to squint at to
          find out who made the thing they had just read. The band is the masthead's own
          yellow, edge to edge, so the page closes the way it opens: same colour, same
          mono caps, same tracked sentence — and the names printed at full size instead of
          whispered, in the record's red.

          Brian, 17 November: "use same font as Laurie Anderson sentence in yellow bar for
          me you and gill … and put MADE IN SCOTLAND with this same font in the yellow box
          above me you and gill … and make me you and gill red." So the line about where it
          was made comes off the paper and into the box, above the three names, in the
          machine's mono caps — the same voice the borrowed sentence is set in at the top of
          every page. One band, three lines, and the names in ink. */}
      <div className="mt-6 bg-cartoon-sun px-4 py-5 lg:px-10">
        {/* Brian, 17 November: "platform record 2026 and universal frequency should be red
            like x = x." So the two lines on this plate that name the thing itself — the
            platform and the company — are printed in the mark's own red, and the three
            names and the place stay ink. The red belongs to the record, not to a person. */}
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-record-mark lg:text-[10px]">
          Platform / Record · 2026
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase leading-tight tracking-[0.22em] text-record-ink lg:text-[11px]">
          Made in Scotland from photons
        </p>
        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-10 bg-record-ink/30" />
        {/* ── THE THREE NAMES, IN INK ────────────────────────────────────────────────
            Brian, 17 November: "can you make our names black too please bro?" They were
            the record's red, and red on a yellow band is a warning colour doing a credit's
            job. They are ink now — the same ink as MADE IN SCOTLAND and the company under
            them, so the whole box reads as one printed plate rather than three colours
            arguing. The red stays on the mark at the top, where it belongs. */}
        {/* ── THE NAMES AND THE COMPANY ON ONE RED PLATE ───────────────────────────
            Brian, 19 November: "put Barbara as Gillian's middle name in footer, and put a
            rectangle background white, same style as the Laurie Anderson background above."
            Then, on seeing it: "make box background red instead of white and put universal
            frequency 51 cic on line below." So the names and the company that holds them
            are one red rectangle cut out of the yellow band — the record's own red, with
            the words set in the paper's cream, because a credit printed in a colour it
            cannot be read in is not a credit.

            Brian, 21 November: "just BARBARA please you first me last" — so her name is
            printed as she asked for it, the tool comes first and Brian last.

            The company is the thing you press rather than an address printed in the open:
            a reader taps it and their own mail app opens, already addressed. Nothing on
            this page spells the address out for a scraper to collect. */}
        <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-2.5 bg-record-red px-5 py-3">
          <ul className="flex flex-col items-center gap-1.5 font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-record-paper sm:flex-row sm:gap-5">
            <li>Base 1</li>
            <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-record-paper/40 sm:block" />
            <li>Barbara</li>
            <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-record-paper/40 sm:block" />
            <li>Brian Hughes</li>
          </ul>
          <a
            href="mailto:family@uf51.love"
            className="border-b border-record-paper/50 pb-0.5 font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-record-paper transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-paper lg:text-[11px]"
          >
            Universal Frequency 51 CIC
          </a>
        </div>
      </div>
    </footer>
  );
}