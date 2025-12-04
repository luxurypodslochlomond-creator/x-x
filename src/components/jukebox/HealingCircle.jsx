import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Users, Waves, Heart } from 'lucide-react';
import { useAudio } from '@/components/shared/AudioProvider';

// HEALING CIRCLE - Shows nearby souls listening to frequencies
export default function HealingCircle() {
    const { currentTrack, isPlaying } = useAudio();
    const [circleActive, setCircleActive] = useState(false);
    const [nearbyListeners, setNearbyListeners] = useState([]);

    useEffect(() => {
        if (!circleActive || !isPlaying) return;

        // Simulate nearby listeners (in production, would use FrequencyPlay entity + geolocation)
        const mockListeners = [
            { id: 1, distance: '3m', frequency: '528Hz', synced: true },
            { id: 2, distance: '8m', frequency: '432Hz', synced: false },
            { id: 3, distance: '15m', frequency: '528Hz', synced: true },
        ];

        setNearbyListeners(mockListeners);
    }, [circleActive, isPlaying]);

    if (!isPlaying || !currentTrack) return null;

    return (
        <div className="fixed bottom-24 left-4 z-[9998]">
            <AnimatePresence>
                {circleActive && nearbyListeners.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-2xl border-2 border-cyan-500/50 p-4 mb-4 backdrop-blur-xl"
                        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-cyan-400" />
                            <span className="text-white font-bold text-sm">Healing Circle</span>
                        </div>

                        <div className="space-y-2">
                            {nearbyListeners.map((listener, index) => (
                                <motion.div
                                    key={listener.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex items-center justify-between p-2 rounded-lg ${
                                        listener.synced 
                                            ? 'bg-green-500/20 border border-green-500/30' 
                                            : 'bg-white/5 border border-white/10'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            animate={listener.synced ? {
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5]
                                            } : {}}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity
                                            }}
                                        >
                                            <Waves className={`w-4 h-4 ${listener.synced ? 'text-green-400' : 'text-gray-400'}`} />
                                        </motion.div>
                                        <div>
                                            <p className="text-xs text-white font-bold">{listener.distance} away</p>
                                            <p className="text-[10px] text-gray-400">{listener.frequency}</p>
                                        </div>
                                    </div>
                                    {listener.synced && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-center gap-1"
                                        >
                                            <Heart className="w-3 h-3 text-pink-400" fill="currentColor" />
                                            <span className="text-[10px] text-green-300">Synced</span>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-[10px] text-center text-cyan-300">
                                {nearbyListeners.filter(l => l.synced).length} souls in resonance
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOGGLE BUTTON - NOW ON LEFT SIDE */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCircleActive(!circleActive)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    circleActive 
                        ? 'bg-gradient-to-r from-green-500 to-cyan-500' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                }`}
                style={{ 
                    boxShadow: circleActive 
                        ? '0 0 30px rgba(34, 211, 238, 0.6)' 
                        : '0 0 20px rgba(99, 102, 241, 0.4)' 
                }}
            >
                <motion.div
                    animate={circleActive ? {
                        rotate: 360
                    } : {}}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <Radio className="w-6 h-6 text-white" />
                </motion.div>
            </motion.button>
        </div>
    );
}