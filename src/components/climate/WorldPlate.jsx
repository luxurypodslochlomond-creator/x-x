import React, { useMemo } from 'react';
import { landDots, projectPct, PLATE_W, PLATE_H } from './worldPlate';
import '@/components/climate/record-reach.css';

/* ── ONE PLATE, EVERY SCREEN ───────────────────────────────────────────────────────
   The world is drawn at exactly two-to-one, so the frame never letterboxes and a mark
   can be placed by percentage and land on the right degree. Nothing pans, nothing
   zooms, nothing loads late: what a reader sees is the whole planet, at once — Arctic at
   the top, Antarctica along the bottom.

   This file is now the only place a world is drawn on this record. It was one of three:
   the Map page and the Reach page used this plate on paper, and the band at the foot of
   every page drew its own copy of the same coastlines in the dark. Three drawings of one
   world is three chances to disagree, so the band uses this plate too, in ink. Same
   stipple, same projection, same graticule — a different ground, never a different Earth.

   Two grounds, and they mean two different things:
     paper — a plate to be read and pressed. Every mark is a real button.
     ink   — an instrument in the dark. Lights glow, and nothing is pressable, because a
             foot on every page is a reading, not a control panel.

   Every mark is a real button, so a dot can be tapped with a thumb and reached with a
   keyboard, and the label a screen reader reads is the same label the dot carries. */
const MARKS = {
  crisis: { fill: '#b3261e', shape: 'rounded-full', size: 10 },
  solution: { fill: '#141210', shape: 'rounded-full', size: 8 },
  action: { fill: '#1e3a2b', shape: 'rotate-45', size: 8 },
  // A line on the wire. The record's ocean, not its warning: a report is not an emergency.
  wire: { fill: '#0f5f7a', shape: 'rounded-full', size: 7 },
  country: { fill: '#b3261e', shape: 'rounded-full', size: 9 },
  nation: { fill: '#0f5f7a', shape: 'rounded-full', size: 9 },
};

const GROUND = {
  paper: {
    bg: 'bg-[#efe7d6]',
    grid: '#141210', gridOpacity: 0.13,
    equator: '#141210', equatorOpacity: 0.26,
    land: '#3a342c', landOpacity: 0.62, landWidth: 2.1,
    ring: '#efe7d6',
    // On paper the reach is the record's ember, not its signal yellow: yellow on warm
    // paper is a smudge, and the reach is a fact worth seeing, not a highlighter.
    light: '#e2602a',
  },
  ink: {
    bg: 'bg-transparent',
    grid: '#e2602a', gridOpacity: 0.12,
    equator: '#ffd447', equatorOpacity: 0.35,
    land: '#efe7d6', landOpacity: 0.5, landWidth: 1.5,
    ring: '#141210',
    light: '#ffd447',
  },
};

export default function WorldPlate({ marks = [], lights = [], selectedId, onSelect, label, tone = 'paper' }) {
  const d = useMemo(() => landDots(), []);
  const g = GROUND[tone] || GROUND.paper;

  return (
    <div
      className={`relative w-full aspect-[2/1] overflow-hidden ${g.bg}`}
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
        <g stroke={g.grid} strokeWidth="0.6" opacity={g.gridOpacity} vectorEffect="non-scaling-stroke">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110].map((x) => (
            <line key={`lon-${x}`} x1={x} y1={0} x2={x} y2={PLATE_H} />
          ))}
          {[10, 20, 40, 50].map((y) => (
            <line key={`lat-${y}`} x1={0} y1={y} x2={PLATE_W} y2={y} />
          ))}
        </g>
        <line x1={0} y1={30} x2={PLATE_W} y2={30} stroke={g.equator} strokeWidth="0.6" opacity={g.equatorOpacity} vectorEffect="non-scaling-stroke" />

        {/* The land. One path, round caps — a stipple engraving of every coast on Earth. */}
        <path
          d={d}
          stroke={g.land}
          strokeWidth={g.landWidth}
          strokeLinecap="round"
          fill="none"
          opacity={g.landOpacity}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Lights: the reach, drawn where it happened and never pressed. Sized from the same
          curve the reach page uses, so the foot of a page and the page itself cannot tell
          two different stories about the same count. */}
      {lights.map((l) => {
        const { left, top } = projectPct(l.lat, l.lng);
        return (
          <span
            key={l.id}
            aria-hidden="true"
            className="record-reach-light absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${l.size}px`,
              height: `${l.size}px`,
              transform: `translate(-50%,-50%) translate(${l.dx || 0}px, ${l.dy || 0}px)`,
              background: g.light,
              boxShadow: `0 0 ${l.size * 2.4}px ${l.size * 0.8}px rgba(226, 96, 42, 0.85), 0 0 ${l.size * 5}px ${l.size * 1.6}px rgba(255, 212, 71, 0.28)`,
              animationDelay: l.delay,
            }}
          />
        );
      })}

      {marks.map((m) => {
        const { left, top } = projectPct(m.lat, m.lng);
        const t = MARKS[m.tone] || MARKS.solution;
        const on = selectedId != null && m.id === selectedId;
        const size = m.size ?? t.size;
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
                style={{ width: size + 14, height: size + 14, border: `2px solid ${t.fill}`, opacity: 0.9 }}
              />
            )}
            <span
              aria-hidden="true"
              className={t.shape}
              style={{
                width: size,
                height: size,
                background: t.fill,
                boxShadow: `0 0 0 1.5px ${g.ring}`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}