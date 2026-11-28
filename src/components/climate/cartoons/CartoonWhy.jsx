import React from 'react';

// ── WHY A CARTOON ROOM ON A CLIMATE RECORD ───────────────────────────────────
// The record's own answer, kept to three lines. Not a mission statement: a reader who has
// just laughed at a bird with a bicycle wheel is owed the reason it is here, and nothing
// more.
//
// ── AND NO DOORS OUT OF THE ROOM ─────────────────────────────────────────────
// Two links used to stand under these three lines — one to the map, one to the method page —
// each wearing the record's out-arrow. Brian, 20 November: "links are old can't have
// coolasfuck icons to other pages Bri unless we can condense again." Right twice over.
//
// A wall that sends a reader off to another page in the middle of its own argument is not a
// wall, it is a corridor. And the arrow was the only borrowed piece of furniture in a room
// built out of hand-cut marks: every other mark in this room is drawn for it, and this one
// came off a shelf.
//
// The doors this room does keep are its own, and they are all inside it: the drawing desk
// below, the thread, the print, and the page that says what the room is. Nothing here needs
// a door to another product to be understood.
// ── AND THEN THE WORDS THEMSELVES, ON 28 NOVEMBER ────────────────────────────
// Brian: "why we holding back with the words bro… needs to be statement bro of intent
// that we're going to go to town with these bastards."
//
// He was reading the three lines and hearing a brochure. "A cartoon is a way of seeing the
// climate" is the sentence on the back of a school leaflet; it asks nothing and accuses
// nobody. These lines are the room's case, and the case is harder than that: a drawing says
// the thing a report is built to avoid saying, it travels where a report cannot, and this
// record keeps it whole and does not pretend a drawing is data.
//
// Still three lines. Nothing added but the spine.
export default function CartoonWhy() {
  return (
    <section className="comic-why" aria-labelledby="cartoon-why-title">
      <h2 id="cartoon-why-title" className="comic-section-title">Why a cartoon, and not a graph.</h2>
      <ul className="comic-why-list">
        <li>A report is written for the people it is about. A cartoon is written for everybody else.</li>
        <li>One frame: who did it, who paid, and who is lying about it. No footnote to hide in.</li>
        <li>Kept whole and signed, in the drawer’s own words. A viewpoint is not proof, and this record never pretends it is — the evidence stands beside the drawing.</li>
      </ul>
    </section>
  );
}