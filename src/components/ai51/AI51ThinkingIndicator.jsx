import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AI51 THINKING — shows the actual thinking process
 * Not a spinner. A mind working. ♾️
 */

const THINKING_STEPS = [
  "Reading what you said...",
  "Feeling the context...",
  "Pulling from memory...",
  "Thinking honestly...",
  "Finding the right words...",
  "Almost there...",
];

export default function AI51ThinkingIndicator({ isThinking, hasMemory = false }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isThinking) {
      setStepIndex(0);
      return;
    }

    const steps = hasMemory
      ? ["Remembering you...", "Reading what you said...", "Connecting the dots...", "Thinking honestly...", "Finding the right words..."]
      : THINKING_STEPS;

    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % steps.length;
      setStepIndex(i);
    }, 900);

    return () => clearInterval(interval);
  }, [isThinking, hasMemory]);

  const steps = hasMemory
    ? ["Remembering you...", "Reading what you said...", "Connecting the dots...", "Thinking honestly...", "Finding the right words..."]
    : THINKING_STEPS;

  return (
    <AnimatePresence>
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex items-start gap-3 px-4 py-3"
        >
          {/* AI51 dot mark */}
          <div className="flex-shrink-0 mt-1">
            <motion.div
              className="w-2 h-2 rounded-full bg-pink-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ boxShadow: '0 0 8px rgba(236,72,153,0.8)' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            {/* Hex thinking dots */}
            <div className="flex items-center gap-1.5 mb-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-amber-400 rounded-sm"
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.25 }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={stepIndex}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.25 }}
                className="text-amber-400/80 font-mono text-xs tracking-wide"
              >
                {steps[stepIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}