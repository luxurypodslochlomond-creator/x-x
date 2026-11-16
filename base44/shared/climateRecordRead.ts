// ── READING THE RECORD ───────────────────────────────────────────────────────────
//
// One way to read the record, shared by everything that reads it: the record's search,
// and the record's own answering engine. They must see exactly the same entries, under
// exactly the same rule of access (row-level security), or they would disagree about what
// the record holds — and a record that disagrees with itself is worth nothing to a panel.

// Every word an entry carries, not only the headline: a photographer's name, a second
// source named beside the first, the person who signed it, the correction that was made in
// daylight. A reader who types any of those should land on the entry, because on this record
// they are part of what the entry says.
export const FIELDS: Record<string, string[]> = {
  ClimateSolution: ['title', 'summary', 'details', 'category', 'subcategory', 'region_rough', 'country', 'source_name', 'source_url', 'source_author', 'image_credit', 'corroborating_source', 'editor', 'correction_note'],
  ClimateAction: ['title', 'description', 'action_type', 'region_rough', 'country', 'source_url', 'category', 'corroborating_source', 'editor', 'correction_note'],
  ClimateGroup: ['name', 'topic', 'region', 'description'],
  ClimateNews: ['headline', 'what_changed', 'replicable', 'source_name', 'source_url', 'source_author', 'publisher_type', 'where_label', 'country', 'category', 'image_credit', 'corroborating_source', 'editor', 'correction_note'],
  // The music and the drawings. A track is searchable by the words of the song as well as
  // its title, and a set by its tracklist, because those are the words the giver gave.
  ClimateTrack: ['title', 'artist_name', 'statement', 'lyric', 'tracklist', 'kind', 'spec'],
  ClimateCartoon: ['title', 'artist_name', 'origin', 'for_line', 'credit'],
};

// Words that carry no meaning on their own. Dropped before the cap, so a question asked in
// plain speech keeps the words that matter: "who built this and how do I cite it" searches
// on "built" and "cite" instead of spending its whole allowance on "who, built, this, and,
// how, do" and losing the end of the sentence. A query made only of those words is used as
// typed, rather than answering that nothing was given.
export const STOP = new Set([
  'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'is', 'are', 'was', 'were',
  'be', 'been', 'do', 'does', 'did', 'who', 'whose', 'what', 'when', 'where', 'how', 'that',
  'this', 'these', 'those', 'it', 'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'can',
  'could', 'should', 'would', 'about', 'from', 'by', 'at', 'as', 'so', 'if', 'then', 'than',
]);

// A query is words, not a pattern. Anything that could break a search pattern is dropped
// rather than escaped, so a stray bracket can never make the record unsearchable.
const clean = (s: unknown): string[] => [
  ...new Set(
    String(s || '')
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '').trim())
      .filter((w) => w.length > 1)
  ),
];

export const toWords = (s: unknown): string[] => {
  const all = clean(s);
  const meaningful = all.filter((w) => !STOP.has(w));
  return (meaningful.length > 0 ? meaningful : all).slice(0, 8);
};

export const andAll = (entity: string, words: string[]) => ({
  $and: words.map((w) => ({
    $or: FIELDS[entity].map((f) => ({ [f]: { $regex: w, $options: 'i' } })),
  })),
});

export interface RecordMatches {
  solutions: any[];
  actions: any[];
  gatherings: any[];
  news: any[];
}

// Every word must be present (AND), so "seagrass scotland" finds entries holding both.
export const searchRecord = async (base44: any, words: string[], limit = 12): Promise<RecordMatches> => {
  const [solutions, actions, gatherings, news] = await Promise.all([
    base44.entities.ClimateSolution.filter(andAll('ClimateSolution', words), { limit, sort: '-created_date' }),
    base44.entities.ClimateAction.filter(andAll('ClimateAction', words), { limit, sort: '-created_date' }),
    base44.entities.ClimateGroup.filter(andAll('ClimateGroup', words), { limit, sort: '-created_date' }),
    base44.entities.ClimateNews.filter(andAll('ClimateNews', words), { limit, sort: '-created_date' }),
  ]);
  return {
    solutions: solutions.items || [],
    actions: actions.items || [],
    gatherings: gatherings.items || [],
    news: news.items || [],
  };
};

// The second way to read the record: any of the words, not all of them. A question asked in
// plain speech ("what is happening to seagrass meadows?") must not come back empty because
// one of its words — "happening" — appears in no entry. This is only used when nothing held
// every word, and whoever asked is always told that this is what happened.
export const anyOf = (entity: string, words: string[]) => ({
  $or: words.flatMap((w) => FIELDS[entity].map((f) => ({ [f]: { $regex: w, $options: 'i' } }))),
});

export const searchRecordAny = async (base44: any, words: string[], limit = 24): Promise<RecordMatches> => {
  const [solutions, actions, gatherings, news] = await Promise.all([
    base44.entities.ClimateSolution.filter(anyOf('ClimateSolution', words), { limit, sort: '-created_date' }),
    base44.entities.ClimateAction.filter(anyOf('ClimateAction', words), { limit, sort: '-created_date' }),
    base44.entities.ClimateGroup.filter(anyOf('ClimateGroup', words), { limit, sort: '-created_date' }),
    base44.entities.ClimateNews.filter(anyOf('ClimateNews', words), { limit, sort: '-created_date' }),
  ]);
  return {
    solutions: solutions.items || [],
    actions: actions.items || [],
    gatherings: gatherings.items || [],
    news: news.items || [],
  };
};

// How much of the question an entry actually answers. An entry must hold at least half of
// the words that carry meaning — and at least one — to be offered as a partial match. The
// rest are left out rather than padded in, because a record that pads its own answers is
// exactly the thing this record exists not to be.
export const scoreMatches = (items: any[], entity: string, words: string[]): any[] => {
  const need = Math.max(1, Math.ceil(words.length / 2));
  return items
    .map((item) => ({
      item,
      hits: words.filter((w) => FIELDS[entity].some((f) => String(item[f] ?? '').toLowerCase().includes(w))).length,
    }))
    .filter((s) => s.hits >= need)
    .sort((a, b) => b.hits - a.hits)
    .map((s) => s.item);
};