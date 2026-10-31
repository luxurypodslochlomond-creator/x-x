// ── WHO IS TOLD WHEN A PERSON IS NEEDED ─────────────────────────────────────────
// A held entry is only as good as the person who hears about it. One alert that never
// arrives is the same, to a reader, as no review queue at all.
//
// The record is carried by a host, so the host's address is the one that should receive
// these — never Janine's own, because her inbox is not the record's front desk and a
// personal address has no business standing in for an institution. When a host takes the
// record on, their address (or several, separated by commas) goes in CLIMATE_ADMIN_EMAIL.
//
// Until that is set, family@uf51.love stands as the backstop, so a held entry is never
// left unseen while hosting is still being arranged. The secret is ADDED to the list,
// never instead of it, and each address is written to separately: one refused delivery
// must never take the others down with it.

export const BACKSTOP_ADDRESS = 'family@uf51.love';

const looksLikeAddress = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// CLIMATE_ADMIN_EMAIL may hold one address or several, separated by commas, semicolons or spaces.
export function keeperInbox(secrets: { get: (name: string) => string | null | undefined }): string[] {
  const hosts = String(secrets.get('CLIMATE_ADMIN_EMAIL') || '')
    .split(/[,;\s]+/)
    .map((address) => address.trim().toLowerCase())
    .filter(looksLikeAddress);

  return [...new Set([...hosts, BACKSTOP_ADDRESS])];
}