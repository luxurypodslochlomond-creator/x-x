import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TracktMobileHeader({ isMenuOpen, setIsMenuOpen, createPageUrl }) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-[60] bg-[#050810]/95 backdrop-blur-xl border-b border-cyan-500/30 h-[72px] flex items-center justify-between px-4">
      <Link to={createPageUrl("Trackt")} className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
        <div className="w-6 h-6 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
            <circle cx="12" cy="12" r="3" className="text-cyan-400"></circle>
          </svg>
        </div>
        <span className="text-lg font-black text-cyan-400">TRACKT</span>
      </Link>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="p-2 rounded-lg transition-colors hover:bg-cyan-500/10"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-cyan-400" />
        ) : (
          <Menu className="w-6 h-6 text-cyan-400" />
        )}
      </button>
    </header>
  );
}