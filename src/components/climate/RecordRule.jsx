import React from 'react';

// ── THE RULE ABOVE THE IMPRINT ─────────────────────────────────────────────────
// This was a one-pixel box. It is the same line, drawn by hand, in the same stroke as
// the navigation marks and the plates — so the top of the record is ruled by the same
// hand that rules everything under it, instead of by a browser's default border.
//
// Nothing has been added here: a divider had to exist anyway, and now it is made rather
// than rendered. That is the whole test this record applies to its own ornament — the
// line had a job, and it does it in the record's own hand. No flourish, no badge, no
// second colour, and it never moves.
export default function RecordRule({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`mt-2 block h-[3px] w-full text-record-ink/20 ${className}`}
      viewBox="0 0 400 3"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0 1.7C62 0.9 121 2.2 200 1.5S338 0.9 400 1.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}