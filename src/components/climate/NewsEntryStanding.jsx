import React from 'react';
import { Link } from 'react-router-dom';
import { verificationOf, verificationNoteOf } from '@/components/climate/verification';

// ── EVERY WORD HERE GOES SOMEWHERE ────────────────────────────────────────────
// Brian, 26 November: "cant click corrected … or single source or new york times is this
// wrong bro? … needs to be connected to relevant place … zero bullshit or not source etc
// across platform … as some click goto top of page".
//
// It was wrong, and in the way that matters most on this record: the three words a sceptical
// reader needs — who says so, how well it stands, whether it has been corrected — were set as
// plain text. "New York Times" could not reach the New York Times. "Single source" explained
// nothing. "Corrected" showed a word and hid the correction.
//
// So each word is a door, and each door opens ON the thing it names, not at the top of a
// page: the source opens the publisher's own page in a new tab, the standing opens the entry's
// source block where the three levels are spelled out, and Corrected opens the correction
// itself. When no origin is held, the line says so plainly and opens the note that says why —
// that is the zero-bullshit version, and it is a link rather than an absence.
export default function NewsEntryStanding({ entry, className = '' }) {
  const to = `/ClimateWireEntry/${entry.id}`;
  const standing = verificationOf(entry);
  return (
    <p className={`news-standing ${className}`.trim()}>
      {entry.where_label && <span>{entry.where_label}</span>}
      {entry.source_url ? (
        <a
          href={entry.source_url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open the source itself: ${entry.source_name || entry.source_url}`}
        >
          {entry.source_name || 'Source'} ↗
        </a>
      ) : (
        <Link to={`${to}#sources`} title="No link to the origin is held for this entry. The note says so in the open.">
          Source not held
        </Link>
      )}
      <Link to={`${to}#sources`} title={verificationNoteOf(entry)}>{standing.label}</Link>
      {entry.correction_note && <Link to={`${to}#corrections`} className="news-standing-corrected">Corrected</Link>}
    </p>
  );
}