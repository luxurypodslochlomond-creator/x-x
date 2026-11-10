import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV, TRUST_NAV } from '@/components/climate/recordFooterLinks';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';
import '@/components/climate/record-navigator.css';

// ── THE MARKS ARE BACK AT THE TOP, AND THIS TIME THEY ARE FITTED ────────────────
// The drawn doors came out of the masthead for one round, and that was the wrong answer
// to the right complaint: the marks were never the problem, the fit was. Eight of them in
// a row that could wrap, on cells whose width changed when one of them went bold, is a
// header that shivers — and at thirty-two pixels with an eleven-pixel caption under each,
// it is also a row of grey flourishes.
//
// So the hand is back where it belongs — at both ends of the book — and what changed is
// the fitting. Every cell is the same fixed width, the captions never wrap and never turn
// bold, and the one thing whose length is not ours to fix (the honesty line about a
// machine-made tongue) sits underneath the row instead of standing in it. Nothing in this
// line can move when you turn a page or choose a tongue. The marks are cut at thirty-four
// rather than thirty-two, which is the size at which a stroke stops being a grey smudge
// and starts being ink.
// ── FIVE, AND NOTHING PAST THE EDGE ─────────────────────────────────────────────
// The row carried the founder as a sixth cell, which pushed it past 393 pixels and meant
// the last doors — the rulebook, the contents, the tongue — were only reachable by sliding
// the row sideways. A reader does not discover a sideways-scrolling menu; they conclude
// the menu is short. So the row is the five a reader arrives with and nothing else, and
// the founder (who is met once inside, not on the way in) keeps her place in the foot and
// in the sheet. Nothing has been removed; one thing has stopped hiding five others.
const WAY_IN = PRIMARY_NAV;

// ── ONE ROW, AND IT IS THE WHOLE RECORD ─────────────────────────────────────────
// There used to be a second copy of this row pinned to the foot of a phone, and behind it
// this masthead hid the rulebook and the founder on a narrow glass to keep itself short.
// That is the arrangement that left a reader saying the index had gone from the top and a
// navigation had turned up at the bottom: two half-menus, one of which ate a hundred
// pixels of every page for the trouble.
//
// One row, at the top, carrying everything — the five ways in, the founder, the rulebook,
// the contents and the tongue. On a phone it runs on past the edge of the glass and is
// slid sideways, which is a thing a reader already knows how to do; nothing is hidden and
// nothing is repeated. The foot of the book keeps its own margin again.
//
// The rulebook: why the record exists, how an entry is checked, what has been corrected,
// and the terms and privacy it is offered under. All five are the same kind of thing — the
// promises behind the entries rather than entries — so they sit together behind one
// hairline, each with a mark cut for it and no other door.
const RULEBOOK = [
  { label: 'Why', to: '/XEqualsX', what: 'The covenant: equal human worth, drawn rather than argued.' },
  { label: 'Method', to: '/ClimateMethod', what: 'How entries are sourced, screened and checked.' },
  { label: 'Corrections', to: '/ClimateCorrections', what: 'Changes to the record, with dates and reasons.' },
  ...TRUST_NAV,
];

// One fixed width for every cell, wide enough for the longest word on the row. This is the
// whole fix: a door cannot push its neighbours aside if it was never given a width of its
// own to grow into.
const CELL = 'w-[58px] shrink-0 sm:w-[68px] !min-h-0 !py-1';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();

  return (
    <div className="flex flex-col pb-2">
      <nav aria-label="The record's doors" className="rec-mast-doors rec-nav-line flex items-stretch gap-x-1 overflow-x-auto">
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

        {/* A hairline does what it does in print: it separates two kinds of thing without
            making either one smaller. Left of it, the record. Right of it, its rulebook. */}
        <span aria-hidden="true" className="mx-1 w-px shrink-0 self-center bg-record-ink/20" style={{ height: 34 }} />

        {RULEBOOK.map(({ label, to, what }) => (
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
            thumb: it names a list rather than an act. The record already calls its way
            through doors everywhere else — the shed has rooms, the masthead has a
            rulebook — so the mark that opens them all is called after them. */}
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

        {(isKeeper || isChecker) && (
          <RecordNavDoor
            to="/ClimateKeeperRoom"
            label="The shed"
            what="The keeper's own room."
            size={34}
            active={pathname === '/ClimateKeeperRoom'}
            className={CELL}
          />
        )}

        {/* The tongue, behind its own hairline: the one mark up here that changes the
            record's voice rather than going somewhere. */}
        <span aria-hidden="true" className="mx-1 w-px shrink-0 self-center bg-record-ink/20" style={{ height: 34 }} />
        <div className="flex shrink-0 items-center [&>div]:flex-none">
          <RecordTongueDoor size={30} />
        </div>
      </nav>

      {/* Who wrote the words in a tongue, and whether a speaker has checked them. Under
          the row, not in it, so a machine-made tongue can never nudge a door along. */}
      <LanguageStatus />
    </div>
  );
}