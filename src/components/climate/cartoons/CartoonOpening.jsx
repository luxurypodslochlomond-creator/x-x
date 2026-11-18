import React from 'react';
import CartoonPartMark, { CARTOON_PARTS } from '@/components/climate/cartoons/CartoonPartMarks';

// ── WHAT THIS ROOM IS, SAID ONCE, AT THE TOP ───────────────────────────────────
// Brian, 18 November: "you sure cartoon page explains enough seems disjointed to me bro."
// He was right, and the reason was structural rather than a missing paragraph: the page had
// grown a cover, a title, a wall, a dateline, a strip, a book, an argument and two ways to
// draw — and nothing anywhere said how those parts belonged to each other.
//
// Then: "could have coolasfuck cartoon icons for the wall the 29th the strip etc bro … still
// not sure what's going on sorry bro." So the six parts are drawn rather than listed, and
// each drawing carries a plain line under it saying what that part is. A visitor who does
// not yet know what this page is can now read six pictures and know.
//
// The order of the block is the order of the argument: what the room is, what is in it,
// what you can do about it, and how to hand it to somebody else.
export default function CartoonOpening() {
  return (
    <section className="comic-opening" aria-labelledby="cartoon-opening-title">
      <p id="cartoon-opening-title" className="comic-opening-eyebrow record-meta">What this room is</p>
      <p className="comic-opening-line">
        A room for climate cartoons, opened for CartoonAFRICA. The wall holds human-authored drawings,
        with their artists and sources. The record’s own strip is separate, and labelled as AI-illustrated fiction.
      </p>

      <p className="comic-opening-eyebrow record-meta comic-opening-in">In this room</p>
      <nav className="comic-opening-grid" aria-label="In this room">
        {CARTOON_PARTS.map((part) => (
          <a key={part.key} href={part.href} className="comic-part">
            <CartoonPartMark part={part.key} />
            <span className="comic-part-label">{part.label}</span>
            <span className="comic-part-caption">{part.caption}</span>
          </a>
        ))}
      </nav>

      <p className="comic-opening-line comic-opening-open">
        The wall is open. Send a drawing and it goes up with your name on it, once a person has looked.
      </p>


    </section>
  );
}