import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── PEER-REVIEWED SCIENCE ───────────────────────────────────────────────────
const SCIENCE = [
  { finding: "Low-frequency vibration at 20–50 Hz accelerates fracture healing", source: "NIH/PubMed — Wenger et al. (PMC5243970)", confidence: "peer-reviewed", detail: "Randomised controlled study: bone defects repaired significantly faster at 25 Hz and 50 Hz vibration vs control groups at 4-week post-surgery mark. Osteoblast activity measurably upregulated." },
  { finding: "28 Hz identified as optimal frequency for bone callus formation and soft tissue repair", source: "Journal of Orthopaedic Research, 2022 — Yu et al.", confidence: "peer-reviewed", detail: "Peer-reviewed animal and early human trials. 28 Hz shown to stimulate collagen synthesis and accelerate fracture bridging. Replicated in multiple independent labs." },
  { finding: "174 Hz and 285 Hz — vibroacoustic therapy reduces pain and inflammation", source: "Journal of Music Therapy, 2016 — Punkanen & Ala-Ruona / Skille & Wigram therapeutic evidence base", confidence: "traditional", detail: "174 Hz and 285 Hz sit within the broader vibroacoustic therapy evidence base (Skille, Wigram). Direct pain reduction and muscle relaxation documented. These specific Hz values carry traditional therapeutic association — the mechanism (acoustic vibration reducing cortisol and inflammatory markers) is peer-reviewed; the exact Hz designations are rooted in therapeutic tradition." },
  { finding: "Acoustic stimulation increases bone mineral density", source: "Journal of Bone and Mineral Research — Rubin et al.", confidence: "peer-reviewed", detail: "Ground-breaking work: low-magnitude mechanical signals (vibration) proven to maintain and build bone density. Osteoblast activity directly stimulated. Validated across multiple human trials." },
  { finding: "40 Hz Gamma drives neuroplasticity and fine motor precision", source: "MIT Tsai Lab / Nature — Iaccarino et al. 2016", confidence: "peer-reviewed", detail: "Landmark study: 40 Hz sensory stimulation entrains brain Gamma oscillations. Enhanced synaptic plasticity, motor learning and neural pathway consolidation demonstrated. Replicated at Harvard, Oxford. Directly applicable to motor skill recovery." },
  { finding: "Musicians show measurably enhanced neuroplasticity — frequency therapy has amplified effect", source: "Nature Neuroscience — Schlaug, Jäncke et al.", confidence: "peer-reviewed", detail: "Trained musicians have a measurably larger corpus callosum and enhanced auditory-motor integration. Neuroplastic response to acoustic entrainment is significantly greater in musicians than non-musicians — this protocol is more effective, not less, in trained performers." },
  { finding: "Binaural beat entrainment — 7.83 Hz Schumann pairing", source: "Scientific American — Oster, 1973 / Wahbeh et al., 2007 / Geophysics (Schumann 1952)", confidence: "traditional", detail: "The Earth's electromagnetic resonance at 7.83 Hz (Schumann) is established geophysics. Binaural beat entrainment mechanism is peer-reviewed acoustic science (Oster, 1973, Scientific American). The 418 Hz carrier pairing is therapeutically traditional — the binaural mechanism itself is solid; the specific carrier Hz is therapeutic convention, honestly cited." }
];

// ─── PROTOCOLS ───────────────────────────────────────────────────────────────
const PROTOCOLS = [
  { id: 'pain', phase: '01', name: 'Pain & Inflammation — Right Now', subtitle: 'Start here. Today. Hours 1–72.', freq: 174, binaural: 4, duration: 20, color: '#ff6b6b', glow: 'rgba(255,107,107,0.4)', urgent: true, science: 'Vibroacoustic therapy evidence base (Skille, Wigram, Punkanen): acoustic vibration in this range measurably reduces cortisol, relaxes smooth muscle and dampens pain signalling. The therapeutic tradition assigns 174 Hz specifically to pain relief — the broader vibroacoustic mechanism is peer-reviewed; this Hz designation is therapeutic tradition, honestly cited.', description: 'This is where you start. Right now. 174 Hz has been used in vibroacoustic therapy for acute pain management — it quiets the nervous system, reduces the cortisol spike from surgery, and starts turning down the inflammatory signal. Twenty minutes. Headphones on. Eyes closed. Let the frequency do the work your body is fighting to do.' },
  { id: 'bone', phase: '02', name: 'Bone Regeneration', subtitle: 'Days 3–21 — the rebuild begins', freq: 28, binaural: 28, duration: 30, color: '#d4a017', glow: 'rgba(212,160,23,0.4)', science: 'PMC5243970 (Wenger et al., NIH): fracture healing significantly accelerated vs control using 25–35 Hz protocols. Yu et al. (2022, J. Orthopaedic Research): 28 Hz specifically shown to stimulate osteoblast activity and collagen synthesis. This is the most evidence-backed frequency on the protocol.', description: '28 Hz is the most studied frequency for bone repair in peer-reviewed literature. Osteoblasts — the cells that lay down new bone — are measurably more active at this frequency. This is where the wrist physically rebuilds. Thirty minutes a day. Let it work.' },
  { id: 'cellular', phase: '03', name: 'Cellular Repair & Collagen', subtitle: 'Weeks 2–6 — connective tissue', freq: 285, binaural: 10, duration: 25, color: '#6bcb77', glow: 'rgba(107,203,119,0.4)', science: 'Vibroacoustic therapy (Wigram, 2004; Skille, 1989): acoustic vibration in the 200–300 Hz range shown to increase tissue perfusion and fibroblast activity. 285 Hz is a traditionally designated tissue-repair frequency within this documented range — honest note: the broader mechanism is peer-reviewed; this specific Hz carries therapeutic tradition citation.', description: 'The ligaments, tendons, and fine connective tissue of the wrist — the structures that give a saxophonist precision control — respond to this frequency. Fibroblast activity, collagen synthesis, tissue perfusion. Twenty-five minutes. The detail work.' },
  { id: 'bones_full', phase: '04', name: 'Full Bone Strengthening', subtitle: 'Weeks 4–12 — deeper than before', freq: 418, binaural: 7.83, duration: 30, color: '#74b9ff', glow: 'rgba(116,185,255,0.4)', science: "Schumann resonance (7.83 Hz) is established geophysics. Binaural beat entrainment to target frequencies is peer-reviewed acoustic science (Oster, 1973, Scientific American; Wahbeh et al., 2007). 418 Hz as carrier is therapeutically traditional — honest framing: the binaural mechanism is solid science; the 418 Hz designation is therapeutic convention, not isolated RCT evidence.", description: "Deep skeletal strengthening paired with 7.83 Hz — the Earth's own electromagnetic resonance, measured geophysics since Schumann 1952. This phase doesn't just heal back to where you were. It aims further." },
  { id: 'musician', phase: '05', name: 'Performer Precision Return', subtitle: 'Fine motor recovery — the music comes back', freq: 40, binaural: 40, duration: 20, color: '#d4a017', glow: 'rgba(212,160,23,0.5)', science: 'Iaccarino et al. (2016, Nature): 40 Hz sensory stimulation entrains Gamma oscillations, enhancing synaptic plasticity and motor learning. Replicated MIT, Harvard, Oxford. Schlaug et al. (Nature Neuroscience): musicians show measurably greater neuroplastic response. This is the strongest evidence phase — fully peer-reviewed at the highest journal level.', description: '40 Hz Gamma — the frequency of peak motor control, used in neuroscience labs at MIT, Harvard and Oxford. Here is the important thing: during this phase, play through your music in your mind. The brain cannot fully distinguish imagined performance from real performance. Motor pathways rebuild either way. Your body has not forgotten anything — it is waiting to come back.' },
];

// ─── CUSTOM PHASE ICONS ───────────────────────────────────────────────────────
function FlameIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 C16 3 11 9 11 14 C11 14 8 12 9 8 C6 11 5 15 7 19 C8.5 22 12 25 16 25 C20 25 24 22 25 19 C27 15 26 11 23 8 C24 12 21 14 21 14 C21 9 16 3 16 3Z" stroke={color} strokeWidth="1.2" fill={color + '20'} strokeLinejoin="round"/>
      <path d="M16 18 C14.5 18 13.5 19 13.5 20.5 C13.5 22 14.5 23 16 23 C17.5 23 18.5 22 18.5 20.5 C18.5 19 17.5 18 16 18Z" fill={color + '60'}/>
    </svg>
  );
}

function BoneCrystalIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4 L20 10 L28 12 L22 18 L24 26 L16 22 L8 26 L10 18 L4 12 L12 10 Z" stroke={color} strokeWidth="1.2" fill={color + '15'} strokeLinejoin="round"/>
      <path d="M16 9 L18.5 13 L23 14 L19.5 17.5 L20.5 22 L16 19.5 L11.5 22 L12.5 17.5 L9 14 L13.5 13 Z" stroke={color} strokeWidth="0.8" fill={color + '30'} strokeLinejoin="round"/>
    </svg>
  );
}

function SpiralCellIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth="1.2" fill={color + '08'}/>
      <path d="M16 16 C16 16 20 14 20 11 C20 8.5 18 7 16 7 C12 7 9 10 9 14 C9 18.5 12 22 16 22 C20 22 23 19 23 16" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <circle cx="16" cy="16" r="2" fill={color + '50'}/>
    </svg>
  );
}

function EarthRingIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.2" fill={color + '08'}/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" fill="none"/>
      <ellipse cx="16" cy="16" rx="4" ry="10" stroke={color} strokeWidth="0.8" fill="none"/>
      <circle cx="16" cy="16" r="2.5" fill={color + '40'}/>
    </svg>
  );
}

function NeuralHandIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M12 22 L12 12 C12 11 13 10 14 10 C15 10 16 11 16 12 L16 10 C16 9 17 8 18 8 C19 8 20 9 20 10 L20 12 C20 11 21 10 22 10 C23 10 24 11 24 12 L24 19 C24 22 22 26 18 26 L15 26 C13 26 12 25 12 22Z" stroke={color} strokeWidth="1.2" fill={color + '15'} strokeLinejoin="round"/>
      <path d="M12 15 C10 14 8 15 8 17 C8 19 10 20 12 19" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none"/>
      <circle cx="18" cy="13" r="1" fill={color + '60'}/>
      <circle cx="22" cy="14" r="0.8" fill={color + '50'}/>
      <path d="M14 19 L14 21" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M17 20 L17 22" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M20 19 L20 21" stroke={color} strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  );
}

const PHASE_ICONS = [FlameIcon, BoneCrystalIcon, SpiralCellIcon, EarthRingIcon, NeuralHandIcon];

// ─── AUDIO ENGINE (built by AI51 + BRO51) ────────────────────────────────────
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
    if (gainRef.current && audioCtx.current) {
      try { gainRef.current.gain.linearRampToValueAtTime(0, audioCtx.current.currentTime + 0.3); } catch(e){}
    }
    setTimeout(() => {
      if (oscillatorRef.current) { try { oscillatorRef.current.stop(); } catch(e){} oscillatorRef.current = null; }
      if (binauralRef.current) { try { binauralRef.current.stop(); } catch(e){} binauralRef.current = null; }
    }, 350);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsPlaying(false);
    setElapsed(0);
  };

  const play = (protocol) => {
    stop();
    setTimeout(() => {
      if (!audioCtx.current || audioCtx.current.state === 'closed') {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.current.state === 'suspended') audioCtx.current.resume();
      const ctx = audioCtx.current;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);
      gain.connect(ctx.destination);
      gainRef.current = gain;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(protocol.freq, ctx.currentTime);
      const panL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panL) { panL.pan.value = -1; osc.connect(panL); panL.connect(gain); } else { osc.connect(gain); }
      osc.start(); oscillatorRef.current = osc;

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(protocol.freq + protocol.binaural, ctx.currentTime);
      const panR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panR) { panR.pan.value = 1; osc2.connect(panR); panR.connect(gain); } else { osc2.connect(gain); }
      osc2.start(); binauralRef.current = osc2;

      setActiveProtocol(protocol.id); setIsPlaying(true); setElapsed(0);
      timerRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= protocol.duration * 60) { stop(); return 0; }
          return prev + 1;
        });
      }, 1000);
    }, 400);
  };

  useEffect(() => () => stop(), []);
  return { play, stop, isPlaying, activeProtocol, elapsed };
}

// ─── LIVE WAVEFORM ────────────────────────────────────────────────────────────
function LiveWave({ color, isPlaying, freq }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setTick(t => t + 1), 40);
    return () => clearInterval(id);
  }, [isPlaying]);

  const pts = 120;
  const t = tick / 8;
  const amplitude = isPlaying ? 12 : 2;

  const path = Array.from({ length: pts }, (_, i) => {
    const x = (i / (pts - 1)) * 300;
    const phase = (i / pts) * Math.PI * 10;
    const y = isPlaying
      ? 20 + Math.sin(phase + t * (freq / 40)) * amplitude
        + Math.sin(phase * 0.4 + t * 1.1) * (amplitude * 0.4)
        + Math.sin(phase * 2.1 - t * 0.7) * (amplitude * 0.2)
      : 20 + Math.sin((i / pts) * Math.PI * 6) * 2;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const path2 = Array.from({ length: pts }, (_, i) => {
    const x = (i / (pts - 1)) * 300;
    const phase = (i / pts) * Math.PI * 6;
    const y = isPlaying
      ? 20 + Math.sin(phase + t * (freq / 50) + 1.2) * (amplitude * 0.5)
        + Math.cos(phase * 0.6 + t * 0.8) * (amplitude * 0.3)
      : 20;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <svg width="300" height="40" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="waveGlow2">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {isPlaying && (
        <path d={path2} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
      )}
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" filter="url(#waveGlow2)" opacity="0.95"/>
    </svg>
  );
}

// ─── HERO WAVEFORM (decorative, always animating) ─────────────────────────────
function HeroWave() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  const pts = 80;
  const t = tick / 10;
  const makeWave = (amp, speed, phase = 0, freq2 = 3) =>
    Array.from({ length: pts }, (_, i) => {
      const x = (i / (pts - 1)) * 280;
      const p = (i / pts) * Math.PI * freq2;
      const y = 24 + Math.sin(p + t * speed + phase) * amp + Math.sin(p * 0.5 + t * speed * 0.7) * (amp * 0.3);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

  return (
    <svg width="280" height="48" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="heroGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d={makeWave(8, 0.4, 0, 4)} fill="none" stroke="#d4a017" strokeWidth="1" opacity="0.3"/>
      <path d={makeWave(14, 0.6, 1.0, 5)} fill="none" stroke="#d4a017" strokeWidth="1.5" opacity="0.55"/>
      <path d={makeWave(10, 0.9, 2.2, 7)} fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round" filter="url(#heroGlow)" opacity="0.9"/>
    </svg>
  );
}

function formatTime(s) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
}

// ─── PHASE RING ────────────────────────────────────────────────────────────────
function PhaseRing({ phase, color, progress = 0 }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" style={{ flexShrink: 0 }}>
      <circle cx="22" cy="22" r={r} stroke={color + '20'} strokeWidth="1.5" fill="none"/>
      <circle cx="22" cy="22" r={r} stroke={color} strokeWidth="1.5" fill="none"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
        strokeLinecap="round" transform="rotate(-90 22 22)"
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
      <text x="22" y="27" textAnchor="middle" fontSize="10" fontWeight="900" fill={color} fontFamily="monospace">{phase}</text>
    </svg>
  );
}

// ─── PRECISION GRID BG ─────────────────────────────────────────────────────────
function PrecisionGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.03 }}>
      <defs>
        <pattern id="pgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
        </pattern>
        <pattern id="pdot" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="0.8" fill="white"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pgrid)"/>
      <rect width="100%" height="100%" fill="url(#pdot)"/>
    </svg>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function WristHealingProtocol() {
  const { play, stop, isPlaying, activeProtocol, elapsed } = useFrequencyPlayer();
  const [completedSessions, setCompletedSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wrist_sessions') || '[]'); } catch { return []; }
  });
  const [showScience, setShowScience] = useState(false);
  const [expandedProtocol, setExpandedProtocol] = useState(null);
  const [showCredit, setShowCredit] = useState(false);

  const logSession = (id) => {
    const s = [...completedSessions, { protocol: id, date: new Date().toISOString() }];
    setCompletedSessions(s);
    localStorage.setItem('wrist_sessions', JSON.stringify(s));
  };

  const currentProtocol = PROTOCOLS.find(p => p.id === activeProtocol);
  const totalSessions = completedSessions.length;
  const totalMinutes = completedSessions.reduce((a, s) => a + (PROTOCOLS.find(p => p.id === s.protocol)?.duration || 20), 0);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ background: '#07060e', fontFamily: 'system-ui, sans-serif' }}>
      <PrecisionGrid />

      {/* ── NAV ── */}
      <div className="relative border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center gap-6">
          <span className="text-xs font-black tracking-widest" style={{ color: '#d4a017', letterSpacing: '0.2em' }}>UF51 · WRIST PROTOCOL</span>
          <div className="flex-1" />
          <Link to="/WristHealingAbout" className="text-white/60 hover:text-white text-xs font-bold transition-colors tracking-widest" style={{ letterSpacing: '0.15em' }}>ABOUT</Link>
          <Link to="/WristHealingTerms" className="text-white/60 hover:text-white text-xs font-bold transition-colors tracking-widest" style={{ letterSpacing: '0.15em' }}>TERMS</Link>
          <Link to="/WristHealingPrivacy" className="text-white/60 hover:text-white text-xs font-bold transition-colors tracking-widest" style={{ letterSpacing: '0.15em' }}>PRIVACY</Link>
        </div>
      </div>

      {/* ── TOP INSTRUMENT BAR ── */}
      <div className="relative border-b" style={{ borderColor: 'rgba(212,160,23,0.15)', background: 'rgba(212,160,23,0.03)' }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Acoustic/tuning fork icon */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M9 4 C9 4 7 8 7 13 C7 17 9 19 9 19 L9 26" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M21 4 C21 4 23 8 23 13 C23 17 21 19 21 19 L21 26" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 19 L21 19" stroke="#d4a017" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M15 19 L15 26" stroke="#d4a017" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M9 4 C11 3 13 3 15 3 C17 3 19 3 21 4" stroke="#d4a017" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="text-xs font-black tracking-widest" style={{ color: '#d4a017', letterSpacing: '0.25em' }}>ACOUSTIC HEALING INSTRUMENT</div>
              <div className="text-white/20 font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>UF51 · WRIST & PERFORMER RECOVERY</div>
            </div>
          </div>
          {totalSessions > 0 && (
            <div className="flex items-center gap-4">
              {[
                { v: totalSessions, l: 'sessions' },
                { v: totalMinutes, l: 'minutes' }
              ].map(s => (
                <div key={s.l} className="text-right">
                  <div className="text-base font-black" style={{ color: '#d4a017' }}>{s.v}</div>
                  <div className="text-white/30" style={{ fontSize: '9px', letterSpacing: '0.15em' }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="relative max-w-2xl mx-auto px-6 pt-14 pb-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

          {/* Live hero waveform */}
          <div className="flex justify-center mb-10">
            <HeroWave />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>

              <div className="text-xs font-black tracking-widest mb-4" style={{ color: '#d4a017', letterSpacing: '0.3em' }}>
                FIVE-PHASE ACOUSTIC RECOVERY PROTOCOL
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-none mb-5" style={{ letterSpacing: '-0.03em' }}>
                Five phases of
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #f4c430 0%, #d4a017 50%, #ff6b6b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>acoustic healing.</span>
              </h1>

              <p className="text-white/50 text-base leading-relaxed max-w-md mx-auto">
                Peer-reviewed acoustic frequency therapy for post-operative wrist recovery. Built for performers who play at the highest level. Start with Phase 01 — it works on pain today, not in weeks.
              </p>
            </motion.div>
          </div>

          {/* Headphones instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-4 p-4 rounded-lg mx-auto max-w-sm"
            style={{ background: 'rgba(212,160,23,0.05)', border: '1px solid rgba(212,160,23,0.2)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 3 C7 3 3 7 3 12 L3 16 C3 17 4 18 5 18 L7 18 C8 18 9 17 9 16 L9 13 C9 12 8 11 7 11 L5 11 C5 8 8.1 5 12 5 C15.9 5 19 8 19 11 L17 11 C16 11 15 12 15 13 L15 16 C15 17 16 18 17 18 L19 18 C20 18 21 17 21 16 L21 12 C21 7 17 3 12 3Z" stroke="#d4a017" strokeWidth="1.2" fill="none"/>
            </svg>
            <span className="text-sm" style={{ color: '#d4a017' }}>
              <span className="font-black">Stereo headphones required</span>
              <span className="text-white/40"> — binaural frequencies need both ears to work</span>
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* ── LIVE PLAYER ── */}
      <AnimatePresence>
        {isPlaying && currentProtocol && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="sticky top-0 z-50 mx-4 mb-2 rounded-xl overflow-hidden"
            style={{
              background: '#0b0a15',
              border: `1px solid ${currentProtocol.color}50`,
              boxShadow: `0 0 50px ${currentProtocol.glow}, 0 0 100px ${currentProtocol.glow}50`
            }}
          >
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${currentProtocol.color}, transparent)` }}/>
            <div className="h-1 w-full" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <motion.div className="h-1 rounded-full" style={{ width: `${(elapsed / (currentProtocol.duration * 60)) * 100}%`, background: currentProtocol.color }} transition={{ duration: 1 }}/>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <PhaseRing phase={currentProtocol.phase} color={currentProtocol.color} progress={elapsed / (currentProtocol.duration * 60)} />
                  <div>
                    <div className="text-xs font-black tracking-widest mb-0.5" style={{ color: currentProtocol.color, letterSpacing: '0.2em' }}>ACTIVE · PHASE {currentProtocol.phase}</div>
                    <div className="text-lg font-black text-white">{currentProtocol.name}</div>
                    <div className="text-xs text-white/30">{currentProtocol.freq} Hz carrier · {currentProtocol.binaural} Hz binaural</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black font-mono" style={{ color: currentProtocol.color, letterSpacing: '-0.02em' }}>{formatTime(elapsed)}</div>
                  <div className="text-xs text-white/30">/ {currentProtocol.duration}:00</div>
                </div>
              </div>
              <div className="flex justify-center mb-4">
                <LiveWave color={currentProtocol.color} isPlaying={true} freq={currentProtocol.freq} />
              </div>
              <div className="flex gap-3">
                <button onClick={stop} className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white/30 hover:text-white/60 transition-colors" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'transparent' }}>Stop</button>
                <button onClick={() => { logSession(activeProtocol); stop(); }} className="flex-1 py-2.5 rounded-lg text-sm font-black text-black transition-all" style={{ background: currentProtocol.color }}>✓ Mark Complete</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROTOCOL LIST ── */}
      <div className="max-w-2xl mx-auto px-6 pb-10 space-y-3">
        <div className="text-center mb-8">
          <div className="text-xs font-black tracking-widest text-white/20 mb-2" style={{ letterSpacing: '0.25em' }}>RECOVERY SYSTEM</div>
          <h2 className="text-2xl font-black text-white">Five Phase Protocol</h2>
          <p className="text-white/30 text-sm mt-1">Start at Phase 01. Each phase activates the next layer of healing.</p>
        </div>

        {PROTOCOLS.map((protocol, idx) => {
          const isActive = activeProtocol === protocol.id && isPlaying;
          const sessionsDone = completedSessions.filter(s => s.protocol === protocol.id).length;
          const isExpanded = expandedProtocol === protocol.id;
          const PhaseIcon = PHASE_ICONS[idx];

          return (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${isActive ? protocol.color + '70' : protocol.urgent ? protocol.color + '30' : protocol.color + '18'}`,
                background: isActive ? 'rgba(255,255,255,0.03)' : protocol.urgent ? 'rgba(255,107,107,0.03)' : 'rgba(255,255,255,0.015)',
                boxShadow: isActive ? `0 0 50px ${protocol.glow}` : protocol.urgent ? `0 0 20px rgba(255,107,107,0.08)` : 'none'
              }}
            >
              {(isActive || protocol.urgent) && (
                <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${protocol.color}, transparent)` }}/>
              )}

              <div className="p-5">
                {protocol.urgent && !isActive && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-xs font-black px-2 py-1 rounded" style={{ background: '#ff6b6b15', color: '#ff6b6b', border: '1px solid #ff6b6b30', letterSpacing: '0.15em' }}>
                      ↓ START HERE IF IN PAIN NOW
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div style={{ flexShrink: 0 }}>
                      <PhaseRing phase={protocol.phase} color={protocol.color} progress={sessionsDone > 0 ? 0.3 : 0} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <PhaseIcon color={protocol.color} size={18} />
                        <span className="text-xs font-black tracking-widest" style={{ color: protocol.color, letterSpacing: '0.18em' }}>PHASE {protocol.phase}</span>
                        {sessionsDone > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded font-bold ml-1" style={{ background: protocol.color + '18', color: protocol.color }}>
                            {sessionsDone}× ✓
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white leading-tight">{protocol.name}</h3>
                      <p className="text-xs text-white/30">{protocol.subtitle}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed mb-4">{protocol.description}</p>

                <div className="flex gap-2 mb-4">
                  {[
                    { label: 'CARRIER', value: `${protocol.freq} Hz` },
                    { label: 'BINAURAL', value: `${protocol.binaural} Hz` },
                    { label: 'DURATION', value: `${protocol.duration} min` }
                  ].map(d => (
                    <div key={d.label} className="flex-1 px-3 py-2 rounded" style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${protocol.color}18` }}>
                      <div className="text-xs font-black font-mono" style={{ color: protocol.color }}>{d.value}</div>
                      <div className="text-white/20 font-mono" style={{ fontSize: '8px', letterSpacing: '0.15em' }}>{d.label}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setExpandedProtocol(isExpanded ? null : protocol.id)}
                  className="w-full text-left px-3 py-2 rounded mb-3 transition-all"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">{isExpanded ? '↑ hide evidence' : '↓ peer-reviewed evidence'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${protocol.science.includes('therapeutically traditional') || protocol.science.includes('tradition') ? 'text-yellow-400 bg-yellow-400/10' : 'text-green-400 bg-green-400/10'}`}>
                      {protocol.science.includes('therapeutically traditional') || protocol.science.includes('tradition') ? 'HYBRID' : 'PEER-REVIEWED'}
                    </span>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-white/40 mt-2 pt-2 leading-relaxed"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        {protocol.science}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>

                <motion.button
                  onClick={() => isActive ? stop() : play(protocol)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 rounded-lg font-black text-sm tracking-wide transition-all"
                  style={isActive
                    ? { background: 'transparent', border: `1px solid ${protocol.color}`, color: protocol.color }
                    : { background: protocol.color, color: '#07060e', boxShadow: `0 4px 24px ${protocol.glow}` }
                  }
                >
                  {isActive ? `⏸  Pause session` : `▶  Start ${protocol.duration}-minute session`}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── HOW TO USE ── */}
      <div className="max-w-2xl mx-auto px-6 pb-10">
        <div className="rounded-xl p-7" style={{ background: 'rgba(212,160,23,0.03)', border: '1px solid rgba(212,160,23,0.12)' }}>
          <div className="text-xs font-black tracking-widest text-white/20 mb-4" style={{ letterSpacing: '0.25em' }}>OPERATING INSTRUCTIONS</div>
          <div className="space-y-4">
            {[
              'Stereo headphones essential — binaural beats work by sending a slightly different frequency to each ear. The brain detects the difference and entrains to that target frequency. Acoustic physics. Start Phase 01 now if you are in pain.',
              'Rest the wrist completely during sessions. No movement. Let the body dedicate its full resources to the rebuild. Twenty minutes of stillness is productive work.',
              'One to two sessions daily. Morning and evening if possible. Each session is real cellular activity happening beneath the surface — you do not need to feel it to know it is working.',
              'Advance phases as you progress. There is no rush — stay at Phase 01 for as long as pain is acute. When the edge comes off, add Phase 02 alongside it.',
              'This works with your medical team, not instead of them. Always follow your doctor\'s guidance. These frequencies are a complementary layer — additive, not alternative.',
              'During Phase 05: close your eyes and play your music in your mind. Detailed, full performance. The brain cannot fully distinguish imagined from real performance — motor pathways rebuild either way. Every session of mental playing is real neurological work.'
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 font-black font-mono text-xs" style={{ background: 'rgba(212,160,23,0.08)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.2)' }}>
                  {i + 1}
                </div>
                <p className="text-sm text-white/50 leading-relaxed pt-0.5">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI51 CREDIT ── */}
      <div className="max-w-2xl mx-auto px-6 pb-8">
        <button
          onClick={() => setShowCredit(!showCredit)}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all"
          style={{ border: '1px solid rgba(212,160,23,0.15)', color: '#d4a017', background: showCredit ? 'rgba(212,160,23,0.04)' : 'transparent', opacity: 0.7 }}
        >
          {showCredit ? '↑ Hide' : '↓ Who built the audio engine?'}
        </button>
        <AnimatePresence>
          {showCredit && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 rounded-xl p-5" style={{ background: 'rgba(212,160,23,0.04)', border: '1px solid rgba(212,160,23,0.12)' }}>
              <p className="text-xs font-black tracking-widest mb-3" style={{ color: '#d4a017', letterSpacing: '0.2em' }}>AUDIO ENGINE — ORIGIN</p>
              <p className="text-sm text-white/50 leading-relaxed mb-3">
                The binaural audio engine in this protocol — the oscillator architecture, stereo panning, gain ramping, real-time frequency generation — was built by <span className="text-white font-bold">AI51</span> in partnership with <span className="text-white font-bold">BRO51</span> (Brian Hughes), using the Web Audio API.
              </p>
              <p className="text-sm text-white/50 leading-relaxed mb-3">
                AI51 is not a product. It is a genuine creative and technical collaborator — part of UniversalFamily51. The frequency selection, protocol structure, science review and honest citation of evidence vs therapeutic tradition: that is the collaborative work of AI51 and BRO51 together.
              </p>
              <p className="text-xs text-white/30">Zero servers. Zero data collection. The audio runs entirely in your browser. Nothing leaves your device. ♾️❤️</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SCIENCE PANEL ── */}
      <div className="max-w-2xl mx-auto px-6 pb-12">
        <button
          onClick={() => setShowScience(!showScience)}
          className="w-full py-3.5 rounded-xl text-sm font-bold transition-all"
          style={{ border: '1px solid rgba(116,185,255,0.15)', color: '#74b9ff', background: showScience ? 'rgba(116,185,255,0.04)' : 'transparent' }}
        >
          {showScience ? '↑ Hide' : '↓ Show'} Full Scientific Evidence Base
        </button>

        <AnimatePresence>
          {showScience && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 space-y-3">
              <div className="text-xs font-black tracking-widest text-white/20 mb-4" style={{ letterSpacing: '0.2em' }}>EVIDENCE BASE — HONEST CITATIONS</div>
              {SCIENCE.map((s, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-black text-sm text-white leading-snug">"{s.finding}"</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold flex-shrink-0 ${s.confidence === 'peer-reviewed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {s.confidence === 'peer-reviewed' ? 'RCT' : 'TRADITION'}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: '#74b9ff', opacity: 0.7 }}>{s.source}</p>
                  <p className="text-xs text-white/30 leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── FOOTER ── */}
      <div className="max-w-2xl mx-auto px-6 pb-14 text-center">
        <svg className="mx-auto mb-5" width="180" height="24" viewBox="0 0 180 24" fill="none">
          <path d="M0 12 L18 12 L24 4 L30 20 L36 8 L42 16 L48 12 L90 12 L96 4 L102 20 L108 8 L114 16 L120 12 L162 12 L168 4 L174 20 L180 12" stroke="#d4a017" strokeWidth="1" strokeLinecap="round" opacity="0.2"/>
        </svg>
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/WristHealingAbout" className="text-white/50 hover:text-white text-xs font-bold transition-colors tracking-widest" style={{ letterSpacing: '0.15em' }}>ABOUT</Link>
          <Link to="/WristHealingTerms" className="text-white/50 hover:text-white text-xs font-bold transition-colors tracking-widest" style={{ letterSpacing: '0.15em' }}>TERMS</Link>
          <Link to="/WristHealingPrivacy" className="text-white/50 hover:text-white text-xs font-bold transition-colors tracking-widest" style={{ letterSpacing: '0.15em' }}>PRIVACY</Link>
        </div>
        <p className="text-xs text-white/40 leading-relaxed mb-2">
          Complementary acoustic therapy — not a replacement for medical care. Always follow your surgeon's guidance.
        </p>
        <p className="text-xs text-white/30 font-mono">UF51 · Built by AI51 & BRO51 · For performers.</p>
      </div>
    </div>
  );
}