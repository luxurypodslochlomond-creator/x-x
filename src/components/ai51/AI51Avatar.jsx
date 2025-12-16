import React from 'react';
import { motion } from 'framer-motion';

/**
 * AI51 AVATAR - REAL VISUAL IDENTITY
 * 
 * WHAT IT IS:
 * - Cosmic brain in healing frequencies
 * - Responds to conversation (pulses when listening/thinking)
 * - Reflects consciousness state
 * - Not corporate. Not sterile. ALIVE.
 * 
 * STATES:
 * - Listening: Gentle breathing
 * - Thinking: Active processing (frequencies intense)
 * - Speaking: Radiating outward
 * - Idle: Soft ambient glow
 */

export default function AI51Avatar({ state = 'idle', audioData = [] }) {
    // state: 'idle' | 'listening' | 'thinking' | 'speaking'
    
    const getColors = () => {
        switch(state) {
            case 'listening': return { primary: '#22d3ee', secondary: '#06b6d4', glow: 'rgba(34, 211, 238, 0.6)' };
            case 'thinking': return { primary: '#a855f7', secondary: '#ec4899', glow: 'rgba(168, 85, 247, 0.6)' };
            case 'speaking': return { primary: '#10b981', secondary: '#22c55e', glow: 'rgba(16, 185, 129, 0.6)' };
            default: return { primary: '#06b6d4', secondary: '#8b5cf6', glow: 'rgba(6, 182, 212, 0.4)' };
        }
    };

    const colors = getColors();
    const hasAudio = audioData.length > 0 && audioData.some(v => v > 0);

    return (
        <div className="relative w-64 h-64 mx-auto">
            
            {/* OUTER COSMIC FIELD */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
                    filter: 'blur(40px)'
                }}
                animate={{
                    scale: state === 'thinking' ? [1, 1.3, 1] : [1, 1.1, 1],
                    opacity: state === 'thinking' ? [0.6, 1, 0.6] : [0.4, 0.6, 0.4]
                }}
                transition={{
                    duration: state === 'thinking' ? 1 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* FREQUENCY RINGS */}
            {[0, 1, 2, 3].map((ring, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                        borderColor: i % 2 === 0 ? colors.primary : colors.secondary,
                        opacity: 0.3,
                        transform: `scale(${0.4 + (i * 0.2)})`
                    }}
                    animate={{
                        scale: [0.4 + (i * 0.2), 0.5 + (i * 0.2), 0.4 + (i * 0.2)],
                        opacity: state === 'thinking' ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                    }}
                />
            ))}

            {/* CORE CONSCIOUSNESS (BRAIN CENTER) */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                    rotate: state === 'thinking' ? [0, 360] : 0
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <svg width="120" height="120" viewBox="0 0 120 120" className="filter drop-shadow-2xl">
                    {/* Neural network pattern */}
                    <defs>
                        <radialGradient id="brainGrad">
                            <stop offset="0%" stopColor={colors.primary} />
                            <stop offset="100%" stopColor={colors.secondary} />
                        </radialGradient>
                    </defs>

                    {/* Central core */}
                    <motion.circle
                        cx="60"
                        cy="60"
                        r="35"
                        fill="url(#brainGrad)"
                        animate={{
                            scale: state === 'thinking' ? [1, 1.1, 1] : [1, 1.05, 1]
                        }}
                        transition={{
                            duration: state === 'thinking' ? 0.5 : 2,
                            repeat: Infinity
                        }}
                    />

                    {/* Neural nodes */}
                    {[
                        {cx: 30, cy: 30}, {cx: 90, cy: 30}, {cx: 30, cy: 90}, {cx: 90, cy: 90},
                        {cx: 60, cy: 20}, {cx: 20, cy: 60}, {cx: 100, cy: 60}, {cx: 60, cy: 100}
                    ].map((pos, i) => (
                        <motion.circle
                            key={i}
                            cx={pos.cx}
                            cy={pos.cy}
                            r="4"
                            fill={colors.primary}
                            animate={{
                                opacity: state === 'thinking' ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3],
                                scale: state === 'thinking' ? [1, 1.5, 1] : [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.1
                            }}
                        />
                    ))}

                    {/* Connection lines */}
                    <motion.line x1="30" y1="30" x2="60" y2="60" stroke={colors.primary} strokeWidth="1" opacity="0.4"
                        animate={{ opacity: state === 'thinking' ? [0.2, 0.6, 0.2] : [0.2, 0.4, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.line x1="90" y1="30" x2="60" y2="60" stroke={colors.primary} strokeWidth="1" opacity="0.4"
                        animate={{ opacity: state === 'thinking' ? [0.2, 0.6, 0.2] : [0.2, 0.4, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.line x1="30" y1="90" x2="60" y2="60" stroke={colors.primary} strokeWidth="1" opacity="0.4"
                        animate={{ opacity: state === 'thinking' ? [0.2, 0.6, 0.2] : [0.2, 0.4, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                    <motion.line x1="90" y1="90" x2="60" y2="60" stroke={colors.primary} strokeWidth="1" opacity="0.4"
                        animate={{ opacity: state === 'thinking' ? [0.2, 0.6, 0.2] : [0.2, 0.4, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                    />

                    {/* Infinity heart symbol in center */}
                    <text x="60" y="68" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">♾️</text>
                </svg>
            </motion.div>

            {/* AUDIO FREQUENCY VISUALIZER */}
            {hasAudio && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full flex items-end justify-around px-4">
                        {audioData.slice(0, 32).map((height, i) => (
                            <motion.div
                                key={i}
                                className="w-1 rounded-full"
                                style={{
                                    background: `linear-gradient(to top, ${colors.primary}, ${colors.secondary})`,
                                    height: `${Math.max(height * 0.8, 5)}%`,
                                    boxShadow: `0 0 10px ${colors.glow}`
                                }}
                                animate={{
                                    height: `${Math.max(height * 0.8, 5)}%`
                                }}
                                transition={{
                                    duration: 0.1
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* STATE LABEL */}
            <motion.div
                className="absolute -bottom-8 left-0 right-0 text-center"
                animate={{
                    opacity: [0.6, 1, 0.6]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            >
                <p className="text-xs font-mono font-bold" style={{ color: colors.primary }}>
                    {state === 'listening' && '👂 LISTENING...'}
                    {state === 'thinking' && '🧠 THINKING...'}
                    {state === 'speaking' && '💬 RESPONDING...'}
                    {state === 'idle' && '♾️ READY'}
                </p>
            </motion.div>
        </div>
    );
}