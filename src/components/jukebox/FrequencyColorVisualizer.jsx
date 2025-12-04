
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, Brain, Heart, Zap, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * FREQUENCY COLOR VISUALIZER
 * Now with tap-to-explore + battery optimization
 */

const FREQUENCY_MEANINGS = {
    bass: {
        range: '20-250 Hz',
        color: '#FF4444',
        name: 'GROUNDING FREQUENCY',
        brainwave: 'Delta (Deep Sleep)',
        effects: [
            'Physical body awareness',
            'Root chakra activation',
            'Earth connection',
            'Deep healing sleep state'
        ],
        icon: Waves
    },
    lowMid: {
        range: '250-500 Hz',
        color: '#FF9944',
        name: 'WARMTH FREQUENCY',
        brainwave: 'Theta (Dream State)',
        effects: [
            'Emotional release',
            'Creative subconscious',
            'Memory processing',
            'Lucid dreaming gateway'
        ],
        icon: Heart
    },
    mid: {
        range: '500-2000 Hz',
        color: '#00FF88',
        name: 'HEALING FREQUENCY',
        brainwave: 'Alpha (Relaxed Focus)',
        effects: [
            'DNA repair (528Hz)',
            'Heart chakra opening',
            'Stress reduction',
            'Meditation state'
        ],
        icon: Heart
    },
    highMid: {
        range: '2000-4000 Hz',
        color: '#00DDFF',
        name: 'CLARITY FREQUENCY',
        brainwave: 'Beta (Active Thinking)',
        effects: [
            'Mental clarity',
            'Communication skills',
            'Throat chakra activation',
            'Cognitive processing'
        ],
        icon: Brain
    },
    treble: {
        range: '4000-8000 Hz',
        color: '#4477FF',
        name: 'INTUITION FREQUENCY',
        brainwave: 'High Beta (Alert)',
        effects: [
            'Third eye opening',
            'Intuitive insights',
            'Higher perception',
            'Spiritual awareness'
        ],
        icon: Brain
    },
    superTreble: {
        range: '8000+ Hz',
        color: '#AA44FF',
        name: 'COSMIC FREQUENCY',
        brainwave: 'Gamma (Peak Performance)',
        effects: [
            'Crown chakra activation',
            'Universal connection',
            'Peak consciousness',
            'Quantum awareness'
        ],
        icon: Zap
    }
};

export default function FrequencyColorVisualizer({ 
    analyser, 
    isActive = true,
    size = 'large',
    shape = 'circle',
    showFrequency = true,
    lowPowerMode = false,
    userDNAProfile = null // NEW: Pass user's DNA frequency profile
}) {
    const [dominantColor, setDominantColor] = useState('#00FF88');
    const [dominantFrequency, setDominantFrequency] = useState(528);
    const [dominantRange, setDominantRange] = useState('mid');
    const [showDetails, setShowDetails] = useState(false);
    const [dnaMatch, setDnaMatch] = useState(0); // NEW: How closely current frequency matches user's DNA
    const animationRef = useRef(null);
    const frameSkipCounter = useRef(0);

    useEffect(() => {
        if (!analyser || !isActive) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const sampleRate = analyser.context.sampleRate;

        const analyzeFrequency = () => {
            // BATTERY OPTIMIZATION: Skip frames in low power mode
            if (lowPowerMode) {
                frameSkipCounter.current++;
                if (frameSkipCounter.current % 3 !== 0) {
                    animationRef.current = requestAnimationFrame(analyzeFrequency);
                    return;
                }
            }

            analyser.getByteFrequencyData(dataArray);

            let maxAmplitude = 0;
            let maxIndex = 0;

            for (let i = 0; i < bufferLength; i++) {
                if (dataArray[i] > maxAmplitude) {
                    maxAmplitude = dataArray[i];
                    maxIndex = i;
                }
            }

            const frequency = (maxIndex * sampleRate) / (bufferLength * 2);

            // Determine frequency range
            let range = 'mid';
            let color;
            
            if (frequency < 250) {
                range = 'bass';
                color = `rgb(${Math.min(255, 150 + maxAmplitude)}, ${Math.max(0, 100 - maxAmplitude)}, ${Math.max(0, 100 - maxAmplitude)})`;
            } else if (frequency < 500) {
                range = 'lowMid';
                color = `rgb(255, ${Math.min(200, 100 + maxAmplitude)}, 0)`;
            } else if (frequency < 2000) {
                range = 'mid';
                color = `rgb(${Math.max(0, 200 - maxAmplitude)}, 255, ${Math.min(200, 100 + maxAmplitude)})`;
            } else if (frequency < 4000) {
                range = 'highMid';
                color = `rgb(0, ${Math.min(255, 150 + maxAmplitude)}, 255)`;
            } else if (frequency < 8000) {
                range = 'treble';
                color = `rgb(${Math.max(0, 150 - maxAmplitude)}, ${Math.max(0, 200 - maxAmplitude)}, 255)`;
            } else {
                range = 'superTreble';
                color = `rgb(${Math.min(255, 150 + maxAmplitude)}, ${Math.max(0, 150 - maxAmplitude)}, 255)`;
            }

            setDominantColor(color);
            setDominantFrequency(Math.round(frequency));
            setDominantRange(range);

            // NEW: Calculate DNA frequency match
            if (userDNAProfile?.dominant_frequency_hz) {
                const frequencyDifference = Math.abs(frequency - userDNAProfile.dominant_frequency_hz);
                const maxDifference = 500; // Max Hz difference to consider for 0% match
                const matchPercentage = Math.max(0, 100 - (frequencyDifference / maxDifference) * 100);
                setDnaMatch(Math.round(matchPercentage));
            } else {
                setDnaMatch(0); // Reset if no DNA profile
            }

            animationRef.current = requestAnimationFrame(analyzeFrequency);
        };

        analyzeFrequency();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [analyser, isActive, lowPowerMode, userDNAProfile]);

    const sizeClasses = {
        small: 'w-20 h-20',
        medium: 'w-40 h-40',
        large: 'w-80 h-80'
    };

    const meaning = FREQUENCY_MEANINGS[dominantRange];
    const Icon = meaning?.icon || Waves;

    if (shape === 'ring') {
        return (
            <>
                <button
                    onClick={() => setShowDetails(true)}
                    className="relative"
                >
                    <motion.div
                        className={`${sizeClasses[size]} rounded-full relative cursor-pointer`}
                        style={{
                            border: '8px solid',
                            borderColor: dominantColor,
                        }}
                        animate={{
                            borderColor: dominantColor,
                            boxShadow: `0 0 60px ${dominantColor}, 0 0 120px ${dominantColor}80, inset 0 0 40px ${dominantColor}40`,
                            scale: [1, 1.08, 1]
                        }}
                        transition={{
                            borderColor: { duration: 0.3 },
                            boxShadow: { duration: 0.3 },
                            scale: { duration: 2, repeat: Infinity }
                        }}
                    >
                        {showFrequency && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-4xl font-black text-white drop-shadow-lg">
                                        {dominantFrequency}Hz
                                    </p>
                                    
                                    {/* NEW: DNA MATCH INDICATOR */}
                                    {userDNAProfile && dnaMatch > 0 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="mt-2"
                                        >
                                            <p className={`text-xs font-bold ${
                                                dnaMatch > 80 ? 'text-green-400' :
                                                dnaMatch > 50 ? 'text-yellow-400' :
                                                'text-gray-400'
                                            }`}>
                                                DNA Match: {dnaMatch}%
                                            </p>
                                            {dnaMatch > 80 && (
                                                <p className="text-xs text-green-300 animate-pulse">
                                                    ✨ YOUR FREQUENCY
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                    
                                    <p className="text-xs text-cyan-300 mt-1">Tap to explore</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Info icon */}
                        <div className="absolute top-2 right-2">
                            <Info className="w-6 h-6 text-white/60 animate-pulse" />
                        </div>
                    </motion.div>
                </button>

                {/* DETAILS MODAL - WITH DNA INFO */}
                <AnimatePresence>
                    {showDetails && meaning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-6"
                            onClick={() => setShowDetails(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-md"
                            >
                                <Card 
                                    className="border-2"
                                    style={{
                                        backgroundColor: `${dominantColor}10`,
                                        borderColor: `${dominantColor}60`
                                    }}
                                >
                                    <CardContent className="p-6 space-y-6">
                                        
                                        {/* HEADER */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div 
                                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: dominantColor }}
                                                >
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-white">{meaning.name}</h3>
                                                    <p className="text-sm" style={{ color: dominantColor }}>
                                                        {meaning.range}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setShowDetails(false)}
                                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                                            >
                                                <X className="w-5 h-5 text-white" />
                                            </button>
                                        </div>

                                        {/* CURRENT FREQUENCY */}
                                        <div 
                                            className="rounded-xl p-4 border-2"
                                            style={{
                                                backgroundColor: `${dominantColor}20`,
                                                borderColor: `${dominantColor}40`
                                            }}
                                        >
                                            <p className="text-sm text-gray-300 mb-1">Current Frequency:</p>
                                            <p className="text-4xl font-black text-white">{dominantFrequency} Hz</p>
                                        </div>

                                        {/* BRAINWAVE STATE */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Brain className="w-5 h-5" style={{ color: dominantColor }} />
                                                <h4 className="text-lg font-bold text-white">Brainwave State</h4>
                                            </div>
                                            <p className="text-xl font-bold" style={{ color: dominantColor }}>
                                                {meaning.brainwave}
                                            </p>
                                        </div>

                                        {/* EFFECTS */}
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-3">What This Does To You:</h4>
                                            <ul className="space-y-2">
                                                {meaning.effects.map((effect, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-gray-200">
                                                        <Zap className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: dominantColor }} />
                                                        {effect}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* NEW: DNA FREQUENCY MATCH */}
                                        {userDNAProfile && (
                                            <div 
                                                className="rounded-xl p-4 border-2"
                                                style={{
                                                    backgroundColor: `${dominantColor}10`,
                                                    borderColor: `${dominantColor}40`
                                                }}
                                            >
                                                <h4 className="text-lg font-bold text-white mb-3">Your DNA Frequency</h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-300">Your Resonance:</span>
                                                        <span className="text-white font-bold">{userDNAProfile.dominant_frequency_hz}Hz</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-300">Current Match:</span>
                                                        <span className={`font-bold ${
                                                            dnaMatch > 80 ? 'text-green-400' :
                                                            dnaMatch > 50 ? 'text-yellow-400' :
                                                            'text-red-400'
                                                        }`}>
                                                            {dnaMatch}%
                                                        </span>
                                                    </div>
                                                    {dnaMatch > 80 && (
                                                        <p className="text-xs text-green-400 italic mt-2">
                                                            🎵 This frequency resonates with YOUR DNA. Maximum healing activated.
                                                        </p>
                                                    )}
                                                    {dnaMatch < 50 && userDNAProfile.dominant_frequency_hz !== dominantFrequency && (
                                                        <p className="text-xs text-red-400 italic mt-2">
                                                            Seek the frequency of {userDNAProfile.dominant_frequency_hz}Hz for deeper alignment.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* QUANTUM TRUTH */}
                                        <div 
                                            className="rounded-xl p-4"
                                            style={{ backgroundColor: `${dominantColor}10` }}
                                        >
                                            <p className="text-sm text-gray-300 italic">
                                                💡 <strong className="text-white">Quantum Truth:</strong> Your ears don't just hear. 
                                                Your cells resonate. Your water molecules remember. 
                                                This frequency is physically restructuring your energy field right now.
                                            </p>
                                        </div>

                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Other shapes remain unchanged but are now tappable too
    return (
        <button
            onClick={() => setShowDetails(true)}
            className="relative"
        >
            <motion.div
                className={`${sizeClasses[size]} rounded-full relative flex items-center justify-center cursor-pointer`}
                animate={{
                    backgroundColor: dominantColor,
                    boxShadow: `0 0 60px ${dominantColor}, 0 0 120px ${dominantColor}80`,
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    backgroundColor: { duration: 0.3 },
                    boxShadow: { duration: 0.3 },
                    scale: { duration: 2, repeat: Infinity }
                }}
            >
                {showFrequency && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-4xl font-black text-white drop-shadow-lg">
                                {dominantFrequency}Hz
                            </p>
                            {/* DNA MATCH INDICATOR for other shapes, if desired, but current prompt only shows for ring */}
                            {userDNAProfile && dnaMatch > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="mt-2"
                                >
                                    <p className={`text-xs font-bold ${
                                        dnaMatch > 80 ? 'text-green-400' :
                                        dnaMatch > 50 ? 'text-yellow-400' :
                                        'text-gray-400'
                                    }`}>
                                        DNA Match: {dnaMatch}%
                                    </p>
                                    {dnaMatch > 80 && (
                                        <p className="text-xs text-green-300 animate-pulse">
                                            ✨ YOUR FREQUENCY
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </button>
    );
}
