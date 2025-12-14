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
    const [currentTrack, setCurrentTrack] = useState(null);
    const [volume, setVolume] = useState(0.7);
    const [playbackTime, setPlaybackTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(180);
    const [mode, setMode] = useState('freestyle'); // freestyle or tracks
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

    // SIGNATURE TRACKS - Pre-composed arrangements
    const tracks = {
        frequency_of_love: {
            name: "Frequency Of Love",
            artist: "HOUSE51",
            style: "patient_zero",
            duration: 180,
            vibe: "432Hz deep meditation journey",
            arrangement: [
                { section: 'intro', start: 0, end: 30, layers: ['kick', 'healing'] },
                { section: 'build', start: 30, end: 60, layers: ['kick', 'bass', 'pads', 'healing'] },
                { section: 'drop', start: 60, end: 90, layers: ['kick', 'bass', 'hats', 'pads', 'healing'] },
                { section: 'breakdown', start: 90, end: 120, layers: ['strings', 'pads', 'healing'] },
                { section: 'climax', start: 120, end: 150, layers: ['kick', 'bass', 'hats', 'claps', 'pads', 'strings', 'healing'] },
                { section: 'outro', start: 150, end: 180, layers: ['kick', 'bass', 'healing'], fadeOut: true }
            ]
        },
        chicago_nights: {
            name: "Chicago Nights",
            artist: "HOUSE51",
            style: "chicago",
            duration: 150,
            vibe: "Warm soulful grooves",
            arrangement: [
                { section: 'intro', start: 0, end: 20, layers: ['kick', 'bass'] },
                { section: 'groove', start: 20, end: 50, layers: ['kick', 'bass', 'hats', 'healing'] },
                { section: 'drop', start: 50, end: 80, layers: ['kick', 'bass', 'hats', 'claps', 'pads', 'healing'] },
                { section: 'breakdown', start: 80, end: 100, layers: ['pads', 'strings', 'healing'] },
                { section: 'rebuild', start: 100, end: 130, layers: ['kick', 'bass', 'hats', 'claps', 'strings', 'healing'] },
                { section: 'outro', start: 130, end: 150, layers: ['kick', 'pads', 'healing'], fadeOut: true }
            ]
        },
        glasgow_underground: {
            name: "Glasgow Underground",
            artist: "HOUSE51",
            style: "glasgow",
            duration: 165,
            vibe: "Dark hypnotic energy",
            arrangement: [
                { section: 'intro', start: 0, end: 25, layers: ['kick', 'bass', 'healing'] },
                { section: 'tension', start: 25, end: 55, layers: ['kick', 'bass', 'hats', 'shakers', 'healing'] },
                { section: 'drop', start: 55, end: 85, layers: ['kick', 'bass', 'hats', 'claps', 'ride', 'healing'] },
                { section: 'breakdown', start: 85, end: 110, layers: ['bass', 'pads', 'healing'] },
                { section: 'peak', start: 110, end: 140, layers: ['kick', 'bass', 'hats', 'claps', 'ride', 'pads', 'healing'] },
                { section: 'outro', start: 140, end: 165, layers: ['kick', 'bass', 'healing'], fadeOut: true }
            ]
        },
        i_feel_frequency: {
            name: "I Feel Frequency",
            artist: "HOUSE51 ft. Giorgio",
            style: "moroder",
            duration: 195,
            vibe: "Cosmic synth journey - Moroder tribute",
            arrangement: [
                { section: 'arpeggios', start: 0, end: 30, layers: ['kick', 'arpeggio', 'healing'] },
                { section: 'build', start: 30, end: 60, layers: ['kick', 'arpeggio', 'hats', 'healing'] },
                { section: 'synth_drop', start: 60, end: 90, layers: ['kick', 'arpeggio', 'hats', 'strings', 'healing'] },
                { section: 'cosmic', start: 90, end: 120, layers: ['kick', 'arpeggio', 'hats', 'pads', 'strings', 'healing'] },
                { section: 'breakdown', start: 120, end: 150, layers: ['arpeggio', 'pads', 'healing'] },
                { section: 'finale', start: 150, end: 180, layers: ['kick', 'arpeggio', 'hats', 'pads', 'strings', 'healing'] },
                { section: 'outro', start: 180, end: 195, layers: ['arpeggio', 'healing'], fadeOut: true }
            ]
        }
    };

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
            },
            moroder: {
                name: "Moroder Synth",
                vibe: "Giorgio Moroder - I Feel Love",
                icon: Zap,
                frequencies: { kick: 60, bass: 120 },
            }
            };

    // START PLAYING - FREESTYLE OR TRACK MODE
    const startHouse = async () => {
        if (mode === 'tracks' && currentTrack) {
            return startTrack(currentTrack);
        }
        return startFreestyle();
        };

        // START TRACK MODE - Use pre-composed arrangement
        const startTrack = async (trackKey) => {
            const track = tracks[trackKey];
            const style = styles[track.style];
            setTotalDuration(track.duration);

            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = ctx;

        // Master chain - clean signal path
        const masterGain = ctx.createGain();
        masterGain.gain.value = volume * 0.3; // Lots of headroom
        
        // Limiter to catch any peaks
        const limiter = ctx.createDynamicsCompressor();
        limiter.threshold.value = -10;
        limiter.knee.value = 0;
        limiter.ratio.value = 20;
        limiter.attack.value = 0.001;
        limiter.release.value = 0.1;
        
        masterGain.connect(limiter);
        limiter.connect(ctx.destination);
        masterGainRef.current = masterGain;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        limiter.connect(analyser);

        const now = ctx.currentTime;

        // Compose using track arrangement
        track.arrangement.forEach(section => {
            // Handle special arpeggio layer for Moroder
            const layers = section.layers.map(l => l === 'arpeggio' ? 'bass' : l);
            composeSection(ctx, masterGain, now, section.start, section.end, layers, style, section.fadeOut);

            // Add arpeggio separately if present
            if (section.layers.includes('arpeggio')) {
                playArpeggioSection(ctx, masterGain, now + section.start, section.end - section.start, style);
            }
        });

        // Auto-stop
        setTimeout(() => stopHouse(), track.duration * 1000);

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

        setTrackGenerated(new Date().toISOString());
        setIsPlaying(true);
        };

        // START FREESTYLE MODE - Random generation
        const startFreestyle = async () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = ctx;

        // Master chain - clean signal path
        const masterGain = ctx.createGain();
        masterGain.gain.value = volume * 0.3;

        const limiter = ctx.createDynamicsCompressor();
        limiter.threshold.value = -10;
        limiter.knee.value = 0;
        limiter.ratio.value = 20;
        limiter.attack.value = 0.001;
        limiter.release.value = 0.1;

        masterGain.connect(limiter);
        limiter.connect(ctx.destination);
        masterGainRef.current = masterGain;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        limiter.connect(analyser);

        const now = ctx.currentTime;
        const style = styles[currentStyle];

        // 3-MINUTE DEEP HOUSE JOURNEY
        composeSection(ctx, masterGain, now, 0, 30, ['kick', 'bass', 'healing'], style);
        composeSection(ctx, masterGain, now, 30, 60, ['kick', 'bass', 'hats', 'healing'], style);
        composeSection(ctx, masterGain, now, 60, 90, ['kick', 'bass', 'hats', 'claps', 'healing'], style);
        composeSection(ctx, masterGain, now, 90, 120, ['kick', 'pads', 'strings', 'healing'], style);
        composeSection(ctx, masterGain, now, 120, 150, ['kick', 'bass', 'hats', 'claps', 'pads', 'strings', 'healing'], style);
        composeSection(ctx, masterGain, now, 150, 180, ['kick', 'bass', 'pads', 'healing'], style, true);

        setTimeout(() => stopHouse(), 180000);

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

    // KICK SECTION - Deep house kick (smooth, no clicks)
    const playKickSection = (ctx, destination, startTime, duration, style) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / beatDuration);
        const kickFreq = style.frequencies.kick;

        for (let i = 0; i < numBeats; i++) {
            const time = startTime + (i * beatDuration);

            // Deep kick - single oscillator, smooth envelope
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(kickFreq * 2, time);
            osc.frequency.exponentialRampToValueAtTime(kickFreq, time + 0.05);

            // Smooth attack/release to prevent clicks
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.4, time + 0.001);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

            osc.connect(gain);
            gain.connect(destination);
            osc.start(time);
            osc.stop(time + 0.5);
        }
    };

    // BASS SECTION - Deep rolling bassline
    const playBassSection = (ctx, destination, startTime, duration, style) => {
        const beatDuration = 60 / 128;
        const bassFreq = style.frequencies.bass;

        // Different patterns per style
        const patterns = {
            patient_zero: [1, 1, 1.5, 1, 1.25, 1, 1.5, 1.25],
            chicago: [1, 1, 1.2, 1, 1.5, 1.2, 1, 1.5],
            detroit: [1, 1.5, 1, 1.25, 1, 1.5, 1.25, 1],
            glasgow: [1, 1, 1.3, 1.3, 1, 1.5, 1, 1.2],
            deep: [1, 1, 1.5, 1, 1.25, 1, 1.5, 1.25],
            soulful: [1, 1.2, 1, 1.5, 1.2, 1, 1.3, 1],
            tech: [1, 1, 1.25, 1.25, 1, 1.5, 1.25, 1],
            moroder: [1, 1, 1, 1, 1, 1, 1, 1] // Steady driving pulse
        };

        const pattern = patterns[currentStyle] || patterns.deep;
        const patternDuration = beatDuration * pattern.length;
        const numPatterns = Math.floor(duration / patternDuration);

        for (let p = 0; p < numPatterns; p++) {
            pattern.forEach((mult, i) => {
                const time = startTime + (p * patternDuration) + (i * beatDuration);

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                osc.type = 'sawtooth';
                osc.frequency.value = bassFreq * mult;

                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(800, time);
                filter.frequency.exponentialRampToValueAtTime(300, time + beatDuration * 0.6);
                filter.Q.value = 1;

                // Smooth envelope
                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.15, time + 0.001);
                gain.gain.exponentialRampToValueAtTime(0.001, time + beatDuration * 0.7);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(destination);
                osc.start(time);
                osc.stop(time + beatDuration * 0.7);
            });
        }
    };

    // HATS SECTION - Soft deep house hats
    const playHatsSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBeats = Math.floor(duration / (beatDuration * 0.5));

        for (let i = 0; i < numBeats; i++) {
            const time = startTime + (i * beatDuration * 0.5);
            const isOffbeat = i % 2 === 1;
            
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let j = 0; j < data.length; j++) data[j] = Math.random() * 2 - 1;
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 10000;
            filter.Q.value = 0.5;

            const gain = ctx.createGain();
            const level = isOffbeat ? 0.05 : 0.025;
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(level, time + 0.001);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(destination);
            noise.start(time);
            noise.stop(time + 0.03);
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

    // CLAPS SECTION - Smooth deep house claps
    const playClapsSection = (ctx, destination, startTime, duration) => {
        const beatDuration = 60 / 128;
        const numBars = Math.floor(duration / (beatDuration * 4));

        for (let bar = 0; bar < numBars; bar++) {
            [1, 3].forEach(beat => {
                const time = startTime + (bar * beatDuration * 4) + (beat * beatDuration);
                
                const noise = ctx.createBufferSource();
                const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
                noise.buffer = buffer;

                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 1500;
                filter.Q.value = 1.5;

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.12, time + 0.002);
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(destination);
                noise.start(time);
                noise.stop(time + 0.15);
            });
        }
    };

    // PADS SECTION - Warm deep house pads
    const playPadsSection = (ctx, destination, startTime, duration) => {
        const chords = [[261.63, 329.63, 392.00], [293.66, 369.99, 440.00]];
        const beatDuration = 60 / 128;
        
        chords.forEach((chord, idx) => {
            const time = startTime + (idx * beatDuration * 16);
            if (time < startTime + duration) {
                chord.forEach(freq => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const filter = ctx.createBiquadFilter();
                    
                    osc.type = 'sawtooth';
                    osc.frequency.value = freq;
                    
                    filter.type = 'lowpass';
                    filter.frequency.value = 2000;
                    filter.Q.value = 0.5;
                    
                    gain.gain.setValueAtTime(0, time);
                    gain.gain.linearRampToValueAtTime(0.03, time + 2);
                    gain.gain.setValueAtTime(0.03, time + (beatDuration * 14));
                    gain.gain.linearRampToValueAtTime(0, time + (beatDuration * 16));
                    
                    osc.connect(filter);
                    filter.connect(gain);
                    gain.connect(destination);
                    osc.start(time);
                    osc.stop(time + (beatDuration * 16));
                });
            }
        });
    };

    // STRINGS SECTION - Smooth strings
    const playStringsSection = (ctx, destination, startTime, duration) => {
        const notes = [261.63, 329.63, 392.00, 523.25];
        const beatDuration = 60 / 128;
        
        for (let i = 0; i < 4; i++) {
            const time = startTime + (i * beatDuration * 16);
            if (time < startTime + duration) {
                notes.forEach(freq => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const filter = ctx.createBiquadFilter();
                    
                    osc.type = 'sawtooth';
                    osc.frequency.value = freq;
                    
                    filter.type = 'lowpass';
                    filter.frequency.value = 3000;
                    filter.Q.value = 0.7;
                    
                    gain.gain.setValueAtTime(0, time);
                    gain.gain.linearRampToValueAtTime(0.06, time + 1.5);
                    gain.gain.setValueAtTime(0.06, time + (beatDuration * 14));
                    gain.gain.linearRampToValueAtTime(0, time + (beatDuration * 16));
                    
                    osc.connect(filter);
                    filter.connect(gain);
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

    // ARPEGGIO SECTION - Moroder-style pulsing synth
    const playArpeggioSection = (ctx, destination, startTime, duration, style) => {
        const beatDuration = 60 / 128;
        const bassFreq = style.frequencies.bass;

        // Classic 16th note arpeggio pattern (I Feel Love style)
        const pattern = [1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5]; // Octaves and fifths
        const noteLength = beatDuration / 4; // 16th notes
        const numNotes = Math.floor(duration / noteLength);

        for (let i = 0; i < numNotes; i++) {
            const time = startTime + (i * noteLength);
            const mult = pattern[i % pattern.length];

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sawtooth'; // Classic Moog sound
            osc.frequency.value = bassFreq * mult;

            // Sweeping filter - THE Moroder signature
            filter.type = 'lowpass';
            const filterStart = 800 + (i % 64) * 30; // Evolving sweep
            filter.frequency.setValueAtTime(filterStart, time);
            filter.frequency.exponentialRampToValueAtTime(filterStart * 2, time + noteLength * 0.5);
            filter.Q.value = 5; // Resonant filter

            // Tight envelope for pulsing effect
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.08, time + 0.001);
            gain.gain.exponentialRampToValueAtTime(0.001, time + noteLength * 0.8);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(destination);
            osc.start(time);
            osc.stop(time + noteLength);
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
                        {mode === 'tracks' && currentTrack ? (
                            <>
                                <p className="text-white font-black text-xl">{tracks[currentTrack].name}</p>
                                <p className="text-amber-400 text-sm font-bold">by {tracks[currentTrack].artist}</p>
                                <p className="text-gray-500 text-xs">{tracks[currentTrack].vibe}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-white font-black text-xl">{currentStyleData.name}</p>
                                <p className="text-amber-400 text-sm font-bold">by HOUSE51</p>
                                <p className="text-gray-500 text-xs">{currentStyleData.vibe}</p>
                            </>
                        )}
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

                    {/* MODE SELECTOR */}
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-500 font-mono">MODE</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setMode('freestyle'); setCurrentTrack(null); }}
                                className={`flex-1 py-3 rounded-lg border-2 font-bold text-sm transition-all ${
                                    mode === 'freestyle' 
                                        ? 'bg-amber-600/20 border-amber-500 text-white' 
                                        : 'bg-black/40 border-gray-700 text-gray-500 hover:border-gray-600'
                                }`}
                            >
                                FREESTYLE
                            </button>
                            <button
                                onClick={() => { setMode('tracks'); setCurrentTrack('frequency_of_love'); }}
                                className={`flex-1 py-3 rounded-lg border-2 font-bold text-sm transition-all ${
                                    mode === 'tracks' 
                                        ? 'bg-amber-600/20 border-amber-500 text-white' 
                                        : 'bg-black/40 border-gray-700 text-gray-500 hover:border-gray-600'
                                }`}
                            >
                                TRACKS
                            </button>
                        </div>
                    </div>

                    {/* TRACK SELECTOR (if tracks mode) */}
                    {mode === 'tracks' && (
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500 font-mono">SELECT TRACK</p>
                            <div className="space-y-2">
                                {Object.entries(tracks).map(([key, track]) => (
                                    <button
                                        key={key}
                                        onClick={() => setCurrentTrack(key)}
                                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                                            currentTrack === key 
                                                ? 'bg-amber-600/20 border-amber-500' 
                                                : 'bg-black/40 border-gray-700 hover:border-gray-600'
                                        }`}
                                    >
                                        <p className={`font-bold text-sm ${currentTrack === key ? 'text-white' : 'text-gray-500'}`}>
                                            {track.name}
                                        </p>
                                        <p className="text-[10px] text-gray-600">{track.vibe} • {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STYLE SELECTOR (if freestyle mode) */}
                    {mode === 'freestyle' && (
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
                        )}

                        </div>

            </div>
        </div>
    );
}