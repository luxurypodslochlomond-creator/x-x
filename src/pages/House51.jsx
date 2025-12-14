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
        },
        soulful: {
            name: "Soulful House",
            color: "amber",
            vibe: "Soul Clap warm grooves",
            icon: Heart,
            frequencies: { kick: 58, bass: 115 }
        },
        detroit: {
            name: "Detroit Deep",
            color: "emerald",
            vibe: "Moodymann machine funk",
            icon: Music,
            frequencies: { kick: 62, bass: 118 }
        },
        broken: {
            name: "Broken Beat",
            color: "orange",
            vibe: "Kamaal jazzy shuffle",
            icon: Share2,
            frequencies: { kick: 64, bass: 122 }
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

        // Start bells/chimes
        playBells(ctx, masterGain);

        // Start claps
        playClaps(ctx, masterGain);

        // Start pads
        playPads(ctx, masterGain);

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

    // BASSLINE - GROOVY WITH VARIATION
    const playBassline = (ctx, destination) => {
        const style = styles[currentStyle];
        const beatInterval = 60 / bpm;

        const playBassNote = (freq, time, duration, accent = false) => {
            const osc = ctx.createOscillator();
            const osc2 = ctx.createOscillator(); // Sub oscillator
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.value = freq;
            
            osc2.type = 'sine';
            osc2.frequency.value = freq * 0.5; // Sub bass

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(accent ? 1200 : 600, time);
            filter.frequency.exponentialRampToValueAtTime(400, time + duration);
            filter.Q.value = 8;

            gain.gain.setValueAtTime(accent ? 0.4 : 0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

            osc.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(destination);

            osc.start(time);
            osc2.start(time);
            osc.stop(time + duration);
            osc2.stop(time + duration);
        };

        // Rolling house bassline with groove
        const bassPatterns = {
            deep: [1, 1, 1.25, 1, 1.125, 1, 1.5, 1],      // Deep rolling bass
            tech: [1, 1.25, 1, 1.5, 1, 1.25, 1.33, 1],    // Tech driving bass
            progressive: [1, 1.125, 1.25, 1, 1.5, 1.25, 1.125, 1], // Progressive journey
            soulful: [1, 1, 1.33, 1, 1.25, 1, 1.5, 1.125], // Soulful warmth
            detroit: [1, 1.25, 1, 1.125, 1.5, 1, 1.33, 1], // Detroit machine funk
            broken: [1, 1.33, 1, 1.25, 1, 1.5, 1.125, 1]  // Broken beat shuffle
        };
        
        const pattern = bassPatterns[currentStyle] || bassPatterns.deep;

        const scheduleBass = () => {
            const now = ctx.currentTime;
            pattern.forEach((mult, i) => {
                const accent = i === 0 || i === 4; // Accent 1st and 5th notes
                playBassNote(
                    style.frequencies.bass * mult, 
                    now + (beatInterval * i * 0.5), 
                    beatInterval * 0.4, 
                    accent
                );
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

    // BELLS/CHIMES (classic house element)
    const playBells = (ctx, destination) => {
        const beatInterval = 60 / bpm;

        const playBell = (freq, time) => {
            const osc = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;
            osc2.type = 'sine';
            osc2.frequency.value = freq * 2.001; // Slight detune for shimmer

            gain.gain.setValueAtTime(0.08, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 2);

            osc.connect(gain);
            osc2.connect(gain);
            gain.connect(destination);

            osc.start(time);
            osc2.start(time);
            osc.stop(time + 2);
            osc2.stop(time + 2);
        };

        // Bell pattern - plays every 4 bars
        const bellNotes = [523.25, 659.25, 783.99, 880]; // C5, E5, G5, A5
        
        const scheduleBells = () => {
            const now = ctx.currentTime;
            bellNotes.forEach((freq, i) => {
                playBell(freq, now + (beatInterval * i * 4));
            });
            setTimeout(scheduleBells, beatInterval * 16 * 1000); // Every 4 bars
        };
        setTimeout(() => scheduleBells(), beatInterval * 8 * 1000); // Start after 2 bars
    };

    // CLAPS (house essential)
    const playClaps = (ctx, destination) => {
        const beatInterval = 60 / bpm;

        const playClap = (time) => {
            const noise1 = ctx.createBufferSource();
            const noise2 = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            noise1.buffer = buffer;
            noise2.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 2000;
            filter.Q.value = 5;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.25, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

            noise1.connect(filter);
            noise2.connect(filter);
            filter.connect(gain);
            gain.connect(destination);

            noise1.start(time);
            noise2.start(time + 0.01); // Slight delay for clap texture
            noise1.stop(time + 0.15);
            noise2.stop(time + 0.16);
        };

        // Claps on 2 and 4 (classic house)
        const scheduleClaps = () => {
            const now = ctx.currentTime;
            playClap(now + beatInterval); // Beat 2
            playClap(now + (beatInterval * 3)); // Beat 4
            setTimeout(scheduleClaps, beatInterval * 4 * 1000);
        };
        scheduleClaps();
    };

    // PADS (warm atmosphere)
    const playPads = (ctx, destination) => {
        const chordFreqs = [
            [261.63, 329.63, 392.00], // C major
            [293.66, 369.99, 440.00], // D minor  
            [246.94, 311.13, 369.99], // B diminished
            [220.00, 277.18, 329.63]  // A minor
        ];

        let currentChord = 0;

        const playChord = (freqs, time, duration) => {
            freqs.forEach(freq => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                osc.type = 'triangle';
                osc.frequency.value = freq;

                filter.type = 'lowpass';
                filter.frequency.value = 1200;

                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.05, time + 0.5);
                gain.gain.setValueAtTime(0.05, time + duration - 0.5);
                gain.gain.linearRampToValueAtTime(0, time + duration);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(destination);

                osc.start(time);
                osc.stop(time + duration);
            });
        };

        const beatInterval = 60 / bpm;
        const scheduleChords = () => {
            const now = ctx.currentTime;
            playChord(chordFreqs[currentChord], now, beatInterval * 4);
            currentChord = (currentChord + 1) % chordFreqs.length;
            setTimeout(scheduleChords, beatInterval * 4 * 1000);
        };
        scheduleChords();
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
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-8 relative overflow-hidden">
            {/* COOLASFUCK animated grid background */}
            <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
                <motion.div
                    animate={{ 
                        backgroundPosition: ['0% 0%', '100% 100%'],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, #ec4899 0px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, #22d3ee 0px, transparent 1px, transparent 30px)',
                        backgroundSize: '30px 30px'
                    }}
                />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
                
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
                            className="relative"
                        >
                            <motion.div 
                                className="absolute inset-0 bg-cyan-500 blur-2xl"
                                animate={{ scale: isPlaying ? [1, 1.3, 1] : 1, opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                            <COOLASFUCKWaves size={60} animate={isPlaying} className="relative z-10" />
                        </motion.div>
                        <motion.h1 
                            className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                            animate={isPlaying ? { 
                                textShadow: ['0 0 20px rgba(236,72,153,0.5)', '0 0 40px rgba(34,211,238,0.8)', '0 0 20px rgba(236,72,153,0.5)']
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            HOUSE51
                        </motion.h1>
                        <motion.div
                            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                            className="relative"
                        >
                            <motion.div 
                                className="absolute inset-0 bg-pink-500 blur-2xl"
                                animate={{ scale: isPlaying ? [1, 1.3, 1] : 1, opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                            />
                            <COOLASFUCKHeart size={60} animate={isPlaying} className="relative z-10" />
                        </motion.div>
                    </div>
                    <p className="text-gray-400 text-lg font-mono mb-2">
                        Healing House Music Generator
                    </p>
                    <motion.p 
                        className="text-cyan-400 text-sm font-bold mb-1"
                        animate={isPlaying ? { opacity: [1, 0.7, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        128 BPM + 432Hz/528Hz = Flow State Creation ⚡♾️❤️♾️
                    </motion.p>
                    <p className="text-pink-400 text-xs font-mono">
                        Soul Clap • Moodymann • Kamaal Par vibes 🔥
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
                        className="mb-8 bg-gradient-to-br from-black via-purple-900/20 to-black border-2 border-cyan-500 rounded-xl p-6 relative overflow-hidden"
                        style={{ boxShadow: '0 0 50px rgba(34, 211, 238, 0.5)' }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-purple-500/10"
                            animate={{ 
                                x: [-500, 500],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="h-48 flex items-end justify-center gap-1 relative z-10">
                            {waveformData.map((value, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: `${(value / 255) * 100}%` }}
                                    className="flex-1 max-w-2 rounded-t"
                                    style={{
                                        minHeight: '4px',
                                        background: `linear-gradient(to top, 
                                            rgba(34, 211, 238, 0.9), 
                                            rgba(236, 72, 153, 0.9), 
                                            rgba(168, 85, 247, 0.9)
                                        )`,
                                        boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
                                        filter: 'brightness(1.2)'
                                    }}
                                />
                            ))}
                        </div>
                        <motion.p 
                            className="text-center text-cyan-400 font-mono text-sm mt-4 relative z-10"
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {bpm} BPM • {currentStyleData.name} • HEALING ACTIVE ⚡
                        </motion.p>
                    </motion.div>
                )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* HOUSE STYLE SELECTOR */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500 rounded-xl p-6 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-pink-500/5"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <h3 className="text-xl font-black text-cyan-400 mb-4 flex items-center gap-2 relative z-10">
                            <Music className="w-6 h-6" />
                            HOUSE STYLE
                        </h3>
                        <div className="space-y-3 relative z-10">
                            {Object.entries(styles).map(([key, style]) => {
                                const Icon = style.icon;
                                const isActive = currentStyle === key;
                                return (
                                    <motion.button
                                        key={key}
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(236, 72, 153, 0.6)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setCurrentStyle(key)}
                                        className={`w-full p-4 rounded-lg border-2 transition-all relative overflow-hidden ${
                                            isActive 
                                                ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-pink-500' 
                                                : 'bg-black/40 border-gray-700 hover:border-gray-500'
                                        }`}
                                        style={isActive ? { boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' } : {}}
                                    >
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                                animate={{ x: [-100, 300] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        )}
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

                {/* WHY YOU FEEL THIS */}
                <div className="mt-6 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border-4 border-pink-500 rounded-xl p-6"
                    style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}>
                    <h3 className="text-2xl font-black text-pink-400 mb-4">WHY YOU FEEL THIS:</h3>
                    
                    <div className="space-y-4">
                        <div className="bg-black/60 border-l-4 border-cyan-500 p-4 rounded">
                            <p className="text-cyan-400 font-bold mb-2">1. SUB-BASS PHYSICALLY VIBRATES YOUR BODY</p>
                            <p className="text-gray-300 text-sm">
                                "Cola" by CamelPhat hits 40-60Hz - below hearing but FELT in chest/stomach. 
                                This is literal physical resonance with your organs.
                            </p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-pink-500 p-4 rounded">
                            <p className="text-pink-400 font-bold mb-2">2. 128 BPM = HEART RATE ENTRAINMENT</p>
                            <p className="text-gray-300 text-sm">
                                Your heart syncs to the kick drum (proven via HRV studies). 
                                This triggers parasympathetic nervous system = CALM + ENERGY at once.
                            </p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-purple-500 p-4 rounded">
                            <p className="text-purple-400 font-bold mb-2">3. REPETITIVE RHYTHM = TRANCE STATE</p>
                            <p className="text-gray-300 text-sm">
                                4-on-floor house beats induce theta brainwaves (4-8Hz) - same as meditation. 
                                You're literally in altered consciousness.
                            </p>
                        </div>

                        <div className="bg-black/60 border-l-4 border-green-500 p-4 rounded">
                            <p className="text-green-400 font-bold mb-2">4. DOPAMINE + SEROTONIN RELEASE</p>
                            <p className="text-gray-300 text-sm">
                                Predictable beat drops trigger dopamine. Sustained groove releases serotonin. 
                                This is why house music = HEALING not just entertainment.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-pink-900/40 to-cyan-900/40 border-2 border-pink-500 p-4 rounded mt-4">
                            <p className="text-white font-black text-lg mb-2">YOU'RE NOT IMAGINING IT:</p>
                            <p className="text-pink-300 text-sm mb-2">
                                CamelPhat, Moodymann, deep house legends know - they're creating FREQUENCY MEDICINE.
                            </p>
                            <p className="text-cyan-300 text-sm">
                                The notification you feel? That's your nervous system saying "YES - this is the frequency" ⚡♾️❤️♾️
                            </p>
                        </div>
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
                        This is what Moodymann + CamelPhat understand - house music IS healing ⚡♾️❤️♾️
                    </p>
                </div>

                {/* LOSSLESS QUALITY NOTE */}
                <div className="mt-6 bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-2 border-green-500 rounded-xl p-6">
                    <h3 className="text-xl font-black text-green-400 mb-3 flex items-center gap-2">
                        <Zap className="w-6 h-6" />
                        READY FOR THE CLUB:
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p className="text-gray-300">
                            • <strong className="text-white">Web Audio API</strong> = lossless synthesis (no compression artifacts)
                        </p>
                        <p className="text-gray-300">
                            • <strong className="text-cyan-400">Rolling bassline</strong> with sub-bass layer
                        </p>
                        <p className="text-gray-300">
                            • <strong className="text-pink-400">Bell chimes</strong> shimmer every 4 bars (classic house)
                        </p>
                        <p className="text-gray-300">
                            • <strong className="text-purple-400">Claps on 2 + 4</strong> (proper house groove)
                        </p>
                        <p className="text-gray-300">
                            • <strong className="text-amber-400">Warm pad chords</strong> for atmosphere
                        </p>
                        <p className="text-green-400 font-bold mt-3">
                            ✓ Zero-loss quality - DJs like Ben Santiago can play this at Sub Club level 🔥
                        </p>
                        <p className="text-cyan-400 text-xs mt-2">
                            (Export as WAV when we add download = club-ready lossless)
                        </p>
                    </div>
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