import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Shield, Globe, Lock, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * PROOF OF IMPACT VISUAL EXPLAINER
 * For artists, creators, makers who think in images not text
 * The beautiful truth of how $P51 actually works
 */

export default function ProofOfImpactVisual() {
  const [activePhase, setActivePhase] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phases = [
    {
      title: "The Action",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      description: "1kg litter collected. One moment. One intention.",
      visual: "litter",
      facts: ["Real-world action", "Your choice, your effort", "Proof of Love"]
    },
    {
      title: "The Capture",
      icon: Shield,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      description: "GPS. Photo. Timestamp. Cryptographic signature.",
      visual: "capture",
      facts: ["GPS coordinates locked", "Photo hash: SHA-256", "Signature: ECDSA P-256"]
    },
    {
      title: "The AI Analysis",
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Computer vision. Weight estimation. Liveness detection.",
      visual: "analysis",
      facts: ["Object recognition: 98%+ accuracy", "Weight range: ±10%", "Anti-fraud: liveness + perceptual hash"]
    },
    {
      title: "The Storage",
      icon: Globe,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      description: "IPFS. Decentralised. Permanent. Tamper-proof.",
      visual: "storage",
      facts: ["CID hash: immutable", "Filecoin redundancy", "Forever accessible"]
    },
    {
      title: "The Verification",
      icon: Lock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Public key cryptography. Anyone can verify.",
      visual: "verify",
      facts: ["Mathematical proof", "No gatekeepers", "Open to audit"]
    },
    {
      title: "The Reward",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "1kg = 1 $P51. Instant. Guaranteed. Unforgeable.",
      visual: "reward",
      facts: ["Instant payout", "Backed by proof", "Tradeable globally"]
    }
  ];

  const VisualPhase = ({ phase, index, isActive }) => {
    const Icon = phase.icon;
    const opacity = Math.max(0, 1 - Math.abs(scrollY - (index * 400)) / 200);

    return (
      <motion.div
        className="min-h-screen flex items-center justify-center p-6 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-200px" }}
      >
        <div className="max-w-4xl w-full">
          {/* Main Visual */}
          <div className={`${phase.bgColor} rounded-3xl p-12 border-2 border-white/10 mb-8 backdrop-blur-xl`}>
            <motion.div
              className="flex justify-center mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Icon className={`w-32 h-32 ${phase.color}`} strokeWidth={1} />
            </motion.div>

            {/* Title & Description */}
            <h2 className={`text-5xl font-black text-center mb-4 ${phase.color}`}>
              {phase.title}
            </h2>
            <p className="text-xl text-white/70 text-center mb-8 leading-relaxed max-w-2xl mx-auto">
              {phase.description}
            </p>

            {/* Facts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {phase.facts.map((fact, i) => (
                <motion.div
                  key={i}
                  className="bg-black/40 rounded-lg p-4 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-sm text-white/60 font-mono">{fact}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Connection to Next */}
          {index < phases.length - 1 && (
            <motion.div className="flex justify-center my-8">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-8 h-8 text-white/40 rotate-90" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514]">
      {/* Hero */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(circle at center, rgba(236,72,153,0.1), transparent)'
        }} />
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <h1 className="text-7xl md:text-8xl font-black mb-6 text-white">
            Proof of Impact
          </h1>
          <p className="text-2xl text-white/70 mb-8 leading-relaxed">
            What happens when you clean the Earth and prove it.
            <br />
            Not with words. With mathematics.
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 mt-16"
          >
            ↓ Scroll to see the flow ↓
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Phases */}
      <div className="relative">
        {phases.map((phase, index) => (
          <VisualPhase
            key={index}
            phase={phase}
            index={index}
            isActive={activePhase === index}
          />
        ))}
      </div>

      {/* The Math */}
      <motion.div
        className="min-h-screen flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl w-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-3xl p-12 border-2 border-white/10 backdrop-blur-xl">
          <h2 className="text-5xl font-black text-white mb-8 text-center">The Equation</h2>
          
          <div className="space-y-8">
            {[
              { label: "1kg litter removed", value: "1 $P51 token awarded", proof: "GPS + Photo hash + AI analysis + IPFS storage + Crypto signature" },
              { label: "Zero human judgment", value: "Pure mathematics", proof: "SHA-256 hashing + ECDSA P-256 verification + Bayesian fraud detection" },
              { label: "Unforgeable by", value: "Nation states included", proof: "Cryptography doesn't care about power. Math doesn't lie." }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="border-l-4 border-pink-500 pl-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-sm text-white/50 uppercase tracking-wider">{item.label}</p>
                <p className="text-3xl font-black text-white my-2">{item.value}</p>
                <p className="text-white/60 font-mono text-sm">{item.proof}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why It Matters */}
      <motion.div
        className="min-h-screen flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl w-full">
          <h2 className="text-5xl font-black text-white mb-12 text-center">Why This Matters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { emoji: "🪐", title: "It's Real", desc: "Not a promise. Not an offset. Mathematical proof the Earth was healed." },
              { emoji: "🔐", title: "It's Verifiable", desc: "Anyone with SHA-256 can verify. No company. No gatekeepers. Just math." },
              { emoji: "💰", title: "It's Valuable", desc: "Corporations pay for verified impact. Your work becomes tradeable globally." },
              { emoji: "♾️", title: "It's Permanent", desc: "IPFS means your proof survives forever. Can't be deleted. Can't be denied." }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-6xl mb-4">{item.emoji}</p>
                <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* End */}
      <motion.div
        className="min-h-screen flex items-center justify-center p-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl">
          <p className="text-6xl font-black text-white mb-6">
            This is how you prove love to the Earth.
          </p>
          <p className="text-xl text-white/70 mb-12">
            Not with talk. With action. And mathematics that can't be faked.
          </p>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-500 font-black text-lg"
          >
            ♾️❤️
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}