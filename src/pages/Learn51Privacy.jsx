import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FACTS = [
  { emoji: '🚫', label: 'No accounts', desc: 'No sign-up, no login, no email required — ever.' },
  { emoji: '📦', label: 'No server data', desc: 'Your progress lives only in your browser. Nothing is sent to our servers.' },
  { emoji: '🍪', label: 'No tracking cookies', desc: 'We do not use advertising cookies or tracking pixels.' },
  { emoji: '🤖', label: 'AI prompts', desc: 'When you use the AI Tutor, anonymous prompts are sent to the AI — no name, no location, no identity.' },
  { emoji: '👨‍👩‍👧', label: 'COPPA & GDPR safe', desc: "Because we collect zero personal data, we're safe for children in every jurisdiction." },
  { emoji: '🌍', label: 'Open forever', desc: 'This policy will never change to allow advertising or data selling. It\'s part of our mission.' },
];

export default function Learn51Privacy() {
  return (
    <div className="min-h-screen bg-[#05080f] text-white px-5 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/Learn51" className="text-indigo-400 font-bold text-sm hover:text-white transition-colors">← Back to Learn51</Link>
          <h1 className="text-4xl font-black mt-4 mb-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Privacy Policy</h1>
          <p className="text-white/40 text-sm">Effective: April 2026 · Last updated: April 2026</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-5 mb-6">
            <p className="text-emerald-300 font-black text-lg">🔒 The short version</p>
            <p className="text-white/70 mt-1">We collect <strong className="text-white">zero personal data</strong> from children or anyone else. Full stop.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FACTS.map(f => (
              <div key={f.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                <p className="text-2xl">{f.emoji}</p>
                <p className="text-white font-black text-sm">{f.label}</p>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-5 text-white/80 leading-relaxed">

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">Local storage</h2>
            <p>Learn51 uses your browser's <code className="text-indigo-300 text-sm bg-indigo-500/10 px-1 rounded">localStorage</code> to remember your stars, level, language preference and favourite interest. This data never leaves your device. Clearing your browser data removes it entirely.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">AI Tutor prompts</h2>
            <p>When the AI Tutor generates a lesson, an anonymous prompt is sent to our AI provider (containing topic, age bracket and interest — never your name or identity). Our AI provider does not store or train on these prompts.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">Third parties</h2>
            <p>We do not share any data with advertisers, data brokers or any third party. We will never sell data. We will never build profiles on children.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">Children's rights</h2>
            <p>Learn51 is designed with children's digital rights at its core. We follow the principles of COPPA (US), GDPR-K (EU), and the UK Children's Code. If you have any concerns, please contact us.</p>
          </section>

          <section className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
            <h2 className="text-indigo-300 font-black text-lg">Contact</h2>
            <p className="text-white/60">Privacy questions? <span className="text-indigo-300">hello@uf51.com</span> or via the <Link to="/Learn51About" className="text-indigo-400 hover:text-white underline">About page</Link>.</p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}