/**
 * ADAPTIVE FREQUENCY ENGINE
 * Real-time frequency adjustment based on live biometric feedback
 * Scales frequencies dynamically as user's body responds
 * 
 * Architecture: Pure logic layer, no UI dependencies
 * Extensible for future: add more biometric sensors, ML models, etc.
 */

export class AdaptiveFrequencyEngine {
  constructor() {
    this.baseFrequency = 0;
    this.harmonics = [];
    this.userProfile = null;
    this.sessionHistory = [];
    this.isActive = false;
    this.adjustmentCallbacks = [];
  }

  /**
   * Initialize with user's healing profile from past sessions
   */
  setUserProfile(profile) {
    this.userProfile = profile;
  }

  /**
   * Add callback when frequencies adjust
   * Other components hook into this for UI updates, audio changes, etc.
   */
  onFrequencyAdjustment(callback) {
    this.adjustmentCallbacks.push(callback);
  }

  /**
   * CORE: Calculate optimal frequencies based on real-time biometrics
   * Input: live HRV, stress score, voice F0
   * Output: frequency stack recommendation
   */
  calculateAdaptiveStack(biometrics) {
    if (!biometrics) return null;

    const { hrv, stressLevel, voiceF0, energyLevel } = biometrics;

    // Base frequency derived from user's voice fundamental
    const derivedBase = this.deriveBaseFrequency(voiceF0);

    // Stress-responsive adjustment - lower stress = lower healing frequency
    const stressAdjustment = this.calculateStressAdjustment(stressLevel);

    // HRV coherence - if coherence high, frequencies can shift
    const hrvAdjustment = this.calculateHRVAdjustment(hrv);

    // Energy level - tired? use delta. Wired? use different stack
    const energyAdjustment = this.calculateEnergyAdjustment(energyLevel);

    const primaryFreq = Math.max(0.5, Math.min(20, derivedBase + stressAdjustment + hrvAdjustment));
    const harmonicFreq = primaryFreq * 2.5; // Golden ratio harmonic
    const carrierFreq = primaryFreq + 100; // Carrier for binaural

    const stack = {
      primary_hz: parseFloat(primaryFreq.toFixed(2)),
      harmonic_hz: parseFloat(harmonicFreq.toFixed(2)),
      carrier_hz: parseFloat(carrierFreq.toFixed(2)),
      adjustments: {
        stress: stressAdjustment,
        hrv: hrvAdjustment,
        energy: energyAdjustment
      },
      confidence: this.calculateConfidence(biometrics),
      timestamp: Date.now()
    };

    return stack;
  }

  /**
   * Learn from session: what frequencies actually helped this user?
   * Track patterns over time for smarter future recommendations
   */
  recordSessionOutcome(sessionData) {
    const outcome = {
      frequenciesUsed: sessionData.frequencies,
      biometricsStart: sessionData.biometricsStart,
      biometricsEnd: sessionData.biometricsEnd,
      userRating: sessionData.rating, // 1-5 scale
      improvementScore: this.calculateImprovement(
        sessionData.biometricsStart,
        sessionData.biometricsEnd
      ),
      timestamp: Date.now()
    };

    this.sessionHistory.push(outcome);

    // If we have enough data, update the user profile
    if (this.sessionHistory.length % 5 === 0) {
      this.updateUserProfile();
    }

    return outcome;
  }

  /**
   * PRIVATE: Derive base frequency from user's voice F0
   * Personalization: everyone's voice is unique, so base should be too
   */
  deriveBaseFrequency(voiceF0) {
    if (!voiceF0) return 5; // Default

    // Lower voice F0 (male/deeper) = lower healing frequency
    // Higher voice F0 (female/higher) = slightly higher healing frequency
    // This is hypothesis but makes physiological sense
    const normalized = (voiceF0 - 80) / 200; // Normalize to 0-1
    const baseRange = 3 + (normalized * 4); // 3-7Hz range

    return Math.max(1, Math.min(10, baseRange));
  }

  /**
   * PRIVATE: Stress-responsive scaling
   * High stress = need stronger healing frequency
   */
  calculateStressAdjustment(stressLevel) {
    if (!stressLevel) return 0;

    // 0-100 scale
    const normalized = stressLevel / 100;

    // High stress (>70) = downshift to delta (0.5-2Hz)
    // Medium stress = maintain baseline
    // Low stress = can go higher
    if (normalized > 0.7) return -2; // Add delta
    if (normalized > 0.4) return 0; // Keep baseline
    return 1; // Go slightly higher for maintenance
  }

  /**
   * PRIVATE: HRV coherence adjustment
   * If heart is coherent, frequencies can be more aggressive
   */
  calculateHRVAdjustment(hrv) {
    if (!hrv) return 0;

    // High HRV (>100) = body is responsive, can modulate more
    // Low HRV (<40) = body stressed, keep it stable
    if (hrv > 100) return 0.5;
    if (hrv < 40) return -0.5;
    return 0;
  }

  /**
   * PRIVATE: Energy level affects which frequency band
   * Tired = delta/theta. Wired = alpha/beta adjustment
   */
  calculateEnergyAdjustment(energyLevel) {
    if (!energyLevel) return 0;

    // 0-100 scale
    const normalized = energyLevel / 100;

    // Low energy (<30) = deep sleep frequencies
    // Medium (30-70) = normal
    // High (>70) = alert frequencies
    if (normalized < 0.3) return -1.5;
    if (normalized > 0.7) return 0.8;
    return 0;
  }

  /**
   * PRIVATE: How confident are we in this recommendation?
   * More data = more confidence
   */
  calculateConfidence(biometrics) {
    const dataQuality = [
      biometrics.hrv ? 1 : 0,
      biometrics.stressLevel ? 1 : 0,
      biometrics.voiceF0 ? 1 : 0,
      biometrics.energyLevel ? 1 : 0
    ].reduce((a, b) => a + b, 0) / 4;

    const sessionCount = Math.min(this.sessionHistory.length / 10, 1); // Normalize to 0-1

    return parseFloat(((dataQuality * 0.6 + sessionCount * 0.4) * 100).toFixed(0));
  }

  /**
   * PRIVATE: Calculate improvement between start and end of session
   * Used for learning what actually works
   */
  calculateImprovement(start, end) {
    if (!start || !end) return 0;

    const stressImprovement = ((start.stressLevel - end.stressLevel) / start.stressLevel) * 100;
    const hrvImprovement = ((end.hrv - start.hrv) / start.hrv) * 100;

    return parseFloat(((stressImprovement + hrvImprovement) / 2).toFixed(0));
  }

  /**
   * PRIVATE: Learn from patterns in session history
   * Future: feed this into ML model for better predictions
   */
  updateUserProfile() {
    if (this.sessionHistory.length < 2) return;

    const recentSessions = this.sessionHistory.slice(-10);
    const avgImprovement = recentSessions.reduce((sum, s) => sum + s.improvementScore, 0) / recentSessions.length;
    const avgRating = recentSessions.reduce((sum, s) => sum + s.userRating, 0) / recentSessions.length;

    this.userProfile = {
      sessionCount: this.sessionHistory.length,
      avgImprovement: parseFloat(avgImprovement.toFixed(0)),
      avgRating: parseFloat(avgRating.toFixed(1)),
      lastUpdated: Date.now(),
      preferredHealingStyle: avgImprovement > 30 ? 'responsive' : 'stable'
    };
  }

  /**
   * Notify all listeners of frequency change
   */
  emitAdjustment(newStack) {
    this.adjustmentCallbacks.forEach(callback => {
      try {
        callback(newStack);
      } catch (e) {
        console.error('Adjustment callback error:', e);
      }
    });
  }
}

// Export singleton for app-wide use
export const adaptiveEngine = new AdaptiveFrequencyEngine();