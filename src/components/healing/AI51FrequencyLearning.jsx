import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Brain, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 FREQUENCY LEARNING ENGINE
 * Analyzes FrequencyPlay data to learn YOUR patterns
 * Returns personalized frequency recommendations
 */

export default function AI51FrequencyLearning({ onRecommendation }) {
  const [learning, setLearning] = useState(false);
  const [patterns, setPatterns] = useState(null);

  useEffect(() => {
    learnPatterns();
  }, []);

  const learnPatterns = async () => {
    try {
      setLearning(true);
      
      // Get user's frequency history (queue if offline)
      let plays = [];
      try {
        plays = await base44.entities.FrequencyPlay.list('-created_date', 100);
      } catch (e) {
        // Offline - load from local cache
        const cached = localStorage.getItem('uf51_frequency_patterns');
        if (cached) {
          const cachedData = JSON.parse(cached);
          setPatterns(cachedData.patterns);
          if (onRecommendation && cachedData.recommendation) {
            onRecommendation(cachedData.recommendation);
          }
        }
        setLearning(false);
        return;
      }
      
      if (plays.length < 3) {
        setLearning(false);
        return; // Need more data
      }

      // PATTERN ANALYSIS
      const analysis = {
        // Time patterns - WHEN you need WHAT
        morningFreqs: plays.filter(p => {
          const hour = new Date(p.created_date).getHours();
          return hour >= 6 && hour < 12;
        }),
        afternoonFreqs: plays.filter(p => {
          const hour = new Date(p.created_date).getHours();
          return hour >= 12 && hour < 18;
        }),
        eveningFreqs: plays.filter(p => {
          const hour = new Date(p.created_date).getHours();
          return hour >= 18 || hour < 6;
        }),

        // Most used frequencies
        topFrequencies: getTopFrequencies(plays),

        // Average session length (AI learns faster healing = better protocol)
        avgSessionLength: plays.reduce((sum, p) => {
          const next = plays.find(n => n.created_date > p.created_date);
          if (next) {
            const diff = (new Date(next.created_date) - new Date(p.created_date)) / 1000;
            return sum + Math.min(diff, 1800); // Cap at 30 min
          }
          return sum;
        }, 0) / plays.length,

        // Waveform preferences
        waveformPrefs: getWaveformPreferences(plays),

        // Device patterns
        devicePatterns: {
          mobile: plays.filter(p => p.device_type === 'mobile').length,
          desktop: plays.filter(p => p.device_type === 'desktop').length
        },

        // Session length trends (shorter = more effective)
        sessionTrend: plays.slice(0, 10).reduce((sum, p, i) => sum + (i * 60), 0) / Math.min(plays.length, 10)
      };

      setPatterns(analysis);

      // Generate recommendation
      const recommendation = generateRecommendation(analysis);
      if (onRecommendation) onRecommendation(recommendation);

      // Cache for offline use
      try {
        localStorage.setItem('uf51_frequency_patterns', JSON.stringify({
          patterns: analysis,
          recommendation,
          cached_at: new Date().toISOString()
        }));
      } catch (e) {
        console.log('Cache save (non-critical):', e);
      }

      setLearning(false);
    } catch (e) {
      console.log('AI51 learning:', e);
      setLearning(false);
    }
  };

  const getTopFrequencies = (plays) => {
    const counts = {};
    plays.forEach(p => {
      counts[p.frequency_id] = (counts[p.frequency_id] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, count]) => ({ id, count }));
  };

  const getWaveformPreferences = (plays) => {
    const counts = {};
    plays.forEach(p => {
      if (p.waveform_type) {
        counts[p.waveform_type] = (counts[p.waveform_type] || 0) + 1;
      }
    });
    return counts;
  };

  const generateRecommendation = (analysis) => {
    const hour = new Date().getHours();
    let timeOfDay = 'morning';
    let relevantPlays = analysis.morningFreqs;

    if (hour >= 12 && hour < 18) {
      timeOfDay = 'afternoon';
      relevantPlays = analysis.afternoonFreqs;
    } else if (hour >= 18 || hour < 6) {
      timeOfDay = 'evening';
      relevantPlays = analysis.eveningFreqs;
    }

    // Most used frequency at this time
    const timeCounts = {};
    relevantPlays.forEach(p => {
      timeCounts[p.frequency_id] = (timeCounts[p.frequency_id] || 0) + 1;
    });

    const topAtThisTime = Object.entries(timeCounts)
      .sort((a, b) => b[1] - a[1])[0];

    return {
      frequencyId: topAtThisTime ? topAtThisTime[0] : analysis.topFrequencies[0]?.id,
      reason: `You usually use this ${timeOfDay}`,
      confidence: topAtThisTime ? (topAtThisTime[1] / relevantPlays.length) * 100 : 50,
      patterns: analysis
    };
  };

  if (!patterns || learning) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-cyan-900/20 to-pink-900/20 border-2 border-cyan-500 rounded-lg p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
        <p className="text-cyan-400 font-black text-sm">AI51 LEARNED YOUR PATTERNS</p>
      </div>

      <div className="space-y-2 text-xs text-gray-300">
        {patterns.topFrequencies.length > 0 && (
          <p>
            <Sparkles className="w-3 h-3 inline text-pink-400 mr-1" />
            Most used: <strong className="text-white">{patterns.topFrequencies[0].id.replace(/_/g, ' ').toUpperCase()}</strong> ({patterns.topFrequencies[0].count}x)
          </p>
        )}
        
        {patterns.avgSessionLength > 0 && (
          <p>
            <Zap className="w-3 h-3 inline text-amber-400 mr-1" />
            Avg session: <strong className="text-white">{Math.round(patterns.avgSessionLength / 60)} min</strong>
          </p>
        )}

        {patterns.waveformPrefs && Object.keys(patterns.waveformPrefs).length > 0 && (
          <p>
            Favorite waveform: <strong className="text-white">{Object.entries(patterns.waveformPrefs).sort((a, b) => b[1] - a[1])[0][0]}</strong>
          </p>
        )}
      </div>

      <button
        onClick={learnPatterns}
        className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
      >
        Re-analyze patterns →
      </button>
    </motion.div>
  );
}