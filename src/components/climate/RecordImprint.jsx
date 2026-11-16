import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

// ── SIX MARKS, ONE ROW, AND NOTHING PAST THE EDGE ───────────────────────────────
// This line has been fitted four times, and the first three all failed the same way: they
// answered "too many doors" by making the row scroll. A row that slides sideways is the one
// thing a phone's own bar never does, because a reader does not discover a menu that runs
// off the glass — they conclude the menu is short, and the last door is never opened. Every
// door from Method onward was behind that edge.
//
// So the row is arithmetic rather than taste. Five ways in plus one mark that opens the rest
// is six, and six cells across a 393-pixel glass is sixty pixels each: wider than a
// fingertip, with no scroll, no fade, no hint that something is waiting off-screen. On a
// 320-pixel handset the same six are forty-eight each, which is still a thumb.
//
// What left the row did not leave the record. The rulebook (why it exists, how an entry is
// checked, what has been corrected, the terms and privacy) is exactly what the sheet already
// prints under "How it is kept", so nothing was duplicated to keep it there. The founder was
// never a question a reader arrives with. The keeper's room opens from the sheet for the
// two people who hold the keys. And the tongue — the one control that changes the record's
// voice instead of going somewhere — is above this row on the masthead's name line, opposite
// the record's own name, naming itself in its own words. Not in the row (it is not a place
// to stand) and not only in the sheet (language is not a buried setting on a record that
// promises nobody is left behind).
const WAY_IN = PRIMARY_NAV;

// Equal share, always. Every cell is one sixth of the row whatever it contains, so no door
// can push its neighbour aside and nothing shifts when a page turns or a tongue changes —
// which is what the old fixed pixel width was defending, done as a ratio so it also holds on
// a handset narrower than the one it was measured against.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-0 !py-1';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col pb-2">
      {/* ── THE DESK ROW, WHICH THE PHONE NEVER SEES ─────────────────────────────
          Nine marks and the door that opens the rest, at 1024px and wider. The six below
          are untouched and take over the moment the glass is narrower than that — this is
          an addition to a row, not a rebuild of one. See RecordDeskDoors. */}
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />

      {/* Capped, so equal share does not become equal sprawl: on a wide screen six cells
          stretched across the whole book would put a hand's width of air between one mark
          and the next and turn the rail into six lonely doors. Below the cap they divide
          whatever there is; above it they keep a cell's own size. */}
      <nav aria-label="The record's doors" className="rec-mast-doors flex w-full max-w-[520px] items-stretch gap-x-1 lg:hidden">
        {WAY_IN.map(({ label, to, what }) => (
          <RecordNavDoor
            key={to}
            to={to}
            label={label}
            what={what}
            size={34}
            active={pathname === to}
            className={CELL}
          />
        ))}

        {/* ── DOORS, NOT CONTENTS ────────────────────────────────────────────────
            "Contents" is the correct word for a printed book and the wrong word for a
            thumb: it names a list rather than an act. The record calls its way through
            doors everywhere else — the shed has rooms, the note says one door on every
            working screen — so the mark that opens them all is called after them. */}
        <RecordNavDoor
          to="/ClimateGuide"
          label="Doors"
          what="Every way through the record, on one screen."
          size={34}
          asButton
          onClick={onOpenContents}
          expanded={contentsOpen}
          controls="record-contents"
          active={contentsOpen}
          className={CELL}
        />
      </nav>

      {/* Who wrote the words in a tongue, and whether a speaker has checked them. Under
          the row, not in it, so a machine-made tongue can never nudge a door along. */}
      <LanguageStatus />
    </div>
  );
}