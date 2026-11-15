// ── THE PHONE FIRST, THE INBOX ONLY IF NOBODY ANSWERED ────────────────────────
// Brian, 15 November: "email updates are boring to me bro… why am I fighting emails?"
//
// He was right, and the embarrassing part is that everything needed was already here:
// the record installs as an app, the app can be woken by a push, and the VAPID keys have
// been in the vault for months serving another product. The only thing missing was a
// keeper's own room using any of it.
//
// So this is the rule, and it is the whole rule: **the phone is told first.** If at least
// one keeper device took the push, no letter is written — the work is already visible in
// the room and an email about it is just a second copy of something already on the glass.
// If no device answered, the letter goes out exactly as before.
//
// That fallback is not laziness. Push needs the record installed on a home screen and the
// permission granted; a keeper who has not done that, or who is on a laptop that is asleep,
// must still hear that an entry is waiting. Silence is the one failure this record cannot
// dress up as a design choice.
import webpush from 'npm:web-push@3.6.7';
import { keeperAddresses } from './keeperInbox.ts';

export type KeeperPush = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
};

export async function pushKeepers(
  base44: any,
  { title, body, url = '/ClimateKeeperRoom', tag = 'record' }: KeeperPush,
  secrets: { get: (name: string) => string | null | undefined } = { get: (n) => Deno.env.get(n) }
): Promise<number> {
  const publicKey = secrets.get('VAPID_PUBLIC_KEY');
  const privateKey = secrets.get('VAPID_PRIVATE_KEY');
  if (!publicKey || !privateKey) return 0;

  try {
    webpush.setVapidDetails('mailto:family@uf51.love', publicKey, privateKey);
  } catch (e) {
    console.error('keeperPush: VAPID refused', (e as any)?.message);
    return 0;
  }

  const addresses = await keeperAddresses(base44, secrets);
  if (!addresses.length) return 0;

  const payload = JSON.stringify({
    title,
    body,
    icon: '/api/functions/serveClimateIcon',
    badge: '/api/functions/serveClimateIcon',
    tag,
    data: { url },
  });

  let reached = 0;

  for (const address of addresses) {
    try {
      const rows = await base44.asServiceRole.entities.UserPushSubscription.filter({
        user_email: address,
        is_active: true,
      });
      if (!rows?.length) continue;

      await Promise.all(rows.map(async (row: any) => {
        try {
          const data = typeof row.subscription_data === 'string'
            ? JSON.parse(row.subscription_data)
            : row.subscription_data;
          await webpush.sendNotification(data, payload);
          reached += 1;
        } catch (e: any) {
          // 404/410 means the browser threw the subscription away — a phone wiped, the app
          // removed from a home screen, a permission withdrawn. Retiring the row is the only
          // honest response, and it keeps the list from growing a graveyard of dead devices.
          if (e?.statusCode === 404 || e?.statusCode === 410) {
            await base44.asServiceRole.entities.UserPushSubscription.update(row.id, { is_active: false });
          } else {
            console.error(`keeperPush: device for ${address} failed`, e?.message);
          }
        }
      }));
    } catch (e: any) {
      console.error(`keeperPush: could not read devices for ${address}`, e?.message);
    }
  }

  return reached;
}