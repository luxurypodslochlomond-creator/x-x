import React from 'react';
import { useLocation } from 'react-router-dom';
import { PHONE_NAV_ROWS } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import { MarkExplore } from '@/components/climate/RecordFootMarks';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

// ── TWO ROWS, AND SMALLER MARKS BECAUSE THERE ARE MORE DOORS ──────────────────
// Brian, 19 November: "method why and founder should be in nav too bro at top need to reduce
// size on mobile and add them right sequence bro… and can BASE 1 be in middle bri please."
//
// Three doors were missing from the one screen most readers hold the record on: why it
// exists, how an entry is checked, and whose name is on it. Those three are the record's
// whole claim to being believed, and on a phone all of them were behind a sheet you had to
// know to open.
//
// So the phone's rail is two rows. The top row is the five ways in, unchanged in order and
// with BASE 1 exactly in the middle of them — the same position it holds on a desk, which
// is the point: a door that moves between screens is two doors. The second row is the
// record's own account of itself — Why, Method, Founder — and then Explore, last, under the
// thumb, where the index of everything else has always been.
//
// Nine doors in the height of two rows, because the marks give height back: twenty-four on
// the row a reader arrives with, nineteen on the quieter row beneath it, captions at nine
// and eight. The header ends up shorter than it was with two rows of three, and it carries
// four more ways in.
const ROW_1_CELL = 'min-w-0 !min-h-10';
const ROW_2_CELL = 'min-w-0 !min-h-8';
const ROW_SIZE = [24, 19];

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col pb-1 lg:pb-2">
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />
      <nav aria-label="The record's doors" className="rec-mast-doors w-full lg:hidden">
        {PHONE_NAV_ROWS.map((tier, index) => {
          const last = index === PHONE_NAV_ROWS.length - 1;
          const cell = index === 0 ? ROW_1_CELL : ROW_2_CELL;
          return (
            <div
              key={index}
              className={`rec-mast-row grid items-stretch gap-x-1 ${index === 0 ? 'rec-mast-row-1' : 'rec-mast-row-2 mt-0.5 border-t border-record-ink/15 pt-1'}`}
              style={{ gridTemplateColumns: `repeat(${tier.length + (last ? 1 : 0)}, minmax(0, 1fr))` }}
            >
              {tier.map(({ label, to, what }) => (
                <RecordNavDoor
                  key={to}
                  to={to}
                  label={label}
                  what={what}
                  size={ROW_SIZE[index] || ROW_SIZE[1]}
                  active={pathname === to}
                  className={cell}
                />
              ))}

              {/* The index of everything else, at the end of the last row, where a reader
                  looks once the ways in have not answered them. Not a door: it opens the
                  sheet. */}
              {last && (
                <RecordNavDoor
                  to="/ClimateGuide"
                  label="Explore"
                  what="The rest of the record: the brief, the covenant, the terms and every other door."
                  mark={MarkExplore}
                  size={ROW_SIZE[1]}
                  asButton
                  onClick={onOpenContents}
                  expanded={contentsOpen}
                  controls="record-contents"
                  popup={false}
                  active={contentsOpen}
                  className={cell}
                />
              )}
            </div>
          );
        })}
      </nav>
      {/* ── BASE 1, IN THE MIDDLE ────────────────────────────────────────────────
          Brian, 18 November: "have BASE 1 in the middle know what I mean bro". On a desk it
          sits centred under the doors, in the machine's own type and the record's own faint
          ink — the hand that built the room, signed where a printer signs a sheet. No door,
          no badge, nothing to click: a signature, not a product. On a phone the door itself
          stands in the middle of the top row, which says the same thing in the only place a
          phone has room for it. */}
      <div className="hidden items-center justify-center gap-3 pb-1 pt-1.5 lg:flex">
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
        <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-record-ink/45">Base 1</span>
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
      </div>
      <LanguageStatus />
    </div>
  );
}