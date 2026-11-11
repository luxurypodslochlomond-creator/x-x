import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BOOK_DIRECT, INSTAGRAM, EMAIL } from './links';
import {
  KeyMark,
  CabinMark,
  CrossStoneMark,
  CameraMark,
  EnvelopeMark,
  SquirrelMark,
} from './StoneymollanIcons';

/* ── THE DOORS, IN ONE ROW ─────────────────────────────────────────────────────
   Six marks and one red rule under the one we want pressed. Each door is named
   underneath in the machine's small voice — no mystery-meat icons — so the row
   works for somebody who has never seen this page before, in any tongue.

   One row, not two: it is a struck index across the top of a sheet, and an index
   that wraps stops being an index. The labels are set at the smallest size the
   record uses anywhere, which is the whole trick of fitting six across a phone. */
/* Each mark is set down a degree or two off true, and never the same degree twice.
   Six stamps struck one after another onto a sheet are never squared to it — that
   tiny unevenness is what tells the eye this was pressed by a hand instead of
   rendered by a program. */
const DOORS = [
  { label: 'Book', href: BOOK_DIRECT, Mark: KeyMark, external: true, primary: true, tilt: -3 },
  { label: 'Stay', href: '#stay', Mark: CabinMark, tilt: 1.6 },
  { label: 'Wild', href: '#wildlife', Mark: SquirrelMark, tilt: -1.4 },
  { label: 'History', href: '#history', Mark: CrossStoneMark, tilt: 2.4 },
  { label: 'Insta', href: INSTAGRAM, Mark: CameraMark, external: true, tilt: -2.1 },
  { label: 'Email', href: `mailto:${EMAIL}`, Mark: EnvelopeMark, tilt: 1.1 },
];

function Row() {
  return (
    <ul className="mx-auto grid w-full max-w-[44rem] grid-cols-6 gap-x-1">
      {DOORS.map(({ label, href, Mark, external, primary, tilt }) => (
        <li key={label} className="min-w-0">
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`flex flex-col items-center gap-1.5 border-b-2 pb-1.5 transition-colors active:opacity-50 ${
              primary
                ? 'border-record-mark text-record-ink'
                : 'border-record-ink/15 text-record-ink/80 hover:border-record-ink/45 hover:text-record-ink'
            }`}
          >
            <span className="block" style={{ transform: `rotate(${tilt}deg)` }}>
              <Mark className="h-[26px] w-[26px]" />
            </span>
            <span className="block w-full text-center font-mono text-[8px] uppercase leading-none tracking-[0.08em] indent-[0.08em]">
              {label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ── THE INDEX STAYS ON THE SHEET ──────────────────────────────────────────────
   Six doors are no use once they have scrolled away on a page this long, so the
   row stays on the glass: the moment it leaves the top of the screen, the same six
   marks — same size, same hand-cut tilts, no bar drawn around them — sit at the top
   of the phone on a strip of the record's own paper with one hairline under it, and
   the page runs on beneath.

   It is pinned rather than reserved: the row in the sheet is left exactly where it
   was, untouched and unmeasured. Because it can only be docked once it is already
   off the top of the screen, copying it to the glass costs the page nothing — no
   gap to fill, no height to hold, nothing to shift when it comes back. That missing
   jump is the whole difference between a strip that sits still and a page that
   shudders as you scroll.

   It is also drawn straight onto the body rather than inside the sheet, so no
   wrapper further up can quietly re-anchor it. The tongue is left where it is,
   above the name: a language is chosen once, the doors are used the whole way down. */
export default function MastheadDoors() {
  const slotRef = useRef(null);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const slot = slotRef.current;
      if (slot) setDocked(slot.getBoundingClientRect().bottom <= 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div ref={slotRef} className="mt-5 border-t border-record-ink/20 pt-4">
        <nav aria-label="Stoneymollan" aria-hidden={docked || undefined}>
          <Row />
        </nav>
      </div>

      {docked &&
        createPortal(
          <nav
            aria-label="Stoneymollan"
            className="fixed inset-x-0 top-0 z-[60] border-b border-record-ink/20 bg-record-paper px-6 pb-1.5 pt-2"
          >
            <Row />
          </nav>,
          document.body
        )}
    </>
  );
}