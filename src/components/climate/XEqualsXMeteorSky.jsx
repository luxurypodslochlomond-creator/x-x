import React from 'react';
import '@/components/climate/x-equals-x-sky.css';

// ── THE SKY OVER THE MARK ───────────────────────────────────────────────────────
// The plate at the top of this page holds the painting behind the words, and the painting
// is a night sky — so the sky is finished rather than left as a still: stars placed by
// hand, and four streaks crossing it on fixed, unhurried cycles.
//
// Said plainly, because this record does not let a drawing pretend to be data: these are
// drawn meteors, not a report of a real shower. Nothing here reads a calendar, a location,
// the time of year or anything live. They are the same kind of thing as the stars on the
// cover — illustration, kept for the eye, and never presented as an observation.
//
// Cost is one composited layer: transform and opacity only, four elements, no repaint of
// the painting and no blend mode over the glass. Reduced-motion readers get the stars and
// a completely still sky.
export default function XEqualsXMeteorSky() {
  return (
    <div aria-hidden="true" className="xc-sky">
      <span className="xc-sky-stars" />
      <span className="xc-meteor xc-meteor-1" />
      <span className="xc-meteor xc-meteor-2" />
      <span className="xc-meteor xc-meteor-3" />
      <span className="xc-meteor xc-meteor-4" />
    </div>
  );
}