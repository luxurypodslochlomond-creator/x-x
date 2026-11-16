import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { toWords, searchRecord, searchRecordAny, scoreMatches, andAll, anyOf } from '../../shared/climateRecordRead.ts';
import { matchRecordPages } from '../../shared/climateRecordAbout.ts';

// CLIMATE RECORD SEARCH — one query, every kind of entry the record holds.
// Public (no login required). Words are ANDed, so "seagrass scotland" finds entries
// holding both. The search reads the record through the same rule as the record's own
// pages (row-level security), so nothing held back for a human check can leak out here.
// If a reader's words find nothing and they are not searching in English, the query is
// translated once and tried again — no one is left outside because of their tongue.

// What a search reads. The origin is in here on purpose: a panel checking a body's work
// should be able to type that body's name and see every entry resting on it.
// Reading the record — which fields are searched, and how a query becomes words — lives in
// one shared module, so the search and the record's own answering engine can never disagree
// about what the record holds.
const searchAll = (base44: any, words: string[]) => searchRecord(base44, words, 12);

const countEntries = (f: any) => f.solutions.length + f.actions.length + f.gatherings.length + f.news.length;
const countRooms = (r: any) => r.tracks.length + r.cartoons.length + r.people.length;

const shapeTrack = (i: any) => ({
  id: i.id,
  title: i.title,
  artist_name: i.artist_name,
  kind: i.kind || 'other',
  spec: i.spec || '',
});

const shapeCartoon = (i: any) => ({
  id: i.id,
  title: i.title || '',
  artist_name: i.artist_name,
  origin: i.origin || '',
  for_line: i.for_line || '',
});

// ── THE ROLL ────────────────────────────────────────────────────────────────────
// The only people a reader may ever find by name are the ones who wrote a line for
// themselves. The guest list is closed, so this is read with the service role and then
// narrowed to the two things that are already public — a name, and that person's own
// words. No address leaves this function. A keeper who has not written a line is not
// findable at any price, which is why a search for their name can honestly come back
// with nothing: the record will not hand out who works here.
const readRoll = async (base44: any, words: string[], anyOfWords: boolean) => {
  const page = await base44.asServiceRole.entities.ClimateChecker.list('-created_date', 200);
  const rows = page.items || page || [];
  const holdsWords = (hay: string) =>
    anyOfWords ? words.some((w) => hay.includes(w)) : words.every((w) => hay.includes(w));
  return rows
    .filter((r: any) => r.active !== false && String(r.public_line || '').trim())
    .filter((r: any) => holdsWords(`${r.name || ''} ${r.public_line}`.toLowerCase()))
    .slice(0, 8)
    .map((r: any) => ({
      id: r.id,
      name: r.name || 'On the record’s roll',
      role: r.is_keeper ? 'keeper' : 'checker',
      line: String(r.public_line).trim(),
    }));
};

// Three rooms the shared reader does not cover: the music, the drawings, and the roll.
// Read under the same rule as every entry — every word must be held, or any of them when
// nothing held every word, and the reader is told which of the two happened.
const readRooms = async (base44: any, words: string[], anyOfWords: boolean, limit: number) => {
  const q = (entity: string) => (anyOfWords ? anyOf(entity, words) : andAll(entity, words));
  const [tracks, cartoons] = await Promise.all([
    base44.entities.ClimateTrack.filter(q('ClimateTrack'), { limit, sort: '-created_date' }),
    base44.entities.ClimateCartoon.filter(q('ClimateCartoon'), { limit, sort: '-created_date' }),
  ]);
  return {
    tracks: tracks.items || [],
    cartoons: cartoons.items || [],
    people: await readRoll(base44, words, anyOfWords),
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
    let rooms = await readRooms(base44, words, false, 8);
    let total = countEntries(found) + countRooms(rooms);

    // Nothing on the record held every word. A question asked in plain speech ("what is
    // happening to seagrass meadows") must not come back empty because one word — "happening"
    // — is in no entry, so the record is read again on any of the words. Each entry offered
    // had to hold at least half of them, and the reader is told plainly that this is what
    // happened rather than being handed a silent approximation.
    let loose = false;
    if (words.length > 1 && total === 0) {
      const any = await searchRecordAny(base44, words, 24);
      const scored = {
        solutions: scoreMatches(any.solutions, 'ClimateSolution', words),
        actions: scoreMatches(any.actions, 'ClimateAction', words),
        gatherings: scoreMatches(any.gatherings, 'ClimateGroup', words),
        news: scoreMatches(any.news, 'ClimateNews', words),
      };
      const scoredRooms = await readRooms(base44, words, true, 8);
      const scoredTotal = countEntries(scored) + countRooms(scoredRooms);
      if (scoredTotal > 0) {
        found = scored;
        rooms = scoredRooms;
        total = scoredTotal;
        loose = true;
      }
    }
    let translatedFrom = null;
    let searched = words.join(' ');
    let usedWords = words;

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
          const secondRooms = await readRooms(base44, enWords, false, 8);
          const secondTotal = countEntries(second) + countRooms(secondRooms);
          if (secondTotal > 0) {
            found = second;
            rooms = secondRooms;
            total = secondTotal;
            translatedFrom = english.english;
            searched = enWords.join(' ');
            usedWords = enWords;
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
      loose,
      // The record's own pages, answering for the record itself — who is behind it, who
      // built it, how it is made, how to cite it. Kept apart from the sourced entries on
      // purpose: a page about the record is not evidence of anything on it.
      about: matchRecordPages(usedWords).map(({ path, label, title, line }) => ({ path, label, title, line })),
      results: {
        solutions: found.solutions.filter((i) => i.entry_type !== 'climate_crisis').map(shapeSolution),
        crises: found.solutions.filter((i) => i.entry_type === 'climate_crisis').map(shapeSolution),
        actions: found.actions.map(shapeAction),
        gatherings: found.gatherings.map(shapeGroup),
        wire: found.news.map(shapeWire),
        // A person on the roll, a piece of music given to the record, a drawing on its wall.
        // Each carries only what is already public — never an address, never a guest list.
        people: rooms.people,
        tracks: rooms.tracks.map(shapeTrack),
        cartoons: rooms.cartoons.map(shapeCartoon),
      },
    });
  } catch (error) {
    console.error('climateSearch error:', error.message);
    return Response.json({ error: 'The record could not be searched just now. Please try again.' }, { status: 500 });
  }
}