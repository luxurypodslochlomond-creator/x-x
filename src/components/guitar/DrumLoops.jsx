import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * DRUM LOOPS - OLD SCHOOL + MODERN
 * Jam along with beats
 */

const DRUM_PATTERNS = [
    {
        id: 'basic-rock',
        name: '🥁 Basic Rock',
        bpm: 120,
        type: 'classic',
        pattern: [
            { time: 0, sound: 'kick' },
            { time: 0, sound: 'hihat' },
            { time: 0.25, sound: 'hihat' },
            { time: 0.5, sound: 'snare' },
            { time: 0.5, sound: 'hihat' },
            { time: 0.75, sound: 'hihat' },
            { time: 1.0, sound: 'kick' },
            { time: 1.0, sound: 'hihat' },
            { time: 1.25, sound: 'hihat' },
            { time: 1.5, sound: 'snare' },
            { time: 1.5, sound: 'hihat' },
            { time: 1.75, sound: 'hihat' },
        ]
    },
    {
        id: 'ballad',
        name: '💚 Slow Ballad',
        bpm: 80,
        type: 'classic',
        pattern: [
            { time: 0, sound: 'kick' },
            { time: 0, sound: 'hihat' },
            { time: 0.5, sound: 'snare' },
            { time: 0.5, sound: 'hihat' },
            { time: 1.0, sound: 'kick' },
            { time: 1.0, sound: 'hihat' },
            { time: 1.5, sound: 'snare' },
            { time: 1.5, sound: 'hihat' },
        ]
    },
    {
        id: 'trap',
        name: '🔥 Modern Trap',
        bpm: 140,
        type: 'modern',
        pattern: [
            { time: 0, sound: 'kick' },
            { time: 0, sound: 'hihat' },
            { time: 0.125, sound: 'hihat' },
            { time: 0.25, sound: 'hihat' },
            { time: 0.375, sound: 'hihat' },
            { time: 0.5, sound: 'snare' },
            { time: 0.5, sound: 'hihat' },
            { time: 0.625, sound: 'hihat' },
            { time: 0.75, sound: 'hihat' },
            { time: 0.875, sound: 'hihat' },
            { time: 1.0, sound: 'kick' },
            { time: 1.0, sound: 'hihat' },
            { time: 1.125, sound: 'hihat' },
            { time: 1.25, sound: 'hihat' },
            { time: 1.375, sound: 'hihat' },
            { time: 1.5, sound: 'snare' },
            { time: 1.5, sound: 'hihat' },
            { time: 1.625, sound: 'hihat' },
            { time: 1.75, sound: 'kick' },
            { time: 1.75, sound: 'hihat' },
            { time: 1.875, sound: 'hihat' },
        ]
    },
    {
        id: 'boom-bap',
        name: '🎤 Boom Bap',
        bpm: 90,
        type: 'classic',
        pattern: [
            { time: 0, sound: 'kick' },
            { time: 0.5, sound: 'snare' },
            { time: 0.75, sound: 'kick' },
            { time: 1.0, sound: 'kick' },
            { time: 1.5, sound: 'snare' },
        ]
    }
];

export default function DrumLoops() {
    const [selectedPattern, setSelectedPattern] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioContextRef = useRef(null);
    const loopIntervalRef = useRef(null);

    useEffect(() => {
        return () => {
            stopLoop();
        };
    }, []);

    const createDrumSound = (ctx, type, startTime) => {
        const gainNode = ctx.createGain();
        gainNode.connect(ctx.destination);
        gainNode.gain.value = volume;

        if (type === 'kick') {
            // Kick drum - low frequency
            const osc = ctx.createOscillator();
            osc.connect(gainNode);
            osc.frequency.setValueAtTime(150, startTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.5);
            gainNode.gain.setValueAtTime(1, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
            osc.start(startTime);
            osc.stop(startTime + 0.5);
        } else if (type === 'snare') {
            // Snare - noise burst
            const bufferSize = ctx.sampleRate * 0.1;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.gain.setValueAtTime(0.6, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
            noise.start(startTime);
        } else if (type === 'hihat') {
            // Hi-hat - short noise burst
            const bufferSize = ctx.sampleRate * 0.05;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 7000;
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);
            noise.start(startTime);
        }
    };

    const playLoop = () => {
        if (!selectedPattern) return;

        const pattern = DRUM_PATTERNS.find(p => p.id === selectedPattern);
        if (!pattern) return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const beatDuration = 60 / pattern.bpm; // Duration of one beat in seconds
        const loopDuration = 2 * beatDuration; // 2 bars

        const scheduleLoop = () => {
            const now = ctx.currentTime;
            pattern.pattern.forEach(hit => {
                const hitTime = now + (hit.time * beatDuration);
                createDrumSound(ctx, hit.sound, hitTime);
            });
        };

        // Schedule first loop immediately
        scheduleLoop();

        // Schedule subsequent loops
        loopIntervalRef.current = setInterval(scheduleLoop, loopDuration * 1000);
    };

    const stopLoop = () => {
        if (loopIntervalRef.current) {
            clearInterval(loopIntervalRef.current);
            loopIntervalRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopLoop();
            setIsPlaying(false);
        } else {
            playLoop();
            setIsPlaying(true);
        }
    };

    const handlePatternSelect = (patternId) => {
        if (isPlaying) {
            stopLoop();
        }
        setSelectedPattern(patternId);
        if (isPlaying) {
            setTimeout(() => playLoop(), 100);
        }
    };

    return (
        <div className="space-y-4">
            {/* Pattern Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DRUM_PATTERNS.map(pattern => (
                    <motion.button
                        key={pattern.id}
                        onClick={() => handlePatternSelect(pattern.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 border-4 transition-all ${
                            selectedPattern === pattern.id
                                ? 'bg-purple-900 border-purple-500'
                                : 'bg-black border-purple-500/50 hover:border-purple-500'
                        }`}
                    >
                        <p className="font-black font-mono text-sm text-purple-300">{pattern.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{pattern.bpm} BPM</p>
                    </motion.button>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                <motion.button
                    onClick={togglePlay}
                    disabled={!selectedPattern}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 border-4 font-black font-mono ${
                        !selectedPattern
                            ? 'bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed'
                            : isPlaying
                            ? 'bg-red-900 border-red-500 text-red-300'
                            : 'bg-green-900 border-green-500 text-green-300 hover:bg-green-800'
                    }`}
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isPlaying ? 'STOP' : 'PLAY'}
                </motion.button>

                {/* Volume */}
                <div className="flex items-center gap-2 flex-1 max-w-xs">
                    <Volume2 className="w-5 h-5 text-purple-400" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="flex-1"
                    />
                </div>
            </div>
        </div>
    );
}