// ── ONE DRAWING, ONE VIEWER ────────────────────────────────────────────────────
// The wall and the seventeen-goal ledger are two rooms showing the same pictures, so a
// reader who finds a drawing in the ledger must land in the same full-size reading the
// wall gives — the same enlargement, the same caption, the same next-and-previous — and
// not in a second, quieter copy of the picture that behaves differently.
//
// The wall owns that viewer (it holds the page of drawings and knows their order), so the
// ledger asks it to open one by id rather than growing a viewer of its own. One event,
// one listener: nothing is stored, nothing is duplicated, and if the wall is not on the
// page nothing happens at all.
export const OPEN_DRAWING = 'cartoon:open-drawing';

export function openDrawing(id) {
  if (!id) return;
  window.dispatchEvent(new CustomEvent(OPEN_DRAWING, { detail: { id } }));
}