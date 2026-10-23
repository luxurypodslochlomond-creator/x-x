import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// THE PROVENANCE SWEEP — the machine does the hunting, a person keeps the last word.
//
// Every entry on this record must trace to an origin. Entries already on it without one are
// exactly the ones that would cost the record its credibility, and finding them by hand is
// the work that never gets done. So the machine does it: it reads every published entry that
// carries no source link, goes and looks for the origin, and puts the candidate in front of
// a person — with the whole backlog listed, not just the first few it could research.
//
// What it will NOT do is write the origin in itself. A source link is the one thing on this
// record that must never be guessed: a machine-written origin would look verified and be
// worthless, and any panel that spotted it would be right to stop trusting the rest. The
// sweep proposes; a person confirms. That is the whole deal.
//
// Reads and writes run as the caller, not as the service, so the record's own rules decide
// who may do this — never this function.

const TYPES = [
  { entity: 'ClimateSolution', label: 'Solution or climate crisis' },
  { entity: 'ClimateNews', label: 'Wire entry' },
];

// Bounded so a run always finishes: every entry with no source is listed, and the first few
// get a researched candidate. Running it again picks up the next ones.
const RESEARCH_LIMIT = 5;

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { apply = false } = await req.json().catch(() => ({}));

    // 1. Every published entry with no link to its origin.
    const missing: any[] = [];
    for (const t of TYPES) {
      const page = await base44.entities[t.entity].filter({ status: 'published' }, { limit: 200, sort: '-created_date' });
      for (const i of page.items || []) {
        if (!i.source_url || String(i.source_url).trim() === '') {
          missing.push({
            entity: t.entity,
            label: t.label,
            id: i.id,
            title: i.title || i.headline || '(untitled)',
            named_origin: i.source_name || i.submitter_name || '',
            assessment: i.ai_assessment || '',
          });
        }
      }
    }

    // 2. The machine goes and looks for the origin of the first few.
    const toResearch = missing.slice(0, RESEARCH_LIMIT);
    for (const item of toResearch) {
      try {
        const found = await base44.asServiceRole.integrations.Core.InvokeLLM({
          add_context_from_internet: true,
          model: 'gemini_3_flash',
          prompt: `Find the origin of ONE entry on a public climate record. The entry is quoted below. Find the original body that published it — the article, journal, official statement, organisation page or document it came from.

RULES — these matter more than finding anything:
- Only return a URL you have actually found and that plausibly IS the origin of THIS entry, not one that merely resembles it.
- Never invent, complete or guess a URL. A made-up link is far worse than none: it would sit on the record looking verified. If you are not reasonably sure, return found=false.
- Do not return a search-results page, an aggregator or a social post about it. The origin itself.
- In "why", one sentence: what makes you think this is the origin.

ENTRY — ${item.label}
Title / headline: ${item.title}
${item.named_origin ? `The entry already names this origin: ${item.named_origin}` : 'The entry names no origin.'}
Existing advisory note: ${item.assessment || '(none)'}`,
          response_json_schema: {
            type: 'object',
            properties: {
              found: { type: 'boolean' },
              url: { type: 'string' },
              who: { type: 'string', description: 'The body or person that published it, if found.' },
              why: { type: 'string', description: 'One sentence on why this is the origin.' },
            },
            required: ['found', 'why'],
          },
        });
        item.candidate_url = found?.found && found?.url ? found.url : '';
        item.candidate_who = found?.who || '';
        item.candidate_why = found?.why || '';
      } catch (e: any) {
        // A research failure never blocks the sweep: the entry is still listed as missing
        // its origin, which is the part that matters.
        console.error('climateSweepSources research failed:', item.id, e.message);
        item.candidate_url = '';
        item.candidate_why = 'Could not be researched automatically — check by hand.';
      }
    }

    // 3. Only on a person's say-so: hold them back until they carry a source.
    let held = 0;
    if (apply) {
      for (const item of missing) {
        const note = item.candidate_url
          ? `[PROVENANCE SWEEP] On the record with no source link. Machine found a candidate origin to confirm — ${item.candidate_url}${item.candidate_who ? ` (${item.candidate_who})` : ''}. ${item.candidate_why}`
          : '[PROVENANCE SWEEP] On the record with no source link, and the machine could not find one. It needs a source or it stays off the record.';
        try {
          await base44.entities[item.entity].update(item.id, {
            status: 'draft',
            flagged: true,
            ai_assessment: `${item.assessment ? `${item.assessment} · ` : ''}${note}`,
          });
          held++;
        } catch (e: any) {
          console.error('climateSweepSources hold failed:', item.id, e.message);
        }
      }
    }

    return Response.json({
      applied: apply,
      missing_total: missing.length,
      researched: toResearch.length,
      held,
      remaining: Math.max(0, missing.length - RESEARCH_LIMIT),
      entries: missing.map((i) => ({
        entity: i.entity,
        label: i.label,
        id: i.id,
        title: i.title,
        named_origin: i.named_origin,
        candidate_url: i.candidate_url || '',
        candidate_who: i.candidate_who || '',
        candidate_why: i.candidate_why || '',
      })),
    });
  } catch (error: any) {
    console.error('climateSweepSources error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}