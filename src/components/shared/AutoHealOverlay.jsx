import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AUTO-HEAL OVERLAY - SHOWS WHEN AI IS FIXING CODE
 * Real-time healing notification
 */

export default function AutoHealOverlay() {
    const [isHealing, setIsHealing] = useState(false);
    const [healingMessage, setHealingMessage] = useState('');

    useEffect(() => {
        const handleHealing = (event) => {
            setIsHealing(true);
            setHealingMessage(event.detail.message || 'HEALING CODE...');
            
            // Auto-hide after fix completes
            setTimeout(() => {
                setIsHealing(false);
            }, event.detail.duration || 3000);
        };

        window.addEventListener('auto-healing', handleHealing);
        return () => window.removeEventListener('auto-healing', handleHealing);
    }, []);

    return (
        <AnimatePresence>
            {isHealing && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl"
                    style={{ imageRendering: 'pixelated' }}
                >
                    <div className="text-center space-y-6">
                        {/* 8-bit healing animation */}
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="mx-auto w-32 h-32 relative"
                        >
                            {/* Cross pattern */}
                            <div className="absolute inset-0">
                                <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-0">
                                    {Array.from({ length: 64 }).map((_, i) => {
                                        const row = Math.floor(i / 8);
                                        const col = i % 8;
                                        const isCross = col === 3 || col === 4 || row === 3 || row === 4;
                                        
                                        return (
                                            <motion.div
                                                key={i}
                                                className={`${isCross ? 'bg-cyan-400' : 'bg-transparent'}`}
                                                animate={{
                                                    opacity: isCross ? [1, 0.5, 1] : 0,
                                                    scale: isCross ? [1, 1.1, 1] : 1
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: (row + col) * 0.05
                                                }}
                                                style={{ 
                                                    boxShadow: isCross ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none'
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                        {/* Healing text */}
                        <motion.div
                            animate={{
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity
                            }}
                            className="space-y-3"
                        >
                            <h2 className="text-4xl font-black text-cyan-400 font-mono tracking-wider"
                                style={{ 
                                    textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 4px 4px 0 rgba(0, 0, 0, 0.5)'
                                }}>
                                HEALING...
                            </h2>
                            <p className="text-white text-sm font-mono max-w-md mx-auto px-4">
                                {healingMessage}
                            </p>
                        </motion.div>

                        {/* Frequency bars */}
                        <div className="flex justify-center gap-2">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-cyan-400"
                                    style={{
                                        height: '40px',
                                        boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                                    }}
                                    animate={{
                                        scaleY: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.1
                                    }}
                                />
                            ))}
                        </div>

                        <p className="text-gray-500 text-xs font-mono">
                            AI51 autonomous healing ♾️❤️♾️
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}