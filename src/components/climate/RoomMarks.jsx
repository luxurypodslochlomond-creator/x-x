import React from 'react';

// ── FOUR CUTS FROM ONE BLOCK ──────────────────────────────────────────────────
// These are linocut, not icons. A mark cut from a block has an irregular edge and a
// shape you can only get by taking material away, which is why it reads as something
// somebody made rather than as something a framework supplied. That is the whole
// difference between this record and a media platform, and it costs nothing: the same
// two inks and one red as every other door, drawn with a hand in it.
//
// The first attempt at these was four equal bars and a wedge, which is a bar chart —
// the exact corporate texture the record is trying not to have. So no two of these
// share a grid now, and no two share a direction:
//
//   Solutions — a spliced beam. Two lengths of timber laid end to end with the joint
//               bound in red. What worked somewhere, joined onto somewhere else: it
//               holds, and you can carry the joint to the next valley.
//   Crises    — the same mass, with a bite taken out of its foot and the bite left in
//               red. Not a flame and not a warning sign: something that was whole and
//               is not any more.
//   Actions   — a spade put into the ground, set at a slight angle because a person
//               put it there. Red handle, ink blade, the short line it breaks.
//   Groups    — four heads of different sizes standing on one red line. Not three
//               equal columns: a crowd, with somebody taller and somebody smaller,
//               which is what a group actually is.
//
// Nothing here is a borrowed symbol, nothing is a gradient, nothing is a trend. A
// joint, a bite, a spade and a crowd are as old as making things together, so they
// will read the same in ten thousand years — which is the only test a mark on a
// record that means to last has to pass.
const BASE = { viewBox: '0 0 40 40', fill: 'currentColor', stroke: 'none' };

export function RoomMarkSolution({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* the two lengths, and the red binding across the joint */}
      <path d="M4 15.6h13.4v9.4H4z" />
      <path d="M22.6 15.6H36v9.4H22.6z" />
      <path d="M16.6 12.4h6.8v15.8h-6.8z" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkCrisis({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* a mass with its foot given way, the break left in red */}
      <path d="M4.6 6h30.8v16.4l-8.6 12.2H4.6z" />
      <path d="M35.4 22.4 26.8 34.6 24 22.4z" className="text-record-mark" />
    </svg>
  );
}

export function RoomMarkAction({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      <g transform="rotate(-7 20 20)">
        <path d="M16.2 3.4h7.6v11.6h-7.6z" className="text-record-mark" />
        <path d="M12.2 15h15.6l-2.9 13.8H15.1z" />
        <path d="M13.4 33h13.2v4.2H13.4z" />
      </g>
    </svg>
  );
}

export function RoomMarkGroups({ size = 26, className = '' }) {
  return (
    <svg {...BASE} width={size} height={size} className={className} aria-hidden="true">
      {/* four heads, none of them the same size, on one ground */}
      <circle cx="7.6" cy="18.4" r="4.6" />
      <circle cx="16.6" cy="13.6" r="5.6" />
      <circle cx="25.4" cy="15.4" r="5.2" />
      <circle cx="33.4" cy="19.2" r="4.2" />
      <path d="M3.6 28.6h32.8v4.6H3.6z" className="text-record-mark" />
    </svg>
  );
}