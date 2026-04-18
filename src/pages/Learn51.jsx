import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Brain, BookOpen, Globe, Sparkles, ArrowRight, Trophy, Rocket, Heart, Zap, CheckCircle, Shield, Lock } from 'lucide-react';

// Stars — gain only, never go down, no account needed
const STORAGE_KEY = 'learn51_stars';
const getStars = () => { try { return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10); } catch { return 0; } };

const MODULES = [
  {
    id: 'maths',
    emoji: '🧮',
    title: 'Magic Maths',
    tagline: 'Numbers are everywhere — and they\'re wild',
    desc: 'Doubling, 3D shapes, rounding, decimals, circles — real maths that actually makes sense.',
    color: 'from-violet-600 to-indigo-700',
    border: 'border-violet-400',
    glow: 'shadow-violet-500/40',
    bg: 'bg-violet-950/60',
    Icon: Brain,
    links: [
      { label: 'Ages 5–9 · Magic Maths', sub: 'Numbers, doubling & 3D shapes', url: '/GeorgieMaths', tag: 'START HERE' },
      { label: 'Ages 10+ · Rounding & Decimals', sub: 'Decimals, circles & maths in music', url: '/LennoxMaths', tag: 'LEVEL UP' },
    ],
    stars: 0,
  },
  {
    id: 'literacy',
    emoji: '📖',
    title: 'Literacy 51',
    tagline: 'Words are the most powerful thing you\'ll ever learn',
    desc: 'Phonics, spelling, sentences, stories — reading and writing that sticks.',
    color: 'from-emerald-600 to-teal-700',
    border: 'border-emerald-400',
    glow: 'shadow-emerald-500/40',
    bg: 'bg-emerald-950/60',
    Icon: BookOpen,
    links: [
      { label: 'Literacy 51', sub: 'Phonics · spelling · sentences · stories', url: '/Literacy51', tag: 'GO' },
      { label: 'Reading Support', sub: 'Help with reading & dyslexia', url: '/ReadingSupport', tag: 'HELP' },
    ],
    stars: 0,
  },
  {
    id: 'world',
    emoji: '🌍',
    title: 'Explore the Real World',
    tagline: 'Our planet is absolutely wild — let\'s go',
    desc: 'Water, animals, kindness, food, science — wonder-first learning about the world you live in.',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-400',
    glow: 'shadow-amber-500/40',
    bg: 'bg-amber-950/60',
    Icon: Globe,
    links: [
      { label: 'Young Warriors', sub: 'Real kids making a real difference', url: '/YoungWarriors', tag: 'EXPLORE' },
      { label: 'Sound & Frequencies', sub: 'Invisible waves that change everything', url: '/FrequencyChamber', tag: 'MIND-BLOWN' },
    ],
    stars: 0,
  },
];

const FACTS = [
  '🌊 Water has memory — scientists are still figuring it out',
  '🐋 Whales sing songs that travel thousands of miles',
  '🎵 Every sound you hear is just air vibrating at different speeds',
  '🌱 A single tree can absorb 48 pounds of CO₂ a year',
  '🧠 Your brain has more connections than stars in the Milky Way',
  '🦋 A caterpillar completely dissolves inside its cocoon before becoming a butterfly',
  '⚡ Lightning is five times hotter than the surface of the sun',
  '🐜 Ants can carry 50 times their own body weight',
];

export default function Learn51Page() {
  const [stars] = useState(getStars());
  const [factIndex, setFactIndex] = useState(0);
  const [hoveredModule, setHoveredModule] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex(i => (i + 1) % FACTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05080f] text-white overflow-x-hidden">

      {/* HERO */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute top-[100px] left-[10%] w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute top-[50px] right-[5%] w-[250px] h-[250px] bg-emerald-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-7xl mb-4">🚀</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-3">
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Learn51
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-bold mb-2">
              Free learning for every child on Earth
            </p>
            <p className="text-gray-500 text-base mb-8">No login. No data. No cost. Ever. ♾️</p>

            {/* Stars display */}
            {stars > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/40 rounded-2xl px-5 py-2 mb-6"
              >
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-300 font-black">{stars} stars earned</span>
              </motion.div>
            )}
          </motion.div>

          {/* Rotating wow fact */}
          <AnimatePresence mode="wait">
            <motion.div
              key={factIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mb-10"
            >
              <p className="text-gray-300 text-base font-medium">{FACTS[factIndex]}</p>
              <p className="text-gray-600 text-xs mt-1">Did you know? ✨</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* AI TUTOR HERO CARD */}
      <div className="max-w-4xl mx-auto px-4 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/Learn51AI">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-6 md:p-8 text-white shadow-2xl shadow-indigo-500/30 border border-indigo-400/30 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl flex-shrink-0">🤖</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/20 text-white text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-widest">NEW</span>
                    <span className="text-white/70 text-xs font-bold">World-first</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-2">Learn51 AI Tutor ✨</h2>
                  <p className="text-indigo-200 text-base leading-relaxed mb-3">
                    Tell us what you love — football, gaming, animals, anything — and our AI connects every lesson to YOUR world. Maths, science, health, kindness. Personalised for you. Free forever.
                  </p>
                  <div className="flex items-center gap-2 text-white font-black text-base">
                    Start learning your way <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* THE 3 MODULES */}
      <div className="max-w-4xl mx-auto px-4 pb-8 space-y-5">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-black text-center text-gray-400 tracking-widest uppercase text-sm mb-6"
        >
          Choose your adventure
        </motion.h2>

        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
            onMouseEnter={() => setHoveredModule(mod.id)}
            onMouseLeave={() => setHoveredModule(null)}
            className={`rounded-3xl border ${mod.border} ${mod.bg} backdrop-blur-sm p-6 transition-all duration-300 ${
              hoveredModule === mod.id ? `shadow-2xl ${mod.glow}` : 'shadow-lg'
            }`}
          >
            {/* Module header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="text-5xl flex-shrink-0">{mod.emoji}</div>
              <div className="flex-1">
                <h2 className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${mod.color} bg-clip-text text-transparent`}>
                  {mod.title}
                </h2>
                <p className="text-gray-400 font-bold text-base mt-0.5">{mod.tagline}</p>
                <p className="text-gray-500 text-sm mt-1">{mod.desc}</p>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3">
              {mod.links.map(link => (
                <Link key={link.url} to={link.url}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl px-4 py-3 transition-all group"
                  >
                    <div>
                      <div className="font-black text-white text-base">{link.label}</div>
                      <div className="text-gray-400 text-sm">{link.sub}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-black px-2 py-1 rounded-lg bg-gradient-to-r ${mod.color} text-white`}>
                        {link.tag}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* FOR PARENTS & TEACHERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-3xl border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-sm p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-7 h-7 text-cyan-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-black text-cyan-300">For Parents & Teachers</h3>
              <p className="text-gray-500 text-sm">What you need to know</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Zero data collected from children — ever',
              'No account, no email, no sign-up needed',
              'No adverts, no tracking, no third parties',
              'No social features — children cannot message anyone',
              'Stars saved locally on device only — we cannot see them',
              'Works offline once loaded — fully safe without internet',
            ].map(text => (
              <div key={text} className="flex gap-2 items-start">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">COPPA & GDPR-K compliant by design · No safeguarding concerns · Free forever</p>
        </motion.div>

        {/* THE MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-3xl bg-gradient-to-br from-indigo-900/60 to-violet-900/60 border border-indigo-500/30 p-8 text-center"
        >
          <div className="text-5xl mb-4">🌍</div>
          <h2 className="text-2xl font-black text-white mb-3">Education is a right. Not a product.</h2>
          <p className="text-indigo-200 text-base leading-relaxed max-w-xl mx-auto mb-3">
            273 million children are out of school right now. We're building for every single one of them.
            Every language. Every device. Every corner of Earth.
          </p>
          <p className="text-indigo-300 font-bold text-sm">Free. Always. Built with love by UF51 ♾️❤️</p>
        </motion.div>

      </div>
    </div>
  );
}