// Shared wording keeps the header, footer and page index in agreement.
//
// ── WHY THERE ARE SIX DOORS AND WHICH SIX ──────────────────────────────────────
// The bar is not a sitemap; it is the six questions a reader actually arrives with,
// in the order they arrive. What is on the record (Record). What changed (Wire).
// Where it is (Map). Who is reading it (Impact). Whose record it is (Founder).
// And the one that reaches everything else (Search).
//
// Impact has come back into the bar. It was living at the foot of the book under the
// word "Readership", which meant the one page that shows a funder or a sceptic that
// this record is actually being read was three scrolls and one guess away. A record
// that hides its own readership is asking to be taken on trust, and this record does
// not ask for that.
//
// The shed is not in this list on purpose, and not because it was forgotten: it is not
// public. It appears in the masthead's imprint line for the one reader holding a key,
// because for that reader it is part of how the record is kept.
export const PRIMARY_NAV = [
  { label: 'Record', to: '/TogetherChangeClimate', page: 'TogetherChangeClimate', what: 'Solutions, crises, actions and gatherings.' },
  { label: 'Wire', to: '/ClimateWire', page: 'ClimateWire', what: 'Dated, sourced accounts of what changed.' },
  { label: 'Map', to: '/ClimateMap', page: 'ClimateMap', what: 'Explore entries by place.' },
  { label: 'Impact', to: '/ClimateImpact', page: 'ClimateImpact', what: 'Who is reading the record, and from where.' },
  { label: 'Founder', to: '/ClimateFounder', page: 'ClimateFounder', what: 'Janine M. H. Selendy, and the record she asked for.' },
  { label: 'Search', to: '/ClimateSearch', page: 'ClimateSearch', what: 'Find a place, subject or source.' },
];

// The terms of the record, stated in the masthead and again at its foot — these four
// are not destinations competing with the bar, they are the record's own rulebook.
export const FOOTER_NAV = [
  { label: 'Why this record', to: '/XEqualsX', what: 'The covenant: equal human worth, drawn rather than argued.' },
  { label: 'How we check entries', to: '/ClimateMethod', what: 'How entries are sourced, screened and checked.' },
  { label: 'Corrections', to: '/ClimateCorrections', what: 'Changes to the record, with dates and reasons.' },
  { label: 'Contents', to: '/ClimateGuide', what: 'Open the drawn index of the record.' },
];

// ── THE REST OF THE BOOK ───────────────────────────────────────────────────────
// The foot of a printed record does a different job to its masthead: it is where the
// reader who has finished the page finds the things that are not on the way in. So the
// colophon carries exactly the doors the bar does not, and never a second copy of the
// bar — a foot that repeats the head teaches the reader that neither one matters.
export const ELSEWHERE_NAV = [
  { label: 'Music', to: '/ClimateMusic', what: 'Music given to the record by its artists.' },
  { label: 'Entry fingerprints', to: '/ClimateSeals', what: 'Check an entry’s fingerprint, and what it proves.' },
  { label: 'Become a checker', to: '/ClimateFellows', what: 'What checking involves, and how to ask to take part.' },
  { label: 'Host the record', to: '/ClimateHost', what: 'What carrying the record involves.' },
  { label: 'Support the record', to: '/ClimateSupport', what: 'Support and its declaration in the open.' },
];

export const SUPPORTING_PAGES = [
  { label: 'Project brief', to: '/ClimateBrief', what: 'What is live, what is planned, and what is still missing.' },
  { label: 'Costs & responsibility', to: '/ClimateHandover', what: 'What it costs, who holds the keys, and what is still open.' },
  { label: 'Studio', to: '/Studio', what: 'Create with ZAPP and the logo tool.' },
];

// The contents page: every public door once, in the order a reader meets it.
export const PAGE_INDEX = [
  ...PRIMARY_NAV,
  ...FOOTER_NAV,
  ...ELSEWHERE_NAV,
  ...SUPPORTING_PAGES,
  { label: 'Open-source covenant', to: '/ExtractionProofCovenant', what: 'The terms under which the record is shared.' },
];

// One drawn index for the contents sheet and its permanent page. Never link it to itself.
export const CONTENT_GROUPS = [
  { title: 'The record', doors: PRIMARY_NAV },
  { title: 'How it is kept', doors: [...FOOTER_NAV.filter(({ to }) => to !== '/ClimateGuide'), PAGE_INDEX.find(({ to }) => to === '/ExtractionProofCovenant')] },
  { title: 'Elsewhere', doors: ELSEWHERE_NAV },
  { title: 'Behind the record', doors: SUPPORTING_PAGES },
];

export default SUPPORTING_PAGES;