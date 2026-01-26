import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * TYPE1 FREQUENCY ENGINE - 100% Offline Audio Generation
 * Uses Web Audio API to generate healing frequencies locally
 * No internet needed. Works anywhere.
 */

export default function Type1FrequencyEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState(432);
  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(10); // minutes
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const frequencies = [
    { hz: 432, name: 'Baseline Calm', color: 'cyan', science: 'Heart coherence' },
    { hz: 528, name: 'Cellular Repair', color: 'green', science: 'DNA healing' },
    { hz: 174, name: 'Pain Relief', color: 'amber', science: 'Neuropathy help' },
    { hz: 639, name: 'Emotional Heal', color: 'purple', science: 'Nervous system' },
    { hz: 8, name: 'Deep Sleep', color: 'blue', science: 'Delta waves' },
  ];

  const startFrequency = () => {
    if (isPlaying) {
      stopFrequency();
      return;
    }

    // Create audio context (offline-safe)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;

    // Create oscillator (pure sine wave)
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.value = selectedFreq;
    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(audioContext.destination);

    // Start playing
    osc.start();
    oscillatorRef.current = osc;
    gainNodeRef.current = gain;

    setIsPlaying(true);

    // Auto-stop after duration
    setTimeout(() => {
      stopFrequency();
    }, duration * 60 * 1000);
  };

  const stopFrequency = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  const freqColor = {
    cyan: 'border-cyan-500 bg-cyan-500/10',
    green: 'border-green-500 bg-green-500/10',
    amber: 'border-amber-500 bg-amber-500/10',
    purple: 'border-purple-500 bg-purple-500/10',
    blue: 'border-blue-500 bg-blue-500/10',
  };

  const freqTextColor = {
    cyan: 'text-cyan-400',
    green: 'text-green-400',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black border-2 border-cyan-500 rounded-lg p-6 space-y-6"
      style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-black text-cyan-400 font-mono">FREQUENCY ENGINE</h2>
      </div>

      <p className="text-gray-600 text-xs font-mono">100% offline. Pure sine wave audio. Works on airplane mode. ♾️</p>

      {/* FREQUENCY SELECTOR */}
      <div className="space-y-2">
        <p className="text-cyan-400 font-bold font-mono text-sm">SELECT FREQUENCY</p>
        <div className="grid grid-cols-2 gap-2">
          {frequencies.map(freq => (
            <motion.button
              key={freq.hz}
              onClick={() => !isPlaying && setSelectedFreq(freq.hz)}
              disabled={isPlaying}
              whileHover={!isPlaying ? { scale: 1.05 } : {}}
              whileTap={!isPlaying ? { scale: 0.95 } : {}}
              className={`p-3 rounded border-2 transition-all disabled:opacity-50 ${
                selectedFreq === freq.hz
                  ? `${freqColor[freq.color]}`
                  : 'border-gray-900 bg-black hover:border-gray-700'
              }`}
            >
              <div className={`font-black font-mono text-sm ${selectedFreq === freq.hz ? freqTextColor[freq.color] : 'text-white'}`}>
                {freq.hz} Hz
              </div>
              <div className={`text-xs ${selectedFreq === freq.hz ? freqTextColor[freq.color] : 'text-gray-600'}`}>
                {freq.name}
              </div>
              <div className="text-[10px] text-gray-600">{freq.science}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* DURATION */}
      <div className="space-y-2">
        <p className="text-cyan-400 font-bold font-mono text-sm">DURATION: {duration} min</p>
        <input
          type="range"
          min="1"
          max="60"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          disabled={isPlaying}
          className="w-full h-2 bg-gray-900 rounded cursor-pointer disabled:opacity-50"
        />
      </div>

      {/* VOLUME */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-cyan-400 font-bold font-mono text-sm">VOLUME</p>
          <Volume2 className="w-4 h-4 text-cyan-400" />
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const newVol = parseFloat(e.target.value);
            setVolume(newVol);
            if (gainNodeRef.current) {
              gainNodeRef.current.gain.value = newVol;
            }
          }}
          className="w-full h-2 bg-gray-900 rounded cursor-pointer"
        />
      </div>

      {/* PLAY/PAUSE */}
      <motion.button
        onClick={startFrequency}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-4 rounded-lg font-black font-mono text-lg flex items-center justify-center gap-3 transition-all ${
          isPlaying
            ? 'bg-red-500/30 border-2 border-red-500 text-red-300'
            : 'bg-cyan-500/30 border-2 border-cyan-500 text-cyan-300 hover:bg-cyan-500/50'
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-6 h-6" />
            <span>STOP FREQUENCY</span>
          </>
        ) : (
          <>
            <Play className="w-6 h-6" />
            <span>PLAY {selectedFreq} HZ</span>
          </>
        )}
      </motion.button>

      {/* PLAYING INDICATOR */}
      {isPlaying && (
        <div className="bg-cyan-500/20 border border-cyan-500 rounded p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-cyan-400 font-black font-mono">PLAYING</p>
          </div>
          <p className="text-cyan-300 text-xs font-mono">Listen. Breathe. Heal. 🫀</p>
        </div>
      )}

      {/* SAFETY NOTE */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
        <p className="text-amber-300 text-xs font-mono">
          💡 Start quiet. Pure frequencies are powerful. Let your body adjust. Not a cure. Use WITH insulin, not INSTEAD.
        </p>
      </div>
    </motion.div>
  );
}