import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireKeeper } from '../../shared/checkerAccess.ts';
import { keeperAddresses } from '../../shared/keeperInbox.ts';

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

// A keeper does not hear the checker's letter. Saying "you cannot publish, edit or delete
// anything" to the person who was just handed the keys is the record telling her the opposite
// of what it did, in the same breath — and it happened, to the first keeper it invited.
const KEEPER_BODY = {
  invited:
    'You hold the keys to this record. You can put an entry on it or hold it back, sign what you publish, say how well something is known, and add or remove anyone else on the list \u2014 one word of yours puts a checker on it, and handing over the keys takes two of you. Your room is where whatever is waiting sits, one tap each — yes, or not yet. You are not an administrator of the whole building: the record\u2019s keys are the keys you were given, and no others.',
  paused:
    'Your key to the record is closed for now. Nothing you put on it has been taken off, and nothing you signed has been unsigned. If this is a surprise, reply to this letter and the other keeper will tell you why.',
  restored: 'Your key is open again, and the record answers to you as it did before.',
  removed:
    'Your place on the record has ended. Everything you put on it stays, signed with your name, because ending access is not erasing work.',
};

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    // A keeper of this record may send this letter — not only an administrator of the
    // building. It is the keeper who moves the list, so it must be the keeper who can send
    // the letter that goes with it; asking for the building's keys here is how a volunteer
    // could be added and never written to.
    const keyholder = await requireKeeper(base44);
    if (keyholder.error) return Response.json({ error: keyholder.error }, { status: keyholder.status });
    const user = keyholder.user;

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
    const who = String(name || '').trim() || clean;

    // Keeper or checker? The record's own line decides — never the request, or anybody could
    // ask for the warmer letter. Read back from the guest list before a word is written.
    let isKeeper = false;
    try {
      const row = row_id
        ? await base44.asServiceRole.entities.ClimateChecker.get(String(row_id))
        : (await base44.asServiceRole.entities.ClimateChecker.filter({ email: clean }))[0];
      isKeeper = Boolean(row?.is_keeper);
    } catch (rowError) {
      console.error('climateCheckerNotice: could not read the roster line', rowError?.message);
    }

    // Where the letter sends them: a keeper's work is in her room, a checker's is in the queue.
    // Sending a keeper to the checking queue is how the first invitation ended up in the wrong
    // place, with the person holding the keys shown a screen that could not use them.
    const recordUrl = isKeeper ? `${RECORD_HOME}/ClimateKeeperRoom` : `${RECORD_HOME}/ClimateChecking`;
    const letterBody = (isKeeper && KEEPER_BODY[state]) || copy.body;

    // The accountability line is written by the door that actually moved the list, one line
    // per change. This function used to write a second copy of it, so a change that landed
    // would have appeared twice in the audit trail — the same decision, twice, as though two
    // people had made it. One change, one line.

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
          body: letterBody,
          record_url: recordUrl,
        },
      });
    }

    // And the keeper is told, so nothing about the list changes without them hearing it.
    let notified = false;
    // Every active keeper on the roster hears, as well as the host inbox — and never the
    // person the change is about, so nobody is written to about themselves.
    const addressed = (await keeperAddresses(base44, { get: (name: string) => Deno.env.get(name) }))
      .filter((address) => address !== clean);
    for (const keeper of addressed) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: keeper,
          category: 'transactional',
          subject: `${who} ${copy.past}`,
          html: `<div style="font-family:'Segoe UI',Arial,sans-serif;background:#f4efe4;padding:26px;color:#1a1612;">
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:bold;letter-spacing:0.16em;color:#b3261e;margin:0 0 16px;">RECORD OF THE TIME &nbsp;/&nbsp; x = x</p>
<h1 style="font-family:'Oswald',Impact,'Arial Narrow',Arial,sans-serif;font-size:30px;line-height:1.1;margin:0 0 12px;">${who} ${copy.past}</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 14px;">${copy.keeper}</p>
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;line-height:1.7;color:#6b6258;margin:0;">Written on the record by ${user.full_name || user.email}, with the date and the hour.<br><a href="${RECORD_HOME}/ClimateKeeperRoom?tab=people" style="color:#b3261e;">${RECORD_HOME}/ClimateKeeperRoom</a></p>
</div>`,
        });
        notified = true;
      } catch (letterError) {
        console.error('climateCheckerNotice: keeper letter failed', letterError?.message);
      }
    }

    return Response.json({ sent: true, state, keeper_notified: notified });
  } catch (error) {
    console.error('climateCheckerNotice failed', error?.message);
    return Response.json({ error: error?.message || 'That did not send' }, { status: 500 });
  }
}