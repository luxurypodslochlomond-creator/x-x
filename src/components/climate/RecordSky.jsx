import React from 'react';

// An illustrated sky, not astronomical observations. The dots are hand-placed;
// the two decorative streaks repeat on fixed 71- and 113-second CSS cycles.
// No random generator, meteor-shower calendar, location or live sky data is used.
// Transform/opacity only; reduced-motion readers get a still background.
export default function RecordSky() {
  return (
    <div aria-hidden="true" className="record-sky">
      <span className="record-sky-stars" />
      {/* Two decorative loops, not reports of real meteors. */}
      <span className="record-sky-streak" />
      <span className="record-sky-streak record-sky-streak-late" />
    </div>
  );
}