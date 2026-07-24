import React from 'react';

const GOLD = '#c6995c';

/**
 * SortedGlyph — our logo.
 * The actual Morse code for SOS:  ··· ─── ···
 * Meaning: "you sent a distress signal — we heard it, it's sorted."
 *
 * Geometry: dashes are ~2.4× a dot width so S·O·S rhythm is unmistakable,
 * even at 20px. Letter gaps wider than intra-letter gaps so the three
 * letters separate clearly.
 */
export function SortedGlyph({ height = 20, color = GOLD }) {
  const width = height * (68 / 18);
  const dashY = 9 - 1.9;
  return (
    <svg width={width} height={height} viewBox="0 0 68 18" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      {/* S = three dots */}
      <circle cx="3.5" cy="9" r="1.9" fill={color} />
      <circle cx="8.5" cy="9" r="1.9" fill={color} />
      <circle cx="13.5" cy="9" r="1.9" fill={color} />
      {/* O = three long dashes */}
      <rect x="18" y={dashY} width="9" height="3.8" rx="1.9" fill={color} />
      <rect x="29" y={dashY} width="9" height="3.8" rx="1.9" fill={color} />
      <rect x="40" y={dashY} width="9" height="3.8" rx="1.9" fill={color} />
      {/* S = three dots */}
      <circle cx="53.5" cy="9" r="1.9" fill={color} />
      <circle cx="58.5" cy="9" r="1.9" fill={color} />
      <circle cx="63.5" cy="9" r="1.9" fill={color} />
    </svg>
  );
}

export default SortedGlyph;