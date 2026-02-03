import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, X } from 'lucide-react';

export default function CB51ErrorDisplay({ error, onDismiss, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[200]"
    >
      <div className="bg-black border-2 border-red-500/50 rounded-lg p-3 shadow-lg backdrop-blur-sm max-w-sm">
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="flex-shrink-0 mt-0.5"
          >
            <Radio className="w-5 h-5 text-red-400" strokeWidth={2.5} />
          </motion.div>
          <div className="flex-1">
            <p className="text-red-400 font-black font-mono text-xs leading-tight">
              {error || 'Something went wrong'}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onDismiss?.();
            }}
            className="flex-shrink-0 text-red-400/60 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}