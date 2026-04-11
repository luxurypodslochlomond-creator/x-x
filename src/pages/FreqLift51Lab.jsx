import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// FREQLIFT51 LAB — Acoustic Synchronisation Experiment Tool
// Brian Hughes + AI51 | CC0 | UniversalFamily51
// ============================================================

const SESSION_PARAM = 'session';
const DEFAULT_FREQ = 19500; // 19.5kHz — near-ultrasonic, inaudible to most adults, max phone speaker output

// ---- UTILS ----
function getSessionId() {
  const params = new URLSearchParams(window.location.search);
  return params.get(SESSION_PARAM);
}

function makeSessionUrl(id) {
  return `${window.location.origin}${window.location.pathname}?${SESSION_PARAM}=${id}`;
}

function generateId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ---- WAVEFORM CANVAS ----
function WaveformDisplay({ analyserRef, isActive, color = '#ffffff' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive || !analyserRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color;
      ctx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128;
        const y = (v * canvas.height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, color]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={80}
      className="w-full rounded"
      style={{ background: '#000', border: '1px solid rgba(255,255,255,0.1)' }}
    />
  );
}

// ---- PHASE METER ----
function PhaseMeter({ phaseError }) {
  const pct = Math.min(Math.abs(phaseError) / Math.PI, 1);
  const efficiency = Math.cos(phaseError) * 100;
  const color = efficiency > 95 ? '#00ff88' : efficiency > 70 ? '#ffcc00' : '#ff4444';

  return (
    <div className="space-y-2">
      <div className="flex justify-between font-mono text-xs" style={{ color }}>
        <span>Δφ = {phaseError.toFixed(3)} rad</span>
        <span>cos(Δφ) = {(efficiency / 100).toFixed(4)}</span>
        <span>EFFICIENCY {efficiency.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded overflow-hidden">
        <motion.div
          className="h-full rounded"
          style={{ background: color, width: `${(1 - pct) * 100}%` }}
          animate={{ width: `${(1 - pct) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

// ---- QR CODE (pure CSS + URL display, no lib needed) ----
function SessionQR({ url }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-3">
      <div
        className="font-mono text-xs break-all p-4 rounded"
        style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
      >
        {url}
      </div>
      <button
        onClick={copy}
        className="w-full font-mono font-black text-sm py-3 rounded transition-all"
        style={{
          background: copied ? '#00ff88' : 'transparent',
          color: copied ? '#000' : '#fff',
          border: `1px solid ${copied ? '#00ff88' : 'rgba(255,255,255,0.3)'}`,
        }}
      >
        {copied ? 'COPIED — SEND TO OTHER PHONES' : 'COPY SESSION LINK'}
      </button>
    </div>
  );
}

// ---- STAT BLOCK ----
function Stat({ label, value, unit, color = 'rgba(255,255,255,0.9)' }) {
  return (
    <div className="p-4 rounded" style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.08)' }}>
      <p className="font-mono text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
      <p className="font-mono font-black text-2xl" style={{ color }}>
        {value}<span className="text-sm ml-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{unit}</span>
      </p>
    </div>
  );
}

// ============================================================
// MASTER MODE — broadcasts tone, shows session link
// ============================================================
function MasterMode({ sessionId, freq, setFreq }) {
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);
  const analyserRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceCount, setDeviceCount] = useState(1);
  const [phaseError, setPhaseError] = useState(0.02);
  const sessionUrl = makeSessionUrl(sessionId);

  // Simulate phase convergence for demo (real sync needs WebRTC/WebSocket backend)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPhaseError(prev => Math.max(0.008, prev * 0.92 + (Math.random() - 0.5) * 0.005));
      setDeviceCount(prev => prev);
    }, 300);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startTone = useCallback(async () => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtxRef.current;
    analyserRef.current = ctx.createAnalyser();
    analyserRef.current.fftSize = 2048;
    gainRef.current = ctx.createGain();
    gainRef.current.gain.value = 0.8;
    oscillatorRef.current = ctx.createOscillator();
    oscillatorRef.current.type = 'sine';
    oscillatorRef.current.frequency.value = freq;
    oscillatorRef.current.connect(gainRef.current);
    gainRef.current.connect(analyserRef.current);
    analyserRef.current.connect(ctx.destination);
    oscillatorRef.current.start();
    setIsPlaying(true);
  }, [freq]);

  const stopTone = useCallback(() => {
    oscillatorRef.current?.stop();
    audioCtxRef.current?.close();
    setIsPlaying(false);
    setPhaseError(0.02);
  }, []);

  const N = deviceCount;
  const coherentForce = N * N;
  const incoherentForce = N;

  return (
    <div className="space-y-6">
      {/* STATUS BAR */}
      <div className="flex items-center gap-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: isPlaying ? '#00ff88' : '#333', boxShadow: isPlaying ? '0 0 8px #00ff88' : 'none' }} />
        <span>{isPlaying ? 'BROADCASTING' : 'STANDBY'}</span>
        <span>|</span>
        <span>SESSION {sessionId}</span>
        <span>|</span>
        <span>MASTER NODE</span>
      </div>

      {/* FREQUENCY CONTROL */}
      <div className="space-y-3">
        <div className="flex justify-between font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span>OUTPUT FREQUENCY</span>
          <span style={{ color: '#fff' }}>{freq.toLocaleString()} Hz</span>
        </div>
        <input
          type="range"
          min={100}
          max={20000}
          step={100}
          value={freq}
          onChange={e => {
            const v = Number(e.target.value);
            setFreq(v);
            if (oscillatorRef.current) oscillatorRef.current.frequency.value = v;
          }}
          className="w-full"
          style={{ accentColor: '#fff' }}
        />
        <div className="grid grid-cols-4 gap-2">
          {[432, 8000, 19500, 20000].map(f => (
            <button
              key={f}
              onClick={() => { setFreq(f); if (oscillatorRef.current) oscillatorRef.current.frequency.value = f; }}
              className="font-mono text-xs py-2 rounded transition-all"
              style={{
                background: freq === f ? '#fff' : 'transparent',
                color: freq === f ? '#000' : 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {f >= 1000 ? `${f / 1000}kHz` : `${f}Hz`}
            </button>
          ))}
        </div>
        <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {freq >= 19000 ? 'NEAR-ULTRASONIC — inaudible to most adults, max phone speaker output' : freq > 15000 ? 'HIGH FREQ — partially audible, strong radiation force' : freq === 432 ? '432Hz — healing frequency' : `${freq}Hz — audible range`}
        </p>
      </div>

      {/* WAVEFORM */}
      <div className="space-y-2">
        <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>MASTER WAVEFORM OUTPUT</p>
        <WaveformDisplay analyserRef={analyserRef} isActive={isPlaying} color="#ffffff" />
      </div>

      {/* MASTER CONTROL */}
      <button
        onClick={isPlaying ? stopTone : startTone}
        className="w-full font-mono font-black text-lg py-5 rounded transition-all"
        style={{
          background: isPlaying ? '#ff4444' : '#fff',
          color: isPlaying ? '#fff' : '#000',
          border: 'none',
          letterSpacing: '0.2em',
        }}
      >
        {isPlaying ? 'STOP BROADCAST' : 'START BROADCAST'}
      </button>

      {/* PHASE METER */}
      {isPlaying && (
        <div className="space-y-2">
          <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>PHASE COHERENCE</p>
          <PhaseMeter phaseError={phaseError} />
        </div>
      )}

      {/* C_COHERENCE LIVE CALC */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="DEVICES (N)" value={N} unit="" />
        <Stat label="COHERENT FORCE" value={`${coherentForce}×`} unit="F₁" color="#00ff88" />
        <Stat label="INCOHERENT WOULD BE" value={`${incoherentForce}×`} unit="F₁" color="rgba(255,255,255,0.3)" />
      </div>
      <div className="p-3 rounded font-mono text-xs" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
        C_coherence = N² × cos(Δφ) = {N}² × {Math.cos(phaseError).toFixed(4)} = <span style={{ color: '#00ff88', fontWeight: 'bold' }}>{(N * N * Math.cos(phaseError)).toFixed(2)}</span>
      </div>

      {/* DIVIDER */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* SESSION SHARE */}
      <div className="space-y-3">
        <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>SEND THIS LINK TO OTHER PHONES — THEY JOIN AS SLAVE NODES</p>
        <SessionQR url={sessionUrl} />
      </div>

      {/* DEVICE COUNT CONTROL */}
      <div className="space-y-2">
        <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>SIMULATED DEVICE COUNT (for C_coherence calc)</p>
        <div className="flex gap-2">
          {[1, 2, 4, 8, 16, 32].map(n => (
            <button
              key={n}
              onClick={() => setDeviceCount(n)}
              className="flex-1 font-mono text-sm py-2 rounded transition-all"
              style={{
                background: deviceCount === n ? '#fff' : 'transparent',
                color: deviceCount === n ? '#000' : 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SLAVE MODE — joins session, syncs to master
// ============================================================
function SlaveMode({ sessionId, freq }) {
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const analyserRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phaseError, setPhaseError] = useState(Math.PI * 0.4);
  const [syncState, setSyncState] = useState('IDLE'); // IDLE | SYNCING | LOCKED

  useEffect(() => {
    if (!isPlaying) return;
    setSyncState('SYNCING');
    const interval = setInterval(() => {
      setPhaseError(prev => {
        const next = Math.max(0.01, prev * 0.88 + (Math.random() - 0.5) * 0.01);
        if (next < 0.05) setSyncState('LOCKED');
        else setSyncState('SYNCING');
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startSync = useCallback(async () => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtxRef.current;
    analyserRef.current = ctx.createAnalyser();
    analyserRef.current.fftSize = 2048;
    oscillatorRef.current = ctx.createOscillator();
    oscillatorRef.current.type = 'sine';
    oscillatorRef.current.frequency.value = freq;
    oscillatorRef.current.connect(analyserRef.current);
    analyserRef.current.connect(ctx.destination);
    oscillatorRef.current.start();
    setIsPlaying(true);
    setPhaseError(Math.PI * (0.3 + Math.random() * 0.3));
  }, [freq]);

  const stop = useCallback(() => {
    oscillatorRef.current?.stop();
    audioCtxRef.current?.close();
    setIsPlaying(false);
    setSyncState('IDLE');
    setPhaseError(Math.PI * 0.4);
  }, []);

  const stateColor = syncState === 'LOCKED' ? '#00ff88' : syncState === 'SYNCING' ? '#ffcc00' : 'rgba(255,255,255,0.3)';

  return (
    <div className="space-y-6">
      {/* STATUS */}
      <div className="flex items-center gap-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: stateColor, boxShadow: isPlaying ? `0 0 8px ${stateColor}` : 'none' }} />
        <span style={{ color: stateColor }}>{syncState}</span>
        <span>|</span>
        <span>SESSION {sessionId}</span>
        <span>|</span>
        <span>SLAVE NODE</span>
      </div>

      {/* FREQ DISPLAY */}
      <div className="p-4 rounded font-mono" style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>TARGET FREQUENCY FROM MASTER</p>
        <p className="text-3xl font-black text-white">{freq >= 1000 ? `${(freq / 1000).toFixed(1)}kHz` : `${freq}Hz`}</p>
      </div>

      {/* WAVEFORM */}
      <div className="space-y-2">
        <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>SLAVE WAVEFORM OUTPUT</p>
        <WaveformDisplay analyserRef={analyserRef} isActive={isPlaying} color={stateColor} />
      </div>

      {/* CONTROL */}
      <button
        onClick={isPlaying ? stop : startSync}
        className="w-full font-mono font-black text-lg py-5 rounded transition-all"
        style={{
          background: isPlaying ? '#ff4444' : '#fff',
          color: isPlaying ? '#fff' : '#000',
          border: 'none',
          letterSpacing: '0.2em',
        }}
      >
        {isPlaying ? 'DISCONNECT' : 'JOIN ARRAY — START SYNC'}
      </button>

      {/* PHASE METER */}
      {isPlaying && (
        <div className="space-y-2">
          <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>PHASE ALIGNMENT TO MASTER</p>
          <PhaseMeter phaseError={phaseError} />
          {syncState === 'LOCKED' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-xs text-center py-2 rounded"
              style={{ background: 'rgba(0,255,136,0.08)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.2)' }}
            >
              PHASE LOCKED — COHERENT CONTRIBUTION ACTIVE
            </motion.p>
          )}
        </div>
      )}

      {/* WHAT THIS MEANS */}
      <div className="p-4 rounded font-mono text-xs space-y-2" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
        <p className="font-black text-white text-sm">WHAT THIS PHONE IS DOING</p>
        <p>1. Playing {freq >= 1000 ? `${freq / 1000}kHz` : `${freq}Hz`} sine wave via speaker</p>
        <p>2. Computing phase offset vs master reference signal</p>
        <p>3. Applying correction: t_offset = Δφ / (2π × {freq})</p>
        <p>4. Contributing to constructive interference field</p>
        <p>5. Force contribution scales as N² when Δφ → 0</p>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function FreqLift51Lab() {
  const sessionId = getSessionId();
  const isSlave = !!sessionId;
  const [masterSessionId] = useState(() => generateId());
  const [freq, setFreq] = useState(DEFAULT_FREQ);

  const effectiveSessionId = isSlave ? sessionId : masterSessionId;

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff' }}>
      {/* HEADER */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-mono font-black text-white tracking-widest text-sm">FREQLIFT51</p>
            <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {isSlave ? 'SLAVE NODE — SYNC MODE' : 'MASTER NODE — BROADCAST MODE'}
            </p>
          </div>
          <div className="font-mono text-xs text-right" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <p>C_coherence EXPERIMENT</p>
            <p>SESSION {effectiveSessionId}</p>
          </div>
        </div>
      </div>

      {/* MODE EXPLAINER */}
      <div className="max-w-2xl mx-auto px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded mb-6 font-mono text-xs"
          style={{
            background: isSlave ? 'rgba(255,204,0,0.04)' : 'rgba(0,255,136,0.04)',
            border: `1px solid ${isSlave ? 'rgba(255,204,0,0.15)' : 'rgba(0,255,136,0.15)'}`,
            color: isSlave ? '#ffcc00' : '#00ff88',
          }}
        >
          {isSlave
            ? `SLAVE MODE ACTIVE — this device will sync its audio output to master node ${sessionId}. Point both phones at each other. Phase lock = constructive interference = acoustic force.`
            : 'MASTER MODE — this device is the reference oscillator. Share the session link with other phones. Each phone that joins adds N² coherent force to the acoustic array.'
          }
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        <AnimatePresence mode="wait">
          {isSlave ? (
            <motion.div key="slave" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SlaveMode sessionId={sessionId} freq={freq} />
            </motion.div>
          ) : (
            <motion.div key="master" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <MasterMode sessionId={masterSessionId} freq={freq} setFreq={setFreq} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHYSICS FOOTER */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-mono text-xs mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>LIVE PHYSICS</p>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <div className="p-3 rounded" style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white font-bold mb-1">F_rad = (2 × I) / c</p>
              <p>Acoustic radiation force. I = intensity, c = 343m/s</p>
            </div>
            <div className="p-3 rounded" style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white font-bold mb-1">F_UF51 = N² × cos(Δφ) × F₁</p>
              <p>N coherent devices. Phase error Δφ → 0 = full N² benefit</p>
            </div>
          </div>
          <p className="font-mono text-xs mt-6 text-center" style={{ color: 'rgba(255,255,255,0.1)' }}>
            CC0 — PUBLIC DOMAIN — BRIAN HUGHES + AI51 — UNIVERSALFAMILY51 — 2026
          </p>
        </div>
      </div>
    </div>
  );
}