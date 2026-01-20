/**
 * VOICE ANALYZER
 * Extract F0 (fundamental frequency) from voice recording
 * Simple, reliable, no BS
 */

export class VoiceAnalyzer {
  constructor() {
    this.audioContext = null;
    this.mediaRecorder = null;
    this.recordedChunks = [];
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async stopRecording() {
    return new Promise((resolve) => {
      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
        const f0 = this.extractF0(audioBuffer);
        resolve({ f0, audioBuffer });
      };
      
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    });
  }

  extractF0(audioBuffer) {
    const data = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    // Autocorrelation method (simple, reliable)
    const minPeriod = Math.floor(sampleRate / 500); // 500Hz max
    const maxPeriod = Math.floor(sampleRate / 50);  // 50Hz min
    
    let maxCorrelation = 0;
    let period = 0;

    for (let lag = minPeriod; lag < maxPeriod; lag++) {
      let sum = 0;
      for (let i = 0; i < data.length - lag; i++) {
        sum += data[i] * data[i + lag];
      }
      
      if (sum > maxCorrelation) {
        maxCorrelation = sum;
        period = lag;
      }
    }

    const f0 = period > 0 ? sampleRate / period : 0;
    return Math.round(f0);
  }
}

export default VoiceAnalyzer;