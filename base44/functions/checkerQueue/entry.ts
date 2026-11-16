import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { resolveChecker } from '../../shared/checkerAccess.ts';

// What is waiting, for the people who agreed to look. The entries are read with the service
// role because they are drafts: unpublished, so a plain account cannot see them at all. That
// elevation is the whole reason this is a function and not a page query, and it is handed out
// only after resolveChecker has said yes.
//
// A checker is shown what a checker needs: what is claimed, and where it is claimed from. No
// submitter's address is sent, because checking an entry and knowing who sent it are two
// different things and only one of them was agreed to.
// ── WHAT A CHECKER MAY BE ASKED TO CHECK ────────────────────────────────────────
// Only a claim about the world, and only one that names an origin, because the whole of a
// checker's work is: open the source, say whether it says this. Four kinds do that — a
// solution, an action, an entry on the wire, a gathering.
//
// Two kinds were in here and had to come out. A **track** is a work given to the record by
// the artist who made it: its "source" is their own file, so asking whether that file says
// what the track claims is not a question, and a volunteer opening the queue to find
// "Ficklegroober" and "Future Classic 2004" waiting for verification would have been right
// to distrust everything else on the page. A **comment** is an opinion somebody left: there
// is nothing behind it to open, so "does the source support this" cannot be answered.
//
// Nothing was taken off the record by this. Both still exist, and a flagged one still waits
// for a person — in the keeper's own room, where the decision belongs, not in a queue of
// sources handed to a volunteer on their first morning.
const KINDS = [
  { type: 'solution', entity: 'ClimateSolution' },
  { type: 'action', entity: 'ClimateAction' },
  { type: 'news', entity: 'ClimateNews' },
  { type: 'group', entity: 'ClimateGroup' },
];

const shape = (type, r) => {
  if (type === 'solution') {
    return { title: r.title, body: r.summary, source_url: r.source_url || '', source_name: r.source_name || '' };
  }
  if (type === 'action') {
    return { title: r.title, body: r.description, source_url: r.source_url || '', source_name: r.source_name || '' };
  }
  if (type === 'news') {
    return { title: r.headline, body: r.what_changed, source_url: r.source_url || '', source_name: r.source_name || '' };
  }
  if (type === 'group') {
    return { title: r.name, body: r.description, source_url: '', source_name: r.topic || '' };
  }
  // A kind added to KINDS without a shape here would reach a checker with no words at all,
  // which is worse than not being queued: it would look like an entry that says nothing.
  return { title: '', body: '', source_url: '', source_name: '' };
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const who = await resolveChecker(base44);
    if (who.error) return Response.json({ error: who.error, paused: Boolean(who.paused) }, { status: who.status });

    // ── BOTH KINDS OF WORK, BECAUSE ONLY ONE OF THEM WAS IN HERE ────────────────────
    // This queue served drafts and nothing else. The record has none: 44 entries stand
    // published — 19 solutions, 3 actions, 18 on the wire, 4 gatherings — and not one of
    // them has ever been opened by a second pair of eyes. So an invited volunteer's first
    // morning was an empty page while the record stood there unchecked, and the only thing
    // the queue did hold was songs. That is the opposite of what they came for and the
    // opposite of what a research panel is being shown.
    //
    // So the queue carries both now: what is waiting to go on, and what is already on and
    // nobody has yet looked at. A draft comes first, because a keeper is about to decide on
    // it. A published entry stays only until somebody has left a word against it, so the
    // queue cannot quietly become the same twelve entries for ever.
    const reads = [];
    KINDS.forEach((k) => {
      reads.push(
        base44.asServiceRole.entities[k.entity].filter({ status: 'draft' }, { sort: '-created_date', limit: 25 }),
        base44.asServiceRole.entities[k.entity].filter({ status: 'published' }, { sort: 'created_date', limit: 40 })
      );
    });
    const results = await Promise.allSettled(reads);

    const waiting = [];
    const onRecord = [];
    // The pool a line came from is sent with it, because a checker deserves to know whether
    // they are the last word on something about to go up or a second pair of eyes on
    // something already standing there. It was invisible before: two very different jobs
    // printed the same on the card.
    const collect = (settled, type, into, state) => {
      if (settled.status !== 'fulfilled') return;
      const rows = settled.value?.items || settled.value || [];
      rows.forEach((r) => {
        into.push({ type, id: r.id, created_date: r.created_date, state, ...shape(type, r) });
      });
    };
    KINDS.forEach((k, i) => {
      collect(results[i * 2], k.type, waiting, 'waiting');
      collect(results[i * 2 + 1], k.type, onRecord, 'on_record');
    });

    let looked = new Set();
    if (onRecord.length) {
      const page = await base44.asServiceRole.entities.ClimateCheck.filter(
        { entry_id: { $in: onRecord.map((e) => e.id) } },
        { sort: '-created_date', limit: 500 }
      );
      (page?.items || page || []).forEach((c) => looked.add(c.entry_id));
    }

    const oldestFirst = (a, b) => new Date(a.created_date) - new Date(b.created_date);
    const entries = [
      ...waiting.sort(oldestFirst),
      ...onRecord.filter((e) => !looked.has(e.id)).sort(oldestFirst),
    ];

    // Everyone's notes, not just this person's: seeing that a colleague already opened this
    // link and what they found is the difference between repeating work and corroborating it.
    let checks = [];
    const ids = entries.map((e) => e.id);
    if (ids.length) {
      const page = await base44.asServiceRole.entities.ClimateCheck.filter(
        { entry_id: { $in: ids } },
        { sort: '-created_date', limit: 200 }
      );
      checks = page?.items || page || [];
    }

    // ── WHOSE WORD PUT THEM HERE ────────────────────────────────────────────────────
    // Brian, 16 November: "you sure the checker knows who invited them?" They did not. The
    // row has carried added_by since the place was given and it was never once shown to the
    // person it is about, so a volunteer's first morning told them nothing about who had
    // vouched for them. A guest list where nobody knows whose word they are on is just a
    // door. So it is turned back into a name here — never an address, because the keeper's
    // address belongs to the keeper — and said plainly on the page they land on.
    let invitedBy = '';
    if (who.addedBy && !who.isKeeper) {
      const keeperRows = await base44.asServiceRole.entities.ClimateChecker.filter({ email: who.addedBy });
      const keeperList = keeperRows?.items || keeperRows || [];
      invitedBy = (keeperList.find((r) => r.is_keeper) || keeperList[0])?.name || '';
    }

    return Response.json({ checker: { name: who.name, email: who.user.email, invited_by: invitedBy }, entries, checks });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}