// Shared wording keeps the header, footer and page index in agreement.
export const PRIMARY_NAV = [
  { label: 'Record', to: '/TogetherChangeClimate', page: 'TogetherChangeClimate', what: 'Solutions, crises, actions and gatherings.' },
  { label: 'Wire', to: '/ClimateWire', page: 'ClimateWire', what: 'Dated, sourced accounts of what changed.' },
  { label: 'Map', to: '/ClimateMap', page: 'ClimateMap', what: 'Explore entries by place.' },
  { label: 'About', to: '/XEqualsX', page: 'XEqualsX', what: 'Why this record exists, with its promises and limits.' },
  { label: 'Search', to: '/ClimateSearch', page: 'ClimateSearch', what: 'Find a place, subject or source.' },
];

export const FOOTER_NAV = [
  { label: 'How we check entries', to: '/ClimateMethod', what: 'How entries are sourced, screened and checked.' },
  { label: 'Corrections', to: '/ClimateCorrections', what: 'Changes to the record, with dates and reasons.' },
  { label: 'All pages', to: '/ClimateGuide', what: 'Every public destination, followed by the guide.' },
];

const SUPPORTING_PAGES = [
  { label: 'Project brief', to: '/ClimateBrief', what: 'What is live, what is planned, and what is still missing.' },
  { label: 'Founder', to: '/ClimateFounder', what: 'Janine M. H. Selendy and the work behind the record.' },
  { label: 'How we check entries', to: '/ClimateMethod', what: 'How entries are sourced, screened and checked.' },
  { label: 'Entry fingerprints', to: '/ClimateSeals', what: 'Check an entry’s fingerprint, and understand what it proves.' },
  { label: 'Corrections', to: '/ClimateCorrections', what: 'Changes to the record, with dates and reasons.' },
  { label: 'Become a checker', to: '/ClimateFellows', what: 'What checking involves, and how to ask to take part.' },
  { label: 'Costs & responsibility', to: '/ClimateHandover', what: 'What it costs, who holds the keys, and what is still open.' },
  { label: 'Music', to: '/ClimateMusic', what: 'Music given to the record by its artists.' },
  { label: 'Studio', to: '/Studio', what: 'Create with ZAPP and the logo tool.' },
];

export const PAGE_INDEX = [
  ...PRIMARY_NAV,
  { label: 'Readership', to: '/ClimateImpact', what: 'Anonymous reading counts by country and region.' },
  ...SUPPORTING_PAGES,
  { label: 'Host the record', to: '/ClimateHost', what: 'What carrying the record involves.' },
  { label: 'Support the record', to: '/ClimateSupport', what: 'Support and its declaration in the open.' },
  { label: 'Open-source covenant', to: '/ExtractionProofCovenant', what: 'The terms under which the record is shared.' },
];

export default SUPPORTING_PAGES;