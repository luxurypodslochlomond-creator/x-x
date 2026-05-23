import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKSorted, COOLASFUCKPaw } from '@/components/shared/COOLASFUCKIcon';
import { Radio, Zap, Globe, GraduationCap, Signal, Brain, ChevronDown, ArrowRight, Building2 } from 'lucide-react';

// Every product — what it does, who it's for, honest badge
const PRODUCTS = [
  {
    id: 'ctrl51',
    name: 'CTRL51',
    tag: 'Procurement team?',
    desc: 'AI fraud detection for council procurement. Catches price gouging, unapproved suppliers, and pattern anomalies before they cost you.',
    badge: '£5k/month',
    badgeColor: 'text-red-400 border-red-500/40',
    Icon: Building2,
    iconClass: 'text-red-400',
    url: 'CTRL51',
    border: 'border-red-500/40 hover:border-red-400/80',
    glow: 'rgba(239,68,68,0.15)',
  },
  {
    id: 'sorted',
    name: 'SORTED',
    tag: 'Got a scary letter?',
    desc: 'Paste any letter — benefits, legal, council, landlord — and get plain English back. What it means. What to do. Any language.',
    badge: 'Subscription',
    badgeColor: 'text-green-400 border-green-500/40',
    Icon: COOLASFUCKSorted,
    url: 'Family51',
    border: 'border-green-500/40 hover:border-green-400/80',
    glow: 'rgba(34,197,94,0.15)',
  },
  {
    id: 'petsounds',
    name: 'PETSOUNDS51',
    tag: 'Anxious pet?',
    desc: 'Sound therapy protocols for dogs, cats and horses. Built on peer-reviewed psychoacoustic research. Free to try. No signup.',
    badge: 'Free · Subscription',
    badgeColor: 'text-amber-400 border-amber-500/40',
    Icon: COOLASFUCKPaw,
    url: 'PetSounds51',
    border: 'border-amber-500/40 hover:border-amber-400/80',
    glow: 'rgba(212,160,23,0.15)',
  },
  {
    id: 'cb51',
    name: 'CB51',
    tag: 'Managing artists?',
    desc: 'AI co-manager for touring musicians. Scheduling, contracts, payments, band voting, and the noise that drowns out the music.',
    badge: 'Free Beta',
    badgeColor: 'text-cyan-400 border-cyan-500/40',
    Icon: Radio,
    iconClass: 'text-cyan-400',
    url: 'CB51',
    border: 'border-cyan-500/40 hover:border-cyan-400/80',
    glow: 'rgba(6,182,212,0.15)',
  },
  {
    id: 'buzzstop',
    name: 'BUZZSTOP',
    tag: 'Got tinnitus?',
    desc: 'Three-layer AI frequency engine designed to mask and cancel tinnitus. Works in the browser. Free. No account needed.',
    badge: 'Free',
    badgeColor: 'text-pink-400 border-pink-500/40',
    Icon: Zap,
    iconClass: 'text-pink-400',
    url: 'BuzzStop',
    border: 'border-pink-500/40 hover:border-pink-400/80',
    glow: 'rgba(236,72,153,0.15)',
  },
  {
    id: 'trackt',
    name: 'TRACKT',
    tag: 'Tracking assets?',
    desc: 'AI RFID asset tracking for hospitals and logistics. Real-time intelligence. Natural language queries.',
    badge: 'In Development',
    badgeColor: 'text-blue-400 border-blue-500/40',
    Icon: Signal,
    iconClass: 'text-blue-400',
    url: 'Trackt',
    border: 'border-blue-500/40 hover:border-blue-400/80',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    id: 'prof51',
    name: 'PROF51',
    tag: 'Still in education?',
    desc: 'AI study co-manager for students. Timetables, essay outlines, budget tracker, lost property mesh. Built for how students actually live.',
    badge: 'Free',
    badgeColor: 'text-purple-400 border-purple-500/40',
    Icon: GraduationCap,
    iconClass: 'text-purple-400',
    url: 'Prof51',
    border: 'border-purple-500/40 hover:border-purple-400/80',
    glow: 'rgba(168,85,247,0.15)',
  },
  {
    id: 'freqs',
    name: 'FREQUENCIES',
    tag: 'Pain, sleep, recovery?',
    desc: 'Healing frequencies for pain relief, sleep, wrist recovery, chakra work. All free. Built on real research — we link every source.',
    badge: 'Free',
    badgeColor: 'text-cyan-400 border-cyan-500/40',
    Icon: COOLASFUCKWaves,
    url: 'FrequencyChamber',
    border: 'border-cyan-500/40 hover:border-cyan-400/80',
    glow: 'rgba(6,182,212,0.15)',
  },
  {
    id: 'cleanup',
    name: 'LITTER PICKS',
    tag: 'Pick up litter. Earn tokens.',
    desc: 'Photograph your cleanup, AI verifies the litter. Get rewarded with $P51 tokens. Kid-friendly mode. No account needed.',
    badge: 'Free',
    badgeColor: 'text-green-400 border-green-500/40',
    Icon: Globe,
    iconClass: 'text-green-400',
    url: 'NewCleanup',
    border: 'border-green-500/40 hover:border-green-400/80',
    glow: 'rgba(34,197,94,0.15)',
  },
];

const ProductTile = ({ product, index }) => {
  const { name, tag, desc, badge, badgeColor, Icon, iconClass, url, border, glow } = product;
  return (
    <Link to={createPageUrl(url)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 * index }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        className={`group bg-black border-2 ${border} p-4 cursor-pointer transition-all h-full flex flex-col gap-2`}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 30px ${glow}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        <div className="flex items-center justify-between">
          {iconClass
            ? <Icon className={`w-7 h-7 ${iconClass} flex-shrink-0`} />
            : <Icon size={28} animate={false} />
          }
          <span className={`text-[9px] font-mono font-bold border px-1.5 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
        </div>
        <h3 className="text-white font-black font-mono text-sm leading-tight">{name}</h3>
        <p className="text-gray-500 text-[11px] font-mono leading-tight">{tag}</p>
        <p className="text-gray-400 text-xs leading-relaxed flex-1">{desc}</p>
        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-600 group-hover:text-gray-300 transition-colors pt-1">
          <span>OPEN</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </div>
      </motion.div>
    </Link>
  );
};

export default function WelcomePage() {
  const [truthOpen, setTruthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6 max-w-3xl mx-auto">

          {/* AI51 pulse mark */}
          <Link to={createPageUrl('AI51')}>
            <motion.div className="inline-block cursor-pointer mb-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <svg width="80" height="80" viewBox="0 0 64 64" fill="none" style={{ filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.8))' }}>
                <motion.rect x="28" y="28" width="8" height="8" fill="#ec4899"
                  animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <motion.rect x="20" y="20" width="24" height="24" fill="none" stroke="#06b6d4" strokeWidth="1"
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <motion.rect x="12" y="12" width="40" height="40" fill="none" stroke="#ec4899" strokeWidth="0.8"
                  animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 2.5, repeat: Infinity }} />
                {[[25,9],[39,9],[9,25],[55,25],[25,55],[39,55]].map(([cx,cy], i) => (
                  <motion.circle key={i} cx={cx} cy={cy} r="1.5" fill="#06b6d4"
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </svg>
            </motion.div>
          </Link>

          <h1 className="text-5xl md:text-8xl font-black font-mono text-white leading-none tracking-tight"
            style={{ textShadow: '0 0 40px rgba(6,182,212,0.5)' }}>
            UF51
          </h1>

          <p className="text-gray-400 font-mono text-xs tracking-widest">UNIVERSAL FREQUENCY 51</p>

          <p className="text-xl md:text-2xl text-white font-bold leading-snug pt-2">
            We made stuff that actually helps.<br />
            <span className="text-cyan-400">Pick what you need. Ignore the rest.</span>
          </p>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
            Just a small team using AI to help citizens solve real problems — decoding scary letters, calming stressed dogs, masking tinnitus, turning environmental action into reward. Each thing below does one job and does it properly. Free where we can. Honest about when it isn't.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to={createPageUrl('AI51')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-pink-500/10 border-2 border-pink-500/60 hover:border-pink-400 text-pink-300 font-black font-mono px-5 py-2.5 text-sm transition-all">
                <Brain className="w-4 h-4" />
                TALK TO AI51
              </motion.button>
            </Link>
            <Link to={createPageUrl('FunderBrief')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-transparent border-2 border-cyan-500/40 hover:border-cyan-500/80 text-cyan-400 font-black font-mono px-5 py-2.5 text-sm transition-all">
                WHAT IS THIS?
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* PRODUCT TILES */}
         <div className="space-y-4">
           <div className="flex items-center gap-4">
             <div className="h-px bg-cyan-500/20 flex-1" />
             <p className="text-xs font-mono text-gray-500 tracking-widest">THE TOOLS</p>
             <div className="h-px bg-cyan-500/20 flex-1" />
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
             {PRODUCTS.map((product, i) => (
               <ProductTile key={product.id} product={product} index={i} />
             ))}
           </div>
         </div>

         {/* LEARN51 — FEATURED SECTION */}
         <div className="space-y-4">
           <div className="flex items-center gap-4">
             <div className="h-px bg-indigo-500/20 flex-1" />
             <p className="text-xs font-mono text-gray-500 tracking-widest">FREE EDUCATION · EVERY CHILD ON EARTH</p>
             <div className="h-px bg-indigo-500/20 flex-1" />
           </div>
           {/* Hero tile */}
           <Link to={createPageUrl('Learn51')}>
             <motion.div
               initial={{ opacity: 0, y: 12 }}
               animate={{ opacity: 1, y: 0 }}
               whileHover={{ y: -3 }}
               className="bg-black border-2 border-indigo-500/60 hover:border-indigo-400 p-6 cursor-pointer transition-all"
               onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(99,102,241,0.25)'}
               onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
             >
               <div className="flex flex-col md:flex-row md:items-center gap-4">
                 <div className="text-5xl">🌍</div>
                 <div className="flex-1">
                   <div className="flex items-center gap-3 mb-1">
                     <p className="text-indigo-400 font-black font-mono text-lg">LEARN51</p>
                     <span className="text-[9px] font-mono font-bold border border-green-500/40 text-green-400 px-1.5 py-0.5 rounded-full">Free · Forever</span>
                   </div>
                   <p className="text-white text-sm font-bold mb-1">Free education for every child on Earth — no login, no data, no cost.</p>
                   <p className="text-gray-400 text-xs leading-relaxed">Maths · Literacy · Life Skills · Mental Health · Real Rights · Works offline. On any device — phone, tablet, old laptop, TV. Built with AI, owned by no one, free to all.</p>
                 </div>
                 <div className="flex items-center gap-1 text-indigo-400 font-mono text-xs font-bold flex-shrink-0">
                   <span>OPEN HUB</span>
                   <ArrowRight className="w-3 h-3" />
                 </div>
               </div>
             </motion.div>
           </Link>
           {/* Sub-tiles */}
           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
             {[
               { url: 'LifeSkills51', border: 'border-amber-500/40 hover:border-amber-400/80', text: 'text-amber-400', label: 'LIFE SKILLS', desc: 'Money, food, mental health, rights, work.', glow: 'rgba(245,158,11,0.15)' },
               { url: 'GeorgieMaths', border: 'border-purple-500/40 hover:border-purple-400/80', text: 'text-purple-400', label: 'MATHS', desc: 'For every kind of mind. No pressure.', glow: 'rgba(168,85,247,0.15)' },
               { url: 'ReadingSupport', border: 'border-cyan-500/40 hover:border-cyan-400/80', text: 'text-cyan-400', label: 'READING', desc: 'Dyslexia-friendly. All ages.', glow: 'rgba(6,182,212,0.15)' },
               { url: 'YoungWarriors', border: 'border-pink-500/40 hover:border-pink-400/80', text: 'text-pink-400', label: 'YOUNG WARRIORS', desc: 'Kids making a real difference.', glow: 'rgba(236,72,153,0.15)' },
             ].map(({ url, border, text, label, desc, glow }, i) => (
               <Link key={url} to={createPageUrl(url)}>
                 <motion.div
                   initial={{ opacity: 0, y: 12 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.05 * i }}
                   whileHover={{ y: -3 }}
                   className={`bg-black border-2 ${border} p-4 cursor-pointer transition-all h-full flex flex-col gap-2`}
                   onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 30px ${glow}`}
                   onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                 >
                   <p className={`${text} font-black font-mono text-sm`}>{label}</p>
                   <p className="text-gray-400 text-xs leading-relaxed flex-1">{desc}</p>
                 </motion.div>
               </Link>
             ))}
           </div>
         </div>

        {/* HONEST BIT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="bg-black border-2 border-white/10 hover:border-cyan-500/30 transition-all p-8 max-w-2xl mx-auto">
          <button
            onClick={() => setTruthOpen(!truthOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-lg font-black font-mono text-white">THE HONEST BIT</h2>
            <motion.div animate={{ rotate: truthOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{ height: truthOpen ? 'auto' : 0, opacity: truthOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                We're not going to claim frequencies cure anything. What the research shows — 
                masking tinnitus, supporting relaxation, matching known psychoacoustic patterns — we link every source. You decide.
              </p>
              <p>
                AI51 is not a therapist. Not a doctor. Not a life coach. It's just genuinely good to talk to and it won't bullshit you or try to keep you hooked.
              </p>
              <p>
                ChatGPT, Claude, Gemini — great. We use AI too. The difference is we're not trying to make you dependent on it. 
                Most of what's here works without an account, without your data, and offline.
              </p>
              <p>
                Some things cost money. We say so upfront. Nothing is hidden behind a signup wall just to get your email.
              </p>
              <p className="text-white font-bold font-mono">
                Small team. Real problems. Zero bullshit.
              </p>
              <div className="flex gap-3 pt-2 flex-wrap">
                <Link to={createPageUrl('Whitepaper')} className="text-cyan-400 hover:text-cyan-300 font-mono text-xs underline">Technical Whitepaper</Link>
                <Link to={createPageUrl('FunderBrief')} className="text-cyan-400 hover:text-cyan-300 font-mono text-xs underline">Funder Brief</Link>
                <Link to={createPageUrl('Terms')} className="text-cyan-400 hover:text-cyan-300 font-mono text-xs underline">Terms</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center">
          <p className="font-mono text-xs text-gray-600">Built with love ♾️❤️</p>
        </div>

      </div>
    </div>
  );
}