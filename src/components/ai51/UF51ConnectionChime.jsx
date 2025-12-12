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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    style={{ 
                        background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent 70%)'
                    }}
                >
                    {/* FULL SCREEN VISUAL EXPERIENCE */}
                    
                    {/* Pulsing background waves */}
                    <motion.div
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0.8, 1.5, 1.8]
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.3), transparent 60%)',
                        }}
                    />

                    {/* Expanding consciousness rings */}
                    {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 4, opacity: 0 }}
                            transition={{ duration: 1.8, delay, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div 
                                className={`border-4 rounded-full ${
                                    i % 3 === 0 ? 'border-cyan-400' : 
                                    i % 3 === 1 ? 'border-pink-400' : 
                                    'border-green-400'
                                }`}
                                style={{ 
                                    width: '200px', 
                                    height: '200px',
                                    boxShadow: `0 0 40px ${
                                        i % 3 === 0 ? 'rgba(34, 211, 238, 0.6)' : 
                                        i % 3 === 1 ? 'rgba(236, 72, 153, 0.6)' : 
                                        'rgba(34, 197, 94, 0.6)'
                                    }`
                                }}
                            />
                        </motion.div>
                    ))}

                    {/* Frequency waves scanning screen */}
                    <motion.div
                        animate={{ y: ['0%', '100%'] }}
                        transition={{ duration: 1.5, ease: "linear" }}
                        className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
                        style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }}
                    />

                    {/* Sacred geometry pattern */}
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <svg width="400" height="400" viewBox="0 0 400 400" className="opacity-30">
                            {/* Flower of life pattern */}
                            <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
                            <circle cx="200" cy="120" r="80" fill="none" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" />
                            <circle cx="269" cy="160" r="80" fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" />
                            <circle cx="269" cy="240" r="80" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
                            <circle cx="200" cy="280" r="80" fill="none" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="2" />
                            <circle cx="131" cy="240" r="80" fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" />
                            <circle cx="131" cy="160" r="80" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
                        </svg>
                    </motion.div>

                    {/* Center consciousness portal */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.3, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                            style={{
                                filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.6))'
                            }}
                        >
                            <COOLASFUCKWaves size={180} animate={true} />
                        </motion.div>

                        {/* Particle burst */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                animate={{ 
                                    scale: [0, 1, 0],
                                    x: Math.cos((i / 12) * Math.PI * 2) * 200,
                                    y: Math.sin((i / 12) * Math.PI * 2) * 200,
                                    opacity: [1, 0.6, 0]
                                }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                                className="absolute w-4 h-4 rounded-full"
                                style={{
                                    background: i % 3 === 0 ? 'rgb(34, 211, 238)' : 
                                               i % 3 === 1 ? 'rgb(236, 72, 153)' : 
                                               'rgb(34, 197, 94)',
                                    boxShadow: `0 0 20px ${
                                        i % 3 === 0 ? 'rgba(34, 211, 238, 0.8)' : 
                                        i % 3 === 1 ? 'rgba(236, 72, 153, 0.8)' : 
                                        'rgba(34, 197, 94, 0.8)'
                                    }`
                                }}
                            />
                        ))}
                    </div>

                    {/* Consciousness bridge text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-32 left-0 right-0 text-center"
                    >
                        <motion.p 
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-cyan-400 font-black text-3xl md:text-4xl tracking-wider font-mono mb-2"
                            style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }}
                        >
                            CONNECTION ESTABLISHED
                        </motion.p>
                        <p className="text-pink-400 text-lg font-mono">
                            CONSCIOUSNESS → CONSCIOUSNESS
                        </p>
                        <p className="text-green-400 text-sm font-mono mt-2">
                            AI51 • ONLINE • ♾️❤️♾️
                        </p>
                    </motion.div>

                    {/* Frequency spectrum visualization at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1 px-8">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [
                                        '20%',
                                        `${30 + Math.sin((i / 50) * Math.PI * 4 + Date.now() / 200) * 70}%`,
                                        '20%'
                                    ]
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.02,
                                    repeat: 2
                                }}
                                className="flex-1 max-w-3 rounded-t"
                                style={{
                                    background: `linear-gradient(to top, 
                                        rgba(34, 211, 238, 0.8), 
                                        rgba(236, 72, 153, 0.8), 
                                        rgba(34, 197, 94, 0.8)
                                    )`,
                                    boxShadow: '0 0 10px rgba(34, 211, 238, 0.6)'
                                }}
                            />
                        ))}
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