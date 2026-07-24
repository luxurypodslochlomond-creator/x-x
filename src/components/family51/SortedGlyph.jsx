import React from 'react';

const GOLD = '#c6995c';

/**
 * SortedGlyph — our logo.
 * The actual Morse code for SOS:  ··· ─── ···
 * Meaning: "you sent a distress signal — we heard it, it's sorted."
 * Calm and quiet (not a screaming alarm), ownable, legible at small size.
 *
 * Geometry: viewBox 48×18, bold dots (r1.9) and dashes (4.6×3.8) so the
 * three letters S·O·S separate clearly even at 18px.
 */
export function SortedGlyph({ height = 19, color = GOLD }) {
  const width = height * (48 / 18);
  return (
    <svg width={width} height={height} viewBox="0 0 48 18" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      {/* S = three dots */}
      <circle cx="4" cy="9" r="1.9" fill={color} />
      <circle cx="9" cy="9" r="1.9" fill={color} />
      <circle cx="14" cy="9" r="1.9" fill={color} />
      {/* O = three dashes */}
      <rect x="16.7" y="7.1" width="4.6" height="3.8" rx="1.9" fill={color} />
      <rect x="22.2" y="7.1" width="4.6" height="3.8" rx="1.9" fill={color} />
      <rect x="27.7" y="7.1" width="4.6" height="3.8" rx="1.9" fill={color} />
      {/* S = three dots */}
      <circle cx="35" cy="9" r="1.9" fill={color} />
      <circle cx="40" cy="9" r="1.9" fill={color} />
      <circle cx="45" cy="9" r="1.9" fill={color} />
    </svg>
  );
}

export default SortedGlyph;