import React from 'react';
import '@/components/climate/cartoons/comic-field.css';

// Transparent digital light over the record's real painting. No replacement
// planet, opaque ground, pointer tracking, or scroll-dependent positioning.
export default function ComicField() {
  return (
    <div className="comic-field" aria-hidden="true">
      <svg className="comic-field__signal" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        <g className="comic-field__orbits">
          <path d="M-180 780 C120 260 1130 30 1770 310" />
          <path d="M-130 900 C270 390 1210 290 1720 540" />
        </g>
        <g className="comic-field__traces">
          <path d="M22 210 H74 L98 186 H188 M22 218 H66 M1410 710 H1490 L1522 742 H1580" />
          <path d="M38 760 V822 H114 L140 848 H220 M1390 136 H1490 L1520 166 H1580" />
        </g>
        <g className="comic-field__nodes">
          <circle cx="98" cy="186" r="3" /><circle cx="1522" cy="742" r="3" />
          <circle cx="140" cy="848" r="3" /><circle cx="1520" cy="166" r="3" />
        </g>
      </svg>
    </div>
  );
}