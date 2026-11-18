import React, { useEffect, useMemo, useRef } from 'react';
import '@/components/climate/cartoons/comic-field.css';

// ── A SKY THAT IS DRAWN, NOT DOWNLOADED ────────────────────────────────────────
// Brian, 18 November: "make it more coolasfuck technology future … a proper new
// piece of coolasfuck art that moves … best comic background for future generations
// … but still pass the Stan Lee and the Filoni and the Lucas test."
//
// The test, said plainly: it has to tell a story in one look (Lee), hold a whole
// world in the frame (Lucas), and move with intent rather than decoration (Filoni).
// And it has to be printed like Miller's ink — hard blacks, one cold light, no grey
// mush. A photograph of the Earth fails all four: it is a picture OF something,
// not a drawing ABOUT something.
//
// So this is not an image file. It is the room's ground, drawn in the browser on
// every visit: two colour plates deliberately out of register the way a screen
// print goes wrong on purpose, ink meridians ruled by hand, a halftone screen over
// the whole sheet, aurora ribbons, a sunrise on the limb, the lights of the night
// side, crop marks and a colour bar in the corners. It costs no download, stores
// nothing, and sends nothing anywhere. That is the technology used for the right
// reason: the reader's own machine paints it, and the painting is the same for
// everybody, so nobody is being measured to receive it.

// Seeded, so the sky is the same sky every time the room opens. A field re-rolled
// on each render would flicker as a reader scrolled back up, and a sky that
// rearranges itself is a screen, not a sky.
function scatter(count, [x0, x1], [y0, y1], [r0, r1], start = 51) {
  let seed = start;
  const next = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  return Array.from({ length: count }, () => ({
    x: +(x0 + next() * (x1 - x0)).toFixed(1),
    y: +(y0 + next() * (y1 - y0)).toFixed(1),
    r: +(r0 + next() * (r1 - r0)).toFixed(2),
    slow: next() > 0.5,
  }));
}

export default function ComicField() {
  const field = useRef(null);
  const sky = useMemo(() => scatter(56, [0, 1200], [0, 420], [0.6, 2.1]), []);
  const lights = useMemo(() => scatter(34, [230, 760], [420, 600], [0.8, 1.7], 977), []);

  // Parallax, by a hair. Only on a device with a real pointer, never on a phone
  // (where it would cost a frame for nothing), and one movement per painted frame.
  useEffect(() => {
    const node = field.current;
    if (!node) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const move = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        node.style.setProperty('--field-x', ((event.clientX / window.innerWidth) - 0.5).toFixed(3));
        node.style.setProperty('--field-y', ((event.clientY / window.innerHeight) - 0.5).toFixed(3));
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="comic-field" ref={field} aria-hidden="true">
      <div className="comic-field__dots" />

      <svg className="comic-field__stars" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <g className="comic-field__twinkle comic-field__twinkle--slow" fill="#fff8e9">
          {sky.filter((star) => star.slow).map((star, i) => <circle key={`s${i}`} cx={star.x} cy={star.y} r={star.r} />)}
        </g>
        <g className="comic-field__twinkle comic-field__twinkle--fast" fill="#d6f7ff">
          {sky.filter((star) => !star.slow).map((star, i) => <circle key={`f${i}`} cx={star.x} cy={star.y} r={star.r} />)}
        </g>
      </svg>

      <svg className="comic-field__aurora" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cf-ribbon-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#39f5b0" stopOpacity="0" />
            <stop offset="32%" stopColor="#39f5b0" stopOpacity=".8" />
            <stop offset="68%" stopColor="#7ce8ff" stopOpacity=".5" />
            <stop offset="100%" stopColor="#7ce8ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cf-ribbon-rose" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff2d6f" stopOpacity="0" />
            <stop offset="40%" stopColor="#ff2d6f" stopOpacity=".45" />
            <stop offset="100%" stopColor="#ffd447" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cf-ribbon-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffd447" stopOpacity="0" />
            <stop offset="55%" stopColor="#ffd447" stopOpacity=".5" />
            <stop offset="100%" stopColor="#fff8e9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="comic-field__ribbon comic-field__ribbon--one">
          <path d="M-60 214 C 200 96 430 286 680 168 S 1090 52 1260 176" fill="none" stroke="url(#cf-ribbon-green)" strokeWidth="26" strokeLinecap="round" />
        </g>
        <g className="comic-field__ribbon comic-field__ribbon--two">
          <path d="M-60 292 C 240 186 470 366 720 236 S 1110 128 1260 250" fill="none" stroke="url(#cf-ribbon-rose)" strokeWidth="15" strokeLinecap="round" />
        </g>
        <g className="comic-field__ribbon comic-field__ribbon--three">
          <path d="M-60 150 C 260 66 520 208 780 108 S 1120 20 1260 118" fill="none" stroke="url(#cf-ribbon-gold)" strokeWidth="9" strokeLinecap="round" />
        </g>
      </svg>

      <svg className="comic-field__earth" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="cf-ocean" cx="38%" cy="8%" r="88%">
            <stop offset="0%" stopColor="#8bf2ff" />
            <stop offset="32%" stopColor="#1e9ec6" />
            <stop offset="66%" stopColor="#124a78" />
            <stop offset="100%" stopColor="#050d1a" />
          </radialGradient>
          <linearGradient id="cf-night" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#04060d" stopOpacity=".95" />
            <stop offset="56%" stopColor="#04060d" stopOpacity=".4" />
            <stop offset="100%" stopColor="#04060d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cf-sun" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffd447" stopOpacity="0" />
            <stop offset="55%" stopColor="#ffd447" stopOpacity=".8" />
            <stop offset="100%" stopColor="#fff8e9" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="cf-glow" cx="50%" cy="50%" r="50%">
            <stop offset="58%" stopColor="#2fd8ff" stopOpacity="0" />
            <stop offset="100%" stopColor="#2fd8ff" stopOpacity=".3" />
          </radialGradient>
        </defs>

        <circle cx="600" cy="780" r="620" fill="url(#cf-glow)" />
        <circle cx="600" cy="780" r="566" fill="url(#cf-ocean)" />

        {/* Two plates, deliberately out of register. */}
        <circle cx="591" cy="787" r="567" fill="none" stroke="#00e5ff" strokeOpacity=".28" strokeWidth="3" />
        <circle cx="609" cy="774" r="567" fill="none" stroke="#ff2d6f" strokeOpacity=".24" strokeWidth="3" />

        {/* Ink meridians, ruled rather than projected. */}
        <g fill="none" stroke="#03101c" strokeOpacity=".42" strokeWidth="2.5">
          <ellipse cx="600" cy="780" rx="336" ry="566" />
          <ellipse cx="600" cy="780" rx="142" ry="566" />
          <path d="M40 700 Q600 520 1160 700" />
          <path d="M118 596 Q600 434 1082 596" />
          <path d="M238 502 Q600 360 962 502" />
        </g>

        {/* Weather, drifting one way and back. */}
        <g className="comic-field__clouds" fill="#fff8e9" fillOpacity=".15">
          <ellipse cx="376" cy="472" rx="192" ry="34" transform="rotate(-8 376 472)" />
          <ellipse cx="706" cy="424" rx="152" ry="26" transform="rotate(6 706 424)" />
          <ellipse cx="906" cy="546" rx="222" ry="40" transform="rotate(-4 906 546)" />
          <ellipse cx="246" cy="626" rx="172" ry="30" transform="rotate(5 246 626)" />
        </g>

        <circle cx="600" cy="780" r="566" fill="url(#cf-night)" />

        {/* Sunrise on the limb — the one warm thing in the frame. */}
        <path d="M1016 660 A566 566 0 0 0 1002 318" fill="none" stroke="url(#cf-sun)" strokeWidth="9" strokeLinecap="round" />

        <g className="comic-field__lights" fill="#ffd447">
          {lights.map((light, i) => <circle key={`l${i}`} cx={light.x} cy={light.y} r={light.r} fillOpacity={light.slow ? 0.85 : 0.55} />)}
        </g>
      </svg>

      {/* The press, passing once every half minute. */}
      <div className="comic-field__press" />

      {/* A proof sheet's own marks, in the corners: crop marks and a colour bar. */}
      <div className="comic-field__proof">
        <span className="comic-field__crop comic-field__crop--tl" />
        <span className="comic-field__crop comic-field__crop--tr" />
        <span className="comic-field__crop comic-field__crop--bl" />
        <span className="comic-field__crop comic-field__crop--br" />
        <span className="comic-field__bar"><i /><i /><i /><i /></span>
      </div>
    </div>
  );
}