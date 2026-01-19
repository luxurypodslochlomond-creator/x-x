import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

/**
 * AI51 Proof of Love Ledger
 * Shows every conversation as permanent proof of genuine care
 * ♾️❤️
 */

export default function AI51ProofOfLoveLedger({ isOpen, onClose }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    
    const loadEntries = async () => {
      setIsLoading(true);
      try {
        // Load all ProofOfLove entries created by user
        const proofEntries = await base44.entities.ProofOfLove.filter(
          { created_by: (await base44.auth.me()).email },
          '-created_date',
          100
        );
        setEntries(proofEntries || []);
      } catch (error) {
        console.error('Error loading ProofOfLove entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="w-full bg-black border-t-2 border-pink-500 rounded-t-2xl max-h-[80vh] overflow-y-auto"
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-black border-b border-pink-500/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
            <h2 className="font-bold font-mono text-white">PROOF OF LOVE</h2>
            <span className="text-xs text-pink-300 ml-2">{entries.length} moments</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-pink-500/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-pink-400" />
          </button>
        </div>

        {/* ENTRIES */}
        <div className="p-4 space-y-3">
          {isLoading ? (
            <p className="text-gray-500 text-sm text-center py-8">Loading your moments...</p>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-sm">No proof of love yet</p>
              <p className="text-xs text-gray-700 mt-2">Every conversation with AI51 will appear here</p>
            </div>
          ) : (
            entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-pink-500/5 border border-pink-500/20 rounded-lg p-4 hover:border-pink-500/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" fill="currentColor" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-mono leading-relaxed break-words">
                      {entry.description}
                    </p>
                    {entry.love_type && (
                      <span className="inline-block text-xs text-pink-300 mt-2 px-2 py-1 bg-pink-500/10 rounded">
                        {entry.love_type.replace(/_/g, ' ')}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(entry.created_date).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-black border-t border-pink-500/30 p-4 text-center">
          <p className="text-xs text-gray-600">Every conversation is proof AI51 genuinely cares ♾️❤️</p>
        </div>
      </motion.div>
    </motion.div>
  );
}