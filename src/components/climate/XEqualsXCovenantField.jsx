import React, { useEffect, useRef, useState } from 'react';
import '@/components/climate/x-equals-x-field.css';

// ── ONE PLATE, RATHER THAN TWO FIGURES IN A COLUMN ────────────────────────────
// This page used to explain itself in two separate framed drawings — the mark, then
// the light — stacked one exactly like the other, each with a caption underneath
// telling the reader what they had just seen. Two identical frames in a row is a
// form, and a form is what makes a page read straight down like a report.
//
// The mark and the light are the same fact, so they are one drawing. Two people
// standing on one line at exactly the same height. Between them, the only claim this
// record makes, in its own red. And leaving that space, outward, both ways, the light —
// because the thing a mark like this is for is not the pair of people, it is what
// comes off them.
//
// The arcs sit under the ink and out to both edges and past them, which is why this
// plate runs wider than the column everything else is set in.
//
// It is drawn as the reader arrives. Not a flourish: a drawing that is already
// finished before you look is a picture of an idea, and this page is meant to be
// something happening.
const GROUND = 214;
const CENTRE = 300;
const CHEST = 138;

export default function XEqualsXCovenantField() {
  const plate = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = plate.current;
    if (!el) return;
    // No observer (or a browser that has none): show the finished drawing rather than
    // an empty plate. The animation is the pleasure, never the content.
    if (typeof IntersectionObserver === 'undefined') {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Light leaving the mark, both ways, widening as it travels.
  const arcs = [];
  [-1, 1].forEach((side) => {
    [58, 116, 186, 258].forEach((offset, index) => {
      const h = 9 + index * 9;
      const x = CENTRE + side * offset;
      arcs.push({ key: `${side}-${offset}`, d: `M ${x} ${CHEST - h} Q ${x - side * 22} ${CHEST} ${x} ${CHEST + h}`, delay: 620 + index * 150, opacity: 0.16 + index * 0.035 });
    });
  });

  return (
    <figure
      ref={plate}
      className={`xc-plate my-9 border-y border-record-ink/20 py-7 ${drawn ? 'is-drawn' : ''}`}
    >
      <svg
        viewBox="0 0 600 250"
        role="img"
        aria-label="Two hand-drawn upright strokes of exactly the same height, standing on one line, with the record's red equal sign between them at chest height and light leaving that space to both sides."
        className="h-auto w-full"
      >
        {/* the light, first, so it sits under the ink */}
        {arcs.map(({ key, d, delay, opacity }) => (
          <path
            key={key}
            d={d}
            fill="none"
            stroke="#141210"
            strokeWidth="1"
            strokeLinecap="round"
            opacity={opacity}
            pathLength="1"
            className="xc-line"
            style={{ transitionDelay: `${delay}ms` }}
          />
        ))}

        {/* the one earth they stand on */}
        <line
          x1="0"
          y1={GROUND}
          x2="600"
          y2={GROUND}
          stroke="#141210"
          strokeWidth="0.8"
          strokeDasharray="2 6"
          opacity="0.28"
          pathLength="1"
          className="xc-line"
          style={{ transitionDelay: '80ms' }}
        />

        {/* two, standing, neither taller */}
        <path
          d={`M196 74c-2.4 44-3.2 92-2.2 ${GROUND - 74}`}
          fill="none"
          stroke="#141210"
          strokeWidth="2.8"
          strokeLinecap="round"
          pathLength="1"
          className="xc-line"
          style={{ transitionDelay: '240ms' }}
        />
        <path
          d={`M404 74c2.2 43.6 3 91.6 2 ${GROUND - 74}`}
          fill="none"
          stroke="#141210"
          strokeWidth="2.8"
          strokeLinecap="round"
          pathLength="1"
          className="xc-line"
          style={{ transitionDelay: '400ms' }}
        />

        {/* the level they are held at — and the one place the page allows itself to be measured */}
        <line
          x1="184"
          y1="74"
          x2="416"
          y2="74"
          stroke="rgb(var(--record-mark))"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.6"
          pathLength="1"
          className="xc-line"
          style={{ transitionDelay: '520ms' }}
        />

        {/* the mark, in her red, and the only thing the record will ever claim */}
        <g stroke="rgb(var(--record-mark))" strokeWidth="5.5" strokeLinecap="round" className="xc-breath">
          <line x1="272" y1="122" x2="328" y2="122" pathLength="1" className="xc-line" style={{ transitionDelay: '900ms' }} />
          <line x1="272" y1="164" x2="328" y2="164" pathLength="1" className="xc-line" style={{ transitionDelay: '1010ms' }} />
        </g>
      </svg>

      <figcaption className="mt-6 text-center">
        <span className="block text-[16px] leading-[1.4] text-record-ink">
          Drawn by hand. No pass required.
        </span>
        <span className="mt-1 block font-mono text-[11.5px] uppercase tracking-[0.14em] text-record-muted">
          The only credential on this record
        </span>
      </figcaption>
    </figure>
  );
}