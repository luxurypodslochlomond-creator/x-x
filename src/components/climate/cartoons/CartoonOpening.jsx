import React from 'react';
import CartoonPageMap from '@/components/climate/cartoons/CartoonPageMap';
import '@/components/climate/cartoons/cartoon-pagemap.css';

// ── WHAT THIS ROOM IS, SAID ONCE, AT THE TOP ───────────────────────────────────
// The room used to list its six parts as six equal tiles, which is a website menu wearing
// drawings. A comic page does not lay its panels out that way: one splash stops you, then
// smaller beats carry you down the page. So the contents are drawn as a page — see
// CartoonPageMap — and this block is only the sentence above it and the invitation below.
//
// The one line that matters here is the honest one: the wall holds human drawings, and the
// record's own strip is AI-illustrated fiction kept apart and labelled. A reader who does
// not yet know what this room is can read one sentence and one page of panels and know.
export default function CartoonOpening() {
  return (
    <section className="comic-opening" aria-labelledby="cartoon-opening-title">
      <p id="cartoon-opening-title" className="comic-opening-eyebrow record-meta">What this room is</p>
      <p className="comic-opening-line">
        A room for climate cartoons, opened for CartoonAFRICA. The wall holds human-authored
        drawings, with their artists and sources. The record’s own strip is separate, and
        labelled as AI-illustrated fiction.
      </p>

      <CartoonPageMap />

      <p className="comic-opening-line comic-opening-open">
        The wall is open. Send a drawing and it goes up with your name on it, once a person has looked.
      </p>
    </section>
  );
}