import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SortedPageTransition({ isTransitioning }) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'rgba(8, 10, 15, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Minimal spinning circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '2px solid rgba(249, 115, 22, 0.3)',
                borderTopColor: '#f97316',
                borderRightColor: '#f97316',
              }}
            />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#f97316' }}>SORTED</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}