import { useState, useEffect, useRef } from 'react';

const PROTOCOLS = [
  {
    id: 'alive',
    name: 'ALIVE',
    hz: 528,
    beat: 10,
    words: ['WARM', 'REAL', 'HERE'],
    paint: '#f97316',
    ink: '#120800',
    splat: 'rgba(249,115,22,0.18)',
    why: 'The love frequency. Triggers dopamine naturally. Your body already knows this one.',
  },
  {
    id: 'deep',
    name: 'DEEP',
    hz: 639,
    beat: 7,
    words: ['CLOSE', 'FELT', 'SAFE'],
    paint: '#c084fc',
    ink: '#0d0010',
    splat: 'rgba(192,132,252,0.18)',
    why: 'Connection frequency. Oxytocin. The one that makes two people feel like one thing.',
  },
  {
    id: 'fire',
    name: 'FIRE',
    hz: 40,
    beat: 6,
    words: ['LIGHT', 'FREE', 'NOW'],
    paint: '#f43f5e',
    ink: '#120008',
    splat: 'rgba(244,63,94,0.18)',
    why: '40Hz gamma — what your brain does when you feel completely alive. Natural. Yours.',
  },
];

const Stroke = ({ color }) => (
  <svg viewBox="0 0 200 10" style={{ width: '100%', height: '10px', display: 'block' }}>
    <path
      d="M2 5 C30 2, 60 8, 100 4 C140 1, 170 7, 198 5"
      stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"
    />
  </svg>
);

const Pulse = ({ color }) => (
  <svg width="100%" height="32" viewBox="0 0 200 32" style={{ display: 'block' }}>
    <path
      d="M0 16 L30 16 L40 6 L50 26 L60 10 L70 22 L80 16 L200 16"
      stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    />
  </svg>
);

export default function Shed51() {
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [speakerMode, setSpeakerMode] = useState(false);
  const [phase, setPhase] = useState('choose'); // 'choose' | 'playing'
  const audioCtxRef = useRef(null);
  const nodesRef = useRef({});

  const stopAll = () => {
    try {
      nodesRef.current.left?.stop();
      nodesRef.current.right?.stop();
      nodesRef.current.gainNode?.disconnect();
    } catch {}
    nodesRef.current = {};
    setIsPlaying(false);
    setActive(null);
    setPhase('choose');
  };

  const play = (p, isSpeaker) => {
    stopAll();
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 2.5);
    gainNode.connect(ctx.destination);

    if (isSpeaker) {
      const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = p.hz;
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = p.hz + p.beat;
      const g1 = ctx.createGain(); g1.gain.value = 0.5;
      const g2 = ctx.createGain(); g2.gain.value = 0.5;
      o1.connect(g1); g1.connect(gainNode);
      o2.connect(g2); g2.connect(gainNode);
      o1.start(); o2.start();
      nodesRef.current = { left: o1, right: o2, gainNode };
    } else {
      const merger = ctx.createChannelMerger(2);
      merger.connect(gainNode);
      const lO = ctx.createOscillator(); lO.type = 'sine'; lO.frequency.value = p.hz;
      const lg = ctx.createGain(); lg.gain.value = 1;
      lO.connect(lg); lg.connect(merger, 0, 0); lO.start();
      const rO = ctx.createOscillator(); rO.type = 'sine'; rO.frequency.value = p.hz + p.beat;
      const rg = ctx.createGain(); rg.gain.value = 1;
      rO.connect(rg); rg.connect(merger, 0, 1); rO.start();
      nodesRef.current = { left: lO, right: rO, gainNode };
    }
    setActive(p.id);
    setIsPlaying(true);
    setPhase('playing');
  };

  const handleSelect = (p) => {
    if (active === p.id && isPlaying) stopAll();
    else play(p, speakerMode);
  };

  const toggleSpeaker = () => {
    const next = !speakerMode;
    setSpeakerMode(next);
    if (isPlaying && active) {
      const cur = PROTOCOLS.find(p => p.id === active);
      if (cur) play(cur, next);
    }
  };

  useEffect(() => {
    if (nodesRef.current.gainNode && audioCtxRef.current) {
      nodesRef.current.gainNode.gain.setTargetAtTime(volume * 0.3, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => () => stopAll(), []);

  const ap = PROTOCOLS.find(p => p.id === active);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#09080a',
      color: '#f0e8d8',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 8px currentColor; opacity: 0.7; }
          50% { box-shadow: 0 0 20px currentColor; opacity: 1; }
        }
        @keyframes waveIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Ambient background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 70%, #1a0a00 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, #0e0018 0%, transparent 50%)',
      }} />
      {ap && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 40%, ${ap.splat.replace(/[\d.]+\)$/, '0.25)')} 0%, transparent 55%)`,
          animation: 'breathe 6s ease-in-out infinite',
          transition: 'all 1.8s ease',
        }} />
      )}

      <div style={{ maxWidth: '440px', margin: '0 auto', padding: '3rem 1.5rem 5rem', position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ marginBottom: '2.5rem', animation: 'rise 0.9s ease-out' }}>
          <div style={{
            fontSize: '0.6rem',
            fontWeight: '900',
            letterSpacing: '0.35em',
            color: ap?.paint || '#888',
            marginBottom: '0.8rem',
            transition: 'color 0.8s ease',
            textTransform: 'uppercase',
          }}>Connection Frequencies · For Two</div>

          <h1 style={{
            fontSize: 'clamp(4rem, 14vw, 6.5rem)',
            fontWeight: '900',
            lineHeight: 0.82,
            letterSpacing: '-0.05em',
            margin: 0,
            color: '#f0e8d8',
            textTransform: 'uppercase',
          }}>
            SHED<span style={{ color: ap?.paint || '#f97316', transition: 'color 0.8s ease' }}>51</span>
          </h1>

          <div style={{ marginTop: '0.8rem' }}>
            <Stroke color={ap?.paint || '#333'} />
          </div>

          <p style={{
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: '#888',
            lineHeight: 1.6,
            letterSpacing: '0.03em',
          }}>
            Headphones on. Eyes closed. These frequencies are real — they work on your body directly. No tricks.
          </p>
        </div>

        {/* OUTPUT MODE */}
        <div style={{
          display: 'flex', gap: '0.5rem',
          marginBottom: '2rem',
          animation: 'rise 0.7s ease-out 0.1s both',
        }}>
          {[{ label: 'HEADPHONES', k: false }, { label: 'SPEAKER', k: true }].map(opt => (
            <button key={String(opt.k)} onClick={() => speakerMode !== opt.k && toggleSpeaker()} style={{
              flex: 1,
              background: speakerMode === opt.k ? (ap?.paint || '#f97316') : 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${speakerMode === opt.k ? (ap?.paint || '#f97316') : 'rgba(255,255,255,0.15)'}`,
              borderRadius: '2px',
              color: speakerMode === opt.k ? '#000' : '#999',
              fontSize: '0.6rem',
              fontWeight: '900',
              letterSpacing: '0.2em',
              padding: '0.7rem 0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
            }}>{opt.label}</button>
          ))}
        </div>

        {/* PROTOCOL CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {PROTOCOLS.map((p, idx) => {
            const isActive = active === p.id && isPlaying;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                style={{
                  background: isActive ? p.ink : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${isActive ? p.paint : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '3px',
                  padding: '1.8rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s ease',
                  boxShadow: isActive ? `0 0 50px ${p.splat}, inset 0 0 40px ${p.splat}` : 'none',
                  animation: `rise 0.6s ease-out ${0.15 + idx * 0.12}s both`,
                  width: '100%',
                }}
              >
                {/* Playing pulse line */}
                {isActive && (
                  <div style={{ marginBottom: '1rem', animation: 'waveIn 0.5s ease-out' }}>
                    <Pulse color={p.paint} />
                  </div>
                )}

                {/* Name */}
                <div style={{
                  fontSize: 'clamp(2rem, 7vw, 2.8rem)',
                  fontWeight: '900',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: isActive ? p.paint : '#f0e8d8',
                  transition: 'color 0.4s ease',
                  marginBottom: '0.7rem',
                }}>{p.name}</div>

                {/* Word stamps */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
                  {p.words.map((w, i) => (
                    <span key={w} style={{
                      fontSize: '0.6rem',
                      fontWeight: '900',
                      letterSpacing: '0.18em',
                      color: isActive ? p.paint : '#bbb',
                      border: `1px solid ${isActive ? p.paint + '60' : 'rgba(255,255,255,0.15)'}`,
                      padding: '3px 7px',
                      borderRadius: '1px',
                      transition: 'all 0.4s ease',
                      transform: `rotate(${[-1, 0.5, -0.5][i]}deg)`,
                      display: 'inline-block',
                    }}>{w}</span>
                  ))}
                </div>

                {/* Why it works */}
                <div style={{
                  fontSize: '0.68rem',
                  color: isActive ? '#ccc' : '#666',
                  lineHeight: 1.5,
                  letterSpacing: '0.01em',
                  transition: 'color 0.4s ease',
                  marginBottom: '0.8rem',
                }}>{p.why}</div>

                {/* Hz info + dot */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.6rem', color: isActive ? '#aaa' : '#555', letterSpacing: '0.1em', fontWeight: '700' }}>
                    {p.hz}Hz · {p.beat}Hz BEAT
                  </div>
                  {isActive ? (
                    <div style={{
                      width: '9px', height: '9px', borderRadius: '50%',
                      background: p.paint,
                      color: p.paint,
                      animation: 'pulse-dot 1.8s ease-in-out infinite',
                    }} />
                  ) : (
                    <div style={{
                      fontSize: '0.6rem',
                      color: '#555',
                      letterSpacing: '0.1em',
                    }}>TAP TO PLAY</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* VOLUME */}
        <div style={{ marginTop: '2.5rem', animation: 'rise 0.6s ease-out 0.5s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: '900', color: '#777', letterSpacing: '0.25em' }}>VOLUME</span>
            <span style={{ fontSize: '0.6rem', color: '#555', fontFamily: 'monospace' }}>{Math.round(volume * 100)}</span>
          </div>
          <input type="range" min="0" max="1" step="0.01" value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: ap?.paint || '#f97316', cursor: 'pointer' }}
          />
        </div>

        {/* STOP */}
        {isPlaying && (
          <button onClick={stopAll} style={{
            marginTop: '1.5rem',
            width: '100%',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '2px',
            color: '#888',
            fontSize: '0.6rem',
            fontWeight: '900',
            letterSpacing: '0.25em',
            padding: '0.8rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            animation: 'rise 0.4s ease-out',
          }}>STOP</button>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: '3.5rem' }}>
          <Stroke color="#2a2a2a" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.55rem', color: '#555', letterSpacing: '0.2em', fontWeight: '900' }}>SHED51</span>
            <span style={{ fontSize: '0.55rem', color: '#444', letterSpacing: '0.1em' }}>UF51</span>
          </div>
        </div>

      </div>
    </div>
  );
}