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
  const name = pathname.split('/').find(Boolean)?.toLowerCase();
  if (!name || started.has(name)) return;
  const load = HUBS[name];
  if (!load) return;
  started.add(name);
  load().catch(() => {
    // A failed prefetch is invisible — navigation will simply load it normally.
    started.delete(name);
  });
}

// ── THE RECORD'S OWN DOORS, WARMED BEFORE A THUMB REACHES THEM ─────────────────
// Brian, 25 November, on a phone: "click to go to the wire, base 1, map, method, founder,
// x = x and seals — top level nav feels shorter and jumpy between pages, but no jump
// between record and wire."
//
// He was describing something real, and it was not the nav. Every one of those pages
// arrives as its own lump of code, and while that lump was downloading the loading line
// replaced the WHOLE frame — masthead included. So a tap took the nav off the glass and
// put it back a beat later at a slightly different height: the nav was not shorter, it had
// been missing for a moment. Record → Wire felt fine only because both were already in
// memory, which is exactly why the fault looked like a fault in some pages and not others.
//
// Waiting for the touch was the wrong moment to start: touchstart and the tap happen in
// the same instant, so the download began at the same moment the reader arrived. The doors
// are known before anybody touches them, so they are fetched in the idle time after the
// page a reader is already reading has settled — the connection is busy doing nothing, and
// every door on the rail is in hand by the time a thumb lands on it. Nothing is downloaded
// that a reader did not ask to see; these are the record's own doors, on its own rail.
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
  const run = () => RECORD_DOORS.forEach(prefetchPath);
  if (typeof window === 'undefined') return;
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 1200);
  }
}