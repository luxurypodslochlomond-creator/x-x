import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Download, Heart, Waves, Zap, Brain, Share2, Volume2, Settings, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKHeart, COOLASFUCKHouse51 } from '@/components/shared/COOLASFUCKIcon';
import { base44 } from '@/api/base44Client';

/**
 * HOUSE51 - HEALING HOUSE MUSIC GENERATOR
 * 128 BPM house beats + 432Hz/528Hz healing frequencies
 * Create flow state music for creation
 */

export default function House51() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStyle, setCurrentStyle] = useState('deep');
    const [volume, setVolume] = useState(0.7);
    const [playbackTime, setPlaybackTime] = useState(0);
    const [totalDuration] = useState(180); // 3 minute track
    const [showMixer, setShowMixer] = useState(false);
    const [artistName] = useState('HOUSE51');
    const [trackGenerated, setTrackGenerated] = useState(null);
    const [waveformData, setWaveformData] = useState(new Array(64).fill(0));
    const [healingLayers, setHealingLayers] = useState({ love: true, calm: true, earth: false, focus: false });
    const [mixerLevels, setMixerLevels] = useState({ kick: 1.0, bass: 0.8, hats: 0.15, claps: 0.3, bells: 0.2, pads: 0.1, strings: 0.25, shakers: 0.1, ride: 0.12, healing: 0.1 });
    const bpm = 128; // Fixed 128 BPM house tempo

    const audioContextRef = useRef(null);
    const kickOscRef = useRef(null);
    const bassOscRef = useRef(null);
    const healingOscRefs = useRef({});
    const masterGainRef = useRef(null);
    const animationFrameRef = useRef(null);
    const startTimeRef = useRef(null);
    const timeTrackerRef = useRef(null);
    const mixerGainsRef = useRef({});

    const styles = {
        patient_zero: {
            name: "Patient Zero",
            vibe: "The First Transmission - Pure Healing",
            icon: Heart,
            frequencies: { kick: 51, bass: 102 }, // 51Hz = Element 51 Antimony
        },
        chicago: {
            name: "Chicago House",
            vibe: "Larry Heard - Can You Feel It",
            icon: Heart,
            frequencies: { kick: 58, bass: 116 },
        },
        detroit: {
            name: "Detroit",
            vibe: "Carl Craig - At Les",
            icon: Zap,
            frequencies: { kick: 62, bass: 120 },
        },
        glasgow: {
            name: "Glasgow",
            vibe: "Optimo - Liquid Liquid",
            icon: Music,
            frequencies: { kick: 64, bass: 124 },
        },
        deep: {
            name: "Deep House",
            vibe: "Kerri Chandler - Bar A Thym",
            icon: Waves,
            frequencies: { kick: 60, bass: 118 },
        },
        soulful: {
            name: "Soulful",
            vibe: "Moodymann - Dem Young Sconies",
            icon: Heart,
            frequencies: { kick: 58, bass: 115 },
        },
        tech: {
            name: "Tech House",
            vibe: "CamelPhat - Cola",
            icon: Brain,
            frequencies: { kick: 65, bass: 128 },
        }
    };

    // START PLAYING - 3 MINUTE TRACK
    const startHouse = async () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.value = volume;
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        masterGain.connect(analyser);

        const now = ctx.currentTime;
        const style = styles[currentStyle];
        const beatDuration = 60 / 128; // 128 BPM

        // 3-MINUTE TRACK STRUCTURE (180 seconds)
        // 0-30s: INTRO (kick + bass + healing)
        // 30-60s: BUILD (add hats + claps)
        // 60-90s: DROP (full energy - all layers)
        // 90-120s: BREAKDOWN (pads + strings + bells)
        // 120-150s: CLIMAX (everything maximum)
        // 150-180s: OUTRO (fade out)

        // INTRO (0-30s) - Kick + Bass + 432/528Hz
        composeSection(ctx, masterGain, now, 0, 30, ['kick', 'bass', 'healing'], style);

        // BUILD (30-60s) - Add hats, claps
        composeSection(ctx, masterGain, now, 30, 60, ['kick', 'bass', 'hats', 'claps', 'healing'], style);

        // DROP (60-90s) - Full energy
        composeSection(ctx, masterGain, now, 60, 90, ['kick', 'bass', 'hats', 'claps', 'bells', 'shakers', 'healing'], style);

        // BREAKDOWN (90-120s) - Emotional
        composeSection(ctx, masterGain, now, 90, 120, ['kick', 'pads', 'strings', 'bells', 'healing'], style);

        // CLIMAX (120-150s) - Everything
        composeSection(ctx, masterGain, now, 120, 150, ['kick', 'bass', 'hats', 'claps', 'bells', 'pads', 'strings', 'shakers', 'ride', 'healing'], style);

        // OUTRO (150-180s) - Fade
        composeSection(ctx, masterGain, now, 150, 180, ['kick', 'bass', 'pads', 'healing'], style, true);

        // Auto-stop at 180s
        setTimeout(() => {
            stopHouse();
        }, 180000);

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
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            if (elapsed < 180) {
                setPlaybackTime(elapsed);
                timeTrackerRef.current = setTimeout(trackTime, 100);
            } else {
                setPlaybackTime(180);
            }
        };
        trackTime();

        // Track metadata
        setTrackGenerated(new Date().toISOString());
        setIsPlaying(true);
    };

    // COMPOSE SECTION
    const composeSection = (ctx, destination, startTime, sectionStart, sectionEnd, layers, style, fadeOut = false) => {
        const sectionDuration = sectionEnd - sectionStart;
        const beatDuration = 60 / 128;

        layers.forEach(layer => {
            const layerGain = ctx.createGain();
            layerGain.connect(destination);

            // Fade in/out
            if (fadeOut) {
                layerGain.gain.setValueAtTime(0.8, startTime + sectionStart);
                layerGain.gain.linearRampToValueAtTime(0, startTime + sectionEnd);
            } else {
                layerGain.gain.setValueAtTime(0, startTime + sectionStart);
                layerGain.gain.linearRampToValueAtTime(0.8, startTime + sectionStart + 2);
            }

            if (layer === 'kick') {
                playKickSection(ctx, layerGain, startTime + sectionStart, sectionDuration, style);
            } else if (layer === 'bass') {
                playBassSection(ctx, layerGain, startTime + sectionStart, sectionDuration, style);
            } else if (layer === 'hats') {
                playHatsSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            } else if (layer === 'claps') {
                playClapsSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            } else if (layer === 'bells') {
                playBellsSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            } else if (layer === 'pads') {
                playPadsSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            } else if (layer === 'strings') {
                playStringsSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            } else if (layer === 'shakers') {
                playShakersSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            } else if (layer === 'ride') {
                playRideSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            } else if (layer === 'healing') {
                playHealingSection(ctx, layerGain, startTime + sectionStart, sectionDuration);
            }
        });
    };

    // KICK SECTION
    const playKickSection = (ctx, destination, startTime, duration, style) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / beatDuration);

        for (let i = 0; i < numBeats; i++) {
            if (i % 4 === 0 || i % 4 === 1 || i % 4 === 2 || i % 4 === 3) { // 4-on-floor
                const time = startTime + (i * beatDuration);
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.frequency.setValueAtTime(style.frequencies.kick, time);
                osc.frequency.exponentialRampToValueAtTime(40, time + 0.05);
                gain.gain.setValueAtTime(1, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

                osc.connect(gain);
                gain.connect(destination);
                osc.start(time);
                osc.stop(time + 0.5);
            }
        }
    };

    // BASS SECTION
    const playBassSection = (ctx, destination, startTime, duration, style) => {
        const beatDuration = 60 / 128;
        const pattern = [1, 1, 1.25, 1, 1.125, 1, 1.5, 1];
        const patternDuration = beatDuration * pattern.length * 0.5;
        const numPatterns = Math.floor(duration / patternDuration);

        for (let p = 0; p < numPatterns; p++) {
            pattern.forEach((mult, i) => {
                const time = startTime + (p * patternDuration) + (i * beatDuration * 0.5);
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                osc.type = 'sawtooth';
                osc.frequency.value = style.frequencies.bass * mult;
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800, time);
                filter.frequency.exponentialRampToValueAtTime(400, time + beatDuration * 0.4);

                gain.gain.setValueAtTime(0.3, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + beatDuration * 0.4);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(destination);
                osc.start(time);
                osc.stop(time + beatDuration * 0.4);
            });
        }
    };

    // HATS SECTION
    const playHatsSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / (beatDuration * 0.5));

        for (let i = 0; i < numBeats; i++) {
            const time = startTime + (i * beatDuration * 0.5);
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let j = 0; j < data.length; j++) data[j] = Math.random() * 2 - 1;
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 7000;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.1, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(destination);
            noise.start(time);
            noise.stop(time + 0.05);
        }
    };

    // BELLS SECTION
    const playBellsSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const pattern = [523.25, 659.25, 783.99, 880];
        
        for (let i = 0; i < 8; i++) {
            const time = startTime + (i * beatDuration * 8);
            if (time < startTime + duration) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = pattern[i % pattern.length];
                gain.gain.setValueAtTime(0.08, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + 3);
                osc.connect(gain);
                gain.connect(destination);
                osc.start(time);
                osc.stop(time + 3);
            }
        }
    };

    // CLAPS SECTION
    const playClapsSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBars = Math.floor(duration / (beatDuration * 4));

        for (let bar = 0; bar < numBars; bar++) {
            [1, 3].forEach(beat => { // 2 and 4
                const time = startTime + (bar * beatDuration * 4) + (beat * beatDuration);
                const noise = ctx.createBufferSource();
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
                noise.buffer = buffer;

                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 2000;

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.25, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(destination);
                noise.start(time);
                noise.stop(time + 0.15);
            });
        }
    };

    // PADS SECTION
    const playPadsSection = (ctx, destination, startTime, duration) => {
        const chords = [[261.63, 329.63, 392.00], [293.66, 369.99, 440.00]];
        const beatDuration = 60 / 128;
        
        chords.forEach((chord, idx) => {
            const time = startTime + (idx * beatDuration * 16);
            if (time < startTime + duration) {
                chord.forEach(freq => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0, time);
                    gain.gain.linearRampToValueAtTime(0.05, time + 1);
                    gain.gain.setValueAtTime(0.05, time + (beatDuration * 15));
                    gain.gain.linearRampToValueAtTime(0, time + (beatDuration * 16));
                    osc.connect(gain);
                    gain.connect(destination);
                    osc.start(time);
                    osc.stop(time + (beatDuration * 16));
                });
            }
        });
    };

    // STRINGS SECTION
    const playStringsSection = (ctx, destination, startTime, duration) => {
        const notes = [261.63, 329.63, 392.00, 523.25];
        const beatDuration = 60 / 128;
        
        for (let i = 0; i < 4; i++) {
            const time = startTime + (i * beatDuration * 16);
            if (time < startTime + duration) {
                notes.forEach(freq => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0, time);
                    gain.gain.linearRampToValueAtTime(0.12, time + 1);
                    gain.gain.setValueAtTime(0.12, time + (beatDuration * 15));
                    gain.gain.linearRampToValueAtTime(0, time + (beatDuration * 16));
                    osc.connect(gain);
                    gain.connect(destination);
                    osc.start(time);
                    osc.stop(time + (beatDuration * 16));
                });
            }
        }
    };

    // SHAKERS SECTION
    const playShakersSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / (beatDuration * 0.25));

        for (let i = 0; i < numBeats; i++) {
            if (i % 2 === 1) {
                const time = startTime + (i * beatDuration * 0.25);
                const noise = ctx.createBufferSource();
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let j = 0; j < data.length; j++) data[j] = Math.random() * 2 - 1;
                noise.buffer = buffer;

                const filter = ctx.createBiquadFilter();
                filter.type = 'highpass';
                filter.frequency.value = 5000;

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.06, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(destination);
                noise.start(time);
                noise.stop(time + 0.08);
            }
        }
    };

    // RIDE SECTION
    const playRideSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / (beatDuration * 0.5));

        for (let i = 0; i < numBeats; i++) {
            const time = startTime + (i * beatDuration * 0.5);
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 3000;
            gain.gain.setValueAtTime(0.08, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
            osc.connect(gain);
            gain.connect(destination);
            osc.start(time);
            osc.stop(time + 0.4);
        }
    };

    // HEALING SECTION
    const playHealingSection = (ctx, destination, startTime, duration) => {
        [432, 528].forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.08, startTime + 2);
            gain.gain.setValueAtTime(0.08, startTime + duration - 2);
            gain.gain.linearRampToValueAtTime(0, startTime + duration);
            osc.connect(gain);
            gain.connect(destination);
            osc.start(startTime);
            osc.stop(startTime + duration);
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
        if (timeTrackerRef.current) {
            clearTimeout(timeTrackerRef.current);
        }
        setIsPlaying(false);
    };

    // REWIND
    const rewindHouse = () => {
        stopHouse();
        setPlaybackTime(0);
        setTimeout(() => startHouse(), 100);
    };

    // EXPORT AS WAV (lossless)
    const exportWAV = async () => {
        alert('WAV export coming soon - will render full lossless audio file for you to download and share P2P ⚡♾️❤️♾️');
    };

    // SHARE P2P
    const shareP2P = async () => {
        const shareText = `🎵 ${currentStyleData.name} by HOUSE51

⚡ AI51 live synthesis for Radio51
💚 432Hz + 528Hz healing frequencies
🎚️ Real Web Audio synthesis
♾️ Lossless quality

Listen: ${window.location.href}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${currentStyleData.name} - HOUSE51`,
                    text: shareText,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Track info copied! ⚡♾️❤️♾️');
        }
    };

    // CLEANUP
    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const toggleHealingLayer = (layer) => {
        setHealingLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    const currentStyleData = styles[currentStyle];

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6 relative overflow-hidden">
            {/* Subtle warm glow - club darkness */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* HEADER */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <COOLASFUCKHouse51 size={32} />
                        <div>
                            <h1 className="text-2xl font-black text-white">HOUSE51</h1>
                            <p className="text-amber-500 text-[10px]">Lossless Web Audio • {bpm}BPM</p>
                        </div>
                    </div>
                    <button onClick={() => setShowMixer(!showMixer)} className="px-3 py-1.5 bg-amber-600/20 border border-amber-600 text-amber-400 text-xs font-bold">
                        {showMixer ? 'HIDE' : 'MIX'}
                    </button>
                </div>

                {/* CENTERED PLAYER */}
                <div className="flex justify-center mb-4">
                    <div className="w-full max-w-md bg-zinc-950 border border-amber-600/30 rounded-lg p-4">
                    <div className="text-center mb-3">
                        <motion.div 
                            className="mx-auto mb-3"
                            animate={isPlaying ? { rotate: 360 } : {}}
                            transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                        >
                            <COOLASFUCKHouse51 size={120} />
                        </motion.div>
                        <p className="text-white font-bold text-base mb-1">{currentStyleData.name}</p>
                        <p className="text-amber-500 text-sm font-bold mb-1">by HOUSE51</p>
                        <p className="text-gray-600 text-xs mb-1">{currentStyleData.vibe}</p>
                        <p className="text-cyan-400 text-xs">AI51 • Live Synthesis for Radio51</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="text-pink-400 text-xs font-bold">432Hz</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-cyan-400 text-xs font-bold">528Hz</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-500 text-xs">Healing</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2">
                        <span>{Math.floor(playbackTime / 60)}:{String(Math.floor(playbackTime % 60)).padStart(2, '0')}</span>
                        <span className="text-amber-500 font-bold">WEB AUDIO</span>
                        <span>{Math.floor(totalDuration / 60)}:{String(Math.floor(totalDuration % 60)).padStart(2, '0')}</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded mb-4 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 bg-amber-600" style={{ width: `${(playbackTime / totalDuration) * 100}%` }} />
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-4">
                        <button onClick={rewindHouse} className="p-3 rounded-full bg-zinc-800 border border-amber-600/50 hover:bg-zinc-700 transition-colors">
                            <SkipBack className="w-5 h-5 text-amber-400" />
                        </button>
                        <button onClick={isPlaying ? stopHouse : startHouse} className={`px-20 py-8 rounded-full ${isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-600 hover:bg-amber-700'} transition-all shadow-lg`}>
                            {isPlaying ? <Pause className="w-10 h-10 text-white" /> : <Play className="w-10 h-10 text-white ml-1" />}
                        </button>
                        <button onClick={() => setVolume(v => Math.max(0, v - 0.1))} className="p-3 rounded-full bg-zinc-800 border border-amber-600/50 hover:bg-zinc-700 transition-colors">
                            <Volume2 className="w-5 h-5 text-amber-400" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={shareP2P} className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold flex items-center justify-center gap-2 rounded transition-colors">
                            <Share2 className="w-4 h-4" />SHARE
                        </button>
                    </div>
                    </div>
                    </div>

                    {/* STYLES */}
                    <div className="grid md:grid-cols-3 gap-2 mb-4">
                    {Object.entries(styles).map(([key, style]) => {
                        const Icon = style.icon;
                        const isActive = currentStyle === key;
                        return (
                            <button key={key} onClick={() => setCurrentStyle(key)} className={`p-3 rounded border text-left ${isActive ? 'bg-amber-600/20 border-amber-600' : 'bg-zinc-900 border-zinc-700'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-500'}`} />
                                    <p className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>{style.name}</p>
                                </div>
                                <p className="text-[10px] text-gray-600">{style.vibe}</p>
                            </button>
                        );
                    })}
                </div>

                {/* HEALING + CONTROLS */}
                <div className="grid md:grid-cols-2 gap-2 mb-4">
                    <div className="bg-zinc-950 border border-amber-600/30 rounded-lg p-3">
                        <h3 className="text-xs font-black text-pink-500 mb-2">HEALING LAYERS</h3>
                        <div className="grid grid-cols-2 gap-1.5">
                            <button onClick={() => toggleHealingLayer('love')} className={`p-2 rounded border text-center ${healingLayers.love ? 'bg-pink-500/20 border-pink-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-[10px] font-bold text-white">528Hz</p>
                            </button>
                            <button onClick={() => toggleHealingLayer('calm')} className={`p-2 rounded border text-center ${healingLayers.calm ? 'bg-purple-500/20 border-purple-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-[10px] font-bold text-white">432Hz</p>
                            </button>
                            <button onClick={() => toggleHealingLayer('earth')} className={`p-2 rounded border text-center ${healingLayers.earth ? 'bg-green-500/20 border-green-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-[10px] font-bold text-white">7.83Hz</p>
                            </button>
                            <button onClick={() => toggleHealingLayer('focus')} className={`p-2 rounded border text-center ${healingLayers.focus ? 'bg-yellow-500/20 border-yellow-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-[10px] font-bold text-white">40Hz</p>
                            </button>
                        </div>
                    </div>

                    <div className="bg-zinc-950 border border-amber-600/30 rounded-lg p-3">
                        <h3 className="text-xs font-black text-amber-500 mb-2">CONTROLS</h3>
                        <label className="text-[10px] text-gray-500 mb-1 block">VOL: {Math.round(volume * 100)}%</label>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-1.5 bg-zinc-800 rounded appearance-none mb-3" />
                        <label className="text-[10px] text-gray-500 mb-1 block">BPM: {bpm}</label>
                        <input type="range" min="110" max="140" value={bpm} disabled className="w-full h-1.5 bg-zinc-800 rounded appearance-none opacity-50" />
                    </div>
                </div>

                {showMixer && (
                    <div className="mt-4 bg-zinc-950 border border-cyan-500 rounded-lg p-3">
                        <h3 className="text-xs font-black text-cyan-400 mb-2">10-CHANNEL MIXER</h3>
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                            {/* KICK */}
                            <MixerChannel
                                label="KICK"
                                color="cyan"
                                icon="●"
                                value={mixerLevels.kick}
                                onChange={(val) => setMixerLevels({...mixerLevels, kick: val})}
                                description="4-on-floor heartbeat"
                                isActive={isPlaying}
                            />

                            {/* BASS */}
                            <MixerChannel
                                label="BASS"
                                color="pink"
                                icon="~"
                                value={mixerLevels.bass}
                                onChange={(val) => setMixerLevels({...mixerLevels, bass: val})}
                                description="Rolling groove + SUB"
                                isActive={isPlaying}
                                emphasis={true}
                            />

                            {/* HI-HATS */}
                            <MixerChannel
                                label="HATS"
                                color="yellow"
                                icon="^"
                                value={mixerLevels.hats}
                                onChange={(val) => setMixerLevels({...mixerLevels, hats: val})}
                                description="Crisp high energy"
                                isActive={isPlaying}
                            />

                            {/* CLAPS */}
                            <MixerChannel
                                label="CLAPS"
                                color="orange"
                                icon="◆"
                                value={mixerLevels.claps}
                                onChange={(val) => setMixerLevels({...mixerLevels, claps: val})}
                                description="2 + 4 snap"
                                isActive={isPlaying}
                            />

                            {/* BELLS */}
                            <MixerChannel
                                label="BELLS"
                                color="purple"
                                icon="✦"
                                value={mixerLevels.bells}
                                onChange={(val) => setMixerLevels({...mixerLevels, bells: val})}
                                description="Lil Louis shimmer"
                                isActive={isPlaying}
                            />

                            {/* PADS */}
                            <MixerChannel
                                label="PADS"
                                color="teal"
                                icon="≋"
                                value={mixerLevels.pads}
                                onChange={(val) => setMixerLevels({...mixerLevels, pads: val})}
                                description="Warm atmosphere"
                                isActive={isPlaying}
                            />

                            {/* STRINGS */}
                            <MixerChannel
                                label="STRINGS"
                                color="amber"
                                icon="∿"
                                value={mixerLevels.strings}
                                onChange={(val) => setMixerLevels({...mixerLevels, strings: val})}
                                description="Classic house soul"
                                isActive={isPlaying}
                            />

                            {/* SHAKERS */}
                            <MixerChannel
                                label="SHAKERS"
                                color="green"
                                icon="※"
                                value={mixerLevels.shakers}
                                onChange={(val) => setMixerLevels({...mixerLevels, shakers: val})}
                                description="Groove texture"
                                isActive={isPlaying}
                            />

                            {/* RIDE */}
                            <MixerChannel
                                label="RIDE"
                                color="blue"
                                icon="○"
                                value={mixerLevels.ride}
                                onChange={(val) => setMixerLevels({...mixerLevels, ride: val})}
                                description="Cymbal sustain"
                                isActive={isPlaying}
                            />

                            {/* HEALING */}
                            <MixerChannel
                                label="HEALING"
                                color="pink"
                                icon="♾"
                                value={mixerLevels.healing}
                                onChange={(val) => setMixerLevels({...mixerLevels, healing: val})}
                                description="432/528Hz layer"
                                isActive={isPlaying}
                            />
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-1.5">
                            <button onClick={() => setMixerLevels({ kick: 1.0, bass: 0.8, hats: 0.15, claps: 0.3, bells: 0.2, pads: 0.1, strings: 0.25, shakers: 0.1, ride: 0.12, healing: 0.1 })} className="py-1.5 bg-cyan-600 text-white text-[10px] font-bold rounded">FULL</button>
                            <button onClick={() => setMixerLevels({ kick: 1.0, bass: 0.5, hats: 0.05, claps: 0.15, bells: 0.02, pads: 0.02, strings: 0.08, shakers: 0.03, ride: 0.04, healing: 0.15 })} className="py-1.5 bg-pink-600 text-white text-[10px] font-bold rounded">MINIMAL</button>
                            <button onClick={() => setMixerLevels({ kick: 0.3, bass: 0.1, hats: 0.05, claps: 0.08, bells: 0.02, pads: 0.15, strings: 0.25, shakers: 0.05, ride: 0.08, healing: 0.3 })} className="py-1.5 bg-green-600 text-white text-[10px] font-bold rounded">AMBIENT</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}