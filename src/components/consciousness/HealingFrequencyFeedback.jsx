import React, { useEffect, useRef } from 'react';

/**
 * HEALING FREQUENCY FEEDBACK
 * Plays frequencies based on consciousness state
 * 432Hz base + harmonics adapt to stress/heart
 */

export default function HealingFrequencyFeedback({ consciousnessState, enabled = false }) {
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);

  useEffect(() => {
    if (!enabled || !consciousnessState) return;

    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;

    // Clean up existing oscillators
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    oscillatorsRef.current = [];

    // Map consciousness to frequencies
    const { stress, heartRate, emotion } = consciousnessState;

    // Base: 432Hz (love frequency)
    const baseFreq = 432;
    
    // Adapt based on state
    let targetFreq = baseFreq;
    let volume = 0.1;

    if (stress > 70) {
      // High stress: add 7.83Hz (Schumann) for grounding
      targetFreq = 7.83;
      volume = 0.15;
    } else if (emotion === 'anxious') {
      // Anxiety: 528Hz (healing)
      targetFreq = 528;
      volume = 0.12;
    } else if (emotion === 'flow') {
      // Flow state: pure 432Hz
      targetFreq = 432;
      volume = 0.08;
    }

    // Create oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 2);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    oscillatorsRef.current.push(osc);

    // Fade out after 10 seconds
    setTimeout(() => {
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      setTimeout(() => {
        try { osc.stop(); } catch(e) {}
      }, 2000);
    }, 10000);

    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
    };
  }, [consciousnessState, enabled]);

  return null; // No UI - just audio
}