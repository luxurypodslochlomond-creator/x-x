import React from 'react';

const GOLD = '#c6995c';

/**
 * SortedGlyph — our logo.
 * The actual Morse code for SOS:  ··· ─── ···
 * Meaning: "you sent a distress signal — we heard it, it's sorted."
 * Calm and quiet (not a screaming alarm), ownable, legible at small size.
 */
export function SortedGlyph({ height = 18, color = GOLD }) {
  // viewBox 40:16  →  width = height * 2.5
  const width = height * 2.5;
  return (
    <svg width={width} height={height} viewBox="0 0 40 16" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      {/* S = three dots */}
      <circle cx="3" cy="8" r="1.5" fill={color} />
      <circle cx="7" cy="8" r="1.5" fill={color} />
      <circle cx="11" cy="8" r="1.5" fill={color} />
      {/* O = three dashes */}
      <rect x="13" y="6.5" width="4" height="3" rx="1.5" fill={color} />
      <rect x="18" y="6.5" width="4" height="3" rx="1.5" fill={color} />
      <rect x="23" y="6.5" width="4" height="3" rx="1.5" fill={color} />
      {/* S = three dots */}
      <circle cx="29" cy="8" r="1.5" fill={color} />
      <circle cx="33" cy="8" r="1.5" fill={color} />
      <circle cx="37" cy="8" r="1.5" fill={color} />
    </svg>
  );
}

export default SortedGlyph;