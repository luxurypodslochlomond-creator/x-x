import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { toWords, searchRecord, searchRecordAny, scoreMatches } from '../../shared/climateRecordRead.ts';
import { matchRecordPages } from '../../shared/climateRecordAbout.ts';

// ALETHEIA — the record answering for itself. Public, no login.
//
// It reads ONLY what is on the record: its sourced entries and its own pages. It has no
// access to the open web, and it never dresses outside knowledge as a record finding.
//
// Every claim it gives back IS an entry on the record — that entry's own words, with the
// origin that entry carries, labelled by the entry's own label rather than by an opinion
// about it. Nothing is paraphrased and nothing is added. Where the record holds nothing,
// it says exactly that instead of answering from the model's own memory: the whole value
// of this record to a research panel is that it never says more than it holds.

interface Claim {
  text: string;
  confidence: 'high' | 'medium' | 'low';
  source_name: string;
  source_url: string;
  source_date: string;
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { question } = await req.json();

    if (!question || typeof question !== 'string' || question.trim().length < 2) {
      return Response.json({ error: 'A question is required.' }, { status: 400 });
    }

    const cleanQuestion = question.trim().slice(0, 500);
    const words = toWords(cleanQuestion);

    let found = words.length > 0
      ? await searchRecord(base44, words, 6)
      : { solutions: [], actions: [], gatherings: [], news: [] };

    // Nothing on the record held every word of the question. Rather than answering "the
    // record holds nothing" about seagrass because the word "happening" appears in no entry,
    // the record is read again on any of the words — and each entry offered had to hold at
    // least half of them. The answer then says so, rather than pretending to precision.
    const countAll = (f: any) => f.news.length + f.solutions.length + f.actions.length + f.gatherings.length;
    let loose = false;
    if (words.length > 1 && countAll(found) === 0) {
      const any = await searchRecordAny(base44, words, 24);
      const scored = {
        solutions: scoreMatches(any.solutions, 'ClimateSolution', words),
        actions: scoreMatches(any.actions, 'ClimateAction', words),
        gatherings: scoreMatches(any.gatherings, 'ClimateGroup', words),
        news: scoreMatches(any.news, 'ClimateNews', words),
      };
      if (countAll(scored) > 0) {
        found = scored;
        loose = true;
      }
    }

    // The record's own pages — so "who built this", "who is the founder", "how is it made"
    // are answered from the record itself. Kept in their own lane, never among the claims.
    const pages = words.length > 0 ? matchRecordPages(words) : [];

    // ── THE CLAIMS ARE THE ENTRIES ──
    // Each one is an entry, in its own words, with its own origin. The label comes from the
    // record's own ladder: official record → high, corroborated → medium, single source or
    // no outside origin → low. An entry with no outside origin says so, in the open.
    const claims: Claim[] = [
      ...found.news.map((i: any) => ({
        text: `${i.headline}: ${i.what_changed || ''}`.trim(),
        confidence: (i.verification === 'official_record' ? 'high' : i.verification === 'corroborated' ? 'medium' : 'low') as Claim['confidence'],
        source_name: i.source_name || 'On the record — no origin given',
        source_url: i.source_url || `/ClimateWireEntry/${i.id}`,
        source_date: i.when_label || '',
      })),
      ...found.solutions.map((i: any) => ({
        text: `${i.title}: ${i.summary || ''}`.trim(),
        confidence: (i.verification === 'official_record' ? 'high' : i.verification === 'corroborated' ? 'medium' : 'low') as Claim['confidence'],
        source_name: i.source_name || 'On the record — no outside origin given',
        source_url: i.source_url || `/ClimateDetail/${i.entry_type}/${i.id}`,
        source_date: '',
      })),
      ...found.actions.map((i: any) => ({
        text: `${i.title}: ${i.description || ''}`.trim(),
        confidence: (i.verification === 'official_record' ? 'high' : i.verification === 'corroborated' ? 'medium' : 'low') as Claim['confidence'],
        source_name: 'An action on the record',
        source_url: i.source_url || `/ClimateDetail/action/${i.id}`,
        source_date: i.date ? String(i.date).slice(0, 10) : '',
      })),
      ...found.gatherings.map((i: any) => ({
        text: `${i.name} — ${i.topic || ''}: ${i.description || ''}`.trim(),
        confidence: 'low' as Claim['confidence'],
        source_name: 'A gathering on the record',
        source_url: '/TogetherChangeClimate',
        source_date: '',
      })),
    ];

    const total = found.news.length + found.solutions.length + found.actions.length + found.gatherings.length;
    const shown = claims.slice(0, 6);

    const material = [
      ...found.news.map((i: any) => `[Wire · ${i.source_name || 'no origin given'}${i.when_label ? ` · ${i.when_label}` : ''}] ${i.headline} — ${i.what_changed || ''}`),
      ...found.solutions.map((i: any) => `[${i.entry_type === 'climate_crisis' ? 'Climate crisis' : 'Solution'}${i.source_name ? ` · ${i.source_name}` : ' · no outside origin given'}] ${i.title} — ${i.summary || ''}${i.region_rough ? ` (${i.region_rough})` : ''}`),
      ...found.actions.map((i: any) => `[Action · ${i.action_type || 'action'}] ${i.title} — ${i.description || ''}`),
      ...found.gatherings.map((i: any) => `[Gathering · ${i.topic || ''}] ${i.name} — ${i.description || ''}`),
    ];

    const langInstruction = `Detect the language of the question automatically and write the summary and the gaps in THAT language — Yoruba, Quechua, Welsh, Gaelic, Arabic, Hindi, Mandarin, Swahili, Tagalog, Vietnamese, Bengali, Amharic, and every other language a human might ask in. No one left out. If the question is in English, answer in English.`;

    const prompt = `You are ALETHEIA, the voice of a public record of climate emergencies and the solutions that work. You answer ONLY from what this record holds.

RULES (non-negotiable):
1. Use ONLY the material below. You have no access to the open web, and you must not add a single fact, figure, name, date, place or explanation that is not in it — not even one you are certain of. If it is not in the material, it does not exist for you.
2. The summary is 1–2 plain sentences saying what the record holds on this question. No advice, no opinion, no editorialising, no marketing.
3. In "gaps", say plainly and concretely what the record does NOT cover here, so a reader knows what is missing and can send it in. Never reassuring, never vague.
4. If the material is empty, say only that the record holds nothing on this question — in the question's language — and put the same in gaps. DO NOT answer the question yourself.
5. Never state more than the material supports. An entry that carries no outside origin must not be presented as verified.
6. ${langInstruction}

QUESTION:
${cleanQuestion}

ENTRIES ON THE RECORD (${total}):
${material.length ? material.join('\n') : '(the record holds no entries matching this question)'}

THE RECORD'S OWN PAGES ON ITSELF (${pages.length}):
${pages.length ? pages.map((p) => `[${p.label}] ${p.title} — ${p.line}`).join('\n') : '(none matched)'}

Return ONLY the JSON object matching the schema.`;

    const written = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: false,
      response_json_schema: {
        type: 'object',
        properties: {
          summary: { type: 'string', description: 'What the record holds on this question, in the question language.' },
          gaps: { type: 'string', description: 'What the record does not cover here. Concrete and honest.' },
        },
        required: ['summary', 'gaps'],
      },
    });

    const confidence_overall = shown.length === 0
      ? 'low'
      : shown.every((c) => c.confidence === 'high')
        ? 'high'
        : shown.some((c) => c.confidence === 'low')
          ? 'low'
          : 'medium';

    const overflow = total > shown.length
      ? ` The record holds ${total} entries on this question; the ${shown.length} closest are shown here.`
      : '';

    return Response.json({
      result: {
        summary: written?.summary || 'The record holds nothing on that yet.',
        claims: shown,
        confidence_overall,
        gaps: `${written?.gaps || ''}${loose ? ' No entry on the record held every word of the question: the entries shown match part of it.' : ''}${overflow}`.trim(),
      },
      pages: pages.map(({ path, label, title, line }) => ({ path, label, title, line })),
    });
  } catch (error: any) {
    console.error('aletheiaQuery error:', error.message);
    return Response.json({ error: 'The record could not be read just now. Please try again.' }, { status: 500 });
  }
}