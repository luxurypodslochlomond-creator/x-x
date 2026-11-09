import React, { useEffect, useState } from 'react';
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
//
// ── WHY IT WAS COMING OUT PIXELATED, AND WHAT IS DONE ABOUT IT ──────────────────────────
// The master is 5456 × 3072 and weighs 29.6 MB — sixteen and a half million pixels, about
// 1.8 bytes for every one of them. A painting that smooth should compress to a third of that;
// the file is the size it is because the sky carries noise at the level of the single pixel.
//
// A screen never draws it that big. On a wide desktop the ground is squeezed to roughly a
// third of its width, and that squeeze is done by the graphics card in one coarse step, on a
// layer that is then blended at half strength. So the noise in the sky is neither resolved nor
// smoothed away: it lands on the glass as static. The entry photographs look fine beside it
// because they are already the size they are shown at, and because they have detail to hide
// in. The sky has none — which is exactly why the one place on this page that looks broken is
// the emptiest part of it.
//
// The answer is not a different painting and not a filter. The browser reduces it once,
// properly, at the size the record actually prints it, and uses that copy for the session.
// The master is untouched: same painting, same address, nothing re-rendered, nothing cropped,
// nothing sharpened. It is the same picture, at the size it is looked at.
const SCREEN_EDGE = 2560;

const reducedCopy = async () => {
  const response = await fetch(IMAGES.cover, { cache: 'force-cache' });
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob, { resizeWidth: SCREEN_EDGE, resizeQuality: 'high' });
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0);
  bitmap.close?.();
  const small = await new Promise((resolve, reject) => {
    canvas.toBlob((out) => (out ? resolve(out) : reject(new Error('no image'))), 'image/webp', 0.92);
  });
  return URL.createObjectURL(small);
};

export default function RecordCover({ position = 'center 34%', strength = 1, blend, priority = false, className = '', style }) {
  const [src, setSrc] = useState(IMAGES.cover);

  // Only where the ground is drawn large enough for the squeeze to show — a phone shows this
  // painting at a sixth of its width, where the noise has already merged into air, and it has
  // no memory to spare for a second copy of a sixteen-megapixel image.
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return undefined;
    let gone = false;
    let made = null;
    reducedCopy()
      .then((url) => {
        made = url;
        if (!gone) setSrc(url);
      })
      .catch(() => {
        // The master is still painted underneath. A ground is never worth a broken page.
      });
    return () => {
      gone = true;
      if (made) URL.revokeObjectURL(made);
    };
  }, []);

  return (
    <img
      src={src}
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