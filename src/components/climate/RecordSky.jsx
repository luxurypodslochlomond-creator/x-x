import React from 'react';

// ── THE SKY IS THE ROOM, NOT A FILTER ON IT ──────────────────────────────────────
// Brian, 16 November: the wire's painted band is the best thing on the record, and every
// other page is a blur. He was right, and the reason was measurable: the painting stood at
// fourteen per cent behind paper that was a hair translucent, so a reader saw a murk they
// could not name rather than a sky they could look at. A photograph held under tracing
// paper is not a photograph. It is a smudge.
//
// So the sheet is now a sheet — solid paper at every width — and the painting is shown at
// the strength it was painted for, either side of the book. What sits on top of it here is
// the one thing the painting could not carry on its own: the sky as it actually is.
//
// Two decisions keep this from becoming a screensaver.
//
// The first is that the stars do not twinkle. A field of dots breathing in and out is the
// language of a phone game, and real stars hold perfectly still; what moves up there is not
// the stars, it is something crossing in front of them. So the field is drawn once, static,
// hand-placed rather than tiled — three overlapping lattices of stars at coprime sizes read
// as a grid the moment a reader looks for more than a second, and this record is a thing
// people look at.
//
// The second is rarity. A shooting star arrives roughly once a minute and is gone in under
// a second and a half; a second one runs on its own, slower clock. Most readers will never
// see either, which is exactly what makes seeing one worth anything. Nothing here asks to
// be watched, and nothing here counts.
//
// Cost: one composited layer, two transform-and-opacity animations on eight-pixel elements,
// no canvas, no request, no repaint of the page behind it. A reader who has asked their
// device for less movement gets a perfectly still sky — the global rule in index.css takes
// every animation to an instant, and the streaks end where they began, invisible.
export default function RecordSky() {
  return (
    <div aria-hidden="true" className="record-sky">
      <span className="record-sky-stars" />
      {/* Two, on different clocks, so a reader never learns the rhythm of the sky. */}
      <span className="record-sky-streak" />
      <span className="record-sky-streak record-sky-streak-late" />
    </div>
  );
}