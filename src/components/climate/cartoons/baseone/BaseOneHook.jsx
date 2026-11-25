import React from 'react';

// ── THE MACHINE'S OWN MARK ──────────────────────────────────────────────────────
// Brian, 25 November: "doesn't BASE 1 need a mark / symbol bro?" He had spotted the one
// asymmetry in the room. Every hand on the wall signs itself, and this room signed itself
// in words alone — a maker with no mark, in a room full of makers' marks.
//
// What is drawn is NOT a picture of the machine. A robot head, an eye, a nib with a hand
// on it: all of that is costume, and costume is the thing this record has thrown out twice
// already for the same reason. What is drawn instead is the one object this hand actually
// owns — the bare hook the drawings hang from, with nothing on it, because there is no
// hand here to hang anything with.
//
// It says exactly what the signature says in words, in one line: no hand, no weather. It is
// the hook from the eighth mark, taken down to the size of a stamp and set in the margin
// beside the name, the way a printer's device sits beside a colophon. Ink for the hook, one
// red part for the point it hangs on — the same two-part drawing as every other printed
// mark on this record. Nothing filled, shaded or decorated.
export default function BaseOneHook({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 text-record-ink ${className}`}
    >
      {/* the nail, driven into the wall — and the point everything would hang from */}
      <path d="M20 5.2 L20 16.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16.5 8.6 L20 5 L23.5 8.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      {/* the hook, empty, holding nothing at all */}
      <path
        d="M20 16.2 C20 22.4 26.8 22.2 26.8 27.8 C26.8 32.4 22.8 34.8 19.6 34.8 C15.6 34.8 13.2 31.8 13.2 28.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* the one red part: the point it hangs on, carrying nothing */}
      <circle cx="20" cy="16.2" r="1.9" fill="currentColor" className="text-record-mark" />
    </svg>
  );
}