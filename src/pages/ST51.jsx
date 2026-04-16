import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Zap, Heart, BookOpen, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const facts = [
  {
    icon: '🔊',
    title: 'Sound can move things',
    body: "You've seen speakers make bass wobble your chest. Scale that up with the right frequency in the right space, and you can lift objects without touching them. Real physics. No magic.",
  },
  {
    icon: '📐',
    title: 'The box matters',
    body: "The size of your chamber determines which frequency works. Like how a wine glass rings at one specific note — every space has a sweet spot. Find it and the sound amplifies itself.",
  },
  {
    icon: '🎯',
    title: 'One rule: match the frequency',
    body: "When your sound wave matches the chamber's natural frequency, you get 'resonance'. Energy builds up automatically. That's the moment objects levitate. It works every time.",
  },
  {
    icon: '📱',
    title: 'Your phone already does this',
    body: "Seriously. Put a tiny piece of polystyrene on a speaker, play a tone generator at 40kHz, and watch it move. Acoustic levitation in your pocket. No lab coat required.",
  },
];

const whyItMatters = [
  "Sound therapy for healing (what PetSounds51 and BuzzStop are built on)",
  "Drug delivery in medicine — levitate a particle to place it precisely",
  "Zero-gravity manufacturing without expensive space missions",
  "Understanding resonance = understanding how everything in nature works",
];

export default function ST51Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <Waves className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ST51</h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Sound can lift things. Here's how.</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            ST51 is our open-source exploration of acoustic levitation — the science of using sound waves to move and suspend objects in mid-air. No hype. Just physics.
          </p>
          <div className="mt-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium">
            Open source · Peer-reviewed · Free forever
          </div>
        </motion.div>

        {/* Plain English explainer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> The 4 things you need to know
          </h3>
          <div className="space-y-4">
            {facts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-colors"
              >
                <div className="text-3xl flex-shrink-0 mt-0.5">{fact.icon}</div>
                <div>
                  <div className="font-bold text-white mb-1">{fact.title}</div>
                  <div className="text-gray-400 text-sm leading-relaxed">{fact.body}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why it matters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-16 p-6 bg-blue-900/20 border border-blue-500/30 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" /> Why does this matter?
          </h3>
          <p className="text-gray-400 text-sm mb-4">This isn't just cool physics. Acoustic resonance is the same principle behind:</p>
          <ul className="space-y-2">
            {whyItMatters.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm">
                <span className="text-blue-400 font-bold flex-shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-cyan-300 font-semibold mt-4 text-sm">
            When you understand resonance, you understand how the universe optimises energy. That's the whole point.
          </p>
        </motion.div>

        {/* Honest limitations box */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-16 p-6 bg-amber-900/10 border border-amber-500/20 rounded-2xl">
          <h3 className="text-lg font-bold text-amber-300 mb-3">Honest disclaimer</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Right now, acoustic levitation works reliably with tiny, lightweight objects (think polystyrene beads, small droplets). Levitating heavier things needs serious engineering. We're exploring it openly — sharing what works, what doesn't, and what the science actually says. No exaggeration. No hype.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center p-8 bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-cyan-500/30 rounded-2xl">
          <Heart className="w-8 h-8 text-pink-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">This is open source. Forever.</h3>
          <p className="text-gray-400 text-sm mb-6">
            We're sharing everything — calculations, designs, results, failures. Knowledge belongs to everyone.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              View on GitHub
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white">
              <Share2 className="w-4 h-4 mr-2" /> Share This
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}