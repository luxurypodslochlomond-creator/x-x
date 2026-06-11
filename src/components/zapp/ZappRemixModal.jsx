import React, { useState } from 'react';
import { motion } from 'framer-motion';

const REMIX_IDEAS = [
  { emoji: '🎃', label: 'Halloween theme' },
  { emoji: '🚀', label: 'Make it harder' },
  { emoji: '👥', label: 'Add multiplayer' },
  { emoji: '🌈', label: 'More colours' },
  { emoji: '⏱️', label: 'Add a timer' },
  { emoji: '🏆', label: 'Add leaderboard' },
  { emoji: '🔊', label: 'Bigger sounds' },
  { emoji: '😂', label: 'Make it funny' },
];

export default function ZappRemixModal({ original, onSubmit, onClose }) {
  const [instruction, setInstruction] = useState('');

  const handleQuick = (label) => {
    onSubmit(original, label);
  };

  const handleCustom = () => {
    if (instruction.trim().length < 3) return;
    onSubmit(original, instruction.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        className="w-full max-w-sm rounded-3xl p-6"
        style={{ background: '#0f0f1a', border: '1px solid rgba(244,114,182,0.3)', boxShadow: '0 0 60px rgba(219,39,119,0.25)' }}
      >
        <div className="text-center mb-5">
          <p className="text-4xl mb-2">🔀</p>
          <h3 className="text-white font-black text-xl">remix this app!</h3>
          <p className="text-white/30 text-sm mt-1">
            remixing: <span className="text-pink-300">{original.emoji} {original.title}</span>
          </p>
        </div>

        {/* Quick remix options */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {REMIX_IDEAS.map(r => (
            <motion.button
              key={r.label}
              onClick={() => handleQuick(r.label)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-bold text-sm text-white/80 transition-all"
              style={{ background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.2)' }}
            >
              <span className="text-lg">{r.emoji}</span>
              <span className="text-xs">{r.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Custom remix */}
        <div className="mb-4">
          <input
            type="text"
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            placeholder="or type your own twist..."
            className="w-full px-4 py-3 rounded-xl text-white font-bold text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', caretColor: '#f472b6' }}
            onKeyDown={e => e.key === 'Enter' && handleCustom()}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-black text-white/30 text-sm transition-colors hover:text-white/60"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >cancel</button>
          {instruction.trim().length >= 3 && (
            <motion.button
              onClick={handleCustom}
              whileTap={{ scale: 0.96 }}
              className="flex-1 py-3 rounded-xl font-black text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #db2777, #7c3aed)', boxShadow: '0 0 20px rgba(219,39,119,0.4)' }}
            >
              🔀 remix it ⚡
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}