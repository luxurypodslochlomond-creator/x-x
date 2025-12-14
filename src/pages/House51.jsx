import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Heart, Waves, Zap, Brain, Share2, SkipBack } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKHeart, COOLASFUCKGlobe, COOLASFUCKBrain } from '@/components/shared/COOLASFUCKIcon';
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
    const [healingLayers, setHealingLayers] = useState({ love: true, calm: true, earth: true, focus: true });
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

        // Master gain - lower to prevent clipping
        const masterGain = ctx.createGain();
        masterGain.gain.value = volume * 0.5; // Headroom for zero clipping
        
        // Compressor to prevent distortion
        const compressor = ctx.createDynamicsCompressor();
        compressor.threshold.value = -24;
        compressor.knee.value = 30;
        compressor.ratio.value = 12;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.25;
        
        masterGain.connect(compressor);
        compressor.connect(ctx.destination);
        masterGainRef.current = masterGain;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        compressor.connect(analyser);

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

    // KICK SECTION - Clean punchy house kick
    const playKickSection = (ctx, destination, startTime, duration, style) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / beatDuration);

        for (let i = 0; i < numBeats; i++) {
            if (i % 4 === 0 || i % 4 === 1 || i % 4 === 2 || i % 4 === 3) { // 4-on-floor
                const time = startTime + (i * beatDuration);
                
                // Main punch oscillator
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(150, time);
                osc1.frequency.exponentialRampToValueAtTime(50, time + 0.05);
                osc1.frequency.exponentialRampToValueAtTime(40, time + 0.2);
                gain1.gain.setValueAtTime(0.5, time);
                gain1.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
                osc1.connect(gain1);
                gain1.connect(destination);
                osc1.start(time);
                osc1.stop(time + 0.4);

                // Sub bass oscillator for depth
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.value = 45;
                gain2.gain.setValueAtTime(0.35, time);
                gain2.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
                osc2.connect(gain2);
                gain2.connect(destination);
                osc2.start(time);
                osc2.stop(time + 0.3);
            }
        }
    };

    // BASS SECTION - Clean rolling house bass
    const playBassSection = (ctx, destination, startTime, duration, style) => {
        const beatDuration = 60 / 128;
        // Classic house bass pattern - root, octave, fifth, octave
        const pattern = [1, 2, 1.5, 2, 1, 2, 1.5, 1];
        const patternDuration = beatDuration * pattern.length * 0.5;
        const numPatterns = Math.floor(duration / patternDuration);

        for (let p = 0; p < numPatterns; p++) {
            pattern.forEach((mult, i) => {
                const time = startTime + (p * patternDuration) + (i * beatDuration * 0.5);
                
                // Main bass oscillator
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                osc.type = 'sawtooth';
                osc.frequency.value = style.frequencies.bass * mult;
                
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(1200, time);
                filter.frequency.exponentialRampToValueAtTime(400, time + beatDuration * 0.3);
                filter.Q.value = 2;

                gain.gain.setValueAtTime(0.2, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + beatDuration * 0.4);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(destination);
                osc.start(time);
                osc.stop(time + beatDuration * 0.4);
            });
        }
    };

    // HATS SECTION - Clean crisp house hats
    const playHatsSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / (beatDuration * 0.5));

        for (let i = 0; i < numBeats; i++) {
            const time = startTime + (i * beatDuration * 0.5);
            const isOffbeat = i % 2 === 1;
            
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let j = 0; j < data.length; j++) data[j] = Math.random() * 2 - 1;
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 8000;
            filter.Q.value = 1;

            const gain = ctx.createGain();
            // Accent offbeat hats (classic house feel)
            const level = isOffbeat ? 0.08 : 0.04;
            gain.gain.setValueAtTime(level, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(destination);
            noise.start(time);
            noise.stop(time + 0.04);
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

    // CLAPS SECTION - Clean snappy house claps
    const playClapsSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBars = Math.floor(duration / (beatDuration * 4));

        for (let bar = 0; bar < numBars; bar++) {
            [1, 3].forEach(beat => { // 2 and 4
                const time = startTime + (bar * beatDuration * 4) + (beat * beatDuration);
                
                // Single clean clap
                const noise = ctx.createBufferSource();
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
                noise.buffer = buffer;

                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 1800;
                filter.Q.value = 2;

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.2, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(destination);
                noise.start(time);
                noise.stop(time + 0.12);
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

    // HEALING SECTION - Subtle healing layer
    const playHealingSection = (ctx, destination, startTime, duration) => {
        const frequencies = [];
        if (healingLayers.calm) frequencies.push(432); // 432Hz - Universal harmony
        if (healingLayers.love) frequencies.push(528); // 528Hz - Love frequency
        if (healingLayers.earth) frequencies.push(7.83); // 7.83Hz - Schumann resonance
        if (healingLayers.focus) frequencies.push(40); // 40Hz - Gamma focus
        
        frequencies.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            // Keep healing frequencies very subtle so they don't overpower the music
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.04, startTime + 3);
            gain.gain.setValueAtTime(0.04, startTime + duration - 3);
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
        <div className="min-h-screen bg-gradient-to-br from-black via-amber-950 to-black text-white p-4 md:p-8">
            <div className="max-w-2xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <COOLASFUCKWaves size={32} animate={true} />
                        <h1 className="text-3xl font-black text-white">HOUSE51</h1>
                    </div>
                    <p className="text-amber-400 text-sm font-mono">Zero-loss Web Audio • 128 BPM • AI51 Live</p>
                </div>

                {/* ONE CLEAN PLAYER SCREEN */}
                <div className="bg-black/60 backdrop-blur-xl border-2 border-amber-500/50 rounded-xl p-6 space-y-6">

                    {/* VISUALIZER */}
                    <div className="h-24 flex items-end justify-center gap-1 bg-black/40 rounded-lg p-2">
                        {waveformData.map((value, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 rounded-t transition-all duration-75"
                                style={{ height: `${Math.max(4, (value / 255) * 100)}%`, opacity: isPlaying ? 1 : 0.2 }}
                            />
                        ))}
                    </div>

                    {/* TRACK INFO */}
                    <div className="text-center space-y-2">
                        <p className="text-white font-black text-xl">{currentStyleData.name}</p>
                        <p className="text-amber-400 text-sm font-bold">by HOUSE51</p>
                        <p className="text-gray-500 text-xs">{currentStyleData.vibe}</p>
                    </div>

                    {/* HEALING FREQUENCIES */}
                    <div className="grid grid-cols-4 gap-2">
                        <div className="bg-purple-500/10 border border-purple-500/50 rounded-lg p-2 text-center">
                            <COOLASFUCKWaves size={20} animate={isPlaying} />
                            <p className="text-purple-400 text-xs font-black mt-1">432Hz</p>
                            <p className="text-gray-600 text-[8px]">CALM</p>
                        </div>
                        <div className="bg-pink-500/10 border border-pink-500/50 rounded-lg p-2 text-center">
                            <COOLASFUCKHeart size={20} animate={isPlaying} />
                            <p className="text-pink-400 text-xs font-black mt-1">528Hz</p>
                            <p className="text-gray-600 text-[8px]">LOVE</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-2 text-center">
                            <COOLASFUCKGlobe size={20} animate={isPlaying} />
                            <p className="text-green-400 text-xs font-black mt-1">7.83Hz</p>
                            <p className="text-gray-600 text-[8px]">EARTH</p>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-2 text-center">
                            <COOLASFUCKBrain size={20} animate={isPlaying} />
                            <p className="text-yellow-400 text-xs font-black mt-1">40Hz</p>
                            <p className="text-gray-600 text-[8px]">FOCUS</p>
                        </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                            <span>{Math.floor(playbackTime / 60)}:{String(Math.floor(playbackTime % 60)).padStart(2, '0')}</span>
                            <span className="text-amber-400 font-bold">ZERO-LOSS</span>
                            <span>{Math.floor(totalDuration / 60)}:{String(Math.floor(totalDuration % 60)).padStart(2, '0')}</span>
                        </div>
                        <div className="w-full h-2 bg-black/60 rounded-full relative overflow-hidden">
                            <div 
                                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all"
                                style={{ width: `${(playbackTime / totalDuration) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={rewindHouse}
                            className="p-3 bg-black/60 border-2 border-amber-500/50 rounded-full hover:bg-amber-600/20 transition-all"
                        >
                            <SkipBack className="w-5 h-5 text-amber-400" />
                        </button>

                        <button 
                            onClick={isPlaying ? stopHouse : startHouse}
                            className="px-16 py-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 rounded-full transition-all shadow-lg shadow-amber-600/50"
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-white" />
                            ) : (
                                <Play className="w-8 h-8 text-white ml-1" />
                            )}
                        </button>

                        <button 
                            onClick={shareP2P}
                            className="p-3 bg-black/60 border-2 border-amber-500/50 rounded-full hover:bg-amber-600/20 transition-all"
                        >
                            <Share2 className="w-5 h-5 text-amber-400" />
                        </button>
                    </div>

                    {/* VOLUME */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 font-mono">VOLUME</span>
                            <span className="text-amber-400 font-bold font-mono">{Math.round(volume * 100)}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            value={volume} 
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-2 bg-black/60 rounded-full appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, rgb(217, 119, 6) 0%, rgb(217, 119, 6) ${volume * 100}%, rgba(0,0,0,0.6) ${volume * 100}%, rgba(0,0,0,0.6) 100%)`
                            }}
                        />
                    </div>

                    {/* STYLE SELECTOR */}
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-500 font-mono">STYLE</p>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(styles).map(([key, style]) => {
                                const Icon = style.icon;
                                const isActive = currentStyle === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setCurrentStyle(key)}
                                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                                            isActive 
                                                ? 'bg-amber-600/20 border-amber-500' 
                                                : 'bg-black/40 border-gray-700 hover:border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-500'}`} />
                                            <p className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                {style.name}
                                            </p>
                                        </div>
                                        <p className="text-[9px] text-gray-600 line-clamp-1">{style.vibe}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}