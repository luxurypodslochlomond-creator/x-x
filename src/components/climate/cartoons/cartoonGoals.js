// ── THE WALL, READ AGAINST THE SEVENTEEN GOALS ────────────────────────────────
// Francis Umendu Odupute has been running SDG cartoon campaigns since he started the
// CartoonAFRICA International Biennial in November 2012, and the campaign travelled to the
// UN SDG Global Festival of Action in Bonn in May 2019. So this room does not introduce the
// goals to him. It does the one thing his campaign has never been able to do on paper: it
// takes the wall as it actually stands today and reads it against all seventeen, then
// prints the goals nobody has drawn yet.
//
// The reading below is the record's own editorial reading. It is not the artist's claim
// about their drawing, and it is not the United Nations' reading of anything: the record
// does not speak for the UN and the UN has not endorsed this room. A drawing is counted
// against a goal only where the drawing's own published line is about that subject — never
// because the record would like the wall to look complete.
//
// The titles are the drawings' real titles on the wall. Nothing is invented to fill a gap.
export const GOALS_SOURCE = {
  line: 'CartoonAFRICA International Biennial, initiated November 2012 by Francis Umendu Odupute; its SDG cartoon campaign was exhibited at the UN SDG Global Festival of Action, Bonn, 2–4 May 2019.',
  name: 'The Nigerian Observer · 24 April 2026',
  url: 'https://nigerianobservernews.com/2026/04/story-of-the-traveling-cartoonafrica-sdg-cartoon-campaigns-and-workshops/',
};

export const GOALS = [
  { n: 1, name: 'No Poverty', drawings: [] },
  { n: 2, name: 'Zero Hunger', drawings: [] },
  { n: 3, name: 'Good Health and Well-being', drawings: [
    'Heat’s Got Nowhere to Hide!', 'Keeping It Cool!', 'The Way to Live Longer!'] },
  { n: 4, name: 'Quality Education', drawings: ['The Game’s Gone Green!'] },
  { n: 5, name: 'Gender Equality', drawings: [] },
  { n: 6, name: 'Clean Water and Sanitation', drawings: [] },
  { n: 7, name: 'Affordable and Clean Energy', drawings: [
    'The Energy Relay', 'Love At First Light', 'Solar Thriller', 'The Cooler Influencer'] },
  { n: 8, name: 'Decent Work and Economic Growth', drawings: ['The Game’s Gone Green!'] },
  { n: 9, name: 'Industry, Innovation and Infrastructure', drawings: [
    'The Transformation Nobody Saw Coming'] },
  { n: 10, name: 'Reduced Inequalities', drawings: [] },
  { n: 11, name: 'Sustainable Cities and Communities', drawings: [
    'Revolution EV-olution!', 'Rain Check!', 'A Tale of Two Cities', 'The Way to Live Longer!'] },
  { n: 12, name: 'Responsible Consumption and Production', drawings: [] },
  { n: 13, name: 'Climate Action', drawings: [
    'Rain Check!', 'Heat’s Got Nowhere to Hide!', 'The Cooler Influencer', 'Keeping It Cool!'] },
  { n: 14, name: 'Life Below Water', drawings: [] },
  { n: 15, name: 'Life on Land', drawings: [] },
  { n: 16, name: 'Peace, Justice and Strong Institutions', drawings: [] },
  { n: 17, name: 'Partnerships for the Goals', drawings: [] },
];

// A drawing the record has read onto no goal at all. Printed rather than forced: an honest
// ledger admits what it could not place, and a room that puts every drawing somewhere is a
// room that has stopped reading them.
export const UNPLACED = ['Hidden in Plain Sight'];