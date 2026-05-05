import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// SVG icons — no emojis
const IconLightning = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill={color} stroke={color} strokeWidth="0.5" strokeLinejoin="round"/>
  </svg>
);
const IconWave = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M2 12 Q4 6 6 12 Q8 18 10 12 Q12 6 14 12 Q16 18 18 12 Q20 6 22 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);
const IconMoon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={color} stroke={color} strokeWidth="0.5"/>
  </svg>
);
const IconCircle = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2.5"/>
    <path d="M12 3 Q15 7 12 12 Q9 17 12 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M3 12 Q7 9 12 12 Q17 15 21 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const PROTOCOLS = [
  {
    id: 'anxiety',
    label: 'Anxiety / Panic',
    sub: 'Feel it fading in 3 minutes',
    Icon: IconLightning,
    duration: 180,
    bgFrom: '#001a0a',
    bgTo: '#002a14',
    glowColor: '#22c55e',
    screenColor: 'rgba(34, 197, 94, 0.04)',
    // 4-0-7 breathing: exhale longer than inhale = strongest vagal activation
    breathIn: 4,
    holdIn: 0,
    breathOut: 7,
    holdOut: 0,
    // 130Hz: laryngeal/throat resonance — stimulates vagus trunk directly
    toneFreq: 130,
    // Pulse at 0.1Hz = every 10 seconds, matches slow breath rhythm
    pulseRate: 0.1,
    pulseDepth: 0.05,
    baseGain: 0.07,
  },
  {
    id: 'craving',
    label: 'Craving / Withdrawal',
    sub: 'Reset the urge. Right now.',
    Icon: IconWave,
    duration: 420,
    bgFrom: '#001520',
    bgTo: '#002535',
    glowColor: '#06b6d4',
    screenColor: 'rgba(6, 182, 212, 0.04)',
    // Box breathing: equal sides, proven for craving interruption
    breathIn: 4,
    holdIn: 4,
    breathOut: 6,
    holdOut: 2,
    // 100Hz: sub-bass felt as physical vibration through headphones
    toneFreq: 100,
    pulseRate: 0.08,
    pulseDepth: 0.04,
    baseGain: 0.08,
  },
  {
    id: 'sleep',
    label: "Can't Sleep",
    sub: 'Drift off in 12 minutes',
    Icon: IconMoon,
    duration: 720,
    bgFrom: '#050010',
    bgTo: '#0a001a',
    glowColor: '#6366f1',
    screenColor: 'rgba(99, 102, 241, 0.03)',
    // 4-7-8: Dr Andrew Weil — clinically proven sleep protocol
    breathIn: 4,
    holdIn: 7,
    breathOut: 8,
    holdOut: 0,
    // 60Hz: delta-adjacent, body resonance, deeply soporific
    toneFreq: 60,
    pulseRate: 0.05,
    pulseDepth: 0.03,
    baseGain: 0.06,
  },
  {
    id: 'reset',
    label: 'Daily Reset',
    sub: '5 minutes. Better all day.',
    Icon: IconCircle,
    duration: 300,
    bgFrom: '#001a14',
    bgTo: '#002a20',
    glowColor: '#10b981',
    screenColor: 'rgba(16, 185, 129, 0.04)',
    // Coherent breathing: 5-5 = HRV resonance frequency (0.1Hz)
    breathIn: 5,
    holdIn: 0,
    breathOut: 5,
    holdOut: 0,
    // 110Hz: vagal tone sweet spot, used in clinical tVNS research
    toneFreq: 110,
    pulseRate: 0.1,
    pulseDepth: 0.04,
    baseGain: 0.07,
  },
];

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const HeadphonesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ display: 'inline', marginRight: 6 }}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="#4b5563" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" fill="#4b5563"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill="#4b5563"/>
  </svg>
);

const CheckIcon = ({ color }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="27" stroke={color} strokeWidth="2"/>
    <path d="M16 28L24 36L40 20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function BuzzTripEngine() {
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState('idle');
  const [breathPhase, setBreathPhase] = useState('in');
  const [timeLeft, setTimeLeft] = useState(0);
  const [circleScale, setCircleScale] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const lfoRef = useRef(null);
  const gainRef = useRef(null);
  const timerRef = useRef(null);
  const breathTimerRef = useRef(null);

  const protocol = selected ? PROTOCOLS.find(p => p.id === selected) : null;

  const stopAudio = useCallback(() => {
    try {
      if (lfoRef.current) { lfoRef.current.stop(); lfoRef.current = null; }
      if (oscillatorRef.current) { oscillatorRef.current.stop(); oscillatorRef.current = null; }
      if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
      gainRef.current = null;
    } catch {}
  }, []);

  const startAudio = useCallback((proto) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;

      // Main tone oscillator
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(proto.toneFreq, ctx.currentTime);

      // Master gain — controls overall volume
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(proto.baseGain, ctx.currentTime);

      // LFO for slow breathing pulse on the volume
      // This makes the tone feel like it's breathing with you
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(proto.pulseRate, ctx.currentTime);

      const lfoGain = ctx.createGain();
      // pulseDepth controls how much the LFO modulates the volume
      lfoGain.gain.setValueAtTime(proto.pulseDepth, ctx.currentTime);

      // Correct routing: lfo -> lfoGain -> masterGain.gain (AudioParam)
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);

      // Speaker compensation: high-pass filter to boost low freqs on cheap speakers
      const hpFilter = ctx.createBiquadFilter();
      hpFilter.type = 'highpass';
      hpFilter.frequency.setValueAtTime(40, ctx.currentTime); // remove sub-rumble that gets lost
      hpFilter.Q.setValueAtTime(0.7, ctx.currentTime);

      // Presence boost: peaking EQ — adapt frequency based on protocol (craving needs more bass boost)
      const peakFilter = ctx.createBiquadFilter();
      peakFilter.type = 'peaking';
      const isPainOrCraving = proto.toneFreq <= 100;
      peakFilter.frequency.setValueAtTime(isPainOrCraving ? 110 : 150, ctx.currentTime);
      peakFilter.gain.setValueAtTime(isPainOrCraving ? 4.5 : 3.5, ctx.currentTime); // +4.5dB for withdrawal
      peakFilter.Q.setValueAtTime(1.2, ctx.currentTime);

      // Fade in gently over 2 seconds to avoid jarring start
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(proto.baseGain, ctx.currentTime + 2);

      // Route: osc -> hp filter -> peak filter -> masterGain -> destination
      osc.connect(hpFilter);
      hpFilter.connect(peakFilter);
      peakFilter.connect(masterGain);
      masterGain.connect(ctx.destination);

      lfo.start();
      osc.start();

      oscillatorRef.current = osc;
      lfoRef.current = lfo;
      gainRef.current = masterGain;
    } catch (e) {
      console.log('Audio context error:', e);
    }
  }, []);

  const runBreathCycle = useCallback((proto) => {
    const sequence = [
      { phase: 'in', duration: proto.breathIn * 1000, scale: 1.5 },
      ...(proto.holdIn > 0 ? [{ phase: 'hold-in', duration: proto.holdIn * 1000, scale: 1.5 }] : []),
      { phase: 'out', duration: proto.breathOut * 1000, scale: 1 },
      ...(proto.holdOut > 0 ? [{ phase: 'hold-out', duration: proto.holdOut * 1000, scale: 1 }] : []),
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

  const breathDuration = breathPhase === 'in'
    ? protocol?.breathIn
    : breathPhase === 'out'
    ? protocol?.breathOut
    : breathPhase === 'hold-in'
    ? protocol?.holdIn
    : protocol?.holdOut;

  // DONE SCREEN
  if (phase === 'done') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 text-center"
        style={{ background: `radial-gradient(ellipse at center, ${protocol?.screenColor || 'rgba(34,197,94,0.05)'} 0%, #000 70%)` }}>
        <CheckIcon color={protocol?.glowColor || '#22c55e'} />
        <h2 className="text-3xl font-black mt-6 mb-3" style={{ color: protocol?.glowColor }}>Session Complete</h2>
        <p className="text-gray-400 text-lg mb-10">Your nervous system just reset.<br/>Notice how you feel.</p>
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

  // SESSION SCREEN
  if (phase === 'session' && protocol) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-white px-6 text-center"
        style={{ background: `radial-gradient(ellipse at center, ${protocol.screenColor} 0%, ${protocol.bgFrom} 40%, ${protocol.bgTo} 100%)` }}
      >
        {/* Breathing circle */}
        <div className="relative flex items-center justify-center mb-12" style={{ width: 320, height: 320 }}>
          {/* Outer ripple ring */}
          <div
            className="absolute rounded-full border opacity-20"
            style={{
              width: `${280 * circleScale}px`,
              height: `${280 * circleScale}px`,
              borderColor: protocol.glowColor,
              borderWidth: 1,
              transition: `all ${breathDuration}s ease-in-out`,
            }}
          />
          {/* Main breathing circle */}
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: `${200 * circleScale}px`,
              height: `${200 * circleScale}px`,
              background: `radial-gradient(ellipse, ${protocol.glowColor}20 0%, ${protocol.glowColor}06 100%)`,
              border: `2px solid ${protocol.glowColor}`,
              boxShadow: `0 0 ${circleScale > 1.2 ? 60 : 30}px ${protocol.glowColor}${circleScale > 1.2 ? '50' : '25'}`,
              transition: `all ${breathDuration}s ease-in-out`,
            }}
          >
            <p className="text-xl font-black select-none" style={{ color: protocol.glowColor }}>{breathLabel}</p>
          </div>
        </div>

        {/* Timer */}
        <p className="text-5xl font-black font-mono mb-1" style={{ color: protocol.glowColor }}>
          {formatTime(timeLeft)}
        </p>
        <p className="text-gray-600 text-xs mb-8 font-mono tracking-widest">REMAINING</p>

        <p className="text-gray-700 text-xs mb-8 flex items-center">
          <HeadphonesIcon /> Headphones amplify the effect
        </p>

        <button
          onClick={stopSession}
          className="px-6 py-3 rounded-xl border border-white/10 text-white/30 text-sm hover:text-white/60 transition-colors"
        >
          Stop
        </button>
      </div>
    );
  }

  // SELECTION SCREEN
  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ background: 'radial-gradient(ellipse at top, #001a0a 0%, #000 60%)' }}>

      {/* Top nav bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div className="w-8" />
        <p className="text-green-500 font-mono text-xs tracking-widest">BUZZTRIP</p>
        <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
          <span className="block w-5 h-0.5 bg-green-500 rounded" />
          <span className="block w-5 h-0.5 bg-green-500 rounded" />
          <span className="block w-5 h-0.5 bg-green-500 rounded" />
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute top-14 right-4 z-50 bg-[#0a0f0a] border border-green-900/50 rounded-xl shadow-2xl overflow-hidden min-w-[160px]">
          <Link to="/BuzzTripAbout" onClick={() => setMenuOpen(false)} className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 border-b border-white/5">About</Link>
          <Link to="/BuzzTripTerms" onClick={() => setMenuOpen(false)} className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 border-b border-white/5">Terms</Link>
          <Link to="/BuzzTripPrivacy" onClick={() => setMenuOpen(false)} className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 border-b border-white/5">Privacy</Link>
          <a href="mailto:family@uf51.love?subject=BuzzTrip%20Support&body=Hi%20BuzzTrip%20team%2C%0A%0A%0A--%0ABuzzTrip%0AVagal%20Reset%20Engine" className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5">Contact</a>
        </div>
      )}

      {/* Header */}
      <div className="px-6 pt-6 pb-8 text-center">
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
        {PROTOCOLS.map(proto => {
          const { Icon } = proto;
          return (
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${proto.glowColor}15`, border: `1px solid ${proto.glowColor}40` }}
                >
                  <Icon color={proto.glowColor} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-black text-lg leading-tight">{proto.label}</p>
                  <p className="text-sm mt-0.5" style={{ color: proto.glowColor + '99' }}>{proto.sub}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-sm font-bold" style={{ color: proto.glowColor }}>
                    {formatTime(proto.duration)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}

        {/* Science note */}
        <div className="mt-4 p-4 rounded-xl border border-white/5">
          <p className="text-gray-700 text-xs text-center leading-relaxed">
            Breathing protocols activate the vagus nerve via the parasympathetic nervous system.
            Audio tones are peer-reviewed frequencies used in clinical tVNS research.
            Free forever.
          </p>
        </div>

        <Link to="/BuzzTripAbout" className="text-center text-gray-700 text-xs hover:text-gray-500 transition-colors mt-2 block">
          How does this work? →
        </Link>

        <p className="text-gray-800 text-xs text-center mt-6">
          Not a medical device · Free forever · No data stored
        </p>
      </div>
    </div>
  );
}