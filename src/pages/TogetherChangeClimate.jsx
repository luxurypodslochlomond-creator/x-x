import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Globe, Droplets, Leaf, Sun, Waves, TreePine, Recycle, Zap, MapPin, Bird, Fish, Sprout, CloudRain, Wind, ArrowRight, X, Plus, Users } from 'lucide-react';
import RecordActionsSection from '@/components/climate/RecordActionsSection';
import ClimateSubmitForm from '@/components/climate/ClimateSubmitForm';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import ClimateImpactBar from '@/components/climate/ClimateImpactBar';
import { isPreviewSandbox } from '@/lib/previewWorkers';
import { seedTranslations } from '@/components/shared/translation/translationCache';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import SubjectRail from '@/components/climate/SubjectRail';
import SubjectPickerSheet from '@/components/climate/SubjectPickerSheet';
import SubjectMark from '@/components/climate/SubjectMark';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordHomeVoice from '@/components/climate/RecordHomeVoice';
import SmallGesturesBand from '@/components/climate/SmallGesturesBand';
import DefinitionsBand from '@/components/climate/DefinitionsBand';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';
import RecordStandfirst from '@/components/climate/RecordStandfirst';
import RecordAddPlate from '@/components/climate/RecordAddPlate';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkGroups } from '@/components/climate/RoomMarks';
import '@/components/climate/record-mobile-index.css';


// The four ways to add something now live in RecordAddPlate: one plate, the record's own
// yellow, each door wearing the drawing of the room it opens. The page keeps only the job
// of opening the form on the room that was tapped.

// ── Janine's spec: categories (exact taxonomy from her brief) ──
const CATEGORIES = [
  { id: 'agriculture', label: 'Agriculture', icon: Sprout },
  { id: 'water', label: 'Water', icon: Droplets },
  { id: 'heat', label: 'Heat', icon: Sun },
  { id: 'coastal_erosion_protection', label: 'Coastal Protection', icon: Waves },
  { id: 'seagrasses', label: 'Seagrasses', icon: Bird },
  { id: 'mangroves', label: 'Mangroves', icon: TreePine },
  { id: 'oceans', label: 'Oceans', icon: Fish },
  { id: 'zooplankton', label: 'Zooplankton', icon: Fish },
  { id: 'phytoplankton', label: 'Phytoplankton', icon: Leaf },
  { id: 'forest_preservation', label: 'Forests', icon: TreePine },
  { id: 'rewilding', label: 'Rewilding', icon: Leaf },
  { id: 'urban_geodesign', label: 'Urban Geodesign', icon: Recycle },
  { id: 'transportation', label: 'Transport', icon: Wind },
  { id: 'electric_vehicles', label: 'Electric Vehicles', icon: Zap },
  { id: 'renewable_energy', label: 'Renewables', icon: Zap },
  { id: 'solar_desalination', label: 'Solar Desalination', icon: Sun },
  { id: 'drought', label: 'Drought', icon: CloudRain },
  { id: 'flooding', label: 'Flooding', icon: CloudRain },
  { id: 'extreme_weather', label: 'Extreme Weather', icon: Wind },
  { id: 'other', label: 'Other', icon: Globe },
];

import RecordCoverPlate from '@/components/climate/RecordCoverPlate';
import RecordRoomNavigation from '@/components/climate/RecordRoomNavigation';
import RecordHolding from '@/components/climate/RecordHolding';
import RecordEntryList from '@/components/climate/RecordEntryList';

// ── Interface language support — Janine's "all languages" spec: broad preset list + free-type any language (AI-translated live) ──
const LANGS = [
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
  { code: 'qu', label: 'Runasimi (Quechua)' },
  { code: 'gn', label: 'Avañeʼẽ (Guaraní)' },
  { code: 'haw', label: 'ʻŌlelo Hawaiʻi' },
  { code: 'mi', label: 'Te Reo Māori' },
  { code: 'sm', label: 'Gagana Sāmoa' },
  { code: 'fj', label: 'Vosa Vakaviti' },
  { code: 'la', label: 'Latina (Latin)' },
  { code: 'grc', label: 'Ἀρχαία ἑλληνική (Ancient Greek)' },
];

// Universal reframe: "it's not mine, it's for the world, the planet, all of us."
const T = {
  en: { title_a: 'Together we can change the', title_b: 'course', title_c: 'of climate change', sub: 'What’s happening to our world, what’s working, and who’s doing something about it.', service: 'A public service · for the world', noads: 'No advertising', nofund: 'No sponsorship', donate: 'Support welcome', search: 'Search solutions, crises and actions…', solutions: 'Solutions', crises: 'Climate Crises', crises_short: 'Crises', defs: 'Definitions', rev: 'Reviewed', connect: 'Connecting the planet…', empty: 'No entries match yet.', govern: 'Built for the planet — and kept in the open', govern_body: 'Spam is screened automatically; clear entries go on the record at once, and anything unclear waits for a human check. A solution or a crisis goes on only with a link to the original source; if that link cannot be opened, it waits for a person. Images must be copyright-free, and location is kept to a rough region to protect privacy. Money never buys a place on the record, and support is declared in the open. The interface is translated on the platform; entries are translated by our community over time.', covenant: 'Read our open-source covenant', family: 'This platform is one part of UF51\'s Planetary Healing family — what is recorded here feeds our work on the ground.', action: 'Take action', honour: 'Built in honour of Janine M. H. Selendy & Horizon International — and released to the world, the planet, all of us.', all: 'All', featured: 'Signals', groups: 'Groups', groups_sub: 'Find people working on the same problem. Share what you know.', groups_note: 'The record shows only the one contact line an organiser chooses. Your own email is never published.', live: 'Live record', entries_now: 'entries on the record right now', actions: 'Actions', actions_sub: 'Cleanups, planting, workshops and meetings. Find something to join, then contact the organiser.', actions_empty: 'No actions listed yet — be the first to add one.', groups_empty: 'No groups yet — start the first one. Name it, give your rough region, and say what you are working on.', subject_empty: 'Nothing under {subject} yet — the record is waiting for the first.', subject_add: 'Add one for review' },
  es: { title_a: 'Juntos cambiamos el', title_b: 'curso', title_c: 'del cambio climático', sub: 'Un registro público de emergencias climáticas y las acciones positivas que funcionan — compartido abiertamente, internacionalmente — para que cualquiera en la Tierra pueda replicar lo que funciona.', service: 'Un servicio público · para el mundo', noads: 'Sin publicidad', nofund: 'Sin patrocinio', donate: 'Apoyo bienvenido', search: 'Buscar soluciones y crisis…', solutions: 'Soluciones', crises: 'Crisis Climáticas', defs: 'Definiciones', rev: 'Revisado', connect: 'Conectando el planeta…', empty: 'Sin resultados aún.', govern: 'Construido para el planeta — y para ser confiable', govern_body: 'El spam se filtra automáticamente; las entradas claras pasan al registro de inmediato, y lo que no está claro espera una revisión humana. Solo se usan imágenes sin derechos de autor. La ubicación se mantiene en una región aproximada para proteger la privacidad, siendo honesta y verificable. La plataforma funciona como servicio público — sin publicidad, sin patrocinio, y el dinero nunca compra un lugar en el registro. El apoyo es bienvenido y se declara en abierto. Las traducciones de la interfaz se ofrecen en la plataforma; las entradas son traducidas por nuestra comunidad con el tiempo.', covenant: 'Lee nuestro pacto de código abierto', family: 'Esta plataforma es parte de la familia de Curación Planetaria de UF51 — las soluciones verificadas aquí son el motor de conocimiento detrás de nuestra acción sobre el terreno.', action: 'Actúa', honour: 'Construido en honor de Janine M. H. Selendy y Horizon International — y entregado al mundo, al planeta, a todos nosotros.', all: 'Todo', featured: 'Señales' },
  fr: { title_a: 'Ensemble, nous changeons le', title_b: 'cours', title_c: 'du changement climatique', sub: 'Un registre public des urgences climatiques et des actions positives qui fonctionnent — partagé ouvertement, à l\'international — pour que chacun sur Terre puisse répliquer ce qui fonctionne.', service: 'Un service public · pour le monde', noads: 'Aucune publicité', nofund: 'Aucun parrainage', donate: 'Soutien bienvenu', search: 'Rechercher solutions et crises…', solutions: 'Solutions', crises: 'Crises Climatiques', defs: 'Définitions', rev: 'Vérifié', connect: 'Connexion de la planète…', empty: 'Aucun résultat pour l\'instant.', govern: 'Conçu pour la planète — et pour être digne de confiance', govern_body: 'Le spam est filtré automatiquement ; les entrées claires sont publiées immédiatement, et tout ce qui n\'est pas clair attend une vérification humaine. Seules des images libres de droits sont utilisées. La localisation est limitée à une région approximative pour protéger la vie privée, tout en restant honnête et vérifiable. La plateforme fonctionne en service public — sans publicité, sans parrainage, et l\'argent n\'achète jamais une place dans le registre. Le soutien est bienvenu et déclaré au grand jour. Les traductions de l\'interface sont fournies sur la plateforme; les entrées sont traduites par notre communauté au fil du temps.', covenant: 'Lire notre pacte open source', family: 'Cette plateforme fait partie de la famille de Guérison Planétaire UF51 — les solutions vérifiées ici sont le moteur de connaissance derrière notre action de terrain.', action: 'Agir', honour: 'Construit en l\'honneur de Janine M. H. Selendy et Horizon International — et remis au monde, à la planète, à nous tous.', all: 'Tout', featured: 'Signaux' },
  de: { title_a: 'Gemeinsam ändern wir den', title_b: 'Lauf', title_c: 'des Klimawandels', sub: 'Ein öffentliches Register von Klimanotlagen und positiven Maßnahmen, die funktionieren — offen geteilt, international — damit jeder auf der Erde nachahmen kann, was gut ist.', service: 'Ein öffentlicher Dienst · für die Welt', noads: 'Keine Werbung', nofund: 'Kein Sponsoring', donate: 'Unterstützung willkommen', search: 'Lösungen und Krisen suchen…', solutions: 'Lösungen', crises: 'Klimakrisen', defs: 'Definitionen', rev: 'Geprüft', connect: 'Planet verbinden…', empty: 'Noch keine Treffer.', govern: 'Für den Planeten gebaut — und gebaut, um vertraut zu werden', govern_body: 'Spam wird automatisch gefiltert; klare Einträge gehen sofort ins Register, und alles Unklare wartet auf eine menschliche Prüfung. Es werden nur urheberrechtsfreie Bilder verwendet. Der Standort bleibt grob, um die Privatsphäre zu schützen, bleibt aber ehrlich und überprüfbar. Die Plattform ist Open Source, extraktionssicher und ein öffentlicher Dienst — ohne Werbung, ohne Sponsoring, und Geld kauft nie einen Platz im Register. Unterstützung ist willkommen und wird offen ausgewiesen. Oberflächenübersetzungen werden auf der Plattform angeboten; Einträge werden mit der Zeit von unserer Gemeinschaft übersetzt.', covenant: 'Unser Open-Source-Pakt', family: 'Diese Plattform ist Teil der UF51 Planetary-Healing-Familie — die verifizierten Lösungen hier sind die Wissens-Engine hinter unserer Arbeit vor Ort.', action: 'Handeln', honour: 'Zu Ehren von Janine M. H. Selendy & Horizon International gebaut — und der Welt, dem Planeten, uns allen übergeben.', all: 'Alle', featured: 'Signale' },
  pt: { title_a: 'Juntos mudamos o', title_b: 'curso', title_c: 'das mudanças climáticas', sub: 'Um registro público de emergências climáticas e das ações positivas que funcionam — partilhado abertamente, internacionalmente — para que qualquer pessoa na Terra possa replicar o que está bom.', service: 'Um serviço público · para o mundo', noads: 'Sem publicidade', nofund: 'Sem patrocínio', donate: 'Apoio bem-vindo', search: 'Pesquisar soluções e crises…', solutions: 'Soluções', crises: 'Crises Climáticas', defs: 'Definições', rev: 'Revisto', connect: 'A conectar o planeta…', empty: 'Ainda sem resultados.', govern: 'Construído para o planeta — e para ser confiável', govern_body: 'O spam é filtrado automaticamente; as entradas claras passam para o registro de imediato, e o que não está claro aguarda uma verificação humana. Apenas imagens livres de direitos são usadas. A localização é mantida numa região aproximada para proteger a privacidade, permanecendo honesta e verificável. A plataforma funciona como serviço público — sem publicidade, sem patrocínio, e o dinheiro nunca compra um lugar no registro. O apoio é bem-vindo e é declarado abertamente. As traduções da interface são fornecidas na plataforma; as entradas são traduzidas pela nossa comunidade ao longo do tempo.', covenant: 'Ler o nosso pacto open source', family: 'Esta plataforma faz parte da família de Cura Planetária UF51 — as soluções verificadas aqui são o motor de conhecimento por trás da nossa ação no terreno.', action: 'Agir', honour: 'Construído em honra de Janine M. H. Selendy & Horizon International — e entregue ao mundo, ao planeta, a todos nós.', all: 'Todos', featured: 'Sinais' },
  hi: { title_a: 'साथ मिलकर हम जलवायु परिवर्तन का', title_b: 'रुख', title_c: 'बदल रहे हैं', sub: 'जलवायु आपातकालों और काम करने वाले सकारात्मक कार्यों का एक सार्वजनिक अभिलेख — खुले में, अंतरराष्ट्रीय स्तर पर साझा — ताकि पृथ्वी पर कोई भी अच्छे की नकल कर सके।', service: 'एक सार्वजनिक सेवा · दुनिया के लिए', noads: 'कोई विज्ञापन नहीं', nofund: 'कोई प्रायोजन नहीं', donate: 'समर्थन का स्वागत है', search: 'समाधान और संकट खोजें…', solutions: 'समाधान', crises: 'जलवायु संकट', defs: 'परिभाषाएँ', rev: 'समीक्षित', connect: 'ग्रह जोड़ रहे हैं…', empty: 'अभी कोई परिणाम नहीं।', govern: 'ग्रह के लिए निर्मित — और विश्वसनीय होने के लिए निर्मित', govern_body: 'स्पैम स्वतः छाँटा जाता है; स्पष्ट प्रविष्टियाँ तुरंत अभिलेख में जाती हैं, और जो स्पष्ट नहीं है वह मानवीय जाँच की प्रतीक्षा करता है। केवल कॉपीराइट-मुक्त छवियाँ उपयोग होती हैं। स्थान गोपनीयता के लिए मोटे क्षेत्र तक सीमित रहता है, फिर भी ईमानदार और सत्यापन योग्य। यह मंच ओपन सोर्स, निष्कर्षण-रोधी है, और सार्वजनिक सेवा के रूप में चलता है — कोई विज्ञापन नहीं, कोई प्रायोजन नहीं, और पैसा कभी अभिलेख में जगह नहीं खरीदता। समर्थन का स्वागत है, और वह खुले में दर्ज होता है। इंटरफ़ेस अनुवाद मंच पर उपलब्ध हैं; प्रविष्टियाँ समय के साथ हमारे समुदाय द्वारा अनुवादित होती हैं।', covenant: 'हमारा ओपन सोर्स संकल्प पढ़ें', family: 'यह मंच UF51 की प्लैनेटरी हीलिंग परिवार का हिस्सा है — यहाँ की सत्यापित समाधान हमारे ज़मीनी कार्य के पीछे ज्ञान इंजन हैं।', action: 'कार्रवाई करें', honour: 'जनीन एम. एच. सेलेंडी और होराइज़न इंटरनेशनल के सम्मान में निर्मित — और दुनिया, ग्रह, हम सबको सौंपा गया।', all: 'सभी', featured: 'संकेत' },
  zh: { title_a: '我们携手正在改变', title_b: '气候变化的走向', title_c: '', sub: '一个关于气候紧急事件和行之有效的积极行动的公开记录——开放共享，跨越国界——让地球上任何人都能复制优秀的范例。', service: '一项公共服务 · 为了这个世界', noads: '无广告', nofund: '无赞助', donate: '欢迎支持', search: '搜索解决方案与危机…', solutions: '解决方案', crises: '气候危机', defs: '定义', rev: '已审核', connect: '正在连接地球…', empty: '暂无匹配内容。', govern: '为地球而生——并生来值得信赖', govern_body: '每条内容在发布前都经过审核。仅使用无版权图片。位置保留为大致区域以保护隐私，同时保持诚实与可验证。平台开源、防提取，并作为公共服务运行——无广告、无赞助，金钱永远买不到记录中的位置。支持受到欢迎，并公开列明。界面翻译在平台上提供；条目由我们的社区随时间逐步翻译。', covenant: '阅读我们的开源契约', family: '本平台是UF51“行星疗愈”家族的一部分——此处经核实的解决方案是支撑我们实地行动的知识引擎。', action: '采取行动', honour: '为致敬Janine M. H. Selendy与国际云而建——并献给这个世界、这个星球、我们所有人。', all: '全部', featured: '信号' },
  ar: { title_a: 'معًا نُغيّر', title_b: 'مسار', title_c: 'تغير المناخ', sub: 'سجلّ عام لحالات الطوارئ المناخية والإجراءات الإيجابية التي تنجح — مشترك علنًا، دوليًا — ليستطيع أي شخص على الأرض تكرار ما هو جيد.', service: 'خدمة عامة · للعالم', noads: 'لا إعلانات', nofund: 'لا رعاية', donate: 'الدعم مرحّب به', search: 'ابحث عن الحلول والأزمات…', solutions: 'الحلول', crises: 'أزمات المناخ', defs: 'تعريفات', rev: 'تمت المراجعة', connect: 'جارٍ توصيل الكوكب…', empty: 'لا نتائج مطابقة بعد.', govern: 'مبني من أجل الكوكب — ومبني ليكون موثوقًا', govern_body: 'تتم مراجعة كل إدخال قبل النشر. تُستخدم الصور الخالية من حقوق النشر فقط. يُحافظ على الموقع كمنطقة تقريبية لحماية الخصوصية، مع بقائه صادقًا وقابلاً للتحقق. المنصة مفتوحة المصدر ومحمية من الاستغلال وتعمل كخدمة عامة — لا إعلانات ولا رعاية، والمال لا يشتري مكانًا في السجل. الدعم مرحّب به ويُعلن في العلن. تُقدَّم ترجمات الواجهة على المنصة؛ وتُترجم الإدخالات من قبل مجتمعنا بمرور الوقت.', covenant: 'اقرأ ميثاقنا مفتوح المصدر', family: 'هذه المنصة جزء من عائلة الشفاء الكوكبي UF51 — الحلول الموثقة هنا هي محرك المعرفة وراء عملنا الميداني.', action: 'اتخذ إجراء', honour: 'بُني تكريمًا لـ Janine M. H. Selendy وهورايزون إنترناشونال — وسُلّم إلى العالم، إلى الكوكب، إلى جميعنا.', all: 'الكل', featured: 'إشارات' },
};

seedTranslations(T);

// Typing a kind of entry — "crises", "groups" — means "show me those", not "find this
// word". The record answers it: the button above moves to that kind and the list follows,
// so the box and the buttons can never disagree. A kind word is never also searched as
// text, or a search for "crises" would come back empty on a page full of them.
// ── WHICH TONGUES ARE WRITTEN BY HAND, COUNTED RATHER THAN CLAIMED ──
// The brief and the summary both used to say "written by hand in 8 languages and machine-made
// into 57 more". The 8 was right by luck and the 57 had been wrong for months. This export is
// the list of dictionaries that actually exist in this file, so the figure printed anywhere
// else is read from the thing itself and cannot drift away from it.
export const HAND_WRITTEN = Object.keys(T);

const KIND_WORDS = {
  solution: ['solution', 'solutions'],
  climate_crisis: ['crisis', 'crises', 'emergency', 'emergencies'],
  groups: ['group', 'groups', 'gathering', 'gatherings'],
  actions: ['action', 'actions'],
};
const ALL_KIND_WORDS = new Set(Object.values(KIND_WORDS).flat());
const kindOfWord = (word) => Object.keys(KIND_WORDS).find(k => KIND_WORDS[k].includes(word)) || null;

import useRecordViewState from '@/components/climate/useRecordViewState';

// ── THE SECTION HEADS STOPPED SHOUTING ────────────────────────────────────────
// Every heading on this page was condensed uppercase with a hairline run out to the edge
// and a count pinned to the end of it — seven times down one page. Seven ledgers under
// seven rules is what made a record of the living world read like a spreadsheet, and no
// amount of redrawing the marks was ever going to fix it, because the marks were never
// the problem: the frame around everything was.
//
// A section head is set in the record's reading voice now, in sentence case, big enough
// to be the only thing on its line. The count stays — it is a fact and this record does
// not hide facts — but it sits beside the word like a page number instead of closing a
// rule. Same seven headings, same words, with the filing cabinet taken off them.

export default function TogetherChangeClimate() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useRecordViewState('query', '');
  const [selectedCategory, setSelectedCategory] = useRecordViewState('category', 'all');
  const [selectedType, setSelectedType] = useRecordViewState('kind', 'all');
  const { isRTL } = useSiteLanguage();
  // A link can name the door: ?submit=1 opens the form straight away, so a walkthrough sent
  // to a new checker can point at the exact place an initiative is added.
  const [showSubmit, setShowSubmit] = useState(
    () => new URLSearchParams(window.location.search).get('submit') === '1'
  );
  // Which door the one form opens on. A reader who taps "Start a group" should land with the
  // group door already open, rather than being handed a second form that drifts out of step
  // with the first — which is exactly what had happened.
  const [submitType, setSubmitType] = useState(null);
  const [showIndex, setShowIndex] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
  const [submitCategory, setSubmitCategory] = useState(null);
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' && !navigator.onLine);
  const contentRef = useRef(null);

  // ── GOING DOWN THE PAGE, WITH THE MASTHEAD IN THE WAY ──────────────────────────
  // The record's masthead pins now, on a desk as well as a phone. So every jump down to
  // the record has to allow for its height: without the offset, the thing you asked for
  // arrives with its own heading tucked underneath the header, which reads as a click
  // that did nothing at all.
  const bringIntoView = (element) => {
    if (!element) return;
    const masthead = element.closest('.climate-record')?.querySelector('header');
    const offset = (masthead?.getBoundingClientRect().bottom || 0) + 6;
    window.scrollBy({ top: element.getBoundingClientRect().top - offset, behavior: 'smooth' });
  };
  const firstRender = useRef(true);
  // Set when the box moved the kind, rather than a filter button. The page must not jump.
  const typedKind = useRef(false);
  const { categories } = useClimateCategories();

  useEffect(() => {
    // One worker per scope, and this app already installs its own across the whole origin.
    // Registering a second one here silently replaced it: push subscriptions were dropped
    // and the cache was swapped out from under a page that was still loading its files,
    // which is what broke a route with "Importing a module script failed". So the record's
    // worker only fills a scope nothing is holding.
    if ('serviceWorker' in navigator && !isPreviewSandbox() && !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('/api/functions/serveClimateServiceWorker', { scope: '/' }).catch(() => {});
    }
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, []);

  useEffect(() => {
    const getCache = () => { try { return JSON.parse(localStorage.getItem('twcc_data_cache')); } catch { return null; } };
    const saveCache = (s, g, a) => { try { localStorage.setItem('twcc_data_cache', JSON.stringify({ solutions: s, groups: g, actions: a, ts: Date.now() })); } catch {} };
    // The entries kept on the device from the last visit are put on the page at once, so the
    // record is already standing when the finger lifts. The live read still happens and takes
    // over the moment it answers — the cache only saves the wait, it never outranks the record.
    const cached = getCache();
    if (cached) {
      setItems(cached.solutions || []);
      setGroups(cached.groups || []);
      setActions(cached.actions || []);
      setLoading(false);
    }
    Promise.allSettled([
      base44.entities.ClimateSolution.list(),
      base44.entities.ClimateGroup.list(),
      base44.entities.ClimateAction.list(),
    ]).then(([s, g, a]) => {
      const cache = getCache();
      const toArray = (v) => Array.isArray(v) ? v : (v?.items || []);
      const sols = s.status === 'fulfilled' ? toArray(s.value) : (cache?.solutions || []);
      const grps = g.status === 'fulfilled' ? toArray(g.value) : (cache?.groups || []);
      const acts = a.status === 'fulfilled' ? toArray(a.value) : (cache?.actions || []);
      setItems(sols); setGroups(grps); setActions(acts); setLoading(false);
      if (s.status === 'fulfilled' || g.status === 'fulfilled' || a.status === 'fulfilled') saveCache(sols, grps, acts);
    });
  }, []);


  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    // The buttons carry you down to the list. The box does not: typing a kind word in the
    // filter still moves the kind, but the page stays where your thumb is, so the box
    // never leaves the screen mid-word and the keyboard never shuts under your hand.
    if (typedKind.current) { typedKind.current = false; return; }
    bringIntoView(contentRef.current);
  }, [selectedType]);

  // A theme opens all matching kinds, not whichever room happened to be chosen last.
  // One scroll runs after React has committed the selection, on either screen size.
  const selectTheme = (id) => {
    if (selectedType !== 'all') typedKind.current = true;
    setSelectedType('all');
    setSelectedCategory(id);
    setQuery('');
    setShowIndex(false);
    requestAnimationFrame(() => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        document.getElementById('record-subject-toggle')?.focus({ preventScroll: true });
      }
      bringIntoView(contentRef.current);
    });
  };

  // React always renders the source copy; the shared translator alone displays another language.
  // Existing hand-written translations are seeded above, keyed by that exact source.
  const t = T.en;

  // ── ONE PIGMENT PER ROOM ───────────────────────────────────────────────────────
  // Green for what works, red for what is burning, yellow for the people gathered,
  // orange for what is being done. Before, Groups wore Solutions' green and every door
  // flashed orange on hover — so three doors borrowed the Actions colour and only the
  // crises door looked like itself. A door now holds its own colour and nothing else:
  // ink until it is chosen, then the pigment its own section heading, card edge and
  // button already carry.
  // One label per room. The rooms themselves are drawn by RecordCoverPlate, which carries each
  // one's own pigment — green for what works, red for what is burning, yellow for the people
  // gathered, orange for what is being done. This list is kept for the line that tells a
  // reader which room they are standing in.
  const doors = [
    { key: 'solution', label: t.solutions },
    { key: 'climate_crisis', label: t.crises_short },
    { key: 'actions', label: t.actions },
    { key: 'groups', label: t.groups },
  ];
  const openDoor = doors.find(d => d.key === selectedType);

  // One matching rule for the record's own box, and it is the rule the full search uses:
  // every word you type has to appear somewhere in the entry, in any order. Before, the
  // words had to sit together as one phrase, so an obvious search like "seagrass
  // protection" came back empty on a page that plainly holds both words. The body of an
  // entry and its origin are searched too, not just the headline.
  const queryWords = useMemo(
    () => query.toLowerCase().trim().split(/\s+/).filter(Boolean).filter(w => !ALL_KIND_WORDS.has(w)),
    [query]
  );
  const matchesWords = (hay) => queryWords.length === 0 || queryWords.every(w => hay.includes(w));

  const handleQueryChange = (value) => {
    setQuery(value);
    const words = value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const kind = words.map(kindOfWord).find(Boolean);
    if (kind && kind !== selectedType) { typedKind.current = true; setSelectedType(kind); }
  };

  const filtered = useMemo(() => {
    return items.filter(i => {
      const q = (i.title + ' ' + (i.summary||'') + ' ' + (i.details||'') + ' ' + (i.category||'') + ' ' + (i.region_rough||'') + ' ' + (i.country||'') + ' ' + (i.source_name||'') + ' ' + (i.source_author||'')).toLowerCase();
      const matchesCat = selectedCategory === 'all' || i.category === selectedCategory;
      const matchesType = selectedType === 'all' || i.entry_type === selectedType;
      return matchesWords(q) && matchesCat && matchesType;
    });
  }, [items, query, selectedCategory, selectedType]);

  const showEntries = selectedType !== 'groups' && selectedType !== 'actions';

  const solutions = filtered.filter(i => i.entry_type === 'solution');
  const crises = filtered.filter(i => i.entry_type === 'climate_crisis');
  // The opening pictures — Janine's ask: real entries, real photographs, straight away.
  // Featured entries with images lead; if nothing is flagged as featured, the newest pictures do.
  const featured = useMemo(() => {
    const withImages = items.filter(i => i.image_url);
    const picked = withImages.filter(i => i.featured);
    const rest = withImages.filter(i => !i.featured);
    return [...picked, ...rest].slice(0, 4);
  }, [items]);

  const filteredActions = useMemo(() => {
    return actions.filter(a => {
      const q = (a.title + ' ' + (a.description||'') + ' ' + (a.action_type||'') + ' ' + (a.region_rough||'') + ' ' + (a.country||'')).toLowerCase();
      const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
      return matchesWords(q) && matchesCat;
    });
  }, [actions, query, selectedCategory]);

  // What each room holds, counted from the record itself rather than from whatever is
  // currently filtered: a door is a statement about the record, not about the reader's last
  // tap, so opening one must not empty the others' numbers.
  const doorCounts = useMemo(() => ({
    solution: items.filter(i => i.entry_type === 'solution').length,
    climate_crisis: items.filter(i => i.entry_type === 'climate_crisis').length,
    groups: groups.length,
    actions: actions.length,
  }), [items, groups, actions]);

  // ── THE SUBJECT INDEX ───────────────────────────────────────────────────────────
  // One count per subject, taken from the entries the page is actually holding — solutions,
  // crises and actions together, because a reader asking about water wants all of it.
  // The count is what turns a list of names into a statement about the record: sixteen of
  // thirty-two subjects carry something, and the rest say so out loud instead of opening
  // a blank page.
  const subjectIndex = useMemo(() => {
    const counts = {};
    [...items, ...actions].forEach(e => {
      if (e.category) counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return categories.map(c => ({ ...c, count: counts[c.id] || 0 }));
  }, [items, actions, categories]);

  const filledSubjects = useMemo(
    () => subjectIndex.filter(s => s.count > 0).sort((a, b) => b.count - a.count),
    [subjectIndex]
  );
  const emptySubjects = useMemo(() => subjectIndex.filter(s => s.count === 0), [subjectIndex]);
  const activeSubject = subjectIndex.find(s => s.id === selectedCategory) || null;
  // A subject with nothing under it is a door, not a dead end — but only when the reader has
  // not typed something of their own, because then the honest answer is "no match".
  const subjectGap = !!(activeSubject && activeSubject.count === 0 && !query.trim());

  // Every gathering on the record shows now, whether or not an organiser has given
  // an address. One with an address carries its contact line; one without carries
  // none at all — no invented contacts, and no gathering hidden away either.
  const liveGroups = groups;

  const filteredGroups = useMemo(() => {
    return liveGroups.filter(g => {
      const q = (g.name + ' ' + (g.topic||'') + ' ' + (g.region||'') + ' ' + (g.description||'')).toLowerCase();
      return matchesWords(q);
    });
  }, [liveGroups, query]);

  // ── THE PAGE IS PRINTED, NOT POSTED ────────────────────────────────────────────
  // This front page was a 1100-pixel column centred inside a darker field, with a hairline
  // down each side and a drop shadow under it, on a background colour of its own making.
  // That is exactly what a page looks like when it is a website pretending to be a sheet: a
  // card floating on a colour, casting a shadow at nobody.
  //
  // The founder's page — the one Brian kept pointing at — does none of that. Its bands run
  // the width of the record, edge to edge, and the paper it is printed on is the record's
  // own. So this page is the same now: no column, no side rules, no shadow, and the darker
  // surround gone with them, because a record has one ground and does not put a second one
  // behind itself to sit on.
  //
  // Nothing inside changed. Every band was already padded to the edge and had its own
  // measure for prose, so all that has gone is the frame around the frame.
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="record-home-page relative min-h-screen font-body text-record-ink">
      <style>{`
        @keyframes twcc-enter { from { opacity: 0; } to { opacity: 1; } }
        @keyframes twcc-flicker { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .72; } }
        @keyframes twcc-epigraph { from { opacity: 0; } to { opacity: 1; } }
        @keyframes twcc-scan { from { background-position: 0 0; } to { background-position: 0 3px; } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
        /* The page used to paint the whole window a darker paper than the record's, so the
           column above looked like a sheet laid on a table with a shadow under it. That
           second colour was the gutter, and the gutter was the thing that read as an old
           website. The record supplies its own ground; this page no longer paints one. */
      `}</style>

      {isOffline && (
        <div className="bg-[#e2602a] text-[#141210] text-center py-1 text-[10px] font-black font-mono uppercase tracking-widest">
          ● Offline — showing cached record
        </div>
      )}

      {/* ── A VOICE, THEN THE WORLD, THEN THE SHAPE OF THE RECORD ─────────────────────
          Brian, 20 November: "move dr Jane section up so sits on red line just under the top
          level nav… make sure solutions crisis action and group sit underneath." He is
          right, and he is also undoing a mistake of mine: on 19 November I sent the four
          rooms up to lead the page, which pushed Jane's words and the painting below a grid
          of boxes and made the first thing a reader met a set of doors with nothing behind
          them. The desk had been rearranged to argue with the phone, and the phone had the
          better order all along.

          So there is one order now, at every width, and it is the order a person reads in:
            1. a voice on the record — Jane's sentence, printed on the red line under the
               masthead, because a record about the world should open with somebody who has
               spent a life in it rather than with a menu
            2. the record's own name, straight under her, on the same painting — what this
               is, and what it is for
            3. the four rooms — what it is made of, now that the reader wants to know
          The markup is in that order too, so nothing depends on a breakpoint to say
          something true. Same parts, same doors, same colours, same counts.

          And since 24 November there is one painting rather than three windows onto it:
          it is the ground of this page all the way down, and the paper is a veil over it. */}
      <div className="record-home-flow">
      {/* ── THE VOICE AND THE SENTENCE, ON THE ONE PAINTING ────────────────────────
          No band of its own and no second copy of the painting: the record's own work is
          the ground of this page (record-home-opening.css), so Jane speaks on the room
          itself and the sentence that names the record comes straight under her. */}
      {/* No rule of its own at the head: the masthead's red hairline is already there, and a
          second red line three pixels under it read as a double bar rather than a page. */}
      <div className="record-home-voice-band">
        <RecordHomeVoice copy={t} />
      </div>

      <div className="record-home-photographs">
        <RecordCoverPlate />
      </div>

      {/* ── THE FOUR ROOMS, UNDER THE PAINTING AND THE NAME ────────────────────────
          They sat above it on a desk until 20 November and below it on a phone. Now they
          sit under it everywhere, which is where Brian asked for them and where they
          belong: a reader who has just been told what the record is can be shown what it
          is made of. The counts, the colours and the doors are untouched. */}
      {/* No padding on the wrapper: the band carries its own tint and rules edge to edge of
          the sheet, and insets its contents by the record's own margin instead. */}
      <div className="record-home-doors">
        <RecordRoomNavigation
          counts={doorCounts}
          selected={selectedType}
          onAdd={(type) => { setSubmitType(type); setShowSubmit(true); }}
          onSelect={(key) => {
            setSelectedCategory('all');
            setQuery('');
            setSelectedType(selectedType === key ? 'all' : key);
          }}
        />
      </div>

      <div className="record-home-subjects px-4 pb-5 pt-4 lg:px-10">
        <SubjectRail
          current={activeSubject}
          totalEntries={items.length + actions.length}
          allLabel="Every subject"
          expanded={showIndex}
          onOpenIndex={() => setShowIndex(open => !open)}
          onOpenPicker={() => setShowIndex(true)}
        />
        <SubjectPickerSheet
          open={showIndex}
          onClose={() => setShowIndex(false)}
          subjects={[...filledSubjects, ...emptySubjects]}
          totalEntries={items.length + actions.length}
          selected={selectedCategory}
          onSelect={selectTheme}
        />
      </div>

      {/* The full-width crawl stood here and cost a screen for three pictures. The
          photographs are plates under the cover now (CoverPhotoPlates), where a reader
          meets the world before being asked to choose a room. */}
      <ClimateImpactBar />

      {/* ── THE SEQUENCE, SAID ONCE ──────────────────────────────────────────────────
          Brian, 19 November: "how do we make climate page speak for itself… coolasfuck flow
          visually… sequence bro know what I mean?" The page had the right parts in the wrong
          order: the masthead, the photographs, the tally, then three more photographs, and
          only after all of that the four rooms — the shape of the record — arrived. So a
          reader met the record twice as pictures before ever learning what it is made of.

          The order now is an argument, and it is the record's own:
            1. it names itself (masthead and Jane's voice on the painting)
            2. it shows you the world (Janine's photographs)
            3. it says how much is on it (the tally)
            4. it says what it is made of (the four rooms)
            5. it holds three entries up for you to look at
            6. and only then does it ask anything of you — the subjects, and the way in.
          Nothing new on the page. The same parts, in the order a person reads. The painting
          and the pictures are untouched; they simply now arrive in the right place. ── */}

      {/* ── THE TALLY — how much is on the record, immediately before the four rooms
             that add up to it. A total followed by its breakdown is a shape; a total
             stranded between two picture bands is a caption. ── */}
      {/* ── A LEDGER LINE, NOT A NEWS TICKER ────────────────────────────────────────
          This strip used to say LIVE with a pulsing dot, which is the furniture of a
          newsroom and the one thing this record is not: a record does not go live, it
          fills up. So the words are the record's own — what it holds, and how much of
          it is in each room — printed flat on the ink, with nothing blinking. It also
          does the work of the old four-figure bar: the total and its breakdown, on one
          line, before the reader is asked to choose a room. */}
      <div className="bg-[#241d16] px-4 py-2.5 lg:px-10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#efe7d6]/75">The record holds</span>
        <span className="text-[11px] font-mono tracking-[0.04em] text-[#efe7d6]">
          {items.length + actions.length} {t.entries_now} — {doorCounts.solution} solutions · {doorCounts.climate_crisis} crises · {doorCounts.actions} actions · {doorCounts.groups} groups
        </span>
      </div>

      {/* ── THE PICTURES — what people are doing and what is at risk, held up now that the
             reader knows what the record is made of. The space is held while it loads, so
             nothing jumps on arrival. ── */}
      {(loading || featured.length > 0) && (
        <div className="record-featured-section record-image-section px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-10 bg-[#efe7d6]">
          {/* ── NOT "SIGNALS" ────────────────────────────────────────────────────────────
              This band used to be headed "Signals", which is also the name of the wire in the
              top nav — so the page had two different things wearing one word, and Brian asked
              the fair question: "what are signals on page… we have it in top nav but what is
              it on page?" Signals is the wire: dated, sourced, what changed and who says so.
              This band is not that. It is what the record is holding up for a reader to look
              at, so it says that, and the word Signals now means one thing on this record.
              "Leading" was worse than Signals: leading is a word from a newspaper's front
              page, and it says the record is competing for attention. It is not. It is
              holding these up. ── */}
          <RecordSectionHeading title="On the record" count={loading ? undefined : featured.length} tone="text-record-red" />
          {/* A phone swipes the lead pictures instead of scrolling past all of them.
              Three plates stacked at four-by-three is two full screens of photographs
              before a reader reaches the subjects, and Brian said so on 18 November:
              "scrolling down on record through all images didn't feel good… took a while
              to find subjects." Every picture is still here, in the same order, with its
              credit — they are simply side by side, one thumb-width each, so the record's
              working parts arrive in one screen instead of three. A desk keeps the row of
              three, because a desk has the room and no thumb doing the swiping. */}
          <RecordHolding items={featured} loading={loading} />
        </div>
      )}

      </div>{/* /record-home-flow */}

      {/* ── TOOLBAR — the record's subjects on one side, the one way in with something of
             your own on the other. The search that reaches everything is the one pill in
             the header: one search, not two. ── */}
      <div className="record-home-entry-toolbar hidden sm:block px-4 lg:px-10 pb-5 pt-4 lg:pb-6 bg-[#efe7d6]">
        {/* ── ONE LINE, ONE PLATE, FOUR WAYS TO ADD — IN THAT ORDER ────────────────────
            Brian, 19 November: "explore by theme squashed on desktop… doesn't feel like in
            right position for record… should add solution and crisis etc be underneath the
            explore by theme." He is describing a column that was doing three jobs at once:
            the theme line sat beside a button in a narrow flex column, so on a desk the plate
            was squeezed into two-thirds of the width, and the one way to add anything was
            parked off to the side where it belonged to nothing.

            So the sheet is read top to bottom, the way a contents page is: the theme line,
            then the plate under it at the full width of the paper, then the four ways to add
            something — solution, crisis, action, group — each wearing its room's drawing and
            each opening the form on that room. The paste line stays under them, because it is
            about the same job: putting something on the record. ── */}
        {/* ── ONE QUIET LINE, NOT A SECOND SET OF FOUR BOXES ───────────────────────────
            Brian, 19 November: "why add solution etc and solutions climate crises etc feel
            disjointed bro." He was right, and the fault was that the page carried TWO sets of
            four: the four room plates above, big and pigmented, and then four pale boxes here
            with the same four names in them. Same words, two weights, no reason — so the
            backbone read as a filter bar and the way in read as a toolbar.

            The way in is a footnote to the rooms, not a rival to them: one line, four marked
            words, each opening the form on that room. The rooms keep the colour; this keeps
            the job. ── */}
        {/* ── THE DOOR IS A PLATE NOW, NOT SMALL PRINT ────────────────────────────────
            Brian, 24 November: adding a crisis, a solution, an action or a group "must be
            easy as fuck to get to", because on the day of an event the people with
            something to give are standing in a field with a phone and no patience. It was
            four underlined words at ten pixels in the footnote grey — four ways to give the
            world something, printed smaller than the small print. See RecordAddPlate. */}
        <RecordAddPlate onPick={(type) => { setSubmitType(type); setShowSubmit(true); }} />
        <p className="mt-2 text-[11.5px] font-mono leading-relaxed text-[#5a5246]">
          Got a link or an email to share? Add it above and we’ll help fill in the details.
        </p>
        {/* "Support welcome" is off this line at Janine's request, 9 November: donations
            are for a host to handle, and are being saved for those conversations. The
            no-advertising line came off on 19 November — the governance band says it. */}
      </div>

      {/* ── CONTENT ── */}
      <div id="record-entries" ref={contentRef} className="record-entry-sections">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
            <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-4">{t.connect}</p>
          </div>
        ) : (
          <>
            {/* ── WHICH ROOM YOU ARE STANDING IN ─────────────────────────────────────
                A door narrows the record to one kind and carries you down to it, which used
                to leave the doors off-screen with nothing on the page saying which room you
                were in — the only way back was to remember to tap the same door again. This
                line says it, in the record's voice, and takes you back to all four. A line,
                not a bar of controls. */}
            {(openDoor || activeSubject) && (
              <button
                onClick={() => selectTheme('all')}
                className="w-full flex items-center justify-between gap-3 px-4 lg:px-10 pt-5 pb-3 text-left"
              >
                <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#3a342c]">
                  {activeSubject ? activeSubject.label : `Showing ${openDoor.label} only`}
                </span>
                <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#b3261e]">
                  {activeSubject ? 'Every theme →' : 'All four →'}
                </span>
              </button>
            )}
            {showEntries && solutions.length > 0 && (
              <section className="record-image-section px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
                <RecordSectionHeading title={t.solutions} count={solutions.length} tone="text-record-botanical" mark={RoomMarkSolution} />
                <RecordEntryList items={solutions} />
              </section>
            )}
            {showEntries && crises.length > 0 && (
              <section className="record-image-section px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
                <RecordSectionHeading title={t.crises} count={crises.length} tone="text-record-red" mark={RoomMarkCrisis} />
                <RecordEntryList items={crises} />
              </section>
            )}
            {showEntries && (solutions.length + crises.length) === 0 && (
              <div className="py-16 text-center px-4">
                {/* The drawing, on every screen. A desk used to be handed a generic globe
                    here while the phone got the subject's own mark — the same fault as the
                    index above, in the one place where the mark is all the reader has. */}
                <SubjectMark subject={activeSubject?.id || 'all'} size={40} className="mx-auto text-record-ink" />
                {subjectGap ? (
                  <>
                    <p className="text-[#141210] text-[12px] font-mono uppercase mt-3 leading-relaxed">
                      {t.subject_empty.replace('{subject}', activeSubject.label)}
                    </p>
                    <p className="text-[#5a5246] text-[11px] font-mono mt-2 leading-relaxed max-w-[300px] mx-auto">
                      It goes in through the same door as everything else — with a link to where it came from, and a person to look at it.
                    </p>
                    <button
                      onClick={() => { setSubmitCategory(activeSubject.id); setShowSubmit(true); }}
                      className="inline-flex items-center justify-center gap-2 mt-4 px-5 py-3 min-h-[48px] bg-[#e2602a] text-[#141210] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
                    >
                      <Plus className="w-4 h-4" /> {t.subject_add}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-3">{t.empty}</p>
                    <Link
                      to="/ClimateSearch"
                      className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-black font-mono uppercase tracking-widest text-[#b3261e] active:text-[#e2602a]"
                    >
                      Search the whole record →
                    </Link>
                  </>
                )}
              </div>
            )}
          </>
        )}

        <div className="record-home-sections">
        {(selectedType === 'all' || selectedType === 'actions') && (
          <RecordActionsSection actions={filteredActions} totalCount={actions.length} copy={t} />
        )}
        {/* ── GROUPS — Janine's spec, item 10: people working on the same thing in an area can share
               directly. The door is on the page, not in an email: an organiser starts their own
               gathering, and the record carries ONLY the one contact line they chose to publish.
               Their account email is never shown, and nothing is invented on their behalf. ── */}
        {selectedCategory === 'all' && (selectedType === 'all' || selectedType === 'groups') && (
          <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
            <RecordSectionHeading title={t.groups} count={filteredGroups.length} tone="bg-[#ffd447] text-[#141210] px-1.5 py-0.5" mark={RoomMarkGroups} />
            <RecordStandfirst>{t.groups_sub}</RecordStandfirst>
            {/* Said out loud, on the section itself, so nobody has to guess how far the record
                has gone for them. A group is an introduction the organiser wrote; it carries no
                source, so the record says carried, not checked — the same honesty every entry
                here is held to, in the one line a reader actually needs. */}
            <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">Groups describe their own work. Contact the organiser to find out more.</p>
            <button
              onClick={() => { setSubmitType('group'); setShowSubmit(true); }}
              className="w-full lg:w-auto lg:px-6 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] bg-[#ffd447] text-[#141210] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e8bd2a] active:text-[#141210] transition-colors"
            >
              <Users className="w-4 h-4" /> Start a group
            </button>
            <p className="text-[12px] text-[#5a5246] leading-[1.65] mt-2 mb-3">{t.groups_note}</p>
            {filteredGroups.length > 0 ? (
              <div className="space-y-2 md:grid md:grid-cols-2 md:gap-2.5 md:space-y-0">
                {filteredGroups.map(g => (
                  <div key={g.id} className="border border-record-ink/30 border-t-4 border-t-record-signal bg-record-paper p-4">
                    <h4 className="font-display text-lg font-bold uppercase leading-tight text-record-ink">{g.name}</h4>
                    {g.topic && (
                      <span className="inline-block text-[9px] font-black font-mono uppercase tracking-widest bg-[#ffd447] text-[#141210] border border-[#141210] px-1.5 py-0.5 mt-1.5">{g.topic}</span>
                    )}
                    <div className="flex items-center gap-1.5 text-[#141210] mt-1.5">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] font-black font-mono uppercase tracking-widest">{g.region || 'Global'}</span>
                    </div>
                    <p className="text-[12.5px] text-[#3a342c] leading-relaxed mt-2">{g.description}</p>
                    {g.contact_email ? (
                      <a href={`mailto:${g.contact_email}`} className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-black font-mono uppercase text-[#b3261e] active:text-[#e2602a]">
                        Contact organizer →
                      </a>
                    ) : (
                      <p className="mt-2.5 pt-2.5 border-t border-[#141210]/15 text-[10px] font-mono uppercase tracking-wide text-[#5a5246] leading-relaxed">
                        Open group · contact line being arranged
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] font-mono text-[#5a5246] py-6 text-center">{liveGroups.length === 0 ? t.groups_empty : t.empty}</p>
            )}
          </section>
        )}

        {/* ── SMALLEST GESTURES — Janine's list: what any of us can copy this afternoon ── */}
        <SmallGesturesBand />

        {/* ── DEFINITIONS ── each term in the words of the body that defined it,
               and the way through to that body so it can be checked. ── */}
        <DefinitionsBand heading={t.defs} />

        {/* ── GOVERNANCE ── */}
        <section className="record-home-governance border-t-4 border-record-red bg-record-ink px-4 py-8 text-record-paper lg:px-10 lg:py-14">
          <h2 className="mb-5 font-display text-[27px] font-bold uppercase leading-tight text-record-signal lg:text-[42px]">{t.govern}</h2>
          <p className="max-w-full font-body text-[15px] leading-[1.75] text-record-paper lg:max-w-[640px]">{t.govern_body}</p>
          {/* The two ways out of this paragraph, side by side and the same size. They were a
              stack of two differently-cut buttons with a line of small print under them, which
              made the foot of the page read as an afterthought to the argument above it. */}
          <div className="grid gap-2 sm:grid-cols-2 max-w-[640px] mt-6">
            <Link to={createPageUrl('ExtractionProofCovenant')} className="flex min-h-[48px] items-center justify-center gap-2 border border-record-signal bg-record-signal px-3 py-3 text-center font-display text-xs font-bold uppercase text-record-ink transition-colors hover:bg-record-paper">
              {t.covenant} <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
            <a href="https://www.solutions-site.org/" target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] items-center justify-center gap-2 border border-record-paper bg-record-paper px-3 py-3 text-center font-display text-xs font-bold uppercase text-record-ink transition-colors hover:bg-record-signal">
              Horizon Solutions Site ↗
            </a>
          </div>
          {/* HELD at Janine's request, 9 November 2026. The line that stood here — "this
              platform is one part of UF51's Planetary Healing family… TAKE ACTION" — is
              not on the page. Read by a potential host it argues that the record is one
              product inside somebody else's company, which is exactly the confusion a
              funder or an institute cannot afford to carry. The record does not need it:
              everything it claims is already on the page, with a source. Nothing deleted —
              the words are in the tongue dictionaries, waiting, if she ever wants them back. */}
        </section>

        {/* Terms and Privacy now sit in the shared footer, on every page of the record. */}
        </div>

      </div>

      {showSubmit && (
        <ClimateSubmitForm
          initialCategory={submitCategory}
          initialType={submitType || undefined}
          onClose={() => {
            const wasGroup = submitType === 'group';
            setShowSubmit(false);
            setSubmitCategory(null);
            setSubmitType(null);
            // A group that just went up should be on the wall it was sent from.
            if (wasGroup) {
              base44.entities.ClimateGroup.list().then(v => setGroups(Array.isArray(v) ? v : (v?.items || []))).catch(() => {});
            }
          }}
        />
      )}
    </div>
  );
}