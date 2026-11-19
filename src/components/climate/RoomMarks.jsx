import React from 'react';

// ── FOUR MARKS, AND THE SAME RULE AS EVERY OTHER DOOR ─────────────────────────
// Every other door on this record is printed in one hand: solid masses, nothing
// thinner than a stroke, and exactly one element in the record's red — the part
// that carries the meaning. The four rooms were the exception. Their marks were
// pictures of a seedling, a flame, three heads and a spade, drawn in the subject's
// own colour, so the backbone of the record was the one place its own rule did not
// hold. A critic would say the obvious thing: they were illustrations of four words,
// not four objects.
//
// So each room is an object now, and each one says its verb in its shape:
//
//   Solutions — the keystone. A red wedge set over two shoulders: the one stone that
//               holds an arch up, and the stone you can carry to the next valley.
//               What works somewhere is kept here so it can be built again.
//   Crises    — the fracture. One mass split down the middle, the seam in red and
//               widening towards the ground. Not a flame, not a warning sign: the
//               ground itself giving way.
//   Actions   — the spade. Red handle, blade, and the short line it breaks. Something
//               done, not something announced.
//   Groups    — the row. Three people standing on one red ground line: three masses,
//               one floor.
//
// Two inks and one red in every one. No gradient, no outline, no borrowed symbol, no
// style of any decade. An arch, a split, a tool and a row are as old as building and
// will read the same in ten thousand years, because they are not a fashion — which is
// the only test a mark on a record that means to last actually has to pass.
const BASE = { viewBox: '0 0 40 40', fill: 'currentColor', stroke: 'none' };

export function RoomMarkSolution({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <path d="M13 4h14l6.4 11.4H6.6z" className="text-record-mark" />
      <rect x="4" y="19.4" width="11.4" height="16.6" />
      <rect x="24.6" y="19.4" width="11.4" height="16.6" />
    </svg>
  );
}

export function RoomMarkCrisis({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="5" width="11.6" height="30" />
      <rect x="24.4" y="5" width="11.6" height="30" />
      <path d="M16.4 5h7.2l-2.6 30h-4.4z" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkAction({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="16.4" y="3.6" width="7.2" height="11.4" className="text-record-mark" />
      <path d="M12.4 15h15.2l-2.8 13.6H15.2z" />
      <rect x="13" y="33.4" width="14" height="4" />
    </svg>
  );
}

export function RoomMarkGroups({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <rect x="5" y="10.6" width="7.6" height="18.6" />
      <rect x="16.2" y="5" width="7.6" height="24.2" />
      <rect x="27.4" y="10.6" width="7.6" height="18.6" />
      <rect x="4" y="32.4" width="32" height="4.6" className="text-record-mark" />
    </svg>
  );
}