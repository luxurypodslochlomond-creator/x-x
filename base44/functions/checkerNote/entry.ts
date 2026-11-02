import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { resolveChecker } from '../../shared/checkerAccess.ts';

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

    const saved = await base44.asServiceRole.entities.ClimateCheck.create({
      entry_type,
      entry_id,
      entry_title,
      verdict,
      note: note.slice(0, 2000),
      checker_name: who.name,
      checker_email: who.user.email,
    });

    return Response.json({ saved: { id: saved.id, verdict: saved.verdict, checker_name: saved.checker_name } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}