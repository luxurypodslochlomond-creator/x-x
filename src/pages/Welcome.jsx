import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKSorted, COOLASFUCKPaw } from '@/components/shared/COOLASFUCKIcon';
import { Radio, Zap, Globe, GraduationCap, Signal, Brain, ChevronDown, ArrowRight, Building2, Waves } from 'lucide-react';
import BuzzTripIcon from '@/components/buzztrip/BuzzTripIcon';

const HERO_THREE = [
  {
    id: 'sorted',
    name: 'SORTED',
    emoji: '📄',
    headline: 'Got a scary letter?',
    desc: 'Paste any letter — benefits, legal, council, landlord — and get plain English back. What it means. What to do. Any language. Nothing stored.',
    badge: '£9.99/month',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/40',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    headlineColor: 'text-emerald-400',
    url: 'Family51',
    glow: 'rgba(16,185,129,0.2)',
    Icon: COOLASFUCKSorted,
  },
  {
    id: 'petsounds',
    name: 'PETSOUNDS51',
    emoji: '🐾',
    headline: 'Anxious pet?',
    desc: 'Sound therapy for dogs, cats and horses. Built on peer-reviewed psychoacoustic research. Free separation anxiety protocol — no signup ever.',
    badge: 'Free to try',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/40',
    border: 'border-amber-500/30 hover:border-amber-400',
    headlineColor: 'text-amber-400',
    url: 'PetSounds51',
    glow: 'rgba(212,160,23,0.2)',
    Icon: COOLASFUCKPaw,
  },
  {
    id: 'cleanup',
    name: 'LITTER PICKS',
    emoji: '🌍',
    headline: 'Pick up litter. Earn tokens.',
    desc: 'Photograph your cleanup. AI verifies the litter. Earn $P51 tokens. Kid-friendly. No account needed. Real environmental action, rewarded.',
    badge: 'Free',
    badgeColor: 'text-green-400 bg-green-500/10 border-green-500/40',
    border: 'border-green-500/30 hover:border-green-400',
    headlineColor: 'text-green-400',
    url: 'NewCleanup',
    glow: 'rgba(34,197,94,0.2)',
    Icon: Globe,
    iconClass: 'text-green-400',
  },
];

const OTHER_TOOLS = [
  {
    id: 'ctrl51',
    name: 'CTRL51',
    tag: 'Procurement fraud?',
    desc: 'AI fraud detection for council procurement. Catches price gouging before it costs you.',
    badge: '£5k/month',
    badgeColor: 'text-red-400 border-red-500/40 bg-red-500/10',
    Icon: Building2,
    iconClass: 'text-red-400',
    url: 'CTRL51',
    border: 'border-white/10 hover:border-red-400/50',
  },
  {
    id: 'cb51',
    name: 'CB51',
    tag: 'Managing artists?',
    desc: 'AI co-manager for touring musicians. Scheduling, contracts, band voting — avoid the noise.',
    badge: 'Free Beta',
    badgeColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
    Icon: Radio,
    iconClass: 'text-cyan-400',
    url: 'CB51',
    border: 'border-white/10 hover:border-cyan-400/50',
  },
  {
    id: 'buzzstop',
    name: 'BUZZSTOP',
    tag: 'Got tinnitus?',
    desc: 'Three-layer AI frequency engine to mask and cancel tinnitus. Works in browser. Free.',
    badge: 'Free',
    badgeColor: 'text-pink-400 border-pink-500/40 bg-pink-500/10',
    Icon: Zap,
    iconClass: 'text-pink-400',
    url: 'BuzzStop',
    border: 'border-white/10 hover:border-pink-400/50',
  },
  {
    id: 'freqs',
    name: 'FREQUENCIES',
    tag: 'Pain, sleep, recovery?',
    desc: 'Healing frequencies for pain relief, sleep, wrist recovery. All free. Every source linked.',
    badge: 'Free',
    badgeColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10',
    Icon: COOLASFUCKWaves,
    url: 'FrequencyChamber',
    border: 'border-white/10 hover:border-indigo-400/50',
  },
  {
    id: 'trackt',
    name: 'TRACKT',
    tag: 'Tracking assets?',
    desc: 'AI RFID asset tracking for hospitals and logistics. Real-time. Natural language queries.',
    badge: 'In Dev',
    badgeColor: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    Icon: Signal,
    iconClass: 'text-blue-400',
    url: 'Trackt',
    border: 'border-white/10 hover:border-blue-400/50',
  },
  {
    id: 'prof51',
    name: 'PROF51',
    tag: 'Still in education?',
    desc: 'AI study co-manager for students. Timetables, essay outlines, budget tracker.',
    badge: 'Free',
    badgeColor: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
    Icon: GraduationCap,
    iconClass: 'text-purple-400',
    url: 'Prof51',
    border: 'border-white/10 hover:border-purple-400/50',
  },
  {
    id: 'buzztrip',
    name: 'BUZZTRIP',
    tag: 'Anxiety, sleep, withdrawal?',
    desc: 'Vagal nerve reset through sound. Anxiety, withdrawal, panic, poor sleep. Clinically-inspired. Free. No signup.',
    badge: 'Free',
    badgeColor: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
    Icon: BuzzTripIcon,
    url: 'BuzzTrip',
    border: 'border-white/10 hover:border-violet-400/50',
  },
];

const HeroTile = ({ product, index }) => {
  const { name, emoji, headline, desc, badge, badgeColor, border, headlineColor, url, glow, Icon, iconClass } = product;
  return (
    <Link to={createPageUrl(url)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 * index }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`group bg-[#0f1419] border-2 ${border} p-6 cursor-pointer transition-all h-full flex flex-col gap-3 rounded-xl`}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 40px ${glow}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl">{emoji}</span>
          <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
        </div>
        <div>
          <p className={`font-black font-mono text-xs tracking-widest mb-1 ${headlineColor}`}>{name}</p>
          <h3 className="text-white font-bold text-lg leading-tight">{headline}</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{desc}</p>
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
        className={`group bg-[#0f1419] border ${border} p-4 cursor-pointer transition-all h-full flex flex-col gap-2 rounded-lg`}
      >
        <div className="flex items-center justify-between">
          {iconClass
            ? <Icon className={`w-5 h-5 ${iconClass}`} />
            : <Icon size={20} animate={false} />
          }
          <span className={`text-[9px] font-mono font-bold border px-1.5 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
        </div>
        <p className="text-white font-black font-mono text-xs">{name}</p>
        <p className="text-gray-500 text-[11px] font-mono">{tag}</p>
        <p className="text-gray-400 text-xs leading-relaxed flex-1">{desc}</p>
      </motion.div>
    </Link>
  );
};

export default function WelcomePage() {
  const [truthOpen, setTruthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-5 max-w-3xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-gray-400 tracking-widest">UNIVERSAL FREQUENCY 51</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight">
            <span className="text-white">UF</span><span className="text-cyan-400">51</span>
          </h1>

          <p className="text-xl md:text-2xl font-bold leading-snug text-gray-200">
            Real tools. Real people. Real problems.<br />
            <span className="text-cyan-400">No bullshit. No data harvesting. No agenda.</span>
          </p>

          <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto">
            We're a tiny team building tools we actually needed ourselves — for scary letters, anxious pets, tinnitus, anxiety, kids learning, and cleaning up the planet. Most of it's free. All of it's honest.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to={createPageUrl('AI51')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-cyan-500/20 transition-all">
                <Brain className="w-4 h-4" />
                Talk to AI51
              </motion.button>
            </Link>
            <Link to={createPageUrl('FunderBrief')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/5 border border-white/20 hover:border-white/40 text-white font-bold px-6 py-3 rounded-full text-sm transition-all">
                What is this?
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* HERO THREE */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/10 flex-1" />
            <p className="text-xs font-mono text-gray-500 tracking-widest">START HERE</p>
            <div className="h-px bg-white/10 flex-1" />
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
            <div className="h-px bg-white/10 flex-1" />
            <p className="text-xs font-mono text-gray-500 tracking-widest">FREE EDUCATION · EVERY CHILD ON EARTH</p>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <Link to={createPageUrl('Learn51')}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              className="bg-[#0f1419] border-2 border-indigo-500/30 hover:border-indigo-400 p-6 cursor-pointer transition-all rounded-xl"
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(99,102,241,0.2)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-5xl">🌍</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-indigo-400 font-black font-mono text-lg">LEARN51</p>
                    <span className="text-[9px] font-mono font-bold border border-green-500/40 text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full">Free · Forever</span>
                  </div>
                  <p className="text-white text-sm font-bold mb-1">Free education for every child on Earth — no login, no data, no cost.</p>
                  <p className="text-gray-400 text-xs leading-relaxed">Maths · Literacy · Life Skills · Mental Health · Real Rights · Works offline. Any device. Built with AI, owned by no one.</p>
                </div>
                <div className="flex items-center gap-1 text-indigo-400 font-mono text-xs font-bold flex-shrink-0">
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
            <div className="h-px bg-white/10 flex-1" />
            <p className="text-xs font-mono text-gray-500 tracking-widest">MORE TOOLS</p>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {OTHER_TOOLS.map((tool, i) => (
              <SmallTile key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* HONEST BIT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="bg-[#0f1419] border border-white/10 rounded-xl p-8 max-w-2xl mx-auto">
          <button
            onClick={() => setTruthOpen(!truthOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-base font-black font-mono text-white">THE HONEST BIT</h2>
            <motion.div animate={{ rotate: truthOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{ height: truthOpen ? 'auto' : 0, opacity: truthOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>We're two people on a hill in Scotland building tools we actually needed. Started with healing frequencies, ended up accidentally building a platform. That's the honest version.</p>
              <p>We use AI — but not to hook you, harvest your data, or keep you dependent. Most of what's here works without an account, without your data, and offline.</p>
              <p>We won't claim frequencies cure anything. What the research shows — masking tinnitus, supporting relaxation, matching known psychoacoustic patterns — we link every source. You decide.</p>
              <p>AI51 is not a therapist or doctor. It's just genuinely good to talk to and won't bullshit you or try to keep you hooked.</p>
              <p>Some things cost money. We say so upfront. Nothing hidden behind a signup wall just to harvest your email.</p>
              <p className="text-white font-bold font-mono">Small team. Real problems. Zero bullshit. ♾️</p>
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