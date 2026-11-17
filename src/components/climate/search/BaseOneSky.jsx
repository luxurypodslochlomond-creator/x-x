import React from 'react';
import '@/components/climate/search/base-one.css';

// ── THE SKY BETWEEN ASKING AND ANSWERING ───────────────────────────────────────
// Every other element in this room is a rule, a box or a line of type, and a page made
// only of those is a form. This is one hairline joining four points of four different
// sizes, and it goes nowhere — the way a constellation does, and the way Miró filled the
// space between two things that had no business being related.
//
// It is drawn from DOM, not from a stretched SVG, so the points stay round on a phone and
// on a wide screen alike. The twinkle is opacity and scale only, staggered so the four
// never blink together, and the whole thing stops for anyone who has asked for stillness.
const POINTS = [
  { left: '4%', top: '58%', size: 4, tone: 'rgb(20 18 16)', delay: '0s' },
  { left: '38%', top: '22%', size: 7, tone: '#b3261e', delay: '3.2s' },
  { left: '63%', top: '48%', size: 5, tone: 'rgb(20 18 16)', delay: '6.1s' },
  { left: '92%', top: '26%', size: 3, tone: '#0f5f7a', delay: '8.4s' },
];

export default function BaseOneSky() {
  return (
    <div aria-hidden="true" className="bo-sky my-1 select-none">
      <span className="bo-sky__hair left-[4%] top-[62%] w-[36%] -rotate-[9deg]" />
      <span className="bo-sky__hair left-[38%] top-[26%] w-[27%] rotate-[12deg]" />
      <span className="bo-sky__hair left-[63%] top-[52%] w-[30%] -rotate-[11deg]" />
      {POINTS.map((point) => (
        <span
          key={point.left}
          className="bo-dot"
          style={{
            left: point.left,
            top: point.top,
            width: point.size,
            height: point.size,
            backgroundColor: point.tone,
            animationDelay: point.delay,
          }}
        />
      ))}
    </div>
  );
}