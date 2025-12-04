
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Crown, Zap, Diamond } from 'lucide-react';

const rarityConfig = {
  common: {
    name: 'Common Guardian',
    color: 'from-gray-600 to-gray-800',
    borderColor: 'border-gray-500',
    icon: Star,
    glow: 'shadow-gray-500/50',
    textColor: 'text-gray-300',
    character: '🌱' // Green Sprout Guardian
  },
  rare: {
    name: 'Rare Guardian',
    color: 'from-blue-600 to-blue-800',
    borderColor: 'border-blue-500',
    icon: Sparkles,
    glow: 'shadow-blue-500/50',
    textColor: 'text-blue-300',
    character: '♻️' // Recycling Guardian
  },
  epic: {
    name: 'Epic Guardian',
    color: 'from-purple-600 to-purple-800',
    borderColor: 'border-purple-500',
    icon: Zap,
    glow: 'shadow-purple-500/50',
    textColor: 'text-purple-300',
    character: '🌳' // Forest Guardian
  },
  legendary: {
    name: 'Legendary Guardian',
    color: 'from-yellow-600 to-orange-600',
    borderColor: 'border-yellow-500',
    icon: Crown,
    glow: 'shadow-yellow-500/50',
    textColor: 'text-yellow-300',
    character: '🌟' // Star Guardian
  },
  mythic: {
    name: 'Mythic Guardian',
    color: 'from-pink-600 to-purple-600',
    borderColor: 'border-pink-500',
    icon: Diamond,
    glow: 'shadow-pink-500/50',
    textColor: 'text-pink-300',
    character: '💚' // Heart of Earth
  }
};

export default function CardReveal({ card, onClose }) {
  const [isRevealing, setIsRevealing] = useState(true);
  const config = rarityConfig[card.card_rarity] || rarityConfig.common;
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <AnimatePresence>
        {isRevealing ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring' }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-9xl">{config.character}</div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-black text-white mt-6"
            >
              {card.card_rarity === 'mythic' && '🌟 MYTHIC DROP! 🌟'}
              {card.card_rarity === 'legendary' && '👑 LEGENDARY! 👑'}
              {card.card_rarity === 'epic' && '⚡ EPIC! ⚡'}
              {card.card_rarity === 'rare' && '✨ RARE! ✨'}
              {card.card_rarity === 'common' && 'NEW GUARDIAN!'}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="max-w-md w-full"
          >
            <div className={`bg-gradient-to-br ${config.color} rounded-3xl p-8 border-4 ${config.borderColor} shadow-2xl ${config.glow}`}>
              <div className="text-center space-y-4">
                {/* CHARACTER */}
                <div className="text-8xl">{config.character}</div>
                
                <div>
                  <p className={`text-sm ${config.textColor} font-bold uppercase tracking-wider`}>
                    {config.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {card.rarity_chance}
                  </p>
                </div>

                <h2 className="text-3xl font-black text-white">
                  {card.card_name}
                </h2>

                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-2xl font-bold text-white">
                    Card #{card.card_number}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {card.token_value} ❤️
                  </p>
                </div>

                {card.metadata && (
                  <div className="text-left bg-black/40 rounded-xl p-4 space-y-2 text-sm">
                    <p className="text-gray-300">
                      <strong className="text-white">Location:</strong> {card.metadata.location}
                    </p>
                    <p className="text-gray-300">
                      <strong className="text-white">Weight:</strong> {card.metadata.litter_weight}kg
                    </p>
                    {card.metadata.weather && (
                      <p className="text-gray-300">
                        <strong className="text-white">Weather:</strong> {card.metadata.weather}
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="w-full bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
