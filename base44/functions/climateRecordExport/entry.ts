import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── THE RECORD, TAKEN OUT WHOLE ───────────────────────────────────────────────
// Independence only means something if the record can leave. This hands back every
// entry with its source, its signer, its verification and its corrections, plus the
// gathering, pictures, music and listener lines — one file, readable by anyone.
//
// Contact addresses are never included. Not one submitter's, not the host's. The file
// is meant to be handed on freely, so it can never be the thing that leaks a person's
// address. A gathering's contact line stays, because the record already shows it in
// the open on that gathering's own page.
const ENTITIES = [
  'ClimateSolution',
  'ClimateAction',
  'ClimateNews',
  'ClimateGroup',
  'ClimatePhoto',
  'ClimateCategory',
  'ClimateTrack',
  'ClimateWord',
];

const ALWAYS_DROP = ['submitter_email', 'author_email', 'email', 'created_by_id', 'ai_assessment', 'flagged'];

function strip(record) {
  const out = {};
  for (const [key, value] of Object.entries(record)) {
    if (ALWAYS_DROP.includes(key)) continue;
    out[key] = value;
  }
  return out;
}

async function readAll(base44, name) {
  const rows = [];
  let cursor;
  for (let page = 0; page < 40; page += 1) {
    const result = await base44.asServiceRole.entities[name].filter({}, { limit: 500, cursor });
    rows.push(...result.items);
    if (!result.has_more) break;
    cursor = result.next_cursor;
  }
  return rows.filter(r => r.status !== 'draft').map(strip);
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const results = await Promise.allSettled(ENTITIES.map(name => readAll(base44, name)));
    const record = {};
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') record[ENTITIES[index]] = result.value;
    });
    if (!results.some(r => r.status === 'fulfilled')) {
      return Response.json({ error: 'Nothing could be read from the record.' }, { status: 500 });
    }

    const counts = Object.fromEntries(Object.entries(record).map(([k, v]) => [k, v.length]));
    return Response.json({
      what_this_is: 'Together We Can Change Climate — a whole copy of the record. Every entry carries its source, its signer, how well it is known, and any correction made in daylight. No contact addresses are included.',
      exported_at: new Date().toISOString(),
      counts,
      record,
    });
  } catch (error) {
    console.log('climateRecordExport failed:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}