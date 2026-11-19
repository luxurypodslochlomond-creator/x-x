import React from 'react';

// ── THE MARKS AT THE FOOT ──────────────────────────────────────────────────────
// The foot of the record used to be a list of links with a sentence under each, and a
// sentence under a link is a menu explaining itself. It is nine doors now, and each one
// is a word beside a mark drawn for that door and nothing else.
//
// Same hand as the shed's marks: one weight, currentColor, no second colour, one solid
// mass in each so the mark is an object rather than a diagram. Nothing here has a line
// thinner than the stroke, and every mark is drawn to be read at the size it is actually
// shown at: twenty-four pixels on the phone's first row, nineteen on the second. A mark cut
// for twenty-six and shrunk to nineteen loses its red and its thin strokes, which is how
// three of these were caught being wrong.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// ── ONE HAND, AND IT IS A PRINTED HAND ────────────────────────────────────────
// The top of the record is twelve doors, and a set only reads as a set if it has a rule
// rather than a style. The rule here is three lines long: solid masses, nothing thinner
// than a stroke, and exactly one element in the record's red — the part of the object that
// is the point. Hairlines cannot do this job. At nineteen pixels, which is the size the
// phone's second row actually gives a mark, a drawn line closes into a smudge and the red
// in it disappears; a mass does not. That is why the row now reads as a register with a red
// spine, a dated dispatch, a numeral on a red base, a dome on a red horizon, a course of
// bricks with one red, and four panes with one red — and it is the test to apply to
// anything added to this file later.
//
// An open folio, its leaves and spine drawn as separate ink gestures.
export function MarkBrief({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M19.8 10.7C15.6 6.9 9.2 5.8 3.5 7.2L5.1 29.8c5.2-1.4 10.1-.3 14.6 3.7" />
      <path d="M20.1 10.7c4.3-4 10.7-5.2 16.3-3.3l-1.7 22.4c-5.1-1.5-10.4-.2-14.6 3.7" />
      <path d="M7.1 12.4c3.2-.3 6.2.5 8.5 2.2M7.8 17.2c2.7-.1 5.4.5 7.9 2.2M8.2 22c2.9-.1 5.1.5 7.2 1.9M24.1 14.4c2.2-1.6 5.1-2.4 8-2M24 19.4c2.1-1.5 4.6-2.2 7.7-2" />
      <path d="M20 10.4c-.9 7.1.8 15.8-.1 23.1" className="text-record-mark" strokeWidth="2.1" />
      <path d="M3.2 32.9c6.8-1.2 11.9.3 16.5 3.2 5-3 10.2-4.4 16.8-3" opacity=".45" />
    </svg>
  );
}

// ── WHAT IS ON THE RECORD, AND WHY IT STOPPED WEARING THE BRIEF'S DRAWING ──────
// Brian, 19 November: "don't like the record icon with Bri[ef] — think we can be more
// coolasfuck for right reasons, not boring or old or copy cat."
//
// He caught a real fault, not a taste. The first door on the rail was wearing MarkBrief —
// the open folio drawn for the project brief — because it was the first drawing there was
// and nothing ever took it back. So the record itself and a page *about* the record wore
// one picture, and the door a reader arrives at was the one door with no mark of its own.
//
// So the record is now what a record physically is: a bound register, closed, seen from the
// fore-edge. Solid ink for the cover, the record's own red for the spine, the spine standing
// proud of the cover the way a bound edge does. Two masses, nothing drawn, nothing thin — it
// survives nineteen pixels on a phone's second row, which is where this door actually lives,
// and the brief goes back to being the only door with an open folio.
export function MarkRecord({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="5.4" y="4.4" width="6.4" height="31.2" className="text-record-mark" fill="currentColor" stroke="none" />
      <rect x="14.2" y="6.4" width="20.6" height="27.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

// What is planned, and what is still missing. One page, folded at its corner, its last line
// stopped short — a brief that says out loud where it runs out.
export function MarkPlan({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      {/* What is live, what is planned and what is still missing, drawn as what it is: a
          stair. Two steps are built and stand in ink; the third is the record's red and is
          the one nobody has laid yet. The hairline page with its corner turned said "a
          document", which is the medium and not the claim. */}
      <rect x="4.2" y="27.2" width="11.4" height="8.6" fill="currentColor" stroke="none" />
      <rect x="15.8" y="18.4" width="11.4" height="8.6" fill="currentColor" stroke="none" />
      <rect x="27.4" y="9.6" width="11.4" height="8.6" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── THE PERSON WHO ASKED FOR IT, DRAWN ONCE AND PROPERLY ────────────────────────
// Brian, 17 November: "icons for founder you sure right bro looks like haven't thought
// about it properly". He was right, and the fault was a drawing trying to be a likeness.
// The old mark was a continuous profile of a face, cut with five wandering strokes — at
// thirty-four pixels in a rail it became a knot of ink that read as scribble, and at
// twenty-two in a two-row rail it would read as dirt on the glass.
//
// A head and two shoulders then took its place, and that was worse: at twenty-two pixels
// it is the sign on a toilet door. It is not a likeness of anybody, it is a pictogram of
// "person", and a pictogram of "person" beside the words *Record* and *Wire* says nothing
// this record can defend. The complaint that killed it was made twice and both times
// right: it was not subtle, and it was not powerful, because a symbol that means "a human
// being was here" means it about eight billion people at once.
//
// So the mark is not the person. It is the act that put her name on the record: a nib,
// laid to the line, caught the instant before it writes. One object, at an angle, with a
// vent and a slit — the only pen on the record that is not a tool of measurement (the
// dividers) or a tool of the hand (the pencil), and the one a signature is actually made
// with. It reads at twenty-two pixels as a nib because a nib is a shape nobody mistakes
// for anything else once it is not standing up: the tilt is what keeps it from being a
// map pin, and the red rule under it is the record's own ground, the same one every mark
// on this sheet stands on.
//
// Subtle and powerful are not opposites here: subtlety is the object being small and
// exact, power is that it means something a reader can say out loud — *somebody signed
// this into being* — rather than merely illustrating the word above it.
export function MarkSignature({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* The nib is a mass now rather than an outline with a slit and a breather hole in it:
          both of those were under a pixel at nineteen and turned the point into a smudge. The
          red line stays exactly where it was — the hand, laid to the line. */}
      <g transform="rotate(-30 20 20)">
        <path d="M20 34.2c-4.9-5.5-6.3-13.2-5.2-22.1 3.3-2 7.1-2 10.4 0 1.1 8.9-.3 16.6-5.2 22.1Z" fill="currentColor" stroke="none" />
      </g>
      <rect x="6.4" y="31.4" width="27.2" height="3.6" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// How it is made. A pair of dividers set to the page.
export function MarkMethod({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* A stamp coming down on its mark: the knob, the head, and the red impression it
          leaves. The method is what a reader is really asking about — how does anything get
          on this record — and a thing that presses a mark is the plainest answer there is.
          The tripod it wore before was a diagram of weighing, drawn in hairlines. */}
      <rect x="16.2" y="4.4" width="7.6" height="5.6" rx="2.8" fill="currentColor" stroke="none" />
      <path d="M11.4 21 13.6 9.4h12.8L28.6 21Z" fill="currentColor" stroke="none" />
      <rect x="6.2" y="25" width="27.6" height="6.6" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// A correction, in proofreader's hand: the line as it stands, and the insertion rising
// to its point. Nothing is quietly deleted on this record.
export function MarkCorrection({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M4.2 12.7c9.4-.6 21.6.7 31.1-.2M5.3 19.9l9.2-.2M25.5 20.1l9.1-.3M5 31.2c6.9-.6 13.1.3 19.8-.1" />
      <path d="M13.1 25.8l6.8-9.5 7.3 9.1M20 5.2l-.1 6.1" className="text-record-mark" strokeWidth="1.9" />
      <path d="M29.9 32.5l2 1.7 4.1-5.2" />
    </svg>
  );
}

// The people who check. Two pairs of eyes, set to the same page.
export function MarkCheckers({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* A pair of eyes as two solid almonds, the second one in the record's red, because a
          witness is somebody who is looking. Two outlined circles with four ticks around
          them was a diagram of a pair of glasses at twenty-four pixels. */}
      <path d="M3.6 20c2.9-5 5.7-7.5 8.5-7.5s5.6 2.5 8.5 7.5c-2.9 5-5.7 7.5-8.5 7.5S6.5 25 3.6 20Z" fill="currentColor" stroke="none" />
      <path d="M19.4 20c2.9-5 5.7-7.5 8.5-7.5s5.6 2.5 8.5 7.5c-2.9 5-5.7 7.5-8.5 7.5s-5.6-2.5-8.5-7.5Z" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Who is on the list — the roll itself, not the pair of eyes that does the checking. A page
// of names with a seal set against it, because the roll was the one door in the drawer still
// wearing the record's own folio: two different doors, one picture, and a reader who saw the
// same sheet twice stopped believing the drawer meant anything.
export function MarkRoll({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* Names down a page, and the last one in red because it is the newest name on the
          roll. A sheet with ruled lines and a tiny tick said "document"; three masses down
          a page say "a list of people" and survive being nineteen pixels wide. */}
      <rect x="10.4" y="4.8" width="19.2" height="9.2" fill="currentColor" stroke="none" />
      <rect x="10.4" y="16.8" width="19.2" height="9.2" fill="currentColor" stroke="none" />
      <rect x="10.4" y="28.8" width="19.2" height="9.2" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// What changes hands. One set of hands to another, and the direction said out loud.
export function MarkHandover({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* What changes hands: the record as one mass, and the record's red going up out of it
          to somebody else. Two dots and two hairlines was the arrow and nothing to carry;
          a solid block with a heavy red arrow off it is the whole sentence at a glance. */}
      <rect x="4.4" y="25" width="18.4" height="11" fill="currentColor" stroke="none" />
      <path d="M21.8 23.6 30.8 14.6" className="text-record-mark" fill="none" strokeWidth="4.4" strokeLinecap="butt" />
      <path d="M22.4 14.2h9.6v9.6" className="text-record-mark" fill="none" strokeWidth="4.4" strokeLinecap="butt" strokeLinejoin="miter" />
    </svg>
  );
}

// The music given to the record. A fork, struck once.
export function MarkMusic({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* The fork, solid: two prongs, the bend that joins them, and the handle in the
          record's red. A tuning fork drawn in outline is three hairlines at nineteen
          pixels; the same fork as mass is one object with a red foot, and it is the only
          mark in the set that stands on a stem. */}
      <rect x="12.4" y="4.8" width="5.6" height="16" fill="currentColor" stroke="none" />
      <rect x="22" y="4.8" width="5.6" height="16" fill="currentColor" stroke="none" />
      <path d="M15.2 17.6v2.2a4.8 4.8 0 0 0 9.6 0v-2.2" fill="none" stroke="currentColor" strokeWidth="5.6" strokeLinecap="butt" />
      <rect x="17.2" y="24.4" width="5.6" height="10.8" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// A pencil, sharpened, and the dot it has just made.
//
// The door for the room of cartoons. It is one object rather than a diagram — the barrel
// as two lines, the cap, the two cuts of the point — and the single solid mass is the mark
// the pencil has just left, in the record's borrowed red. Drawn in the same hand as the
// rest: one weight, currentColor, nothing thinner than the stroke, because it is read at
// twenty-six pixels on a phone.
export function MarkPencil({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M21.4 11.6 9.6 23.4M28.2 18.4 16.4 30.2" />
      <path d="M21.4 11.6 28.2 18.4M9.6 23.4 5.8 33.6M16.4 30.2 5.8 33.6" />
      <circle cx="5.8" cy="33.6" r="1.7" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── THE CARTOON ROOM'S OWN MARK ────────────────────────────────────────────────
// The pencil was drawn for this door and it was the wrong drawing: a pencil is the mark of
// writing, of editing, of a thing being made. It says nothing about the room behind it,
// which is a room full of faces pulled at the world. So the mark is the thing itself — a
// speech balloon with a face in it, grinning. Two dots and a line is enough at 28px, and
// it is the only mark on the record that looks back at the reader, which is exactly what
// a cartoon does. Brian asked for a cartoon icon of its own, 18 November.
// ── THE DOOR TO THE DRAWINGS, DRAWN AGAIN ─────────────────────────────────────
// Brian, 18 November: "the icon for cartoons isn't coolasfuck". He was right, and the
// reason is measurable: the old mark was a tidy rounded bubble with two dots and a small
// closed smile — a chat icon, the same picture every messaging app on earth uses. On a rail
// of drawn marks it was the one that looked borrowed.
//
// So the balloon is now a shouted one: drawn out of true, tipped over, its tail kicked
// sideways the way a word is drawn in a strip, with the eyes cut at an angle and the mouth
// wide open in the record's own red. Still one weight, still one solid mass, still readable
// at twenty-two pixels in the rail — but it looks back at the reader and it is laughing.
// ── THE WALL, AND DELIBERATELY NOT A BRICK ONE ────────────────────────────────
// The room wore a speech balloon with a face in it: the mark of a cartoon as a thing that
// talks, which is true of the trade and not true of this room. What the room is, is a wall
// — and every wall symbol in the world is drawn as the other meaning, bricks and courses
// and a barrier, which is why a "wall" icon usually reads as a border or a door being shut
// on somebody. That is the one thing this room is not.
//
// So it is a line across the page with one drawing pegged to it and one place still empty,
// marked in red where the next one goes. The line holds the work up, the drawing is
// somebody's hand, and the gap is the record asking rather than the record missing
// something.
//
// ── BRICKS, BECAUSE HE SAID THE TRUE THING TWICE ──────────────────────────────
// Brian, 19 November, after two redraws: "icons look like old web icons bro and boring like
// old ex colors one… the wall isn't doing it for me think icon can relearn so much more
// simply bro and blow Francis etc mind I loved Pink Floyd the wall bro."
//
// He is right, and the diagnosis is not about this door — it is about the whole sheet. Every
// mark on the rail is the same thing: a thin outline at one weight, one red accent, a
// drawing of an object. That is exactly what an icon pack looks like, and an icon pack is
// what "old web" means. Line art is how a computer draws a picture of a thing. It is not how
// a printer prints a mark.
//
// So this door stops being a drawing of a wall and becomes a wall: solid bricks, laid in
// running bond, no outlines at all. Two ink bricks and one in the record's red, sitting in
// the course beneath them, straddling the joint — because the wall on this record is built
// one brick at a time out of what people give it, and the red one is the brick that is
// still yours to lay. Three shapes. It reads at nineteen pixels because a solid mass has
// nothing to lose when it shrinks, which a hairline does.
//
// Pink Floyd's wall is a wall of bricks and that is the only part of it worth borrowing:
// not the barrier, the fact that it is built. This one is built of drawings, and it is
// never finished, which is why the red brick is there.
//
// ── AND THEN HE ASKED FOR THE THREE PIGMENTS, WHICH WAS THE RIGHT QUESTION ─────
// Brian, same afternoon: "love it bro wee blocks colour good why not make them green yellow
// and red bro whatever sequence is right?" The sequence is not a taste call, because this
// record already speaks in these three and has done for months: green is what grows and what
// works, yellow is the light the record signals with, red is the mark and the warning. So
// they are laid in the order the wall is built — green first, then the light, then the red —
// left to right across the course, with the red one in the course beneath, because the red
// brick is the one that is still yours to lay. A stoplight would be the wrong reading and it
// is not the reading here: nothing in this wall is telling anybody to stop.
//
// No new colours were invented for this. Signal yellow and the mark's red are the tokens the
// record's own plates are printed in, so the door on the rail is made of the same paint as
// the room it opens.
//
// ── AND THE GREEN CAME OFF THE SAME AFTERNOON ─────────────────────────────────
// Brian: "sorry think will be better black yellow red for small box icon for the wall." He
// is right and the reason is a small one that matters: the green brick was the only green
// on the rail, so at nineteen pixels it read as a fourth thing rather than as part of the
// mark — a coloured chip in a row of ink. Black, yellow, red is the record's own signal
// order (ink, the light, the mark) and it is the paint of the room's own plates, so the
// bricks now look printed rather than coloured in.
//
// ── AND THE YELLOW CAME OFF TOO ──────────────────────────────────────────────
// "Two black boxes and one red for the wall icon." He is right again, and the reason is the
// same one as before, only more so: three colours in a nineteen-pixel object is a flag, and
// two inks and one red is a mark. Ink, ink, red — the wall as it is actually drawn, and the
// one brick in the record's signal red doing the pointing. Nothing else on the rail carries
// a second colour now, which is what makes the red read at all.
export function MarkWall({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="3.4" y="10.4" width="15.6" height="9.2" fill="currentColor" stroke="none" />
      <rect x="21" y="10.4" width="15.6" height="9.2" fill="currentColor" stroke="none" />
      <rect x="11" y="21.6" width="18" height="9.2" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// What travels. A message going out in dots and dashes — the oldest way anyone found
// to send a thing further than a voice reaches.
// ── THE WIRE, REDRAWN FOR TWENTY-TWO PIXELS ───────────────────────────────────
// The old drawing was a good drawing at thirty-four: a mast, a red tip, and two pairs of
// concentric arcs. At twenty-two in a two-row rail the inner pair of arcs fused with the
// outer and the mast disappeared into them, so the busiest mark on the rail was also the
// one that said least. Nothing about the idea was wrong — a dispatch going out — so the
// idea stays and the drawing loses a whole generation of waves: one mast, one pair of
// arcs set wide, and the red tip that marks where the sending starts.
export function MarkSignal({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* A dated dispatch: the red block is the date, the bars beside and under it are the
          entry itself. It was a transmitter with two arcs and a red dot, which said "radio"
          and said it in hairlines that closed into a smudge at nineteen pixels. */}
      <rect x="4.6" y="6" width="8.6" height="8.6" className="text-record-mark" fill="currentColor" stroke="none" />
      <rect x="16.6" y="7.2" width="18.8" height="5.4" fill="currentColor" stroke="none" />
      <rect x="4.6" y="19.4" width="30.8" height="5.6" fill="currentColor" stroke="none" />
      <rect x="4.6" y="28.6" width="22.4" height="5.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Where a thing is. A world drawn in three lines: the rim, the equator, one meridian.
// ── WHERE A THING IS, AND NOTHING ELSE ON THE PLATE ───────────────────────────
// The old drawing carried a rim, an equator, a wander line and a second open arc trailing
// off the corner: a map with a journey on it. On the rail it was four strokes wide and the
// red point — the only part that means anything — was lost among them. So the world is
// three lines again, which is all a world needs: the rim, the equator, and one red point
// pressed on it where something happened.
export function MarkHorizon({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* The plate, seen edge on: the world's own curve sitting on the record's red line.
          A circle with a line across it read as a letter and a dash; a solid dome on a red
          horizon is one object, and it is the only round mark in the row, which is how a
          reader tells this door from its neighbours without reading a word. */}
      <path d="M7.2 23.6a12.8 12.8 0 0 1 25.6 0Z" fill="currentColor" stroke="none" />
      <rect x="3.6" y="23.6" width="32.8" height="4.6" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Looking for something in particular. One lens, one hairline handle, nothing else.
export function MarkLens({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M26.7 8.7C22.8 3.2 14.1 2.8 8.7 7.6 3.4 12.3 3.8 20.7 8.5 25.3c4.7 4.5 12.2 4.5 17 .2 4.7-4.3 5-11.3 1.2-16.8Z" />
      <path d="M22.3 7.8c-4.7-2.2-10.6-.4-13 4.1M6.9 18.7c.8 4.2 4.2 7.1 8.8 7.3M25.8 25.4l9.9 10.3 2-2-10.1-9.9" />
      <path d="M17.1 11.4l.1 9.3M12.5 16.1l9.4-.2" className="text-record-mark" strokeWidth="1.8" />
    </svg>
  );
}

// ── BASE 1'S OWN MARK, NOT SOMEBODY ELSE'S LENS ───────────────────────────────
// Brian, 17 November: "base 1 needs new icon coolasfuck … not search icon in nav". He was
// right, and for a reason that is not decoration: the magnifying glass is the universal
// sign for "look through a box of other people's things", which is exactly what BASE 1 is
// not. It is the record answering in its own words, and a borrowed lens in the rail said
// the opposite of that every time a reader glanced at it.
//
// So the mark is what the name actually says: a printed numeral ONE, standing on a solid
// base. The figure is drawn in the record's ink — flag, stem, foot, the three strokes a
// printed 1 has carried for four hundred years — and the base it stands on is the mark's
// borrowed red. One object, one weight, one solid mass, nothing thinner than the stroke,
// so at thirty-four pixels in the rail it still reads as a one on a plate and cannot be
// mistaken for a letter, a folder, a list or a lens.
export function MarkBaseOne({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.9" className={className} aria-hidden="true">
      {/* The figure itself, set the way type sets a one: a flag off the apex, a stem that
          stands a hair off upright, and a foot to sit on. Without the foot it was a stick
          with a tick on it; with it, the numeral is a printed character rather than a
          glyph someone drew with a ruler. */}
      <path d="M17.4 8.2 11.2 12.2v5.2l6.2-4Z" fill="currentColor" stroke="none" />
      <rect x="17.4" y="8.2" width="5.6" height="19.6" fill="currentColor" stroke="none" />
      <rect x="13.2" y="27.8" width="13.6" height="4.4" fill="currentColor" stroke="none" />
      {/* And underneath it, the base: solid, red, the width of the character. BASE 1 is the
          one place on this record where a mark is the name as well as the door, so the plinth
          is allowed to be a mass — a one standing on a red base says *base* and *one* in the
          same two gestures, and says it without a magnifying glass, which would have said
          "search other people's things" instead. */}
      <rect x="8.6" y="33.4" width="22.8" height="3.8" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── THE MARKS BEYOND THE MASTHEAD ─────────────────────────────────────────────
// Only five doors ever had a mark. Every other page on the record — why it exists,
// how an entry is checked, the corrections, the seals, the music, the keeper's own
// door — was a line of plain text in a list. That is why the record looked like it
// had a drawn front and a typed back: one hand for the way in, another for everything
// behind it. These are drawn in the same hand, for exactly those doors.
//
// The same rules hold: one weight, currentColor, one solid mass at most, nothing
// thinner than the stroke, and each mark drawn for one door and no other. A mark
// that could sit beside any word is an illustration, not a door.

// The mark itself, at the size of a word. Two strokes of exactly the same length,
// standing on one line.
//
// It used to be drawn as two crossing diagonals with a red bar through the middle,
// which at twenty-six pixels read as a four-pointed star — and a star is the one thing
// this mark must never be. Nothing here is a flourish: two uprights, one ground, and
// the equals between them. It cannot be mistaken for a badge, an award or a logo.
// ── AND IT FAILED AT NINETEEN PIXELS, WHERE IT ACTUALLY STANDS ────────────────
// The two uprights with the equals between them were drawn for twenty-six. When the phone's
// rail became two rows the second row dropped to nineteen, and two verticals flanking two
// short bars is a pause button: the door to the covenant was wearing the symbol for "hold".
// Brian asked the right question twice — "you sure our nav icons coolasfuck bro? fit right
// reasons" — and this was the mark where the answer was no.
//
// So the drawing loses everything that made it a diagram and keeps the one thing the door
// actually says: equals. Two heavy bars in the record's borrowed red, nothing either side of
// them, on a ground line faint enough to be the page rather than a stroke. It is the only
// full-weight red in the row, which is right — this is the door a sceptical reader should
// find first — and at nineteen pixels two bars cannot be read as anything but equals. Bold
// beats clever when a mark is being glanced at rather than admired.
export function MarkEqual({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <rect x="8.8" y="13.2" width="22.4" height="5.6" className="text-record-mark" fill="currentColor" stroke="none" />
      <rect x="8.8" y="22.2" width="22.4" height="5.6" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Every way through the record.
//
// ── IT WAS A STARBURST, AND THE DOOR IS NOT A SPARKLE ─────────────────────────
// Eight rays with corner brackets and a solid red centre: at twenty-six pixels it read as a
// diagram of a menu, and at nineteen — the size the phone's second row gives it, where this
// door actually lives — the centre closed up into a dark blob and the rays into a smudge.
// Worse, a sparkle is the "featured / new / highlights" icon of every app on earth, and this
// door is none of those: it is the index of everything else on the record, the one place a
// reader goes when the five ways in have not answered them.
//
// So the drawing is what an index physically is: sheets, one behind another. The back sheet
// shows only its edge, so the eye reads "more than one". The sheet on top carries its lines,
// and the short one at the foot is the record's red because that line is the door — the next
// thing, the thing not on this sheet. Two masses, three strokes, and it survives being
// glanced at.
export function MarkContents({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M13.8 5.6h15.6l4.6 4.6v20.6" opacity=".5" strokeWidth="1.5" />
      <path d="M29.4 5.8v4.4h4.4" opacity=".5" strokeWidth="1.5" />
      <path d="M7.2 11.6h15.4l4.8 4.8v17.8H7.2z" />
      <path d="M11.4 22.2h11.4M11.4 27.4h8.2" opacity=".7" />
      <path d="M11.4 32.4h4.6" className="text-record-mark" strokeWidth="2.8" />
    </svg>
  );
}

// ── THE DOOR THAT OPENS EVERY OTHER DOOR ───────────────────────────────────────
// Brian, 19 November, twice. First: "when you click on explore the icon looks old and not
// coolasfuck". The drawing then was line art — two sheets, every edge a hairline, the back
// one at half opacity, a red dash at the foot: five thin gestures read at nineteen pixels,
// which is the size this door actually stands at on a phone's second row. Line art is how a
// computer draws a picture of a thing; it is not how a printer prints a mark.
//
// Then, having seen the solid sheets that replaced it: "explore icon on top nav not
// coolasfuck like the wall etc". He is right again, and the reason is worth writing down,
// because it is the difference between a mark and a logo. Two rectangles are quiet: they
// have no rhythm, nothing repeats, nothing is built. What makes the wall work beside it is
// that it is a set of identical units laid down in a course, one of them in the record's
// red — a thing assembled rather than a thing drawn.
//
// So the index is built the same way. Four panes, one course of the record's own shelves,
// and the fourth is the red one: the part you have not opened yet. It is the whole index at
// a glance — several ways in, and one of them always still unread — and it holds up at
// nineteen pixels because four solid squares lose nothing when they shrink, which is exactly
// what a hairline cannot do.
//
// It also ends a real duplication: this door and "The guide" in the foot were wearing the
// same picture. The guide keeps the ruled sheet it was drawn for.
export function MarkExplore({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="2.75" y="2.75" width="15" height="15" fill="currentColor" stroke="none" />
      <rect x="22.25" y="2.75" width="15" height="15" fill="currentColor" stroke="none" />
      <rect x="2.75" y="22.25" width="15" height="15" fill="currentColor" stroke="none" />
      <rect x="22.25" y="22.25" width="15" height="15" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Who is reading. A tally, not an eye: four strokes and one across them, which is
// how people counted things long before anything was counted for them.
// ── HOW FAR IT GOT: A TRAIL THAT LEAVES THE PLATE ────────────────────────────
// The tally came out the same afternoon it went in. It was a better drawing than the eye it
// replaced, and it was the wrong mark for a reason no amount of line-work could fix: four
// uprights and a stroke across them is the prison-cell count. Brian saw it in one glance —
// "you sure icons for jail time" — and a reader glancing is exactly the test a mark has to
// pass, so it failed.
//
// Reach is not a count kept on a wall. It is how far the thing travelled, so the mark is the
// trail itself: strokes stepping away from the reader's eye and off the top corner of the
// plate, the nearest one the record's red because that is where it starts, each one thinner
// than the last because it is getting further away. The mark does not close — it runs out of
// the frame — which is the honest picture of a record read in places we have not been.
//
// It is deliberately lines and not dots, and deliberately diagonal: at twenty-two pixels a
// dot under a pixel and a half is nothing at all, and the two doors either side of this one
// in the rail — the world, the marks of the mast — are already round. A rising line is the
// only shape left in the row that cannot be confused with either.
export function MarkReadership({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M6.2 33.2 15.6 27.8" className="text-record-mark" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20.6 24.6 26.4 21.2" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M30.2 18.6 34.6 16.1" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M37.4 14.4 39 13.5" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

// (The tally that stood here for half an hour — and the eye before it — are gone, and the
// reason is written on the mark that replaced them. A door's drawing has to survive one
// glance from somebody who is not admiring it.)

// An entry's fingerprint. A seal, with its ribbon still on it.
export function MarkSeal({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* A seal with its ribbon: a solid disc over two red tails. The outline version read
          as a medal, which is a prize, and a fingerprint is not a prize — it is a mark that
          can be checked. Solid, it is the same object the record presses, in the same red. */}
      <circle cx="20" cy="15.4" r="9.6" fill="currentColor" stroke="none" />
      <path d="M13.6 22.6 11.8 35.8 20 31.4l8.2 4.4-1.8-13.2Z" className="text-record-mark" fill="currentColor" stroke="none" />
    </svg>
  );
}

// The room the record answers to. A key handed over, not a crown.
//
// This was drawn for hosting the record and stayed on the host's door while the keeper's
// room borrowed a key from somewhere else — so the same drawing opened two doors, which is
// the one thing a mark may never do. The host now carries "what changes hands", and this
// key belongs to one room: the keeper's, on the masthead, in this sheet, and here at the
// foot of every page, where the keeper's door used to be a plain square beside sixteen
// engravings.
export function MarkHost({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* ── THE KEEPER'S KEY, DRAWN IN THE SAME HAND ─────────────────────────────
          Brian, 19 November, once the sheet's other six had been redrawn: "keeper need
          looked at too bro". It was the last door in the index still drawn in hairlines —
          a ring, a stem and two ticks, all one weight — sitting beside marks that are now
          solid masses, so the keeper's room read as the one door the record had not
          finished drawing.
          The key is now what a key physically is: a solid bow with the hole pressed out of
          it, a heavy stem, and the bit in the record's red, because the bit is the part
          that turns. The hole is a real hole rather than a drawn circle — a filled disc
          with an unfilled centre — so nothing in it is thinner than a stroke. */}
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2 4.2a7.1 7.1 0 1 1 0 14.2 7.1 7.1 0 0 1 0-14.2Zm0 3.6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" fill="currentColor" stroke="none" />
      <path d="M16.9 17.1 29.4 29.6" fill="none" strokeWidth="5.2" strokeLinecap="butt" />
      <path d="M24.4 24.6 20.6 28.4M28.4 28.6 24.6 32.4" className="text-record-mark" fill="none" strokeWidth="4.4" strokeLinecap="butt" />
    </svg>
  );
}

// What is offered and shared. A bowl held out — a plate, not a pocket.
export function MarkSupport({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M8.6 18.6h22.8" />
      <path d="M11.4 18.6c0 8.8 3.8 15.2 8.6 15.2s8.6-6.4 8.6-15.2" />
    </svg>
  );
}

// The terms the record is shared under. A lock with its shackle open, said once.
export function MarkCovenant({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* ── THE SIX DOORS IN THE EXPLORE SHEET, REDRAWN IN THE PRINTED HAND ─────────
          Brian, 19 November, standing in the cartoon room: "when go into explore the record
          why do icons in there not feel like our new coolasfuck bro".

          He was looking at the one place on the record where the old hand still stands. The
          masthead was redrawn in solid masses over three days — the register, the dispatch,
          the numeral on its base, the dome, the bricks, the four panes — and the sheet was
          not, because the sheet's six doors are the ones that never stood on a rail. So a
          reader who pressed Explore got the record's front page in one hand and a page of
          hairlines in the other, and the sheet read as a different, older book.

          These six are now drawn the way everything else on the record is drawn: solid
          masses, one ink, exactly one element in the record's red, nothing thinner than a
          stroke. Nothing about what any of them means has changed — a covenant is still a
          lock, a witness is still a pair of eyes — only the hand it is drawn in.

          A lock, and it is open. An outlined padlock was four hairlines at twenty-four
          pixels and read as a keyhole somebody else had drawn; a solid body with the
          record's red shackle lifted off it reads at any size, and the openness is the
          point — the covenant is what this record is shared under, and a closed lock would
          say "held", which is the opposite of it. */}
      <rect x="9.4" y="19.4" width="21.2" height="16.2" rx="2" fill="currentColor" stroke="none" />
      <path d="M14.8 19.4v-6.2a5.6 5.6 0 0 1 10.4-3.2" className="text-record-mark" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" />
    </svg>
  );
}

// ── THE TWO DOORS THAT HAD NO MARK ────────────────────────────────────────────
// Terms and Privacy sat in the foot as a pair of typed words, which is how the record's
// own promises ended up looking like the small print they are instead of like the two
// doors they are. Both are drawn here, and both had to be told apart from everything
// already on the sheet: a folio, a lock, a seal, an open lock. So neither is an object.

// The terms: a page of clauses with one line signed at the foot. A sheet, not a book,
// and a signature rather than a stamp — the record is offered on terms a person agreed
// to, which is why the nib's stroke crosses the ruled line instead of sitting on it.
export function MarkTerms({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      {/* The terms: the sheet itself as a mass, its corner clipped the way a document's is,
          and the signature under it in the record's red — the record is offered on terms a
          person agreed to, so the line at the foot is the part that matters. The outlined
          page with three hairlines of clauses read as a form at twenty-four pixels. */}
      <path d="M9 4.4h14.4l6.8 6.8v16.6H9Z" fill="currentColor" stroke="none" />
      <path d="M6.2 33c3-2.6 5-1 6.4.4 1.4 1.4 3 .4 4.6-1.2 1.4-1.4 2.8-1.2 4 .2 1.2 1.4 2.6 1 4-.6 1-1.2 2-1.4 3-.6" className="text-record-mark" fill="none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// What is not shown: three lines of print with one taken out. Not an eye, not a lock, and
// not a shield — the record does not promise to defend you, it promises not to print you.
// A solid bar where a line should be says exactly that, and nothing else, at any size.
export function MarkPrivacy({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      {/* What is not printed: lines of print as masses, with the third one replaced by the
          record's red — a redaction, which is the whole of what this door says. Same idea as
          the hairline version, drawn so that it survives being glanced at: four bars, one of
          them red, one of them short. */}
      <rect x="6.6" y="6.4" width="26.8" height="5.6" fill="currentColor" stroke="none" />
      <rect x="6.6" y="15" width="17.8" height="5.6" fill="currentColor" stroke="none" />
      <rect x="6.6" y="23.6" width="26.8" height="5.6" className="text-record-mark" fill="currentColor" stroke="none" />
      <rect x="6.6" y="32.2" width="12.4" height="4.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// The room where something is made rather than read.
export function MarkStudio({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M20 3.8c0 9.4 4.4 13.8 13.8 13.8C24.4 17.6 20 22 20 31.4 20 22 15.6 17.6 6.2 17.6 15.6 17.6 20 13.2 20 3.8Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="M20 35.4v1.2" />
    </svg>
  );
}