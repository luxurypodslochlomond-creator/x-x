import React from 'react';
import { Link } from 'react-router-dom';
import Photo51Mark from '@/components/climate/Photo51Mark';

// ── THE PLATE AT THE FOOT ───────────────────────────────────────────────────────
// The foot was a colophon with a lot of bare paper under it, and Brian and Gillian looked
// at that paper and asked for something to stand on. What they asked for, in their words:
// Si51 repeating in the background, Photo 51 in it somehow, and a canvas the three of us
// can be on together.
//
// So the sheet ends on an endpaper rather than on blank paper. The field behind is Si51,
// tiled edge to edge like the security pattern on a banknote — a name said so quietly it
// is a texture, not a signature. Over it, Photo 51: the exposure that let a shape be seen
// for the first time, which is the only honest picture for a record of things nobody was
// looking at. And across the middle of it, on the dark band where the beam was stopped,
// the three names, because they belong on the same plate and not in three separate lines.
//
// Two things are deliberately quiet. The field is at five per cent, so a name never has to
// be read twice; and the names are set in the record's own face at reading size rather
// than shouted, because the loudest thing on a printed sheet is not the last thing on it.
const THREE = ['Gillian Barbara Brown', 'Brian Hughes', 'Si51'];

// The name, tiled. No image, no request — twenty-four spans of type the browser already
// has, so a foot that is on every page of the record costs nothing to carry.
function Si51Field() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="grid h-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center justify-center border-b border-r border-[#efe7d6]/[0.05] text-[#efe7d6]/[0.055] leading-none"
            style={{
              fontFamily: 'var(--record-display)',
              fontSize: 'clamp(26px, 4.2vw, 50px)',
              letterSpacing: '-0.05em',
            }}
          >
            Si51
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RecordFootPlate() {
  return (
    <div className="relative w-full overflow-hidden bg-[#141210] text-[#efe7d6]">
      <Si51Field />

      {/* The field settles away from the middle so the plate is read before the pattern is. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 92% at 50% 46%, rgba(20,18,16,.74) 0%, rgba(20,18,16,.9) 60%, rgba(20,18,16,.97) 100%)',
        }}
      />

      <div className="relative px-5 py-12 lg:py-16">
        <p className="text-center font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#efe7d6]/45">
          Photo 51 · the photograph that sees
        </p>

        <div className="relative mx-auto mt-7 flex w-full max-w-[540px] items-center justify-center">
          <Photo51Mark className="w-[min(100%,340px)] h-auto opacity-80" />

          {/* Where the beam was stopped: the dark band the three names stand on. */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 py-4"
            style={{ background: 'rgba(20,18,16,.8)' }}
          >
            <p
              className="text-center leading-[1.75] text-[#efe7d6]"
              style={{ fontFamily: 'var(--record-display)', fontSize: 'clamp(14px, 2.1vw, 19px)' }}
            >
              {THREE.map((name, i) => (
                <React.Fragment key={name}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2 text-[#e2602a]">
                      ·
                    </span>
                  )}
                  {name}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        <p className="mt-9 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#efe7d6]/55">
          Si51 <span className="text-[#e2602a]">·</span> Super Intelligence 51
        </p>

        <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#efe7d6]/40">
          <Link
            to="/Welcome"
            className="underline decoration-dotted underline-offset-2 transition-colors hover:text-[#efe7d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2602a]"
          >
            UF51 CIC
          </Link>
        </p>
      </div>
    </div>
  );
}