import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKWaves } from './COOLASFUCKIcon';

/**
 * COOLASFUCK ERROR MONITOR
 * Real-time issue detection + 8-bit "we're on it" screen
 * Not techy - just honest "fixing it now" vibes
 */

export default function COOLASFUCKErrorMonitor({ children }) {
    const [error, setError] = useState(null);
    const [isFixing, setIsFixing] = useState(false);

    useEffect(() => {
        // Catch unhandled errors
        const handleError = (event) => {
            console.error('Error caught:', event.error);
            setError(event.error?.message || 'Something went wrong');
            setIsFixing(true);

            // Auto-retry after showing message
            setTimeout(() => {
                setIsFixing(false);
                setError(null);
                window.location.reload();
            }, 3000);
        };

        // Catch promise rejections
        const handleRejection = (event) => {
            console.error('Promise rejected:', event.reason);
            setError(event.reason?.message || 'Connection issue');
            setIsFixing(true);

            setTimeout(() => {
                setIsFixing(false);
                setError(null);
            }, 3000);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleRejection);
        };
    }, []);

    if (error && isFixing) {
        return (
            <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    {/* 8-BIT FIXING ANIMATION */}
                    <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="mb-8"
                    >
                        <COOLASFUCKWaves size={80} animate={true} />
                    </motion.div>

                    {/* MESSAGE */}
                    <h1 className="text-3xl font-black text-pink-400 mb-3" style={{ 
                        fontFamily: 'monospace',
                        textShadow: '4px 4px 0px #000',
                        imageRendering: 'pixelated'
                    }}>
                        ON IT
                    </h1>

                    <p className="text-white text-sm font-mono mb-6">
                        Something got weird. Fixing now...
                    </p>

                    {/* 8-BIT PROGRESS BAR */}
                    <div className="bg-gray-900 border-2 border-pink-500 h-8 overflow-hidden mb-4" style={{ imageRendering: 'pixelated' }}>
                        <motion.div
                            className="h-full bg-pink-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: 'linear' }}
                        />
                    </div>

                    {/* TIMER DOTS */}
                    <div className="flex justify-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-3 h-3 bg-cyan-400"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                                style={{ imageRendering: 'pixelated' }}
                            />
                        ))}
                    </div>

                    <p className="text-gray-600 text-xs font-mono mt-4">
                        Auto-retry in 3 seconds
                    </p>
                </div>
            </div>
        );
    }

    return children;
}