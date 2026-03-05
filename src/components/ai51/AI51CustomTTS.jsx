// AI51 Custom TTS Handler
// Manages local self-hosted speech generation with warm, human voice

import { base44 } from '@/api/base44Client';

export class AI51CustomTTS {
  constructor() {
    this.audioContext = null;
    this.currentAudio = null;
    this.isPlaying = false;
    this.useLocalTTS = true; // Default to local TTS
  }

  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not available:', e);
    }
  }

  async speak(text, lang = 'en-GB', voiceId = 'warm-scottish', onStart, onEnd) {
    if (!text || text.trim().length === 0) return;

    if (onStart) onStart();

    try {
      // Try local TTS first
      const audioUrl = await this.generateSpeech(text, lang, voiceId);
      
      if (audioUrl) {
        await this.playAudio(audioUrl, onEnd);
      } else {
        // Fallback to browser API if local TTS not available
        this.fallbackToNativeAPI(text, lang, onStart, onEnd);
      }
    } catch (error) {
      console.warn('TTS failed, falling back to native API:', error);
      this.fallbackToNativeAPI(text, lang, onStart, onEnd);
    }
  }

  async generateSpeech(text, lang, voiceId) {
    try {
      const response = await base44.functions.invoke('generateSpeech', {
        text,
        lang,
        voiceId
      });

      if (response.status === 'ready' && response.message?.includes('LOCAL_TTS_ENDPOINT')) {
        // Local TTS not configured yet, will use fallback
        return null;
      }

      // If we get audio data, create object URL
      if (response instanceof Blob || response instanceof ArrayBuffer) {
        return URL.createObjectURL(new Blob([response], { type: 'audio/wav' }));
      }

      return null;
    } catch (error) {
      console.warn('generateSpeech function failed:', error);
      return null;
    }
  }

  async playAudio(audioUrl, onEnd) {
    if (!this.audioContext) await this.initialize();

    return new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        this.isPlaying = false;
        if (onEnd) onEnd();
        resolve();
      };
      audio.onerror = () => {
        this.isPlaying = false;
        if (onEnd) onEnd();
        resolve();
      };
      
      this.currentAudio = audio;
      this.isPlaying = true;
      audio.play().catch(e => {
        console.warn('Audio play failed:', e);
        this.isPlaying = false;
        if (onEnd) onEnd();
        resolve();
      });
    });
  }

  fallbackToNativeAPI(text, lang, onStart, onEnd) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.75; // Warm, slower pace
    utterance.pitch = 0.9;
    
    utterance.onstart = () => {
      this.isPlaying = true;
      if (onStart) onStart();
    };
    
    utterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  stop() {
    this.isPlaying = false;
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const ai51TTS = new AI51CustomTTS();