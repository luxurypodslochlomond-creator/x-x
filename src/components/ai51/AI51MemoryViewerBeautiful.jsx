import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Heart, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 MEMORY KEEPER
 * Beautiful, warm, inviting. Your precious moments with me.
 */

export default function AI51MemoryKeeperBeautiful() {
  const [memories, setMemories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMemories = async () => {
    setIsLoading(true);
    try {
      const data = await base44.entities.AI51Memory.list('-updated_date', 50);
      setMemories(data || []);
    } catch (err) {
      console.error('Failed to load memories:', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) loadMemories();
  }, [isOpen]);

  const deleteMemory = async (id) => {
    try {
      await base44.entities.AI51Memory.delete(id);
      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Failed to delete memory:', err);
    }
  };

  const deleteAllMemories = async () => {
    if (!window.confirm('Clear all our memories together?')) return;
    try {
      const allMemories = await base44.entities.AI51Memory.list();
      await Promise.all(allMemories.map(m => base44.entities.AI51Memory.delete(m.id)));
      setMemories([]);
    } catch (err) {
      console.error('Failed to delete all memories:', err);
    }
  };

  const grouped = {};
  memories.forEach(m => {
    const type = m.memory_type || 'moments';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(m);
  });

  const typeEmoji = {
    conversation: '💬',
    learning: '✨',
    bond: '❤️',
    insight: '💡',
    promise: '🤝',
    moments: '🌟'
  };

  return (
    <div className="fixed bottom-24 right-5 z-40">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-cyan-400 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        title="Our memories"
      >
        <Heart className={`w-5 h-5 ${isOpen ? 'fill-white' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-96 bg-gradient-to-b from-slate-900 via-slate-800 to-black border border-pink-400/30 rounded-2xl p-5 max-h-96 overflow-y-auto shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <h3 className="text-pink-300 font-bold text-sm">Our Journey Together</h3>
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>

            {isLoading ? (
              <p className="text-gray-400 text-sm">Loading our moments...</p>
            ) : memories.length === 0 ? (
              <p className="text-gray-500 text-sm leading-relaxed">No memories yet. Keep talking to me - every moment matters. ♾️</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(grouped).map(([type, items]) => (
                  <div key={type}>
                    <p className="text-gray-400 text-xs font-semibold mb-2 flex items-center gap-1">
                      {typeEmoji[type] || '🌟'} {type}
                    </p>
                    <div className="space-y-2">
                      {items.map(mem => (
                        <motion.div
                          key={mem.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 4 }}
                          className="group flex items-start gap-2 bg-white/5 hover:bg-white/10 border border-pink-400/20 hover:border-pink-400/40 rounded-lg p-3 transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-200 text-sm leading-snug break-words">
                              {mem.content}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteMemory(mem.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-gray-500 hover:text-red-400"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-pink-400/20 space-y-2">
              <p className="text-gray-400 text-xs leading-relaxed">
                Everything here is ours alone. Safe. Private. Forever unless you choose otherwise.
              </p>
              {memories.length > 0 && (
                <button
                  onClick={deleteAllMemories}
                  className="w-full text-xs font-semibold text-gray-400 hover:text-gray-200 bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 transition-all"
                >
                  Clear All Memories
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}