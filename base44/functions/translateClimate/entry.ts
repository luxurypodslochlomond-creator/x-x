import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// ── A TONGUE OF THE RECORD IS MADE ONCE ──
// The record's words are finite: the same copy, read by everyone. So a tongue is never made
// in front of each reader — it is made once, kept, and handed out after that. A lookup, not
// a wait. The first reader of a tongue that has never been made pays for it, and pays less
// than before, because the words are asked for in a few pieces at the SAME time rather than
// one long list after another. Every reader after that — any device, anywhere, no matter who
// made it first — gets the whole tongue in a moment.
//
// A tongue only ever grows by the words it is actually missing, so a word is never
// translated twice, and a page can never mix two tongues: what comes back is one tongue.
//
// Public app, no login required: this is the record's own published copy, read by anyone.

const CHUNK = 45;    // words per ask: long enough to keep the voice, short enough to return fast
const AT_ONCE = 4;   // pieces asked for at the same time

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const { lang, strings } = await req.json();

    if (!lang || lang === 'en' || !strings || typeof strings !== 'object') {
      return Response.json({ translations: strings || {}, kept: 0, made: 0 });
    }

    // An ancient script is refused at the door, not invented. Nobody alive can check a
    // machine's wording in it, so anything produced would be a guess published as fact.
    // Refused here as well as in the reader's own language box, because a call can arrive
    // without going through it. The reader keeps English; nothing false reaches the page.
    if (isRefusedScript(String(lang))) {
      console.log('refused an ancient script:', lang);
      return Response.json({ translations: null, refused: true }, { status: 200 });
    }

    const asked = Object.values(strings).filter(s => typeof s === 'string' && s.trim());
    if (!asked.length) return Response.json({ translations: strings, kept: 0, made: 0 });

    // 1. The tongue we already hold — words made for anyone are held for everyone.
    const held = await holdTongue(base44, lang);
    const tongue = { ...((held && held.dict) || {}) };

    // 2. Only what this tongue is missing is asked for.
    const missing = [...new Set(asked)].filter(w => !tongue[w]);
    let made = 0;
    if (missing.length) {
      const fresh = await makeWords(base44, missing, lang);
      const added = Object.keys(fresh).length;
      if (added) {
        Object.assign(tongue, fresh);
        made = added;
        await keepTongue(base44, held, lang, tongue);
      }
    }

    // 3. The whole tongue, handed back keyed the way it was asked for.
    const translations = {};
    for (const [key, word] of Object.entries(strings)) {
      translations[key] = (typeof word === 'string' && tongue[word]) || word;
    }

    return Response.json({ translations, kept: Object.keys(tongue).length, made });
  } catch (error) {
    console.error('translateClimate error:', error && error.message ? error.message : error);
    return Response.json({ translations: null, error: String((error && error.message) || error) }, { status: 200 });
  }
}

// ── SCRIPTS THE RECORD WILL NOT PUT A MACHINE'S WORDS INTO ──
// The scripts below have no living community writing them, so a machine's wording in them
// cannot be checked by anyone. A real inscription is still welcome on the record as a quoted
// line, with its published reading and its source named beside it. Kept in step with the
// reader's own language box (src/components/climate/ancientScripts.js).
const REFUSED_SCRIPTS = [
  'hieroglyph', 'hieratic', 'egyptian demotic', 'ancient egyptian', 'middle egyptian', 'old egyptian',
  'cuneiform', 'sumerian', 'akkadian', 'hittite', 'elamite',
  'linear a', 'linear b', 'rongorongo', 'proto-sinaitic', 'ugaritic', 'oracle bone',
  'maya glyph', 'mayan glyph', 'maya hieroglyph', 'mayan hieroglyph', 'maya script', 'mayan script',
];

function isRefusedScript(lang) {
  const asked = lang.toLowerCase();
  return REFUSED_SCRIPTS.some(term => asked.includes(term));
}

async function holdTongue(base44, lang) {
  try {
    const rows = await base44.asServiceRole.entities.ClimateTongue.filter({ lang });
    const list = Array.isArray(rows) ? rows : ((rows && rows.items) || []);
    return list[0] || null;
  } catch (error) {
    console.error('could not read the tongue:', error && error.message ? error.message : error);
    return null;
  }
}

async function keepTongue(base44, held, lang, dict) {
  try {
    // Two readers can reach a tongue that has never been made in the same moment — at scale they
    // will. So what is stored is read once more just before writing, and the words are merged
    // rather than replaced: what one reader made is never lost to another.
    const latest = await holdTongue(base44, lang);
    const row = latest || held;
    const merged = { ...((row && row.dict) || {}), ...(dict || {}) };
    const body = { dict: merged, words: Object.keys(merged).length, last_made: new Date().toISOString() };
    if (row && row.id) await base44.asServiceRole.entities.ClimateTongue.update(row.id, body);
    else await base44.asServiceRole.entities.ClimateTongue.create({ lang, ...body });
  } catch (error) {
    console.error('could not keep the tongue:', error && error.message ? error.message : error);
  }
}

// A whole page is asked for in pieces, all at once, so the wait is one piece long — not every
// piece one after another, which is what made a page arrive in two waves.
async function makeWords(base44, words, lang) {
  const pieces = [];
  for (let i = 0; i < words.length; i += CHUNK) pieces.push(words.slice(i, i + CHUNK));

  const out = {};
  for (let i = 0; i < pieces.length; i += AT_ONCE) {
    const answered = await Promise.all(pieces.slice(i, i + AT_ONCE).map(piece => askOnce(base44, piece, lang)));
    answered.forEach(piece => Object.assign(out, piece));
  }
  return out;
}

async function askOnce(base44, words, lang) {
  const payload = Object.fromEntries(words.map((w, i) => ['w' + i, w]));
  const prompt = `You are a precise, professional translator for a public climate-action record — "Together We Can Change Climate", built in honour of Horizon International. Translate every VALUE in this JSON object into ${lang} (this may be an ISO code like "fr" or a language name like "Yoruba" — work out the language from it). Keep the keys exactly the same. Keep punctuation, emoji, quotes, capitalisation style and brand names (Horizon International, UF51, SORTED, Roots & Shoots, Dr. Jane Goodall) unchanged. Tone: warm, clear, hopeful, plain. Return ONLY the JSON object.

JSON:
${JSON.stringify(payload)}`;

  try {
    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      model: 'gemini_3_8_flash',
      prompt,
      response_json_schema: {
        type: 'object',
        properties: Object.fromEntries(words.map((w, i) => ['w' + i, { type: 'string' }])),
      },
    });

    const out = {};
    words.forEach((w, i) => {
      const t = result && result['w' + i];
      if (typeof t === 'string' && t.trim()) out[w] = t.trim();
    });
    return out;
  } catch (error) {
    console.error('a piece of the tongue did not arrive:', error && error.message ? error.message : error);
    return {};
  }
}