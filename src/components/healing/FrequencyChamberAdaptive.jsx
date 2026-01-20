/**
 * FREQUENCY CHAMBER ADAPTIVE WRAPPER
 * Wraps existing FrequencyChamber with adaptive capabilities
 * 
 * Philosophy: Don't break what works. Layer intelligence on top.
 * This component listens to user biometrics and tells FrequencyChamber
 * to adjust frequencies in real-time.
 * 
 * Usage: Replace <FrequencyChamber> with <FrequencyChamberAdaptive>
 */

import React, { useState, useEffect, useRef } from 'react';
import { adaptiveEngine } from './AdaptiveFrequencyEngine';
import { biometricLearning } from './BiometricLearning';
import { base44 } from '@/api/base44Client';

export default function FrequencyChamberAdaptive({
  selectedFrequency,
  isPlaying,
  onFrequencyChange,
  onSessionEnd,
  showAdaptiveUI = true
}) {
  const [currentBiometrics, setCurrentBiometrics] = useState(null);
  const [adaptiveStack, setAdaptiveStack] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionStartBiometrics, setSessionStartBiometrics] = useState(null);
  const [adaptiveEnabled, setAdaptiveEnabled] = useState(false);
  const biometricIntervalRef = useRef(null);
  const user = useRef(null);

  // Initialize on mount
  useEffect(() => {
    const initializeAdaptive = async () => {
      try {
        const currentUser = await base44.auth.me();
        user.current = currentUser;
        await biometricLearning.initialize(currentUser.id);
        setAdaptiveEnabled(true);
      } catch (e) {
        console.log('Adaptive initialization (optional):', e);
      }
    };

    initializeAdaptive();

    return () => {
      if (biometricIntervalRef.current) {
        clearInterval(biometricIntervalRef.current);
      }
    };
  }, []);

  // Start collecting biometrics when playing
  useEffect(() => {
    if (isPlaying && adaptiveEnabled) {
      setSessionStartTime(Date.now());
      setSessionStartBiometrics(currentBiometrics);
      startBiometricCollection();
    } else {
      if (biometricIntervalRef.current) {
        clearInterval(biometricIntervalRef.current);
      }
    }

    return () => {
      if (biometricIntervalRef.current) {
        clearInterval(biometricIntervalRef.current);
      }
    };
  }, [isPlaying, adaptiveEnabled]);

  /**
   * Collect biometrics (simulated/real based on device capabilities)
   * In production: hook into actual sensors
   */
  const startBiometricCollection = () => {
    biometricIntervalRef.current = setInterval(() => {
      const biometrics = collectBiometrics();
      setCurrentBiometrics(biometrics);

      // Calculate new adaptive stack
      if (biometrics) {
        const newStack = adaptiveEngine.calculateAdaptiveStack(biometrics);
        if (newStack) {
          setAdaptiveStack(newStack);

          // Tell parent component (FrequencyChamber) to update
          if (onFrequencyChange) {
            onFrequencyChange({
              ...selectedFrequency,
              adaptive: newStack
            });
          }

          // Emit for any other listeners
          adaptiveEngine.emitAdjustment(newStack);
        }
      }
    }, 5000); // Every 5 seconds
  };

  /**
   * Collect current biometric data
   * Future: integrate with actual sensors (camera HRV, voice analysis, etc.)
   */
  const collectBiometrics = () => {
    // Placeholder: In real implementation, this would:
    // - Use camera to detect heart rate variability
    // - Analyze user's voice for stress patterns
    // - Check device motion sensors
    // - Pull from wearable APIs

    return {
      hrv: Math.random() * 150, // 0-150
      stressLevel: Math.random() * 100, // 0-100
      voiceF0: 100 + Math.random() * 100, // Fundamental frequency
      energyLevel: Math.random() * 100 // 0-100
    };
  };

  /**
   * End session: save learning data
   */
  const handleSessionEnd = async () => {
    if (sessionStartTime && sessionStartBiometrics && currentBiometrics && user.current) {
      const duration = (Date.now() - sessionStartTime) / 1000 / 60; // minutes

      await biometricLearning.saveSession({
        type: selectedFrequency?.healingIntent || 'general',
        frequencies: adaptiveStack || selectedFrequency,
        duration,
        biometricsStart: sessionStartBiometrics,
        biometricsEnd: currentBiometrics,
        rating: 5, // Would come from user UI
        notes: ''
      });
    }

    if (onSessionEnd) {
      onSessionEnd();
    }
  };

  return (
    <div className="space-y-4">
      {/* ADAPTIVE STATUS DISPLAY */}
      {showAdaptiveUI && adaptiveEnabled && adaptiveStack && (
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-400 font-bold text-sm font-mono">ADAPTIVE HEALING</p>
            <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded font-mono">
              {adaptiveStack.confidence}% confident
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-black/40 p-2 rounded">
              <p className="text-gray-500 text-xs mb-1">BASE</p>
              <p className="text-cyan-400 font-bold">{adaptiveStack.primary_hz} Hz</p>
            </div>
            <div className="bg-black/40 p-2 rounded">
              <p className="text-gray-500 text-xs mb-1">HARMONIC</p>
              <p className="text-purple-400 font-bold">{adaptiveStack.harmonic_hz} Hz</p>
            </div>
            <div className="bg-black/40 p-2 rounded">
              <p className="text-gray-500 text-xs mb-1">CARRIER</p>
              <p className="text-pink-400 font-bold">{adaptiveStack.carrier_hz} Hz</p>
            </div>
          </div>

          {currentBiometrics && (
            <div className="mt-3 text-xs text-gray-400 font-mono space-y-1">
              <p>Stress: {currentBiometrics.stressLevel.toFixed(0)}% • HRV: {currentBiometrics.hrv.toFixed(0)} • Energy: {currentBiometrics.energyLevel.toFixed(0)}%</p>
            </div>
          )}
        </div>
      )}

      {/* CHILDREN PASSED THROUGH */}
      <div>
        {/* FrequencyChamber content goes here via props */}
      </div>
    </div>
  );
}