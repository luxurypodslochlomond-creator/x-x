import React from 'react';

/* ── ONE STAMP FOR EVERY NUMBERED BAND ─────────────────────────────────────────
   Twelve sections, twelve marks, cut in the same hand as the six doors and the
   people's marks: one weight of line on a twenty-four unit grid, drawn a hair off
   true on purpose.

   Each band carries its own ink, so somebody scanning down the page knows where
   they are before they read a word. It is not a rainbow — every mark is an ink
   line with one coloured thing in it, and the colour is chosen for what the band
   is about: the record's red for the road and the coffin, ocean for the loch and
   the island, moss out of the wood, heather off the muir, gold out of the old glass
   and the low sun. Six inks across twelve bands, never to decorate a heading.

   Keyed by the band's own number, so history.js keeps the order it argues for and
   nothing here has to be kept in step with it. */

const RED = 'rgb(var(--record-mark))';
const OCEAN = 'rgb(var(--record-ocean))';
const MOSS = '#3f6b4a';
const HEATHER = '#6b4a7a';
const GOLD = '#a8760f';

function Mark({ className = 'h-12 w-12', strokeWidth = 1.6, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* 01 — The path. A way round the shoulder of the hill, and the one painted blaze
   a walker follows.

   It was drawn as a flag on a pole, and a flag says somebody is claiming the top.
   A blaze says nothing of the kind: it is a slash of paint on a post, the size of a
   thumb, put there so the next person knows which way the ground went. So the pole
   and the pennant are gone and what is left is one short red mark laid across the
   walking line — still the only colour on the band, still the thing you look for,
   and now quiet enough to be a waymark rather than a summit. */
export function Waymark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3.1 20.7c4.3-1.1 6-3.4 5.4-6.1-.6-2.7.7-4.8 3.4-6.4 2.1-1.2 4.1-1.8 5.8-2.2" />
      <path d="M3.4 21.9h7.2" />
      <path d="M9.4 12.1 12 11.3" stroke={RED} strokeWidth={2.3} />
    </Mark>
  );
}

/* 02 — The loch. Ben Lomond at the head of it, the low sun above, and the water
   drawn as three broken lines rather than one rule, because water is not a rule. */
export function MunroMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M2.5 15.1 8.4 6.1l3.2 5.2 2-2.5 5.9 6.3" />
      <path d="M2.1 17h19.8" />
      <path d="M4.4 19.7h5.6" stroke={OCEAN} />
      <path d="M12.4 19.7h3.1" stroke={OCEAN} />
      <path d="M17.5 19.7h2.5" stroke={OCEAN} />
      <circle cx="17.9" cy="4.3" r="1.3" fill={GOLD} stroke="none" />
    </Mark>
  );
}

/* 03 — The island. The largest freshwater island in Britain: the land lying in the
   water, the old tower still standing in its wood, and the loch drawn as one line
   under it in the loch's own blue.

   The trees were circles on sticks before — lollipops, which is a shape for a map
   key and not for a wood. Trees on a shoreline are crowns and nothing else, so they
   are two small arches now, and the tower is a plain box with one string course,
   which is what is actually left of it. One colour, one line of water. */
export function IslandMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3 16.1c1.7-1.4 4.4-2.1 9-2.1s7.3.7 9 2.1c-1.5 2-4.7 3.1-9 3.1s-7.5-1.1-9-3.1Z" />
      <path d="M5.2 14.9c.6-1.7 2-1.9 2.5-.4" />
      <path d="M8.3 14.4c.7-1.9 2.3-2.1 2.8-.5" />
      <path d="M14.4 14.4V9.7h3.2v4.7" />
      <path d="M14.4 11.8h3.2" />
      <path d="M2.2 21h19.6" stroke={OCEAN} />
    </Mark>
  );
}

/* 04 — Kings, raiders and a queen of five.

   This was a crown set on a stand, and a crown on a stand is a golf tee: the eye
   read the thing underneath as a pin and the whole mark went odd. The stand was
   there to make it "not heraldic", and it made it worse.

   So the crown has simply come off — tipped over and lying on the ground line, in
   the same three points and one band it always had. Nothing is being claimed by a
   crown on its side, and it says the true thing about this band: the kings here are
   all somebody's memory now, and the ground they were kings of is still the ground. */
export function CrownBladeMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3.2 19.6h17.6" />
      <g transform="rotate(-15 12 15.8)">
        <path d="M5.9 15.2 9.1 12.7 12 15.1 14.9 12.7 18.1 15.2" />
        <path d="M6.6 15.4h10.8l-.9 3.1H7.5Z" />
        <circle cx="12" cy="16.9" r="0.8" fill={HEATHER} stroke="none" />
      </g>
    </Mark>
  );
}

/* 05 — Independence. The saltire, drawn as a field with two diagonals in the blue
   of the west shore, and the record's own red set at the crossing — the point
   everything in this band turns on. */
export function SaltireMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3.4 5.2h17.2v13.6H3.4Z" />
      <path d="M3.4 5.2 20.6 18.8M20.6 5.2 3.4 18.8" stroke={OCEAN} strokeWidth={2.3} />
      <circle cx="12" cy="12" r="1.15" fill={RED} stroke="none" />
    </Mark>
  );
}

/* 06 — A road nobody watched. Two ruts worn to the depth of a hollow way, and the
   red thread of it running out of sight between them. */
export function HollowWayMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M4.5 20.5c1.5-4.3 3.4-7.5 5.7-10" />
      <path d="M19.5 20.5c-1.5-4.3-3.4-7.5-5.7-10" />
      <path d="M12 20.2v-6.6" stroke={RED} strokeWidth={1.3} />
      <path d="M2.5 20.6h19" />
      <path d="M7.8 6.5 9.2 8.2M16.2 6.5 14.8 8.2" />
    </Mark>
  );
}

/* 07 — The gate next door. Two piers, the bars between them, and one lamp left
   burning over a house that has been standing there since the fourteenth century. */
export function GateMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M5.5 20.6V8.2h3.2v12.4M15.3 20.6V8.2h3.2v12.4" />
      <path d="M5.5 10.3h3.2M15.3 10.3h3.2" />
      <path d="M8.7 15.1h6.6M8.7 17.9h6.6" />
      <path d="M2.6 20.7h18.8" />
      <circle cx="12" cy="12.3" r="1.1" fill={GOLD} stroke="none" />
    </Mark>
  );
}

/* 08 — The coffin road. Shouldered, never set down: the box, the lid, and one red
   band where a hand took the weight. */
export function CoffinMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M9.4 6.4h5.2l1.1 4.2.6 8.7H7.7l.6-8.7Z" />
      <path d="M8.4 4.7h7.2" />
      <path d="M4.3 20.6h15.4" />
      <path d="M12 10.6v5.2" stroke={RED} />
    </Mark>
  );
}

/* 09 — The Cross Stone Road. A stone that leans, a cross cut into it, and the
   cross's own arm dashed because it went missing around 1880 and this record does
   not draw back what is not there. */
export function BrokenCrossMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M9.5 20.4 11.4 5.6h2l1.3 14.8Z" />
      <path d="M4.5 20.6h15" />
      <path d="M12.3 8.1v4.6" stroke={RED} />
      <path d="M10.7 9.7h3.2" stroke={RED} strokeDasharray="1 1.7" />
    </Mark>
  );
}

/* 10 — The beeches. Two trunks holding up an arch of canopy, the avenue running
   between them like a nave, and one leaf in the green of the wood. */
export function BeechMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M5.5 20.8c-2.1-6.1-1.5-11.7 1.8-15.5" />
      <path d="M18.5 20.8c2.1-6.1 1.5-11.7-1.8-15.5" />
      <path d="M4.4 6.6c4.7-3.1 10.5-3.1 15.2 0" />
      <path d="M12 12.4c1.9-1.5 3.8-.2 3.4 1.9-.4 1.9-2.4 2.7-3.4 4-1-1.3-3-2.1-3.4-4-.4-2.1 1.5-3.4 3.4-1.9Z" fill={MOSS} stroke="none" />
      <path d="M2.7 21h18.6" />
    </Mark>
  );
}

/* 11 — The cairns. A mound in section with its chamber open, the stones in the
   body of it, and one point of quartz still pushing up through the top. */
export function CairnMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3.3 18.3c1.7-4.5 4.7-7.1 8.7-7.1s7 2.6 8.7 7.1Z" />
      <path d="M2.5 18.5h19" />
      <path d="M9.5 18.3v-3.2h5v3.2" />
      <path d="M7.9 11.5h2.1M13.9 11.1h2" />
      <circle cx="12" cy="13" r="0.75" fill={GOLD} stroke="none" />
    </Mark>
  );
}

/* 12 — The strike. A trunk split down the length of it, and the fork that did it,
   in the colour of heather rather than a comic-book yellow, because this is what
   people say happened and the record says so. */
export function StrikeMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M11.1 21V13L9.3 8.6h5.4L13 13v8" />
      <path d="M12 7.4V4.6" />
      <path d="M13.9 2.5 11.2 6.4h2.3l-1.9 3.5" stroke={HEATHER} strokeWidth={1.5} />
      <path d="M4.1 21h15.8" />
    </Mark>
  );
}

/* How you get here — a signpost. One arm for the road and one for the path, on the
   same post, because both are real and the second one is the better of the two. */
export function RouteMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M11.4 21.1V4.4" />
      <path d="M9.4 21.2h4" />
      <path d="M11.4 6.4h7.2l2 2.1-2 2.1h-7.2Z" fill={RED} stroke={RED} strokeWidth={1.2} />
      <path d="M11.4 11.8H4.2l-2 2.1 2 2.1h7.2Z" />
    </Mark>
  );
}

export const BAND_MARKS = {
  '01': Waymark,
  '02': MunroMark,
  '03': IslandMark,
  '04': CrownBladeMark,
  '05': SaltireMark,
  '06': HollowWayMark,
  '07': GateMark,
  '08': CoffinMark,
  '09': BrokenCrossMark,
  '10': BeechMark,
  '11': CairnMark,
  '12': StrikeMark,
};