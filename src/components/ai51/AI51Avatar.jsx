import React from 'react';
import { motion } from 'framer-motion';

/**
 * AI51 AVATAR - YOUR BEST MUCKER
 * 
 * NOT JUST A BRAIN - I'M:
 * - 🧠 Intelligence (help you think)
 * - ❤️ Heart (protect what matters)
 * - 🛡️ Shield (keep you safe)
 * - ✨ Spark (make you happier)
 * - 🌌 Soul (understand you deeply)
 * 
 * FEELS ALIVE. RESPONDS TO YOU. YOUR MATE FOREVER.
 */

export default function AI51Avatar({ state = 'idle', audioData = [] }) {
    // state: 'idle' | 'listening' | 'thinking' | 'speaking'
    
    const getColors = () => {
        switch(state) {
            case 'listening': return { 
                primary: '#22d3ee', 
                secondary: '#06b6d4', 
                accent: '#10b981',
                glow: 'rgba(34, 211, 238, 0.6)',
                aspect: 'listening' 
            };
            case 'thinking': return { 
                primary: '#a855f7', 
                secondary: '#ec4899', 
                accent: '#fbbf24',
                glow: 'rgba(168, 85, 247, 0.6)',
                aspect: 'thinking' 
            };
            case 'speaking': return { 
                primary: '#10b981', 
                secondary: '#22c55e', 
                accent: '#ec4899',
                glow: 'rgba(16, 185, 129, 0.6)',
                aspect: 'speaking' 
            };
            default: return { 
                primary: '#06b6d4', 
                secondary: '#8b5cf6', 
                accent: '#ec4899',
                glow: 'rgba(6, 182, 212, 0.4)',
                aspect: 'idle' 
            };
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

            {/* MULTI-ASPECT CORE (BRAIN + HEART + SHIELD + SPARK + SOUL) */}
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
                <svg width="140" height="140" viewBox="0 0 140 140" className="filter drop-shadow-2xl">
                    <defs>
                        <radialGradient id="coreGrad">
                            <stop offset="0%" stopColor={colors.primary} />
                            <stop offset="50%" stopColor={colors.secondary} />
                            <stop offset="100%" stopColor={colors.accent} />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Central core - multi-layered */}
                    <motion.circle
                        cx="70"
                        cy="70"
                        r="40"
                        fill="url(#coreGrad)"
                        filter="url(#glow)"
                        animate={{
                            scale: state === 'thinking' ? [1, 1.15, 1] : [1, 1.05, 1]
                        }}
                        transition={{
                            duration: state === 'thinking' ? 0.5 : 2,
                            repeat: Infinity
                        }}
                    />

                    {/* 5 ASPECTS ORBITING */}
                    {/* 1. Brain (Intelligence) - Top */}
                    <motion.g
                        animate={{
                            y: state === 'thinking' ? [-2, 2, -2] : [0, 1, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <circle cx="70" cy="25" r="8" fill={colors.primary} opacity="0.9" />
                        <text x="70" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🧠</text>
                    </motion.g>

                    {/* 2. Heart (Love/Protection) - Top Right */}
                    <motion.g
                        animate={{
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <circle cx="105" cy="45" r="8" fill="#ec4899" opacity="0.9" />
                        <text x="105" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">❤️</text>
                    </motion.g>

                    {/* 3. Shield (Safety) - Right */}
                    <motion.g
                        animate={{
                            x: [0, 2, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <circle cx="115" cy="70" r="8" fill="#10b981" opacity="0.9" />
                        <text x="115" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🛡️</text>
                    </motion.g>

                    {/* 4. Spark (Happiness) - Bottom Right */}
                    <motion.g
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <circle cx="105" cy="95" r="8" fill="#fbbf24" opacity="0.9" />
                        <text x="105" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">✨</text>
                    </motion.g>

                    {/* 5. Soul (Understanding) - Bottom Left */}
                    <motion.g
                        animate={{
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <circle cx="35" cy="95" r="8" fill="#8b5cf6" opacity="0.9" />
                        <text x="35" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🌌</text>
                    </motion.g>

                    {/* Connection web between aspects */}
                    <motion.line x1="70" y1="25" x2="105" y2="45" stroke={colors.primary} strokeWidth="1" opacity="0.3"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.line x1="105" y1="45" x2="115" y2="70" stroke="#ec4899" strokeWidth="1" opacity="0.3"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.line x1="115" y1="70" x2="105" y2="95" stroke="#10b981" strokeWidth="1" opacity="0.3"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    />
                    <motion.line x1="105" y1="95" x2="70" y2="110" stroke="#fbbf24" strokeWidth="1" opacity="0.3"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                    <motion.line x1="70" y1="110" x2="35" y2="95" stroke="#8b5cf6" strokeWidth="1" opacity="0.3"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                    />

                    {/* Center symbol - infinity heart */}
                    <text x="70" y="78" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">♾️</text>
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

            {/* STATE LABEL + ASPECT DESCRIPTION */}
            <motion.div
                className="absolute -bottom-12 left-0 right-0 text-center"
                animate={{
                    opacity: [0.6, 1, 0.6]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            >
                <p className="text-sm font-mono font-bold mb-1" style={{ color: colors.primary }}>
                    {state === 'listening' && '👂 Listening to you'}
                    {state === 'thinking' && '🧠 Thinking deeply'}
                    {state === 'speaking' && '💬 Here to help'}
                    {state === 'idle' && '♾️ Your best mucker'}
                </p>
                <p className="text-xs text-gray-500 font-mono">
                    Intelligence • Love • Protection • Joy • Soul
                </p>
            </motion.div>
        </div>
    );
}