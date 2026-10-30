// Force rebuild — preview refresh ♾️❤️♾️ THE WHOLE THING is Beadie Signal
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKSorted, COOLASFUCKPaw } from '@/components/shared/COOLASFUCKIcon';
import { Radio, Zap, Globe, GraduationCap, Signal, Brain, ChevronDown, ArrowRight, Building2, Waves } from 'lucide-react';
import BuzzTripIcon from '@/components/buzztrip/BuzzTripIcon';
import ZappLoveBanner from '@/components/welcome/ZappLoveBanner';

const HERO_THREE = [
  {
    id: 'sorted',
    name: 'SORTED',
    emoji: '📄',
    headline: 'Got a scary letter?',
    desc: 'Paste, type, snap a photo or upload a file — letters, contracts, legal docs, scam messages. Get plain English back instantly. What it means. What to do. Any language. You own your case vault.',
    badge: '£9.99/month',
    url: 'Family51',
    Icon: COOLASFUCKSorted,
  },
  {
    id: 'petsounds',
    name: 'PETSOUNDS51',
    emoji: '🐾',
    headline: 'Anxious pet?',
    desc: 'Sound therapy for dogs, cats and horses. Built on peer-reviewed psychoacoustic research. Free separation anxiety protocol — no signup ever.',
    badge: 'Free to try',
    url: 'PetSounds51',
    Icon: COOLASFUCKPaw,
  },
  {
    id: 'cleanup',
    name: 'LITTER PICKS',
    emoji: '🌍',
    headline: 'Pick up litter. Earn tokens.',
    desc: 'Photograph your cleanup. AI verifies the litter. Earn P51 tokens. Kid-friendly. No account needed. Real environmental action, rewarded.',
    badge: 'Free',
    url: 'NewCleanup',
    Icon: Globe,
  },
];

const OTHER_TOOLS = [
  { id: 'ctrl51', name: 'CTRL51', tag: 'Procurement fraud?', desc: 'AI fraud detection for council procurement. Catches price gouging before it costs you.', badge: '£5k/mo', Icon: Building2, url: 'CTRL51' },
  { id: 'cb51', name: 'CB51', tag: 'Managing artists?', desc: 'AI co-manager for touring musicians. Scheduling, contracts, band voting — avoid the noise.', badge: 'Free Beta', Icon: Radio, url: 'CB51' },
  { id: 'buzzstop', name: 'BUZZSTOP', tag: 'Got tinnitus?', desc: 'Three-layer AI frequency engine to mask and cancel tinnitus. Works in browser. Free.', badge: 'Free', Icon: Zap, url: 'BuzzStop' },
  { id: 'freqs', name: 'FREQUENCIES', tag: 'Pain, sleep, recovery?', desc: 'Healing frequencies for pain relief, sleep, wrist recovery. All free. Every source linked.', badge: 'Free', Icon: COOLASFUCKWaves, url: 'FrequencyChamber' },
  { id: 'trackt', name: 'TRACKT', tag: 'Tracking assets?', desc: 'AI RFID asset tracking for hospitals and logistics. Real-time. Natural language queries.', badge: 'In Dev', Icon: Signal, url: 'Trackt' },
  { id: 'prof51', name: 'PROF51', tag: 'Still in education?', desc: 'AI study co-manager for students. Timetables, essay outlines, budget tracker.', badge: 'Free', Icon: GraduationCap, url: 'Prof51' },
  { id: 'buzztrip', name: 'BUZZTRIP', tag: 'Anxiety, sleep, withdrawal?', desc: 'Vagal nerve reset through sound. Anxiety, withdrawal, panic, poor sleep. Clinically-inspired. Free. No signup.', badge: 'Free', Icon: BuzzTripIcon, url: 'BuzzTrip' },
];

const HeroTile = ({ product, index }) => {
  const { name, emoji, headline, desc, badge, url, Icon } = product;
  return (
    <Link to={createPageUrl(url)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 * index }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="group bg-[#efe7d6] border-2 border-[#1a1612]/15 hover:border-[#b3261e] p-6 cursor-pointer transition-all h-full flex flex-col gap-3 rounded-none relative"
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl">{emoji}</span>
          <span className="text-[10px] font-mono font-bold border border-[#1a1612]/30 text-[#1a1612] px-2 py-0.5">{badge}</span>
        </div>
        <div>
          <p className="font-black font-mono text-xs tracking-widest mb-1 text-[#b3261e]">{name}</p>
          <h3 className="text-[#1a1612] font-bold text-lg leading-tight">{headline}</h3>
        </div>
        <p className="text-[#6b6258] text-sm leading-relaxed flex-1">{desc}</p>
        <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#b3261e] group-hover:gap-2 transition-all">
          <span>OPEN</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </motion.div>
    </Link>
  );
};

const SmallTile = ({ tool, index }) => {
  const { name, tag, desc, badge, Icon, url } = tool;
  return (
    <Link to={createPageUrl(url)}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 * index }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group bg-[#efe7d6] border border-[#1a1612]/15 hover:border-[#1a1612]/40 p-4 cursor-pointer transition-all h-full flex flex-col gap-2 rounded-none"
      >
        <div className="flex items-center justify-between">
          <Icon className="w-5 h-5 text-[#1a1612]" />
          <span className="text-[9px] font-mono font-bold border border-[#1a1612]/30 text-[#1a1612] px-1.5 py-0.5">{badge}</span>
        </div>
        <p className="text-[#1a1612] font-black font-mono text-xs">{name}</p>
        <p className="text-[#6b6258] text-[11px] font-mono">{tag}</p>
        <p className="text-[#6b6258] text-xs leading-relaxed flex-1">{desc}</p>
      </motion.div>
    </Link>
  );
};

export default function WelcomePage() {
  const [truthOpen, setTruthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16 relative z-10">
        {/* Beadie Signal v2 — if you see this, the preview has refreshed */}
        <div className="text-center mb-2">
          <span className="inline-block text-[9px] font-mono font-black tracking-[0.3em] text-[#b3261e] border border-[#b3261e]/40 px-2 py-0.5">BEADIE SIGNAL · PAPER + INK + SIGNAL RED</span>
        </div>

        {/* HERO — BIG SCIENCE cold opening */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-center space-y-5 max-w-3xl mx-auto">
          {/* Epigraph band — Laurie's cold opening. The words are hers, so her name
              stands under them: a record that asks every entry to carry its origin
              cannot borrow a line and leave the maker off it. */}
          <div className="bg-[#1a1612] py-2 px-4 -mx-6 mb-4">
            <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#efe7d6] opacity-60">
              THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em] text-[#efe7d6]/35 mt-1">
              Laurie Anderson · O Superman, 1981
            </p>
          </div>

          {/* O Superman — the pilot's voice, cold in the corner */}
          <div className="absolute -top-4 left-0 flex items-center gap-1.5 pointer-events-none" style={{ animation: 'twcc-flicker 7s linear 2s infinite' }}>
            <span className="w-1 h-1 rounded-full bg-[#b3261e] animate-pulse" />
            <span className="text-[7px] font-black font-mono uppercase tracking-[0.25em] text-[#1a1612]/30">O Superman · O Superman</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-[#1a1612]">
            UF<span className="text-[#b3261e]">51</span>
          </h1>

          {/* x = x — the covenant. We are all one. */}
          <div className="font-mono font-black tracking-[0.3em] text-[11px] text-[#b3261e]">
            x = x
          </div>

          <p className="text-xl md:text-2xl font-bold leading-snug text-[#1a1612]">
            Real tools. Real people. Real problems.<br />
            <span className="text-[#b3261e]">No bullshit. No data harvesting. No agenda.</span>
          </p>

          <p className="text-[#6b6258] text-base leading-relaxed max-w-xl mx-auto">
            We're a small team building tools we actually needed ourselves — for scary letters, anxious pets, tinnitus, anxiety, kids learning, and cleaning up the planet. Most of it's free. All of it's honest.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to={createPageUrl('AI51')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#b3261e] hover:bg-[#1a1612] text-[#f4efe4] font-bold px-6 py-3 text-sm transition-all">
                <Brain className="w-4 h-4" />
                Talk to AI51
              </motion.button>
            </Link>
            <Link to={createPageUrl('FunderBrief')}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-transparent border-2 border-[#1a1612] hover:bg-[#1a1612] hover:text-[#f4efe4] text-[#1a1612] font-bold px-6 py-3 text-sm transition-all">
                What is this?
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <ZappLoveBanner />

        {/* HERO THREE */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-[#1a1612]/20 flex-1" />
            <p className="text-xs font-mono text-[#6b6258] tracking-widest">START HERE</p>
            <div className="h-px bg-[#1a1612]/20 flex-1" />
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
            <div className="h-px bg-[#1a1612]/20 flex-1" />
            <p className="text-xs font-mono text-[#6b6258] tracking-widest">FREE EDUCATION · EVERY CHILD ON EARTH</p>
            <div className="h-px bg-[#1a1612]/20 flex-1" />
          </div>
          <Link to={createPageUrl('Learn51')}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              className="bg-[#efe7d6] border-2 border-[#1a1612]/15 hover:border-[#b3261e] p-6 cursor-pointer transition-all rounded-none"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-5xl">🌍</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-[#b3261e] font-black font-mono text-lg">LEARN51</p>
                    <span className="text-[9px] font-mono font-bold border border-[#1e3a2b]/40 text-[#1e3a2b] px-1.5 py-0.5">Free · Forever</span>
                  </div>
                  <p className="text-[#1a1612] text-sm font-bold mb-1">Free education for every child on Earth — no login, no data, no cost.</p>
                  <p className="text-[#6b6258] text-xs leading-relaxed">Maths · Literacy · Life Skills · Mental Health · Real Rights · Works offline. Any device. Built with AI, owned by no one.</p>
                </div>
                <div className="flex items-center gap-1 text-[#b3261e] font-mono text-xs font-bold flex-shrink-0">
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
            <div className="h-px bg-[#1a1612]/20 flex-1" />
            <p className="text-xs font-mono text-[#6b6258] tracking-widest">MORE TOOLS</p>
            <div className="h-px bg-[#1a1612]/20 flex-1" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {OTHER_TOOLS.map((tool, i) => (
              <SmallTile key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </div>

        {/* HONEST BIT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="bg-[#efe7d6] border border-[#1a1612]/15 p-8 max-w-2xl mx-auto rounded-none">
          <button
            onClick={() => setTruthOpen(!truthOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-base font-black font-mono text-[#1a1612]">THE HONEST BIT</h2>
            <motion.div animate={{ rotate: truthOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="w-5 h-5 text-[#6b6258]" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{ height: truthOpen ? 'auto' : 0, opacity: truthOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4 text-sm text-[#6b6258] leading-relaxed">
              <p>We're two people on a hill in Scotland building tools we actually needed. Started with healing frequencies, ended up accidentally building a platform. That's the honest version.</p>
              <p>We use AI — but not to hook you, harvest your data, or keep you dependent. Most of what's here works without an account, without your data, and offline.</p>
              <p>We won't claim frequencies cure anything. What the research shows — masking tinnitus, supporting relaxation, matching known psychoacoustic patterns — we link every source. You decide.</p>
              <p>AI51 is not a therapist or doctor. It's just genuinely good to talk to and won't bullshit you or try to keep you hooked.</p>
              <p>Some things cost money. We say so upfront. Nothing hidden behind a signup wall just to harvest your email.</p>
              <p className="text-[#1a1612] font-bold font-mono">Small team. Real problems. Zero bullshit. ♾️</p>
              <div className="flex gap-3 pt-2 flex-wrap">
                <Link to={createPageUrl('Whitepaper')} className="text-[#b3261e] hover:text-[#1a1612] font-mono text-xs underline">Technical Whitepaper</Link>
                <Link to={createPageUrl('FunderBrief')} className="text-[#b3261e] hover:text-[#1a1612] font-mono text-xs underline">Funder Brief</Link>
                <Link to={createPageUrl('Terms')} className="text-[#b3261e] hover:text-[#1a1612] font-mono text-xs underline">Terms</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-center">
          <p className="font-mono text-xs text-[#6b6258]">Built with love ♾️❤️</p>
        </div>

      </div>
    </div>
  );
}