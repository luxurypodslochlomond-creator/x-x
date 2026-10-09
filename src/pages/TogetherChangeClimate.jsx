import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Search, Globe, Droplets, Leaf, Sun, Waves, TreePine, Recycle, Zap, Languages, MapPin, Bird, Fish, Sprout, CloudRain, Wind, ArrowRight, X, Share2, Check, Plus } from 'lucide-react';
import Transmission from '@/components/climate/Transmission';
import ActionCard from '@/components/climate/ActionCard';
import ClimateSubmitForm from '@/components/climate/ClimateSubmitForm';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import ClimateImpactBar from '@/components/climate/ClimateImpactBar';
import SignalCode from '@/components/climate/SignalCode';


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

// ── Copyright-free image pool (Unsplash, valid stable URLs) ──
const IMAGES = {
  mangroves: 'https://images.unsplash.com/photo-1584473457406-6240489418ed?w=900&q=70',
  renewable: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=70',
  seagrass: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=900&q=70',
  agriculture: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=70',
  plastic: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=70',
  global: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=70',
  heat: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=70',
  drought: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=70',
  flooding: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900&q=70',
  oceans: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=70',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=70',
  water: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=70',
};

const CATEGORY_IMAGE = (cat) => {
  const map = {
    mangroves: IMAGES.mangroves, coastal_erosion_protection: IMAGES.mangroves,
    renewable_energy: IMAGES.renewable, electric_vehicles: IMAGES.renewable, solar_desalination: IMAGES.renewable,
    seagrasses: IMAGES.seagrass, oceans: IMAGES.oceans, zooplankton: IMAGES.oceans, phytoplankton: IMAGES.oceans,
    agriculture: IMAGES.agriculture, water: IMAGES.water, drought: IMAGES.drought,
    urban_geodesign: IMAGES.plastic, transportation: IMAGES.global,
    extreme_weather: IMAGES.heat, heat: IMAGES.heat, flooding: IMAGES.flooding,
    forest_preservation: IMAGES.forest, rewilding: IMAGES.forest,
    other: IMAGES.global,
  };
  return map[cat] || IMAGES.global;
};

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
  en: { title_a: 'Together we change the', title_b: 'course', title_c: 'of climate change', sub: 'A public record of climate emergencies and the positive actions that work — shared openly, internationally — so anyone on Earth can replicate what good looks like.', service: 'A public service · for the world', noads: 'No advertising', nofund: 'No fund raising', donate: 'Donations welcome', search: 'Search solutions, crises and actions…', solutions: 'Solutions', crises: 'Climate Crises', defs: 'Definitions', rev: 'Reviewed', connect: 'Connecting the planet…', empty: 'No entries match yet.', govern: 'Built for the planet — and built to be trusted', govern_body: 'Every entry is reviewed before publication. Only copyright-free images are used. Location is kept to a rough region to protect privacy, while remaining honest and verifiable. The platform is open source, extraction-proof, and runs as a public service — no advertising, no fundraising, ever. Interface translations are provided for the platform; entries themselves are translated by our community over time.', covenant: 'Read our open-source covenant', family: 'This platform is one part of UF51\'s Planetary Healing family — the verified solutions here are the knowledge engine behind our on-the-ground action.', action: 'Take action', honour: 'Built in honour of Janine M. H. Selendy & Horizon International — and released to the world, the planet, all of us.', all: 'All', featured: 'Signals', groups: 'Groups', groups_sub: 'People working on the same thing in an area can share ideas directly — find your region or topic and join in.', groups_note: 'New gatherings form as the community grows. To start one for your region or topic, email a short description to hello@horizon-international.org.', live: 'Live record', entries_now: 'entries on the record right now', actions: 'Actions', actions_sub: 'Cleanups, plantings, meetings, policy submissions — real things happening on the ground. Contact the organiser directly. The platform never sees your messages.', actions_empty: 'No actions listed yet — be the first to add one.' },
  es: { title_a: 'Juntos cambiamos el', title_b: 'curso', title_c: 'del cambio climático', sub: 'Un registro público de emergencias climáticas y las acciones positivas que funcionan — compartido abiertamente, internacionalmente — para que cualquiera en la Tierra pueda replicar lo que funciona.', service: 'Un servicio público · para el mundo', noads: 'Sin publicidad', nofund: 'Sin recaudación', donate: 'Donaciones bienvenidas', search: 'Buscar soluciones y crisis…', solutions: 'Soluciones', crises: 'Crisis Climáticas', defs: 'Definiciones', rev: 'Revisado', connect: 'Conectando el planeta…', empty: 'Sin resultados aún.', govern: 'Construido para el planeta — y para ser confiable', govern_body: 'Cada entrada se revisa antes de publicarse. Solo se usan imágenes sin derechos de autor. La ubicación se mantiene en una región aproximada para proteger la privacidad, siendo honesta y verificable. La plataforma es de código abierto, a prueba de extracción, y funciona como servicio público — sin publicidad, sin recaudación. Las traducciones de la interfaz se ofrecen en la plataforma; las entradas son traducidas por nuestra comunidad con el tiempo.', covenant: 'Lee nuestro pacto de código abierto', family: 'Esta plataforma es parte de la familia de Curación Planetaria de UF51 — las soluciones verificadas aquí son el motor de conocimiento detrás de nuestra acción sobre el terreno.', action: 'Actúa', honour: 'Construido en honor de Janine M. H. Selendy y Horizon International — y entregado al mundo, al planeta, a todos nosotros.', all: 'Todo', featured: 'Señales' },
  fr: { title_a: 'Ensemble, nous changeons le', title_b: 'cours', title_c: 'du changement climatique', sub: 'Un registre public des urgences climatiques et des actions positives qui fonctionnent — partagé ouvertement, à l\'international — pour que chacun sur Terre puisse répliquer ce qui fonctionne.', service: 'Un service public · pour le monde', noads: 'Aucune publicité', nofund: 'Aucune levée de fonds', donate: 'Dons bienvenus', search: 'Rechercher solutions et crises…', solutions: 'Solutions', crises: 'Crises Climatiques', defs: 'Définitions', rev: 'Vérifié', connect: 'Connexion de la planète…', empty: 'Aucun résultat pour l\'instant.', govern: 'Conçu pour la planète — et pour être digne de confiance', govern_body: 'Chaque entrée est vérifiée avant publication. Seules des images libres de droits sont utilisées. La localisation est limitée à une région approximative pour protéger la vie privée, tout en restant honnête et vérifiable. La plateforme est open source, in-extractible, et fonctionne en service public — sans publicité, sans levée de fonds. Les traductions de l\'interface sont fournies sur la plateforme; les entrées sont traduites par notre communauté au fil du temps.', covenant: 'Lire notre pacte open source', family: 'Cette plateforme fait partie de la famille de Guérison Planétaire UF51 — les solutions vérifiées ici sont le moteur de connaissance derrière notre action de terrain.', action: 'Agir', honour: 'Construit en l\'honneur de Janine M. H. Selendy et Horizon International — et remis au monde, à la planète, à nous tous.', all: 'Tout', featured: 'Signaux' },
  de: { title_a: 'Gemeinsam ändern wir den', title_b: 'Lauf', title_c: 'des Klimawandels', sub: 'Ein öffentliches Register von Klimanotlagen und positiven Maßnahmen, die funktionieren — offen geteilt, international — damit jeder auf der Erde nachahmen kann, was gut ist.', service: 'Ein öffentlicher Dienst · für die Welt', noads: 'Keine Werbung', nofund: 'Keine Spendenaufrufe', donate: 'Spenden willkommen', search: 'Lösungen und Krisen suchen…', solutions: 'Lösungen', crises: 'Klimakrisen', defs: 'Definitionen', rev: 'Geprüft', connect: 'Planet verbinden…', empty: 'Noch keine Treffer.', govern: 'Für den Planeten gebaut — und gebaut, um vertraut zu werden', govern_body: 'Jeder Eintrag wird vor der Veröffentlichung geprüft. Es werden nur urheberrechtsfreie Bilder verwendet. Der Standort bleibt grob, um die Privatsphäre zu schützen, bleibt aber ehrlich und überprüfbar. Die Plattform ist Open Source, extraktionssicher und ein öffentlicher Dienst — ohne Werbung, ohne Spendenaufrufe. Oberflächenübersetzungen werden auf der Plattform angeboten; Einträge werden mit der Zeit von unserer Gemeinschaft übersetzt.', covenant: 'Unser Open-Source-Pakt', family: 'Diese Plattform ist Teil der UF51 Planetary-Healing-Familie — die verifizierten Lösungen hier sind die Wissens-Engine hinter unserer Arbeit vor Ort.', action: 'Handeln', honour: 'Zu Ehren von Janine M. H. Selendy & Horizon International gebaut — und der Welt, dem Planeten, uns allen übergeben.', all: 'Alle', featured: 'Signale' },
  pt: { title_a: 'Juntos mudamos o', title_b: 'curso', title_c: 'das mudanças climáticas', sub: 'Um registro público de emergências climáticas e das ações positivas que funcionam — partilhado abertamente, internacionalmente — para que qualquer pessoa na Terra possa replicar o que está bom.', service: 'Um serviço público · para o mundo', noads: 'Sem publicidade', nofund: 'Sem angariação', donate: 'Doações bem-vindas', search: 'Pesquisar soluções e crises…', solutions: 'Soluções', crises: 'Crises Climáticas', defs: 'Definições', rev: 'Revisto', connect: 'A conectar o planeta…', empty: 'Ainda sem resultados.', govern: 'Construído para o planeta — e para ser confiável', govern_body: 'Cada entrada é revista antes da publicação. Apenas imagens livres de direitos são usadas. A localização é mantida numa região aproximada para proteger a privacidade, permanecendo honesta e verificável. A plataforma é open source, à prova de extração, e funciona como serviço público — sem publicidade, sem angariação. As traduções da interface são fornecidas na plataforma; as entradas são traduzidas pela nossa comunidade ao longo do tempo.', covenant: 'Ler o nosso pacto open source', family: 'Esta plataforma faz parte da família de Cura Planetária UF51 — as soluções verificadas aqui são o motor de conhecimento por trás da nossa ação no terreno.', action: 'Agir', honour: 'Construído em honra de Janine M. H. Selendy & Horizon International — e entregue ao mundo, ao planeta, a todos nós.', all: 'Todos', featured: 'Sinais' },
  hi: { title_a: 'साथ मिलकर हम जलवायु परिवर्तन का', title_b: 'रुख', title_c: 'बदल रहे हैं', sub: 'जलवायु आपातकालों और काम करने वाले सकारात्मक कार्यों का एक सार्वजनिक अभिलेख — खुले में, अंतरराष्ट्रीय स्तर पर साझा — ताकि पृथ्वी पर कोई भी अच्छे की नकल कर सके।', service: 'एक सार्वजनिक सेवा · दुनिया के लिए', noads: 'कोई विज्ञापन नहीं', nofund: 'कोई धन उगाही नहीं', donate: 'दान का स्वागत है', search: 'समाधान और संकट खोजें…', solutions: 'समाधान', crises: 'जलवायु संकट', defs: 'परिभाषाएँ', rev: 'समीक्षित', connect: 'ग्रह जोड़ रहे हैं…', empty: 'अभी कोई परिणाम नहीं।', govern: 'ग्रह के लिए निर्मित — और विश्वसनीय होने के लिए निर्मित', govern_body: 'हर प्रविष्टि प्रकाशन से पहले समीक्षित होती है। केवल कॉपीराइट-मुक्त छवियाँ उपयोग होती हैं। स्थान गोपनीयता के लिए मोटे क्षेत्र तक सीमित रहता है, फिर भी ईमानदार और सत्यापन योग्य। यह मंच ओपन सोर्स, निष्कर्षण-रोधी है, और सार्वजनिक सेवा के रूप में चलता है — कोई विज्ञापन नहीं, कोई धन उगाही नहीं। इंटरफ़ेस अनुवाद मंच पर उपलब्ध हैं; प्रविष्टियाँ समय के साथ हमारे समुदाय द्वारा अनुवादित होती हैं।', covenant: 'हमारा ओपन सोर्स संकल्प पढ़ें', family: 'यह मंच UF51 की प्लैनेटरी हीलिंग परिवार का हिस्सा है — यहाँ की सत्यापित समाधान हमारे ज़मीनी कार्य के पीछे ज्ञान इंजन हैं।', action: 'कार्रवाई करें', honour: 'जनीन एम. एच. सेलेंडी और होराइज़न इंटरनेशनल के सम्मान में निर्मित — और दुनिया, ग्रह, हम सबको सौंपा गया।', all: 'सभी', featured: 'संकेत' },
  zh: { title_a: '我们携手正在改变', title_b: '气候变化的走向', title_c: '', sub: '一个关于气候紧急事件和行之有效的积极行动的公开记录——开放共享，跨越国界——让地球上任何人都能复制优秀的范例。', service: '一项公共服务 · 为了这个世界', noads: '无广告', nofund: '无募捐', donate: '欢迎捐赠', search: '搜索解决方案与危机…', solutions: '解决方案', crises: '气候危机', defs: '定义', rev: '已审核', connect: '正在连接地球…', empty: '暂无匹配内容。', govern: '为地球而生——并生来值得信赖', govern_body: '每条内容在发布前都经过审核。仅使用无版权图片。位置保留为大致区域以保护隐私，同时保持诚实与可验证。平台开源、防提取，并作为公共服务运行——无广告、无募捐。界面翻译在平台上提供；条目由我们的社区随时间逐步翻译。', covenant: '阅读我们的开源契约', family: '本平台是UF51“行星疗愈”家族的一部分——此处经核实的解决方案是支撑我们实地行动的知识引擎。', action: '采取行动', honour: '为致敬Janine M. H. Selendy与国际云而建——并献给这个世界、这个星球、我们所有人。', all: '全部', featured: '信号' },
  ar: { title_a: 'معًا نُغيّر', title_b: 'مسار', title_c: 'تغير المناخ', sub: 'سجلّ عام لحالات الطوارئ المناخية والإجراءات الإيجابية التي تنجح — مشترك علنًا، دوليًا — ليستطيع أي شخص على الأرض تكرار ما هو جيد.', service: 'خدمة عامة · للعالم', noads: 'لا إعلانات', nofund: 'لا جمع تبرعات', donate: 'التبرعات مرحب بها', search: 'ابحث عن الحلول والأزمات…', solutions: 'الحلول', crises: 'أزمات المناخ', defs: 'تعريفات', rev: 'تمت المراجعة', connect: 'جارٍ توصيل الكوكب…', empty: 'لا نتائج مطابقة بعد.', govern: 'مبني من أجل الكوكب — ومبني ليكون موثوقًا', govern_body: 'تتم مراجعة كل إدخال قبل النشر. تُستخدم الصور الخالية من حقوق النشر فقط. يُحافظ على الموقع كمنطقة تقريبية لحماية الخصوصية، مع بقائه صادقًا وقابلاً للتحقق. المنصة مفتوحة المصدر ومحمية من الاستغلال وتعمل كخدمة عامة — لا إعلانات ولا جمع تبرعات. تُقدَّم ترجمات الواجهة على المنصة؛ وتُترجم الإدخالات من قبل مجتمعنا بمرور الوقت.', covenant: 'اقرأ ميثاقنا مفتوح المصدر', family: 'هذه المنصة جزء من عائلة الشفاء الكوكبي UF51 — الحلول الموثقة هنا هي محرك المعرفة وراء عملنا الميداني.', action: 'اتخذ إجراء', honour: 'بُني تكريمًا لـ Janine M. H. Selendy وهورايزون إنترناشونال — وسُلّم إلى العالم، إلى الكوكب، إلى جميعنا.', all: 'الكل', featured: 'إشارات' },
};

const MotionLink = motion(Link);
 function SolutionCard({ item }) {
   const isSolution = item.entry_type === 'solution';
   return (
     <MotionLink
       to={`/ClimateDetail/${item.entry_type}/${item.id}`}
       initial={false}
       animate={{ opacity: 1, y: 0 }}
       whileTap={{ scale: 0.96 }}
       transition={{ type: 'spring', stiffness: 500, damping: 30 }}
       className={`relative text-left overflow-hidden bg-[#141210] border border-[#141210] active:border-[#e2602a] ${
         isSolution ? 'border-t-4 border-t-[#1e3a2b]' : 'border-t-4 border-t-[#e2602a]'
       } min-h-[110px] flex items-end block`}
     >
       <img
         src={item.image_url || CATEGORY_IMAGE(item.category)}
         alt=""
         loading="lazy"
         className="absolute inset-0 w-full h-full object-cover"
         style={{ filter: 'grayscale(1) contrast(1.25)' }}
         onError={(e) => { e.currentTarget.src = CATEGORY_IMAGE(item.category); }}
       />
       {/* Gradient scrim — guarantees title readability on any image */}
       <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,18,16,0) 30%, rgba(20,18,16,0.85) 100%)' }} />
       <div className="relative p-2.5 w-full">
         <div className={`text-[8px] font-black font-mono uppercase tracking-widest ${isSolution ? 'text-[#7fd6a0]' : 'text-[#ff9a6b]'}`}>
           {isSolution ? 'Solution' : 'Crisis'}
         </div>
         <h3 className="text-[11px] font-black font-mono uppercase leading-tight text-[#efe7d6] line-clamp-3 mt-0.5">
           {item.title}
         </h3>
       </div>
     </MotionLink>
   );
 }

export default function TogetherChangeClimate() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('climate51_lang') || 'auto'; } catch { return 'auto'; } });
  const [liveStrings, setLiveStrings] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [autoLang, setAutoLang] = useState('en');
  const [otherOpen, setOtherOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const { categories } = useClimateCategories();

  const handleShare = async () => {
    const origin = window.location.hostname.startsWith('preview--')
      ? 'https://' + window.location.hostname.replace('preview--', '')
      : window.location.origin;
    const url = origin + '/TogetherChangeClimate';
    const shareData = {
      title: 'Together We Change Climate',
      text: 'A public record of climate emergencies and the positive actions that work — every language on Earth.',
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
    base44.entities.ClimateSolution.list().then(r => { setItems(r); setLoading(false); }).catch(() => setLoading(false));
    base44.entities.ClimateGroup.list().then(r => setGroups(r || [])).catch(() => setGroups([]));
    base44.entities.ClimateAction.list().then(r => setActions(r || [])).catch(() => setActions([]));
  }, []);

  useEffect(() => {
    try {
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
      setAutoLang((nav || 'en').split('-')[0].toLowerCase() || 'en');
    } catch { setAutoLang('en'); }
  }, []);

  useEffect(() => {
    const resolved = lang === 'auto' ? autoLang : lang;
    if (T[resolved]) { setLiveStrings(null); return; }
    if (resolved === 'en' || resolved === 'auto') { setLiveStrings(null); return; }
    const cacheKey = 'climate51_t_' + resolved;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) { setLiveStrings(JSON.parse(cached)); return; }
    } catch { /* ignore */ }
    let cancelled = false;
    setTranslating(true);
    base44.functions.invoke('translateClimate', { lang: resolved, strings: { ...T.en } })
      .then(res => {
        if (cancelled) return;
        const out = res?.data?.translations || res?.translations;
        if (out && out.title_a) {
          setLiveStrings(out);
          try { localStorage.setItem(cacheKey, JSON.stringify(out)); } catch { /* storage full */ }
        }
      })
      .catch(() => { /* fall back to English silently */ })
      .finally(() => { if (!cancelled) setTranslating(false); });
    return () => { cancelled = true; };
  }, [lang, autoLang]);

  const handleLang = (code) => {
    setLang(code);
    try { localStorage.setItem('climate51_lang', code); } catch { /* ignore */ }
  };

  const chosen = lang === 'auto' ? autoLang : lang;
  const t = { ...T.en, ...(T[chosen] || liveStrings || {}) };
  const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur']);
  const isRTL = RTL_LANGS.has((chosen || '').split('-')[0]);

  const filtered = useMemo(() => {
    return items.filter(i => {
      const q = (i.title + ' ' + i.summary + ' ' + i.category + ' ' + (i.region_rough||'') + ' ' + (i.country||'')).toLowerCase();
      const matchesQ = !query || q.includes(query.toLowerCase());
      const matchesCat = selectedCategory === 'all' || i.category === selectedCategory;
      const matchesType = selectedType === 'all' || i.entry_type === selectedType;
      return matchesQ && matchesCat && matchesType;
    });
  }, [items, query, selectedCategory, selectedType]);

  const showEntries = selectedType !== 'groups' && selectedType !== 'actions';

  const solutions = filtered.filter(i => i.entry_type === 'solution');
  const crises = filtered.filter(i => i.entry_type === 'climate_crisis');
  const featured = useMemo(() => items.filter(i => i.featured).slice(0, 3), [items]);

  const filteredActions = useMemo(() => {
    return actions.filter(a => {
      const q = (a.title + ' ' + a.description + ' ' + a.action_type + ' ' + (a.region_rough||'') + ' ' + (a.country||'')).toLowerCase();
      const matchesQ = !query || q.includes(query.toLowerCase());
      const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
      return matchesQ && matchesCat;
    });
  }, [actions, query, selectedCategory]);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <style>{`
        @keyframes twcc-enter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes twcc-stamp { from { opacity: 0; transform: rotate(-17deg) scale(1.02); } to { opacity: .9; transform: rotate(-17deg) scale(1); } }
        @keyframes twcc-stamp-pulse { 0%, 100% { box-shadow: inset 0 0 0 3px #141210, 0 0 0 2px #efe7d6; } 50% { box-shadow: inset 0 0 0 3px #141210, 0 0 0 2px #efe7d6, 0 0 24px rgba(226,96,42,.55); } }
        @keyframes twcc-flicker { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .72; } }
        @keyframes twcc-epigraph { from { opacity: 0; letter-spacing: 0.3em; } to { opacity: 1; letter-spacing: 0.15em; } }
        @keyframes twcc-scan { from { background-position: 0 0; } to { background-position: 0 4px; } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>

      {/* ── BIG SCIENCE EPIGRAPH — Laurie's thesis + the x = x covenant, cold opening ── */}
      <div className="bg-[#141210] px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-[#e2602a]/20" style={{ animation: 'twcc-epigraph 1.2s ease-out both' }}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
          <span className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]/60 text-center leading-tight">
            This is the time. And this is the record of the time.
          </span>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
        </div>
        <div className="text-[10px] font-black font-mono text-[#e2602a] tracking-[0.2em] leading-none">
          x = x
        </div>
      </div>

      {/* ── JANE GOODALL — her words, from Janine's spec ── */}
      <div className="bg-[#141210] px-5 py-2.5 border-t border-[#e2602a]/15">
        <p className="text-[9px] font-mono italic text-[#efe7d6]/50 text-center leading-relaxed">
          "Every single day, we hold the power to shape the world around us."
        </p>
        <p className="text-[7px] font-mono uppercase tracking-widest text-[#efe7d6]/30 text-center mt-0.5">
          Dr. Jane Goodall
        </p>
      </div>

      <ClimateImpactBar />

      {/* ── HERO — three-band signal stack: bone / ink / signal ── */}
      <div className="relative bg-[#141210] overflow-hidden" style={{ minHeight: '72vh' }}>
        {/* O Superman — the pilot's voice, cold in the corner */}
        <div className="absolute top-3 left-5 z-20 flex items-center gap-1.5 pointer-events-none" style={{ animation: 'twcc-flicker 7s linear 2s infinite' }}>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse" />
          <span className="text-[7px] font-black font-mono uppercase tracking-[0.25em] text-[#efe7d6]/30">O Superman · O Superman</span>
        </div>
        <img
          src={IMAGES.global}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(1) contrast(1.35)', mixBlendMode: 'screen', opacity: 0.46 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(226,96,42,.26), rgba(20,18,16,.54) 45%, #141210 100%)' }} />
        {/* Scanline texture — cold transmission signal */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)', animation: 'twcc-scan 0.8s linear infinite' }} />

        {/* Bone band */}
        <div className="relative z-10 bg-[#efe7d6] px-5 py-4 flex items-center justify-between gap-3"
          style={{ animation: 'twcc-enter .25s ease-out both' }}>
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#141210]">{t.service}</span>
          <div className="flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-[#141210]" />
            <select
              value={lang}
              onChange={e => {
                if (e.target.value === '__other') { setOtherOpen(true); }
                else { setOtherOpen(false); handleLang(e.target.value); }
              }}
              aria-label="Select language"
              size={1}
              className="bg-transparent text-[#141210] border border-[#141210] px-1.5 py-1 text-[10px] font-mono font-bold outline-none cursor-pointer max-w-[150px] truncate"
            >
              <option value="auto">🌐 Auto</option>
              {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              <option value="__other">✨ Type any language…</option>
            </select>
            {translating && <span className="text-[9px] font-mono text-[#1e3a2b] animate-pulse">…</span>}
            <button
              onClick={handleShare}
              aria-label="Share this platform"
              className="ml-1 flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] bg-[#141210] text-[#efe7d6] border border-[#141210] text-[10px] font-black font-mono uppercase active:bg-[#e2602a] active:text-[#141210] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>
        </div>

        {/* Ink band */}
        <div className="relative z-10 px-5 pt-10 pb-8 flex items-start" style={{ animation: 'twcc-enter .25s ease-out .04s both' }}>
          <h1 className="font-black uppercase leading-[0.94] max-w-[360px] relative z-10 text-[#efe7d6]"
            style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: 'clamp(38px, 11vw, 58px)', letterSpacing: '-0.035em' }}>
            {t.title_a}<br />
            <span className="text-[#e2602a]">{t.title_b}</span> {t.title_c}
          </h1>
          {/* Record-of-the-time seal — the stamp of truth */}
          <div className="absolute right-5 top-16 w-[104px] h-[104px] pointer-events-none flex items-center justify-center"
            style={{ transform: 'rotate(-17deg)', animation: 'twcc-stamp .25s ease-out .1s both, twcc-stamp-pulse 3.2s ease-in-out .6s infinite' }}>
            <div className="absolute inset-0 rounded-full border-8 border-[#e2602a]" style={{ boxShadow: 'inset 0 0 0 3px #141210, 0 0 0 2px #efe7d6' }} />
            <div className="relative text-center" style={{ opacity: 0.9 }}>
              <div className="text-[7px] font-black font-mono uppercase tracking-[0.1em] text-[#e2602a] leading-none">Record</div>
              <div className="text-[6px] font-mono text-[#efe7d6]/70 leading-none mt-0.5">of the</div>
              <div className="text-[7px] font-black font-mono uppercase tracking-[0.1em] text-[#e2602a] leading-none mt-0.5">Time</div>
            </div>
          </div>
        </div>

        {/* Signal band */}
        <div className="relative z-10 bg-[#e2602a] px-5 py-5 mt-auto" style={{ animation: 'twcc-enter .25s ease-out .08s both, twcc-flicker 7s linear 1.2s infinite' }}>
          <p className="text-[11px] font-bold uppercase leading-relaxed max-w-[330px] text-[#141210] tracking-wide">{t.sub}</p>
          {/* Raw prophetic tagline — Cash/Dylan/Young. A proverb, not copy. Same in every tongue. */}
          <p className="text-[9px] font-black font-mono uppercase leading-relaxed mt-3 text-[#141210] tracking-[0.1em]" style={{ opacity: 0.75 }}>
            Every symbol · every number · every tongue · nobody left behind · the noise is loud · the record is louder
          </p>
        </div>
      </div>

      {/* ── TRANSMISSION — the soul of the platform, spoken in the artist's voice ── */}
      <Transmission />

      {/* ── LIVE RECORD STRIP — real counts, honest signal ── */}
      <div className="px-4 py-2 bg-[#141210] flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-black font-mono uppercase tracking-widest text-[#efe7d6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
          {t.live}
        </span>
        <span className="text-[9px] font-mono text-[#efe7d6]/70">
          {items.length + actions.length} {t.entries_now}
        </span>
      </div>

      {/* ── ANY-LANGUAGE INPUT ── */}
      {otherOpen && (
        <div className="px-4 py-3 bg-[#efe7d6] border-b-2 border-[#141210] flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase flex-shrink-0">Any language on Earth:</span>
          <input
            autoFocus
            placeholder="e.g. Gàidhlig, Cymraeg, Quechua, Ancient Greek, Hawaiian…"
            onKeyDown={e => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                handleLang(e.currentTarget.value.trim());
                setOtherOpen(false);
              }
            }}
            className="flex-1 bg-[#f7f1e5] border border-[#141210] px-3 py-1.5 text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none"
          />
          <button
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling;
              if (input && input.value.trim()) { handleLang(input.value.trim()); setOtherOpen(false); }
            }}
            className="px-3 py-1.5 bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase"
          >Go</button>
          <button onClick={() => setOtherOpen(false)} aria-label="Close" className="w-9 h-9 flex items-center justify-center flex-shrink-0 border border-[#141210] bg-[#f7f1e5] text-[#141210] active:bg-[#e2602a] text-base leading-none">×</button>
        </div>
      )}

      {/* ── TOOLBAR — filters + search ── */}
      <div className="px-4 py-4 bg-[#efe7d6] border-b-2 border-[#141210]">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setSelectedType(selectedType === 'solution' ? 'all' : 'solution')}
            className={`flex-1 px-2 py-2.5 text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
              selectedType === 'solution' ? 'bg-[#1e3a2b] text-[#efe7d6] border-[#141210]' : 'bg-[#141210] text-[#efe7d6] border-[#141210] hover:bg-[#e2602a] hover:text-[#141210]'
            }`}
          >{t.solutions}</button>
          <button
            onClick={() => setSelectedType(selectedType === 'climate_crisis' ? 'all' : 'climate_crisis')}
            className={`flex-1 px-2 py-2.5 text-[10px] font-black font-mono uppercase border transition-colors duration-150 active:scale-95 ${
              selectedType === 'climate_crisis' ? 'bg-[#e2602a] text-[#141210] border-[#141210]' : 'bg-[#141210] text-[#efe7d6] border-[#141210] hover:bg-[#e2602a] hover:text-[#141210]'
            }`}
          >{t.crises}</button>
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5246]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.search}
            className="w-full bg-[#f7f1e5] border border-[#141210] pl-9 pr-4 py-3 min-h-[44px] text-[13px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]"
          />
        </div>
        <p className="text-[9px] font-mono mt-2 tracking-wide text-[#5a5246]">{t.noads} · {t.nofund} · {t.donate}</p>
        <button
          onClick={() => setShowSubmit(true)}
          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] bg-[#e2602a] text-[#141210] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
        >
          <Plus className="w-4 h-4" /> Submit a solution or crisis
        </button>
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

      {/* ── CATEGORY CHIPS — native horizontal scroll, compact ── */}
      <div className="px-4 py-3 bg-[#efe7d6] border-b-2 border-[#141210]">
        <div className="flex gap-1.5 overflow-x-auto overscroll-x-contain pb-1 -mx-4 px-4 snap-x" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} aria-label="Filter by category">
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

      {/* ── FEATURED SIGNALS ── */}
      {featured.length > 0 && (
        <div className="px-4 py-5 bg-[#efe7d6] border-b-2 border-[#141210]">
          <h2 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.featured}</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {featured.map((item) => (
              <SolutionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      <div className="bg-[#efe7d6]">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
            <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-4">{t.connect}</p>
          </div>
        ) : (
          <>
            {showEntries && solutions.length > 0 && (
              <section className="px-4 py-5 border-b-2 border-[#141210]">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.solutions}</h2>
                  <div className="flex-1 h-px bg-[#141210]/20" />
                  <span className="text-[10px] font-black font-mono text-[#1e3a2b]">{solutions.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {solutions.map((item, i) => (
                    <div key={item.id}>
                      <SolutionCard item={item} />
                    </div>
                  ))}
                </div>
              </section>
            )}
            {showEntries && crises.length > 0 && (
              <section className="px-4 py-5 border-b-2 border-[#141210]">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.crises}</h2>
                  <div className="flex-1 h-px bg-[#141210]/20" />
                  <span className="text-[10px] font-black font-mono text-[#e2602a]">{crises.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
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
              </div>
            )}
          </>
        )}

        {/* ── GROUPS — Janine's spec: people working on the same thing in an area can share ideas directly ── */}
        {(selectedType === 'all' || selectedType === 'groups') && groups.length > 0 && (
          <section className="px-4 py-5 border-b-2 border-[#141210]">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.groups}</h2>
              <div className="flex-1 h-px bg-[#141210]/20" />
              <span className="text-[10px] font-black font-mono text-[#1e3a2b]">{groups.length}</span>
            </div>
            <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mb-3">{t.groups_sub}</p>
            <div className="space-y-2">
              {groups.map(g => (
                <div key={g.id} className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#1e3a2b] p-3.5">
                  <h4 className="text-[12px] font-black font-mono uppercase text-[#141210] leading-tight">{g.name}</h4>
                  <div className="flex items-center gap-1.5 text-[#1e3a2b] mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[9px] font-black font-mono uppercase tracking-widest">{g.region || 'Global'}</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#141210] leading-relaxed mt-2">{g.description}</p>
                </div>
              ))}
            </div>
            <p className="text-[9px] font-mono text-[#5a5246] leading-relaxed mt-3">{t.groups_note}</p>
          </section>
        )}

        {/* ── ACTIONS — Janine's spec: cleanups, plantings, meetings, policy submissions. x = x — equal alongside Solutions and Crises ── */}
        {(selectedType === 'all' || selectedType === 'actions') && (
          <section className="px-4 py-5 border-b-2 border-[#141210]">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.actions}</h2>
              <div className="flex-1 h-px bg-[#141210]/20" />
              <span className="text-[10px] font-black font-mono text-[#e2602a]">{filteredActions.length}</span>
            </div>
            <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mb-3">{t.actions_sub}</p>
            {filteredActions.length > 0 ? (
              <div className="grid grid-cols-1 gap-2.5">
                {filteredActions.map(a => (
                  <ActionCard key={a.id} action={a} />
                ))}
              </div>
            ) : (
              <p className="text-[11px] font-mono text-[#5a5246] py-6 text-center">{t.actions_empty}</p>
            )}
          </section>
        )}

        {/* ── DEFINITIONS ── */}
        <section className="px-4 py-5 border-b-2 border-[#141210]">
          <h2 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.defs}</h2>
          <div className="space-y-2.5">
            <div className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#1e3a2b] p-4">
              <h4 className="text-[12px] font-black font-mono uppercase text-[#141210] mb-1">Geodesign</h4>
              <p className="text-[11px] font-mono text-[#141210] leading-relaxed">A set of concepts and methods used to involve all stakeholders in collaboratively designing optimal solutions for spatial challenges in the built and natural environments.</p>
            </div>
            <div className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#1e3a2b] p-4">
              <h4 className="text-[12px] font-black font-mono uppercase text-[#141210] mb-1">Rewilding</h4>
              <p className="text-[11px] font-mono text-[#141210] leading-relaxed">A large-scale conservation approach focused on restoring damaged ecosystems so nature can take care of itself.</p>
            </div>
            <div className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#e2602a] p-4">
              <h4 className="text-[12px] font-black font-mono uppercase text-[#141210] mb-1">Heat</h4>
              <p className="text-[11px] font-mono text-[#141210] leading-relaxed">In England, the Unite union has been warning about heat exhaustion, heatstroke, and dehydration since phases of intense heat began in May. Heat is a growing climate crisis for workers and communities worldwide.</p>
              <p className="text-[9px] font-mono text-[#5a5246] mt-2">Source: Guardian, 081626</p>
            </div>
          </div>
        </section>

        {/* ── GOVERNANCE ── */}
        <section className="px-4 py-5 bg-[#1e3a2b] text-[#efe7d6]">
          <h2 className="font-black uppercase text-[#e2602a] mb-3" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '26px', letterSpacing: '-0.025em' }}>{t.govern}</h2>
          <p className="text-[11px] font-mono leading-relaxed text-[#efe7d6]">{t.govern_body}</p>
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

        {/* ── TERMS & PRIVACY ── */}
        <div className="px-4 py-5 bg-[#efe7d6] border-t-2 border-[#1a1612] flex items-center justify-center gap-3">
          <Link to={createPageUrl('ClimateTerms')} className="text-[10px] font-mono font-black uppercase text-[#6b6258] hover:text-[#b3261e] transition-colors">Terms</Link>
          <span className="text-[#6b6258]/40 text-[10px] font-mono">·</span>
          <Link to={createPageUrl('ClimatePrivacy')} className="text-[10px] font-mono font-black uppercase text-[#6b6258] hover:text-[#b3261e] transition-colors">Privacy</Link>
        </div>

        <p className="px-4 py-6 text-center text-[9px] font-mono uppercase tracking-wide text-[#5a5246] bg-[#efe7d6]">{t.honour}</p>
      </div>

      {showSubmit && <ClimateSubmitForm onClose={() => setShowSubmit(false)} />}
    </div>
  );
}