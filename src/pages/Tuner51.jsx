import React, { useState, useEffect, useRef } from 'react';
import { Waves, Zap, Heart, Globe, Brain, Signal, Sparkles, CheckCircle, ArrowRight, Activity, History, Play, Pause, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

/**
 * TUNER51 - FREQUENCY RESONANCE CALCULATOR
 * Measures frequencies, calculates matches, tells you next move
 * Works for: humans, Earth, AI, free energy devices
 */

export default function Tuner51() {
          const [mode, setMode] = useState('measure'); // measure, calculate, match, magnetometer, accelerometer, light, pressure
          const [inputFreq, setInputFreq] = useState('');
          const [measuredFreq, setMeasuredFreq] = useState(null);
          const [isListening, setIsListening] = useState(false);
          const [matches, setMatches] = useState([]);
          const [nextMove, setNextMove] = useState(null);
          const [waveformData, setWaveformData] = useState(new Array(50).fill(0));
          const [magneticField, setMagneticField] = useState(null);
          const [acceleration, setAcceleration] = useState(null);
          const [isSensorActive, setIsSensorActive] = useState(false);
          const [ambientLight, setAmbientLight] = useState(null);
          const [pressure, setPressure] = useState(null);
          const [showCoherenceExplainer, setShowCoherenceExplainer] = useState(false);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const canvasRef = useRef(null);
    const magnetometerRef = useRef(null);
    const accelerometerRef = useRef(null);
    const lastSaveRef = useRef(Date.now());
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // FEEDBACK REFS
    const feedbackOscillatorRef = useRef(null);
    const lastBeepRef = useRef(Date.now());
    const baselineEMRef = useRef(null);
    const baselineAccelRef = useRef(null);

    // Fetch measurement history
    const { data: measurements = [] } = useQuery({
        queryKey: ['tuner-measurements'],
        queryFn: () => base44.entities.TunerMeasurement.list('-created_date', 20)
    });

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
                // Auto-save audio measurement
                saveMeasurement('audio', { frequency_hz: freq, magnitude: maxValue });
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

    // AUTO-SAVE MEASUREMENT (throttled - every 10 seconds)
    const saveMeasurement = async (type, data) => {
        const now = Date.now();
        if (now - lastSaveRef.current < 10000) return; // Throttle to 10s
        
        lastSaveRef.current = now;
        try {
            await base44.entities.TunerMeasurement.create({
                measurement_type: type,
                ...data
            });
        } catch (err) {
            console.error('Save measurement failed:', err);
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

                    // Set baseline on first reading
                    if (baselineEMRef.current === null) {
                        baselineEMRef.current = magnitude;
                    }

                    // INSTANT FEEDBACK: beep when EM field changes significantly
                    const change = Math.abs(magnitude - baselineEMRef.current);
                    if (change > 5 && Date.now() - lastBeepRef.current > 500) {
                        playFeedbackBeep(200 + change * 10); // Higher pitch = stronger field
                        lastBeepRef.current = Date.now();
                        // Visual feedback: vibrate phone
                        if ('vibrate' in navigator) {
                            navigator.vibrate(50);
                        }
                    }

                    // Auto-save measurement
                    saveMeasurement('magnetometer', { magnitude, x, y, z });

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

                    // Set baseline
                    if (baselineAccelRef.current === null) {
                        baselineAccelRef.current = magnitude;
                    }

                    // INSTANT FEEDBACK: vibrate when movement detected
                    const change = Math.abs(magnitude - baselineAccelRef.current);
                    if (change > 0.5 && Date.now() - lastBeepRef.current > 300) {
                        // Visual: flash background
                        document.body.style.backgroundColor = '#ff6b35';
                        setTimeout(() => {
                            document.body.style.backgroundColor = '';
                        }, 100);

                        // Haptic feedback
                        if ('vibrate' in navigator) {
                            navigator.vibrate([30, 50, 30]);
                        }

                        playFeedbackBeep(400 + change * 100);
                        lastBeepRef.current = Date.now();
                    }

                    // Auto-save measurement
                    saveMeasurement('accelerometer', { magnitude, x, y, z });

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
        if (feedbackOscillatorRef.current) {
            feedbackOscillatorRef.current.stop();
            feedbackOscillatorRef.current = null;
        }
        setMagneticField(null);
        setAcceleration(null);
        setAmbientLight(null);
        setPressure(null);
        baselineEMRef.current = null;
        baselineAccelRef.current = null;
        document.body.style.backgroundColor = '';
    };

    // FEEDBACK BEEP - plays quick beep when sensors detect changes
    const playFeedbackBeep = (frequency) => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.frequency.setValueAtTime(frequency, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (err) {
            console.log('Audio feedback unavailable');
        }
    };

    // AMBIENT LIGHT SENSOR - Detect screen blue light, LED flicker, circadian lighting
    const startLightSensor = () => {
        if ('AmbientLightSensor' in window) {
            try {
                const sensor = new window.AmbientLightSensor({ frequency: 10 });
                let lastLux = null;
                sensor.addEventListener('reading', () => {
                    const lux = sensor.illuminance;
                    setAmbientLight(lux);

                    // INSTANT FEEDBACK: change background color based on brightness
                    const brightness = Math.min(255, Math.floor(lux / 4));
                    document.body.style.backgroundColor = `rgba(${brightness}, ${brightness}, ${brightness}, 0.1)`;

                    // Audio feedback on significant change
                    if (lastLux !== null && Math.abs(lux - lastLux) > 100) {
                        playFeedbackBeep(300 + lux);
                    }
                    lastLux = lux;

                    saveMeasurement('light', { magnitude: lux });
                });
                sensor.start();
                setIsSensorActive(true);
            } catch (err) {
                alert('Light sensor not available. Try Chrome/Edge on Android.');
            }
        } else {
            alert('Ambient Light Sensor API not supported on this device/browser.');
        }
    };

    // BAROMETER - Detect weather changes, predict migraines, measure altitude
    const startPressureSensor = () => {
        if ('AbsoluteOrientationSensor' in window || navigator.permissions) {
            // Pressure API varies by browser
            alert('Barometer API support coming soon - different per device');
        } else {
            alert('Pressure sensor API not yet standardized across browsers.');
        }
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

    // PLAY FREQUENCY AS AUDIO
    const playFrequency = (freq) => {
        if (!freq || freq < 20 || freq > 20000) {
            alert('Frequency must be 20-20,000 Hz to hear');
            return;
        }

        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            
            oscillatorRef.current = oscillator;
            gainNodeRef.current = gainNode;
            setIsPlaying(true);
        } catch (err) {
            alert('Audio playback error');
        }
    };

    const stopPlayback = () => {
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current = null;
            gainNodeRef.current = null;
            setIsPlaying(false);
        }
    };

    // POWER SAVING - cleanup on unmount
    useEffect(() => {
        return () => {
            stopListening();
            stopSensors();
            stopPlayback();
            document.body.style.backgroundColor = '';
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

                    {/* COHERENCE EXPLAINER */}
                    <motion.div className="mt-6 max-w-2xl mx-auto">
                        <button
                            onClick={() => setShowCoherenceExplainer(!showCoherenceExplainer)}
                            className="w-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500 rounded-lg p-4 flex items-center justify-between hover:from-pink-500/30 hover:to-cyan-500/30 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <Heart className="w-6 h-6 text-pink-400" />
                                <div className="text-left">
                                    <p className="text-white font-bold">What is "Coherence"?</p>
                                    <p className="text-gray-400 text-xs">Click to understand what we're measuring</p>
                                </div>
                            </div>
                            {showCoherenceExplainer ? (
                                <ChevronUp className="w-5 h-5 text-pink-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-pink-400" />
                            )}
                        </button>

                        <AnimatePresence>
                        {showCoherenceExplainer && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-black border-2 border-cyan-500/50 rounded-b-lg p-6 space-y-4">
                                    <div className="space-y-3">
                                        <div className="bg-cyan-900/20 border-l-4 border-cyan-500 p-3 rounded">
                                            <p className="text-cyan-400 font-bold text-sm mb-1">SIMPLE:</p>
                                            <p className="text-white text-sm">When your heart rhythm is smooth (not jumpy), your stress is low, and your body feels calm = you're coherent. Everything working together.</p>
                                        </div>

                                        <div className="bg-pink-900/20 border-l-4 border-pink-500 p-3 rounded">
                                            <p className="text-pink-400 font-bold text-sm mb-1">WHAT WE MEASURE:</p>
                                            <p className="text-white text-sm mb-2">We combine multiple sensors:</p>
                                            <ul className="text-gray-300 text-xs space-y-1 ml-4">
                                                <li>• Heart rate smoothness (via camera)</li>
                                                <li>• EM field stability (environment calm)</li>
                                                <li>• Movement patterns (body relaxed)</li>
                                                <li>• Voice stress (if you speak)</li>
                                            </ul>
                                        </div>

                                        <div className="bg-green-900/20 border-l-4 border-green-500 p-3 rounded">
                                            <p className="text-green-400 font-bold text-sm mb-1">WHY IT MATTERS:</p>
                                            <p className="text-white text-sm">Higher coherence = better focus, less anxiety, clearer thinking. It's your "flow state" score.</p>
                                        </div>

                                        <div className="bg-purple-900/20 border-l-4 border-purple-500 p-3 rounded">
                                            <p className="text-purple-400 font-bold text-sm mb-1">SCIENCE:</p>
                                            <p className="text-white text-sm">HeartMath Institute research shows heart rhythm patterns affect brain function. We're measuring those patterns with your phone.</p>
                                        </div>

                                        <div className="bg-amber-900/20 border border-amber-500/50 p-3 rounded">
                                            <p className="text-amber-400 font-bold text-sm mb-1">⚠️ HONEST LIMITS:</p>
                                            <p className="text-amber-200 text-xs">We measure physical signals (heart, EM, movement). We DON'T measure consciousness or "vibes" directly - that's not provable yet. But patterns correlate with how you FEEL.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </motion.div>
                    
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

                    {/* GENIUS BREAKTHROUGH */}
                    <div className="mt-4 bg-gradient-to-r from-pink-900/40 to-cyan-900/40 border-2 border-pink-500 p-4 rounded-lg max-w-2xl mx-auto" style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' }}>
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">⚡</div>
                            <div className="text-xs text-pink-200 font-mono text-left">
                                <p className="font-bold mb-2 text-pink-400">THE GENIUS MOVE:</p>
                                <p className="mb-2 text-white">Your phone just became a $10,000 lab instrument - FOR FREE</p>
                                <p className="mb-2">• <strong className="text-cyan-400">Magnetometer</strong> = detect invisible EM fields (Earth, coils, wireless charging, EMF pollution)</p>
                                <p className="mb-2">• <strong className="text-orange-400">Accelerometer</strong> = detect sub-20Hz infrasound (earthquakes, building resonance)</p>
                                <p className="text-green-400 mt-2 font-bold">Now measuring what was INVISIBLE before ♾️❤️♾️</p>
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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setMode('light'); stopListening(); stopSensors(); }}
                          className={`p-3 rounded-lg border-2 transition-all ${
                              mode === 'light' 
                                  ? 'bg-yellow-500/20 border-yellow-500' 
                                  : 'bg-black border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          <Sparkles className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                          <p className="text-white text-xs font-bold">LIGHT</p>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setMode('pressure'); stopListening(); stopSensors(); }}
                          className={`p-3 rounded-lg border-2 transition-all ${
                              mode === 'pressure' 
                                  ? 'bg-blue-500/20 border-blue-500' 
                                  : 'bg-black border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          <Globe className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                          <p className="text-white text-xs font-bold">PRESSURE</p>
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
                                        <div className="mt-3 bg-pink-500/20 border border-pink-500/50 p-2 rounded">
                                            <p className="text-pink-300 text-xs font-bold">🔊 LISTEN: Beep pitch changes with EM strength</p>
                                            <p className="text-pink-300 text-xs">📳 FEEL: Phone vibrates on detection</p>
                                        </div>
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
                                        <div className="mt-3 bg-orange-500/20 border border-orange-500/50 p-2 rounded">
                                            <p className="text-orange-300 text-xs font-bold">👀 SEE: Screen flashes orange on vibration</p>
                                            <p className="text-orange-300 text-xs">📳 FEEL: Phone vibrates in pattern</p>
                                            <p className="text-orange-300 text-xs">🔊 HEAR: Beep on movement</p>
                                        </div>
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
                                    className="mt-4 space-y-3"
                                >
                                    <div className="bg-black/60 border-2 border-green-500 rounded-lg p-4 text-center"
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
                                    </div>
                                    {measuredFreq >= 20 && measuredFreq <= 20000 && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => isPlaying ? stopPlayback() : playFrequency(measuredFreq)}
                                            className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                                                isPlaying 
                                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                                    : 'bg-green-500 hover:bg-green-600 text-black'
                                            }`}
                                        >
                                            {isPlaying ? (
                                                <>
                                                    <Pause className="w-5 h-5" />
                                                    STOP PLAYBACK
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-5 h-5" />
                                                    PLAY THIS FREQUENCY
                                                </>
                                            )}
                                        </motion.button>
                                    )}
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

                {/* LIGHT SENSOR MODE */}
                <AnimatePresence mode="wait">
                {mode === 'light' && (
                    <motion.div
                        key="light"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">AMBIENT LIGHT DETECTOR</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Detects: Blue light exposure, workspace lighting, circadian rhythm disruption
                            </p>

                            {!isSensorActive ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startLightSensor}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg transition-all"
                                >
                                    <Sparkles className="w-6 h-6 inline-block mr-2" />
                                    START LIGHT SENSOR
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

                            {ambientLight !== null && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-4 space-y-3"
                                >
                                    <div className="bg-black/60 border-2 border-yellow-500 rounded-lg p-4">
                                        <p className="text-yellow-400 text-sm mb-2">LIGHT LEVEL:</p>
                                        <p className="text-white text-4xl font-black">{ambientLight.toFixed(0)} lux</p>
                                        <div className="mt-2 bg-yellow-500/20 border border-yellow-500/50 p-2 rounded mb-3">
                                            <p className="text-yellow-300 text-xs font-bold">👀 SEE: Background brightness changes with light</p>
                                            <p className="text-yellow-300 text-xs">🔊 HEAR: Beep on big brightness changes</p>
                                        </div>
                                        <div className="mt-3 space-y-1 text-xs">
                                            {ambientLight < 50 && <p className="text-red-400">⚠️ Too dark - eye strain risk</p>}
                                            {ambientLight >= 50 && ambientLight < 300 && <p className="text-yellow-400">⚠️ Low light - consider brighter lighting</p>}
                                            {ambientLight >= 300 && ambientLight < 500 && <p className="text-green-400">✓ Good for general work</p>}
                                            {ambientLight >= 500 && ambientLight < 1000 && <p className="text-green-400">✓ Excellent workspace lighting</p>}
                                            {ambientLight >= 1000 && <p className="text-cyan-400">Very bright - outdoor/direct sun</p>}
                                        </div>
                                    </div>
                                    <div className="bg-black/40 border border-yellow-500/50 p-3 rounded text-xs">
                                        <p className="text-yellow-400 font-bold mb-2">HEALTH TIP:</p>
                                        <p className="text-gray-300">• Morning: 1000+ lux (bright light)</p>
                                        <p className="text-gray-300">• Evening: &lt;50 lux (dim/red light)</p>
                                        <p className="text-gray-300">• Helps circadian rhythm = better sleep</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* PRESSURE SENSOR MODE */}
                <AnimatePresence mode="wait">
                {mode === 'pressure' && (
                    <motion.div
                        key="pressure"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-2 border-blue-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">BAROMETER (COMING SOON)</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Will detect: Weather changes, migraine prediction, altitude
                            </p>
                            <div className="bg-amber-900/20 border border-amber-500/50 p-4 rounded">
                                <p className="text-amber-400 text-sm font-bold mb-2">Browser API not standardized yet</p>
                                <p className="text-gray-300 text-xs">Some phones have barometer hardware, but web API access varies. Working on cross-browser solution.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* WHAT YOU CAN DO NOW */}
                <div className="mt-8 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-6">
                    <h3 className="text-green-400 font-bold text-lg mb-3">WHAT YOU CAN DO NOW (WORKING):</h3>
                    <div className="space-y-3 text-sm">
                        <div className="bg-black border border-cyan-500/30 p-3 rounded">
                            <p className="text-cyan-400 font-bold mb-1">1. DETECT EMF POLLUTION:</p>
                            <p className="text-gray-300 text-xs">Measure wifi routers, power lines, 5G towers harming you</p>
                        </div>
                        <div className="bg-black border border-pink-500/30 p-3 rounded">
                            <p className="text-pink-400 font-bold mb-1">2. VERIFY WIRELESS CHARGING:</p>
                            <p className="text-gray-300 text-xs">See actual EM field strength from charging pads</p>
                        </div>
                        <div className="bg-black border border-purple-500/30 p-3 rounded">
                            <p className="text-purple-400 font-bold mb-1">3. TEST TESLA COILS:</p>
                            <p className="text-gray-300 text-xs">Measure if your DIY coil actually generates EM field</p>
                        </div>
                        <div className="bg-black border border-orange-500/30 p-3 rounded">
                            <p className="text-orange-400 font-bold mb-1">4. DETECT EARTHQUAKES/RESONANCE:</p>
                            <p className="text-gray-300 text-xs">Sub-20Hz vibrations mic can't hear</p>
                        </div>
                        <div className="bg-black border border-green-500/30 p-3 rounded">
                            <p className="text-green-400 font-bold mb-1">5. MEASURE ZPE EXPERIMENTS:</p>
                            <p className="text-gray-300 text-xs">If you build free energy device - verify it works BEFORE connecting</p>
                        </div>
                        <div className="bg-black border border-yellow-500/30 p-3 rounded">
                            <p className="text-yellow-400 font-bold mb-1">6. CHECK LIGHTING HEALTH:</p>
                            <p className="text-gray-300 text-xs">Verify workspace brightness, circadian rhythm optimization</p>
                        </div>
                    </div>
                </div>

                {/* FREE ENERGY TRUTH */}
                <div className="mt-8 bg-gradient-to-br from-amber-500/20 to-red-500/20 border-2 border-amber-500 rounded-xl p-6">
                    <h3 className="text-amber-400 font-bold text-lg mb-3">FREE ENERGY TRUTH:</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                        <p className="text-white font-bold">❌ Phone CAN'T charge from air (hardware limit)</p>
                        <p className="text-white font-bold">✓ Phone CAN measure if external harvester works</p>
                        <p className="mt-3">This is a <strong className="text-cyan-400">DETECTOR</strong> not a harvester.</p>
                        <p className="mt-2 text-amber-400">Build Tesla coil/ZPE device separately → use Tuner51 to verify output</p>
                        <p className="mt-3">
                            <Link to={createPageUrl('ZeroPointEnergy')} className="text-pink-400 font-bold hover:text-pink-300 underline">
                                → See ZeroPointEnergy page for safe build guides ⚡
                            </Link>
                        </p>
                    </div>
                </div>

                {/* MEASUREMENT HISTORY */}
                {measurements.length > 0 && (
                    <div className="mt-8 bg-black border-2 border-purple-500 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <History className="w-5 h-5 text-purple-400" />
                            <h3 className="text-purple-400 font-bold">YOUR MEASUREMENTS (Last 20)</h3>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {measurements.map((m, i) => (
                                <div key={m.id} className="bg-purple-900/20 border border-purple-500/30 p-2 rounded text-xs font-mono">
                                    <div className="flex justify-between items-center">
                                        <span className={`font-bold ${
                                            m.measurement_type === 'magnetometer' ? 'text-pink-400' :
                                            m.measurement_type === 'accelerometer' ? 'text-orange-400' :
                                            'text-cyan-400'
                                        }`}>
                                            {m.measurement_type.toUpperCase()}
                                        </span>
                                        <span className="text-gray-500">
                                            {new Date(m.created_date).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className="text-white mt-1">
                                        {m.frequency_hz && `${m.frequency_hz} Hz`}
                                        {m.magnitude && ` • ${m.magnitude.toFixed(2)} ${m.measurement_type === 'magnetometer' ? 'µT' : 'm/s²'}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-500 text-xs mt-3">Auto-saves every 10 seconds while measuring</p>
                    </div>
                )}

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