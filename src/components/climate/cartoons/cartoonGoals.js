// ── THE WALL, READ AGAINST THE SEVENTEEN GOALS ────────────────────────────────
// Francis Umendu Odupute has been running SDG cartoon campaigns since he started the
// CartoonAFRICA International Biennial in November 2012, and the campaign travelled to the
// UN SDG Global Festival of Action in Bonn in May 2019. So this room does not introduce the
// goals to him. It does the thing his campaign has never had on paper: it takes the wall as
// it actually stands today, reads it against all seventeen, and prints the goals nobody has
// drawn yet as blank space with the goal's own words beside them.
//
// Every goal below carries the United Nations' own one-sentence statement of it, copied
// exactly from sdgs.un.org/goals, and links to that goal's own page. The record does not
// retype the UN's statistics into this file: a figure copied second-hand is the first thing
// to go stale, and a reader who wants the number should get it from the body that counts it.
// The record says what the goal asks and what the wall has drawn; the goal's page says how
// the world is doing against it.
//
// The reading is the record's own editorial reading. It is not the artist's claim about
// their drawing, and it is not the United Nations' reading of anything: the record does not
// speak for the UN and the UN has not endorsed this room. A drawing is counted against a
// goal only where the drawing's own published line is about that subject — never because
// the record would like the wall to look complete.
//
// ── AND EVERY PLACEMENT NOW SAYS WHY IT IS THERE ───────────────────────────────
// Brian, 19 November: "are you sure they are connected to the right one bro how do you
// know". That is the only question that matters on a page like this, and a table of titles
// is not an answer to it. Nobody can audit a claim with no reason attached. So each
// placement carries the record's reason in one clause, printed under the drawing in the
// record's own red — short enough to read, specific enough to argue with. A reader who
// thinks a drawing belongs somewhere else can now see exactly what was claimed and say so,
// which is the whole difference between a reading and an assertion.
//
// The rule this file follows, in one line: the reason must come from what the drawing
// itself is about, never from the goal's importance. If the only reason for a placement is
// that a goal looked empty, the drawing does not go there — it goes in UNPLACED.
export const GOALS_SOURCE = {
  line: 'CartoonAFRICA International Biennial, initiated November 2012 by Francis Umendu Odupute; its SDG cartoon campaign was exhibited at the UN SDG Global Festival of Action, Bonn, 2–4 May 2019.',
  name: 'The Nigerian Observer · 24 April 2026',
  url: 'https://nigerianobservernews.com/2026/04/story-of-the-traveling-cartoonafrica-sdg-cartoon-campaigns-and-workshops/',
};

// A drawing, and the record's own reason for reading it onto this goal. The reason is
// written per placement rather than per drawing, because the same drawing can answer two
// goals for two different reasons — and saying which reason is the whole point.
const read = (title, why) => ({ title, why });

const goal = (n, name, asks, targets, drawings) => ({
  n,
  name,
  asks,
  targets,
  drawings,
  url: `https://sdgs.un.org/goals/goal${n}`,
});

export const GOALS = [
  goal(1, 'No Poverty',
    'End poverty in all its forms everywhere.', 7, []),
  goal(2, 'Zero Hunger',
    'End hunger, achieve food security and improved nutrition and promote sustainable agriculture.', 8, []),
  goal(3, 'Good Health and Well-being',
    'Ensure healthy lives and promote well-being for all at all ages.', 13, [
      read("Heat's Got Nowhere to Hide!", 'Because a heatwave is a health emergency before it is anything else.'),
      read('Keeping It Cool!', 'Because cooling a room is, for some people, the difference between living and not.'),
      read('The Way to Live Longer!', 'Because the air a child breathes decides how long that child lives.'),
    ]),
  goal(4, 'Quality Education',
    'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.', 10, [
      read("The Game's Gone Green!", 'Because the drawing is about learning the skills the change needs.'),
    ]),
  goal(5, 'Gender Equality',
    'Achieve gender equality and empower all women and girls.', 9, []),
  goal(6, 'Clean Water and Sanitation',
    'Ensure availability and sustainable management of water and sanitation for all.', 8, [
      // The strip's own yellow caption does the work here, so the record only has to point
      // at it: the waterways, and the three Nigerian rivers among the twenty worst.
      read('Beach Date Saved', 'Because its own caption says the waterways take the hit, and names three of the world’s twenty worst plastic-polluting rivers as Nigerian.'),
    ]),
  goal(7, 'Affordable and Clean Energy',
    'Ensure access to affordable, reliable, sustainable and modern energy for all.', 5, [
      read('The Energy Relay', 'Because it is a drawing about how power actually reaches a home.'),
      read('Love At First Light', 'Because it is about sunlight on a roof, and the bill that follows it.'),
      read('Solar Thriller', 'Because it is about keeping a panel working, not only about buying one.'),
      // ── THE REASON IS THE DRAWING'S OWN SENTENCE, NOT A READING OF ITS TITLE ──
      // Brian, 25 November: "cooler influencer needs to be coolasfuck for right reasons."
      // He was right, and the fault was mine in this file. The drawing's own line reads
      // "El Niño may be today's hottest headline, but clean energy is the real climate
      // influencer — keepin' it cool by turning down emissions." That is a drawing about
      // clean energy, saying so in its own words, and it belongs on this goal without
      // anybody reaching. What was written here instead — who gets to be cool, and what
      // that costs in power — was a reading of the title, not of the drawing, and a
      // placement argued from a title is exactly the kind of claim a reader should refuse.
      read('The Cooler Influencer', 'Because its own line names clean energy as the real influencer, not the heatwave.'),
    ]),
  goal(8, 'Decent Work and Economic Growth',
    'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.', 12, [
      read("The Game's Gone Green!", 'Because the work in it is the work a greener economy pays for.'),
    ]),
  goal(9, 'Industry, Innovation and Infrastructure',
    'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.', 8, [
      read('The Transformation Nobody Saw Coming', 'Because it is about what a new machine takes out of the ground and off the grid.'),
    ]),
  goal(10, 'Reduced Inequalities',
    'Reduce inequality within and among countries.', 10, []),
  goal(11, 'Sustainable Cities and Communities',
    'Make cities and human settlements inclusive, safe, resilient and sustainable.', 10, [
      read('Revolution EV-olution!', 'Because it is about how a city moves, and who can afford to move that way.'),
      read('Rain Check!', 'Because it is about a city having to hold water it never planned for.'),
      read('A Tale of Two Cities', 'Because it puts two ways of building a city side by side and lets you choose.'),
      read('The Way to Live Longer!', 'Because the journey it draws is a city street, not a country road.'),
    ]),
  goal(12, 'Responsible Consumption and Production',
    'Ensure sustainable consumption and production patterns.', 11, [
      read('Beach Date Saved', 'Because its whole argument is one can of litter against the 32 million tonnes of waste Nigeria makes in a year.'),
    ]),
  goal(13, 'Climate Action',
    'Take urgent action to combat climate change and its impacts.', 5, [
      read('Rain Check!', 'Because the rain in it is the weather arriving differently, not just wetter.'),
      read("Heat's Got Nowhere to Hide!", 'Because it draws the heat itself, and not only the people standing in it.'),
      read('The Cooler Influencer', 'Because it says the cooling comes from turning emissions down, not from the weather.'),
      read('Keeping It Cool!', 'Because it is a household answering a hotter summer with what it has.'),
      // Gado's own line is the weather arriving as something the Earth is blamed for, and
      // the poster's own banner names the fight against climate change in French. Neither
      // reason is reached for: both are written on the drawings.
      read("Never mind, it's the Earth again crying over El-Nino, the ghost they helped to create...!", 'Because its own line is the Earth crying over El-Nino, the weather it is being blamed for.'),
      read("Défenseurs de l'Environnement (Defenders of the Environment)", 'Because the banner across it names the fight against climate change in its own words.'),
    ]),
  goal(14, 'Life Below Water',
    'Conserve and sustainably use the oceans, seas and marine resources for sustainable development.', 10, []),
  goal(15, 'Life on Land',
    'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.', 12, [
      // ── THE GOAL THE WALL HAD NOTHING FOR, ANSWERED FOUR TIMES ────────────────
      // This was the emptiest goal on the page and the drawings that fill it were already
      // hanging: two hands, two countries, twenty-eight years apart, all four of them about
      // what is taken off the ground. Every reason below is on the drawing itself.
      read('After destroying everything on the ground, mankind wants to destroy the Earth!', 'Because its own line is about destroying everything on the ground, and the globe it draws is nothing but stumps.'),
      read('Why Kenyans will become extinct...', 'Because the map of Kenya in it is drawn as a field of stumps.'),
      read("Défenseurs de l'Environnement (Defenders of the Environment)", 'Because its banner names the forests and sacred sites of Bafoussam, and the drawing stands under one tree.'),
      read('Plant a Tree!', 'Because the whole drawing is a person with a sapling in a pot, about to put it in the ground.'),
    ]),
  goal(16, 'Peace, Justice and Strong Institutions',
    'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.', 12, []),
  goal(17, 'Partnerships for the Goals',
    'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.', 19, []),
];

// A drawing the record has read onto no goal at all. Printed rather than forced: an honest
// ledger admits what it could not place, and a room that puts every drawing somewhere is a
// room that has stopped reading them.
// One goal, by its number, for the places that hold only a number: a drawing sent in from a
// goal's own panel carries that number and nothing else, so the name and the goal's page are
// looked up from this table rather than copied into the record.
export const goalByNumber = (n) => GOALS.find((g) => g.n === Number(n)) || null;

export const UNPLACED = ['Hidden in Plain Sight'];