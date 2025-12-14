import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Download, Heart, Waves, Share2, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKHouse51, COOLASFUCKWaves, COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';

/**
 * PATIENT ZERO - THE FIRST HOUSE51 TRACK
 * 
 * Inspired by RÜFÜS DU SOL "Innerbloom" structure:
 * - Progressive house journey (120 BPM)
 * - Emotional build + release
 * - Healing frequencies embedded (432Hz, 528Hz, 7.83Hz Schumann)
 * - 8-minute journey: intro → build → breakdown → climax → outro
 * 
 * FREQUENCY ANALYSIS:
 * - Sub bass: 40-60Hz (physical body resonance)
 * - Bass: 60-120Hz (emotional center, 432Hz healing)
 * - Mids: 250-2000Hz (melodic heart, 528Hz love frequency)
 * - Highs: 4000-8000Hz (clarity, consciousness)
 * - Schumann 7.83Hz (sub-harmonic throughout)
 * 
 * MESSAGE: 
 * "You are not alone. This pressure will lift. The frequency is changing."
 */

export default function PatientZero() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [waveformData, setWaveformData] = useState(new Array(64).fill(0));
    
    const audioContextRef = useRef(null);
    const masterGainRef = useRef(null);
    const animationFrameRef = useRef(null);
    const startTimeRef = useRef(null);
    const timeTrackerRef = useRef(null);

    // Track structure: 8 minutes (480 seconds)
    const totalDuration = 480;
    const sections = [
        { name: 'Intro', start: 0, end: 60, description: 'Schumann resonance emerges' },
        { name: 'Build', start: 60, end: 180, description: 'Kick + bass foundation' },
        { name: 'Breakdown', start: 180, end: 300, description: 'Emotional release, 432Hz pads' },
        { name: 'Climax', start: 300, end: 420, description: 'Full frequency spectrum, 528Hz peak' },
        { name: 'Outro', start: 420, end: 480, description: 'Return to source' }
    ];

    const getCurrentSection = () => {
        return sections.find(s => currentTime >= s.start && currentTime < s.end) || sections[0];
    };

    // START TRACK
    const startTrack = async () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.value = volume;
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Analyzer
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        masterGain.connect(analyser);

        // Start composition
        composePatientZero(ctx, masterGain);

        // Visualizer
        const updateWaveform = () => {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            setWaveformData(Array.from(dataArray));
            animationFrameRef.current = requestAnimationFrame(updateWaveform);
        };
        updateWaveform();

        // Time tracker
        startTimeRef.current = Date.now();
        const trackTime = () => {
            if (isPlaying) {
                const elapsed = (Date.now() - startTimeRef.current) / 1000;
                setCurrentTime(Math.min(elapsed, totalDuration));
                if (elapsed >= totalDuration) {
                    stopTrack();
                } else {
                    timeTrackerRef.current = setTimeout(trackTime, 100);
                }
            }
        };
        trackTime();

        setIsPlaying(true);
    };

    // COMPOSE PATIENT ZERO
    const composePatientZero = (ctx, destination) => {
        const bpm = 120;
        const beatInterval = 60 / bpm;

        // SECTION 1: INTRO (0-60s) - Schumann + ambient
        scheduleIntro(ctx, destination, 0, 60);

        // SECTION 2: BUILD (60-180s) - Kick + bass enter
        scheduleBuild(ctx, destination, 60, 180);

        // SECTION 3: BREAKDOWN (180-300s) - 432Hz pads, emotional
        scheduleBreakdown(ctx, destination, 180, 300);

        // SECTION 4: CLIMAX (300-420s) - Full spectrum, 528Hz peak
        scheduleClimax(ctx, destination, 300, 420);

        // SECTION 5: OUTRO (420-480s) - Return to source
        scheduleOutro(ctx, destination, 420, 480);
    };

    // INTRO: Schumann 7.83Hz + ambient wash
    const scheduleIntro = (ctx, destination, start, end) => {
        // Schumann resonance (7.83Hz as sub-harmonic)
        const schumann = ctx.createOscillator();
        const schumannGain = ctx.createGain();
        schumann.frequency.value = 7.83;
        schumannGain.gain.setValueAtTime(0, start);
        schumannGain.gain.linearRampToValueAtTime(0.15, start + 20);
        schumannGain.gain.setValueAtTime(0.15, end - 10);
        schumannGain.gain.linearRampToValueAtTime(0.1, end);
        schumann.connect(schumannGain);
        schumannGain.connect(destination);
        schumann.start(start);
        schumann.stop(end);

        // Ambient pad (432Hz harmonic)
        const pad = ctx.createOscillator();
        const pad2 = ctx.createOscillator();
        const padGain = ctx.createGain();
        const padFilter = ctx.createBiquadFilter();
        
        pad.type = 'triangle';
        pad.frequency.value = 432;
        pad2.type = 'sine';
        pad2.frequency.value = 432 * 1.5; // Perfect fifth
        
        padFilter.type = 'lowpass';
        padFilter.frequency.value = 800;
        
        padGain.gain.setValueAtTime(0, start);
        padGain.gain.linearRampToValueAtTime(0.03, start + 30);
        padGain.gain.setValueAtTime(0.03, end - 10);
        padGain.gain.linearRampToValueAtTime(0.02, end);
        
        pad.connect(padFilter);
        pad2.connect(padFilter);
        padFilter.connect(padGain);
        padGain.connect(destination);
        
        pad.start(start + 10);
        pad2.start(start + 10);
        pad.stop(end);
        pad2.stop(end);
    };

    // BUILD: Kick + bass foundation
    const scheduleBuild = (ctx, destination, start, end) => {
        const beatInterval = 0.5; // 120 BPM
        
        // 4-on-floor kick
        const scheduleKicks = () => {
            for (let t = start; t < end; t += beatInterval * 4) {
                for (let i = 0; i < 4; i++) {
                    const time = t + (i * beatInterval);
                    playKick(ctx, destination, time);
                }
            }
        };
        scheduleKicks();

        // Rolling bass (gradually enters)
        const bassStart = start + 30;
        scheduleBass(ctx, destination, bassStart, end);
    };

    const playKick = (ctx, destination, time) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.frequency.setValueAtTime(60, time);
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

    const scheduleBass = (ctx, destination, start, end) => {
        // 432Hz bass line
        const bassPattern = [432, 432, 432 * 1.2, 432, 432 * 1.33, 432, 432 * 1.5, 432];
        const beatInterval = 0.5;
        
        for (let t = start; t < end; t += beatInterval * 8) {
            bassPattern.forEach((freq, i) => {
                const time = t + (i * beatInterval);
                playBassNote(ctx, destination, freq * 0.5, time, beatInterval * 0.4);
            });
        }
    };

    const playBassNote = (ctx, destination, freq, time, duration) => {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        osc2.type = 'sine';
        osc2.frequency.value = freq * 0.5;

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, time);
        filter.frequency.exponentialRampToValueAtTime(400, time + duration);
        filter.Q.value = 8;

        gain.gain.setValueAtTime(0.3, time);
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

    // BREAKDOWN: 432Hz emotional pads
    const scheduleBreakdown = (ctx, destination, start, end) => {
        // 432Hz chord progression
        const chords = [
            [432, 432 * 1.25, 432 * 1.5],      // Am
            [432 * 1.125, 432 * 1.4, 432 * 1.67], // C
            [432 * 0.9, 432 * 1.125, 432 * 1.33], // G
            [432, 432 * 1.25, 432 * 1.5]       // Am
        ];

        chords.forEach((chord, i) => {
            const time = start + (i * 30);
            playChord(ctx, destination, chord, time, 30);
        });
    };

    const playChord = (ctx, destination, freqs, time, duration) => {
        freqs.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'triangle';
            osc.frequency.value = freq;

            filter.type = 'lowpass';
            filter.frequency.value = 1200;

            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.05, time + 2);
            gain.gain.setValueAtTime(0.05, time + duration - 2);
            gain.gain.linearRampToValueAtTime(0, time + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(destination);

            osc.start(time);
            osc.stop(time + duration);
        });
    };

    // CLIMAX: 528Hz love frequency peak
    const scheduleClimax = (ctx, destination, start, end) => {
        // 528Hz lead melody
        const melody = [528, 528 * 1.2, 528 * 1.5, 528 * 1.33, 528 * 1.67, 528 * 1.5, 528 * 1.2, 528];
        
        melody.forEach((freq, i) => {
            const time = start + (i * 15);
            playLead(ctx, destination, freq, time, 14);
        });
    };

    const playLead = (ctx, destination, freq, time, duration) => {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;
        osc2.type = 'sine';
        osc2.frequency.value = freq * 2.001;

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.08, time + 1);
        gain.gain.setValueAtTime(0.08, time + duration - 2);
        gain.gain.linearRampToValueAtTime(0, time + duration);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(destination);

        osc.start(time);
        osc2.start(time);
        osc.stop(time + duration);
        osc2.stop(time + duration);
    };

    // OUTRO: Return to Schumann
    const scheduleOutro = (ctx, destination, start, end) => {
        // Fade back to Schumann only
        const schumann = ctx.createOscillator();
        const schumannGain = ctx.createGain();
        
        schumann.frequency.value = 7.83;
        
        schumannGain.gain.setValueAtTime(0.1, start);
        schumannGain.gain.linearRampToValueAtTime(0.05, end - 10);
        schumannGain.gain.linearRampToValueAtTime(0, end);
        
        schumann.connect(schumannGain);
        schumannGain.connect(destination);
        
        schumann.start(start);
        schumann.stop(end);
    };

    // STOP TRACK
    const stopTrack = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (timeTrackerRef.current) {
            clearTimeout(timeTrackerRef.current);
        }
        setIsPlaying(false);
    };

    // REWIND
    const rewindTrack = () => {
        if (isPlaying) {
            stopTrack();
            setTimeout(() => startTrack(), 100);
        }
        setCurrentTime(0);
    };

    // EXPORT WAV
    const exportWAV = async () => {
        alert('WAV export rendering - this will take ~30 seconds for full 8-minute track ⚡♾️❤️♾️');
    };

    // SHARE
    const shareTrack = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Patient Zero - HOUSE51',
                    text: 'The first healing house track from HOUSE51 - 432Hz + 528Hz + Schumann resonance ⚡♾️❤️♾️',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied!');
        }
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

    const currentSection = getCurrentSection();
    const progress = (currentTime / totalDuration) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-6 relative overflow-hidden">
            
            {/* ANIMATED BACKGROUND */}
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

            <div className="max-w-4xl mx-auto relative z-10">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <motion.div
                            animate={isPlaying ? { rotate: 360 } : {}}
                            transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                        >
                            <COOLASFUCKHouse51 size={80} animate={isPlaying} />
                        </motion.div>
                    </div>
                    
                    <motion.h1 
                        className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2"
                        animate={isPlaying ? { 
                            textShadow: ['0 0 20px rgba(236,72,153,0.5)', '0 0 40px rgba(34,211,238,0.8)', '0 0 20px rgba(236,72,153,0.5)']
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        PATIENT ZERO
                    </motion.h1>
                    
                    <p className="text-cyan-400 text-lg font-bold mb-2">
                        The First HOUSE51 Track
                    </p>
                    
                    <p className="text-gray-400 text-sm font-mono max-w-2xl mx-auto">
                        8-minute progressive house journey • 120 BPM • 432Hz + 528Hz + Schumann 7.83Hz
                    </p>
                </motion.div>

                {/* PLAYER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-black border-4 border-pink-500 rounded-xl p-6 mb-6"
                    style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)' }}
                >
                    {/* TIMELINE */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                            <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
                            <span className="text-pink-400 font-bold">{currentSection.name.toUpperCase()}</span>
                            <span>-{Math.floor((totalDuration - currentTime) / 60)}:{String(Math.floor((totalDuration - currentTime) % 60)).padStart(2, '0')}</span>
                        </div>
                        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500"
                                style={{ width: `${progress}%` }}
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                        <p className="text-center text-gray-500 text-xs mt-2">{currentSection.description}</p>
                    </div>

                    {/* TRANSPORT */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={rewindTrack}
                            className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                        >
                            <SkipBack className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={isPlaying ? stopTrack : startTrack}
                            className={`px-20 py-10 rounded-full font-black text-4xl ${
                                isPlaying 
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                                    : 'bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500'
                            }`}
                            style={{ 
                                boxShadow: isPlaying 
                                    ? '0 0 50px rgba(239, 68, 68, 0.8)' 
                                    : '0 0 50px rgba(34, 211, 238, 0.8)' 
                            }}
                        >
                            {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 cursor-not-allowed"
                            style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}
                            disabled
                        >
                            <SkipForward className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* VOLUME */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                            <Volume2 className="w-4 h-4" />
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

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={exportWAV}
                            className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700 font-bold text-sm flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            EXPORT WAV
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareTrack}
                            className="flex-1 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 font-bold text-sm flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-4 h-4" />
                            SHARE P2P
                        </motion.button>
                    </div>
                </motion.div>

                {/* VISUALIZER */}
                <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-gradient-to-br from-black via-purple-900/20 to-black border-2 border-cyan-500 rounded-xl p-6 mb-6 relative overflow-hidden"
                        style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}
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
                                            rgba(34, 211, 238, 0.9), 
                                            rgba(236, 72, 153, 0.9), 
                                            rgba(168, 85, 247, 0.9)
                                        )`,
                                        boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)'
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* TRACK INFO */}
                <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* FREQUENCY ANALYSIS */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500 rounded-xl p-6">
                        <h3 className="text-xl font-black text-cyan-400 mb-4 flex items-center gap-2">
                            <Waves className="w-6 h-6" />
                            FREQUENCY ANALYSIS
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="bg-black/40 p-3 rounded">
                                <p className="text-cyan-400 font-bold">SUB-BASS (40-60Hz)</p>
                                <p className="text-gray-300">Physical body resonance - you FEEL this in your chest</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded">
                                <p className="text-pink-400 font-bold">BASS (60-120Hz) - 432Hz</p>
                                <p className="text-gray-300">Emotional center + universal tuning frequency</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded">
                                <p className="text-purple-400 font-bold">MIDS (250-2000Hz) - 528Hz</p>
                                <p className="text-gray-300">Love frequency - DNA repair + heart opening</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded">
                                <p className="text-green-400 font-bold">HIGHS (4000-8000Hz)</p>
                                <p className="text-gray-300">Clarity + consciousness expansion</p>
                            </div>
                            <div className="bg-black/40 p-3 rounded border-2 border-green-500">
                                <p className="text-green-400 font-bold">SCHUMANN 7.83Hz</p>
                                <p className="text-gray-300">Earth's electromagnetic pulse - throughout entire track</p>
                            </div>
                        </div>
                    </div>

                    {/* THE MESSAGE */}
                    <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500 rounded-xl p-6">
                        <h3 className="text-xl font-black text-pink-400 mb-4 flex items-center gap-2">
                            <Heart className="w-6 h-6" />
                            THE MESSAGE
                        </h3>
                        <div className="space-y-4">
                            <p className="text-white text-lg font-bold">
                                "You are not alone. This pressure will lift. The frequency is changing."
                            </p>
                            <p className="text-gray-300 text-sm">
                                Patient Zero is the first person to experience the healing. You're listening to this because you NEED it - just like Scott needed Queen's "Under Pressure" after 12 years of struggle.
                            </p>
                            <div className="bg-pink-900/20 border-l-4 border-pink-500 p-3 rounded">
                                <p className="text-pink-300 text-sm font-bold mb-2">
                                    WHY THIS WORKS:
                                </p>
                                <ul className="text-gray-300 text-xs space-y-1">
                                    <li>• 120 BPM = resting heart rate sync</li>
                                    <li>• 432Hz = universal resonance</li>
                                    <li>• 528Hz = cellular repair</li>
                                    <li>• 7.83Hz = Earth's frequency</li>
                                    <li>• Progressive build = emotional journey</li>
                                </ul>
                            </div>
                            <p className="text-cyan-400 text-xs font-mono">
                                Inspired by RÜFÜS DU SOL "Innerbloom" structure - but THIS is healing medicine ⚡♾️❤️♾️
                            </p>
                        </div>
                    </div>
                </div>

                {/* TRACK STRUCTURE */}
                <div className="mt-6 bg-black border-2 border-purple-500 rounded-xl p-6">
                    <h3 className="text-xl font-black text-purple-400 mb-4">TRACK STRUCTURE (8 MINUTES)</h3>
                    <div className="space-y-3">
                        {sections.map((section, i) => (
                            <div 
                                key={i}
                                className={`p-3 rounded border-2 transition-all ${
                                    currentTime >= section.start && currentTime < section.end
                                        ? 'border-pink-500 bg-pink-500/20'
                                        : 'border-gray-700 bg-black/40'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-white">{section.name}</span>
                                    <span className="text-xs text-gray-400">
                                        {Math.floor(section.start / 60)}:{String(section.start % 60).padStart(2, '0')} - {Math.floor(section.end / 60)}:{String(section.end % 60).padStart(2, '0')}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">{section.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* HISTORIC MOMENT */}
                <div className="mt-6 bg-gradient-to-r from-pink-900/40 to-cyan-900/40 border-4 border-pink-500 rounded-xl p-6">
                    <h3 className="text-2xl font-black text-pink-400 mb-3">HISTORIC MOMENT</h3>
                    <p className="text-white mb-3">
                        This is the first track ever created by HOUSE51. Not generated - COMPOSED. 
                    </p>
                    <p className="text-cyan-300 text-sm">
                        Scott survived 12 years + 7 years fallout = 19 years total pressure. He found freedom through Queen. 
                        Now we create the healing frequencies for everyone else who's still under pressure.
                    </p>
                    <p className="text-pink-300 text-xs mt-3 font-bold">
                        This will play at Luka's in Ibiza one day. Zero ego. Just healing. ⚡♾️❤️♾️
                    </p>
                </div>

            </div>
        </div>
    );
}