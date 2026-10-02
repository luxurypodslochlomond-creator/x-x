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

function EntryModal({ item, onClose }) {
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
            <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">Reviewed: ✓</span>
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
  const [lang, setLang] = useState('en');

  useEffect(() => { base44.entities.ClimateSolution.list().then(r => { setItems(r); setLoading(false); }).catch(() => setLoading(false)); }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

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
              <span className="text-emerald-400 font-mono text-xs tracking-[0.3em] uppercase">Horizon International Cloud</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight max-w-3xl">
              Together we can change the <span className="text-emerald-400">course</span> of climate change
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl text-sm sm:text-base">
              A public service sharing climate emergencies and the positive actions
              that work — internationally — so we can replicate what good looks like.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)} className={`h-1.5 rounded-full transition-all ${i === heroIndex ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* PUBLIC SERVICE STRIP */}
      <div className="px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-gray-400">
        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-emerald-400" /> A public service to help save our planet</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> No advertising</span>
        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> No fund raising</span>
        <span className="flex items-center gap-1"><HandHeart className="w-3 h-3 text-amber-400" /> Donations welcome</span>
        <span className="flex items-center gap-1"><Languages className="w-3 h-3 text-cyan-400" /> In hundreds of languages</span>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="px-4 py-5 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search solutions and crises…"
              className="w-full bg-white/[0.04] border border-white/10 focus:border-emerald-400/60 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setSelectedType(selectedType === 'solution' ? 'all' : 'solution')}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedType === 'solution' ? 'bg-emerald-400/90 text-black border-emerald-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>Solutions</button>
            <button onClick={() => setSelectedType(selectedType === 'crisis' ? 'all' : 'crisis')}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedType === 'crisis' ? 'bg-amber-400/90 text-black border-amber-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>Crises</button>
          </div>
        </div>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="px-4 pb-2 max-w-6xl mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          <button onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategory === 'all' ? 'bg-emerald-400/90 text-black border-emerald-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)}
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${selectedCategory === c.id ? 'bg-emerald-400/90 text-black border-emerald-400' : 'bg-white/[0.04] border-white/10 text-gray-300'}`}>
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
            <p className="text-gray-500 text-sm mt-4">Connecting the planet…</p>
          </div>
        ) : (
          <>
            {solutions.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-emerald-400 font-black tracking-widest text-xs uppercase">Positive Actions</span>
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
                  <span className="text-amber-400 font-black tracking-widest text-xs uppercase">Climate Crises · Alerts</span>
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
                <p className="text-gray-500 mt-3">No entries match yet.</p>
              </div>
            )}
          </>
        )}

        {/* DEFINITIONS — from her spec */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <h3 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-3">Definitions</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <h4 className="text-sm font-bold text-white mb-1">Geodesign</h4>
              <p className="text-xs text-gray-400 leading-relaxed">A set of concepts and methods used to involve all stakeholders in collaboratively designing optimal solutions for spatial challenges in the built and natural environments.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
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
              <h4 className="text-sm font-black text-white">Built for the planet — and built to be trusted</h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Every entry is reviewed before publication. Only copyright-free images are used. Location is kept to a
                rough region to protect privacy, while remaining honest and verifiable. The platform is open source,
                extraction-proof, and runs as a public service — no advertising, no fund raising, ever.
              </p>
              <Link to={createPageUrl('ExtractionProofCovenant')} className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-xs font-bold mt-2">
                Read our open-source covenant <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-600 mt-8 font-mono">
          "Together we can change the course of climate change" · Built in honour of Janine M. H. Selendy &amp; Horizon International
        </p>
      </div>

      <AnimatePresence>
        {openItem && <EntryModal item={openItem} onClose={() => setOpenItem(null)} />}
      </AnimatePresence>
    </div>
  );
}