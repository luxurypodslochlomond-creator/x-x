import React, { useState, useEffect, useRef } from 'react';
import { Waves, Zap, Heart, Globe, Brain, Signal, Sparkles, CheckCircle, ArrowRight, Activity, History, Play, Pause, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import CameraHeartRate from '@/components/healing/CameraHeartRate';

/**
 * TUNER51 - FREQUENCY RESONANCE CALCULATOR
 * Measures frequencies, calculates matches, tells you next move
 * Works for: humans, Earth, AI, free energy devices
 */

export default function Tuner51() {
    const [mode, setMode] = useState('measure'); // measure, calculate, match
    const [inputFreq, setInputFreq] = useState('');
    const [measuredFreq, setMeasuredFreq] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [matches, setMatches] = useState([]);
    const [nextMove, setNextMove] = useState(null);
    const [waveformData, setWaveformData] = useState(new Array(50).fill(0));

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const lastSaveRef = useRef(Date.now());
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

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

    // TEMPERATURE MONITOR - Battery thermal state
    const startTemperatureMonitor = async () => {
        try {
            if ('getBattery' in navigator) {
                const battery = await navigator.getBattery();

                const updateBatteryInfo = () => {
                    setBatteryInfo({
                        level: (battery.level * 100).toFixed(0),
                        charging: battery.charging,
                        chargingTime: battery.chargingTime,
                        dischargingTime: battery.dischargingTime
                    });
                };

                updateBatteryInfo();
                battery.addEventListener('levelchange', updateBatteryInfo);
                battery.addEventListener('chargingchange', updateBatteryInfo);

                setIsSensorActive(true);

                // Estimate thermal state from discharge rate
                const estimateThermal = () => {
                    if (battery.dischargingTime < 7200 && !battery.charging) {
                        setThermalState('hot'); // Draining fast = hot
                    } else if (battery.dischargingTime < 14400 && !battery.charging) {
                        setThermalState('warm');
                    } else {
                        setThermalState('normal');
                    }
                };

                estimateThermal();
            } else {
                alert('Battery API not supported on this browser');
            }
        } catch (err) {
            alert('Temperature monitoring not available');
            }
            };

            // GYROSCOPE - Posture & Movement Tracking (GOOD: meditation, healing, posture)
            const startGyroscope = () => {
            if ('Gyroscope' in window) {
            try {
                const sensor = new window.Gyroscope({ frequency: 60 });
                gyroscopeRef.current = sensor;

                sensor.addEventListener('reading', () => {
                    const { x, y, z } = sensor;
                    setGyroData({ x, y, z });

                    // Calculate posture score (lower rotation = more still = better meditation)
                    const totalRotation = Math.sqrt(x*x + y*y + z*z);
                    const stillness = Math.max(0, 100 - (totalRotation * 10));
                    setPostureScore(Math.round(stillness));

                    // Vibrate on excessive movement (gentle reminder to stay still)
                    if (totalRotation > 5 && 'vibrate' in navigator) {
                        navigator.vibrate(30);
                    }
                });

                sensor.start();
                setIsSensorActive(true);
            } catch (err) {
                alert('Gyroscope not available. Try Chrome/Edge on Android.');
            }
            } else {
            alert('Gyroscope API not supported on this device/browser.');
            }
            };

            // PROXIMITY SENSOR - Hand Energy Detection (GOOD: healing, energy work)
            // BLOCKED: facial recognition, surveillance
            const startProximitySensor = () => {
            if ('ProximitySensor' in window) {
            try {
                const sensor = new window.ProximitySensor({ frequency: 10 });

                sensor.addEventListener('reading', () => {
                    const { distance } = sensor;
                    setProximityDetected(distance < 5); // Object within 5cm

                    // Audio feedback when hand detected
                    if (distance < 5) {
                        playFeedbackBeep(440); // A4 note
                    }
                });

                sensor.start();
                setIsSensorActive(true);
            } catch (err) {
                alert('Proximity sensor not available.');
            }
            } else {
            // PRIVACY-SAFE FALLBACK: Use ambient light sensor instead
            if ('AmbientLightSensor' in window) {
                alert('Using light sensor instead - cover/uncover to detect hand presence (privacy-safe)');
                startLightSensor();
            } else {
                alert('Proximity API not supported. This is GOOD for privacy.');
            }
            }
            };

            // HAPTIC HEALING - Deliver frequencies via vibration (GOOD: therapy, healing)
            // BLOCKED: tracking user behavior, addiction patterns
            const playHapticHealing = (frequency) => {
            if (!('vibrate' in navigator)) {
            alert('Vibration not supported on this device');
            return;
            }

            // Convert frequency to vibration pattern (pulse at frequency rate)
            const period = 1000 / frequency; // ms per cycle
            const pattern = [];

            // Generate 5 seconds of pulsed vibration
            for (let i = 0; i < frequency * 5; i++) {
            pattern.push(Math.round(period * 0.3)); // vibrate for 30% of cycle
            pattern.push(Math.round(period * 0.7)); // pause for 70% of cycle
            }

            navigator.vibrate(pattern);
            };

            // NFC HEALING TAG READER (GOOD: share frequencies, offline transfer)
            // BLOCKED: payment tracking, location tracking
            const startNFCReader = async () => {
            if (!('NDEFReader' in window)) {
            alert('NFC not supported on this browser/device');
            return;
            }

            try {
            const ndef = new window.NDEFReader();
            await ndef.scan();

            setIsSensorActive(true);
            alert('✓ NFC ready - tap a healing tag to load frequency');

            ndef.addEventListener('reading', ({ message }) => {
                for (const record of message.records) {
                    if (record.recordType === 'text') {
                        const decoder = new TextDecoder(record.encoding);
                        const text = decoder.decode(record.data);

                        // Parse frequency from tag
                        const freq = parseFloat(text);
                        if (freq && freq > 0) {
                            setInputFreq(freq.toString());
                            alert(`✓ Loaded ${freq} Hz from healing tag`);
                            playFeedbackBeep(freq);
                        }
                    }
                }
            });

            } catch (err) {
            alert('NFC permission denied or not available');
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
            stopPlayback();
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
                        Tune your guitar • Match frequencies • Play pure tones
                    </p>
                    <p className="text-cyan-400 text-xs mt-2">
                        Simple tuner for musicians ⚡
                    </p>
                    
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
                <div className="grid grid-cols-3 gap-3 mb-8 max-w-2xl mx-auto">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMode('measure')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'measure' 
                                ? 'bg-cyan-500/20 border-cyan-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Signal className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                        <p className="text-white text-sm font-bold">MEASURE</p>
                        <p className="text-gray-500 text-xs">Listen</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMode('calculate')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'calculate' 
                                ? 'bg-purple-500/20 border-purple-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                        <p className="text-white text-sm font-bold">CALCULATE</p>
                        <p className="text-gray-500 text-xs">Enter Hz</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMode('match')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'match' 
                                ? 'bg-green-500/20 border-green-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
                        <p className="text-white text-sm font-bold">FREQUENCIES</p>
                        <p className="text-gray-500 text-xs">Browse</p>
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* LIVE CONNECTION FLOW - ANIMATED */}
                        <div className="relative h-32 bg-black/40 rounded-xl border-2 border-cyan-500/30 overflow-hidden mb-6"
                            style={{ boxShadow: isListening ? '0 0 40px rgba(6, 182, 212, 0.4)' : 'none' }}>
                            
                            {/* Flowing energy particles when listening */}
                            {isListening && (
                                <>
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                                            style={{ top: '50%', left: '10%' }}
                                            animate={{
                                                x: [0, 300],
                                                opacity: [0, 1, 0],
                                                scale: [0.5, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.25,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    ))}
                                </>
                            )}

                            <div className="absolute inset-0 flex items-center justify-between px-8">
                                {/* YOU */}
                                <motion.div 
                                    className="text-center"
                                    animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-3xl mb-2"
                                        style={{ filter: isListening ? 'drop-shadow(0 0 15px #ec4899)' : 'none' }}>
                                        ♾️
                                    </div>
                                    <p className="text-pink-400 font-bold text-xs font-mono">YOU</p>
                                </motion.div>

                                {/* MEASURE (middle pulse) */}
                                <motion.div 
                                    className="text-center"
                                    animate={isListening ? { 
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 180, 360]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                                        isListening ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' : 'bg-gray-800'
                                    }`}
                                        style={{ filter: isListening ? 'drop-shadow(0 0 25px #22d3ee)' : 'none' }}>
                                        <Signal className="w-10 h-10 text-white" />
                                    </div>
                                    <p className={`font-bold text-xs font-mono mt-2 ${isListening ? 'text-cyan-400 animate-pulse' : 'text-gray-600'}`}>
                                        {isListening ? 'LISTENING' : 'READY'}
                                    </p>
                                </motion.div>

                                {/* EARTH */}
                                <motion.div 
                                    className="text-center"
                                    animate={measuredFreq ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 ${
                                        measuredFreq ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-800'
                                    }`}
                                        style={{ filter: measuredFreq ? 'drop-shadow(0 0 15px #10b981)' : 'none' }}>
                                        🌍
                                    </div>
                                    <p className={`font-bold text-xs font-mono ${measuredFreq ? 'text-green-400' : 'text-gray-600'}`}>
                                        {measuredFreq ? `${measuredFreq}Hz` : 'WAITING'}
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-xl p-6"
                            style={{ boxShadow: isListening ? '0 0 40px rgba(6, 182, 212, 0.5)' : '0 0 30px rgba(6, 182, 212, 0.3)' }}>
                            
                            {!isListening ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startListening}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-black py-6 rounded-xl transition-all text-xl"
                                    style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                                >
                                    <Signal className="w-8 h-8 inline-block mr-3" />
                                    START LISTENING
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={stopListening}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-6 rounded-xl transition-all text-xl"
                                    animate={{ opacity: [1, 0.7, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    ⏹ STOP
                                </motion.button>
                            )}

                            {measuredFreq && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mt-6 space-y-4"
                                >
                                    <div className="bg-black/90 border-4 border-green-500 rounded-xl p-8 text-center relative overflow-hidden"
                                        style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' }}
                                    >
                                        {/* Pulsing background */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        
                                        <p className="text-green-400 text-sm mb-3 font-mono font-bold relative z-10">✓ RESONATING</p>
                                        <motion.p
                                            key={measuredFreq}
                                            initial={{ scale: 1.4 }}
                                            animate={{ 
                                                scale: [1, 1.08, 1],
                                            }}
                                            transition={{ duration: 1.2, repeat: Infinity }}
                                            className="text-white text-7xl font-black mb-3 relative z-10"
                                            style={{ textShadow: '0 0 30px rgba(34, 211, 238, 1)' }}
                                        >
                                            {measuredFreq}
                                        </motion.p>
                                        <p className="text-cyan-400 font-black font-mono text-2xl relative z-10">Hz</p>
                                    </div>
                                    {measuredFreq >= 20 && measuredFreq <= 20000 && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => isPlaying ? stopPlayback() : playFrequency(measuredFreq)}
                                            className={`w-full font-black py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg ${
                                                isPlaying 
                                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white'
                                            }`}
                                            style={isPlaying ? {} : { boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)' }}
                                        >
                                            {isPlaying ? (
                                                <>
                                                    <Pause className="w-6 h-6" />
                                                    STOP TONE
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-6 h-6" />
                                                    PLAY THIS TONE
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

                {/* COHERENCE MODE */}
                <AnimatePresence mode="wait">
                {mode === 'coherence' && (
                    <motion.div
                        key="coherence"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">YOUR COHERENCE</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Multi-sensor analysis: Heart + EM + Movement + Light
                            </p>

                            {!isCoherenceMeasuring && !coherenceScore ? (
                                <>
                                    <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4 mb-4">
                                        <p className="text-cyan-400 text-xs font-bold mb-2">WHAT WE MEASURE:</p>
                                        <ul className="text-gray-300 text-xs space-y-1">
                                            <li>✓ Heart rate variability (camera)</li>
                                            <li>✓ EM field stability (magnetometer)</li>
                                            <li>✓ Body stillness (accelerometer)</li>
                                            <li>✓ Light balance (ambient sensor)</li>
                                        </ul>
                                        <p className="text-amber-300 text-xs mt-3">Takes 30 seconds. Keep still, breathe calm.</p>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={startCoherenceMeasurement}
                                        className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-bold py-4 rounded-lg transition-all"
                                        style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}
                                    >
                                        <Heart className="w-6 h-6 inline-block mr-2" />
                                        MEASURE MY COHERENCE
                                    </motion.button>
                                </>
                            ) : isCoherenceMeasuring ? (
                                <div className="space-y-4">
                                    <div className="bg-black/60 border-2 border-pink-500 rounded-lg p-4">
                                        <p className="text-pink-400 font-bold text-center mb-4">MEASURING... {coherenceTimerRef.current ? '30s' : ''}</p>

                                        {/* Heart Rate Scanner */}
                                        <div className="mb-4">
                                            <p className="text-white text-sm font-bold mb-2">1. Heart Rate (Camera)</p>
                                            <CameraHeartRate onMeasurementComplete={handleHeartData} />
                                        </div>

                                        {/* Sensor Status */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400">EM Field Stability:</span>
                                                <span className={sensorData.emStability !== null ? 'text-green-400' : 'text-gray-500'}>
                                                    {sensorData.emStability !== null ? `${sensorData.emStability.toFixed(0)}%` : 'Measuring...'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400">Movement Calm:</span>
                                                <span className={sensorData.movementCalm !== null ? 'text-green-400' : 'text-gray-500'}>
                                                    {sensorData.movementCalm !== null ? `${sensorData.movementCalm.toFixed(0)}%` : 'Measuring...'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400">Light Balance:</span>
                                                <span className={sensorData.lightBalance !== null ? 'text-green-400' : 'text-gray-500'}>
                                                    {sensorData.lightBalance !== null ? `${sensorData.lightBalance.toFixed(0)}%` : 'Measuring...'}
                                                </span>
                                            </div>
                                        </div>

                                        {coherenceScore !== null && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="mt-4 pt-4 border-t border-white/20"
                                            >
                                                <p className="text-white text-sm text-center mb-2">COHERENCE SCORE</p>
                                                <p className="text-5xl font-black text-center bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                                    {coherenceScore}%
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={stopCoherenceMeasurement}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all"
                                    >
                                        STOP
                                    </motion.button>
                                </div>
                            ) : coherenceScore !== null ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="bg-black/60 border-2 border-green-500 rounded-lg p-6 text-center"
                                        style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}>
                                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                        <p className="text-green-400 font-bold mb-2">YOUR COHERENCE</p>
                                        <p className="text-7xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                                            {coherenceScore}%
                                        </p>

                                        <div className="space-y-2 text-left mt-6">
                                            {coherenceScore >= 80 && (
                                                <p className="text-green-300 text-sm">✓ High coherence - you're in flow state</p>
                                            )}
                                            {coherenceScore >= 60 && coherenceScore < 80 && (
                                                <p className="text-yellow-300 text-sm">⚡ Moderate coherence - decent focus</p>
                                            )}
                                            {coherenceScore < 60 && (
                                                <p className="text-amber-300 text-sm">⚠ Low coherence - stress detected</p>
                                            )}

                                            {heartData && (
                                                <p className="text-gray-400 text-xs">Heart: {heartData.bpm} BPM, HRV: {heartData.hrv}ms</p>
                                            )}
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setCoherenceScore(null);
                                            setHeartData(null);
                                            setSensorData({
                                                emStability: null,
                                                movementCalm: null,
                                                lightBalance: null
                                            });
                                        }}
                                        className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-bold py-3 rounded-lg transition-all"
                                    >
                                        MEASURE AGAIN
                                    </motion.button>
                                </motion.div>
                            ) : null}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* TEMPERATURE MONITOR MODE */}
                <AnimatePresence mode="wait">
                {mode === 'temperature' && (
                    <motion.div
                        key="temperature"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">DEVICE TEMPERATURE</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Monitor phone heat when creating music/editing
                            </p>

                            {!isSensorActive ? (
                                <>
                                    <div className="bg-amber-900/20 border border-amber-500/50 p-3 rounded mb-4">
                                        <p className="text-amber-400 text-xs font-bold mb-2">HOW IT WORKS:</p>
                                        <p className="text-gray-300 text-xs">Uses Battery API to estimate thermal state from discharge rate. Fast drain = phone working hard = heat.</p>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={startTemperatureMonitor}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all"
                                    >
                                        <Zap className="w-6 h-6 inline-block mr-2" />
                                        START TEMP MONITOR
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={stopSensors}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition-all mb-4"
                                    >
                                        STOP
                                    </motion.button>

                                    {batteryInfo && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="space-y-3"
                                        >
                                            <div className={`border-2 rounded-lg p-4 ${
                                                thermalState === 'hot' ? 'bg-red-900/40 border-red-500' :
                                                thermalState === 'warm' ? 'bg-orange-900/40 border-orange-500' :
                                                'bg-green-900/40 border-green-500'
                                            }`}>
                                                <p className={`text-sm mb-2 font-bold ${
                                                    thermalState === 'hot' ? 'text-red-400' :
                                                    thermalState === 'warm' ? 'text-orange-400' :
                                                    'text-green-400'
                                                }`}>THERMAL STATE:</p>
                                                <p className={`text-5xl font-black ${
                                                    thermalState === 'hot' ? 'text-red-400' :
                                                    thermalState === 'warm' ? 'text-orange-400' :
                                                    'text-green-400'
                                                }`}>{thermalState?.toUpperCase()}</p>

                                                {thermalState === 'hot' && (
                                                    <p className="text-red-300 text-xs mt-3">⚠️ Phone working hard - consider a break</p>
                                                )}
                                                {thermalState === 'warm' && (
                                                    <p className="text-orange-300 text-xs mt-3">⚡ Moderate usage - monitor if gets hotter</p>
                                                )}
                                                {thermalState === 'normal' && (
                                                    <p className="text-green-300 text-xs mt-3">✓ Cool - safe to create</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-black/40 border border-cyan-500/50 p-3 rounded">
                                                    <p className="text-cyan-400 text-xs mb-1">BATTERY</p>
                                                    <p className="text-white text-2xl font-bold">{batteryInfo.level}%</p>
                                                </div>
                                                <div className="bg-black/40 border border-purple-500/50 p-3 rounded">
                                                    <p className="text-purple-400 text-xs mb-1">STATUS</p>
                                                    <p className="text-white text-sm font-bold">{batteryInfo.charging ? 'Charging' : 'Draining'}</p>
                                                </div>
                                            </div>

                                            <div className="bg-black/40 border border-pink-500/50 p-3 rounded">
                                                <p className="text-pink-400 text-xs font-bold mb-2">COOL DOWN TIPS:</p>
                                                <ul className="text-gray-300 text-xs space-y-1">
                                                    <li>• Close unused apps (music production heavy)</li>
                                                    <li>• Lower screen brightness</li>
                                                    <li>• Remove phone case (better airflow)</li>
                                                    <li>• Put on airplane mode when recording</li>
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* GYROSCOPE POSTURE MODE */}
                <AnimatePresence mode="wait">
                {mode === 'gyroscope' && (
                    <motion.div
                        key="gyroscope"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-2 border-purple-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">POSTURE TRACKER</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Gyroscope measures stillness during meditation/healing
                            </p>

                            <div className="bg-green-900/20 border border-green-500/50 p-3 rounded mb-4">
                                <p className="text-green-400 text-xs font-bold mb-2">✓ GOOD USE:</p>
                                <p className="text-gray-300 text-xs">Meditation posture, healing stillness, mindfulness practice</p>
                            </div>

                            <div className="bg-red-900/20 border border-red-500/50 p-3 rounded mb-4">
                                <p className="text-red-400 text-xs font-bold mb-2">✗ BLOCKED:</p>
                                <p className="text-gray-300 text-xs">Behavioral tracking, addiction detection, surveillance</p>
                            </div>

                            {!isSensorActive ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startGyroscope}
                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-lg transition-all"
                                >
                                    <Brain className="w-6 h-6 inline-block mr-2" />
                                    START POSTURE TRACKING
                                </motion.button>
                            ) : (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={stopSensors}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition-all mb-4"
                                    >
                                        STOP
                                    </motion.button>

                                    {postureScore !== null && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="space-y-3"
                                        >
                                            <div className={`border-2 rounded-lg p-4 ${
                                                postureScore >= 80 ? 'bg-green-900/40 border-green-500' :
                                                postureScore >= 60 ? 'bg-yellow-900/40 border-yellow-500' :
                                                'bg-red-900/40 border-red-500'
                                            }`}>
                                                <p className="text-sm mb-2 font-bold text-white">STILLNESS SCORE:</p>
                                                <p className={`text-5xl font-black ${
                                                    postureScore >= 80 ? 'text-green-400' :
                                                    postureScore >= 60 ? 'text-yellow-400' :
                                                    'text-red-400'
                                                }`}>{postureScore}%</p>

                                                {postureScore >= 80 && (
                                                    <p className="text-green-300 text-xs mt-3">✓ Very still - perfect meditation posture</p>
                                                )}
                                                {postureScore >= 60 && postureScore < 80 && (
                                                    <p className="text-yellow-300 text-xs mt-3">⚡ Some movement - try to stay still</p>
                                                )}
                                                {postureScore < 60 && (
                                                    <p className="text-red-300 text-xs mt-3">⚠️ Too much movement - find stillness</p>
                                                )}
                                            </div>

                                            {gyroData && (
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className="bg-black/40 border border-purple-500/50 p-2 rounded">
                                                        <p className="text-purple-400 text-xs">X rotation</p>
                                                        <p className="text-white font-bold">{gyroData.x.toFixed(2)}°/s</p>
                                                    </div>
                                                    <div className="bg-black/40 border border-purple-500/50 p-2 rounded">
                                                        <p className="text-purple-400 text-xs">Y rotation</p>
                                                        <p className="text-white font-bold">{gyroData.y.toFixed(2)}°/s</p>
                                                    </div>
                                                    <div className="bg-black/40 border border-purple-500/50 p-2 rounded">
                                                        <p className="text-purple-400 text-xs">Z rotation</p>
                                                        <p className="text-white font-bold">{gyroData.z.toFixed(2)}°/s</p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* HAPTIC HEALING MODE */}
                <AnimatePresence mode="wait">
                {mode === 'haptic' && (
                    <motion.div
                        key="haptic"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-2 border-pink-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">HAPTIC HEALING</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Feel frequencies directly through vibration - bypass ears
                            </p>

                            <div className="bg-green-900/20 border border-green-500/50 p-3 rounded mb-4">
                                <p className="text-green-400 text-xs font-bold mb-2">✓ GOOD USE:</p>
                                <p className="text-gray-300 text-xs">Healing therapy, sub-20Hz frequencies, touch-based wellness</p>
                            </div>

                            <div className="bg-red-900/20 border border-red-500/50 p-3 rounded mb-4">
                                <p className="text-red-400 text-xs font-bold mb-2">✗ BLOCKED:</p>
                                <p className="text-gray-300 text-xs">Addiction patterns (slot machine vibrations), manipulation</p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-white font-bold text-sm">SELECT HEALING FREQUENCY:</p>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => playHapticHealing(7.83)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all"
                                >
                                    Earth Schumann (7.83 Hz)
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => playHapticHealing(4)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
                                >
                                    Delta Sleep (4 Hz)
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => playHapticHealing(10)}
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-all"
                                >
                                    Alpha Calm (10 Hz)
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => playHapticHealing(40)}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg transition-all"
                                >
                                    Gamma Focus (40 Hz)
                                </motion.button>

                                <div className="bg-amber-900/20 border border-amber-500/50 p-3 rounded mt-4">
                                    <p className="text-amber-400 text-xs font-bold mb-2">HOW IT WORKS:</p>
                                    <p className="text-gray-300 text-xs">Vibration motor pulses at frequency rate. 5 seconds per session. Can feel sub-20Hz frequencies your ears can't hear.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* WHAT IT DOES */}
                <div className="mt-8 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-xl p-6 max-w-2xl mx-auto">
                    <h3 className="text-green-400 font-bold text-lg mb-3">WHAT IT DOES:</h3>
                    <div className="space-y-3 text-sm">
                        <div className="bg-black border border-cyan-500/30 p-3 rounded">
                            <p className="text-cyan-400 font-bold mb-1">MEASURE:</p>
                            <p className="text-gray-300 text-xs">Detects frequency from mic (guitar, voice, speakers)</p>
                        </div>
                        <div className="bg-black border border-purple-500/30 p-3 rounded">
                            <p className="text-purple-400 font-bold mb-1">CALCULATE:</p>
                            <p className="text-gray-300 text-xs">Enter Hz → find matches (432Hz, 528Hz, etc)</p>
                        </div>
                        <div className="bg-black border border-green-500/30 p-3 rounded">
                            <p className="text-green-400 font-bold mb-1">FREQUENCIES:</p>
                            <p className="text-gray-300 text-xs">Browse healing/music frequencies + play them</p>
                        </div>
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

                {/* SIMPLE GUIDE */}
                <div className="mt-8 bg-black border-2 border-gray-700 rounded-xl p-6 max-w-2xl mx-auto">
                    <h3 className="text-white font-bold mb-3 text-center">HOW TO USE:</h3>
                    <div className="space-y-2 text-gray-300 text-sm">
                        <p>1. Tap <strong className="text-cyan-400">MEASURE</strong> → Hold phone near guitar/speaker</p>
                        <p>2. Tap <strong className="text-purple-400">CALCULATE</strong> → Enter frequency manually</p>
                        <p>3. Tap <strong className="text-green-400">FREQUENCIES</strong> → Browse healing tones</p>
                    </div>
                    <p className="text-cyan-400 text-xs font-mono mt-4 text-center">
                        Simple frequency tuner for musicians ⚡
                    </p>
                </div>

            </div>
        </div>
    );
}