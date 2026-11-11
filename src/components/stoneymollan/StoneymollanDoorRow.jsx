import React from 'react';
import { BOOK_DIRECT, INSTAGRAM, EMAIL, TAXI_TEL } from '@/components/stoneymollan/links';
import { KeyMark, CabinMark, CrossStoneMark, CameraMark, EnvelopeMark, SquirrelMark, MapMark, CallMark } from '@/components/stoneymollan/StoneymollanIcons';

/* ── EIGHT DOORS, IN TWO ROWS ON A PHONE ──────────────────────────────────────
   Seven across a narrow glass was already the limit: the marks went down to twenty-four
   pixels and the words to ten. An eighth would have taken the marks to eighteen and the
   words to nine, and a row that small stops being a row of stamps and becomes a smear.

   So the row folds. Four over four under the name on a phone, and all eight in one line
   on a laptop where there is room to set them full size. It costs about fifty pixels of
   the top of a phone screen and buys back every door on the page.

   The order is the order a stranger meets them. First the four that do something — book
   it, sleep in it, find it, ring somebody to come up the hill for you. Then the four that
   tell you what you have walked into: the history, what lives here, the pictures, the
   letter. */
const DOORS = [
  { label: 'Book', href: BOOK_DIRECT, Mark: KeyMark, external: true, primary: true, tilt: -3 },
  { label: 'Stay', href: '#stay', Mark: CabinMark, tilt: 1.6 },
  { label: 'Map', href: '#getting-here', Mark: MapMark, tilt: -1.9 },
  { label: 'Taxi', href: TAXI_TEL, Mark: CallMark, tilt: 2.2 },
  { label: 'History', href: '#history', Mark: CrossStoneMark, tilt: 2.4 },
  { label: 'Wild', href: '#wildlife', Mark: SquirrelMark, tilt: -1.4 },
  { label: 'Insta', href: INSTAGRAM, Mark: CameraMark, external: true, tilt: -2.1 },
  { label: 'Email', href: `mailto:${EMAIL}`, Mark: EnvelopeMark, tilt: 1.1 },
];

/* The marks are hand-cut and set at a slight tilt, so the row reads as stamped rather
   than laid out. The tilt is handed to the stylesheet as a variable instead of an inline
   transform, which is what lets a mark straighten up when a hand reaches for it — see
   .sm-door in stoneymollan-navigation.css. */
export default function StoneymollanDoorRow() {
  return (
    <ul className="mx-auto grid w-full max-w-[44rem] grid-cols-4 gap-x-1 gap-y-2.5 md:grid-cols-8">
      {DOORS.map(({ label, href, Mark, external, primary, tilt }, i) => (
        <li key={label} className="sm-door-item min-w-0" style={{ '--sm-i': i }}>
          <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`sm-door flex flex-col items-center gap-1.5 border-b-2 pb-1.5 transition-colors active:opacity-50 ${primary ? 'border-record-mark text-record-ink' : 'border-record-ink/15 text-record-ink/80 hover:border-record-ink/45 hover:text-record-ink'}`}>
            <span className="sm-door-mark" style={{ '--sm-tilt': `${tilt}deg` }}>
              <Mark className="h-[22px] w-[22px] md:h-[24px] md:w-[24px]" />
            </span>
            <span className="sm-door-label block w-full text-center font-mono text-[10px] uppercase leading-none tracking-[0.01em]">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}