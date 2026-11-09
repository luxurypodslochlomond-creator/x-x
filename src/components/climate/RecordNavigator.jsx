import React from 'react';
import { PRIMARY_NAV, RAIL_SECOND_NAV } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';
import '@/components/climate/record-navigator.css';

// ── TWO ROWS OF THE SAME HAND ───────────────────────────────────────────────────
// This rail used to be one row of five, and everything behind the record — why it
// exists, how an entry is checked, its corrections, its index, the tongue it is read
// in — was only reachable by opening a sheet first. A reader could not even see that
// those doors existed without asking for a list of them.
//
// It is ten marks now, five and five: the five ways into the record on the top row,
// the five ways to understand it and keep it on the second. Equal cells, equal ink,
// equal size, so the second row is not a lesser row or a submenu — it is the other
// half of the same way through. The tongue rides at the end of the second row, in the
// same hand, because a record that promises nobody is turned away has to show the
// door it is read in.
//
// What this costs is said plainly: the rail is about twice as tall, so a phone gives
// it about a hundred and fifteen pixels permanently (see the foot padding in
// ClimateLayout). That is the honest price of every door being one tap away, and it is
// the price this record chose to pay rather than hide half its doors behind a sheet.
export default function RecordNavigator({ currentPage, onOpenContents, contentsOpen }) {
  return (
    <nav aria-label="The way through the record" className="rec-art-navigator">
      <div className="rec-art-rail">
        {PRIMARY_NAV.map(({ label, to, page, what }) => (
          <RecordNavDoor key={to} to={to} label={label} what={what} active={currentPage === page} size={30} />
        ))}
      </div>
      <div className="rec-art-rail">
        {RAIL_SECOND_NAV.map(({ label, to, what }) => (
          <RecordNavDoor key={to} to={to} label={label} what={what} size={30} />
        ))}
        <RecordNavDoor
          to="/ClimateGuide"
          label="Contents"
          what="Every way through the record, on one screen."
          size={30}
          asButton
          onClick={onOpenContents}
          expanded={contentsOpen}
          controls="record-contents"
          active={contentsOpen}
        />
        <RecordTongueDoor size={30} />
      </div>
    </nav>
  );
}