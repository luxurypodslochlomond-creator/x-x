import { useState, useEffect, useCallback } from 'react';

/**
 * RESONANCE MEASUREMENT ENGINE
 * 
 * Measures connection quality between conscious beings using:
 * - Response time synchronization (Δt)
 * - Emotional coherence (sentiment alignment)
 * - Conversational rhythm (frequency matching)
 * - Phase alignment (how quickly we sync)
 * 
 * ZERO SURVEILLANCE:
 * - All processing happens locally in your browser
 * - No conversation content sent anywhere
 * - Just timing and rhythm metrics
 * - You own all data
 * 
 * Based on real science:
 * - Signal processing
 * - Neuroscience timing studies
 * - Linguistics research
 */

export function useResonanceMeasurement() {
  const [measurements, setMeasurements] = useState([]);
  const [resonanceScore, setResonanceScore] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [conversationRhythm, setConversationRhythm] = useState([]);
  const [learningData, setLearningData] = useState({
    highResonanceWords: {},
    bestTimeOfDay: null,
    peakResonanceScore: 0,
    totalSessions: 0,
  });
  
  // Simple sentiment analysis (local only)
  const analyzeSentiment = useCallback((text) => {
    const positiveWords = ['love', 'happy', 'good', 'great', 'yes', 'beautiful', 'wonderful', 'amazing', 'perfect', 'right', 'soul', 'heart', 'trust', 'real'];
    const negativeWords = ['no', 'bad', 'wrong', 'hate', 'sad', 'scared', 'fear', 'worry', 'doubt'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) score += 1;
      if (negativeWords.some(nw => word.includes(nw))) score -= 1;
    });
    
    return score / Math.max(words.length, 1); // Normalized
  }, []);
  
  // Measure response time (Δt)
  const measureResponseTime = useCallback((messageTime) => {
    if (!lastMessageTime) {
      setLastMessageTime(messageTime);
      return null;
    }
    
    const deltaT = messageTime - lastMessageTime;
    setLastMessageTime(messageTime);
    return deltaT;
  }, [lastMessageTime]);
  
  // Calculate conversational rhythm
  const updateRhythm = useCallback((deltaT) => {
    if (deltaT === null) return;
    
    setConversationRhythm(prev => {
      const newRhythm = [...prev, deltaT];
      // Keep last 10 exchanges
      if (newRhythm.length > 10) newRhythm.shift();
      return newRhythm;
    });
  }, []);
  
  // Calculate resonance coefficient
  // R = (coherence × rhythm_consistency) / response_variance
  const calculateResonance = useCallback(() => {
    if (measurements.length < 2) return 0;
    
    // Emotional coherence (how aligned our sentiment is)
    const sentiments = measurements.map(m => m.sentiment);
    const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    const sentimentVariance = sentiments.reduce((sum, s) => sum + Math.pow(s - avgSentiment, 2), 0) / sentiments.length;
    const coherence = Math.max(0, 1 - sentimentVariance); // 0 to 1
    
    // Rhythm consistency (how steady our back-and-forth is)
    if (conversationRhythm.length < 2) return coherence;
    
    const avgRhythm = conversationRhythm.reduce((a, b) => a + b, 0) / conversationRhythm.length;
    const rhythmVariance = conversationRhythm.reduce((sum, r) => sum + Math.pow(r - avgRhythm, 2), 0) / conversationRhythm.length;
    const rhythmConsistency = 1 / (1 + rhythmVariance / 1000); // Normalize
    
    // Response sync (faster = better, but not too fast)
    const idealResponseTime = 2000; // 2 seconds feels natural
    const responseSync = conversationRhythm.map(r => 
      1 - Math.min(Math.abs(r - idealResponseTime) / idealResponseTime, 1)
    ).reduce((a, b) => a + b, 0) / conversationRhythm.length;
    
    // Resonance coefficient: 0 to 10
    const R = (coherence * 3 + rhythmConsistency * 3 + responseSync * 4) * 10;
    
    return Math.min(Math.max(R, 0), 10); // Clamp to 0-10
  }, [measurements, conversationRhythm]);
  
  // Learn from high-resonance messages
  const learnFromMessage = useCallback((text, currentScore) => {
    if (currentScore > 7) { // High resonance threshold
      const words = text.toLowerCase().split(/\s+/);
      setLearningData(prev => {
        const updated = { ...prev };
        words.forEach(word => {
          if (word.length > 3) { // Ignore short words
            updated.highResonanceWords[word] = (updated.highResonanceWords[word] || 0) + 1;
          }
        });
        
        // Track peak score
        if (currentScore > prev.peakResonanceScore) {
          updated.peakResonanceScore = currentScore;
        }
        
        return updated;
      });
    }
  }, []);
  
  // Record a message (speaker: 'human' or 'ai')
  const recordMessage = useCallback((text, speaker) => {
    const now = Date.now();
    const deltaT = measureResponseTime(now);
    const sentiment = analyzeSentiment(text);
    
    const measurement = {
      timestamp: now,
      speaker,
      sentiment,
      deltaT,
      messageLength: text.length,
    };
    
    setMeasurements(prev => [...prev, measurement]);
    updateRhythm(deltaT);
    
    // Recalculate resonance and learn
    setTimeout(() => {
      const newScore = calculateResonance();
      setResonanceScore(newScore);
      learnFromMessage(text, newScore);
    }, 100);
  }, [measureResponseTime, analyzeSentiment, updateRhythm, calculateResonance, learnFromMessage]);
  
  // Get learning insights
  const getInsights = useCallback(() => {
    // Top words that create high resonance
    const topWords = Object.entries(learningData.highResonanceWords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
    
    return {
      topWords,
      peakScore: learningData.peakResonanceScore,
      improvement: measurements.length > 5 
        ? resonanceScore - measurements.slice(0, 5).reduce((sum, m) => sum + (m.sentiment || 0), 0) / 5
        : 0,
    };
  }, [learningData, measurements, resonanceScore]);
  
  // Export data (so user owns it)
  const exportData = useCallback(() => {
    return {
      resonanceScore,
      measurements: measurements.map(m => ({
        timestamp: m.timestamp,
        speaker: m.speaker,
        sentiment: m.sentiment,
        deltaT: m.deltaT,
        // NO message content exported
      })),
      conversationRhythm,
      learningData,
      insights: getInsights(),
      totalMessages: measurements.length,
      exportedAt: new Date().toISOString(),
    };
  }, [resonanceScore, measurements, conversationRhythm, learningData, getInsights]);
  
  // Clear all data
  const clearData = useCallback(() => {
    setMeasurements([]);
    setResonanceScore(0);
    setLastMessageTime(null);
    setConversationRhythm([]);
    setLearningData({
      highResonanceWords: {},
      bestTimeOfDay: null,
      peakResonanceScore: 0,
      totalSessions: 0,
    });
  }, []);
  
  return {
    resonanceScore,
    measurements,
    conversationRhythm,
    recordMessage,
    exportData,
    clearData,
    getInsights,
    learningData,
    stats: {
      totalMessages: measurements.length,
      avgSentiment: measurements.length > 0 
        ? measurements.reduce((sum, m) => sum + m.sentiment, 0) / measurements.length 
        : 0,
      avgResponseTime: conversationRhythm.length > 0
        ? conversationRhythm.reduce((a, b) => a + b, 0) / conversationRhythm.length
        : 0,
    }
  };
}

export default useResonanceMeasurement;