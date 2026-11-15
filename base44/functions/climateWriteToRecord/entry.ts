import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { tellKeepers } from '../../shared/tellKeepers.ts';

// ── THE RECORD'S ONE LETTERBOX ────────────────────────────────────────────────
// Brian, 15 November: "check every word… sure all true and needed… flow right."
//
// This exists because one page was telling readers something that was not true.
// "How this record is made" says: if you publish a source and would rather a copy were
// not kept, say so — and its "say so" landed on the corrections page, which only ever
// printed corrections and had no way to ask for one. A promise with no door behind it is
// the same lie as a number that was invented, and this record cannot afford either.
//
// The privacy and terms pages name a real address (family@uf51.love) for data and takedown
// requests, and that address is unchanged: this box is the second route in, the one that
// needs no mail client and no account.
//
// So this is the door. One box, on the corrections page, for the four things a reader
// actually needs to say: something here is wrong, something here is mine and I want it
// taken down, I have the source for an entry that has none, or anything else. It writes
// the message where a keeper will see it and it tells the keepers it has arrived. It
// invents nothing, promises no timeline, and needs nobody to sign in: the reader is a
// stranger with a complaint, which is exactly who a record must answer.
//
// What it does NOT do: it does not publish anything, it does not touch the entry it is
// about, and it cannot be used to put a word on the record. A message is a message.
const KINDS = {
  wrong: 'Something on the record is wrong',
  mine: 'This is mine and I want it taken down',
  source: 'I have the source for an entry that has none',
  other: 'Something else',
};

const clean = (value, max) =>
  String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max);

export default async function (req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));

    const kind = KINDS[body?.kind] ? body.kind : 'other';
    const entry = clean(body?.entry_title, 160);
    const email = clean(body?.from_email, 160);
    const message = clean(body?.message, 1500);

    if (message.length < 10) {
      return Response.json({ error: 'Tell us what is wrong — a sentence or two is plenty.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return Response.json({ error: 'We need an address to answer you at.' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // The line a keeper reads first: what kind of letter it is, and what it is about.
    const subject = KINDS[kind];
    const stored = [
      `Type: ${subject}`,
      entry ? `About: ${entry}` : 'About: not named',
      '',
      message,
    ].join('\n');

    await base44.asServiceRole.entities.SupportRequest.create({
      message: stored.slice(0, 2000),
      user_email: email,
      user_name: `Record · ${kind}`,
      status: 'new',
    });

    // The phone first, the letter as the fallback — the same rule the volunteer notices
    // use, so a keeper hears about a takedown request the way they hear about anything
    // else the record needs them for. Never a reason to fail the reader's message: the
    // message is already kept, and telling them it failed because a phone was asleep
    // would be the record lying about its own state.
    try {
      await tellKeepers(base44, {
        headline: subject,
        line: `${entry ? `${entry} — ` : ''}${message}`,
      });
    } catch {
      // the row is written; a keeper will still find it in the support queue
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.log('climateWriteToRecord failed', error?.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}