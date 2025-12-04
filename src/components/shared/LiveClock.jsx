import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * UNIVERSAL ATOMIC CLOCK - 8-BIT STYLE
 * Shows UTC time (same everywhere on Earth)
 * Earth rotates quote
 */
export default function LiveClock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // LOCAL time - shows YOUR time wherever you are
  const hours = time.getHours().toString().padStart(2, '0');
  const mins = time.getMinutes().toString().padStart(2, '0');
  const secs = time.getSeconds().toString().padStart(2, '0');
  
  // Local date
  const localDate = time.toLocaleDateString('en-GB', { 
    weekday: 'short',
    day: 'numeric', 
    month: 'short', 
    year: 'numeric'
  });

  return (
    <div className="py-3 text-center space-y-2">
      {/* 8-BIT ATOMIC CLOCK */}
      <div className="inline-flex items-center gap-1 bg-black border-4 border-cyan-500 px-4 py-2">
        <motion.span 
          className="text-2xl font-black font-mono text-cyan-400"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {hours}
        </motion.span>
        <span className="text-2xl font-black font-mono text-pink-500">:</span>
        <motion.span 
          className="text-2xl font-black font-mono text-cyan-400"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.33 }}
        >
          {mins}
        </motion.span>
        <span className="text-2xl font-black font-mono text-pink-500">:</span>
        <motion.span 
          className="text-2xl font-black font-mono text-cyan-400"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.66 }}
        >
          {secs}
        </motion.span>
      </div>
      
      {/* DATE */}
      <p className="text-xs font-mono text-gray-500">{localDate}</p>
      

    </div>
  );
}