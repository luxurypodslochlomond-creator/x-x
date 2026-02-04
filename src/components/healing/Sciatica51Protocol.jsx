import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronDown } from 'lucide-react';

/**
 * SCIATICA51 - Deep Gluteal Syndrome Relief
 * Two separate systems: nervous system sensitivity + mechanical capacity
 * Frequencies calm the nervous system. Graded movement builds mechanical tolerance.
 * Frequencies support the work — they don't replace it.
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
            {/* THE TWO-SLIDER MODEL */}
            <div className="bg-black/60 border-2 border-orange-500/50 p-4 rounded">
              <p className="text-orange-400 font-black text-sm mb-2">TWO SEPARATE SYSTEMS:</p>
              <p className="text-white text-sm font-mono leading-relaxed mb-3">
                <strong>Deep Gluteal Syndrome</strong> = Piriformis compresses sciatic nerve. Recovery has two phases:
              </p>
              <ul className="text-xs text-gray-300 space-y-2 ml-3">
                <li>🎚️ <strong className="text-white">SLIDER #1: Nervous System Sensitivity</strong><br/>• 528Hz + 40Hz calm anxiety + reduce pain perception<br/>• Helps you tolerate movement without fear</li>
                <li>🎚️ <strong className="text-white">SLIDER #2: Mechanical Capacity</strong><br/>• Only graded movement (over weeks) builds tolerance<br/>• Frequencies don't improve this — only movement does</li>
              </ul>
            </div>

            {/* HONEST DISCLAIMER */}
            <div className="bg-red-900/20 border-2 border-red-500/50 p-4 rounded space-y-2">
              <p className="text-red-400 font-black text-xs">HONEST TALK:</p>
              <p className="text-white text-xs font-mono">
                Frequencies can calm the nervous system so anxiety doesn't amplify pain.
              </p>
              <p className="text-white text-xs font-mono">
                But that's NOT permission to push into more stretch.
              </p>
              <p className="text-white text-xs font-mono">
                You stay within what the nerve can tolerate WHILE calm.
              </p>
              <p className="text-white text-xs font-mono">
                Only graded movement over weeks builds mechanical tolerance.
              </p>
              <p className="text-yellow-400 font-black text-xs font-mono mt-2">
                Frequencies support the work — they don't replace it.
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
                <p className="text-green-400 font-black text-sm font-mono">GRADED MOVEMENT (STAY IN TOLERANCE):</p>
                
                <div className="space-y-2">
                  <div className="bg-black/60 p-3 border border-green-500/30 rounded">
                    <p className="text-green-300 font-black text-xs font-mono mb-1">90/90 PIRIFORMIS POSITION</p>
                    <p className="text-white text-xs font-mono">
                      • Lie on back, knees bent, feet flat<br/>
                      • Place right ankle on left knee (4-shape)<br/>
                      • GENTLY bring left knee toward chest<br/>
                      • STOP if electrical pain appears<br/>
                      • Hold what's comfortable for 1-2 min
                    </p>
                  </div>
                </div>

                <div className="bg-green-900/30 border-2 border-green-500 p-3 rounded">
                  <p className="text-green-400 font-bold text-xs font-mono">THE KEY PRINCIPLE:</p>
                  <p className="text-white text-xs font-mono">
                    Calm + neutral movement = good. Calm + electrical pain = too much.<br/>
                    Only increase depth/duration when it stays pain-free AFTER the session.<br/>
                    Frequencies help you stay calm while you do the work. They don't change how much your nerve tolerates yet.
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
                Daily gentle work (not weekly pushes).
              </p>
              <p className="text-xs text-yellow-400 font-mono font-bold">
                Respect electrical pain as a boundary. Keep both sliders improving together. ♾️❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}