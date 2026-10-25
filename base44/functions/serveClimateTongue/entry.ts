import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { isChromeKey, plainOfChromeKey } from '../../shared/recordChrome.ts';

// ── A MADE TONGUE IS HANDED OUT LIKE A PUBLISHED FILE ──
// The record's wording is finite and identical for everyone, so a tongue that has been made is
// not work — it is a document. This hands that document out with cache instructions, so the
// reader's own browser holds it and the edge holds it, and the platform is asked again only when
// a tongue has actually grown. That is the whole of the scale story: the words cost the platform
// nothing per reader, so ten readers and ten million readers cost the same.
//
//   ?lang=xx         the tongue as it stands
//   ?lang=xx&v=<ver> the same, plus what the reader already holds. When that is still current,
//                    one short answer says so, and that answer is held for a week.
//
// Public app, no login required: this is the record's own published copy, read by anyone.

const CURRENT_IN_BROWSER = 600;   // the tongue itself: ten minutes on the reader's device
const CURRENT_AT_EDGE = 86400;    // ...a day at the edge, where most readers are served from
const UNCHANGED = 604800;         // "you are up to date": a week, so a repeat check is free

function hand(body, maxAge, sMaxAge) {
  const cache = sMaxAge
    ? `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${UNCHANGED}`
    : `public, max-age=${maxAge}`;
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache },
  });
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    let lang = url.searchParams.get('lang') || '';
    let mine = url.searchParams.get('v') || '';

    // Also readable from the body, so the tongue can be asked for plainly when testing.
    if (!lang) {
      const body = await req.json().catch(() => null);
      if (body && typeof body === 'object') {
        lang = body.lang || '';
        mine = body.v || mine;
      }
    }

    if (!lang || lang === 'en') return hand({ version: null, dict: {} }, 60);

    const rows = await base44.asServiceRole.entities.ClimateTongue.filter({ lang });
    const list = Array.isArray(rows) ? rows : ((rows && rows.items) || []);
    const tongue = list[0] || null;
    const held = (tongue && tongue.dict) || {};

    // The record's own frame — nav, footer, masthead — is kept apart from the body's words so a
    // wording that reads wrong can be replaced by a better one. A reader knows nothing of that:
    // the frame is handed over as the plain word it stands for, and it is written in last, so the
    // current wording wins over any word left behind from before the frame was kept apart.
    const dict = {};
    for (const [key, value] of Object.entries(held)) if (!isChromeKey(key)) dict[key] = value;
    for (const [key, value] of Object.entries(held)) if (isChromeKey(key)) dict[plainOfChromeKey(key)] = value;

    const words = Object.keys(held).length;

    // No tongue yet: a reader's first visit in this language is what makes it. Nothing to hand out.
    if (!words) return hand({ version: null, dict: {} }, 60);

    // The tongue's name for itself: how many words it holds, and when it last gained one. Two
    // readers asking at the same moment therefore agree on it without either of them writing.
    const version = `${words}.${(tongue && tongue.last_made) || ''}`;

    if (mine && mine === version) return hand({ version, unchanged: true }, UNCHANGED, UNCHANGED);

    return hand({ version, dict }, CURRENT_IN_BROWSER, CURRENT_AT_EDGE);
  } catch (error) {
    console.error('serveClimateTongue error:', error && error.message ? error.message : error);
    // Never a failed page: an empty answer simply leaves the reader with the copy they hold.
    return hand({ version: null, dict: {} }, 30);
  }
}