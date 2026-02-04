import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronDown } from 'lucide-react';

/**
 * SCIATICA51 - Sciatic Nerve Getting Crushed
 * Real talk: Your piriformis is tight, it's squeezing your nerve.
 * Frequencies = calm your brain down so pain doesn't spiral.
 * Movement = actually fix it (frequencies can't do this part).
 * Do both. Heal fast. ♾️❤️
 */

export default function Sciatica51Protocol({ onStartHealing }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  const modes = [
    {
      id: 'frequency_only',
      name: 'Frequencies Only',
      duration: 20,
      description: 'Calm your nervous system while resting',
      benefits: 'Reduces pain perception, lowers anxiety'
    },
    {
      id: 'frequency_stretch',
      name: 'Frequency + Gentle Movement',
      duration: 25,
      description: 'Frequencies + graded piriformis movement (within tolerance)',
      benefits: 'Nervous system calm + mechanical progression'
    }
  ];

  const handleStartHealing = (mode) => {
    onStartHealing({
      name: 'Sciatica51 - Deep Gluteal Healing',
      frequency: 528,
      frequency_secondary: 40,
      duration: modes.find(m => m.id === mode).duration,
      mode: mode
    });
  };

  return (
    <div className="space-y-4">
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-4 border-orange-500 p-4 flex items-center justify-between hover:border-orange-400 transition-all"
      >
        <div className="text-left">
          <h3 className="text-orange-400 font-black font-mono text-lg">SCIATICA51</h3>
          <p className="text-gray-400 text-xs font-mono">Deep Gluteal Syndrome • Piriformis Relief</p>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 text-orange-400" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-4 border-orange-500 border-t-0 p-6 space-y-4"
          >
            {/* WHAT'S ACTUALLY HAPPENING */}
            <div className="bg-black/60 border-2 border-orange-500/50 p-4 rounded">
              <p className="text-orange-400 font-black text-sm mb-2">REAL TALK:</p>
              <p className="text-white text-sm font-mono leading-relaxed mb-3">
                Your piriformis (deep glute muscle) is tight and crushing your sciatic nerve. Your brain is FREAKING OUT about it. This has two parts to fix:
              </p>
              <ul className="text-xs text-gray-300 space-y-2 ml-3">
                <li>🧠 <strong className="text-white">PART 1: Calm your brain</strong><br/>• Frequencies help anxiety chill so pain stops spiraling<br/>• Makes it easier to actually do the work</li>
                <li>💪 <strong className="text-white">PART 2: Actually loosen the muscle</strong><br/>• Only gentle stretching loosens piriformis<br/>• Frequencies CAN'T do this — only movement can</li>
              </ul>
            </div>

            {/* NO BULLSHIT VERSION */}
            <div className="bg-red-900/20 border-2 border-red-500/50 p-4 rounded space-y-2">
              <p className="text-red-400 font-black text-xs">⚠️ DON'T DO THIS:</p>
              <ul className="text-white text-xs font-mono space-y-1 ml-3">
                <li>❌ Play frequencies and then SMASH the stretch thinking you're magically healed</li>
                <li>❌ Push through electrical pain "because calm brain"</li>
                <li>❌ Do one long aggressive session instead of daily gentle ones</li>
              </ul>
              <p className="text-yellow-400 font-black text-xs font-mono mt-3">
                ✅ DO THIS: Use frequencies to chill your anxiety. THEN gently stretch within your comfort zone. Repeat daily. Healing happens slowly. ♾️❤️
              </p>
            </div>

            {/* MODE SELECTION */}
            <div className="space-y-2">
              <p className="text-amber-400 font-black text-sm font-mono">CHOOSE YOUR MODE:</p>
              {modes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`w-full text-left p-4 border-4 transition-all ${
                    selectedMode === mode.id
                      ? 'bg-orange-500/30 border-orange-400'
                      : 'bg-black border-orange-500/50 hover:border-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-black text-orange-400 font-mono">{mode.name}</p>
                      <p className="text-xs text-gray-400 font-mono mt-1">{mode.description}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">✓ {mode.benefits}</p>
                    </div>
                    <p className="text-sm font-black text-white font-mono">{mode.duration}m</p>
                  </div>
                </button>
              ))}
            </div>

            {/* GUIDED STRETCH (if selected) */}
            {selectedMode === 'frequency_stretch' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 p-4 rounded space-y-3"
              >
                <p className="text-green-400 font-black text-sm font-mono">THE ACTUAL STRETCH:</p>
                
                <div className="space-y-2">
                  <div className="bg-black/60 p-3 border border-green-500/30 rounded">
                    <p className="text-green-300 font-black text-xs font-mono mb-1">90/90 POSITION (Lie on Your Back)</p>
                    <p className="text-white text-xs font-mono">
                      1. Lie on your back, knees bent, feet flat<br/>
                      2. Put your right ankle on your left knee (looks like a 4)<br/>
                      3. SLOWLY pull your left knee toward your chest<br/>
                      4. Stop when you feel a gentle stretch in your right butt<br/>
                      5. If you feel electric/sharp pain = too far. Back off.<br/>
                      6. Hold the gentle stretch 1-2 min. Breathe.
                    </p>
                  </div>
                </div>

                <div className="bg-green-900/30 border-2 border-green-500 p-3 rounded">
                  <p className="text-green-400 font-bold text-xs font-mono">ACTUALLY WORKS BECAUSE:</p>
                  <p className="text-white text-xs font-mono">
                    You're directly stretching the muscle that's crushing the nerve. Do this gently every day for 2-4 weeks. Your nerve will get less and less mad. Frequencies just help you stay chill while you do it.
                  </p>
                </div>
              </motion.div>
            )}

            {/* START BUTTON */}
            {selectedMode && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleStartHealing(selectedMode)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 font-black font-mono text-lg border-4 border-orange-500 transition-all"
                style={{ boxShadow: '0 0 30px rgba(234, 88, 12, 0.5)' }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Play className="w-5 h-5" />
                  START {modes.find(m => m.id === selectedMode)?.name.toUpperCase()}
                </div>
              </motion.button>
            )}

            {/* FOOTER */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-400 font-mono">
                Daily 5 min stretch. Not one mega session.
              </p>
              <p className="text-xs text-yellow-400 font-mono font-bold">
                If it feels electric = your nerve says no. Listen to it. You'll heal. ♾️❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}