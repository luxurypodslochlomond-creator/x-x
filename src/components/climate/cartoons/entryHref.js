// ── THE ADDRESS OF THE ENTRY A DRAWING ANSWERS ──────────────────────────────────
// A drawing can be tied to a crisis, a solution or an action — the three doors the record
// keeps — and each door lives at its own address. The kind is stored with the link, so the
// address is built from what the record actually holds rather than from a guess: a drawing
// tied to a solution opens the solution, not a crisis that happens to share its id.
//
// Older links were made before the kind was kept, and every one of them was a crisis, so
// that is the fallback. Nothing breaks; nothing has to be re-entered.
export default function entryHref(cartoon) {
  const id = cartoon?.crisis_id;
  if (!id) return null;
  const kind = ['solution', 'action'].includes(cartoon?.crisis_type) ? cartoon.crisis_type : 'climate_crisis';
  return `/ClimateDetail/${kind}/${id}`;
}