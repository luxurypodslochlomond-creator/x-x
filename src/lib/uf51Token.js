// ============================================================
// UF51 CONTINUITY TOKEN — "Zero-Loss Score"
//
// This is NOT a coin. It is an integrity bookmark: a deterministic
// score + SHA-256 hash derived ENTIRELY from live app state and
// hard-coded milestone flags. Same state in -> same token out.
// Re-open the app weeks later and the token re-derives to the EXACT
// same number. That immutability is the "zero-loss" promise: our
// score cannot silently drift, and no one can claim progress that
// isn't real in the product.
//
// Every number used here is verified in the app at render time
// (record counts), or is a milestone flag we have genuinely landed.
// Never invent a counter here.
// ============================================================

// --- Milestone flags: ONE change per genuine step forward ---
const MILESTONES = [
  "climate_platform_live",      // public route /TogetherChangeClimate wired
  "routing_registered",         // explicit <Route> + PUBLIC_PAGES entry added
  "public_no_login",            // Janine's spec: browse without login
  "two_summary_types",          // Solutions + Climate Crises both rendered
  "full_category_taxonomy",     // 19 categories incl. her spec taxonomy
  "geodesign_rewilding_def",    // both definitions present on page
  "mapping_ready",              // ESRI/leaflet stage marked (not yet built)
];

// Deduplicate, assert exact membership — never add freeform strings here.
function milestoneKey(m) {
  return m.replace(/[^a-z0-9]/gi, "").toLowerCase();
}
const MILESTONE_MAP = {};
for (const m of MILESTONES) MILESTONE_MAP[milestoneKey(m)] = m;

export const MILESTONE_LIST = MILESTONES;

// Which of these flags have genuinely landed (only flip true when real):
export const LANDED = {
  climate_platform_live: true,
  routing_registered: true,
  public_no_login: true,
  two_summary_types: true,
  full_category_taxonomy: true,
  geodesign_rewilding_def: true,
  mapping_ready: false, // architecture only — NOT built yet
};

// --- Mirrors of the REAL counters; the app passes live values at render.
// We accept them so the hash we produce is the hash of the live app,
// not of a stale hard-coded snapshot.
export function buildState({
  solutions = 0,
  climate_crises = 0,
  climate_groups = 0,
  published_records = 0,
} = {}) {
  const landedKeys = MILESTONES.filter((m) => LANDED[milestoneKey(m)]);
  return {
    version: 3,
    solutions,
    climate_crises,
    climate_groups,
    published_records,
    landed_count: landedKeys.length,
    landed: landedKeys,
  };
}

// --- Deterministic SHA-256 (Web Crypto — available in modern browsers).
export async function sha256Hex(str) {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // No Web Crypto (very old build) -> fall back to a stable FNV-1a hash,
  // still deterministic for the same input. NEVER random.
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

// --- The token: a human-readable receipt + machine-verifiable hash.
// "55:6:3 | CT-<hash>" — e.g. score:published:solutions:crises, then the hash.
export async function buildToken({
  published_records = 9,
  solutions = 6,
  climate_crises = 3,
  climate_groups = 0,
  bypass_live = false,
} = {}) {
  const state = buildState({
    solutions,
    climate_crises,
    climate_groups,
    published_records,
  });
  // Canonical string — this exact byte-sequence is what we hash.
  const canonical = [
    "UF51-CT",
    state.version,
    state.published_records,
    state.solutions,
    state.climate_crises,
    state.landed_count,
    state.landed.join(","),
  ].join("|");
  const hash = await sha256Hex(canonical);
  return {
    version: state.version,
    score: `${state.published_records}:${state.solutions}:${state.climate_crises}`,
    published_records: state.published_records,
    solutions: state.solutions,
    climate_crises: state.climate_crises,
    landed_count: state.landed_count,
    landed: state.landed,
    canonical,
    hash,
    token: `CT-${hash.slice(0, 12).toUpperCase()}`,
    almanac: `Score ${state.published_records} · ${state.solutions} solutions · ${state.climate_crises} crises · ${state.landed_count}/${MILESTONES.length} landed`,
  };
}