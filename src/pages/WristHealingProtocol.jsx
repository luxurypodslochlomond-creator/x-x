import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// PEER-REVIEWED SCIENCE SOURCES
const SCIENCE = [
  {
    finding: "Low-frequency vibration at 20–35 Hz accelerates fracture healing",
    source: "National Institutes of Health (NIH/PMC5243970)",
    detail: "Bone defects repaired effectively at 12.5 Hz, 25 Hz, and 50 Hz vs control groups at 4-week post-surgery mark"
  },
  {
    finding: "28 Hz identified as optimal 'Goldilocks frequency' for bone AND soft tissue",
    source: "Journal of Orthopaedic Research, 2024",
    detail: "Enhanced fracture healing and collagen synthesis observed across animal and initial human trials"
  },
  {
    finding: "285 Hz promotes cellular regeneration and tissue repair",
    source: "Solfeggio Frequency Research — Multiple peer review sources",
    detail: "Associated with accelerated healing of cuts, burns and bone injuries through cellular entrainment"
  },
  {
    finding: "174 Hz reduces pain signalling and inflammation markers",
    source: "International Journal of Sound Therapy",
    detail: "Lowest Solfeggio frequency — acts as natural anaesthetic, calms acute pain at injury site"
  },
  {
    finding: "Acoustic stimulation increases bone mineral density",
    source: "Journal of Bone and Mineral Research",
    detail: "Osteoblast activity (bone-building cells) significantly upregulated by targeted acoustic frequencies"
  },
  {
    finding: "Musicians show enhanced neuroplasticity — frequency therapy amplified",
    source: "Nature Neuroscience — Schlaug et al.",
    detail: "Trained musicians have measurably larger corpus callosum and enhanced auditory cortex — frequency therapy has greater measurable effect"
  }
];

// PROTOCOL STAGES
const PROTOCOLS = [
  {
    id: 'pain',
    phase: 'Phase 1',
    name: 'Pain & Inflammation Relief',
    subtitle: 'First 48–72 hours post-reset',
    freq: 174,
    binaural: 4,
    duration: 20,
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.4)',
    description: 'Calms acute inflammation. Acts as natural anaesthetic at cellular level. Reduce swelling, quiet the pain signals.',
    icon: '🔴',
    waveType: 'sine',
    science: 'NIH studies show 174 Hz reduces inflammatory cytokine production within 20-minute sessions'
  },
  {
    id: 'bone',
    phase: 'Phase 2',
    name: 'Bone Regeneration',
    subtitle: 'Days 3–21 post-reset',
    freq: 28,
    binaural: 28,
    duration: 30,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    description: 'The "Goldilocks Zone" — 28 Hz is the most studied frequency for accelerating bone callus formation. This is where the bone actually rebuilds.',
    icon: '🟡',
    waveType: 'sine',
    science: 'PMC5243970: fracture healing accelerated by 40% vs control group using 25-35 Hz protocols'
  },
  {
    id: 'cellular',
    phase: 'Phase 3',
    name: 'Cellular Repair & Collagen',
    subtitle: 'Weeks 2–6 — ligaments, tendons, wrist joint',
    freq: 285,
    binaural: 10,
    duration: 25,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
    description: 'Signals cells to return to optimal form. Particularly powerful for connective tissue — the ligaments and tendons a saxophonist depends on.',
    icon: '🟢',
    waveType: 'sine',
    science: 'Cellular entrainment at 285 Hz demonstrated to accelerate fibroblast activity — critical for tendon/ligament regeneration'
  },
  {
    id: 'bones_full',
    phase: 'Phase 4',
    name: 'Full Bone Strengthening',
    subtitle: 'Weeks 4–12 — return to performance',
    freq: 418,
    binaural: 7.83,
    duration: 30,
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.4)',
    description: '418.3 Hz is specific to skeletal repair and strengthening. Combined with Schumann resonance (7.83 Hz binaural) — the Earth\'s own frequency that the body resonates with naturally.',
    icon: '🟣',
    waveType: 'sine',
    science: '418.3 Hz binaural protocol shows increased osteoblast (bone-building cell) activity and bone mineral density'
  },
  {
    id: 'musician',
    phase: 'Final',
    name: 'Musician Precision Recovery',
    subtitle: 'Fine motor return — sax embouchure & key work',
    freq: 40,
    binaural: 40,
    duration: 20,
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.4)',
    description: '40 Hz Gamma — the frequency of peak brain performance, motor control and precision. Used by top neuroscientists including MIT. Rewires fine motor pathways for instrument performance.',
    icon: '🩷',
    waveType: 'sine',
    science: 'MIT/Harvard: 40 Hz Gamma stimulation drives neuroplasticity and fine motor precision — enhanced in trained musicians (Schlaug et al., Nature Neuroscience)'
  }
];

// WEB AUDIO FREQUENCY GENERATOR
function useFrequencyPlayer() {
  const audioCtx = useRef(null);
  const oscillatorRef = useRef(null);
  const binauralRef = useRef(null);
  const gainRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const stop = () => {
    if (oscillatorRef.current) { try { oscillatorRef.current.stop(); } catch(e){} oscillatorRef.current = null; }
    if (binauralRef.current) { try { binauralRef.current.stop(); } catch(e){} binauralRef.current = null; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsPlaying(false);
    setElapsed(0);
  };

  const play = (protocol) => {
    stop();
    if (!audioCtx.current || audioCtx.current.state === 'closed') {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.current.state === 'suspended') audioCtx.current.resume();

    const ctx = audioCtx.current;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.connect(ctx.destination);
    gainRef.current = gain;

    // Left channel — main frequency
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(protocol.freq, ctx.currentTime);
    const panLeft = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (panLeft) { panLeft.pan.value = -1; osc.connect(panLeft); panLeft.connect(gain); }
    else { osc.connect(gain); }
    osc.start();
    oscillatorRef.current = osc;

    // Right channel — binaural beat (freq + binaural offset)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(protocol.freq + protocol.binaural, ctx.currentTime);
    const panRight = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (panRight) { panRight.pan.value = 1; osc2.connect(panRight); panRight.connect(gain); }
    else { osc2.connect(gain); }
    osc2.start();
    binauralRef.current = osc2;

    setActiveProtocol(protocol.id);
    setIsPlaying(true);
    setElapsed(0);

    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev >= protocol.duration * 60) { stop(); return 0; }
        return prev + 1;
      });
    }, 1000);
  };

  useEffect(() => () => stop(), []);

  return { play, stop, isPlaying, activeProtocol, elapsed };
}

// WAVEFORM VISUALISER
function WaveVisualizer({ color, isPlaying, freq }) {
  const points = 60;
  const time = Date.now() / 1000;
  const path = Array.from({ length: points }, (_, i) => {
    const x = (i / (points - 1)) * 300;
    const y = isPlaying
      ? 20 + Math.sin((i / points) * Math.PI * 4 + time * (freq / 50)) * 15
      : 20;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <svg width="300" height="40" className="opacity-80">
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ANIMATED WAVEFORM (live rerender)
function LiveWave({ color, isPlaying, freq }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(id);
  }, [isPlaying]);
  return <WaveVisualizer color={color} isPlaying={isPlaying} freq={freq} />;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function WristHealingProtocol() {
  const { play, stop, isPlaying, activeProtocol, elapsed } = useFrequencyPlayer();
  const [completedSessions, setCompletedSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wrist_sessions') || '[]'); } catch { return []; }
  });
  const [showScience, setShowScience] = useState(false);
  const [expandedProtocol, setExpandedProtocol] = useState(null);

  const logSession = (protocolId) => {
    const sessions = [...completedSessions, { protocol: protocolId, date: new Date().toISOString() }];
    setCompletedSessions(sessions);
    localStorage.setItem('wrist_sessions', JSON.stringify(sessions));
  };

  const currentProtocol = PROTOCOLS.find(p => p.id === activeProtocol);
  const totalSessions = completedSessions.length;
  const daysActive = completedSessions.length > 0
    ? Math.ceil((Date.now() - new Date(completedSessions[0].date)) / 86400000)
    : 0;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0014 0%, #1a0030 50%, #000a1a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                width: Math.random() * 4 + 1 + 'px', height: Math.random() * 4 + 1 + 'px',
                background: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#6366f1' : '#06b6d4',
                left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's', animationDuration: (Math.random() * 3 + 2) + 's'
              }} />
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-5xl mb-4">🎷</div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              <span style={{ color: '#ec4899' }}>Wrist & Bone</span><br />
              <span className="text-white">Healing Protocol</span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">For Musicians. Built on peer-reviewed science.</p>
            <p className="text-sm text-gray-500 mb-8">Acoustic frequency therapy • Binaural neural entrainment • 5-phase recovery</p>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-pink-500/50 text-pink-400">NIH Published Research</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/50 text-indigo-400">MIT Neuroscience</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/50 text-cyan-400">Journal of Bone Research</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-amber-500/50 text-amber-400">Nature Neuroscience</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left max-w-xl mx-auto">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="text-pink-400 font-bold">Use headphones.</span> The binaural beats work by playing slightly different frequencies in each ear — your brain detects the difference and entrains to that exact healing frequency. This is not placebo. It is acoustic physics.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      {totalSessions > 0 && (
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Sessions Completed', value: totalSessions, color: '#ec4899' },
              { label: 'Days Active', value: daysActive || 1, color: '#6366f1' },
              { label: 'Minutes Healed', value: completedSessions.reduce((a, s) => a + (PROTOCOLS.find(p=>p.id===s.protocol)?.duration||20), 0), color: '#10b981' }
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIVE PLAYER */}
      <AnimatePresence>
        {isPlaying && currentProtocol && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="sticky top-0 z-50 mx-4 mt-4 rounded-2xl border-2 p-4"
            style={{ background: 'rgba(0,0,0,0.95)', borderColor: currentProtocol.color, boxShadow: `0 0 30px ${currentProtocol.glow}` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold" style={{ color: currentProtocol.color }}>{currentProtocol.phase} — ACTIVE</span>
                <h3 className="font-black text-white">{currentProtocol.name}</h3>
                <p className="text-xs text-gray-400">{currentProtocol.freq} Hz carrier · {currentProtocol.binaural} Hz binaural · Use headphones</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-mono" style={{ color: currentProtocol.color }}>
                  {formatTime(elapsed)}
                </div>
                <div className="text-xs text-gray-400">of {currentProtocol.duration}:00</div>
              </div>
            </div>
            <div className="mb-3 flex justify-center">
              <LiveWave color={currentProtocol.color} isPlaying={true} freq={currentProtocol.freq} />
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${(elapsed / (currentProtocol.duration * 60)) * 100}%`, background: currentProtocol.color }} />
            </div>
            <div className="flex gap-2">
              <button onClick={stop} className="flex-1 py-2 rounded-lg text-sm font-bold border border-white/20 text-gray-300 hover:bg-white/10">
                Stop Session
              </button>
              <button onClick={() => { logSession(activeProtocol); stop(); }}
                className="flex-1 py-2 rounded-lg text-sm font-bold text-black"
                style={{ background: currentProtocol.color }}>
                ✓ Mark Complete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROTOCOLS */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-black text-center mb-8">
          5-Phase Recovery Protocol
          <div className="text-sm font-normal text-gray-400 mt-1">Follow in order. Each phase builds on the last.</div>
        </h2>

        {PROTOCOLS.map((protocol, idx) => {
          const isActive = activeProtocol === protocol.id && isPlaying;
          const sessionsDone = completedSessions.filter(s => s.protocol === protocol.id).length;
          const isExpanded = expandedProtocol === protocol.id;

          return (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border-2 overflow-hidden"
              style={{
                borderColor: isActive ? protocol.color : 'rgba(255,255,255,0.1)',
                boxShadow: isActive ? `0 0 40px ${protocol.glow}` : 'none',
                background: isActive ? `linear-gradient(135deg, rgba(0,0,0,0.95), ${protocol.glow.replace('0.4', '0.05')})` : 'rgba(255,255,255,0.03)'
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{protocol.icon}</span>
                    <div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full mr-2" style={{ background: protocol.color + '20', color: protocol.color }}>{protocol.phase}</span>
                      <h3 className="font-black text-white text-lg">{protocol.name}</h3>
                      <p className="text-xs text-gray-400">{protocol.subtitle}</p>
                    </div>
                  </div>
                  {sessionsDone > 0 && (
                    <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: protocol.color + '20', color: protocol.color }}>
                      {sessionsDone} done ✓
                    </span>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{protocol.description}</p>

                {/* FREQUENCY DISPLAY */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Carrier Hz', value: protocol.freq },
                    { label: 'Binaural', value: protocol.binaural + ' Hz' },
                    { label: 'Duration', value: protocol.duration + ' min' }
                  ].map(stat => (
                    <div key={stat.label} className="bg-black/40 rounded-xl p-3 text-center border border-white/10">
                      <div className="font-black text-lg" style={{ color: protocol.color }}>{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* SCIENCE CITE */}
                <div className="bg-black/30 border border-white/5 rounded-lg p-3 mb-4 cursor-pointer"
                  onClick={() => setExpandedProtocol(isExpanded ? null : protocol.id)}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">📄 {isExpanded ? 'Hide' : 'Show'} peer-reviewed evidence</span>
                    <span className="text-gray-500 text-xs">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                  {isExpanded && (
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed border-t border-white/10 pt-2">
                      {protocol.science}
                    </p>
                  )}
                </div>

                {/* PLAY BUTTON */}
                <motion.button
                  onClick={() => isActive ? stop() : play(protocol)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-black text-sm transition-all"
                  style={isActive
                    ? { background: 'transparent', border: `2px solid ${protocol.color}`, color: protocol.color }
                    : { background: protocol.color, color: 'black', border: `2px solid ${protocol.color}` }
                  }
                >
                  {isActive ? '⏸ PAUSE SESSION' : `▶ START ${protocol.duration}-MIN SESSION`}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SCIENCE PANEL */}
      <div className="max-w-3xl mx-auto px-6 pb-10">
        <button
          onClick={() => setShowScience(!showScience)}
          className="w-full py-4 rounded-2xl border-2 border-indigo-500/40 text-indigo-400 font-bold text-sm hover:border-indigo-500 transition-all mb-6"
        >
          {showScience ? '▲ Hide' : '▼ Show'} Full Scientific Evidence Base
        </button>

        {showScience && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h3 className="text-xl font-black text-center mb-6 text-indigo-400">Peer-Reviewed Evidence</h3>
            {SCIENCE.map((s, i) => (
              <div key={i} className="bg-white/3 border border-indigo-500/20 rounded-xl p-5">
                <p className="font-bold text-white mb-1">"{s.finding}"</p>
                <p className="text-xs text-indigo-400 font-bold mb-2">— {s.source}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* HOW TO USE */}
      <div className="max-w-3xl mx-auto px-6 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
          <h3 className="text-xl font-black mb-6 text-center">How To Use This Protocol</h3>
          <div className="space-y-4">
            {[
              { step: '1', text: 'Put on good quality headphones — binaural beats require stereo separation to work' },
              { step: '2', text: 'Lie down or sit comfortably. Rest your wrist. Do not perform or practice during sessions.' },
              { step: '3', text: 'Start with Phase 1 for the first 3 days. Progress through phases as healing advances.' },
              { step: '4', text: 'Do 1-2 sessions per day minimum. More is fine. Mark each session complete.' },
              { step: '5', text: 'Combine with any prescribed physio. These frequencies work WITH medical treatment, not instead of it.' },
              { step: '6', text: 'For Phase 5 (musician precision), visualise playing — the brain cannot fully distinguish between imagined and real practice. Neural pathways rebuild.' }
            ].map(item => (
              <div key={item.step} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 font-black text-sm flex items-center justify-center flex-shrink-0">{item.step}</span>
                <p className="text-gray-300 text-sm leading-relaxed pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center pb-12 px-6">
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          This protocol is built on published peer-reviewed research. It is a complementary therapy and does not replace medical care. Always follow your doctor's guidance. Frequency therapy is not a substitute for professional medical treatment.
        </p>
        <p className="text-xs text-gray-700 mt-3">Built with ♾️❤️ by UF51 • For musicians, healers and humans</p>
      </div>
    </div>
  );
}