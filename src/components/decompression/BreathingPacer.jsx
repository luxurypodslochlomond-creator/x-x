import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * BREATHING PACER
 * 0.1Hz breathing (6 breaths/minute) for HRV coherence
 * HeartMath validated - most effective breathing rate
 */

export default function BreathingPacer({ active, color = 'rgba(236, 72, 153, 0.8)' }) {
  const [phase, setPhase] = useState('inhale');
  const [progress, setProgress] = useState(0);
  const animRef = useRef(null);
  const startRef = useRef(null);

  // 10 second cycle = 0.1Hz
  // 4s inhale, 1s hold, 5s exhale
  const INHALE = 4000;
  const HOLD = 1000;
  const EXHALE = 5000;
  const CYCLE = INHALE + HOLD + EXHALE;

  useEffect(() => {
    if (!active) {
      setPhase('inhale');
      setProgress(0);
      return;
    }

    startRef.current = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startRef.current) % CYCLE;
      
      if (elapsed < INHALE) {
        setPhase('inhale');
        setProgress(elapsed / INHALE);
      } else if (elapsed < INHALE + HOLD) {
        setPhase('hold');
        setProgress(1);
      } else {
        setPhase('exhale');
        setProgress(1 - (elapsed - INHALE - HOLD) / EXHALE);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;

  const size = 120 + progress * 80; // 120px to 200px
  const opacity = 0.3 + progress * 0.5;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Breathing circle */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
        <motion.div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: color,
            opacity: opacity,
            boxShadow: `0 0 ${30 + progress * 40}px ${color}`
          }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-2xl font-bold uppercase tracking-widest">
            {phase === 'inhale' && 'Breathe In'}
            {phase === 'hold' && 'Hold'}
            {phase === 'exhale' && 'Breathe Out'}
          </span>
        </div>
      </div>

      {/* HRV info */}
      <div className="text-center">
        <p className="text-white/60 text-xs">0.1Hz Coherent Breathing</p>
        <p className="text-white/40 text-xs">HeartMath validated</p>
      </div>
    </div>
  );
}