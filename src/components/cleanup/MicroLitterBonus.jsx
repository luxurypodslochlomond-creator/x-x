import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MicroLitterBonus({ itemCount, baseTokens }) {
  // Micro-litter bonus calculation
  let bonusMultiplier = 1;
  let bonusPercentage = 0;
  
  if (itemCount >= 30) {
    bonusMultiplier = 1.2;
    bonusPercentage = 20;
  } else if (itemCount >= 15) {
    bonusMultiplier = 1.1;
    bonusPercentage = 10;
  }
  
  const finalTokens = baseTokens * bonusMultiplier;
  const bonusTokens = finalTokens - baseTokens;
  
  if (bonusPercentage === 0) return null;
  
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: 0.6 }}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-4 py-3 rounded-lg"
    >
      <Sparkles className="w-5 h-5" />
      <div className="text-center">
        <span className="text-sm font-black">MICRO-LITTER HERO +{bonusPercentage}%</span>
        <p className="text-xs font-bold opacity-90">{itemCount} tiny items • +{bonusTokens.toFixed(2)} P51</p>
      </div>
      <Zap className="w-5 h-5" />
    </motion.div>
  );
}