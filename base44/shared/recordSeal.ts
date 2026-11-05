// ── THE SEAL ──────────────────────────────────────────────────────────────────
// A fingerprint of the words that carry an entry's claim, and of nothing else.
//
// The field list below is the whole design. It names the fields a reader would have
// to see changed to be misled: the claim, the source, the standing, the correction,
// the signature. It leaves out everything that moves on its own — updated_date, view
// counts, flags — because a fingerprint that changed whenever a counter ticked would
// tell nobody anything.
//
// This file is mirrored in src/components/climate/sealHash.js so a reader's own
// browser can recompute the same fingerprint without asking this server anything.
// If the two ever disagree, the browser wins: the reader does the checking, not us.

export const SEAL_FIELDS: Record<string, string[]> = {
  solution: [
    'entry_type', 'title', 'summary', 'details', 'category', 'subcategory',
    'country', 'region_rough', 'source_name', 'source_url', 'source_author',
    'source_date', 'verification', 'corroborating_source', 'correction_note',
    'editor', 'scale',
  ],
  action: [
    'title', 'action_type', 'date', 'region_rough', 'country', 'description',
    'contact_link', 'source_url', 'verification', 'corroborating_source',
    'correction_note', 'editor', 'category',
  ],
  news: [
    'headline', 'what_changed', 'kind', 'when_label', 'when_date', 'where_label',
    'country', 'publisher_type', 'source_name', 'source_url', 'source_author',
    'corroborating_source', 'verification', 'replicable', 'category',
    'correction_note', 'editor',
  ],
  track: [
    'title', 'artist_name', 'kind', 'statement', 'lyric', 'tracklist',
    'audio_url', 'master_offer', 'spec', 'seconds', 'master_sha256', 'cover_url',
  ],
  group: ['name', 'topic', 'region', 'description'],
};

// Unit and record separators: characters that cannot occur in the words themselves,
// so no field's text can ever be arranged to imitate another field's boundary.
const UNIT = '\u001f';
const RECORD = '\u001e';

export function canonicalLine(id: string, entryType: string, record: any): string {
  const fields = SEAL_FIELDS[entryType] || [];
  const parts = fields.map((field) => {
    const value = record ? record[field] : '';
    let asText: string;
    if (value === null || value === undefined) asText = '';
    else if (typeof value === 'string') asText = value;
    else asText = JSON.stringify(value);
    return `${field}${UNIT}${asText}`;
  });
  return `${entryType}${UNIT}${id}${RECORD}${parts.join(RECORD)}`;
}

export async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sealOf(id: string, entryType: string, record: any): Promise<string> {
  return sha256Hex(canonicalLine(id, entryType, record));
}