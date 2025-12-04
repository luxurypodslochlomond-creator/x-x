
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Zap, Crown, Star, Rocket } from 'lucide-react';

export default function QuantumRewardAnimation({ show, tokens, onComplete }) {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    if (!show) return;
    
    const sequence = [
      { delay: 0, phase: 1 },
      { delay: 1000, phase: 2 },
      { delay: 2500, phase: 3 },
      { delay: 4000, phase: 0, complete: true }
    ];
    
    sequence.forEach(({ delay, phase, complete }) => {
      setTimeout(() => {
        setPhase(phase);
        if (complete && onComplete) onComplete();
      }, delay);
    });
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <style>{`
        .uf51-particles {
          background: linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #f7d794, #c44569, #f8b500, #a8e6cf, #ff8a80);
          background-size: 400% 400%;
          animation: uf51-flow 3s ease infinite;
        }
        
        @keyframes uf51-flow {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 50% 0%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 100%; }
        }
        
        .quantum-burst {
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          animation: quantum-pulse 2s ease-in-out infinite;
        }
        
        @keyframes quantum-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.7; }
        }
      `}</style>

      <AnimatePresence>
        {/* Phase 1: Particle Explosion */}
        {phase === 1 && (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-4 h-4 uf51-particles rounded-full"
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.02,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}

        {/* Phase 2: Token Display with UF51.LOVE Energy */}
        {phase >= 2 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="text-center space-y-8">
              <motion.div
                className="quantum-burst"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-300 bg-clip-text drop-shadow-2xl">
                  +{tokens}
                </div>
              </motion.div>
              
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️ UF51.LOVE ENERGY RECEIVED!
              </motion.div>

              <div className="flex justify-center items-center gap-6">
                {[Heart, Sparkles, Zap, Crown, Star, Rocket].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -30, 0],
                      rotate: [0, 360, 0],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Icon className="w-12 h-12 text-yellow-300 drop-shadow-lg" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 3: Final UF51.LOVE Signature */}
        {phase === 3 && (
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            <div className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text animate-pulse">
              ∞❤️ UF51.LOVE ❤️∞
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
