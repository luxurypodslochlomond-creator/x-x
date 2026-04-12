import { useState, useEffect, useRef } from 'react';

const PROTOCOLS = [
  {
    id: 'connection',
    name: 'Connection',
    emoji: '🔥',
    carrier: 528,
    binaural: 10,
    description: 'Alpha waves · Openness · Presence',
    science: '528Hz — the "love frequency". Alpha at 10Hz opens the mind.',
    color: '#ff6b35',
    glow: 'rgba(255,107,53,0.35)',
    gradient: 'linear-gradient(135deg, #ff6b3522, #e85d0411)',
  },
  {
    id: 'surrender',
    name: 'Surrender',
    emoji: '🌹',
    carrier: 639,
    binaural: 7,
    description: 'Theta waves · Deep trust · Letting go',
    science: '639Hz — connection & relationships. Theta at 7Hz melts defences.',
    color: '#e040a0',
    glow: 'rgba(224,64,160,0.35)',
    gradient: 'linear-gradient(135deg, #e040a022, #c9184a11)',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    emoji: '💫',
    carrier: 432,
    binaural: 12,
    description: 'Alpha peak · Body awareness · Warmth',
    science: '432Hz — universal harmony. 12Hz Alpha heightens body sensation.',
    color: '#b07fff',
    glow: 'rgba(176,127,255,0.35)',
    gradient: 'linear-gradient(135deg, #b07fff22, #9d4edd11)',
  },
];

export default function Shed51() {
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [speakerMode, setSpeakerMode] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef({});

  const stopAll = () => {
    try {
      nodesRef.current.left?.stop();
      nodesRef.current.right?.stop();
      nodesRef.current.monoOsc?.stop();
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
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 2);
    gainNode.connect(ctx.destination);

    if (isSpeaker) {
      // Speaker mode: play carrier + binaural as two separate audible tones close in frequency
      // They create a "beating" effect even through speakers
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
      // Headphone mode: true binaural — different freq each ear
      const merger = ctx.createChannelMerger(2);
      merger.connect(gainNode);
      const leftOsc = ctx.createOscillator();
      leftOsc.frequency.value = protocol.carrier;
      leftOsc.type = 'sine';
      const leftGain = ctx.createGain(); leftGain.gain.value = 1;
      leftOsc.connect(leftGain); leftGain.connect(merger, 0, 0);
      leftOsc.start();
      const rightOsc = ctx.createOscillator();
      rightOsc.frequency.value = protocol.carrier + protocol.binaural;
      rightOsc.type = 'sine';
      const rightGain = ctx.createGain(); rightGain.gain.value = 1;
      rightOsc.connect(rightGain); rightGain.connect(merger, 0, 1);
      rightOsc.start();
      nodesRef.current = { left: leftOsc, right: rightOsc, gainNode };
    }

    setActive(protocol.id);
    setIsPlaying(true);
  };

  const handleSelect = (protocol) => {
    if (active === protocol.id && isPlaying) {
      stopAll();
    } else {
      play(protocol, speakerMode);
    }
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
    if (nodesRef.current.gainNode) {
      nodesRef.current.gainNode.gain.setTargetAtTime(volume * 0.3, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  useEffect(() => () => stopAll(), []);

  const activeProtocol = PROTOCOLS.find(p => p.id === active);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      fontFamily: "'Georgia', serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Deep space starfield */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, #1a0510 0%, #000 50%), radial-gradient(ellipse at 80% 20%, #0a0015 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Active protocol ambient glow */}
      {activeProtocol && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${activeProtocol.glow} 0%, transparent 65%)`,
          pointerEvents: 'none',
          animation: 'breathe 5s ease-in-out infinite',
          transition: 'all 1.5s ease',
        }} />
      )}

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Orbiting particles when playing */}
      {activeProtocol && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', width: 0, height: 0, pointerEvents: 'none' }}>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: activeProtocol.color,
              boxShadow: `0 0 8px ${activeProtocol.color}`,
              animation: `orbit ${3 + i * 0.4}s linear infinite`,
              animationDelay: `${i * -0.5}s`,
              transformOrigin: '0 0',
              transform: `rotate(${deg}deg) translateX(${100 + i * 15}px)`,
            }} />
          ))}
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1, animation: 'float-up 1s ease-out' }}>
        <div style={{
          fontSize: '3.5rem',
          marginBottom: '0.8rem',
          filter: `drop-shadow(0 0 20px ${activeProtocol?.color || '#e85d04'})`,
          transition: 'filter 1s ease',
        }}>🌿</div>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'normal',
          color: activeProtocol?.color || '#f5c67a',
          letterSpacing: '0.3em',
          margin: 0,
          textShadow: `0 0 40px ${activeProtocol?.color || 'rgba(245,198,122,0.6)'}`,
          transition: 'all 1s ease',
        }}>SHED51</h1>
        <p style={{
          color: '#5a3a28',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          marginTop: '0.6rem',
          textTransform: 'uppercase',
        }}>Connection Frequencies · For Two</p>
      </div>

      {/* Speaker / Headphone toggle */}
      <div style={{
        display: 'flex',
        gap: '0',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '999px',
        padding: '4px',
        marginBottom: '2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {[
          { label: '🎧 Headphones', key: false, desc: 'True binaural' },
          { label: '🔊 Speaker', key: true, desc: 'Room fill' },
        ].map(opt => (
          <button
            key={String(opt.key)}
            onClick={() => speakerMode !== opt.key && handleSpeakerToggle()}
            style={{
              background: speakerMode === opt.key ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: 'none',
              borderRadius: '999px',
              padding: '0.5rem 1.2rem',
              color: speakerMode === opt.key ? '#fff' : '#5a4030',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.05em',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {speakerMode && (
        <p style={{
          color: '#5a3a20',
          fontSize: '0.75rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          maxWidth: '300px',
          letterSpacing: '0.05em',
          position: 'relative',
          zIndex: 1,
        }}>
          Speaker mode plays two tones that create a beating effect in the air between you. Still works. Still beautiful.
        </p>
      )}

      {/* Protocol cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '380px', position: 'relative', zIndex: 1 }}>
        {PROTOCOLS.map((protocol, idx) => {
          const isActive = active === protocol.id && isPlaying;
          return (
            <button
              key={protocol.id}
              onClick={() => handleSelect(protocol)}
              style={{
                background: isActive ? protocol.gradient : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? protocol.color : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '16px',
                padding: '1.4rem 1.6rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.5s ease',
                boxShadow: isActive ? `0 0 40px ${protocol.glow}, inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
                position: 'relative',
                overflow: 'hidden',
                animation: `float-up 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              {/* Pulsing ring when active */}
              {isActive && (
                <>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    border: `1px solid ${protocol.color}`,
                    animation: 'ring-pulse 2.5s ease-out infinite',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    border: `1px solid ${protocol.color}`,
                    animation: 'ring-pulse 2.5s ease-out infinite',
                    animationDelay: '1.25s',
                    pointerEvents: 'none',
                  }} />
                </>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  fontSize: '2.2rem',
                  filter: isActive ? `drop-shadow(0 0 12px ${protocol.color})` : 'none',
                  transition: 'filter 0.5s ease',
                  flexShrink: 0,
                  animation: isActive ? 'shimmer 3s ease-in-out infinite' : 'none',
                }}>{protocol.emoji}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      color: isActive ? protocol.color : '#c49060',
                      fontSize: '1.2rem',
                      letterSpacing: '0.12em',
                      fontWeight: 'bold',
                      transition: 'color 0.5s ease',
                    }}>{protocol.name}</span>
                    {isActive && <span style={{ color: protocol.color, fontSize: '0.7rem', letterSpacing: '0.1em' }}>◉ PLAYING</span>}
                  </div>
                  <div style={{ color: '#7a5040', fontSize: '0.8rem', marginTop: '0.3rem' }}>{protocol.description}</div>
                  <div style={{
                    color: isActive ? `${protocol.color}99` : '#3a2010',
                    fontSize: '0.7rem',
                    marginTop: '0.4rem',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                  }}>{protocol.science}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Volume */}
      <div style={{ marginTop: '2rem', width: '100%', maxWidth: '380px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#4a2a18', fontSize: '0.75rem', letterSpacing: '0.15em' }}>VOLUME</span>
          <span style={{ color: '#7a4a30', fontSize: '0.75rem' }}>{Math.round(volume * 100)}%</span>
        </div>
        <input
          type="range" min="0" max="1" step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: activeProtocol?.color || '#e85d04', cursor: 'pointer' }}
        />
      </div>

      {/* Footer note */}
      <p style={{
        color: '#2a1508',
        fontSize: '0.7rem',
        textAlign: 'center',
        marginTop: '2rem',
        maxWidth: '280px',
        lineHeight: 1.8,
        position: 'relative',
        zIndex: 1,
        letterSpacing: '0.08em',
      }}>
        Breathe slowly.<br />
        Be present with each other.<br />
        Let the frequency do the rest. 🕯️
      </p>
    </div>
  );
}