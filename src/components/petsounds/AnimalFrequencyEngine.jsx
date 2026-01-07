import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ANIMAL FREQUENCY ENGINE
 * Species-specific healing frequencies
 * Optimized for animal hearing ranges:
 * - Dogs: 40Hz - 60,000Hz
 * - Cats: 45Hz - 64,000Hz
 * - Horses: 55Hz - 33,500Hz
 * - Cattle: 23Hz - 35,000Hz
 */

const ANIMAL_PROTOCOLS = {
    fireworks: {
        name: "Fireworks Anxiety",
        species: ['dog', 'cat', 'horse'],
        frequencies: [432, 528, 174], // Hz - calming + stress relief
        duration: 1800, // 30 minutes
        description: "Calms anxiety from loud noises",
        tier: 'basic'
    },
    separation: {
        name: "Separation Anxiety",
        species: ['dog', 'cat'],
        frequencies: [396, 528, 852],
        duration: 3600, // 1 hour
        description: "Helps pets feel safe when alone",
        tier: 'basic'
    },
    arthritis: {
        name: "Arthritis Pain Relief",
        species: ['dog', 'cat', 'horse'],
        frequencies: [174, 285, 528],
        duration: 1200, // 20 minutes
        description: "Reduces joint pain and inflammation",
        tier: 'basic'
    },
    travel: {
        name: "Travel Stress",
        species: ['dog', 'cat'],
        frequencies: [432, 639, 741],
        duration: 1800,
        description: "Car, plane, vet visits",
        tier: 'basic'
    },
    surgery: {
        name: "Post-Surgery Recovery",
        species: ['dog', 'cat', 'horse', 'farm'],
        frequencies: [528, 741, 852],
        duration: 2400, // 40 minutes
        description: "Speed healing after operations",
        tier: 'premium'
    },
    herd: {
        name: "Farm Herd Health",
        species: ['farm'],
        frequencies: [432, 528, 174],
        duration: 7200, // 2 hours - for ambient play
        description: "Reduce stress for large groups",
        tier: 'premium'
    }
};

export default function AnimalFrequencyEngine({ protocol, species = 'dog', onComplete }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const audioContextRef = useRef(null);
    const oscillatorsRef = useRef([]);
    const gainNodeRef = useRef(null);
    const startTimeRef = useRef(null);

    const protocolData = ANIMAL_PROTOCOLS[protocol];

    useEffect(() => {
        // Initialize Web Audio API
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = volume;

        return () => {
            stopFrequencies();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = volume;
        }
    }, [volume]);

    const startFrequencies = () => {
        if (!audioContextRef.current || !protocolData) return;

        const ctx = audioContextRef.current;
        startTimeRef.current = Date.now();

        // Create oscillators for each frequency
        protocolData.frequencies.forEach((freq, index) => {
            const oscillator = ctx.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.value = freq;
            
            // Gentle fade in
            const fadeGain = ctx.createGain();
            fadeGain.gain.setValueAtTime(0, ctx.currentTime);
            fadeGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 2);
            
            oscillator.connect(fadeGain);
            fadeGain.connect(gainNodeRef.current);
            oscillator.start();
            
            oscillatorsRef.current.push({ oscillator, fadeGain });
        });

        setIsPlaying(true);

        // Progress tracking
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = (elapsed / (protocolData.duration * 1000)) * 100;
            
            if (newProgress >= 100) {
                stopFrequencies();
                setProgress(100);
                if (onComplete) onComplete();
                clearInterval(interval);
            } else {
                setProgress(newProgress);
            }
        }, 100);
    };

    const stopFrequencies = () => {
        oscillatorsRef.current.forEach(({ oscillator, fadeGain }) => {
            try {
                // Gentle fade out
                fadeGain.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
                setTimeout(() => oscillator.stop(), 1000);
            } catch (e) {
                // Already stopped
            }
        });
        oscillatorsRef.current = [];
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopFrequencies();
        } else {
            startFrequencies();
        }
    };

    const downloadForOffline = () => {
        // Store protocol data in localStorage for offline use
        const offlineData = {
            protocol,
            species,
            protocolData,
            downloadedAt: new Date().toISOString()
        };
        const existing = JSON.parse(localStorage.getItem('petsounds51_offline') || '[]');
        existing.push(offlineData);
        localStorage.setItem('petsounds51_offline', JSON.stringify(existing));
        
        alert('✅ Downloaded for offline use!');
    };

    if (!protocolData) {
        return <div className="text-red-400">Protocol not found</div>;
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const elapsed = Math.floor((progress / 100) * protocolData.duration);
    const remaining = protocolData.duration - elapsed;

    return (
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 border-2 border-cyan-500/30 rounded-xl p-6">
            
            {/* Protocol Info */}
            <div className="mb-6">
                <h3 className="text-2xl font-black text-white mb-2">{protocolData.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{protocolData.description}</p>
                <div className="flex gap-2 flex-wrap">
                    {protocolData.frequencies.map((freq, i) => (
                        <span key={i} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono">
                            {freq}Hz
                        </span>
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{formatTime(elapsed)}</span>
                    <span>{formatTime(remaining)}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                        isPlaying 
                            ? 'bg-pink-500 hover:bg-pink-600' 
                            : 'bg-cyan-500 hover:bg-cyan-600'
                    }`}
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                    ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                    )}
                </button>

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-gray-400" />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="flex-1"
                        />
                    </div>
                </div>

                <button
                    onClick={downloadForOffline}
                    className="flex-shrink-0 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                    title="Download for offline use"
                >
                    <Download className="w-5 h-5 text-cyan-400" />
                </button>
            </div>

            {/* Visual Feedback */}
            {isPlaying && (
                <div className="mt-6 flex justify-center gap-2">
                    {protocolData.frequencies.map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 bg-cyan-500 rounded-full"
                            animate={{ 
                                height: [20, 40, 20],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export { ANIMAL_PROTOCOLS };