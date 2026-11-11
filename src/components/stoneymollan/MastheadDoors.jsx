import React, { useEffect, useRef, useState } from 'react';
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

/* ── THE INDEX STAYS ON THE SHEET ──────────────────────────────────────────────
   Six doors are no use once they have scrolled away on a page this long. So the
   row docks: the moment it leaves the top of the screen it becomes the top of the
   screen — the same six marks, the same hand-cut tilts, on a strip of the record's
   own paper with one hairline under it, and the page runs on beneath.

   What it is not: a bar. No shadow, no white, no second set of marks drawn smaller
   for the occasion. Same marks, same row, simply nearer the top of the glass.

   The tongue is left exactly where it is, above the name, because a language is
   something you choose once and the doors are something you use the whole way
   down. Docking the tongue would put a control in the reader's way at every
   scroll; letting it go with the name is correct.

   The slot it came out of keeps its height while the row is away, so the page
   never jumps up by a row when it docks. */
export default function MastheadDoors() {
  const navRef = useRef(null);
  const slotRef = useRef(null);
  const [docked, setDocked] = useState(false);
  const [railHeight, setRailHeight] = useState(0);

  useEffect(() => {
    const measure = () => setRailHeight(navRef.current?.offsetHeight || 0);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const slot = slotRef.current;
      if (slot) setDocked(slot.getBoundingClientRect().top <= 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={slotRef} className="mt-5 border-t border-record-ink/20 pt-4">
      {/* The space the row came out of — held open so nothing shifts under the thumb. */}
      <div aria-hidden="true" style={{ height: docked ? railHeight : 0 }} />

      <nav
        ref={navRef}
        aria-label="Stoneymollan"
        className={
          docked
            ? 'fixed inset-x-0 top-0 z-40 border-b border-record-ink/20 bg-record-paper px-6 pb-1.5 pt-2'
            : ''
        }
      >
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
      </nav>
    </div>
  );
}