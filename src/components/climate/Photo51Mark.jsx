import React from 'react';

// ── PHOTO 51 ────────────────────────────────────────────────────────────────────
// An exposure made in a capillary tube in 1952, on a camera the photographer built
// herself, that let a shape be seen that nobody had seen before. It belongs to Rosalind
// Franklin and to the archive that holds it, so what is quoted here is its geometry
// rather than the negative: the black field, the four arms of the X, the spots standing
// on the arcs, and the dark disc in the middle where the beam was stopped.
//
// Its name is also this record's number, which is the whole reason it is here: the point
// of a record is to let something be seen that was not being seen.
const SPOTS = [
  [163, 140, 4.6], [237, 140, 4.6],
  [148, 104, 3.8], [252, 104, 3.8],
  [141, 70, 3.1], [259, 70, 3.1],
  [163, 260, 4.6], [237, 260, 4.6],
  [148, 296, 3.8], [252, 296, 3.8],
  [141, 330, 3.1], [259, 330, 3.1],
  [200, 46, 3.4], [200, 354, 3.4],
  [128, 200, 4.2], [272, 200, 4.2],
];

export default function Photo51Mark({ className = '', size = 340 }) {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#efe7d6"
      strokeLinecap="round"
    >
      {/* The arms of the X — the helix, as the fibre gave it up. */}
      <g strokeOpacity="0.3" strokeWidth="1.2">
        <path d="M200 200C182 168 168 134 156 62" />
        <path d="M200 200C218 168 232 134 244 62" />
        <path d="M200 200C182 232 168 266 156 338" />
        <path d="M200 200C218 232 232 266 244 338" />
      </g>

      {/* The layer lines, which is what the fibre was actually saying. */}
      <g strokeOpacity="0.14" strokeWidth="1">
        <path d="M52 200Q200 178 348 200" />
        <path d="M58 238Q200 218 342 238" />
        <path d="M58 162Q200 142 342 162" />
        <path d="M74 286Q200 268 326 286" />
        <path d="M74 114Q200 96 326 114" />
      </g>

      {/* Where the beam was stopped, so the centre stayed dark. */}
      <circle cx="200" cy="200" r="34" fill="#141210" stroke="#efe7d6" strokeOpacity="0.18" strokeWidth="1" />
      <circle cx="200" cy="200" r="62" strokeOpacity="0.1" strokeWidth="1" />

      {/* The spots, set on the arcs. */}
      <g fill="#efe7d6" stroke="none">
        {SPOTS.map(([cx, cy, r], i) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fillOpacity={0.24 + (i % 3) * 0.16} />
        ))}
      </g>
    </svg>
  );
}