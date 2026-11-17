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

        <p className="mt-7">
          <span className="inline-block bg-cartoon-sun px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-record-ink">
            Laurie Anderson · “From the Air” · Big Science, 1982
          </span>
        </p>

        <p
          className="mt-9 text-record-mark uppercase"
          style={{ fontFamily: 'var(--font-reading)', fontSize: 13, lineHeight: 1.4, letterSpacing: '0.22em' }}
        >
          Made in Scotland from photons
        </p>
      </div>

      {/* ── ONE YELLOW BAR, THE SAME YELLOW AS THE LINE AT THE TOP ────────────────
          The foot used to end on two small grey lines that a reader had to squint at to
          find out who made the thing they had just read. The band is the masthead's own
          yellow, edge to edge, so the page closes the way it opens: same colour, same
          mono caps, and the names printed at full size instead of whispered. */}
      <div className="mt-10 bg-cartoon-sun px-4 py-7 lg:px-10">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-record-ink/65 lg:text-[10px]">
          Platform / Record
        </p>
        <ul className="mt-4 flex flex-col items-center gap-1.5 font-mono text-[12px] uppercase leading-tight tracking-[0.18em] text-record-ink sm:flex-row sm:justify-center sm:gap-6 lg:text-[13px]">
          <li>Base 1</li>
          <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-record-mark sm:block" />
          <li>Gillian Brown</li>
          <li aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-record-mark sm:block" />
          <li>Brian Hughes</li>
        </ul>
      </div>

      <div className="px-4 lg:px-10">
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-record-ink">
          Universal Frequency 51 CIC
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          <a
            href="mailto:family@uf51.love"
            className="text-record-mark underline decoration-dotted underline-offset-4 transition-colors hover:text-record-red"
          >
            family@uf51.love
          </a>
        </p>
      </div>
    </footer>
  );
}