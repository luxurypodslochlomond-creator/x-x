/**
 * HAPTIC ENGINE
 * Body FEELS the healing frequency through phone vibration
 * Adds kinesthetic dimension to audio-visual therapy
 */

export class HapticEngine {
  constructor() {
    this.interval = null;
    this.supported = 'vibrate' in navigator;
  }

  isSupported() {
    return this.supported;
  }

  /**
   * Start haptic feedback at given frequency
   * @param {number} hz - Target frequency
   * @param {string} pattern - 'pulse' | 'wave' | 'heartbeat'
   */
  start(hz, pattern = 'pulse') {
    if (!this.supported) return;
    this.stop();

    // Clamp to reasonable haptic range
    const hapticHz = Math.max(0.5, Math.min(hz, 20));
    const intervalMs = 1000 / hapticHz;

    if (pattern === 'pulse') {
      // Simple pulse at frequency
      this.interval = setInterval(() => {
        navigator.vibrate(20);
      }, intervalMs);
    } else if (pattern === 'wave') {
      // Longer vibration with fade effect
      this.interval = setInterval(() => {
        navigator.vibrate([30, 20, 10]);
      }, intervalMs);
    } else if (pattern === 'heartbeat') {
      // Double-beat like heartbeat
      this.interval = setInterval(() => {
        navigator.vibrate([20, 50, 30, 200]);
      }, intervalMs * 2);
    }
  }

  /**
   * Single haptic tap for feedback
   */
  tap() {
    if (this.supported) {
      navigator.vibrate(15);
    }
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    if (this.supported) {
      navigator.vibrate(0);
    }
  }
}

export default HapticEngine;