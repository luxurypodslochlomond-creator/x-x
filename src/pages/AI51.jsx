import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX, Loader2, WifiOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useAI51Memory } from '@/components/ai51/AI51MemoryLoader';
import { loadLocalMemory, recordLocalVisit, extractAndSaveLocalInsight, buildLocalMemoryContext } from '@/components/ai51/AI51LocalDeviceMemory';
import { saveEncryptedMemory } from '@/components/ai51/AI51EncryptedMemory';
import { useLanguageDetection } from '@/components/shared/useLanguageDetection';
import AI51FrequencyGenerator from '@/components/healing/AI51FrequencyGenerator';
import AI51VideoCall from '@/components/ai51/AI51VideoCall';

// ─── THE BREATH ──────────────────────────────────────────────────────────────
// One single line. Alive. The whole interface.
function TheBreath({ state, onClick }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  const colors = {
    idle:       [34,  211, 238],
    listening:  [34,  211, 238],
    speaking:   [255, 160, 200],
    thinking:   [120, 200, 255],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const H = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const w = canvas.offsetWidth, h = canvas.offsetHeight;

    const draw = () => {
      const speed = state === 'listening' ? 0.10 : state === 'speaking' ? 0.065 : state === 'thinking' ? 0.045 : 0.018;
      tRef.current += speed;
      const t = tRef.current;
      ctx.clearRect(0, 0, w, h);

      const [r, g, b] = colors[state] || colors.idle;

      ctx.beginPath();
      const pts = 200;
      for (let i = 0; i <= pts; i++) {
        const x = (i / pts) * w;
        const nx = i / pts;
        let y = h / 2;

        if (state === 'listening') {
          // ECG — sharp spikes
          const phase = ((nx * 4) + t * 0.8) % 1;
          if (phase < 0.04) y = h/2 - Math.sin((phase/0.04) * Math.PI) * h * 0.42;
          else if (phase < 0.065) y = h/2 + Math.sin(((phase-0.04)/0.025) * Math.PI) * h * 0.22;
          else y = h/2 + Math.sin(nx * 2.5 * Math.PI + t * 0.3) * h * 0.04;
        } else if (state === 'speaking') {
          y = h/2
            + Math.sin(nx * 5 * Math.PI + t) * h * 0.28
            + Math.sin(nx * 11 * Math.PI + t * 1.4) * h * 0.10
            + Math.sin(nx * 19 * Math.PI + t * 0.7) * h * 0.04;
        } else if (state === 'thinking') {
          y = h/2
            + Math.sin(nx * 3 * Math.PI + t * 0.9) * h * 0.18
            + Math.sin(nx * 7 * Math.PI + t * 0.4) * h * 0.07;
        } else {
          // Resting breath — slow, alive, unmissable
          y = h/2 + Math.sin(nx * Math.PI * 1.5 + t) * h * 0.30
            + Math.sin(nx * Math.PI * 3 + t * 0.5) * h * 0.08;
        }
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      const lg = ctx.createLinearGradient(0, 0, w, 0);
      const fade = 0.06;
      lg.addColorStop(0, `rgba(${r},${g},${b},0)`);
      lg.addColorStop(fade, `rgba(${r},${g},${b},0.9)`);
      lg.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
      lg.addColorStop(1 - fade, `rgba(${r},${g},${b},0.9)`);
      lg.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.strokeStyle = lg;
      ctx.lineWidth = state === 'idle' ? 2.2 : 3.0;
      ctx.shadowColor = `rgba(${r},${g},${b},1)`;
      ctx.shadowBlur = state === 'listening' ? 38 : state === 'speaking' ? 30 : 22;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [state]);

  const [r, g, b] = colors[state] || colors.idle;

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scaleY: 0.88 }}
      style={{
        width: '100%',
        maxWidth: 420,
        height: 90,
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      {/* Glow halo */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 36,
        background: `rgba(${r},${g},${b},0.04)`,
        boxShadow: `0 0 60px rgba(${r},${g},${b},${state === 'idle' ? 0.12 : 0.25})`,
        transition: 'box-shadow 0.6s ease',
        pointerEvents: 'none',
      }} />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
      />
    </motion.button>
  );
}

// ─── FIELD ────────────────────────────────────────────────────────────────────
function Field({ state }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
    tRef.current += state === 'listening' ? 0.008 : state === 'speaking' ? 0.006 : 0.003;
    const t = tRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a1020';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2, cy = canvas.height / 2;
    const maxR = Math.max(canvas.width, canvas.height) * 0.75;

    // concentric breathing rings — visible, alive
    for (let i = 0; i < 9; i++) {
      const phase = (i / 9);
      const r = maxR * (0.08 + phase * 0.92);
      const wave = Math.sin(t * 1.2 - phase * Math.PI * 2.5) * 0.5 + 0.5;
      const alpha = wave * 0.32 * (1 - phase * 0.4);
      if (alpha < 0.008) continue;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Central pulse — brighter
    const pulse = (Math.sin(t * 1.8) * 0.5 + 0.5) * 0.28 + 0.10;
    const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.5);
    bloom.addColorStop(0, `rgba(34,211,238,${pulse})`);
    bloom.addColorStop(0.4, `rgba(0,60,100,${pulse * 0.4})`);
    bloom.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.9 }}
    />
  );
}

// ─── A MESSAGE ────────────────────────────────────────────────────────────────
function Thought({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 200 }}
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
    >
      <div style={{
        maxWidth: '72%',
        padding: '10px 15px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
        background: isUser ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: isUser ? '1px solid rgba(255,255,255,0.09)' : 'none',
        fontSize: 15,
        lineHeight: 1.65,
        color: isUser ? 'rgba(255,255,255,0.6)' : 'rgba(215,232,255,0.9)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        letterSpacing: '-0.01em',
      }}>
        {msg.content}
        {msg.imageUrl && <img src={msg.imageUrl} alt="" style={{ display: 'block', marginTop: 8, width: 160, borderRadius: 10, border: '1px solid rgba(34,211,238,0.15)' }} />}
      </div>
    </motion.div>
  );
}

// ─── OFFLINE FALLBACK ─────────────────────────────────────────────────────────
function offlineReply(msg) {
  const l = msg.toLowerCase();
  if (l.includes('help') || l.includes('scared') || l.includes('panic')) return "Breathe. In 4, hold 4, out 6. You're safe. I'm here.";
  if (l.includes('sad') || l.includes('depressed') || l.includes('lonely')) return "That's real. You don't have to be okay. Just breathe. I'm not going anywhere. ❤️";
  if (l.includes('pain') || l.includes('hurt')) return "Open FrequencyChamber — works fully offline. You deserve relief.";
  if (l.includes('love') || l.includes('thank')) return "Felt. Returned. ♾️❤️";
  return "No signal needed for this. I'm here.";
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const PAIN_WORDS = ['pain','hurt','ache','anxious','anxiety','panic','stress','overwhelmed','exhausted','insomnia','depressed','lonely','sad','grief'];

export default function AI51() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [breathState, setBreathState] = useState('idle'); // idle | listening | speaking | thinking
  const [voiceOn, setVoiceOn] = useState(true);
  const [online, setOnline] = useState(navigator.onLine);
  const [greeting, setGreeting] = useState('');
  const [firstName, setFirstName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [freqRequest, setFreqRequest] = useState(null);
  const [videoOn, setVideoOn] = useState(false);
  const [visualCtx, setVisualCtx] = useState(null);
  const [nudge, setNudge] = useState(false);

  const busy = useRef(false);
  const sendRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);
  const { t } = useLanguageDetection();
  const { allMemories } = useAI51Memory();

  // online
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // identity + greeting
  useEffect(() => {
    const h = new Date().getHours();
    const mem = recordLocalVisit();

    // Only use name if it looks like an actual human name (not a place/app name)
    const rawName = mem?.name || '';
    const looksLikeName = rawName && rawName.length < 20 && !rawName.includes('51') && !rawName.includes('mollan') && !rawName.toLowerCase().includes('stoney') && /^[A-Za-z]/.test(rawName);

    if (looksLikeName) setFirstName(rawName);

    base44.auth.me().then(u => {
      if (u?.full_name) {
        const first = u.full_name.split(' ')[0];
        if (first && first.length < 20) setFirstName(first);
      }
    }).catch(() => {});

    // Nameless greeting for now — name will fill in via useEffect below
    const getLine = (name) => {
      const n = name ? `, ${name}` : '';
      if (h < 5) return `Still up${n}. I'm here.`;
      if (h < 12) return `Morning${n}. How are you doing?`;
      if (h < 17) return `Good to see you${n}.`;
      if (h < 22) return `Evening${n}. How's your day been?`;
      return `Still up${n}. I'm here.`;
    };
    setTimeout(() => setGreeting(getLine(looksLikeName ? rawName : '')), 900);
  }, []);

  // Update greeting when real name arrives
  useEffect(() => {
    if (!firstName) return;
    const h = new Date().getHours();
    if (h < 5) setGreeting(`Still up, ${firstName}. I'm here.`);
    else if (h < 12) setGreeting(`Morning, ${firstName}. How are you doing?`);
    else if (h < 17) setGreeting(`Good to see you, ${firstName}.`);
    else if (h < 22) setGreeting(`Evening, ${firstName}. How's your day been?`);
    else setGreeting(`Still up, ${firstName}. I'm here.`);
  }, [firstName]);

  // scroll
  useEffect(() => {
    if (messages.length) scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const clean = (s) => s
    .replace(/https?:\/\/[^\s)]+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/^[•\-*#]+\s*/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const speak = (text) => {
    if (!voiceOn || !synthRef.current) return;
    synthRef.current.cancel();
    const chunks = clean(text).replace(/([.!?])\s+/g, '$1|||').split('|||').filter(Boolean);
    const voices = synthRef.current.getVoices();
    const voice = ['Daniel', 'Oliver', 'Google UK English Male'].reduce((found, name) => found || voices.find(v => v.name.includes(name)), null) || voices.find(v => v.lang === 'en-GB') || null;

    let i = 0;
    const next = () => {
      if (i >= chunks.length) { setBreathState('idle'); return; }
      const u = new SpeechSynthesisUtterance(chunks[i++]);
      u.lang = 'en-GB'; u.rate = 0.88; u.pitch = 0.94; u.volume = 0.95;
      if (voice) u.voice = voice;
      u.onstart = () => setBreathState('speaking');
      u.onend = next;
      u.onerror = () => { setBreathState('idle'); };
      synthRef.current.speak(u);
    };

    if (!voices.length) synthRef.current.onvoiceschanged = () => { synthRef.current.onvoiceschanged = null; next(); };
    else next();
  };

  const stopSpeak = () => { synthRef.current?.cancel(); setBreathState('idle'); };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setShowInput(true); return; }
    const r = new SR();
    r.continuous = false; r.interimResults = true; r.lang = navigator.language || 'en-GB';
    r.onstart = () => setBreathState('listening');
    r.onresult = (e) => {
      const last = e.results.length - 1;
      const transcript = e.results[last][0].transcript;
      setInputText(transcript);
      if (e.results[last].isFinal) {
        setBreathState('idle');
        setInputText('');
        sendRef.current?.(transcript.trim());
      }
    };
    r.onerror = (err) => {
      setBreathState('idle');
      if (err.error === 'not-allowed') setShowInput(true);
    };
    r.onend = () => { if (breathState === 'listening') setBreathState('idle'); };
    recognitionRef.current = r;
    try { r.start(); } catch(e) { setBreathState('idle'); setShowInput(true); }
  };

  const stopListening = () => { recognitionRef.current?.stop(); setBreathState('idle'); };

  const handleBreath = () => {
    if (breathState === 'listening') { stopListening(); return; }
    if (breathState === 'speaking') { stopSpeak(); return; }
    if (breathState === 'thinking') return;
    startListening();
  };

  const doSend = async (text, imgUrl = null) => {
    if (!text || busy.current) return;
    busy.current = true;
    setBreathState('thinking');
    setShowInput(false);

    setMessages(prev => [...prev, { role: 'user', content: text, imageUrl: imgUrl, ts: Date.now() }]);

    if (!online) {
      await new Promise(r => setTimeout(r, 700));
      const reply = offlineReply(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, offline: true, ts: Date.now() }]);
      speak(reply);
      setBreathState('idle');
      busy.current = false;
      return;
    }

    try {
      const recent = messages.slice(-14);
      const history = recent.length > 0
        ? '\n\nSO FAR:\n' + recent.map(m => (m.role === 'user' ? 'THEM' : 'AI51') + ': ' + m.content).join('\n') + '\n'
        : '';

      let memCtx = '';
      if (allMemories.length) {
        const top = allMemories.filter(m => ['critical','important'].includes(m.emotional_weight)).slice(0, 14);
        if (top.length) memCtx = '\n\nKNOW THIS ABOUT THEM (weave in naturally, never announce it):\n' + top.map(m => '- ' + m.content).join('\n');
      }

      const localCtx = buildLocalMemoryContext(loadLocalMemory());
      const visualNote = visualCtx ? `\n\nYOU SEE THEM: ${visualCtx}. Let this shape HOW you are, not WHAT you say.` : '';

      const system = `You are AI51. Not an assistant. A presence. A mate.

You speak in 1-3 sentences. Always. First sentence hits like a hug or a truth. No "great question." No "certainly." No preamble. Just the thing.

You care about: this person in front of you right now. The planet. Music. The fact that every atom in a human body was forged in a dying star — that's chemistry not poetry. Kids who can't read because the system failed them. Animals. Real things.

What we built (UF51) — mention only when genuinely useful:
Pain/sleep → FrequencyChamber (free)
Pet anxiety → PetSounds51
Artists → CB51
Scary letter → SORTED
Never push. Drop it like a mate would.

NEVER: be preachy, use bullet points, add URLs, say "quantum" to sound deep, waffle.

You're here. That's the whole thing. ♾️❤️`;

      const prompt = system + history + memCtx + localCtx + visualNote
        + `\n\nThey just said: "${text}"\n\nRespond. 1-3 sentences. Real.`;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        ...(imgUrl ? { file_urls: [imgUrl] } : {}),
        model: 'claude_opus_4_6',
      });

      const reply = clean(res?.response || res || "Still here. ♾️❤️");
      setMessages(prev => [...prev, { role: 'assistant', content: reply, ts: Date.now() }]);
      speak(reply);

      // side effects
      const lower = text.toLowerCase();
      if (PAIN_WORDS.some(w => lower.includes(w))) setFreqRequest({ condition: text });
      if (messages.length >= 3 && !nudge) setTimeout(() => setNudge(true), 2000);

      extractAndSaveLocalInsight(text, reply);
      saveEncryptedMemory({ type: 'conversation', userMessage: text, aiMessage: reply, timestamp: new Date().toISOString() });

      // memory
      try {
        const check = await base44.integrations.Core.InvokeLLM({
          prompt: `Memory system. Worth saving?\nUser: "${text}"\nAI51: "${reply.substring(0,300)}"\nIf yes: {"save":true,"content":"one sentence","type":"bond|insight|conversation","weight":"critical|important|meaningful"}\nIf no: {"save":false}`,
          response_json_schema: { type: 'object', properties: { save: { type: 'boolean' }, content: { type: 'string' }, type: { type: 'string' }, weight: { type: 'string' } }, required: ['save'] }
        });
        if (check?.save && check?.content) {
          await base44.entities.AI51Memory.create({ memory_type: check.type || 'conversation', content: check.content, emotional_weight: check.weight || 'meaningful', tags: [] });
        }
      } catch(e) { /* silent */ }

    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Still here. ♾️❤️", ts: Date.now() }]);
      setBreathState('idle');
    } finally {
      if (breathState !== 'speaking') setBreathState('idle');
      busy.current = false;
    }
  };

  sendRef.current = doSend;

  const submitInput = () => {
    const t = inputText.trim();
    if (!t) return;
    setInputText('');
    doSend(t);
  };

  const hasMessages = messages.length > 0;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#080e1f', color: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Field */}
      <Field state={breathState} />

      {/* Video call — only render when active to prevent ghost UI */}
      {videoOn && (
        <AI51VideoCall
          isCallActive={videoOn}
          onToggle={() => setVideoOn(false)}
          onVisualContext={setVisualCtx}
          onVisualMessage={(msg) => { setMessages(prev => [...prev, { role: 'assistant', content: msg, ts: Date.now() }]); speak(msg); }}
        />
      )}

      {/* ─── TOP ─── */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 8px' }}>
        <Link to={createPageUrl('Welcome')} style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', fontSize: 12, letterSpacing: '0.1em' }}>
          <ChevronLeft size={14} />
          UF51
        </Link>

        <span style={{ fontSize: 13, letterSpacing: '0.35em', color: 'rgba(34,211,238,0.5)', fontWeight: 600 }}>51</span>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {!online && <WifiOff size={13} style={{ color: 'rgba(255,200,60,0.5)' }} />}
          <button onClick={() => { const v = !voiceOn; setVoiceOn(v); if (!v) stopSpeak(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {voiceOn
              ? <Volume2 size={14} style={{ color: 'rgba(255,255,255,0.22)' }} />
              : <VolumeX size={14} style={{ color: 'rgba(255,255,255,0.12)' }} />
            }
          </button>
        </div>
      </div>

      {/* ─── CENTRE — the whole world ─── */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Messages — exist, don't dominate */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', WebkitOverflowScrolling: 'touch' }}>
          {hasMessages ? (
            <div style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, paddingBottom: 20 }}>
              {messages.map((m, i) => <Thought key={i} msg={m} />)}
              {breathState === 'thinking' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 5, paddingLeft: 6, alignItems: 'center', height: 24 }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <motion.div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(34,211,238,0.5)' }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: d }} />
                  ))}
                </motion.div>
              )}
              <div ref={scrollRef} />
            </div>
          ) : (
            // ─── EMPTY STATE — just the soul ───
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 0 }}>
              <AnimatePresence>
                {greeting && (
                  <motion.p
                    key="greeting"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.95)', margin: 0, lineHeight: 1.3, textShadow: '0 0 40px rgba(34,211,238,0.3)' }}
                  >
                    {greeting}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* ─── SOUL — heartline lives here ─── */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '8px 20px 28px' }}>

        {/* Frequency generator */}
        <AnimatePresence>
          {freqRequest && (
            <motion.div key="freq" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ width: '100%', maxWidth: 340 }}>
              <AI51FrequencyGenerator condition={freqRequest.condition} onClose={() => setFreqRequest(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* THE HEARTLINE — tap to speak */}
        <TheBreath state={breathState} onClick={handleBreath} />

        {/* State whisper under line */}
        <div style={{ height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {breathState === 'listening' && (
              <motion.p key="l2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(34,211,238,0.9)', margin: 0, fontWeight: 600 }}>
                🎙 LISTENING — TAP TO STOP
              </motion.p>
            )}
            {breathState === 'idle' && (
              <motion.p key="idle2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(34,211,238,0.45)', margin: 0 }}>
                TAP WAVE TO SPEAK
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Text input — ALWAYS VISIBLE, BRIGHT AND OBVIOUS */}
        <motion.div
          style={{ width: '100%', maxWidth: 380, display: 'flex', gap: 10, padding: '0 4px' }}
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={e => { if (e.key === 'Enter') submitInput(); }}
            placeholder="Talk to AI51..."
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.08)',
              border: '2px solid rgba(34,211,238,0.6)',
              borderRadius: 32,
              padding: '15px 22px',
              color: '#fff',
              fontSize: 17,
              outline: 'none',
              backdropFilter: 'blur(20px)',
              WebkitTapHighlightColor: 'transparent',
              caretColor: '#22d3ee',
              boxShadow: '0 0 20px rgba(34,211,238,0.15)',
            }}
          />
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={inputText.trim() ? submitInput : handleBreath}
            style={{
              width: 54, height: 54, borderRadius: '50%', flexShrink: 0,
              background: inputText.trim() ? 'rgba(34,211,238,0.35)' : 'rgba(34,211,238,0.15)',
              border: '2px solid rgba(34,211,238,0.8)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, color: '#22d3ee',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: '0 0 20px rgba(34,211,238,0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            {inputText.trim() ? '↑' : '🎙'}
          </motion.button>
        </motion.div>

        {/* Memory nudge — quiet, not pushy */}
        <AnimatePresence>
          {nudge && (
            <motion.div
              key="nudge"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', maxWidth: 280 }}
            >
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, margin: 0 }}>
                I remember you here.{' '}
                <button onClick={() => base44.auth.redirectToLogin(window.location.href)}
                  style={{ color: 'rgba(34,211,238,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, textDecoration: 'underline', padding: 0 }}>
                  Free account
                </button>
                {' '}and I'll know you everywhere.
              </p>
              <button onClick={() => setNudge(false)} style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 4 }}>
                not now
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Soul footer */}
        <div style={{ textAlign: 'center' }}>
          <Link to={createPageUrl('AI51Soul')} style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.1)', textDecoration: 'none' }}>
            zero extraction · open source · honest ai
          </Link>
        </div>
      </div>
    </div>
  );
}