import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, Brain, BookOpen, Heart, Globe, Star, Sparkles, Info, ChevronRight, Rocket } from 'lucide-react';

const NAV_ITEMS = [
  {
    section: '🚀 Learn51',
    items: [
      { label: 'Learn51 Home', sub: 'All learning tools', url: '/Learn51', emoji: '🏠' },
      { label: 'Learn51 AI Tutor', sub: 'Personalised AI lessons', url: '/Learn51AI', emoji: '🤖', highlight: true },
      { label: 'About Learn51', sub: 'Mission & privacy info', url: '/Learn51About', emoji: 'ℹ️' },
    ]
  },
  {
    section: '🧮 Maths',
    items: [
      { label: 'Magic Maths', sub: 'Ages 5–9 · Numbers & shapes', url: '/GeorgieMaths', emoji: '🧮' },
      { label: 'Rounding & Decimals', sub: 'Ages 10+ · Maths in music', url: '/LennoxMaths', emoji: '🔢' },
    ]
  },
  {
    section: '📖 Literacy',
    items: [
      { label: 'Literacy 51', sub: 'Phonics · spelling · sentences', url: '/Literacy51', emoji: '📖' },
      { label: 'Reading Support', sub: 'Help with reading & dyslexia', url: '/ReadingSupport', emoji: '🔍' },
    ]
  },
  {
    section: '🌟 Life & World',
    items: [
      { label: 'Life Skills 51', sub: 'Money · food · mental health', url: '/LifeSkills51', emoji: '🌟' },
      { label: 'Young Warriors', sub: 'Kids making a difference', url: '/YoungWarriors', emoji: '🦸' },
    ]
  },
];

function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="fixed inset-0 z-[100] bg-[#05080f] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-[#05080f]/95 backdrop-blur-xl border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <Link to="/Learn51" onClick={onClose} className="text-xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          🚀 Learn51
        </Link>
        <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {NAV_ITEMS.map(group => (
          <div key={group.section}>
            <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-3">{group.section}</p>
            <div className="space-y-2">
              {group.items.map(item => (
                <Link
                  key={item.url}
                  to={item.url}
                  onClick={onClose}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                    item.highlight
                      ? 'border-violet-400/50 bg-violet-500/15 hover:bg-violet-500/25'
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-sm ${item.highlight ? 'text-violet-200' : 'text-white'}`}>{item.label}</p>
                    <p className="text-white/40 text-xs">{item.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Footer mission */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs">Free for every child on Earth · No login · No data</p>
          <p className="text-white/20 text-xs mt-1">Built with ♾️❤️ by UF51</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Learn51Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      {/* TOP NAV — Learn51 only */}
      <div className="sticky top-0 z-40 bg-[#05080f]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/Learn51" className="text-xl font-black bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
            <Rocket className="w-5 h-5 text-violet-400" />
            Learn51
          </Link>

          {/* Desktop quick links */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/Learn51AI" className={`text-sm font-bold transition-colors flex items-center gap-1 ${location.pathname === '/Learn51AI' ? 'text-violet-300' : 'text-white/50 hover:text-white'}`}>
              🤖 AI Tutor
            </Link>
            <Link to="/Literacy51" className={`text-sm font-bold transition-colors ${location.pathname === '/Literacy51' ? 'text-emerald-300' : 'text-white/50 hover:text-white'}`}>
              📖 Literacy
            </Link>
            <Link to="/LifeSkills51" className={`text-sm font-bold transition-colors ${location.pathname === '/LifeSkills51' ? 'text-rose-300' : 'text-white/50 hover:text-white'}`}>
              🌟 Life Skills
            </Link>
            <Link to="/Learn51About" className={`text-sm font-bold transition-colors ${location.pathname === '/Learn51About' ? 'text-cyan-300' : 'text-white/50 hover:text-white'}`}>
              <Info className="w-4 h-4 inline" />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-bold text-white/60 hidden sm:block">Menu</span>
          </button>
        </div>
      </div>

      {/* Page content */}
      <Outlet />

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}