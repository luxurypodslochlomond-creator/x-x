import { resolveCoords } from './countryCentroids';
import { nudge } from './worldPlate';

/* ── ONE COUNT, ONE CURVE, ONE ANSWER ──────────────────────────────────────────────
   The reach appeared twice on this record: as lights on the ink band at the foot of every
   page, and as dots on the paper plate of the reach page. Two files, two log curves, two
   different ideas of how big a thousand reads is — so the same count could be drawn at two
   different sizes a page apart, and a reader comparing them would have been right to
   distrust both.

   Brian, 18 November: one map. So the places are worked out once, here, and both plates are
   handed the same list: the same name for a place, the same curve, the same nudge for two
   marks that land on one country. Change the curve and both plates change together, which
   is the only way two pictures of one number can be honest.

   It says reads, never people. A read is one entry opened by nobody the record knows. */
export function placeName(code) {
  if (!code) return '';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

// A dot grows with the reads counted there, on a gentle log curve so a country with a
// thousand reads does not swallow one with two — and so the smallest place still has a
// dot a thumb could find.
export function readDot(views) {
  if (!views || views < 1) return 0;
  return Math.min(14, Math.max(5, 4 + Math.log2(views + 1) * 1.8));
}

// Every place the record has actually been read from, ready for either plate.
export function reachPlaces(data) {
  const rows = [
    ...(data?.countries || []).map((r) => ({ kind: 'country', name: placeName(r.country), place: r.country, views: r.views || 0 })),
    ...(data?.regions || []).map((r) => ({ kind: 'nation', name: r.region, place: r.region, views: r.views || 0 })),
  ];

  const seen = {};
  return rows
    .filter((r) => r.views > 0 && r.name)
    .map((r) => {
      const coord = resolveCoords(r.name, r.place);
      if (!coord) return null;
      const key = `${coord[0]},${coord[1]}`;
      const i = (seen[key] = (seen[key] ?? -1) + 1);
      const [dx, dy] = nudge(i);
      return {
        ...r,
        id: `${r.kind}-${r.name}`,
        lat: coord[0],
        lng: coord[1],
        dx,
        dy,
        size: readDot(r.views),
        // "Reads" was the newspaper's word for how many people read something, which this
        // count cannot honestly say. It counts openings, so it says openings.
        reads: `${r.views.toLocaleString()} ${r.views === 1 ? 'opening' : 'openings'}`,
      };
    })
    .filter(Boolean);
}