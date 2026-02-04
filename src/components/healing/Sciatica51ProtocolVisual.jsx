import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronDown, Zap, Music } from 'lucide-react';

/**
 * SCIATICA51 - Pure Frequency Healing for Deep Glute Compression
 * 528Hz (healing) + 40Hz (nerve repair) = Frequencies do the work
 * Movement just opens the door. Frequencies heal inside. ♾️❤️
 */

export default function Sciatica51ProtocolVisual({ onStartHealing }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const modes = [
    {
      id: 'freq_528',
      name: '528Hz Healing',
      freq: 528,
      icon: '🧬',
      color: 'from-green-500 to-emerald-600',
      desc: 'DNA repair • Calm nervous system',
      time: '20 min'
    },
    {
      id: 'freq_40',
      name: '40Hz Gamma Brain',
      freq: 40,
      icon: '⚡',
      color: 'from-cyan-500 to-blue-600',
      desc: 'Nerve inflammation fighter',
      time: '15 min'
    },
    {
      id: 'both',
      name: '528 + 40 Stack',
      freq: 528,
      freq_secondary: 40,
      icon: '♾️',
      color: 'from-pink-500 to-rose-600',
      desc: 'Full healing protocol',
      time: '25 min'
    }
  ];

  const handleStart = (mode) => {
    const m = modes.find(x => x.id === mode);
    onStartHealing({
      name: 'Sciatica51 Frequency Healing',
      frequency: m.freq,
      frequency_secondary: m.freq_secondary,
      duration: parseInt(m.time),
      mode: mode
    });
  };

  return (
    <div className="space-y-3">
      {/* HEADER - COLLAPSED */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-orange-600 to-rose-600 border-4 border-orange-500 p-4 flex items-center justify-between hover:border-orange-400 transition-all"
        style={{ boxShadow: '0 0 25px rgba(249, 115, 22, 0.5)' }}
      >
        <div className="text-left">
          <h3 className="text-white font-black font-mono text-lg">SCIATICA51</h3>
          <p className="text-orange-100 text-xs font-mono">Frequencies heal the squeeze 🔥</p>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </button>

      {/* EXPANDED CONTENT */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 bg-black/40 border-4 border-orange-500 border-t-0 p-6"
          >
            {/* WHAT'S HAPPENING - VISUAL */}
            <div className="bg-black/60 border-2 border-orange-500/50 p-4 rounded space-y-3">
              <p className="text-orange-400 font-black text-sm">YOUR NERVE IS STUCK:</p>
              
              {/* SIMPLE NERVE ANIMATION */}
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-center">
                  <div className="w-16 h-24 bg-red-900/50 border-2 border-red-500 rounded flex items-center justify-center">
                    <span className="text-2xl">🔴</span>
                  </div>
                  <p className="text-red-400 text-xs font-mono mt-2">SQUEEZED</p>
                </div>
                
                <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Zap className="w-8 h-8 text-yellow-400" />
                </motion.div>

                <div className="text-center">
                  <div className="w-16 h-24 bg-green-900/50 border-2 border-green-500 rounded flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="text-green-400 text-xs font-mono mt-2">HEALED</p>
                </div>
              </div>

              <p className="text-gray-300 text-xs font-mono text-center">
                Piriformis muscle crushes sciatic nerve → frequencies calm + heal the tissue
              </p>
            </div>

            {/* FREQUENCY MODES - VISUAL CARDS */}
            <div className="space-y-2">
              <p className="text-amber-400 font-black text-sm font-mono">PICK YOUR FREQUENCY:</p>
              
              {modes.map(mode => (
                <motion.button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full p-4 border-4 transition-all text-left overflow-hidden relative ${
                    selectedMode === mode.id
                      ? `bg-gradient-to-r ${mode.color} border-white`
                      : 'bg-black border-orange-500/50 hover:border-orange-500'
                  }`}
                  style={selectedMode === mode.id ? {
                    boxShadow: `0 0 30px rgba(249, 115, 22, 0.7)`
                  } : {}}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{mode.icon}</span>
                        <div>
                          <p className={`font-black font-mono ${selectedMode === mode.id ? 'text-black' : 'text-orange-400'}`}>
                            {mode.name}
                          </p>
                          <p className={`text-xs font-mono ${selectedMode === mode.id ? 'text-black/70' : 'text-gray-400'}`}>
                            {mode.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className={`text-sm font-black font-mono ${selectedMode === mode.id ? 'text-black' : 'text-white'}`}>
                      {mode.time}
                    </p>
                  </div>

                  {/* FREQUENCY WAVE BACKGROUND */}
                  {selectedMode === mode.id && (
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, currentColor 35px, currentColor 70px)`,
                        backgroundSize: '70px 100%'
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* WHAT HAPPENS - SIMPLE */}
            {selectedMode && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/60 border-2 border-green-500 p-4 rounded space-y-3"
              >
                <p className="text-green-400 font-black text-xs font-mono">WHILE FREQUENCIES PLAY:</p>
                
                {/* OPTIONAL GENTLE MOVEMENT */}
                <div className="bg-green-900/20 p-3 border border-green-500/50 rounded">
                  <p className="text-green-300 text-xs font-mono mb-2">💡 OPTIONAL: Gentle Stretch (if you want)</p>
                  <p className="text-white text-xs font-mono leading-relaxed">
                    Lie on back. Right ankle on left knee. Gently pull left knee toward chest. Stop if it zaps. Hold 1-2 min. Frequencies are doing the deep healing—stretching just helps.
                  </p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/50 p-3 rounded">
                  <p className="text-blue-300 text-xs font-mono font-bold">✓ Just breathing works too</p>
                  <p className="text-white text-xs font-mono">
                    Frequencies can heal without movement. Do both if you can. Do frequencies if you can't.
                  </p>
                </div>
              </motion.div>
            )}

            {/* START BUTTON */}
            {selectedMode && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleStart(selectedMode)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-600 to-rose-600 text-white py-4 font-black font-mono text-lg border-4 border-orange-500 transition-all"
                style={{ boxShadow: '0 0 30px rgba(249, 115, 22, 0.6)' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Music className="w-5 h-5" />
                  START HEALING FREQUENCY
                </div>
              </motion.button>
            )}

            {/* FOOTER - REAL TALK */}
            <div className="bg-red-900/20 border-2 border-red-500/50 p-3 rounded text-center">
              <p className="text-red-300 text-xs font-mono font-bold">
                ⚠️ If it feels ELECTRIC/SHARP = your nerve says no. Stop. Try again tomorrow.
              </p>
              <p className="text-yellow-400 text-xs font-mono font-bold mt-2">
                Frequencies work. Give them time. 2-4 weeks for real healing. ♾️❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}