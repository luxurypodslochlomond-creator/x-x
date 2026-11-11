import React from 'react';

/* ── THE HILL'S OWN MARKS ──────────────────────────────────────────────────────
   Cut, not borrowed. Every mark here is a single-weight line on a 24-unit grid,
   drawn a little off-true on purpose — a diamond bow instead of a perfect ring, a
   squirrel whose tail overshoots, a base stone that leans. That is the difference
   between something cut by hand and something generated.

   And every door carries exactly one stroke of the borrowed red: the
   key's hole, the cabin's lit door, the cross on the old stone, the camera's lens,
   the wax on the envelope. One red mark per door, so the row reads as a set of
   stamps struck onto the same sheet as the type rather than a row of app buttons. */

const ACCENT = 'rgb(var(--record-mark))';
const GLINT = 'rgb(var(--record-bone))';

function Mark({ className = 'h-6 w-6', strokeWidth = 1.9, children }) {
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

/* Book direct — a skeleton key, the red in its bow, hanging a hair off true.
   The bow is drawn as an oval rather than a ring because a ring is a machine's
   circle: this one was cut by eye and is very slightly wider than it is tall, with
   the hole sitting left of centre. The two bits are deliberately unequal. */
export function KeyMark({ className }) {
  return (
    <Mark className={className}>
      <ellipse cx="6.5" cy="6.2" rx="3.15" ry="3.35" />
      <path d="M8.85 8.6 19.6 18.5" />
      <path d="M13.4 12.9 15 11.2" />
      <path d="M15.9 15.2 17.5 13.5" />
      <circle cx="6.8" cy="5.85" r="1.05" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* The stay — the cabin in elevation, eaves overshooting the walls the way a real one
   does, an open door, and the fire where it actually is: out in the yard, in the pit.
   There is no chimney and no smoke, because these cabins do not burn wood inside
   them. The fire is beside the house, not in it, and it is the one red on the mark. */
export function CabinMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M1.8 12.2 8 6.2l6.2 6" />
      <path d="M3.3 11.2v9.2" />
      <path d="M12.7 11.2v9.2" />
      <path d="M2.6 20.4h18.8" />
      <path d="M6.7 20.4v-4.4h2.7v4.4" />
      <path
        d="M17.6 20.4c-1.9-1.7-1.8-4.3.1-6 .4-.3.7-.7.9-1.1.5 1.4 1.7 2.2 2.1 3.4.6 1.7-.5 3.4-2.2 3.7-.3.1-.6.1-.9 0Z"
        fill={ACCENT}
        stroke="none"
      />
    </Mark>
  );
}

/* The road — a leaning standing stone with a cross cut into it, in red, wide enough
   at the foot to stand level with the other five marks instead of reading as a thin
   line between two heavy ones. Surveyed rather than decorated: a stone, a ground
   line, two ticks of grass, and the cut that gave the old road its name. */
export function CrossStoneMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M8.8 20.4 11.9 3.8l1.4-.2 1.7 16.8Z" />
      <path d="M4.4 20.6h15.2" />
      <path d="M12.4 8.3l.5 4.7" stroke={ACCENT} />
      <path d="M10.7 10l4.6.4" stroke={ACCENT} />
      <path d="M6.4 18.8l1.3-1M17.7 18.6l-1.3-1" />
    </Mark>
  );
}

/* Instagram — a rangefinder camera, drawn rather than licensed: a squared body with
   a top plate line, a shutter button, a viewfinder window, and the lens in red with
   one pale point of light in it. Nothing here is anybody else's logo. */
export function CameraMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3.1 8.5h17.8v11.1H3.1Z" />
      <path d="M3.1 11.2h17.8" />
      <path d="M6.1 8.5V7.2h2.2" />
      <path d="M16.6 9.4h2.4" />
      <circle cx="11.3" cy="15.1" r="3.5" />
      <circle cx="11.3" cy="15.1" r="1.5" fill={ACCENT} stroke="none" />
      <circle cx="12.4" cy="14" r="0.65" fill={GLINT} stroke="none" />
    </Mark>
  );
}

/* Contact — a letter sealed in wax, in red, with the notch a thumb leaves in a seal. */
export function EnvelopeMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M2.9 6.2h18.2v12.2H2.9Z" />
      <path d="M3.3 7.1 12 13.6l8.7-6.5" />
      <circle cx="12" cy="16.5" r="2" fill={ACCENT} stroke="none" />
      <path d="M10.9 16.5h2.2" stroke={GLINT} strokeWidth={1.1} />
    </Mark>
  );
}

/* Red squirrel — redrawn. The old one was a body with a loop beside it, and beside is
   the problem: at twenty-six pixels a loop next to a blob reads as a bubble, not an
   animal. It also drew the whole creature, which nothing else on this sheet does — the
   deer is the head, the bird is the bend of the wings, the otter is a head in the water.
   One identifying part, drawn well, is what makes a mark legible at the size it is
   actually seen.

   So this is the two things that are unmistakably a red squirrel and nothing else: the
   plume, sweeping up behind the rump and curling over the head, and the tufted ear —
   tufts are the one field sign that separates a red from a grey. The red is the inner
   curl of the plume, for the same reason as before: a red dot the size of an eye is
   invisible from a metre away, while a red line reads across a room. Nothing else is
   filled, nothing else is coloured, and the whole animal sits inside a 24-unit box. */
export function SquirrelMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M9.1 18.7C5.3 17.7 3.2 13.5 5 9.9c1.4-2.8 4.4-4.4 7.3-3.9" />
      <path d="M12.5 6c1.6.2 2.8 1.4 3.1 2.9" />
      <path
        d="M10.5 16.5c-2.1-.6-3.3-2.6-2.8-4.6.4-1.8 1.9-3.1 3.7-3.3"
        stroke={ACCENT}
      />
      <path d="M13.6 9.6c1.4-1.3 3.6-1.2 4.9.2 1.2 1.3 1.1 3.3-.2 4.5-1.1 1-2.7 1.1-3.9.3" />
      <path d="M15.6 7.1 15.1 4.9" />
      <path d="M17.1 7.3l.4-1.8" />
      <path d="M17.6 12.7l1.4.6" />
      <circle cx="16" cy="10.7" r="0.62" fill="currentColor" stroke="none" />
    </Mark>
  );
}

/* Roe deer — the head, seen straight on. The old mark was two antlers over a stick,
   and at thirty-two pixels inside a plate it stopped being a deer and became a fork;
   a roe's real signature is the narrow long face and the big swept-back ears, so the
   face and the ears carry it and the antlers are only a pair of short spikes with one
   brow tine each. Two eyes, because an animal with no eyes reads as a symbol and not
   as something you might actually meet in the long grass at the top. */
export function DeerMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M12 9.6c1.9 0 3.2 1.6 3.2 3.7 0 2.3-1.5 4.4-3.2 5.5-1.7-1.1-3.2-3.2-3.2-5.5 0-2.1 1.3-3.7 3.2-3.7Z" />
      <path d="M9 11.6C6.8 10.8 5.2 9 4.6 6.9c1.8.1 3.6 1.1 4.6 2.8" />
      <path d="M15 11.6c2.2-.8 3.8-2.6 4.4-4.7-1.8.1-3.6 1.1-4.6 2.8" />
      <path d="M10.5 9.7 9.8 7 8.3 5.4M10 7.8l1.2-.6" />
      <path d="M13.5 9.7 14.2 7l1.5-1.6M14 7.8l-1.2-.6" />
      <circle cx="10.6" cy="13" r="0.62" fill="currentColor" stroke="none" />
      <circle cx="13.4" cy="13" r="0.62" fill="currentColor" stroke="none" />
      <path d="M11.1 16.1h1.8" />
    </Mark>
  );
}

/* Badger and fox — a pad and four toes. The field edges, after dark. */
export function PawMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M12 12.3c2.7 0 4.7 1.6 4.7 3.5 0 2-2 3-4.7 3s-4.7-1-4.7-3c0-1.9 2-3.5 4.7-3.5Z" />
      <ellipse cx="7.1" cy="9.9" rx="1.35" ry="1.5" />
      <ellipse cx="9.9" cy="7.5" rx="1.35" ry="1.55" />
      <ellipse cx="14.1" cy="7.5" rx="1.35" ry="1.55" />
      <ellipse cx="16.9" cy="9.9" rx="1.35" ry="1.5" />
    </Mark>
  );
}

/* Otter — a head in the water, whiskers out. */
export function OtterMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M6.1 15.1c0-2.6 2.5-4.5 5.9-4.5s5.9 1.9 5.9 4.5" />
      <path d="M6.1 15.1c0 2 2.7 3.2 5.9 3.2s5.9-1.2 5.9-3.2" />
      <circle cx="9.9" cy="14.3" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14.1" cy="14.3" r="0.7" fill="currentColor" stroke="none" />
      <path d="M10.9 17.1h2.2" />
      <path d="M4.5 13.2 2.4 12.3M4.5 15.4H2.2M19.5 13.2l2.1-.9M19.5 15.4h2.3" />
    </Mark>
  );
}

/* Osprey — the whole bird is the bend of the wings. */
export function BirdMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M3.4 9.1c2.7-.5 4.7.9 6 2.6 1.4-1.7 3.4-3.1 6-2.6" />
      <path d="M9.4 11.7c.5 3.2.2 5.6-1.4 8" />
      <path d="M14.6 11.7c-.5 3.2-.2 5.6 1.4 8" />
      <path d="M12 4.4v3.2" />
    </Mark>
  );
}

/* Mycelium — a mushroom above, threads below. The bit nobody photographs. */
export function MyceliumMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M3.9 11c0-3.9 3.6-6.5 8.1-6.5s8.1 2.6 8.1 6.5c0 1-1.2 1.6-3 1.6H6.9c-1.8 0-3-.6-3-1.6Z" />
      <path d="M10.5 12.6v4c0 1.3.9 2.2 1.5 2.2s1.5-.9 1.5-2.2v-4" />
      <path d="M6.3 21.4c1.4-.9 2.6-1.3 3.8-1.3M17.7 21.4c-1.4-.9-2.6-1.3-3.8-1.3" />
      <path d="M9.2 18.9 7.5 20.2M14.8 18.9l1.7 1.3" />
    </Mark>
  );
}

/* The way in — a folded map with the road cut across it in red and a dot where the
   tarmac runs out. Two creases, unevenly spaced, because a map that has been folded
   into a coat pocket twice is never folded evenly. */
export function MapMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M2.7 6.8 8.2 4.7l7.6 2.1 5.5-2.1v14.3l-5.5 2.1-7.6-2.1-5.5 2.1Z" />
      <path d="M8.2 4.7v14.3M15.8 6.8v14.2" />
      <path d="M4.5 17c2.4-3.2 4.3-5 6.5-5.9 1.8-.7 3.4-.5 4.9.3" stroke={ACCENT} />
      <circle cx="16" cy="11.4" r="1.2" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* Getting picked up — a handset lifted off its cradle. Not a smartphone outline,
   because there is no smartphone up that hill and the mark would be a decade out of
   date by the next one; a receiver with a cup at each end is the shape everybody still
   knows. The red is the button under it, which is the one part a thumb touches. */
export function CallMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.75}>
      <path d="M4.1 11.9c0-1.4 1.1-2.5 2.5-2.5h10.8c1.4 0 2.5 1.1 2.5 2.5v1.7H4.1Z" />
      <path d="M4.1 13.6v2.1c0 .7.6 1.3 1.3 1.3h1.2c.7 0 1.3-.6 1.3-1.3v-.8" />
      <path d="M19.9 13.6v2.1c0 .7-.6 1.3-1.3 1.3h-1.2c-.7 0-1.3-.6-1.3-1.3v-.8" />
      <path d="M6.6 20.5h10.8" />
      <circle cx="12" cy="12.7" r="1.15" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* ── THE PEOPLE'S MARKS ────────────────────────────────────────────────────────
   Same hand, same 24-unit grid, same one stroke of the borrowed red as the six
   doors above — so a list of kings reads as part of the same stamped sheet rather
   than a set of bullet points. Nothing here is a heraldic invention: the crown is a
   coronet with no claim on it, the sword is a blade and a crossguard, the castle is
   the tower that actually stands in the trees on Inchmurrin, the ship is the one a
   five-year-old queen sailed from Dumbarton, the hoof is the cattle Rob Roy's men
   took off the island, the quill is a writer's and the mountain is a walker's. */

/* A king — the band, three points, and one red stone. */
/* Pass it on — a paper dart, and the crease of the fold in red.

   The last one was a road bending away with an arrowhead on the end, which is a
   signpost: it says "this way", not "have it". A share is a person deciding somebody
   else should see a thing, and the oldest gesture for that is taking the page you are
   holding, folding it, and throwing it to them. So: the page, folded, in flight.

   It is also the one mark on the sheet that is made of the same material as the sheet.
   The doors are places, animals and objects; this is paper, sent. Drawn as two strokes
   only — the dart's own outline, and the spine where it was creased — because at
   twenty pixels on a phone bar every extra line is noise, and the silhouette of a dart
   is one of the few shapes nobody needs teaching. */
export function ShareMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M20.9 4.3 3.1 11.5l6.9 2.5 3.4 5.7Z" />
      <path d="M20.9 4.3 10 14" stroke={ACCENT} />
    </Mark>
  );
}

export function CrownMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M4.2 10.3 7.6 14 12 7.4l4.4 6.6 3.4-3.7" />
      <path d="M5.7 14.5h12.6l-1 4.3H6.7Z" />
      <circle cx="12" cy="16.6" r="1.15" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* A blade, standing — and the red at the pommel where a hand went. */
export function SwordMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M12 3.3 13 5.6v10.4h-2V5.6Z" />
      <path d="M8.4 16.4h7.2" />
      <path d="M12 16.6v3.2" />
      <circle cx="12" cy="20.6" r="1.05" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* The tower that is still standing in the trees on the island — three merlons, one
   window lit in red, and the ground it stands on. */
export function CastleMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M7 20.3V10.4h10v9.9" />
      <path d="M7 10.4V7.7h2.1v1.7M10.9 10.4V7.7h2.1v1.7M14.8 10.4V7.7h2.1v1.7" />
      <path d="M4.4 20.5h15.2" />
      <circle cx="12" cy="13.4" r="1.05" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* A hull, a mast, and a red sail taking a five-year-old queen out of reach. */
export function ShipMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M3.9 16.3h16.2l-2.3 3.3H6.2Z" />
      <path d="M12 16.1V4.3" />
      <path d="M12.7 6.1 18 15.1h-5.3Z" fill={ACCENT} stroke={ACCENT} strokeWidth={1.1} />
      <path d="M9.9 8.6 6.9 15.1h3" />
    </Mark>
  );
}

/* A cloven hoof — cattle lifted off an island, and every boat on the water held
   to do it. The cleft is the red. */
export function HoofMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M6.7 10.4c0-3.2 2.4-5.7 5.4-5.7s5.4 2.5 5.4 5.7c0 4.4-2.2 8.1-5.4 8.1s-5.4-3.7-5.4-8.1Z" />
      <path d="M12 5.4v12.4" stroke={ACCENT} />
      <path d="M8.6 17.9c.8.7 2 1.1 3.4 1.1s2.6-.4 3.4-1.1" />
    </Mark>
  );
}

/* A feather and its nib — the man who preferred this loch to Garda and Geneva. */
export function QuillMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M4.7 19.3C6 12.9 11 5.6 19.5 4.5c-.8 8.3-7.1 13.2-13.9 14.3" />
      <path d="M7.1 17 15.7 8.4" />
      <path d="M4.9 19.2 8.2 15.9" />
      <circle cx="4.7" cy="19.4" r="1" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* A hill, and what the walker went to find on top of it. */
export function MountainMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M3.2 19.4 9.5 8.3l3.4 6.5 2-3.5 5.9 8.1Z" />
      <path d="M2.4 20.6h19.2" />
      <circle cx="9.5" cy="5.7" r="1.15" fill={ACCENT} stroke="none" />
    </Mark>
  );
}