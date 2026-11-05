import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// ── ONE CHANGE, TWO LETTERS, ONE LINE ON THE RECORD ──────────────────────────
// Someone on the checking list hears from the record when they are put on it, when
// their access is paused, when it comes back, and when it ends. And every one of
// those moments is written into the record's own audit trail, because access is the
// one thing that used to change in silence: a person could be counted out and no
// row would say so. Being counted out is recorded the same as being counted in.
//
// The keeper who holds the record is told at the same time, so a change never lands
// without them knowing.
//
// Only a keeper may send it. An open version of this would be a machine for mailing
// strangers in the record's voice, which is the opposite of what the record is for.

const COPY = {
  invited: {
    audit: 'access_granted',
    past: 'is on the record',
    log: 'Given a place on the list',
    headline: 'You are on the record',
    body: 'You are on the checking list. You can open whatever is waiting, follow an entry to its source, and put your name to what you find. You cannot publish, edit or delete anything, and you never see the address of the person who submitted.',
    keeper: 'They have a way in now. Every change to that list is written on the record from here on, yours included.',
  },
  paused: {
    audit: 'access_paused',
    past: 'is paused',
    log: 'Access paused',
    headline: 'Your place on the record is paused',
    body: 'Your access to check entries has been paused for now. This is not a judgement on the work you did. It is only that the key you were given is not open at the moment. If this is a surprise, reply to this letter and a keeper will tell you why.',
    keeper: 'Their key is closed until one of you opens it again. Their notes stay on the record, in their name.',
  },
  restored: {
    audit: 'access_restored',
    past: 'is back on the record',
    log: 'Access restored',
    headline: 'Your place on the record is open again',
    body: 'Your access to check entries is open again. The queue shows whatever is waiting, and a note from you is what moves an entry forward. Thank you for coming back to it.',
    keeper: 'Their key is open again. Their old notes were never taken off.',
  },
  removed: {
    audit: 'access_removed',
    past: 'has left the record',
    log: 'Taken off the list',
    headline: 'Your place on the checking list has ended',
    body: 'Your access to check entries has ended. Thank you for the time you gave it. The notes you wrote are still on the record and still in your name, because the checking you did was real whether or not you can check tomorrow.',
    keeper: 'They are off the list. What they checked stays on the record and stays signed by them — ending access is not erasing work.',
  },
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email, name, state, person_letter, row_id } = await req.json();
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
    const who = String(name || '').trim() || clean;

    // The record first. A letter that failed to send must never mean the change went
    // unrecorded — the row is the accountability, the email is only courtesy.
    await base44.asServiceRole.entities.ClimateAuditLog.create({
      entity_type: 'keeper',
      entity_id: String(row_id || ''),
      entity_title: who,
      action: copy.audit,
      reviewer_email: user.email,
      ai_assessment: `${copy.log} — by ${user.full_name || user.email}`,
    });

    // Their letter, when there is one to send. Skipped when the platform's own
    // invitation has just gone out, because that one already carries their sign-in link.
    if (person_letter) {
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
    }

    // And the keeper is told, so nothing about the list changes without them hearing it.
    let notified = false;
    const keeper = Deno.env.get('CLIMATE_ADMIN_EMAIL') || user.email;
    if (keeper) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: keeper,
          category: 'transactional',
          subject: `${who} ${copy.past}`,
          html: `<div style="font-family:'Segoe UI',Arial,sans-serif;background:#f4efe4;padding:26px;color:#1a1612;">
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:bold;letter-spacing:0.16em;color:#b3261e;margin:0 0 16px;">RECORD OF THE TIME &nbsp;/&nbsp; x = x</p>
<h1 style="font-family:'Oswald',Impact,'Arial Narrow',Arial,sans-serif;font-size:30px;line-height:1.1;margin:0 0 12px;">${who} ${copy.past}</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 14px;">${copy.keeper}</p>
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;line-height:1.7;color:#6b6258;margin:0;">Written on the record by ${user.full_name || user.email}, with the date and the hour.<br><a href="${RECORD_HOME}/ClimateChecking" style="color:#b3261e;">${RECORD_HOME}/ClimateChecking</a></p>
</div>`,
        });
        notified = true;
      } catch (letterError) {
        console.error('climateCheckerNotice: keeper letter failed', letterError?.message);
      }
    }

    return Response.json({ sent: true, state, audited: true, keeper_notified: notified });
  } catch (error) {
    console.error('climateCheckerNotice failed', error?.message);
    return Response.json({ error: error?.message || 'That did not send' }, { status: 500 });
  }
}