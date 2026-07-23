import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Scale, Users, Globe, Heart, FileText, Check } from 'lucide-react';

const PILLARS = [
  {
    icon: Lock,
    color: '#22c55e',
    title: 'Local-First Architecture',
    status: 'BUILT & LIVE',
    body: "User data lives on the user's device — not our servers. Cases, letters, and personal details never leave the phone. An extractor who copies this code inherits nothing to sell: no user database, no accounts to hold hostage, no captive audience. The architecture makes betrayal structurally worthless.",
  },
  {
    icon: Scale,
    color: '#06b6d4',
    title: 'AGPL-3.0 Licensing',
    status: 'COMMITTED',
    body: 'When our code is published, it ships under the GNU AGPL-3.0 — fully open source, with one condition: anyone who runs a modified version as a service must publish their changes too. Good actors are unaffected. The classic extraction play — take free code, close it, add tracking, sell it — becomes legally impossible.',
  },
  {
    icon: FileText,
    color: '#f59e0b',
    title: 'Protected Names',
    status: 'PLANNED',
    body: "SORTED, UF51, PetSounds51, CB51 — the code can be forked, but the names and the trust they carry cannot. Trademark protection means a copycat can't inherit our reputation, our track record, or the confidence of the people we serve. They start from zero, in the open, under their own name.",
  },
  {
    icon: Users,
    color: '#ec4899',
    title: 'The Unfindable Moat: Evidence',
    status: 'GROWING DAILY',
    body: 'Our live counters of people helped, our organisational partnerships, our anonymised outcome data — that history exists only here. A fork starts with zero trust and zero track record. In tools built for people in crisis, trust is the product. It cannot be copied, only earned.',
  },
];

const PRINCIPLES = [
  'The good use is the default path — extraction is not in the codebase to exploit.',
  'AI does the understanding; the human always keeps the deciding.',
  'Free for individuals, funded by organisations whose interests align with users.',
  'Every privacy claim is verifiable in the architecture, not just the marketing.',
  'Anyone may copy this to help people. No one may quietly close it to harvest them.',
];

export default function ExtractionProofCovenant() {
  return (
    <div className="min-h-screen text-white px-5 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 border border-green-500/40 bg-green-500/10 rounded-full px-4 py-1.5 mb-6">
            <Globe className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[11px] font-black tracking-widest text-green-400 font-mono">PUBLIC COVENANT</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            Open Source.<br />
            <span className="text-green-400">Extraction-Proof.</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Anyone can copy our code — we invite it. What no one can copy is a reason
            to betray the people using it. This is how we made helping the easy path
            and extraction the pointless one.
          </p>
        </motion.div>

        {/* PILLARS */}
        <div className="space-y-4 mb-14">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${p.color}15`, border: `1px solid ${p.color}40` }}>
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-black leading-tight">{p.title}</h2>
                  </div>
                  <span className="text-[9px] font-black tracking-widest font-mono px-2.5 py-1 rounded-md flex-shrink-0"
                    style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}30` }}>
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* PRINCIPLES */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border border-cyan-500/20 rounded-2xl p-6 md:p-8 bg-cyan-500/[0.03] mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-black">The Five Commitments</h2>
          </div>
          <ul className="space-y-3.5">
            {PRINCIPLES.map((principle, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-300 leading-relaxed">{principle}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CLOSING */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center border-t border-white/10 pt-10"
        >
          <Heart className="w-6 h-6 text-pink-400 mx-auto mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto mb-2">
            You cannot stop bad actors from using AI. You can make good AI win on merit —
            by building tools where the honest version is the easiest one to build, use, and fund.
          </p>
          <p className="text-gray-600 text-xs font-mono tracking-wider">UF51 · BUILT FOR HUMANS, NOT HARVESTS</p>
        </motion.div>
      </div>
    </div>
  );
}