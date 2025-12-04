import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

// 8-BIT BLEEP
const playBleep = (freq = 880, dur = 50) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur/1000);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur/1000);
        if (navigator.vibrate) navigator.vibrate(20);
    } catch(e) {}
};

// METRONOME CLICK
const playClick = (accent = false) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = accent ? 1200 : 800;
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
        if (navigator.vibrate) navigator.vibrate(accent ? 40 : 20);
    } catch(e) {}
};

// REFERENCE TONE - Digital tuning fork
const playReferenceTone = (frequency, duration = 2000) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + duration/1000 - 0.2);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration/1000);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration/1000);
        if (navigator.vibrate) navigator.vibrate(50);
        return { stop: () => { try { osc.stop(); } catch(e) {} } };
    } catch(e) { return null; }
};

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const TUNINGS = {
    standard: { name: 'STD', notes: ['E', 'A', 'D', 'G', 'B', 'E'], freqs: [82.41, 110, 146.83, 196, 246.94, 329.63] },
    drop_d: { name: 'DROP', notes: ['D', 'A', 'D', 'G', 'B', 'E'], freqs: [73.42, 110, 146.83, 196, 246.94, 329.63] },
    half_down: { name: '½↓', notes: ['Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb'], freqs: [77.78, 103.83, 138.59, 185, 233.08, 311.13] },
    open_g: { name: 'OPEN', notes: ['D', 'G', 'D', 'G', 'B', 'D'], freqs: [73.42, 98, 146.83, 196, 246.94, 293.66] },
};

export default function TunerPage() {
    const [mode, setMode] = useState('tuner'); // 'tuner' or 'metro'
    const [listening, setListening] = useState(false);
    const [note, setNote] = useState(null);
    const [freq, setFreq] = useState(0);
    const [cents, setCents] = useState(0);
    const [tuning, setTuning] = useState('standard');
    const [playingTone, setPlayingTone] = useState(null);
    const [error, setError] = useState(null);
    const [showIntel, setShowIntel] = useState(false);
    
    const [bpm, setBpm] = useState(120);
    const [running, setRunning] = useState(false);
    const [beat, setBeat] = useState(0);
    
    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const metroRef = useRef(null);
    const toneRef = useRef(null);

    const autoCorrelate = (buf, sampleRate) => {
        let SIZE = buf.length;
        let rms = 0;
        for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) return -1;
        let r1 = 0, r2 = SIZE - 1;
        for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < 0.2) { r1 = i; break; }
        for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < 0.2) { r2 = SIZE - i; break; }
        buf = buf.slice(r1, r2);
        SIZE = buf.length;
        let c = new Array(SIZE).fill(0);
        for (let i = 0; i < SIZE; i++) for (let j = 0; j < SIZE - i; j++) c[i] += buf[j] * buf[j + i];
        let d = 0;
        while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < SIZE; i++) if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
        let T0 = maxpos;
        let x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        let a = (x1 + x3 - 2 * x2) / 2;
        let b = (x3 - x1) / 2;
        if (a) T0 = T0 - b / (2 * a);
        return sampleRate / T0;
    };

    const freqToNote = (f) => {
        const noteNum = 12 * (Math.log(f / 440) / Math.log(2));
        const nearest = Math.round(noteNum) + 69;
        const idx = nearest % 12;
        const name = NOTE_NAMES[idx];
        const targetFreq = 440 * Math.pow(2, (nearest - 69) / 12);
        const centsOff = Math.floor(1200 * Math.log(f / targetFreq) / Math.log(2));
        return { name, cents: centsOff };
    };

    const detectPitch = () => {
        if (!analyserRef.current) return;
        const buf = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(buf);
        const f = autoCorrelate(buf, audioCtxRef.current.sampleRate);
        if (f > 0 && f < 1000) {
            const n = freqToNote(f);
            setNote(n.name);
            setFreq(f);
            setCents(n.cents);
        }
        rafRef.current = requestAnimationFrame(detectPitch);
    };

    const startTuner = async () => {
        playBleep(660);
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false } });
            streamRef.current = stream;
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new AudioContext();
            analyserRef.current = audioCtxRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            const src = audioCtxRef.current.createMediaStreamSource(stream);
            src.connect(analyserRef.current);
            setListening(true);
            detectPitch();
        } catch (e) {
            setError('MIC ACCESS NEEDED');
        }
    };

    const stopTuner = () => {
        playBleep(440);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        if (audioCtxRef.current) audioCtxRef.current.close();
        setListening(false);
        setNote(null);
        setFreq(0);
        setCents(0);
    };

    const startMetro = () => {
        playBleep(880);
        setBeat(1);
        playClick(true);
        const interval = 60000 / bpm;
        let count = 1;
        metroRef.current = setInterval(() => {
            count = (count % 4) + 1;
            setBeat(count);
            playClick(count === 1);
        }, interval);
        setRunning(true);
    };

    const stopMetro = () => {
        playBleep(440);
        if (metroRef.current) clearInterval(metroRef.current);
        setRunning(false);
        setBeat(0);
    };

    const adjustBpm = (delta) => {
        playBleep(660, 30);
        const newBpm = Math.min(240, Math.max(40, bpm + delta));
        setBpm(newBpm);
        if (running) {
            clearInterval(metroRef.current);
            const interval = 60000 / newBpm;
            let count = beat;
            metroRef.current = setInterval(() => {
                count = (count % 4) + 1;
                setBeat(count);
                playClick(count === 1);
            }, interval);
        }
    };

    useEffect(() => () => { stopTuner(); stopMetro(); if (toneRef.current) toneRef.current.stop(); }, []);

    const t = TUNINGS[tuning];
    
    const playStringTone = (stringIndex) => {
        playBleep(550, 40);
        if (toneRef.current) toneRef.current.stop();
        if (playingTone === stringIndex) { setPlayingTone(null); return; }
        toneRef.current = playReferenceTone(t.freqs[stringIndex], 3000);
        setPlayingTone(stringIndex);
        setTimeout(() => setPlayingTone(null), 3000);
    };

    const inTune = Math.abs(cents) < 5;
    const close = Math.abs(cents) < 15;

    return (
        <div className="min-h-screen bg-black text-white p-3 pt-20 lg:pt-3">
            <div className="max-w-md mx-auto space-y-3">
                
                {/* HEADER + MODE TOGGLE */}
                <div className="flex items-center justify-between border-b-4 border-cyan-500 pb-2">
                    <h1 className="text-2xl font-black font-mono text-cyan-400">TUNER51</h1>
                    <div className="flex gap-1">
                        <button
                            onClick={() => { playBleep(660); setMode('tuner'); }}
                            className={`px-3 py-1 border-2 text-xs font-mono font-black ${mode === 'tuner' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-gray-600 text-gray-500'}`}
                        >
                            TUNE
                        </button>
                        <button
                            onClick={() => { playBleep(660); setMode('metro'); }}
                            className={`px-3 py-1 border-2 text-xs font-mono font-black ${mode === 'metro' ? 'bg-amber-600 border-amber-400 text-black' : 'border-gray-600 text-gray-500'}`}
                        >
                            BEAT
                        </button>
                    </div>
                </div>

                {mode === 'tuner' ? (
                    <>
                        {/* TUNING + STRINGS */}
                        <div className="flex gap-1">
                            {Object.entries(TUNINGS).map(([key, val]) => (
                                <button
                                    key={key}
                                    onClick={() => { playBleep(550, 40); setTuning(key); }}
                                    className={`flex-1 py-1 border-2 font-mono text-[10px] font-black ${tuning === key ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-gray-700 text-gray-500'}`}
                                >
                                    {val.name}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-6 gap-1">
                            {t.notes.map((n, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => playStringTone(i)}
                                    className={`py-2 border-2 text-center transition-all ${playingTone === i ? 'border-green-400 bg-green-900/30' : 'border-gray-700 hover:border-cyan-500'}`}
                                >
                                    <span className={`text-sm font-black font-mono ${playingTone === i ? 'text-green-400' : 'text-gray-400'}`}>{n}</span>
                                    <span className={`block text-[8px] font-mono ${playingTone === i ? 'text-green-300' : 'text-gray-600'}`}>{t.freqs[i].toFixed(0)}</span>
                                </button>
                            ))}
                        </div>

                        {/* TUNER DISPLAY */}
                        <div 
                            className={`border-4 p-4 text-center ${listening ? inTune ? 'border-green-500' : close ? 'border-yellow-500' : 'border-red-500' : 'border-gray-700'}`}
                            style={inTune && listening ? { boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' } : {}}
                        >
                            {listening && note && (
                                <div className="mb-1">
                                    {cents < -5 && <p className="text-red-400 font-black font-mono text-sm animate-pulse">▼ FLAT</p>}
                                    {cents > 5 && <p className="text-red-400 font-black font-mono text-sm animate-pulse">▲ SHARP</p>}
                                    {inTune && <p className="text-green-400 font-black font-mono text-sm">● PERFECT</p>}
                                </div>
                            )}
                            
                            <AnimatePresence mode="wait">
                                {note ? (
                                    <motion.div key={note} initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                                        <p className={`text-6xl font-black font-mono ${inTune ? 'text-green-400' : close ? 'text-yellow-400' : 'text-red-400'}`}>{note}</p>
                                        <p className="text-cyan-400 text-lg font-mono font-bold">{freq.toFixed(1)} Hz</p>
                                    </motion.div>
                                ) : (
                                    <p className="text-gray-500 text-2xl font-mono font-bold py-4">{listening ? 'PLAY...' : 'TAP START'}</p>
                                )}
                            </AnimatePresence>

                            {listening && note && (
                                <div className="mt-2">
                                    <div className="relative h-4 bg-black border-2 border-gray-700">
                                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30" />
                                        <motion.div
                                            className="absolute top-0 bottom-0 w-2"
                                            animate={{ left: `calc(50% + ${Math.max(-60, Math.min(60, cents * 1.2))}px)` }}
                                            style={{ backgroundColor: inTune ? '#22c55e' : close ? '#eab308' : '#ef4444' }}
                                        />
                                    </div>
                                    <p className={`text-lg font-mono font-black mt-1 ${inTune ? 'text-green-400' : close ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {cents > 0 ? '+' : ''}{cents}¢
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={listening ? stopTuner : startTuner}
                            className={`w-full h-12 border-4 text-xl font-black font-mono ${listening ? 'bg-red-600 border-red-400 text-white' : 'bg-cyan-600 border-cyan-400 text-white'}`}
                        >
                            {listening ? '■ STOP' : '▶ START'}
                        </button>

                        {error && <p className="text-red-400 text-center font-mono font-black text-xs border-2 border-red-500 p-2">{error}</p>}
                    </>
                ) : (
                    <>
                        {/* METRONOME */}
                        <div className="text-center py-2">
                            <p className="text-6xl font-black font-mono text-white" style={{ textShadow: running ? '0 0 20px rgba(251, 191, 36, 0.8)' : 'none' }}>{bpm}</p>
                            <p className="text-amber-400 font-mono text-xs font-bold">BPM</p>
                        </div>

                        <div className="flex justify-center gap-3">
                            {[1, 2, 3, 4].map((b) => (
                                <motion.div
                                    key={b}
                                    animate={beat === b ? { scale: [1, 1.3, 1] } : {}}
                                    transition={{ duration: 0.08 }}
                                    className={`w-10 h-10 border-4 ${beat === b ? b === 1 ? 'bg-amber-400 border-amber-300' : 'bg-amber-600 border-amber-400' : 'bg-black border-gray-700'}`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center gap-2">
                            {[-10, -1, 1, 10].map((delta) => (
                                <button key={delta} onClick={() => adjustBpm(delta)} className="w-12 h-10 border-2 border-gray-700 bg-black text-white font-mono font-black text-sm hover:border-amber-500">
                                    {delta > 0 ? '+' : ''}{delta}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-6 gap-1">
                            {[60, 80, 100, 120, 140, 160].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => { playBleep(660, 30); setBpm(p); }}
                                    className={`py-1 border-2 font-mono text-xs font-black ${bpm === p ? 'bg-amber-600 border-amber-400 text-black' : 'border-gray-700 text-gray-400'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={running ? stopMetro : startMetro}
                            className={`w-full h-12 border-4 text-xl font-black font-mono ${running ? 'bg-red-600 border-red-400 text-white' : 'bg-amber-600 border-amber-400 text-black'}`}
                        >
                            {running ? '■ STOP' : '▶ START'}
                        </button>
                    </>
                )}

                {/* COLLAPSIBLE INTEL */}
                <button 
                    onClick={() => { playBleep(440, 30); setShowIntel(!showIntel); }}
                    className="w-full flex items-center justify-center gap-2 py-2 border-t-2 border-purple-500/50 text-purple-400 font-mono text-xs font-black"
                >
                    FREQUENCY INTEL {showIntel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                    {showIntel && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-2 text-[10px] font-mono text-gray-400"
                        >
                            <div className="border-2 border-purple-500/30 p-2">
                                <p className="text-purple-300 font-bold">A440 STANDARD</p>
                                <p>International pitch standard since 1955. A4 = 440Hz.</p>
                            </div>
                            <div className="border-2 border-cyan-500/30 p-2">
                                <p className="text-cyan-300 font-bold">PURE SINE WAVES</p>
                                <p>Tuning forks = sine waves. No harmonics = cleanest reference.</p>
                            </div>
                            <div className="border-2 border-green-500/30 p-2">
                                <p className="text-green-300 font-bold">CENTS</p>
                                <p>1 semitone = 100 cents. ±5 = in tune. ±15 = close.</p>
                            </div>
                            <div className="border-2 border-amber-500/30 p-2">
                                <p className="text-amber-300 font-bold">AUTOCORRELATION</p>
                                <p>Finds repeating waveform patterns → fundamental frequency. Pro tuner math.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}