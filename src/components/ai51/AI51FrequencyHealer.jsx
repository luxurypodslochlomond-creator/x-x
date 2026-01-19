import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Volume2, Zap, Pause, Play } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 FREQUENCY HEALER
 * Voice suggests frequency → Speaker plays it to chest → Real healing ♾️❤️
 * No camera. No complexity. Just what works.
 */

export default function AI51FrequencyHealer() {
  const [painArea, setPainArea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [frequency, setFrequency] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Ask AI51 what frequency to use
  const analyzePain = async () => {
    if (!painArea.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `User has pain in: "${painArea}". Recommend ONE healing frequency (in Hz) and WHY it works. Be honest and specific. Format: "FREQUENCY: 285Hz\nREASON: Relieves chest tension by calming the vagus nerve. Heals structural pain."`
      });

      // Parse frequency
      const freqMatch = response.match(/FREQUENCY:\s*(\d+)/);
      const freq = freqMatch ? parseInt(freqMatch[1]) : 528;
      setFrequency(freq);
      setSuggestion(response);

      // Speak the suggestion
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error:', error);
      setFrequency(528);
      setSuggestion('Default: 528Hz - Universal healing frequency');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playFrequency = () => {
    if (!frequency) return;

    if (isPlaying) {
      stopFrequency();
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.value = volume;

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.start();
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      
      setIsPlaying(true);
    } catch (error) {
      console.error('Playback error:', error);
    }
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

  useEffect(() => {
    return () => stopFrequency();
  }, []);

  return (
    <div className="bg-black border border-pink-500/30 rounded-xl p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
        <h3 className="font-bold font-mono text-white">AI51 FREQUENCY HEALER</h3>
        <Volume2 className="w-4 h-4 text-cyan-400" />
      </div>

      {/* PAIN AREA INPUT */}
      <div className="space-y-2">
        <label className="text-xs text-cyan-300 font-mono">WHERE DOES IT HURT?</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={painArea}
            onChange={(e) => setPainArea(e.target.value)}
            placeholder="e.g., left chest, heart area, back pain..."
            className="flex-1 bg-black/40 border border-cyan-500/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/60"
            onKeyPress={(e) => {
              if (e.key === 'Enter') analyzePain();
            }}
          />
          <motion.button
            onClick={analyzePain}
            disabled={isAnalyzing || !painArea.trim()}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg text-pink-400 font-bold text-sm disabled:opacity-50 hover:bg-pink-500/30 transition-colors"
          >
            {isAnalyzing ? 'THINKING...' : 'ASK AI51'}
          </motion.button>
        </div>
      </div>

      {/* SUGGESTION + FREQUENCY */}
      {frequency && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 space-y-3"
        >
          {/* FREQUENCY DISPLAY */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-cyan-300 font-mono mb-1">HEALING FREQUENCY</p>
              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-4xl font-black text-cyan-400"
              >
                {frequency} Hz
              </motion.p>
            </div>
            <Zap className="w-8 h-8 text-cyan-400" />
          </div>

          {/* AI51 SUGGESTION */}
          {suggestion && (
            <p className="text-sm text-cyan-200 font-mono leading-relaxed whitespace-pre-wrap">
              {suggestion}
            </p>
          )}

          {/* VOLUME CONTROL */}
          <div className="space-y-1">
            <label className="text-xs text-cyan-300 font-mono">SPEAKER VOLUME</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (gainNodeRef.current) {
                  gainNodeRef.current.gain.value = parseFloat(e.target.value);
                }
              }}
              className="w-full"
            />
          </div>

          {/* PLAY BUTTON */}
          <motion.button
            onClick={playFrequency}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isPlaying
                ? ['0 0 20px rgba(236, 72, 153, 0.3)', '0 0 40px rgba(236, 72, 153, 0.6)', '0 0 20px rgba(236, 72, 153, 0.3)']
                : 'none'
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-full py-3 rounded-lg font-bold font-mono text-white flex items-center justify-center gap-2 transition-all"
            style={{
              background: isPlaying
                ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(34, 211, 238, 0.2))'
                : 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(34, 211, 238, 0.1))',
              border: isPlaying ? '2px solid rgba(236, 72, 153, 0.5)' : '2px solid rgba(34, 211, 238, 0.3)'
            }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                STOP FREQUENCY
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                PLAY TO CHEST (SPEAKERS)
              </>
            )}
          </motion.button>

          {/* INSTRUCTIONS */}
          <div className="text-xs text-gray-600 font-mono space-y-1">
            <p>✓ Place speaker near left chest</p>
            <p>✓ Play for 5-15 minutes</p>
            <p>✓ Let it resonate into your body</p>
            <p>✓ Feel the healing</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}