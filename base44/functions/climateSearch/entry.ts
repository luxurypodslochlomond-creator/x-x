import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// CLIMATE RECORD SEARCH — one query, every kind of entry the record holds.
// Public (no login required). Words are ANDed, so "seagrass scotland" finds entries
// holding both. The search reads the record through the same rule as the record's own
// pages (row-level security), so nothing held back for a human check can leak out here.
// If a reader's words find nothing and they are not searching in English, the query is
// translated once and tried again — no one is left outside because of their tongue.

// What a search reads. The origin is in here on purpose: a panel checking a body's work
// should be able to type that body's name and see every entry resting on it.
const FIELDS = {
  ClimateSolution: ['title', 'summary', 'details', 'category', 'region_rough', 'country', 'source_name'],
  ClimateAction: ['title', 'description', 'action_type', 'region_rough', 'country', 'source_url'],
  ClimateGroup: ['name', 'topic', 'region', 'description'],
  ClimateNews: ['headline', 'what_changed', 'replicable', 'source_name', 'where_label', 'country', 'category'],
};

// A query is words, not a pattern. Anything that could break a search pattern is
// dropped rather than escaped, so a stray bracket can never make the record unsearchable.
const toWords = (s) =>
  [
    ...new Set(
      String(s || '')
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '').trim())
        .filter((w) => w.length > 1)
    ),
  ].slice(0, 6);

const andAll = (entity, words) => ({
  $and: words.map((w) => ({
    $or: FIELDS[entity].map((f) => ({ [f]: { $regex: w, $options: 'i' } })),
  })),
});

const searchAll = async (base44, words) => {
  const [sol, act, grp, news] = await Promise.all([
    base44.entities.ClimateSolution.filter(andAll('ClimateSolution', words), { limit: 12, sort: '-created_date' }),
    base44.entities.ClimateAction.filter(andAll('ClimateAction', words), { limit: 12, sort: '-created_date' }),
    base44.entities.ClimateGroup.filter(andAll('ClimateGroup', words), { limit: 12, sort: '-created_date' }),
    base44.entities.ClimateNews.filter(andAll('ClimateNews', words), { limit: 12, sort: '-created_date' }),
  ]);
  return {
    sol: sol.items || [],
    act: act.items || [],
    grp: grp.items || [],
    news: news.items || [],
  };
};

const shapeSolution = (i) => ({
  id: i.id,
  entry_type: i.entry_type,
  title: i.title,
  summary: i.summary,
  category: i.category,
  region: i.region_rough,
  country: i.country,
  source_name: i.source_name,
});

const shapeAction = (i) => ({
  id: i.id,
  title: i.title,
  description: i.description,
  action_type: i.action_type,
  region: i.region_rough,
  country: i.country,
  contact_link: i.contact_link,
  date: i.date,
});

const shapeGroup = (i) => ({
  id: i.id,
  name: i.name,
  topic: i.topic,
  region: i.region,
  description: i.description,
  contact_email: i.contact_email,
});

const shapeWire = (i) => ({
  id: i.id,
  headline: i.headline,
  what_changed: i.what_changed,
  when_label: i.when_label,
  where_label: i.where_label,
  source_name: i.source_name,
  source_url: i.source_url,
  verification: i.verification,
});

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const { q, lang } = await req.json();

    const query = String(q || '').trim().slice(0, 140);
    const words = toWords(query);
    if (words.length === 0) {
      return Response.json({ error: 'Type or say a few words to search the record.' }, { status: 400 });
    }

    let found = await searchAll(base44, words);
    let total = found.sol.length + found.act.length + found.grp.length + found.news.length;
    let translatedFrom = null;
    let searched = words.join(' ');

    // Nothing in the reader's own words. If those words are not English, the entries
    // themselves may simply not be written in their tongue yet — so try once in English
    // rather than answering "nothing here".
    if (total === 0 && lang && !String(lang).toLowerCase().startsWith('en')) {
      try {
        const english = await base44.asServiceRole.integrations.Core.InvokeLLM({
          model: 'gemini_3_flash',
          prompt: `Translate this search query into plain English. Keep it a short search query, not a sentence. Return only the translation.\n\nQUERY: ${query}`,
          response_json_schema: {
            type: 'object',
            properties: { english: { type: 'string' } },
            required: ['english'],
          },
        });
        const enWords = toWords(english && english.english);
        if (enWords.length > 0) {
          const second = await searchAll(base44, enWords);
          const secondTotal = second.sol.length + second.act.length + second.grp.length + second.news.length;
          if (secondTotal > 0) {
            found = second;
            total = secondTotal;
            translatedFrom = english.english;
            searched = enWords.join(' ');
          }
        }
      } catch (e) {
        console.error('climateSearch translate step failed:', e.message);
      }
    }

    return Response.json({
      query,
      searched,
      translatedFrom,
      total,
      results: {
        solutions: found.sol.filter((i) => i.entry_type !== 'climate_crisis').map(shapeSolution),
        crises: found.sol.filter((i) => i.entry_type === 'climate_crisis').map(shapeSolution),
        actions: found.act.map(shapeAction),
        gatherings: found.grp.map(shapeGroup),
        wire: found.news.map(shapeWire),
      },
    });
  } catch (error) {
    console.error('climateSearch error:', error.message);
    return Response.json({ error: 'The record could not be searched just now. Please try again.' }, { status: 500 });
  }
}