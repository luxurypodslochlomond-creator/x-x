import React from 'react';
import { useLocation } from 'react-router-dom';
import { DESK_NAV_ROWS } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import '@/components/climate/record-navigator.css';

// ── TWO ROWS ON A DESK ──────────────────────────────────────────────────────────
// Below 1024px this draws nothing: the phone keeps its one row of six, unchanged. At desk
// width it draws two rows of six equal cells, so the columns line up down the masthead —
// the five ways in with Explore last, then how the record is kept and what else is in it.
//
// The marks are smaller than the single row's forty because there are two of them now and
// a header that eats a desk's glass is the same fault as one that eats a phone's. Row one
// is the row a reader arrives with, so it is the bigger of the two.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-0 !py-1';

export default function RecordDeskDoors({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();

  return (
    <nav aria-label="The record's doors" className="rec-mast-doors hidden w-full flex-col lg:flex">
      {DESK_NAV_ROWS.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className={`flex w-full items-stretch gap-x-1 ${rowIndex === 0 ? '' : 'rec-mast-row-2 mt-0.5 border-t border-record-ink/15 pt-1'}`}
          >
            {row.map(({ label, to, what }) => (
              <RecordNavDoor
                key={to}
                to={to}
                label={label}
                what={what}
                size={rowIndex === 0 ? 34 : 26}
                active={pathname === to}
                className={CELL}
              />
            ))}

            {/* The index of everything else, at the end of the top row — where a reader
                looks once the six ways in have not answered them. */}
            {rowIndex === 0 && (
              <RecordNavDoor
                to="/ClimateGuide"
                label="Explore"
                what="The rest of the record: the brief, the covenant, the terms and every other door."
                size={34}
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