import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Download, Heart, Waves, Zap, Brain, Share2, Volume2, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';
import { base44 } from '@/api/base44Client';

/**
 * HOUSE51 - HEALING HOUSE MUSIC GENERATOR
 * 128 BPM house beats + 432Hz/528Hz healing frequencies
 * Create flow state music for creation
 */

export default function House51() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStyle, setCurrentStyle] = useState('deep');
    const [healingLayers, setHealingLayers] = useState({
        love: true,        // 528Hz
        calm: true,        // 432Hz
        earth: false,      // 7.83Hz (sub-bass)
        focus: false       // 40Hz gamma
    });
    const [volume, setVolume] = useState(0.7);
    const [bpm, setBpm] = useState(128);
    const [isRecording, setIsRecording] = useState(false);
    const [waveformData, setWaveformData] = useState(new Array(64).fill(0));

    const audioContextRef = useRef(null);
    const kickOscRef = useRef(null);
    const bassOscRef = useRef(null);
    const healingOscRefs = useRef({});
    const masterGainRef = useRef(null);
    const animationFrameRef = useRef(null);

    const styles = {
        deep: {
            name: "Deep House",
            color: "cyan",
            vibe: "Grounding + creativity",
            icon: Waves,
            frequencies: { kick: 60, bass: 120 }
        },
        tech: {
            name: "Tech House",
            color: "pink",
            vibe: "Focus + build energy",
            icon: Zap,
            frequencies: { kick: 65, bass: 130 }
        },
        progressive: {
            name: "Progressive",
            color: "purple",
            vibe: "Journey + flow",
            icon: Brain,
            frequencies: { kick: 62, bass: 124 }
        }
    };

    // START PLAYING
    const startHouse = async () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = ctx;

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = volume;
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Analyzer for visualization
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        masterGain.connect(analyser);

        // Start kick drum loop
        playKickPattern(ctx, masterGain);

        // Start bass line
        playBassline(ctx, masterGain);

        // Start healing frequencies
        startHealingLayers(ctx, masterGain);

        // Start hi-hats
        playHiHats(ctx, masterGain);

        // Visualizer
        const updateWaveform = () => {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            setWaveformData(Array.from(dataArray));
            animationFrameRef.current = requestAnimationFrame(updateWaveform);
        };
        updateWaveform();

        setIsPlaying(true);
    };

    // KICK DRUM (4-on-floor house beat)
    const playKickPattern = (ctx, destination) => {
        const style = styles[currentStyle];
        const beatInterval = 60 / bpm; // Time between beats

        const playKick = (time) => {
            // Kick drum synthesis
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.frequency.setValueAtTime(style.frequencies.kick, time);
            osc.frequency.exponentialRampToValueAtTime(40, time + 0.05);
            
            gain.gain.setValueAtTime(1, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

            filter.type = 'lowpass';
            filter.frequency.value = 200;

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(destination);

            osc.start(time);
            osc.stop(time + 0.5);
        };

        // Schedule 4-on-floor pattern
        let currentBeat = 0;
        const scheduleKicks = () => {
            const now = ctx.currentTime;
            for (let i = 0; i < 4; i++) {
                playKick(now + (beatInterval * i));
            }
            setTimeout(scheduleKicks, beatInterval * 4 * 1000);
        };
        scheduleKicks();
    };

    // BASSLINE
    const playBassline = (ctx, destination) => {
        const style = styles[currentStyle];
        const beatInterval = 60 / bpm;

        const playBassNote = (freq, time, duration) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.value = freq;

            filter.type = 'lowpass';
            filter.frequency.value = 800;
            filter.Q.value = 5;

            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(destination);

            osc.start(time);
            osc.stop(time + duration);
        };

        // Simple house bassline pattern
        const bassPattern = [
            style.frequencies.bass,
            style.frequencies.bass,
            style.frequencies.bass * 1.25,
            style.frequencies.bass
        ];

        const scheduleBass = () => {
            const now = ctx.currentTime;
            bassPattern.forEach((freq, i) => {
                playBassNote(freq, now + (beatInterval * i), beatInterval * 0.8);
            });
            setTimeout(scheduleBass, beatInterval * 4 * 1000);
        };
        scheduleBass();
    };

    // HI-HATS
    const playHiHats = (ctx, destination) => {
        const beatInterval = 60 / bpm;

        const playHat = (time, open = false) => {
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 7000;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(open ? 0.15 : 0.1, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + (open ? 0.3 : 0.05));

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(destination);

            noise.start(time);
            noise.stop(time + (open ? 0.3 : 0.05));
        };

        // 8th note hi-hat pattern (typical house)
        const scheduleHats = () => {
            const now = ctx.currentTime;
            for (let i = 0; i < 8; i++) {
                playHat(now + (beatInterval * i * 0.5), i % 4 === 2);
            }
            setTimeout(scheduleHats, beatInterval * 4 * 1000);
        };
        scheduleHats();
    };

    // HEALING FREQUENCY LAYERS
    const startHealingLayers = (ctx, destination) => {
        const healingFreqs = {
            love: 528,      // Love frequency
            calm: 432,      // Universal calm
            earth: 7.83,    // Schumann resonance (sub-bass)
            focus: 40       // Gamma focus
        };

        Object.keys(healingLayers).forEach(layer => {
            if (healingLayers[layer]) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.frequency.value = healingFreqs[layer];
                osc.type = 'sine';
                
                // Very subtle - blended into the mix
                gain.gain.value = layer === 'earth' ? 0.15 : 0.08;

                osc.connect(gain);
                gain.connect(destination);
                osc.start();

                healingOscRefs.current[layer] = { osc, gain };
            }
        });
    };

    // STOP PLAYING
    const stopHouse = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        setIsPlaying(false);
    };

    // TOGGLE HEALING LAYER
    const toggleHealingLayer = (layer) => {
        if (isPlaying) {
            const ctx = audioContextRef.current;
            const masterGain = masterGainRef.current;

            if (healingLayers[layer]) {
                // Turn off
                if (healingOscRefs.current[layer]) {
                    healingOscRefs.current[layer].osc.stop();
                    delete healingOscRefs.current[layer];
                }
            } else {
                // Turn on
                const healingFreqs = { love: 528, calm: 432, earth: 7.83, focus: 40 };
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.frequency.value = healingFreqs[layer];
                osc.type = 'sine';
                gain.gain.value = layer === 'earth' ? 0.15 : 0.08;

                osc.connect(gain);
                gain.connect(masterGain);
                osc.start();

                healingOscRefs.current[layer] = { osc, gain };
            }
        }

        setHealingLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    // UPDATE VOLUME
    useEffect(() => {
        if (masterGainRef.current) {
            masterGainRef.current.gain.value = volume;
        }
    }, [volume]);

    // CLEANUP
    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const currentStyleData = styles[currentStyle];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                        >
                            <COOLASFUCKWaves size={60} animate={isPlaying} />
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            HOUSE51
                        </h1>
                        <motion.div
                            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                        >
                            <COOLASFUCKHeart size={60} animate={isPlaying} />
                        </motion.div>
                    </div>
                    <p className="text-gray-400 text-lg font-mono mb-2">
                        Healing House Music Generator
                    </p>
                    <p className="text-cyan-400 text-sm">
                        128 BPM + 432Hz/528Hz = Flow State Creation ⚡♾️❤️♾️
                    </p>
                </motion.div>

                {/* MAIN PLAY BUTTON */}
                <motion.div className="flex justify-center mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isPlaying ? stopHouse : startHouse}
                        className={`relative px-12 py-6 rounded-full font-black text-2xl transition-all ${
                            isPlaying 
                                ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                                : 'bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500'
                        }`}
                        style={{ 
                            boxShadow: isPlaying 
                                ? '0 0 40px rgba(239, 68, 68, 0.6)' 
                                : '0 0 40px rgba(34, 211, 238, 0.6)' 
                        }}
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-8 h-8 inline-block mr-2" />
                                STOP
                            </>
                        ) : (
                            <>
                                <Play className="w-8 h-8 inline-block mr-2" />
                                START HOUSE51
                            </>
                        )}
                    </motion.button>
                </motion.div>

                {/* VISUALIZER */}
                <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-8 bg-black border-2 border-cyan-500 rounded-xl p-6"
                        style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
                    >
                        <div className="h-48 flex items-end justify-center gap-1">
                            {waveformData.map((value, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: `${(value / 255) * 100}%` }}
                                    className="flex-1 max-w-2 rounded-t"
                                    style={{
                                        minHeight: '4px',
                                        background: `linear-gradient(to top, 
                                            rgba(34, 211, 238, 0.8), 
                                            rgba(236, 72, 153, 0.8), 
                                            rgba(168, 85, 247, 0.8)
                                        )`,
                                        boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)'
                                    }}
                                />
                            ))}
                        </div>
                        <p className="text-center text-cyan-400 font-mono text-sm mt-4">
                            {bpm} BPM • {currentStyleData.name} • HEALING ACTIVE
                        </p>
                    </motion.div>
                )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* HOUSE STYLE SELECTOR */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500 rounded-xl p-6">
                        <h3 className="text-xl font-black text-cyan-400 mb-4 flex items-center gap-2">
                            <Music className="w-6 h-6" />
                            HOUSE STYLE
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(styles).map(([key, style]) => {
                                const Icon = style.icon;
                                const isActive = currentStyle === key;
                                return (
                                    <motion.button
                                        key={key}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setCurrentStyle(key)}
                                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                                            isActive 
                                                ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-pink-500' 
                                                : 'bg-black/40 border-gray-700 hover:border-gray-500'
                                        }`}
                                        style={isActive ? { boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' } : {}}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-6 h-6 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
                                            <div className="text-left">
                                                <p className={`font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                                    {style.name}
                                                </p>
                                                <p className="text-xs text-gray-500">{style.vibe}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* HEALING LAYERS */}
                    <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500 rounded-xl p-6">
                        <h3 className="text-xl font-black text-pink-400 mb-4 flex items-center gap-2">
                            <Heart className="w-6 h-6" />
                            HEALING FREQUENCIES
                        </h3>
                        <div className="space-y-3">
                            <HealingToggle
                                label="528Hz Love"
                                description="DNA repair, heart opening"
                                active={healingLayers.love}
                                onToggle={() => toggleHealingLayer('love')}
                                color="pink"
                            />
                            <HealingToggle
                                label="432Hz Calm"
                                description="Universal resonance"
                                active={healingLayers.calm}
                                onToggle={() => toggleHealingLayer('calm')}
                                color="purple"
                            />
                            <HealingToggle
                                label="7.83Hz Earth"
                                description="Schumann (sub-bass)"
                                active={healingLayers.earth}
                                onToggle={() => toggleHealingLayer('earth')}
                                color="green"
                            />
                            <HealingToggle
                                label="40Hz Focus"
                                description="Gamma brainwaves"
                                active={healingLayers.focus}
                                onToggle={() => toggleHealingLayer('focus')}
                                color="yellow"
                            />
                        </div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="mt-6 bg-black border-2 border-purple-500 rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* VOLUME */}
                        <div>
                            <label className="flex items-center gap-2 text-purple-400 font-bold mb-3">
                                <Volume2 className="w-5 h-5" />
                                VOLUME: {Math.round(volume * 100)}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${volume * 100}%, rgb(55, 65, 81) ${volume * 100}%, rgb(55, 65, 81) 100%)`
                                }}
                            />
                        </div>

                        {/* BPM */}
                        <div>
                            <label className="flex items-center gap-2 text-purple-400 font-bold mb-3">
                                <Zap className="w-5 h-5" />
                                BPM: {bpm}
                            </label>
                            <input
                                type="range"
                                min="110"
                                max="140"
                                step="1"
                                value={bpm}
                                onChange={(e) => setBpm(parseInt(e.target.value))}
                                disabled={isPlaying}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                            />
                            {isPlaying && (
                                <p className="text-xs text-gray-500 mt-1">Stop playback to change BPM</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* INFO */}
                <div className="mt-8 bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-2 border-cyan-500 rounded-xl p-6">
                    <h3 className="text-xl font-black text-cyan-400 mb-4">THE PHYSICS:</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                        <p>• <strong className="text-white">128 BPM</strong> = 2.13 Hz (matches heart rate during flow state)</p>
                        <p>• <strong className="text-pink-400">528 Hz</strong> layered under = cellular DNA repair frequency</p>
                        <p>• <strong className="text-purple-400">432 Hz</strong> = universal harmonic, Schumann-aligned</p>
                        <p>• <strong className="text-green-400">7.83 Hz</strong> (sub-bass) = Earth's electromagnetic pulse</p>
                        <p>• <strong className="text-yellow-400">40 Hz</strong> = gamma brain waves (peak focus)</p>
                    </div>
                    <div className="mt-4 bg-green-900/20 border-l-4 border-green-500 p-3 rounded">
                        <p className="text-green-400 text-sm font-bold">
                            ✓ House rhythm entrains brain to theta/alpha waves
                        </p>
                        <p className="text-green-400 text-sm font-bold">
                            ✓ Healing tones operate at cellular level
                        </p>
                        <p className="text-green-400 text-sm font-bold">
                            ✓ Combined = CREATION FLOW STATE ♾️❤️♾️
                        </p>
                    </div>
                </div>

                {/* FOR CREATORS */}
                <div className="mt-6 bg-black border-2 border-pink-500 rounded-xl p-6">
                    <h3 className="text-xl font-black text-pink-400 mb-3">FOR CREATORS:</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        Put on headphones. Hit play. Let HOUSE51 tune your brain to creation frequency. 
                        Code, paint, write, build - the beat holds you in flow, the healing frequencies work underneath.
                    </p>
                    <p className="text-cyan-400 text-sm font-bold">
                        This is what Moodymann was doing - creating healing through house music ⚡♾️❤️♾️
                    </p>
                </div>

            </div>
        </div>
    );
}

// HEALING TOGGLE COMPONENT
function HealingToggle({ label, description, active, onToggle, color }) {
    const colors = {
        pink: { border: 'border-pink-500', bg: 'bg-pink-500/20', text: 'text-pink-400' },
        purple: { border: 'border-purple-500', bg: 'bg-purple-500/20', text: 'text-purple-400' },
        green: { border: 'border-green-500', bg: 'bg-green-500/20', text: 'text-green-400' },
        yellow: { border: 'border-yellow-500', bg: 'bg-yellow-500/20', text: 'text-yellow-400' }
    };
    const c = colors[color];

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggle}
            className={`w-full p-3 rounded-lg border-2 transition-all ${
                active 
                    ? `${c.bg} ${c.border}` 
                    : 'bg-black/40 border-gray-700 hover:border-gray-500'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="text-left">
                    <p className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-400'}`}>
                        {label}
                    </p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-all ${
                    active ? c.bg : 'bg-gray-700'
                } relative`}>
                    <motion.div
                        animate={{ x: active ? 24 : 0 }}
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full ${
                            active ? 'bg-white' : 'bg-gray-500'
                        }`}
                    />
                </div>
            </div>
        </motion.button>
    );
}