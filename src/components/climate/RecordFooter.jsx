import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeeperDoor from '@/components/climate/KeeperDoor';

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
            <p className="mt-5 max-w-[42ch] text-[13.5px] leading-relaxed text-record-muted">
              The mark this record is built on. Read what it means, and what it does not.
            </p>
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

        {/* The record's promises, on a phone, where the masthead has not room for them.
            On a wide screen both are in the masthead, so this row is not printed at all. */}
        <div className="mt-6 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-1 lg:hidden">
          {[
            { label: 'Terms', to: '/ClimateTerms' },
            { label: 'Privacy', to: '/ClimatePrivacy' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              aria-current={pathname === to ? 'page' : undefined}
              className={`inline-block py-1.5 text-[13px] transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                pathname === to ? 'text-record-red' : 'text-record-muted'
              }`}
            >
              {label}
            </Link>
          ))}
          {showKeeper && <KeeperDoor />}
        </div>
      </div>
    </footer>
  );
}