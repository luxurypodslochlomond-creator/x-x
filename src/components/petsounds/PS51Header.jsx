import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Heart } from 'lucide-react';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

export default function PS51Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-50 to-yellow-50 border-b-2 border-orange-300 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT: Small UF51 Link */}
        <Link 
          to={createPageUrl("FrequencyChamber")} 
          className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
        >
          <COOLASFUCKWaves size={24} animate={true} />
          <span className="text-xs font-black text-orange-700 tracking-wider">UF51 HEAL</span>
        </Link>

        {/* RIGHT: Desktop Nav + Menu */}
        <div className="hidden sm:flex items-center gap-3">
          <Link 
            to={createPageUrl("PetSounds51Terms")} 
            className="text-xs font-bold text-amber-700 hover:text-orange-700 transition-colors"
          >
            Terms
          </Link>
          <span className="text-amber-700">•</span>
          <Link 
            to={createPageUrl("PrivacyPolicy")} 
            className="text-xs font-bold text-amber-700 hover:text-orange-700 transition-colors"
          >
            Privacy
          </Link>
          <span className="text-amber-700">•</span>
          <a 
            href="https://base44.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-700 hover:text-orange-700 transition-colors"
          >
            Built on Base44
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 hover:bg-orange-100 rounded-lg transition-colors"
        >
          {menuOpen ? (
            <X className="w-5 h-5 text-orange-700" />
          ) : (
            <Menu className="w-5 h-5 text-orange-700" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden bg-orange-100/80 border-t-2 border-orange-300 p-4 space-y-3">
          <Link 
            to={createPageUrl("PetSounds51Terms")} 
            className="block text-sm font-bold text-amber-900 hover:text-orange-700"
            onClick={() => setMenuOpen(false)}
          >
            Terms & Conditions
          </Link>
          <Link 
            to={createPageUrl("PrivacyPolicy")} 
            className="block text-sm font-bold text-amber-900 hover:text-orange-700"
            onClick={() => setMenuOpen(false)}
          >
            Privacy Policy
          </Link>
          <a 
            href="https://base44.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-sm font-bold text-amber-900 hover:text-orange-700"
          >
            Built on Base44
          </a>
        </div>
      )}
    </header>
  );
}