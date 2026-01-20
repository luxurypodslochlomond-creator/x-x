/**
 * HEALING SESSION
 * Orchestrates: Voice → Biometrics → Learn
 * Everything connected, auto-detects improvement
 */

import VoiceAnalyzer from './VoiceAnalyzer';
import BiometricCollector from './BiometricCollector';

export class HealingSession {
  constructor(healingIntent) {
    this.healingIntent = healingIntent;
    this.voiceAnalyzer = new VoiceAnalyzer();
    this.biometricCollector = new BiometricCollector();
    this.sessionData = {
      f0: null,
      startMetrics: null,
      endMetrics: null,
      improvement: null,
      duration: null
    };
    this.startTime = null;
  }

  async recordVoiceBaseline() {
    await this.voiceAnalyzer.startRecording();
    // Record for 5 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        this.voiceAnalyzer.stopRecording().then((result) => {
          this.sessionData.f0 = result.f0;
          resolve({ f0: result.f0 });
        });
      }, 5000);
    });
  }

  async startSession(videoRef, canvasRef) {
    this.startTime = Date.now();
    const bioResult = await this.biometricCollector.startCollection(videoRef, canvasRef);
    
    if (bioResult.success) {
      this.sessionData.startMetrics = bioResult.startMetrics;
    } else {
      // Fallback: user will provide manual stress input
      this.sessionData.startMetrics = null;
    }

    return bioResult;
  }

  async endSession(manualEndStress = null) {
    const duration = Date.now() - this.startTime;
    this.sessionData.duration = Math.round(duration / 1000);

    let result;
    if (manualEndStress !== null) {
      // Manual fallback
      const startStress = this.sessionData.startMetrics?.stress || 50;
      result = this.biometricCollector.setManualStress(startStress, manualEndStress);
    } else {
      // Auto-measure
      result = await this.biometricCollector.endCollection();
    }

    this.sessionData.endMetrics = result.endMetrics;
    this.sessionData.improvement = result.improvement;

    return this.getSessionSummary();
  }

  getSessionSummary() {
    return {
      healingIntent: this.healingIntent,
      f0Hz: this.sessionData.f0,
      durationSec: this.sessionData.duration,
      startMetrics: this.sessionData.startMetrics,
      endMetrics: this.sessionData.endMetrics,
      improvement: this.sessionData.improvement,
      learned: {
        note: `F0 ${this.sessionData.f0}Hz helped with ${this.healingIntent} - stress reduced ${Math.round(this.sessionData.improvement?.stressReduction)}%`
      }
    };
  }
}

export default HealingSession;