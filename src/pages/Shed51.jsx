import { useState, useEffect, useRef } from 'react';

const PROTOCOLS = [
  {
    id: 'alpha',
    name: 'ALPHA',
    hz: '528Hz',
    beat: '10Hz',
    tag: 'Open. Warm. In it.',
    note: 'Alpha waves. Presence over thought.',
    accent: '#ff4d00',
    glow: 'rgba(255,77,0,0.2)',
  },
  {
    id: 'deep',
    name: 'DEEP',
    hz: '639Hz',
    beat: '7Hz',
    tag: 'Low. Close. Real.',
    note: 'Theta edge. Walls come down.',
    accent: '#00e5ff',
    glow: 'rgba(0,229,255,0.15)',
  },
  {
    id: 'resonance',
    name: 'RESONANCE',
    hz: '432Hz',
    beat: '12Hz',
    tag: 'Body. Pulse. Now.',
    note: 'Universal tuning. Pure sensation.',
    accent: '#b4ff39',
    glow: 'rgba(180,255,57,0.15)',
  },
];

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

  const play = (protocol, isSpeaker) => {
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
      const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = parseInt(protocol.hz);
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = parseInt(protocol.hz) + parseInt(protocol.beat);
      const g1 = ctx.createGain(); g1.gain.value = 0.5;
      const g2 = ctx.createGain(); g2.gain.value = 0.5;
      o1.connect(g1); g1.connect(gainNode);
      o2.connect(g2); g2.connect(gainNode);
      o1.start(); o2.start();
      nodesRef.current = { left: o1, right: o2, gainNode };
    } else {
      const merger = ctx.createChannelMerger(2);
      merger.connect(gainNode);
      const lOsc = ctx.createOscillator(); lOsc.type = 'sine'; lOsc.frequency.value = parseInt(protocol.hz);
      const lg = ctx.createGain(); lg.gain.value = 1;
      lOsc.connect(lg); lg.connect(merger, 0, 0); lOsc.start();
      const rOsc = ctx.createOscillator(); rOsc.type = 'sine'; rOsc.frequency.value = parseInt(protocol.hz) + parseInt(protocol.beat);
      const rg = ctx.createGain(); rg.gain.value = 1;
      rOsc.connect(rg); rg.connect(merger, 0, 1); rOsc.start();
      nodesRef.current = { left: lOsc, right: rOsc, gainNode };
    }
    setActive(protocol.id);
    setIsPlaying(true);
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
      background: '#080808',
      color: '#fff',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes barMove {
          0%, 100% { height: 4px; }
          50% { height: 18px; }
        }
      `}</style>

      {/* Scan line */}
      <div style={{
        position: 'fixed', left: 0, right: 0, height: '1px',
        background: `linear-gradient(to right, transparent, ${ap?.accent || '#333'}, transparent)`,
        animation: 'scan 8s linear infinite',
        opacity: 0.3,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Ambient glow */}
      {ap && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${ap.glow} 0%, transparent 65%)`,
          transition: 'all 1.5s ease',
        }} />
      )}

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '3rem', animation: 'fadeIn 0.6s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#333', marginBottom: '0.4rem' }}>
              UF51 / FREQUENCY LAB
            </div>
            <h1 style={{
              fontSize: '2.8rem',
              fontWeight: '900',
              letterSpacing: '-0.02em',
              margin: 0,
              color: ap?.accent || '#fff',
              transition: 'color 0.8s ease',
              lineHeight: 1,
            }}>SHED51</h1>
          </div>
          {/* EQ bars */}
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '24px' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                width: '3px',
                background: ap?.accent || '#333',
                borderRadius: '1px',
                transition: 'background 0.8s ease',
                animation: isPlaying ? `barMove ${0.4 + i * 0.12}s ease-in-out infinite` : 'none',
                animationDelay: `${i * 0.07}s`,
                height: isPlaying ? undefined : '4px',
              }} />
            ))}
          </div>
        </div>
        <div style={{ height: '1px', background: ap?.accent || '#1a1a1a', marginTop: '1rem', transition: 'background 0.8s ease' }} />
      </div>

      {/* Mode toggle */}
      <div style={{
        display: 'flex', gap: '0', marginBottom: '2.5rem',
        border: '1px solid #1a1a1a', borderRadius: '4px',
        overflow: 'hidden', position: 'relative', zIndex: 1,
        animation: 'fadeIn 0.6s ease-out 0.1s both',
      }}>
        {[{ label: 'HEADPHONES', k: false }, { label: 'SPEAKER', k: true }].map(opt => (
          <button key={String(opt.k)} onClick={() => speakerMode !== opt.k && toggleSpeaker()} style={{
            flex: 1,
            background: speakerMode === opt.k ? '#1a1a1a' : 'transparent',
            border: 'none',
            color: speakerMode === opt.k ? '#fff' : '#333',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            padding: '0.7rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: '700',
          }}>{opt.label}</button>
        ))}
      </div>

      {/* Protocols */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative', zIndex: 1 }}>
        {PROTOCOLS.map((p, idx) => {
          const isActive = active === p.id && isPlaying;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              style={{
                background: isActive ? '#111' : 'transparent',
                border: '1px solid',
                borderColor: isActive ? p.accent : '#111',
                borderRadius: '4px',
                padding: '1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? `0 0 30px ${p.glow}` : 'none',
                animation: `fadeIn 0.5s ease-out ${0.2 + idx * 0.08}s both`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  letterSpacing: '-0.02em',
                  color: isActive ? p.accent : '#fff',
                  transition: 'color 0.3s ease',
                }}>{p.name}</span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.6rem', color: '#333', letterSpacing: '0.1em' }}>{p.hz}</span>
                  {isActive && (
                    <span style={{
                      fontSize: '0.55rem',
                      color: p.accent,
                      letterSpacing: '0.2em',
                      animation: 'blink 1.5s ease-in-out infinite',
                    }}>● REC</span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: isActive ? '#aaa' : '#444', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                {p.tag}
              </div>
              <div style={{ fontSize: '0.6rem', color: '#2a2a2a', letterSpacing: '0.08em' }}>
                {p.note}
              </div>
              {isActive && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                  background: p.accent,
                  boxShadow: `0 0 10px ${p.accent}`,
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Volume */}
      <div style={{ marginTop: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.55rem', color: '#333', letterSpacing: '0.2em' }}>GAIN</span>
          <span style={{ fontSize: '0.55rem', color: '#444', letterSpacing: '0.1em', fontFamily: 'monospace' }}>{Math.round(volume * 100)}</span>
        </div>
        <input type="range" min="0" max="1" step="0.01" value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: ap?.accent || '#fff', cursor: 'pointer' }}
        />
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ height: '1px', background: '#111', marginBottom: '1rem' }} />
        <div style={{ fontSize: '0.55rem', color: '#222', letterSpacing: '0.2em', display: 'flex', justifyContent: 'space-between' }}>
          <span>FREQUENCY THERAPY</span>
          <span>{speakerMode ? 'SPEAKER MODE' : 'BINAURAL MODE'}</span>
        </div>
      </div>
    </div>
  );
}