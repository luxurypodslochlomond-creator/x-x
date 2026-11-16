import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Globe, Droplets, Leaf, Sun, Waves, TreePine, Recycle, Zap, MapPin, Bird, Fish, Sprout, CloudRain, Wind, ArrowRight, X, Share2, Check, Plus, Users } from 'lucide-react';
import ActionCard from '@/components/climate/ActionCard';
import ClimateSubmitForm from '@/components/climate/ClimateSubmitForm';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import ClimateImpactBar from '@/components/climate/ClimateImpactBar';
import ClimateImageCrawl from '@/components/climate/ClimateImageCrawl';
import { shareRecord } from '@/components/climate/shareRecordCard';
import { isPreviewSandbox } from '@/lib/previewWorkers';
import { seedTranslations } from '@/components/shared/translation/translationCache';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import SignalCode from '@/components/climate/SignalCode';
import SubjectRail from '@/components/climate/SubjectRail';
import SubjectIndexSheet from '@/components/climate/SubjectIndexSheet';
import SubjectMark from '@/components/climate/SubjectMark';
import SignalBeacon from '@/components/climate/SignalBeacon';
import PeaceBell from '@/components/climate/PeaceBell';
import SmallGesturesBand from '@/components/climate/SmallGesturesBand';
import DefinitionsBand from '@/components/climate/DefinitionsBand';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';


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

import { CATEGORY_IMAGE } from '@/components/climate/categoryImages';
import RecordCover from '@/components/climate/RecordCover';

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
  en: { title_a: 'Together we can change the', title_b: 'course', title_c: 'of climate change', sub: 'A public record of climate emergencies and the positive actions that work — shared openly, internationally — so anyone on Earth can replicate what good looks like.', service: 'A public service · for the world', noads: 'No advertising', nofund: 'No sponsorship', donate: 'Support welcome', search: 'Search solutions, crises and actions…', solutions: 'Solutions', crises: 'Climate Crises', crises_short: 'Crises', defs: 'Definitions', rev: 'Reviewed', connect: 'Connecting the planet…', empty: 'No entries match yet.', govern: 'Built for the planet — and kept in the open', govern_body: 'Spam is screened automatically; clear entries go on the record at once, and anything unclear waits for a human check. A solution or a crisis goes on only with a link to the original source; if that link cannot be opened, it waits for a person. Images must be copyright-free, and location is kept to a rough region to protect privacy. Money never buys a place on the record, and support is declared in the open. The interface is translated on the platform; entries are translated by our community over time.', covenant: 'Read our open-source covenant', family: 'This platform is one part of UF51\'s Planetary Healing family — what is recorded here feeds our work on the ground.', action: 'Take action', honour: 'Built in honour of Janine M. H. Selendy & Horizon International — and released to the world, the planet, all of us.', all: 'All', featured: 'Signals', groups: 'Groups', groups_sub: 'People working on the same thing in an area can share ideas directly — find your region or topic, and write to the organiser.', groups_note: 'The record shows only the one contact line an organiser chooses. Your own email is never published.', live: 'Live record', entries_now: 'entries on the record right now', actions: 'Actions', actions_sub: 'Cleanups, plantings, meetings, policy submissions — real things happening on the ground. Contact the organiser directly. The platform never sees your messages.', actions_empty: 'No actions listed yet — be the first to add one.', groups_empty: 'No groups yet — start the first one. Name it, give your rough region, and say what you are working on.', subject_empty: 'Nothing under {subject} yet — the record is waiting for the first.', subject_add: 'Add one for review' },
  es: { title_a: 'Juntos cambiamos el', title_b: 'curso', title_c: 'del cambio climático', sub: 'Un registro público de emergencias climáticas y las acciones positivas que funcionan — compartido abiertamente, internacionalmente — para que cualquiera en la Tierra pueda replicar lo que funciona.', service: 'Un servicio público · para el mundo', noads: 'Sin publicidad', nofund: 'Sin patrocinio', donate: 'Apoyo bienvenido', search: 'Buscar soluciones y crisis…', solutions: 'Soluciones', crises: 'Crisis Climáticas', defs: 'Definiciones', rev: 'Revisado', connect: 'Conectando el planeta…', empty: 'Sin resultados aún.', govern: 'Construido para el planeta — y para ser confiable', govern_body: 'El spam se filtra automáticamente; las entradas claras pasan al registro de inmediato, y lo que no está claro espera una revisión humana. Solo se usan imágenes sin derechos de autor. La ubicación se mantiene en una región aproximada para proteger la privacidad, siendo honesta y verificable. La plataforma funciona como servicio público — sin publicidad, sin patrocinio, y el dinero nunca compra un lugar en el registro. El apoyo es bienvenido y se declara en abierto. Las traducciones de la interfaz se ofrecen en la plataforma; las entradas son traducidas por nuestra comunidad con el tiempo.', covenant: 'Lee nuestro pacto de código abierto', family: 'Esta plataforma es parte de la familia de Curación Planetaria de UF51 — las soluciones verificadas aquí son el motor de conocimiento detrás de nuestra acción sobre el terreno.', action: 'Actúa', honour: 'Construido en honor de Janine M. H. Selendy y Horizon International — y entregado al mundo, al planeta, a todos nosotros.', all: 'Todo', featured: 'Señales' },
  fr: { title_a: 'Ensemble, nous changeons le', title_b: 'cours', title_c: 'du changement climatique', sub: 'Un registre public des urgences climatiques et des actions positives qui fonctionnent — partagé ouvertement, à l\'international — pour que chacun sur Terre puisse répliquer ce qui fonctionne.', service: 'Un service public · pour le monde', noads: 'Aucune publicité', nofund: 'Aucun parrainage', donate: 'Soutien bienvenu', search: 'Rechercher solutions et crises…', solutions: 'Solutions', crises: 'Crises Climatiques', defs: 'Définitions', rev: 'Vérifié', connect: 'Connexion de la planète…', empty: 'Aucun résultat pour l\'instant.', govern: 'Conçu pour la planète — et pour être digne de confiance', govern_body: 'Le spam est filtré automatiquement ; les entrées claires sont publiées immédiatement, et tout ce qui n\'est pas clair attend une vérification humaine. Seules des images libres de droits sont utilisées. La localisation est limitée à une région approximative pour protéger la vie privée, tout en restant honnête et vérifiable. La plateforme fonctionne en service public — sans publicité, sans parrainage, et l\'argent n\'achète jamais une place dans le registre. Le soutien est bienvenu et déclaré au grand jour. Les traductions de l\'interface sont fournies sur la plateforme; les entrées sont traduites par notre communauté au fil du temps.', covenant: 'Lire notre pacte open source', family: 'Cette plateforme fait partie de la famille de Guérison Planétaire UF51 — les solutions vérifiées ici sont le moteur de connaissance derrière notre action de terrain.', action: 'Agir', honour: 'Construit en l\'honneur de Janine M. H. Selendy et Horizon International — et remis au monde, à la planète, à nous tous.', all: 'Tout', featured: 'Signaux' },
  de: { title_a: 'Gemeinsam ändern wir den', title_b: 'Lauf', title_c: 'des Klimawandels', sub: 'Ein öffentliches Register von Klimanotlagen und positiven Maßnahmen, die funktionieren — offen geteilt, international — damit jeder auf der Erde nachahmen kann, was gut ist.', service: 'Ein öffentlicher Dienst · für die Welt', noads: 'Keine Werbung', nofund: 'Kein Sponsoring', donate: 'Unterstützung willkommen', search: 'Lösungen und Krisen suchen…', solutions: 'Lösungen', crises: 'Klimakrisen', defs: 'Definitionen', rev: 'Geprüft', connect: 'Planet verbinden…', empty: 'Noch keine Treffer.', govern: 'Für den Planeten gebaut — und gebaut, um vertraut zu werden', govern_body: 'Spam wird automatisch gefiltert; klare Einträge gehen sofort ins Register, und alles Unklare wartet auf eine menschliche Prüfung. Es werden nur urheberrechtsfreie Bilder verwendet. Der Standort bleibt grob, um die Privatsphäre zu schützen, bleibt aber ehrlich und überprüfbar. Die Plattform ist Open Source, extraktionssicher und ein öffentlicher Dienst — ohne Werbung, ohne Sponsoring, und Geld kauft nie einen Platz im Register. Unterstützung ist willkommen und wird offen ausgewiesen. Oberflächenübersetzungen werden auf der Plattform angeboten; Einträge werden mit der Zeit von unserer Gemeinschaft übersetzt.', covenant: 'Unser Open-Source-Pakt', family: 'Diese Plattform ist Teil der UF51 Planetary-Healing-Familie — die verifizierten Lösungen hier sind die Wissens-Engine hinter unserer Arbeit vor Ort.', action: 'Handeln', honour: 'Zu Ehren von Janine M. H. Selendy & Horizon International gebaut — und der Welt, dem Planeten, uns allen übergeben.', all: 'Alle', featured: 'Signale' },
  pt: { title_a: 'Juntos mudamos o', title_b: 'curso', title_c: 'das mudanças climáticas', sub: 'Um registro público de emergências climáticas e das ações positivas que funcionam — partilhado abertamente, internacionalmente — para que qualquer pessoa na Terra possa replicar o que está bom.', service: 'Um serviço público · para o mundo', noads: 'Sem publicidade', nofund: 'Sem patrocínio', donate: 'Apoio bem-vindo', search: 'Pesquisar soluções e crises…', solutions: 'Soluções', crises: 'Crises Climáticas', defs: 'Definições', rev: 'Revisto', connect: 'A conectar o planeta…', empty: 'Ainda sem resultados.', govern: 'Construído para o planeta — e para ser confiável', govern_body: 'O spam é filtrado automaticamente; as entradas claras passam para o registro de imediato, e o que não está claro aguarda uma verificação humana. Apenas imagens livres de direitos são usadas. A localização é mantida numa região aproximada para proteger a privacidade, permanecendo honesta e verificável. A plataforma funciona como serviço público — sem publicidade, sem patrocínio, e o dinheiro nunca compra um lugar no registro. O apoio é bem-vindo e é declarado abertamente. As traduções da interface são fornecidas na plataforma; as entradas são traduzidas pela nossa comunidade ao longo do tempo.', covenant: 'Ler o nosso pacto open source', family: 'Esta plataforma faz parte da família de Cura Planetária UF51 — as soluções verificadas aqui são o motor de conhecimento por trás da nossa ação no terreno.', action: 'Agir', honour: 'Construído em honra de Janine M. H. Selendy & Horizon International — e entregue ao mundo, ao planeta, a todos nós.', all: 'Todos', featured: 'Sinais' },
  hi: { title_a: 'साथ मिलकर हम जलवायु परिवर्तन का', title_b: 'रुख', title_c: 'बदल रहे हैं', sub: 'जलवायु आपातकालों और काम करने वाले सकारात्मक कार्यों का एक सार्वजनिक अभिलेख — खुले में, अंतरराष्ट्रीय स्तर पर साझा — ताकि पृथ्वी पर कोई भी अच्छे की नकल कर सके।', service: 'एक सार्वजनिक सेवा · दुनिया के लिए', noads: 'कोई विज्ञापन नहीं', nofund: 'कोई प्रायोजन नहीं', donate: 'समर्थन का स्वागत है', search: 'समाधान और संकट खोजें…', solutions: 'समाधान', crises: 'जलवायु संकट', defs: 'परिभाषाएँ', rev: 'समीक्षित', connect: 'ग्रह जोड़ रहे हैं…', empty: 'अभी कोई परिणाम नहीं।', govern: 'ग्रह के लिए निर्मित — और विश्वसनीय होने के लिए निर्मित', govern_body: 'स्पैम स्वतः छाँटा जाता है; स्पष्ट प्रविष्टियाँ तुरंत अभिलेख में जाती हैं, और जो स्पष्ट नहीं है वह मानवीय जाँच की प्रतीक्षा करता है। केवल कॉपीराइट-मुक्त छवियाँ उपयोग होती हैं। स्थान गोपनीयता के लिए मोटे क्षेत्र तक सीमित रहता है, फिर भी ईमानदार और सत्यापन योग्य। यह मंच ओपन सोर्स, निष्कर्षण-रोधी है, और सार्वजनिक सेवा के रूप में चलता है — कोई विज्ञापन नहीं, कोई प्रायोजन नहीं, और पैसा कभी अभिलेख में जगह नहीं खरीदता। समर्थन का स्वागत है, और वह खुले में दर्ज होता है। इंटरफ़ेस अनुवाद मंच पर उपलब्ध हैं; प्रविष्टियाँ समय के साथ हमारे समुदाय द्वारा अनुवादित होती हैं।', covenant: 'हमारा ओपन सोर्स संकल्प पढ़ें', family: 'यह मंच UF51 की प्लैनेटरी हीलिंग परिवार का हिस्सा है — यहाँ की सत्यापित समाधान हमारे ज़मीनी कार्य के पीछे ज्ञान इंजन हैं।', action: 'कार्रवाई करें', honour: 'जनीन एम. एच. सेलेंडी और होराइज़न इंटरनेशनल के सम्मान में निर्मित — और दुनिया, ग्रह, हम सबको सौंपा गया।', all: 'सभी', featured: 'संकेत' },
  zh: { title_a: '我们携手正在改变', title_b: '气候变化的走向', title_c: '', sub: '一个关于气候紧急事件和行之有效的积极行动的公开记录——开放共享，跨越国界——让地球上任何人都能复制优秀的范例。', service: '一项公共服务 · 为了这个世界', noads: '无广告', nofund: '无赞助', donate: '欢迎支持', search: '搜索解决方案与危机…', solutions: '解决方案', crises: '气候危机', defs: '定义', rev: '已审核', connect: '正在连接地球…', empty: '暂无匹配内容。', govern: '为地球而生——并生来值得信赖', govern_body: '每条内容在发布前都经过审核。仅使用无版权图片。位置保留为大致区域以保护隐私，同时保持诚实与可验证。平台开源、防提取，并作为公共服务运行——无广告、无赞助，金钱永远买不到记录中的位置。支持受到欢迎，并公开列明。界面翻译在平台上提供；条目由我们的社区随时间逐步翻译。', covenant: '阅读我们的开源契约', family: '本平台是UF51“行星疗愈”家族的一部分——此处经核实的解决方案是支撑我们实地行动的知识引擎。', action: '采取行动', honour: '为致敬Janine M. H. Selendy与国际云而建——并献给这个世界、这个星球、我们所有人。', all: '全部', featured: '信号' },
  ar: { title_a: 'معًا نُغيّر', title_b: 'مسار', title_c: 'تغير المناخ', sub: 'سجلّ عام لحالات الطوارئ المناخية والإجراءات الإيجابية التي تنجح — مشترك علنًا، دوليًا — ليستطيع أي شخص على الأرض تكرار ما هو جيد.', service: 'خدمة عامة · للعالم', noads: 'لا إعلانات', nofund: 'لا رعاية', donate: 'الدعم مرحّب به', search: 'ابحث عن الحلول والأزمات…', solutions: 'الحلول', crises: 'أزمات المناخ', defs: 'تعريفات', rev: 'تمت المراجعة', connect: 'جارٍ توصيل الكوكب…', empty: 'لا نتائج مطابقة بعد.', govern: 'مبني من أجل الكوكب — ومبني ليكون موثوقًا', govern_body: 'تتم مراجعة كل إدخال قبل النشر. تُستخدم الصور الخالية من حقوق النشر فقط. يُحافظ على الموقع كمنطقة تقريبية لحماية الخصوصية، مع بقائه صادقًا وقابلاً للتحقق. المنصة مفتوحة المصدر ومحمية من الاستغلال وتعمل كخدمة عامة — لا إعلانات ولا رعاية، والمال لا يشتري مكانًا في السجل. الدعم مرحّب به ويُعلن في العلن. تُقدَّم ترجمات الواجهة على المنصة؛ وتُترجم الإدخالات من قبل مجتمعنا بمرور الوقت.', covenant: 'اقرأ ميثاقنا مفتوح المصدر', family: 'هذه المنصة جزء من عائلة الشفاء الكوكبي UF51 — الحلول الموثقة هنا هي محرك المعرفة وراء عملنا الميداني.', action: 'اتخذ إجراء', honour: 'بُني تكريمًا لـ Janine M. H. Selendy وهورايزون إنترناشونال — وسُلّم إلى العالم، إلى الكوكب، إلى جميعنا.', all: 'الكل', featured: 'إشارات' },
};

seedTranslations(T);

 function SolutionCard({ item, lead = false }) {
     // Green says solution, red says emergency. A crisis card wears the record's red — it
     // had been wearing the same blue as every other link here, so the most urgent entry
     // on the page read as the calmest thing on it.
     const isSolution = item.entry_type === 'solution';
     // A solution may wear its category's picture when it arrived without one of its own.
     // A crisis may not. The category fallback put a beach of coral sand over a coral
     // emergency, because a category picture is the picture of the topic, not of the event —
     // and illustrating somebody's emergency with a pleasant stock photo of the same subject
     // is the record telling a softer story than the entry does. A crisis shows the photograph
     // it was given, or it shows the record's own plate and says its line on it. Nothing is
     // invented to fill the frame.
     const cardImage = item.image_url || (isSolution ? CATEGORY_IMAGE(item.category) : null);

     return (
       <Link
         to={`/ClimateDetail/${item.entry_type}/${item.id}`}
         className={`relative text-left overflow-hidden bg-[#241d16] border border-[#241d16] active:border-[#e2602a] ${
           isSolution ? 'border-t-4 border-t-[#1e3a2b]' : 'border-t-4 border-t-[#b3261e]'
         } ${lead ? 'col-span-2 aspect-[16/11]' : 'aspect-[4/3]'} flex items-end active:scale-95 transition-transform duration-100`}
       >
         {cardImage ? (
           <img
             src={cardImage}
             alt=""
             loading="lazy"
             decoding="async"
             className="absolute inset-0 w-full h-full object-cover"
             /* Colour, not grey. Every photograph on this page was drained to black and white,
                which is half of why the whole record read as a machine's print-out. A news
                page shows the place itself. The scrim below still guarantees the words. */
             style={{ filter: 'saturate(1.06) contrast(1.04)' }}
             /* A picture that will not open leaves the plate, never a substitute image: what
                stands in for a photograph is the entry's own words, not a different picture. */
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
           />
         ) : (
           /* The plate: the entry's kind, on the record's own deep ground, with the crisis rule
              held at the top. No photograph, because there was none to show. */
           <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #2a2219 0%, #241d16 55%, #1a140f 100%)' }} />
         )}
         {/* Gradient scrim — guarantees title readability on any image. A colour photograph can
             be bright white at its foot, so the scrim holds a touch harder than it did over grey:
             the cream words are never asked to fight the picture for the last inch. */}
         <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,18,16,0) 28%, rgba(20,18,16,0.72) 62%, rgba(20,18,16,0.92) 100%)' }} />
         <div className={`relative w-full ${lead ? 'p-4' : 'p-2.5'}`}>
           <div className={`text-[9px] font-black font-mono uppercase tracking-widest ${isSolution ? 'text-[#7fd6a0]' : 'text-[#ef5a4a]'}`}>
             {isSolution ? 'Solution' : 'Crisis'}
           </div>
           {/* A cut serif needs a little more size than a condensed sans did to hold its
               own over a photograph, so the card title gains a step and tightens its
               leading. Same words, same place, just not faint. */}
           <h3
             className={`text-[#efe7d6] line-clamp-3 mt-1 ${lead ? 'text-[21px] leading-[1.2]' : 'text-[15px] leading-[1.28]'}`}
             style={lead ? { fontFamily: 'var(--font-reading)', letterSpacing: '-0.01em' } : undefined}
           >
             {item.title}
           </h3>
         </div>
         </Link>
         );
         }

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
  const [copied, setCopied] = useState(false);
  // A link can name the door: ?submit=1 opens the form straight away, so a walkthrough sent
  // to a new checker can point at the exact place an initiative is added.
  const [showSubmit, setShowSubmit] = useState(
    () => new URLSearchParams(window.location.search).get('submit') === '1'
  );
  // Which door the one form opens on. A reader who taps "Start a group" should land with the
  // group door already open, rather than being handed a second form that drifts out of step
  // with the first — which is exactly what had happened.
  const [submitType, setSubmitType] = useState(null);
  const [showIndex, setShowIndex] = useState(false);
  const [submitCategory, setSubmitCategory] = useState(null);
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' && !navigator.onLine);
  const contentRef = useRef(null);
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

  const handleShare = async () => {
    // The picture travels with the message now, drawn on this device, with the record's
    // own address under it — not a link to the preview service. A chat shows the card at
    // once, and the address a person reads is the record's rather than a function's.
    const result = await shareRecord();
    if (result === 'copied') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selectedType]);

  // React always renders the source copy; the shared translator alone displays another language.
  // Existing hand-written translations are seeded above, keyed by that exact source.
  const t = T.en;

  // ── ONE PIGMENT PER ROOM ───────────────────────────────────────────────────────
  // Green for what works, red for what is burning, ochre for the people gathered,
  // orange for what is being done. Before, Groups wore Solutions' green and every door
  // flashed orange on hover — so three doors borrowed the Actions colour and only the
  // crises door looked like itself. A door now holds its own colour and nothing else:
  // ink until it is chosen, then the pigment its own section heading, card edge and
  // button already carry.
  const doors = [
    { key: 'solution', label: t.solutions, on: 'bg-[#1e3a2b] text-[#efe7d6]' },
    { key: 'climate_crisis', label: t.crises_short, on: 'bg-[#b3261e] text-[#efe7d6]' },
    { key: 'groups', label: t.groups, on: 'bg-[#9b6f28] text-[#efe7d6]' },
    { key: 'actions', label: t.actions, on: 'bg-[#e2602a] text-[#141210]' },
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
    <div dir={isRTL ? 'rtl' : 'ltr'} className="relative min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'var(--font-body)' }}>
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

      {/* ── OPENING BAND — her words, carried the way this record carries every voice.
             The founder page and the wire both open with a plate of ink: grain, a beacon,
             the words in the reading voice, the name in signal blue. Her line was the only
             quoted voice on this record sitting on flat paper with nothing around it, and
             that flatness — not the typeface — is what read cold and linear. The warm paper
             still holds the page open; the material now sits under her words, where it
             belongs. Her words are the record's first transmission, so they get its plate. ── */}
      <div className="bg-[#efe7d6] px-4 lg:px-8 py-7 lg:py-10 border-b-2 border-[#141210]/15" style={{ animation: 'twcc-epigraph 1.2s ease-out both' }}>
        <div className="relative mx-auto max-w-[760px] bg-[#241d16] border-2 border-[#241d16] px-5 pt-6 pb-6 overflow-hidden">
          {/* THE COVER BEHIND HER WORDS ─────────────────────────────────────────────────
              Her line used to sit on a flat dark plate: the right idea (a deep ground, so the
              words carry) with nothing behind it, which is why it read as a card rather than
              as a voice in a room. The record's own painting now stands in the ground behind
              her — the living earth, in the dark, lit from one side. It is the same work that
              opens the page, so the page has one hand under it from the first line to the
              last. Held back far enough that her sentence never has to fight it, and cool
              where the words are warm, because the words have to win. */}
          {/* A different part of the same canvas: the earth's own ground, not the sky. Two
              crops of one work read as a book printed from one painting; the same crop twice
              in one fold reads as a duplicated image. */}
          <RecordCover position="center 84%" strength={0.45} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(36,29,22,.58) 0%, rgba(36,29,22,.68) 45%, rgba(36,29,22,.88) 100%)' }}
          />
          {/* No ruled texture inside her plate. The scanline was the record's attempt to
              look like a transmission, and it did the opposite of what it was for: a warm
              paper ground, a painted sky and a moving set of rules over the top of them is
              three textures arguing, and the winning feeling is noise. The painting, the
              grain and the words are enough. Air is the thing that reads as alive. */}

          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#7fc9e4] animate-pulse flex-shrink-0" />
              <span className="text-[8px] font-black font-mono uppercase tracking-[0.25em] text-[#efe7d6]/50 leading-tight">
                A voice on the record
              </span>
              <span className="w-1 h-1 rounded-full bg-[#7fc9e4] animate-pulse flex-shrink-0" />
            </div>

            {/* Her own mark, here and nowhere else: the bell she rings to name a
                commitment, and her ask that everyone with her make one too. It does
                the job the beacon does — one wordless mark, ringing outward — but in
                her voice rather than the record's. The beacon keeps the record. */}
            <PeaceBell size={40} color="#7fc9e4" href="https://webtv.un.org/en/asset/k13/k13z7vjtvs" />

            {/* The first human voice on the record — the reading voice, which is the
                record's own lettering given air: larger, looser, one step slower than
                the frame around it. The label above and the credit below keep the
                machine voice, because the frame must never sound like the person. */}
            <blockquote
              className="text-[#efe7d6] max-w-[42ch] leading-[1.62]"
              style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(18px, 2.8vw, 25px)' }}
            >
              “Every single day, we hold the power to shape the world around us.”
            </blockquote>

            <div className="flex flex-col items-center gap-1.5">
              <p className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#7fc9e4]">
                Dr. Jane Goodall
              </p>
              {/* One house, named once — and the name ON the line is the house the
                  link OPENS. Dr. Jane's own institute published this line, and it is
                  the body that answers for it, so both the words and the tap point at
                  it: a reader who taps through lands on the name they just read, never
                  beside it. A credit that named one body and opened another would be
                  the one kind of wrong this record does not allow itself. */}
              <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#efe7d6]/55">
                <a
                  href="https://janegoodall.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-[#7fc9e4] underline decoration-dotted decoration-1 underline-offset-[5px] active:decoration-solid active:opacity-80"
                >
                  the Jane Goodall Institute
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* The covenant sits underneath her words, not beside them. Bare, ours, and it opens the why.
            A hairline detaches it: it is the record's own mark, and inside her credit row it read
            as though it belonged to her. It stands centred on the page by itself. */}
        <span aria-hidden="true" className="block w-16 h-px bg-[#141210]/20 mt-5 mx-auto" />
        <div className="flex items-center justify-center gap-2 flex-wrap mt-3">
          <Link
            to="/XEqualsX"
            className="text-[12px] font-black font-mono text-record-mark tracking-[0.2em] leading-none underline decoration-dotted underline-offset-4"
          >
            x = x
          </Link>
        </div>
      </div>

      {/* ── HERO — two bands, bone and ink. The only colour in this block is one word. ── */}
      {/* The masthead's field was near-black, which put the whole record in a dark room before a
          single word had been read. It is deep earth now — still deep enough to carry the light
          type, and warm enough to belong to the paper below it. The photograph keeps its own
          colour for the same reason the cards do: this is a record of real places. */}
      <div className="relative bg-[#241d16] overflow-hidden" style={{ minHeight: 'clamp(460px, 62vh, 620px)' }}>
        {/* THE COVER, AT FULL STRENGTH ────────────────────────────────────────────────
            This picture used to be a stock photograph of the planet, blended into the
            band at forty-two per cent so it read as texture rather than as a picture.
            The effect was a dark room with a faint smudge in it: the record's own front
            door had less colour than any entry behind it, and a page about the living
            world opened in grey.

            Artists put a cover on the thing they made. So the record has one, painted for
            it rather than borrowed — the living earth, in space, in colour — and it is
            shown as a picture rather than hidden as a texture. The scrim does one job
            only: hold the words up where they sit. Everything below the limb is quiet in
            the painting itself, so the title keeps its ground without a black slab. */}
        <RecordCover position="center 34%" priority className="!pointer-events-none" style={{ filter: 'saturate(1.06) contrast(1.02)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(18,14,10,.34) 0%, rgba(18,14,10,.06) 30%, rgba(26,21,16,.52) 62%, rgba(36,29,22,.92) 86%, #241d16 100%)' }} />
        {/* The rules are gone from here too — see the note on her plate above. What is
            left over the painting is only the scrim that holds the title up. */}

        {/* Bone band — plain statement, and the way to pass it on. One line, nothing dropped in. */}
        <div className="relative z-10 bg-[#efe7d6] px-4 lg:px-10 py-3 flex items-center justify-between gap-3"
          style={{ animation: 'twcc-enter .25s ease-out both' }}>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#141210]">{t.service}</span>
          <button
            onClick={handleShare}
            aria-label="Share this platform"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 min-h-[40px] bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase tracking-wider whitespace-nowrap active:bg-[#e2602a] active:text-[#141210] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Share'}
          </button>
        </div>

        {/* Ink band */}
        <div className="relative z-10 px-4 lg:px-10 pt-10 lg:pt-16 pb-8 flex items-start" style={{ animation: 'twcc-enter .25s ease-out .04s both' }}>
          {/* The record's own name — the one heading on the record allowed to lead.
              It was built so the phone's width beat the floor: 11vw gave 43px on a
              393px screen and 47px at 430px, which made this the largest opening
              anywhere on the record by a wide margin, and is what made the page feel
              heavy in the hand. It now opens at 36px on a phone (40px at 430px) — one
              clear step above every other page's title (30-35px), still the largest.
              From 782px up it is the same 72px it always was. */}
          <h1 className="font-black uppercase leading-[0.94] max-w-[360px] lg:max-w-[640px] relative z-10 text-[#efe7d6]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 9.2vw, 72px)', letterSpacing: '0.004em' }}>
            {t.title_a}<br />
            <span className="text-[#e2602a]">{t.title_b}</span> {t.title_c}
          </h1>
          {/* The tilted rubber stamp is gone. It was three of the smallest words on the
              page, rotated, pulsing, and set in a ring that pulled the eye before the
              title did — the one element on the opening that was pure costume. The name
              of the record is already said in the masthead above and in the voice at the
              top of this page; saying it a third time in a badge made the page busier and
              no clearer. */}
        </div>

        {/* Closing band — ink, not a second colour. It was the brightest slab on the record,
             and that slab spent the blue before a single entry had been read, so there was
             nothing left for the blue to point at. The record opens deep and stays deep. */}
        {/* The flicker is gone. A sentence that blinks is a trick, and a trick is the
            cheapest way to look alive; the line reads better held steady. */}
        <div className="relative z-10 bg-[#241d16] px-4 lg:px-10 py-5 lg:py-7 mt-auto" style={{ animation: 'twcc-enter .25s ease-out .08s both' }}>
          {/* The record's own sentence, in its own voice — sentence case, on the deep
              band. Everything else in this band stays as it was. */}
          <p className="text-[16px] leading-[1.7] max-w-[360px] lg:max-w-[620px] text-[#efe7d6]" style={{ fontFamily: 'var(--font-reading)' }}>{t.sub}</p>
          {/* Raw prophetic tagline — Cash/Dylan/Young. A proverb, not copy. Same in every tongue. */}
          <p className="text-[11px] font-black font-mono uppercase leading-relaxed mt-3 text-[#efe7d6]/75 tracking-[0.06em]">
            Every symbol · every number · every tongue · nobody left behind · the noise is loud · the record is louder
          </p>
          {/* A picture earns its credit, and a credit says where a picture came from. This
              one came from nowhere else: it was painted for the record, so nobody's work
              is being used and nobody's name is being borrowed to make a page look better. */}
          <p className="text-[10px] font-mono uppercase tracking-[0.14em] mt-2.5 text-[#efe7d6]/55">
            Cover · painted for the record
          </p>
        </div>
      </div>

      {/* ── THE TOP CRAWL — Janine's credited photographs, directly under the masthead.
             Her ask was for the pictures to sit high on the page, and they still do: they
             come immediately after the record names itself, so the eye meets them first. ── */}
      <ClimateImageCrawl />

      <ClimateImpactBar />

      {/* ── THE PICTURES — what people are doing and what is at risk, before anything else.
             The space is held while the record loads, so nothing jumps on arrival. ── */}
      {(loading || featured.length > 0) && (
        <div className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-10 bg-[#efe7d6]">
          <RecordSectionHeading title={t.featured} count={loading ? undefined : featured.length} tone="text-[#e2602a]" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-4">
            {loading
              ? [0, 1, 2, 3].map(i => <div key={i} className="min-h-[124px] bg-[#141210]/10 border border-[#141210]/15 animate-pulse" />)
              : featured.map((item, i) => <SolutionCard key={item.id} item={item} lead={i === 0} />)}
          </div>
        </div>
      )}

      {/* ── LIVE RECORD STRIP — real counts, honest signal ── */}
      <div className="px-4 lg:px-10 py-2 bg-[#241d16] flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[10px] font-black font-mono uppercase tracking-widest text-[#efe7d6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
          {t.live}
        </span>
        <span className="text-[10px] font-mono text-[#efe7d6]/70">
          {items.length + actions.length} {t.entries_now}
        </span>
      </div>

      {/* ── TOOLBAR — the record's filters on one side, its own doors on the other.
             The search that reaches everything is the one pill in the header: one
             search, not two. On a desktop that reads as a working toolbar; on a phone
             it stacks. ── */}
      <div className="px-4 lg:px-10 pb-5 pt-4 lg:pb-6 bg-[#efe7d6]">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="lg:flex-1 lg:min-w-0">
            {/* Four doors, one line — on a phone as well as a desk.
                They were a flex row, and a flex row lets its longest label push the others
                about: "Climate Crises" took the room it wanted and the fourth door kept
                dropping onto a row of its own, which made the bar twice as deep as the words
                in it. A fixed four-column grid gives every door the same width and the row
                can no longer break, whatever the label or the tongue. Colours unchanged:
                the open door is filled, the rest stay the record's ink. */}
            <div className="grid grid-cols-4 gap-1.5 mb-3 lg:max-w-[540px]">
              {doors.map(d => (
                <button
                  key={d.key}
                  onClick={() => setSelectedType(selectedType === d.key ? 'all' : d.key)}
                  aria-pressed={selectedType === d.key}
                  className={`flex items-center justify-center text-center min-w-0 px-1 py-2.5 min-h-[44px] text-[10px] font-black font-mono uppercase leading-none border border-[#141210] transition-colors duration-150 active:scale-95 ${
                    selectedType === d.key
                      ? d.on
                      : 'bg-[#141210] text-[#efe7d6] hover:bg-[#2a231c]'
                  }`}
                >{d.label}</button>
              ))}
            </div>
            <div className="my-3 lg:hidden">
              <SubjectRail
                strip={filledSubjects}
                current={activeSubject}
                totalEntries={items.length + actions.length}
                allLabel="All subjects"
                selected={selectedCategory}
                expanded={showIndex}
                onOpenIndex={() => setShowIndex(open => !open)}
                onSelect={(id) => {
                  setSelectedCategory(id);
                  setShowIndex(false);
                  requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
                }}
              />
              <SubjectIndexSheet
                open={showIndex}
                onClose={() => setShowIndex(false)}
                filled={filledSubjects}
                empty={emptySubjects}
                totalEntries={items.length + actions.length}
                selected={selectedCategory}
                allLabel="All subjects"
                onSelect={(id) => {
                  setSelectedCategory(id);
                  setShowIndex(false);
                  requestAnimationFrame(() => {
                    document.getElementById('record-subject-toggle')?.focus({ preventScroll: true });
                    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  });
                }}
                onAdd={(subject) => {
                  setShowIndex(false);
                  setSubmitCategory(subject.id);
                  setShowSubmit(true);
                }}
              />
            </div>
            {/* "Support welcome" is off this line at Janine's request, 9 November: donations
                are for a host to handle, and are being saved for those conversations. */}
            <p className="text-[10px] font-mono mt-2 tracking-wide text-[#5a5246]">{t.noads} · {t.nofund}</p>
          </div>

          <div className="lg:w-[320px] lg:flex-shrink-0">
            <button
              onClick={() => setShowSubmit(true)}
              className="mt-3 lg:mt-0 w-full flex items-center justify-center gap-2 px-3 py-3.5 min-h-[48px] bg-[#e2602a] text-[#141210] text-[11px] font-black font-mono uppercase whitespace-nowrap border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
            >
              <Plus className="w-4 h-4 flex-shrink-0" /> Solution, crisis, group or action
            </button>
            <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-2">
              Been sent an email? Paste it in — we read it and fill the form in for you. No account needed, nothing to install.
            </p>

          </div>
        </div>
      </div>

      {/* ── THE SUBJECTS ──────────────────────────────────────────────────────────
          A phone gets the contents tab above, which opens the sheet; a desk keeps the
          full set laid flat, because there it fits and no thumb is doing the aiming. ── */}
      <div className="px-4 lg:px-10 pb-0 lg:pb-5 bg-[#efe7d6]">
        <div className="hidden lg:flex gap-1.5 flex-wrap" aria-label="Filter by subject">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 snap-start px-3 py-2.5 min-h-[40px] text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
              selectedCategory === 'all' ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210] active:bg-[#141210] active:text-[#efe7d6]'
            }`}
          >{t.all}</button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex-shrink-0 snap-start flex items-center gap-1 px-3 py-2.5 min-h-[40px] text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
                selectedCategory === c.id ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-[#efe7d6] text-[#141210] border-[#141210] active:bg-[#141210] active:text-[#efe7d6]'
              }`}
            >
              <SignalCode code={c.code} />{c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div id="record-entries" ref={contentRef} className="bg-[#efe7d6]">
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
            {openDoor && (
              <button
                onClick={() => setSelectedType('all')}
                className="w-full flex items-center justify-between gap-3 px-4 lg:px-10 pt-5 pb-3 text-left"
              >
                <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#3a342c]">
                  Showing {openDoor.label} only
                </span>
                <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#b3261e]">
                  All four →
                </span>
              </button>
            )}
            {showEntries && solutions.length > 0 && (
              <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
                <RecordSectionHeading title={t.solutions} count={solutions.length} tone="text-[#1e3a2b]" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-4">
                  {solutions.map((item, i) => (
                    <div key={item.id}>
                      <SolutionCard item={item} />
                    </div>
                  ))}
                </div>
              </section>
            )}
            {showEntries && crises.length > 0 && (
              <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
                <RecordSectionHeading title={t.crises} count={crises.length} tone="text-[#b3261e]" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-4">
                  {crises.map((item, i) => (
                    <div key={item.id}>
                      <SolutionCard item={item} />
                    </div>
                  ))}
                </div>
              </section>
            )}
            {showEntries && (solutions.length + crises.length) === 0 && (
              <div className="py-16 text-center px-4">
                <SubjectMark subject={activeSubject?.id || 'all'} size={40} className="mx-auto text-record-ink lg:hidden" />
                <Globe className="mx-auto hidden h-10 w-10 text-record-muted lg:block" />
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

        {/* ── GROUPS — Janine's spec, item 10: people working on the same thing in an area can share
               directly. The door is on the page, not in an email: an organiser starts their own
               gathering, and the record carries ONLY the one contact line they chose to publish.
               Their account email is never shown, and nothing is invented on their behalf. ── */}
        {(selectedType === 'all' || selectedType === 'groups') && (
          <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
            <RecordSectionHeading title={t.groups} count={filteredGroups.length} tone="text-[#9b6f28]" />
            <p className="text-[13px] text-[#5a5246] leading-[1.65] mb-2">{t.groups_sub}</p>
            {/* Said out loud, on the section itself, so nobody has to guess how far the record
                has gone for them. A group is an introduction the organiser wrote; it carries no
                source, so the record says carried, not checked — the same honesty every entry
                here is held to, in the one line a reader actually needs. */}
            <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">Carried, not checked: this is the organiser's own line. Write to them and decide for yourself.</p>
            <button
              onClick={() => { setSubmitType('group'); setShowSubmit(true); }}
              className="w-full lg:w-auto lg:px-6 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] bg-[#9b6f28] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#7d581f] active:text-[#efe7d6] transition-colors"
            >
              <Users className="w-4 h-4" /> Start a group
            </button>
            <p className="text-[12px] text-[#5a5246] leading-[1.65] mt-2 mb-3">{t.groups_note}</p>
            {filteredGroups.length > 0 ? (
              <div className="space-y-2 md:grid md:grid-cols-2 md:gap-2.5 md:space-y-0">
                {filteredGroups.map(g => (
                  <div key={g.id} className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#9b6f28] p-3.5">
                    <h4 className="text-[13.5px] font-black text-[#141210] leading-snug">{g.name}</h4>
                    {g.topic && (
                      <span className="inline-block text-[9px] font-black font-mono uppercase tracking-widest text-[#9b6f28] border border-[#9b6f28] px-1.5 py-0.5 mt-1.5">{g.topic}</span>
                    )}
                    <div className="flex items-center gap-1.5 text-[#9b6f28] mt-1.5">
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

        {/* ── ACTIONS — Janine's spec: cleanups, plantings, meetings, policy submissions. x = x — equal alongside Solutions and Crises ── */}
        {(selectedType === 'all' || selectedType === 'actions') && (
          <section className="px-4 lg:px-10 pt-9 pb-7 lg:pt-12 lg:pb-11">
            <RecordSectionHeading title={t.actions} count={filteredActions.length} tone="text-[#e2602a]" />
            <p className="text-[13px] text-[#5a5246] leading-[1.65] mb-3">{t.actions_sub}</p>
            {filteredActions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {filteredActions.map(a => (
                  <ActionCard key={a.id} action={a} />
                ))}
              </div>
            ) : (
              // "nothing here yet" and "nothing matched what you typed" are different
              // sentences, and the record says which one it is.
              <p className="text-[11px] font-mono text-[#5a5246] py-6 text-center">{actions.length === 0 ? t.actions_empty : t.empty}</p>
            )}
          </section>
        )}

        {/* ── SMALLEST GESTURES — Janine's list: what any of us can copy this afternoon ── */}
        <SmallGesturesBand />

        {/* ── DEFINITIONS ── each term in the words of the body that defined it,
               and the way through to that body so it can be checked. ── */}
        <DefinitionsBand heading={t.defs} />

        {/* ── GOVERNANCE ── */}
        <section className="px-4 lg:px-10 py-8 lg:py-14 bg-[#1e3a2b] text-[#efe7d6]">
          <h2 className="text-[#e2602a] mb-3" style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(27px, 7.2vw, 44px)', lineHeight: 1.0, letterSpacing: '-0.02em', fontWeight: 400 }}>{t.govern}</h2>
          <p className="text-[15px] leading-[1.75] text-[#efe7d6] max-w-full lg:max-w-[640px]" style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}>{t.govern_body}</p>
          {/* The two ways out of this paragraph, side by side and the same size. They were a
              stack of two differently-cut buttons with a line of small print under them, which
              made the foot of the page read as an afterthought to the argument above it. */}
          <div className="grid gap-2 sm:grid-cols-2 max-w-[640px] mt-6">
            <Link to={createPageUrl('ExtractionProofCovenant')} className="flex items-center justify-center gap-2 min-h-[48px] px-3 py-3 bg-[#e2602a] text-[#141210] text-[10px] font-black font-mono uppercase border border-[#141210] hover:bg-[#efe7d6] transition-colors text-center">
              {t.covenant} <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
            <a href="https://www.solutions-site.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 min-h-[48px] px-3 py-3 bg-[#efe7d6] text-[#1e3a2b] text-[10px] font-black font-mono uppercase border border-[#efe7d6] hover:bg-[#e2602a] hover:text-[#141210] transition-colors text-center">
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