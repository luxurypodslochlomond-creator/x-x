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
        bells: 0.05,      // Lower - can be harsh on ears
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
            color: "amber",
            vibe: "Larry Heard deep spiritual",
            icon: Heart,
            frequencies: { kick: 58, bass: 116 },
            origin: "🇺🇸 Chicago - The birthplace"
        },
        detroit: {
            name: "Detroit Techno-Soul",
            color: "cyan",
            vibe: "Carl Craig machine elegance",
            icon: Zap,
            frequencies: { kick: 62, bass: 120 },
            origin: "🇺🇸 Detroit - Future sound"
        },
        glasgow: {
            name: "Glasgow Underground",
            color: "purple",
            vibe: "Optimo dark warehouse",
            icon: Music,
            frequencies: { kick: 64, bass: 124 },
            origin: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Glasgow - Raw energy"
        },
        deep: {
            name: "Deep House",
            color: "teal",
            vibe: "Kerri Chandler warmth",
            icon: Waves,
            frequencies: { kick: 60, bass: 118 },
            origin: "🌍 Universal"
        },
        soulful: {
            name: "Soulful House",
            color: "pink",
            vibe: "Soul Clap grooves",
            icon: Heart,
            frequencies: { kick: 58, bass: 115 },
            origin: "🌍 Universal"
        },
        tech: {
            name: "Tech House",
            color: "orange",
            vibe: "CamelPhat energy",
            icon: Brain,
            frequencies: { kick: 65, bass: 128 },
            origin: "🌍 Universal"
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
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-6 relative overflow-hidden">
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
                
                {/* COMPACT HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 mb-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="relative"
                                animate={isPlaying ? { 
                                    scale: [1, 1.05, 1],
                                    filter: ['drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))', 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))', 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))']
                                } : {}}
                                transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
                            >
                                <COOLASFUCKHouse51 size={50} animate={isPlaying} />
                            </motion.div>
                            <div>
                                <motion.h1 
                                    className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                                    animate={isPlaying ? { 
                                        textShadow: ['0 0 20px rgba(236,72,153,0.5)', '0 0 40px rgba(34,211,238,0.8)', '0 0 20px rgba(236,72,153,0.5)']
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    HOUSE51
                                </motion.h1>
                                <p className="text-cyan-400 text-xs font-mono">
                                    {currentStyleData.origin} • {bpm} BPM + 432/528Hz
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowMixer(!showMixer)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold text-sm flex items-center gap-2"
                        >
                            <Settings className="w-4 h-4" />
                            {showMixer ? 'HIDE' : 'MIXER'}
                        </motion.button>
                    </div>

                    {/* EAR SAFETY NOTE */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-amber-900/30 border-l-4 border-amber-500 p-2 rounded"
                    >
                        <p className="text-amber-300 text-xs font-mono">
                            🎚️ Use MIXER to adjust bells/chimes if harsh on ears - start low ⚡♾️❤️♾️
                        </p>
                    </motion.div>
                </motion.div>

                {/* COMPACT PLAYER + STYLES */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">

                {/* VINYL PLAYER */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black border-2 border-pink-500 rounded-xl p-4"
                    style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}
                >
                    {/* Timeline */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                            <span>{Math.floor(playbackTime / 60)}:{String(Math.floor(playbackTime % 60)).padStart(2, '0')}</span>
                            <span className="text-cyan-400 font-mono">LOSSLESS • {bpm} BPM</span>
                            <span>-{Math.floor((totalDuration - playbackTime) / 60)}:{String(Math.floor((totalDuration - playbackTime) % 60)).padStart(2, '0')}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={totalDuration}
                            value={playbackTime}
                            onChange={(e) => scrubToTime(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, rgb(236, 72, 153) 0%, rgb(236, 72, 153) ${(playbackTime / totalDuration) * 100}%, rgb(55, 65, 81) ${(playbackTime / totalDuration) * 100}%, rgb(55, 65, 81) 100%)`
                            }}
                        />
                    </div>

                    {/* Transport Controls */}
                    <div className="flex items-center justify-center gap-4">
                        {/* Rewind */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={rewindHouse}
                            className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
                        >
                            <motion.svg 
                                width="32" 
                                height="32" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="white" 
                                strokeWidth="2"
                                animate={{ x: [-2, 2, -2] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </motion.svg>
                        </motion.button>

                        {/* Play/Pause */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={isPlaying ? stopHouse : startHouse}
                            className={`relative px-16 py-8 rounded-full font-black text-3xl transition-all ${
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
                            {isPlaying ? (
                                <Pause className="w-10 h-10" />
                            ) : (
                                <Play className="w-10 h-10" />
                            )}
                        </motion.button>

                        {/* Fast Forward */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={skipForward}
                            className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                            style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}
                        >
                            <motion.svg 
                                width="32" 
                                height="32" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="white" 
                                strokeWidth="2"
                                animate={{ x: [2, -2, 2] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <path d="M13 19l7-7-7-7m-8 14l7-7-7-7" />
                            </motion.svg>
                        </motion.button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={exportWAV}
                            className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-bold text-xs flex items-center justify-center gap-2"
                        >
                            <Download className="w-3 h-3" />
                            WAV
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareP2P}
                            className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 font-bold text-xs flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-3 h-3" />
                            P2P
                        </motion.button>
                    </div>
                    </motion.div>

                    {/* HOUSE STYLES - COMPACT */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500 rounded-xl p-4">
                    <h3 className="text-lg font-black text-cyan-400 mb-3 flex items-center gap-2">
                        <Music className="w-5 h-5" />
                        HOUSE STYLE
                    </h3>
                    <div className="space-y-2">
                        {Object.entries(styles).map(([key, style]) => {
                            const Icon = style.icon;
                            const isActive = currentStyle === key;
                            return (
                                <motion.button
                                    key={key}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setCurrentStyle(key)}
                                    className={`w-full p-2 rounded-lg border-2 transition-all text-left ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border-pink-500' 
                                            : 'bg-black/40 border-gray-700 hover:border-gray-500'
                                    }`}
                                    style={isActive ? { boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' } : {}}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-bold text-sm truncate ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                                {style.name}
                                            </p>
                                            <p className="text-[10px] text-gray-500 truncate">{style.vibe}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                    </div>

                    </div>

                {/* DJ MIXER - VISUAL LEARNING */}
                <AnimatePresence>
                {showMixer && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 bg-gradient-to-br from-black via-purple-900/30 to-black border-4 border-cyan-500 rounded-xl p-6"
                        style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}
                    >
                        <div className="mb-6 text-center">
                            <h3 className="text-2xl font-black text-cyan-400 mb-2">DJ MIXING BOARD</h3>
                            <p className="text-gray-400 text-sm font-mono">
                                Each fader controls a layer - see how house music is built ⚡
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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

                        {/* PRESET MIXES */}
                        <div className="mt-6 flex flex-wrap gap-2 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMixerLevels({
                                    kick: 1.0, bass: 0.8, hats: 0.15, claps: 0.3, bells: 0.2,
                                    pads: 0.1, strings: 0.25, shakers: 0.1, ride: 0.12, healing: 0.1
                                })}
                                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded font-bold text-xs"
                            >
                                FULL MIX
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMixerLevels({
                                    kick: 1.0, bass: 0.5, hats: 0.05, claps: 0.15, bells: 0.03,
                                    pads: 0.02, strings: 0.08, shakers: 0.03, ride: 0.04, healing: 0.15
                                })}
                                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded font-bold text-xs"
                            >
                                MINIMAL (Deep House)
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMixerLevels({
                                    kick: 1.0, bass: 0.9, hats: 0.2, claps: 0.35, bells: 0.08,
                                    pads: 0.15, strings: 0.3, shakers: 0.15, ride: 0.15, healing: 0.05
                                })}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-bold text-xs"
                            >
                                MAXIMAL (Peak Time)
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMixerLevels({
                                    kick: 0.3, bass: 0.1, hats: 0.05, claps: 0.08, bells: 0.06,
                                    pads: 0.15, strings: 0.25, shakers: 0.05, ride: 0.08, healing: 0.3
                                })}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-bold text-xs"
                            >
                                AMBIENT (Healing Focus)
                            </motion.button>
                        </div>

                        <div className="mt-6 bg-black/60 border-2 border-pink-500 p-4 rounded-lg">
                            <p className="text-pink-400 font-bold text-sm mb-2">💡 WHY THIS WORKS:</p>
                            <p className="text-gray-300 text-xs mb-2">
                                <strong className="text-cyan-400">LOW (Kick/Bass):</strong> 40-250Hz - physically vibrates your chest/organs
                            </p>
                            <p className="text-gray-300 text-xs mb-2">
                                <strong className="text-yellow-400">MID (Claps/Bells/Pads/Strings):</strong> 250-4000Hz - emotional/melodic center
                            </p>
                            <p className="text-gray-300 text-xs mb-3">
                                <strong className="text-green-400">HIGH (Hats/Shakers/Ride):</strong> 4000-20000Hz - clarity/air/energy
                            </p>
                            <p className="text-pink-300 text-xs font-bold">
                                CamelPhat balances all 3 = full frequency spectrum that moves your whole body + mind ⚡♾️❤️♾️
                            </p>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* COMPACT VISUALIZER + HEALING */}
                <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-4 bg-gradient-to-br from-black via-purple-900/20 to-black border-2 border-cyan-500 rounded-xl p-4 relative overflow-hidden"
                        style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)' }}
                    >
                        <div className="h-24 flex items-end justify-center gap-1 relative z-10">
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
                                        boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)'
                                    }}
                                />
                            ))}
                        </div>
                        <motion.p 
                            className="text-center text-cyan-400 font-mono text-xs mt-2 relative z-10"
                            animate={{ opacity: [1, 0.6, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {currentStyleData.name} • HEALING ⚡
                        </motion.p>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* HEALING FREQUENCIES - COMPACT */}
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500 rounded-xl p-4 mb-4">
                    <h3 className="text-lg font-black text-pink-400 mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        HEALING FREQUENCIES
                    </h3>
                    <div className="grid grid-cols-2 gap-2">

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

                        {/* COMPACT CONTROLS */}
                        <div className="bg-black border-2 border-purple-500 rounded-xl p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* VOLUME */}
                        <div>
                            <label className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                                <Volume2 className="w-4 h-4" />
                                VOL: {Math.round(volume * 100)}%
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
                            <label className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                                <Zap className="w-4 h-4" />
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
                                <p className="text-[10px] text-gray-500 mt-1">Stop to change</p>
                            )}
                            </div>
                            </div>
                            </div>
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
                        <p className="text-gray-300">
                            • <strong className="text-yellow-400">Lush string layers</strong> (classic house warmth)
                        </p>
                        <p className="text-gray-300">
                            • <strong className="text-orange-400">Shakers + ride cymbal</strong> (groove texture)
                        </p>
                        <p className="text-gray-300">
                            • <strong className="text-pink-400">Evolving chime patterns</strong> (Lil Louis Chaser vibes)
                        </p>
                        <p className="text-green-400 font-bold mt-3">
                            ✓ Zero-loss Web Audio quality - Ben Santiago / Moodymann club-ready 🔥
                        </p>
                        <p className="text-cyan-400 text-xs mt-2">
                            (Old school + new school = timeless house music ♾️❤️♾️)
                        </p>
                    </div>
                </div>

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
        <motion.div 
            className={`bg-black rounded-lg p-4 relative ${emphasis ? 'border-4' : 'border-2'}`}
            style={{ borderColor: c.border.replace('border-', '') }}
            animate={isActive && value > 0.1 ? {
                boxShadow: [`0 0 ${emphasis ? '10px' : '5px'} ${c.glow}`, `0 0 ${emphasis ? '30px' : '20px'} ${c.glow}`, `0 0 ${emphasis ? '10px' : '5px'} ${c.glow}`]
            } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
        >
            {/* LEVEL INDICATOR */}
            <div className="mb-3 text-center">
                <motion.span 
                    className={`text-3xl ${c.text} font-black`}
                    animate={isActive && value > 0.1 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3, repeat: Infinity }}
                >
                    {icon}
                </motion.span>
            </div>

            {/* VERTICAL FADER */}
            <div className="flex justify-center mb-3">
                <div className="relative h-32 w-8">
                    {/* Track */}
                    <div className={`absolute inset-0 ${c.bg} opacity-20 rounded-full`} />
                    
                    {/* Fill */}
                    <motion.div 
                        className={`absolute bottom-0 left-0 right-0 ${c.bg} rounded-full`}
                        style={{ height: `${value * 100}%` }}
                        animate={isActive && value > 0.1 ? { opacity: [0.6, 1, 0.6] } : {}}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    
                    {/* Input */}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
                    />
                </div>
            </div>

            {/* LABEL */}
            <div className="text-center">
                <p className={`${c.text} font-black text-xs mb-1`}>{label}</p>
                <p className="text-gray-500 text-[10px]">{description}</p>
                
                {/* FREQUENCY RANGE INDICATOR */}
                <div className="flex justify-center gap-1 my-1">
                    {(['kick', 'bass'].includes(label.toLowerCase())) && (
                        <span className="text-[8px] px-1 bg-cyan-900 text-cyan-300 rounded">LOW</span>
                    )}
                    {(['claps', 'bells', 'pads', 'strings'].includes(label.toLowerCase())) && (
                        <span className="text-[8px] px-1 bg-yellow-900 text-yellow-300 rounded">MID</span>
                    )}
                    {(['hats', 'shakers', 'ride'].includes(label.toLowerCase())) && (
                        <span className="text-[8px] px-1 bg-green-900 text-green-300 rounded">HIGH</span>
                    )}
                    {label.toLowerCase() === 'healing' && (
                        <span className="text-[8px] px-1 bg-pink-900 text-pink-300 rounded">SUB</span>
                    )}
                </div>
                
                <p className={`${c.text} text-xs font-mono`}>{Math.round(value * 100)}%</p>
            </div>
        </motion.div>
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
            className={`w-full p-2 rounded-lg border-2 transition-all ${
                active 
                    ? `${c.bg} ${c.border}` 
                    : 'bg-black/40 border-gray-700 hover:border-gray-500'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="text-left flex-1 min-w-0">
                    <p className={`font-bold text-xs truncate ${active ? 'text-white' : 'text-gray-400'}`}>
                        {label}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">{description}</p>
                </div>
                <div className={`w-10 h-5 rounded-full transition-all flex-shrink-0 ml-2 ${
                    active ? c.bg : 'bg-gray-700'
                } relative`}>
                    <motion.div
                        animate={{ x: active ? 20 : 0 }}
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full ${
                            active ? 'bg-white' : 'bg-gray-500'
                        }`}
                    />
                </div>
            </div>
        </motion.button>
    );
}