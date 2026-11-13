// ── ONE HAND ON THE SHOULDER ──────────────────────────────────────────────────
// Being given a way in is not the same as coming in. The record could say the first
// and never the second: a volunteer could sign in, put their own words on the roll and
// sign their first entry, and no keeper would hear a word about it. The founder asked
// the question plainly on 13 November — "do we get notified when someone agrees to be
// a checker?" — and the honest answer was no. This is that answer changed.
//
// It fires on the two things that are actually a person standing up: writing their own
// line on the roll, and signing their first check. Not on opening the letter, because a
// letter cannot be read back, and inventing a "they accepted" that nothing measured
// would be the record guessing about a person.
//
// Sent with the service role because both moments happen on the volunteer's own session,
// and a volunteer must never be able to mail a keeper at will: they trigger it by doing
// the work, and the letter carries only what the record already knows about them.
import { keeperInbox } from './keeperInbox.ts';

const RECORD = 'https://uf51.love';

const escape = (value: string) =>
  String(value || '').replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string)
  );

export async function tellKeepers(
  base44,
  { headline, line }: { headline: string; line: string }
): Promise<number> {
  const addresses = keeperInbox({ get: (name: string) => Deno.env.get(name) });
  let sent = 0;

  // One address at a time, so a refused delivery never takes the others down with it.
  for (const to of addresses) {
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to,
        category: 'transactional',
        subject: headline,
        html: `<div style="font-family:'Segoe UI',Arial,sans-serif;background:#f4efe4;padding:26px;color:#1a1612;">
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:bold;letter-spacing:0.16em;color:#b3261e;margin:0 0 16px;">RECORD OF THE TIME &nbsp;/&nbsp; x = x</p>
<h1 style="font-family:'Oswald',Impact,'Arial Narrow',Arial,sans-serif;font-size:30px;line-height:1.1;margin:0 0 12px;">${escape(headline)}</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 14px;">${escape(line)}</p>
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;line-height:1.7;color:#6b6258;margin:0;">Nothing was changed by this letter. The record wrote it on its own when somebody did the work, and the date is on it.<br><a href="${RECORD}/ClimateKeeperRoom?tab=people" style="color:#b3261e;">${RECORD}/ClimateKeeperRoom</a></p>
</div>`,
      });
      sent += 1;
    } catch (e) {
      console.error('tellKeepers: one address failed', e?.message);
    }
  }

  return sent;
}