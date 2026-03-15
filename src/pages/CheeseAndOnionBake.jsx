import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Zap, Trophy, Target, MessageCircle, ChevronDown, Star, Send } from 'lucide-react';

const SERVICES = [
  {
    title: "1-on-1 Coaching Session",
    description: "60 minutes. We analyse your replays, fix your mechanics, and I tell you exactly what's stopping you from ranking up.",
    price: "£25",
    icon: "🎯"
  },
  {
    title: "Replay Analysis",
    description: "Send me your replays. I'll send back a full written breakdown — positioning, boost management, decision making.",
    price: "£10",
    icon: "📹"
  },
  {
    title: "Rank Up Package",
    description: "3 sessions + replay reviews. For players serious about climbing. I got to SSL doing my own thing — I'll show you how.",
    price: "£60",
    icon: "🚀"
  }
];

const STATS = [
  { label: "Rank", value: "Supersonic Legend", sub: "Top 0.1% in Scotland" },
  { label: "Style", value: "Unorthodox", sub: "They hate it. It works." },
  { label: "Playstyle", value: "chaosandonionbake", sub: "Free thinking. No meta." },
];

export default function CheeseAndOnionBake() {
  const [form, setForm] = useState({ name: '', email: '', message: '', service: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'universalfamily51@gmail.com',
      subject: `CheeseAndOnionBake Enquiry from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`
    });
    setSent(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/8 blur-[80px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-orange-500/40 bg-orange-500/10 text-orange-400 text-xs font-mono tracking-widest px-4 py-2 rounded-full mb-8">
            <Trophy className="w-3 h-3" />
            SUPERSONIC LEGEND · TOP 0.1% · SCOTLAND
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">
            <span className="text-white">cheese</span>
            <span className="text-orange-400">&</span>
            <span className="text-white">onionbake</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-light mb-4 max-w-xl mx-auto">
            Rocket League coaching from Scotland's top 0.1%.
          </p>
          <p className="text-gray-600 text-sm max-w-lg mx-auto mb-10">
            I don't play the meta. I don't care if you like my style. I care if it works. It does.
          </p>

          <a href="#contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-105">
            <Zap className="w-5 h-5" />
            Get Coaching
          </a>
        </motion.div>

        <a href="#services" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 transition-colors">
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </section>

      {/* STATS */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 bg-white/3 rounded-xl p-6 text-center hover:border-orange-500/40 transition-all"
            >
              <div className="text-2xl font-black text-orange-400 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 font-mono">{stat.label}</div>
              <div className="text-xs text-gray-600 mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-3">What I Offer</h2>
          <p className="text-gray-500">No fluff. No fake promises. Just ranked up players.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 bg-white/3 rounded-xl p-6 hover:border-orange-500/40 transition-all group"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="text-orange-400 font-black text-2xl mb-1">{s.price}</div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE VIBE */}
      <section className="px-6 py-16 max-w-2xl mx-auto text-center">
        <div className="border border-white/10 rounded-2xl p-10 bg-white/3">
          <Star className="w-8 h-8 text-orange-400 mx-auto mb-4" />
          <blockquote className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed italic mb-6">
            "They all take it seriously. I do my own thing. I'm ranked higher than most of them."
          </blockquote>
          <div className="text-orange-400 font-bold font-mono text-sm">— cheeseandonionbake</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-16 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white mb-3">Get In Touch</h2>
          <p className="text-gray-500">Tell me where you're stuck. I'll tell you what to fix.</p>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center border border-orange-500/40 bg-orange-500/10 rounded-2xl p-12"
          >
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-black text-orange-400 mb-2">Message sent.</h3>
            <p className="text-gray-400">I'll get back to you on Discord or email. Let's rank you up.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 transition-colors"
              />
            </div>

            <select
              value={form.service}
              onChange={e => setForm({ ...form, service: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/60 transition-colors"
            >
              <option value="" className="bg-black">What are you after?</option>
              <option value="1-on-1 Coaching" className="bg-black">1-on-1 Coaching — £25</option>
              <option value="Replay Analysis" className="bg-black">Replay Analysis — £10</option>
              <option value="Rank Up Package" className="bg-black">Rank Up Package — £60</option>
              <option value="Just a question" className="bg-black">Just a question</option>
            </select>

            <textarea
              required
              rows={4}
              placeholder="What rank are you? What's your problem? Where are you getting stuck?"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-black text-lg py-4 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Send className="w-5 h-5" />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-700 text-xs font-mono">
        <p>cheeseandonionbake · Supersonic Legend · Scotland</p>
        <p className="mt-1">Part of <a href="/" className="text-gray-600 hover:text-orange-400 transition-colors">universalfamily51</a></p>
      </footer>
    </div>
  );
}