import React from 'react';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildCartoonShareCard, CARTOON_CARD } from '@/components/climate/cartoons/cartoonCard';

// ── WHAT THIS ROOM IS, SAID ONCE, AT THE TOP ───────────────────────────────────
// Brian, 18 November: "you sure cartoon page explains enough seems disjointed to me bro."
// He was right, and the reason was structural rather than a missing paragraph: the page had
// grown a cover, a title, a wall, a dateline, a strip, a book, an argument and two ways to
// draw — and nothing anywhere said how those parts belonged to each other. A reader met
// eight good blocks in a row and had to work out the shape of the room themselves.
//
// So the room says what it is in two sentences, then names its own parts in one line, so a
// visitor can see the whole page before scrolling any of it. Nothing was moved and nothing
// was removed for this: the spine simply comes first now.
const PARTS = [
  { href: '#cartoon-wall-title', label: 'The wall' },
  { href: '#cartoon-session-title', label: 'The 29th' },
  { href: '#cartoon-strip', label: 'The strip' },
  { href: '#cartoon-anthology', label: 'The book' },
  { href: '#cartoon-your-turn', label: 'Your turn' },
  { href: '#cartoon-why-title', label: 'Why cartoons' },
];

export default function CartoonOpening() {
  return (
    <section className="comic-opening" aria-labelledby="cartoon-opening-title">
      <p id="cartoon-opening-title" className="comic-opening-eyebrow record-meta">What this room is</p>
      <p className="comic-opening-line">
        Drawings, not statements. Every picture here was made by a person about the climate —
        some at the CartoonAFRICA biennial in Benin City, some sent in from a kitchen table.
      </p>
      <p className="comic-opening-line">
        The wall is open. Send a drawing and it goes up with your name on it, once a person has looked.
      </p>

      <nav className="comic-opening-parts" aria-label="In this room">
        {PARTS.map(({ href, label }) => (
          <a key={href} href={href} className="comic-opening-part">{label}</a>
        ))}
      </nav>

      {/* The one thing a host, a teacher or another cartoonist wants to do with this page:
          hand it to somebody. The card carries the real cover, the dates and the address. */}
      <div className="comic-share">
        <ShareCardButton entry={CARTOON_CARD} build={buildCartoonShareCard} label="Pass it on" />
        <p className="record-meta comic-share-note">
          One card: the cover, what the event is, and the address. No tracking on it.
        </p>
      </div>
    </section>
  );
}