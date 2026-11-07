import React, { useMemo } from 'react';
import { landDots, projectPct, PLATE_W, PLATE_H } from './worldPlate';

/* ── ONE PLATE, EVERY SCREEN ───────────────────────────────────────────────────────
   The world is drawn at exactly two-to-one, so the frame never letterboxes and a mark
   can be placed by percentage and land on the right degree. Nothing pans, nothing
   zooms, nothing loads late: what a reader sees is the whole planet, at once, on the
   record's paper — Arctic at the top, Antarctica along the bottom.

   Every mark is a real button, so a dot can be tapped with a thumb and reached with a
   keyboard, and the label a screen reader reads is the same label the dot carries. */
const TONES = {
  crisis: { fill: '#b3261e', shape: 'rounded-full', size: 10 },
  solution: { fill: '#141210', shape: 'rounded-full', size: 8 },
  action: { fill: '#1e3a2b', shape: 'rotate-45', size: 8 },
  country: { fill: '#b3261e', shape: 'rounded-full', size: 9 },
  nation: { fill: '#0f5f7a', shape: 'rounded-full', size: 9 },
};

export default function WorldPlate({ marks = [], selectedId, onSelect, label }) {
  const d = useMemo(() => landDots(), []);

  return (
    <div
      className="relative w-full aspect-[2/1] overflow-hidden bg-[#efe7d6]"
      role="group"
      aria-label={label || 'A map of the world'}
    >
      <svg
        viewBox={`0 0 ${PLATE_W} ${PLATE_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* The grid a plate carries so the eye can find a latitude — every thirty degrees,
            with the equator given one hair more weight. Hairlines, never a net. */}
        <g stroke="#141210" strokeWidth="0.6" opacity="0.13" vectorEffect="non-scaling-stroke">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110].map((x) => (
            <line key={`lon-${x}`} x1={x} y1={0} x2={x} y2={PLATE_H} />
          ))}
          {[10, 20, 40, 50].map((y) => (
            <line key={`lat-${y}`} x1={0} y1={y} x2={PLATE_W} y2={y} />
          ))}
        </g>
        <line x1={0} y1={30} x2={PLATE_W} y2={30} stroke="#141210" strokeWidth="0.6" opacity="0.26" vectorEffect="non-scaling-stroke" />

        {/* The land. One path, round caps — a stipple engraving of every coast on Earth. */}
        <path
          d={d}
          stroke="#3a342c"
          strokeWidth="2.1"
          strokeLinecap="round"
          fill="none"
          opacity="0.62"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {marks.map((m) => {
        const { left, top } = projectPct(m.lat, m.lng);
        const tone = TONES[m.tone] || TONES.solution;
        const on = selectedId != null && m.id === selectedId;
        const size = m.size ?? tone.size;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect && onSelect(m)}
            aria-label={m.aria || m.label}
            aria-current={on ? 'true' : undefined}
            title={m.label}
            className="absolute grid place-items-center p-0 bg-transparent border-0 cursor-pointer"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: 30,
              height: 30,
              transform: `translate(-50%,-50%) translate(${m.dx || 0}px, ${m.dy || 0}px)`,
              zIndex: on ? 3 : 2,
            }}
          >
            {on && (
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ width: size + 14, height: size + 14, border: `2px solid ${tone.fill}`, opacity: 0.9 }}
              />
            )}
            <span
              aria-hidden="true"
              className={tone.shape}
              style={{
                width: size,
                height: size,
                background: tone.fill,
                boxShadow: '0 0 0 1.5px #efe7d6',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}