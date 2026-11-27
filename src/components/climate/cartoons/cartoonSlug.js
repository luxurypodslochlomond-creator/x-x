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
// title it is named by its hand. The cutting lives in recordSlug, because the wire's
// entries need exactly the same thing and one rule is easier to trust than two.
import { recordSlug } from '@/components/climate/recordSlug';

export function cartoonSlug(cartoon) {
  return recordSlug(cartoon?.title || cartoon?.artist_name || 'drawing', 34);
}