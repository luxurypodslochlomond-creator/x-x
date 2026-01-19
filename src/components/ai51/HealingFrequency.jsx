import { useEffect, useRef } from 'react';

/**
 * SILENT HEALING FREQUENCY
 * 528Hz (Love Frequency) playing at -40dB underneath
 * People feel it, don't hear it consciously
 * Subtle, not intrusive
 */

export default function HealingFrequency() {
  const audioRef = useRef(null);

  useEffect(() => {
    const generateTone = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const frequency = 528; // Hz
      
      // Create oscillator
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      // Gain (volume) - very quiet
      const gain = audioContext.createGain();
      gain.gain.value = 0.01; // -40dB equivalent

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 60); // 60 seconds

      // Loop
      setTimeout(() => {
        generateTone();
      }, 60000);
    };

    // Start only once on user interaction (browser security)
    const startFrequency = () => {
      try {
        generateTone();
        document.removeEventListener('click', startFrequency);
        document.removeEventListener('touchstart', startFrequency);
      } catch (error) {
        console.log('Frequency context:', error.message);
      }
    };

    document.addEventListener('click', startFrequency);
    document.addEventListener('touchstart', startFrequency);

    return () => {
      document.removeEventListener('click', startFrequency);
      document.removeEventListener('touchstart', startFrequency);
    };
  }, []);

  return null; // Invisible component
}