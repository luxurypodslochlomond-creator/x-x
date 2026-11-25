// ── THE ORDER THE HOUR RUNS IN ──────────────────────────────────────────────────
// The wall is hung to be read: an argument that opens on the crisis and closes on the
// tender one. The hour is not that. Janine's agenda runs Francis's own drawing first,
// then the artists he introduces, then CEEW's as Alina speaks.
//
// So the presenter's sheet is a second order over the same drawings — not a second wall,
// and never a change to the wall. A drawing added tomorrow appears here in its own group
// without anybody editing this file, which matters because the artists are still sending.

const isFrancis = (c) => /odupute|francodus/i.test(`${c.artist_name || ''} ${c.credit || ''}`);
const isCeew = (c) => /what on earth|ceew|council on energy/i.test(`${c.artist_name || ''} ${c.origin || ''} ${c.credit || ''}`);

export function presentOrder(cartoons = []) {
  const own = [];
  const artists = [];
  const ceew = [];
  cartoons.forEach((cartoon) => {
    if (isFrancis(cartoon)) own.push(cartoon);
    else if (isCeew(cartoon)) ceew.push(cartoon);
    else artists.push(cartoon);
  });
  return [
    { key: 'own', label: 'Francis, first', note: 'His own drawing, before the artists he introduces.', cartoons: own },
    { key: 'artists', label: 'The artists Francis introduces', note: 'Each drawing as its maker speaks. The artist stays on Zoom.', cartoons: artists },
    { key: 'ceew', label: 'CEEW, as Alina speaks', note: 'Posted one at a time, in the order she names them.', cartoons: ceew },
  ].filter((section) => section.cartoons.length);
}

export function flatPresent(sections = []) {
  return sections.flatMap((section) => section.cartoons);
}