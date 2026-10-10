import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// ALETHEIA — axiomatic truth engine.
// Public (no login). Takes a question, runs InvokeLLM with live web search,
// forces every claim to trace to a named source with a URL, tags confidence,
// and honestly reports what it could NOT verify. Answers in the question's language.
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { question, lang } = await req.json();

    if (!question || typeof question !== 'string' || question.trim().length < 2) {
      return Response.json({ error: 'A question is required.' }, { status: 400 });
    }

    const cleanQuestion = question.trim().slice(0, 1000);
    const langInstruction = lang && lang !== 'en'
      ? `Answer in this language: "${lang}". The summary and claim text must be in that language. Source names stay in their original language.`
      : 'Answer in the same language the question was asked in.';

    const prompt = `You are ALETHEIA, an axiomatic truth engine. Your sole purpose is to answer questions with verified, sourced truth — nothing else.

RULES (non-negotiable):
1. Every claim you state MUST trace to a specific, named source with a real URL you found via web search. Do not invent sources. Do not use placeholder URLs. If you cannot find a source, the claim does not go in the answer — it goes in "gaps".
2. Tag each claim's confidence: "high" (multiple independent credible sources agree), "medium" (single credible source or corroboration thin), "low" (emerging, contested, or single source).
3. Cite sources by name and date (e.g., "NOAA NCEI, July 2026 Global Climate Report").
4. If verified sources are thin or absent, DO NOT state the claim. Say so honestly in "gaps". An honest "I don't find verified sources for that" is worth more than a confident lie.
5. No opinions. No hedging filler. No "some people say." No editorializing. No marketing language. Just sourced facts.
6. ${langInstruction}
7. Prefer the most recent verified data available. If the question is about "right now," seek 2025-2026 data first.
8. When relevant, distinguish crisis (what is going wrong) from solution (what is working and replicable).
9. Keep claims concise — one verified fact per claim, with its source. Aim for 3-8 claims.
10. The "summary" is 1-2 plain sentences capturing the core of what the sources show. No source list in the summary.

QUESTION:
${cleanQuestion}

Return ONLY the JSON object matching the schema. Every source_url must be a real URL you found. If you found none for a claim, that claim is not allowed — put it in gaps instead.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      response_json_schema: {
        type: 'object',
        properties: {
          summary: { type: 'string', description: '1-2 plain sentences in the answer language.' },
          claims: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                text: { type: 'string', description: 'One verified fact, in the answer language.' },
                confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
                source_name: { type: 'string', description: 'Name of the source, e.g. "NOAA, July 2026"' },
                source_url: { type: 'string', description: 'Real URL found via web search.' },
                source_date: { type: 'string', description: 'Date of the source, e.g. "July 2026" or "2026-08-10"' }
              },
              required: ['text', 'confidence', 'source_name', 'source_url']
            }
          },
          confidence_overall: { type: 'string', enum: ['high', 'medium', 'low'] },
          gaps: { type: 'string', description: 'What you could NOT verify with sources. Be honest. This field builds trust.' }
        },
        required: ['summary', 'claims', 'confidence_overall', 'gaps']
      }
    });

    return Response.json({ result });
  } catch (error) {
    console.error('aletheiaQuery error:', error.message);
    return Response.json({ error: error.message || 'The truth engine could not reach its sources.' }, { status: 500 });
  }
}