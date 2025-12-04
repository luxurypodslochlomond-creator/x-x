import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '@/entities/User';

export default function EnergyFieldCapture({ onEnergyDetected }) {
  const [energyField, setEnergyField] = useState({
    frequency: 528, // Default love frequency
    amplitude: 50,
    color: 'cyan',
    vibe: 'creative'
  });

  useEffect(() => {
    const captureEnergyField = async () => {
      try {
        const user = await User.me();
        const currentTime = new Date();
        
        // QUANTUM ENERGY FIELD CALCULATION
        const baseFreq = user?.love_frequency_rating || 100;
        const timeAmplifier = Math.sin(currentTime.getMinutes() * 0.1) * 20 + 50;
        const loyaltyResonance = (user?.loyalty_score || 14) * 3.7;
        
        const newEnergyField = {
          frequency: Math.round(baseFreq * 5.28), // Convert to Hz
          amplitude: Math.round(timeAmplifier + loyaltyResonance),
          color: baseFreq > 80 ? 'cyan' : baseFreq > 60 ? 'purple' : 'blue',
          vibe: baseFreq > 90 ? 'magical' : baseFreq > 70 ? 'loving' : 'peaceful'
        };
        
        setEnergyField(newEnergyField);
        if (onEnergyDetected) onEnergyDetected(newEnergyField);
        
      } catch (error) {
        console.error('Energy field capture error:', error);
      }
    };

    captureEnergyField();
    const interval = setInterval(captureEnergyField, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [onEnergyDetected]);

  return (
    <motion.div
      className="fixed top-20 right-4 z-30 bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className={`w-8 h-8 rounded-full bg-${energyField.color}-400 mx-auto mb-2`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        <div className="text-xs text-white">
          <div className="font-bold">{energyField.frequency}Hz</div>
          <div className="text-gray-400">Energy Field Active</div>
        </div>
      </div>
    </motion.div>
  );
}