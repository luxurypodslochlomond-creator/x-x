import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Zap, Star } from 'lucide-react';

/**
 * UNLOCK PROGRESS TRACKER
 * Shows next unlock based on total cleanups
 * No credit system - pure progression
 */

const UNLOCKS = [
  {
    cleanup_count: 1,
    name: 'First Step',
    emoji: '🌱',
    description: 'You\'ve started healing Earth',
    rarity: 'common'
  },
  {
    cleanup_count: 5,
    name: 'Volckano Skin: Fire',
    emoji: '🔥',
    description: 'In-game cosmetic for Volckano',
    rarity: 'rare'
  },
  {
    cleanup_count: 10,
    name: 'Green Card Badge',
    emoji: '💚',
    description: 'Display badge - proven hero',
    rarity: 'rare'
  },
  {
    cleanup_count: 20,
    name: 'Volckano Double Speed',
    emoji: '⚡',
    description: 'Game power-up - 2x movement speed',
    rarity: 'epic'
  },
  {
    cleanup_count: 50,
    name: 'Healing Frequency: Earth Resonance',
    emoji: '🌍',
    description: 'Exclusive Schumann + custom blend',
    rarity: 'epic'
  },
  {
    cleanup_count: 100,
    name: 'Legendary Status',
    emoji: '👑',
    description: 'Elite cleanup warrior - unlimited store discount',
    rarity: 'legendary'
  },
  {
    cleanup_count: 500,
    name: 'Guardian of Earth51',
    emoji: '♾️',
    description: 'Highest honor - lifetime access to all features',
    rarity: 'legendary'
  }
];

export default function UnlockProgressTracker({ totalCleanups = 0 }) {
  const [nextUnlock, setNextUnlock] = useState(null);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    // Find next unlock
    const unlocked = UNLOCKS.filter(u => totalCleanups >= u.cleanup_count);
    setUnlockedCount(unlocked.length);

    const next = UNLOCKS.find(u => totalCleanups < u.cleanup_count);
    if (next) {
      setNextUnlock(next);
      const prev = UNLOCKS[UNLOCKS.indexOf(next) - 1];
      const prevCount = prev ? prev.cleanup_count : 0;
      const progress = ((totalCleanups - prevCount) / (next.cleanup_count - prevCount)) * 100;
      setProgressPercent(Math.min(progress, 100));
    } else {
      setNextUnlock(null);
      setProgressPercent(100);
    }
  }, [totalCleanups]);

  return (
    <div className="space-y-6">
      {/* UNLOCKED COUNT */}
      <div className="text-center">
        <div className="text-4xl font-black font-mono text-green-400 mb-1">
          {unlockedCount}/{UNLOCKS.length}
        </div>
        <p className="text-gray-400 font-mono text-xs">UNLOCKS EARNED</p>
      </div>

      {/* NEXT UNLOCK */}
      {nextUnlock && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black border-4 border-yellow-500 p-4"
        >
          <p className="text-gray-400 font-mono text-xs mb-2">NEXT UNLOCK</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{nextUnlock.emoji}</span>
              <div>
                <p className="text-white font-black font-mono text-sm">{nextUnlock.name}</p>
                <p className="text-gray-500 text-xs">{nextUnlock.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black font-mono text-yellow-400">
                {nextUnlock.cleanup_count}
              </p>
              <p className="text-gray-500 text-xs">cleanups</p>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="bg-black/60 border border-yellow-500/30 h-2">
            <motion.div
              className="h-full bg-yellow-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-gray-500 text-xs font-mono mt-2 text-center">
            {totalCleanups} / {nextUnlock.cleanup_count}
          </p>
        </motion.div>
      )}

      {/* ALL UNLOCKS - VISUAL LADDER */}
      <div className="bg-black border-4 border-cyan-500/30 p-4">
        <p className="text-cyan-400 font-black font-mono text-sm mb-3">UNLOCK ROADMAP</p>
        <div className="space-y-2">
          {UNLOCKS.map((unlock, i) => {
            const isUnlocked = totalCleanups >= unlock.cleanup_count;
            return (
              <motion.div
                key={i}
                className={`p-2 flex items-center gap-2 border-2 transition-all ${
                  isUnlocked
                    ? 'border-green-500 bg-green-900/20'
                    : 'border-gray-700 bg-black/40'
                }`}
                whileHover={{ x: 4 }}
              >
                {isUnlocked ? (
                  <Unlock className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                )}
                <span className="text-2xl">{unlock.emoji}</span>
                <div className="flex-1">
                  <p className={`font-black font-mono text-xs ${
                    isUnlocked ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {unlock.name}
                  </p>
                </div>
                <p className={`font-mono text-[10px] ${
                  isUnlocked ? 'text-green-400' : 'text-gray-600'
                }`}>
                  {unlock.cleanup_count}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* PHILOSOPHY */}
      <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-2 border-pink-500 p-3">
        <p className="text-pink-400 font-black text-xs font-mono mb-1">NO CREDIT SYSTEM</p>
        <p className="text-white font-mono text-xs leading-relaxed">
          Every cleanup = real P51 today. Every cleanup unlocks something real. Keep going. The rewards never stop. ♾️❤️
        </p>
      </div>
    </div>
  );
}