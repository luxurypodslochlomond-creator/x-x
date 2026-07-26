import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

// ZAPP — for the children of Earth. Warm, alive, joyful. Built with love ♾️❤️
const BUDDIES = ['🐢', '🦊', '🐙', '🐦', '🦉', '🐿️'];

export default function ZappLoveBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative overflow-hidden rounded-2xl border-2 border-pink-500/30 px-6 py-10 sm:px-10 sm:py-12 text-center"
      style={{
        background:
          'radial-gradient(circle at 50% 0%, rgba(236,72,153,0.20), transparent 60%), radial-gradient(circle at 50% 100%, rgba(251,191,36,0.16), transparent 55%), #0f0a14',
      }}
    >
      {/* centered glowing bolt */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl sm:text-7xl select-none leading-none"
        style={{ filter: 'drop-shadow(0 0 24px rgba(236,72,153,0.65))' }}
      >
        ⚡
      </motion.div>

      <p className="text-[11px] font-mono tracking-[0.25em] text-pink-300/80 mt-4 mb-3">
        ZAPP · KIDS BUILD ANYTHING
      </p>
      <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white">
        for the children of earth
      </h2>
      <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed max-w-md mx-auto">
        build anything · any language · no account · just play.
      </p>

      {/* floating buddies — centered */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-5">
        {BUDDIES.map((b, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-2xl sm:text-3xl"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
          >
            {b}
          </motion.span>
        ))}
      </div>

      <Link to={createPageUrl('Zapp')} className="inline-block mt-6">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 font-black text-black px-7 py-3 rounded-full text-sm shadow-lg mx-auto"
          style={{
            background: 'linear-gradient(90deg,#fbbf24,#ec4899)',
            boxShadow: '0 8px 30px rgba(236,72,153,0.35)',
          }}
        >
          ZAPP IT ⚡
        </motion.button>
      </Link>
    </motion.div>
  );
}