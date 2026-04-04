import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Signal } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Product', path: '/Trackt' },
  { label: 'Live Dashboard', path: '/TracktDashboard', highlight: true },
  { label: 'Roadmap', path: '/TracktRoadmap' },
  { label: 'How It Works', path: '/TracktHowItWorks' },
  { label: 'Why Buy', path: '/TracktWhyBuy' },
  { label: 'Pricing', path: '/TracktPricing' },
  { label: 'Terms', path: '/TracktTerms', secondary: true },
  { label: 'Privacy', path: '/TracktPrivacy', secondary: true },
];

const FOOTER_LINKS = [
  { label: 'Terms', path: '/TracktTerms' },
  { label: 'Privacy', path: '/TracktPrivacy' },
  { label: 'Pricing', path: '/TracktPricing' },
  { label: 'Roadmap', path: '/TracktRoadmap' },
  { label: 'How It Works', path: '/TracktHowItWorks' },
];

export default function TracktLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#050810] text-white flex flex-col">
      {/* MOBILE HEADER - MINIMAL */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[60] bg-[#050810]/95 backdrop-blur-xl border-b border-cyan-500/30 h-[72px] flex items-center justify-between px-4">
        <Link to="/Trackt" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Signal className="w-5 h-5 text-cyan-400" />
          <span className="text-lg font-black text-cyan-400">TRACKT</span>
        </Link>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="p-2 rounded-lg transition-colors hover:bg-cyan-500/10"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-cyan-400" />
          ) : (
            <Menu className="w-6 h-6 text-cyan-400" />
          )}
        </button>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-[#050810]/95 backdrop-blur-xl z-[50] overflow-y-auto pb-6">
          <div className="p-6 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all border text-sm uppercase font-bold ${
                  isActive(link.path)
                    ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-400'
                    : link.highlight
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20'
                    : link.secondary
                    ? 'border-gray-700/30 text-gray-400 hover:border-gray-600/50'
                    : 'border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:hello@trackt.io"
              className="block w-full mt-4 text-center py-3 bg-cyan-500 text-black font-bold font-mono text-sm rounded-sm hover:bg-cyan-400 transition-colors"
            >
              REQUEST DEMO
            </a>
          </div>
        </div>
      )}

      {/* DESKTOP HEADER */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050810]/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/Trackt" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1.5 border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <Signal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-400 font-black font-mono tracking-widest text-sm">TRACKT</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 font-mono text-xs tracking-wider transition-colors rounded-sm ${
                  link.secondary
                    ? isActive(link.path)
                      ? 'text-gray-500 bg-gray-500/10 border border-gray-500/20'
                      : 'text-gray-600 hover:text-gray-400'
                    : isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="mailto:hello@trackt.io"
            className="inline-flex items-center justify-center px-4 py-1.5 bg-cyan-500 text-black font-bold font-mono text-xs hover:bg-cyan-400 transition-colors rounded-sm"
          >
            REQUEST DEMO
          </a>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 lg:pt-14 pt-[72px]">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Signal className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-black font-mono tracking-widest text-sm">TRACKT</span>
            <span className="text-gray-700 font-mono text-xs ml-2">AI-powered RFID intelligence</span>
          </div>
          <nav className="flex items-center gap-4 flex-wrap justify-center">
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-gray-400 font-mono text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a href="mailto:hello@trackt.io" className="text-gray-600 hover:text-cyan-400 font-mono text-xs transition-colors">
              hello@trackt.io
            </a>
          </nav>
          <p className="text-gray-700 font-mono text-xs">ISV partner — Urovo RFID</p>
        </div>
      </footer>
    </div>
  );
}