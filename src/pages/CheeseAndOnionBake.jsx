import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Zap, ChevronDown, Star, Send, Menu, X } from 'lucide-react';

// COOLASFUCK custom Cheese & Onion Bake icon
const CheeseOnionBakeIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Pastry base - golden */}
    <rect x="8" y="36" width="48" height="20" rx="4" fill="#d97706" />
    <rect x="10" y="38" width="44" height="16" rx="3" fill="#f59e0b" />
    {/* Pastry top layers */}
    <rect x="8" y="28" width="48" height="12" rx="3" fill="#b45309" />
    <rect x="10" y="30" width="44" height="8" rx="2" fill="#d97706" />
    {/* Cheese filling oozing out - yellow */}
    <rect x="12" y="33" width="40" height="6" rx="2" fill="#fde047" />
    <rect x="16" y="34" width="32" height="4" rx="1" fill="#fef08a" />
    {/* Onion bits - white/purple */}
    <ellipse cx="22" cy="36" rx="3" ry="2" fill="#e2e8f0" />
    <ellipse cx="32" cy="35" rx="2.5" ry="1.5" fill="#c4b5fd" />
    <ellipse cx="42" cy="36" rx="3" ry="2" fill="#e2e8f0" />
    {/* Pastry shine */}
    <rect x="12" y="30" width="12" height="3" rx="1" fill="#fbbf24" opacity="0.6" />
    {/* Rocket League ball - cyan */}
    <circle cx="48" cy="16" r="12" fill="#06b6d4" />
    <circle cx="48" cy="16" r="9" fill="#0891b2" />
    {/* Ball hexagon pattern */}
    <path d="M48 10 L52 13 L52 19 L48 22 L44 19 L44 13 Z" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
    <circle cx="48" cy="16" r="3" fill="#67e8f9" />
    {/* Ball shine */}
    <circle cx="45" cy="13" r="2" fill="#cffafe" opacity="0.7" />
    {/* Speed lines */}
    <path d="M4 14 L14 14" stroke="#f97316" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <path d="M2 18 L10 18" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M4 22 L12 22" stroke="#f97316" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// COOLASFUCK Rocket League car boost icon
const BoostIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="8" width="10" height="7" rx="2" fill="#f97316" />
    <rect x="5" y="10" width="6" height="3" rx="1" fill="#fed7aa" />
    <polygon points="13,8 17,10 13,12" fill="#fb923c" />
    <rect x="5" y="6" width="2" height="2" rx="0.5" fill="#fbbf24" />
    <rect x="9" y="6" width="2" height="2" rx="0.5" fill="#fbbf24" />
    <path d="M7 15 L6 18 M10 15 L11 18" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// COOLASFUCK SSL rank icon
const SSLIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <polygon points="10,2 12.5,7 18,8 14,12 15,18 10,15 5,18 6,12 2,8 7.5,7" fill="#06b6d4" stroke="#22d3ee" strokeWidth="1" />
    <circle cx="10" cy="10" r="3" fill="#0891b2" />
    <circle cx="10" cy="10" r="1.5" fill="#cffafe" />
  </svg>
);

// COOLASFUCK replay icon
const ReplayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="11" rx="2" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
    <polygon points="7,6 14,8.5 7,11" fill="#06b6d4" />
    <rect x="4" y="16" width="12" height="2" rx="1" fill="#475569" />
    <circle cx="15" cy="5" r="2" fill="#f97316" />
    <path d="M14.5 5 L16 3.5" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const SERVICES = [
  {
    title: "1-on-1 Coaching",
    description: "60 minutes. We watch your replays live, fix your mechanics, and I tell you exactly what's stopping you from ranking up. No fluff.",
    price: "£15",
    Icon: BoostIcon,
    color: "orange"
  },
  {
    title: "Replay Analysis",
    description: "Send me your replays. Full written breakdown — positioning, boost management, decision making. You'll see your game differently.",
    price: "£10",
    Icon: ReplayIcon,
    color: "cyan"
  },
  {
    title: "Rank Up Package",
    description: "Custom package — you tell me what you need, I'll build it. DM me your rank and goals and we'll work something out.",
    price: "Custom",
    Icon: SSLIcon,
    color: "purple"
  }
];

const STATS = [
  { label: "Rank", value: "SSL", sub: "Supersonic Legend · Top 0.1%" },
  { label: "Style", value: "Unorthodox", sub: "They hate it. It works." },
  { label: "Frequency", value: "COOLASFUCK", sub: "No meta. Free thinking." },
];

const colorMap = {
  orange: { border: 'border-orange-500/40', hover: 'hover:border-orange-500/70', price: 'text-orange-400', bg: 'bg-orange-500/10' },
  cyan: { border: 'border-cyan-500/40', hover: 'hover:border-cyan-500/70', price: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  purple: { border: 'border-purple-500/40', hover: 'hover:border-purple-500/70', price: 'text-purple-400', bg: 'bg-purple-500/10' },
};

export default function CheeseAndOnionBake() {
  const [form, setForm] = useState({ name: '', email: '', message: '', service: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ maxWidth: '100vw' }}>
      {/* CUSTOM HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2">
            <CheeseOnionBakeIcon size={32} />
            <span className="text-xl sm:text-2xl font-black text-white font-mono">cheese<span className="text-orange-400">&</span>onionbake</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="https://discord.gg/cheeseandonionbake" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono">Discord</a>
            <a href="#contact" className="text-gray-400 hover:text-white text-sm font-mono">Contact</a>
            <a href="/CB51Terms" className="text-gray-400 hover:text-white text-sm font-mono">Terms</a>
            <a href="/CB51Privacy" className="text-gray-400 hover:text-white text-sm font-mono">Privacy</a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-500/20 bg-black/95 p-4 space-y-3">
            <a href="https://discord.gg/cheeseandonionbake" target="_blank" rel="noopener noreferrer" className="block text-cyan-400 hover:text-cyan-300 text-sm font-mono py-2">Discord</a>
            <a href="#contact" className="block text-gray-400 hover:text-white text-sm font-mono py-2">Contact</a>
            <a href="/CB51Terms" className="block text-gray-400 hover:text-white text-sm font-mono py-2">Terms</a>
            <a href="/CB51Privacy" className="block text-gray-400 hover:text-white text-sm font-mono py-2">Privacy</a>
          </div>
        )}
      </header>

      {/* Offset main content for fixed header */}
      <div className="pt-20">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://media.base44.com/images/public/6889f31e76713b9cd47e043c/4a0df39ce_generated_image.png" alt="neon ball" className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 opacity-20 blur-2xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />
          <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-purple-500/8 blur-[60px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-3xl"
        >
          {/* COOLASFUCK Icon */}
          <motion.div
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            className="flex justify-center mb-6"
          >
            <CheeseOnionBakeIcon size={80} />
          </motion.div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs font-mono tracking-widest px-4 py-2 rounded-full mb-8">
            <SSLIcon />
            WORLD'S TOP 0.1% · BEST IN SCOTLAND
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-tight mb-3 sm:mb-4 leading-tight font-mono">
            <span className="text-white">cheese</span>
            <span className="text-orange-400">&</span>
            <span className="text-white">onionbake</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-mono mb-2 sm:mb-4 max-w-xl mx-auto tracking-wide">
            Rocket League coaching. Top 0.1% globally.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto mb-8 sm:mb-10 font-mono">
            I don't play the meta. I don't care if you like my style. I care if it works. It does.
          </p>

          <a href="#contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-black text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all hover:scale-105">
            <Zap className="w-4 sm:w-5 h-4 sm:h-5" />
            Get Coaching — from £10
          </a>
        </motion.div>

        <motion.button
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 text-gray-600 hover:text-orange-400 transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </section>

      {/* STATS */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="border border-white/10 bg-white/3 rounded-xl p-6 text-center hover:border-orange-500/40 transition-all"
            >
              <div className="text-xl sm:text-2xl font-black text-orange-400 mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 font-mono">{stat.label}</div>
              <div className="text-[10px] sm:text-xs text-gray-600 mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-4 sm:px-6 py-12 sm:py-16 max-w-4xl mx-auto relative">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 sm:mb-3">What I Offer</h2>
          <p className="text-sm sm:text-base text-gray-500">No fluff. No fake promises. Just ranked up players.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`border ${c.border} ${c.hover} bg-white/3 rounded-xl p-6 transition-all`}
              >
                <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <s.Icon />
                </div>
                <div className={`${c.price} font-black text-xl sm:text-2xl mb-1`}>{s.price}</div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* THE VIBE */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-2xl mx-auto text-center relative">
        <img src="https://media.base44.com/images/public/6889f31e76713b9cd47e043c/9333643ad_generated_image.png" alt="boost" className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 opacity-10 blur-2xl" />
        <div className="border border-white/10 rounded-2xl p-6 sm:p-10 bg-white/3 relative z-10">
          <div className="flex justify-center mb-3 sm:mb-4">
            <CheeseOnionBakeIcon size={40} />
          </div>
          <blockquote className="text-base sm:text-xl md:text-2xl text-gray-300 font-light leading-relaxed italic mb-4 sm:mb-6">
            "They all take it seriously. I do my own thing. I'm ranked higher than most of them."
          </blockquote>
          <div className="text-orange-400 font-bold font-mono text-xs sm:text-sm">— cheeseandonionbake</div>
        </div>
        </section>

      {/* CONTACT */}
      <section id="contact" className="px-4 sm:px-6 py-12 sm:py-16 max-w-2xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 sm:mb-3">Get In Touch</h2>
          <p className="text-sm sm:text-base text-gray-500">Tell me where you're stuck. I'll tell you what to fix.</p>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-center border border-orange-500/40 bg-orange-500/10 rounded-xl sm:rounded-2xl p-6 sm:p-12"
          >
            <div className="flex justify-center mb-3 sm:mb-4"><CheeseOnionBakeIcon size={48} /></div>
            <h3 className="text-xl sm:text-2xl font-black text-orange-400 mb-2">Message sent.</h3>
            <p className="text-sm sm:text-base text-gray-400">I'll get back to you on Discord or email. Let's rank you up.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 transition-colors"
              />
            </div>

            <select
              value={form.service}
              onChange={e => setForm({ ...form, service: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-orange-500/60 transition-colors"
            >
              <option value="" className="bg-black">What are you after?</option>
              <option value="1-on-1 Coaching" className="bg-black">1-on-1 Coaching — £15</option>
              <option value="Replay Analysis" className="bg-black">Replay Analysis — £10</option>
              <option value="Rank Up Package" className="bg-black">Rank Up Package — Custom</option>
              <option value="Just a question" className="bg-black">Just a question</option>
            </select>

            <textarea
              required
              rows={4}
              placeholder="What rank are you? What's your problem? Where are you getting stuck?"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-black text-sm sm:text-base py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all hover:scale-[1.02]"
            >
              <Send className="w-4 sm:w-5 h-4 sm:h-5" />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-6 sm:py-8 text-center text-gray-700 text-[10px] sm:text-xs font-mono">
        <div className="flex justify-center mb-2 sm:mb-3"><CheeseOnionBakeIcon size={28} /></div>
        <p>cheeseandonionbake · Supersonic Legend · Scotland</p>
        <div className="mt-2 space-x-4">
          <a href="https://discord.gg/cheeseandonionbake" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition-colors">Discord</a>
          <span>·</span>
          <a href="/CB51Terms" className="text-gray-600 hover:text-gray-500 transition-colors">Terms</a>
          <span>·</span>
          <a href="/CB51Privacy" className="text-gray-600 hover:text-gray-500 transition-colors">Privacy</a>
        </div>
      </footer>
      </div>
      </div>
      );
      }