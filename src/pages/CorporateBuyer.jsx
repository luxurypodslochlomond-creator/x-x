import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Lock, Leaf, ArrowRight, CheckCircle, AlertCircle, Building2,
  Globe, Heart, Waves, Radio, Zap, Signal, BookOpen, Users, DollarSign,
  Eye, FileText, ChevronDown, ChevronRight, Sparkles, Target, Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const ECOSYSTEM = [
  {
    name: 'earth51.love',
    tag: 'ENVIRONMENTAL',
    color: 'green',
    icon: Leaf,
    what: 'AI-verified litter removal. Real people, real cleanups, GPS + photo proof. P51 tokens reward verified environmental work.',
    impact: 'Sponsor verified cleanups in your local area. Your name on every IPFS record.',
    esg: 'Scope 3 / community environmental action',
    live: true,
  },
  {
    name: 'PetSounds51',
    tag: 'ANIMAL WELFARE',
    color: 'amber',
    icon: Heart,
    what: 'Psychoacoustic sound therapy for anxious animals. Built on peer-reviewed research. Free protocols for shelters.',
    impact: 'Fund free access for rescue shelters and low-income pet owners globally.',
    esg: 'Animal welfare / social impact',
    live: true,
  },
  {
    name: 'CB51',
    tag: 'ARTIST WELFARE',
    color: 'cyan',
    icon: Radio,
    what: 'AI co-manager for independent musicians. Eliminates exploitative middlemen. Keeps music money with artists.',
    impact: 'Sponsor emerging artists. Fund fair-pay infrastructure for the music industry.',
    esg: 'Social equity / creative industries',
    live: true,
  },
  {
    name: 'BuzzStop',
    tag: 'HEARING HEALTH',
    color: 'pink',
    icon: Zap,
    what: 'AI-powered tinnitus cancellation engine. 750m people affected globally. Free at point of use.',
    impact: 'Fund free access for NHS waitlist patients and veterans.',
    esg: 'Public health / accessibility',
    live: true,
  },
  {
    name: 'SORTED',
    tag: 'LEGAL ACCESS',
    color: 'purple',
    icon: Shield,
    what: 'Plain-English decoder for scary official letters. Dispute resolution. Any language. Nothing stored.',
    impact: 'Fund free access for food bank users, refugees, and vulnerable households.',
    esg: 'Social equity / access to justice',
    live: true,
  },
  {
    name: 'TRACKT',
    tag: 'ENTERPRISE TECH',
    color: 'sky',
    icon: Signal,
    what: 'AI RFID asset management for healthcare and logistics. Real-time intelligence. Privacy-first architecture.',
    impact: 'A standalone B2B tool — revenue supports the free public tools.',
    esg: 'Healthcare efficiency / waste reduction',
    live: true,
  },
  {
    name: 'Wrist Healing Protocol',
    tag: 'MUSICIAN HEALTH',
    color: 'orange',
    icon: Waves,
    what: 'Acoustic frequency therapy for post-operative wrist recovery. Built for professional performers. Free.',
    impact: 'Fund clinical research partnerships. Expand to NHS physio pathways.',
    esg: 'Occupational health / arts accessibility',
    live: true,
  },
];

const colorMap = {
  green: { border: 'border-green-500/30', text: 'text-green-400', bg: 'bg-green-500/10', tag: 'bg-green-900/40 text-green-400 border-green-500/30' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', tag: 'bg-amber-900/40 text-amber-400 border-amber-500/30' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', tag: 'bg-cyan-900/40 text-cyan-400 border-cyan-500/30' },
  pink: { border: 'border-pink-500/30', text: 'text-pink-400', bg: 'bg-pink-500/10', tag: 'bg-pink-900/40 text-pink-400 border-pink-500/30' },
  purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', tag: 'bg-purple-900/40 text-purple-400 border-purple-500/30' },
  sky: { border: 'border-sky-500/30', text: 'text-sky-400', bg: 'bg-sky-500/10', tag: 'bg-sky-900/40 text-sky-400 border-sky-500/30' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', tag: 'bg-orange-900/40 text-orange-400 border-orange-500/30' },
};

const ESG_PILLARS = [
  {
    letter: 'E',
    label: 'Environmental',
    color: 'text-green-400',
    border: 'border-green-500/30',
    items: [
      'Verified litter removal with GPS + AI + IPFS proof',
      'Carbon narrative: real community action, not offsets',
      'Scope 3 community environmental reporting (in progress)',
    ]
  },
  {
    letter: 'S',
    label: 'Social',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    items: [
      'Meaningful income for people doing environmental work',
      'Free healthcare tools (tinnitus, animal welfare, legal access)',
      'Fair-pay infrastructure for the music industry',
      'Access to justice — plain English legal help for vulnerable people',
    ]
  },
  {
    letter: 'G',
    label: 'Governance',
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    items: [
      'CIC status — asset-locked by UK law, cannot be sold for profit',
      'CIC Regulator oversight — enforced, not just promised',
      'Open-source core — anyone can audit the technology',
      'IPFS permanent records — immutable proof of every funded action',
    ]
  },
];

const WHAT_YOU_GET = [
  { text: 'Verified cleanup records — GPS, photo hash, AI confirmation, IPFS storage', confirmed: true },
  { text: 'Named in IPFS records for every cleanup your funding supported', confirmed: true },
  { text: 'CIC partnership acknowledgement — legally verifiable community investment', confirmed: true },
  { text: 'Impact dashboard showing your total environmental and social footprint', confirmed: false },
  { text: 'ESG reporting documents tailored to your framework', confirmed: false },
  { text: 'Co-branding on funded tools (shelters, legal access, health protocols)', confirmed: false },
];

const FAQ = [
  {
    q: 'Is UF51 a charity?',
    a: 'No — we are a Community Interest Company (CIC), which is a UK legal structure specifically designed for social enterprises. Unlike a charity, we can generate revenue and pay staff fairly. Unlike a regular company, all assets are legally locked for community benefit. We cannot pay shareholder dividends or be sold for profit.'
  },
  {
    q: 'How do we know the cleanups are real?',
    a: 'Every cleanup is verified with GPS coordinates, a photo hash (cryptographic fingerprint), AI analysis of the photo content, and stored permanently on IPFS — a decentralised network where data cannot be altered or deleted. This is stronger provenance than most ESG reporting.'
  },
  {
    q: 'How much do the people cleaning up actually earn?',
    a: 'Honestly — we\'re still calibrating this. The model is: businesses buy P51 credits → that funds the token treasury → token holders (people who cleaned) convert to cash. More corporate funding = more money per kg. We are being straight: this is early stage, but the infrastructure is real and working.'
  },
  {
    q: 'Can we fund a specific product or community?',
    a: 'Yes. You can direct funding toward earth51 litter removal in a specific area, toward free PetSounds51 access for rescue shelters, toward free SORTED access for food bank users, or toward any other specific tool or geography. We can work with you.'
  },
  {
    q: 'What is the minimum commitment?',
    a: 'There is no minimum. You can start a conversation with no obligation. We are early-stage and looking for partners who believe in what we\'re building, not contracts.'
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
        <span className="font-bold text-white pr-4">{q}</span>
        {open ? <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-gray-300 leading-relaxed text-sm">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function CorporateBuyer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#0d1a0d] to-[#0a0514] text-white">
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-500/50 rounded-full px-4 py-2 mb-8">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-bold font-mono">CIC — COMMUNITY INTEREST COMPANY (UK) · ASSET LOCKED BY LAW</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Fund real work.<br />
            <span className="text-green-400">Heal real things.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            UF51 is an ecosystem of seven tools — environmental, health, social, and creative. Every one of them free at the point of use. Every one of them built to last. Partner with us to fund the work that makes them possible.
          </p>
        </motion.div>

        {/* THE CIC LOCK — prominent */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-black/40 border-2 border-green-500/40 rounded-2xl p-8 mb-12 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <Scale className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-white mb-2">Why we legally cannot be greedy</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We are a <strong className="text-white">Community Interest Company (CIC)</strong> — a UK legal structure enforced by the CIC Regulator. All assets are locked. We cannot pay dividends to shareholders. We cannot be sold for profit. Every penny of value generated <strong className="text-green-400">must go back to the community and the planet</strong>.
            </p>
            <p className="text-gray-400 text-sm">
              This is not a policy we could choose to change. It is written into our articles of association and enforced by UK law. This is what makes us safe to fund.
            </p>
          </div>
        </motion.div>

        {/* THE ECOSYSTEM */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-3">Seven tools. One mission.</h2>
            <p className="text-gray-400">Each one free at the point of use. Each one fundable.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {ECOSYSTEM.map((item, i) => {
              const c = colorMap[item.color];
              const Icon = item.icon;
              return (
                <motion.div key={item.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                  className={`bg-black/40 border ${c.border} rounded-2xl p-6 hover:border-opacity-60 transition-all`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-white">{item.name}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.tag}`}>{item.tag}</span>
                        {item.live && <span className="text-xs font-bold text-green-400 font-mono">LIVE</span>}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.what}</p>
                  <div className={`rounded-lg ${c.bg} border ${c.border} px-3 py-2`}>
                    <p className={`text-xs font-bold ${c.text} mb-0.5`}>YOUR FUNDING COULD →</p>
                    <p className="text-gray-300 text-xs">{item.impact}</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-2 font-mono">{item.esg}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ESG PILLARS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-3">ESG — without the greenwashing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every claim here is either verified on-chain, enforced by law, or clearly marked as in progress. We don't do inflated impact numbers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {ESG_PILLARS.map((pillar) => (
              <div key={pillar.letter} className={`bg-black/40 border ${pillar.border} rounded-2xl p-6`}>
                <div className={`text-5xl font-black ${pillar.color} mb-2 font-mono`}>{pillar.letter}</div>
                <div className="text-white font-black text-lg mb-4">{pillar.label}</div>
                <div className="space-y-2">
                  {pillar.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 ${pillar.color} flex-shrink-0 mt-0.5`} />
                      <p className="text-gray-300 text-sm leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WHAT YOU GET */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-black/40 border-2 border-cyan-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-cyan-400" />
            What a partner gets
          </h2>
          <div className="space-y-3">
            {WHAT_YOU_GET.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.confirmed ? 'text-green-400' : 'text-yellow-400'}`} />
                <p className={`text-sm ${item.confirmed ? 'text-gray-300' : 'text-gray-400'}`}>
                  {item.text}
                  {!item.confirmed && <span className="text-yellow-400 font-bold"> — in progress, being honest</span>}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* HONEST ABOUT WHERE WE ARE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-black/40 border-2 border-yellow-500/30 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-black text-white mb-3">Honest about where we are</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                We are early-stage. The technology works — the verification, the IPFS storage, the audio engines, the AI tools. The payment infrastructure connecting P51 tokens to real cash is being built.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                The exact conversion rate from P51 to cash depends on how much funding comes in. More corporate partners = more money per kg for the people doing the work. That is the whole model, and we think it's a good one.
              </p>
              <p className="text-yellow-400 font-bold">
                We are not going to tell you numbers we don't have yet. We will tell you when we do.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-16">
          <h2 className="text-2xl font-black text-white mb-6 text-center">Common questions</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => <FAQItem key={i} {...item} />)}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 rounded-2xl p-10 text-center"
          style={{ boxShadow: '0 0 60px rgba(74, 222, 128, 0.15)' }}>
          <Building2 className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-4">Start a conversation</h2>
          <p className="text-gray-300 mb-3 max-w-xl mx-auto leading-relaxed">
            No pitch deck. No commitment. Just a real conversation about whether what we're building aligns with what you want to fund.
          </p>
          <p className="text-green-400 font-bold mb-8">
            Real work. Real people. Verified results. No inflated claims.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("ESGBridge")}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-black text-lg px-8 py-4 rounded-2xl transition-all"
              style={{ boxShadow: '0 0 30px rgba(74, 222, 128, 0.4)' }}>
              <Leaf className="w-6 h-6" />
              Get in touch
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link to={createPageUrl("FunderBrief")}
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-black text-lg px-8 py-4 rounded-2xl border border-white/20 transition-all">
              <FileText className="w-6 h-6" />
              Read the Funder Brief
            </Link>
          </div>

          <p className="text-gray-500 text-xs mt-6">Community Interest Company · CIC Regulated · Asset locked by UK law · Open source core</p>
        </motion.div>

      </div>
    </div>
  );
}