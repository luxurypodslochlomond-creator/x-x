import React from 'react';

/**
 * THE WARMTH AT THE FOOT OF THE HILL.
 *
 * There is a real fire pit up here. This is the light off it rather than a picture of a
 * fire: a soft ember glow rising out of the bottom of a section, printed into the paper
 * instead of laid over it, so the paper stays paper and the words stay ink.
 *
 * Nothing moves and nothing loads. There is no film to decode, no animation to run and
 * nothing for a phone to keep painting while somebody scrolls — it is simply part of the
 * page, and you reach it by walking down towards the fire. That is the whole reason it is
 * done this way: a fire behind a page is a headache, a fire at the bottom of it is a place.
 *
 * `strength` scales the glow: 1 is the fire at the end of the page, lower is the same
 * warmth further up the hill.
 */
export default function EmberBed({ strength = 1, className = '' }) {
  const a = 0.34 * strength;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`}
      style={{
        height: '58%',
        backgroundImage: `radial-gradient(78% 100% at 50% 116%, rgba(226,96,42,${a}) 0%, rgba(226,96,42,${a * 0.42}) 44%, rgba(226,96,42,0) 78%)`,
        mixBlendMode: 'multiply',
      }}
    />
  );
}