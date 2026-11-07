import React from 'react';

// ── THE DIRT ────────────────────────────────────────────────────────────────────────────────
// Warm paper is not a colour, it is a surface. A flat cream field behind a painting reads as a
// screen with a filter over it, and no amount of good type will save that — Lou Reed would have
// heard the polish in a second and put it down.
//
// So the ground carries two kinds of dirt, drawn by the browser rather than downloaded.
//
// The first is tooth: fine fractal noise at half a pixel, blended so it grabs the light instead
// of darkening the page. That is the fibre of the sheet, and it is the reason the field stops
// looking like paint poured flat.
//
// The second is foxing: huge, slow blotches at a scale nobody can count, multiplied in faintly,
// the way damp and age move through real paper over decades. It never repeats within a page and
// it is never the same twice at different scroll positions, because it is pinned while the page
// moves over it.
//
// Both sit UNDER the record's own text and above the painting: the words are printed on a dirty
// sheet, they are not written on a dirty screen. Nothing here is a picture of grime pasted on
// top — it is two small SVGs the phone already knows how to draw, one composited layer, no
// network, no repaint per scroll, and every tongue gets the same dirt because dirt has no
// language.
const noiseLayer = (frequency, octaves, size, opacity, blend) => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
    `<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='${frequency}' ` +
    `numOctaves='${octaves}' stitchTiles='stitch'/>` +
    `<feColorMatrix type='saturate' values='0'/></filter>` +
    `<rect width='${size}' height='${size}' filter='url(#g)'/></svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundRepeat: 'repeat',
    opacity,
    mixBlendMode: blend,
  };
};

// Both weights came down hard. At half opacity the tooth was not paper fibre, it was
// grit on the glass: every page looked slightly dirty behind the words, which reads as
// a bad screen rather than a good sheet. The sheet now carries the grain, not the page.
const TOOTH = noiseLayer(0.82, 3, 160, 0.2, 'overlay');
const FOXING = noiseLayer(0.011, 4, 640, 0.05, 'multiply');

export default function RecordGrain() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0" style={FOXING} />
      <div className="absolute inset-0" style={TOOTH} />
    </div>
  );
}