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
  // Francis's test drawing. It used to sit second, beside the room's opening, so it could
  // be found on a call instead of at the bottom behind thirteen drawings. Now that the wall
  // is hung by hand it opens his own block instead, which does the same job better: his
  // room begins with him. It is still a rehearsal, not a finished submission — take this
  // line out (and the drawing off the wall) once he sends the real one with his own line.
  'Urbanisation and Sanitation…',
  // ── FRANCIS'S CAMPAIGN, HANGING BEHIND HIS OWN DRAWING ───────────────────────
  // The CAIB SDG cartoon campaign is why this room exists, so the two drawings he gathered
  // for it from Paul Monthe hang immediately behind his own test drawing, in the order he
  // sent them: the Bafoussam poster first, then the one that asks the reader to plant.
  "Défenseurs de l'Environnement (Defenders of the Environment)",
  'Plant a Tree!',
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

  // ── THE NAIROBI BODY, IN THE CURATOR'S OWN ORDER ─────────────────────────────
  // Zahid Rajan sent these four on 27 November in this sequence, and the sequence is his,
  // not the record's: Maddo's aeroplane first, because it is the joke that opens a door,
  // and then Gado's three — the stumped globe, the stumped Kenya, and the Earth crying
  // over El Niño to aliens who have seen it all before. Read in that order they move from
  // laughter to the ground under the reader's own feet to the weather, which is the
  // argument the body is making.
  'Ladies and gentlemen, this is your Captain speaking, we are now flying straight into a break in the Ozone layer - I hope you remembered to carry along some radiation suits!',
  'After destroying everything on the ground, mankind wants to destroy the Earth!',
  'Why Kenyans will become extinct...',
  "Never mind, it's the Earth again crying over El-Nino, the ghost they helped to create...!",
];

const key = (t) => String(t || '').trim().toLowerCase();

// ── THE WALL IS HUNG BY HAND ─────────────────────────────────────────────────────
// Thirteen drawings from one body and one from another, interleaved, does not read as a
// room of hands: it reads as one person's show with a guest dropped in the middle. So a
// hand keeps its own body of work together, and every hand gets the same room — the same
// size, the same three lines, the same way in.
//
// Not a ranking. CEEW's block is first because theirs is the body that opened the room
// and the workshop is theirs; the next hand hangs beside them, not beneath them. Inside a
// hand the editorial order below still runs, and a hand nobody has named keeps the order
// it arrived in — so Francis's room grows as he sends, and a stranger's drawing is never
// buried behind a hundred others.
const HAND_CEEW = 0;
const HAND_FRANCIS = 1;
// The Nairobi body, gathered and sent by Zahid Rajan: Maddo and Gado, both of the Daily
// Nation, both looking at what was already being done to Kenya's ground in 1997 and 1998.
// Their own room, beside the other two, because a curator sending four drawings of his own
// country's record is not a scattering of strangers to be dropped at the bottom of the wall.
const HAND_AFRICA = 2;
const HAND_OTHER = 3;

const handOf = (cartoon) => {
  const said = `${cartoon.credit || ''} ${cartoon.artist_name || ''}`.toLowerCase();
  if (said.includes('council on energy') || said.includes('what on earth')) return HAND_CEEW;
  if (said.includes('francis') || said.includes('francodus')) return HAND_FRANCIS;
  if (said.includes('zahid') || said.includes('african press')) return HAND_AFRICA;
  return HAND_OTHER;
};

// Hand first, then the hanging order inside it, then the order it arrived.
export function orderWall(cartoons) {
  const rank = new Map(WALL_ORDER.map((title, i) => [key(title), i]));
  return cartoons
    .map((cartoon, i) => ({
      cartoon,
      i,
      hand: handOf(cartoon),
      rank: rank.has(key(cartoon.title)) ? rank.get(key(cartoon.title)) : WALL_ORDER.length,
    }))
    .sort((a, b) => a.hand - b.hand || a.rank - b.rank || a.i - b.i)
    .map((entry) => entry.cartoon);
}