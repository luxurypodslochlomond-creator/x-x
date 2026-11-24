import React, { useState, useCallback } from 'react';
import { IMAGES, RECORD_COVER_MOBILE, RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';

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
//
// ── AND IT IS HANDED OVER WHOLE ─────────────────────────────────────────────────────────
// The master is 5456 × 3072. It was reduced once, in the browser, on the theory that the
// graphics card's squeeze was what made the sky look like static. It wasn't: reducing it made
// the whole plate soft, because a laptop screen at twice the pixel density wants nearly four
// thousand across, and a copy made at 2560 is a copy being stretched. The painting goes to the
// glass at its own size, unedited, and nothing is re-encoded on the way.
//
// That decision stands: a soft ground is a cheap-looking ground, and the master is bigger than
// the largest screen it will ever be shown on, so it is only ever downscaled. What was wrong
// was not the size of the file but its RANK. It used to be asked for eagerly, at high priority
// — so a thirty-megabyte painting queued ahead of the page's own scripts and fonts, and the
// record waited on a picture that nobody can even see until the words are there. The painting
// is the room, not the content: it is now requested at ordinary priority, it fades up only
// once it has actually arrived, and the reader gets warm paper and their page first, with the
// room filling in behind them a moment later. Same file, same sharpness, nothing blocking.
export default function RecordCover({ position = 'center 34%', strength = 1, blend, priority = false, className = '', style, image }) {
  const [ready, setReady] = useState(false);

  // A cached image can finish before React attaches onLoad, so the element is also asked
  // whether it is already complete. Without this the ground would stay invisible for the
  // reader who comes back — the one visitor a cache is meant to reward.
  const markReady = useCallback((node) => {
    if (node?.complete && node.naturalWidth > 0) setReady(true);
  }, []);

  return (
    <picture>
    <source media="(max-width: 639px)" srcSet={image || (className.includes('record-ground') ? RECORD_COVER_MOBILE : RECORD_COVER_SCREEN)} />
    <img
      ref={markReady}
      src={image || (className.includes('record-ground') ? RECORD_COVER_SCREEN : IMAGES.cover)}
      alt=""
      aria-hidden="true"
      loading={priority ? 'eager' : 'lazy'}
      // Ordinary priority, deliberately: the painting never outranks the page.
      fetchpriority={priority ? 'auto' : 'low'}
      decoding="async"
      onLoad={() => setReady(true)}
      data-ready={ready ? 'true' : 'false'}
      className={`record-cover absolute inset-0 w-full h-full object-cover pointer-events-none select-none ${className}`}
      style={{
        objectPosition: position,
        // The strength is handed to the stylesheet rather than set as an inline opacity, so
        // the record's own rules can still hold the ground back further on a wide screen —
        // which an inline value would have blocked. See .record-cover in record-reading.css.
        '--cover-strength': strength,
        mixBlendMode: blend,
        ...style,
      }}
    />
    </picture>
  );
}