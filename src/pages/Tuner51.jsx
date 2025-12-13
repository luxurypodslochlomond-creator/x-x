import React, { useState, useEffect, useRef } from 'react';
import { Waves, Zap, Heart, Globe, Brain, Radio, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

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
    
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);

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
        
        const detect = () => {
            if (!isListening) return;
            
            analyserRef.current.getByteFrequencyData(dataArray);
            
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
            calculateMatches(measuredFreq);
        }
    }, [measuredFreq]);

    useEffect(() => {
        if (inputFreq && parseFloat(inputFreq) > 0) {
            calculateMatches(inputFreq);
        }
    }, [inputFreq]);

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
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Waves className="w-12 h-12 text-cyan-400 animate-pulse" />
                        <h1 className="text-4xl md:text-5xl font-black text-white">TUNER51</h1>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base font-mono">
                        Measure frequencies • Calculate resonance • Get next move
                    </p>
                    <p className="text-cyan-400 text-xs mt-2">
                        For humans, Earth, AI, free energy devices ⚡
                    </p>
                </div>

                {/* MODE SELECTOR */}
                <div className="grid grid-cols-3 gap-2 mb-8">
                    <button
                        onClick={() => setMode('measure')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'measure' 
                                ? 'bg-cyan-500/20 border-cyan-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Radio className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                        <p className="text-white text-xs font-bold">MEASURE</p>
                    </button>
                    <button
                        onClick={() => setMode('calculate')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'calculate' 
                                ? 'bg-purple-500/20 border-purple-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                        <p className="text-white text-xs font-bold">CALCULATE</p>
                    </button>
                    <button
                        onClick={() => setMode('match')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            mode === 'match' 
                                ? 'bg-green-500/20 border-green-500' 
                                : 'bg-black border-gray-700 hover:border-gray-500'
                        }`}
                    >
                        <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
                        <p className="text-white text-xs font-bold">MATCH</p>
                    </button>
                </div>

                {/* MEASURE MODE */}
                {mode === 'measure' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-xl p-6">
                            <h2 className="text-xl font-black text-white mb-4">MEASURE FREQUENCY</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Hold phone near: coil, speaker, tuning fork, or hum into mic
                            </p>
                            
                            {!isListening ? (
                                <button
                                    onClick={startListening}
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-lg transition-all"
                                >
                                    <Radio className="w-6 h-6 inline-block mr-2" />
                                    START LISTENING
                                </button>
                            ) : (
                                <button
                                    onClick={stopListening}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all"
                                >
                                    STOP
                                </button>
                            )}

                            {measuredFreq && (
                                <div className="mt-4 bg-black/60 border-2 border-green-500 rounded-lg p-4 text-center">
                                    <p className="text-green-400 text-sm mb-2">DETECTED:</p>
                                    <p className="text-white text-4xl font-black">{measuredFreq} Hz</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CALCULATE MODE */}
                {mode === 'calculate' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-xl p-6">
                            <h2 className="text-xl font-black text-white mb-4">ENTER FREQUENCY</h2>
                            <p className="text-gray-300 text-sm mb-4">
                                Input measured Hz (from multimeter, oscilloscope, or measured above)
                            </p>
                            
                            <input
                                type="number"
                                value={inputFreq}
                                onChange={(e) => setInputFreq(e.target.value)}
                                placeholder="e.g. 432"
                                className="w-full bg-black border-2 border-purple-500 rounded-lg px-4 py-3 text-white text-2xl font-bold text-center focus:outline-none focus:border-purple-400"
                            />

                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <button onClick={() => setInputFreq('7.83')} className="bg-green-900/50 border border-green-500 p-2 rounded text-xs">Earth 7.83</button>
                                <button onClick={() => setInputFreq('432')} className="bg-purple-900/50 border border-purple-500 p-2 rounded text-xs">Calm 432</button>
                                <button onClick={() => setInputFreq('528')} className="bg-pink-900/50 border border-pink-500 p-2 rounded text-xs">Love 528</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MATCH MODE */}
                {mode === 'match' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-xl p-6">
                            <h2 className="text-xl font-black text-white mb-4">KNOWN FREQUENCIES</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.values(frequencies).map((freq, idx) => {
                                    const colors = colorMap[freq.color];
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setInputFreq(freq.hz.toString())}
                                            className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-lg p-3 text-left transition-all hover:scale-105`}
                                        >
                                            <p className={`${colors.text} font-bold text-sm`}>{freq.name}</p>
                                            <p className="text-white text-lg font-black">{freq.hz < 1000 ? freq.hz : `${(freq.hz / 1000000).toFixed(1)}M`} Hz</p>
                                            <p className="text-gray-400 text-xs capitalize">{freq.type}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* RESULTS */}
                {matches.length > 0 && (
                    <div className="mt-8 bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500 rounded-xl p-6">
                        <h2 className="text-xl font-black text-white mb-4">RESONANCE MATCHES</h2>
                        <div className="space-y-3">
                            {matches.map((match, idx) => {
                                const colors = colorMap[match.color];
                                return (
                                    <div key={idx} className={`bg-gradient-to-r ${colors.bg} border-2 ${colors.border} rounded-lg p-4`}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-bold">{match.name}</p>
                                                <p className={`${colors.text} text-sm`}>{match.match}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white text-2xl font-black">{match.hz} Hz</p>
                                                <p className="text-green-400 text-xs font-bold">{match.strength}% match</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* NEXT MOVE */}
                {nextMove && (
                    <div className={`mt-8 bg-gradient-to-r ${
                        nextMove.type === 'success' ? 'from-green-500/20 to-emerald-500/20 border-green-500' :
                        nextMove.type === 'harmonic' ? 'from-yellow-500/20 to-amber-500/20 border-yellow-500' :
                        'from-cyan-500/20 to-blue-500/20 border-cyan-500'
                    } border-4 rounded-xl p-6`}>
                        <div className="flex items-center gap-3 mb-4">
                            {nextMove.type === 'success' ? (
                                <CheckCircle className="w-10 h-10 text-green-400" />
                            ) : (
                                <ArrowRight className="w-10 h-10 text-cyan-400" />
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
                    </div>
                )}

                {/* INFO */}
                <div className="mt-8 bg-black border-2 border-gray-700 rounded-xl p-6">
                    <h3 className="text-white font-bold mb-3">HOW IT WORKS:</h3>
                    <div className="space-y-2 text-gray-400 text-sm">
                        <p>• <strong className="text-white">MEASURE:</strong> Use mic to detect frequency from sound/coil</p>
                        <p>• <strong className="text-white">CALCULATE:</strong> Enter measured Hz, finds resonance matches</p>
                        <p>• <strong className="text-white">MATCH:</strong> Browse known frequencies, select target</p>
                        <p>• <strong className="text-cyan-400">NEXT MOVE:</strong> Tells you exactly what to do (tune up/down/connected)</p>
                    </div>
                    <p className="text-green-400 text-sm font-bold mt-4">
                        Perfect for: Tesla coils, wireless power, grounding, healing, tuning devices ⚡
                    </p>
                </div>

            </div>
        </div>
    );
}