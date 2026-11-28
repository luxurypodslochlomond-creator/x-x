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

// Poverty and violence are not confined to the places a rich reader expects.
export const POVERTY_EVIDENCE = [
  {
    id: 'near-poor', value: '3.7', unit: 'billion people', title: 'Below $8.30 a day.',
    claim: 'Nearly half of humanity lives on less than $8.30 a day at 2021 purchasing power parity. The World Bank calls most of them one shock away from falling back.',
    source: 'World Bank · Poverty, Prosperity and Planet Report 2026',
    href: 'https://www.worldbank.org/en/publication/poverty-prosperity-and-planet',
  },
  {
    id: 'us-poverty', value: '35.9', unit: 'million people', title: 'In poverty in the United States.',
    claim: 'The US Census Bureau counted 35.9 million people below the official poverty line in 2024 — 10.6% of the country. The wealthiest large economy on earth has not ended it.',
    source: 'US Census Bureau · Income, Poverty and Health Insurance · 2024',
    href: 'https://www.census.gov/newsroom/press-releases/2025/income-poverty-health-insurance-coverage.html',
  },
  {
    id: 'us-food', value: '13.7%', unit: 'of US households', title: 'Food insecure in America.',
    claim: '13.7% of US households were food insecure in 2024, and 5.4% had very low food security — someone ate less because there was not enough money for food.',
    source: 'USDA Economic Research Service · Household Food Security in the US · 2024',
    href: 'https://ers.usda.gov/publications/pub-details?pubid=113622',
  },
  {
    id: 'school', value: '273', unit: 'million children', title: 'Out of school.',
    claim: 'UNESCO counts 273 million children and young people out of school as of 2024. In low-income countries that is 33% of school-age children, against 3% in high-income ones.',
    source: 'UNESCO · Out-of-school rates and population · 2024',
    href: 'https://www.unesco.org/en/education/view/outofschool',
  },
];

export const WOMEN_EVIDENCE = [
  {
    id: 'vaw', value: '840', unit: 'million women', title: 'Beaten or sexually violated, in their lifetime.',
    claim: 'WHO estimates nearly one in three women — 840 million — have been subjected to physical or sexual violence by a partner, or sexual violence by someone else. The figure has barely moved since 2000.',
    source: 'WHO · Violence against women estimates · 19 November 2025',
    href: 'https://www.who.int/news/item/19-11-2025-lifetime-toll--840-million-women-faced-partner-or-sexual-violence',
  },
  {
    id: 'femicide', value: '47,000', unit: 'women and girls', title: 'Killed by a partner or relative in 2025.',
    claim: '78,000 women and girls were killed intentionally in 2025. 47,000 of them — 60% — were killed by an intimate partner or family member: about 129 a day, or one every eleven minutes.',
    source: 'UNODC & UN Women · Femicides in 2025 · 24 November 2026',
    href: 'https://www.unodc.org/unodc/en/press/releases/2026/November/five-women-killed-every-hour-by-a-partner-or-close-relative-in-2025.html',
  },
  {
    id: 'maternal', value: '260,000', unit: 'women', title: 'Died in pregnancy or childbirth, 2023.',
    claim: 'An estimated 260,000 women died from maternal causes in 2023 — about one every two minutes. Around 160,000 of those deaths were in countries in conflict or institutional and social fragility.',
    source: 'WHO, UNICEF, UNFPA, World Bank & UNDESA · Trends in Maternal Mortality · 2025',
    href: 'https://www.who.int/news-room/fact-sheets/detail/maternal-mortality',
  },
];

// Two figures that are almost never printed next to each other.
export const MONEY_EVIDENCE = [
  {
    id: 'military', value: '$2,718bn', unit: 'military spending, 2024',
    title: 'Eighty-two times the entire humanitarian appeal.',
    claim: 'World military expenditure reached $2,718 billion in 2024, the highest total SIPRI has ever recorded and the steepest yearly rise since the end of the Cold War. The UN asked for $33 billion to assist 135 million people in 2026.',
    source: 'SIPRI · Trends in World Military Expenditure · 28 April 2025',
    href: 'https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-world-military-expenditure-2024',
  },
  {
    id: 'waste', value: '1.05bn', unit: 'tonnes of food wasted',
    title: 'A fifth of the food, thrown away.',
    claim: 'In 2022, 1.05 billion tonnes of food were wasted at retail, food service and household level — 19% of everything available to consumers, 132 kilograms per person — in the same year 783 million people faced hunger.',
    source: 'UNEP · Food Waste Index Report 2024',
    href: 'https://www.unep.org/en/news-and-stories/press-release/world-squanders-over-1-billion-meals-day-un-report',
  },
];

// The two largest countries, and the figures that belong to each. They were the obvious
// absence: a page about harm that leaves out 2.8 billion people is not a record, it is a
// selection. What is printed is what each country reports, not what is assumed about it —
// so China carries the emissions figure and the near-zeroes, both, and neither is hidden.
export const CHINA_INDIA_EVIDENCE = [
  {
    id: 'china', value: '30%', unit: 'of the world’s fossil CO₂, 2025',
    title: 'China · the largest emitter there is.',
    claim: 'China released roughly 30% of the world’s fossil CO₂ in 2025, more than the United States and the European Union combined, and kept approving new coal capacity while doing it. The same country reports almost none of the harm on this page: extreme poverty at the international line ended in 2021, and undernourishment sits below 2.5%. Both things are true at once, and a record that prints only one of them is a leaflet.',
    source: 'Global Carbon Budget 2025 · Global Carbon Project',
    href: 'https://globalcarbonbudget.org/',
  },
  {
    id: 'india', value: '2.1m', unit: 'deaths from air pollution, 2021',
    title: 'India · the harm inside the border.',
    claim: 'Air pollution was linked to about 2.1 million deaths in India in 2021, the largest toll of any country, and it comes from the same burning that heats the planet. India emits about a third of the world average per person — the country carrying the harm is not the country that caused most of it.',
    source: 'State of Global Air 2024 · Health Effects Institute',
    href: 'https://www.stateofglobalair.org/',
  },
];

// War is not weather. These are people in need of assistance, not death tolls,
// except where a toll is named as one.
export const HUMANITARIAN_EVIDENCE = [
  {
    id: 'global', value: '239', unit: 'million people in need', title: 'The whole list, before it is split by country.',
    claim: 'As 2026 begins, just over 239 million people are in urgent need of humanitarian assistance and protection, according to the UN’s global humanitarian overview. Its agencies aim to reach 135 million of them.',
    scope: 'People in need at the December 2025 launch of the 2026 plan. An assessed need, not a count of people reached, and not a death toll.',
    source: 'UN OCHA · Global Humanitarian Overview 2026',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/glance-17',
  },
  {
    id: 'civilians', value: '56,000+', unit: 'civilians killed', title: 'Killed in conflict in nine months.',
    claim: 'At least 56,000 civilians were killed in conflict between January and mid-October 2025. Three of every four civilian deaths in conflict worldwide happened in countries with a humanitarian plan or appeal.',
    scope: 'A verified minimum for a ten-month window, not a full-year total and not a count of all war deaths, which are usually higher than verified civilian records.',
    source: 'UN OCHA · Global Humanitarian Overview 2026 · Trends',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/trends-crises-and-needs-world-breaking-point',
  },
  {
    id: 'sudan', value: '33.7', unit: 'million people', title: 'Sudan · the largest caseload in the world.',
    claim: '33.7 million people need humanitarian assistance in Sudan. Twenty-nine million are acutely food insecure, and 23 areas are in famine or at risk of it. 9.6 million people remain displaced inside the country.',
    scope: '2026 planning estimate, also reported at the December 2025 launch. People in need, not people reached. Famine risk is an assessment, not a confirmed famine in every area named.',
    source: 'UN OCHA · Global Humanitarian Overview 2026 · Sudan',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/sudan-4',
  },
  {
    id: 'yemen', value: '23.1', unit: 'million people', title: 'Yemen · 65% of the population.',
    claim: '23.1 million people in Yemen need life-saving assistance and protection. More than 18 million face acute food insecurity, 2.5 million children under five are acutely malnourished, and 4.7 million people are displaced inside the country.',
    scope: '2026 planning figures, revised after new population baseline data. People in need, not people reached.',
    source: 'UN OCHA · Global Humanitarian Overview 2026 · Yemen',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/yemen-4',
  },
  {
    id: 'afghanistan', value: '21.9', unit: 'million people', title: 'Afghanistan · 45% of the population.',
    claim: '21.9 million people are projected to need humanitarian assistance in 2026. During the lean season, 17.4 million were projected to face crisis or worse food insecurity, and 3.7 million children under five acute malnutrition.',
    scope: '2026 needs projection and lean-season projection, approximately 45% of the population. Not a count of people already assisted.',
    source: 'UN OCHA · Afghanistan · 2026 response overview',
    href: 'https://www.unocha.org/afghanistan',
  },
  {
    id: 'syria', value: '16.5', unit: 'million people', title: 'Syria · about 70% of the population.',
    claim: '16.5 million people in Syria need humanitarian assistance. The country faces its worst drought-like conditions in 36 years, with FAO projecting a 70% wheat production deficit, while 1.2 million refugees and nearly 1.9 million displaced people have returned since December 2024.',
    scope: '2026 planning figures using 2025 data, pending Syria’s 2026 needs plan. The drought and crop projections are assessments, not observed harvest totals.',
    source: 'UN OCHA · Global Humanitarian Overview 2026 · Syrian Arab Republic',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/syrian-arab-republic-4',
  },
  {
    id: 'congo', value: '14.9', unit: 'million people', title: 'Democratic Republic of the Congo · conflict in the east.',
    claim: '14.9 million people were recorded in need in the DRC’s 2026 appeal, one of the largest in the world, driven by conflict and violence in the east. OCHA’s live country page has since revised the figure upward to 18.5 million.',
    scope: 'The 14.9 million is the December 2025 launch figure; the higher number is a later revision. People in need, not people reached. Both are planning assessments.',
    source: 'UN OCHA · Global Humanitarian Overview 2026 · DRC',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/democratic-republic-congo-4',
  },
  {
    id: 'ukraine', value: '10.8', unit: 'million people', title: 'Ukraine · a war that reaches past the front line.',
    claim: '10.8 million people in Ukraine need humanitarian assistance in 2026. Since February 2022, the UN has verified over 14,500 civilian deaths and nearly 38,500 injuries, with more than 4,300 schools damaged or destroyed and 3.8 million people displaced inside the country.',
    scope: '2026 planning figure; casualty figures are UN-verified minimums to the report’s cutoff, so the true toll is higher. Civilian casualty records count verified cases, not all deaths.',
    source: 'UN OCHA · Global Humanitarian Overview 2026 · Ukraine',
    href: 'https://humanitarianaction.info/document/global-humanitarian-overview-2026/article/ukraine-4',
  },
  {
    id: 'palestine', value: '3', unit: 'million people targeted', title: 'Palestine · life-saving assistance.',
    claim: 'The UN’s 2026 appeal seeks life-saving assistance for 3 million people across Gaza and the West Bank, including East Jerusalem. OCHA reported 69,785 people killed in Gaza according to Ministry of Health figures, while a peer-reviewed study estimated the violent death toll at more than 100,000.',
    scope: 'The 3 million is the appeal’s assistance target, not a total count of people in need. The 69,785 is a health-ministry figure as of 26 November 2025; the 100,000+ is a separate research estimate, not a confirmed count. Appeal published 16 December 2025.',
    source: 'UN OCHA oPt · Flash Appeal 2026 · and GHO 2026',
    href: 'https://www.ochaopt.org/content/flash-appeal-occupied-palestinian-territory-2026',
  },
];