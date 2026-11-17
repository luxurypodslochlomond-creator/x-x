import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <footer className="mt-6 border-t-4 border-cartoon-sun bg-record-paper pb-14 pt-12 text-center font-body text-record-ink lg:pb-16">
      <div className="px-4 lg:px-10">
        <Link
          to="/XEqualsX"
          aria-label="x = x — what the mark means, and what it does not"
          className="inline-block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-record-red"
          style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(46px, 9.5vw, 70px)', lineHeight: 1, letterSpacing: '-0.035em' }}
        >
          x = x
        </Link>

        {/* ── TWO DATES, SIDE BY SIDE ────────────────────────────────────────────────
            Brian, 17 November: "add 2026 like Laurie Anderson sentence." The borrowed
            sentence above is dated 1982 because that is when she said it; this record is
            dated 2026 because that is when it is being kept. Both chips, same voice, same
            band — so the year a reader is reading in is stated as plainly as the year the
            sentence came from, and neither can be mistaken for the other. */}
        <p className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-block bg-cartoon-sun px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-record-ink">
            Laurie Anderson · “From the Air” · Big Science, 1982
          </span>
          <span className="inline-block border border-record-ink/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-record-ink/85">
            This record of the time · 2026
          </span>
        </p>
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
      <div className="mt-10 bg-cartoon-sun px-4 py-7 lg:px-10">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-record-ink/65 lg:text-[10px]">
          Platform / Record
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
        <ul className="mt-4 flex flex-col items-center gap-1.5 font-mono text-[12px] uppercase leading-tight tracking-[0.18em] text-record-ink sm:flex-row sm:justify-center sm:gap-5 lg:text-[13px]">
          <li>Base 1</li>
          <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-record-ink/35 sm:block" />
          <li>Gillian Brown</li>
          <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-record-ink/35 sm:block" />
          <li>Brian Hughes</li>
        </ul>

        {/* ── THE COMPANY, IN THE SAME BOX AND THE SAME HAND ───────────────────────
            Brian, 17 November: "put UNIVERSAL FREQUENCY 51 CIC in yellow box under me you
            and Gillian please, and remove our email address, and make the link go email or
            WhatsApp." So the name of the company sits under the three names it belongs to,
            in the same mono caps, and it is the thing you press rather than an address
            printed in the open: a reader taps the company and their own mail app opens,
            already addressed. Nothing on this page now spells the address out for a
            scraper to collect. */}
        <a
          href="mailto:family@uf51.love"
          className="mt-5 inline-block border-b border-record-ink/45 pb-0.5 font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-record-ink transition-colors hover:border-record-red hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red lg:text-[11px]"
        >
          Universal Frequency 51 CIC
        </a>
      </div>
    </footer>
  );
}