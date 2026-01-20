/**
 * BIOMETRIC LEARNING SYSTEM
 * Tracks what works for each user across sessions
 * Builds personalized healing profiles over time
 * 
 * Architecture: Storage agnostic (can swap IndexedDB, Base44 DB, etc.)
 * Extensible: add new biometric sensors without touching core logic
 */

import { base44 } from '@/api/base44Client';

export class BiometricLearning {
  constructor() {
    this.userId = null;
    this.sessions = [];
    this.learningPatterns = {};
    this.isReady = false;
  }

  /**
   * Initialize for a specific user
   * Load all past sessions and build learning patterns
   */
  async initialize(userId) {
    this.userId = userId;
    await this.loadSessionHistory();
    this.buildLearningPatterns();
    this.isReady = true;
  }

  /**
   * CORE: Save a healing session for future learning
   * This is how we build the user's healing profile
   */
  async saveSession(sessionData) {
    const session = {
      userId: this.userId,
      sessionType: sessionData.type, // 'pain', 'anxiety', 'sleep', etc.
      frequencies: sessionData.frequencies,
      duration: sessionData.duration,
      biometricsStart: sessionData.biometricsStart,
      biometricsEnd: sessionData.biometricsEnd,
      userRating: sessionData.rating,
      notes: sessionData.notes,
      timestamp: Date.now()
    };

    // Store locally first (offline-friendly)
    this.sessions.push(session);
    await this.saveToLocalStorage(session);

    // Sync to Base44 when online
    if (navigator.onLine) {
      try {
        await base44.entities.HealingSession.create({
          user_id: this.userId,
          session_type: session.sessionType,
          frequencies_used: JSON.stringify(session.frequencies),
          biometrics_improvement: this.calculateImprovement(
            session.biometricsStart,
            session.biometricsEnd
          ),
          user_rating: session.userRating,
          notes: session.notes
        });
      } catch (e) {
        console.log('Sync pending:', e);
      }
    }

    return session;
  }

  /**
   * Get what frequencies work best for a specific healing intention
   * Learns from past sessions: if 5Hz worked 80% of the time, recommend it again
   */
  getRecommendedFrequencies(healingType) {
    const relevantSessions = this.sessions.filter(s => s.sessionType === healingType);
    if (relevantSessions.length < 2) return null;

    // Find most successful frequencies
    const successfulSessions = relevantSessions
      .filter(s => s.userRating >= 4) // User rated it 4-5 stars
      .map(s => s.frequencies);

    if (successfulSessions.length === 0) return null;

    // Aggregate: which frequencies appear most in successful sessions?
    const frequencyScores = {};
    successfulSessions.forEach(freqSet => {
      if (freqSet.primary_hz) {
        frequencyScores[freqSet.primary_hz] = (frequencyScores[freqSet.primary_hz] || 0) + 1;
      }
    });

    const topFrequency = Object.entries(frequencyScores)
      .sort(([, a], [, b]) => b - a)[0];

    return topFrequency ? topFrequency[0] : null;
  }

  /**
   * Get user's overall healing profile
   * Used for personalization across the app
   */
  getUserProfile() {
    if (this.sessions.length === 0) return null;

    const avgRating = this.sessions.reduce((sum, s) => sum + s.userRating, 0) / this.sessions.length;
    const sessionsByType = {};

    this.sessions.forEach(s => {
      sessionsByType[s.sessionType] = (sessionsByType[s.sessionType] || 0) + 1;
    });

    return {
      totalSessions: this.sessions.length,
      avgSatisfaction: parseFloat(avgRating.toFixed(1)),
      favoriteHealingTypes: Object.entries(sessionsByType)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([type]) => type),
      lastSession: this.sessions[this.sessions.length - 1]?.timestamp,
      learningPatterns: this.learningPatterns
    };
  }

  /**
   * PRIVATE: Load all session history from storage
   */
  async loadSessionHistory() {
    try {
      // Try Base44 first
      if (navigator.onLine && this.userId) {
        const response = await base44.entities.HealingSession.filter({
          user_id: this.userId
        }, '-created_date', 100);

        if (response && response.length > 0) {
          this.sessions = response.map(s => ({
            userId: s.user_id,
            sessionType: s.session_type,
            frequencies: JSON.parse(s.frequencies_used || '{}'),
            duration: s.duration,
            biometricsStart: JSON.parse(s.biometrics_start || '{}'),
            biometricsEnd: JSON.parse(s.biometrics_end || '{}'),
            userRating: s.user_rating,
            notes: s.notes,
            timestamp: new Date(s.created_date).getTime()
          }));
        }
      }

      // Fall back to localStorage (offline)
      const localSessions = JSON.parse(localStorage.getItem(`healing_sessions_${this.userId}`) || '[]');
      this.sessions = [...localSessions, ...this.sessions];
    } catch (e) {
      console.error('Error loading session history:', e);
    }
  }

  /**
   * PRIVATE: Save session to localStorage for offline access
   */
  async saveToLocalStorage(session) {
    try {
      const existing = JSON.parse(localStorage.getItem(`healing_sessions_${this.userId}`) || '[]');
      existing.push(session);
      localStorage.setItem(`healing_sessions_${this.userId}`, JSON.stringify(existing));
    } catch (e) {
      console.error('localStorage save error:', e);
    }
  }

  /**
   * PRIVATE: Build learning patterns from session history
   * These patterns inform future frequency recommendations
   */
  buildLearningPatterns() {
    const patterns = {
      bestTimeOfDay: null,
      bestDuration: null,
      frequencyCorrelations: {},
      sessionTypeSuccess: {}
    };

    // Find which session types have highest success rate
    const typeGroups = {};
    this.sessions.forEach(s => {
      if (!typeGroups[s.sessionType]) {
        typeGroups[s.sessionType] = [];
      }
      typeGroups[s.sessionType].push(s.userRating);
    });

    Object.entries(typeGroups).forEach(([type, ratings]) => {
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      patterns.sessionTypeSuccess[type] = parseFloat(avg.toFixed(1));
    });

    this.learningPatterns = patterns;
  }

  /**
   * PRIVATE: Calculate improvement between biometrics
   */
  calculateImprovement(start, end) {
    if (!start || !end) return 0;

    let improvements = 0;
    let count = 0;

    if (start.stressLevel && end.stressLevel) {
      improvements += (start.stressLevel - end.stressLevel) / start.stressLevel;
      count++;
    }

    if (start.hrv && end.hrv) {
      improvements += (end.hrv - start.hrv) / start.hrv;
      count++;
    }

    return count > 0 ? parseFloat((improvements / count * 100).toFixed(0)) : 0;
  }
}

// Export for use in components
export const biometricLearning = new BiometricLearning();