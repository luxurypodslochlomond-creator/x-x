import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Learn51Terms() {
  return (
    <div className="min-h-screen bg-[#05080f] text-white px-5 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/Learn51" className="text-indigo-400 font-bold text-sm hover:text-white transition-colors">← Back to Learn51</Link>
          <h1 className="text-4xl font-black mt-4 mb-2 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Terms of Use</h1>
          <p className="text-white/40 text-sm">Effective: April 2026</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-6 text-white/80 leading-relaxed">

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">What is Learn51?</h2>
            <p>Learn51 is a free educational platform for children, built by Universal Frequency 51 (UF51). It provides AI-powered learning tools, literacy exercises, life skills content and maths games — all free, forever, with no account needed.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">Who can use it?</h2>
            <p>Learn51 is designed for children of all ages, anywhere in the world. Parents, teachers and carers are welcome to use it alongside children. No age verification is required because we collect no personal data whatsoever.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">What we expect from you</h2>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>Use Learn51 for learning — not to harm, harass or abuse others.</li>
              <li>Don't try to break, reverse engineer or exploit the platform.</li>
              <li>Be kind. This is a safe space for every child on Earth.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">AI content</h2>
            <p>Learn51 AI generates personalised lessons using large language models. While we design prompts carefully, AI can make mistakes. Parents and teachers should use their own judgment alongside any AI-generated content.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">No warranties</h2>
            <p>Learn51 is provided free of charge, as-is, without warranty of any kind. We aim for 100% uptime but cannot guarantee it. We are not liable for any loss arising from use of the platform.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <h2 className="text-white font-black text-lg">Changes to these terms</h2>
            <p>We may update these terms from time to time. The date at the top of this page shows when they were last updated. Continued use of Learn51 means you accept any changes.</p>
          </section>

          <section className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
            <h2 className="text-indigo-300 font-black text-lg">Contact</h2>
            <p className="text-white/60">Questions? Get in touch via the <Link to="/Learn51About" className="text-indigo-400 hover:text-white underline">About page</Link> or email <span className="text-indigo-300">hello@uf51.com</span></p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}