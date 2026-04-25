import React from 'react';
import { motion } from 'framer-motion';

export default function SortedLoader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Heart pulse */}
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.6))',
          }}
        >
          <path
            d="M24 42C24 42 6 30 6 20c0-5 4-8 8-8 3 0 5 1 6 3 1-2 3-3 6-3 4 0 8 3 8 8 0 10-18 22-18 22Z"
            fill="#f97316"
            stroke="#f97316"
            strokeWidth="1"
          />
        </motion.svg>

        {/* SORTED Text */}
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          SORTED
        </motion.div>

        {/* Animated dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [-6, 0, -6],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#f97316',
              }}
            />
          ))}
        </div>

        {/* Status text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 11,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.12em',
            fontWeight: 700,
            margin: 0,
          }}
        >
          DECODING...
        </motion.p>
      </motion.div>
    </div>
  );
}