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
// So the room's contents are laid out the way a page is laid out. One splash panel opens
// the page — the wall, which is what this room is — and five smaller panels follow it in
// tiers: two, then three. Each panel carries its own drawn scene, its own number in the
// corner, and a caption box in the top corner, exactly as a page numbers and captions its
// panels. The gutters are paper, the borders are ink, the dots behind the drawings are
// halftone, because that is what printing does.
//
// Nothing here is a filter or a gimmick laid over a grid: it is the arrangement itself.
// The panels are the size the page needs them to be, and the same page works on a phone
// (splash, then two, then two, then one) and on a desk (splash, then two, then three).
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
    </nav>
  );
}