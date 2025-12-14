import React, { useState, useEffect, useRef } from 'react';
import { Waves, Zap, Heart, Globe, Brain, Signal, Sparkles, CheckCircle, ArrowRight, Activity, History, Play, Pause, Info, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import CameraHeartRate from '@/components/healing/CameraHeartRate';

/**
 * EARTH51 - MEASURE EARTH'S FREQUENCY
 * Connect to Schumann resonance, detect EM fields, measure coherence
 * For: healing, grounding, Earth connection, free energy devices
 */

export default function Earth51() {
    const [mode, setMode] = useState('schumann'); // schumann, magnetometer, accelerometer, coherence
    const [inputFreq, setInputFreq] = useState('');
    const [measuredFreq, setMeasuredFreq] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [matches, setMatches] = useState([]);
    const [nextMove, setNextMove] = useState(null);
    const [waveformData, setWaveformData] = useState(new Array(50).fill(0));
    const [expandedSection, setExpandedSection] = useState(null);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const lastSaveRef = useRef(Date.now());
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Sensor states
    const [isSensorActive, setIsSensorActive] = useState(false);
    const [magneticField, setMagneticField] = useState(null);
    const [acceleration, setAcceleration] = useState(null);
    const [ambientLight, setAmbientLight] = useState(null);
    const [batteryInfo, setBatteryInfo] = useState(null);
    const [thermalState, setThermalState] = useState('normal');
    const [gyroData, setGyroData] = useState(null);
    const [postureScore, setPostureScore] = useState(null);
    const gyroscopeRef = useRef(null);
    const magnetometerRef = useRef(null);
    const accelerometerRef = useRef(null);

    // Coherence measurement
    const [isCoherenceMeasuring, setIsCoherenceMeasuring] = useState(false);
    const [coherenceScore, setCoherenceScore] = useState(null);
    const [heartData, setHeartData] = useState(null);
    const [sensorData, setSensorData] = useState({
        emStability: null,
        movementCalm: null,
        lightBalance: null
    });
    const coherenceTimerRef = useRef(null);

    // Fetch measurement history
    const { data: measurements = [] } = useQuery({
        queryKey: ['earth-measurements'],
        queryFn: () => base44.entities.TunerMeasurement.list('-created_date', 20)
    });

    // EARTH & HEALING FREQUENCIES
    const frequencies = {
        earth: { hz: 7.83, name: "Earth Schumann", type: "grounding", color: "green" },
        love: { hz: 528, name: "Love Frequency", type: "healing", color: "pink" },
        dna: { hz: 528, name: "DNA Repair", type: "healing", color: "cyan" },
        calm: { hz: 432, name: "Universal Calm", type: "healing", color: "purple" },
        focus: { hz: 40, name: "Gamma Focus", type: "brain", color: "yellow" },
        sleep: { hz: 4, name: "Delta Sleep", type: "brain", color: "blue" },
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

    // AUTO-SAVE MEASUREMENT (throttled)
    const saveMeasurement = async (type, data) => {
        const now = Date.now();
        if (now - lastSaveRef.current < 10000) return;
        
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

    // MAGNETOMETER - Earth's EM field
    const startMagnetometer = () => {
        if ('Magnetometer' in window) {
            try {
                const sensor = new window.Magnetometer({ frequency: 10 });
                magnetometerRef.current = sensor;

                sensor.addEventListener('reading', () => {
                    const { x, y, z } = sensor;
                    const magnitude = Math.sqrt(x*x + y*y + z*z);
                    setMagneticField({ x, y, z, magnitude });

                    // Audio feedback
                    playFeedbackBeep(200 + magnitude * 5);

                    // Vibrate on strong field
                    if (magnitude > 100 && 'vibrate' in navigator) {
                        navigator.vibrate(50);
                    }

                    saveMeasurement('magnetometer', { magnitude, x, y, z });
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

    // ACCELEROMETER - Earth vibrations
    const startAccelerometer = () => {
        if ('Accelerometer' in window) {
            try {
                const sensor = new window.Accelerometer({ frequency: 60 });
                accelerometerRef.current = sensor;

                sensor.addEventListener('reading', () => {
                    const { x, y, z } = sensor;
                    const magnitude = Math.sqrt(x*x + y*y + z*z);
                    setAcceleration({ x, y, z, magnitude });

                    // Visual feedback
                    if (magnitude > 12) {
                        document.body.style.backgroundColor = 'rgba(249, 115, 22, 0.2)';
                        setTimeout(() => {
                            document.body.style.backgroundColor = '';
                        }, 100);
                    }

                    // Audio feedback
                    if (magnitude > 11) {
                        playFeedbackBeep(440);
                    }

                    // Vibrate pattern
                    if (magnitude > 12 && 'vibrate' in navigator) {
                        navigator.vibrate([50, 50, 50]);
                    }

                    saveMeasurement('accelerometer', { magnitude, x, y, z });
                });

                sensor.start();
                setIsSensorActive(true);
            } catch (err) {
                alert('Accelerometer not available.');
            }
        } else {
            alert('Accelerometer API not supported on this device/browser.');
        }
    };

    // STOP ALL SENSORS
    const stopSensors = () => {
        setIsSensorActive(false);
        if (magnetometerRef.current) magnetometerRef.current.stop();
        if (accelerometerRef.current) accelerometerRef.current.stop();
        if (gyroscopeRef.current) gyroscopeRef.current.stop();
        setMagneticField(null);
        setAcceleration(null);
        setGyroData(null);
        setPostureScore(null);
    };

    // COHERENCE MEASUREMENT
    const startCoherenceMeasurement = () => {
        setIsCoherenceMeasuring(true);
        setCoherenceScore(null);
        setHeartData(null);
        setSensorData({
            emStability: null,
            movementCalm: null,
            lightBalance: null
        });

        // Start all sensors for 30s
        startMagnetometer();
        startAccelerometer();

        coherenceTimerRef.current = setTimeout(() => {
            calculateCoherence();
        }, 30000);
    };

    const stopCoherenceMeasurement = () => {
        setIsCoherenceMeasuring(false);
        if (coherenceTimerRef.current) {
            clearTimeout(coherenceTimerRef.current);
        }
        stopSensors();
    };

    const handleHeartData = (data) => {
        setHeartData(data);
    };

    const calculateCoherence = () => {
        // Calculate coherence score from all sensors
        const scores = [];

        if (heartData) {
            const hrvScore = Math.min(100, (heartData.hrv / 100) * 100);
            scores.push(hrvScore);
        }

        if (sensorData.emStability !== null) scores.push(sensorData.emStability);
        if (sensorData.movementCalm !== null) scores.push(sensorData.movementCalm);
        if (sensorData.lightBalance !== null) scores.push(sensorData.lightBalance);

        const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        setCoherenceScore(avgScore);
        setIsCoherenceMeasuring(false);
        stopSensors();
    };

    useEffect(() => {
        if (magneticField && isCoherenceMeasuring) {
            const stability = Math.max(0, 100 - Math.abs(magneticField.magnitude - 50));
            setSensorData(prev => ({ ...prev, emStability: stability }));
        }
    }, [magneticField, isCoherenceMeasuring]);

    useEffect(() => {
        if (acceleration && isCoherenceMeasuring) {
            const calm = Math.max(0, 100 - Math.abs(acceleration.magnitude - 9.81) * 10);
            setSensorData(prev => ({ ...prev, movementCalm: calm }));
        }
    }, [acceleration, isCoherenceMeasuring]);

    // AUDIO FEEDBACK
    const playFeedbackBeep = (freq) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.frequency.value = freq;
        gain.gain.value = 0.1;
        osc.start();
        osc.stop(audioContextRef.current.currentTime + 0.1);
    };

    // PLAY FREQUENCY
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

    // CLEANUP
    useEffect(() => {
        return () => {
            stopListening();
            stopPlayback();
            stopSensors();
        };
    }, []);

    useEffect(() => {
        document.title = "Earth51 - Measure Earth's Frequency | UF51";
    }, []);

    const colorMap = {
        green: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500', text: 'text-green-400', desc: 'text-green-300', bgSolid: 'bg-green-500/10' },
        pink: { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500', text: 'text-pink-400', desc: 'text-pink-300', bgSolid: 'bg-pink-500/10' },
        cyan: { bg: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500', text: 'text-cyan-400', desc: 'text-cyan-300', bgSolid: 'bg-cyan-500/10' },
        purple: { bg: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-500', text: 'text-purple-400', desc: 'text-purple-300', bgSolid: 'bg-purple-500/10' },
        yellow: { bg: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500', text: 'text-yellow-400', desc: 'text-yellow-300', bgSolid: 'bg-yellow-500/10' },
        blue: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500', text: 'text-blue-400', desc: 'text-blue-300', bgSolid: 'bg-blue-500/10' },
        gray: { bg: 'from-gray-500/20 to-slate-500/20', border: 'border-gray-500', text: 'text-gray-400', desc: 'text-gray-300', bgSolid: 'bg-gray-500/10' },
        orange: { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500', text: 'text-orange-400', desc: 'text-orange-300', bgSolid: 'bg-orange-500/10' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-4 md:p-8">
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
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Globe className="w-12 h-12 text-green-400" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-white">EARTH51</h1>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Heart className="w-12 h-12 text-pink-400" />
                        </motion.div>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base font-mono mb-2">
                        Measure Earth's frequency • Connect to Schumann resonance • Detect EM fields
                    </p>
                    <p className="text-green-400 text-xs">
                        Ground yourself in Earth's healing rhythm 🌍
                    </p>
                    
                    {/* CONNECTION ANIMATION */}
                    <div className="mt-6 relative h-20">
                        <svg className="w-full h-full" viewBox="0 0 400 80">
                            <motion.path
                                d="M 50,40 Q 100,10 200,40 T 350,40"
                                fill="none"
                                stroke="rgba(34, 197, 94, 0.5)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.circle cx="50" cy="40" r="6" fill="#10b981" 
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.circle cx="200" cy="40" r="6" fill="#22c55e"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.circle cx="350" cy="40" r="6" fill="#4ade80"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex justify-between items-center px-8 text-xs font-bold">
                            <span className="text-green-400">YOU</span>
                            <span className="text-green-400">7.83Hz</span>
                            <span className="text-green-400">EARTH</span>
                        </div>
                    </div>
                </motion.div>

                {/* MODE SELECTOR */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMode('schumann')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'schumann' 
                                ? 'bg-green-500/20 border-green-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Waves className="w-6 h-6 mx-auto mb-2 text-green-400" />
                        <p className="text-white text-sm font-bold">SCHUMANN</p>
                        <p className="text-gray-500 text-xs">7.83 Hz</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMode('magnetometer')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'magnetometer' 
                                ? 'bg-pink-500/20 border-pink-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Zap className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                        <p className="text-white text-sm font-bold">EM FIELD</p>
                        <p className="text-gray-500 text-xs">Magnetic</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMode('accelerometer')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'accelerometer' 
                                ? 'bg-orange-500/20 border-orange-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Activity className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                        <p className="text-white text-sm font-bold">VIBRATION</p>
                        <p className="text-gray-500 text-xs">Earth moves</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMode('coherence')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'coherence' 
                                ? 'bg-cyan-500/20 border-cyan-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Heart className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                        <p className="text-white text-sm font-bold">COHERENCE</p>
                        <p className="text-gray-500 text-xs">You + Earth</p>
                    </motion.button>
                </div>

                {/* SCHUMANN MODE */}
                <AnimatePresence mode="wait">
                {mode === 'schumann' && (
                    <motion.div
                        key="schumann"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">EARTH'S HEARTBEAT</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Measure 7.83 Hz Schumann resonance - Earth's natural frequency
                            </p>

                            {/* EXPANDABLE PHYSICS EXPLANATION */}
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'schumann' ? null : 'schumann')}
                                className="w-full bg-black/60 border-2 border-green-500/50 rounded-lg p-4 mb-4 text-left hover:border-green-500 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-green-400 text-xs font-bold">THE INVISIBLE SOUND YOU CAN'T HEAR</p>
                                    {expandedSection === 'schumann' ? (
                                        <ChevronUp className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-green-400" />
                                    )}
                                </div>
                                
                                <AnimatePresence>
                                    {expandedSection === 'schumann' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 space-y-3"
                                        >
                                            <div className="bg-green-900/20 border-l-4 border-green-400 p-3 rounded">
                                                <p className="text-green-400 text-xs font-bold mb-2">🌍 THE PHYSICS:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    Earth = giant resonant cavity between ground + ionosphere (60km up). Lightning strikes = 100 per second globally = electromagnetic waves bounce around planet at speed of light.
                                                </p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    <strong className="text-white">Math → Physics:</strong> c/2πr where c=speed of light, r=Earth radius = 7.83 Hz. That's Earth's natural vibration frequency.
                                                </p>
                                            </div>

                                            <div className="bg-cyan-900/20 border-l-4 border-cyan-400 p-3 rounded">
                                                <p className="text-cyan-400 text-xs font-bold mb-2">🧠 WHY YOU FEEL IT:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    Your brain's alpha waves = 8-12 Hz (relaxation, creativity). Schumann = 7.83 Hz. When you're grounded (barefoot on Earth), your brain synchronizes with Earth's frequency = instant calm.
                                                </p>
                                            </div>

                                            <div className="bg-pink-900/20 border-l-4 border-pink-400 p-3 rounded">
                                                <p className="text-pink-400 text-xs font-bold mb-2">👂 THE INVISIBLE SOUND:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    7.83 Hz = 20x LOWER than human hearing (20 Hz minimum). You can't hear it but your body FEELS it through electromagnetic resonance.
                                                </p>
                                                <p className="text-amber-300 text-xs">
                                                    Astronauts in space get sick because they lose this frequency. NASA now uses Schumann generators on space stations.
                                                </p>
                                            </div>

                                            <div className="bg-purple-900/20 border-l-4 border-purple-400 p-3 rounded">
                                                <p className="text-purple-400 text-xs font-bold mb-2">⚡ HOW TO MEASURE:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    Mic can detect 20+ Hz. Use coil antenna + amplifier for sub-20 Hz. Or measure harmonics: 14.3 Hz, 20.8 Hz, 27.3 Hz (2nd, 3rd, 4th overtones).
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {!isListening ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={startListening}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-black py-6 rounded-xl transition-all text-xl"
                                    style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
                                >
                                    <Signal className="w-8 h-8 inline-block mr-3" />
                                    LISTEN FOR 7.83 Hz
                                </motion.button>
                            ) : (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={stopListening}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-6 rounded-xl transition-all text-xl mb-4"
                                        animate={{ opacity: [1, 0.7, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        ⏹ STOP LISTENING
                                    </motion.button>

                                    {measuredFreq && (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="mt-6 space-y-4"
                                        >
                                            <div className="bg-black/90 border-4 border-green-500 rounded-xl p-8 text-center relative overflow-hidden"
                                                style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)' }}
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20"
                                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                                
                                                <p className="text-green-400 text-sm mb-3 font-mono font-bold relative z-10">DETECTED FREQUENCY</p>
                                                <motion.p
                                                    key={measuredFreq}
                                                    initial={{ scale: 1.4 }}
                                                    animate={{ scale: [1, 1.08, 1] }}
                                                    transition={{ duration: 1.2, repeat: Infinity }}
                                                    className="text-white text-7xl font-black mb-3 relative z-10"
                                                    style={{ textShadow: '0 0 30px rgba(34, 197, 94, 1)' }}
                                                >
                                                    {measuredFreq}
                                                </motion.p>
                                                <p className="text-green-400 font-black font-mono text-2xl relative z-10">Hz</p>
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
                                </>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* MAGNETOMETER MODE */}
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
                            <h2 className="text-xl font-black text-white mb-2">ELECTROMAGNETIC FIELD</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Detect Earth's magnetic field, EM devices, wireless charging
                            </p>

                            {/* EXPANDABLE EM PHYSICS */}
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'magnetometer' ? null : 'magnetometer')}
                                className="w-full bg-black/60 border-2 border-pink-500/50 rounded-lg p-4 mb-4 text-left hover:border-pink-500 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-pink-400 text-xs font-bold">SEE THE INVISIBLE FORCE FIELD</p>
                                    {expandedSection === 'magnetometer' ? (
                                        <ChevronUp className="w-5 h-5 text-pink-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-pink-400" />
                                    )}
                                </div>
                                
                                <AnimatePresence>
                                    {expandedSection === 'magnetometer' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 space-y-3"
                                        >
                                            <div className="bg-pink-900/20 border-l-4 border-pink-400 p-3 rounded">
                                                <p className="text-pink-400 text-xs font-bold mb-2">🧲 THE PHYSICS:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    Earth = giant magnet. Iron core spinning = electric currents = magnetic field (25-65 µT at surface). This field protects us from solar radiation.
                                                </p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    <strong className="text-white">Math → Physics:</strong> Magnetic field strength B (Tesla). 1 Tesla = 1 Newton per Ampere-meter. Earth = 25-65 microTesla (µT).
                                                </p>
                                            </div>

                                            <div className="bg-cyan-900/20 border-l-4 border-cyan-400 p-3 rounded">
                                                <p className="text-cyan-400 text-xs font-bold mb-2">👁️ WHAT YOU'RE DETECTING:</p>
                                                <ul className="text-gray-300 text-xs space-y-1">
                                                    <li><strong className="text-white">Earth baseline:</strong> 25-65 µT (varies by location)</li>
                                                    <li><strong className="text-white">Wireless chargers:</strong> 100-300 µT (close range)</li>
                                                    <li><strong className="text-white">Power lines:</strong> 10-100 µT (under lines)</li>
                                                    <li><strong className="text-white">Magnets:</strong> 1,000-10,000 µT (permanent magnets)</li>
                                                </ul>
                                            </div>

                                            <div className="bg-green-900/20 border-l-4 border-green-400 p-3 rounded">
                                                <p className="text-green-400 text-xs font-bold mb-2">🐦 ANIMALS CAN SEE THIS:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    Birds, sea turtles, salmon navigate using Earth's magnetic field. Cryptochrome proteins in their eyes = biological magnetometer. You're doing what birds do naturally.
                                                </p>
                                            </div>

                                            <div className="bg-purple-900/20 border-l-4 border-purple-400 p-3 rounded">
                                                <p className="text-purple-400 text-xs font-bold mb-2">⚡ FREE ENERGY DETECTION:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    Strong changing magnetic fields = induced current (Faraday's law). That's how wireless charging works. Measure field strength to verify energy transfer efficiency.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                            
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
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={stopSensors}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all mb-4"
                                    >
                                        STOP
                                    </motion.button>

                                    {magneticField && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="mt-4 space-y-3"
                                        >
                                            <div className="bg-black/60 border-2 border-pink-500 rounded-lg p-4">
                                                <p className="text-pink-400 text-sm mb-2">FIELD STRENGTH:</p>
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
                                </>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* ACCELEROMETER MODE */}
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
                            <h2 className="text-xl font-black text-white mb-2">EARTH VIBRATIONS</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Detect sub-20Hz vibrations, earthquakes, building resonance
                            </p>

                            {/* EXPANDABLE VIBRATION PHYSICS */}
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'accelerometer' ? null : 'accelerometer')}
                                className="w-full bg-black/60 border-2 border-orange-500/50 rounded-lg p-4 mb-4 text-left hover:border-orange-500 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-orange-400 text-xs font-bold">FEEL EARTH'S INVISIBLE MOVEMENTS</p>
                                    {expandedSection === 'accelerometer' ? (
                                        <ChevronUp className="w-5 h-5 text-orange-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-orange-400" />
                                    )}
                                </div>
                                
                                <AnimatePresence>
                                    {expandedSection === 'accelerometer' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 space-y-3"
                                        >
                                            <div className="bg-orange-900/20 border-l-4 border-orange-400 p-3 rounded">
                                                <p className="text-orange-400 text-xs font-bold mb-2">📊 THE PHYSICS:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    Acceleration = change in velocity over time. Earth's gravity = 9.81 m/s² downward. Vibrations = tiny accelerations added to gravity.
                                                </p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    <strong className="text-white">Math → Physics:</strong> F = ma (Newton's 2nd law). Measure acceleration → calculate force of vibration.
                                                </p>
                                            </div>

                                            <div className="bg-red-900/20 border-l-4 border-red-400 p-3 rounded">
                                                <p className="text-red-400 text-xs font-bold mb-2">🌊 INFRASOUND (Below 20 Hz):</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    Sound you CAN'T hear but CAN feel. Earthquakes, volcanoes, ocean waves, weather systems = 0.1-20 Hz infrasound. Travels 1000s of km.
                                                </p>
                                                <p className="text-amber-300 text-xs">
                                                    Animals detect infrasound to predict earthquakes hours early. Elephants communicate at 14-24 Hz (you can't hear them talking).
                                                </p>
                                            </div>

                                            <div className="bg-purple-900/20 border-l-4 border-purple-400 p-3 rounded">
                                                <p className="text-purple-400 text-xs font-bold mb-2">🏢 BUILDING RESONANCE:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    Every structure has natural frequency. Tall buildings = 0.1-1 Hz. Earthquake at same frequency = resonance = building sways violently. Phone detects this danger.
                                                </p>
                                            </div>

                                            <div className="bg-cyan-900/20 border-l-4 border-cyan-400 p-3 rounded">
                                                <p className="text-cyan-400 text-xs font-bold mb-2">⚡ LEVITATION TECH:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    Acoustic levitation = 20+ kHz ultrasound creates standing wave. Objects suspended in nodes. NASA uses this for zero-g experiments on Earth. Phone can measure base frequency.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                            
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
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={stopSensors}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all mb-4"
                                    >
                                        STOP
                                    </motion.button>

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
                                </>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* COHERENCE MODE */}
                {mode === 'coherence' && (
                    <motion.div
                        key="coherence"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-xl p-6"
                            style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}>
                            <h2 className="text-xl font-black text-white mb-2">YOU + EARTH COHERENCE</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Multi-sensor measurement: Heart + EM + Movement
                            </p>

                            {/* EXPANDABLE COHERENCE PHYSICS */}
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'coherence' ? null : 'coherence')}
                                className="w-full bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4 mb-4 text-left hover:border-cyan-500 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-cyan-400 text-xs font-bold">THE SCIENCE OF SYNCHRONIZATION</p>
                                    {expandedSection === 'coherence' ? (
                                        <ChevronUp className="w-5 h-5 text-cyan-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-cyan-400" />
                                    )}
                                </div>
                                
                                <AnimatePresence>
                                    {expandedSection === 'coherence' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 space-y-3"
                                        >
                                            <div className="bg-cyan-900/20 border-l-4 border-cyan-400 p-3 rounded">
                                                <p className="text-cyan-400 text-xs font-bold mb-2">🌊 WHAT IS COHERENCE:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    Coherence = waves in sync. Two oscillators at same frequency = coherent. Your heart + Earth's Schumann = coherence = optimal health state.
                                                </p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    <strong className="text-white">Physics:</strong> When systems resonate at matching frequencies, energy transfers efficiently. No friction, no waste = flow state.
                                                </p>
                                            </div>

                                            <div className="bg-pink-900/20 border-l-4 border-pink-400 p-3 rounded">
                                                <p className="text-pink-400 text-xs font-bold mb-2">❤️ HEART COHERENCE:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    Heart Rate Variability (HRV) = time between heartbeats. High HRV = healthy, adaptable nervous system. Low HRV = stressed, rigid.
                                                </p>
                                                <p className="text-green-400 text-xs">
                                                    HeartMath Institute: Heart coherence synchronizes with Earth's Schumann resonance when grounded barefoot. Measurable health improvements.
                                                </p>
                                            </div>

                                            <div className="bg-green-900/20 border-l-4 border-green-400 p-3 rounded">
                                                <p className="text-green-400 text-xs font-bold mb-2">🧲 EM FIELD COHERENCE:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed">
                                                    Your body = electrical system. Heart = 60x stronger electrical field than brain. Earth's magnetic field influences your cellular voltage. Coherence = optimal cellular function.
                                                </p>
                                            </div>

                                            <div className="bg-purple-900/20 border-l-4 border-purple-400 p-3 rounded">
                                                <p className="text-purple-400 text-xs font-bold mb-2">🧘 STILLNESS = RESONANCE:</p>
                                                <p className="text-gray-300 text-xs leading-relaxed mb-2">
                                                    Movement = interference. Stillness = allows natural frequencies to align. Meditation masters: heart rate, breathing, brain waves synchronize with Earth frequency.
                                                </p>
                                                <p className="text-amber-300 text-xs">
                                                    That's why meditation works: you're literally tuning yourself to Earth's vibration.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {!isCoherenceMeasuring && !coherenceScore ? (
                                <>
                                    <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4 mb-4">
                                        <p className="text-cyan-400 text-xs font-bold mb-2">WHAT WE MEASURE:</p>
                                        <ul className="text-gray-300 text-xs space-y-1">
                                            <li>✓ Heart rate variability (camera)</li>
                                            <li>✓ EM field stability (magnetometer)</li>
                                            <li>✓ Body stillness (accelerometer)</li>
                                        </ul>
                                        <p className="text-amber-300 text-xs mt-3">Takes 30 seconds. Keep still, breathe calm.</p>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={startCoherenceMeasurement}
                                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 rounded-lg transition-all"
                                        style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                                    >
                                        <Heart className="w-6 h-6 inline-block mr-2" />
                                        MEASURE COHERENCE
                                    </motion.button>
                                </>
                            ) : isCoherenceMeasuring ? (
                                <div className="space-y-4">
                                    <div className="bg-black/60 border-2 border-cyan-500 rounded-lg p-4">
                                        <p className="text-cyan-400 font-bold text-center mb-4">MEASURING... 30s</p>

                                        <div className="mb-4">
                                            <p className="text-white text-sm font-bold mb-2">Heart Rate:</p>
                                            <CameraHeartRate onMeasurementComplete={handleHeartData} />
                                        </div>

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
                                        </div>
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
                                        <p className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-4">
                                            {coherenceScore}%
                                        </p>

                                        <div className="space-y-2 text-left mt-6">
                                            {coherenceScore >= 80 && (
                                                <p className="text-green-300 text-sm">✓ High coherence - you're in sync with Earth</p>
                                            )}
                                            {coherenceScore >= 60 && coherenceScore < 80 && (
                                                <p className="text-yellow-300 text-sm">⚡ Moderate coherence - decent connection</p>
                                            )}
                                            {coherenceScore < 60 && (
                                                <p className="text-amber-300 text-sm">⚠ Low coherence - need grounding</p>
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
                                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all"
                                    >
                                        MEASURE AGAIN
                                    </motion.button>
                                </motion.div>
                            ) : null}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>

                {/* MEASUREMENT HISTORY */}
                {measurements.length > 0 && (
                    <div className="mt-8 bg-black border-2 border-green-500 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <History className="w-5 h-5 text-green-400" />
                            <h3 className="text-green-400 font-bold">YOUR MEASUREMENTS (Last 20)</h3>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {measurements.map((m) => (
                                <div key={m.id} className="bg-green-900/20 border border-green-500/30 p-2 rounded text-xs font-mono">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-green-400">
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
                    </div>
                )}

                {/* INFO */}
                <div className="mt-8 bg-black border-2 border-green-500/30 rounded-xl p-6">
                    <h3 className="text-green-400 font-bold mb-3 text-center">WHAT IS EARTH51?</h3>
                    <div className="space-y-3 text-sm">
                        <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                            <p className="text-green-400 font-bold mb-1">SCHUMANN:</p>
                            <p className="text-gray-300 text-xs">Measure Earth's 7.83 Hz electromagnetic heartbeat</p>
                        </div>
                        <div className="bg-pink-900/20 border border-pink-500/30 p-3 rounded">
                            <p className="text-pink-400 font-bold mb-1">EM FIELD:</p>
                            <p className="text-gray-300 text-xs">Detect magnetic fields from Earth + devices</p>
                        </div>
                        <div className="bg-orange-900/20 border border-orange-500/30 p-3 rounded">
                            <p className="text-orange-400 font-bold mb-1">VIBRATION:</p>
                            <p className="text-gray-300 text-xs">Feel sub-20Hz Earth movements</p>
                        </div>
                        <div className="bg-cyan-900/20 border border-cyan-500/30 p-3 rounded">
                            <p className="text-cyan-400 font-bold mb-1">COHERENCE:</p>
                            <p className="text-gray-300 text-xs">Measure how synchronized you are with Earth's rhythm</p>
                        </div>
                    </div>
                    <p className="text-green-400 text-xs font-mono mt-4 text-center">
                        Ground yourself. Connect to Earth. Heal ♾️🌍♾️
                    </p>
                </div>

            </div>
        </div>
    );
}