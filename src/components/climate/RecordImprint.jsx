import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';

// ── THE LINE AT THE TOP OF THE PAGE IS SET, NOT DRAWN ───────────────────────────
// The masthead wore the same drawn doors as the rail at the foot, and it does not work
// twice. A mark cut for a thumb at the bottom of a phone is cut at thirty pixels and has
// to be: on a wide screen, eight of them in a row above the words are eight grey
// flourishes, and a word underneath each at eleven pixels is a caption nobody can read.
// That is what "fuzzy" was: not a rendering fault, a size and a material in the wrong
// place. The hand keeps the foot, where the hand earns its keep, and the contents sheet,
// where the marks have a page to themselves. What the head carries is a set line: names,
// one size, one ink, on the record's paper, under its rule.
//
// The line also does not wrap and never changes width, which is the other half of what
// was wrong. A row of eight doors that wrapped when a tongue was chosen, or when the
// active caption turned bold and pushed its neighbours along, was a header that breathed
// under a reader's eyes. Nothing here can move: fixed labels, one weight, no growth, and
// the one thing that does change length — the honesty line about a machine-made tongue —
// is given its own line underneath instead of standing in the row.
const ON = 'text-record-mark underline decoration-record-mark decoration-[1.5px] underline-offset-[6px]';
const OFF = 'text-record-ink hover:text-record-red';
const DOOR = 'shrink-0 whitespace-nowrap py-2 text-[13px] leading-none transition-colors';

// The ways in — the four the record is read for, and the name of the person who asked
// for it. The founder was hidden in the foot; a record whose whole argument is that a
// named person is accountable for it should say who that person is at the top.
const WAY_IN = [
  ...PRIMARY_NAV,
  { label: 'The founder', to: '/ClimateFounder', what: 'Janine M. H. Selendy, and the record she asked for.' },
];

// How it is kept, and the terms it is kept under. Trust is not a mood: it is the method,
// the corrections, the terms and the privacy line, all four of them reachable from the
// top of any page rather than at the end of a scroll.
const KEPT = [
  { label: 'Why', to: '/XEqualsX', what: 'The covenant: equal human worth, drawn rather than argued.' },
  { label: 'Method', to: '/ClimateMethod', what: 'How entries are sourced, screened and checked.' },
  { label: 'Corrections', to: '/ClimateCorrections', what: 'Changes to the record, with dates and reasons.' },
  { label: 'Terms', to: '/ClimateTerms', what: 'The terms this record is offered under.' },
  { label: 'Privacy', to: '/ClimatePrivacy', what: 'What the record collects, and what it refuses to.' },
];

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();

  return (
    <div className="flex flex-col pb-2">
      <div className="rec-nav-line flex items-center gap-x-4 overflow-x-auto lg:gap-x-5">
        {WAY_IN.map(({ label, to, what }) => (
          <Link
            key={to}
            to={to}
            title={`${label}: ${what}`}
            aria-current={pathname === to ? 'page' : undefined}
            className={`${DOOR} ${pathname === to ? ON : OFF} ${to === '/ClimateFounder' ? 'hidden md:block' : ''}`}
          >
            {label}
          </Link>
        ))}

        {/* A hairline does what it does in print: it separates two kinds of thing without
            making either one smaller. Left of it, the record. Right of it, its rulebook. */}
        <span aria-hidden="true" className="hidden h-3.5 w-px shrink-0 bg-record-ink/20 lg:block" />

        {KEPT.map(({ label, to, what }) => (
          <Link
            key={to}
            to={to}
            title={`${label}: ${what}`}
            aria-current={pathname === to ? 'page' : undefined}
            className={`${DOOR} hidden lg:block ${pathname === to ? ON : OFF}`}
          >
            {label}
          </Link>
        ))}

        <button
          type="button"
          onClick={onOpenContents}
          aria-expanded={contentsOpen}
          aria-controls="record-contents"
          aria-haspopup="dialog"
          title="Contents: every way through the record, on one screen."
          className={`${DOOR} ${contentsOpen ? ON : OFF}`}
        >
          Contents
        </button>

        {(isKeeper || isChecker) && (
          <Link to="/ClimateKeeperRoom" className={`${DOOR} hidden lg:block ${pathname === '/ClimateKeeperRoom' ? ON : OFF}`}>
            The shed
          </Link>
        )}

        {/* The tongue, at the end of the line behind its own hairline: the one control up
            here that changes the record's voice rather than going somewhere. */}
        <span aria-hidden="true" className="mx-0.5 h-3.5 w-px shrink-0 bg-record-ink/20" />
        <div className="flex shrink-0 items-center [&>div]:flex-none">
          <RecordTongueDoor size={24} />
        </div>
      </div>

      {/* Who wrote the words in a tongue, and whether a speaker has checked them. It sits
          under the line, not in it, so a machine-made tongue can never nudge a door along. */}
      <LanguageStatus />
    </div>
  );
}