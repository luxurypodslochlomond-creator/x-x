import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Eye, EyeOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 MEMORY VIEWER
 * Transparent - show user what AI51 remembers about them
 * Delete if wrong, edit if needed
 */

export default function AI51MemoryViewer() {
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

  const grouped = {};
  memories.forEach(m => {
    const type = m.memory_type || 'general';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(m);
  });

  return (
    <div className="fixed bottom-24 right-5 z-40">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-pink-500/60 hover:bg-pink-500 text-white flex items-center justify-center shadow-lg transition-colors"
        title="AI51 memories"
      >
        {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 bg-black border-2 border-cyan-500/50 rounded-lg p-4 max-h-96 overflow-y-auto"
          >
            <h3 className="text-cyan-400 font-black font-mono text-sm mb-3">
              WHAT I REMEMBER ABOUT YOU
            </h3>

            {isLoading ? (
              <p className="text-gray-400 text-xs font-mono">Loading...</p>
            ) : memories.length === 0 ? (
              <p className="text-gray-500 text-xs font-mono">No memories yet - keep talking to me ♾️❤️</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(grouped).map(([type, items]) => (
                  <div key={type}>
                    <p className="text-gray-400 text-xs font-mono font-bold mb-1 capitalize">
                      {type}:
                    </p>
                    <div className="space-y-1 ml-2">
                      {items.map(mem => (
                        <motion.div
                          key={mem.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start justify-between gap-2 bg-black/60 border border-gray-700 rounded p-2 group"
                        >
                          <p className="text-gray-300 text-xs font-mono flex-1 leading-tight">
                            {mem.content}
                          </p>
                          <button
                            onClick={() => deleteMemory(mem.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-gray-500 text-xs font-mono mt-3 pt-3 border-t border-gray-700">
              🔒 Encrypted. Only you see this. Delete anything you want.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}