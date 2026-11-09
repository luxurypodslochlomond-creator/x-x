import React from 'react';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';
import '@/components/climate/record-navigator.css';

// ── ONE RAIL, NOT TWO ────────────────────────────────────────────────────────────
// These six marks were drawn twice on every page: once in the masthead and once in the
// dock pinned at the foot. Same drawings, same captions, same active state, forty pixels
// apart at the top of the page and then again at the bottom — which does not make the way
// through the record twice as clear, it makes it look like a page with two headers. The
// rail lives here now, in the one place a thumb can always reach, and the masthead keeps
// only the record's name and the line about how it is kept.
//
// The tongue rides in the same rail as the last mark, behind a hairline: it is a way
// through the record too, so it is cut in the same hand rather than dressed as a form
// control — but it is a setting and not a sixth place to stand, so the rule separates it.
export default function RecordNavigator({ currentPage }) {
  return (
    <nav aria-label="The way through the record" className="rec-art-navigator">
      <div className="rec-art-rail">
        {PRIMARY_NAV.map(({ label, to, page, what }) => (
          <RecordNavDoor key={to} to={to} label={label} what={what} active={currentPage === page} size={38} />
        ))}
        <RecordTongueDoor />
      </div>
    </nav>
  );
}