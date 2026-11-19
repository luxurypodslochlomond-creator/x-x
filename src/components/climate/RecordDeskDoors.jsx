import React from 'react';
import { useLocation } from 'react-router-dom';
import { DESK_NAV_ROWS } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import { MarkExplore } from '@/components/climate/RecordFootMarks';
import '@/components/climate/record-navigator.css';

// ── BASE 1 DEAD IN THE MIDDLE, AND TWO ROWS OF ONE SIZE ────────────────────────
// Brian, 19 November: "can make BASE 1 in middle of nav both desktop and mobile please bro
// and bro why second row of navigation smaller on desktop? think can make same size bro for
// right reasons."
//
// Both halves were the same fault: the desk had drifted from the phone.
//
// THE MIDDLE. Five ways in on the top row put BASE 1 at the exact centre of a handset, and
// it was the one place on the record where the machine stood where a machine should stand —
// the pivot of the row, with doors either side of it. On a desk the same row carried six
// cells, because Explore was sitting at the end of it, so BASE 1 fell a hundred pixels left
// of the middle and read as the third of six rather than as the centre of anything.
//
// Six cells cannot have a middle. So Explore moves to the end of the second row, which is
// where a phone has always kept it and where it belongs: the index of everything else comes
// after the record's own account of itself, never before it. The top row is five again, and
// five puts BASE 1 at 50% of the masthead — the same door in the same place on both screens,
// which is the whole rule this nav is built on.
//
// THE SIZE. I set both rows at thirty-four, arguing that the second row is not a row of lesser
// doors. Brian, looking at it: "think you were right having bottom line of top nav smaller —
// same size looks big and not balanced to me bro." He is right, and the argument was wrong for
// a reason worth writing down: those six are not lesser doors, but they are the *second* ones.
// A reader arrives with the five and stays for the six, and two rows of one size have no
// reading order at all — the masthead stops being a rail and becomes a wall of nine equal
// marks. So the top row keeps thirty-four and the row beneath returns to twenty-six. That is
// not a hierarchy of worth. It is a hierarchy of when you meet it.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-0 !py-1';
const SIZE = 34;
const QUIETER = 26;

export default function RecordDeskDoors({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  const lastRow = DESK_NAV_ROWS.length - 1;

  return (
    <nav aria-label="The record's doors" className="rec-mast-doors hidden w-full flex-col lg:flex">
      {DESK_NAV_ROWS.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className={`flex w-full items-stretch gap-x-1 ${rowIndex === 0 ? '' : 'rec-mast-row-2 mt-0.5 border-t border-record-ink/15 pt-1'}`}
          >
            {row.map(({ label, to, what, plainCase }) => (
              <RecordNavDoor
                key={to}
                to={to}
                label={label}
                plainCase={plainCase}
                what={what}
                size={rowIndex === 0 ? SIZE : QUIETER}
                active={pathname === to}
                className={CELL}
              />
            ))}

            {/* The index of everything else, at the end of the last row — the same place
                the phone gives it, and after the signature rather than before it. */}
            {rowIndex === lastRow && (
              <RecordNavDoor
                to="/ClimateGuide"
                label="Explore"
                what="The rest of the record: the brief, the covenant, the terms and every other door."
                mark={MarkExplore}
                size={QUIETER}
                asButton
                onClick={onOpenContents}
                expanded={contentsOpen}
                controls="record-desktop-menu"
                popup={false}
                active={contentsOpen}
                className={CELL}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}