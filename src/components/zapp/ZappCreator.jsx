import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_IDEAS = [
  { emoji: '🐴', label: 'Horse Quiz', idea: 'a quiz about horses with fun facts and a score at the end' },
  { emoji: '⚡', label: 'Clicker Game', idea: 'a cookie clicker game where you click a giant cookie to earn cookies and buy upgrades like grandmas and farms' },
  { emoji: '🎨', label: 'Pixel Art', idea: 'a pixel art drawing tool with a colour palette and a grid to draw on' },
  { emoji: '📖', label: 'Choose Your Story', idea: 'a choose your own adventure story where you explore a magical forest and make choices that change what happens' },
  { emoji: '🌈', label: 'Colour Mixer', idea: 'a colour mixing tool where you mix red, blue and yellow paint together to make new colours' },
  { emoji: '😊', label: 'Mood Tracker', idea: 'a mood tracker with emoji faces where you pick how you feel and it shows a chart of your week' },
  { emoji: '🃏', label: 'Card Game', idea: 'a snap card game you play against the computer with colourful cards' },
  { emoji: '🔢', label: 'Times Tables', idea: 'a fun times tables quiz that gives you points and a star when you get them right' },
  { emoji: '🌟', label: 'Wish Maker', idea: 'a magical wish maker where you type a wish and it sparkles and saves your wishes in a list' },
  { emoji: '🍕', label: 'Snack Rater', idea: 'an app to rate your favourite snacks out of 10 with funny comments and a leaderboard' },
];

export default function ZappCreator({ onSubmit }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (value.trim().length < 3) return;
    onSubmit(value.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 max-w-3xl"
      >
        <div className="text-5xl md:text-7xl font-black mb-3 leading-none tracking-tighter" style={{
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          what do you<br />want to build?
        </div>
        <p className="text-white/40 text-lg font-medium mt-3">
          tell me your idea — I'll build it in seconds ⚡
        </p>
      </motion.div>

      {/* Quick idea buttons — tap to instantly build */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-3xl mb-6"
      >
        <p className="text-white/25 text-xs font-bold tracking-widest text-center mb-3 font-mono">TAP TO BUILD INSTANTLY</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {QUICK_IDEAS.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => onSubmit(item.idea)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-1.5 px-3 py-4 rounded-2xl font-bold text-sm transition-all"
              style={{
                background: 'rgba(167, 139, 250, 0.08)',
                border: '2px solid rgba(167, 139, 250, 0.2)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-bold text-center leading-tight">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* OR divider */}
      <div className="flex items-center gap-4 w-full max-w-2xl mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/20 text-sm font-bold">or type your own idea</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Custom input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <div
          className="relative rounded-2xl transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: isFocused
              ? '2px solid rgba(167, 139, 250, 0.6)'
              : '2px solid rgba(255,255,255,0.08)',
            boxShadow: isFocused ? '0 0 40px rgba(167, 139, 250, 0.2)' : 'none'
          }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="a quiz about dinosaurs with 10 questions..."
            rows={2}
            className="w-full bg-transparent text-white text-lg font-medium px-5 pt-5 pb-3 resize-none outline-none placeholder-white/20 leading-relaxed"
            style={{ caretColor: '#a78bfa' }}
          />
          <div className="flex justify-end px-4 pb-4">
            <motion.button
              onClick={handleSubmit}
              disabled={value.trim().length < 3}
              whileHover={{ scale: value.trim().length >= 3 ? 1.05 : 1 }}
              whileTap={{ scale: value.trim().length >= 3 ? 0.97 : 1 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-base transition-all"
              style={{
                background: value.trim().length >= 3
                  ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                  : 'rgba(255,255,255,0.05)',
                color: value.trim().length >= 3 ? '#fff' : 'rgba(255,255,255,0.2)',
                boxShadow: value.trim().length >= 3 ? '0 0 30px rgba(124, 58, 237, 0.5)' : 'none'
              }}
            >
              <span>ZAPP it</span>
              <span className="text-lg">⚡</span>
            </motion.button>
          </div>
        </div>
        <p className="text-center text-white/20 text-xs mt-3">
          no account needed · nothing stored · safe for kids
        </p>
      </motion.div>
    </div>
  );
}