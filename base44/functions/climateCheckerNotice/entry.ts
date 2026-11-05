import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── ONE LETTER, THREE MOMENTS ────────────────────────────────────────────────
// Someone on the checking list hears from the record three times: when they are
// put on it, when their access is paused, and when it ends. The invitation itself
// is the platform's own (it carries the link to set a password), so this sends the
// other two — the quiet ones that used to arrive as silence.
//
// Only a keeper may send it. An open version of this would be a machine for mailing
// strangers in the record's voice, which is the opposite of what the record is for.

const COPY = {
  paused: {
    headline: 'Your place on the record is paused',
    body: 'Your access to check entries has been paused for now. This is not a judgement on the work you did. It is only that the key you were given is not open at the moment. If this is a surprise, reply to this letter and a keeper will tell you why.',
  },
  restored: {
    headline: 'Your place on the record is open again',
    body: 'Your access to check entries is open again. The queue shows whatever is waiting, and a note from you is what moves an entry forward. Thank you for coming back to it.',
  },
  removed: {
    headline: 'Your place on the checking list has ended',
    body: 'Your access to check entries has ended. Thank you for the time you gave it. The notes you wrote are still on the record and still in your name, because the checking you did was real whether or not you can check tomorrow.',
  },
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email, name, state } = await req.json();
    const clean = String(email || '').trim().toLowerCase();
    const copy = COPY[state];
    if (!clean || !clean.includes('@') || !copy) {
      return Response.json({ error: 'Nothing to send' }, { status: 400 });
    }

    // The record's own address — the one a keeper would say out loud.
    // Never a host derived from the request, and never whichever domain the app happens
    // to answer on: this app also answers on cb51.io, whose front door is a different
    // product entirely. A letter from the record must not hand a checker a band page.
    const RECORD_HOME = 'https://uf51.love';
    const recordUrl = `${RECORD_HOME}/ClimateChecking`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: clean,
      category: 'transactional',
      template_name: 'ClimateChecker',
      variables: {
        first_name: String(name || '').trim() || 'there',
        headline: copy.headline,
        body: copy.body,
        record_url: recordUrl,
      },
    });

    return Response.json({ sent: true, state });
  } catch (error) {
    console.error('climateCheckerNotice failed', error?.message);
    return Response.json({ error: error?.message || 'That did not send' }, { status: 500 });
  }
}