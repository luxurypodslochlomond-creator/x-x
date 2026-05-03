import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import CTRL51Icon from './CTRL51Icon';

export default function CTRL51Header({ showBack = false }) {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link to="/CTRL51" className="p-2 hover:bg-cyan-500/10 rounded-lg transition">
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
            </Link>
          )}
          <Link to="/CTRL51" className="flex items-center gap-2">
            <CTRL51Icon size={32} animate={false} />
            <span className="font-black text-lg text-cyan-400">CTRL51</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm font-bold">
          <Link to="/CTRL51" className="text-gray-400 hover:text-cyan-400 transition">Platform</Link>
          <Link to="/CTRL51Pricing" className="text-gray-400 hover:text-cyan-400 transition">Pricing</Link>
          <a href="mailto:hello@ctrl51.uk" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-cyan-500/10 text-cyan-400 transition">
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}