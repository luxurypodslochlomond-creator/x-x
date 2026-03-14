import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Shield, Globe, Lock, CheckCircle, ArrowDown } from 'lucide-react';

export default function ProofOfImpactVisual() {

  const steps = [
    {
      step: "01",
      emoji: "🙌",
      title: "You Pick Up Litter",
      subtitle: "1kg = 1 $P51",
      color: "#ec4899",
      border: "border-pink-500",
      bg: "bg-pink-500/10",
      text: "text-pink-400",
      detail: "Your choice. Your effort. Proof of Love."
    },
    {
      step: "02",
      emoji: "📍",
      title: "GPS + Photo",
      subtitle: "Locked at the moment",
      color: "#06b6d4",
      border: "border-cyan-500",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      detail: "SHA-256 hash. ECDSA P-256 signature. Unfakeable."
    },
    {
      step: "03",
      emoji: "🤖",
      title: "AI Analyses It",
      subtitle: "98%+ accuracy",
      color: "#10b981",
      border: "border-green-500",
      bg: "bg-green-500/10",
      text: "text-green-400",
      detail: "Weight estimate. Liveness check. Brand detection."
    },
    {
      step: "04",
      emoji: "🌐",
      title: "Stored on IPFS",
      subtitle: "Permanent. Forever.",
      color: "#f59e0b",
      border: "border-amber-500",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      detail: "Decentralised. No company can delete it."
    },
    {
      step: "05",
      emoji: "🔐",
      title: "Anyone Can Verify",
      subtitle: "No gatekeepers",
      color: "#a855f7",
      border: "border-purple-500",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      detail: "Public key cryptography. Open to audit."
    },
    {
      step: "06",
      emoji: "💰",
      title: "You Get Paid",
      subtitle: "Instantly. Guaranteed.",
      color: "#22c55e",
      border: "border-green-400",
      bg: "bg-green-400/10",
      text: "text-green-300",
      detail: "Tradeable globally. Backed by real proof."
    }
  ];

  const vsItems = [
    { them: "Bitcoin burns energy", us: "$P51 heals Earth" },
    { them: "Carbon credits = promises", us: "$P51 = math proof" },
    { them: "Banks control your money", us: "You control your $P51" },
    { them: "CEOs decide what's real", us: "Cryptography decides" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0514] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <motion.div
          className="text-center py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-mono text-pink-400 tracking-[0.3em] uppercase mb-3">Universal Frequency 51</p>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-3">
            PROOF OF IMPACT
          </h1>
          <p className="text-white/50 text-lg">How healing the planet creates money backed by mathematics</p>
        </motion.div>

        {/* THE FLOW - Infographic style */}
        <motion.div
          className="border-2 border-white/10 rounded-2xl p-6 bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs font-mono text-white/40 tracking-widest uppercase mb-6 text-center">The Flow</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className={`${s.bg} ${s.border} border rounded-xl p-4 relative`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs font-black font-mono ${s.text} opacity-60`}>{s.step}</span>
                  <span className="text-2xl">{s.emoji}</span>
                </div>
                <h3 className={`font-black text-base leading-tight ${s.text} mb-1`}>{s.title}</h3>
                <p className="text-white font-bold text-sm mb-1">{s.subtitle}</p>
                <p className="text-white/50 text-xs leading-tight">{s.detail}</p>
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block text-white/20 text-lg">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* THE EQUATION */}
        <motion.div
          className="border-2 border-pink-500/40 rounded-2xl p-6 bg-pink-500/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs font-mono text-pink-400/60 tracking-widest uppercase mb-4 text-center">The Equation</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div>
              <p className="text-5xl md:text-6xl font-black text-white">1kg</p>
              <p className="text-white/50 text-sm font-mono">litter removed</p>
            </div>
            <div className="text-pink-500 text-4xl font-black">=</div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-pink-400">1 $P51</p>
              <p className="text-white/50 text-sm font-mono">verified token</p>
            </div>
            <div className="text-pink-500 text-4xl font-black hidden md:block">=</div>
            <div className="hidden md:block">
              <p className="text-5xl md:text-6xl font-black text-green-400">£$€</p>
              <p className="text-white/50 text-sm font-mono">real money</p>
            </div>
          </div>
          <div className="mt-4 bg-black/40 rounded-lg p-3 font-mono text-xs text-center text-white/40">
            GPS + SHA-256 + AI Vision + IPFS + ECDSA P-256 = mathematically impossible to fake
          </div>
        </motion.div>

        {/* VS Section + Why it matters - 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* VS */}
          <motion.div
            className="border-2 border-white/10 rounded-2xl p-6 bg-white/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs font-mono text-white/40 tracking-widest uppercase mb-4">Old World vs $P51</p>
            <div className="space-y-3">
              {vsItems.map((v, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-red-400/70 line-through text-xs">{v.them}</div>
                  <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-green-400 font-bold text-xs">{v.us}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* WHY IT MATTERS */}
          <motion.div
            className="border-2 border-white/10 rounded-2xl p-6 bg-white/5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs font-mono text-white/40 tracking-widest uppercase mb-4">Why This Hits Different</p>
            <div className="space-y-3">
              {[
                { emoji: "🪐", text: "Not a promise. Mathematical proof Earth was healed." },
                { emoji: "🔐", text: "Anyone with SHA-256 can verify. No company needed." },
                { emoji: "💰", text: "Corporations pay real money for verified impact." },
                { emoji: "♾️", text: "IPFS means your proof lives forever. Can't be deleted." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-xl">{item.emoji}</span>
                  <p className="text-white/70 text-sm leading-tight">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* FOOTER STATEMENT */}
        <motion.div
          className="text-center py-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-3xl md:text-4xl font-black text-white mb-2">
            This is how you prove love to the Earth.
          </p>
          <p className="text-white/40 font-mono text-sm">Not with talk. With action. And math that can't be faked.</p>
          <p className="text-pink-500 text-2xl mt-4 font-black">♾️❤️</p>
        </motion.div>

      </div>
    </div>
  );
}