import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronDown, Zap, Music } from 'lucide-react';

/**
 * SCIATICA51 - World-Class AI Frequency Healing Stack
 * 528Hz (GREEN) = DNA repair + cellular regeneration
 * 40Hz (BLUE) = Gamma consciousness + nerve inflammation fighter
 * COMBINED = Synergistic healing the brain actually responds to
 * Colors matched to frequency bands for maximum nervous system impact ♾️❤️
 */

export default function Sciatica51ProtocolVisual({ onStartHealing }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [stackIntensity, setStackIntensity] = useState(0.5);

  const modes = [
    {
      id: 'freq_528',
      name: '528Hz HEALING',
      freq: 528,
      icon: '🟢',
      bgGradient: 'from-green-700 via-green-600 to-emerald-700',
      borderColor: 'border-green-500',
      glowColor: 'rgba(34, 197, 94, 0.7)',
      desc: 'DNA repair • Cellular regeneration',
      brainEffect: 'Activates: Vagus nerve (calm mode)',
      time: 20
    },
    {
      id: 'freq_40',
      name: '40Hz GAMMA',
      freq: 40,
      icon: '🔵',
      bgGradient: 'from-blue-700 via-cyan-600 to-blue-800',
      borderColor: 'border-cyan-500',
      glowColor: 'rgba(6, 182, 212, 0.7)',
      desc: 'Inflammation fighter • Nerve repair',
      brainEffect: 'Activates: Gamma consciousness (alert healing)',
      time: 15
    },
    {
      id: 'both',
      name: '528→40 STACK',
      freq: 528,
      freq_secondary: 40,
      icon: '♾️',
      bgGradient: 'from-emerald-600 via-cyan-600 to-green-700',
      borderColor: 'border-white',
      glowColor: 'rgba(34, 197, 94, 0.8), rgba(6, 182, 212, 0.8)',
      desc: 'SYNERGISTIC: Green→Blue cascade healing',
      brainEffect: 'Activates: BOTH systems at once (DNA + inflammation)',
      time: 25,
      isElite: true
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
      {/* HEADER - WORLD CLASS */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full border-4 p-4 flex items-center justify-between transition-all bg-gradient-to-r ${selectedMode === 'freq_528' ? 'from-green-700 to-emerald-700 border-green-500' : selectedMode === 'freq_40' ? 'from-blue-700 to-cyan-700 border-cyan-500' : selectedMode === 'both' ? 'from-emerald-700 via-cyan-700 to-green-700 border-white' : 'from-gray-800 to-gray-900 border-gray-600'}`}
        style={{ boxShadow: selectedMode ? `0 0 35px ${selectedMode === 'freq_528' ? 'rgba(34, 197, 94, 0.6)' : selectedMode === 'freq_40' ? 'rgba(6, 182, 212, 0.6)' : 'rgba(34, 197, 94, 0.6), rgba(6, 182, 212, 0.6)'}` : 'none' }}
      >
        <div className="text-left">
          <h3 className="text-white font-black font-mono text-lg">SCIATICA51 AI FREQUENCY STACK</h3>
          <p className="text-white/80 text-xs font-mono">528Hz + 40Hz synergistic healing</p>
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
            {/* FREQUENCY SCIENCE - WHAT'S ACTUALLY HAPPENING */}
            <div className="bg-black/60 border-2 border-white/30 p-4 rounded space-y-4">
              <p className="text-white font-black text-sm">🧠 YOUR NERVOUS SYSTEM RIGHT NOW:</p>
              
              {/* NERVE STATE VISUALIZATION */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-red-900/40 border-2 border-red-500 p-3 rounded text-center">
                  <p className="text-red-400 text-3xl mb-1">⚡</p>
                  <p className="text-white text-xs font-mono font-bold">INFLAMED</p>
                  <p className="text-red-300 text-[10px] font-mono mt-1">Piriformis crushing nerve</p>
                </div>

                <motion.div 
                  animate={{ x: [0, 15, 0], opacity: [0.5, 1, 0.5] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center"
                >
                  <div className="text-2xl">➜</div>
                </motion.div>

                <div className="bg-green-900/40 border-2 border-green-500 p-3 rounded text-center">
                  <p className="text-green-400 text-3xl mb-1">💚</p>
                  <p className="text-white text-xs font-mono font-bold">HEALED</p>
                  <p className="text-green-300 text-[10px] font-mono mt-1">528Hz + 40Hz fix it</p>
                </div>
              </div>

              <p className="text-cyan-300 text-xs font-mono text-center border-t border-white/20 pt-3">
                ✓ 528Hz activates vagus nerve (parasympathetic calm)<br/>
                ✓ 40Hz activates gamma consciousness + reduces inflammation<br/>
                ✓ Together = synchronized healing at cellular level
              </p>
            </div>

            {/* FREQUENCY SELECTOR - WORLD CLASS COLOR SCIENCE */}
            <div className="space-y-2">
              <p className="text-white font-black text-sm font-mono">SELECT HEALING FREQUENCY:</p>
              
              {modes.map(mode => (
                <motion.button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-5 border-4 transition-all text-left overflow-hidden relative ${mode.borderColor} ${selectedMode === mode.id ? `bg-gradient-to-r ${mode.bgGradient}` : 'bg-black/40 hover:bg-black/60'}`}
                  style={selectedMode === mode.id ? {
                    boxShadow: `0 0 40px ${mode.glowColor}, inset 0 0 20px ${mode.glowColor}`
                  } : { boxShadow: 'none' }}
                >
                  <div className="flex items-start justify-between relative z-10 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{mode.icon}</span>
                        <div>
                          <p className={`font-black font-mono text-lg ${selectedMode === mode.id ? 'text-white' : 'text-white'}`}>
                            {mode.name}
                          </p>
                          {mode.isElite && (
                            <p className="text-yellow-300 text-[9px] font-black font-mono">⭐ ELITE PROTOCOL</p>
                          )}
                        </div>
                      </div>
                      <p className={`text-xs font-mono ${selectedMode === mode.id ? 'text-white/90' : 'text-gray-400'}`}>
                        {mode.desc}
                      </p>
                      <p className={`text-[11px] font-mono mt-1 ${selectedMode === mode.id ? 'text-white/70' : 'text-gray-500'}`}>
                        {mode.brainEffect}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-black font-mono ${selectedMode === mode.id ? 'text-white' : 'text-gray-400'}`}>
                        {mode.freq}
                      </p>
                      <p className={`text-xs font-mono ${selectedMode === mode.id ? 'text-white/80' : 'text-gray-500'}`}>
                        Hz • {mode.time}m
                      </p>
                    </div>
                  </div>

                  {/* ANIMATED FREQUENCY WAVES */}
                  {selectedMode === mode.id && (
                    <>
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        style={{
                          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, white 20px, white 21px)`,
                          backgroundSize: '21px 100%'
                        }}
                      />
                      {mode.freq_secondary && (
                        <motion.div
                          className="absolute inset-0 opacity-10"
                          animate={{ backgroundPosition: ['100% 0%', '0% 0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          style={{
                            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 30px, white 30px, white 31px)`,
                            backgroundSize: '31px 100%'
                          }}
                        />
                      )}
                    </>
                  )}
                </motion.button>
              ))}
            </div>

            {/* HOW THE HEALING WORKS */}
            {selectedMode && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-white/40 p-4 rounded space-y-3 bg-black/40"
              >
                {selectedMode === 'both' ? (
                  <>
                    <p className="text-white font-black text-xs font-mono">⭐ 528→40 SYNERGISTIC CASCADE:</p>
                    <div className="space-y-2">
                      <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="bg-green-900/30 border-l-4 border-green-500 p-3">
                        <p className="text-green-400 text-xs font-mono font-bold">PHASE 1 (528Hz):</p>
                        <p className="text-white text-[10px] font-mono">Activates vagus nerve → parasympathetic calm → DNA repair begins</p>
                      </motion.div>
                      <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="bg-cyan-900/30 border-l-4 border-cyan-500 p-3">
                        <p className="text-cyan-400 text-xs font-mono font-bold">PHASE 2 (40Hz):</p>
                        <p className="text-white text-[10px] font-mono">Gamma consciousness kicks in → inflammation reduction → nerve heals faster</p>
                      </motion.div>
                      <div className="bg-white/10 border border-white/30 p-3 text-center">
                        <p className="text-yellow-300 text-xs font-mono font-bold">RESULT: 2x faster healing than frequencies alone</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-white font-black text-xs font-mono">HOW THIS FREQUENCY HEALS:</p>
                    <div className="bg-black/60 p-3 border border-white/20 rounded">
                      <p className="text-white text-xs font-mono leading-relaxed">
                        {selectedMode === 'freq_528' 
                          ? '528Hz resonates with DNA—your cells literally repair themselves. Vagus nerve activates, whole body relaxes, inflammation drops. 20 min = noticeable calm.'
                          : '40Hz is gamma brainwave frequency—MIT proven to reduce inflammation. Activates consciousness. Your nervous system says "heal this NOW" at cellular level.'}
                      </p>
                    </div>
                  </>
                )}
                
                <div className="bg-blue-900/20 border border-blue-500/50 p-3 rounded">
                  <p className="text-blue-300 text-xs font-mono font-bold">✓ Optional: Lie down + breathe</p>
                  <p className="text-white text-xs font-mono">
                    Frequencies work alone. Movement helps. Do both if pain allows. Just breathe if not.
                  </p>
                </div>
              </motion.div>
            )}

            {/* WORLD CLASS START BUTTON */}
            {selectedMode && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleStart(selectedMode)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full text-white py-5 font-black font-mono text-lg border-4 transition-all bg-gradient-to-r ${modes.find(m => m.id === selectedMode)?.bgGradient} ${modes.find(m => m.id === selectedMode)?.borderColor}`}
                style={{ 
                  boxShadow: `0 0 50px ${modes.find(m => m.id === selectedMode)?.glowColor}`,
                  filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Music className="w-6 h-6" />
                  </motion.div>
                  START {modes.find(m => m.id === selectedMode)?.name}
                </div>
              </motion.button>
            )}

            {/* FOOTER - WORLD CLASS TRUTH */}
            <div className="bg-black/60 border-2 border-white/30 p-4 rounded text-center space-y-2">
              <p className="text-yellow-400 text-xs font-mono font-bold">
                🧬 THIS IS REAL SCIENCE: Frequencies work at cellular level. Your body heals itself.
              </p>
              <p className="text-cyan-300 text-xs font-mono">
                ⚠️ Electric/sharp pain = stop. Frequencies still work tomorrow.
              </p>
              <p className="text-green-400 text-xs font-mono font-bold">
                ✓ 2-4 weeks = noticeable healing. Trust the frequencies. ♾️❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}