import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireKeeper } from '../../shared/checkerAccess.ts';
import { keeperAddresses } from '../../shared/keeperInbox.ts';
import { secrets, waitUntil } from 'base44:runtime';

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
    // Corrected 16 November. This said "It goes to a keeper before it appears", which the
    // record does not do: an entry that carries its source and reads clean goes on as it
    // arrives, and only a sourceless or unclear one waits. The same untrue promise was taken
    // out of the keeper's invite sheet on the 15th and this letter was missed — and a letter
    // that overpromises is the one thing a record built to be trusted cannot afford.
    body: 'Sign in with the email address this invitation reached. Your checking room shows the entries waiting for a second look. Open a source, read it, then leave a signed note: it holds up, it does not, or you cannot tell. You cannot publish, edit or delete entries, and private submission details stay private. To contribute an initiative, use the submit button on the public record.',
    keeper: 'They have a way in now. Every change to that list is written on the record from here on, yours included.',
  },
  paused: {
    audit: 'access_paused',
    past: 'is paused',
    log: 'Access paused',
    headline: 'Your place on the record is paused',
    body: 'Your access to check entries has been paused for now. This is not a judgement on the work you did. It is only that the key you were given is not open at the moment. If this is a surprise, reply to this email and a keeper will tell you why.',
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
    'Sign in with the email address this invitation reached. Your keeper room is where you review entries, publish or hold them, and invite people to help. You can invite a checker yourself. Keeper access needs another keeper to agree, except for the recorded single-keeper or app-admin exceptions. This is access to the record, not administrator access to the whole app.',
  paused:
    'Your key to the record is closed for now. Nothing you put on it has been taken off, and nothing you signed has been unsigned. If this is a surprise, reply to this email and the other keeper will tell you why.',
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

    const { email, name, state, person_letter, row_id, notify_keepers = true } = await req.json().catch(() => ({}));
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
    // The keeper whose hand actually moved the list. Their name goes into the letter, because
    // the alternative is the record writing to a stranger about itself in its own voice — and
    // a person who cannot see who vouched for them has no one to reply to.
    const inviter = String(keyholder.name || user.full_name || user.email || '').trim();

    // Keeper or checker? The record's own line decides — never the request, or anybody could
    // ask for the warmer letter. Read back from the guest list before a word is written.
    const row = row_id
      ? await base44.asServiceRole.entities.ClimateChecker.get(String(row_id)).catch((e) => e.status === 404 ? null : Promise.reject(e))
      : (await base44.asServiceRole.entities.ClimateChecker.filter({ email: clean }))[0];
    if (state === 'invited' && (!row?.active || row.email?.toLowerCase() !== clean)) {
      return Response.json({ error: 'An active guest-list entry is required before sending an invitation.' }, { status: 400 });
    }
    const isKeeper = Boolean(row?.is_keeper);

    // Where the letter sends them: a keeper's work is in her room, a checker's is in the queue.
    // Sending a keeper to the checking queue is how the first invitation ended up in the wrong
    // place, with the person holding the keys shown a screen that could not use them.
    // Someone invited is sent to the record itself, not to the checking queue: an invitation
    // is the moment a person works out which door is theirs, and an empty queue teaches them
    // nothing about the door they came to add an initiative through. Once they are in, the
    // letters about their access point at the queue, which by then is their own work.
    const recordUrl = `${RECORD_HOME}/ClimateKeeperRoom`;
    // ── A PERSON VOUCHED, AND THE LETTER SAYS WHICH ONE ────────────────────────────
    // This letter used to arrive saying only that "you have a place on the record", as though
    // the record had decided it by itself. It had not. Somebody looked at a person's work,
    // thought they belonged here, and put their name on the list — and the first line of the
    // letter is now that person's name, so the person reading it knows who to thank and who to
    // ask. The record is the thing that keeps the note. It is not the thing that invited them.
    const letterBody =
      (state === 'invited' && inviter ? `You have a place on the record, put there by ${inviter}. ` : '') +
      ((isKeeper && KEEPER_BODY[state]) || copy.body);

    // The accountability line is written by the door that actually moved the list, one line
    // per change. This function used to write a second copy of it, so a change that landed
    // would have appeared twice in the audit trail — the same decision, twice, as though two
    // people had made it. One change, one line.

    // Their letter, when there is one to send. Skipped when the platform's own
    // invitation has just gone out, because that one already carries their sign-in link.
    let sent = false;
    if (person_letter) {
      const delivery = await base44.asServiceRole.integrations.Core.SendEmail({
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
      if (delivery?.success === false || delivery?.error) {
        return Response.json({ sent: false, error: delivery.message || delivery.error || delivery.reason || 'The email was not accepted for sending.' });
      }
      sent = true;
    }

    // Keeper copies must not delay or misreport the recipient's send result.
    if (notify_keepers) waitUntil((async () => {
      const addressed = (await keeperAddresses(base44, secrets)).filter((address) => address !== clean);
      for (let i = 0; i < addressed.length; i += 6) {
        await Promise.all(addressed.slice(i, i + 6).map(async (keeper) => {
          const result = await base44.asServiceRole.integrations.Core.SendEmail({
            to: keeper, category: 'transactional',
            subject: `${who} ${copy.past}`,
            text: `${who} ${copy.past}. ${copy.keeper}\n\nChanged by ${keyholder.name || user.full_name || 'a keeper'}.\n${RECORD_HOME}/ClimateKeeperRoom?tab=people`,
          });
          if (result?.success === false) console.error('climateCheckerNotice: keeper email refused', result.reason);
        }));
      }
    })().catch((error) => console.error('climateCheckerNotice: keeper notification failed', error?.message)));
    return Response.json({ sent, state, keeper_notification_queued: Boolean(notify_keepers) });
  } catch (error) {
    console.error('climateCheckerNotice failed', error?.message);
    const message = error?.response?.data?.error || error?.response?.data?.detail || error?.message || 'That did not send';
    const limited = /limit|too many|rate.?limit/i.test(String(message));
    return Response.json({ sent: false, error: String(message), ...(limited ? { reason: 'email_limit', retry_advice: 'Wait until the email service allows another send. Do not retry repeatedly.' } : {}) }, { status: limited ? 429 : 500 });
  }
}