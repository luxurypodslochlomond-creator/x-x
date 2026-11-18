import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
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
// ── FOUR CELLS, BECAUSE SIX WAS STILL A MENU ───────────────────────────────────
// Six marks across a 393-pixel glass is sixty-five each, and Brian's verdict on the result
// was simply "too nav" (18 November). He is right, and the fault is arithmetic rather than
// taste: six equal cells is not a row of doors, it is a toolbar, and a toolbar on the front
// page of a record is the noise the record exists to remove.
//
// So the row is three places and the mark that opens everything else. The three are the
// three a reader arrives with: what is on the record, what changed, and where it is. Reach
// and BASE 1 have not gone anywhere — they are the first two doors in the sheet, one tap
// under the same thumb, and they are still in PRIMARY_NAV so the desk and the foot keep
// them exactly as they were.
const ROW = PRIMARY_NAV.slice(0, 3);
// Where you are is read from the whole list, not from the row: standing in Reach or in the
// search should still say so, even though neither has a cell of its own on a phone.
const WAY_IN = PRIMARY_NAV;

// Equal share, always. Every cell is one sixth of the row whatever it contains, so no door
// can push its neighbour aside and nothing shifts when a page turns or a tongue changes.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-0';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  const here = WAY_IN.find((item) => item.to === pathname);

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
          {ROW.map(({ label, to, what }) => (
            <RecordNavDoor
              key={to}
              to={to}
              label={label}
              what={what}
              size={30}
              active={pathname === to}
              className={CELL}
            />
          ))}

          {/* ── DOORS, NOT CONTENTS ────────────────────────────────────────────────
              "Contents" is the correct word for a printed book and the wrong word for a
              thumb: it names a list rather than an act. The record calls its way through
              doors everywhere else — the shed has rooms, the note says one door on every
              working screen — so the mark that opens them all is called after them. It stays
              last, under the thumb, and it is the only cell that opens something rather than
              going somewhere. */}
          <RecordNavDoor
            to="/ClimateGuide"
            label="Doors"
            what="Every way through the record, on one screen."
            size={28}
            asButton
            onClick={onOpenContents}
            expanded={contentsOpen}
            controls="record-contents"
            active={contentsOpen}
            className={CELL}
          />
        </div>

        {/* Where you are, said once, in the record's own voice. On the front page it names
            the record itself; in any other room it names that room and what it holds. */}
        <p className="rec-mast-here">
          <span className="rec-mast-here-name">{here?.label || 'Record of the Time'}</span>
          {here?.what && <span className="rec-mast-here-what">· {here.what}</span>}
        </p>
      </nav>

      {/* Who wrote the words in a tongue, and whether a speaker has checked them. Under
          the row, not in it, so a machine-made tongue can never nudge a door along. */}
      <LanguageStatus />
    </div>
  );
}