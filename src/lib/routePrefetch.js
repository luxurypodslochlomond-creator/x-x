// ── INSTANT TAPS ──
// Start loading a page's code the moment a finger touches or a cursor rests on
// its link, so the tap finishes before the network does.
// Each entry is a lazy chunk App.jsx already loads on navigation — nothing is
// fetched twice, and a page listed here that turns out to be eager is a no-op.

// key = lowercased route name (first path segment)
const HUBS = {
  // products
  zapp: () => import('@/pages/Zapp'),
  petsounds51: () => import('@/pages/PetSounds51'),
  cb51: () => import('@/pages/CB51'),
  buzzstop: () => import('@/pages/BuzzStop'),
  buzztrip: () => import('@/pages/BuzzTrip'),
  trackt: () => import('@/pages/Trackt'),
  tracktdashboard: () => import('@/pages/TracktDashboard'),
  prof51: () => import('@/pages/Prof51'),

  // free healing & tools
  frequencychamber: () => import('@/pages/FrequencyChamber'),
  chakra51: () => import('@/pages/Chakra51'),
  universal51: () => import('@/pages/Universal51'),
  healingdashboard: () => import('@/pages/HealingDashboard'),
  shed51: () => import('@/pages/Shed51'),
  realitycheck: () => import('@/pages/RealityCheck'),

  // learn51
  magic51: () => import('@/pages/Magic51'),
  learn51: () => import('@/pages/Magic51'),
  learn: () => import('@/pages/Magic51'),
  literacy51: () => import('@/pages/Literacy51'),
  lifeskills51: () => import('@/pages/LifeSkills51'),
  georgiemaths: () => import('@/pages/GeorgieMaths'),
  lennoxmaths: () => import('@/pages/LennoxMaths'),
  readingsupport: () => import('@/pages/ReadingSupport'),
  youngwarriors: () => import('@/pages/YoungWarriors'),
  askmeanything: () => import('@/pages/AskMeAnything'),

  // platform
  welcome: () => import('@/pages/Welcome'),
  platform: () => import('@/pages/Platform'),
  aletheia: () => import('@/pages/Aletheia'),

  // Together We Can Change Climate
  togetherchangeclimate: () => import('@/pages/TogetherChangeClimate'),
  climateplatform: () => import('@/pages/TogetherChangeClimate'),
  climatedetail: () => import('@/pages/ClimateDetail'),
  climatemap: () => import('@/pages/ClimateMapPage'),
  climateimpact: () => import('@/pages/ClimateImpact'),
  climatefounder: () => import('@/pages/ClimateFounder'),
  climatesupport: () => import('@/pages/ClimateSupport'),
  climatebrief: () => import('@/pages/ClimateBrief'),
  climateterms: () => import('@/pages/ClimateTerms'),
  climateprivacy: () => import('@/pages/ClimatePrivacy'),
  // The rest of the record's own doors. Without these, moving Record → Wire → an entry
  // → Method → Music waited on a chunk while the doors either side of them were already
  // in hand — the record felt fast in some places and slow in others for no reason a
  // reader could see.
  climatewire: () => import('@/pages/ClimateWire'),
  climatewireentry: () => import('@/pages/ClimateWireEntry'),
  climatemethod: () => import('@/pages/ClimateMethod'),
  climatesearch: () => import('@/pages/ClimateSearch'),
  climateguide: () => import('@/pages/ClimateGuide'),
  climatemusic: () => import('@/pages/ClimateMusic'),
  climatehost: () => import('@/pages/ClimateHost'),
  climatereachplace: () => import('@/pages/ClimateReachPlace'),
  // Three doors on the contents sheet were still cold when tapped — the fingerprints,
  // the corrections and the volunteers — and the keeper's room is cold for the one person
  // who opens it while a queue is waiting on her. A door that has to think before it opens
  // is the same door twice, so they are warmed like every other: on the touch, not before.
  climateseals: () => import('@/pages/ClimateSeals'),
  // The room of drawings and the roll of people who check the record were the two doors on
  // the record's own rail with nothing behind them in this list, so both were cold on every
  // tap — including BASE 1, which lives under /ClimateCartoons and shares this key.
  climatecartoons: () => import('@/pages/ClimateCartoons'),
  'climatecartoons/baseone': () => import('@/pages/ClimateCartoonsBaseOne'),
  'climatecartoons/sheet': () => import('@/pages/ClimateCartoonSheet'),
  'climatecartoons/artist': () => import('@/pages/ClimateCartoonArtist'),
  'climatecartoons/francis': () => import('@/pages/ClimateCartoonFrancis'),
  'climatecartoons/whatthisis': () => import('@/pages/ClimateCartoonsWhatThisIs'),
  'climatecartoons/caib': () => import('@/pages/ClimateCartoonsCAIB'),
  'climatecartoons/print': () => import('@/pages/ClimateCartoonPrint'),
  'climatecartoons/exhibition': () => import('@/pages/ClimateCartoonExhibition'),
  'climatecartoons/thread': () => import('@/pages/ClimateCartoonsThread'),
  climateroll: () => import('@/pages/ClimateRoll'),
  climatecorrections: () => import('@/pages/ClimateCorrections'),
  climatefellows: () => import('@/pages/ClimateFellows'),
  climatekeeperroom: () => import('@/pages/ClimateKeeperRoom'),
  xequalsx: () => import('@/pages/XEqualsX'),
  extractionproofcovenant: () => import('@/pages/ExtractionProofCovenant'),
  uf51token: () => import('@/pages/UF51Token'),
  uf51threadjournal: () => import('@/pages/UF51ThreadJournal'),

  // SORTED — its own shell, its own doors
  sorted: () => import('@/pages/SortedHome'),
  sortedabout: () => import('@/pages/SortedAbout'),
  sortedfaq: () => import('@/pages/SortedFAQ'),
  sortedfororgs: () => import('@/pages/SortedForOrgs'),
  sortedglobalaccess: () => import('@/pages/SortedGlobalAccess'),
};

const started = new Set();

export function prefetchPath(pathname) {
  const parts = pathname.toLowerCase().split('/').filter(Boolean);
  // A BASE 1 visit must fetch BASE 1, not the entire unrelated Wall page.
  const name = parts[0] === 'climatecartoons' && parts[1] ? parts.slice(0, 2).join('/') : parts[0];
  if (!name || started.has(name)) return;
  const load = HUBS[name];
  if (!load) return;
  started.add(name);
  load().catch(() => {
    // A failed prefetch is invisible — navigation will simply load it normally.
    started.delete(name);
  });
}

// Desktop warming only. Importing a page also evaluates its dependencies and loads
// its styles, even in an idle callback. Phones should spend that work on the door
// actually touched, through RoutePrefetcher, not a dozen speculative destinations.
export const RECORD_DOORS = [
  '/TogetherChangeClimate',
  '/ClimateWire',
  '/ClimateSearch',
  '/ClimateMap',
  '/ClimateCartoons',
  '/ClimateMethod',
  '/ClimateFounder',
  '/XEqualsX',
  '/ClimateSeals',
  '/ClimateMusic',
  '/ClimateGuide',
  '/ClimateRoll',
];

export function warmRecordDoors() {
  if (typeof window === 'undefined' || window.matchMedia('(max-width: 1023px)').matches || navigator.connection?.saveData) return;
  const run = () => RECORD_DOORS.forEach(prefetchPath);
  if (typeof window.requestIdleCallback === 'function') {
    const idle = window.requestIdleCallback(run, { timeout: 2500 });
    return () => window.cancelIdleCallback(idle);
  }
  const timer = window.setTimeout(run, 1200);
  return () => window.clearTimeout(timer);
}