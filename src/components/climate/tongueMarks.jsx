import React from 'react';

// ── THE ANCIENT TONGUES GET CUT, NOT BORROWED ──────────────────────────────────
// Brian, 20 November: "noticed some weird emojis in language bro... we need proper marks for
// ancient ones". He was looking at four characters in the tongue list: 🗿 for Rongorongo, 𓂀 for
// Ancient Egyptian, 𒀭 twice for Sumerian and Annunaki. The last three are not emoji at all —
// they are real Unicode signs from the hieroglyphic and cuneiform blocks — and that is exactly
// why they looked wrong. Almost no phone on earth ships a font for them, so what a reader
// actually saw was an empty box, or a grey rectangle where a script should be. The one that did
// render was a cartoon Easter Island head borrowed from a chat app's set.
//
// A record that argues for its own hand cannot name a tongue in somebody else's emoji. So these
// are cut the way every other mark on this record is cut — RoomMarks' rule, the doors' rule:
// solid printed masses, nothing thinner than the mass, and exactly one part in the record's red,
// the part that is the point. Nothing here is drawn in a line and nothing is fetched: they are
// shapes in this file, so they render on every device ever made, at any size, in any tongue.
//
// They are small on purpose — fifteen pixels beside a word in a list, the size a stamp is.
const FRAME = { viewBox: '0 0 40 40', fill: 'none', 'aria-hidden': 'true' };
const MASS = { fill: 'currentColor', stroke: 'none' };
const RED = { className: 'text-record-mark', fill: 'currentColor', stroke: 'none' };

// Ancient Egyptian — the eye, cut: the brow, the lens, the pupil in red, and the mark under it.
export function MarkEgyptian({ size = 15, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <rect x="4" y="9.2" width="32" height="3.8" {...MASS} />
      <path d="M5.6 21.6C10.6 14.4 21.6 12.6 29.8 17.4 26.4 23.6 12.6 26.2 5.6 21.6Z" {...MASS} />
      <rect x="14.4" y="17.4" width="5.8" height="3.8" {...RED} />
      <path d="M23.2 25 L25 34.6 L20 33.8 Z" {...MASS} />
    </svg>
  );
}

// Sumerian — two wedges and a bar, the shape a reed makes in wet clay. One wedge in red,
// because the wedge is the whole invention and the record marks the invention.
export function MarkSumerian({ size = 15, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path d="M5 9.6 H24.4 L5 16.8 Z" {...MASS} />
      <rect x="8" y="21" width="16.4" height="3.6" {...MASS} />
      <path d="M35 22.6 H15.6 L35 29.8 Z" {...RED} />
    </svg>
  );
}

// Akkadian — the same reed, the same clay, written a few centuries later and heavier with
// signs. Four wedges instead of two, and the red one is the sign that changed.
export function MarkAkkadian({ size = 15, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path d="M6 8 H19.4 L6 15 Z" {...MASS} />
      <path d="M34 8 H20.6 L34 15 Z" {...MASS} />
      <path d="M6 26.4 H19.4 L6 33.4 Z" {...MASS} />
      <path d="M34 26.4 H20.6 L34 33.4 Z" {...RED} />
    </svg>
  );
}

// Annunaki — the star that stands at the head of the inscriptions, cut as one mass, with the
// red square in the middle: the sign for heaven in the sign for writing.
export function MarkAnunnaki({ size = 15, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path
        d="M38 20 L26.93 22.87 L32.73 32.73 L22.87 26.93 L20 38 L17.13 26.93 L7.27 32.73 L13.07 22.87 L2 20 L13.07 17.13 L7.27 7.27 L17.13 13.07 L20 2 L22.87 13.07 L32.73 7.27 L26.93 17.13 Z"
        {...MASS}
      />
      <rect x="16.6" y="16.6" width="6.8" height="6.8" {...RED} />
    </svg>
  );
}

// Rongorongo — the glyphs of Rapa Nui, which are read round and round rather than in a line.
// So the mark is a ring with its red centre and one stroke running out of it: a reading that
// has not finished. This is the one that was wearing a cartoon stone head.
export function MarkRongorongo({ size = 15, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 3.6a16.4 16.4 0 1 1 0 32.8 16.4 16.4 0 0 1 0-32.8Zm0 7.2a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4Z"
        {...MASS}
      />
      <rect x="16.4" y="16.4" width="7.2" height="7.2" {...RED} />
      <rect x="27.4" y="32.6" width="9" height="4.4" {...MASS} />
    </svg>
  );
}

// The globe that was a 🌐 emoji, cut instead: a ring, an ink meridian, and the equator in red.
// Used for the "Auto — the device's own tongue" line, where a borrowed emoji was the one glyph
// in the whole panel that did not belong to this record.
export function MarkGlobe({ size = 14, className = '' }) {
  return (
    <svg {...FRAME} width={size} height={size} className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 3.6a16.4 16.4 0 1 1 0 32.8 16.4 16.4 0 0 1 0-32.8Zm0 4a12.4 12.4 0 1 0 0 24.8 12.4 12.4 0 0 0 0-24.8Z"
        {...MASS}
      />
      <rect x="4.4" y="18.2" width="31.2" height="3.6" {...RED} />
      <rect x="18.2" y="7.4" width="3.6" height="25.2" {...MASS} />
    </svg>
  );
}

// Only the tongues whose own signs the record cannot print get a cut mark. Every other tongue
// on the list is already written in its own living script — Français, हिन्दी, ᏣᎳᎩ — and needs
// no drawing beside it: the script is the mark.
const MARKS = {
  egy: MarkEgyptian,
  sux: MarkSumerian,
  akk: MarkAkkadian,
  annunaki: MarkAnunnaki,
  rongorongo: MarkRongorongo,
};

export function TongueMark({ code, size = 15, className = '' }) {
  const Mark = MARKS[String(code || '').toLowerCase()];
  return Mark ? <Mark size={size} className={className} /> : null;
}

export default TongueMark;