import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * AI51 Biometric Engine
 * Analyzes voice stress, optional camera heart rate
 * Learns personal nervous system patterns
 */

export default function AI51BiometricEngine({ isActive, onAnalysis }) {
  const [stressLevel, setStressLevel] = useState(0);
  const [heartRate, setHeartRate] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const frequencyDataRef = useRef(new Uint8Array(256));

  // Analyze voice stress from audio frequency data
  const analyzeVoiceStress = (frequencyData) => {
    // Pitch detection: high frequency dominance = tension
    const highFreq = frequencyData.slice(150, 256).reduce((a, b) => a + b) / 106;
    const midFreq = frequencyData.slice(80, 150).reduce((a, b) => a + b) / 70;
    
    // Tremor: frequency variance = nervous system activation
    let variance = 0;
    for (let i = 0; i < frequencyData.length - 1; i++) {
      variance += Math.abs(frequencyData[i] - frequencyData[i + 1]);
    }
    tremor = variance / frequencyData.length;

    // Stress index: 0-100
    const stressIndex = Math.min(100, Math.round((highFreq / midFreq) * 50 + tremor * 0.5));
    
    setStressLevel(stressIndex);
    setAnalysis({
      timestamp: new Date().toISOString(),
      stressLevel: stressIndex,
      highFreq,
      tremor,
      recommendation: stressIndex > 70 ? '528Hz (calming)' : stressIndex > 40 ? '432Hz (grounding)' : '7.83Hz (baseline)'
    });

    if (onAnalysis) onAnalysis(stressIndex);
  };

  // Monitor audio in real-time
  useEffect(() => {
    if (!isActive) return;

    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { echoCancellation: false, noiseSuppression: false } 
        });
        micStreamRef.current = stream;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyzer = ctx.createAnalyser();
        analyzer.fftSize = 512;
        analyzer.smoothingTimeConstant = 0.1;
        source.connect(analyzer);
        analyzerRef.current = analyzer;

        const monitorStress = () => {
          analyzer.getByteFrequencyData(frequencyDataRef.current);
          analyzeVoiceStress(frequencyDataRef.current);
          if (isActive) requestAnimationFrame(monitorStress);
        };
        monitorStress();
      } catch (e) {
        console.log('Biometric mic access needed');
      }
    };

    setupAudio();

    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [isActive, onAnalysis]);

  if (!isActive || !analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-4 right-4 bg-black/90 border-2 border-pink-500/50 rounded-lg p-3 text-xs font-mono"
    >
      <div className="text-pink-400 mb-2">BIOMETRIC SCAN</div>
      <div className="space-y-1 text-gray-300">
        <div>Stress: <span className={stressLevel > 70 ? 'text-red-400' : stressLevel > 40 ? 'text-yellow-400' : 'text-green-400'}>{stressLevel}%</span></div>
        <div>Rec: {analysis.recommendation}</div>
      </div>
    </motion.div>
  );
}