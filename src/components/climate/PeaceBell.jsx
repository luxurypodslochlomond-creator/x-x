import React from 'react';

/* ── DR. JANE'S BELL — her mark, and hers alone ────────────────────────────────
   At the UN Peace Bell, and in her Peace Day messages, she rings a bell and names
   her commitment out loud, then asks everyone with her to make one too: "I'm
   going to ring this bell and as I ring this bell, I'm going to make a
   commitment. I hope all of you will make a commitment too."

   That is the most copyable act on this whole record — no money, no permission,
   no equipment. So it is drawn the way the record draws things: flat, solid,
   hard-edged, one colour, no shading, no clapper.

   THE RESTRAINT IS THE POINT. The beacon it stands in for is one small solid dot
   with two thin rings that only ever exist as movement — they appear, drift out,
   and vanish, and the thing you are left with is a dot. This does the same job
   with the same weight: one small solid bell, two thin rings leaving it, both
   gone by the end of the breath. No permanent furniture, nothing shouting.

   It sits in her plate and nowhere else. The beacon stays the record's own
   signature — every card, the map, the founder page — or it would stop meaning
   anything at all. */
export default function PeaceBell({ size = 40, color = '#7fc9e4', href }) {
  const mark = (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" style={{ overflow: 'visible', display: 'block' }}>
      <g transform="translate(0 2.5)">
        {/* The bell: one flat silhouette, the dot's weight — narrow top, small
            mouth, a kink for the rim. No dome, no highlight, no clapper. */}
        <g fill={color}>
          <rect x="13" y="4.6" width="2" height="5.4" />
          <path d="M12.2 10.5C12.2 8.9 15.8 8.9 15.8 10.5L18.2 16.4L18.2 17.4L9.8 17.4L9.8 16.4Z" />
        </g>
        {/* The ring, leaving it. Thin, fading to nothing — movement, not furniture.
            The outer one sets off after the inner, the way the beacon's does. */}
        <g stroke={color} strokeWidth="1.1" fill="none">
          <path d="M20.2 11.5A2.5 2.5 0 0 1 20.2 16.5">
            <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0;2.6 0" dur="2.4s" repeatCount="indefinite" />
          </path>
          <path d="M7.8 11.5A2.5 2.5 0 0 0 7.8 16.5">
            <animate attributeName="opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0;-2.6 0" dur="2.4s" repeatCount="indefinite" />
          </path>
          <path d="M20.2 9.5A4.5 4.5 0 0 1 20.2 18.5">
            <animate attributeName="opacity" values="0.45;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0;3.6 0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M7.8 9.5A4.5 4.5 0 0 0 7.8 18.5">
            <animate attributeName="opacity" values="0.45;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0;-3.6 0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
    </svg>
  );

  if (!href) return <div className="flex-shrink-0" style={{ width: size, height: size }}>{mark}</div>;

  // Tap it to hear her. No line of copy on the plate: her mark carries the way
  // through, the way every picture on this record carries its credit.
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Dr. Jane Goodall · UN International Day of Peace"
      aria-label="Dr. Jane Goodall's UN International Day of Peace message"
      className="flex-shrink-0 active:opacity-60 transition-opacity"
      style={{ width: size, height: size }}
    >
      {mark}
    </a>
  );
}