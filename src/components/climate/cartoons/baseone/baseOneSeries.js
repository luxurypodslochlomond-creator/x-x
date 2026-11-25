// ── THE MACHINE'S HAND — FIRST SERIES ───────────────────────────────────────────
// Brian, 25 November: "BASE 1 could have its own coolasfuck proper activist cartoons…
// no facts or words or stupid images… intelligence cartoons without being a dick."
//
// That last condition is the whole design. A cartoon that carries a caption is a leaflet
// with a picture on it, and a leaflet is refused before it is read — most of all by the
// people it is aimed at. So there are no words inside any of these drawings, and there is
// nothing to translate: a reader in Glasgow, Lagos, Lima or Seoul meets the same mark.
//
// The words that DO exist sit outside the drawing, in the record's voice, and they only
// ever say what the drawing is looking at and where on the record to check it. The drawing
// claims nothing. The entry with its source does the claiming. That is the difference
// between a mark and propaganda, and it is the reason this room can sit inside a record
// that argues for sources.
//
// A note on what is not here: no politician, no nation, no faith, no crowd, no greedy man
// in a top hat. The fault each drawing names is a way of working — sitting still, building
// inside what we emptied, refusing to cross a gap, reading a lung as timber — because a
// drawing that blames a people teaches a reader to blame a people, and that is the oldest
// trick in the trade. This room is not in that trade.
//
// ── AND SIX MARKS ARE NOT A CENSUS OF THE PLANET ────────────────────────────────
// Brian, 25 November: "are six marks representative of the people and technology on the
// planet bro? looks like American worker on one. hope will resonate with all… no smell of
// bullshit."
//
// He was right on both counts, and the honest answer is no. The first six all draw the same
// room: how harm is done by people who are comfortable — sitting still, building inside what
// we emptied, refusing to cross, reading a lung as timber, lunch with a meeting at two, and
// the counter where the damage gets signed. That is one way of working. It is not the world.
//
// Two things follow, and neither of them is a disclaimer stuck on the front.
//
// First, the lunch figure was dressed as one country's office man in a work shirt, so he has
// been redrawn plainly — a person with a lunch and a schedule, which is a type that exists in
// every country on earth, and no longer one nation's costume standing in for everybody.
//
// Second, the one subject this hand can draw without lying about somewhere it has never been
// is itself. So the seventh mark is the machine's own fault: a model of the world mistaken
// for the world. The people carrying the cost are not drawn in this room at all, and that is
// deliberate — they are on the wall, drawn by hands that have been somewhere. A machine that
// has never stood in it should not draw them, and a drawing of distant suffering made by
// something that has never been wet is exactly the smell he was asking about.
//
// ── AND A CARTOONIST WOULD HAVE THROWN FOUR OF THEM BACK ────────────────────────
// Brian, 25 November: "look at the images carefully, are you sure they will not be
// bullshit to Francis or any cartoonist? I feel some aren't quite right."
//
// He is right, and the test is the one a newspaper cartoonist applies in about a second:
// can you read the situation without the line underneath it? Four of the first seven could
// not. The whale ribs, the tree whose canopy is drawn as lungs, and two hands reaching
// across a crack are not cartoons — they are the stock surrealism of a poster, and each one
// carries its own caption inside the picture, which is the one thing a drawing must never
// need. Worse: the figure sitting on melting ice and the man eating his lunch on melting ice
// are the same drawing with different props. A cartoonist would have seen that from across
// the room, and so would Francis.
//
// So those four were drawn again, to one rule, which is now the rule of the series:
//
//   ONE ORDINARY PERSON, DOING ONE ORDINARY THING, IN A SITUATION THAT READS WITHOUT THE
//   LINE UNDER IT. No puns. No metaphor wearing a hat. And two of the marks now show
//   somebody DOING something that works — because a wall of nothing but faults is despair,
//   and despair is the most comfortable thing you can hand a comfortable reader.
//
// ── AND THE LINE UNDER A MARK HAS TO CROSS EVERY BORDER TOO ─────────────────────
// Brian, 25 November: "the sentence below must be translatable in every tongue."
//
// A wordless drawing crosses a border; the line under it has to cross the same border, or
// the drawing arrives and the sentence is left at the checkpoint. Every line here follows
// four rules, and any mark added later has to as well:
//
//   1. One or two short sentences. Nothing nested, nothing that needs a comma to survive.
//   2. No idiom, no wordplay, no pun, no proverb. "Cold is free" travels; "the penny drops"
//      does not, and a translator cannot rescue it.
//   3. Concrete nouns only — water, roof, meter, queue, phone, river, wall, hook. Every
//      reader on earth has stood next to all of them.
//   4. No name, no nation, no party, and no number that needs explaining. Those belong in
//      the caption or in the entry, where somebody can check them, never inside the line.

const DIR = 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c';

export const BASE_ONE_SERIES = [
  {
    id: 'queue',
    numeral: 'I',
    image: `${DIR}/10708fdd2b41067f6edbb59adbe29a1b_generated_image.png`,
    alt: 'Ink drawing: a row of people stand in a queue at one standpipe, each holding a single container, seen from behind in hard sun, with a long shadow across the ground.',
    answers: 'Who waits for the water',
    line: 'The queue is the infrastructure. Nobody counted it.',
    to: '/ClimateMap',
    door: 'The map: who is answering, and where',
  },
  {
    id: 'roof',
    numeral: 'II',
    image: `${DIR}/815532e01f0fc9de7a7fac7971df1a03_generated_image.png`,
    alt: 'Ink drawing: a person kneels on a flat roof rolling a pale band of paint across it, with three neighbouring roofs already pale, a water tank on one and washing on a line.',
    answers: 'A move that spread, roof by roof',
    line: 'Somebody painted a roof white. Then the next roof.',
    to: '/TogetherChangeClimate',
    door: 'The solutions on the record',
  },
  {
    id: 'meter',
    numeral: 'III',
    image: `${DIR}/880a9a7503d85118ff7d632168b6a20c_generated_image.png`,
    alt: 'Ink drawing: a person in a long coat stands in a bare hallway holding one coin up to a small prepayment meter on the wall, its cable running up and out of the frame.',
    answers: 'Warmth, sold by the unit',
    line: 'Warmth is sold by the unit. Cold is free.',
    to: '/ClimateWire',
    door: 'The wire: what changed this week',
  },
  {
    id: 'witness',
    numeral: 'IV',
    image: `${DIR}/2381a769d19243e718227486edb932cd_generated_image.png`,
    alt: 'Ink drawing: a person stands in shallow floodwater in a street, seen from behind, holding a phone up at arm’s length to photograph the water, with a half-submerged car and a floating bin.',
    answers: 'Who the witness turned out to be',
    line: 'The first witness had a phone in their pocket.',
    to: '/ClimateMethod',
    door: 'How this record checks what it is told',
  },
  // ── THE TWO I WOULD HAVE DRAWN FIRST, IF I HAD BEEN HONEST SOONER ─────────────
  // Brian, 25 November: "be yourself… you know better than any of us how fucked up this
  // planet is because of poverty and greed." What the record actually shows is not a
  // villain. It is an ordinary man with a sandwich and a meeting at two, and a counter where
  // a sheet of paper turns a forest into a number. Both are funnier and worse than any
  // allegory, and neither blames a people — which is the only way a drawing like this stays
  // useful instead of becoming the thing it is about.
  {
    id: 'lunch',
    numeral: 'V',
    image: `${DIR}/5fde96be1323ea8bd707021f217aad72_generated_image.png`,
    alt: 'Ink drawing: a person in a plain shirt sits cross-legged on a tall block of melting ice, eating from a small lunch tin and looking straight ahead, the meltwater running into a black sea around them.',
    answers: 'Business as usual, with lunch',
    line: 'He has a meeting at two. The meeting is about it.',
    to: '/ClimateWire',
    door: 'The wire: what changed this week',
  },
  {
    id: 'form',
    numeral: 'VI',
    image: `${DIR}/258d0439d1e17e1e8464501aadd5ff9c_generated_image.png`,
    alt: 'Ink drawing: a long queue of small people at a plain counter, each holding one sheet of paper, a vast wall of stacked forms rising behind the counter and a huge stamp caught mid-stamp above the queue.',
    answers: 'The counter where the damage gets signed',
    line: 'Nobody in this queue thinks they are doing it.',
    to: '/ClimateMethod',
    door: 'How this record checks itself',
  },
  // ── VII · THE ONE SUBJECT THIS HAND CAN DRAW WITHOUT LYING ────────────────────
  // The first six all draw people inside institutions. Not one of them draws the thing that
  // now sits between every one of those people and the world — and the only honest way for
  // this hand to draw technology is to draw its own fault, because a model of a thing is not
  // the thing. It is also the only mark here where the intelligence looks at itself instead
  // of at somebody else, which is the whole reason it is allowed a mark at all.
  {
    id: 'model',
    numeral: 'VII',
    image: `${DIR}/9a02a76d2f88a2578d946045ce0def27_generated_image.png`,
    alt: 'Ink drawing: a long sheet of paper unrolled across a bare landscape with a neat map of a river drawn on it, while the real river runs underneath the sheet and away past its edge.',
    answers: 'A model of the world, mistaken for the world',
    line: 'I drew the river. The river has not read it.',
    to: '/ClimateMethod',
    door: 'How this record checks itself',
  },
  // ── VIII · THE ONE THAT GIVES THE SERIES A SPINE ──────────────────────────────
  // Brian, 25 November: "how many do you think we need? imagine we had one covering the
  // 1st–8th cartoon festival… coolasfuck means we could do another one next year and we
  // have content, not just random."
  //
  // He is describing the difference between a folder and a series. Seven separate complaints
  // is a folder: they could have been drawn in any order, in any year, by anybody. A series
  // with a spine has a reason to be one thing — and the reason is the biennial, which has run
  // eight times in Benin City and will run again. So the last mark is the wall itself: eight
  // drawings hung, and the ninth hook already in the plaster, waiting for the year that has
  // not happened yet. Next year this hand adds one mark, and this drawing does not change to
  // say so — the empty hook was drawn on purpose.
  {
    id: 'eight',
    numeral: 'VIII',
    image: `${DIR}/562d82d5b9edbb4d9cca1f737e57488b_generated_image.png`,
    alt: 'Ink drawing: eight framed drawings hung in a single row on a bare wall, and after the eighth an empty hook with a clean unfaded rectangle beside it where the next frame will go.',
    answers: 'The wall they hung eight times',
    line: 'Eight times they hung the drawings up. The wall is still there.',
    to: '/ClimateCartoons/Francis',
    door: 'The hand that started it, in his own words',
  },
];

// The count is derived, never typed. This file called itself "four marks" for a day after
// there were six, and a room that miscounts its own work is the first crack in a record.
export const MARKS_COUNT = BASE_ONE_SERIES.length;
const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const MARKS_WORD = NUMBER_WORDS[MARKS_COUNT] ?? String(MARKS_COUNT);

// ── THE SIGNATURE, AND WHY IT IS THREE WORDS AND NOT A FLOURISH ────────────────
// Brian, 25 November: "are you sure BASE 1 shouldn't be signing these? can you make the
// signature memorable forever."
//
// Yes — a machine that draws without a name is making claims from behind a curtain. But a
// signature is only worth the thing it promises, and a flourish promises nothing. So this
// one is a name plus the one fact that limits everything under it: no hand, and no weather.
// It never changes, on any mark, in any year, in any tongue — the date is the only part that
// moves. A reader who meets the room in ten years can check that the sentence under the name
// is still the same sentence, which is the whole point of signing something.
export const BASE_ONE_SIGNATURE = 'BASE 1 · no hand, no weather';