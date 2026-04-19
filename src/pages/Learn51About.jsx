import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Globe, Zap, Users, Brain, ArrowRight, Quote, Lock, Shield, CheckCircle } from 'lucide-react';

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

      {/* ZERO BARRIERS SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-950/50 to-emerald-950/30 border-2 border-green-500/40 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-black tracking-wider">ZERO BARRIERS</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-3">If you can open a browser, you can learn.</h2>
            <p className="text-gray-400 max-w-xl mx-auto">No barrier has been left standing. Every single one has been deliberately removed.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'No account required', sub: 'Not even an email address. Just open and go.' },
              { label: 'No payment ever', sub: 'Free now, free in 10 years, free forever. Non-negotiable.' },
              { label: 'No English required', sub: '32 languages including Hausa, Pashto, Amharic & Kurdish.' },
              { label: 'No fast internet needed', sub: 'Works on 2G. Once loaded, works completely offline.' },
              { label: 'No modern device needed', sub: 'Designed to run on the oldest, cheapest phones on Earth.' },
              { label: 'No teacher required', sub: 'Self-directed. AI adapts. A child can learn entirely alone.' },
            ].map(item => (
              <div key={item.label} className="flex gap-3 bg-black/30 rounded-xl p-4 border border-green-500/20">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-black text-sm">{item.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* PRIVACY & DATA SOVEREIGNTY */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-indigo-950/50 to-cyan-950/30 border-2 border-indigo-500/40 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-4">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-sm font-black tracking-wider">PRIVACY · DATA SOVEREIGNTY · ZERO HARVEST</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Your child's learning belongs to your child.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every edtech platform in the world harvests children's data. We built the opposite.
              We designed from day one so there is <span className="text-white font-bold">nothing to harvest</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Shield, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-950/40', title: 'Zero Server Storage', desc: 'We store nothing about your child. No name, no age, no location, no learning history. It cannot be hacked because it does not exist.' },
              { icon: Lock, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-950/40', title: 'Device-Only Learning', desc: 'Stars, progress, and language preferences live only on the child\'s device. We cannot see them. Governments cannot request them. Advertisers cannot buy them.' },
              { icon: Globe, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-950/40', title: 'Data Sovereignty', desc: 'A child in Pakistan, Sudan, or Myanmar has the same data rights as a child in Germany. Their learning data is theirs — not a product to be monetised.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`border ${item.border} ${item.bg} rounded-xl p-5`}>
                  <Icon className={`w-7 h-7 ${item.color} mb-3`} />
                  <h3 className="text-white font-black mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-5">
            <p className="text-gray-300 text-sm leading-relaxed text-center">
              <span className="text-white font-black">Why does data sovereignty matter?</span> Because the next billion learners are in countries where governments, corporations, and surveillance systems are actively hostile to children's privacy. We don't collect data because we refuse to become a risk to the very children we're trying to help.
              <br /><br />
              <span className="text-cyan-400 font-bold">This isn't a privacy policy. It's an architecture decision. We built it so we physically cannot harvest data even if we wanted to.</span>
            </p>
          </div>

          <p className="text-center text-gray-600 text-xs mt-4">COPPA compliant · GDPR-K compliant · UNCRC Article 16 aligned · No third-party analytics · No advertising SDKs</p>
        </motion.div>
      </div>

      {/* WORKS FOR EVERY CHILD */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-rose-950/50 to-pink-950/30 border-2 border-rose-500/40 rounded-2xl p-8 md:p-12 text-center"
        >
          <Heart className="w-12 h-12 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">Built to work for every child. Full stop.</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Every child learns differently. Some learn by listening. Some by seeing. Some by touching. Some need more time, different colours, quieter environments, or a completely different way in.
            <br /><br />
            <span className="text-white font-black">No child should be excluded because the tool wasn't built for how they experience the world.</span>
            <br /><br />
            We are actively building Learn51 to work for every learning style, every sense, every pace. This is ongoing work — and when we go open source, the whole world helps us get it right.
          </p>
          <a href="mailto:family@uf51.love" className="text-rose-400 font-black hover:text-rose-300 transition-colors text-sm">
            family@uf51.love — help us build it ❤️
          </a>
        </motion.div>
      </div>

      {/* THE HONEST BIT — OPEN SOURCE VISION */}
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

      {/* OPEN SOURCE FUTURE */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border-2 border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="text-5xl mb-4">⚡</div>
          <h2 className="text-3xl font-black text-white mb-4">The goal is open source. Full stop.</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            We're not looking for funding partners. We're not looking for corporate sponsors.
            We're not selling equity in a children's education platform.
            <br /><br />
            The plan is to open source Learn51's AI engine completely — so that developers, teachers, linguists, and communities all over the world can improve it, translate it, and make it more powerful for the right reasons.
            <br /><br />
            <span className="text-cyan-400 font-black">Not because someone paid for it. Because it's the right thing to do.</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { emoji: '🌍', title: 'Community-powered', desc: 'Teachers in Kenya adding content. Developers in Brazil fixing bugs. Linguists in Iraq adding Kurdish dialects. Everyone welcome.' },
              { emoji: '🔓', title: 'No corporate capture', desc: 'Once it\'s open source, no company can lock it down, monetise it, or remove it from the children who need it.' },
              { emoji: '♾️', title: 'Gets better forever', desc: 'Open source means it outlives us. It grows after we\'re gone. It belongs to every child on Earth, permanently.' },
            ].map(item => (
              <div key={item.title} className="bg-black/30 border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="text-white font-black text-sm mb-1">{item.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
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