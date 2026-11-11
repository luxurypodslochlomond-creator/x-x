import React from 'react';

/* ── HIS HAND, NOT A FONT ──────────────────────────────────────────────────────
   The name at the top of this page is Andrew Shandy's own lettering — the same hand
   that drew the mark, drawing the name under it. That settles an argument this sheet
   has been having with itself: every other heading here is a typeface somebody chose,
   and the name of the place was one more of them. It is not a typeface now. It is the
   artwork, and the argument about which font is simply gone.

   Nothing is done to his drawing. No recolour, no trace, no redraw, no crop, no
   sharpening: his file is served exactly as he exported it, at its own proportions.

   ── WHY IT READ AS HARSH, AND WHAT IS DONE ABOUT IT ───────────────────────────

   Pure black on pure white is the hardest contrast a screen can show, and a scan hands
   that back as a flat rectangle of it. Two things caused the glare, and neither of them
   was his drawing:

   1. THE SCAN'S OWN PAPER. A scanner returns white as 240-odd and then JPEG mangles it,
      so the sheet he drew on was not the colour of the page it was laid on. Multiply
      alone dropped that grey rectangle onto the paper — a box with a hard edge, which is
      exactly what "white and black looking harsh" means. What a darkroom does to a scan
      is set the paper to paper: a small brightness lift with a touch of contrast, so the
      paper reaches true white and vanishes into the sheet, leaving only the ink. That is
      a levels pass, not a redraw — the strokes are the same strokes, in the same place,
      at the same weight.

   2. MAXIMUM CONTRAST IS NOT THE SAME AS PRESENCE. Painters almost never put a black
      figure on blank white; they lay a ground in first, and they let the ground come up
      through the darks. So the ink is held back a little instead of being a hole: at 0.86
      the cream underneath comes up through it, and a black that carries the colour of its
      sheet is ink, where a black at 100% is a void. The name stays the darkest thing on
      the page by a long way. It is no longer the loudest.

   And behind it, a warm light that is barely there and never still — the same rhythm the
   record already uses for the sun at its foot, at 13 seconds a breath. It is light, not
   an effect: it does nothing to the letters, it only means the black is sitting in a room
   with a window in it rather than on a white wall. Anyone who has asked their device for
   less movement gets it perfectly still, in CSS that is already in place.

   The words travel as the image's alt text, so the name is still there for a screen
   reader, for a search engine and for a slow connection that never gets the picture. */
export const STONEYMOLLAN_LOGOTYPE =
  'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/5035f475e_stoneymollan-logotype.jpeg';

export default function StoneymollanLogotype({ className = '' }) {
  return (
    <span className={`relative block ${className}`}>
      {/* The ground, laid in before the drawing: a warm pool of light under and around
          the ink, never a shape of its own. Outside the letters it is almost nothing —
          which is the point. */}
      <span aria-hidden className="pointer-events-none absolute -inset-x-8 -inset-y-5">
        <span
          className="stoneymollan-light absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 64% 60% at 50% 54%, rgba(255,206,158,0.30) 0%, rgba(226,96,42,0.07) 52%, rgba(226,96,42,0) 78%)',
          }}
        />
      </span>

      <img
        src={STONEYMOLLAN_LOGOTYPE}
        alt="Stoneymollan"
        width={1179}
        height={959}
        decoding="async"
        draggable={false}
        className="relative block w-full select-none"
        style={{
          /* Multiply drops the white he drew on into the paper, so what is left is ink. */
          mixBlendMode: 'multiply',
          /* Set the scan's paper back to paper, so no rectangle of grey sits on the sheet. */
          filter: 'brightness(1.07) contrast(1.04)',
          /* Hold the ink back a hair, so the cream comes up through it and it reads warm. */
          opacity: 0.86,
        }}
      />
    </span>
  );
}