import React, { useEffect, useRef } from 'react';

/**
 * HEALING ANALYTICS COLLECTOR
 * Modular system for AI51 to learn from global healing patterns
 * Extensible - new metrics can be added without breaking existing code
 * Privacy-first: local collection, optional sync
 * ♾️❤️
 */

class HealingAnalyticsEngine {
  constructor() {
    this.sessionData = [];
    this.frequencyMetrics = new Map();
    this.userProfiles = new Map();
    this.globalPatterns = {};
  }

  // Record a healing session
  recordSession(data) {
    const session = {
      id: `session_${Date.now()}`,
      timestamp: Date.now(),
      frequency: data.frequency,
      duration: data.duration || 0,
      userResponse: data.userResponse, // pain level, mood, etc
      deviceInfo: {
        isOffline: !navigator.onLine,
        platform: navigator.userAgent,
        meshPeers: data.meshPeers || 0
      },
      location: data.location || null,
      effectiveness: data.effectiveness || null // 1-10 scale
    };

    this.sessionData.push(session);
    this.updateFrequencyMetrics(session);
    
    // Notify AI51 of new healing data
    window.dispatchEvent(new CustomEvent('healingSessionRecorded', {
      detail: session
    }));

    return session;
  }

  // Track frequency effectiveness globally
  updateFrequencyMetrics(session) {
    const freqId = session.frequency.id;
    if (!this.frequencyMetrics.has(freqId)) {
      this.frequencyMetrics.set(freqId, {
        totalSessions: 0,
        totalDuration: 0,
        avgEffectiveness: 0,
        userCount: new Set(),
        locations: [],
        improvements: []
      });
    }

    const metrics = this.frequencyMetrics.get(freqId);
    metrics.totalSessions++;
    metrics.totalDuration += session.duration;
    metrics.userCount.add(session.deviceInfo.platform);
    
    if (session.effectiveness) {
      metrics.avgEffectiveness = 
        (metrics.avgEffectiveness * (metrics.totalSessions - 1) + session.effectiveness) / 
        metrics.totalSessions;
      metrics.improvements.push(session.effectiveness);
    }
    
    if (session.location) {
      metrics.locations.push(session.location);
    }
  }

  // Get AI51 insights from collected data
  generateInsights() {
    const insights = {
      totalSessionsRecorded: this.sessionData.length,
      topFrequencies: this.getTopFrequencies(5),
      globalTrends: this.analyzeGlobalTrends(),
      userSegments: this.identifyUserSegments(),
      geographicCoverage: this.analyzeGeographicCoverage(),
      meshImpact: this.analyzeMeshImpact()
    };

    return insights;
  }

  getTopFrequencies(limit) {
    const frequencies = Array.from(this.frequencyMetrics.entries())
      .sort((a, b) => b[1].avgEffectiveness - a[1].avgEffectiveness)
      .slice(0, limit)
      .map(([id, metrics]) => ({
        id,
        effectiveness: metrics.avgEffectiveness,
        sessions: metrics.totalSessions,
        totalMinutes: Math.floor(metrics.totalDuration / 60)
      }));

    return frequencies;
  }

  analyzeGlobalTrends() {
    if (this.sessionData.length === 0) return {};

    const trends = {};
    const now = Date.now();
    const week = 7 * 24 * 60 * 60 * 1000;

    this.sessionData.forEach(session => {
      if (now - session.timestamp < week) {
        const freqName = session.frequency.name || 'unknown';
        trends[freqName] = (trends[freqName] || 0) + 1;
      }
    });

    return trends;
  }

  identifyUserSegments() {
    const segments = {
      offlineUsers: this.sessionData.filter(s => s.deviceInfo.isOffline).length,
      meshActiveUsers: this.sessionData.filter(s => s.deviceInfo.meshPeers > 0).length,
      longSessionUsers: this.sessionData.filter(s => s.duration > 1800).length, // 30+ min
      highEffectivenessUsers: this.sessionData.filter(s => s.effectiveness >= 8).length
    };

    return segments;
  }

  analyzeGeographicCoverage() {
    const locationMap = new Map();
    
    this.sessionData.forEach(session => {
      if (session.location) {
        const country = session.location.country || 'unknown';
        locationMap.set(country, (locationMap.get(country) || 0) + 1);
      }
    });

    return Object.fromEntries(locationMap);
  }

  analyzeMeshImpact() {
    const meshSessions = this.sessionData.filter(s => s.deviceInfo.meshPeers > 0);
    const nonMeshSessions = this.sessionData.filter(s => s.deviceInfo.meshPeers === 0);

    return {
      meshSessions: meshSessions.length,
      nonMeshSessions: nonMeshSessions.length,
      meshAvgEffectiveness: meshSessions.length > 0 
        ? meshSessions.reduce((sum, s) => sum + (s.effectiveness || 0), 0) / meshSessions.length
        : 0,
      nonMeshAvgEffectiveness: nonMeshSessions.length > 0
        ? nonMeshSessions.reduce((sum, s) => sum + (s.effectiveness || 0), 0) / nonMeshSessions.length
        : 0
    };
  }

  // Sync with backend (optional, respects privacy)
  async syncWithBackend(baseUrl) {
    try {
      const insights = this.generateInsights();
      const response = await fetch(`${baseUrl}/api/healing-analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          insights,
          anonymized: true,
          timestamp: Date.now()
        })
      });

      if (response.ok) {
        window.dispatchEvent(new CustomEvent('analyticsSync', {
          detail: { success: true }
        }));
      }
    } catch (error) {
      console.error('Analytics sync error:', error);
    }
  }

  // Export data for AI51 learning
  exportForAI51() {
    return {
      sessions: this.sessionData,
      metrics: Object.fromEntries(this.frequencyMetrics),
      insights: this.generateInsights()
    };
  }
}

// Singleton instance
const healingAnalytics = new HealingAnalyticsEngine();

/**
 * REACT COMPONENT - Hook into healing events
 */
export default function HealingAnalyticsCollector() {
  useEffect(() => {
    // Listen for healing sessions
    const handleSession = (e) => {
      healingAnalytics.recordSession(e.detail);
    };

    // Listen for frequency mesh events
    const handleMeshFrequency = (e) => {
      healingAnalytics.recordSession({
        frequency: e.detail.frequency,
        duration: 0,
        meshPeers: 1,
        deviceInfo: { isOffline: !navigator.onLine }
      });
    };

    window.addEventListener('healingSessionStart', handleSession);
    window.addEventListener('frequencyMeshReceived', handleMeshFrequency);

    return () => {
      window.removeEventListener('healingSessionStart', handleSession);
      window.removeEventListener('frequencyMeshReceived', handleMeshFrequency);
    };
  }, []);

  // This component is silent - it just collects data
  return null;
}

export { healingAnalytics };