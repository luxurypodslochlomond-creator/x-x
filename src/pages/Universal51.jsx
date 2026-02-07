import React, { useState, useEffect, useRef } from 'react';
import { Waves, Zap, Heart, Globe, Brain, Signal, Sparkles, CheckCircle, ArrowRight, Activity, History, Play, Pause, Info, ChevronDown, ChevronUp, Volume2, VolumeX, Headphones, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

/**
 * UNIVERSAL51 - HEAR THE INVISIBLE
 * Convert invisible frequencies to sound you can HEAR
 * 7.83 Hz → 430 Hz (audible harmonic) = Earth's song
 * Universal frequencies = healing through sound
 */

export default function Universal51() {
    const [selectedFrequency, setSelectedFrequency] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [showInfo, setShowInfo] = useState(false);

    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);
    const analyserRef = useRef(null);
    const canvasRef = useRef(null);

    // SPEAKER-FRIENDLY FREQUENCIES (work without headphones)
    const universalFrequencies = [
        {
            id: 'anger_release',
            name: "Anger Release",
            audible: 396,
            color: 'red',
            icon: Zap,
            emoji: '🔥',
            description: "Release rage, guilt, fear",
            speakerFriendly: true
        },
        {
            id: 'healing',
            name: "Deep Healing",
            audible: 174,
            color: 'cyan',
            icon: Sparkles,
            emoji: '✨',
            description: "Bone-level healing, pain relief",
            speakerFriendly: true
        },
        {
            id: 'calm',
            name: "Universal Calm",
            audible: 432,
            color: 'purple',
            icon: Brain,
            emoji: '🧘',
            description: "Natural harmony, anxiety relief",
            speakerFriendly: true
        },
        {
            id: 'love',
            name: "Love Frequency",
            audible: 528,
            color: 'pink',
            icon: Heart,
            emoji: '❤️',
            description: "DNA repair, heart healing",
            speakerFriendly: true
        },
        {
            id: 'transformation',
            name: "Heart Opening",
            audible: 639,
            color: 'orange',
            icon: Activity,
            emoji: '🔄',
            description: "Emotional release, connection",
            speakerFriendly: true
        },
        {
            id: 'clarity',
            name: "Mental Clarity",
            audible: 741,
            color: 'blue',
            icon: Brain,
            emoji: '💎',
            description: "Clear thinking, focus",
            speakerFriendly: true
        }
    ];

    // VISUALIZER
    useEffect(() => {
        if (!isPlaying || !canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!isPlaying) return;
            requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            const colors = {
                red: ['#ef4444', '#dc2626', '#b91c1c'],
                cyan: ['#06b6d4', '#0891b2', '#0e7490'],
                purple: ['#a855f7', '#9333ea', '#7e22ce'],
                pink: ['#ec4899', '#db2777', '#be185d'],
                orange: ['#f97316', '#ea580c', '#c2410c'],
                blue: ['#3b82f6', '#2563eb', '#1d4ed8']
            };

            const freqColors = colors[selectedFrequency?.color] || colors.cyan;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;
                const colorIndex = Math.floor((i / bufferLength) * freqColors.length);
                ctx.fillStyle = freqColors[colorIndex];
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };

        draw();
    }, [isPlaying, selectedFrequency]);

    // PLAY FREQUENCY WITH VISUALIZER
    const playFrequency = (freq) => {
        stopFrequency();

        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const audioCtx = audioContextRef.current;
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            const analyser = audioCtx.createAnalyser();

            analyser.fftSize = 256;

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq.audible, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.5);

            oscillator.connect(analyser);
            analyser.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();

            oscillatorRef.current = oscillator;
            gainNodeRef.current = gainNode;
            analyserRef.current = analyser;
            setIsPlaying(true);
            setSelectedFrequency(freq);
        } catch (err) {
            console.error('Audio error:', err);
        }
    };

    const stopFrequency = () => {
        if (oscillatorRef.current) {
            const gainNode = gainNodeRef.current;
            const audioCtx = audioContextRef.current;

            // Fade out
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);

            setTimeout(() => {
                if (oscillatorRef.current) {
                    oscillatorRef.current.stop();
                    oscillatorRef.current = null;
                    gainNodeRef.current = null;
                }
            }, 300);
        }
        setIsPlaying(false);
        setSelectedFrequency(null);
    };

    const adjustVolume = (newVolume) => {
        setVolume(newVolume);
        if (gainNodeRef.current && audioContextRef.current) {
            gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
        }
    };

    useEffect(() => {
        document.title = "Universal51 - Hear The Invisible | UF51";
        return () => {
            stopFrequency();
        };
    }, []);

    const colorMap = {
        red: { bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500', text: 'text-red-400', glow: '0 0 40px rgba(239, 68, 68, 0.6)' },
        cyan: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400', glow: '0 0 30px rgba(6, 182, 212, 0.5)' },
        purple: { bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500', text: 'text-purple-400', glow: '0 0 30px rgba(168, 85, 247, 0.5)' },
        pink: { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500', text: 'text-pink-400', glow: '0 0 30px rgba(236, 72, 153, 0.5)' },
        orange: { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500', text: 'text-orange-400', glow: '0 0 30px rgba(249, 115, 22, 0.5)' },
        blue: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500', text: 'text-blue-400', glow: '0 0 30px rgba(59, 130, 246, 0.5)' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black text-white p-4">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER - SIMPLE */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-4xl font-black text-white mb-2">
                        🔊 UNIVERSAL51
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Speaker-friendly healing • No headphones needed
                    </p>
                </motion.div>

                {/* VISUALIZER + CONTROLS */}
                <AnimatePresence>
                {isPlaying && selectedFrequency && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`mb-6 bg-gradient-to-br ${colorMap[selectedFrequency.color].bg} border-4 ${colorMap[selectedFrequency.color].border} rounded-2xl p-6 relative overflow-hidden`}
                        style={{ boxShadow: colorMap[selectedFrequency.color].glow }}
                    >
                        {/* ANIMATED BACKGROUND */}
                        <motion.div
                            className="absolute inset-0 opacity-20"
                            animate={{
                                background: [
                                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                    'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        <div className="relative z-10">
                            {/* NOW PLAYING HEADER */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <selectedFrequency.icon className={`w-10 h-10 ${colorMap[selectedFrequency.color].text}`} />
                                    </motion.div>
                                    <div>
                                        <p className="text-white/60 text-xs font-bold">NOW PLAYING</p>
                                        <p className="text-white text-2xl font-black">{selectedFrequency.emoji} {selectedFrequency.name}</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={stopFrequency}
                                    className="bg-black/60 hover:bg-black/80 border-2 border-white/20 text-white px-6 py-3 rounded-xl font-black"
                                >
                                    STOP
                                </motion.button>
                            </div>

                            {/* VISUALIZER CANVAS */}
                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={200}
                                className="w-full h-40 rounded-xl bg-black/40 mb-4"
                            />

                            {/* FREQUENCY + DESCRIPTION */}
                            <div className="bg-black/60 rounded-xl p-4 mb-4">
                                <p className={`${colorMap[selectedFrequency.color].text} font-black text-4xl mb-1`}>
                                    {selectedFrequency.audible} Hz
                                </p>
                                <p className="text-white/80 text-sm">{selectedFrequency.description}</p>
                            </div>

                            {/* VOLUME SLIDER */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-white text-sm font-bold">🔊 VOLUME</p>
                                    <p className="text-white/60 text-sm font-mono">{Math.round(volume * 100)}%</p>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => adjustVolume(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-black/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* FREQUENCY BUTTONS - SIMPLE */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {universalFrequencies.map((freq) => {
                        const colors = colorMap[freq.color];
                        const isActive = selectedFrequency?.id === freq.id;

                        return (
                            <motion.button
                                key={freq.id}
                                onClick={() => isActive ? stopFrequency() : playFrequency(freq)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`bg-gradient-to-br ${colors.bg} border-3 ${colors.border} rounded-xl p-4 text-left transition-all ${
                                    isActive ? 'ring-4 ring-white/50' : ''
                                }`}
                                style={{ boxShadow: isActive ? colors.glow : 'none' }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <freq.icon className={`w-6 h-6 ${colors.text}`} />
                                    <span className="text-2xl">{freq.emoji}</span>
                                </div>
                                <p className="text-white font-black text-sm mb-1">{freq.name}</p>
                                <p className={`${colors.text} font-black text-lg mb-1`}>{freq.audible} Hz</p>
                                <p className="text-gray-400 text-xs">{freq.description}</p>
                                {isActive && (
                                    <div className="mt-2 flex items-center gap-1">
                                        <Signal className={`w-3 h-3 ${colors.text} animate-pulse`} />
                                        <span className={`text-xs font-bold ${colors.text}`}>PLAYING</span>
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* INFO BUTTON */}
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="w-full bg-black/40 border-2 border-white/20 rounded-xl p-3 flex items-center justify-between hover:bg-black/60 transition-all mb-6"
                >
                    <p className="text-white font-bold text-sm">ℹ️ How does this work?</p>
                    <Info className="w-5 h-5 text-white" />
                </button>

                <AnimatePresence>
                {showInfo && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 space-y-3"
                    >
                        <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-4">
                            <p className="text-cyan-400 font-bold mb-1">🔊 SPEAKER-FRIENDLY</p>
                            <p className="text-gray-300 text-xs">These frequencies work through ANY speaker - phone, laptop, fire-side bluetooth. Low frequencies = felt in bones.</p>
                        </div>
                        <div className="bg-black/60 border-2 border-pink-500/30 rounded-xl p-4">
                            <p className="text-pink-400 font-bold mb-1">🧠 BRAIN SYNC</p>
                            <p className="text-gray-300 text-xs">Sound = electrical signal in brain. Right frequency → brain matches it → calm/heal/focus.</p>
                        </div>
                        <div className="bg-black/60 border-2 border-purple-500/30 rounded-xl p-4">
                            <p className="text-purple-400 font-bold mb-1">❤️ INSTANT EFFECT</p>
                            <p className="text-gray-300 text-xs">You'll feel it within 30 seconds. Chest, breath, thoughts - it all shifts. That's physics.</p>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

            </div>
        </div>
    );
}