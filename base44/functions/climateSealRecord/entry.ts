import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { sealOf } from '../../shared/recordSeal.ts';

// ── TAKING THE SEAL ───────────────────────────────────────────────────────────
// A keeper presses this, and every published entry gets a fingerprint of its words.
// Run it again after a correction and the entry gets a new link in its own chain,
// pointing at the one it replaced — so a correction is on the record, and a quiet
// edit is not.
//
// Nothing here decides whether an entry is true. It records what the words were.

const TITLE_FIELD = {
  solution: 'title',
  action: 'title',
  news: 'headline',
  track: 'title',
  group: 'name',
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth
      .me()
      .catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    // Every seal already taken, so an entry whose words have not moved is not sealed twice.
    const sealRes = await base44.asServiceRole.entities.ClimateSeal.list('-version', 2000);
    const seals = Array.isArray(sealRes) ? sealRes : sealRes.items || [];
    const latest = new Map();
    for (const s of seals) {
      const current = latest.get(s.entry_id);
      if (!current || (s.version || 0) > (current.version || 0)) latest.set(s.entry_id, s);
    }

    const sources = [
      ['solution', () => base44.asServiceRole.entities.ClimateSolution.filter({ status: 'published' }, { limit: 500 })],
      ['action', () => base44.asServiceRole.entities.ClimateAction.filter({ status: 'published' }, { limit: 500 })],
      ['news', () => base44.asServiceRole.entities.ClimateNews.filter({ status: 'published' }, { limit: 500 })],
      ['track', () => base44.asServiceRole.entities.ClimateTrack.filter({ status: 'published' }, { limit: 500 })],
      ['group', () => base44.asServiceRole.entities.ClimateGroup.filter({ status: 'published' }, { limit: 500 })],
    ];

    const pending = [];
    const summary = { sealed: 0, unchanged: 0, by_type: {} };
    const now = new Date().toISOString();

    for (const [entryType, load] of sources) {
      const res = await load();
      const records = Array.isArray(res) ? res : res.items || [];

      for (const record of records) {
        const hash = await sealOf(record.id, entryType, record);
        const current = latest.get(record.id);

        if (current && current.hash === hash) {
          summary.unchanged += 1;
          continue;
        }

        pending.push({
          entry_type: entryType,
          entry_id: record.id,
          entry_title: String(record[TITLE_FIELD[entryType]] || '').slice(0, 200),
          version: current ? (current.version || 1) + 1 : 1,
          hash,
          prev_hash: current ? current.hash : '',
          sealed_at: now,
          sealed_by_role: 'keeper',
        });
        summary.sealed += 1;
        summary.by_type[entryType] = (summary.by_type[entryType] || 0) + 1;
      }
    }

    if (pending.length) await base44.asServiceRole.entities.ClimateSeal.bulkCreate(pending);

    return Response.json({ ok: true, ...summary });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}