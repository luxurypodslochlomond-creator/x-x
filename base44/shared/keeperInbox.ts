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

// ── EVERY KEEPER ON THE LIST, NOT ONLY THE HOST'S INBOX ─────────────────────────
// The record will stand on its own one day, and on that day the person holding its keys
// must be the one it writes to. Until now every keeper letter went to CLIMATE_ADMIN_EMAIL
// plus the family backstop, which meant a keeper could be put on the list, handed the keys,
// and never hear a word when somebody joined, wrote their line or signed their first check.
// That is a hole, not a preference: the letters existed and reached the wrong room.
//
// So the roster is read and its active keepers are written to individually, alongside the
// host inbox. Nobody is told about themselves, because the caller takes their own address
// out of the list before writing, and one refused delivery still never takes the rest down.
export async function keeperAddresses(
  base44: any,
  secrets: { get: (name: string) => string | null | undefined }
): Promise<string[]> {
  const fromRoster: string[] = [];
  try {
    const page = await base44.asServiceRole.entities.ClimateChecker.list({ sort: 'created_date', limit: 300 });
    const rows = page?.items || page || [];
    rows.forEach((row: any) => {
      if (row?.is_keeper && row?.active !== false) {
        const address = String(row.email || '').trim().toLowerCase();
        if (looksLikeAddress(address)) fromRoster.push(address);
      }
    });
  } catch (e) {
    console.error('keeperInbox: could not read the roster', (e as any)?.message);
  }

  return [...new Set([...fromRoster, ...keeperInbox(secrets)])];
}