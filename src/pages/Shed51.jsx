import { useState, useEffect, useRef } from 'react';

const PROTOCOLS = [
  {
    id: 'alpha',
    name: 'ALPHA',
    num: 'I',
    hz: 528,
    beat: 10,
    words: ['OPEN', 'WARM', 'HERE'],
    paint: '#e8390e',
    ink: '#1a0500',
    splat: 'rgba(232,57,14,0.2)',
  },
  {
    id: 'deep',
    name: 'DEEP',
    num: 'II',
    hz: 639,
    beat: 7,
    words: ['LOW', 'CLOSE', 'REAL'],
    // Betty Davis Eyes — deep smoky violet
    paint: '#c084fc',
    ink: '#0d0010',
    splat: 'rgba(192,132,252,0.18)',
  },
  {
    id: 'resonance',
    name: 'RESONANCE',
    num: 'III',
    hz: 432,
    beat: 12,
    words: ['BODY', 'PULSE', 'NOW'],
    paint: '#2ef0a0',
    ink: '#000d07',
    splat: 'rgba(46,240,160,0.15)',
  },
];

const Stroke = ({ color, style }) => (
  <svg viewBox="0 0 200 12" style={{ width: '100%', height: '12px', display: 'block', ...style }}>
    <path
      d="M2 6 C20 2, 40 10, 70 5 C100 1, 130 9, 160 4 C180 1, 195 7, 198 6"
      stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
      style={{ opacity: 0.6 }}
    />
  </svg>
);

const Crown = ({ color, size = 36 }) => (
  <svg width={size * 1.6} height={size} viewBox="0 0 80 50">
    <rect x="4" y="32" width="72" height="12" rx="1" fill="none" stroke={color} strokeWidth="2.8" strokeLinejoin="round" />
    <polyline points="4,32 4,10 20,22 40,4 60,22 76,10 76,32" fill="none" stroke={color} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round" />
    <rect x="14" y="34" width="7" height="7" rx="1" fill={color} opacity="0.9" />
    <rect x="36" y="34" width="7" height="7" rx="1" fill={color} opacity="0.9" />
    <rect x="58" y="34" width="7" height="7" rx="1" fill={color} opacity="0.9" />
    <circle cx="40" cy="4" r="3.5" fill={color} />
    <circle cx="4" cy="10" r="2.5" fill={color} opacity="0.8" />
    <circle cx="76" cy="10" r="2.5" fill={color} opacity="0.8" />
    <circle cx="20" cy="22" r="2" fill={color} opacity="0.6" />
    <circle cx="60" cy="22" r="2" fill={color} opacity="0.6" />
    <line x1="28" y1="14" x2="32" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="32" y1="14" x2="28" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="48" y1="14" x2="52" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="52" y1="14" x2="48" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
  </svg>
);

const Splat = ({ color, style }) => (
  <svg viewBox="0 0 120 80" style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
    <ellipse cx="60" cy="40" rx="55" ry="32" fill={color} opacity="0.15" />
    <circle cx="20" cy="15" r="8" fill={color} opacity="0.1" />
    <circle cx="95" cy="60" r="12" fill={color} opacity="0.08" />
    <circle cx="105" cy="20" r="5" fill={color} opacity="0.12" />
    <circle cx="10" cy="55" r="6" fill={color} opacity="0.09" />
  </svg>
);

export default function Shed51() {
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [speakerMode, setSpeakerMode] = useState(false);
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
    gainNode.gain.linearRampToValueAtTime(volume * 0.28, ctx.currentTime + 2);
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
    setActive(p.id); setIsPlaying(true);
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
      nodesRef.current.gainNode.gain.setTargetAtTime(volume * 0.28, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => () => stopAll(), []);

  const ap = PROTOCOLS.find(p => p.id === active);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0e0c08',
      color: '#f0ead6',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drip {
          0% { height: 0; opacity: 0; }
          100% { height: 30px; opacity: 1; }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 80%, #1a0e00 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, #0a0015 0%, transparent 50%)',
      }} />

      {ap && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 50%, ${ap.splat.replace(/[\d.]+\)$/, '0.3)')} 0%, transparent 60%)`,
          animation: 'breatheGlow 5s ease-in-out infinite',
          transition: 'all 1.5s ease',
        }} />
      )}

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ marginBottom: '3rem', animation: 'rise 0.8s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
            <div>
              <Crown color={ap?.paint || '#e8390e'} size={32} />
              <h1 style={{
                fontSize: 'clamp(3.5rem, 12vw, 6rem)',
                fontWeight: '900',
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                margin: '0.2rem 0 0',
                color: '#f0ead6',
                textTransform: 'uppercase',
              }}>SHED<br /><span style={{
                color: ap?.paint || '#e8390e',
                transition: 'color 0.6s ease',
              }}>51</span></h1>
            </div>
            <div style={{
              writingMode: 'vertical-rl',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              color: '#888',
              marginTop: '0.5rem',
              textTransform: 'uppercase',
              fontWeight: '700',
            }}>Frequency · Soul · Body</div>
          </div>
          <Stroke color={ap?.paint || '#e8390e'} />
        </div>

        {/* OUTPUT MODE */}
        <div style={{
          display: 'flex', gap: '0.5rem',
          marginBottom: '2.5rem',
          animation: 'rise 0.6s ease-out 0.1s both',
        }}>
          {[{ label: '◎ HEADPHONES', k: false }, { label: '◉ SPEAKER', k: true }].map(opt => (
            <button key={String(opt.k)} onClick={() => speakerMode !== opt.k && toggleSpeaker()} style={{
              flex: 1,
              background: speakerMode === opt.k ? (ap?.paint || '#e8390e') : 'rgba(255,255,255,0.05)',
              border: `2px solid ${speakerMode === opt.k ? (ap?.paint || '#e8390e') : 'rgba(255,255,255,0.2)'}`,
              borderRadius: '2px',
              color: speakerMode === opt.k ? '#000' : '#ccc',
              fontSize: '0.65rem',
              fontWeight: '900',
              letterSpacing: '0.15em',
              padding: '0.8rem 0.5rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              fontFamily: 'inherit',
            }}>{opt.label}</button>
          ))}
        </div>

        {/* PROTOCOL CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {PROTOCOLS.map((p, idx) => {
            const isActive = active === p.id && isPlaying;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                style={{
                  background: isActive ? p.ink : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${isActive ? p.paint : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: '3px',
                  padding: '1.6rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  boxShadow: isActive ? `0 0 40px ${p.splat}, inset 0 0 60px ${p.splat}` : 'none',
                  animation: `rise 0.6s ease-out ${0.15 + idx * 0.1}s both`,
                }}
              >
                {isActive && <Splat color={p.paint} style={{ top: '-10px', right: '-20px', width: '160px', height: '100px' }} />}

                {/* Roman numeral */}
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: '900',
                  letterSpacing: '0.2em',
                  color: isActive ? p.paint : '#aaa',
                  marginBottom: '0.4rem',
                  transition: 'color 0.3s ease',
                }}>{p.num}</div>

                {/* Name */}
                <div style={{
                  fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
                  fontWeight: '900',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: isActive ? p.paint : '#f0ead6',
                  transition: 'color 0.3s ease',
                  marginBottom: '1rem',
                }}>{p.name}</div>

                {/* Word stamps */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {p.words.map((w, i) => (
                    <span key={w} style={{
                      fontSize: '0.65rem',
                      fontWeight: '900',
                      letterSpacing: '0.15em',
                      color: isActive ? p.paint : '#ccc',
                      border: `1px solid ${isActive ? p.paint + '80' : 'rgba(255,255,255,0.2)'}`,
                      padding: '3px 8px',
                      borderRadius: '1px',
                      transition: 'all 0.3s ease',
                      transform: `rotate(${[-1.5, 0.8, -0.5][i]}deg)`,
                      display: 'inline-block',
                    }}>{w}</span>
                  ))}
                </div>

                {/* Hz info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: isActive ? '#bbb' : '#888', letterSpacing: '0.08em', fontWeight: '600' }}>
                    {p.hz}Hz · {p.beat}Hz BEAT
                  </div>
                  {isActive && (
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: p.paint,
                      boxShadow: `0 0 12px ${p.paint}`,
                      animation: 'breatheGlow 1.5s ease-in-out infinite',
                    }} />
                  )}
                </div>

                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: '20%',
                    width: '3px',
                    background: `linear-gradient(to bottom, ${p.paint}, transparent)`,
                    animation: 'drip 0.8s ease-out forwards',
                    borderRadius: '0 0 4px 4px',
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* VOLUME */}
        <div style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#aaa', letterSpacing: '0.2em' }}>VOLUME</span>
            <span style={{ fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>{Math.round(volume * 100)}</span>
          </div>
          <input type="range" min="0" max="1" step="0.01" value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: ap?.paint || '#e8390e', cursor: 'pointer' }}
          />
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: '3rem' }}>
          <Stroke color="#333" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.6rem', color: '#666', letterSpacing: '0.15em', fontWeight: '900' }}>SHED51</span>
            <span style={{ fontSize: '0.6rem', color: '#555', letterSpacing: '0.1em' }}>UF51 / FREQUENCY</span>
          </div>
        </div>

      </div>
    </div>
  );
}