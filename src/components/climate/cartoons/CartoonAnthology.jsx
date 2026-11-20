import React from 'react';
import { BookRibbon } from '@/components/climate/cartoons/CartoonInkIcons';

// ── THE BOOK THAT COMES OUT OF THE 29TH ────────────────────────────────────────
// Janine, 17 November 2026: every African cartoonist who takes part in the workshop has
// their work gathered into an anthology, published on CartoonAFRICA's own platforms and on
// this record, free to download anywhere in the world. That is the largest thing this room
// will ever hold, so it is printed here in the anthology's own words rather than described.
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

      <p className="comic-anthology-note">
        Every African cartoonist who takes part in the 29 November discussion has their work
        gathered into this book. It is published on CartoonAFRICA’s own platforms and on this
        record, for free download, anywhere in the world.
      </p>

      {/* The cover sits at the top of the room, so this says "at the top", not "above".
          The credit paragraph used to end by telling a reader that Odupute founded a
          foundation in 2005, with a link off to Facebook — a fact about a man, in the middle
          of a credit for a book, taking the eye out of the room. It is not this book's
          business, so it is not on this book's plate. */}
      <p className="comic-anthology-status">
        The cover at the top of this room is a sample: the book is still being made, so it may
        change before it is printed. The day it is finished it appears here — free, with no
        sign-in, for anyone anywhere.
      </p>

      <p className="comic-anthology-credit">
        The cartoons stay the artists’ own. The cover is Francis Umendu Odupute’s drawing; the
        anthology is CartoonAFRICA’s, prepared by African Press Cartoon services, 2026.
      </p>
    </section>
  );
}