import React from 'react';
import { useLocation } from 'react-router-dom';
import { DESK_NAV } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import '@/components/climate/record-navigator.css';

// ── THE DESK GETS THE WHOLE WAY THROUGH, AND THE PHONE KEEPS OURS ───────────────
// The masthead carried six marks at every width, which on a handset is arithmetic and on a
// desk is a waste: a thousand-pixel header showing half a row, with the three doors that
// carry the record's credibility — why it exists, how an entry is checked, what has been
// corrected — hidden inside a sheet that dimmed the page to open.
//
// So the row is now two rows that never meet: below 1024px it is the six the phone has
// always had, unchanged, and at 1024px and wider it is ten, with the mark that opens
// everything else standing last. Same drawings, same ink, same red only on the door you are
// standing in, equal cells so nothing shifts as a tongue changes or a caption grows.
//
// Ten is the limit, not a taste: across a thousand pixels it is a hundred each, and a
// hundred is where this row stops being generous and starts being crowded. The tenth is her
// name — the record says who asked for it, at the end of the row and above the index, because
// provenance is the first thing a sceptical reader checks and the last thing the record should
// shout. Everything past it is a door a reader goes looking for rather than one they arrive
// with, and it is in the sheet — which is the one job the sheet has.
const CELL = 'flex-1 basis-0 min-w-0 !min-h-0 !py-1';

export default function RecordDeskDoors({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();

  return (
    <nav aria-label="The record's doors" className="rec-mast-doors hidden w-full items-stretch gap-x-1 lg:flex">
      {DESK_NAV.map(({ label, to, what }) => (
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

      {/* The same mark, in the same place, meaning the same thing as on the phone: the rest
          of the record, on one screen. It is drawn as a door and not as a hamburger because
          the record has called its way through doors since it was built. */}
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
  );
}