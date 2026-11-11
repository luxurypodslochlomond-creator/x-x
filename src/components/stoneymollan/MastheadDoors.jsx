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

/* ── THE DOORS ACROSS THE MASTHEAD ─────────────────────────────────────────────
   Six marks, the way the record marks its own cover: cut icons, mono labels, a
   hairline under each. The key is red because it is the one we want pressed — a
   booking taken here reaches Brian and Gillian instead of a platform's commission.
   Nothing here is a mystery-meat icon: each one is named underneath it. */
const DOORS = [
  { label: 'Book', href: BOOK_DIRECT, Mark: KeyMark, external: true, primary: true },
  { label: 'The stay', href: '#stay', Mark: CabinMark },
  { label: 'Wildlife', href: '#wildlife', Mark: SquirrelMark },
  { label: 'History', href: '#history', Mark: CrossStoneMark },
  { label: 'Instagram', href: INSTAGRAM, Mark: CameraMark, external: true },
  { label: 'Email', href: `mailto:${EMAIL}`, Mark: EnvelopeMark },
];

export default function MastheadDoors() {
  return (
    <nav aria-label="Stoneymollan" className="mt-5 border-t border-record-ink/20 pt-4">
      <ul className="grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-6">
        {DOORS.map(({ label, href, Mark, external, primary }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`flex flex-col items-center gap-1.5 px-1 py-1 transition-opacity active:opacity-60 ${
                primary ? 'text-record-mark' : 'text-record-ink/85 hover:text-record-ink'
              }`}
            >
              <Mark className="h-7 w-7" />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em]">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}