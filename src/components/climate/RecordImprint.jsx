import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

// ── ONE ROW OF FIVE, AND BASE 1 IN THE MIDDLE OF IT ─────────────────────────────
// This row has now been argued over three times, so the whole argument is kept here rather
// than in a commit nobody reads.
//
// Six in one line of a 393-pixel glass gave each door fifty-six pixels — a mark the size of
// a full stop with a name under it too small to read. So it was drawn as two rows of three
// for an afternoon, which gave every door a hundred and twenty pixels and made the strip
// twice as tall: a header that eats a third of a phone's glass before the page has started.
// Brian, that evening: "think navigation too big on mobile." He was right, and two rows was
// the wrong trade.
//
// Then the seventh mark (Explore) was added to the row, which is what broke it properly:
// two rows of three with a seventh door left stranded on a line of its own, and the header
// reading as a list rather than as a masthead. Brian, 19 November: "not refined coolasfuck
// header any more can dif please for mobile." So:
//
//   • five doors, one row, which is the number every tab bar a person already knows stops
//     at, and the number a thumb can hold at a readable size;
//   • BASE 1 dead centre, because it is the middle of this record and not one of its
//     edges — the five in PRIMARY_NAV are ordered so that the third is the middle one;
//   • the index of everything else leaves this row and signs the yellow band above it,
//     beside the tongue, where a phone already looks for the way to the rest.
//
// Nothing has been taken away: every door here opens what it opened, the index opens the
// same panel, and a desk still draws its own two rows of six with Explore last.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-11';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col pb-1 lg:pb-2">
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />
      <nav aria-label="The record's doors" className="rec-mast-doors w-full lg:hidden">
        <div className="rec-mast-row grid grid-cols-5 items-stretch gap-x-1">
          {PRIMARY_NAV.map(({ label, to, what }) => (
            <RecordNavDoor
              key={to}
              to={to}
              label={label}
              what={what}
              size={24}
              active={pathname === to}
              className={CELL}
            />
          ))}
        </div>
      </nav>
      {/* ── BASE 1, IN THE MIDDLE ────────────────────────────────────────────────
          Brian, 18 November: "have BASE 1 in the middle know what I mean bro". On a desk it
          sits centred under the doors, in the machine's own type and the record's own faint
          ink — the hand that built the room, signed where a printer signs a sheet. No door,
          no badge, nothing to click: a signature, not a product. On a phone the middle of
          the row itself is BASE 1, so the signature would only say the word twice; the row
          is the signature there. */}
      <div className="hidden items-center justify-center gap-3 pb-1 pt-1.5 lg:flex">
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
        <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-record-ink/45">Base 1</span>
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
      </div>
      <LanguageStatus />
    </div>
  );
}