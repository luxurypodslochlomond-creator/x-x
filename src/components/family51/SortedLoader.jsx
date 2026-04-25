import React from 'react';
import { motion } from 'framer-motion';

export default function SortedLoader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.6)',
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
          gap: 24,
        }}
      >
        {/* SORTED Logo Pulse */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.03em',
            textShadow: '0 0 20px rgba(249, 115, 22, 0.4)',
          }}
        >
          SORTED
        </motion.div>

        {/* Animated dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [-8, 0, -8],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              style={{
                width: 10,
                height: 10,
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
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.1em',
            fontWeight: 600,
            margin: 0,
          }}
        >
          DECODING...
        </motion.p>
      </motion.div>
    </div>
  );
}