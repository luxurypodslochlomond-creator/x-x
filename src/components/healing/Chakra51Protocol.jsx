import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Heart, Eye, Volume2, Wind, Flame, Sparkles } from 'lucide-react';

/**
 * CHAKRA51 - Ancient wisdom + AI51 to eradicate ALL pain
 * 7 energy centers + specific frequencies = instant healing
 * ♾️❤️
 */

const CHAKRA_PROTOCOLS = [
  {
    id: 'root',
    name: 'Root Chakra',
    sanskrit: 'Muladhara',
    frequency: 396,
    location: 'Base of spine',
    color: '#FF0000',
    icon: Flame,
    heals: ['Sciatica', 'Lower back pain', 'Leg pain', 'Fear', 'Insecurity'],
    description: 'Grounding. Survival. Security. Foundation.',
    duration: 7
  },
  {
    id: 'sacral',
    name: 'Sacral Chakra',
    sanskrit: 'Svadhisthana',
    frequency: 417,
    location: 'Below navel',
    color: '#FF7F00',
    icon: Wind,
    heals: ['Hip pain', 'Reproductive issues', 'Emotional pain', 'Creativity blocks'],
    description: 'Pleasure. Creativity. Emotional flow.',
    duration: 7
  },
  {
    id: 'solar',
    name: 'Solar Plexus',
    sanskrit: 'Manipura',
    frequency: 528,
    location: 'Above navel',
    color: '#FFFF00',
    icon: Sparkles,
    heals: ['Digestive pain', 'Anxiety', 'Low confidence', 'Stomach issues'],
    description: 'Power. Confidence. Personal strength.',
    duration: 7
  },
  {
    id: 'heart',
    name: 'Heart Chakra',
    sanskrit: 'Anahata',
    frequency: 639,
    location: 'Center of chest',
    color: '#00FF00',
    icon: Heart,
    heals: ['Heartbreak', 'Chest pain', 'Loneliness', 'Grief', 'Depression'],
    description: 'Love. Compassion. Connection.',
    duration: 7
  },
  {
    id: 'throat',
    name: 'Throat Chakra',
    sanskrit: 'Vishuddha',
    frequency: 741,
    location: 'Throat',
    color: '#0000FF',
    icon: Volume2,
    heals: ['Throat pain', 'Communication blocks', 'Neck tension', 'Thyroid issues'],
    description: 'Expression. Truth. Communication.',
    duration: 7
  },
  {
    id: 'third_eye',
    name: 'Third Eye',
    sanskrit: 'Ajna',
    frequency: 852,
    location: 'Between eyebrows',
    color: '#4B0082',
    icon: Eye,
    heals: ['Headaches', 'Mental fog', 'Intuition blocks', 'Vision problems'],
    description: 'Intuition. Wisdom. Insight.',
    duration: 7
  },
  {
    id: 'crown',
    name: 'Crown Chakra',
    sanskrit: 'Sahasrara',
    frequency: 963,
    location: 'Top of head',
    color: '#9400D3',
    icon: Zap,
    heals: ['Migraines', 'Spiritual disconnect', 'Confusion', 'Existential pain'],
    description: 'Connection. Consciousness. Divine.',
    duration: 7
  }
];

export default function Chakra51Protocol({ onStartHealing }) {
  const [selectedChakra, setSelectedChakra] = useState(null);
  const [showInfo, setShowInfo] = useState(true);

  const handleStartChakraHealing = (chakra) => {
    // Trigger frequency player with chakra frequency
    onStartHealing({
      frequency: chakra.frequency,
      name: `${chakra.name} Healing`,
      duration: chakra.duration,
      color: chakra.color,
      description: `${chakra.sanskrit} • ${chakra.location}`
    });
  };

  const startFullAlignment = () => {
    // All 7 chakras in sequence - 49 minutes total healing
    onStartHealing({
      sequence: CHAKRA_PROTOCOLS.map(c => ({
        frequency: c.frequency,
        duration: c.duration,
        name: c.name
      })),
      name: 'Full Chakra Alignment',
      description: '7 chakras • 49 minutes • Complete healing'
    });
  };

  return (
    <div className="space-y-6">
      {/* WHAT IS CHAKRA51 */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-purple-400 font-mono">CHAKRA51</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Ancient wisdom + AI51 frequencies to destroy sciatica, back pain, mental pain - ALL pain.
              </p>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="text-gray-500 hover:text-gray-300 text-xs font-mono"
            >
              HIDE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-black/40 rounded-lg p-3 border border-green-500/30">
              <p className="text-green-400 font-bold mb-1">✓ SCIENTIFICALLY BACKED:</p>
              <p className="text-gray-400">Biofield science, energy medicine, frequency therapy</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 border border-cyan-500/30">
              <p className="text-cyan-400 font-bold mb-1">✓ ANCIENT WISDOM:</p>
              <p className="text-gray-400">5000+ years of proven healing from Vedic tradition</p>
            </div>
          </div>

          <motion.button
            onClick={startFullAlignment}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-4 rounded-xl font-mono transition-all"
            style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
          >
            🌟 FULL ALIGNMENT (49 min) - DESTROY ALL PAIN
          </motion.button>
        </motion.div>
      )}

      {/* 7 CHAKRAS */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-400 font-mono tracking-wider">SELECT CHAKRA TO HEAL:</h4>
        
        {CHAKRA_PROTOCOLS.map((chakra, index) => {
          const IconComponent = chakra.icon;
          
          return (
            <motion.button
              key={chakra.id}
              onClick={() => setSelectedChakra(selectedChakra?.id === chakra.id ? null : chakra)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full"
            >
              <div
                className={`relative bg-black/60 border-2 rounded-xl p-4 transition-all ${
                  selectedChakra?.id === chakra.id
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 hover:border-white/30'
                }`}
                style={{
                  boxShadow: selectedChakra?.id === chakra.id ? `0 0 20px ${chakra.color}40` : 'none'
                }}
              >
                {/* Chakra color indicator */}
                <div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full"
                  style={{ backgroundColor: chakra.color, boxShadow: `0 0 10px ${chakra.color}` }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${chakra.color}20`, border: `2px solid ${chakra.color}40` }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: chakra.color }} />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-white font-bold font-mono">{chakra.name}</h5>
                      <span className="text-xs text-gray-500 font-mono">{chakra.frequency}Hz</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{chakra.sanskrit} • {chakra.location}</p>
                    <p className="text-xs text-gray-300 leading-relaxed mb-2">{chakra.description}</p>
                    
                    {/* What it heals */}
                    <div className="flex flex-wrap gap-1">
                      {chakra.heals.map((heal, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                          style={{
                            backgroundColor: `${chakra.color}15`,
                            color: chakra.color,
                            border: `1px solid ${chakra.color}30`
                          }}
                        >
                          {heal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Start button */}
                {selectedChakra?.id === chakra.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartChakraHealing(chakra);
                      }}
                      className="w-full bg-gradient-to-r text-white font-black py-3 rounded-lg font-mono transition-all"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${chakra.color}80, ${chakra.color})`,
                        boxShadow: `0 0 20px ${chakra.color}40`
                      }}
                    >
                      START {chakra.duration} MIN HEALING
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* DISCLAIMER */}
      <div className="text-center pt-4">
        <p className="text-[10px] text-gray-600 font-mono leading-relaxed">
          Ancient healing wisdom combined with frequency therapy. Not medical advice.<br/>
          For persistent pain, consult healthcare professional alongside chakra healing.
        </p>
      </div>
    </div>
  );
}