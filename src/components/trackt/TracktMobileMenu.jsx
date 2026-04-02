import React from 'react';
import { Link } from 'react-router-dom';

export default function TracktMobileMenu({ isOpen, setIsOpen, navItems, createPageUrl, isActivePage }) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 top-[72px] bg-[#050810]/95 backdrop-blur-xl z-[50] overflow-y-auto pb-6">
      <div className="p-6 space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.url}
            to={item.url}
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-lg transition-all border ${
              isActivePage(item.url)
                ? 'bg-cyan-500/10 border-cyan-500/60 text-cyan-400 font-bold'
                : 'border-cyan-500/20 text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5'
            }`}
          >
            <span className="font-bold">{item.title}</span>
            {item.description && (
              <span className="text-xs text-cyan-300/60 block mt-1">{item.description}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}