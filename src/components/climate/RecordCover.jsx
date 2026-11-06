import React from 'react';
import { IMAGES } from '@/components/climate/categoryImages';

// ── THE COVER, IN ONE PLACE ───────────────────────────────────────────────────────────────
// The record has one painting. It appears at the door at full strength, behind the first voice
// held back so the words win, along the spine of the masthead so every page opens in the same
// room, and as a strip of endpaper at the foot so every page closes in it too.
//
// That is four appearances of ONE work, which is what makes it a cover rather than decoration.
// The moment a second picture is added somewhere on this record it stops being a cover and
// becomes wallpaper, and wallpaper is exactly the thing an art critic is right to refuse.
//
// One component, one URL, one position to correct: when the painting is re-rendered, it is
// re-rendered everywhere at once. Nothing on the record holds its own copy of the address.
export default function RecordCover({ position = 'center 34%', strength = 1, blend, priority = false, className = '', style }) {
  return (
    <img
      src={IMAGES.cover}
      alt=""
      aria-hidden="true"
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none ${className}`}
      style={{ objectPosition: position, opacity: strength, mixBlendMode: blend, ...style }}
    />
  );
}