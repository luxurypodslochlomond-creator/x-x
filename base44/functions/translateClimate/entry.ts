import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { RECORD_CHROME, chromeKey } from '../../shared/recordChrome.ts';

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

    // Every tongue is made, ancient scripts included. What a machine cannot check is said
    // out loud on the page instead of being quietly withheld: a reader is never left in
    // English because their script is old.

    const asked = Object.values(strings).filter(s => typeof s === 'string' && s.trim());
    if (!asked.length) return Response.json({ translations: strings, kept: 0, made: 0 });

    // 1. The tongue we already hold — words made for anyone are held for everyone.
    const held = await holdTongue(base44, lang);
    const tongue = { ...((held && held.dict) || {}) };

    // 2. Only what this tongue is missing is asked for — and the record's own frame is always
    // part of it. The nav, the footer and the masthead are read by everyone on every page, so
    // they are kept in every tongue whatever page a reader happened to arrive on: a tongue once
    // read was left without its footer for good, because a frame word is only ever asked for if
    // it happens to be on the page in front of that one reader. The frame goes in first, so a
    // long page can never push it off the end of what is asked for.
    // A frame word is held when the frame's own entry is held, even though the plain word it
    // stands for has been cleared away — otherwise every reader would pay to have it made again,
    // over and over, in a wording that may differ each time.
    const missing = [...new Set(asked)].filter(w => !tongue[w] && !tongue[chromeKey(w)]);
    const frameMissing = Object.keys(RECORD_CHROME).filter(w => !tongue[chromeKey(w)]);
    let made = 0;
    if (missing.length || frameMissing.length) {
      const fresh = await makeWords(base44, [...new Set([...frameMissing, ...missing])], lang);
      // A frame word is stored apart from the body's words, so a wording that reads wrong in a
      // tongue — a wire returned as an electrical cable — can be replaced without touching the
      // record's own copy.
      const shaped = {};
      for (const [word, translation] of Object.entries(fresh)) {
        if (RECORD_CHROME[word]) shaped[chromeKey(word)] = translation;
        else shaped[word] = translation;
      }
      const added = Object.keys(shaped).length;
      if (added) {
        Object.assign(tongue, shaped);
        made = added;
        await keepTongue(base44, held, lang, tongue);
      }
    }

    // 3. The whole tongue, handed back keyed the way it was asked for. A frame word is read from
    // the frame's own entry first, so what a reader is handed is the current wording.
    const translations = {};
    for (const [key, word] of Object.entries(strings)) {
      // The frame's own entry wins over any plain word left from before it was kept apart: what
      // is handed back is the wording the record stands behind now, not an older one.
      translations[key] = typeof word === 'string' ? (tongue[chromeKey(word)] || tongue[word] || null) : word;
    }

    const frame = Object.fromEntries(Object.keys(RECORD_CHROME).filter(word => tongue[chromeKey(word)]).map(word => [word, tongue[chromeKey(word)]]));
    const incomplete = asked.some(word => !tongue[chromeKey(word)] && !tongue[word]);
    return Response.json({ translations, frame, incomplete, kept: Object.keys(tongue).length, made });
  } catch (error) {
    console.error('translateClimate error:', error && error.message ? error.message : error);
    return Response.json({ translations: null, error: String((error && error.message) || error) }, { status: 200 });
  }
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
    // A frame word the tongue already held under its plain name is left where it is and simply
    // never read again: the frame's own entry is what is served, so nothing has to be pruned and
    // no reader is charged for a word the tongue could already stand behind.
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

// A word the model stumbled on must never cost the reader the rest of the page: whatever
// comes back missing is asked for again, half at a time, before the record gives up on it.
async function askOnce(base44, words, lang) {
  const first = await askModel(base44, words, lang);
  const missing = words.filter(w => !first[w]);
  if (!missing.length) return first;
  const out = { ...first };
  const cut = Math.ceil(missing.length / 2);
  for (const half of [missing.slice(0, cut), missing.slice(cut)]) {
    if (half.length) Object.assign(out, await askModel(base44, half, lang));
  }
  return out;
}

async function askModel(base44, words, lang) {
  const payload = Object.fromEntries(words.map((w, i) => ['w' + i, w]));

  // A frame word never stands alone: it is a name for a place on the record, and the reader
  // meets it in a bar with no sentence around it. So the thing it means travels with it, and the
  // model is told to take the noun sense a place is named with rather than guess at the word.
  const frame = words.filter(w => RECORD_CHROME[w]);
  const frameNote = frame.length
    ? `\n\nSome of these are the record's own frame — the words of its navigation bar, its footer and its masthead, read on every page with no sentence around them. Translate each one as the thing it means here, in the noun sense a place is named with, short and plain — never as the same word standing alone, and never as a verb:\n${frame.map(w => `- "${w}" — ${RECORD_CHROME[w]}`).join('\n')}`
    : '';

  // A tongue named in its own terms is taken as that tongue. The Anunnaki wrote in Sumerian,
  // Easter Island's glyphs are Rongorongo, so a reader who arrives with either word is given
  // the script they meant rather than a guess at a language that does not exist.
  const NAMED = {
    annunaki: 'Sumerian (cuneiform, the script of the Anunnaki inscriptions)',
    anunnaki: 'Sumerian (cuneiform, the script of the Anunnaki inscriptions)',
    'ancient sumerian': 'Sumerian (cuneiform)',
    rongorongo: 'Rongorongo, the glyph script of Rapa Nui (Easter Island)',
    'easter island': 'Rongorongo, the glyph script of Rapa Nui (Easter Island)',
    'easter island script': 'Rongorongo, the glyph script of Rapa Nui (Easter Island)',
    // ── THE CODES A MACHINE WILL GUESS WRONG IF LEFT ALONE ─────────────────────────
    // A bare code is not always enough. "sco" is Scots — the Germanic tongue of Lowland
    // Scotland — and a model handed those three letters will answer in Scottish Gaelic, which
    // is a different language written by different people, and the page would then be wrong in
    // a way that looks like care. So the ones with a lookalike neighbour are spelled out.
    sco: 'Scots, the Germanic tongue of Lowland Scotland, written in Scots. This is not Scottish Gaelic (gd) and must never be answered in Gaelic',
    gv: 'Manx Gaelic (Gaelg), the Celtic tongue of the Isle of Man',
    ku: 'Kurdish (Kurmanji), written in the Latin alphabet',
    zgh: 'Tamazight, the Berber tongue of North Africa (Tifinagh, Latin or Arabic script as the wording requires)',
    hmn: 'Hmong (White Hmong), written in the Latin alphabet',
    ak: 'Akan, including Twi and Fante',
    ee: 'Ewe (Eʋegbe)',
    st: 'Sesotho, the Sotho tongue of Lesotho and South Africa. Not Sesotho sa Leboa (Northern Sotho)',
    tn: 'Setswana, the Tswana tongue of Botswana and South Africa',
    ny: 'Chichewa (Nyanja)',
    om: 'Oromo (Afaan Oromoo)',
    ti: 'Tigrinya, written in the Geʽez script',
    rw: 'Kinyarwanda',
    ln: 'Lingala',
    bm: 'Bambara (Bamanankan)',
    mg: 'Malagasy, the tongue of Madagascar',
    se: 'Northern Sami (Davvisámegiella)',
    kl: 'Greenlandic (Kalaallisut)',
    fo: 'Faroese',
    fy: 'West Frisian (Frysk), the tongue of Friesland. Not Dutch and not German',
    nds: 'Low German (Plattdüütsch). Not High German',
    hsb: 'Upper Sorbian, a Slavic tongue of Saxony. Not German',
    dsb: 'Lower Sorbian, a Slavic tongue of Brandenburg. Not German',
    rue: 'Rusyn. Not Russian and not Ukrainian',
    csb: 'Kashubian, a West Slavic tongue of Pomerania. Not Polish',
    szl: 'Silesian (Ślōnskŏ), the Slavic tongue of Upper Silesia. Not Polish',
    ug: 'Uyghur, written in the Uyghur Arabic script',
    ht: 'Haitian Creole (Kreyòl ayisyen). Not French',
    ceb: 'Cebuano (Bisaya), the tongue of Cebu and the Visayas. Not Tagalog',
    su: 'Sundanese (Basa Sunda). Not Indonesian',
    bo: 'Tibetan, written in the Tibetan script',
    lo: 'Lao, written in the Lao script. Not Thai',
    ks: 'Kashmiri, written in the Perso-Arabic script',
    dv: 'Dhivehi, the tongue of the Maldives, written in Thaana',
  };
  // ── A GUESS IS NOT A TRANSLATION ───────────────────────────────────────────────
  // Brian, 20 November: "make sure we have all native tongues for all people, especially the
  // native tongues in nigeria bro". The list grew by fourteen tongues that day, and growing it
  // made an old silence louder. For a living tongue with little written material to check
  // against, a model will happily print a fluent sentence that no speaker of that tongue has
  // ever said — and this record would then be putting invented words into somebody's mother
  // tongue, on a page whose whole argument is that it does not make things up.
  //
  // Cherokee already carried the rule. These carry it too, and the rule is the plain one:
  // where the answer is not known, nothing comes back. The English word stands, the page shows
  // English, and a reader is never handed a confident guess dressed as their own language.
  // A tongue that is well documented is not on this list and is not slowed down by it.
  const THIN = new Set([
    // Nigeria, beyond the three the world usually lists
    'bin', 'fon', 'urh', 'ish', 'efi', 'ibb', 'anw', 'tiv', 'ijc', 'kau', 'fuv',
    'nup', 'igl', 'idu', 'bom',
    // and the other tongues on the record with little written material behind them
    'nv', 'lkt', 'ojb', 'hop', 'apw', 'moh', 'yua', 'nah', 'ay', 'qu', 'gn',
    'haw', 'sm', 'fj', 'to', 'tpi',
    // Russia's other nations, and the neighbours usually folded into one empire's language
    'tt', 'ce', 'ba', 'cv', 'sah', 'os', 'av', 'kk', 'uz', 'az', 'ky', 'tg', 'tk',
    // Yiddish drifts into German, Cantonese and Hokkien into Mandarin, if nobody says stop
    'yi', 'yue', 'nan',
    // The tongues added on 20 November, when the list reached 189: Europe's nations inside
    // nations, the seventh of the languages this island group recognises, and the smaller
    // tongues of Asia and Africa that a model will otherwise answer in the language of the
    // state next door. Every one of these is a tongue whose words are better left in English
    // than guessed at, so the rule is the same as everywhere above: no answer is an answer.
    'gv', 'fy', 'nds', 'hsb', 'dsb', 'rm', 'se', 'fo', 'kl', 'oc', 'sc', 'scn', 'co',
    'ast', 'an', 'csb', 'szl', 'rue', 'eo',
    'ug', 'ks', 'bho', 'mai', 'dv', 'hmn', 'lo', 'ceb', 'su',
    'om', 'ti', 'rw', 'ln', 'mg', 'bm', 'ak', 'ee', 'st', 'tn', 'ny', 'zgh', 'ht',
  ]);
  const thin = THIN.has(String(lang).trim().toLowerCase());
  const thinNote = thin
    ? '\n\nThis tongue has little written material to check against, so never invent a word and never substitute a lookalike from a related tongue. Return an empty string for any value you cannot translate with real confidence. An English word left standing is honest; a fluent guess in somebody\'s mother tongue is not.'
    : '';

  const named = NAMED[String(lang).trim().toLowerCase()];
  const target = /^(chr|cherokee|tsalagi|ᏣᎳᎩ)$/i.test(String(lang).trim())
    ? 'Cherokee (ᏣᎳᎩ, ISO 639-3 chr), written in the Cherokee syllabary, not Latin transliteration. Cherokee is a living language. Do not invent words: return an empty value for any wording you cannot translate reliably'
    : (named || lang);
  const prompt = `You are a precise, professional translator for a public climate-action record — "Together We Can Change Climate", built in honour of Horizon International. Translate every VALUE in this JSON object into ${target} (this may be an ISO code like "fr" or a language name like "Yoruba" — work out the language from it). Keep the keys exactly the same. Keep punctuation, emoji, quotes, capitalisation style and brand names (Horizon International, UF51, SORTED, Roots & Shoots, Dr. Jane Goodall) unchanged. Tone: warm, clear, hopeful, plain.${frameNote}${thinNote} Return ONLY the JSON object.

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