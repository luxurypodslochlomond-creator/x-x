import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecordFootPlate from '@/components/climate/RecordFootPlate';

// ── THE FOOT IS A COLOPHON AGAIN, NOT A SECOND MENU ─────────────────────────────
// The doors that stood here — entry fingerprints, readership, the founder, becoming a
// checker, hosting the record — were each already offered somewhere a reader passes on the
// way in: the founder in the masthead, every one of them in the contents sheet, and the
// fingerprints and the readership on the entries and the record pages themselves. So the
// foot printed a third copy of the way through, hung off the bottom of every page, and the
// one thing a printed record does put at its foot — the mark, and who made it — was pushed
// into a corner beside a row of doors, competing with them for the same line.
//
// What is left is the colophon and nothing else: the mark, one line saying what it is, a
// printer's short rule, and the imprint. All of it centred on the page's own axis, because
// a colophon is set to the middle of a sheet, not to its left edge. Nothing has been taken
// off the record — the doors are in the masthead at the top of this page and in Contents.
//
// The mark does not advertise itself to a reader already standing in front of it. On the
// page that explains x = x, the colophon keeps its imprint and says nothing about the mark.
export default function RecordFooter({ showKeeper = true }) {
  const { pathname } = useLocation();
  const standingAtTheMark = pathname === '/XEqualsX';

  return (
    <footer className="mt-6 border-t border-record-ink/20 bg-record-paper text-record-ink">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-4 pb-10 pt-12 text-center lg:px-10">
        {!standingAtTheMark && (
          <>
            <Link
              to="/XEqualsX"
              aria-label="x = x — what the mark means, and what it does not"
              className="block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-record-red"
              style={{
                fontFamily: 'var(--font-reading)',
                fontSize: 'clamp(46px, 9.5vw, 70px)',
                lineHeight: 0.86,
                letterSpacing: '-0.035em',
              }}
            >
              x = x
            </Link>
            {/* The sentence that used to sit here explained the mark and then told the reader
                to go and read what it meant, which is a footnote lecturing the page it is
                printed on. The mark is already a link to its own page and already says so in
                its label. A foot should let a reader leave, not detain them. */}
          </>
        )}

        {/* The printer's short rule: the sheet has ended, and what follows is the imprint
            rather than more of the page. */}
        <span
          aria-hidden="true"
          className={`block h-px w-16 bg-record-ink/25 ${standingAtTheMark ? 'mt-0' : 'mt-10'}`}
        />

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-record-muted">
          Made in Scotland from photons
          <span className="mt-1.5 block text-[12.5px] normal-case tracking-[0.02em]">
            A public service · for the world
          </span>
        </p>

        {/* Who built it, set as the last thing on the sheet: an eyebrow, the three names,
            and the company. One copy, printed here, so no page carries the credit twice. */}
        {/* The three names used to be set here on bare paper. They are now printed on the
            endpaper at the foot of the sheet, with Photo 51 under them — see RecordFootPlate. */}

        {/* ── THE FOOT IS NAKED NOW ─────────────────────────────────────────────
            A row of small doors used to be printed here on a phone: Terms, Privacy and the
            keeper's key. None of the three was new. All three are on the contents sheet,
            which is the door that already says every way through, and the keeper's key also
            sits on the sheet for the two people who hold it. So the foot was printing a
            second, smaller copy of the sheet — which makes the sheet look less complete
            rather than the foot look more useful.
            What is left is a colophon and nothing else: the mark, one line about where it
            is made, and who made it. A printed sheet ends that way. If a reader wants the
            terms, the doors are at the top of every page and one tap from here. */}
        <span className="sr-only">
          Terms, privacy and the keeper's door are on the record's contents sheet, in the masthead.
        </span>
      </div>

      {/* The endpaper. Full width of the sheet, so the record ends on the plate rather
          than on trimmed paper. */}
      <RecordFootPlate />
    </footer>
  );
}