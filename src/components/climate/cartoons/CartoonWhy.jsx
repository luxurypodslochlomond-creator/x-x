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
export default function CartoonWhy() {
  return (
    <section className="comic-why" aria-labelledby="cartoon-why-title">
      <h2 id="cartoon-why-title" className="comic-section-title">Why cartoons?</h2>
      <ul className="comic-why-list">
        <li>A cartoon is a way of seeing the climate: witness, argument, satire.</li>
        <li>Anyone can answer with a pen. A child, a farmer, a grandmother.</li>
        <li>The record keeps the work, the artist’s name and their own words. A viewpoint is not scientific proof.</li>
      </ul>
    </section>
  );
}