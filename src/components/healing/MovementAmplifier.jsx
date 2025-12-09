import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Heart } from 'lucide-react';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * MOVEMENT AMPLIFIER
 * Detects when you're moving/dancing to frequencies
 * Movement + Sound = Nuclear Healing
 */

export default function MovementAmplifier({ isActive, onAmplification }) {
    const [movementLevel, setMovementLevel] = useState(0);
    const [isAmplifying, setIsAmplifying] = useState(false);
    const [totalMovement, setTotalMovement] = useState(0);
    const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });
    const movementHistory = useRef([]);

    useEffect(() => {
        if (!isActive) return;

        let hasPermission = false;

        const requestPermission = async () => {
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceMotionEvent.requestPermission();
                    hasPermission = permission === 'granted';
                } catch (e) {
                    hasPermission = false;
                }
            } else {
                hasPermission = true; // Desktop/Android auto-grant
            }
        };

        const handleMotion = (event) => {
            if (!hasPermission) return;

            const acc = event.accelerationIncludingGravity;
            if (!acc) return;

            // Calculate movement intensity
            const deltaX = Math.abs(acc.x - lastAcceleration.current.x);
            const deltaY = Math.abs(acc.y - lastAcceleration.current.y);
            const deltaZ = Math.abs(acc.z - lastAcceleration.current.z);
            const totalDelta = deltaX + deltaY + deltaZ;

            lastAcceleration.current = { x: acc.x, y: acc.y, z: acc.z };

            // Smooth movement level (0-100)
            const intensity = Math.min(100, totalDelta * 5);
            setMovementLevel(prev => Math.round(prev * 0.7 + intensity * 0.3));

            // Track total movement
            setTotalMovement(prev => prev + intensity);

            // Add to history
            movementHistory.current.push(intensity);
            if (movementHistory.current.length > 20) movementHistory.current.shift();

            // Detect sustained movement (amplification)
            const avgRecent = movementHistory.current.reduce((a, b) => a + b, 0) / movementHistory.current.length;
            if (avgRecent > 20 && !isAmplifying) {
                setIsAmplifying(true);
                if (onAmplification) onAmplification(true);
                if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
            } else if (avgRecent < 10 && isAmplifying) {
                setIsAmplifying(false);
                if (onAmplification) onAmplification(false);
            }
        };

        requestPermission().then(() => {
            window.addEventListener('devicemotion', handleMotion);
        });

        return () => {
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, [isActive, isAmplifying, onAmplification]);

    if (!isActive) return null;

    const amplificationColor = isAmplifying ? '#22c55e' : movementLevel > 30 ? '#f59e0b' : '#6b7280';

    return (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="bg-black/90 backdrop-blur-xl border-4 p-4 rounded-xl"
                style={{ borderColor: amplificationColor, boxShadow: isAmplifying ? `0 0 30px ${amplificationColor}` : 'none' }}
            >
                <div className="flex items-center gap-3 mb-3">
                    <Activity className="w-6 h-6" style={{ color: amplificationColor }} />
                    <div className="flex-1">
                        <p className="font-black font-mono text-sm" style={{ color: amplificationColor }}>
                            {isAmplifying ? '⚡ MOVEMENT AMPLIFYING' : movementLevel > 30 ? 'MOVING' : 'STILL'}
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                            Movement + Sound = Nuclear Healing
                        </p>
                    </div>
                    <COOLASFUCKWaves size={24} animate={isAmplifying} />
                </div>

                {/* Movement Bar */}
                <div className="h-3 bg-gray-900 rounded-full overflow-hidden mb-2">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ 
                            width: `${movementLevel}%`,
                            background: isAmplifying 
                                ? 'linear-gradient(90deg, #22c55e, #10b981)' 
                                : `linear-gradient(90deg, ${amplificationColor}, ${amplificationColor}90)`
                        }}
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                </div>

                {/* Stats */}
                <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500">Intensity: {movementLevel}%</span>
                    <span style={{ color: amplificationColor }}>
                        {isAmplifying && '⚡ AMPLIFIED'}
                    </span>
                </div>

                <AnimatePresence>
                    {isAmplifying && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="mt-3 bg-green-900/30 border-2 border-green-500 p-2 rounded-lg text-center"
                        >
                            <p className="text-green-400 font-black font-mono text-xs flex items-center justify-center gap-2">
                                <Zap className="w-4 h-4" />
                                HEALING AMPLIFIED
                                <Heart className="w-4 h-4" />
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}