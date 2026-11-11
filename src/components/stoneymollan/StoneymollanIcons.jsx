import React from 'react';

/* ── THE HILL'S OWN MARKS ──────────────────────────────────────────────────────
   Cut, not borrowed. Every mark here is a single-weight line on a 24-unit grid,
   drawn a little off-true on purpose — a diamond bow instead of a perfect ring, a
   squirrel whose tail overshoots, a base stone that leans. That is the difference
   between something cut by hand and something generated.

   And each of the six doors carries exactly one stroke of the borrowed red: the
   key's hole, the cabin's lit door, the cross on the old stone, the camera's lens,
   the wax on the envelope. One red mark per door, so the row reads as a set of
   stamps struck onto the same sheet as the type rather than a row of app buttons. */

const ACCENT = 'rgb(var(--record-mark))';
const GLINT = 'rgb(var(--record-bone))';

function Mark({ className = 'h-6 w-6', strokeWidth = 1.9, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* Book direct — a key, with the red in its bow. The one we want pressed. */
export function KeyMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M4.3 5.9 8.2 2.3l3.9 3.6-3.9 3.6L4.3 5.9Z" />
      <path d="M11.4 8.4 20.4 18.6" />
      <path d="M16.6 14.6l2.1-1.8" />
      <path d="M18.6 17l2.1-1.8" />
      <circle cx="8.2" cy="5.9" r="1.15" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* The stay — a cabin with its door lit. */
export function CabinMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M2.5 11.1 12 3.3l9.5 7.8" />
      <path d="M4.8 9.9v10.3h14.4V9.9" />
      <path d="M16.9 6.1V3.2h1.8v4.5" />
      <path d="M10 20.2v-5h4v5Z" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* The road — the cross on the old stone, in red. */
export function CrossStoneMark({ className }) {
  return (
    <Mark className={className}>
      <path d="M12 3.2v7.7" stroke={ACCENT} />
      <path d="M8.6 6.2h6.8" stroke={ACCENT} />
      <path d="M7.4 20.6c-.6-3.4.9-4.5 4.6-4.5s5.2 1.1 4.6 4.5" />
      <path d="M9.6 16.1h4.8" />
    </Mark>
  );
}

/* Instagram — a camera with a red lens, not somebody else's logo. */
export function CameraMark({ className }) {
  return (
    <Mark className={className}>
      <rect x="3.1" y="6.3" width="17.8" height="13.1" rx="3.4" />
      <path d="M8.6 6.1 9.7 4.2h4.6l1.1 1.9" />
      <circle cx="12" cy="12.9" r="3.6" fill={ACCENT} stroke="none" />
      <circle cx="13.2" cy="11.7" r="0.9" fill={GLINT} stroke="none" />
      <circle cx="17.4" cy="9.4" r="0.8" fill="currentColor" stroke="none" />
    </Mark>
  );
}

/* Contact — an envelope with a wax seal, in red. */
export function EnvelopeMark({ className }) {
  return (
    <Mark className={className}>
      <rect x="2.8" y="6" width="18.4" height="12.4" rx="1.7" />
      <path d="M3.4 7.3 12 13.4l8.6-6.1" />
      <circle cx="12" cy="16.6" r="2" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* Red squirrel — the over-curled tail is the whole animal, and the eye is red. */
export function SquirrelMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M15.3 19.7c-2.9 0-4.9-2-4.9-4.9 0-2.3 1.4-3.8 3.5-4" />
      <path d="M15.3 19.7c1.8 0 3.1-1.2 3.1-2.9 0-1.5-1-2.5-2.3-2.8" />
      <path d="M17.1 13.9c2.3-.6 3.2-2.8 2.2-4.7-1-1.9-3.5-2.3-5-.9-1 .9-1.1 2.3-.4 3.3" />
      <path d="M13.9 9.9c-.2-1.2-1.1-2-2.3-2.1" />
      <circle cx="12.2" cy="10.4" r="0.7" fill={ACCENT} stroke="none" />
    </Mark>
  );
}

/* Roe deer — antlers, and the long face. */
export function DeerMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M12 20.3v-5.5" />
      <path d="M9.2 12.6c0-1.7 1.2-3 2.8-3s2.8 1.3 2.8 3" />
      <path d="M9.2 10.5 7.8 7.3l-1.9.7" />
      <path d="M14.8 10.5 16.2 7.3l1.9.7" />
      <path d="M7.8 7.3 6.7 4.6" />
      <path d="M16.2 7.3l1.1-2.7" />
      <path d="M7.8 7.3 6 8.1" />
    </Mark>
  );
}

/* Badger and fox — a pad and four toes. The field edges, after dark. */
export function PawMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M12 12.3c2.7 0 4.7 1.6 4.7 3.5 0 2-2 3-4.7 3s-4.7-1-4.7-3c0-1.9 2-3.5 4.7-3.5Z" />
      <ellipse cx="7.1" cy="9.9" rx="1.35" ry="1.5" />
      <ellipse cx="9.9" cy="7.5" rx="1.35" ry="1.55" />
      <ellipse cx="14.1" cy="7.5" rx="1.35" ry="1.55" />
      <ellipse cx="16.9" cy="9.9" rx="1.35" ry="1.5" />
    </Mark>
  );
}

/* Otter — a head in the water, whiskers out. */
export function OtterMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M6.1 15.1c0-2.6 2.5-4.5 5.9-4.5s5.9 1.9 5.9 4.5" />
      <path d="M6.1 15.1c0 2 2.7 3.2 5.9 3.2s5.9-1.2 5.9-3.2" />
      <circle cx="9.9" cy="14.3" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14.1" cy="14.3" r="0.7" fill="currentColor" stroke="none" />
      <path d="M10.9 17.1h2.2" />
      <path d="M4.5 13.2 2.4 12.3M4.5 15.4H2.2M19.5 13.2l2.1-.9M19.5 15.4h2.3" />
    </Mark>
  );
}

/* Osprey — the whole bird is the bend of the wings. */
export function BirdMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M3.4 9.1c2.7-.5 4.7.9 6 2.6 1.4-1.7 3.4-3.1 6-2.6" />
      <path d="M9.4 11.7c.5 3.2.2 5.6-1.4 8" />
      <path d="M14.6 11.7c-.5 3.2-.2 5.6 1.4 8" />
      <path d="M12 4.4v3.2" />
    </Mark>
  );
}

/* Mycelium — a mushroom above, threads below. The bit nobody photographs. */
export function MyceliumMark({ className }) {
  return (
    <Mark className={className} strokeWidth={1.7}>
      <path d="M3.9 11c0-3.9 3.6-6.5 8.1-6.5s8.1 2.6 8.1 6.5c0 1-1.2 1.6-3 1.6H6.9c-1.8 0-3-.6-3-1.6Z" />
      <path d="M10.5 12.6v4c0 1.3.9 2.2 1.5 2.2s1.5-.9 1.5-2.2v-4" />
      <path d="M6.3 21.4c1.4-.9 2.6-1.3 3.8-1.3M17.7 21.4c-1.4-.9-2.6-1.3-3.8-1.3" />
      <path d="M9.2 18.9 7.5 20.2M14.8 18.9l1.7 1.3" />
    </Mark>
  );
}