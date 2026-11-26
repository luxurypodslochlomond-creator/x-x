import React from 'react';
import { BookRibbon } from '@/components/climate/cartoons/CartoonInkIcons';

// ── THE BOOK THAT COMES OUT OF THE 29TH ────────────────────────────────────────
// Janine, 17 November 2026: every African cartoonist who takes part in the workshop has
// their work gathered into an anthology, published on CartoonAFRICA's own platforms and on
// this record, free to download anywhere in the world. She marked those four words again on
// 24 November — "and on this record" — so the promise is printed in her own sentence, on
// every line of the room that makes it. The download appears the day the book does.
//
// The title, the two editors and the subtitle are quoted exactly. The record does not
// re-title somebody else's book, does not shorten a credit, and does not put a name on it
// that the editors did not put there.
//
// ── THE COVER, PRINTED AS THE SAMPLE IT IS ────────────────────────────────────
// This plate first held the anthology's words and left the cover out, on the argument that
// a draft cover shown as the finished book is a false fact. That argument was right about
// the risk and wrong about the answer: the cover Janine sent IS the thing a visitor to this
// room wants to see — it is the proof the book exists — and leaving it off made the largest
// thing the room will ever hold the plainest block on the page.
//
// So it is printed, and it is labelled. The line beside it says, in the record's own voice,
// that this is the cover as its editors have it now and that the book is still being made.
// A reader is told exactly what they are looking at, which is the whole difference between
// printing a sample and passing one off.
//
// Still no download link, because there is nothing behind it yet: a dead button on a page
// about honesty is worse than no button. The download appears the day the anthology does.

const TITLE = 'Climate Change and the Power of Collective Actions and Creative Interventions';

// The cover itself is printed at the top of the room, as the first image on the page, so it
// is not shown twice. This plate carries the book's words, its editors and its status.

export default function CartoonAnthology() {
  return (
    <section className="comic-anthology" id="cartoon-anthology" aria-labelledby="cartoon-anthology-title">
      <p className="comic-anthology-eyebrow"><BookRibbon size={22} className="cmark-inline" />The anthology · in preparation</p>
      <h2 id="cartoon-anthology-title" className="comic-anthology-title">{TITLE}</h2>
      <p className="comic-anthology-sub">
        “…an anthology of editorial cartoons and comics journalism works by selected African
        and non-African cartoonists.”
      </p>


      <dl className="comic-anthology-facts">
        <div>
          <dt>Edited by</dt>
          <dd>Francis Umendu Odupute and Janine Selendy</dd>
        </div>
        <div>
          <dt>From</dt>
          <dd>The 8th CartoonAFRICA International Biennial (CAIB) 2026</dd>
        </div>
        <div>
          <dt>Cover artwork</dt>
          <dd>Francis Umendu Odupute</dd>
        </div>
        <div>
          <dt>Prepared by</dt>
          <dd>African Press Cartoon services</dd>
        </div>
      </dl>

      {/* ── THE SAME PROMISE, PRINTED FOUR TIMES ON ONE PAGE ─────────────────────
          Brian, 26 November: "Janine said rework needed or rethink… lots of copy and
          bullshit on there." He was relaying a real complaint, and this was the clearest
          case of it: the sentence about the book being published free appeared under the
          cover, in this note, in the status line below, and again in the credit — four
          printings of one promise in a single scroll. That is not thoroughness, it is a
          page repeating itself because each plate was written on its own day and nobody
          read them in a row.
          The promise is made once, under the cover, where the book actually is. This plate
          says only what a reader cannot get from the cover: who is in it, that the cover is
          a sample, and whose the work stays. */}
      <p className="comic-anthology-note">
        Every African cartoonist who takes part in the 29 November discussion has their work
        gathered into this book.
      </p>

      {/* The cover sits at the top of the room, so this says "at the top", not "above".
          The credit paragraph used to end by telling a reader that Odupute founded a
          foundation in 2005, with a link off to Facebook — a fact about a man, in the middle
          of a credit for a book, taking the eye out of the room. It is not this book's
          business, so it is not on this book's plate. */}
      <p className="comic-anthology-status">
        The cover at the top of this room is a sample: the book is still being made, so it may
        change before it is printed.
      </p>

      <p className="comic-anthology-credit">
        The cartoons stay the artists’ own. The cover is Francis Umendu Odupute’s drawing; the
        anthology is CartoonAFRICA’s, prepared by African Press Cartoon services, 2026.
      </p>
    </section>
  );
}