import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Globe, Zap, Users, Brain, ArrowRight, Quote } from 'lucide-react';

const STATS = [
  { number: "273M", label: "children currently out of school", source: "UNESCO GEM Report, April 2026", color: "text-red-400", border: "border-red-500/40" },
  { number: "57%", label: "of children worldwide lack basic literacy & numeracy", source: "UNESCO SDG 4 Scorecard 2026", color: "text-orange-400", border: "border-orange-500/40" },
  { number: "2.6B", label: "people still have no internet access", source: "UNESCO Digital Equity Report 2026", color: "text-yellow-400", border: "border-yellow-500/40" },
  { number: "2105", label: "the year world reaches 95% school completion at current rates", source: "Human Rights Watch, April 2026", color: "text-pink-400", border: "border-pink-500/40" },
];

const WHAT_WE_DO = [
  { icon: Globe, title: "32 Languages", desc: "Including Hausa, Amharic, Pashto & Kurdish — the languages Silicon Valley never builds for.", color: "text-cyan-400" },
  { icon: Zap, title: "Zero Barriers", desc: "No login. No payment. No English required. Open your browser and learn.", color: "text-green-400" },
  { icon: Brain, title: "Thinks With You", desc: "We don't give answers. We ask questions. Every lesson adapts to how you think, not just what you get right.", color: "text-purple-400" },
  { icon: Heart, title: "Built For Joy", desc: "Creative rewards — poems, songs, art — make learning feel like play, not homework.", color: "text-pink-400" },
  { icon: Users, title: "No Data. Ever.", desc: "Zero surveillance. Your child's learning stays on their device, not in a database.", color: "text-amber-400" },
  { icon: Globe, title: "Works Offline", desc: "Low data? Borrowed phone? Doesn't matter. A child in Nairobi with 2 minutes of data can use this.", color: "text-teal-400" },
];

export default function Learn51About() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-black to-purple-950/30" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-bold tracking-wider">FREE · NO LOGIN · EVERY CHILD ON EARTH</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">We built the</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                tutor the world forgot
              </span>
              <br />
              <span className="text-white">to build.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Learn51 is a free AI tutor for every child on Earth. No login. No payment. No barriers.
              Built for the 273 million children who currently have no school at all.
            </p>
          </motion.div>
        </div>
      </div>

      {/* WEF QUOTE — the hero moment */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative bg-gradient-to-br from-cyan-950/50 to-purple-950/50 border-2 border-cyan-500/40 rounded-2xl p-8 md:p-12"
        >
          <Quote className="w-12 h-12 text-cyan-400/40 mb-6" />
          <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
            "AI in education will not be shaped by technology alone — the biggest barrier is not technical, it's{' '}
            <span className="text-cyan-400">human readiness</span>. And if done wrong, AI may{' '}
            <span className="text-red-400">deepen the very divides</span> it's meant to reduce."
          </blockquote>
          <p className="text-gray-400 font-bold text-sm tracking-wider">— WORLD ECONOMIC FORUM, APRIL 2026</p>
          <p className="text-gray-500 text-sm mt-1">
            <a href="https://www.weforum.org/stories/2026/04/what-ai-in-education-needs-next-lessons-from-youth-leaders-across-five-countries/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline">
              "What AI in Education Needs Next" — Youth Leaders across 5 Countries
            </a>
          </p>
        </motion.div>
      </div>

      {/* THE STATS */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-center mb-4 text-white">The numbers that keep us up at night.</h2>
        <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">These aren't projections. This is April 2026. Right now.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border-2 ${stat.border} rounded-xl p-6 bg-black/40`}
            >
              <div className={`text-5xl font-black mb-2 ${stat.color}`}>{stat.number}</div>
              <div className="text-white font-bold text-lg mb-2">{stat.label}</div>
              <div className="text-gray-500 text-xs font-mono">{stat.source}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WHAT LEARN51 DOES */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-center mb-4 text-white">What makes Learn51 different.</h2>
        <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
          Every AI edtech product built so far has been built for kids who already have advantages.
          We built for everyone else.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHAT_WE_DO.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="border border-white/10 rounded-xl p-6 bg-white/5 hover:bg-white/10 transition-all"
              >
                <Icon className={`w-8 h-8 mb-3 ${item.color}`} />
                <h3 className="text-white font-black text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* THE HONEST BIT */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-green-950/40 to-black border border-green-500/30 rounded-2xl p-8 md:p-12 text-center">
          <Heart className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">We make no money from this.</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Learn51 is completely free. No ads. No subscriptions. No data sold. No corporate capture.
            It exists because the people who built it believe that a child in Somalia deserves the same
            quality of education as a child in Switzerland.
            <br /><br />
            That's not a business model. That's a belief.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-black text-white mb-4">Ready to learn something amazing?</h2>
        <p className="text-gray-400 mb-8">No signup. No payment. Just open it and go.</p>
        <Link
          to="/Learn51"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-black text-xl px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-cyan-500/30"
        >
          Start Learning Free <ArrowRight className="w-6 h-6" />
        </Link>
        <p className="text-gray-600 text-sm mt-6">32 languages · works offline · no login ever</p>
      </div>

    </div>
  );
}