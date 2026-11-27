export const COVENANT = {
  kicker: 'A public climate record',
  title: 'A record of the time.',
  // Split so the last word can be printed in the record's yellow, the way the record's own
  // name carries one word in it. `title` stays whole for the card and the share.
  titleLead: 'A record of the',
  titleMark: 'time.',
  distinction: 'Not a feed. A record.',
  meaning: 'The evidence, the source and the work, in one place. Nothing for sale, nothing ranked to hold you, nothing hidden.',
  limit: 'No ads. No paid placement. No ranking for money. Sources stay named.',
  dedication: 'For the planet. For the people who come after us.',
};

export const COVENANT_ENTRY = { id: 'x-equals-x', title: `x=x — ${COVENANT.title}` };

export const COVENANT_SHARE =
  `x=x — ${COVENANT.title} Not a feed, a record. Climate evidence and the work being done about it, built around Janine Selendy’s work: crises, solutions and actions, with sources to follow, artists credited and corrections visible. No advertising, no paid placement, no ranking for money. Built by Brian Hughes with BASE 1 (AI). Automatic screening is not independent verification. Free to read, no account needed.`;

export const COVENANT_TERMS = [
  { number: '01', title: 'Keep the source.', plain: 'Name the work and link to where it came from.' },
  { number: '02', title: 'Show the correction.', plain: 'Say what changed and when. Leave uncertainty visible.' },
  { number: '03', title: 'Nothing is for sale.', plain: 'No advertising, no paid placement, no sponsored entry. Money does not buy a place at the front.' },
];