import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireKeeper } from '../../shared/checkerAccess.ts';
import { keeperAddresses } from '../../shared/keeperInbox.ts';

// ── THE ROOM OF CARTOONS ──────────────────────────────────────────────────────
// Four small actions, and nothing else:
//
//   read    — a drawing goes in, one line comes out. The line says only what is
//             visibly there. It is never presented as the drawer's words, and the
//             sender is invited to replace it.
//   send    — a drawing offered to the wall. It is written as a draft, always, and
//             the keepers are told. A picture cannot be sourced by a machine, so no
//             drawing goes up on a machine's word.
//   waiting — the drafts, for a keeper. Nobody else may read them.
//   decide  — a keeper puts a drawing up, or holds it back with their reason.
//
// The read is deliberately the only thing here that costs anything, and it is the
// only thing a stranger can spend: one call, one picture, one sentence.

const RECORD = 'https://uf51.love';

const clean = (value, max) =>
  String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

const escape = (value) =>
  String(value || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const ASK = `You are looking at a drawing that has been offered to a public climate record, in a room opened for a workshop on cartoons for climate.

Write one line describing what is visibly there, and nothing more.

Rules:
- One sentence, no more than 22 words.
- Name only what can actually be seen: the figures, the objects, and any word or letter written in the picture.
- Do not interpret, do not judge, do not say whether it is good, right or wrong, and do not add meaning the drawing does not carry.
- If it is a photograph rather than a drawing, say plainly what the photograph shows.
- If you cannot tell what it is, say that rather than guessing.
- Separately, decide whether anything in it is unsafe for a public page: hateful symbols, nudity, cruelty, or anything aimed at a person.`;

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const action = body?.action || 'read';

    // ── ONE LINE, ABOUT WHAT IS THERE ─────────────────────────────────────────
    if (action === 'read') {
      const image_url = String(body?.image_url || '');
      if (!image_url.startsWith('https://')) {
        return Response.json({ error: 'A drawing is needed first.' }, { status: 400 });
      }

      const seen = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: ASK,
        file_urls: [image_url],
        response_json_schema: {
          type: 'object',
          properties: {
            line: { type: 'string' },
            safe: { type: 'boolean' },
          },
          required: ['line', 'safe'],
        },
      });

      // A machine that could not open the file answers with a complaint, and a complaint
      // is not a line about the drawing. Offered as one, it would be pasted into the box
      // where the artist's own words go. So a complaint is treated as nothing said.
      const said = clean(seen?.line, 200);
      const line = /could not be opened|unable to (open|view|see)|please re-upload|i cannot (see|open)|no image/i.test(said)
        ? ''
        : said;

      // ── HAS THE WALL ALREADY GOT THIS DRAWING? ──────────────────────────────
      // Not by the file. One drawing came to hang twice under two names because the two
      // copies were different files of the same picture — a slide and the published web
      // image — so a check on bytes would have waved it through. This checks the words
      // instead: what the machine has just said about this drawing, against what the record
      // already says about the ones it holds. A question put to the sender and the
      // custodian, never a refusal.
      let looks_like: any[] = [];
      try {
        const held = await base44.asServiceRole.entities.ClimateCartoon.list('-created_date', 300);
        const rows = Array.isArray(held) ? held : (held?.items || []);
        const words = (value: any) => new Set(String(value || '').toLowerCase().match(/[a-z]{4,}/g) || []);
        const mine = words(line);
        if (mine.size >= 4) {
          looks_like = rows
            .map((c: any) => {
              const theirs = words(`${c.title} ${c.for_line} ${c.machine_line}`);
              if (!theirs.size) return null;
              let shared = 0;
              mine.forEach((w: string) => { if (theirs.has(w)) shared += 1; });
              const score = shared / Math.min(mine.size, theirs.size);
              return score >= 0.5 ? { id: c.id, title: c.title, artist_name: c.artist_name, score } : null;
            })
            .filter(Boolean)
            .sort((a: any, b: any) => b.score - a.score)
            .slice(0, 2);
        }
      } catch (e) {
        console.error('climateCartoon: the duplicate check was skipped', e?.message);
      }

      return Response.json({
        line,
        safe: seen?.safe !== false,
        looks_like,
      });
    }

    // ── A LINK THE PERSON ALREADY HAS ─────────────────────────────────────────
    // A drawing that has been published somewhere comes with a page, and that page already
    // carries its title and its copyright line. Reading them means nobody retypes a credit,
    // which is where credits get mangled. The page is read as a page — no model, no guess:
    // its own metadata and its own © line, or nothing at all.
    if (action === 'fromlink') {
      const url = String(body?.url || '').trim();
      let host = '';
      try {
        const parsed = new URL(url);
        host = parsed.hostname.toLowerCase();
        if (parsed.protocol !== 'https:') throw new Error('https only');
      } catch {
        return Response.json({ error: 'A web address, starting https://' }, { status: 400 });
      }
      if (
        /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host) ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
        /\.(local|internal)$/.test(host)
      ) {
        return Response.json({ error: 'That address cannot be read.' }, { status: 400 });
      }

      try {
        const page = await fetch(url, { headers: { 'user-agent': 'uf51-record/1.0 (+https://uf51.love)' } });
        const html = (await page.text()).slice(0, 300000);
        const meta = (name: string) => {
          const a = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]*content=["']([^"']{1,300})["']`, 'i'));
          const b = html.match(new RegExp(`<meta[^>]+content=["']([^"']{1,300})["'][^>]*(?:property|name)=["']${name}["']`, 'i'));
          return clean((a || b)?.[1], 200);
        };
        const title = meta('og:title') || clean((html.match(/<title[^>]*>([^<]{1,300})<\/title>/i) || [])[1], 200);
        const credit = clean((html.match(/(©[^<\n]{0,120}?(?:19|20)\d\d[^<\n]{0,80})/) || [])[1], 160);

        // ── A PAGE THAT WILL NOT LET THE RECORD READ IT MUST SAY NOTHING ─────────
        // CEEW's own pages sit behind a bot check, and the check answers with a page
        // titled "Just a moment…". Filling a title box with that would be the record
        // inventing a title — worse than an empty box. So a refusal is reported as a
        // refusal: no title, no credit, and the sender keeps the link as the source.
        const refused = /just a moment|attention required|access denied|are you a robot|enable javascript|verifying you are human|checking your browser/i;
        if (refused.test(title) || refused.test(html.slice(0, 4000))) {
          return Response.json({ title: '', credit: '', url, blocked: true });
        }

        return Response.json({ title, credit, url });
      } catch (e) {
        console.error('climateCartoon: the link could not be read', e?.message);
        return Response.json({ error: 'That page could not be read.' }, { status: 502 });
      }
    }

    // ── A DRAWING OFFERED TO THE WALL ─────────────────────────────────────────
    if (action === 'send') {
      const artist_name = clean(body?.artist_name, 80);
      const image_url = String(body?.image_url || '');
      if (!artist_name) {
        return Response.json({ error: 'Whose hand drew it, please.' }, { status: 400 });
      }
      if (!image_url.startsWith('https://')) {
        return Response.json({ error: 'The drawing did not arrive. Try it once more.' }, { status: 400 });
      }

      // ── THE DRAWING MAY ANSWER A CRISIS ON THE RECORD ───────────────────────────
      // A drawing can be offered about one entry — the crisis it is looking at — so the
      // crisis gets a face and the drawing gets a reason. The link is resolved here, against
      // the record itself, and the headline is copied from that entry rather than taken from
      // the browser: the wall must never name a crisis in words the sender typed, and an id
      // that is not a published crisis leaves the drawing unlinked instead of putting a
      // wrong headline under somebody's work.
      let crisis_id = '';
      let crisis_title = '';
      const askedCrisis = clean(body?.crisis_id, 60);
      if (askedCrisis) {
        try {
          const crisis = await base44.asServiceRole.entities.ClimateSolution.get(askedCrisis);
          if (crisis && crisis.entry_type === 'climate_crisis' && crisis.status === 'published') {
            crisis_id = crisis.id;
            crisis_title = clean(crisis.title, 160);
          }
        } catch {
          // Not an entry on the record: the drawing simply stands on its own.
        }
      }

      // ── THE GOAL IT WAS SENT FROM ───────────────────────────────────────────────
      // A drawing offered from a goal's own panel carries that goal, so it comes back to
      // that goal when a keeper has seen it. The number is only ever one of the seventeen:
      // anything else is dropped rather than corrected into a goal the sender never named,
      // because a wrong goal under somebody's drawing is a false fact about their work.
      const askedGoal = Number(body?.goal);
      const goal = Number.isInteger(askedGoal) && askedGoal >= 1 && askedGoal <= 17 ? askedGoal : undefined;

      // A workshop is a room full of people pressing send twice. One drawing, one card.
      const already = await base44.asServiceRole.entities.ClimateCartoon.filter({ image_url });
      const existing = (already?.items || already || [])[0];
      if (existing) return Response.json({ ok: true, id: existing.id, again: true });

      const record = await base44.asServiceRole.entities.ClimateCartoon.create({
        title: clean(body?.title, 120),
        artist_name,
        origin: clean(body?.origin, 200),
        // Where it was drawn, in the sender's own words. Never worked out from anything:
        // a drawing with no stated country stays off the map rather than being placed
        // by a guess, which is the one thing a plate about honesty cannot do.
        country: clean(body?.country, 80),
        for_line: clean(body?.for_line, 240),
        image_url,
        crisis_id,
        crisis_title,
        // Only present when it was sent from a goal: an empty field would otherwise claim
        // the drawing was filed against nothing on purpose.
        ...(goal ? { goal } : {}),
        machine_line: clean(body?.machine_line, 240),
        credit: clean(body?.credit, 120),
        source_url: String(body?.source_url || '').startsWith('https://') ? String(body.source_url).slice(0, 400) : '',
        submitter_email: clean(body?.submitter_email, 160),
        status: 'draft',
      });

      // One hand on the shoulder, not a shouting feed: one letter per keeper, and a
      // refused address never takes the others down with it.
      try {
        const addresses = await keeperAddresses(base44, { get: (name: string) => Deno.env.get(name) });
        for (const to of addresses) {
          try {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to,
              category: 'transactional',
              subject: `A drawing for the wall — ${clean(artist_name, 40)}`,
              html: `<div style="font-family:'Segoe UI',Arial,sans-serif;background:#f4efe4;padding:26px;color:#1a1612;">
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:bold;letter-spacing:0.16em;color:#b3261e;margin:0 0 16px;">THE RECORD &nbsp;/&nbsp; x = x</p>
<h1 style="font-family:'Oswald',Impact,'Arial Narrow',Arial,sans-serif;font-size:28px;line-height:1.12;margin:0 0 12px;">A drawing is waiting</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 10px;"><strong>${escape(artist_name)}</strong> sent a drawing for the wall${body?.title ? `: <em>${escape(clean(body.title, 120))}</em>` : ''}.</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 14px;">It is not on the wall. A drawing goes up when a custodian has seen it, and that is you.</p>
<p style="font-family:'Courier New',Courier,monospace;font-size:11px;line-height:1.7;color:#6b6258;margin:0;"><a href="${RECORD}/ClimateCartoons" style="color:#b3261e;">${RECORD}/ClimateCartoons</a><br>Nothing was published by this letter. It was written by the record when somebody offered a drawing to it.</p>
</div>`,
            });
          } catch (e) {
            console.error('climateCartoon: one keeper letter failed', e?.message);
          }
        }
      } catch (e) {
        console.error('climateCartoon: keeper letters skipped', e?.message);
      }

      return Response.json({ ok: true, id: record.id });
    }

    // ── EVERYTHING BELOW IS A KEEPER'S ────────────────────────────────────────
    const who = await requireKeeper(base44);
    if (who.error) return Response.json({ error: who.error }, { status: who.status });

    if (action === 'waiting') {
      const list = await base44.asServiceRole.entities.ClimateCartoon.filter(
        { status: 'draft' },
        { sort: 'created_date', limit: 40 }
      );
      return Response.json({ items: list?.items || list || [] });
    }

    if (action === 'decide') {
      const id = String(body?.id || '');
      if (!id) return Response.json({ error: 'Which drawing?' }, { status: 400 });
      const publish = body?.publish === true;
      await base44.asServiceRole.entities.ClimateCartoon.update(id, {
        status: publish ? 'published' : 'draft',
        keeper_note: publish ? '' : clean(body?.note, 240),
      });
      return Response.json({ ok: true, published: publish });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('climateCartoon failed', error?.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}