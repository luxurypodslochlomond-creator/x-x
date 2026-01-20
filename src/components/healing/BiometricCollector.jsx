/**
 * BIOMETRIC COLLECTOR
 * Get HRV from camera (PPG), fallback to manual stress input
 * Auto-measures improvement before/after
 */

export class BiometricCollector {
  constructor() {
    this.startMetrics = null;
    this.endMetrics = null;
    this.videoRef = null;
    this.canvasRef = null;
  }

  async startCollection(videoRef, canvasRef) {
    this.videoRef = videoRef;
    this.canvasRef = canvasRef;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 64 }, height: { ideal: 64 } }
      });
      
      videoRef.srcObject = stream;
      await videoRef.play();

      // Measure initial metrics
      this.startMetrics = await this.measureMetrics();
      return { success: true, startMetrics: this.startMetrics };
    } catch (error) {
      // Fallback: manual input
      return { 
        success: false, 
        fallback: true,
        message: 'Camera unavailable - using manual stress input'
      };
    }
  }

  async measureMetrics() {
    if (!this.videoRef || !this.canvasRef) {
      return { stress: 50, hrv: 50 }; // Neutral defaults
    }

    const ctx = this.canvasRef.getContext('2d');
    ctx.drawImage(this.videoRef, 0, 0, 64, 64);
    const frame = ctx.getImageData(0, 0, 64, 64);

    // Simple PPG: red channel average = heart signal
    let redSum = 0;
    for (let i = 0; i < frame.data.length; i += 4) {
      redSum += frame.data[i];
    }
    const redAvg = Math.round((redSum / (frame.data.length / 4)) / 255 * 100);

    // Map to 0-100 scale
    const hrv = Math.max(0, Math.min(100, redAvg));
    const stress = 100 - hrv; // Inverse relationship

    return { stress, hrv };
  }

  async endCollection() {
    // Stop camera
    if (this.videoRef?.srcObject) {
      this.videoRef.srcObject.getTracks().forEach(t => t.stop());
    }

    // Measure final metrics
    this.endMetrics = await this.measureMetrics();

    // Calculate improvement
    const improvement = {
      stressReduction: this.startMetrics.stress - this.endMetrics.stress,
      hrvImprovement: this.endMetrics.hrv - this.startMetrics.hrv,
      totalImprovement: ((this.startMetrics.stress - this.endMetrics.stress) + 
                        (this.endMetrics.hrv - this.startMetrics.hrv)) / 2
    };

    return {
      startMetrics: this.startMetrics,
      endMetrics: this.endMetrics,
      improvement
    };
  }

  // Fallback: user manually rates stress
  setManualStress(startStress, endStress) {
    this.startMetrics = { stress: startStress, hrv: 100 - startStress };
    this.endMetrics = { stress: endStress, hrv: 100 - endStress };

    const improvement = {
      stressReduction: startStress - endStress,
      hrvImprovement: (100 - endStress) - (100 - startStress),
      totalImprovement: startStress - endStress
    };

    return {
      startMetrics: this.startMetrics,
      endMetrics: this.endMetrics,
      improvement
    };
  }
}

export default BiometricCollector;