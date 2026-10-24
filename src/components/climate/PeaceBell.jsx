import React from 'react';

/* ── DR. JANE'S BELL — her mark, and hers alone ────────────────────────────────
   At the UN Peace Bell, and in her International Day of Peace message, she rings
   a bell and names her commitment out loud, then asks everyone with her to make
   one too: "I'm going to ring this bell and as I ring this bell, I'm going to
   make a commitment. I hope all of you will make a commitment too."

   That is the most copyable act on this entire record — no money, no permission,
   no equipment. So it is drawn the way this record draws things: flat, solid,
   hard-edged, one colour, no shading, no clapper. The ring travels outward, the
   same movement the beacon makes, so the mark reads as ringing rather than as a
   picture of a bell.

   It lives in her plate and nowhere else. The beacon stays the record's own
   signature — every card, the map, the founder page — or it would stop meaning
   anything at all. */
export default function PeaceBell({ size = 44, color = '#7fc9e4' }) {
  return (
    <div className="flex-shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <style>{`
        @keyframes peacebell-out { 0%, 100% { opacity: .28; transform: translateX(0); } 45% { opacity: 1; transform: translateX(6px); } }
        @keyframes peacebell-in  { 0%, 100% { opacity: .28; transform: translateX(0); } 45% { opacity: 1; transform: translateX(-6px); } }
      `}</style>
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" style={{ overflow: 'visible', display: 'block' }}>
        {/* The bell: one flat silhouette. Narrow top, wide mouth, a kink for the
            rim — no dome, no highlight, no clapper. */}
        <g fill={color}>
          <rect x="45.5" y="14" width="9" height="22" />
          <path d="M40 42C40 28 60 28 60 42L74 74L74 82L26 82L26 74Z" />
        </g>
        {/* The ring, leaving it. Static at .28 with the drift, so the mark still
            reads as a ringing bell when a phone has motion switched off. */}
        <g stroke={color} strokeWidth="5">
          <path d="M76 46A10 10 0 0 1 76 66" style={{ animation: 'peacebell-out 2.6s ease-out infinite' }} />
          <path d="M76 36A20 20 0 0 1 76 76" style={{ animation: 'peacebell-out 2.6s ease-out .4s infinite' }} />
          <path d="M24 46A10 10 0 0 0 24 66" style={{ animation: 'peacebell-in 2.6s ease-out infinite' }} />
          <path d="M24 36A20 20 0 0 0 24 76" style={{ animation: 'peacebell-in 2.6s ease-out .4s infinite' }} />
        </g>
      </svg>
    </div>
  );
}