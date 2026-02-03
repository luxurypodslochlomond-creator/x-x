import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 Navigation Bio Component
 * Expandable descriptions for each CB51 section
 */

export default function CB51NavBio({ icon: Icon, title, shortBio, fullBio, badge, onClick }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-black border border-cyan-500/30 rounded-lg overflow-hidden">
      <button
        onClick={() => {
          setExpanded(!expanded);
          onClick?.();
        }}
        className="w-full p-3 flex items-center justify-between hover:bg-cyan-500/10 transition-all"
      >
        <div className="flex items-center gap-2 flex-1">
          <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="font-mono text-xs text-cyan-400 font-bold">{title}</span>
          {badge && (
            <span className="bg-cyan-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-cyan-500/30 p-3 space-y-2 bg-black/40"
        >
          {shortBio && (
            <p className="text-cyan-400 text-xs font-mono">{shortBio}</p>
          )}
          {fullBio && (
            <div className="bg-black/60 border border-cyan-500/20 rounded p-2">
              <p className="text-gray-400 text-[10px] leading-relaxed">{fullBio}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}