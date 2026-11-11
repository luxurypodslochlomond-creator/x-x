import React from 'react';

/* ── THE HILL'S OWN MARKS ──────────────────────────────────────────────────────
   Drawn rather than borrowed. Every icon here is a single-weight cut line on a
   24-unit grid — no filled glyphs, no rounded-corner app furniture — so the row in
   the masthead reads like marks stamped onto the same sheet as the type instead of
   a row of buttons borrowed from a website.

   The coordinates are deliberately a little off-true: a key that is not perfectly
   symmetrical, a squirrel whose tail overshoots, a base stone that leans. That is
   the whole difference between something cut by hand and something generated, and
   it is the same argument the record makes about its type. */

function Mark({ className = 'h-6 w-6', children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* Book direct — a key, because a booking taken here is the door to the place. */
export function KeyMark({ className }) {
  return (
    <Mark className={className}>
      <circle cx="8.1" cy="8.3" r="4.2" />
      <path d="M11.1 11.3 20 20.2" />
      <path d="M16.2 16.5l2.1-2.1" />
      <path d="M18.2 18.5l1.9-1.9" />
    </Mark>
  );
}

/* The stay — two cabins and a curl of smoke. */
export function CabinMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M2.7 11.3 12 3.6l9.3 7.7" />
      <path d="M4.9 10.1v10.1h14.2V10.1" />
      <path d="M9.7 20.2v-5.5h4.6v5.5" />
      <path d="M16.8 6.3V3.5h1.7v4.7" />
    </Mark>
  );
}

/* The road — a wayside cross above its base stone. */
export function CrossStoneMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M12 3.3v7.6" />
      <path d="M8.7 6.2h6.6" />
      <path d="M7.5 20.4c-.5-3.2.9-4.2 4.5-4.2s5.1 1 4.6 4.2" />
      <path d="M9.6 16.2h4.8" />
    </Mark>
  );
}

/* Instagram — a camera, not somebody else's logo. */
export function CameraMark({ className }) {
  return (
    <Mark className={className}>
      <rect x="3.3" y="6.4" width="17.4" height="13" rx="3.3" />
      <circle cx="12" cy="12.9" r="3.6" />
      <circle cx="17.1" cy="9.5" r="0.85" fill="currentColor" stroke="none" />
    </Mark>
  );
}

/* Contact — an envelope, hand-ruled. */
export function EnvelopeMark({ className }) {
  return (
    <Mark className={className}>
      <rect x="3" y="6.2" width="18" height="12.2" rx="1.6" />
      <path d="M3.6 7.4 12 13.5l8.4-6.1" />
    </Mark>
  );
}

/* Red squirrel — the big over-curled tail is the whole animal. */
export function SquirrelMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M15.3 19.7c-2.9 0-4.9-2-4.9-4.9 0-2.3 1.4-3.8 3.5-4" />
      <path d="M15.3 19.7c1.8 0 3.1-1.2 3.1-2.9 0-1.5-1-2.5-2.3-2.8" />
      <path d="M17.1 13.9c2.3-.6 3.2-2.8 2.2-4.7-1-1.9-3.5-2.3-5-.9-1 .9-1.1 2.3-.4 3.3" />
      <path d="M13.9 9.9c-.2-1.2-1.1-2-2.3-2.1" />
      <circle cx="12.2" cy="10.4" r="0.65" fill="currentColor" stroke="none" />
    </Mark>
  );
}

/* Roe deer — antlers, and the long face. */
export function DeerMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M12 20.2v-5.4" />
      <path d="M9.3 12.6c0-1.7 1.2-2.9 2.7-2.9s2.7 1.2 2.7 2.9" />
      <path d="M9.3 10.4 8 7.4l-1.7.6" />
      <path d="M14.7 10.4 16 7.4l1.7.6" />
      <path d="M8 7.4 7 5.2" />
      <path d="M16 7.4l1-2.2" />
    </Mark>
  );
}

/* Badger and fox — a pad and four toes. The field edges, after dark. */
export function PawMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M12 12.4c2.6 0 4.6 1.5 4.6 3.4 0 2-2 2.9-4.6 2.9s-4.6-.9-4.6-2.9c0-1.9 2-3.4 4.6-3.4Z" />
      <circle cx="7.3" cy="10.1" r="1.35" />
      <circle cx="10" cy="7.8" r="1.35" />
      <circle cx="14" cy="7.8" r="1.35" />
      <circle cx="16.7" cy="10.1" r="1.35" />
    </Mark>
  );
}

/* Otter — a head in the water with its whiskers. */
export function OtterMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M6.2 15.2c0-2.5 2.4-4.3 5.8-4.3s5.8 1.8 5.8 4.3" />
      <path d="M6.2 15.2c0 1.9 2.6 3.1 5.8 3.1s5.8-1.2 5.8-3.1" />
      <circle cx="10" cy="14.4" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="14" cy="14.4" r="0.65" fill="currentColor" stroke="none" />
      <path d="M10.9 17.1h2.2" />
      <path d="M4.6 13.4 2.6 12.6M4.6 15.4H2.4M19.4 13.4l2-1.2M19.4 15.4h2.2" />
    </Mark>
  );
}

/* Osprey — the whole bird is the bend of the wings. */
export function BirdMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3.6 9.2c2.6-.5 4.6.8 5.9 2.5 1.3-1.7 3.3-3 5.9-2.5" />
      <path d="M9.5 11.7c.5 3.1.2 5.5-1.3 7.9" />
      <path d="M14.5 11.7c-.5 3.1-.2 5.5 1.3 7.9" />
      <path d="M12 4.6v3.1" />
    </Mark>
  );
}

/* Mycelium — a mushroom above, threads below. The bit nobody photographs. */
export function MyceliumMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M3.9 11.1c0-3.9 3.6-6.5 8.1-6.5s8.1 2.6 8.1 6.5c0 1-1.2 1.6-3 1.6H6.9c-1.8 0-3-.6-3-1.6Z" />
      <path d="M10.5 12.7v3.9c0 1.3.9 2.2 1.5 2.2s1.5-.9 1.5-2.2v-3.9" />
      <path d="M6.4 21.3c1.4-.9 2.6-1.3 3.8-1.2M17.6 21.3c-1.4-.9-2.6-1.3-3.8-1.2" />
      <path d="M9.2 18.9 7.6 20.1M14.8 18.9l1.6 1.2" />
    </Mark>
  );
}