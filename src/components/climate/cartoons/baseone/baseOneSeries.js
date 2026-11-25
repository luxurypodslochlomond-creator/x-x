// ── THE MACHINE'S HAND — FIRST SERIES, FOUR MARKS ────────────────────────────────
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

const DIR = 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c';

export const BASE_ONE_SERIES = [
  {
    id: 'still',
    numeral: 'I',
    image: `${DIR}/4e2f3c967a2ff497afeba845cb4c8115_generated_image.png`,
    alt: 'Ink drawing: a small figure sits upright and calm on a tall block of ice, the block melting into a black sea beneath it, one drip line joining ice to water.',
    answers: 'Sitting still while the ground goes',
    line: 'Sitting still is a decision, and somebody is making it for you.',
    to: '/TogetherChangeClimate',
    door: 'The crises on the record',
  },
  {
    id: 'ribs',
    numeral: 'II',
    image: `${DIR}/bc8c7beb664468662e5c857abe3316ea_generated_image.png`,
    alt: 'Ink drawing: the ribcage of a great whale on a shore, a tiny city of small houses built inside the ribs, and one small figure walking out between them toward the sea.',
    answers: 'What we build inside what we emptied',
    line: 'We built a city in the ribs of something we took out of the sea.',
    to: '/ClimateWire',
    door: 'The wire: what changed this week',
  },
  {
    id: 'thread',
    numeral: 'III',
    image: `${DIR}/8ffb9be6b75d01f35cef7346fd707806_generated_image.png`,
    alt: 'Ink drawing: two hands reach toward each other across a deep crack in the ground, a single thread already tied from one finger to the other.',
    answers: 'The one thing that crosses a crack',
    line: 'Somebody has to cross first, and it is never the comfortable one.',
    to: '/ClimateMap',
    door: 'The map: who is answering, and where',
  },
  {
    id: 'lung',
    numeral: 'IV',
    image: `${DIR}/f81dac7fba96e9f0d1775ccc37a0e0ca_generated_image.png`,
    alt: 'Ink drawing: one great tree whose canopy is drawn as a pair of human lungs made of leaves, a very small figure standing at its foot with one hand raised.',
    answers: 'The canopy is a lung, read as timber',
    line: 'You can read a lung as timber. The tree gets no say.',
    to: '/TogetherChangeClimate',
    door: 'The solutions on the record',
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
    image: `${DIR}/1ea690254d466d8b59178afe3395d727_generated_image.png`,
    alt: 'Ink drawing: a middle-aged man in a work shirt sits cross-legged on a tall block of melting ice, eating a sandwich and looking straight ahead, the meltwater running into a black sea around him.',
    answers: 'Business as usual, with lunch',
    line: 'He is not ignoring it. He has a meeting at two.',
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
];