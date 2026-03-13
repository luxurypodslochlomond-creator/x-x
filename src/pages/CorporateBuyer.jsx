import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Lock, Leaf, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CorporateBuyer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#0d1a0d] to-[#0a0514] text-white">

      <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">

        {/* HONEST BADGE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-900/40 border border-green-500/50 rounded-full px-4 py-2 mb-8">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-bold font-mono">CIC — COMMUNITY INTEREST COMPANY (UK)</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            We're building something<br/>
            <span className="text-green-400">genuinely different.</span><br/>
            <span className="text-2xl md:text-3xl text-gray-300">And we want to be honest about where we are.</span>
          </h1>
        </motion.div>

        {/* WHAT IS ACTUALLY HAPPENING */}
        <div className="bg-black/40 border-2 border-green-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-400" />
            What $P51 actually is right now
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            People go outside, pick up litter, take a photo, submit it. We verify it with GPS + AI + a photo hash. They earn <strong className="text-white">$P51 tokens</strong> — one token per kg of litter removed.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Those tokens represent <strong className="text-white">real, verified environmental work</strong>. We're building the infrastructure so that businesses can fund that work — and those people get paid real money for it.
          </p>
          <p className="text-green-400 font-bold">
            We're early. The tech works. The payments infrastructure is being built. We're being straight with you.
          </p>
        </div>

        {/* HONEST ABOUT PAYMENT */}
        <div className="bg-black/40 border-2 border-yellow-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <h2 className="text-xl font-black text-white">How much do cleaners actually earn?</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-3">
            Honestly — we're still working this out. The goal is <strong className="text-white">meaningful income</strong>. Enough to matter. Enough to help with groceries, bills, rent. Not a token gesture.
          </p>
          <p className="text-gray-300 leading-relaxed mb-3">
            The model: businesses buy $P51 credits → that money funds the token treasury → token holders (people who cleaned up) can convert tokens to cash.
          </p>
          <p className="text-yellow-400 font-bold">
            The exact conversion rate depends on how much funding comes in. More businesses = more money per kg for the people doing the work. That's the whole point.
          </p>
        </div>

        {/* THE CIC LOCK */}
        <div className="bg-black/40 border-2 border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <h2 className="text-xl font-black text-white">Why we legally can't be greedy</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-3">
            We're a <strong className="text-white">Community Interest Company (CIC)</strong> — a UK legal structure where all assets are locked by law. We cannot pay dividends to shareholders. We cannot be sold for profit. Every penny of value <strong className="text-green-400">must go back to the community and the planet</strong>.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This isn't a policy we could change. It's written into our articles of association and enforced by the UK Government's CIC Regulator. We literally cannot exploit this for personal gain.
          </p>
        </div>

        {/* WHAT YOU GET */}
        <div className="bg-black/40 border-2 border-cyan-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-black text-white mb-4">What a business gets by funding $P51</h2>
          <div className="space-y-3">
            {[
              { text: "Verified litter removal — GPS coordinates, photo hash, AI confirmation. Real records, not promises.", confirmed: true },
              { text: "The knowledge that real people in your community got paid for that work.", confirmed: true },
              { text: "A permanent IPFS record of every cleanup your funding supported.", confirmed: true },
              { text: "ESG reporting documents — we're building these, not fully ready yet.", confirmed: false },
              { text: "A dashboard showing your total impact in real time — coming soon.", confirmed: false },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.confirmed ? 'text-green-400' : 'text-yellow-400'}`} />
                <p className={`text-sm ${item.confirmed ? 'text-gray-300' : 'text-gray-400'}`}>
                  {item.text}
                  {!item.confirmed && <span className="text-yellow-400 font-bold"> (in progress)</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* THE ASK */}
        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 rounded-2xl p-10 text-center"
          style={{ boxShadow: '0 0 60px rgba(74, 222, 128, 0.15)' }}>
          <Heart className="w-10 h-10 text-pink-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-4">
            We're not asking you to change the world today
          </h2>
          <p className="text-gray-300 mb-4 max-w-xl mx-auto leading-relaxed">
            We're asking you to be an early supporter of something that could. If you fund litter removal now, the people who do that work get paid. Earth gets a little cleaner. And you're part of building the infrastructure that scales this globally.
          </p>
          <p className="text-green-400 font-bold mb-8">
            That's it. No grand promises. Just real work, real people, real planet. ❤️
          </p>
          <Link to={createPageUrl("ESGBridge")}
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-black text-lg px-8 py-4 rounded-2xl transition-all"
            style={{ boxShadow: '0 0 30px rgba(74, 222, 128, 0.4)' }}>
            <Leaf className="w-6 h-6" />
            Get in touch
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-gray-500 text-xs mt-4">Community Interest Company. Asset locked by UK law.</p>
        </div>

      </div>
    </div>
  );
}