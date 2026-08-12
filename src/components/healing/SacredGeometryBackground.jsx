import React from 'react';

/**
 * Flower of Life — ancient sacred geometry as a subtle background texture.
 * Zero animation, zero JS overhead. Just SVG circles. Ancient + future.
 */
export default function SacredGeometryBackground({ color = '#d4a017', opacity = 0.05 }) {
  const r = 50;
  // Flower of Life — 19 overlapping circles in hexagonal pattern
  const circles = [
    // Seed of Life (7)
    [200, 200], [200, 150], [243.3, 175], [243.3, 225], [200, 250], [156.7, 225], [156.7, 175],
    // First ring (6)
    [200, 100], [286.6, 150], [286.6, 250], [200, 300], [113.4, 250], [113.4, 150],
    // Second ring (6)
    [286.6, 50], [343.3, 125], [343.3, 275], [286.6, 350], [113.4, 350], [56.7, 275],
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="500" height="500" viewBox="0 0 400 400" fill="none" className="max-w-none">
        {circles.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} stroke={color} strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}