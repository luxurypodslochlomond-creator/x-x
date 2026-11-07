import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
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
    ]
  },
  {
    section: '♾️ Keep It Free',
    items: [
      { label: 'Support Learn51', sub: 'Donate · keep it free forever', url: '/SupportLearn51', emoji: '💜', highlight: true, donate: true },
    ]
  },
  {
    section: '📋 Legal',
    items: [
      { label: 'Terms of Use', sub: 'How Learn51 works', url: '/Learn51Terms', emoji: '📋' },
      { label: 'Privacy Policy', sub: 'No data. Honest.', url: '/Learn51Privacy', emoji: '🔒' },
    ]
  },
];

function MobileMenu({ onClose }) {
  const navigate = useNavigate();

  const handleNav = (url) => {
    onClose();
    setTimeout(() => navigate(url), 50);
  };

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
                <button
                  key={item.url}
                  onClick={() => handleNav(item.url)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                    item.donate
                      ? 'border-emerald-400/50 bg-emerald-500/10 hover:bg-emerald-500/20'
                      : item.highlight
                      ? 'border-violet-400/50 bg-violet-500/15 hover:bg-violet-500/25'
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-sm ${item.donate ? 'text-emerald-300' : item.highlight ? 'text-violet-200' : 'text-white'}`}>{item.label}</p>
                    <p className="text-white/40 text-xs">{item.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* CIC Mission footer */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2">
            <span className="text-emerald-400 text-xs font-black">CIC</span>
            <span className="text-white/50 text-xs">Universal Frequency 51</span>
          </div>
          <p className="text-white/30 text-xs">Free for every child on Earth · No login · No data</p>
          <p className="text-white/20 text-xs">
            <a href="mailto:family@uf51.love" className="hover:text-violet-400 transition-colors">family@uf51.love</a>
          </p>
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
      {/* TOP NAV — Learn51 only — universal design: breathable, high contrast, generous targets */}
      <div
        className="sticky top-0 z-40 backdrop-blur-xl px-4 py-3"
        style={{
          background: 'rgba(5,8,15,0.96)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Wordmark — gradient, large, clear */}
          <Link
            to="/Learn51"
            className="font-black tracking-tight leading-none"
            style={{
              fontSize: '20px',
              background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 60%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Learn51
          </Link>

          {/* Desktop quick links — generous spacing */}
          <div className="hidden md:flex items-center gap-5">
            {[
              { to: '/Learn51AI', label: '◈ AI Tutor', active: '#a78bfa' },
              { to: '/Literacy51', label: '⌘ Literacy', active: '#34d399' },
              { to: '/LifeSkills51', label: '◉ Life Skills', active: '#f472b6' },
              { to: '/YoungWarriors', label: '◎ Real World', active: '#f59e0b' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-bold transition-colors"
                style={{
                  fontSize: '13px',
                  color: location.pathname === link.to ? link.active : 'rgba(255,255,255,0.38)',
                  fontFamily: '"Courier New", monospace',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: donate + menu — large tap targets */}
          <div className="flex items-center gap-2">
            <Link
              to="/SupportLearn51"
              className="hidden sm:flex items-center gap-1.5 font-black transition-all active:scale-95"
              style={{
                fontSize: '12px',
                color: '#34d399',
                background: 'rgba(16,185,129,0.10)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: '12px',
                padding: '6px 12px',
              }}
            >
              ♾️ Donate
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center transition-all active:scale-95"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <Outlet />
      {/* Dignified support link */}
      <div className="text-center py-6 border-t border-white/5 space-y-2">
        <Link to="/SupportLearn51" className="block text-white/20 hover:text-violet-400 text-xs transition-colors">
          ♾️ Keep Learn51 free — donate
        </Link>
        <Link to="/XEqualsX" className="block text-[#cc2d2a] hover:text-white/60 text-[10px] tracking-[0.3em] font-mono transition-colors">
          x = x
        </Link>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}