import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { resolveChecker } from '../../shared/checkerAccess.ts';
import { tellKeepers } from '../../shared/tellKeepers.ts';

// ── THE ROLL ────────────────────────────────────────────────────────────────
// The one place on this record where a person is shown as a person: the name they sign
// with, a few words about themselves, and the work that is actually theirs.
//
// Two rules decide everything here.
//
// First: a person is on the roll only if they put themselves on it. The guest list is
// private by design, so this function never returns an address, and a line appears only
// once the person it belongs to has written it — from their own account, in their own
// hand. A keeper cannot write it for them, and this door will not accept it from anyone
// else. That is the whole difference between a roll of people who signed and a directory
// somebody assembled about them.
//
// Second: the work shown is counted from the checking notes themselves, never typed in.
// A number beside a name on this record has to be one a reader could recompute, so
// "signed 6" means six rows in the checks table carry that address, and nothing else.
//
// It is not a profile, a feed or a network. There is no follow, no like, no comment and
// no message: those are the four things that turn a record of work into a place people
// perform in, and a volunteer's hour here is worth more than that.
const LIMIT = 280;

const lower = (v) => String(v || '').trim().toLowerCase();

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const db = base44.asServiceRole.entities;

    const rosterPage = await db.ClimateChecker.list({ sort: 'created_date', limit: 300 });
    const rows = rosterPage?.items || rosterPage || [];

    // ── WRITING THEIR OWN LINE ───────────────────────────────────────────────
    // A checker's own words about themselves. Checked against the list, not against the
    // request: the address comes from their sign-in, so nobody can write somebody else's
    // line and nobody can write themselves onto the roll from outside the list.
    if (body?.action === 'save') {
      const who = await resolveChecker(base44);
      if (who.error) {
        return Response.json({ error: who.error, paused: Boolean(who.paused) }, { status: who.status });
      }
      const mine = rows.find((r) => lower(r.email) === lower(who.user?.email));
      if (!mine) return Response.json({ error: 'You are not on the list.' }, { status: 403 });

      const wasEmpty = !String(mine.public_line || '').trim();
      const line = String(body?.line || '').replace(/\s+/g, ' ').trim().slice(0, LIMIT);
      await db.ClimateChecker.update(mine.id, {
        public_line: line,
        public_line_at: line ? new Date().toISOString() : '',
      });

      // ── THE MOMENT SOMEBODY ACTUALLY STANDS UP ─────────────────────────────
      // Being put on the list is not the same as turning up. This is the volunteer
      // saying who they are, in their own words, in public — the first thing they do
      // that is theirs alone — so a keeper hears it once, on the first line, and never
      // on an edit. Clearing the line says nothing: that is somebody stepping back, and
      // the record does not send a letter about a person choosing to be quieter.
      if (line && wasEmpty) {
        await tellKeepers(base44, {
          headline: `${mine.name || 'A volunteer'} has put their line on the roll`,
          line: `They wrote these words themselves: \u201C${line}\u201D`,
        });
      }

      return Response.json({ saved: true, line });
    }

    // ── READING THE ROLL ─────────────────────────────────────────────────────
    const checksPage = await db.ClimateCheck.list({ sort: '-created_date', limit: 500 });
    const checks = checksPage?.items || checksPage || [];

    const signedBy = new Map();
    checks.forEach((c) => {
      const key = lower(c.checker_email);
      if (!key) return;
      if (!signedBy.has(key)) signedBy.set(key, []);
      signedBy.get(key).push({ title: c.entry_title || '', type: c.entry_type || '', when: c.created_date || '' });
    });

    const onList = rows.filter((r) => r.active !== false);

    const people = onList
      .filter((r) => String(r.public_line || '').trim())
      .map((r) => {
        const signed = signedBy.get(lower(r.email)) || [];
        return {
          id: r.id,
          name: r.name || '',
          is_keeper: Boolean(r.is_keeper),
          line: String(r.public_line || '').trim(),
          since: r.created_date || '',
          signed_count: signed.length,
          // Only the words of what they signed, never a link: an entry they checked may
          // still be waiting to go on, and a roll that pointed at a page a reader cannot
          // open would be worse than one that says plainly what was read.
          signed: signed.slice(0, 3),
        };
      })
      // Keepers first, then checkers: not a rank, a fact about who carries what. Oldest
      // first within each, so the roll reads in the order people joined it.
      .sort((a, b) => (b.is_keeper ? 1 : 0) - (a.is_keeper ? 1 : 0) || new Date(a.since) - new Date(b.since));

    // Is the person reading this on the list? Read from their own session, and only to
    // offer them their own line. No address ever leaves this function.
    let me = null;
    try {
      const viewer = await base44.auth.me();
      const mine = viewer?.email ? rows.find((r) => lower(r.email) === lower(viewer.email)) : null;
      if (mine && mine.active !== false) {
        // Their own card is drawn from the same rows as the roll, so what it says about
        // them is what the record already says — never a second set of numbers.
        const signed = signedBy.get(lower(mine.email)) || [];
        me = {
          id: mine.id,
          name: mine.name || '',
          line: String(mine.public_line || '').trim(),
          is_keeper: Boolean(mine.is_keeper),
          since: mine.created_date || '',
          signed_count: signed.length,
          signed: signed.slice(0, 6),
        };
      }
    } catch (e) {
      me = null;
    }

    return Response.json({
      people,
      totals: {
        on_list: onList.length,
        keepers: onList.filter((r) => r.is_keeper).length,
        signers: onList.filter((r) => (signedBy.get(lower(r.email)) || []).length > 0).length,
        signed: checks.length,
      },
      me,
    });
  } catch (error) {
    return Response.json({ error: error?.message || 'That did not load' }, { status: 500 });
  }
}