import React from 'react';

// ── THE MARKS AT THE FOOT ──────────────────────────────────────────────────────
// The foot of the record used to be a list of links with a sentence under each, and a
// sentence under a link is a menu explaining itself. It is nine doors now, and each one
// is a word beside a mark drawn for that door and nothing else.
//
// Same hand as the shed's marks: one weight, currentColor, no second colour, one solid
// mass in each so the mark is an object rather than a diagram. They are read at 26px on
// a phone, which is why nothing here has a line thinner than the stroke.
const BASE = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

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

// What is planned, and what is still missing. One page, folded at its corner, its last line
// stopped short — a brief that says out loud where it runs out.
export function MarkPlan({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M9.6 5.4h15.2l6.2 6.2v23H9.6z" />
      <path d="M24.4 5.6v6.4h6.4" />
      <path d="M14.6 17.4h9.4M14.6 22.8h9.4M14.6 28.2h5.2" />
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
    <svg {...BASE} width={size} height={size} strokeWidth="1.5" className={className} aria-hidden="true">
      <g transform="rotate(-30 20 20)">
        <path d="M20 34.2c-4.9-5.5-6.3-13.2-5.2-22.1 3.3-2 7.1-2 10.4 0 1.1 8.9-.3 16.6-5.2 22.1Z" />
        <circle cx="20" cy="17.4" r="2" />
        <path d="M20 34.2V21.6" />
      </g>
      <path d="M7.2 32.9h25.6" className="text-record-mark" strokeWidth="2.2" />
    </svg>
  );
}

// How it is made. A pair of dividers set to the page.
export function MarkMethod({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M18.7 9.2 8 35M21 9.5l10.3 25.1M13 24c4.2 1.3 9.5 1.1 14.1-.5M6.7 31.8c7.6 4 18.6 4.4 26.4-.4" />
      <circle cx="20" cy="7.4" r="3" className="text-record-mark" fill="currentColor" stroke="none" />
      <path d="M20 2v2M5.1 25.4l2.7 1.2M32.4 25.8l2.5-1" opacity=".5" />
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
      <circle cx="13" cy="22.4" r="6.2" />
      <circle cx="27" cy="22.4" r="6.2" />
      <path d="M19.2 22.4h1.6" />
      <path d="M6.8 22.4H4.4M33.2 22.4h2.4" />
    </svg>
  );
}

// Who is on the list — the roll itself, not the pair of eyes that does the checking. A page
// of names with a seal set against it, because the roll was the one door in the drawer still
// wearing the record's own folio: two different doors, one picture, and a reader who saw the
// same sheet twice stopped believing the drawer meant anything.
export function MarkRoll({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M8.6 5.4h18.8v29.2H8.6z" />
      <path d="M12.6 12.4h6.2M12.6 18.8h9M12.6 25.2h5.4" />
      <path d="M24.4 10.8h2.9v2.9h-2.9z" className="text-record-mark" strokeWidth="1.9" />
      <path d="M12.6 31.6h10.6" opacity=".45" />
    </svg>
  );
}

// What changes hands. One set of hands to another, and the direction said out loud.
export function MarkHandover({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="8.2" cy="30.2" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="31.8" cy="10.4" r="3.2" fill="currentColor" stroke="none" />
      <path d="M10.6 27.4C15.4 17 23.6 13.2 28.4 12.6" />
      <path d="M24.2 8.8l4.6 3.8-3.6 4.4" />
    </svg>
  );
}

// The music given to the record. A fork, struck once.
export function MarkMusic({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M14.4 6.4v12.2a5.6 5.6 0 0 0 11.2 0V6.4" />
      <path d="M20 24.2v10.4" />
      <path d="M15.6 34.6h8.8" />
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
export function MarkCartoon({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.9" className={className} aria-hidden="true">
      <path d="M9.9 5.2 33 7.1c2.6.2 4.3 1.9 4.1 4.5l-1 14.4c-.2 2.5-1.9 4.1-4.4 3.9l-8.2-.6-4.9 6.6.2-7-9.7-.7c-2.5-.2-4.1-1.9-3.9-4.4L6 9.1c.2-2.6 1.4-4.1 3.9-3.9Z" />
      <path d="M14.9 13.7l4.4 2.4M27.8 15.6l4.1-2.6" strokeWidth="2.2" />
      <path d="M14.6 21.4c1.5 3.6 3.8 5.4 6.6 5.4 2.8 0 5.1-1.8 6.7-5.4Z" fill="currentColor" stroke="none" />
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
    <svg {...BASE} width={size} height={size} strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M19.9 17.4 12.4 34.4M20.5 17.4l7.6 17M13.6 28.2l12.9-.4M7.6 35.1l24.9-.4" />
      <path d="M9.4 9.6c-3.9 4.4-4 10.2-.3 14.2M31 9.4c3.9 4.5 4 10.3.2 14.4" />
      <circle cx="20.2" cy="14.6" r="2.9" className="text-record-mark" fill="currentColor" stroke="none" />
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
    <svg {...BASE} width={size} height={size} strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M33.7 20c0 7.6-6.1 13.7-13.7 13.7S6.3 27.6 6.3 20 12.4 6.3 20 6.3 33.7 12.4 33.7 20Z" />
      <path d="M6.6 20h26.8" />
      <circle cx="25.2" cy="13.6" r="3" className="text-record-mark" fill="currentColor" stroke="none" />
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
      <path d="M23.9 7.4c-3 1.9-5.9 3.9-8.8 5.9M23.7 7.5c-.5 7.3-.3 14.7-.1 21.7" />
      <path d="M15.5 29.5c4.7-.4 9.2-.4 13.9 0" />
      {/* And underneath it, the base: solid, red, the width of the character. BASE 1 is the
          one place on this record where a mark is the name as well as the door, so the plinth
          is allowed to be a mass — a one standing on a red base says *base* and *one* in the
          same two gestures, and says it without a magnifying glass, which would have said
          "search other people's things" instead. */}
      <path d="M9 34.4h22.2" className="text-record-mark" strokeWidth="3.2" />
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
export function MarkEqual({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M10.5 8.6c-.5 6.3-.7 13.2-.4 20.1M29.3 8.4c.5 6.2.7 13.1.4 20" />
      <path d="M6.4 28.7h27.2" opacity=".5" strokeWidth="1" />
      <path d="M16.4 16.2h7.4M16.3 21.2h7.6" className="text-record-mark" strokeWidth="2.2" />
    </svg>
  );
}

// Every way through the record. A contents page: dots against their lines.
export function MarkContents({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M20 17.3 7.6 6.2M20.4 17.5l12.9-11M20.2 22.1l-12.5 12M20.6 22.1l13 11.7M17.5 20l-14.2.2M23 20l14-.1" />
      <path d="M5.6 12.4l2-6.5 6.4.5M27 6.6l6.6-.4.4 6.4M6.8 27.6l.5 6.8 6.1-.2M27.5 34.2l6.7-.3-.2-6.3" />
      <circle cx="20.2" cy="20" r="3.6" className="text-record-mark" fill="currentColor" stroke="none" />
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
      <circle cx="20" cy="17.6" r="9.6" />
      <path d="M15.4 26.2 13.6 35.4l6.4-3.4 6.4 3.4-1.8-9.2" />
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
      <circle cx="12.6" cy="12.6" r="4.6" />
      <path d="M16 16l15.8 15.8" />
      <path d="M26.2 26.2l3.4-3.4M30.8 30.8l3.4-3.4" />
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
      <path d="M11 19.4h18v14.2H11Z" />
      <path d="M15.2 19.4v-5.2a5 5 0 0 1 9.4-2.4" />
      <circle cx="20" cy="26.4" r="1.6" fill="currentColor" stroke="none" />
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
      <path d="M9.6 5.4h14.6L30.4 11.6V34.6H9.6Z" />
      <path d="M23.9 5.6v6.2h6.3" />
      <path d="M13.4 15.6h13M13.4 20.2h13M13.4 24.6h8.2" opacity=".55" />
      <path d="M13 31.6c2.6-2.6 4.6-1.4 5.7-.2 1 1.1 2.4.9 3.9-.7 1.2-1.3 2.4-1.4 3.6-.4" className="text-record-mark" strokeWidth="1.9" />
    </svg>
  );
}

// What is not shown: three lines of print with one taken out. Not an eye, not a lock, and
// not a shield — the record does not promise to defend you, it promises not to print you.
// A solid bar where a line should be says exactly that, and nothing else, at any size.
export function MarkPrivacy({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} strokeWidth="1.45" className={className} aria-hidden="true">
      <path d="M8.6 11.2h22.8M8.6 16.9h14.2M12.4 30.4h19M8.6 35h10" opacity=".55" />
      <rect x="8.4" y="21.4" width="23.2" height="4.6" className="text-record-mark" fill="currentColor" stroke="none" />
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