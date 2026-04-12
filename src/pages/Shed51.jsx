import { useState, useEffect, useRef } from 'react';

const PROTOCOLS = [
  {
    id: 'connection',
    name: 'Connection',
    emoji: '🔥',
    carrier: 528,
    binaural: 10,
    description: 'Alpha waves · Openness · Presence',
    color: '#e85d04',
    glow: 'rgba(232,93,4,0.4)',
  },
  {
    id: 'surrender',
    name: 'Surrender',
    emoji: '🌹',
    carrier: 639,
    binaural: 7,
    description: 'Theta waves · Deep trust · Letting go',
    color: '#c9184a',
    glow: 'rgba(201,24,74,0.4)',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    emoji: '💫',
    carrier: 432,
    binaural: 12,
    description: 'Alpha peak · Body awareness · Warmth',
    color: '#9d4edd',
    glow: 'rgba(157,78,221,0.4)',
  },
];

export default function Shed51() {
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
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

  const play = (protocol) => {
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

    const merger = ctx.createChannelMerger(2);
    merger.connect(gainNode);

    // Left ear — carrier frequency
    const leftOsc = ctx.createOscillator();
    leftOsc.frequency.value = protocol.carrier;
    leftOsc.type = 'sine';
    const leftGain = ctx.createGain();
    leftGain.gain.value = 1;
    leftOsc.connect(leftGain);
    leftGain.connect(merger, 0, 0);
    leftOsc.start();

    // Right ear — carrier + binaural beat
    const rightOsc = ctx.createOscillator();
    rightOsc.frequency.value = protocol.carrier + protocol.binaural;
    rightOsc.type = 'sine';
    const rightGain = ctx.createGain();
    rightGain.gain.value = 1;
    rightOsc.connect(rightGain);
    rightGain.connect(merger, 0, 1);
    rightOsc.start();

    nodesRef.current = { left: leftOsc, right: rightOsc, gainNode };
    setActive(protocol.id);
    setIsPlaying(true);
  };

  const handleSelect = (protocol) => {
    if (active === protocol.id && isPlaying) {
      stopAll();
    } else {
      play(protocol);
    }
  };

  // Update volume live
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
      background: 'radial-gradient(ellipse at center, #1a0a00 0%, #0d0000 60%, #000 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Georgia, serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      {activeProtocol && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${activeProtocol.glow} 0%, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'all 2s ease',
          animation: 'breathe 4s ease-in-out infinite',
        }} />
      )}

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'normal',
          color: '#f5c67a',
          letterSpacing: '0.2em',
          margin: 0,
          textShadow: '0 0 30px rgba(245,198,122,0.5)',
        }}>SHED51</h1>
        <p style={{ color: '#a0785a', fontSize: '0.9rem', letterSpacing: '0.15em', marginTop: '0.5rem' }}>
          CONNECTION FREQUENCIES · USE HEADPHONES
        </p>
      </div>

      {/* Protocol buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', maxWidth: '340px', position: 'relative', zIndex: 1 }}>
        {PROTOCOLS.map(protocol => {
          const isActive = active === protocol.id && isPlaying;
          return (
            <button
              key={protocol.id}
              onClick={() => handleSelect(protocol)}
              style={{
                background: isActive ? `linear-gradient(135deg, ${protocol.color}22, ${protocol.color}11)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? protocol.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '12px',
                padding: '1.4rem 1.8rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.4s ease',
                boxShadow: isActive ? `0 0 30px ${protocol.glow}` : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: `2px solid ${protocol.color}`,
                  animation: 'pulse-ring 2s ease-out infinite',
                  pointerEvents: 'none',
                }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{protocol.emoji}</span>
                <div>
                  <div style={{
                    color: isActive ? protocol.color : '#d4a57a',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                  }}>{protocol.name}</div>
                  <div style={{ color: '#7a5a40', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {protocol.description}
                  </div>
                  <div style={{ color: '#4a3020', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                    {protocol.carrier}Hz · {protocol.binaural}Hz beat
                  </div>
                </div>
                {isActive && (
                  <div style={{ marginLeft: 'auto', color: protocol.color, fontSize: '1.2rem' }}>▶</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Volume */}
      <div style={{ marginTop: '2.5rem', position: 'relative', zIndex: 1, width: '100%', maxWidth: '340px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#7a5a40', fontSize: '0.8rem', letterSpacing: '0.1em' }}>VOLUME</span>
          <span style={{ color: '#a0785a', fontSize: '0.8rem' }}>{Math.round(volume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: '#e85d04', cursor: 'pointer' }}
        />
      </div>

      {/* Tip */}
      <p style={{
        color: '#4a3020',
        fontSize: '0.75rem',
        textAlign: 'center',
        marginTop: '2.5rem',
        maxWidth: '300px',
        lineHeight: 1.6,
        position: 'relative',
        zIndex: 1,
        letterSpacing: '0.05em',
      }}>
        Headphones recommended for full binaural effect.<br />
        Breathe slowly. Be present. Let it work. 🕯️
      </p>
    </div>
  );
}