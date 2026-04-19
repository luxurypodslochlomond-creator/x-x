import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Learn51Privacy() {
  return (
    <div className="min-h-screen bg-[#05080f] text-white px-5 py-10">
      <div className="max-w-2xl mx-auto space-y-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/Learn51" className="text-indigo-400 font-bold text-sm hover:text-white transition-colors">← Back to Learn51</Link>
          <h1 className="text-4xl font-black mt-4 mb-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Privacy</h1>
          <p className="text-white/40 text-sm">April 2026</p>
        </motion.div>

        {/* BIG SIMPLE STATEMENT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">🔒</div>
          <p className="text-emerald-300 font-black text-2xl mb-2">We know nothing about you.</p>
          <p className="text-white/70 text-lg">No name. No age. No location. No email. Nothing. We literally cannot see who you are.</p>
        </motion.div>

        {/* PLAIN LANGUAGE CARDS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">📱</p>
            <p className="text-white font-black text-lg mb-1">Your stars and progress stay on your phone or computer</p>
            <p className="text-white/60">When you earn stars or finish a lesson, that information is saved on your own device — not on our servers. If you clear your browser, it resets. We never see it.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">🤖</p>
            <p className="text-white font-black text-lg mb-1">When the AI teaches you, it doesn't know who you are</p>
            <p className="text-white/60">The AI only gets told the topic you're learning and roughly how old you said you are. No name. No account. It's like asking a teacher a question without telling them your name.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">🚫</p>
            <p className="text-white font-black text-lg mb-1">No one is watching you learn</p>
            <p className="text-white/60">No adverts. No companies buying your data. No profiles being built on you. No one tracking which pages you visit. We built it this way on purpose — it's not just a rule, it's how the code works.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">♾️</p>
            <p className="text-white font-black text-lg mb-1">This will never change</p>
            <p className="text-white/60">We will never add ads. We will never sell data. We will never ask you to sign up. That's not a promise — it's built into what Learn51 is. It's going open source one day so the whole world can make sure of it.</p>
          </div>

        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5 text-center">
          <p className="text-white/60 text-sm">Any questions? We're real people. <a href="mailto:family@uf51.love" className="text-indigo-300 font-black hover:text-white transition-colors">family@uf51.love</a></p>
        </motion.div>

      </div>
    </div>
  );
}