// Shared wording keeps the header, footer and page index in agreement.
//
// ── FIVE DOORS, BECAUSE A THUMB ONLY HAS SO MUCH ROOM ─────────────────────────
// There were six places here plus the tongue, seven targets on a rail 393 pixels wide.
// Seven into 393 is about 56 each before padding, and the captions underneath them were
// already touching: "Founder" under "Search", "Impact" under "Map". Nothing was wrong
// with any single door. There were simply more doors than the screen can hold.
//
// Five is not a taste. Every tab bar a person already knows — iOS, Android, every phone
// setting they have ever opened — stops at five, because below that the target drops
// under a fingertip and the label stops being readable at a glance. So the rail is five,
// and the five are the five a reader actually arrives with, in the order they ask them:
// what is on the record, what changed, where it is, what was given to it, and find me
// something. Search is a door rather than a box because on a record of hundreds of
// entries it is the fastest way in, and it is the last door on the right, under the thumb.
//
// What came off is not gone. Readership and the founder are pages a reader meets once
// they are already inside, not questions they arrive with, so both live in the foot and
// in the contents sheet. The tongue is still on the rail, behind a hairline at its end:
// it is a setting that changes the record's voice, not a sixth place to stand.
export const PRIMARY_NAV = [
  { label: 'Record', to: '/TogetherChangeClimate', page: 'TogetherChangeClimate', what: 'Solutions, crises, actions and gatherings.' },
  { label: 'Wire', to: '/ClimateWire', page: 'ClimateWire', what: 'Dated, sourced accounts of what changed.' },
  { label: 'Map', to: '/ClimateMap', page: 'ClimateMap', what: 'Explore entries by place.' },
  { label: 'Music', to: '/ClimateMusic', page: 'ClimateMusic', what: 'Music given to the record by its artists.' },
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
  { label: 'Entry fingerprints', to: '/ClimateSeals', what: 'Check an entry’s fingerprint, and what it proves.' },
  { label: 'Readership', to: '/ClimateImpact', what: 'Who is reading the record, and from where.' },
  { label: 'The founder', to: '/ClimateFounder', what: 'Janine M. H. Selendy, and the record she asked for.' },
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