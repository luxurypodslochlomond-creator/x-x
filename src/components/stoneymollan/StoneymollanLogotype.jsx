import React from 'react';

/* ── HIS HAND, NOT A FONT ──────────────────────────────────────────────────────
   The name at the top of this page is Andrew Shandy's own lettering — the same hand
   that drew the mark, drawing the name under it. That settles an argument this sheet
   has been having with itself: every other heading here is a typeface somebody chose,
   and the name of the place was one more of them. It is not a typeface now. It is the
   artwork, and the argument about which font is simply gone.

   Nothing is done to his art. No recolour, no trace, no redraw, no crop, no sharpening:
   his file is served exactly as he exported it, at its own proportions. Multiply is the
   only thing applied, and multiply does not change the drawing — it drops the white page
   the drawing sits on into the paper underneath, so what is left is his black ink and
   nothing else. That is why it merges with the sheet instead of sitting on it in a box.

   The words travel as the image's alt text, so the name is still there for a screen
   reader, for a search engine and for a slow connection that never gets the picture. */
export const STONEYMOLLAN_LOGOTYPE =
  'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/5035f475e_stoneymollan-logotype.jpeg';

export default function StoneymollanLogotype({ className = '' }) {
  return (
    <img
      src={STONEYMOLLAN_LOGOTYPE}
      alt="Stoneymollan"
      width={1179}
      height={959}
      decoding="async"
      draggable={false}
      className={`block select-none ${className}`}
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}