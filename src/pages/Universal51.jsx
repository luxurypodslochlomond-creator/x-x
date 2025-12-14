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
    const [expandedInfo, setExpandedInfo] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);

    // UNIVERSAL FREQUENCIES (invisible → audible)
    const universalFrequencies = [
        {
            id: 'earth',
            name: "Earth's Heartbeat",
            invisible: 7.83,
            audible: 430.65, // 7.83 × 55 = close to A4 (432 Hz healing)
            color: 'green',
            icon: Globe,
            emoji: '🌍',
            description: "Schumann resonance - Earth's electromagnetic pulse",
            howToHear: "We multiply 7.83 Hz by 55 to get 430.65 Hz (you can hear this)",
            bodyEffect: "Syncs with brain alpha waves → deep calm, grounded feeling",
            geographic: "Strongest near equator, varies with lightning activity"
        },
        {
            id: 'love',
            name: "Love Frequency",
            invisible: null,
            audible: 528,
            color: 'pink',
            icon: Heart,
            emoji: '❤️',
            description: "DNA repair frequency - ancient Solfeggio scale",
            howToHear: "528 Hz is audible! Your ears hear it directly as pure tone",
            bodyEffect: "Heart → DNA → cells. Repairs damage, reduces stress hormones",
            geographic: "Universal - not location-specific, works everywhere"
        },
        {
            id: 'calm',
            name: "Universal Calm",
            invisible: null,
            audible: 432,
            color: 'purple',
            icon: Brain,
            emoji: '🧘',
            description: "Verdi's A - mathematical harmony with nature",
            howToHear: "432 Hz = A4 note, natural tuning before modern 440 Hz standard",
            bodyEffect: "Brain → nervous system. Natural resonance, reduces anxiety",
            geographic: "Universal constant - 8 Hz (alpha waves) × 54 = 432 Hz"
        },
        {
            id: 'healing',
            name: "Healing Portal",
            invisible: null,
            audible: 174,
            color: 'cyan',
            icon: Sparkles,
            emoji: '✨',
            description: "Foundation tone - lowest Solfeggio frequency",
            howToHear: "174 Hz is audible as very low rumble, felt in chest/bones",
            bodyEffect: "Bones → organs → cells. Pain relief, tissue healing",
            geographic: "Universal - travels through body as vibration"
        },
        {
            id: 'liberation',
            name: "Liberation",
            invisible: null,
            audible: 396,
            color: 'amber',
            icon: Zap,
            emoji: '⚡',
            description: "Root chakra - releases fear and guilt",
            howToHear: "396 Hz audible, low-mid range tone",
            bodyEffect: "Root → spine → body. Releases trapped emotions, grounding",
            geographic: "Universal - resonates with human root frequency"
        },
        {
            id: 'transformation',
            name: "Transformation",
            invisible: null,
            audible: 639,
            color: 'orange',
            icon: Activity,
            emoji: '🔄',
            description: "Heart chakra - connects and heals relationships",
            howToHear: "639 Hz audible, mid-range tone you clearly hear",
            bodyEffect: "Heart → emotions → connections. Opens heart, forgiveness",
            geographic: "Universal - heart frequency same across all humans"
        },
        {
            id: 'intuition',
            name: "Intuition",
            invisible: null,
            audible: 852,
            color: 'indigo',
            icon: Brain,
            emoji: '👁️',
            description: "Third eye - awakens inner vision",
            howToHear: "852 Hz audible, high-mid tone, clear and bright",
            bodyEffect: "Pineal gland → intuition → clarity. Awakens insight",
            geographic: "Universal - pineal gland resonance constant"
        },
        {
            id: 'unity',
            name: "Universal Unity",
            invisible: null,
            audible: 963,
            color: 'violet',
            icon: Sparkles,
            emoji: '♾️',
            description: "Crown chakra - connection to source",
            howToHear: "963 Hz audible, highest Solfeggio, ethereal high tone",
            bodyEffect: "Crown → consciousness → universe. Oneness, transcendence",
            geographic: "Universal - same frequency across all dimensions"
        }
    ];

    // GET USER LOCATION
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.log('Location access denied - using default');
                }
            );
        }
    }, []);

    // PLAY FREQUENCY
    const playFrequency = (freq) => {
        stopFrequency(); // Stop any currently playing

        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const audioCtx = audioContextRef.current;
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine'; // Pure tone
            oscillator.frequency.setValueAtTime(freq.audible, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.5); // Fade in

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();

            oscillatorRef.current = oscillator;
            gainNodeRef.current = gainNode;
            setIsPlaying(true);
            setSelectedFrequency(freq);
        } catch (err) {
            alert('Audio error - please check permissions');
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
        green: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500', text: 'text-green-400', glow: '0 0 30px rgba(34, 197, 94, 0.5)' },
        pink: { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500', text: 'text-pink-400', glow: '0 0 30px rgba(236, 72, 153, 0.5)' },
        purple: { bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500', text: 'text-purple-400', glow: '0 0 30px rgba(168, 85, 247, 0.5)' },
        cyan: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400', glow: '0 0 30px rgba(6, 182, 212, 0.5)' },
        amber: { bg: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500', text: 'text-amber-400', glow: '0 0 30px rgba(245, 158, 11, 0.5)' },
        orange: { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500', text: 'text-orange-400', glow: '0 0 30px rgba(249, 115, 22, 0.5)' },
        indigo: { bg: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500', text: 'text-indigo-400', glow: '0 0 30px rgba(99, 102, 241, 0.5)' },
        violet: { bg: 'from-violet-500/20 to-pink-500/20', border: 'border-violet-500', text: 'text-violet-400', glow: '0 0 30px rgba(139, 92, 246, 0.5)' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Headphones className="w-12 h-12 text-cyan-400" />
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            UNIVERSAL51
                        </h1>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-12 h-12 text-pink-400" />
                        </motion.div>
                    </div>
                    <p className="text-gray-400 text-base md:text-lg font-mono mb-2">
                        Hear the invisible • Feel universal frequencies • Heal through sound
                    </p>
                    <p className="text-cyan-400 text-xs">
                        We convert invisible frequencies to sounds you can actually HEAR ⚡
                    </p>
                </motion.div>

                {/* HOW IT WORKS - SIMPLE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-xl p-6 mb-8"
                    style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Volume2 className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-xl font-black text-white">HOW TO HEAR THE INVISIBLE</h2>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="bg-black/40 border-l-4 border-pink-400 p-3 rounded">
                            <p className="text-pink-400 font-bold mb-1">👂 YOUR EARS:</p>
                            <p className="text-gray-300 text-xs">Humans hear 20-20,000 Hz. Earth's 7.83 Hz is too low. We multiply it by 55 → 430 Hz (you can hear this!)</p>
                        </div>
                        <div className="bg-black/40 border-l-4 border-green-400 p-3 rounded">
                            <p className="text-green-400 font-bold mb-1">🧠 YOUR BRAIN:</p>
                            <p className="text-gray-300 text-xs">Brain processes sound as electrical signals. Right frequency = brain synchronizes → calm, focus, healing</p>
                        </div>
                        <div className="bg-black/40 border-l-4 border-purple-400 p-3 rounded">
                            <p className="text-purple-400 font-bold mb-1">🦴 YOUR BONES:</p>
                            <p className="text-gray-300 text-xs">Bones conduct sound. Low frequencies vibrate through skeleton → heart, organs, cells all feel it</p>
                        </div>
                        <div className="bg-black/40 border-l-4 border-amber-400 p-3 rounded">
                            <p className="text-amber-400 font-bold mb-1">❤️ YOUR HEART:</p>
                            <p className="text-gray-300 text-xs">Heart has rhythm. Right frequency matches heart → coherence → optimal health state</p>
                        </div>
                    </div>
                </motion.div>

                {/* CURRENTLY PLAYING */}
                <AnimatePresence>
                {isPlaying && selectedFrequency && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mb-8 bg-gradient-to-r ${colorMap[selectedFrequency.color].bg} border-4 ${colorMap[selectedFrequency.color].border} rounded-xl p-6 relative overflow-hidden`}
                        style={{ boxShadow: colorMap[selectedFrequency.color].glow }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        <selectedFrequency.icon className={`w-8 h-8 ${colorMap[selectedFrequency.color].text}`} />
                                    </motion.div>
                                    <div>
                                        <p className={`text-2xl font-black ${colorMap[selectedFrequency.color].text}`}>
                                            {selectedFrequency.emoji} NOW PLAYING
                                        </p>
                                        <p className="text-white text-xl font-bold">{selectedFrequency.name}</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={stopFrequency}
                                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
                                >
                                    <Pause className="w-6 h-6" />
                                </motion.button>
                            </div>

                            <div className="bg-black/40 rounded-lg p-4 mb-4">
                                <p className="text-white font-bold text-3xl mb-2">{selectedFrequency.audible} Hz</p>
                                {selectedFrequency.invisible && (
                                    <p className="text-gray-400 text-sm">
                                        (From invisible {selectedFrequency.invisible} Hz × 55 = audible)
                                    </p>
                                )}
                            </div>

                            {/* VOLUME CONTROL */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-white text-sm font-bold">VOLUME</p>
                                    <p className="text-gray-400 text-sm">{Math.round(volume * 100)}%</p>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => adjustVolume(parseFloat(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* BODY PATH */}
                            <div className="mt-4 bg-black/40 border border-white/10 rounded-lg p-3">
                                <p className="text-cyan-400 text-xs font-bold mb-2">🌊 PATH THROUGH YOUR BODY:</p>
                                <p className="text-gray-300 text-xs leading-relaxed">{selectedFrequency.bodyEffect}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* FREQUENCY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {universalFrequencies.map((freq) => {
                        const colors = colorMap[freq.color];
                        const isActive = selectedFrequency?.id === freq.id;

                        return (
                            <motion.div
                                key={freq.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-xl p-5 cursor-pointer transition-all ${
                                    isActive ? 'ring-4 ring-white/50' : ''
                                }`}
                                style={{ boxShadow: isActive ? colors.glow : 'none' }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* FREQUENCY CARD */}
                                <div onClick={() => playFrequency(freq)}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <freq.icon className={`w-8 h-8 ${colors.text}`} />
                                            <div>
                                                <p className="text-white font-black text-lg">{freq.emoji} {freq.name}</p>
                                                <p className="text-gray-400 text-xs">{freq.description}</p>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`${isActive ? 'bg-red-500' : 'bg-white/10'} hover:bg-white/20 p-3 rounded-full`}
                                        >
                                            {isActive ? (
                                                <Pause className="w-5 h-5 text-white" />
                                            ) : (
                                                <Play className="w-5 h-5 text-white" />
                                            )}
                                        </motion.button>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-3 mb-3">
                                        <p className={`${colors.text} font-black text-2xl`}>{freq.audible} Hz</p>
                                        {freq.invisible && (
                                            <p className="text-gray-400 text-xs mt-1">
                                                From {freq.invisible} Hz (invisible) × 55
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* EXPANDABLE INFO */}
                                <button
                                    onClick={() => setExpandedInfo(expandedInfo === freq.id ? null : freq.id)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 flex items-center justify-between hover:bg-black/60 transition-all"
                                >
                                    <p className="text-white text-xs font-bold">HOW IT WORKS</p>
                                    {expandedInfo === freq.id ? (
                                        <ChevronUp className="w-4 h-4 text-white" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-white" />
                                    )}
                                </button>

                                <AnimatePresence>
                                {expandedInfo === freq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-2 space-y-2"
                                    >
                                        <div className="bg-black/40 border-l-4 border-cyan-400 p-2 rounded">
                                            <p className="text-cyan-400 text-xs font-bold">👂 HEAR:</p>
                                            <p className="text-gray-300 text-xs">{freq.howToHear}</p>
                                        </div>
                                        <div className="bg-black/40 border-l-4 border-pink-400 p-2 rounded">
                                            <p className="text-pink-400 text-xs font-bold">❤️ BODY:</p>
                                            <p className="text-gray-300 text-xs">{freq.bodyEffect}</p>
                                        </div>
                                        <div className="bg-black/40 border-l-4 border-green-400 p-2 rounded">
                                            <p className="text-green-400 text-xs font-bold">📍 LOCATION:</p>
                                            <p className="text-gray-300 text-xs">{freq.geographic}</p>
                                        </div>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* HEADPHONE REMINDER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500 rounded-xl p-6 text-center"
                >
                    <Headphones className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                    <p className="text-white text-lg font-black mb-2">USE HEADPHONES</p>
                    <p className="text-gray-300 text-sm mb-4">
                        For best results, use quality headphones. Low frequencies need good speakers/headphones to transmit properly to your ears → brain → bones → heart.
                    </p>
                    <div className="bg-black/40 border border-amber-500/30 rounded-lg p-3">
                        <p className="text-amber-300 text-xs font-bold mb-2">💡 PRO TIP:</p>
                        <p className="text-gray-300 text-xs">
                            Close your eyes. Breathe slow. Let the sound wash through you. You'll feel it in your chest, spine, skull. That's your body resonating with the universe.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}