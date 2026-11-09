import React from 'react';

// ── LIGHT, BEFORE LANGUAGE ─────────────────────────────────────────────────────
// A reader's eye is reached by light long before a sentence is reached by a mind.
// That is not a metaphor here, it is the order in which a page happens: photons, then
// shapes, then meaning. So this record answers a reader with light first — a small
// source, and the wave leaving it, drawn widening as it travels.
//
// One arc is red. Not the nearest, which would be about the origin, and not the last,
// which would be about the distance: the one in the middle, because that is where a
// reader meets it.
export default function XEqualsXLightPlate() {
  const arcs = [
    { x: 78, h: 16, red: false },
    { x: 132, h: 23, red: false },
    { x: 196, h: 32, red: true },
    { x: 272, h: 42, red: false },
    { x: 360, h: 54, red: false },
    { x: 458, h: 64, red: false },
  ];

  return (
    <figure className="my-10 border-y border-record-ink/20 py-9">
      <svg
        viewBox="0 0 600 140"
        role="img"
        aria-label="A small source at the left, with six waves widening as they travel across the page. One of them is red."
        className="block h-auto w-full"
      >
        <line x1="0" y1="70" x2="600" y2="70" stroke="#141210" strokeWidth=".7" strokeDasharray="2 7" opacity=".22" />
        <circle cx="30" cy="70" r="3.4" fill="#141210" />
        {arcs.map(({ x, h, red }) => (
          <path
            key={x}
            d={`M ${x} ${70 - h} Q ${x + 22} 70 ${x} ${70 + h}`}
            fill="none"
            stroke={red ? 'rgb(var(--record-mark))' : '#141210'}
            strokeWidth={red ? 2.4 : 1.2}
            strokeLinecap="round"
            opacity={red ? 1 : 0.55}
            className={red ? 'x-equals-x-light' : undefined}
          />
        ))}
      </svg>

      <figcaption className="mx-auto mt-6 max-w-[38ch] text-center text-[15px] leading-[1.6] text-record-ink">
        Light reaches the eye before the sentence reaches the mind.
        <span className="mt-1 block text-record-muted">So the page is drawn first, and read second.</span>
      </figcaption>
    </figure>
  );
}