import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { resolveChecker } from '../../shared/checkerAccess.ts';
import { tellKeepers } from '../../shared/tellKeepers.ts';

// A checker's note. Written here rather than from the browser for one reason: the name and
// the address on it come from the person's own sign-in, never from the form. A note you can
// sign as somebody else is not a check, it is a rumour with a signature.
//
// Nothing on the entry changes. Publishing stays with a keeper, so the worst a careless or
// hostile checker can do is waste a keeper's minute.
const TYPES = ['solution', 'action', 'comment', 'news', 'group', 'track'];
const VERDICTS = ['holds', 'does_not_hold', 'cannot_tell'];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const who = await resolveChecker(base44);
    if (who.error) return Response.json({ error: who.error }, { status: who.status });

    const body = await req.json().catch(() => ({}));
    const entry_type = String(body.entry_type || '');
    const entry_id = String(body.entry_id || '');
    const verdict = String(body.verdict || '');
    const note = String(body.note || '').trim();
    const entry_title = String(body.entry_title || '').slice(0, 300);

    if (!TYPES.includes(entry_type)) return Response.json({ error: 'Unknown entry type' }, { status: 400 });
    if (!entry_id) return Response.json({ error: 'Which entry?' }, { status: 400 });
    if (!VERDICTS.includes(verdict)) return Response.json({ error: 'Choose one of the three answers' }, { status: 400 });
    if (verdict !== 'holds' && note.length < 3) {
      return Response.json({ error: 'Say what you found, in a few words' }, { status: 400 });
    }

    // Whether this is the first thing they have ever signed is what decides whether a
    // keeper is told. A note from somebody with twenty behind them is the record working;
    // a note from somebody with none is a volunteer arriving, and only the second is news.
    const prior = await base44.asServiceRole.entities.ClimateCheck.filter({ checker_email: who.user.email });
    const firstEver = !(prior?.items || prior || []).length;

    const saved = await base44.asServiceRole.entities.ClimateCheck.create({
      entry_type,
      entry_id,
      entry_title,
      verdict,
      note: note.slice(0, 2000),
      checker_name: who.name,
      checker_email: who.user.email,
    });

    if (firstEver) {
      const said =
        verdict === 'holds'
          ? 'they found the source holds up'
          : verdict === 'does_not_hold'
          ? 'they found it does not hold up'
          : 'they could not tell';
      await tellKeepers(base44, {
        headline: `${who.name} has signed their first check`,
        line: `They read \u201C${entry_title || 'an entry on the record'}\u201D and put their name to it: ${said}. Their note is on the record now, and what happens next is a keeper's call.`,
      });
    }

    return Response.json({ saved: { id: saved.id, verdict: saved.verdict, checker_name: saved.checker_name } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}