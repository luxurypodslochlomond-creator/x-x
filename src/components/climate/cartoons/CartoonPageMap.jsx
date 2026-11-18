import React from 'react';
import CartoonPartMark, { CARTOON_PARTS } from '@/components/climate/cartoons/CartoonPartMarks';

// ── THE WAY IN IS A PAGE, NOT A SET OF BUTTONS ─────────────────────────────────
// Brian, 18 November: "is cartoons different from comic bro… how can we make cartoons
// coolasfuck to look at even Mark Millar impressed."
//
// He is right about the difference, and the difference is the answer. A cartoon is one
// drawing that lands a single hit. A comic is a PAGE: panels of different sizes, gutters
// between them, a splash that stops you, smaller beats that carry you along, and captions
// that tell you where you are. Six equal tiles with an icon in each is a website menu.
// Six panels on a page is a comic.
//
// So the room's contents are laid out the way a page is laid out: a splash that opens it,
// two tiers of two that carry you down, and a last panel that breaks the edge of the page
// — because the panel that breaks the grid is the one that lands, and the last thing on
// this page should land. Then the two pieces of furniture every comic since the thirties
// has carried: a next-issue line, and a credits box that says who did what.
//
// Nothing here is a filter laid over a grid. The arrangement is the design, and the same
// page works on a phone (splash, two, two, one) and on a desk (splash, two, two, full).
const SPANS = {
  wall: 'comic-page-panel--wall',
  day: 'comic-page-panel--day',
  strip: 'comic-page-panel--strip',
  book: 'comic-page-panel--book',
  yours: 'comic-page-panel--yours',
  why: 'comic-page-panel--why',
};

export default function CartoonPageMap() {
  return (
    <nav className="comic-page" aria-label="In this room">
      <div className="comic-page-head">
        <p className="comic-page-issue">In this issue</p>
        <p className="comic-page-rule" aria-hidden="true" />
        <p className="comic-page-count">Six panels</p>
      </div>

      <div className="comic-page-grid">
        {CARTOON_PARTS.map((part, index) => (
          <a
            key={part.key}
            href={part.href}
            className={`comic-page-panel ${SPANS[part.key] || ''}`}
          >
            <span className="comic-page-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="comic-page-art">
              <CartoonPartMark part={part.key} />
            </span>
            {part.key === 'wall' && <span className="comic-page-tag" aria-hidden="true">Start here</span>}
            <span className="comic-page-caption">
              <span className="comic-page-label">{part.label}</span>
              <span className="comic-page-line">{part.caption}</span>
            </span>
          </a>
        ))}
      </div>

      {/* The next-issue line. Every comic has one, and it is the honest one here: the next
          thing this room does is the 29th, in a room, with people drawing. */}
      <div className="comic-page-foot">
        <a href="/ClimateWorkshop" className="comic-page-next">
          <span className="comic-page-next-word">Next issue</span>
          <span className="comic-page-next-line">The 29th — a room of drawings, made in one sitting</span>
        </a>

        {/* The credits box, in the voice a comic uses for its indicia: who did what, small,
            flat, and not asking for applause. */}
        <p className="comic-page-credits">
          Drawings — the artists, named on every plate.<br />
          Record — the keepers, named on the roll.<br />
          Strip — illustrated by a machine, labelled as fiction.<br />
          Anthology — CartoonAFRICA, in preparation.
        </p>
      </div>
    </nav>
  );
}