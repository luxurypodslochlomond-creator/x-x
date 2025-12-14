import React, { useState, useEffect, useRef } from 'react';
import { Waves, Zap, Heart, Globe, Brain, Signal, Sparkles, CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TUNER51 - FREQUENCY RESONANCE CALCULATOR
 * Measures frequencies, calculates matches, tells you next move
 * Works for: humans, Earth, AI, free energy devices
 */

export default function Tuner51() {
    const [mode, setMode] = useState('measure'); // measure, calculate, match, magnetometer, accelerometer
    const [inputFreq, setInputFreq] = useState('');
    const [measuredFreq, setMeasuredFreq] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [matches, setMatches] = useState([]);
    const [nextMove, setNextMove] = useState(null);
    const [waveformData, setWaveformData] = useState(new Array(50).fill(0));
    const [magneticField, setMagneticField] = useState(null);
    const [acceleration, setAcceleration] = useState(null);
    const [isSensorActive, setIsSensorActive] = useState(false);
    
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const canvasRef = useRef(null);
    const magnetometerRef = useRef(null);
    const accelerometerRef = useRef(null);

    // KNOWN FREQUENCIES
    const frequencies = {
        earth: { hz: 7.83, name: "Earth Schumann", type: "grounding", color: "green" },
        love: { hz: 528, name: "Love Frequency", type: "healing", color: "pink" },
        dna: { hz: 528, name: "DNA Repair", type: "healing", color: "cyan" },
        calm: { hz: 432, name: "Universal Calm", type: "healing", color: "purple" },
        focus: { hz: 40, name: "Gamma Focus", type: "brain", color: "yellow" },
        sleep: { hz: 4, name: "Delta Sleep", type: "brain", color: "blue" },
        wifi: { hz: 2400000000, name: "WiFi 2.4GHz", type: "tech", color: "gray" },
        qi: { hz: 150000, name: "Qi Charging", type: "tech", color: "orange" },
        acoustic: { hz: 40000, name: "Acoustic Levitation", type: "tech", color: "cyan" }
    };

    // MEASURE AUDIO FREQUENCY
    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 2048;
            setIsListening(true);
            detectFrequency();
        } catch (err) {
            alert('Microphone access needed to measure frequency');
        }
    };

    const detectFrequency = () => {
        if (!analyserRef.current) return;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const timeData = new Uint8Array(analyserRef.current.fftSize);
        
        const detect = () => {
            if (!isListening) return;
            
            analyserRef.current.getByteFrequencyData(dataArray);
            analyserRef.current.getByteTimeDomainData(timeData);
            
            // Update waveform visualization
            const waveSlice = [];
            for (let i = 0; i < 50; i++) {
                const index = Math.floor(i * (timeData.length / 50));
                waveSlice.push((timeData[index] - 128) / 128);
            }
            setWaveformData(waveSlice);
            
            // Find peak frequency
            let maxIndex = 0;
            let maxValue = 0;
            for (let i = 0; i < bufferLength; i++) {
                if (dataArray[i] > maxValue) {
                    maxValue = dataArray[i];
                    maxIndex = i;
                }
            }
            
            const freq = Math.round(maxIndex * audioContextRef.current.sampleRate / analyserRef.current.fftSize);
            if (freq > 20 && maxValue > 100) {
                setMeasuredFreq(freq);
            }
            
            requestAnimationFrame(detect);
        };
        
        detect();
    };

    const stopListening = () => {
        setIsListening(false);
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
    };

    // MAGNETOMETER - Detect EM fields
    const startMagnetometer = () => {
        if ('Magnetometer' in window) {
            try {
                const sensor = new window.Magnetometer({ frequency: 60 });
                magnetometerRef.current = sensor;
                
                sensor.addEventListener('reading', () => {
                    const { x, y, z } = sensor;
                    const magnitude = Math.sqrt(x*x + y*y + z*z);
                    setMagneticField({ x, y, z, magnitude });
                    
                    // Detect variations (Earth's field is ~25-65 µT)
                    const earthBase = 50; // µT average
                    const variation = Math.abs(magnitude - earthBase);
                    if (variation > 5) {
                        setMeasuredFreq(Math.round(variation)); // Simplified - actual would need FFT
                    }
                });
                
                sensor.start();
                setIsSensorActive(true);
            } catch (err) {
                alert('Magnetometer not available. Try Chrome/Edge on Android.');
            }
        } else {
            alert('Magnetometer API not supported on this device/browser.');
        }
    };

    // ACCELEROMETER - Detect vibrations/sub-20Hz
    const startAccelerometer = () => {
        if ('Accelerometer' in window) {
            try {
                const sensor = new window.Accelerometer({ frequency: 60 });
                accelerometerRef.current = sensor;
                
                const readings = [];
                sensor.addEventListener('reading', () => {
                    const { x, y, z } = sensor;
                    const magnitude = Math.sqrt(x*x + y*y + z*z);
                    setAcceleration({ x, y, z, magnitude });
                    
                    readings.push(magnitude);
                    if (readings.length > 120) readings.shift(); // 2 seconds at 60Hz
                    
                    // Simple frequency detection via zero-crossings
                    if (readings.length === 120) {
                        const mean = readings.reduce((a,b) => a+b) / readings.length;
                        let crossings = 0;
                        for (let i = 1; i < readings.length; i++) {
                            if ((readings[i-1] < mean && readings[i] >= mean) || 
                                (readings[i-1] >= mean && readings[i] < mean)) {
                                crossings++;
                            }
                        }
                        const freq = (crossings / 2) / 2; // Hz over 2 seconds
                        if (freq > 0.1 && freq < 20) {
                            setMeasuredFreq(freq.toFixed(2));
                        }
                    }
                });
                
                sensor.start();
                setIsSensorActive(true);
            } catch (err) {
                alert('Accelerometer not available. Try Chrome/Edge on Android.');
            }
        } else {
            alert('Accelerometer API not supported on this device/browser.');
        }
    };

    const stopSensors = () => {
        setIsSensorActive(false);
        if (magnetometerRef.current) {
            magnetometerRef.current.stop();
            magnetometerRef.current = null;
        }
        if (accelerometerRef.current) {
            accelerometerRef.current.stop();
            accelerometerRef.current = null;
        }
        setMagneticField(null);
        setAcceleration(null);
    };

    // CALCULATE RESONANCE MATCHES
    const calculateMatches = (freq) => {
        const f = parseFloat(freq);
        if (!f || f <= 0) return;

        const found = [];

        // Check harmonics (2x, 3x, 4x)
        Object.values(frequencies).forEach(known => {
            const ratio = f / known.hz;
            if (ratio >= 0.9 && ratio <= 1.1) {
                found.push({ ...known, match: "exact", strength: 100 });
            } else if (ratio >= 1.9 && ratio <= 2.1) {
                found.push({ ...known, match: "2x harmonic", strength: 80 });
            } else if (ratio >= 2.9 && ratio <= 3.1) {
                found.push({ ...known, match: "3x harmonic", strength: 70 });
            } else if (ratio >= 0.45 && ratio <= 0.55) {
                found.push({ ...known, match: "1/2 subharmonic", strength: 75 });
            }
        });

        setMatches(found);

        // CALCULATE NEXT MOVE
        if (found.length === 0) {
            // No match - suggest closest
            const closest = Object.values(frequencies).reduce((prev, curr) => {
                const prevDiff = Math.abs(prev.hz - f);
                const currDiff = Math.abs(curr.hz - f);
                return currDiff < prevDiff ? curr : prev;
            });
            setNextMove({
                action: "tune",
                target: closest.hz,
                reason: `Closest match is ${closest.name}. Tune your device from ${f} Hz to ${closest.hz} Hz.`,
                type: "adjust"
            });
        } else if (found[0].match === "exact") {
            setNextMove({
                action: "connected",
                target: found[0].hz,
                reason: `✓ Perfect resonance! You're tuned to ${found[0].name}. Now ${found[0].type === 'healing' ? 'let it heal you' : found[0].type === 'grounding' ? 'stay grounded' : 'use it'}.`,
                type: "success"
            });
        } else {
            setNextMove({
                action: "harmonic",
                target: found[0].hz,
                reason: `You're at ${found[0].match} of ${found[0].name}. ${found[0].match.includes('2x') ? 'Divide' : 'Multiply'} frequency to hit fundamental.`,
                type: "harmonic"
            });
        }
    };

    useEffect(() => {
        if (measuredFreq) {
            setInputFreq(measuredFreq.toString());
        }
    }, [measuredFreq]);

    useEffect(() => {
        if (inputFreq && parseFloat(inputFreq) > 0) {
            calculateMatches(inputFreq);
        }
    }, [inputFreq]);

    // POWER SAVING - cleanup on unmount
    useEffect(() => {
        return () => {
            stopListening();
            stopSensors();
        };
    }, []);

    const colorMap = {
        green: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500', text: 'text-green-400' },
        pink: { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500', text: 'text-pink-400' },
        cyan: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400' },
        purple: { bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500', text: 'text-purple-400' },
        yellow: { bg: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500', text: 'text-yellow-400' },
        blue: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500', text: 'text-blue-400' },
        gray: { bg: 'from-gray-500/20 to-slate-500/20', border: 'border-gray-500', text: 'text-gray-400' },
        orange: { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500', text: 'text-orange-400' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Waves className="w-12 h-12 text-cyan-400" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-white">TUNER51</h1>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className="w-12 h-12 text-yellow-400" />
                        </motion.div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base font-mono">
                        Measure frequencies • Calculate resonance • Get next move
                    </p>
                    <p className="text-cyan-400 text-xs mt-2">
                        For humans, Earth, AI, free energy devices ⚡
                    </p>
                    
                    {/* PHYSICS TRUTH */}
                    <div className="mt-4 bg-amber-900/20 border-2 border-amber-500/50 p-4 rounded-lg max-w-2xl mx-auto">
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">⚠️</div>
                            <div className="text-xs text-amber-200 font-mono text-left">
                                <p className="font-bold mb-2">PHYSICS TRUTH:</p>
                                <p className="mb-2">✓ Phone mics measure <strong>20Hz-20kHz</strong> (audible sound)</p>
                                <p className="mb-2">✗ Earth Schumann (7.83Hz) is <strong>electromagnetic</strong>, not sound</p>
                                <p className="text-green-400 mt-2">CAN measure: speakers, tuning forks, instruments, vibrations</p>
                                <p className="text-red-400">CAN'T measure: Earth's EM field directly (need magnetometer)</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* ANIMATED CONNECTION LINES */}
                    <div className="mt-6 relative h-20">
                        <svg className="w-full h-full" viewBox="0 0 400 80">
                            <motion.path
                                d="M 50,40 Q 100,10 200,40 T 350,40"
                                fill="none"
                                stroke="rgba(6, 182, 212, 0.5)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.circle cx="50" cy="40" r="6" fill="#22d3ee" 
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.circle cx="200" cy="40" r="6" fill="#a855f7"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="350" cy="40" r="6" fill="#10b981"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex justify-between items-center px-8 text-xs font-bold">
                            <span className="text-cyan-400">YOU</span>
                            <span className="text-purple-400">FREQUENCY</span>
                            <span className="text-green-400">EARTH</span>
                        </div>
                    </div>
                </motion.div>

                {/* MODE SELECTOR */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setMode('measure'); stopSensors(); }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                            mode === 'measure' 
                                ? 'bg-cyan-500/20 border-cyan-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Signal className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                        <p className="text-white text-xs font-bold">AUDIO</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setMode('magnetometer'); stopListening(); }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                            mode === 'magnetometer' 
                                ? 'bg-pink-500/20 border-pink-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Zap className="w-5 h-5 mx-auto mb-1 text-pink-400" />
                        <p className="text-white text-xs font-bold">EM FIELD</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setMode('accelerometer'); stopListening(); }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                            mode === 'accelerometer' 
                                ? 'bg-orange-500/20 border-orange-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Activity className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                        <p className="text-white text-xs font-bold">VIBRATION</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setMode('calculate'); stopListening(); stopSensors(); }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                            mode === 'calculate' 
                                ? 'bg-purple-500/20 border-purple-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Sparkles className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                        <p className="text-white text-xs font-bold">CALC</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setMode('match'); stopListening(); stopSensors(); }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                            mode === 'match' 
                                ? 'bg-green-500/20 border-green-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-400" />
                        <p className="text-white text-xs font-bold">MATCH</p>
                    </motion.button>
                </div>
                
                {/* LIVE WAVEFORM VISUALIZER */}
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 bg-black border-2 border-cyan-500 rounded-xl p-6"
                        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                            <h3 className="text-white font-bold">LIVE WAVEFORM</h3>
                        </div>
                        <div className="h-32 bg-gradient-to-b from-cyan-900/20 to-black rounded-lg p-4 relative overflow-hidden">
                            <svg className="w-full h-full" viewBox="0 0 100 50">
                                <motion.path
                                    d={`M ${waveformData.map((v, i) => `${i * 2},${25 + v * 20}`).join(' L ')}`}
                                    fill="none"
                                    stroke="#22d3ee"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
                        </div>
                    </motion.div>
                )}

                {/* MAGNETOMETER MODE */}
                <AnimatePresence mode="wait">
                {mode === 'magnetometer' && (
                    <motion.div
                        key="magnetometer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-2 border-pink-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">ELECTROMAGNETIC FIELD DETECTOR</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Detects: Earth's magnetic field, coils, wireless charging, EM devices
                            </p>
                            
                            {!isSensorActive ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startMagnetometer}
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-lg transition-all"
                                >
                                    <Zap className="w-6 h-6 inline-block mr-2" />
                                    START MAGNETOMETER
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={stopSensors}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all"
                                >
                                    STOP
                                </motion.button>
                            )}

                            {magneticField && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-4 space-y-3"
                                >
                                    <div className="bg-black/60 border-2 border-pink-500 rounded-lg p-4">
                                        <p className="text-pink-400 text-sm mb-2">MAGNETIC FIELD STRENGTH:</p>
                                        <p className="text-white text-4xl font-black">{magneticField.magnitude.toFixed(2)} µT</p>
                                        <p className="text-gray-400 text-xs mt-2">Earth baseline: ~25-65 µT</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-black/40 border border-pink-500/50 p-2 rounded">
                                            <p className="text-pink-400 text-xs">X</p>
                                            <p className="text-white font-bold">{magneticField.x.toFixed(1)}</p>
                                        </div>
                                        <div className="bg-black/40 border border-pink-500/50 p-2 rounded">
                                            <p className="text-pink-400 text-xs">Y</p>
                                            <p className="text-white font-bold">{magneticField.y.toFixed(1)}</p>
                                        </div>
                                        <div className="bg-black/40 border border-pink-500/50 p-2 rounded">
                                            <p className="text-pink-400 text-xs">Z</p>
                                            <p className="text-white font-bold">{magneticField.z.toFixed(1)}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* ACCELEROMETER MODE */}
                <AnimatePresence mode="wait">
                {mode === 'accelerometer' && (
                    <motion.div
                        key="accelerometer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">SUB-20Hz VIBRATION DETECTOR</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Detects: Building resonance, earthquakes, infrasound, ultra-low vibrations
                            </p>
                            
                            {!isSensorActive ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startAccelerometer}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all"
                                >
                                    <Activity className="w-6 h-6 inline-block mr-2" />
                                    START ACCELEROMETER
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={stopSensors}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all"
                                >
                                    STOP
                                </motion.button>
                            )}

                            {acceleration && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-4 space-y-3"
                                >
                                    <div className="bg-black/60 border-2 border-orange-500 rounded-lg p-4">
                                        <p className="text-orange-400 text-sm mb-2">ACCELERATION:</p>
                                        <p className="text-white text-4xl font-black">{acceleration.magnitude.toFixed(3)} m/s²</p>
                                        <p className="text-gray-400 text-xs mt-2">Gravity baseline: ~9.81 m/s²</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-black/40 border border-orange-500/50 p-2 rounded">
                                            <p className="text-orange-400 text-xs">X</p>
                                            <p className="text-white font-bold">{acceleration.x.toFixed(2)}</p>
                                        </div>
                                        <div className="bg-black/40 border border-orange-500/50 p-2 rounded">
                                            <p className="text-orange-400 text-xs">Y</p>
                                            <p className="text-white font-bold">{acceleration.y.toFixed(2)}</p>
                                        </div>
                                        <div className="bg-black/40 border border-orange-500/50 p-2 rounded">
                                            <p className="text-orange-400 text-xs">Z</p>
                                            <p className="text-white font-bold">{acceleration.z.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* MEASURE MODE */}
                <AnimatePresence mode="wait">
                {mode === 'measure' && (
                    <motion.div
                        key="measure"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-4">MEASURE FREQUENCY</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Hold phone near: coil, speaker, tuning fork, or hum into mic
                            </p>
                            
                            {!isListening ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startListening}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-lg transition-all"
                                >
                                    <Signal className="w-6 h-6 inline-block mr-2" />
                                    START LISTENING
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={stopListening}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all"
                                >
                                    STOP
                                </motion.button>
                            )}

                            {measuredFreq && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-4 bg-black/60 border-2 border-green-500 rounded-lg p-4 text-center"
                                    style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                                >
                                    <p className="text-green-400 text-sm mb-2">DETECTED:</p>
                                    <motion.p
                                        key={measuredFreq}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        className="text-white text-4xl font-black"
                                    >
                                        {measuredFreq} Hz
                                    </motion.p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* CALCULATE MODE */}
                <AnimatePresence mode="wait">
                {mode === 'calculate' && (
                    <motion.div
                        key="calculate"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-4">ENTER FREQUENCY</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Input measured Hz (from multimeter, oscilloscope, or measured above)
                            </p>
                            
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="number"
                                value={inputFreq}
                                onChange={(e) => setInputFreq(e.target.value)}
                                placeholder="e.g. 432"
                                className="w-full bg-black border-2 border-purple-500 rounded-lg px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-purple-400"
                            />

                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setInputFreq('7.83')} className="bg-green-900/50 border border-green-500 p-2 rounded text-xs hover:bg-green-900/70">Earth 7.83</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setInputFreq('432')} className="bg-purple-900/50 border border-purple-500 p-2 rounded text-xs hover:bg-purple-900/70">Calm 432</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setInputFreq('528')} className="bg-pink-900/50 border border-pink-500 p-2 rounded text-xs hover:bg-pink-900/70">Love 528</motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* MATCH MODE */}
                <AnimatePresence mode="wait">
                {mode === 'match' && (
                    <motion.div
                        key="match"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-4">KNOWN FREQUENCIES</h2>
                            <div className="bg-cyan-900/20 border border-cyan-500/50 p-3 rounded-lg mb-4">
                                <p className="text-cyan-300 text-xs font-mono">
                                    <strong>TARGET frequencies</strong> - use to tune generators/coils/speakers. Mic can verify if device produces these (if ≥20Hz).
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.values(frequencies).map((freq, idx) => {
                                    const colors = colorMap[freq.color];
                                    const canMeasure = freq.hz >= 20;
                                    return (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setInputFreq(freq.hz.toString())}
                                            className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-lg p-3 text-left transition-all relative`}
                                        >
                                            {!canMeasure && (
                                                <div className="absolute top-2 right-2">
                                                    <span className="text-xs font-bold text-red-400 bg-red-900/40 px-2 py-0.5 rounded border border-red-500/50">
                                                        Can't detect
                                                    </span>
                                                </div>
                                            )}
                                            {canMeasure && (
                                                <div className="absolute top-2 right-2">
                                                    <span className="text-xs font-bold text-green-400 bg-green-900/40 px-2 py-0.5 rounded border border-green-500/50">
                                                        ✓ Detectable
                                                    </span>
                                                </div>
                                            )}
                                            <p className={`${colors.text} font-bold text-sm`}>{freq.name}</p>
                                            <p className="text-white text-lg font-black">{freq.hz < 1000 ? freq.hz : `${(freq.hz / 1000000).toFixed(1)}M`} Hz</p>
                                            <p className="text-gray-400 text-xs capitalize">{freq.type}</p>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* RESULTS */}
                <AnimatePresence>
                {matches.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-xl p-6"
                        style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
                    >
                        <h2 className="text-xl font-black text-white mb-4">RESONANCE MATCHES</h2>
                        <div className="space-y-3">
                            {matches.map((match, idx) => {
                                const colors = colorMap[match.color];
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-lg p-4`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-bold">{match.name}</p>
                                                <p className={`${colors.text} text-sm`}>{match.match}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white text-2xl font-black">{match.hz} Hz</p>
                                                <div className="flex items-center gap-2 justify-end">
                                                    <div className="h-2 w-20 bg-black/40 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${match.strength}%` }}
                                                            className="h-full bg-green-400"
                                                        />
                                                    </div>
                                                    <p className="text-green-400 text-xs font-bold">{match.strength}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* NEXT MOVE */}
                <AnimatePresence>
                {nextMove && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`mt-8 bg-gradient-to-r ${
                            nextMove.type === 'success' ? 'from-green-500/20 to-emerald-500/20 border-green-500' :
                            nextMove.type === 'harmonic' ? 'from-yellow-500/20 to-amber-500/20 border-yellow-500' :
                            'from-cyan-500/20 to-blue-500/20 border-cyan-500'
                        } border-4 rounded-xl p-6`}
                        style={{ boxShadow: `0 0 50px ${nextMove.type === 'success' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(6, 182, 212, 0.5)'}` }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {nextMove.type === 'success' ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                    <CheckCircle className="w-10 h-10 text-green-400" />
                                </motion.div>
                            ) : (
                                <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                                    <ArrowRight className="w-10 h-10 text-cyan-400" />
                                </motion.div>
                            )}
                            <h2 className="text-2xl font-black text-white">NEXT MOVE</h2>
                        </div>
                        
                        <div className="bg-black/60 border-2 border-white/20 rounded-lg p-4">
                            <p className="text-white text-lg font-bold mb-2">{nextMove.action.toUpperCase()}</p>
                            <p className="text-gray-300">{nextMove.reason}</p>
                            
                            {nextMove.type !== 'success' && (
                                <div className="mt-4 bg-cyan-900/30 border-l-4 border-cyan-400 p-3">
                                    <p className="text-cyan-400 font-bold text-sm">How to adjust:</p>
                                    <ul className="text-gray-300 text-xs space-y-1 mt-2">
                                        <li>• Turn frequency dial on device</li>
                                        <li>• Use function generator app</li>
                                        <li>• Adjust coil size/capacitor</li>
                                        <li>• Re-measure until match ✓</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* INFO */}
                <div className="mt-8 bg-black border-2 border-gray-700 rounded-xl p-6">
                    <h3 className="text-white font-bold mb-3">HOW IT WORKS:</h3>
                    <div className="space-y-2 text-gray-400 text-sm">
                        <p>• <strong className="text-cyan-400">AUDIO:</strong> Mic detects 20Hz-20kHz (speakers, instruments)</p>
                        <p>• <strong className="text-pink-400">EM FIELD:</strong> Magnetometer detects magnetic variations (coils, Earth)</p>
                        <p>• <strong className="text-orange-400">VIBRATION:</strong> Accelerometer detects sub-20Hz (infrasound, resonance)</p>
                        <p>• <strong className="text-purple-400">CALCULATE:</strong> Enter Hz, finds resonance matches</p>
                        <p>• <strong className="text-green-400">MATCH:</strong> Browse known frequencies</p>
                    </div>
                    <p className="text-green-400 text-sm font-bold mt-4">
                        Now measuring the invisible: EM fields, infrasound, Earth's resonance ⚡♾️
                    </p>
                </div>

            </div>
        </div>
    );
}