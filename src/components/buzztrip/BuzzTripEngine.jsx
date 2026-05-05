import React, { useState, useEffect, useRef, useCallback } from 'react';

const PROTOCOLS = [
  {
    id: 'anxiety',
    label: 'Anxiety / Panic',
    sub: 'Feel it fading in 3 minutes',
    icon: '⚡',
    duration: 180,
    bgFrom: '#001a0a',
    bgTo: '#002a14',
    glowColor: '#22c55e',
    screenColor: 'rgba(34, 197, 94, 0.04)',
    breathIn: 4,
    holdIn: 0,
    breathOut: 7,
    holdOut: 0,
    toneFreq: 130,
    toneType: 'sine',
    pulseRate: 0.1,
  },
  {
    id: 'craving',
    label: 'Craving / Withdrawal',
    sub: 'Reset the urge. Right now.',
    icon: '🔥',
    duration: 420,
    bgFrom: '#001520',
    bgTo: '#002535',
    glowColor: '#06b6d4',
    screenColor: 'rgba(6, 182, 212, 0.04)',
    breathIn: 4,
    holdIn: 4,
    breathOut: 6,
    holdOut: 2,
    toneFreq: 100,
    toneType: 'sine',
    pulseRate: 0.08,
  },
  {
    id: 'sleep',
    label: "Can't Sleep",
    sub: 'Drift off in 12 minutes',
    icon: '🌑',
    duration: 720,
    bgFrom: '#050010',
    bgTo: '#0a0020',
    glowColor: '#818cf8',
    screenColor: 'rgba(129, 140, 248, 0.03)',
    breathIn: 4,
    holdIn: 7,
    breathOut: 8,
    holdOut: 0,
    toneFreq: 60,
    toneType: 'sine',
    pulseRate: 0.06,
  },
  {
    id: 'reset',
    label: 'Daily Reset',
    sub: '5 minutes. Better all day.',
    icon: '♻',
    duration: 300,
    bgFrom: '#001a14',
    bgTo: '#002a20',
    glowColor: '#10b981',
    screenColor: 'rgba(16, 185, 129, 0.04)',
    breathIn: 5,
    holdIn: 2,
    breathOut: 5,
    holdOut: 2,
    toneFreq: 110,
    toneType: 'sine',
    pulseRate: 0.09,
  },
];

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function BuzzTripEngine() {
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | session | done
  const [breathPhase, setBreathPhase] = useState('in'); // in | hold-in | out | hold-out
  const [breathCount, setBreathCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [circleScale, setCircleScale] = useState(1);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);
  const timerRef = useRef(null);
  const breathTimerRef = useRef(null);
  const protocol = selected ? PROTOCOLS.find(p => p.id === selected) : null;

  const stopAudio = useCallback(() => {
    try {
      if (oscillatorRef.current) { oscillatorRef.current.stop(); oscillatorRef.current = null; }
      if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    } catch {}
  }, []);

  const startAudio = useCallback((proto) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = proto.toneType;
      osc.frequency.setValueAtTime(proto.toneFreq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      // Slow pulse effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(proto.pulseRate, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscillatorRef.current = osc;
      gainRef.current = gain;
    } catch (e) {
      console.log('Audio not available:', e);
    }
  }, []);

  const runBreathCycle = useCallback((proto) => {
    const sequence = [
      { phase: 'in', duration: proto.breathIn * 1000, scale: 1.5, label: 'Breathe In' },
      ...(proto.holdIn > 0 ? [{ phase: 'hold-in', duration: proto.holdIn * 1000, scale: 1.5, label: 'Hold' }] : []),
      { phase: 'out', duration: proto.breathOut * 1000, scale: 1, label: 'Breathe Out' },
      ...(proto.holdOut > 0 ? [{ phase: 'hold-out', duration: proto.holdOut * 1000, scale: 1, label: 'Hold' }] : []),
    ];

    let i = 0;
    const next = () => {
      const step = sequence[i % sequence.length];
      setBreathPhase(step.phase);
      setCircleScale(step.scale);
      i++;
      breathTimerRef.current = setTimeout(next, step.duration);
    };
    next();
  }, []);

  const startSession = useCallback((proto) => {
    setPhase('session');
    setTimeLeft(proto.duration);
    setBreathPhase('in');
    setCircleScale(1);
    startAudio(proto);
    runBreathCycle(proto);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          clearTimeout(breathTimerRef.current);
          stopAudio();
          setPhase('done');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [startAudio, runBreathCycle, stopAudio]);

  const stopSession = useCallback(() => {
    clearInterval(timerRef.current);
    clearTimeout(breathTimerRef.current);
    stopAudio();
    setPhase('idle');
    setSelected(null);
    setCircleScale(1);
  }, [stopAudio]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(breathTimerRef.current);
    stopAudio();
  }, [stopAudio]);

  const breathLabel = {
    'in': 'Breathe In',
    'hold-in': 'Hold',
    'out': 'Breathe Out',
    'hold-out': 'Hold',
  }[breathPhase] || 'Breathe';

  if (phase === 'done') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 text-center"
        style={{ background: `radial-gradient(ellipse at center, ${protocol?.screenColor || 'rgba(34,197,94,0.05)'} 0%, #000 70%)` }}>
        <div className="text-6xl mb-6">✓</div>
        <h2 className="text-3xl font-black mb-3" style={{ color: protocol?.glowColor }}>Session Complete</h2>
        <p className="text-gray-400 text-lg mb-10">Your nervous system just reset. Notice how you feel.</p>
        <button
          onClick={() => { setPhase('idle'); setSelected(null); }}
          className="px-8 py-4 rounded-2xl font-black text-black text-lg"
          style={{ background: protocol?.glowColor }}
        >
          Go Again
        </button>
      </div>
    );
  }

  if (phase === 'session' && protocol) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-white px-6 text-center transition-colors duration-1000"
        style={{ background: `radial-gradient(ellipse at center, ${protocol.screenColor} 0%, ${protocol.bgFrom} 40%, ${protocol.bgTo} 100%)` }}
      >
        {/* Breathing circle */}
        <div className="relative flex items-center justify-center mb-12">
          {/* Outer ripple */}
          <div
            className="absolute rounded-full border-2 opacity-20"
            style={{
              width: `${220 * circleScale * 1.3}px`,
              height: `${220 * circleScale * 1.3}px`,
              borderColor: protocol.glowColor,
              transition: `all ${breathPhase === 'in' ? protocol.breathIn : protocol.breathOut}s ease-in-out`,
            }}
          />
          {/* Main circle */}
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: `${220 * circleScale}px`,
              height: `${220 * circleScale}px`,
              background: `radial-gradient(ellipse, ${protocol.glowColor}22 0%, ${protocol.glowColor}08 100%)`,
              border: `2px solid ${protocol.glowColor}`,
              boxShadow: `0 0 40px ${protocol.glowColor}40`,
              transition: `all ${breathPhase === 'in' ? protocol.breathIn : protocol.breathOut}s ease-in-out`,
            }}
          >
            <p className="text-2xl font-black" style={{ color: protocol.glowColor }}>{breathLabel}</p>
          </div>
        </div>

        {/* Timer */}
        <p className="text-5xl font-black font-mono mb-2" style={{ color: protocol.glowColor }}>
          {formatTime(timeLeft)}
        </p>
        <p className="text-gray-500 text-sm mb-10 font-mono tracking-widest">REMAINING</p>

        {/* Headphone hint — first time */}
        <p className="text-gray-600 text-xs mb-8">🎧 Headphones amplify the effect</p>

        <button
          onClick={stopSession}
          className="px-6 py-3 rounded-xl border border-white/20 text-white/40 text-sm hover:text-white/70 transition-colors"
        >
          Stop
        </button>
      </div>
    );
  }

  // SELECTION SCREEN
  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ background: 'radial-gradient(ellipse at top, #001a0a 0%, #000 60%)' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
            <circle cx="16" cy="16" r="9" fill="none" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M7 16 Q9 12 11 16 Q13 20 15 16 Q17 12 19 16 Q21 20 23 16 Q25 12 25 16" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="16" cy="16" r="2" fill="#22c55e" />
          </svg>
          <h1 className="text-4xl font-black text-white tracking-tight">BuzzTrip</h1>
        </div>
        <p className="text-green-400 font-mono text-sm tracking-widest">VAGAL RESET ENGINE</p>
        <p className="text-gray-500 text-sm mt-2">How do you need to feel right now?</p>
      </div>

      {/* Protocol cards */}
      <div className="flex-1 px-4 pb-10 flex flex-col gap-3 max-w-md mx-auto w-full">
        {PROTOCOLS.map(proto => (
          <button
            key={proto.id}
            onClick={() => { setSelected(proto.id); startSession(proto); }}
            className="w-full text-left rounded-2xl p-5 border transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: `linear-gradient(135deg, ${proto.bgFrom}, ${proto.bgTo})`,
              borderColor: `${proto.glowColor}40`,
              boxShadow: `0 0 20px ${proto.glowColor}10`,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                style={{ background: `${proto.glowColor}20`, border: `1px solid ${proto.glowColor}40` }}
              >
                {proto.icon}
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-lg leading-tight">{proto.label}</p>
                <p className="text-sm mt-0.5" style={{ color: proto.glowColor + 'aa' }}>{proto.sub}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-mono text-sm font-bold" style={{ color: proto.glowColor }}>
                  {formatTime(proto.duration)}
                </p>
              </div>
            </div>
          </button>
        ))}

        {/* Science note */}
        <div className="mt-4 p-4 rounded-xl border border-white/5 bg-white/3">
          <p className="text-gray-600 text-xs text-center leading-relaxed">
            Breathing protocols activate the vagus nerve via the parasympathetic nervous system.
            Audio tones amplify the effect. Peer-reviewed. Free forever.
          </p>
        </div>

        {/* About */}
        <a href="/BuzzTripAbout" className="text-center text-gray-700 text-xs hover:text-gray-500 transition-colors mt-2">
          How does this work? →
        </a>
      </div>
    </div>
  );
}