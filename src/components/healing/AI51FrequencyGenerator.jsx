import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Play, Pause, X, Loader2 } from 'lucide-react';

export default function AI51FrequencyGenerator({ condition, onClose }) {
  const [frequency, setFrequency] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);
  const audioContextRef = useRef(null);

  // Generate custom frequency based on condition
  useEffect(() => {
    const generateFrequency = async () => {
      try {
        setIsGenerating(true);
        const response = await base44.integrations.Core.InvokeLLM({
          prompt: `You are a frequency synthesis engine. The user describes a health condition or need. Respond with a precise JSON object containing:
          
User condition: "${condition}"

Respond ONLY with this JSON (no other text):
{
  "frequency_hz": <number between 20-2000>,
  "waveform": "sine|square|triangle|sawtooth",
  "duration_seconds": <number 1-10>,
  "harmonics": [<array of harmonic ratios, e.g. [1, 1.5, 2]>],
  "affirmation": "<one supportive sentence>",
  "mechanism": "<brief scientific mechanism>"
}`,
          response_json_schema: {
            type: "object",
            properties: {
              frequency_hz: { type: "number" },
              waveform: { type: "string" },
              duration_seconds: { type: "number" },
              harmonics: { type: "array", items: { type: "number" } },
              affirmation: { type: "string" },
              mechanism: { type: "string" }
            },
            required: ["frequency_hz", "waveform", "duration_seconds", "affirmation"]
          }
        });

        setFrequency(response);
      } catch (err) {
        console.error('Frequency generation failed:', err);
        // Fallback to 432Hz healing frequency
        setFrequency({
          frequency_hz: 432,
          waveform: 'sine',
          duration_seconds: 5,
          harmonics: [1, 1.5],
          affirmation: 'Your body knows how to heal.',
          mechanism: 'Binaural resonance with vagus nerve activation'
        });
      } finally {
        setIsGenerating(false);
      }
    };

    generateFrequency();
  }, [condition]);

  const playFrequency = async () => {
    if (!frequency || isPlaying) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = frequency.waveform || 'sine';
      osc.frequency.value = frequency.frequency_hz;
      gain.gain.setValueAtTime(0.3, audioContext.currentTime);

      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainRef.current = gain;

      setIsPlaying(true);
      const duration = (frequency.duration_seconds || 5) * 1000;
      let elapsed = 0;

      const interval = setInterval(() => {
        elapsed += 50;
        setProgress((elapsed / duration) * 100);
        if (elapsed >= duration) {
          clearInterval(interval);
          osc.stop();
          setIsPlaying(false);
          setProgress(0);
        }
      }, 50);
    } catch (err) {
      console.error('Playback failed:', err);
      setIsPlaying(false);
    }
  };

  const stopFrequency = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      setIsPlaying(false);
      setProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full bg-purple-950/60 border border-purple-400/30 rounded-2xl p-4 backdrop-blur-md"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-purple-300 font-mono text-xs tracking-wide mb-1">AI51 SYNTHESIS</p>
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-purple-400" />
              <p className="text-white/60 font-sans text-xs">generating frequency...</p>
            </div>
          ) : frequency ? (
            <>
              <p className="text-white font-bold text-sm">{frequency.frequency_hz}Hz</p>
              <p className="text-purple-200 font-sans text-xs mt-1">{frequency.affirmation}</p>
            </>
          ) : null}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-purple-400/20 rounded transition-colors"
        >
          <X className="w-4 h-4 text-purple-300" />
        </button>
      </div>

      {frequency && !isGenerating && (
        <>
          {/* Progress bar */}
          <div className="w-full bg-purple-900/50 rounded-full h-1 mb-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Play button */}
          <button
            onClick={isPlaying ? stopFrequency : playFrequency}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 py-2 bg-purple-500/40 hover:bg-purple-500/60 border border-purple-400/50 rounded-lg transition-all text-white font-sans text-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Play Frequency
              </>
            )}
          </button>
        </>
      )}
    </motion.div>
  );
}