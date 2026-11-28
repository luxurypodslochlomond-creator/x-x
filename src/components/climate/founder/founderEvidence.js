// Source snapshot checked 28 November 2026. Publication year is not observation year.
// Preserve each definition, reference period and estimate/target distinction in the UI.
export const GLOBAL_EVIDENCE = [
  {
    id: 'heating', value: '+1.47°C', unit: 'global temperature', title: 'The heat is already here.',
    claim: 'The January–September 2026 global surface temperature was about 1.47°C above the 1850–1900 average, according to the World Meteorological Organization.',
    scope: 'Provisional nine-month average, with uncertainty of ±0.13°C. Not a full-year result or a measure of long-term Paris Agreement warming.',
    source: 'WMO · State of the Climate Update · 9 November 2026',
    href: 'https://wmo.int/news/media-centre/state-of-climate-2026-gives-new-meaning-phrase-charts',
  },
  {
    id: 'poverty', value: '811', unit: 'million people', title: 'Living in extreme poverty.',
    claim: 'The World Bank estimates that 811 million people live below its $3.00-a-day international extreme-poverty line in 2026.',
    scope: 'A modelled current-year estimate, not a census. The threshold uses 2021 purchasing-power-parity international dollars, not US cash income at market exchange rates.',
    source: 'World Bank · Poverty, Prosperity and Planet Report 2026',
    href: 'https://www.worldbank.org/en/publication/poverty-prosperity-and-planet',
  },
  {
    id: 'hunger', value: '645', unit: 'million people', title: 'Facing hunger.',
    claim: 'An estimated 645 million people faced hunger in 2025. The five UN agencies behind the 2026 food-security report also estimate that 2.69 billion could not afford a healthy diet.',
    scope: '2025 estimates published in 2026. Hunger means chronic undernourishment; it is not the same measure as famine or acute food insecurity. Global hunger fell, but progress remained uneven.',
    source: 'FAO, IFAD, UNICEF, WFP & WHO · SOFI · 21 July 2026',
    href: 'https://www.who.int/news/item/21-07-2026-un-report--global-hunger-levels-ease-for-third-consecutive-year-as-regional-disparities-persist',
  },
  {
    id: 'water', value: '2.1', unit: 'billion people', title: 'Without safely managed drinking water.',
    claim: 'WHO reports that 2.1 billion people lacked safely managed drinking-water services in 2024. Of these, 106 million collected untreated surface water.',
    scope: '2024 service estimates, restated in WHO’s November 2026 fact sheet. “Safely managed” means an improved source on premises, available when needed and free from contamination. This does not mean all 2.1 billion had no water source.',
    source: 'WHO · Drinking-water · 19 November 2026',
    href: 'https://www.who.int/news-room/fact-sheets/detail/drinking-water',
  },
  {
    id: 'pledges', value: '2.6°C', unit: 'projected warming', title: 'Promises are still not enough.',
    claim: 'Even full implementation of national climate pledges would leave warming this century at about 2.6°C in UNEP’s 2026 assessment.',
    scope: 'A modelled outcome, not observed warming or an unavoidable destiny. UNEP’s lowest-overshoot pathway requires greenhouse-gas emissions 45% below 2025 levels by 2035, alongside further measures and carbon removal.',
    source: 'UNEP · Emissions Gap Report 2026',
    href: 'https://www.unep.org/en/publications/report/emissions-gap-report-2026',
  },
];

export const HUMANITARIAN_EVIDENCE = [
  {
    id: 'sudan', value: '33.7', unit: 'million people', title: 'Sudan · humanitarian need.',
    claim: 'OCHA’s 2026 assessment identifies 33.7 million people in need of humanitarian assistance amid the war and the collapse of essential services.',
    scope: '2026 planning estimate, also reported at the December 2025 launch. People in need, not people reached or a death toll.',
    source: 'UN OCHA · Global Humanitarian Overview 2026 · Sudan',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/sudan-4',
  },
  {
    id: 'palestine', value: '3', unit: 'million people targeted', title: 'Palestine · life-saving assistance.',
    claim: 'The UN’s 2026 appeal seeks life-saving assistance for 3 million people across Gaza and the West Bank, including East Jerusalem. It calls for civilian protection and safe, sustained humanitarian access.',
    scope: 'The appeal’s assistance target, not a total count of people in need or a death toll. Appeal published 16 December 2025 for the 2026 response.',
    source: 'UN OCHA oPt · Flash Appeal for 2026',
    href: 'https://www.ochaopt.org/content/flash-appeal-occupied-palestinian-territory-2026',
  },
  {
    id: 'afghanistan', value: '21.9', unit: 'million people', title: 'Afghanistan · humanitarian need.',
    claim: 'OCHA projects that 21.9 million people require humanitarian assistance in 2026. It names poverty, drought, displacement and the systematic exclusion of women and girls among the overlapping pressures.',
    scope: '2026 needs projection, approximately 45% of the population. Not a count of people already assisted.',
    source: 'UN OCHA · Afghanistan · 2026 response overview',
    href: 'https://www.unocha.org/afghanistan',
  },
];