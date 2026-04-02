import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Signal } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Product', path: '/Trackt' },
  { label: 'Pricing', path: '/TracktPricing' },
  { label: 'About', path: '/TracktAbout' },
];

const FOOTER_LINKS = [
  { label: 'Terms', path: '/TracktTerms' },
  { label: 'Privacy', path: '/TracktPrivacy' },
  { label: 'Pricing', path: '/TracktPricing' },
  { label: 'About', path: '/TracktAbout' },
];

export default function TracktLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#050810] text-white flex flex-col">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050810]/95 backdrop-blur-xl">
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
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 font-mono text-xs tracking-wider transition-colors rounded-sm ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@trackt.io"
              className="hidden md:inline-flex items-center justify-center px-4 py-1.5 bg-cyan-500 text-black font-bold font-mono text-xs hover:bg-cyan-400 transition-colors rounded-sm"
            >
              REQUEST DEMO
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#050810] px-6 py-4 space-y-2">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 font-mono text-sm tracking-wider transition-colors ${
                  isActive(link.path) ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            <a
              href="mailto:hello@trackt.io"
              className="block mt-3 text-center py-2 bg-cyan-500 text-black font-bold font-mono text-xs rounded-sm"
            >
              REQUEST DEMO
            </a>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 pt-14">
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