import { useState, useEffect, useRef } from 'react';

const PROTOCOLS = [
  {
    id: 'connection',
    name: 'Connection',
    glyph: '✦',
    carrier: 528,
    binaural: 10,
    tagline: 'Open. Present. Here.',
    science: '528Hz — the love frequency. Alpha at 10Hz quiets the noise.',
    from: '#7c2d12',
    to: '#431407',
    accent: '#fb923c',
    soft: '#fed7aa',
    glow: 'rgba(251,146,60,0.3)',
  },
  {
    id: 'surrender',
    name: 'Surrender',
    glyph: '◈',
    carrier: 639,
    binaural: 7,
    tagline: 'Trust. Release. Feel.',
    science: '639Hz — harmony between souls. Theta at 7Hz dissolves walls.',
    from: '#4a044e',
    to: '#1a0020',
    accent: '#e879f9',
    soft: '#f5d0fe',
    glow: 'rgba(232,121,249,0.3)',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    glyph: '◉',
    carrier: 432,
    binaural: 12,
    tagline: 'Warm. Alive. Close.',
    science: '432Hz — universal resonance. 12Hz Alpha deepens body awareness.',
    from: '#1e1b4b',
    to: '#0d0b2e',
    accent: '#a78bfa',
    soft: '#ddd6fe',
    glow: 'rgba(167,139,250,0.3)',
  },
];

export default function Shed51() {
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [speakerMode, setSpeakerMode] = useState(false);
  const [hovered, setHovered] = useState(null);
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
    gainNode.gain.linearRampToValueAtTime(volume * 0.28, ctx.currentTime + 2.5);
    gainNode.connect(ctx.destination);

    if (isSpeaker) {
      const osc1 = ctx.createOscillator();
      osc1.frequency.value = protocol.carrier;
      osc1.type = 'sine';
      const osc2 = ctx.createOscillator();
      osc2.frequency.value = protocol.carrier + protocol.binaural;
      osc2.type = 'sine';
      const g1 = ctx.createGain(); g1.gain.value = 0.5;
      const g2 = ctx.createGain(); g2.gain.value = 0.5;
      osc1.connect(g1); g1.connect(gainNode);
      osc2.connect(g2); g2.connect(gainNode);
      osc1.start(); osc2.start();
      nodesRef.current = { left: osc1, right: osc2, gainNode };
    } else {
      const merger = ctx.createChannelMerger(2);
      merger.connect(gainNode);
      const leftOsc = ctx.createOscillator();
      leftOsc.frequency.value = protocol.carrier;
      leftOsc.type = 'sine';
      const lg = ctx.createGain(); lg.gain.value = 1;
      leftOsc.connect(lg); lg.connect(merger, 0, 0);
      leftOsc.start();
      const rightOsc = ctx.createOscillator();
      rightOsc.frequency.value = protocol.carrier + protocol.binaural;
      rightOsc.type = 'sine';
      const rg = ctx.createGain(); rg.gain.value = 1;
      rightOsc.connect(rg); rg.connect(merger, 0, 1);
      rightOsc.start();
      nodesRef.current = { left: leftOsc, right: rightOsc, gainNode };
    }
    setActive(protocol.id);
    setIsPlaying(true);
  };

  const handleSelect = (protocol) => {
    if (active === protocol.id && isPlaying) stopAll();
    else play(protocol, speakerMode);
  };

  const handleSpeakerToggle = () => {
    const next = !speakerMode;
    setSpeakerMode(next);
    if (isPlaying && active) {
      const current = PROTOCOLS.find(p => p.id === active);
      if (current) play(current, next);
    }
  };

  useEffect(() => {
    if (nodesRef.current.gainNode && audioCtxRef.current) {
      nodesRef.current.gainNode.gain.setTargetAtTime(volume * 0.28, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => () => stopAll(), []);

  const activeProtocol = PROTOCOLS.find(p => p.id === active);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0608',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '3rem 1.5rem 4rem',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes candleFlicker {
          0%, 100% { opacity: 0.7; transform: scale(1) translateY(0); }
          25% { opacity: 0.9; transform: scale(1.02) translateY(-1px); }
          75% { opacity: 0.6; transform: scale(0.98) translateY(1px); }
        }
        @keyframes slowBreathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.12); }
        }
        @keyframes ripple {
          0% { transform: scale(0.95); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeRise {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes softSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px var(--glow); }
          50% { box-shadow: 0 0 50px var(--glow), 0 0 80px var(--glow); }
        }
      `}</style>

      {/* Background texture layers */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 70%, #1c0a10 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, #0d0518 0%, transparent 55%)',
      }} />

      {/* Active glow */}
      {activeProtocol && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 45%, ${activeProtocol.glow} 0%, transparent 60%)`,
          animation: 'slowBreathe 6s ease-in-out infinite',
          transition: 'all 2s ease',
        }} />
      )}

      {/* Candle flame top */}
      <div style={{
        position: 'relative', zIndex: 1, marginBottom: '2.5rem',
        animation: 'fadeRise 1.2s ease-out',
      }}>
        <div style={{
          fontSize: '2.8rem',
          animation: 'candleFlicker 3s ease-in-out infinite',
          display: 'block',
          textAlign: 'center',
          filter: `drop-shadow(0 0 16px ${activeProtocol?.accent || '#fb923c'})`,
          transition: 'filter 1.5s ease',
        }}>🕯️</div>
      </div>

      {/* Title block */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1, animation: 'fadeRise 1s ease-out 0.2s both' }}>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
          fontWeight: '300',
          letterSpacing: '0.4em',
          color: activeProtocol?.soft || '#fde8c8',
          margin: '0 0 0.4rem',
          textShadow: `0 0 60px ${activeProtocol?.glow || 'rgba(253,232,200,0.4)'}`,
          transition: 'all 1.5s ease',
          fontStyle: 'italic',
        }}>Shed51</h1>
        <div style={{
          width: '60px',
          height: '1px',
          background: `linear-gradient(to right, transparent, ${activeProtocol?.accent || '#92400e'}, transparent)`,
          margin: '0.8rem auto',
          transition: 'background 1.5s ease',
        }} />
        <p style={{
          color: '#5c3d2e',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          margin: 0,
        }}>For Two · Frequency & Touch</p>
      </div>

      {/* Output mode pill */}
      <div style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '999px',
        padding: '3px',
        marginBottom: '2.8rem',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeRise 1s ease-out 0.4s both',
      }}>
        {[{ label: '🎧  Headphones', key: false }, { label: '🔊  Speaker', key: true }].map(opt => (
          <button
            key={String(opt.key)}
            onClick={() => speakerMode !== opt.key && handleSpeakerToggle()}
            style={{
              background: speakerMode === opt.key ? 'rgba(255,255,255,0.09)' : 'transparent',
              border: 'none',
              borderRadius: '999px',
              padding: '0.5rem 1.4rem',
              color: speakerMode === opt.key ? '#e8d5c0' : '#4a3020',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              letterSpacing: '0.08em',
              fontFamily: 'Georgia, serif',
            }}
          >{opt.label}</button>
        ))}
      </div>

      {/* Protocol cards */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '1.2rem',
        width: '100%', maxWidth: '400px',
        position: 'relative', zIndex: 1,
      }}>
        {PROTOCOLS.map((protocol, idx) => {
          const isActive = active === protocol.id && isPlaying;
          const isHovered = hovered === protocol.id;
          return (
            <button
              key={protocol.id}
              onClick={() => handleSelect(protocol)}
              onMouseEnter={() => setHovered(protocol.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isActive
                  ? `linear-gradient(145deg, ${protocol.from}, ${protocol.to})`
                  : isHovered
                    ? `linear-gradient(145deg, ${protocol.from}88, ${protocol.to}44)`
                    : 'rgba(255,255,255,0.018)',
                border: `1px solid ${isActive ? protocol.accent + '60' : isHovered ? protocol.accent + '30' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '20px',
                padding: '1.8rem 2rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.6s ease',
                '--glow': protocol.glow,
                boxShadow: isActive
                  ? `0 8px 50px ${protocol.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
                  : isHovered
                    ? `0 4px 25px ${protocol.glow}`
                    : 'none',
                position: 'relative',
                overflow: 'hidden',
                animation: `fadeRise 0.8s ease-out ${0.5 + idx * 0.15}s both`,
              }}
            >
              {/* Ripple rings when active */}
              {isActive && [0, 1.5].map((delay, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%', height: '100%',
                  borderRadius: '20px',
                  border: `1px solid ${protocol.accent}40`,
                  animation: `ripple 3s ease-out infinite`,
                  animationDelay: `${delay}s`,
                  pointerEvents: 'none',
                }} />
              ))}

              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{
                    fontSize: '1.4rem',
                    color: protocol.accent,
                    filter: isActive ? `drop-shadow(0 0 8px ${protocol.accent})` : 'none',
                    transition: 'filter 0.5s ease',
                    fontStyle: 'normal',
                    lineHeight: 1,
                  }}>{protocol.glyph}</span>
                  <span style={{
                    color: isActive ? protocol.soft : '#a07860',
                    fontSize: '1.35rem',
                    letterSpacing: '0.15em',
                    fontWeight: '300',
                    fontStyle: 'italic',
                    transition: 'color 0.5s ease',
                  }}>{protocol.name}</span>
                </div>
                {isActive && (
                  <span style={{
                    color: protocol.accent,
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    opacity: 0.8,
                    fontFamily: 'monospace',
                    fontStyle: 'normal',
                    border: `1px solid ${protocol.accent}50`,
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>PLAYING</span>
                )}
              </div>

              {/* Tagline */}
              <p style={{
                color: isActive ? protocol.soft + 'cc' : '#6b4a38',
                fontSize: '1rem',
                fontStyle: 'italic',
                margin: '0 0 0.6rem',
                letterSpacing: '0.08em',
                transition: 'color 0.5s ease',
              }}>{protocol.tagline}</p>

              {/* Divider */}
              <div style={{
                width: isActive || isHovered ? '40px' : '20px',
                height: '1px',
                background: `linear-gradient(to right, ${protocol.accent}80, transparent)`,
                margin: '0.7rem 0',
                transition: 'width 0.6s ease',
              }} />

              {/* Science note */}
              <p style={{
                color: '#4a2e20',
                fontSize: '0.72rem',
                fontStyle: 'italic',
                margin: 0,
                letterSpacing: '0.04em',
                lineHeight: 1.6,
              }}>{protocol.science}</p>
            </button>
          );
        })}
      </div>

      {/* Volume */}
      <div style={{
        marginTop: '2.5rem', width: '100%', maxWidth: '400px',
        position: 'relative', zIndex: 1,
        animation: 'fadeRise 0.8s ease-out 1.1s both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ color: '#3a1e10', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Volume</span>
          <span style={{ color: '#5a3020', fontSize: '0.68rem', fontStyle: 'italic' }}>{Math.round(volume * 100)}</span>
        </div>
        <input
          type="range" min="0" max="1" step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: activeProtocol?.accent || '#9a4010', cursor: 'pointer', height: '2px' }}
        />
      </div>

      {/* Closing verse */}
      <div style={{
        marginTop: '3.5rem',
        textAlign: 'center',
        position: 'relative', zIndex: 1,
        animation: 'fadeRise 0.8s ease-out 1.3s both',
      }}>
        <p style={{
          color: '#2a1208',
          fontSize: '0.75rem',
          fontStyle: 'italic',
          lineHeight: 2,
          letterSpacing: '0.06em',
          margin: 0,
        }}>
          No phones. No noise. Just this.<br />
          Breathe slowly. Stay close.<br />
          Let the frequency do the rest.
        </p>
        <div style={{
          width: '30px',
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          margin: '1.5rem auto 0',
        }} />
      </div>
    </div>
  );
}