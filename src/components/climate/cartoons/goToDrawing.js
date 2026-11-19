// ── GO TO THE DRAWING, WHERE IT LIVES ─────────────────────────────────────────
// The goals index and the wall are two pages of one room showing the same pictures, so a
// reader who meets a drawing in the goals must land on that drawing itself — on the wall,
// in its own place, with its artist, its origin, the drawer's line and its credit around
// it — and not in a floating full-screen copy that has been lifted out of the record.
//
// Brian, 19 November: "shouldn't it take you through to the image bro not just full
// screen where is image on platform know what I mean bro" — exactly right. A picture torn
// out of its page is a lightbox; a picture in its page is the record.
//
// So the goals ask the wall to show one drawing by id. The wall owns the page and knows
// where each drawing stands, so nothing is duplicated and nothing is stored.
export const SHOW_DRAWING = 'cartoon:show-drawing';

export function goToDrawing(id) {
  if (!id) return;
  window.dispatchEvent(new CustomEvent(SHOW_DRAWING, { detail: { id } }));
}