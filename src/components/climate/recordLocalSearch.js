import { base44 } from '@/api/base44Client';

// ── THE INDEX THAT CANNOT BE SWITCHED OFF ───────────────────────────────────────
// Brian, 17 November: "make it unable to be broken by any developer, any device
// denial or any intelligence attached." BASE 1 usually reads the record through its
// own function. If that function cannot be reached — a phone that refuses the call,
// a network that eats it, a service having a bad afternoon — the reader's own device
// reads the published record instead, straight from the same tables every page is
// printed from. Same entries, same origins, no outside intelligence involved: the
// record answers for itself, in a browser, with nothing between it and the reader.

const words = (q) =>
  String(q || '')
    .toLowerCase()
    .split(/[^\p{L}\p{N}']+/u)
    .filter((w) => w.length > 1)
    .slice(0, 6);

const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const orFields = (fields, ws) => ws.flatMap((w) => fields.map((f) => ({ [f]: { $regex: esc(w), $options: 'i' } })));

const rows = async (entity, fields, ws) => {
  const page = await entity.filter({ status: 'published', $or: orFields(fields, ws) }, { limit: 25 });
  return page?.items || [];
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

const shapeTrack = (i) => ({
  id: i.id,
  title: i.title,
  artist_name: i.artist_name,
  kind: i.kind || 'other',
  spec: i.spec || '',
});

const shapeCartoon = (i) => ({
  id: i.id,
  title: i.title || '',
  artist_name: i.artist_name,
  origin: i.origin || '',
  for_line: i.for_line || '',
});

const empty = () => ({
  solutions: [], crises: [], actions: [], gatherings: [], wire: [],
  people: [], tracks: [], cartoons: [], photos: [], comments: [],
});

export default async function searchOnDevice(q) {
  const ws = words(q);
  if (ws.length === 0) {
    return { query: String(q || ''), total: 0, local: true, loose: false, about: [], results: empty() };
  }

  const [solutions, actions, news, groups, tracks, cartoons] = await Promise.all([
    rows(base44.entities.ClimateSolution, ['title', 'summary', 'details'], ws),
    rows(base44.entities.ClimateAction, ['title', 'description'], ws),
    rows(base44.entities.ClimateNews, ['headline', 'what_changed'], ws),
    rows(base44.entities.ClimateGroup, ['name', 'topic', 'description'], ws),
    rows(base44.entities.ClimateTrack, ['title', 'artist_name', 'statement'], ws),
    rows(base44.entities.ClimateCartoon, ['title', 'artist_name', 'for_line'], ws),
  ]);

  const shaped = {
    solutions: solutions.filter((i) => i.entry_type !== 'climate_crisis').map(shapeSolution),
    crises: solutions.filter((i) => i.entry_type === 'climate_crisis').map(shapeSolution),
    actions: actions.map(shapeAction),
    gatherings: groups.map(shapeGroup),
    wire: news.map(shapeWire),
    people: [],
    tracks: tracks.map(shapeTrack),
    cartoons: cartoons.map(shapeCartoon),
    photos: [],
    comments: [],
  };

  const total = Object.values(shaped).reduce((n, list) => n + list.length, 0);

  return {
    query: String(q || ''),
    searched: ws.join(' '),
    total,
    local: true,
    // A device search matches on the words it was given; when there is more than one
    // it says so plainly rather than pretending every word was held by every entry.
    loose: ws.length > 1,
    translatedFrom: null,
    about: [],
    results: shaped,
  };
}