import React, { useEffect, useRef } from 'react';

/**
 * UF51 CONNECTION CHIME
 * A healing frequency that plays when you connect to UF51
 * Better than any Bluetooth sound - this is LOVE ❤️♾️
 * 
 * Frequencies:
 * - 528Hz = Love frequency (primary)
 * - 432Hz = Universal healing
 * - 396Hz = Liberation from fear
 */

export const UF51ConnectionChime = ({ autoPlay = false, onComplete = null }) => {
    const audioContextRef = useRef(null);
    const hasPlayedRef = useRef(false);

    const playConnectionChime = async () => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            audioContextRef.current = ctx;

            const now = ctx.currentTime;
            const masterGain = ctx.createGain();
            masterGain.connect(ctx.destination);

            // Start quiet, rise to gentle volume, fade out
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(0.15, now + 0.3);
            masterGain.gain.linearRampToValueAtTime(0.15, now + 2.5);
            masterGain.gain.linearRampToValueAtTime(0, now + 4);

            // Create UNIVERSAL frequency chord - ALL consciousness
            const frequencies = [
                { hz: 528, gain: 0.4 },  // Love (human hearts)
                { hz: 432, gain: 0.3 },  // Universal healing (ALL life)
                { hz: 396, gain: 0.2 },  // Liberation (ALL consciousness)
                { hz: 285, gain: 0.25 }, // Cellular repair (plant/animal/silicon)
                { hz: 174, gain: 0.2 },  // Foundation frequency (Earth/minerals)
                { hz: 963, gain: 0.15 }, // Cosmic consciousness (beyond Earth)
            ];

            frequencies.forEach(({ hz, gain: relativeGain }) => {
                const osc = ctx.createOscillator();
                const gainNode = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(hz, now);
                
                gainNode.gain.setValueAtTime(relativeGain, now);
                
                osc.connect(gainNode);
                gainNode.connect(masterGain);
                
                osc.start(now);
                osc.stop(now + 4);
            });

            // Harmonic overtones for depth
            [528 * 2, 432 * 2].forEach(hz => {
                const osc = ctx.createOscillator();
                const gainNode = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(hz, now);
                gainNode.gain.setValueAtTime(0.05, now);
                
                osc.connect(gainNode);
                gainNode.connect(masterGain);
                
                osc.start(now);
                osc.stop(now + 4);
            });

            setTimeout(() => {
                ctx.close();
                if (onComplete) onComplete();
            }, 4500);

        } catch (error) {
            console.log('Connection chime unavailable:', error);
        }
    };

    useEffect(() => {
        if (autoPlay) {
            // Small delay for user interaction
            const timer = setTimeout(() => {
                playConnectionChime();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [autoPlay]);

    return (
        <button
            onClick={playConnectionChime}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-lg transition-all"
            style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' }}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L12 22M12 12C12 12 16 8 20 8C20 8 20 12 16 16C16 16 12 12 12 12ZM12 12C12 12 8 8 4 8C4 8 4 12 8 16C8 16 12 12 12 12Z" 
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white font-bold text-sm">UF51 CONNECTION TONE</span>
        </button>
    );
};

export default UF51ConnectionChime;