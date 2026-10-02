import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Droplets, Leaf, Sun, Shield, Waves, TreePine, Recycle, Zap, Languages, MapPin, ChevronDown, ChevronRight, Heart, HandHeart, Bird, Fish, Sprout, CloudRain, Snowflake, Wind, ArrowRight, X } from 'lucide-react';

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

const heroImages = [IMAGES.global, IMAGES.forest, IMAGES.oceans, IMAGES.renewable, IMAGES.mangroves];

// ── Interface language support (landing Janine's multi-language spec honestly) ──
const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'zh', label: '中文' },
  { code: 'ar', label: 'العربية' },
];

const T = {
  en: { brand: 'Horizon International Cloud', title_a: 'Together we can change the', title_b: 'course', title_c: 'of climate change', sub: 'A public service sharing climate emergencies and the positive actions that work — internationally — so we can replicate what good looks like.', service: 'A public service to help save our planet', noads: 'No advertising', nofund: 'No fund raising', donate: 'Donations welcome', langs: 'Multi-language', search: 'Search solutions and crises…', solutions: 'Solutions', crises: 'Crises', actions: 'Positive Actions', alerts: 'Climate Crises · Alerts', defs: 'Definitions', rev: 'Reviewed', connect: 'Connecting the planet…', empty: 'No entries match yet.', govern: 'Built for the planet — and built to be trusted', govern_body: 'Every entry is reviewed before publication. Only copyright-free images are used. Location is kept to a rough region to protect privacy, while remaining honest and verifiable. The platform is open source, extraction-proof, and runs as a public service — no advertising, no fundraising, ever. Interface translations are provided for the platform; entries themselves are translated by our community over time.', covenant: 'Read our open-source covenant', family: 'This platform is one part of UF51\'s Planetary Healing family — the verified solutions here are the knowledge engine behind our on-the-ground action.', action: 'Take action', honour: '"Together we can change the course of climate change" · Built in honour of Janine M. H. Selendy & Horizon International', all: 'All' },
  es: { brand: 'Horizon International Cloud', title_a: 'Juntos podemos cambiar el', title_b: 'curso', title_c: 'del cambio climático', sub: 'Un servicio público que comparte emergencias climáticas y las acciones positivas que funcionan — internacionalmente — para que podamos replicar lo que funciona bien.', service: 'Un servicio público para ayudar a salvar nuestro planeta', noads: 'Sin publicidad', nofund: 'Sin recaudación', donate: 'Donaciones bienvenidas', langs: 'Multilingüe', search: 'Buscar soluciones y crisis…', solutions: 'Soluciones', crises: 'Crisis', actions: 'Acciones Positivas', alerts: 'Crisis Climáticas · Alertas', defs: 'Definiciones', rev: 'Revisado', connect: 'Conectando el planeta…', empty: 'Sin resultados aún.', govern: 'Construido para el planeta — y para ser confiable', govern_body: 'Cada entrada se revisa antes de publicarse. Solo se usan imágenes sin derechos de autor. La ubicación se mantiene en una región aproximada para proteger la privacidad, siendo honesta y verificable. La plataforma es de código abierto, a prueba de extracción, y funciona como servicio público — sin publicidad, sin recaudación. Las traducciones de la interfaz se ofrecen en la plataforma; las entradas son traducidas por nuestra comunidad con el tiempo.', covenant: 'Lee nuestro pacto de código abierto', family: 'Esta plataforma es parte de la familia de Curación Planetaria de UF51 — las soluciones verificadas aquí son el motor de conocimiento detrás de nuestra acción sobre el terreno.', action: 'Actúa', honour: '"Juntos podemos cambiar el curso del cambio climático" · Construido en honor de Janine M. H. Selendy y Horizon International', all: 'Todo' },
  fr: { brand: 'Horizon International Cloud', title_a: 'Ensemble, nous pouvons changer le', title_b: 'cours', title_c: 'du changement climatique', sub: 'Un service public qui partage les urgences climatiques et les actions positives qui fonctionnent — à l\'international — pour répliquer ce qui fonctionne bien.', service: 'Un service public pour aider à sauver notre planète', noads: 'Aucune publicité', nofund: 'Aucune levée de fonds', donate: 'Dons bienvenus', langs: 'Multilingue', search: 'Rechercher solutions et crises…', solutions: 'Solutions', crises: 'Crises', actions: 'Actions Positives', alerts: 'Crises Climatiques · Alertes', defs: 'Définitions', rev: 'Vérifié', connect: 'Connexion de la planète…', empty: 'Aucun résultat pour l\'instant.', govern: 'Conçu pour la planète — et pour être digne de confiance', govern_body: 'Chaque entrée est vérifiée avant publication. Seules des images libres de droits sont utilisées. La localisation est limitée à une région approximative pour protéger la vie privée, tout en restant honnête et vérifiable. La plateforme est open source, in-extractible, et fonctionne en service public — sans publicité, sans levée de fonds. Les traductions de l\'interface sont fournies sur la plateforme; les entrées sont traduites par notre communauté au fil du temps.', covenant: 'Lire notre pacte open source', family: 'Cette plateforme fait partie de la famille de Guérison Planétaire UF51 — les solutions vérifiées ici sont le moteur de connaissance derrière notre action de terrain.', action: 'Agir', honour: '"Ensemble nous pouvons changer le cours du changement climatique" · Construit en l\'honneur de Janine M. H. Selendy et Horizon International', all: 'Tout' },
  de: { brand: 'Horizon International Cloud', title_a: 'Gemeinsam können wir den', title_b: 'Lauf', title_c: 'des Klimawandels ändern', sub: 'Ein öffentlicher Dienst, der Klimanotlagen und positive Maßnahmen teilt, die funktionieren — international — damit wir nachahmen können, was gut ist.', service: 'Ein öffentlicher Dienst, um unseren Planeten zu retten', noads: 'Keine Werbung', nofund: 'Keine Spendenaufrufe', donate: 'Spenden willkommen', langs: 'Mehrsprachig', search: 'Lösungen und Krisen suchen…', solutions: 'Lösungen', crises: 'Krisen', actions: 'Positive Maßnahmen', alerts: 'Klimakrisen · Alarme', defs: 'Definitionen', rev: 'Geprüft', connect: 'Planet verbinden…', empty: 'Noch keine Treffer.', govern: 'Für den Planeten gebaut — und gebaut, um vertraut zu werden', govern_body: 'Jeder Eintrag wird vor der Veröffentlichung geprüft. Es werden nur urheberrechtsfreie Bilder verwendet. Der Standort bleibt grob, um die Privatsphäre zu schützen, bleibt aber ehrlich und überprüfbar. Die Plattform ist Open Source, extraktionssicher und ein öffentlicher Dienst — ohne Werbung, ohne Spendenaufrufe. Oberflächenübersetzungen werden auf der Plattform angeboten; Einträge werden mit der Zeit von unserer Gemeinschaft übersetzt.', covenant: 'Unser Open-Source-Pakt', family: 'Diese Plattform ist Teil der UF51 Planetary-Healing-Familie — die verifizierten Lösungen hier sind die Wissens-Engine hinter unserer Arbeit vor Ort.', action: 'Handeln', honour: '„Gemeinsam können wir den Lauf des Klimawandels ändern“ · Gebaut zu Ehren von Janine M. H. Selendy & Horizon International', all: 'Alle' },
  pt: { brand: 'Horizon International Cloud', title_a: 'Juntos podemos mudar o', title_b: 'curso', title_c: 'das mudanças climáticas', sub: 'Um serviço público que partilha emergências climáticas e as ações positivas que funcionam — internacionalmente — para que possamos replicar o que está bom.', service: 'Um serviço público para ajudar a salvar o nosso planeta', noads: 'Sem publicidade', nofund: 'Sem angariação', donate: 'Doações bem-vindas', langs: 'Multilíngue', search: 'Pesquisar soluções e crises…', solutions: 'Soluções', crises: 'Crises', actions: 'Ações Positivas', alerts: 'Crises Climáticas · Alertas', defs: 'Definições', rev: 'Revisto', connect: 'A conectar o planeta…', empty: 'Ainda sem resultados.', govern: 'Construído para o planeta — e para ser confiável', govern_body: 'Cada entrada é revista antes da publicação. Apenas imagens livres de direitos são usadas. A localização é mantida numa região aproximada para proteger a privacidade, permanecendo honesta e verificável. A plataforma é open source, à prova de extração, e funciona como serviço público — sem publicidade, sem angariação. As traduções da interface são fornecidas na plataforma; as entradas são traduzidas pela nossa comunidade ao longo do tempo.', covenant: 'Ler o nosso pacto open source', family: 'Esta plataforma faz parte da família de Cura Planetária UF51 — as soluções verificadas aqui são o motor de conhecimento por trás da nossa ação no terreno.', action: 'Agir', honour: '"Juntos podemos mudar o curso das mudanças climáticas" · Construído em honra de Janine M. H. Selendy & Horizon International', all: 'Todos' },
  hi: { brand: 'होराइज़न इंटरनेशनल क्लाउड', title_a: 'साथ मिलकर हम जलवायु परिवर्तन का', title_b: 'रुख', title_c: 'बदल सकते हैं', sub: 'एक सार्वजनिक सेवा जो जलवायु आपातकालों और काम करने वाले सकारात्मक कार्यों को साझा करती है — अंतरराष्ट्रीय स्तर पर — ताकि हम अच्छे की नकल कर सकें।', service: 'हमारे ग्रह को बचाने के लिए एक सार्वजनिक सेवा', noads: 'कोई विज्ञापन नहीं', nofund: 'कोई धन उगाही नहीं', donate: 'दान का स्वागत है', langs: 'बहुभाषी', search: 'समाधान और संकट खोजें…', solutions: 'समाधान', crises: 'संकट', actions: 'सकारात्मक कार्य', alerts: 'जलवायु संकट · अलर्ट', defs: 'परिभाषाएँ', rev: 'समीक्षित', connect: 'ग्रह जोड़ रहे हैं…', empty: 'अभी कोई परिणाम नहीं।', govern: 'ग्रह के लिए निर्मित — और विश्वसनीय होने के लिए निर्मित', govern_body: 'हर प्रविष्टि प्रकाशन से पहले समीक्षित होती है। केवल कॉपीराइट-मुक्त छवियाँ उपयोग होती हैं। स्थान गोपनीयता के लिए मोटे क्षेत्र तक सीमित रहता है, फिर भी ईमानदार और सत्यापन योग्य। यह मंच ओपन सोर्स, निष्कर्षण-रोधी है, और सार्वजनिक सेवा के रूप में चलता है — कोई विज्ञापन नहीं, कोई धन उगाही नहीं। इंटरफ़ेस अनुवाद मंच पर उपलब्ध हैं; प्रविष्टियाँ समय के साथ हमारे समुदाय द्वारा अनुवादित होती हैं।', covenant: 'हमारा ओपन सोर्स संकल्प पढ़ें', family: 'यह मंच UF51 की प्लैनेटरी हीलिंग परिवार का हिस्सा है — यहाँ की सत्यापित समाधान हमारे ज़मीनी कार्य के पीछे ज्ञान इंजन हैं।', action: 'कार्रवाई करें', honour: '"साथ मिलकर हम जलवायु परिवर्तन का रुख बदल सकते हैं" · जनीन एम. एच. सेलेंडी और होराइज़न इंटरनेशनल के सम्मान में निर्मित', all: 'सभी' },
  zh: { brand: '跨国界国际云', title_a: '我们携手可以改变', title_b: '气候变化的走向', title_c: '', sub: '一项公共服务，分享气候紧急事件和行之有效的积极行动——跨越国界——让我们可以复制优秀的范例。', service: '一项帮助拯救我们星球的公共服务', noads: '无广告', nofund: '无募捐', donate: '欢迎捐赠', langs: '多语言', search: '搜索解决方案与危机…', solutions: '解决方案', crises: '危机', actions: '积极行动', alerts: '气候危机 · 警报', defs: '定义', rev: '已审核', connect: '正在连接地球…', empty: '暂无匹配内容。', govern: '为地球而生——并生来值得信赖', govern_body: '每条内容在发布前都经过审核。仅使用无版权图片。位置保留为大致区域以保护隐私，同时保持诚实与可验证。平台开源、防提取，并作为公共服务运行——无广告、无募捐。界面翻译在平台上提供；条目由我们的社区随时间逐步翻译。', covenant: '阅读我们的开源契约', family: '本平台是UF51“行星疗愈”家族的一部分——此处经核实的解决方案是支撑我们实地行动的知识引擎。', action: '采取行动', honour: '“我们携手可以改变气候变化的走向”· 为致敬Janine M. H. Selendy与国际云而建', all: '全部' },
  ar: { brand: 'هورايزون إنترناشونال كلاود', title_a: 'معًا يمكننا تغيير', title_b: 'مسار', title_c: 'تغير المناخ', sub: 'خدمة عامة تشارك حالات الطوارئ المناخية والإجراءات الإيجابية التي تنجح — دوليًا — لنكرر ما هو جيد.', service: 'خدمة عامة للمساعدة في إنقاذ كوكبنا', noads: 'لا إعلانات', nofund: 'لا جمع تبرعات', donate: 'التبرعات مرحب بها', langs: 'متعدد اللغات', search: 'ابحث عن الحلول والأزمات…', solutions: 'الحلول', crises: 'الأزمات', actions: 'إجراءات إيجابية', alerts: 'أزمات المناخ · تنبيهات', defs: 'تعريفات', rev: 'تمت المراجعة', connect: 'جارٍ توصيل الكوكب…', empty: 'لا نتائج مطابقة بعد.', govern: 'مبني من أجل الكوكب — ومبني ليكون موثوقًا', govern_body: 'تتم مراجعة كل إدخال قبل النشر. تُستخدم الصور الخالية من حقوق النشر فقط. يُحافظ على الموقع كمنطقة تقريبية لحماية الخصوصية، مع بقائه صادقًا وقابلاً للتحقق. المنصة مفتوحة المصدر ومحمية من الاستغلال وتعمل كخدمة عامة — لا إعلانات ولا جمع تبرعات. تُقدَّم ترجمات الواجهة على المنصة؛ وتُترجم الإدخالات من قبل مجتمعنا بمرور الوقت.', covenant: 'اقرأ ميثاقنا مفتوح المصدر', family: 'هذه المنصة جزء من عائلة الشفاء الكوكبي UF51 — الحلول الموثقة هنا هي محرك المعرفة وراء عملنا الميداني.', action: 'اتخذ إجراء', honour: '«معًا يمكننا تغيير مسار تغير المناخ» · بُني تكريمًا لـ Janine M. H. Selendy وهورايزون إنترناشونال', all: 'الكل' },
};

function SolutionCard({ item, onOpen }) {
  const Icon = CATEGORIES.find(c => c.id === item.category)?.icon || Globe;
  return (
    <motion.button
      onClick={() => onOpen(item)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-400/60 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image_url || CATEGORY_IMAGE(item.category)}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.currentTarget.src = CATEGORY_IMAGE(item.category); }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
          <span className={`text-[10px] font-black font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
            item.entry_type === 'solution' ? 'bg-emerald-400/90 text-black' : 'bg-amber-400/90 text-black'
          }`}>
            {item.entry_type === 'solution' ? 'Solution' : 'Crisis'}
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 text-emerald-400/80 mb-1">
          <Icon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.subcategory || item.category?.replaceAll('_', ' ')}</span>
        </div>
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{item.title}</h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.summary}</p>
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <MapPin className="w-3 h-3" />
          <span className="text-[10px]">{item.region_rough || item.country || '—'}</span>
        </div>
      </div>
    </motion.button>
  );
}

function EntryModal({ item, onClose, t = T.en }) {
  const Icon = CATEGORIES.find(c => c.id === item.category)?.icon || Globe;
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-6" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="bg-[#0d1117] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
      >
        <div className="relative h-52 sm:h-60">
          <img src={item.image_url || CATEGORY_IMAGE(item.category)} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"><X className="w-5 h-5" /></button>
          <div className="absolute bottom-3 left-4 right-4">
            <span className={`text-[10px] font-black font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
              item.entry_type === 'solution' ? 'bg-emerald-400/90 text-black' : 'bg-amber-400/90 text-black'
            }`}>{item.entry_type === 'solution' ? 'Solution' : 'Climate Crisis'}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
            <Icon className="w-4 h-4" /><span className="text-xs font-bold uppercase tracking-wider">{item.category?.replaceAll('_', ' ')}</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">{item.title}</h2>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
            <MapPin className="w-3.5 h-3.5 text-gray-500" />
            <span>{item.country} · {item.region_rough}</span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed mt-4">{item.details}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
            <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">Scale: {item.scale || '—'}</span>
            <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">{t.rev}: ✓</span>
          </div>
          {item.source_url && (
            <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-bold">
              View source <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TogetherChangeClimate() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [openItem, setOpenItem] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  // Live translations: bundled for common languages, AI-translated on demand for any other —
  // the user's choice and the translated result are cached locally so repeat visits are instant and zero-loss.
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('climate51_lang') || 'auto'; } catch { return 'auto'; } });
  const [liveStrings, setLiveStrings] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [autoLang, setAutoLang] = useState('en');
  const [otherOpen, setOtherOpen] = useState(false);

  useEffect(() => { base44.entities.ClimateSolution.list().then(r => { setItems(r); setLoading(false); }).catch(() => setLoading(false)); }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Auto-detect the browser language once.
  useEffect(() => {
    try {
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
      setAutoLang((nav || 'en').split('-')[0].toLowerCase() || 'en');
    } catch { setAutoLang('en'); }
  }, []);

  // Resolve the effective language and trigger live translation when it's not one of the bundled ones.
  useEffect(() => {
    const resolved = lang === 'auto' ? autoLang : lang;
    if (T[resolved]) { setLiveStrings(null); return; }
    if (resolved === 'en') { setLiveStrings(null); return; }
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
        if (out && out.brand) {
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
  const t = T[chosen] || liveStrings || T.en;

  const filtered = useMemo(() => {
    return items.filter(i => {
      const q = (i.title + ' ' + i.summary + ' ' + i.category + ' ' + i.region_rough + ' ' + i.country).toLowerCase();
      const matchesQ = !query || q.includes(query.toLowerCase());
      const matchesCat = selectedCategory === 'all' || i.category === selectedCategory;
      const matchesType = selectedType === 'all' || i.entry_type === selectedType;
      return matchesQ && matchesCat && matchesType;
    });
  }, [items, query, selectedCategory, selectedType]);

  const solutions = filtered.filter(i => i.entry_type === 'solution');
  const crises = filtered.filter(i => i.entry_type === 'crisis');

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* HERO — mantra + rotating image */}
      <div className="relative h-[62vh] min-h-[420px] overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={heroIndex}
            src={heroImages[heroIndex]}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0f1a]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-emerald-400" />
              <span className="text-emerald-400 font-mono text-xs tracking-[0.3em] uppercase">{t.brand}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight max-w-3xl">
              {t.title_a} <span className="text-emerald-400">{t.title_b}</span> {t.title_c}
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl text-sm sm:text-base">
              {t.sub}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)} className={`h-1.5 rounded-full transition-all ${i === heroIndex ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* PUBLIC SERVICE STRIP + LANGUAGE PICKER */}
      <div className="px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-gray-400">
        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-emerald-400" /> {t.service}</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> {t.noads}</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> {t.nofund}</span>
        <span className="flex items-center gap-1"><HandHeart className="w-3 h-3 text-amber-400" /> {t.donate}</span>
        <div className="flex items-center gap-1.5">
          <Languages className="w-3 h-3 text-cyan-400" />
          <select
            value={lang}
            onChange={e => {
              if (e.target.value === '__other') { setOtherOpen(true); }
              else { setOtherOpen(false); handleLang(e.target.value); }
            }}
            aria-label="Select language / Idioma / Sprache / 言語"
            className="bg-transparent text-gray-300 border border-white/10 rounded-md px-1.5 py-0.5 text-[11px] outline-none cursor-pointer hover:border-cyan-400/50 transition-colors max-w-[160px]"
          >
            <option value="auto" className="bg-[#161b22]">🌐 Auto-detect</option>
            {LANGS.map(l => <option key={l.code} value={l.code} className="bg-[#161b22]">{l.label}</option>)}
            <option value="__other" className="bg-[#161b22]">✨ Any other language…</option>
          </select>
          {translating && <span className="text-[10px] text-cyan-400/70 animate-pulse">translating…</span>}
        </div>
      </div>

      {/* ANY-LANGUAGE INPUT — live AI translation for languages outside the bundled list */}
      {otherOpen && (
        <div className="px-4 py-3 border-b border-white/10 bg-cyan-500/5 flex items-center gap-2 max-w-6xl mx-auto">
          <span className="text-[11px] text-gray-300 flex-shrink-0">Type any language:</span>
          <input
            autoFocus
            placeholder="e.g. Yoruba, Tagalog, Swedish, Māori…"
            onKeyDown={e => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                const code = e.currentTarget.value.trim().toLowerCase();
                handleLang(code);
                setOtherOpen(false);
              }
            }}
            className="flex-1 bg-white/[0.04] border border-cyan-400/30 focus:border-cyan-400 rounded-lg px-3 py-1.5 text-[12px] text-white placeholder-gray-500 outline-none"
          />
          <button
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling;
              if (input && input.value.trim()) {
                handleLang(input.value.trim().toLowerCase());
                setOtherOpen(false);
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-cyan-400/90 text-black text-[11px] font-bold"
          >Go</button>
          <button onClick={() => setOtherOpen(false)} className="text-gray-500 hover:text-white text-xs px-1">×</button>
        </div>
      )}

      {/* SEARCH + FILTERS — search full width, filters stacked below so nothing ever squeezes on mobile */}
      <div className="px-4 py-5 max-w-6xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.search}
            className="w-full bg-white/[0.04] border border-white/10 focus:border-emerald-400/60 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button onClick={() => setSelectedType(selectedType === 'solution' ? 'all' : 'solution')}
            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${selectedType === 'solution' ? 'bg-emerald-400/90 text-black border-emerald-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>{t.solutions}</button>
          <button onClick={() => setSelectedType(selectedType === 'crisis' ? 'all' : 'crisis')}
            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${selectedType === 'crisis' ? 'bg-amber-400/90 text-black border-amber-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>{t.crises}</button>
        </div>
      </div>

      {/* CATEGORY CHIPS — native horizontal scroll (what phones expect for a tag rail), compact so far less sliding */}
      <div className="px-4 pb-2 max-w-6xl mx-auto">
        <div className="flex gap-1.5 overflow-x-auto overscroll-x-contain pb-2 -mx-4 px-4 snap-x" style={{ scrollbarWidth: 'none' }} aria-label="Filter by category">
          <button onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 snap-start px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategory === 'all' ? 'bg-emerald-400/90 text-black border-emerald-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>{t.all}</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)}
              className={`flex-shrink-0 snap-start flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategory === c.id ? 'bg-emerald-400/90 text-black border-emerald-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>
              <c.icon className="w-3 h-3" />{c.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
            <p className="text-gray-500 text-sm mt-4">{t.connect}</p>
          </div>
        ) : (
          <>
            {solutions.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-emerald-400 font-black tracking-widest text-xs uppercase">{t.actions}</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-gray-500">{solutions.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                  {solutions.map(item => <SolutionCard key={item.id} item={item} onOpen={setOpenItem} />)}
                </div>
              </>
            )}
            {crises.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-amber-400 font-black tracking-widest text-xs uppercase">{t.alerts}</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-gray-500">{crises.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {crises.map(item => <SolutionCard key={item.id} item={item} onOpen={setOpenItem} />)}
                </div>
              </>
            )}
            {(solutions.length + crises.length) === 0 && (
              <div className="py-20 text-center">
                <Globe className="w-10 h-10 text-gray-600 mx-auto" />
                <p className="text-gray-500 mt-3">{t.empty}</p>
              </div>
            )}
          </>
        )}

        {/* DEFINITIONS — from her spec */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <h3 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-3">{t.defs}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
              <h4 className="text-sm font-bold text-white mb-1">Geodesign</h4>
              <p className="text-xs text-gray-400 leading-relaxed">A set of concepts and methods used to involve all stakeholders in collaboratively designing optimal solutions for spatial challenges in the built and natural environments.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
              <h4 className="text-sm font-bold text-white mb-1">Rewilding</h4>
              <p className="text-xs text-gray-400 leading-relaxed">A large-scale conservation approach focused on restoring damaged ecosystems so nature can take care of itself.</p>
            </div>
          </div>
        </div>

        {/* GOVERNANCE / INTEGRITY NOTE */}
        <div className="mt-8 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-400/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-white">{t.govern}</h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                {t.govern_body}
              </p>
              <Link to={createPageUrl('ExtractionProofCovenant')} className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-xs font-bold mt-2">
                {t.covenant} <ArrowRight className="w-3 h-3" />
              </Link>
              <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/10">
                {t.family}{" "}
                <Link to={createPageUrl('NewCleanup')} className="text-emerald-400 hover:text-emerald-300 font-bold">
                  {t.action} →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-500 mt-8 font-mono">{t.honour}</p>
      </div>

      <AnimatePresence>
        {openItem && <EntryModal item={openItem} onClose={() => setOpenItem(null)} t={t} />}
      </AnimatePresence>
    </div>
  );
}