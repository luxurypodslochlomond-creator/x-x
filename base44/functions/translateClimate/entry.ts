import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Translates a flat { key: string } map of UI strings into a target language.
// Public app (no login required) — returns translated map, or the source on failure.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { lang, strings } = await req.json();

    if (!lang || lang === 'en' || !strings || typeof strings !== 'object') {
      return Response.json({ translations: strings || {} });
    }

    const prompt = `You are a precise, professional UI translator for a public climate-action platform ("Together We Change Climate", built in honour of Horizon International). Translate every VALUE in this JSON object into the language indicated by: "${lang}" (this may be an ISO code like "fr" or a language name like "Yoruba" — figure out the language from it). Keep the keys exactly the same. Keep punctuation, emoji, quotes, and brand names (Horizon International, UF51) unchanged. Tone: warm, clear, hopeful, plain. Return ONLY the JSON object.

JSON:
${JSON.stringify(strings)}`;

    // A flash model: the words arrive in a fraction of the wait, which is what keeps a
    // page from sitting in English while the reader waits. Same result, far less pause.
    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      model: 'gemini_3_8_flash',
      prompt,
      response_json_schema: {
        type: 'object',
        additionalProperties: { type: 'string' },
        properties: Object.fromEntries(Object.keys(strings).map(k => [k, { type: 'string' }])),
      },
    });

    return Response.json({ translations: result });
  } catch (error) {
    console.error('translateClimate error:', error.message);
    return Response.json({ translations: null, error: error.message }, { status: 200 });
  }
}