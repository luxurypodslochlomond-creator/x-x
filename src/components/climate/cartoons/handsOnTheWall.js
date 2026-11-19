import { base44 } from '@/api/base44Client';

// ── EVERY HAND, READ OFF THE WALL ITSELF ─────────────────────────────────────────
// The roll of names is not a table of its own: it is the wall, counted. So it is read the
// same way a reader reads it — every published drawing, page after page — and then folded
// down to the names. That means a hand appears here the moment their first drawing goes up
// and disappears if their last one comes down, with nothing to keep in step and no second
// place for a name to be right in one and wrong in the other.
//
// The page cap is a guard, not a policy: a wall that grew past it would still show every
// name it read, and the room would be the thing to fix, not the roll.
const PAGE_SIZE = 50;
const PAGE_CAP = 12;

export default async function handsOnTheWall() {
  const drawings = [];
  let cursor = null;

  for (let page = 0; page < PAGE_CAP; page += 1) {
    const res = await base44.entities.ClimateCartoon.filter(
      { status: 'published' },
      { sort: '-created_date', limit: PAGE_SIZE, ...(cursor ? { cursor } : {}) },
    );
    drawings.push(...(res?.items || []));
    if (!res?.has_more || !res?.next_cursor) break;
    cursor = res.next_cursor;
  }

  const hands = new Map();
  drawings.forEach((drawing) => {
    const name = (drawing.artist_name || '').trim();
    if (!name) return;
    const hand = hands.get(name) || { name, drawings: 0, places: [], countries: [] };
    hand.drawings += 1;
    if (drawing.origin && !hand.places.includes(drawing.origin)) hand.places.push(drawing.origin);
    if (drawing.country && !hand.countries.includes(drawing.country)) hand.countries.push(drawing.country);
    hands.set(name, hand);
  });

  // A roll of names is alphabetical. Never by how many, because a count is not a rank, and
  // the hand with one drawing on this wall is the equal of the hand with twenty.
  return [...hands.values()].sort((a, b) => a.name.localeCompare(b.name));
}