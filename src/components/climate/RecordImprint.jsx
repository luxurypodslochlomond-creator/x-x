import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

// ── TWO TIERS ON A PHONE, AND EXPLORE LAST ON THE SECOND ───────────────────────
// Brian, 19 November: "much better but lost explore and think two tiers at top nav in mobile
// be coolasfuck." Both halves of that are answered here, and the reason the two belong
// together is arithmetic.
//
// The row had been five doors because six in 393 pixels gives each sixty-five — and the
// sixth, Explore, was moved into the yellow band as three rules of ink. That traded a door
// for a glyph: the panel it opens was still one thumb away, but nothing on the page said
// "explore" any more, so a reader who had learned the door had lost it.
//
// Two tiers of three is the same six doors with room to breathe: a hundred and twenty-five
// pixels a cell, marks at twenty-eight and every name readable at ten, and the row broken
// where the record itself breaks — the four ways into what is on it first, then the room of
// drawings and the index of everything else. The order is the order a reader asks, and
// Explore stays where a desk puts it: last, on the right, under the thumb.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-11';

// The two tiers. The first is what the record is and how you move through it; the second is
// the room of drawings, and then the one mark that is not a door at all but the index of all
// of them. Kept as a split of PRIMARY_NAV rather than a second hand-written list, so a phone
// can never offer a door the rail has stopped offering.
const TIERS = [PRIMARY_NAV.slice(0, 3), PRIMARY_NAV.slice(3)];

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col pb-1 lg:pb-2">
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />
      <nav aria-label="The record's doors" className="rec-mast-doors w-full lg:hidden">
        {TIERS.map((tier, index) => (
          <div
            key={index}
            className={`rec-mast-row grid grid-cols-3 items-stretch gap-x-1 ${index === 0 ? '' : 'rec-mast-row-2 mt-0.5 border-t border-record-ink/15 pt-1'}`}
          >
            {tier.map(({ label, to, what }) => (
              <RecordNavDoor
                key={to}
                to={to}
                label={label}
                what={what}
                size={28}
                active={pathname === to}
                className={CELL}
              />
            ))}

            {/* The index of everything else, on the last tier, where a reader looks once
                the ways in have not answered them. Not a door: it opens the sheet. */}
            {index === TIERS.length - 1 && (
              <RecordNavDoor
                to="/ClimateGuide"
                label="Explore"
                what="The rest of the record: the brief, the covenant, the terms and every other door."
                size={28}
                asButton
                onClick={onOpenContents}
                expanded={contentsOpen}
                controls="record-contents"
                popup={false}
                active={contentsOpen}
                className={CELL}
              />
            )}
          </div>
        ))}
      </nav>
      {/* ── BASE 1, IN THE MIDDLE ────────────────────────────────────────────────
          Brian, 18 November: "have BASE 1 in the middle know what I mean bro". On a desk it
          sits centred under the doors, in the machine's own type and the record's own faint
          ink — the hand that built the room, signed where a printer signs a sheet. No door,
          no badge, nothing to click: a signature, not a product. On a phone the second tier
          ends with Explore, so the signature would only be a word between two rows. */}
      <div className="hidden items-center justify-center gap-3 pb-1 pt-1.5 lg:flex">
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
        <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-record-ink/45">Base 1</span>
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
      </div>
      <LanguageStatus />
    </div>
  );
}