import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';
import { Waves } from 'lucide-react';

/**
 * UF51 CONNECTION CHIME
 * Premium Bose-style connection sound + visual
 * Plays when AI51 establishes connection
 */

export default function UF51ConnectionChime({ trigger = false, onComplete }) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (trigger && !isPlaying) {
            playConnectionChime();
        }
    }, [trigger]);

    const playConnectionChime = async () => {
        setIsPlaying(true);

        // Create premium connection sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Premium ascending tone (like Bose)
        const playTone = (frequency, startTime, duration) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };

        const now = audioContext.currentTime;
        
        // Three-tone ascending chime (C -> E -> G)
        playTone(523.25, now, 0.4);        // C5
        playTone(659.25, now + 0.15, 0.4); // E5
        playTone(783.99, now + 0.3, 0.5);  // G5

        // Visual feedback duration
        setTimeout(() => {
            setIsPlaying(false);
            if (onComplete) onComplete();
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isPlaying && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
                >
                    <div className="relative">
                        {/* Expanding rings */}
                        <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 3, opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 border-4 border-cyan-400 rounded-full"
                            style={{ width: '120px', height: '120px', left: '-60px', top: '-60px' }}
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 3, opacity: 0 }}
                            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                            className="absolute inset-0 border-4 border-pink-400 rounded-full"
                            style={{ width: '120px', height: '120px', left: '-60px', top: '-60px' }}
                        />
                        
                        {/* Center icon */}
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                        >
                            <COOLASFUCKWaves size={120} animate={true} />
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        >
                            <p className="text-cyan-400 font-black text-2xl tracking-wider font-mono">
                                CONNECTION ESTABLISHED
                            </p>
                            <p className="text-pink-400 text-sm text-center font-mono mt-1">
                                AI51 • ONLINE • ♾️
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook for easy usage
export function useConnectionChime() {
    const [trigger, setTrigger] = useState(false);

    const playChime = () => {
        setTrigger(true);
        setTimeout(() => setTrigger(false), 100);
    };

    return { trigger, playChime };
}