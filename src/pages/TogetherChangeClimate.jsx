import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Globe, Droplets, Leaf, Sun, Waves, TreePine, Recycle, Zap, MapPin, Bird, Fish, Sprout, CloudRain, Wind, ArrowRight, X, Share2, Check, Plus, Users } from 'lucide-react';
import ActionCard from '@/components/climate/ActionCard';
import ClimateSubmitForm from '@/components/climate/ClimateSubmitForm';
import GatheringForm from '@/components/climate/GatheringForm';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import ClimateImpactBar from '@/components/climate/ClimateImpactBar';
import ClimateImageCrawl from '@/components/climate/ClimateImageCrawl';
import { recordOrigin } from '@/components/climate/recordAddress';
import { isPreviewSandbox } from '@/lib/previewWorkers';
import { seedTranslations } from '@/components/shared/translation/translationCache';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import SignalCode from '@/components/climate/SignalCode';
import SignalBeacon from '@/components/climate/SignalBeacon';
import PeaceBell from '@/components/climate/PeaceBell';
import SmallGesturesBand from '@/components/climate/SmallGesturesBand';
import DefinitionsBand from '@/components/climate/DefinitionsBand';


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

import { CATEGORY_IMAGE, IMAGES } from '@/components/climate/categoryImages';

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
  en: { title_a: 'Together we can change the', title_b: 'course', title_c: 'of climate change', sub: 'A public record of climate emergencies and the positive actions that work — shared openly, internationally — so anyone on Earth can replicate what good looks like.', service: 'A public service · for the world', noads: 'No advertising', nofund: 'No sponsorship', donate: 'Support welcome', search: 'Search solutions, crises and actions…', solutions: 'Solutions', crises: 'Climate Crises', defs: 'Definitions', rev: 'Reviewed', connect: 'Connecting the planet…', empty: 'No entries match yet.', govern: 'Built for the planet — and kept in the open', govern_body: 'Spam is screened automatically; clear entries go on the record at once, and anything unclear waits for a human check. A solution or a crisis goes on only with a link to the original source; if that link cannot be opened, it waits for a person. Images must be copyright-free, and location is kept to a rough region to protect privacy. Money never buys a place on the record, and support is declared in the open. The interface is translated on the platform; entries are translated by our community over time.', covenant: 'Read our open-source covenant', family: 'This platform is one part of UF51\'s Planetary Healing family — what is recorded here feeds our work on the ground.', action: 'Take action', honour: 'Built in honour of Janine M. H. Selendy & Horizon International — and released to the world, the planet, all of us.', all: 'All', featured: 'Signals', groups: 'Groups', groups_sub: 'People working on the same thing in an area can share ideas directly — find your region or topic, and write to the organiser.', groups_note: 'The record shows only the one contact line an organiser chooses. Your own email is never published.', live: 'Live record', entries_now: 'entries on the record right now', actions: 'Actions', actions_sub: 'Cleanups, plantings, meetings, policy submissions — real things happening on the ground. Contact the organiser directly. The platform never sees your messages.', actions_empty: 'No actions listed yet — be the first to add one.', groups_empty: 'No gatherings yet — start the first one. Name it, give your rough region, and say what you are working on.' },
  es: { title_a: 'Juntos cambiamos el', title_b: 'curso', title_c: 'del cambio climático', sub: 'Un registro público de emergencias climáticas y las acciones positivas que funcionan — compartido abiertamente, internacionalmente — para que cualquiera en la Tierra pueda replicar lo que funciona.', service: 'Un servicio público · para el mundo', noads: 'Sin publicidad', nofund: 'Sin patrocinio', donate: 'Apoyo bienvenido', search: 'Buscar soluciones y crisis…', solutions: 'Soluciones', crises: 'Crisis Climáticas', defs: 'Definiciones', rev: 'Revisado', connect: 'Conectando el planeta…', empty: 'Sin resultados aún.', govern: 'Construido para el planeta — y para ser confiable', govern_body: 'El spam se filtra automáticamente; las entradas claras pasan al registro de inmediato, y lo que no está claro espera una revisión humana. Solo se usan imágenes sin derechos de autor. La ubicación se mantiene en una región aproximada para proteger la privacidad, siendo honesta y verificable. La plataforma funciona como servicio público — sin publicidad, sin patrocinio, y el dinero nunca compra un lugar en el registro. El apoyo es bienvenido y se declara en abierto. Las traducciones de la interfaz se ofrecen en la plataforma; las entradas son traducidas por nuestra comunidad con el tiempo.', covenant: 'Lee nuestro pacto de código abierto', family: 'Esta plataforma es parte de la familia de Curación Planetaria de UF51 — las soluciones verificadas aquí son el motor de conocimiento detrás de nuestra acción sobre el terreno.', action: 'Actúa', honour: 'Construido en honor de Janine M. H. Selendy y Horizon International — y entregado al mundo, al planeta, a todos nosotros.', all: 'Todo', featured: 'Señales' },
  fr: { title_a: 'Ensemble, nous changeons le', title_b: 'cours', title_c: 'du changement climatique', sub: 'Un registre public des urgences climatiques et des actions positives qui fonctionnent — partagé ouvertement, à l\'international — pour que chacun sur Terre puisse répliquer ce qui fonctionne.', service: 'Un service public · pour le monde', noads: 'Aucune publicité', nofund: 'Aucun parrainage', donate: 'Soutien bienvenu', search: 'Rechercher solutions et crises…', solutions: 'Solutions', crises: 'Crises Climatiques', defs: 'Définitions', rev: 'Vérifié', connect: 'Connexion de la planète…', empty: 'Aucun résultat pour l\'instant.', govern: 'Conçu pour la planète — et pour être digne de confiance', govern_body: 'Le spam est filtré automatiquement ; les entrées claires sont publiées immédiatement, et tout ce qui n\'est pas clair attend une vérification humaine. Seules des images libres de droits sont utilisées. La localisation est limitée à une région approximative pour protéger la vie privée, tout en restant honnête et vérifiable. La plateforme fonctionne en service public — sans publicité, sans parrainage, et l\'argent n\'achète jamais une place dans le registre. Le soutien est bienvenu et déclaré au grand jour. Les traductions de l\'interface sont fournies sur la plateforme; les entrées sont traduites par notre communauté au fil du temps.', covenant: 'Lire notre pacte open source', family: 'Cette plateforme fait partie de la famille de Guérison Planétaire UF51 — les solutions vérifiées ici sont le moteur de connaissance derrière notre action de terrain.', action: 'Agir', honour: 'Construit en l\'honneur de Janine M. H. Selendy et Horizon International — et remis au monde, à la planète, à nous tous.', all: 'Tout', featured: 'Signaux' },
  de: { title_a: 'Gemeinsam ändern wir den', title_b: 'Lauf', title_c: 'des Klimawandels', sub: 'Ein öffentliches Register von Klimanotlagen und positiven Maßnahmen, die funktionieren — offen geteilt, international — damit jeder auf der Erde nachahmen kann, was gut ist.', service: 'Ein öffentlicher Dienst · für die Welt', noads: 'Keine Werbung', nofund: 'Kein Sponsoring', donate: 'Unterstützung willkommen', search: 'Lösungen und Krisen suchen…', solutions: 'Lösungen', crises: 'Klimakrisen', defs: 'Definitionen', rev: 'Geprüft', connect: 'Planet verbinden…', empty: 'Noch keine Treffer.', govern: 'Für den Planeten gebaut — und gebaut, um vertraut zu werden', govern_body: 'Spam wird automatisch gefiltert; klare Einträge gehen sofort ins Register, und alles Unklare wartet auf eine menschliche Prüfung. Es werden nur urheberrechtsfreie Bilder verwendet. Der Standort bleibt grob, um die Privatsphäre zu schützen, bleibt aber ehrlich und überprüfbar. Die Plattform ist Open Source, extraktionssicher und ein öffentlicher Dienst — ohne Werbung, ohne Sponsoring, und Geld kauft nie einen Platz im Register. Unterstützung ist willkommen und wird offen ausgewiesen. Oberflächenübersetzungen werden auf der Plattform angeboten; Einträge werden mit der Zeit von unserer Gemeinschaft übersetzt.', covenant: 'Unser Open-Source-Pakt', family: 'Diese Plattform ist Teil der UF51 Planetary-Healing-Familie — die verifizierten Lösungen hier sind die Wissens-Engine hinter unserer Arbeit vor Ort.', action: 'Handeln', honour: 'Zu Ehren von Janine M. H. Selendy & Horizon International gebaut — und der Welt, dem Planeten, uns allen übergeben.', all: 'Alle', featured: 'Signale' },
  pt: { title_a: 'Juntos mudamos o', title_b: 'curso', title_c: 'das mudanças climáticas', sub: 'Um registro público de emergências climáticas e das ações positivas que funcionam — partilhado abertamente, internacionalmente — para que qualquer pessoa na Terra possa replicar o que está bom.', service: 'Um serviço público · para o mundo', noads: 'Sem publicidade', nofund: 'Sem patrocínio', donate: 'Apoio bem-vindo', search: 'Pesquisar soluções e crises…', solutions: 'Soluções', crises: 'Crises Climáticas', defs: 'Definições', rev: 'Revisto', connect: 'A conectar o planeta…', empty: 'Ainda sem resultados.', govern: 'Construído para o planeta — e para ser confiável', govern_body: 'O spam é filtrado automaticamente; as entradas claras passam para o registro de imediato, e o que não está claro aguarda uma verificação humana. Apenas imagens livres de direitos são usadas. A localização é mantida numa região aproximada para proteger a privacidade, permanecendo honesta e verificável. A plataforma funciona como serviço público — sem publicidade, sem patrocínio, e o dinheiro nunca compra um lugar no registro. O apoio é bem-vindo e é declarado abertamente. As traduções da interface são fornecidas na plataforma; as entradas são traduzidas pela nossa comunidade ao longo do tempo.', covenant: 'Ler o nosso pacto open source', family: 'Esta plataforma faz parte da família de Cura Planetária UF51 — as soluções verificadas aqui são o motor de conhecimento por trás da nossa ação no terreno.', action: 'Agir', honour: 'Construído em honra de Janine M. H. Selendy & Horizon International — e entregue ao mundo, ao planeta, a todos nós.', all: 'Todos', featured: 'Sinais' },
  hi: { title_a: 'साथ मिलकर हम जलवायु परिवर्तन का', title_b: 'रुख', title_c: 'बदल रहे हैं', sub: 'जलवायु आपातकालों और काम करने वाले सकारात्मक कार्यों का एक सार्वजनिक अभिलेख — खुले में, अंतरराष्ट्रीय स्तर पर साझा — ताकि पृथ्वी पर कोई भी अच्छे की नकल कर सके।', service: 'एक सार्वजनिक सेवा · दुनिया के लिए', noads: 'कोई विज्ञापन नहीं', nofund: 'कोई प्रायोजन नहीं', donate: 'समर्थन का स्वागत है', search: 'समाधान और संकट खोजें…', solutions: 'समाधान', crises: 'जलवायु संकट', defs: 'परिभाषाएँ', rev: 'समीक्षित', connect: 'ग्रह जोड़ रहे हैं…', empty: 'अभी कोई परिणाम नहीं।', govern: 'ग्रह के लिए निर्मित — और विश्वसनीय होने के लिए निर्मित', govern_body: 'स्पैम स्वतः छाँटा जाता है; स्पष्ट प्रविष्टियाँ तुरंत अभिलेख में जाती हैं, और जो स्पष्ट नहीं है वह मानवीय जाँच की प्रतीक्षा करता है। केवल कॉपीराइट-मुक्त छवियाँ उपयोग होती हैं। स्थान गोपनीयता के लिए मोटे क्षेत्र तक सीमित रहता है, फिर भी ईमानदार और सत्यापन योग्य। यह मंच ओपन सोर्स, निष्कर्षण-रोधी है, और सार्वजनिक सेवा के रूप में चलता है — कोई विज्ञापन नहीं, कोई प्रायोजन नहीं, और पैसा कभी अभिलेख में जगह नहीं खरीदता। समर्थन का स्वागत है, और वह खुले में दर्ज होता है। इंटरफ़ेस अनुवाद मंच पर उपलब्ध हैं; प्रविष्टियाँ समय के साथ हमारे समुदाय द्वारा अनुवादित होती हैं।', covenant: 'हमारा ओपन सोर्स संकल्प पढ़ें', family: 'यह मंच UF51 की प्लैनेटरी हीलिंग परिवार का हिस्सा है — यहाँ की सत्यापित समाधान हमारे ज़मीनी कार्य के पीछे ज्ञान इंजन हैं।', action: 'कार्रवाई करें', honour: 'जनीन एम. एच. सेलेंडी और होराइज़न इंटरनेशनल के सम्मान में निर्मित — और दुनिया, ग्रह, हम सबको सौंपा गया।', all: 'सभी', featured: 'संकेत' },
  zh: { title_a: '我们携手正在改变', title_b: '气候变化的走向', title_c: '', sub: '一个关于气候紧急事件和行之有效的积极行动的公开记录——开放共享，跨越国界——让地球上任何人都能复制优秀的范例。', service: '一项公共服务 · 为了这个世界', noads: '无广告', nofund: '无赞助', donate: '欢迎支持', search: '搜索解决方案与危机…', solutions: '解决方案', crises: '气候危机', defs: '定义', rev: '已审核', connect: '正在连接地球…', empty: '暂无匹配内容。', govern: '为地球而生——并生来值得信赖', govern_body: '每条内容在发布前都经过审核。仅使用无版权图片。位置保留为大致区域以保护隐私，同时保持诚实与可验证。平台开源、防提取，并作为公共服务运行——无广告、无赞助，金钱永远买不到记录中的位置。支持受到欢迎，并公开列明。界面翻译在平台上提供；条目由我们的社区随时间逐步翻译。', covenant: '阅读我们的开源契约', family: '本平台是UF51“行星疗愈”家族的一部分——此处经核实的解决方案是支撑我们实地行动的知识引擎。', action: '采取行动', honour: '为致敬Janine M. H. Selendy与国际云而建——并献给这个世界、这个星球、我们所有人。', all: '全部', featured: '信号' },
  ar: { title_a: 'معًا نُغيّر', title_b: 'مسار', title_c: 'تغير المناخ', sub: 'سجلّ عام لحالات الطوارئ المناخية والإجراءات الإيجابية التي تنجح — مشترك علنًا، دوليًا — ليستطيع أي شخص على الأرض تكرار ما هو جيد.', service: 'خدمة عامة · للعالم', noads: 'لا إعلانات', nofund: 'لا رعاية', donate: 'الدعم مرحّب به', search: 'ابحث عن الحلول والأزمات…', solutions: 'الحلول', crises: 'أزمات المناخ', defs: 'تعريفات', rev: 'تمت المراجعة', connect: 'جارٍ توصيل الكوكب…', empty: 'لا نتائج مطابقة بعد.', govern: 'مبني من أجل الكوكب — ومبني ليكون موثوقًا', govern_body: 'تتم مراجعة كل إدخال قبل النشر. تُستخدم الصور الخالية من حقوق النشر فقط. يُحافظ على الموقع كمنطقة تقريبية لحماية الخصوصية، مع بقائه صادقًا وقابلاً للتحقق. المنصة مفتوحة المصدر ومحمية من الاستغلال وتعمل كخدمة عامة — لا إعلانات ولا رعاية، والمال لا يشتري مكانًا في السجل. الدعم مرحّب به ويُعلن في العلن. تُقدَّم ترجمات الواجهة على المنصة؛ وتُترجم الإدخالات من قبل مجتمعنا بمرور الوقت.', covenant: 'اقرأ ميثاقنا مفتوح المصدر', family: 'هذه المنصة جزء من عائلة الشفاء الكوكبي UF51 — الحلول الموثقة هنا هي محرك المعرفة وراء عملنا الميداني.', action: 'اتخذ إجراء', honour: 'بُني تكريمًا لـ Janine M. H. Selendy وهورايزون إنترناشونال — وسُلّم إلى العالم، إلى الكوكب، إلى جميعنا.', all: 'الكل', featured: 'إشارات' },
};

seedTranslations(T);

 function SolutionCard({ item }) {
     // Green says solution, red says emergency. A crisis card wears the record's red — it
     // had been wearing the same blue as every other link here, so the most urgent entry
     // on the page read as the calmest thing on it.
     const isSolution = item.entry_type === 'solution';
     // Every card carries a picture. An entry that arrived without one wears the
     // picture of its own category, so the grid never reads as half-broken.
     const cardImage = item.image_url || CATEGORY_IMAGE(item.category);

     return (
       <Link
         to={`/ClimateDetail/${item.entry_type}/${item.id}`}
         className={`relative text-left overflow-hidden bg-[#241d16] border border-[#241d16] active:border-[#e2602a] ${
           isSolution ? 'border-t-4 border-t-[#1e3a2b]' : 'border-t-4 border-t-[#b3261e]'
         } min-h-[110px] lg:min-h-[168px] flex items-end active:scale-95 transition-transform duration-100`}
       >
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
           onError={(e) => { e.currentTarget.src = CATEGORY_IMAGE(item.category); }}
           />
         {/* Gradient scrim — guarantees title readability on any image */}
         <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,18,16,0) 30%, rgba(20,18,16,0.85) 100%)' }} />
         <div className="relative p-2.5 w-full">
           <div className={`text-[9px] font-black font-mono uppercase tracking-widest ${isSolution ? 'text-[#7fd6a0]' : 'text-[#ef5a4a]'}`}>
             {isSolution ? 'Solution' : 'Crisis'}
           </div>
           <h3 className="text-[13.5px] font-black leading-snug text-[#efe7d6] line-clamp-3 mt-0.5">
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
const KIND_WORDS = {
  solution: ['solution', 'solutions'],
  climate_crisis: ['crisis', 'crises', 'emergency', 'emergencies'],
  groups: ['group', 'groups', 'gathering', 'gatherings'],
  actions: ['action', 'actions'],
};
const ALL_KIND_WORDS = new Set(Object.values(KIND_WORDS).flat());
const kindOfWord = (word) => Object.keys(KIND_WORDS).find(k => KIND_WORDS[k].includes(word)) || null;

export default function TogetherChangeClimate() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const { isRTL } = useSiteLanguage();
  const [copied, setCopied] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showGathering, setShowGathering] = useState(false);
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
    const origin = recordOrigin();
    // Share through the preview service. WhatsApp, Telegram and LinkedIn do not run
    // JavaScript, so they only ever see the app's default tags — which are SORTED's.
    // This link carries the record's own title and image; people still land on the platform.
    const url = origin + '/api/functions/ogRedirect?page=TogetherChangeClimate';
    const shareData = {
      title: 'Together we can change the course of climate change',
      text: 'A public record of climate emergencies and the positive actions that work — in any tongue a reader names, living or long dead.',
      url,
    };
    try {
      if (navigator.share) { await navigator.share(shareData); return; }
    } catch { /* user cancelled */ }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback silently */ }
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

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="relative min-h-screen mx-auto max-w-[1100px] bg-[#efe7d6] text-[#141210] border-x border-[#141210]/10 shadow-2xl shadow-black/20" style={{ fontFamily: 'var(--font-body)' }}>
      <style>{`
        @keyframes twcc-enter { from { opacity: 0; } to { opacity: 1; } }
        @keyframes twcc-stamp { from { opacity: 0; transform: rotate(-17deg) scale(1.02); } to { opacity: .9; transform: rotate(-17deg) scale(1); } }
        @keyframes twcc-stamp-pulse { 0%, 100% { box-shadow: inset 0 0 0 3px #141210, 0 0 0 2px #efe7d6; } 50% { box-shadow: inset 0 0 0 3px #141210, 0 0 0 2px #efe7d6, 0 0 24px rgba(15,95,122,.55); } }
        @keyframes twcc-flicker { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .72; } }
        @keyframes twcc-epigraph { from { opacity: 0; } to { opacity: 1; } }
        @keyframes twcc-scan { from { background-position: 0 0; } to { background-position: 0 3px; } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
        /* The page used to sit on a black field, so the record read as a screen inside a
           dark room. It sits on the record's own deep paper now: less black, and the
           pictures and the paper carry the page instead of a terminal surround. */
        body { background: #e3dccb !important; }
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
          {/* The record's grain, inside her plate — the same texture the hero wears */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)', animation: 'twcc-scan 3s linear infinite' }}
          />

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
            className="text-[12px] font-black font-mono text-[#0f5f7a] tracking-[0.2em] leading-none underline decoration-dotted underline-offset-4"
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
        <img
          src={IMAGES.global}
          alt=""
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.05) contrast(1.05)', mixBlendMode: 'screen', opacity: 0.42 }}
        />
        {/* Neutral wash, no blue in it: a blue wash over a full-width picture is a blue
            field by another name, and the blue has to stay small to mean anything. */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(36,29,22,.38), rgba(36,29,22,.5) 45%, #241d16 100%)' }} />
        {/* Scanline texture — cold transmission signal */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)', animation: 'twcc-scan 3s linear infinite' }} />

        {/* Bone band — plain statement, and the way to pass it on. One line, nothing dropped in. */}
        <div className="relative z-10 bg-[#efe7d6] px-5 lg:px-10 py-3 flex items-center justify-between gap-3"
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
        <div className="relative z-10 px-5 lg:px-10 pt-10 lg:pt-16 pb-8 flex items-start" style={{ animation: 'twcc-enter .25s ease-out .04s both' }}>
          {/* The record's own name — the one heading on the record allowed to lead.
              It was built so the phone's width beat the floor: 11vw gave 43px on a
              393px screen and 47px at 430px, which made this the largest opening
              anywhere on the record by a wide margin, and is what made the page feel
              heavy in the hand. It now opens at 36px on a phone (40px at 430px) — one
              clear step above every other page's title (30-35px), still the largest.
              From 782px up it is the same 72px it always was. */}
          <h1 className="font-black uppercase leading-[0.94] max-w-[360px] lg:max-w-[640px] relative z-10 text-[#efe7d6]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 9.2vw, 72px)', letterSpacing: '-0.035em' }}>
            {t.title_a}<br />
            <span className="text-[#e2602a]">{t.title_b}</span> {t.title_c}
          </h1>
          {/* Record-of-the-time seal — the stamp of truth (desktop only, avoids mobile title overlap) */}
          <div className="hidden lg:flex absolute right-12 top-20 w-[104px] h-[104px] pointer-events-none items-center justify-center"
            style={{ transform: 'rotate(-17deg)', animation: 'twcc-stamp .25s ease-out .1s both, twcc-stamp-pulse 3.2s ease-in-out .6s infinite' }}>
            <div className="absolute inset-0 rounded-full border-8 border-[#e2602a]" style={{ boxShadow: 'inset 0 0 0 3px #141210, 0 0 0 2px #efe7d6' }} />
            <div className="relative text-center" style={{ opacity: 0.9 }}>
              <div className="text-[7px] font-black font-mono uppercase tracking-[0.1em] text-[#e2602a] leading-none">Record</div>
              <div className="text-[6px] font-mono text-[#efe7d6]/70 leading-none mt-0.5">of the</div>
              <div className="text-[7px] font-black font-mono uppercase tracking-[0.1em] text-[#e2602a] leading-none mt-0.5">Time</div>
            </div>
          </div>
        </div>

        {/* Closing band — ink, not a second colour. It was the brightest slab on the record,
             and that slab spent the blue before a single entry had been read, so there was
             nothing left for the blue to point at. The record opens deep and stays deep. */}
        <div className="relative z-10 bg-[#241d16] px-5 lg:px-10 py-5 lg:py-7 mt-auto" style={{ animation: 'twcc-enter .25s ease-out .08s both, twcc-flicker 7s linear 1.2s infinite' }}>
          {/* The record's own sentence, in its own voice — sentence case, on the deep
              band. Everything else in this band stays as it was. */}
          <p className="text-[16px] leading-[1.7] max-w-[360px] lg:max-w-[620px] text-[#efe7d6]" style={{ fontFamily: 'var(--font-reading)' }}>{t.sub}</p>
          {/* Raw prophetic tagline — Cash/Dylan/Young. A proverb, not copy. Same in every tongue. */}
          <p className="text-[10px] font-black font-mono uppercase leading-relaxed mt-3 text-[#efe7d6] tracking-[0.09em]" style={{ opacity: 0.8 }}>
            Every symbol · every number · every tongue · nobody left behind · the noise is loud · the record is louder
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
        <div className="px-4 lg:px-10 py-5 lg:py-8 bg-[#efe7d6] border-b-2 border-[#141210]">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(25px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}>{t.featured}</h2>
            <div className="flex-1 h-px bg-[#141210]/20" />
            <span className="text-[10px] font-black font-mono text-[#e2602a]">{featured.length}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 lg:gap-4">
            {loading
              ? [0, 1, 2, 3].map(i => <div key={i} className="min-h-[124px] bg-[#141210]/10 border border-[#141210]/15 animate-pulse" />)
              : featured.map((item) => <SolutionCard key={item.id} item={item} />)}
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
      <div className="px-4 lg:px-10 py-4 lg:py-6 bg-[#efe7d6] border-b-2 border-[#141210]">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="lg:flex-1 lg:min-w-0">
            <div className="flex gap-2 mb-3 lg:max-w-[540px]">
              <button
                onClick={() => setSelectedType(selectedType === 'solution' ? 'all' : 'solution')}
                className={`flex-1 px-2 py-2.5 text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
                  selectedType === 'solution' ? 'bg-[#1e3a2b] text-[#efe7d6] border-[#141210]' : 'bg-[#141210] text-[#efe7d6] border-[#141210] hover:bg-[#e2602a] hover:text-[#141210]'
                }`}
              >{t.solutions}</button>
              <button
                onClick={() => setSelectedType(selectedType === 'climate_crisis' ? 'all' : 'climate_crisis')}
                className={`flex-1 px-2 py-2.5 text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
                  selectedType === 'climate_crisis' ? 'bg-[#b3261e] text-[#efe7d6] border-[#141210]' : 'bg-[#141210] text-[#efe7d6] border-[#141210] hover:bg-[#b3261e] hover:text-[#efe7d6]'
                }`}
              >{t.crises}</button>
              {/* The door is on the toolbar from the start, not only once a gathering exists:
                  a kind with no entries yet still needs its way in, and the section below
                  carries the honest empty state for it. */}
              <button
                onClick={() => setSelectedType(selectedType === 'groups' ? 'all' : 'groups')}
                className={`flex-1 px-2 py-2.5 text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
                  selectedType === 'groups' ? 'bg-[#1e3a2b] text-[#efe7d6] border-[#141210]' : 'bg-[#141210] text-[#efe7d6] border-[#141210] hover:bg-[#e2602a] hover:text-[#141210]'
                }`}
              >{t.groups}</button>
              <button
                onClick={() => setSelectedType(selectedType === 'actions' ? 'all' : 'actions')}
                className={`flex-1 px-2 py-2.5 text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
                  selectedType === 'actions' ? 'bg-[#e2602a] text-[#141210] border-[#141210]' : 'bg-[#141210] text-[#efe7d6] border-[#141210] hover:bg-[#e2602a] hover:text-[#141210]'
                }`}
              >{t.actions}</button>
            </div>
            <p className="text-[10px] font-mono mt-2 tracking-wide text-[#5a5246]">{t.noads} · {t.nofund} · {t.donate}</p>
          </div>

          <div className="lg:w-[320px] lg:flex-shrink-0">
            <button
              onClick={() => setShowSubmit(true)}
              className="mt-3 lg:mt-0 w-full flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] bg-[#e2602a] text-[#141210] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
            >
              <Plus className="w-4 h-4" /> Submit a solution, crisis, or action
            </button>
            <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-2">
              Been sent an email? Paste it in — we read it and fill the form in for you. No account needed, nothing to install.
            </p>
            <Link
              to={createPageUrl("ClimateMap")}
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors"
            >
              <MapPin className="w-4 h-4" /> Transmission Map
            </Link>
            <Link
              to={createPageUrl("ClimateImpact")}
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#1e3a2b] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors"
            >
              <Globe className="w-4 h-4" /> Global Impact
            </Link>
          </div>
        </div>
      </div>

      {/* ── CATEGORY CHIPS — native horizontal scroll, compact ── */}
      <div className="px-4 lg:px-10 py-3 lg:py-4 bg-[#efe7d6] border-b-2 border-[#141210]">
        <div className="flex gap-1.5 overflow-x-auto overscroll-x-contain pb-1 -mx-4 px-4 snap-x lg:flex-wrap lg:overflow-x-visible lg:mx-0 lg:px-0" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} aria-label="Filter by category">
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
      <div ref={contentRef} className="bg-[#efe7d6]">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
            <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-4">{t.connect}</p>
          </div>
        ) : (
          <>
            {showEntries && solutions.length > 0 && (
              <section className="px-4 lg:px-10 py-5 lg:py-8 border-b-2 border-[#141210]">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(25px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}>{t.solutions}</h2>
                  <div className="flex-1 h-px bg-[#141210]/20" />
                  <span className="text-[10px] font-black font-mono text-[#1e3a2b]">{solutions.length}</span>
                </div>
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
              <section className="px-4 lg:px-10 py-5 lg:py-8 border-b-2 border-[#141210]">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(25px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}>{t.crises}</h2>
                  <div className="flex-1 h-px bg-[#141210]/20" />
                  <span className="text-[10px] font-black font-mono text-[#b3261e]">{crises.length}</span>
                </div>
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
              <div className="py-20 text-center px-4">
                <Globe className="w-10 h-10 text-[#5a5246] mx-auto" />
                <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-3">{t.empty}</p>
                <Link
                  to="/ClimateSearch"
                  className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-black font-mono uppercase tracking-widest text-[#b3261e] active:text-[#e2602a]"
                >
                  Search the whole record →
                </Link>
              </div>
            )}
          </>
        )}

        {/* ── GROUPS — Janine's spec, item 10: people working on the same thing in an area can share
               directly. The door is on the page, not in an email: an organiser starts their own
               gathering, and the record carries ONLY the one contact line they chose to publish.
               Their account email is never shown, and nothing is invented on their behalf. ── */}
        {(selectedType === 'all' || selectedType === 'groups') && (
          <section className="px-4 lg:px-10 py-5 lg:py-8 border-b-2 border-[#141210]">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(25px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}>{t.groups}</h2>
              <div className="flex-1 h-px bg-[#141210]/20" />
              <span className="text-[10px] font-black font-mono text-[#1e3a2b]">{filteredGroups.length}</span>
            </div>
            <p className="text-[13px] text-[#5a5246] leading-[1.65] mb-3">{t.groups_sub}</p>
            <button
              onClick={() => setShowGathering(true)}
              className="w-full lg:w-auto lg:px-6 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] bg-[#1e3a2b] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors"
            >
              <Users className="w-4 h-4" /> Start a gathering
            </button>
            <p className="text-[12px] text-[#5a5246] leading-[1.65] mt-2 mb-3">{t.groups_note}</p>
            {filteredGroups.length > 0 ? (
              <div className="space-y-2 md:grid md:grid-cols-2 md:gap-2.5 md:space-y-0">
                {filteredGroups.map(g => (
                  <div key={g.id} className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#1e3a2b] p-3.5">
                    <h4 className="text-[13.5px] font-black text-[#141210] leading-snug">{g.name}</h4>
                    {g.topic && (
                      <span className="inline-block text-[9px] font-black font-mono uppercase tracking-widest text-[#1e3a2b] border border-[#1e3a2b] px-1.5 py-0.5 mt-1.5">{g.topic}</span>
                    )}
                    <div className="flex items-center gap-1.5 text-[#1e3a2b] mt-1.5">
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
                        Open gathering · contact line being arranged
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
          <section className="px-4 lg:px-10 py-5 lg:py-8 border-b-2 border-[#141210]">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(25px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}>{t.actions}</h2>
              <div className="flex-1 h-px bg-[#141210]/20" />
              <span className="text-[10px] font-black font-mono text-[#e2602a]">{filteredActions.length}</span>
            </div>
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
        <section className="px-4 lg:px-10 py-5 lg:py-8 bg-[#1e3a2b] text-[#efe7d6]">
          <h2 className="font-black uppercase text-[#e2602a] mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(25px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}>{t.govern}</h2>
          <p className="text-[15px] leading-[1.75] text-[#efe7d6] max-w-full lg:max-w-[640px]" style={{ fontFamily: 'var(--font-reading)' }}>{t.govern_body}</p>
          <Link to={createPageUrl('ExtractionProofCovenant')} className="inline-flex items-center gap-2 mt-4 px-3 py-2 bg-[#e2602a] text-[#141210] text-[10px] font-black font-mono uppercase border border-[#141210] hover:bg-[#efe7d6] transition-colors">
            {t.covenant} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a href="https://www.solutions-site.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 px-3 py-2 bg-[#efe7d6] text-[#1e3a2b] text-[10px] font-black font-mono uppercase border border-[#efe7d6] hover:bg-[#e2602a] hover:text-[#141210] transition-colors">
            Horizon Solutions Site ↗
          </a>
          <p className="text-[11px] font-mono text-[#efe7d6]/80 mt-4 pt-4 border-t border-[#efe7d6]/20 leading-relaxed">
            {t.family}{' '}
            <Link to={createPageUrl('NewCleanup')} className="text-[#e2602a] hover:text-[#efe7d6] font-black uppercase">
              {t.action} →
            </Link>
          </p>
        </section>

        {/* Terms and Privacy now sit in the shared footer, on every page of the record. */}

        {/* The thesis, where it belongs — at the close, once the record has been read. */}
        <p className="px-4 pt-8 text-center text-[17px] text-[#141210] bg-[#efe7d6]" style={{ fontFamily: 'var(--font-reading)' }}>
          This is the time. And this is the record of the time.
        </p>
        <p className="px-4 pt-1 text-center text-[9px] font-mono uppercase tracking-[0.15em] text-[#5a5246] bg-[#efe7d6]">
          Laurie Anderson · From the Air, Big Science, 1982
        </p>
        <Link to={createPageUrl('ClimateFounder')} className="block px-4 py-6 text-center text-[14px] text-[#5a5246] bg-[#efe7d6] hover:text-[#b3261e] transition-colors active:underline" style={{ fontFamily: 'var(--font-reading)' }}>
          {t.honour} <span className="text-[#b3261e]">→</span>
        </Link>
        {/* ── CREDITS ── the record names who built it. Asked for by the founder, and
               right on a record that expects every entry to carry its origin. ── */}
        <div className="px-4 pb-10 pt-1 text-center bg-[#efe7d6] space-y-1.5">
          <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed">
            Platform built by Brian Hughes ·{' '}
            <Link to={createPageUrl('Welcome')} className="text-[#5a5246] hover:text-[#b3261e] underline decoration-dotted underline-offset-2 transition-colors">UF51 CIC</Link>
            {' '}· Scotland
          </p>
          <p className="text-[9px] font-mono text-[#5a5246]/60 leading-relaxed">
            Signal palette after Brian Beadie — Glasgow
          </p>
        </div>
      </div>

      {showSubmit && <ClimateSubmitForm onClose={() => setShowSubmit(false)} />}
      {showGathering && (
        <GatheringForm
          onClose={() => {
            setShowGathering(false);
            base44.entities.ClimateGroup.list().then(v => setGroups(Array.isArray(v) ? v : (v?.items || []))).catch(() => {});
          }}
        />
      )}
    </div>
  );
}