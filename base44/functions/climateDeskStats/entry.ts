import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// The desk: the state of the record in one answer, so a keeper never has to open eight pages
// to find out what is waiting. Every number here is counted when the page asks, never remembered
// from yesterday, because a dashboard that shows a stale total is worse than no dashboard.
//
// These counts used to be asked for one after another: the drafts, then the checks on them, then
// the guest list, then the diary, then the sweep. Seven waits in a row, on a phone, over a
// connection someone is holding in one hand. Only one of those questions actually depends on
// another answer, so everything else is now asked at the same time.
const KINDS = [
  { type: 'solution', entity: 'ClimateSolution', label: 'solutions' },
  { type: 'action', entity: 'ClimateAction', label: 'actions' },
  { type: 'comment', entity: 'ClimateComment', label: 'comments' },
  { type: 'news', entity: 'ClimateNews', label: 'wire entries' },
  { type: 'group', entity: 'ClimateGroup', label: 'gatherings' },
  { type: 'track', entity: 'ClimateTrack', label: 'tracks' },
];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const db = base44.asServiceRole.entities;
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [per, checkerList, recentChecks, logPage, openNext, sweepPage] = await Promise.all([
      Promise.all(
        KINDS.map(async (k) => {
          const [drafts, published] = await Promise.all([
            db[k.entity].filter({ status: 'draft' }, { sort: '-created_date', limit: 200 }),
            db[k.entity].count({ status: 'published' }),
          ]);
          const rows = drafts?.items || drafts || [];
          return {
            type: k.type,
            label: k.label,
            waiting: rows.length,
            published,
            ids: rows.map((r) => r.id),
            oldest: rows.length ? rows[rows.length - 1].created_date : null,
          };
        })
      ),
      db.ClimateChecker.list({ sort: '-created_date', limit: 200 }),
      db.ClimateCheck.count({ created_date: { $gte: since } }),
      db.ClimateWorkLog.list({ sort: '-entry_date', limit: 6 }),
      db.ClimateWorkLog.count({ kind: 'next', done: false }),
      db.ClimateWorkLog.filter({ kind: 'sweep' }, { sort: '-entry_date', limit: 1 }),
    ]);

    const waitingIds = per.flatMap((p) => p.ids);

    // What the checkers have written on what is waiting. This is the number that matters most:
    // an entry nobody has opened is the only entry with nothing but its own word behind it.
    let checks = [];
    if (waitingIds.length) {
      const page = await db.ClimateCheck.filter(
        { entry_id: { $in: waitingIds } },
        { sort: '-created_date', limit: 500 }
      );
      checks = page?.items || page || [];
    }

    const checkedIds = new Set(checks.map((c) => c.entry_id));
    const unchecked = waitingIds.filter((id) => !checkedIds.has(id)).length;
    const contested = checks.filter((c) => c.verdict === 'does_not_hold').length;

    const checkers = checkerList?.items || checkerList || [];
    const tally = {};
    checks.forEach((c) => {
      const key = c.checker_email || 'unknown';
      tally[key] = (tally[key] || 0) + 1;
    });

    const log = logPage?.items || logPage || [];
    const lastSweep = (sweepPage?.items || sweepPage || [])[0] || null;

    return Response.json({
      waiting: per,
      waitingTotal: waitingIds.length,
      unchecked,
      contested,
      checksOnWaiting: checks.length,
      recentChecks,
      checkers: checkers.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        active: c.active,
        notes: tally[c.email] || 0,
      })),
      latestChecks: checks.slice(0, 5),
      log,
      openNext,
      lastSweep,
      as_of: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}