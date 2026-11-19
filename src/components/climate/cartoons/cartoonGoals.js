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
export const GOALS_SOURCE = {
  line: 'CartoonAFRICA International Biennial, initiated November 2012 by Francis Umendu Odupute; its SDG cartoon campaign was exhibited at the UN SDG Global Festival of Action, Bonn, 2–4 May 2019.',
  name: 'The Nigerian Observer · 24 April 2026',
  url: 'https://nigerianobservernews.com/2026/04/story-of-the-traveling-cartoonafrica-sdg-cartoon-campaigns-and-workshops/',
};

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
    'Ensure healthy lives and promote well-being for all at all ages.', 13,
    ["Heat's Got Nowhere to Hide!", 'Keeping It Cool!', 'The Way to Live Longer!']),
  goal(4, 'Quality Education',
    'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.', 10,
    ["The Game's Gone Green!"]),
  goal(5, 'Gender Equality',
    'Achieve gender equality and empower all women and girls.', 9, []),
  goal(6, 'Clean Water and Sanitation',
    'Ensure availability and sustainable management of water and sanitation for all.', 8, []),
  goal(7, 'Affordable and Clean Energy',
    'Ensure access to affordable, reliable, sustainable and modern energy for all.', 5,
    ['The Energy Relay', 'Love At First Light', 'Solar Thriller', 'The Cooler Influencer']),
  goal(8, 'Decent Work and Economic Growth',
    'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.', 12,
    ["The Game's Gone Green!"]),
  goal(9, 'Industry, Innovation and Infrastructure',
    'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.', 8,
    ['The Transformation Nobody Saw Coming']),
  goal(10, 'Reduced Inequalities',
    'Reduce inequality within and among countries.', 10, []),
  goal(11, 'Sustainable Cities and Communities',
    'Make cities and human settlements inclusive, safe, resilient and sustainable.', 10,
    ['Revolution EV-olution!', 'Rain Check!', 'A Tale of Two Cities', 'The Way to Live Longer!']),
  goal(12, 'Responsible Consumption and Production',
    'Ensure sustainable consumption and production patterns.', 11, []),
  goal(13, 'Climate Action',
    'Take urgent action to combat climate change and its impacts.', 5,
    ['Rain Check!', "Heat's Got Nowhere to Hide!", 'The Cooler Influencer', 'Keeping It Cool!']),
  goal(14, 'Life Below Water',
    'Conserve and sustainably use the oceans, seas and marine resources for sustainable development.', 10, []),
  goal(15, 'Life on Land',
    'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.', 12, []),
  goal(16, 'Peace, Justice and Strong Institutions',
    'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.', 12, []),
  goal(17, 'Partnerships for the Goals',
    'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.', 19, []),
];

// A drawing the record has read onto no goal at all. Printed rather than forced: an honest
// ledger admits what it could not place, and a room that puts every drawing somewhere is a
// room that has stopped reading them.
export const UNPLACED = ['Hidden in Plain Sight'];