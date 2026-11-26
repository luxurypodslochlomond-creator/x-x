import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { markProduced } from '@/components/shared/translationMemory';

// ── EVERY TONGUE · NOBODY LEFT BEHIND ──
// Janine's "all languages" spec, lifted to shared ground: a broad preset list, and
// free-typed any language on Earth — translated live by AI, then cached on the device.
export const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'ga', label: 'Gaeilge' },
  { code: 'gd', label: 'Gàidhlig' },
  { code: 'cy', label: 'Cymraeg' },
  { code: 'sco', label: 'Scots' },
  { code: 'br', label: 'Brezhoneg' },
  { code: 'kw', label: 'Kernewek' },
  { code: 'es', label: 'Español' },
  { code: 'es-CO', label: 'Español (Colombia)' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'sv', label: 'Svenska' },
  { code: 'no', label: 'Norsk' },
  { code: 'da', label: 'Dansk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'is', label: 'Íslenska' },
  { code: 'pl', label: 'Polski' },
  { code: 'cs', label: 'Čeština' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'uk', label: 'Українська' },
  { code: 'ru', label: 'Русский' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ar', label: 'العربية' },
  { code: 'he', label: 'עברית' },
  { code: 'fa', label: 'فارسی' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'اردو' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'zh', label: '中文 (简体)' },
  { code: 'zh-TW', label: '中文 (繁體)' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ig', label: 'Igbo' },
  { code: 'zu', label: 'isiZulu' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'ha', label: 'Hausa' },
  // ── NIGERIA, IN MORE THAN THREE TONGUES ────────────────────────────────────────
  // Brian, 20 November: "make sure we have all native tongues for all people... especially the
  // native tongues in nigeria bro, all the other popular tribes". The list had Yorùbá, Igbo and
  // Hausa, which is the three Nigeria is usually reduced to — and this record is carrying
  // Francis Umendu Odupute's work out of Benin City, where the tongue spoken is Ẹdo, and Ẹdo
  // was not on it. A record that names a man's city and not his language has not finished.
  //
  // Each is named in its own spelling, and each one is marked as thinly documented in
  // translateClimate: where the machine does not know a word, it now returns nothing and the
  // English stands, rather than printing a fluent guess in somebody's mother tongue.
  { code: 'bin', label: 'Ẹdo (Bini)' },
  // Benin City's tongue was here; Benin the country's was not. Fɔngbè is the tongue most
  // people in Benin actually speak, and it is the tongue of the returned bronzes' own
  // country — a record that can carry the museum and not the language has not finished.
  { code: 'fon', label: 'Fɔngbè (Fon)' },
  { code: 'urh', label: 'Urhobo' },
  { code: 'ish', label: 'Ẹsan (Esan)' },
  { code: 'efi', label: 'Efik' },
  { code: 'ibb', label: 'Ibibio' },
  { code: 'anw', label: 'Anaang' },
  { code: 'tiv', label: 'Tiv' },
  { code: 'ijc', label: 'Izon (Ijaw)' },
  { code: 'kau', label: 'Kanuri' },
  { code: 'fuv', label: 'Fulfulde' },
  { code: 'nup', label: 'Nupe' },
  { code: 'igl', label: 'Igala' },
  { code: 'idu', label: 'Idoma' },
  { code: 'bom', label: 'Berom' },
  { code: 'qu', label: 'Runasimi (Quechua)' },
  { code: 'gn', label: 'Avañeʼẽ (Guaraní)' },
  { code: 'haw', label: 'ʻŌlelo Hawaiʻi' },
  { code: 'mi', label: 'Te Reo Māori' },
  { code: 'sm', label: 'Gagana Sāmoa' },
  { code: 'fj', label: 'Vosa Vakaviti' },
  { code: 'chr', label: 'Cherokee (Tsalagi)' },
  // ── THE FIRST PEOPLES OF THIS CONTINENT ──
  // Cherokee was on the list and the nations beside it were not, which read as an accident
  // rather than a choice. These are the tongues of the land the record is being written on.
  { code: 'nv', label: 'Diné bizaad (Navajo)' },
  { code: 'lkt', label: 'Lakota' },
  { code: 'ojb', label: 'Anishinaabemowin (Ojibwe)' },
  { code: 'iu', label: 'Inuktitut (ᐃᓄᒃᑎᑐᑦ)' },
  { code: 'cr', label: 'Cree (ᓀᐦᐃᔭᐍᐏᐣ)' },
  { code: 'moh', label: 'Kanienʼkéha (Mohawk)' },
  { code: 'hop', label: 'Hopilavayi (Hopi)' },
  { code: 'apw', label: 'Ndee biyátiʼ (Apache)' },
  // ── AND THE ONES EASY TO FORGET ──
  { code: 'so', label: 'Soomaali' },
  { code: 'xh', label: 'isiXhosa' },
  { code: 'sn', label: 'chiShona' },
  { code: 'wo', label: 'Wolof' },
  { code: 'ay', label: 'Aymar aru' },
  { code: 'nah', label: 'Nāhuatl' },
  { code: 'yua', label: 'Maya (Yucatec)' },
  { code: 'eu', label: 'Euskara (Basque)' },
  { code: 'ca', label: 'Català' },
  { code: 'gl', label: 'Galego' },
  { code: 'ro', label: 'Română' },
  { code: 'hu', label: 'Magyar' },
  { code: 'bg', label: 'Български' },
  { code: 'hy', label: 'Հայերեն' },
  { code: 'ka', label: 'ქართული' },
  { code: 'ku', label: 'Kurdî' },
  { code: 'ps', label: 'پښتو' },
  { code: 'ne', label: 'नेपाली' },
  { code: 'si', label: 'සිංහල' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'to', label: 'Lea faka-Tonga' },
  { code: 'tpi', label: 'Tok Pisin' },
  { code: 'la', label: 'Latina (Latin)' },
  { code: 'grc', label: 'Ἀρχαία ἑλληνική (Ancient Greek)' },
  // ── THE COUNTRIES THAT GET REDUCED TO ONE TONGUE ───────────────────────────────
  // Brian, 20 November: "Russian or Israeli or Chinese them all bro… for right reasons."
  // He was not asking for flags on a list. He was pointing at the same fault as Nigeria's:
  // the list carried Russian for Russia, Ukrainian for Ukraine, Hebrew for Israel and
  // Mandarin for China, and every one of those is a country that is not one language.
  // Russia alone holds more than a hundred, and most of them are not written in Cyrillic
  // by accident of empire. So the rest of each are named here, in their own spelling,
  // because a record that says "every tongue" and then lists the language of the state is
  // doing the thing it criticises. All of these are marked thin in translateClimate: where
  // the machine does not know a word it returns nothing and the English stands, rather than
  // printing a fluent guess in somebody's mother tongue.
  { code: 'tt', label: 'Татарча (Tatar)' },
  { code: 'ce', label: 'Нохчийн (Chechen)' },
  { code: 'ba', label: 'Башҡортса (Bashkir)' },
  { code: 'cv', label: 'Чӑвашла (Chuvash)' },
  { code: 'sah', label: 'Саха тыла (Sakha)' },
  { code: 'os', label: 'Ирон (Ossetian)' },
  { code: 'av', label: 'Авар мацӀ (Avar)' },
  { code: 'kk', label: 'Қазақша (Kazakh)' },
  { code: 'uz', label: 'Oʻzbekcha (Uzbek)' },
  { code: 'az', label: 'Azərbaycanca (Azerbaijani)' },
  { code: 'ky', label: 'Кыргызча (Kyrgyz)' },
  { code: 'tg', label: 'Тоҷикӣ (Tajik)' },
  { code: 'tk', label: 'Türkmençe (Turkmen)' },
  { code: 'yi', label: 'ייִדיש (Yiddish)' },
  // 中文 is not one tongue either, and the list had only Mandarin twice over.
  { code: 'yue', label: '粵語 (Cantonese)' },
  { code: 'nan', label: '閩南語 (Hokkien)' },
  // ── THE SEVEN THIS ISLAND GROUP RECOGNISES, AND EVERY NATION INSIDE A NATION ────
  // Brian, 20 November: "we have welsh and scots and any other regional tongues too right
  // bro". Welsh, Scots, Gaelic, Irish, Cornish and Breton were here. Manx was not — and Manx
  // is one of the seven languages the state this record is written in has formally recognised
  // under the European Charter. Six of the seven were on the list and the seventh was missing,
  // which is exactly the kind of gap a list like this hides from itself: nothing looks wrong,
  // and a whole people's tongue is simply not there.
  //
  // Beside it, the rest of Europe's nations-inside-nations, because the fault the record keeps
  // finding is the same one everywhere: a country listed as though it were a single tongue.
  // France is not French, Spain is not Spanish, Italy is not Italian, and Germany has been
  // printing Sorbian for longer than it has been a country.
  { code: 'gv', label: 'Gaelg' },
  { code: 'fy', label: 'Frysk' },
  { code: 'nds', label: 'Plattdüütsch' },
  { code: 'lb', label: 'Lëtzebuergesch' },
  { code: 'hsb', label: 'Hornjoserbšćina' },
  { code: 'dsb', label: 'Dolnoserbšćina' },
  { code: 'rm', label: 'Rumantsch' },
  { code: 'se', label: 'Davvisámegiella' },
  { code: 'fo', label: 'Føroyskt' },
  { code: 'kl', label: 'Kalaallisut' },
  { code: 'oc', label: 'Occitan' },
  { code: 'sc', label: 'Sardu' },
  { code: 'scn', label: 'Sicilianu' },
  { code: 'co', label: 'Corsu' },
  { code: 'ast', label: 'Asturianu' },
  { code: 'an', label: 'Aragonés' },
  { code: 'csb', label: 'Kaszëbsczi' },
  { code: 'szl', label: 'Ślōnskŏ' },
  { code: 'rue', label: 'Русиньскый' },
  { code: 'sq', label: 'Shqip' },
  { code: 'sr', label: 'Српски' },
  { code: 'hr', label: 'Hrvatski' },
  { code: 'bs', label: 'Bosanski' },
  { code: 'sl', label: 'Slovenščina' },
  { code: 'mk', label: 'Македонски' },
  { code: 'be', label: 'Беларуская' },
  { code: 'lt', label: 'Lietuvių' },
  { code: 'lv', label: 'Latviešu' },
  { code: 'et', label: 'Eesti' },
  { code: 'mt', label: 'Malti' },
  { code: 'eo', label: 'Esperanto' },
  // ── SOUTH AND EAST ASIA, WHERE THE LIST HAD THE CAPITALS AND NOT THE COUNTRIES ──
  { code: 'ug', label: 'ئۇيغۇرچە' },
  { code: 'sd', label: 'سنڌي' },
  { code: 'ks', label: 'کٲشُر' },
  { code: 'as', label: 'অসমীয়া' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
  { code: 'bho', label: 'भोजपुरी' },
  { code: 'mai', label: 'मैथिली' },
  { code: 'dv', label: 'ދިވެހި' },
  { code: 'my', label: 'မြန်မာ' },
  { code: 'km', label: 'ខ្មែរ' },
  { code: 'lo', label: 'ລາວ' },
  { code: 'mn', label: 'Монгол' },
  { code: 'bo', label: 'བོད་སྐད་' },
  { code: 'jv', label: 'Basa Jawa' },
  { code: 'su', label: 'Basa Sunda' },
  { code: 'ceb', label: 'Cebuano' },
  { code: 'hmn', label: 'Hmoob' },
  // ── AFRICA, WHERE SOME OF THE BIGGEST TONGUES ON EARTH WERE SIMPLY NOT THERE ────
  // Oromo is the largest first language in Ethiopia and it was missing. Malagasy is the
  // tongue of a whole island of twenty-eight million and it was missing. Afrikaans, Tigrinya,
  // Kinyarwanda, Lingala, Bambara, Akan, Ewe, Sesotho, Setswana, Chichewa, Tamazight — none of
  // them were here. A record that lists the three African languages Europeans learned and not
  // the rest has not been looking at Africa; it has been looking at a map of it.
  { code: 'af', label: 'Afrikaans' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'ti', label: 'ትግርኛ' },
  { code: 'rw', label: 'Ikinyarwanda' },
  { code: 'ln', label: 'Lingála' },
  { code: 'mg', label: 'Malagasy' },
  { code: 'bm', label: 'Bamanankan' },
  { code: 'ak', label: 'Akan' },
  { code: 'ee', label: 'Eʋegbe' },
  { code: 'st', label: 'Sesotho' },
  { code: 'tn', label: 'Setswana' },
  { code: 'ny', label: 'Chichewa' },
  { code: 'zgh', label: 'Tamaziɣt' },
  // ── AND ONE THE CARIBBEAN WRITES IN ────────────────────────────────────────────
  { code: 'ht', label: 'Kreyòl ayisyen' },
  // ── THE ANCIENT ONES ARE NAMED, NOT DRAWN IN SOMEBODY ELSE'S PICTURES ──────────
  // These five used to wear a character in front of the name: a hieroglyph, a cuneiform
  // sign twice over, and a cartoon Easter Island head. The signs are real Unicode and
  // almost no device carries a font for them, so most readers met an empty box; the head
  // was an emoji borrowed from a chat app. A tongue is named in its own words here, and
  // the drawing that goes with it is cut by this record's own hand — TongueMarks.jsx.
  { code: 'egy', label: 'Ancient Egyptian (hieroglyphs)' },
  { code: 'sux', label: 'Sumerian (cuneiform)' },
  { code: 'akk', label: 'Akkadian (cuneiform)' },
  { code: 'annunaki', label: 'Annunaki (Sumerian)' },
  { code: 'rongorongo', label: 'Rongorongo (Easter Island)' },
];

// Right-to-left tongues. Pashto was on the list and missing from this set, so a Pashto
// reader got Arabic script laid out left to right on a page that never turned round.
export const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur', 'ps', 'yi']);

// One chosen tongue across the whole record — the same key the record page reads,
// so a language picked in one place is the language everywhere on the platform.
const LANG_KEY = 'climate51_lang';

export function useClimateLanguage(baseStrings) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || 'auto'; } catch { return 'auto'; }
  });
  const [autoLang, setAutoLang] = useState('en');
  const [liveStrings, setLiveStrings] = useState(null);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    try {
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
      setAutoLang((nav || 'en').split('-')[0].toLowerCase() || 'en');
    } catch { setAutoLang('en'); }
  }, []);

  const chosen = lang === 'auto' ? autoLang : lang;

  // ── ONE TONGUE FOR THE WHOLE RECORD, PAGE BY PAGE ADDED TO IT ──
  // A tongue is held as one dictionary of English word → that tongue, so every page adds
  // to the same tongue instead of the first page's wording standing in for all of them.
  // That is what left a reader with a translated top and an English body: the page read a
  // dictionary made from another page's words, and its own words were never asked for.
  // Only what the tongue is actually missing is asked for, and every reply is merged in.
  const stringsKey = JSON.stringify(baseStrings || {});

  useEffect(() => {
    if (!chosen || chosen === 'auto' || chosen === 'en') { setLiveStrings(null); return; }
    const cacheKey = 'climate51_t_' + chosen;
    let dict = {};
    try { dict = JSON.parse(localStorage.getItem(cacheKey) || '{}') || {}; } catch { dict = {}; }

    // What the page shows for each of its own words: the tongue if the tongue has it,
    // the English if it does not — so no word is ever dropped from the page.
    const settle = () => {
      markProduced(Object.values(dict), chosen);
      setLiveStrings(Object.fromEntries(Object.entries(baseStrings || {})
        .map(([key, value]) => [key, (typeof value === 'string' && dict[value]) || value])));
    };

    const english = [...new Set(Object.values(baseStrings || {}).filter((value) => typeof value === 'string' && value.trim()))];
    // `in dict` rather than "is truthy": a tongue may honestly have no word for something, and
    // an empty answer is kept as an answer. Without that, a thinly documented tongue re-asked
    // the machine for the same dozen words on every page load, for ever, and paid for it.
    const need = english.filter((word) => !(word in dict));
    if (!need.length) { settle(); return; }

    let cancelled = false;
    setTranslating(true);
    const strings = Object.fromEntries(need.map((word, index) => ['s' + index, word]));
    base44.functions.invoke('translateClimate', { lang: chosen, strings })
      .then((res) => {
        const out = res?.data?.translations || res?.translations || {};
        need.forEach((word, index) => {
          const value = out['s' + index];
          // Kept either way. A word the tongue could not answer for is recorded as empty, so
          // the English stands on the page and the same question is never asked twice.
          dict[word] = typeof value === 'string' && value.trim() ? value.trim() : '';
        });
        try { localStorage.setItem(cacheKey, JSON.stringify(dict)); } catch { /* storage full */ }
      })
      .catch(() => { /* the words we already hold are still shown */ })
      .finally(() => { if (!cancelled) { settle(); setTranslating(false); } });
    return () => { cancelled = true; };
  }, [chosen, stringsKey]);

  const setLanguage = (code) => {
    setLang(code);
    try { localStorage.setItem(LANG_KEY, code); } catch { /* ignore */ }
    // Tell the rest of the platform, so a tongue picked here holds site-wide.
    window.dispatchEvent(new CustomEvent('uf51:lang', { detail: code }));
  };

  // And follow the platform if the tongue is changed somewhere else.
  useEffect(() => {
    const follow = (e) => setLang(e.detail);
    window.addEventListener('uf51:lang', follow);
    return () => window.removeEventListener('uf51:lang', follow);
  }, []);

  return {
    lang,
    setLanguage,
    chosen,
    isRTL: RTL_LANGS.has((chosen || '').split('-')[0]),
    translating,
    liveStrings,
  };
}