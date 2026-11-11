import React from 'react';
import { BOOK_DIRECT, INSTAGRAM, EMAIL } from '@/components/stoneymollan/links';
import { KeyMark, CabinMark, CrossStoneMark, CameraMark, EnvelopeMark, SquirrelMark, MapMark } from '@/components/stoneymollan/StoneymollanIcons';

/* Seven doors now, and the seventh is the one a stranger reaches for first: the way in.
   It sits last, after the letter, because it is the answer to the question the other six
   raise — where is this, and how do I get to it. */
const DOORS = [
  { label: 'Book', href: BOOK_DIRECT, Mark: KeyMark, external: true, primary: true, tilt: -3 },
  { label: 'Stay', href: '#stay', Mark: CabinMark, tilt: 1.6 },
  { label: 'Wild', href: '#wildlife', Mark: SquirrelMark, tilt: -1.4 },
  { label: 'History', href: '#history', Mark: CrossStoneMark, tilt: 2.4 },
  { label: 'Insta', href: INSTAGRAM, Mark: CameraMark, external: true, tilt: -2.1 },
  { label: 'Email', href: `mailto:${EMAIL}`, Mark: EnvelopeMark, tilt: 1.1 },
  { label: 'Map', href: '#getting-here', Mark: MapMark, tilt: -1.9 },
];

/* The marks are hand-cut and set at a slight tilt, so the row reads as stamped rather
   than laid out. The tilt is handed to the stylesheet as a variable instead of an inline
   transform, which is what lets a mark straighten up when a hand reaches for it — see
   .sm-door in stoneymollan-navigation.css.

   Seven across a phone is the limit: the marks lose two pixels each and the labels lose
   half a point, so the row still reads as a row rather than a squeeze. */
export default function StoneymollanDoorRow() {
  return (
    <ul className="mx-auto grid w-full max-w-[44rem] grid-cols-7 gap-x-1">
      {DOORS.map(({ label, href, Mark, external, primary, tilt }, i) => (
        <li key={label} className="sm-door-item min-w-0" style={{ '--sm-i': i }}>
          <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`sm-door flex flex-col items-center gap-1.5 border-b-2 pb-1.5 transition-colors active:opacity-50 ${primary ? 'border-record-mark text-record-ink' : 'border-record-ink/15 text-record-ink/80 hover:border-record-ink/45 hover:text-record-ink'}`}>
            <span className="sm-door-mark" style={{ '--sm-tilt': `${tilt}deg` }}>
              <Mark className="h-[24px] w-[24px]" />
            </span>
            <span className="sm-door-label block w-full text-center font-mono text-[10px] uppercase leading-none tracking-[0.01em]">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}