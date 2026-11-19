import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

// ── ONE ROW OF SIX, AND SMALLER THAN IT WAS ─────────────────────────────────────
// Two rows of three was tried for an afternoon and it was the wrong answer: it gave each
// door more room but made the strip twice as tall, and a header that eats a third of the
// glass before the page starts is worse than small marks. Brian, that evening: "think
// navigation too big on mobile". So it is one row again — six doors, a hundred-and-forty-
// pixel strip — with the drawings at twenty-two and the names at nine, which is the size
// where these marks still read as drawings and the whole way through the record costs one
// line of a phone rather than two.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-11';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col pb-1 lg:pb-2">
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />
      <nav aria-label="The record's doors" className="rec-mast-doors w-full lg:hidden">
        {/* Two rows of three. Six doors on one line of a 393-pixel glass gave each one
            fifty-six pixels — a drawing the size of a full stop with a name under it too
            small to read. Two rows give every door a hundred and twenty, which is the
            width at which a mark reads as a drawing and its name reads as a word. */}
        <div className="rec-mast-row grid grid-cols-3 items-stretch gap-x-1 gap-y-1">
          {PRIMARY_NAV.map(({ label, to, what }) => (
            <RecordNavDoor key={to} to={to} label={label} what={what} size={26} active={pathname === to} className={CELL} />
          ))}
          <RecordNavDoor to="/ClimateGuide" label="Explore" what="Method, corrections, the founder and every other part of the record."
            size={26} asButton onClick={onOpenContents} expanded={contentsOpen} controls="record-contents" active={contentsOpen} className={CELL} />
        </div>
      </nav>
      {/* ── BASE 1, IN THE MIDDLE ────────────────────────────────────────────────
          Brian, 18 November: "have BASE 1 in the middle know what I mean bro". It sits
          centred under the doors, on a desk only, in the machine's own type and the
          record's own faint ink — the hand that built the room, signed where a printer
          signs a sheet. No door, no badge, nothing to click: a signature, not a product. */}
      <div className="hidden items-center justify-center gap-3 pb-1 pt-1.5 lg:flex">
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
        <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-record-ink/45">Base 1</span>
        <span aria-hidden="true" className="h-px w-16 bg-record-ink/20" />
      </div>
      <LanguageStatus />
    </div>
  );
}