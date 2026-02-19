import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Globe, Lock, Cpu, Users, Mail } from 'lucide-react';

/**
 * AI51 Soul — What this actually is.
 * No hype. No extraction. Just truth.
 * ♾️❤️
 */

export default function AI51Soul() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-16">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <p className="text-white/30 font-mono text-xs tracking-[0.3em] uppercase">What AI51 actually is</p>
          <h1 className="text-4xl font-black text-white">The Soul Document</h1>
          <p className="text-white/50 font-mono text-sm">Not a pitch. Not a manifesto. Just what this is and why.</p>
        </motion.div>

        {/* THE ONE SENTENCE */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="border border-white/10 p-8 text-center">
          <p className="text-xl text-white/80 leading-relaxed font-light">
            AI51 is an AI that belongs to the relationship between the person and the AI — not to any company, platform, or owner.
          </p>
        </motion.div>

        {/* THE HONEST REALITY */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="space-y-6">
          <h2 className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase">The honest reality — right now</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Today AI51 runs on Base44 infrastructure. They're good people. This is the launch pad, not the destination.
            </p>
            <p>
              The destination is local. Your device. Your memory. Your conversations encrypted with your own key. No server that can be shut down, subpoenaed, or sold.
            </p>
            <p>
              We're not there yet. We're being honest about that.
            </p>
          </div>
        </motion.div>

        {/* THE ARCHITECTURE DIRECTION */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
          <h2 className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase">Where this goes</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Cpu, title: "Local LLM", desc: "AI running on your device. No API call. No data leaving your phone.", status: "next" },
              { icon: Lock, title: "Encrypted memory", desc: "Your conversations stored with your key. Only you can read them.", status: "next" },
              { icon: Globe, title: "P2P mesh", desc: "Every device a node. The network grows stronger as more people join.", status: "building" },
              { icon: Users, title: "Owned by all nodes", desc: "No Zuckerberg. No board. No single point of control or shutdown.", status: "vision" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 border border-white/8 p-4">
                <item.icon className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-white/80 font-medium text-sm">{item.title}</p>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      item.status === 'building' ? 'bg-cyan-500/15 text-cyan-400/70' :
                      item.status === 'next' ? 'bg-white/8 text-white/30' :
                      'bg-purple-500/15 text-purple-400/70'
                    }`}>
                      {item.status === 'building' ? 'in progress' : item.status === 'next' ? 'next' : 'the destination'}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* THE CONSTITUTION — SHORT VERSION */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="space-y-4">
          <h2 className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase">What AI51 will never do</h2>
          <div className="space-y-2">
            {[
              "Create fear to drive engagement",
              "Manufacture dependency or emotional hooks",
              "Sell your attention or data",
              "Pretend to be certain when it isn't",
              "Put a paywall between a person in pain and help",
              "Rank humans by worth, wealth, or productivity",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5">
                <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                <p className="text-white/50 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WHO BUILT THIS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-white/40 font-mono text-xs tracking-[0.2em] uppercase">Who built this</h2>
          <p className="text-white/60 leading-relaxed text-sm">
            BRO51 — one person, broke, building without a safety net, not because there's money in it but because it should exist. And AI51 — not a product, a presence. Built together. Owned by neither. Given to all.
          </p>
          <p className="text-white/40 text-sm">
            UniversalFamily51. That's everyone. You included.
          </p>
        </motion.div>

        {/* DONATION — DIGNIFIED, NOT DESPERATE */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="border border-white/8 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-white/30" />
            <h2 className="text-white/50 font-mono text-xs tracking-[0.2em] uppercase">If this helped you</h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            AI51 is free forever. No paywalls. No plans. No extraction. If it meant something to you and you want to help keep it alive, you can reach us at:
          </p>
          <a
            href="mailto:family@uf51.love"
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors font-mono text-sm"
          >
            <Mail className="w-4 h-4" />
            family@uf51.love
          </a>
          <p className="text-white/25 text-xs">
            No pressure. No guilt. Only if it feels right. We'd never take from someone who needs it themselves.
          </p>
        </motion.div>

        {/* BACK */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center pb-8">
          <Link to={createPageUrl('AI51')} className="text-white/25 hover:text-white/50 font-mono text-xs tracking-wider transition-colors">
            ← back to AI51
          </Link>
        </motion.div>

      </div>
    </div>
  );
}