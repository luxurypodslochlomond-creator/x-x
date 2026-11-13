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

    const results = await Promise.allSettled(
      KINDS.map((k) =>
        base44.asServiceRole.entities[k.entity].filter(
          { status: 'draft' },
          { sort: '-created_date', limit: 25 }
        )
      )
    );

    const entries = [];
    KINDS.forEach((k, i) => {
      const settled = results[i];
      if (settled.status !== 'fulfilled') return;
      const rows = settled.value?.items || settled.value || [];
      rows.forEach((r) => {
        entries.push({
          type: k.type,
          id: r.id,
          created_date: r.created_date,
          ...shape(k.type, r),
        });
      });
    });
    entries.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

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

    return Response.json({ checker: { name: who.name, email: who.user.email }, entries, checks });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}