// ZAPP buddy memory — DEVICE-LOCAL ONLY.
//
// This is the legal moat. The buddy "learns about the kid over time" (Kirk's idea)
// but the learning lives in the kid's own browser, never on our servers. We hold
// nothing: no account, no name, no profile, nothing tied to identity. If the device
// is wiped or changed, the buddy simply meets a new friend. That keeps ZAPP
// COPPA-clean and the unsupervised / no-signup model legal.
//
// Nothing here is transmitted. These are plain localStorage reads/writes.

const ANIMAL_KEY = 'zapp_buddy';
const MEM_KEY = 'zapp_buddy_mem';

export function getBuddyId() {
  try { return localStorage.getItem(ANIMAL_KEY) || null; } catch { return null; }
}

export function setBuddyId(id) {
  try { localStorage.setItem(ANIMAL_KEY, id); } catch { /* private mode */ }
}

export function clearBuddy() {
  try { localStorage.removeItem(ANIMAL_KEY); localStorage.removeItem(MEM_KEY); } catch {}
}

export function getMemory() {
  try { return JSON.parse(localStorage.getItem(MEM_KEY) || '{}'); } catch { return {}; }
}

// Called when a build completes. Stores only: how many builds, the last idea
// (truncated), and when. No identity, no location, no contact info.
export function rememberBuild(idea) {
  try {
    const m = getMemory();
    m.builds = (m.builds || 0) + 1;
    m.lastIdea = String(idea || '').slice(0, 80);
    m.lastSeen = Date.now();
    localStorage.setItem(MEM_KEY, JSON.stringify(m));
  } catch { /* private mode */ }
}

export function getBuildCount() {
  return getMemory().builds || 0;
}