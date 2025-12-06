import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKHeart, COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

// 8-BIT COOLASFUCK ICONS FOR EACH STATE
const StateIcon = ({ type, size = 24, animate = false, color = '#22d3ee' }) => {
    const icons = {
        anxious: ( // Storm/waves
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M2 10H6L8 6L10 14L12 8L14 12L16 10H22" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
                <path d="M4 18H8M10 20H14M16 18H20" stroke={color} strokeWidth="2" strokeLinecap="square" opacity="0.5"/>
            </svg>
        ),
        exhausted: ( // Battery low
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <rect x="2" y="6" width="16" height="12" stroke={color} strokeWidth="2.5" fill="none"/>
                <rect x="18" y="9" width="4" height="6" fill={color}/>
                <rect x="4" y="8" width="4" height="8" fill={color} opacity="0.3"/>
            </svg>
        ),
        wired: ( // Overload brain
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2.5" fill="none"/>
                <path d="M8 9H10M14 9H16M9 14H15" stroke={color} strokeWidth="2" strokeLinecap="square"/>
                <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke={color} strokeWidth="2" opacity="0.5"/>
            </svg>
        ),
        sad: ( // Broken heart
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M12 5C8 1 2 3 2 9C2 15 12 21 12 21C12 21 22 15 22 9C22 3 16 1 12 5Z" stroke={color} strokeWidth="2.5" fill="none"/>
                <path d="M12 9L10 13L14 15L12 19" stroke={color} strokeWidth="2" strokeLinecap="square"/>
            </svg>
        ),
        pain: ( // Body pulse / EKG
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M2 12H6L8 6L12 18L14 10L16 12H22" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
            </svg>
        ),
        angry: ( // Fire
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17 22 20 17 20 13C20 9 16 5 12 2C8 5 4 9 4 13C4 17 7 22 12 22Z" stroke={color} strokeWidth="2.5" fill="none"/>
                <path d="M12 18C14 18 16 16 16 14C16 12 14 10 12 8C10 10 8 12 8 14C8 16 10 18 12 18Z" fill={color}/>
            </svg>
        ),
        disconnected: ( // Unplug
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="6" height="8" stroke={color} strokeWidth="2.5" fill="none"/>
                <rect x="15" y="8" width="6" height="8" stroke={color} strokeWidth="2.5" fill="none"/>
                <path d="M9 10H11M13 10H15M9 14H11M13 14H15" stroke={color} strokeWidth="2" strokeDasharray="2 2" opacity="0.5"/>
            </svg>
        ),
        insomnia: ( // Moon with stars
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M18 12C18 16 14.5 19 10 19C5.5 19 2 16 2 12C2 8 5.5 5 10 5C8 7 8 11 10 13C12 15 16 15 18 12Z" stroke={color} strokeWidth="2.5" fill="none"/>
                <rect x="18" y="4" width="2" height="2" fill={color}/>
                <rect x="20" y="8" width="2" height="2" fill={color} opacity="0.6"/>
                <rect x="16" y="2" width="2" height="2" fill={color} opacity="0.4"/>
            </svg>
        ),
    };
    
    return (
        <motion.div
            animate={animate ? { scale: [1, 1.15, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
        >
            {icons[type]}
        </motion.div>
    );
};

// 8-BIT HEART ICON FOR BPM
const PixelHeart = ({ size = 32, animate = false }) => (
    <motion.svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none"
        animate={animate ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.8 }}
    >
        <path 
            d="M12 5C8 1 2 3 2 9C2 15 12 21 12 21C12 21 22 15 22 9C22 3 16 1 12 5Z" 
            fill="#ef4444" 
            stroke="#ef4444" 
            strokeWidth="1"
        />
    </motion.svg>
);

// 8 STATES → 8 FREQUENCIES → REAL-TIME HEALING
const HEALING_STATES = [
    { id: 'anxious', label: 'ANXIOUS', freq: 528, color: 'cyan', hex: '#22d3ee', description: 'Calm the storm' },
    { id: 'exhausted', label: 'EXHAUSTED', freq: 417, color: 'amber', hex: '#fbbf24', description: 'Energy restore' },
    { id: 'wired', label: 'WIRED', freq: 396, color: 'purple', hex: '#a855f7', description: 'Release tension' },
    { id: 'sad', label: 'SAD', freq: 639, color: 'pink', hex: '#ec4899', description: 'Heart opening' },
    { id: 'pain', label: 'PAIN', freq: 174, color: 'red', hex: '#ef4444', description: 'Body healing' },
    { id: 'angry', label: 'ANGRY', freq: 285, color: 'orange', hex: '#f97316', description: 'Transmute fire' },
    { id: 'disconnected', label: 'LOST', freq: 963, color: 'indigo', hex: '#818cf8', description: 'Spirit reconnect' },
    { id: 'insomnia', label: 'SLEEPLESS', freq: 2, color: 'blue', hex: '#3b82f6', description: 'Delta drift', isBinaural: true }
];

// 8-BIT BLEEP SOUND - COOLASFUCK
const playBleep = (frequency = 880, duration = 80) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square'; // 8-bit sound
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + duration / 1000);
        
        // Haptic too
        if (navigator.vibrate) navigator.vibrate(30);
    } catch (e) {
        console.log('Audio not available');
    }
};

export default function BiometricHealing() {
    const [selectedState, setSelectedState] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [heartRate, setHeartRate] = useState(null);
    const [heartRateHistory, setHeartRateHistory] = useState([]);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [healingProgress, setHealingProgress] = useState(0);
    
    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);
    const gainRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    // START FREQUENCY
    const startFrequency = (state) => {
        if (audioContextRef.current) {
            stopFrequency();
        }

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        if (state.isBinaural) {
            // BINAURAL BEATS FOR SLEEP
            const baseFreq = 200;
            const osc1 = audioContextRef.current.createOscillator();
            const osc2 = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();
            
            osc1.type = 'sine';
            osc2.type = 'sine';
            osc1.frequency.setValueAtTime(baseFreq, audioContextRef.current.currentTime);
            osc2.frequency.setValueAtTime(baseFreq + state.freq, audioContextRef.current.currentTime);
            
            gainNode.gain.setValueAtTime(0.15, audioContextRef.current.currentTime);
            
            const merger = audioContextRef.current.createChannelMerger(2);
            osc1.connect(merger, 0, 0);
            osc2.connect(merger, 0, 1);
            merger.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);
            
            osc1.start();
            osc2.start();
            oscillatorRef.current = { osc1, osc2 };
            gainRef.current = gainNode;
        } else {
            // PURE FREQUENCY
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(state.freq, audioContextRef.current.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);
            oscillator.start();
            
            oscillatorRef.current = oscillator;
            gainRef.current = gainNode;
        }

        setIsPlaying(true);
        
        // HAPTIC FEEDBACK
        if (navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
        }
    };

    const stopFrequency = () => {
        if (oscillatorRef.current) {
            if (oscillatorRef.current.osc1) {
                oscillatorRef.current.osc1.stop();
                oscillatorRef.current.osc2.stop();
            } else {
                oscillatorRef.current.stop();
            }
            oscillatorRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        setIsPlaying(false);
    };

    // HEART RATE DETECTION VIA CAMERA
    const startHeartRateDetection = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 320, height: 240 }
            });
            
            setCameraPermission(true);
            setShowCamera(true);
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                
                videoRef.current.onloadeddata = () => {
                    analyzeHeartRate();
                };
            }
        } catch (err) {
            console.error('Camera access denied:', err);
            setCameraPermission(false);
        }
    };

    const analyzeHeartRate = () => {
        if (!videoRef.current || !canvasRef.current) return;
        
        const ctx = canvasRef.current.getContext('2d');
        const video = videoRef.current;
        
        let redValues = [];
        let lastBeat = Date.now();
        let beatCount = 0;
        
        const analyze = () => {
            ctx.drawImage(video, 0, 0, 100, 100);
            const imageData = ctx.getImageData(0, 0, 100, 100);
            const data = imageData.data;
            
            let redSum = 0;
            for (let i = 0; i < data.length; i += 4) {
                redSum += data[i];
            }
            const redAvg = redSum / (data.length / 4);
            
            redValues.push(redAvg);
            if (redValues.length > 100) redValues.shift();
            
            if (redValues.length > 10) {
                const recent = redValues.slice(-10);
                const avg = recent.reduce((a, b) => a + b) / recent.length;
                const current = redValues[redValues.length - 1];
                
                if (current > avg * 1.02 && Date.now() - lastBeat > 400) {
                    beatCount++;
                    lastBeat = Date.now();
                    
                    if (beatCount >= 3) {
                        const bpm = Math.round(60000 / ((Date.now() - (lastBeat - (beatCount * 600))) / beatCount));
                        if (bpm > 40 && bpm < 200) {
                            setHeartRate(bpm);
                            setHeartRateHistory(prev => [...prev.slice(-20), bpm]);
                            
                            if (heartRateHistory.length > 5) {
                                const firstFive = heartRateHistory.slice(0, 5).reduce((a, b) => a + b) / 5;
                                const lastFive = heartRateHistory.slice(-5).reduce((a, b) => a + b) / 5;
                                if (lastFive < firstFive) {
                                    setHealingProgress(Math.min(100, healingProgress + 5));
                                }
                            }
                        }
                    }
                }
            }
            
            animationRef.current = requestAnimationFrame(analyze);
        };
        
        analyze();
    };

    const stopHeartRateDetection = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    useEffect(() => {
        return () => {
            stopFrequency();
            stopHeartRateDetection();
        };
    }, []);

    const handleStateSelect = (state) => {
        playBleep(660, 60); // Bleep on tap
        if (selectedState?.id === state.id && isPlaying) {
            stopFrequency();
            setSelectedState(null);
        } else {
            setSelectedState(state);
            startFrequency(state);
        }
    };

    const getColorClasses = (color, isActive) => {
        const colors = {
            cyan: isActive ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-cyan-500/50 text-cyan-400 hover:border-cyan-400',
            amber: isActive ? 'bg-amber-600 border-amber-400 text-black' : 'border-amber-500/50 text-amber-400 hover:border-amber-400',
            purple: isActive ? 'bg-purple-600 border-purple-400 text-white' : 'border-purple-500/50 text-purple-400 hover:border-purple-400',
            pink: isActive ? 'bg-pink-600 border-pink-400 text-white' : 'border-pink-500/50 text-pink-400 hover:border-pink-400',
            red: isActive ? 'bg-red-600 border-red-400 text-white' : 'border-red-500/50 text-red-400 hover:border-red-400',
            orange: isActive ? 'bg-orange-600 border-orange-400 text-white' : 'border-orange-500/50 text-orange-400 hover:border-orange-400',
            indigo: isActive ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-indigo-500/50 text-indigo-400 hover:border-indigo-400',
            blue: isActive ? 'bg-blue-600 border-blue-400 text-white' : 'border-blue-500/50 text-blue-400 hover:border-blue-400',
        };
        return colors[color] || colors.cyan;
    };

    return (
        <Card className="bg-black border-4 border-pink-500">
            <CardContent className="p-4 md:p-6 space-y-4">
                
                {/* HEADER */}
                <div className="flex items-center gap-3">
                    <COOLASFUCKHeart size={32} animate={isPlaying} />
                    <div>
                        <h2 className="text-xl md:text-2xl font-black font-mono text-pink-400">
                            BIOMETRIC HEALING
                        </h2>
                        <p className="text-gray-400 text-xs font-mono">Tap state - Watch yourself heal</p>
                    </div>
                </div>

                {/* 8 STATE BUTTONS - 8-BIT GRID */}
                <div className="grid grid-cols-4 gap-2">
                    {HEALING_STATES.map((state) => {
                        const isActive = selectedState?.id === state.id && isPlaying;
                        
                        return (
                            <motion.button
                                key={state.id}
                                onClick={() => handleStateSelect(state)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-2 md:p-3 border-4 bg-black transition-all flex flex-col items-center gap-1 ${
                                    getColorClasses(state.color, isActive)
                                }`}
                                style={isActive ? {
                                    boxShadow: `0 0 20px ${state.hex}80`
                                } : {}}
                            >
                                <StateIcon type={state.id} size={28} animate={isActive} color={state.hex} />
                                <span className="text-[10px] md:text-xs font-black font-mono">{state.label}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* ACTIVE STATE DISPLAY */}
                <AnimatePresence>
                    {selectedState && isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-black border-4 border-pink-500/50 p-4"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <COOLASFUCKWaves size={40} animate={true} />
                                    <div>
                                        <p className="text-white font-black font-mono text-lg">
                                            {selectedState.freq}Hz {selectedState.isBinaural && '(Binaural)'}
                                        </p>
                                        <p className="text-gray-400 text-sm font-mono">{selectedState.description}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { stopFrequency(); setSelectedState(null); stopHeartRateDetection(); }}
                                    className="px-4 py-2 bg-red-600 border-4 border-red-400 text-white font-black font-mono text-sm"
                                >
                                    STOP
                                </button>
                            </div>

                            {/* HRV SCANNER TOGGLE */}
                            <button
                                onClick={() => {
                                    if (showCamera) {
                                        stopHeartRateDetection();
                                    } else {
                                        startHeartRateDetection();
                                    }
                                }}
                                className={`w-full mb-4 py-3 border-4 font-black font-mono text-sm transition-all ${
                                    showCamera 
                                        ? 'bg-green-600 border-green-400 text-white' 
                                        : 'bg-black border-cyan-500 text-cyan-400 hover:border-cyan-300'
                                }`}
                                style={showCamera ? { boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' } : {}}
                            >
                                {showCamera ? '📹 SCANNING YOUR HEART' : '🫀 SCAN YOUR HEART (COVER CAMERA)'}
                            </button>

                            {/* CAMERA PERMISSION ERROR */}
                            {cameraPermission === false && (
                                <div className="bg-red-900/30 border-4 border-red-500 p-3 mb-4">
                                    <p className="text-red-300 text-sm font-mono text-center">
                                        Camera access denied. Enable camera to scan heart rate.
                                    </p>
                                </div>
                            )}

                            {/* HRV DISPLAY - 8-BIT COOLASFUCK */}
                            {showCamera && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-black border-4 border-cyan-500 p-4 mb-4"
                                    style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <PixelHeart size={24} animate={heartRate !== null} />
                                        <p className="text-cyan-400 font-black font-mono text-sm">HEART RATE VARIABILITY</p>
                                    </div>

                                    {isCalibrating ? (
                                        <div className="flex items-center justify-center gap-3 py-6">
                                            <motion.div
                                                className="w-6 h-6 bg-cyan-500"
                                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                                style={{ imageRendering: 'pixelated' }}
                                            />
                                            <p className="text-gray-400 text-sm font-mono">CALIBRATING...</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-3">
                                            {/* BPM */}
                                            <div className="bg-black border-4 border-red-500 p-3 text-center">
                                                <PixelHeart size={20} animate={true} />
                                                <p className="text-3xl font-black font-mono text-red-400 mt-2">
                                                    {heartRate || '--'}
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono">BPM</p>
                                            </div>

                                            {/* COHERENCE */}
                                            <div className={`bg-black border-4 p-3 text-center ${
                                                coherence > 70 ? 'border-green-500' : coherence > 40 ? 'border-yellow-500' : 'border-red-500'
                                            }`}>
                                                <COOLASFUCKWaves size={20} animate={true} />
                                                <p className={`text-3xl font-black font-mono mt-2 ${
                                                    coherence > 70 ? 'text-green-400' : coherence > 40 ? 'text-yellow-400' : 'text-red-400'
                                                }`}>
                                                    {coherence || '--'}%
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono">COHERENCE</p>
                                            </div>

                                            {/* HEALING PROGRESS */}
                                            <div className="bg-black border-4 border-pink-500 p-3 text-center">
                                                <COOLASFUCKHeart size={20} animate={healingProgress > 50} />
                                                <p className="text-3xl font-black font-mono text-pink-400 mt-2">
                                                    {healingProgress}%
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono">HEALING</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* FEEDBACK MESSAGE */}
                                    {coherence !== null && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`mt-3 p-3 border-4 text-center ${
                                                coherence > 70 
                                                    ? 'border-green-500 bg-green-900/20' 
                                                    : coherence > 40 
                                                        ? 'border-yellow-500 bg-yellow-900/20' 
                                                        : 'border-red-500 bg-red-900/20'
                                            }`}
                                        >
                                            <p className={`text-sm font-black font-mono ${
                                                coherence > 70 ? 'text-green-400' : coherence > 40 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                                {coherence > 70 
                                                    ? '✓ HIGH SYNC - Frequency is healing you!' 
                                                    : coherence > 40 
                                                        ? '◐ MODERATE - Breathe slower, relax more'
                                                        : '○ LOW - Deep breaths, you\'re getting there'}
                                            </p>
                                        </motion.div>
                                    )}

                                    <p className="text-gray-600 text-xs font-mono text-center mt-3">
                                        Cover back camera with finger • Keep still
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>



                {/* FOOTER */}
                <div className="text-center">
                    <p className="text-gray-500 text-xs font-mono">
                        No surveillance - You control what you share
                    </p>
                </div>

            </CardContent>
        </Card>
    );
}