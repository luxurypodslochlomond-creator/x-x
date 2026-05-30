import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKSorted, COOLASFUCKPaw } from '@/components/shared/COOLASFUCKIcon';
import { Radio, Zap, Globe, GraduationCap, Signal, Brain, ChevronDown, ArrowRight, Building2, Leaf, Shield } from 'lucide-react';

// HERO THREE — what PhD Media + Chris Walsh responded to
const HERO_THREE = [
  {
    id: 'sorted',
    name: 'SORTED',
    emoji: '📄',
    headline: 'Got a scary letter?',
    desc: 'Paste any letter — benefits, legal, council, landlord — and get plain English back. What it means. What to do. Any language. Nothing stored.',
    badge: '£9.99/month',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    border: 'border-emerald-300 hover:border-emerald-500',
    bg: 'bg-white',
    headlineColor: 'text-emerald-700',
    url: 'Family51',
    glow: 'rgba(16,185,129,0.12)',
    Icon: COOLASFUCKSorted,
  },
  {
    id: 'petsounds',
    name: 'PETSOUNDS51',
    emoji: '🐾',
    headline: 'Anxious pet?',
    desc: 'Sound therapy for dogs, cats and horses. Built on peer-reviewed psychoacoustic research. Free separation anxiety protocol — no signup ever.',
    badge: 'Free to try',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    border: 'border-amber-300 hover:border-amber-500',
    bg: 'bg-white',
    headlineColor: 'text-amber-700',
    url: 'PetSounds51',
    glow: 'rgba(212,160,23,0.12)',
    Icon: COOLASFUCKPaw,
  },
  {
    id: 'cleanup',
    name: 'LITTER PICKS',
    emoji: '🌍',
    headline: 'Pick up litter. Earn tokens.',
    desc: 'Photograph your cleanup. AI verifies the litter. Earn $P51 tokens. Kid-friendly. No account needed. Real environmental action, rewarded.',
    badge: 'Free',
    badgeColor: 'text-green-700 bg-green-50 border-green-200',
    border: 'border-green-300 hover:border-green-500',
    bg: 'bg-white',
    headlineColor: 'text-green-700',
    url: 'NewCleanup',
    glow: 'rgba(34,197,94,0.12)',
    Icon: Globe,
    iconClass: 'text-green-600',
  },
];

// REST OF THE TOOLS
const OTHER_TOOLS = [
  {
    id: 'ctrl51',
    name: 'CTRL51',
    tag: 'Procurement fraud?',
    desc: 'AI fraud detection for council procurement. Catches price gouging before it costs you.',
    badge: '£5k/month',
    badgeColor: 'text-red-600 border-red-300 bg-red-50',
    Icon: Building2,
    iconClass: 'text-red-500',
    url: 'CTRL51',
    border: 'border-red-200 hover:border-red-400',
  },
  {
    id: 'cb51',
    name: 'CB51',
    tag: 'Managing artists?',
    desc: 'AI co-manager for touring musicians. Scheduling, contracts, band voting — avoid the noise.',
    badge: 'Free Beta',
    badgeColor: 'text-cyan-700 border-cyan-300 bg-cyan-50',
    Icon: Radio,
    iconClass: 'text-cyan-600',
    url: 'CB51',
    border: 'border-cyan-200 hover:border-cyan-400',
  },
  {
    id: 'buzzstop',
    name: 'BUZZSTOP',
    tag: 'Got tinnitus?',
    desc: 'Three-layer AI frequency engine to mask and cancel tinnitus. Works in browser. Free.',
    badge: 'Free',
    badgeColor: 'text-pink-700 border-pink-300 bg-pink-50',
    Icon: Zap,
    iconClass: 'text-pink-500',
    url: 'BuzzStop',
    border: 'border-pink-200 hover:border-pink-400',
  },
  {
    id: 'freqs',
    name: 'FREQUENCIES',
    tag: 'Pain, sleep, recovery?',
    desc: 'Healing frequencies for pain relief, sleep, wrist recovery. All free. Every source linked.',
    badge: 'Free',
    badgeColor: 'text-indigo-700 border-indigo-300 bg-indigo-50',
    Icon: COOLASFUCKWaves,
    url: 'FrequencyChamber',
    border: 'border-indigo-200 hover:border-indigo-400',
  },
  {
    id: 'trackt',
    name: 'TRACKT',
    tag: 'Tracking assets?',
    desc: 'AI RFID asset tracking for hospitals and logistics. Real-time. Natural language queries.',
    badge: 'In Development',
    badgeColor: 'text-blue-700 border-blue-300 bg-blue-50',
    Icon: Signal,
    iconClass: 'text-blue-500',
    url: 'Trackt',
    border: 'border-blue-200 hover:border-blue-400',
  },
  {
    id: 'prof51',
    name: 'PROF51',
    tag: 'Still in education?',
    desc: 'AI study co-manager for students. Timetables, essay outlines, budget tracker.',
    badge: 'Free',
    badgeColor: 'text-purple-700 border-purple-300 bg-purple-50',
    Icon: GraduationCap,
    iconClass: 'text-purple-500',
    url: 'Prof51',
    border: 'border-purple-200 hover:border-purple-400',
  },
];

const HeroTile = ({ product, index }) => {
  const { name, emoji, headline, desc, badge, badgeColor, border, bg, headlineColor, url, glow, Icon, iconClass } = product;
  return (
    <Link to={createPageUrl(url)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 * index }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`group ${bg} border-2 ${border} p-6 cursor-pointer transition-all h-full flex flex-col gap-3 rounded-xl shadow-sm`}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 40px ${glow}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl">{emoji}</span>
          <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
        </div>
        <div>
          <p className={`font-black font-mono text-xs tracking-widest mb-1 ${headlineColor}`}>{name}</p>
          <h3 className="text-gray-900 font-bold text-lg leading-tight">{headline}</h3>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
        <div className={`flex items-center gap-1 text-xs font-mono font-bold ${headlineColor} group-hover:gap-2 transition-all`}>
          <span>OPEN</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </motion.div>
    </Link>
  );
};

const SmallTile = ({ tool, index }) => {
  const { name, tag, desc, badge, badgeColor, Icon, iconClass, url, border } = tool;
  return (
    <Link to={createPageUrl(url)}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 * index }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={`group bg-white border ${border} p-4 cursor-pointer transition-all h-full flex flex-col gap-2 rounded-lg shadow-sm`}
      >
        <div className="flex items-center justify-between">
          {iconClass
            ? <Icon className={`w-5 h-5 ${iconClass}`} />
            : <Icon size={20} animate={false} />
          }
          <span className={`text-[9px] font-mono font-bold border px-1.5 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
        </div>
        <p className="text-gray-800 font-black font-mono text-xs">{name}</p>
        <p className="text-gray-400 text-[11px] font-mono">{tag}</p>
        <p className="text-gray-500 text-xs leading-relaxed flex-1">{desc}</p>
      </motion.div>
    </Link>
  );
};

export default function WelcomePage() {
  const [truthOpen, setTruthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-5 max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-500 tracking-widest">UNIVERSAL FREQUENCY 51</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tight">
            UF51
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-bold leading-snug">
            Tools that actually help people.<br />
            <span className="text-emerald-600">No dark patterns. Your data stays yours.</span>
          </p>

          <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
            A small independent team using AI for the right reasons — decoding scary letters, calming anxious pets, rewarding people who clean up the planet. Built with honesty. Free where we can. Transparent about when it isn't.
          </p>

          {/* Honest tech line */}
          <div className="flex flex-wrap gap-2 justify-center pt-1">
            {['AI-powered', 'Data sovereign', 'Open source', 'No dark patterns', 'Works offline'].map(tag => (
              <span key={tag} className="text-xs font-mono bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full shadow-sm">{tag}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to={createPageUrl('AI51')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all">
                <Brain className="w-4 h-4" />
                Talk to AI51
              </motion.button>
            </Link>
            <Link to={createPageUrl('FunderBrief')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-400 text-gray-700 font-bold px-6 py-3 rounded-full text-sm shadow-sm transition-all">
                What is this?
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* HERO THREE */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1" />
            <p className="text-xs font-mono text-gray-400 tracking-widest">START HERE</p>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HERO_THREE.map((product, i) => (
              <HeroTile key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* LEARN51 */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1" />
            <p className="text-xs font-mono text-gray-400 tracking-widest">FREE EDUCATION · EVERY CHILD ON EARTH</p>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <Link to={createPageUrl('Learn51')}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              className="bg-white border-2 border-indigo-200 hover:border-indigo-400 p-6 cursor-pointer transition-all rounded-xl shadow-sm"
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(99,102,241,0.15)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-5xl">🌍</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-indigo-600 font-black font-mono text-lg">LEARN51</p>
                    <span className="text-[9px] font-mono font-bold border border-green-300 text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">Free · Forever</span>
                  </div>
                  <p className="text-gray-800 text-sm font-bold mb-1">Free education for every child on Earth — no login, no data, no cost.</p>
                  <p className="text-gray-500 text-xs leading-relaxed">Maths · Literacy · Life Skills · Mental Health · Real Rights · Works offline. Any device. Built with AI, owned by no one.</p>
                </div>
                <div className="flex items-center gap-1 text-indigo-600 font-mono text-xs font-bold flex-shrink-0">
                  <span>OPEN HUB</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* MORE TOOLS */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1" />
            <p className="text-xs font-mono text-gray-400 tracking-widest">MORE TOOLS</p>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {OTHER_TOOLS.map((tool, i) => (
              <SmallTile key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* HONEST BIT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
          <button
            onClick={() => setTruthOpen(!truthOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-base font-black font-mono text-gray-800">THE HONEST BIT</h2>
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
            <div className="pt-6 space-y-4 text-sm text-gray-500 leading-relaxed">
              <p>
                We use AI — but not to hook you, harvest your data, or keep you dependent. Most of what's here works without an account, without your data, and offline.
              </p>
              <p>
                We're not going to claim frequencies cure anything. What the research shows — masking tinnitus, supporting relaxation, matching known psychoacoustic patterns — we link every source. You decide.
              </p>
              <p>
                AI51 is not a therapist, doctor, or life coach. It's just genuinely good to talk to and won't bullshit you or try to keep you hooked.
              </p>
              <p>
                Some things cost money. We say so upfront. Nothing hidden behind a signup wall just to get your email.
              </p>
              <p className="text-gray-800 font-bold font-mono">
                Small team. Real problems. Zero bullshit.
              </p>
              <div className="flex gap-3 pt-2 flex-wrap">
                <Link to={createPageUrl('Whitepaper')} className="text-emerald-600 hover:text-emerald-700 font-mono text-xs underline">Technical Whitepaper</Link>
                <Link to={createPageUrl('FunderBrief')} className="text-emerald-600 hover:text-emerald-700 font-mono text-xs underline">Funder Brief</Link>
                <Link to={createPageUrl('Terms')} className="text-emerald-600 hover:text-emerald-700 font-mono text-xs underline">Terms</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center">
          <p className="font-mono text-xs text-gray-400">Built with love ♾️❤️</p>
        </div>

      </div>
    </div>
  );
}