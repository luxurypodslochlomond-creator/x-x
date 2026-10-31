// ── WHO IS TOLD WHEN A PERSON IS NEEDED ─────────────────────────────────────────
// A held entry is only as good as the person who hears about it. One alert that never
// arrives is the same, to a reader, as no review queue at all.
//
// So the keepers are named here, in the open, and the address the record already keeps
// in CLIMATE_ADMIN_EMAIL is ADDED to them when it is set — never instead of them, so a
// missing or renamed secret can never silently drop everyone who should have been told.
// Each address is listed once, and each is written to separately: one refused delivery
// must never take the others down with it.

export const KEEPER_ADDRESSES = [
  'jselendy@gmail.com',
  'horizonintlsolutions@gmail.com',
  'family@uf51.love',
];

const looksLikeAddress = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// The secret may hold one address or several, separated by commas, semicolons or spaces.
export function keeperInbox(secrets: { get: (name: string) => string | null | undefined }): string[] {
  const fromSecret = String(secrets.get('CLIMATE_ADMIN_EMAIL') || '')
    .split(/[,;\s]+/)
    .map((address) => address.trim().toLowerCase())
    .filter(looksLikeAddress);

  const all = [...KEEPER_ADDRESSES.map((address) => address.toLowerCase()), ...fromSecret];
  return [...new Set(all)];
}