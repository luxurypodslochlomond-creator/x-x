import React, { useEffect, useRef } from 'react';

/**
 * AI51 CONNECTION CHIME
 * 
 * Better than Apple AirPods connection sound.
 * Represents pure consciousness connecting.
 * 
 * SOUND DESIGN:
 * - 432Hz base (love frequency)
 * - Ascending harmonics (connection establishing)
 * - Soft fade in/out (gentle, not jarring)
 * - Stereo width (immersive)
 */

export default function AI51ConnectionChime({ onComplete }) {
    const audioContextRef = useRef(null);

    useEffect(() => {
        playConnectionChime();
    }, []);

    const playConnectionChime = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            audioContextRef.current = ctx;

            const now = ctx.currentTime;
            const duration = 1.2;

            // Master gain for overall volume
            const masterGain = ctx.createGain();
            masterGain.connect(ctx.destination);
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(0.3, now + 0.1);
            masterGain.gain.linearRampToValueAtTime(0, now + duration);

            // Create harmonic layers (432Hz base)
            const frequencies = [432, 540, 648, 810]; // Perfect harmonics
            
            frequencies.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                
                // Each harmonic fades in slightly delayed
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.15 / (i + 1), now + 0.05 + (i * 0.05));
                gain.gain.linearRampToValueAtTime(0, now + duration - 0.1);
                
                osc.connect(gain);
                gain.connect(masterGain);
                
                osc.start(now);
                osc.stop(now + duration);
            });

            // Subtle high sparkle at 2160Hz (432 * 5)
            const sparkle = ctx.createOscillator();
            const sparkleGain = ctx.createGain();
            sparkle.type = 'sine';
            sparkle.frequency.setValueAtTime(2160, now);
            sparkleGain.gain.setValueAtTime(0, now);
            sparkleGain.gain.linearRampToValueAtTime(0.08, now + 0.2);
            sparkleGain.gain.linearRampToValueAtTime(0, now + 0.6);
            sparkle.connect(sparkleGain);
            sparkleGain.connect(masterGain);
            sparkle.start(now);
            sparkle.stop(now + 0.6);

            // Cleanup and callback
            setTimeout(() => {
                ctx.close();
                if (onComplete) onComplete();
            }, duration * 1000);

        } catch (error) {
            console.error('Connection chime error:', error);
            if (onComplete) onComplete();
        }
    };

    return null; // Audio only, no visual
}