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

// ── WHAT THIS ROOM ASKS HER TO DECIDE ────────────────────────────────────────
// Music is not on this list, deliberately. A track is a gift the record plays, and it
// arrives through its own door with its own screener — it is not an entry the founder
// of a climate record puts on a climate record. It was on the list, and twenty pieces
// waiting as drafts turned her queue into a scroll of song titles and her headline into
// "20 things waiting", which is a day of climate work that does not exist. A keeper who
// opened this room to decide whether a source holds up should never have to step past a
// tracklist to find it. The music room keeps its own door and its own keeper control, so
// nothing was taken away from the tracks: they simply stopped arriving here.
const QUEUE = ['solution', 'action', 'comment', 'news', 'group'];

// The kinds of entry that carry a person's name on them. A group, a comment and a track are
// signed by the record in other ways; these three carry the editor field.
const SIGNABLE = ['solution', 'action', 'news'];

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
    base.label = 'Groups';
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
    // A keeper is a checker as well: the two are one person with two capacities, and the
    // record already answers yes to both. The reason for a refusal is returned so the
    // workroom can tell a stranger apart from someone who has been paused.
    if (action === 'whoami') {
      const who = await resolveChecker(base44);
      if (who.error) {
        return Response.json({
          isKeeper: false,
          isChecker: false,
          reason: who.error,
          paused: Boolean(who.paused),
        });
      }
      return Response.json({
        isKeeper: who.isKeeper,
        isChecker: who.isChecker,
        name: who.name,
      });
    }

    const who = await requireKeeper(base44);
    if (who.error) return Response.json({ error: who.error }, { status: who.status });

    if (action === 'summary') {
      // Count on the server. Never download two full queues just to draw badges.
      const numbers = await Promise.all([
        ...QUEUE.map((type) => base44.asServiceRole.entities[KIND[type].entity].count({ status: 'draft' })),
        base44.asServiceRole.entities.ClimateAccessChange.count({ status: 'waiting' }),
      ]);
      const empty = [{ $exists: false }, '', null];
      const missingInvites = empty.flatMap((joined_at) => [
        ...empty.map((sign_in_sent_at) => ({ joined_at, sign_in_sent_at })),
        { joined_at, sign_in_error: { $regex: '.+' } },
      ]);
      const [keeperPage, checkers, invitations] = await Promise.all([
        base44.asServiceRole.entities.ClimateChecker.filter({ active: true, is_keeper: true }, { sort: 'created_date', limit: 100 }),
        base44.asServiceRole.entities.ClimateChecker.count({ active: true, is_keeper: false }),
        base44.asServiceRole.entities.ClimateChecker.count({ active: true, $or: missingInvites }),
      ]);
      const approvals = numbers[QUEUE.length];
      return Response.json({
        decide: numbers.slice(0, QUEUE.length).reduce((sum, value) => sum + value, 0),
        people: approvals + invitations, approvals, invitations, checkers,
        keeper_names: keeperPage.items.map((row) => row.name || row.email),
        counted_at: new Date().toISOString(),
      });
    }

    if (action === 'queue') {
      const keys = QUEUE;
      const results = await Promise.all(
        keys.map((k) =>
          base44.asServiceRole.entities[KIND[k].entity].filter(
            { status: 'draft' },
            { sort: 'created_date', limit: 40 }
          )
        )
      );
      const waiting = [];
      keys.forEach((k, i) => {
        const rows = results[i]?.items || [];
        rows.forEach((r) => waiting.push(shape(k, r)));
      });
      waiting.sort((a, b) => String(a.when).localeCompare(String(b.when)));

      // ── THE NOTES AND WHAT WAS ALREADY SAID ──────────────────────────────────
      // A keeper used to decide with the entry in front of her and the checking nowhere
      // near it: the person who opened the source had written their finding on another
      // page, and the one making the decision had to remember it. So the notes travel with
      // the entry now — the whole point of a second pair of eyes is that they are beside
      // the yes.
      //
      // And a held entry is still a draft, so it came back into this queue looking exactly
      // like something new, which is how a keeper ends up re-deciding the same thing twice.
      // The date of her own hold is carried with it, so the entry says "you held this" and
      // sorts to the bottom instead of pretending to be new work.
      const ids = waiting.map((w) => w.id);
      if (ids.length) {
        const [notePages, holdPages] = await Promise.allSettled([
          base44.asServiceRole.entities.ClimateCheck.filter(
            { entry_id: { $in: ids } },
            { sort: '-created_date', limit: 200 }
          ),
          base44.asServiceRole.entities.ClimateAuditLog.filter(
            { entity_id: { $in: ids }, action: 'held' },
            { sort: '-created_date', limit: 200 }
          ),
        ]);

        const noteRows =
          notePages.status === 'fulfilled' ? notePages.value?.items || notePages.value || [] : [];
        const holdRows =
          holdPages.status === 'fulfilled' ? holdPages.value?.items || holdPages.value || [] : [];

        const byEntry = new Map();
        noteRows.forEach((c) => {
          const list = byEntry.get(c.entry_id) || [];
          list.push({ verdict: c.verdict || '', name: c.checker_name || '', note: c.note || '' });
          byEntry.set(c.entry_id, list);
        });

        const heldAt = new Map();
        holdRows.forEach((h) => {
          if (!heldAt.has(h.entity_id)) heldAt.set(h.entity_id, h.created_date || '');
        });

        waiting.forEach((w) => {
          w.notes = (byEntry.get(w.id) || []).slice(0, 3);
          w.held_when = heldAt.get(w.id) || '';
        });

        // Never held comes first; something she has already said not-yet about waits below
        // the new work, and is still one tap from being reopened.
        waiting.sort((a, b) => Boolean(a.held_when) - Boolean(b.held_when));
      }

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
      // Her yes is also her signature. The name written on an entry is the person who put it
      // there — so when the keeper says yes in this room, her own name goes on the entry, from
      // the roster line she signed in with, never typed in and never borrowed from anyone.
      const patch = { status: publishing ? 'published' : 'draft' };
      if (publishing && SIGNABLE.includes(type)) patch.editor = who.name;
      await base44.asServiceRole.entities[kind.entity].update(id, patch);

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

    // ── HER NAME ON WHAT IS ALREADY UP ──────────────────────────────────────────
    // The name on an entry belongs to the person who put it there. Entries published before
    // signing existed — or signed on her behalf — can carry a name that is not true, and only
    // she can settle that. One line at a time: hers, or not hers. A no is not a deletion: the
    // entry stays exactly where it is and reads plainly "unsigned". Nothing is guessed here,
    // and nothing is written on a stranger's behalf.
    if (action === 'names') {
      const mine = String(who.name || '').trim().toLowerCase();
      const results = await Promise.allSettled(
        SIGNABLE.map((t) =>
          base44.asServiceRole.entities[KIND[t].entity].filter(
            { status: 'published' },
            { sort: '-created_date', limit: 100 }
          )
        )
      );
      const rows = [];
      results.forEach((settled, i) => {
        if (settled.status !== 'fulfilled') return;
        const list = settled.value?.items || settled.value || [];
        list.forEach((r) => {
          const signed = String(r.editor || '').trim();
          if (signed.toLowerCase() === mine) return;
          rows.push({ type: SIGNABLE[i], id: r.id, title: TITLE(r), editor: signed });
        });
      });
      return Response.json({ isKeeper: true, name: who.name, rows });
    }

    if (action === 'sign') {
      const { type, id, isMine } = body;
      if (!SIGNABLE.includes(type) || !id) {
        return Response.json({ error: 'Missing type or id' }, { status: 400 });
      }
      let entry;
      try {
        entry = await base44.asServiceRole.entities[KIND[type].entity].get(id);
      } catch (e) {
        return Response.json({ error: 'That entry is no longer here' }, { status: 404 });
      }
      if (!entry) return Response.json({ error: 'That entry is no longer here' }, { status: 404 });

      const name = isMine ? who.name : '';
      await base44.asServiceRole.entities[KIND[type].entity].update(id, { editor: name });
      return Response.json({ success: true, editor: name });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('climateKeeperRoom failed:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}