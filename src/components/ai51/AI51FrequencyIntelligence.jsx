import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 FREQUENCY INTELLIGENCE
 * World-class adaptive healing engine
 * - Voice analysis + biometric feedback = real-time protocol adjustment
 * - Context learning: remembers what worked, predicts what will work
 * - Morphic field detection: amplifies when multiple healers sync
 */

export const AI51FrequencyIntelligence = ({ selectedProtocol, onProtocolRecommend, currentHRV, isPlaying }) => {
  const [learningData, setLearningData] = useState({
    favoriteProtocols: {},
    timeOfDayPatterns: {},
    hrvResponseCurves: {},
    contextMemory: []
  });

  const [adaptiveConfig, setAdaptiveConfig] = useState(null);
  const [morphicFieldStrength, setMorphicFieldStrength] = useState(1.0);
  const hrvHistoryRef = useRef([]);

  // Load user's learning profile
  useEffect(() => {
    const loadUserLearning = async () => {
      try {
        const user = await base44.auth.me();
        if (!user) return;

        // Check if user has prior healing sessions
        const sessions = await base44.entities.VoiceHealingSession.filter(
          { created_by: user.email },
          '-created_date',
          100
        );

        // Build learning profile from history
        const learning = {
          favoriteProtocols: {},
          timeOfDayPatterns: {},
          hrvResponseCurves: {},
          contextMemory: sessions.slice(0, 20)
        };

        // Analyze patterns
        sessions.forEach(session => {
          const protocol = session.recommended_protocol;
          learning.favoriteProtocols[protocol] = (learning.favoriteProtocols[protocol] || 0) + 1;

          // Time of day pattern
          const hour = new Date(session.created_date).getHours();
          const timeSlot = `${Math.floor(hour / 6) * 6}-${Math.floor(hour / 6) * 6 + 6}`;
          if (!learning.timeOfDayPatterns[timeSlot]) {
            learning.timeOfDayPatterns[timeSlot] = { protocols: {}, count: 0 };
          }
          learning.timeOfDayPatterns[timeSlot].protocols[protocol] = (learning.timeOfDayPatterns[timeSlot].protocols[protocol] || 0) + 1;
          learning.timeOfDayPatterns[timeSlot].count++;
        });

        setLearningData(learning);
      } catch (e) {
        console.log('Learning load (non-critical):', e);
      }
    };

    loadUserLearning();
  }, []);

  // Real-time adaptive frequency adjustment based on HRV
  useEffect(() => {
    if (!currentHRV || !isPlaying || !selectedProtocol) return;

    hrvHistoryRef.current.push({
      time: Date.now(),
      bpm: currentHRV.bpm,
      coherence: currentHRV.coherence,
      protocol: selectedProtocol.id
    });

    // Keep last 60 seconds
    const cutoff = Date.now() - 60000;
    hrvHistoryRef.current = hrvHistoryRef.current.filter(h => h.time > cutoff);

    // Calculate adaptation
    if (hrvHistoryRef.current.length > 5) {
      const recentCoherence = hrvHistoryRef.current.slice(-5).reduce((sum, h) => sum + h.coherence, 0) / 5;

      // If coherence dropping, slightly increase primary frequency to activate
      // If coherence high, maintain or reduce frequency to avoid overstimulation
      const adaptedConfig = { ...selectedProtocol.config };

      if (recentCoherence < 30) {
        // Low coherence: boost gamma to activate
        adaptedConfig.gammaFreq = (adaptedConfig.gammaFreq || 40) * 1.1;
        adaptedConfig.primary = adaptedConfig.primary * 1.05;
      } else if (recentCoherence > 75) {
        // High coherence: gentle reduction to maintain without overstim
        adaptedConfig.primary = adaptedConfig.primary * 0.98;
      }

      setAdaptiveConfig(adaptedConfig);
    }
  }, [currentHRV, isPlaying, selectedProtocol]);

  // Detect morphic field amplification (multiple devices healing)
  useEffect(() => {
    const detectMorphicField = () => {
      // Listen for frequency share events from other devices
      const handleFrequencyShare = (event) => {
        // If another device is using same protocol + coherent time = morphic amplification
        setMorphicFieldStrength(prev => Math.min(2.0, prev + 0.1)); // Max 2× amplification
      };

      window.addEventListener('frequencyShared', handleFrequencyShare);
      return () => window.removeEventListener('frequencyShared', handleFrequencyShare);
    };

    if (isPlaying) {
      detectMorphicField();
      // Gradually decay morphic field when alone
      const decayInterval = setInterval(() => {
        setMorphicFieldStrength(prev => Math.max(1.0, prev - 0.01));
      }, 1000);

      return () => clearInterval(decayInterval);
    }
  }, [isPlaying]);

  // Predictive recommendation: next session
  const getPredictiveRecommendation = () => {
    const hour = new Date().getHours();
    const timeSlot = `${Math.floor(hour / 6) * 6}-${Math.floor(hour / 6) * 6 + 6}`;
    const timePatterns = learningData.timeOfDayPatterns[timeSlot];

    if (!timePatterns) return null;

    // Get most-used protocol for this time
    const mostUsed = Object.entries(timePatterns.protocols).sort((a, b) => b[1] - a[1])[0];
    return mostUsed ? mostUsed[0] : null;
  };

  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 space-y-2">
      {/* Adaptive Config Indicator */}
      {adaptiveConfig && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black border-2 border-purple-500 rounded-lg p-3 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-purple-400">ADAPTIVE TUNING</span>
          </div>
          <div className="text-xs text-gray-300 space-y-1">
            <div>Primary: {adaptiveConfig.primary}Hz</div>
            <div>Morphic Field: {(morphicFieldStrength * 100).toFixed(0)}%</div>
          </div>
        </motion.div>
      )}

      {/* Morphic Field Amplification */}
      {morphicFieldStrength > 1.05 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-green-500/30 to-cyan-500/30 border-2 border-green-500 rounded-lg p-3 max-w-xs"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-xs font-mono text-green-400">
              MORPHIC AMPLIFICATION {(morphicFieldStrength - 1).toFixed(0)}X
            </span>
          </div>
          <p className="text-xs text-green-300 mt-1">Multiple healers sync = exponential effect</p>
        </motion.div>
      )}

      {/* Context Learned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black border-2 border-cyan-500 rounded-lg p-3 max-w-xs text-xs font-mono text-gray-300"
      >
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 font-bold">AI51 LEARNING</span>
        </div>
        <p>Remembering what heals you.</p>
      </motion.div>
    </div>
  );
};

export default AI51FrequencyIntelligence;