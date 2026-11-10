import React from 'react';
import { useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import '@/components/climate/record-navigator.css';

// ── THE INDEX AS A PLATE OF DOORS, NOT A LIST OF NAMES ──────────────────────────
// The sheet that opens from the rail was set as a printed column index: names, hairlines,
// and the drawings shrunk to sixteen pixels in a gutter — legible, tidy, and exactly the
// look of a library card catalogue. A reader opening the record's own contents met a
// document about the record rather than the record.
//
// So the sheet is now what the rail is: every door of the record, cut in the same hand,
// at a size a thumb can see it at, in four equal columns. All of them, in four parts, on
// one screen — the ways in, how it is kept, what is elsewhere, and what is behind it.
// Nothing is added and nothing is dropped: it is the same CONTENT_GROUPS the written
// guide prints, drawn instead of typed, and it can never drift from the rail because
// both read the same list and the same marks.
export default function RecordIndexPlate({ onNavigate }) {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();

  // ── THE KEEPER'S ROOM CAME HERE WITH THE RULEBOOK ──────────────────────────────
  // The masthead is six marks with nothing past the edge of the glass, so the keeper's own
  // room came off it. It is still a door, and it is still the record's rather than the
  // building's: this sheet is where a keeper opens it, and a reader who holds no keys is
  // never shown a door that would turn them away.
  //
  // It is called "The keeper's room" and it is not called "the shed" any more. The shed was
  // the founder's own word and it is a good word in her mouth — a hut at the end of a garden
  // where things get made — but a label has to work for someone who was handed a key and a
  // link, has never spoken to her, and has to decide what is behind it in half a second. This
  // record already learned that once: the rail carried a mark called "Shed" and readers did
  // not understand it, so it came off. Reusing the word in the index would have brought the
  // same confusion back in a quieter place. The room is named after what it is, and after the
  // page it opens, which is already called the keeper's room on its own door.
  const groups = isKeeper || isChecker
    ? [...CONTENT_GROUPS, { title: 'Yours', doors: [{ label: "The keeper's room", to: '/ClimateKeeperRoom', what: 'Your own room: decide, check, people, counts.' }] }]
    : CONTENT_GROUPS;

  return (
    <div className="text-record-ink">
      {groups.map(({ title, doors }, part) => (
        <section key={title} className="mb-2.5 first:mt-0">
          <h2 className="mb-1 flex items-center gap-1.5">
            <span className="font-mono text-[9px] leading-none tabular-nums text-record-mark">
              {String(part + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[9px] uppercase leading-none tracking-[0.16em] text-record-muted">{title}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-record-ink/20" />
          </h2>
          {/* ── FEWER ACROSS, SO EACH ONE CAN BE READ ────────────────────────────────
              Four and five across packed fifteen doors onto a screen and read as a wall:
              the marks came down to twenty-eight pixels and the names under them to two
              squeezed words. Three across on a phone and four on a wide sheet costs a
              little height and buys back the thing an index is for — a name you can read
              without leaning in. */}
          <nav aria-label={title} className="grid grid-cols-3 items-start gap-x-2 gap-y-1 sm:grid-cols-4 sm:gap-x-4">
            {doors.map(({ label, to, what }) => (
              <RecordNavDoor
                key={to}
                to={to}
                label={label}
                what={what}
                size={32}
                active={pathname === to}
                onClick={onNavigate}
                className="w-full !min-h-0 !py-1.5"
              />
            ))}
          </nav>
        </section>
      ))}
    </div>
  );
}