// ── THE READER'S OWN CHECK ────────────────────────────────────────────────────
// The mirror of base44/shared/recordSeal.ts, kept deliberately separate so the
// checking happens in the reader's browser and not on a server we control. Nothing
// here touches the network: give it an entry, it gives back a fingerprint. If it
// ever disagrees with the server's, this is the copy that matters.

export const SEAL_FIELDS = {
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

const UNIT = '\u001f';
const RECORD = '\u001e';

export const hashingAvailable = typeof globalThis.crypto !== 'undefined' && !!globalThis.crypto.subtle;

export function canonicalLine(id, entryType, record) {
  const fields = SEAL_FIELDS[entryType] || [];
  const parts = fields.map((field) => {
    const value = record ? record[field] : '';
    let asText;
    if (value === null || value === undefined) asText = '';
    else if (typeof value === 'string') asText = value;
    else asText = JSON.stringify(value);
    return `${field}${UNIT}${asText}`;
  });
  return `${entryType}${UNIT}${id}${RECORD}${parts.join(RECORD)}`;
}

export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sealOf(id, entryType, record) {
  return sha256Hex(canonicalLine(id, entryType, record));
}