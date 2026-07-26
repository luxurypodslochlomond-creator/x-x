import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZAPP_ANIMALS, randomAnimalId } from '@/components/zapp/ZappAnimals';

// First-visit only. The kid meets their build buddy — a gentle, calm choice.
// No timer, no streak, no pressure. They can pick, get a surprise, or skip.
export default function ZappBuddyPicker({ onChoose }) {
  const [hovered, setHovered] = useState(null);

  const pick = (id) => {
    onChoose(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center px-5 overflow-y-auto"
      style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(8px)', WebkitOverflowScrolling: 'touch' }}
    >
      <div className="my-auto w-full max-w-2xl flex flex-col items-center py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="text-center mb-6 max-w-md"
      >
        <p className="text-white/30 text-xs font-black tracking-widest uppercase mb-3">meet your build buddy</p>
        <h1 className="font-black leading-tight mb-3" style={{
          fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          who should help you build?
        </h1>
        <p className="text-white/40 text-sm leading-relaxed">
          they change how your apps feel —<br />and remember you next time.<br /><span className="text-white/30">only on your device, not ours.</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl w-full mb-6">
        {ZAPP_ANIMALS.map((a, i) => (
          <motion.button
            key={a.id}
            onClick={() => pick(a.id)}
            onHoverStart={() => setHovered(a.id)}
            onHoverEnd={() => setHovered(null)}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex flex-col items-center justify-center p-4 overflow-hidden"
            style={{
              background: hovered === a.id ? `${a.color}18` : 'rgba(255,255,255,0.03)',
              border: `1.5px solid ${hovered === a.id ? a.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 22,
              minHeight: 130,
              transition: 'background 0.2s, border-color 0.2s',
              boxShadow: hovered === a.id ? `0 0 24px ${a.color}40` : 'none',
            }}
          >
            <motion.div
              animate={hovered === a.id ? { scale: 1.15, rotate: [0, -4, 4, 0] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: 40, marginBottom: 6, filter: `drop-shadow(0 0 12px ${a.color}60)` }}
            >
              {a.emoji}
            </motion.div>
            <span className="font-black text-sm" style={{ color: a.accent }}>{a.name}</span>
            <span className="text-white/30 text-[10px] mt-1 text-center leading-tight px-1">{a.tagline}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        {hovered && (() => {
          const a = ZAPP_ANIMALS.find(x => x.id === hovered);
          return (
            <motion.p
              key={a.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/55 text-sm text-center max-w-sm leading-relaxed italic"
            >
              "{a.bio}"
            </motion.p>
          );
        })()}

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => pick(randomAnimalId())}
            className="text-white/40 hover:text-white/70 text-xs font-bold transition-colors px-3 py-2"
          >
            🎲 surprise me
          </button>
          <button
            onClick={() => pick(null)}
            className="text-white/30 hover:text-white/50 text-xs font-bold transition-colors px-3 py-2"
          >
            skip for now
          </button>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}