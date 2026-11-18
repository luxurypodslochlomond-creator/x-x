import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

// ── TWO ROWS OF THREE ON A HAND GLASS, ONE ROW OF SIX ON A DESK ─────────────────
// Brian, 18 November: "you sure don't need two rows on mobile and one on desktop not?" He
// is right, and the reason is arithmetic rather than taste. Six doors across a 393-pixel
// glass is fifty-seven pixels each: the drawings have to be shrunk to specks and the names
// set so small they stop naming anything. Three to a row gives each door a hundred and
// eighteen pixels, so the mark can be a mark and the word can be read. The desk keeps its
// own row of six — there is room there — and this rail only exists below the desk anyway.
const CELL = 'min-w-0 !min-h-11';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col pb-1 lg:pb-2">
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />
      <nav aria-label="The record's doors" className="rec-mast-doors w-full lg:hidden">
        <div className="rec-mast-row grid grid-cols-3 items-stretch gap-x-1 gap-y-0.5">
          {PRIMARY_NAV.map(({ label, to, what }) => (
            <RecordNavDoor key={to} to={to} label={label} what={what} size={24} active={pathname === to} className={CELL} />
          ))}
          <RecordNavDoor to="/ClimateGuide" label="Explore" what="Method, corrections, the founder and every other part of the record."
            size={24} asButton onClick={onOpenContents} expanded={contentsOpen} controls="record-contents" active={contentsOpen} className={CELL} />
        </div>
      </nav>
      <LanguageStatus />
    </div>
  );
}