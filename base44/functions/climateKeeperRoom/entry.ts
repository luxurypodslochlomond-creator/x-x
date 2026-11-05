import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { resolveChecker, requireKeeper } from '../../shared/checkerAccess.ts';
import { sealOf } from '../../shared/recordSeal.ts';

// ── THE KEEPER'S ROOM ─────────────────────────────────────────────────────────
// Where the founder of the record says yes or no, and nothing else happens.
//
// Everything here is decided on the server, against the record's own guest list, for one
// reason: the person who owns this record must not need to be an administrator of the whole
// building to use it. An app admin can read the vault, the finance and the personal paperwork
// that happen to live in the same place. The keeper of the record gets the record's keys and
// no others — so the permission is a line on the record, checked here, and a page that only
// ever shows what a keeper may touch.
//
// Three shapes only: what is waiting, the source for each one, and two buttons. Her yes puts
// the entry on the record, seals it in the same breath, and writes her name into the audit
// trail. Her hold is a not-yet: nothing is lost, nothing is marked rejected, and the decision
// is still written down, because a decision nobody can find later is not accountability.

const KIND = {
  solution: { entity: 'ClimateSolution', seal: 'solution' },
  action: { entity: 'ClimateAction', seal: 'action' },
  comment: { entity: 'ClimateComment', seal: null },
  news: { entity: 'ClimateNews', seal: 'news' },
  group: { entity: 'ClimateGroup', seal: 'group' },
  track: { entity: 'ClimateTrack', seal: 'track' },
};

const TITLE = (r) =>
  r.title || r.headline || r.name || (r.content ? r.content.slice(0, 70) : '') || 'Untitled';

const BODY = (r) =>
  r.summary || r.description || r.what_changed || r.statement || r.content || '';

// What a keeper is shown: enough to decide, and no more. A submitter's address is never
// sent — deciding whether an entry belongs on a record and knowing who sent it are two
// different things, and only one of them was handed over.
function shape(type, r) {
  const base = {
    type,
    id: r.id,
    title: TITLE(r),
    body: BODY(r),
    when: r.created_date || '',
    ai: r.ai_assessment || '',
    source_url: r.source_url || '',
    source_name: r.source_name || '',
    contact: '',
    label: '',
  };
  if (type === 'solution') {
    base.label = r.entry_type === 'climate_crisis' ? 'Crisis' : 'Solution';
  } else if (type === 'comment') {
    base.label = 'Comment';
    base.source_name = r.author_name || '';
    base.body = r.content || '';
  } else if (type === 'action') {
    base.label = 'Action';
    base.contact = r.contact_link || '';
  } else if (type === 'news') {
    base.label = 'Wire';
  } else if (type === 'group') {
    base.label = 'Gathering';
    base.contact = r.contact_email || '';
    base.source_url = '';
    base.source_name = r.topic || '';
  } else if (type === 'track') {
    base.label = 'Music';
    base.source_url = r.audio_url || '';
    base.source_name = r.artist_name || '';
  }
  return base;
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const action = body?.action || 'queue';

    // Who am I here? Answered without needing the queue, so the record's own bar can ask
    // once and offer the door to the right person.
    if (action === 'whoami') {
      const who = await resolveChecker(base44);
      if (who.error) return Response.json({ isKeeper: false, isChecker: false });
      return Response.json({ isKeeper: who.isKeeper, isChecker: who.isChecker, name: who.name });
    }

    const who = await requireKeeper(base44);
    if (who.error) return Response.json({ error: who.error }, { status: who.status });

    if (action === 'queue') {
      const keys = Object.keys(KIND);
      const results = await Promise.allSettled(
        keys.map((k) =>
          base44.asServiceRole.entities[KIND[k].entity].filter(
            { status: 'draft' },
            { sort: 'created_date', limit: 40 }
          )
        )
      );
      const waiting = [];
      keys.forEach((k, i) => {
        const settled = results[i];
        if (settled.status !== 'fulfilled') return;
        const rows = settled.value?.items || settled.value || [];
        rows.forEach((r) => waiting.push(shape(k, r)));
      });
      waiting.sort((a, b) => String(a.when).localeCompare(String(b.when)));
      return Response.json({ isKeeper: true, name: who.name, waiting });
    }

    if (action === 'decide') {
      const { type, id, decision, note } = body;
      const kind = KIND[type];
      if (!kind || !id) return Response.json({ error: 'Missing type or id' }, { status: 400 });
      if (decision !== 'publish' && decision !== 'hold') {
        return Response.json({ error: 'Unknown decision' }, { status: 400 });
      }

      let record;
      try {
        record = await base44.asServiceRole.entities[kind.entity].get(id);
      } catch (e) {
        return Response.json({ error: 'That entry is no longer here' }, { status: 404 });
      }
      if (!record) return Response.json({ error: 'That entry is no longer here' }, { status: 404 });

      const publishing = decision === 'publish';
      await base44.asServiceRole.entities[kind.entity].update(id, {
        status: publishing ? 'published' : 'draft',
      });

      // Her decision, written down: who, what, and the note that sat beside it.
      try {
        await base44.asServiceRole.entities.ClimateAuditLog.create({
          entity_type: type,
          entity_id: id,
          entity_title: TITLE(record),
          action: publishing ? 'published' : 'held',
          reviewer_email: who.user.email,
          ai_assessment: note || record.ai_assessment || '',
        });
      } catch (auditError) {
        console.error('climateKeeperRoom: audit line failed:', auditError.message);
      }

      // A published entry is sealed in the same breath as the decision, so nothing can be
      // put on the record without a fingerprint of the words it was published with. A hold
      // takes no seal: the entry has not been said yet.
      let sealed = false;
      if (publishing && kind.seal) {
        try {
          const fresh = await base44.asServiceRole.entities[kind.entity].get(id);
          const prior = await base44.asServiceRole.entities.ClimateSeal.filter(
            { entry_id: id },
            { sort: '-version', limit: 1 }
          );
          const last = (prior?.items || prior || [])[0] || null;
          const hash = await sealOf(id, kind.seal, fresh);
          await base44.asServiceRole.entities.ClimateSeal.create({
            entry_type: kind.seal,
            entry_id: id,
            entry_title: TITLE(fresh),
            version: (last?.version || 0) + 1,
            hash,
            prev_hash: last?.hash || '',
            sealed_at: new Date().toISOString(),
            sealed_by_role: 'keeper',
          });
          sealed = true;
        } catch (sealError) {
          console.error('climateKeeperRoom: seal failed:', sealError.message);
        }
      }

      return Response.json({ success: true, status: publishing ? 'published' : 'held', sealed });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('climateKeeperRoom failed:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}