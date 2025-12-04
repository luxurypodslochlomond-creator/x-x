import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Users, Copy, Check, X, Volume2 } from 'lucide-react';

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

// REFERENCE TONE - Pure sine
const playReferenceTone = (frequency, duration = 3000) => {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.35, ctx.currentTime + duration/1000 - 0.1);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration/1000);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration/1000);
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
        return { stop: () => { try { osc.stop(); } catch(e) {} } };
    } catch(e) { return null; }
};

// FREQUENCY → COLOUR (cymatics/chakra inspired)
const freqToColor = (freq) => {
    if (freq < 100) return { bg: 'from-red-900 to-red-600', glow: '#ef4444', name: 'ROOT' };
    if (freq < 150) return { bg: 'from-orange-900 to-orange-500', glow: '#f97316', name: 'SACRAL' };
    if (freq < 200) return { bg: 'from-yellow-900 to-yellow-500', glow: '#eab308', name: 'SOLAR' };
    if (freq < 260) return { bg: 'from-green-900 to-green-500', glow: '#22c55e', name: 'HEART' };
    if (freq < 350) return { bg: 'from-cyan-900 to-cyan-500', glow: '#06b6d4', name: 'THROAT' };
    if (freq < 450) return { bg: 'from-blue-900 to-blue-500', glow: '#3b82f6', name: 'THIRD EYE' };
    return { bg: 'from-purple-900 to-violet-500', glow: '#a855f7', name: 'CROWN' };
};

const STANDARD_NOTES = [
    { note: 'E', freq: 82.41, label: 'E2' },
    { note: 'A', freq: 110, label: 'A2' },
    { note: 'D', freq: 146.83, label: 'D3' },
    { note: 'G', freq: 196, label: 'G3' },
    { note: 'B', freq: 246.94, label: 'B3' },
    { note: 'E', freq: 329.63, label: 'E4' },
    { note: 'A', freq: 440, label: 'A4' },
];

const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
};

export default function TunerTogetherPage() {
    const [mode, setMode] = useState('lobby');
    const [roomCode, setRoomCode] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [soulName, setSoulName] = useState('');
    const [copied, setCopied] = useState(false);
    const [room, setRoom] = useState(null);
    const [mySoul, setMySoul] = useState(null);
    const [souls, setSouls] = useState([]);
    const [allInSync, setAllInSync] = useState(false);
    
    // Tuning state
    const [listening, setListening] = useState(false);
    const [freq, setFreq] = useState(0);
    const [cents, setCents] = useState(0);
    const [error, setError] = useState(null);
    const [playingTone, setPlayingTone] = useState(false);
    
    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const toneRef = useRef(null);
    const syncIntervalRef = useRef(null);
    const lastToneTimestamp = useRef(null);

    // FAST SYNC LOOP - 200ms polling via backend function
    const syncWithRoom = useCallback(async () => {
        if (!roomCode || !mySoul) return;
        
        try {
            const response = await base44.functions.invoke('tunerSync', {
                action: 'ping',
                room_code: roomCode,
                soul_id: mySoul.id,
                current_freq: freq,
                target_freq: room?.target_freq || 440
            });
            
            if (response.data) {
                setSouls(response.data.souls || []);
                setRoom(response.data.room);
                
                // ALL IN SYNC MOMENT
                if (response.data.all_in_sync && !allInSync) {
                    setAllInSync(true);
                    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
                    playBleep(880, 100);
                } else if (!response.data.all_in_sync) {
                    setAllInSync(false);
                }
                
                // Check for tone trigger
                if (response.data.room?.tone_timestamp && 
                    response.data.room.tone_timestamp !== lastToneTimestamp.current) {
                    lastToneTimestamp.current = response.data.room.tone_timestamp;
                    if (toneRef.current) toneRef.current.stop();
                    toneRef.current = playReferenceTone(response.data.room.target_freq, 3000);
                    setPlayingTone(true);
                    setTimeout(() => setPlayingTone(false), 3000);
                }
            }
        } catch (e) {
            console.log('Sync error:', e);
        }
    }, [roomCode, mySoul, freq, room?.target_freq, allInSync]);

    useEffect(() => {
        if (mode !== 'lobby' && mySoul) {
            syncIntervalRef.current = setInterval(syncWithRoom, 200); // 200ms = 5 updates/second
            return () => clearInterval(syncIntervalRef.current);
        }
    }, [mode, mySoul, syncWithRoom]);

    // PITCH DETECTION
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

    const detectPitch = () => {
        if (!analyserRef.current) return;
        const buf = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(buf);
        const f = autoCorrelate(buf, audioCtxRef.current.sampleRate);
        if (f > 0 && f < 1000 && room?.target_freq) {
            setFreq(f);
            const centsOff = Math.floor(1200 * Math.log(f / room.target_freq) / Math.log(2));
            setCents(centsOff);
        }
        rafRef.current = requestAnimationFrame(detectPitch);
    };

    const startListening = async () => {
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

    const stopListening = () => {
        playBleep(440);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        if (audioCtxRef.current) audioCtxRef.current.close();
        setListening(false);
        setFreq(0);
        setCents(0);
    };

    const createRoom = async () => {
        playBleep(880);
        const code = generateRoomCode();
        const name = soulName || 'Soul 1';
        
        const newRoom = await base44.entities.TunerRoom.create({
            room_code: code,
            target_note: 'A',
            target_freq: 440,
            active: true
        });
        
        const soul = await base44.entities.TunerSoul.create({
            room_code: code,
            soul_name: name,
            current_freq: 0,
            in_tune: false,
            last_ping: new Date().toISOString()
        });
        
        setRoomCode(code);
        setRoom(newRoom);
        setMySoul(soul);
        setMode('hosting');
    };

    const joinRoom = async () => {
        playBleep(880);
        const code = joinCode.toUpperCase().trim();
        if (code.length !== 4) return;
        
        const rooms = await base44.entities.TunerRoom.filter({ room_code: code, active: true });
        if (rooms.length === 0) {
            setError('ROOM NOT FOUND');
            return;
        }
        
        const name = soulName || `Soul ${Math.floor(Math.random() * 99)}`;
        const soul = await base44.entities.TunerSoul.create({
            room_code: code,
            soul_name: name,
            current_freq: 0,
            in_tune: false,
            last_ping: new Date().toISOString()
        });
        
        setRoomCode(code);
        setRoom(rooms[0]);
        setMySoul(soul);
        setMode('joined');
    };

    const changeTargetNote = async (noteData) => {
        playBleep(660);
        if (!room) return;
        await base44.entities.TunerRoom.update(room.id, {
            target_note: noteData.note,
            target_freq: noteData.freq
        });
        setRoom({ ...room, target_note: noteData.note, target_freq: noteData.freq });
    };

    const triggerTone = async () => {
        if (!room) return;
        playBleep(550, 40);
        await base44.functions.invoke('tunerSync', {
            action: 'trigger_tone',
            room_id: room.id
        });
    };

    const copyCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        playBleep(880);
        setTimeout(() => setCopied(false), 2000);
    };

    const leaveRoom = async () => {
        playBleep(440);
        stopListening();
        if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
        if (mySoul) await base44.entities.TunerSoul.delete(mySoul.id);
        if (mode === 'hosting' && room) {
            await base44.entities.TunerRoom.update(room.id, { active: false });
        }
        setMode('lobby');
        setRoomCode('');
        setRoom(null);
        setMySoul(null);
        setSouls([]);
    };

    useEffect(() => {
        return () => {
            stopListening();
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
            if (toneRef.current) toneRef.current.stop();
        };
    }, []);

    const inTune = Math.abs(cents) < 10;
    const close = Math.abs(cents) < 25;
    const soulsInTune = souls.filter(s => s.in_tune).length;
    const colorData = room ? freqToColor(room.target_freq) : { bg: 'from-gray-900 to-gray-700', glow: '#666' };

    // LOBBY
    if (mode === 'lobby') {
        return (
            <div className="min-h-screen bg-black text-white p-4 pt-20 lg:pt-4">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center border-b-4 border-green-500 pb-4">
                        <h1 className="text-3xl font-black font-mono text-green-400">TUNE TOGETHER</h1>
                        <p className="text-gray-500 text-xs font-mono mt-1">∞ souls • 1 frequency • same moment</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Your name..."
                        value={soulName}
                        onChange={(e) => setSoulName(e.target.value)}
                        className="w-full p-3 bg-black border-4 border-gray-700 text-white font-mono text-center focus:border-green-500 outline-none"
                        maxLength={20}
                    />

                    <button
                        onClick={createRoom}
                        className="w-full h-16 border-4 border-green-400 bg-green-600 text-white text-xl font-black font-mono hover:bg-green-700 transition-all"
                        style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
                    >
                        CREATE ROOM
                    </button>

                    <div className="text-center text-gray-500 font-mono text-sm">— or —</div>

                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="ROOM CODE"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                            className="w-full p-3 bg-black border-4 border-gray-700 text-white font-mono text-center text-2xl tracking-widest focus:border-cyan-500 outline-none"
                            maxLength={4}
                        />
                        <button
                            onClick={joinRoom}
                            disabled={joinCode.length !== 4}
                            className={`w-full h-12 border-4 text-lg font-black font-mono ${joinCode.length === 4 ? 'border-cyan-400 bg-cyan-600 text-white' : 'border-gray-700 text-gray-600'}`}
                        >
                            JOIN
                        </button>
                    </div>

                    {error && <p className="text-red-400 text-center font-mono font-black text-sm border-2 border-red-500 p-2">{error}</p>}

                    <div className="border-2 border-gray-800 p-4 space-y-2">
                        <p className="text-cyan-400 text-xs font-mono font-black">HOW IT WORKS</p>
                        <p className="text-gray-500 text-xs font-mono">1. Create room or join with code</p>
                        <p className="text-gray-500 text-xs font-mono">2. Everyone tunes to same note</p>
                        <p className="text-gray-500 text-xs font-mono">3. See when all souls sync</p>
                        <p className="text-gray-600 text-[10px] font-mono mt-2">Same frequency. Same moment. Different places.</p>
                    </div>
                </div>
            </div>
        );
    }

    // ROOM VIEW - WITH COLOUR
    return (
        <div className={`min-h-screen bg-gradient-to-br ${allInSync ? colorData.bg : 'from-black to-gray-900'} text-white p-3 pt-20 lg:pt-3 transition-all duration-1000`}>
            
            {/* COLOUR GLOW OVERLAY WHEN ALL IN SYNC */}
            {allInSync && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{ 
                        background: `radial-gradient(circle at 50% 50%, ${colorData.glow}40, transparent 70%)`,
                    }}
                />
            )}
            
            <div className="max-w-md mx-auto space-y-3 relative z-10">
                
                {/* HEADER */}
                <div className="flex items-center justify-between border-b-4 border-green-500 pb-2 bg-black/50 backdrop-blur-sm p-2 -m-2">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-black font-mono">{souls.length} SOULS</span>
                    </div>
                    <button
                        onClick={copyCode}
                        className="flex items-center gap-2 px-3 py-1 border-2 border-green-500 bg-black font-mono font-black text-green-400"
                    >
                        {roomCode} {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={leaveRoom} className="p-2 border-2 border-red-500 text-red-400 bg-black">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* TARGET NOTE + COLOUR */}
                <motion.div 
                    className={`text-center py-4 border-4 bg-gradient-to-br ${colorData.bg}`}
                    animate={allInSync ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{ boxShadow: `0 0 ${allInSync ? '50' : '20'}px ${colorData.glow}` }}
                >
                    <p className="text-white/60 text-xs font-mono mb-1">{colorData.name} FREQUENCY</p>
                    <p className="text-6xl font-black font-mono text-white drop-shadow-lg">{room?.target_note}</p>
                    <p className="text-white/80 font-mono text-xl">{room?.target_freq} Hz</p>
                </motion.div>

                {/* NOTE SELECTOR (HOST ONLY) */}
                {mode === 'hosting' && (
                    <div className="grid grid-cols-7 gap-1">
                        {STANDARD_NOTES.map((n) => {
                            const nColor = freqToColor(n.freq);
                            return (
                                <button
                                    key={n.label}
                                    onClick={() => changeTargetNote(n)}
                                    className={`py-2 border-2 font-mono text-xs font-black transition-all ${room?.target_freq === n.freq ? 'border-white text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}
                                    style={room?.target_freq === n.freq ? { backgroundColor: nColor.glow + '40' } : {}}
                                >
                                    {n.note}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* PLAY TONE - EVERYONE HEARS IT */}
                <button
                    onClick={triggerTone}
                    className={`w-full py-3 border-4 font-mono font-black flex items-center justify-center gap-2 ${playingTone ? 'bg-white text-black border-white' : 'border-gray-600 text-gray-300 hover:border-white bg-black/50'}`}
                    style={playingTone ? { boxShadow: `0 0 30px ${colorData.glow}` } : {}}
                >
                    <Volume2 className={`w-5 h-5 ${playingTone ? 'animate-pulse' : ''}`} />
                    {playingTone ? 'ALL SOULS HEARING TONE...' : 'BROADCAST TONE TO ALL'}
                </button>

                {/* TUNING DISPLAY */}
                <div 
                    className={`border-4 p-4 text-center bg-black/70 backdrop-blur-sm ${listening ? inTune ? 'border-green-500' : close ? 'border-yellow-500' : 'border-red-500' : 'border-gray-700'}`}
                    style={inTune && listening ? { boxShadow: `0 0 40px ${colorData.glow}` } : {}}
                >
                    {listening ? (
                        <>
                            {cents < -10 && <p className="text-red-400 font-black font-mono text-sm animate-pulse">▼ FLAT</p>}
                            {cents > 10 && <p className="text-red-400 font-black font-mono text-sm animate-pulse">▲ SHARP</p>}
                            {inTune && <p className="text-green-400 font-black font-mono text-sm">● IN SYNC</p>}
                            <p className={`text-4xl font-black font-mono ${inTune ? 'text-green-400' : close ? 'text-yellow-400' : 'text-red-400'}`}>
                                {freq.toFixed(1)} Hz
                            </p>
                            <p className={`text-xl font-mono font-black ${inTune ? 'text-green-400' : close ? 'text-yellow-400' : 'text-red-400'}`}>
                                {cents > 0 ? '+' : ''}{cents}¢
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-500 text-xl font-mono font-bold py-2">TAP START</p>
                    )}
                </div>

                <button
                    onClick={listening ? stopListening : startListening}
                    className={`w-full h-12 border-4 text-xl font-black font-mono ${listening ? 'bg-red-600 border-red-400 text-white' : 'bg-green-600 border-green-400 text-white'}`}
                >
                    {listening ? '■ STOP' : '▶ START TUNING'}
                </button>

                {error && <p className="text-red-400 text-center font-mono font-black text-xs border-2 border-red-500 p-2 bg-black">{error}</p>}

                {/* SOULS STATUS */}
                <div className={`border-4 p-3 space-y-2 bg-black/70 backdrop-blur-sm ${allInSync ? 'border-white' : 'border-green-500/50'}`}>
                    <div className="flex justify-between items-center">
                        <span className="text-green-400 font-mono font-black text-sm">SOULS IN SYNC</span>
                        <span className="text-3xl font-black font-mono text-green-400">{soulsInTune}/{souls.length}</span>
                    </div>
                    
                    {/* ALL IN SYNC = MAGIC */}
                    <AnimatePresence>
                        {allInSync && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-center py-3 border-4 border-white"
                                style={{ 
                                    boxShadow: `0 0 50px ${colorData.glow}`,
                                    background: `linear-gradient(135deg, ${colorData.glow}40, ${colorData.glow}20)`
                                }}
                            >
                                <motion.p 
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="text-white font-black font-mono text-lg"
                                >
                                    ✦ ALL SOULS IN SYNC ✦
                                </motion.p>
                                <p className="text-white/60 text-xs font-mono mt-1">{room?.target_freq} Hz • {colorData.name}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <div className="grid grid-cols-4 gap-1">
                        {souls.map((soul) => (
                            <motion.div
                                key={soul.id}
                                animate={soul.in_tune ? { scale: [1, 1.05, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className={`p-2 border-2 text-center ${soul.in_tune ? 'border-green-400' : 'border-gray-700'}`}
                                style={soul.in_tune ? { backgroundColor: colorData.glow + '30' } : {}}
                            >
                                <span className={`text-xs font-mono font-bold truncate block ${soul.in_tune ? 'text-white' : 'text-gray-500'}`}>
                                    {soul.soul_name}
                                </span>
                                <span className={`text-lg ${soul.in_tune ? 'text-green-400' : 'text-gray-600'}`}>
                                    {soul.in_tune ? '●' : '○'}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* LATENCY INFO */}
                <p className="text-center text-gray-600 text-[10px] font-mono">
                    5 updates/second • ~200ms sync
                </p>

            </div>
        </div>
    );
}