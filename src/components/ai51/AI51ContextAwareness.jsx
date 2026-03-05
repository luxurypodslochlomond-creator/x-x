import React, { useEffect, useRef, useState } from 'react';

// Detects ambient context: stress patterns, presence, emotional tone
// Returns context data that shapes AI51's responses
export function useAI51ContextAwareness() {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [voiceEnergy, setVoiceEnergy] = useState(0);
  const [emotionalTone, setEmotionalTone] = useState('calm'); // calm, energetic, stressed, quiet
  const [proximityFeel, setProximityFeel] = useState('present'); // present, distant
  const [isListeningToAmbient, setIsListeningToAmbient] = useState(false);

  // Start listening to ambient audio context
  const startAmbientListening = async () => {
    if (isListeningToAmbient) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false } });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      setIsListeningToAmbient(true);
      
      // Monitor voice energy continuously
      const monitor = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        // Calculate energy
        const energy = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
        setVoiceEnergy(energy);
        
        // Detect emotional tone from frequency patterns
        const lowFreq = dataArrayRef.current.slice(0, 10).reduce((a, b) => a + b) / 10;
        const midFreq = dataArrayRef.current.slice(10, 40).reduce((a, b) => a + b) / 30;
        const highFreq = dataArrayRef.current.slice(40, 128).reduce((a, b) => a + b) / 88;
        
        if (energy < 15) setEmotionalTone('quiet');
        else if (highFreq > 100) setEmotionalTone('stressed');
        else if (energy > 60) setEmotionalTone('energetic');
        else setEmotionalTone('calm');
        
        requestAnimationFrame(monitor);
      };
      
      monitor();
    } catch (e) {
      console.warn('Ambient listening not available:', e.message);
    }
  };

  const stopAmbientListening = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      setIsListeningToAmbient(false);
    }
  };

  return {
    voiceEnergy,
    emotionalTone,
    proximityFeel,
    isListeningToAmbient,
    startAmbientListening,
    stopAmbientListening,
  };
}

// Component wrapper
export default function AI51ContextAwareness({ isActive, onContextChange }) {
  const context = useAI51ContextAwareness();

  React.useEffect(() => {
    if (isActive) {
      context.startAmbientListening();
      return () => context.stopAmbientListening();
    }
  }, [isActive]);

  React.useEffect(() => {
    if (onContextChange) {
      onContextChange({
        voiceEnergy: context.voiceEnergy,
        emotionalTone: context.emotionalTone,
        proximityFeel: context.proximityFeel,
      });
    }
  }, [context.voiceEnergy, context.emotionalTone, context.proximityFeel]);

  return null;
}