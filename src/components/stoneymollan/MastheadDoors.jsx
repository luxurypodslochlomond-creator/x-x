import React from 'react';
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
const DOORS = [
  { label: 'Book', href: BOOK_DIRECT, Mark: KeyMark, external: true, primary: true },
  { label: 'Stay', href: '#stay', Mark: CabinMark },
  { label: 'Wild', href: '#wildlife', Mark: SquirrelMark },
  { label: 'History', href: '#history', Mark: CrossStoneMark },
  { label: 'Insta', href: INSTAGRAM, Mark: CameraMark, external: true },
  { label: 'Email', href: `mailto:${EMAIL}`, Mark: EnvelopeMark },
];

export default function MastheadDoors() {
  return (
    <nav aria-label="Stoneymollan" className="mt-5 border-t border-record-ink/20 pt-4">
      <ul className="grid grid-cols-6 gap-x-1">
        {DOORS.map(({ label, href, Mark, external, primary }) => (
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
              <Mark className="h-[26px] w-[26px]" />
              <span className="truncate font-mono text-[8px] uppercase leading-none tracking-[0.08em]">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}