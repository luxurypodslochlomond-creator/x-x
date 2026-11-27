// ── A DRAWING'S NAME, SHORT ENOUGH TO SAY OUT LOUD ────────────────────────────
// Brian, 27 November: "you sure links for cartoons not too long and crazy... thinking
// of future and sending links". He is right. The sheet was addressed by the record's own
// id — /ClimateCartoons/Sheet/6afde227b4e9502ba607dff8 — which nobody can read out,
// type into a phone, or copy off a printout without making a mistake.
//
// So a drawing is also addressed by its own name: /w/rain-check. The id address keeps
// working, because it is already printed on cards and sits in bookmarks, and a link that
// stops working is a worse fault than a link with a long number in it.
//
// The name is taken from the drawing's own title, never invented. Where a drawing has no
// title it is named by its hand. Long titles are cut at a word, because a slug that runs
// off the end of a line is the same problem in a shorter coat.
const MAX = 34;

export function cartoonSlug(cartoon) {
  const words = String(cartoon?.title || cartoon?.artist_name || 'drawing')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  const kept = [];
  let length = 0;
  for (const word of words) {
    if (length + word.length + 1 > MAX) break;
    kept.push(word);
    length += word.length + 1;
  }
  return kept.join('-') || 'drawing';
}