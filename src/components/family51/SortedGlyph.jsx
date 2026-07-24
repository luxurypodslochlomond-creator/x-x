import React from 'react';

const GOLD = '#c6995c';

/**
 * SortedGlyph — our logo.
 * Meaning: a messy squiggle (the scary/confusing letter) resolving into
 * one clean straight line and a dot (sorted). Chaos → clarity.
 * Ownable, legible at 26px, not copied from any app.
 */
export function SortedGlyph({ size = 26, color = GOLD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      {/* chaos → clarity */}
      <path
        d="M3 16 q 1.6 -3 3.2 0 q 1.6 3 3.2 0 q 1.6 -3 3.2 0 L 26 16"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* the "sorted" destination dot */}
      <circle cx="27.6" cy="16" r="2.3" fill={color} />
    </svg>
  );
}

export default SortedGlyph;