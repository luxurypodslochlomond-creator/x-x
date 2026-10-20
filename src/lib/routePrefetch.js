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

  // Together We Change Climate
  togetherchangeclimate: () => import('@/pages/TogetherChangeClimate'),
  climateplatform: () => import('@/pages/TogetherChangeClimate'),
  climatedetail: () => import('@/pages/ClimateDetail'),
  climatemap: () => import('@/pages/ClimateMapPage'),
  climateimpact: () => import('@/pages/ClimateImpact'),
  climatefounder: () => import('@/pages/ClimateFounder'),
  climatebrief: () => import('@/pages/ClimateBrief'),
  climateterms: () => import('@/pages/ClimateTerms'),
  climateprivacy: () => import('@/pages/ClimatePrivacy'),
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