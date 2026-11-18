import React from 'react';
import CartoonPartMark, { CARTOON_PARTS } from '@/components/climate/cartoons/CartoonPartMarks';

// ── A GALLERY'S ROOM MAP, NOT SIX BOXES ────────────────────────────────────────
// Brian, 18 November: "boxes look old and not our soul… needs to be like museum or art
// gallery for cartoons but connected like fuck… coolasfuck like modern institute or GOMA."
//
// The last version of this was a comic page: ink borders, halftone, yellow caption boxes.
// It was the right idea about craft and the wrong object. A page of caption boxes is a
// scrapbook, and a scrapbook is charming once and tired by the sixth block.
//
// A modern gallery does none of that. It hangs work on a white wall with a hairline or no
// frame at all, and puts a small printed label underneath: a number, a name, one line. That
// is the whole grammar, and it is cooler precisely because it is not trying. So each of the
// room's six parts is hung as a work on the wall, with its own label, and the labels are the
// way through — connected, in the same quiet voice, rather than six buttons competing.
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
    <nav className="comic-page" aria-label="Rooms in this gallery">
      <div className="comic-page-head">
        <p className="comic-page-issue">Rooms</p>
        <p className="comic-page-rule" aria-hidden="true" />
        <p className="comic-page-count">Six</p>
      </div>

      <div className="comic-page-grid">
        {CARTOON_PARTS.map((part, index) => (
          <a
            key={part.key}
            href={part.href}
            className={`comic-page-panel ${SPANS[part.key] || ''}`}
          >
            <span className="comic-page-art">
              <CartoonPartMark part={part.key} />
            </span>
            <span className="comic-page-label-box">
              <span className="comic-page-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="comic-page-label">{part.label}</span>
              <span className="comic-page-line">{part.caption}</span>
              {part.key === 'wall' && <span className="comic-page-first">Start here</span>}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}