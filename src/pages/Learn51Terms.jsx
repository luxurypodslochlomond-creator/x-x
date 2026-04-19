import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Learn51Terms() {
  return (
    <div className="min-h-screen bg-[#05080f] text-white px-5 py-10">
      <div className="max-w-2xl mx-auto space-y-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/Learn51" className="text-indigo-400 font-bold text-sm hover:text-white transition-colors">← Back to Learn51</Link>
          <h1 className="text-4xl font-black mt-4 mb-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Terms of Use</h1>
          <p className="text-white/40 text-sm">April 2026</p>
        </motion.div>

        {/* BIG SIMPLE STATEMENT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="bg-cyan-500/10 border-2 border-cyan-500/40 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">🌍</div>
          <p className="text-cyan-300 font-black text-2xl mb-2">This is free. Forever. For everyone.</p>
          <p className="text-white/70 text-lg">No sign-up. No payment. No catch. Just open it and learn.</p>
        </motion.div>

        {/* PLAIN LANGUAGE CARDS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="space-y-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-white font-black text-lg mb-1">Who is this for?</p>
            <p className="text-white/60">Any child, anywhere in the world. Any age. Any language. Parents and teachers too. Everyone is welcome. No permission needed.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">💚</p>
            <p className="text-white font-black text-lg mb-1">What we ask of you</p>
            <p className="text-white/60">Just one thing — be kind. This is a safe space built for every child on Earth, including kids who have nothing else. Use it to learn. Don't try to break it or use it to hurt anyone.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">🤖</p>
            <p className="text-white font-black text-lg mb-1">The AI can make mistakes</p>
            <p className="text-white/60">The AI tutor is smart but not perfect. If something it says seems wrong, trust your instincts. AI is a tool — your brain is still the boss. Parents and teachers, use your judgment alongside it.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">⚡</p>
            <p className="text-white font-black text-lg mb-1">Sometimes it might go down</p>
            <p className="text-white/60">We try our best to keep Learn51 running all the time. Occasionally things break. We're a small team doing this for free, for the right reasons. We'll always fix it as fast as we can.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl mb-2">🔓</p>
            <p className="text-white font-black text-lg mb-1">Going open source</p>
            <p className="text-white/60">One day the whole code will be open source — free for anyone in the world to improve, translate, and build on. That's the plan. Community-powered, no corporate capture, forever.</p>
          </div>

        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5 text-center">
          <p className="text-white/60 text-sm">Questions? We're real people. <a href="mailto:family@uf51.love" className="text-indigo-300 font-black hover:text-white transition-colors">family@uf51.love</a></p>
        </motion.div>

      </div>
    </div>
  );
}