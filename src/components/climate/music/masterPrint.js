// ── THE MASTER'S OWN FINGERPRINT ────────────────────────────────────────────────
// Read on the artist's own device, from the exact bytes they chose, before the file
// goes anywhere: SHA-256, the one thing about a master that cannot be argued with.
//
// It is here because "we never touch your file" is a promise, and a promise anyone can
// check is worth more than one they have to take on trust. The hex that leaves this
// device is the receipt for what was handed over.
//
// If the browser cannot do it, this returns nothing and the record prints nothing:
// a fingerprint that was guessed would be worse than no fingerprint at all.
export async function fingerprintMaster(file) {
  if (!file || !globalThis.crypto?.subtle) return '';
  try {
    const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return '';
  }
}