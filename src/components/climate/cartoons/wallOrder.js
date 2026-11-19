// ── THE ORDER THE DRAWINGS HANG IN ───────────────────────────────────────────────
// The wall was sorted by when a row was typed into a table, which is not an order: it
// meant the last drawing entered opened the room, and the room had no argument at all.
// A wall is hung, not dumped. This is the hanging order — read top to bottom it says
// what the room is for:
//
//   the crisis in one frame → the heat → the cooling → the culture that sells it →
//   the weather → the baton → the fix at scale → the shift nobody saw → what was
//   already here → the game → the joke → the payoff → and last the tender one,
//   because a room that ends on fear leaves the reader with nothing to do.
//
// It is a person's editorial choice, kept in one place so it can be argued with and
// changed without touching the wall. Drawings that are not named here keep their own
// arrival order behind the hung ones — a new hand is never buried, and never displaces
// the room's opening either.
export const WALL_ORDER = [
  'A Tale of Two Cities',
  "Heat's Got Nowhere to Hide!",
  'Keeping It Cool!',
  'The Cooler Influencer',
  'Rain Check!',
  'The Energy Relay',
  'Revolution EV-olution!',
  'The Transformation Nobody Saw Coming',
  'Hidden in Plain Sight',
  "The Game's Gone Green!",
  'Solar Thriller',
  'The Way to Live Longer!',
  'Love At First Light',
];

const key = (t) => String(t || '').trim().toLowerCase();

// Hung drawings first, in the order above; everything else after, in the order it came.
export function orderWall(cartoons) {
  const rank = new Map(WALL_ORDER.map((title, i) => [key(title), i]));
  return cartoons
    .map((cartoon, i) => ({ cartoon, i, rank: rank.has(key(cartoon.title)) ? rank.get(key(cartoon.title)) : WALL_ORDER.length }))
    .sort((a, b) => a.rank - b.rank || a.i - b.i)
    .map((entry) => entry.cartoon);
}