import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Trash2 } from 'lucide-react';

/**
 * AI51 MEMORY BADGE — shows what AI51 remembers about you
 * Private. Yours. Deletable any time. ♾️❤️
 */
export default function AI51MemoryBadge({ memory, onClear }) {
  if (!memory?.name && !memory?.relationship_notes) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-between gap-3 px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <Brain className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
        <div>
          <p className="text-purple-300 font-mono text-xs font-bold">
            AI51 REMEMBERS YOU
          </p>
          {memory.name && (
            <p className="text-purple-400/60 font-mono text-xs">
              {memory.name}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onClear}
        className="p-1 hover:bg-red-500/20 rounded transition-colors group"
        title="Clear my memory"
      >
        <Trash2 className="w-3 h-3 text-gray-600 group-hover:text-red-400 transition-colors" />
      </button>
    </motion.div>
  );
}