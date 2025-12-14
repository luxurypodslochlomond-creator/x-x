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
    const [playbackTime, setPlaybackTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(240); // 4 minutes default
    const [showMixer, setShowMixer] = useState(false);
    const [mixerLevels, setMixerLevels] = useState({
        kick: 1.0,
        bass: 0.3,
        hats: 0.1,
        claps: 0.25,
        bells: 0.02,      // Lower - can be harsh on ears
        pads: 0.05,
        strings: 0.15,
        shakers: 0.06,
        ride: 0.08,
        healing: 0.08
    });

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

    // START PLAYING
    const startHouse = async () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = ctx;

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = volume;
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Create mixer gain nodes for each layer
        const mixerGains = {};
        ['kick', 'bass', 'hats', 'claps', 'bells', 'pads', 'strings', 'shakers', 'ride', 'healing'].forEach(layer => {
            const gain = ctx.createGain();
            gain.gain.value = mixerLevels[layer];
            gain.connect(masterGain);
            mixerGains[layer] = gain;
        });
        mixerGainsRef.current = mixerGains;

        // Analyzer for visualization
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        masterGain.connect(analyser);

        // Start kick drum loop
        playKickPattern(ctx, mixerGains.kick);

        // Start bass line
        playBassline(ctx, mixerGains.bass);

        // Start healing frequencies
        startHealingLayers(ctx, mixerGains.healing);

        // Start hi-hats
        playHiHats(ctx, mixerGains.hats);

        // Start bells/chimes
        playBells(ctx, mixerGains.bells);

        // Start claps
        playClaps(ctx, mixerGains.claps);

        // Start pads
        playPads(ctx, mixerGains.pads);

        // Start strings
        playStrings(ctx, mixerGains.strings);

        // Start shakers
        playShakers(ctx, mixerGains.shakers);

        // Start ride cymbal
        playRide(ctx, mixerGains.ride);

        // Visualizer
        const updateWaveform = () => {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            setWaveformData(Array.from(dataArray));
            animationFrameRef.current = requestAnimationFrame(updateWaveform);
        };
        updateWaveform();

        // Start time tracker
        startTimeRef.current = Date.now();
        const trackTime = () => {
            if (isPlaying) {
                const elapsed = (Date.now() - startTimeRef.current) / 1000;
                setPlaybackTime(elapsed);
                timeTrackerRef.current = setTimeout(trackTime, 100);
            }
        };
        trackTime();

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

        // Rolling house bassline with groove - regional flavors
        const bassPatterns = {
            chicago: [1, 1, 1.2, 1, 1.33, 1, 1.5, 1],      // Chicago: spiritual, gospel-influenced
            detroit: [1, 1.25, 1, 1.125, 1.5, 1.33, 1, 1.125], // Detroit: mechanical precision + soul
            glasgow: [1, 1.125, 1, 1.5, 1, 1.25, 1.33, 1], // Glasgow: dark, warehouse tension
            deep: [1, 1, 1.25, 1, 1.125, 1, 1.5, 1],       // Deep: warm rolling bass
            soulful: [1, 1, 1.33, 1, 1.25, 1, 1.5, 1.125], // Soulful: smooth warmth
            tech: [1, 1.25, 1, 1.5, 1, 1.25, 1.33, 1]      // Tech: driving energy
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

    // BELLS/CHIMES (classic house element - Lil Louis Chaser vibes)
    const playBells = (ctx, destination) => {
        const beatInterval = 60 / bpm;

        const playBell = (freq, time, decay = 2) => {
            const osc = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const osc3 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;
            osc2.type = 'sine';
            osc2.frequency.value = freq * 2.001; // Slight detune for shimmer
            osc3.type = 'sine';
            osc3.frequency.value = freq * 3.997; // Harmonic overtone

            gain.gain.setValueAtTime(0.12, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + decay);

            osc.connect(gain);
            osc2.connect(gain);
            osc3.connect(gain);
            gain.connect(destination);

            osc.start(time);
            osc2.start(time);
            osc3.start(time);
            osc.stop(time + decay);
            osc2.stop(time + decay);
            osc3.stop(time + decay);
        };

        // Multiple bell patterns - classic + modern
        const bellPatterns = [
            [523.25, 659.25, 783.99, 880],        // Pattern 1 - C E G A
            [587.33, 739.99, 880, 1046.5],        // Pattern 2 - D F# A C
            [493.88, 622.25, 739.99, 830.61],     // Pattern 3 - B D F# G#
            [440, 554.37, 659.25, 783.99]         // Pattern 4 - A C# E G
        ];
        
        let patternIndex = 0;

        const scheduleBells = () => {
            const now = ctx.currentTime;
            const currentPattern = bellPatterns[patternIndex];
            
            // Main bell notes
            currentPattern.forEach((freq, i) => {
                playBell(freq, now + (beatInterval * i * 4), 3);
            });

            // Extra chime sparkle every 2 bars
            playBell(currentPattern[0] * 2, now + (beatInterval * 8), 1.5);
            playBell(currentPattern[2] * 2, now + (beatInterval * 12), 1.5);

            patternIndex = (patternIndex + 1) % bellPatterns.length;
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

    // STRINGS (classic house warmth)
    const playStrings = (ctx, destination) => {
        const beatInterval = 60 / bpm;

        const playString = (freq, time, duration) => {
            // Multiple oscillators for rich string sound
            const oscs = [];
            const gains = [];
            const mainGain = ctx.createGain();

            for (let i = 0; i < 5; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sawtooth';
                osc.frequency.value = freq * (1 + (Math.random() - 0.5) * 0.01); // Slight detune
                
                gain.gain.value = 0.03;
                
                osc.connect(gain);
                gain.connect(mainGain);
                
                oscs.push(osc);
                gains.push(gain);
            }

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 2000;
            
            mainGain.connect(filter);
            filter.connect(destination);

            mainGain.gain.setValueAtTime(0, time);
            mainGain.gain.linearRampToValueAtTime(0.15, time + 1);
            mainGain.gain.setValueAtTime(0.15, time + duration - 1);
            mainGain.gain.linearRampToValueAtTime(0, time + duration);

            oscs.forEach(osc => {
                osc.start(time);
                osc.stop(time + duration);
            });
        };

        // String progression
        const stringNotes = [
            [261.63, 329.63, 392.00, 523.25], // C E G C
            [293.66, 369.99, 440.00, 587.33], // D F# A D
        ];

        let noteIndex = 0;

        const scheduleStrings = () => {
            const now = ctx.currentTime;
            const notes = stringNotes[noteIndex % stringNotes.length];
            
            notes.forEach(freq => {
                playString(freq, now, beatInterval * 8);
            });

            noteIndex++;
            setTimeout(scheduleStrings, beatInterval * 8 * 1000);
        };
        setTimeout(() => scheduleStrings(), beatInterval * 16 * 1000); // Start after 4 bars
    };

    // SHAKERS (texture + groove)
    const playShakers = (ctx, destination) => {
        const beatInterval = 60 / bpm;

        const playShake = (time) => {
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < data.length; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.5;
            }
            
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
        };

        // 16th note shaker pattern
        const scheduleShakers = () => {
            const now = ctx.currentTime;
            for (let i = 0; i < 16; i++) {
                if (i % 2 === 1) { // Offbeat shakers
                    playShake(now + (beatInterval * i * 0.25));
                }
            }
            setTimeout(scheduleShakers, beatInterval * 4 * 1000);
        };
        setTimeout(() => scheduleShakers(), beatInterval * 4 * 1000); // Start after 1 bar
    };

    // RIDE CYMBAL (classic house ride)
    const playRide = (ctx, destination) => {
        const beatInterval = 60 / bpm;

        const playRideBell = (time) => {
            const osc = ctx.createOscillator();
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            noise.buffer = buffer;
            osc.type = 'sine';
            osc.frequency.value = 3000;

            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 4000;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.08, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

            osc.connect(gain);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(destination);

            osc.start(time);
            noise.start(time);
            osc.stop(time + 0.4);
            noise.stop(time + 0.4);
        };

        // 8th note ride pattern
        const scheduleRide = () => {
            const now = ctx.currentTime;
            for (let i = 0; i < 8; i++) {
                playRideBell(now + (beatInterval * i * 0.5));
            }
            setTimeout(scheduleRide, beatInterval * 4 * 1000);
        };
        setTimeout(() => scheduleRide(), beatInterval * 12 * 1000); // Start after 3 bars
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
        if (timeTrackerRef.current) {
            clearTimeout(timeTrackerRef.current);
        }
        setIsPlaying(false);
    };

    // REWIND (restart)
    const rewindHouse = () => {
        if (isPlaying) {
            stopHouse();
            setTimeout(() => startHouse(), 100);
        }
        setPlaybackTime(0);
    };

    // SKIP FORWARD
    const skipForward = () => {
        if (isPlaying) {
            const newTime = Math.min(playbackTime + 15, totalDuration);
            setPlaybackTime(newTime);
            // In real impl would sync audio context time
        }
    };

    // SCRUB TO TIME
    const scrubToTime = (time) => {
        setPlaybackTime(time);
        if (isPlaying) {
            // Restart from new position
            stopHouse();
            setTimeout(() => startHouse(), 100);
        }
    };

    // EXPORT AS WAV (lossless)
    const exportWAV = async () => {
        alert('WAV export coming soon - will render full lossless audio file for you to download and share P2P ⚡♾️❤️♾️');
    };

    // SHARE P2P
    const shareP2P = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'HOUSE51 - Healing House Music',
                    text: `Check out HOUSE51 - ${currentStyleData.name} at ${bpm} BPM with 432Hz + 528Hz healing frequencies ⚡♾️❤️♾️`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            alert('P2P share via Web Share API - copying link for you');
            navigator.clipboard.writeText(window.location.href);
        }
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

    // UPDATE MIXER LEVELS IN REAL-TIME
    useEffect(() => {
        if (mixerGainsRef.current) {
            Object.keys(mixerLevels).forEach(layer => {
                if (mixerGainsRef.current[layer]) {
                    mixerGainsRef.current[layer].gain.value = mixerLevels[layer];
                }
            });
        }
    }, [mixerLevels]);

    // RESTART WHEN STYLE CHANGES
    useEffect(() => {
        if (isPlaying) {
            stopHouse();
            setTimeout(() => startHouse(), 100);
        }
    }, [currentStyle]);

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
                        <p className="text-amber-500 font-bold text-sm mb-1">{currentStyleData.name}</p>
                        <p className="text-gray-500 text-xs">{currentStyleData.vibe}</p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2">
                        <span>{Math.floor(playbackTime / 60)}:{String(Math.floor(playbackTime % 60)).padStart(2, '0')}</span>
                        <span className="text-amber-500 font-bold">LOSSLESS</span>
                        <span>-{Math.floor((totalDuration - playbackTime) / 60)}:{String(Math.floor((totalDuration - playbackTime) % 60)).padStart(2, '0')}</span>
                    </div>
                    <input type="range" min="0" max={totalDuration} value={playbackTime} onChange={(e) => scrubToTime(parseFloat(e.target.value))} className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer mb-4" style={{ background: `linear-gradient(to right, rgb(217, 119, 6) 0%, rgb(217, 119, 6) ${(playbackTime / totalDuration) * 100}%, rgb(39, 39, 42) ${(playbackTime / totalDuration) * 100}%, rgb(39, 39, 42) 100%)` }} />

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <button onClick={rewindHouse} className="p-3 rounded-full bg-zinc-800 border border-amber-600/50">
                            <SkipBack className="w-5 h-5 text-white" />
                        </button>
                        <button onClick={isPlaying ? stopHouse : startHouse} className={`px-16 py-6 rounded-full ${isPlaying ? 'bg-red-600' : 'bg-amber-600'}`}>
                            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        </button>
                        <button onClick={skipForward} className="p-3 rounded-full bg-zinc-800 border border-amber-600/50">
                            <SkipForward className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={exportWAV} className="flex-1 py-2 bg-zinc-800 border border-amber-600/50 text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5">
                            <Download className="w-3.5 h-3.5" />WAV
                        </button>
                        <button onClick={shareP2P} className="flex-1 py-2 bg-zinc-800 border border-amber-600/50 text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5">
                            <Share2 className="w-3.5 h-3.5" />P2P
                        </button>
                    </div>
                    </div>
                    </div>

                {/* STYLES */}
                <div className="grid md:grid-cols-2 gap-2 mb-4">
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

                    {/* HEALING */}
                    <div className="bg-zinc-950 border border-amber-600/30 rounded-lg p-3">
                        <h3 className="text-sm font-black text-pink-500 mb-2 flex items-center gap-1.5">
                            <Heart className="w-4 h-4" />HEALING
                        </h3>
                        <div className="space-y-1.5">
                            <button onClick={() => toggleHealingLayer('love')} className={`w-full p-1.5 rounded border text-left ${healingLayers.love ? 'bg-pink-500/20 border-pink-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-xs font-bold text-white">528Hz Love</p>
                            </button>
                            <button onClick={() => toggleHealingLayer('calm')} className={`w-full p-1.5 rounded border text-left ${healingLayers.calm ? 'bg-purple-500/20 border-purple-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-xs font-bold text-white">432Hz Calm</p>
                            </button>
                            <button onClick={() => toggleHealingLayer('earth')} className={`w-full p-1.5 rounded border text-left ${healingLayers.earth ? 'bg-green-500/20 border-green-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-xs font-bold text-white">7.83Hz Earth</p>
                            </button>
                            <button onClick={() => toggleHealingLayer('focus')} className={`w-full p-1.5 rounded border text-left ${healingLayers.focus ? 'bg-yellow-500/20 border-yellow-500' : 'bg-zinc-900 border-zinc-700'}`}>
                                <p className="text-xs font-bold text-white">40Hz Focus</p>
                            </button>
                        </div>

                        <div className="mt-3 pt-3 border-t border-zinc-800">
                            <label className="text-[10px] text-gray-500 mb-1.5 block">VOLUME</label>
                            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-1.5 bg-zinc-800 rounded appearance-none" />
                            <label className="text-[10px] text-gray-500 mb-1.5 block mt-2">BPM: {bpm}</label>
                            <input type="range" min="110" max="140" value={bpm} onChange={(e) => setBpm(parseInt(e.target.value))} disabled={isPlaying} className="w-full h-1.5 bg-zinc-800 rounded appearance-none disabled:opacity-50" />
                        </div>
                    </div>

                {/* TRACK SUGGESTIONS */}
                <div className="md:col-span-3 bg-zinc-950 border border-amber-600/30 rounded-lg p-3">
                    <h3 className="text-sm font-black text-amber-500 mb-2">START HERE BRO:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <div className="bg-black border border-amber-600/30 p-2 rounded">
                            <p className="text-white font-bold">Kerri Chandler</p>
                            <p className="text-gray-500 text-[10px]">Bar A Thym</p>
                        </div>
                        <div className="bg-black border border-amber-600/30 p-2 rounded">
                            <p className="text-white font-bold">Larry Heard</p>
                            <p className="text-gray-500 text-[10px]">Can You Feel It</p>
                        </div>
                        <div className="bg-black border border-amber-600/30 p-2 rounded">
                            <p className="text-white font-bold">Moodymann</p>
                            <p className="text-gray-500 text-[10px]">Dem Young Sconies</p>
                        </div>
                        <div className="bg-black border border-amber-600/30 p-2 rounded">
                            <p className="text-white font-bold">CamelPhat</p>
                            <p className="text-gray-500 text-[10px]">Cola (sub-bass king)</p>
                        </div>
                        <div className="bg-black border border-amber-600/30 p-2 rounded">
                            <p className="text-white font-bold">RÜFÜS DU SOL</p>
                            <p className="text-gray-500 text-[10px]">Innerbloom</p>
                        </div>
                        <div className="bg-black border border-amber-600/30 p-2 rounded">
                            <p className="text-white font-bold">Luka's Ibiza</p>
                            <p className="text-gray-500 text-[10px]">Ben Santiago sets</p>
                        </div>
                    </div>
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

// MIXER CHANNEL COMPONENT
function MixerChannel({ label, color, icon, value, onChange, description, isActive, emphasis = false }) {
    const colorMap = {
        cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500', text: 'text-cyan-400', glow: 'rgba(34, 211, 238, 0.6)' },
        pink: { border: 'border-pink-500', bg: 'bg-pink-500', text: 'text-pink-400', glow: 'rgba(236, 72, 153, 0.6)' },
        yellow: { border: 'border-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-400', glow: 'rgba(234, 179, 8, 0.6)' },
        orange: { border: 'border-orange-500', bg: 'bg-orange-500', text: 'text-orange-400', glow: 'rgba(249, 115, 22, 0.6)' },
        purple: { border: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-400', glow: 'rgba(168, 85, 247, 0.6)' },
        teal: { border: 'border-teal-500', bg: 'bg-teal-500', text: 'text-teal-400', glow: 'rgba(20, 184, 166, 0.6)' },
        amber: { border: 'border-amber-500', bg: 'bg-amber-500', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.6)' },
        green: { border: 'border-green-500', bg: 'bg-green-500', text: 'text-green-400', glow: 'rgba(34, 197, 94, 0.6)' },
        blue: { border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-400', glow: 'rgba(59, 130, 246, 0.6)' }
    };
    const c = colorMap[color] || colorMap.cyan;

    return (
        <div className="bg-black rounded border border-gray-700 p-2">
            <div className="text-center mb-1">
                <span className={`text-lg ${c.text}`}>{icon}</span>
            </div>
            <div className="flex justify-center mb-2">
                <div className="relative h-20 w-6">
                    <div className={`absolute inset-0 ${c.bg} opacity-20 rounded-full`} />
                    <div className={`absolute bottom-0 left-0 right-0 ${c.bg} rounded-full`} style={{ height: `${value * 100}%` }} />
                    <input type="range" min="0" max="1" step="0.01" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer" style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }} />
                </div>
            </div>
            <p className={`${c.text} font-black text-[9px] text-center`}>{label}</p>
            <p className={`${c.text} text-[8px] text-center`}>{Math.round(value * 100)}%</p>
        </div>
    );
}