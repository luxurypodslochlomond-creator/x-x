import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXAMPLE_IDEAS = [
  "a quiz about horses with fun facts",
  "a game where you click as fast as you can",
  "a story where YOU choose what happens next",
  "a sleepover planner for me and my friends",
  "a colour mixing tool that makes new colours",
  "a mood tracker with cute faces",
  "a timer that plays music when it ends",
  "a random joke generator",
  "an app to rate my favourite snacks",
  "a pixel art drawing tool",
];

export default function ZappCreator({ onSubmit }) {
  const [value, setValue] = useState('');
  const [currentExample, setCurrentExample] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample(prev => (prev + 1) % EXAMPLE_IDEAS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const useExample = () => {
    setValue(EXAMPLE_IDEAS[currentExample]);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
      
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12 max-w-2xl"
      >
        <div className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tighter" style={{
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          what do you<br />want to build?
        </div>
        <p className="text-white/40 text-lg font-medium mt-4">
          anything. seriously. just tell me.
        </p>
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl"
      >
        <div
          className="relative rounded-2xl transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: isFocused
              ? '2px solid rgba(167, 139, 250, 0.6)'
              : '2px solid rgba(255,255,255,0.08)',
            boxShadow: isFocused
              ? '0 0 40px rgba(167, 139, 250, 0.2), inset 0 0 20px rgba(167, 139, 250, 0.05)'
              : 'none'
          }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="a quiz about my dog..."
            rows={3}
            className="w-full bg-transparent text-white text-xl font-medium px-6 pt-6 pb-4 resize-none outline-none placeholder-white/20 leading-relaxed"
            style={{ caretColor: '#a78bfa' }}
            autoFocus
          />

          <div className="flex items-center justify-between px-4 pb-4">
            {/* Example rotator */}
            <button
              onClick={useExample}
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors group"
            >
              <span className="text-violet-400 group-hover:text-violet-300">try:</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentExample}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="truncate max-w-xs"
                >
                  {EXAMPLE_IDEAS[currentExample]}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Build button */}
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
                boxShadow: value.trim().length >= 3
                  ? '0 0 30px rgba(124, 58, 237, 0.5)'
                  : 'none'
              }}
            >
              <span>ZAPP it</span>
              <span className="text-lg">⚡</span>
            </motion.button>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-white/20 text-sm mt-4 font-medium">
          press enter or tap ZAPP it — no account needed, nothing stored
        </p>
      </motion.div>

      {/* What kids have built */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-16 flex flex-wrap gap-2 justify-center max-w-2xl"
      >
        {['horse quiz', 'click game', 'colour mixer', 'dream diary', 'snack rater', 'story chooser', 'pixel art', 'mood tracker'].map((tag) => (
          <button
            key={tag}
            onClick={() => setValue(`a ${tag}`)}
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white/40 hover:text-white/80 transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {tag}
          </button>
        ))}
      </motion.div>
    </div>
  );
}