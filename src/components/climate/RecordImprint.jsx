import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV, RAIL_SECOND_NAV, DESK_FOUNDER } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

// ── ONE ROW ON A PHONE, AND A LINE THAT SAYS WHERE YOU STAND ────────────────────
// This line has been fitted five times. The first three failed the same way — they answered
// "too many doors" by making the row scroll, and a row that slides sideways is the one thing
// a phone's own bar never does, because a reader does not discover a menu that runs off the
// glass; they conclude the menu is short. The fourth answer was two rows of eight, with a
// ten-pixel caption under each, and Brian called it on 18 November: "old door roll feels not
// right." He was describing a grid built for a handset from fifteen years ago — drawings the
// size of a full stop, names too small to read without leaning in, and a second row that only
// ever held the covenant and the founder.
//
// So it is one row again: five ways in and the mark that opens the rest. Six cells across a
// 393-pixel glass is sixty-five pixels each, and the drawings go back up to twenty-eight —
// the first size at which these marks read as drawings rather than as specks. Nothing is
// printed underneath them. Instead one line under the row names the room the reader is
// actually standing in, in the record's own type, with the red square that marks a place
// everywhere else on this record. A menu that says where you are is worth more on a phone
// than eight words to squint at.
//
// What left the row did not leave the record. The rulebook (why it exists, how an entry is
// checked, what has been corrected, the terms and privacy) is exactly what the sheet prints
// under "How it is kept", the founder was never a question a reader arrives with, and the
// keeper's room opens from the sheet for the two people who hold the keys. And the tongue —
// the one control that changes the record's voice instead of going somewhere — sits above
// this row on the masthead's name line, naming itself in its own words. Not in the row (it
// is not a place to stand) and not only in the sheet (language is not a buried setting on a
// record that promises nobody is left behind).
// ── TWO ROWS, AND EVERY DOOR NAMED — BACK THE WAY IT WAS ────────────────────────
// The phone's rail was cut to one row of six, then to four marks with the names taken out,
// and both were a mistake in the same direction: less was assumed to mean calmer. It did
// not. Brian, 18 November, looking at four unnamed drawings: "where's our coolasfuck nav
// on mobile?" — and then, rightly, that the two-row version had been the cool one.
//
// So it is two rows again, and every cell carries its name underneath. Row one is the five
// ways in — the record, the wire, the map, reach, and the search. Row two is what a reader
// asks once they are standing inside: why the record exists, how an entry is checked, what
// has been corrected, who asked for it, and the mark that opens everything else. Ten named
// doors, two lines, and nothing under them.
//
// There was a third line under the rail saying which room you were standing in. It was
// written when the cells had no names, so it was the only thing that told a thumb where it
// had landed. Now every cell carries its own name — including the one for the record itself
// — so that line was printing "Record of the Time" underneath a door already called Record.
// Brian, 18 November: "extra line under nav, says record etc, looks broken." It did. Two
// rows of named doors need nothing beneath them.
// ── BASE 1 SITS IN THE MIDDLE, AND THAT IS THE RIGHT PLACE FOR IT ───────────────
// Brian, 18 November: "you think BASE 1 should be middle of nav at top?" Yes — and not
// because the middle is the flattering spot, but because of what the other four doors are.
// Record, Wire, Map and Reach are all places: the entries, what changed, where it is, who is
// reading. BASE 1 is not a place. It is the way of asking all four at once, so it belongs
// between them rather than after them — two doors either side, and the ask in the hinge.
// Last in the row it read as an afterthought you got to once you had given up on the
// record; in the middle it reads as the record's own instrument, which is what it is.
const ROW_ONE = [
  PRIMARY_NAV[0], // Record
  PRIMARY_NAV[1], // Wire
  PRIMARY_NAV[4], // BASE 1 — the hinge
  PRIMARY_NAV[2], // Map
  PRIMARY_NAV[3], // Reach
];
const ROW_TWO = [...RAIL_SECOND_NAV, DESK_FOUNDER];

// Equal share, always. Every cell is one sixth of the row whatever it contains, so no door
// can push its neighbour aside and nothing shifts when a page turns or a tongue changes.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-0';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col pb-0 lg:pb-2">
      {/* ── THE DESK ROW, WHICH THE PHONE NEVER SEES ─────────────────────────────
          Nine marks and the door that opens the rest, at 1024px and wider. The six below
          are untouched and take over the moment the glass is narrower than that — this is
          an addition to a row, not a rebuild of one. See RecordDeskDoors. */}
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />

      {/* Capped, so equal share does not become equal sprawl: on a wide screen six cells
          stretched across the whole book would put a hand's width of air between one mark
          and the next and turn the rail into six lonely doors. Below the cap they divide
          whatever there is; above it they keep a cell's own size. */}
      <nav aria-label="The record's doors" className="rec-mast-doors w-full max-w-[520px] lg:hidden">
        <div className="rec-mast-row flex items-stretch gap-x-1">
          {ROW_ONE.map(({ label, to, what }) => (
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
        </div>

        {/* The second line: the record's own claim, her name, and the way to everything
            else. Same equal share, same drawings, a shade smaller — a second row is read
            as a second row, not as ten doors of equal weight. */}
        <div className="rec-mast-row flex items-stretch gap-x-1 mt-0.5">
          {ROW_TWO.map(({ label, to, what }) => (
            <RecordNavDoor
              key={to}
              to={to}
              label={label}
              what={what}
              size={25}
              active={pathname === to}
              className={CELL}
            />
          ))}

          {/* ── THE SAME WORD AS THE DESK, BECAUSE IT IS THE SAME THING ─────────────
              This cell said "Doors" on a phone and "Explore" on a desk. Both were true, and
              that was the fault: the same panel, opening the same index, under two names,
              so a reader who moved from one glass to the other had to learn it twice.
              Brian, 18 November: "on desktop explore but on mobile says doors?" The desk's
              word wins, because it is the one that says what happens — nothing is being
              listed, the record is being opened up. One name, one mark, both widths. */}
          <RecordNavDoor
            to="/ClimateGuide"
            label="Explore"
            what="Every way through the record, on one screen."
            size={25}
            asButton
            onClick={onOpenContents}
            expanded={contentsOpen}
            controls="record-contents"
            active={contentsOpen}
            className={CELL}
          />
        </div>

      </nav>

      {/* Who wrote the words in a tongue, and whether a speaker has checked them. Under
          the row, not in it, so a machine-made tongue can never nudge a door along. */}
      <LanguageStatus />
    </div>
  );
}