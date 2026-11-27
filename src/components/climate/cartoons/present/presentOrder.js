// ── THE ORDER THE HOUR RUNS IN ──────────────────────────────────────────────────
// The wall is hung to be read: an argument that opens on the crisis and closes on the
// tender one. The hour is not that. Janine's agenda runs Francis's own drawing first,
// then the artists he introduces, then CEEW's as Alina speaks.
//
// So the presenter's sheet is a second order over the same drawings — not a second wall,
// and never a change to the wall. A drawing added tomorrow appears here in its own group
// without anybody editing this file, which matters because the artists are still sending.

// ── HIS HAND, NOT HIS CURATING ──────────────────────────────────────────────────
// This read the credit as well as the name, which was fine until every drawing in the CAIB
// campaign started carrying "curated by Francis Umendu Odupute" in its credit line. From
// then on, Monthe's, Odiase's, Mushi's and Hanan's drawings all matched this test and were
// listed under "Francis, first — his own drawing" on the sheet he presents from: the exact
// misattribution the credit line was added to prevent, printed on the one page used live.
// A curator is not a hand. Only the artist name decides whose drawing it is.
const isFrancis = (c) => /odupute|francodus/i.test(c.artist_name || '');
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
  // ── THE GROUPS ARE ALWAYS THREE, EVEN WHEN ONE IS EMPTY ──────────────────────
  // This used to drop a group with nothing in it, which looked tidy and was the one thing
  // that could go wrong on the day: the artists' drawings are still arriving, so on Sunday
  // morning the middle group could simply not be there — and a sheet that silently loses a
  // group reads exactly like a sheet that never had one. The person presenting would have no
  // way of telling "Francis has not sent them yet" from "this page is broken".
  // So every group is printed, and an empty one says so in words.
  return [
    {
      key: 'own',
      label: 'Francis, first',
      note: 'His own drawing, before the artists he introduces.',
      cartoons: own,
      waiting: 'Nothing from Francis yet.',
    },
    {
      key: 'artists',
      label: 'The artists Francis introduces',
      note: 'Each drawing as its maker speaks. The artist stays on Zoom.',
      cartoons: artists,
      waiting: 'No drawings from Francis’s artists yet. Each one appears here, under its maker’s name, the moment it is published — nothing on this page has to be changed.',
    },
    {
      key: 'ceew',
      label: 'CEEW, as Alina speaks',
      note: 'Shown one at a time, in the order she names them.',
      cartoons: ceew,
      waiting: 'Nothing from CEEW yet.',
    },
  ];
}

export function flatPresent(sections = []) {
  return sections.flatMap((section) => section.cartoons);
}