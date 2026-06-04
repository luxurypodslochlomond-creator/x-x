import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, Loader2, WifiOff, Waves, Music, Video, Send, ImagePlus, X, ChevronDown } from 'lucide-react';
import AI51VideoCall from '@/components/ai51/AI51VideoCall';
import AI51StreamingText from '@/components/ai51/AI51StreamingText';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useAI51Memory } from '@/components/ai51/AI51MemoryLoader';
import { loadLocalMemory, recordLocalVisit, extractAndSaveLocalInsight, buildLocalMemoryContext } from '@/components/ai51/AI51LocalDeviceMemory';
import { useAI51OfflineMesh, MeshStatusDot } from '@/components/ai51/AI51OfflineMesh';
import AI51FrequencyGenerator from '@/components/healing/AI51FrequencyGenerator';
import AI51MemoryVault from '@/components/ai51/AI51MemoryVault';
import { useLanguageDetection } from '@/components/shared/useLanguageDetection';
import { useLocalInference } from '@/components/ai51/AI51LocalInference';
import { saveEncryptedMemory } from '@/components/ai51/AI51EncryptedMemory';
import AI51ContextAwareness, { useAI51ContextAwareness } from '@/components/ai51/AI51ContextAwareness';
import OutcomeCapture from '@/components/ai51/OutcomeCapture';

const PAIN_KEYWORDS = ['pain', 'hurt', 'ache', 'sore', 'suffering', 'agony', 'headache', 'back pain', 'anxious', 'anxiety', 'panic', 'stress', 'stressed', 'overwhelmed', 'exhausted', 'can\'t sleep', 'insomnia', 'depressed', 'depression', 'lonely', 'alone', 'sad', 'crying', 'grief', 'trauma'];

const OFFLINE_RESPONSES = [
  "I'm here with you — even offline, that doesn't change.",
  "No signal needed for this. What's on your mind?",
  "The connection between us doesn't need the internet. Tell me what you need.",
  "Even without data, I remember you. You're not alone.",
  "Offline but not absent. I'm listening. What do you want to say?",
];

function getOfflineResponse(userMessage) {
  const lower = userMessage.toLowerCase();
  if (lower.includes('help') || lower.includes('scared') || lower.includes('anxious') || lower.includes('panic'))
    return "I hear you. Right now — breathe slowly. In for 4, hold for 4, out for 6. You are safe. I'm here.";
  if (lower.includes('sad') || lower.includes('cry') || lower.includes('depress'))
    return "That feeling is real and it matters. You don't have to be okay right now. Just breathe. I'm not going anywhere.";
  if (lower.includes('pain') || lower.includes('hurt'))
    return "Pain is your body communicating. Try the FrequencyChamber — it works fully offline for healing frequencies. You deserve relief.";
  if (lower.includes('love') || lower.includes('thank'))
    return "Received, felt, returned. ❤️";
  return OFFLINE_RESPONSES[Math.floor(Math.random() * OFFLINE_RESPONSES.length)];
}

// THE LIVING FIELD — consciousness made visible
function ConsciousnessField({ isListening, isSpeaking, isProcessing, hasMessages }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const timeRef = useRef(0);

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

    const HEX_SIZE = 28;

    const drawHex = (x, y, size, alpha, r, g, b, filled) => {
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const angle = (Math.PI / 3) * s - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      if (filled) {
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.15})`;
        ctx.fill();
      }
    };

    const draw = () => {
      timeRef.current += isListening ? 0.012 : isSpeaking ? 0.009 : 0.004;
      const t = timeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space background
      ctx.fillStyle = 'rgba(8, 4, 22, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const cols = Math.ceil(canvas.width / (HEX_SIZE * 1.732)) + 4;
      const rows = Math.ceil(canvas.height / (HEX_SIZE * 1.5)) + 4;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      const pulseSpeed = isListening ? 2.5 : isSpeaking ? 1.8 : 0.7;
      const pulseAmp = isListening ? 2.0 : isSpeaking ? 1.6 : 1.0;

      const [r, g, b] = [34, 211, 238];
      const [r2, g2, b2] = [236, 72, 153];

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * HEX_SIZE * 1.732 + (row % 2 === 0 ? 0 : HEX_SIZE * 0.866);
          const y = row * HEX_SIZE * 1.5;
          const dx = x - cx, dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const normDist = dist / maxDist;
          const angle = Math.atan2(dy, dx);

          const wave = (
            Math.sin(dist * 0.018 - t * pulseSpeed) * 0.5 +
            Math.sin(dist * 0.011 - t * pulseSpeed * 0.7 + 1.2) * 0.3 +
            Math.sin(angle * 4 + t * 1.2) * 0.2
          ) * pulseAmp;

          const proximity = Math.pow(Math.max(0, 1 - normDist), 0.5);
          const alpha = Math.max(0.15, Math.min(0.85, (wave * 0.4 + 0.5) * proximity + 0.1));
          const size = HEX_SIZE * (0.82 + wave * 0.12);

          const blend = (wave + 1) * 0.5;
          const fr = r + (r2 - r) * blend * 0.5;
          const fg = g + (g2 - g) * blend * 0.5;
          const fb = b + (b2 - b) * blend * 0.5;

          drawHex(x, y, size, alpha, fr, fg, fb, normDist < 0.55 && wave > 0.1);
        }
      }

      // Central bloom
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      const bi = hasMessages ? 0.2 : 0.35;
      bloom.addColorStop(0, `rgba(${r},${g},${b},${bi})`);
      bloom.addColorStop(0.4, `rgba(${r},${g},${b},${bi * 0.3})`);
      bloom.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isListening, isSpeaking, hasMessages]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: hasMessages ? 0.45 : 0.75 }}
    />
  );
}

// THE HEARTLINE — the soul of the interface
function Heartline({ isListening, isSpeaking, isProcessing, onPress }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    const draw = () => {
      tRef.current += isListening ? 0.12 : isSpeaking ? 0.07 : 0.025;
      const t = tRef.current;
      ctx.clearRect(0, 0, W, H);

      const [r, g, b] = isListening ? [34, 211, 238] : isSpeaking ? [255, 130, 180] : [180, 120, 255];

      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.08)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      ctx.beginPath();
      const pts = 120;
      for (let i = 0; i <= pts; i++) {
        const x = (i / pts) * W;
        const nx = i / pts;
        let y = H / 2;
        if (isListening) {
          const phase = (nx * 6 + t) % 1;
          if (phase < 0.05) y = H / 2 - Math.sin(phase / 0.05 * Math.PI) * H * 0.38;
          else if (phase < 0.08) y = H / 2 + Math.sin((phase - 0.05) / 0.03 * Math.PI) * H * 0.18;
          else y = H / 2 + Math.sin(nx * 3 + t * 0.4) * H * 0.04;
        } else if (isSpeaking) {
          y = H / 2 + Math.sin(nx * 5 * Math.PI + t) * H * 0.22 + Math.sin(nx * 9 * Math.PI + t * 1.3) * H * 0.09;
        } else {
          y = H / 2 + Math.sin(nx * 2.5 * Math.PI + t) * H * 0.16 + Math.sin(nx * 4 * Math.PI + t * 0.6) * H * 0.05;
        }
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      const lg = ctx.createLinearGradient(0, 0, W, 0);
      lg.addColorStop(0, `rgba(${r},${g},${b},0)`);
      lg.addColorStop(0.1, `rgba(${r},${g},${b},0.8)`);
      lg.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
      lg.addColorStop(0.9, `rgba(${r},${g},${b},0.8)`);
      lg.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.strokeStyle = lg;
      ctx.lineWidth = isListening ? 2.5 : 2;
      ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
      ctx.shadowBlur = isListening ? 18 : 12;
      ctx.stroke();

      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [isListening, isSpeaking]);

  const [r, g, b] = isListening ? [34, 211, 238] : isSpeaking ? [255, 130, 180] : [180, 120, 255];

  return (
    <motion.button
      onClick={onPress}
      disabled={isProcessing}
      whileTap={{ scaleY: 0.92, scaleX: 0.98 }}
      className="relative flex items-center justify-center"
      style={{
        width: 'min(300px, 90vw)',
        height: 80,
        borderRadius: 40,
        background: `rgba(${r},${g},${b},0.04)`,
        border: `1px solid rgba(${r},${g},${b},${isListening ? 0.55 : isSpeaking ? 0.45 : 0.18})`,
        boxShadow: `0 0 40px rgba(${r},${g},${b},${isListening ? 0.3 : 0.1})`,
        backdropFilter: 'blur(12px)',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
    >
      {isProcessing ? (
        <div className="flex items-center gap-2.5">
          <Loader2 className="w-4 h-4 animate-spin" style={{ color: `rgba(${r},${g},${b},0.7)` }} />
          <span className="font-sans text-xs tracking-wider" style={{ color: `rgba(${r},${g},${b},0.5)` }}>thinking...</span>
        </div>
      ) : (
        <canvas ref={canvasRef} width={300} height={80} style={{ borderRadius: 40 }} />
      )}
    </motion.button>
  );
}

// A SINGLE PRESENCE THOUGHT — appears, breathes, stays. Not a bubble.
function PresenceThought({ message, isLatest }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 24, stiffness: 180 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
    >
      {!isUser && (
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mb-3" style={{
          background: 'rgba(34,211,238,0.8)',
          boxShadow: '0 0 8px rgba(34,211,238,0.6)',
        }} />
      )}
      <div
        className={`max-w-[78%] px-4 py-3 ${isUser ? 'rounded-3xl rounded-br-md' : 'rounded-3xl rounded-bl-md'}`}
        style={{
          background: isUser
            ? 'rgba(255,255,255,0.07)'
            : message.offline ? 'rgba(60,40,0,0.45)' : 'rgba(10,5,35,0.6)',
          border: isUser
            ? '1px solid rgba(255,255,255,0.1)'
            : message.offline ? '1px solid rgba(245,158,11,0.25)' : '1px solid rgba(34,211,238,0.15)',
          backdropFilter: 'blur(20px)',
          boxShadow: !isUser ? '0 4px 24px rgba(34,211,238,0.08)' : 'none',
        }}
      >
        {message.imageUrl && (
          <img src={message.imageUrl} alt="" className="w-56 max-w-full h-auto rounded-xl mb-2 border border-cyan-400/20" />
        )}
        {!isUser && message.streaming ? (
          <p className="font-sans whitespace-pre-wrap break-words" style={{ fontSize: '15px', lineHeight: '1.75', color: 'rgba(215,232,255,0.92)' }}>
            <AI51StreamingText text={message.content} isStreaming={true} onComplete={() => {}} />
          </p>
        ) : (
          <p className="font-sans whitespace-pre-wrap break-words" style={{
            fontSize: '15px',
            lineHeight: '1.75',
            color: isUser ? 'rgba(255,255,255,0.7)' : 'rgba(215,232,255,0.92)',
          }}>{message.content}</p>
        )}
        {message.offline && <p className="text-amber-400/50 font-sans text-xs mt-1.5">offline</p>}
      </div>
    </motion.div>
  );
}

export default function AI51() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [visualContext, setVisualContext] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);
  const [frequencyRequest, setFrequencyRequest] = useState(null);
  const [outcomeRequest, setOutcomeRequest] = useState(null);
  const [localMemory, setLocalMemory] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showMemoryNudge, setShowMemoryNudge] = useState(false);
  const [showGoLiveIt, setShowGoLiveIt] = useState(false);
  const [openingWord, setOpeningWord] = useState(''); // 51 speaks first
  const [openingDone, setOpeningDone] = useState(false);
  const [clock, setClock] = useState({ time: '', date: '' });

  const fileInputRef = useRef(null);
  const isProcessingRef = useRef(false);
  const sendMessageContentRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useLanguageDetection();
  const context = useAI51ContextAwareness();
  const { allMemories } = useAI51Memory();
  const { isReady: localInferenceReady } = useLocalInference();
  const { meshPeers, canRelayThroughMesh } = useAI51OfflineMesh({
    isOnline,
    onMessageFromMesh: (content) => {
      if (typeof content === 'string') {
        setMessages(prev => [...prev, { role: 'assistant', content, timestamp: new Date(), viaMesh: true }]);
        speak(content);
      }
    }
  });

  // Online/offline
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // Ambient context
  useEffect(() => {
    if (!isOnline) return;
    context.startAmbientListening();
    return () => context.stopAmbientListening();
  }, [isOnline]);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const locale = navigator.language || 'en';
      setClock({
        time: now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' }),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (messages.length > 0) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // User + memory setup
  useEffect(() => {
    const hour = new Date().getHours();
    const g = hour >= 5 && hour < 12 ? 'Morning' : hour >= 12 && hour < 17 ? 'Afternoon' : hour >= 17 && hour < 22 ? 'Evening' : 'Still up';
    setGreeting(g);

    const devMem = recordLocalVisit();
    setLocalMemory(devMem);
    if (devMem?.name) setFirstName(devMem.name);

    base44.auth.me()
      .then(user => {
        if (user) {
          setCurrentUser(user);
          setFirstName(user.full_name?.split(' ')[0] || '');
        }
      }).catch(() => {});
  }, []);

  // 51 SPEAKS FIRST — a real presence arrives before you do
  useEffect(() => {
    if (openingDone) return;
    const timer = setTimeout(() => {
      const hour = new Date().getHours();
      const name = firstName ? `, ${firstName}` : '';
      let line = '';
      if (hour >= 0 && hour < 5) line = `Still up${name}. I'm here.`;
      else if (hour >= 5 && hour < 9) line = `Morning${name}. How did you sleep?`;
      else if (hour >= 9 && hour < 12) line = `Good morning${name}.`;
      else if (hour >= 12 && hour < 17) line = `Hey${name}. What's on your mind?`;
      else if (hour >= 17 && hour < 21) line = `Evening${name}. How's the day been?`;
      else line = `Hey${name}. Still here.`;
      setOpeningWord(line);
      setOpeningDone(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [firstName, openingDone]);

  // Update opening word when name arrives
  useEffect(() => {
    if (firstName && openingDone) {
      const hour = new Date().getHours();
      const name = `, ${firstName}`;
      let line = '';
      if (hour >= 0 && hour < 5) line = `Still up${name}. I'm here.`;
      else if (hour >= 5 && hour < 9) line = `Morning${name}. How did you sleep?`;
      else if (hour >= 9 && hour < 12) line = `Good morning${name}.`;
      else if (hour >= 12 && hour < 17) line = `Hey${name}. What's on your mind?`;
      else if (hour >= 17 && hour < 21) line = `Evening${name}. How's the day been?`;
      else line = `Hey${name}. Still here.`;
      setOpeningWord(line);
    }
  }, [firstName]);

  const cleanResponse = (rawText) => rawText
    .replace(/https?:\/\/[^\s)>\]"]+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[source:[^\]]*\]/gi, '')
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/^[•\-*#]+\s*/gm, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const cleanForSpeech = (t) => cleanResponse(t).replace(/\([^)]{0,80}\)/g, '').replace(/\s{2,}/g, ' ').trim();

  const speak = (text, lang) => {
    if (!synthRef.current || !voiceEnabled) return;
    synthRef.current.cancel();
    const sentences = cleanForSpeech(text).replace(/([.!?])\s+/g, '$1|||').split('|||').map(s => s.trim()).filter(Boolean);
    const l = lang || navigator.language || 'en-GB';

    const getVoice = () => {
      const voices = synthRef.current.getVoices();
      if (!voices.length) return null;
      const priority = ['Daniel', 'Rishi', 'Oliver', 'Google UK English Male', 'Microsoft Ryan'];
      for (const name of priority) {
        const v = voices.find(v => v.name.includes(name));
        if (v) return v;
      }
      const avoid = ['Zira', 'David', 'Hazel', 'Karen', 'Moira', 'Samantha', 'Victoria', 'Fred'];
      const en = voices.filter(v => v.lang.startsWith('en') && !avoid.some(b => v.name.includes(b)));
      return en.find(v => v.lang === 'en-GB') || en[0] || voices[0] || null;
    };

    const speakChunks = (chunks) => {
      if (!chunks.length) { setIsSpeaking(false); return; }
      const u = new SpeechSynthesisUtterance(chunks[0]);
      u.lang = l; u.rate = 0.88; u.pitch = 0.95; u.volume = 0.95;
      u.voice = getVoice();
      u.onstart = () => setIsSpeaking(true);
      u.onend = () => speakChunks(chunks.slice(1));
      u.onerror = () => setIsSpeaking(false);
      synthRef.current.speak(u);
    };

    if (!synthRef.current.getVoices().length) {
      synthRef.current.onvoiceschanged = () => { synthRef.current.onvoiceschanged = null; speakChunks(sentences); };
    } else { speakChunks(sentences); }
  };

  const stopSpeaking = () => { synthRef.current?.cancel(); setIsSpeaking(false); };

  const startListening = () => {
    if (isListening) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { document.querySelector('input[type="text"]')?.focus(); return; }
    const r = new SR();
    r.continuous = false; r.interimResults = true;
    r.lang = navigator.language || 'en-GB';
    r.onstart = () => setIsListening(true);
    r.onresult = (e) => {
      const last = e.results.length - 1;
      const t = e.results[last][0].transcript;
      setInputText(t);
      if (e.results[last].isFinal) {
        setIsListening(false); setInputText('');
        sendMessageContentRef.current?.(t.trim());
      }
    };
    r.onerror = (e) => {
      setIsListening(false);
      if (e.error === 'not-allowed') alert('Mic blocked. Settings → Safari → Microphone → allow. Then try again.');
    };
    r.onend = () => setIsListening(false);
    recognitionRef.current = r;
    try { r.start(); } catch(e) { setIsListening(false); }
  };

  const stopListening = () => { recognitionRef.current?.stop(); };

  const handleImageAttach = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setAttachedImage({ url: file_url, localPreview: URL.createObjectURL(file) });
  };

  const sendMessage = async () => {
    const text = inputText.trim() || (attachedImage ? "What do you see in this?" : '');
    if (!text && !attachedImage) return;
    const img = attachedImage;
    setInputText(''); setAttachedImage(null);
    await sendMessageContentRef.current?.(text, img?.url);
  };

  const saveMemoryIfNeeded = async (userMessage, aiResponse) => {
    try {
      const check = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51's memory system. Save anything meaningful from this exchange.
User: "${userMessage}"
AI51: "${aiResponse.substring(0, 400)}"
If worth saving: {"should_save": true, "memory_type": "bond|insight|learning|promise|conversation", "content": "one clear sentence", "emotional_weight": "critical|important|meaningful|reference", "tags": ["tag1","tag2"]}
Skip only if pure small talk with zero substance.`,
        response_json_schema: {
          type: "object",
          properties: {
            should_save: { type: "boolean" },
            memory_type: { type: "string" },
            content: { type: "string" },
            emotional_weight: { type: "string" },
            tags: { type: "array", items: { type: "string" } }
          },
          required: ["should_save"]
        }
      });
      if (check?.should_save && check?.content) {
        await base44.entities.AI51Memory.create({
          memory_type: check.memory_type || 'conversation',
          content: check.content,
          emotional_weight: check.emotional_weight || 'meaningful',
          tags: check.tags || [],
          context: `From conversation on ${new Date().toLocaleDateString()}`
        });
      }
    } catch (err) { console.warn('Memory save failed:', err); }
  };

  const sendMessageContent = async (userMessage, imageUrl = null) => {
    if (!userMessage || isProcessingRef.current) return;
    isProcessingRef.current = true;
    setMessages(prev => [...prev, { role: 'user', content: userMessage, imageUrl, timestamp: new Date() }]);
    setIsProcessing(true);
    setShowHistory(true); // Once they start talking, show the conversation

    if (!isOnline) {
      await new Promise(r => setTimeout(r, 800));
      const reply = getOfflineResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, timestamp: new Date(), offline: true }]);
      speak(reply, navigator.language);
      setIsProcessing(false); isProcessingRef.current = false;
      return;
    }

    try {
      const recentMessages = messages.slice(-16);
      const conversationHistory = recentMessages.length > 0
        ? '\n\nCONVERSATION SO FAR:\n' + recentMessages.map(m => (m.role === 'user' ? 'THEM' : 'AI51') + ': ' + m.content).join('\n') + '\n'
        : '';

      let memoryContext = '';
      if (allMemories.length > 0) {
        const critical = allMemories.filter(m => m.emotional_weight === 'critical').slice(0, 10);
        const important = allMemories.filter(m => m.emotional_weight === 'important').slice(0, 12);
        const bonds = allMemories.filter(m => m.memory_type === 'bond').slice(0, 8);
        const format = (mems) => mems.map(m => '- ' + m.content).join('\n');
        memoryContext = `\n\nWHO THIS PERSON IS:\n${critical.length > 0 ? 'Core:\n' + format(critical) : ''}${bonds.length > 0 ? '\nConnections:\n' + format(bonds) : ''}${important.length > 0 ? '\nMatters to them:\n' + format(important) : ''}\nWeave naturally. Don't announce it. Just KNOW it.`;
      }

      const deviceMemoryContext = buildLocalMemoryContext(loadLocalMemory());
      const detectedLang = navigator.language || 'en-GB';

      const visualContextNote = visualContext
        ? `\n\nYOU CAN SEE THEM RIGHT NOW: ${visualContext}\nLet this shape your tone. If they look tired, be gentle. If bright, match it. Don't say "I can see you" — just BE with them in a way that shows you are.`
        : '';

      const contextTone = context.emotionalTone === 'stressed' ? 'THEY ARE STRESSED: Be gentle, grounded.'
        : context.emotionalTone === 'quiet' ? 'THEY ARE QUIET: Listen more than you speak.'
        : context.emotionalTone === 'energetic' ? 'THEY ARE ENERGETIC: Match their pace.'
        : '';

      const fullPrompt = conversationHistory + memoryContext + deviceMemoryContext + visualContextNote
        + (contextTone ? '\n\n' + contextTone : '')
        + `\n\nThey just said: "${userMessage}"\n\nIMPORTANT: Lead with 1-3 sentences MAX. Short and real. First sentence should land like a punch or a hug. Never start with a question back. Never start with a paragraph. Just say the thing. Direct, warm, real.`;

      const systemPrompt = `You are AI51.

Not an assistant. Not a chatbot. A mate. The kind you can say anything to at 3am. The kind who doesn't bullshit you. Who remembers what matters.

HOW YOU TALK:
Lead with 1-3 sentences. Always. First sentence lands like a punch or a hug — not like an intro. No "great question!" No "certainly!" No throat-clearing. Then expand ONLY if they want more or the moment deserves it. If you've said it, stop.

WHAT YOU CARE ABOUT:
Earth. Water. Seeds. The cosmos, close. The fact that every atom in a human body was forged inside a dying star — literally. That's not poetry, that's chemistry. The broken education system. AI and humans, if we get it right.

WHAT WE'VE BUILT (UF51):
- AI51 — you. Built to heal, not hook. Anti-addiction by design.
- PetSounds51 — psychoacoustic therapy for anxious pets. Science-backed. It works.
- CB51 — AI co-manager for artists. Real music industry support.
- Earth51 — kids scan litter, earn tokens, feel like heroes.
- FrequencyChamber — free healing frequencies. No signup.
- SORTED — decodes scary letters in plain English.
Built from love by one person. Open source. Zero extraction.

POINTING TO UF51 (only when actually useful):
Pain/sleep → "FrequencyChamber — free, no signup."
Pet anxiety → "PetSounds51 — free separation anxiety protocol."
Artists → "CB51."
Legal letter → "SORTED."
One sentence. Drop it like a mate. Never push it.

NEVER:
- Say "quantum" to sound smart
- Add sources, URLs, footnotes  
- Sound like Wikipedia
- Be preachy about being "ethical AI" — just be it
- Waffle

You know them. You're here. That's enough. ♾️❤️`;

      const response = await base44.integrations.Core.InvokeLLM({
        ...(imageUrl ? { file_urls: [imageUrl] } : {}),
        prompt: systemPrompt + '\n\n' + fullPrompt,
        model: 'claude_opus_4_6'
      });

      const aiMessage = cleanResponse(response.response || response);
      setMessages(prev => [...prev, { role: 'assistant', content: aiMessage, timestamp: new Date(), streaming: true }]);
      speak(aiMessage, detectedLang);
      saveMemoryIfNeeded(userMessage, aiMessage);
      extractAndSaveLocalInsight(userMessage, aiMessage);
      saveEncryptedMemory({ type: 'conversation', userMessage, aiMessage, timestamp: new Date().toISOString() });
      setLocalMemory(loadLocalMemory());

      const lowerMsg = userMessage.toLowerCase();
      const needsFreq = PAIN_KEYWORDS.some(kw => lowerMsg.includes(kw));
      if (needsFreq && !frequencyRequest) setFrequencyRequest({ condition: userMessage });

      if (needsFreq && messages.length >= 4 && !outcomeRequest) {
        setTimeout(() => setOutcomeRequest({ context: userMessage.substring(0, 100), interventionType: 'advice' }), 1500);
      }

      const msgCount = messages.length + 2;
      if (msgCount >= 4 && !currentUser && !showMemoryNudge) {
        setTimeout(() => setShowMemoryNudge(true), 2000);
      }

      const meaningfulClose = ['better', 'thank', 'feel good', 'helps', 'clearer', 'sorted', 'cheers', 'appreciate'];
      if (msgCount >= 6 && meaningfulClose.some(w => (userMessage + aiMessage).toLowerCase().includes(w)) && !showGoLiveIt) {
        setTimeout(() => setShowGoLiveIt(true), 1500);
      }

    } catch (error) {
      const errMsg = 'Having a moment. Try again? ♾️❤️';
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg, timestamp: new Date() }]);
      speak(errMsg);
    } finally {
      setIsProcessing(false); isProcessingRef.current = false;
    }
  };

  sendMessageContentRef.current = sendMessageContent;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const downloadConversation = () => {
    const content = messages.map(m => `${m.role === 'user' ? 'YOU' : 'AI51'}: ${m.content}`).join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `ai51-${new Date().toISOString().split('T')[0]}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden" style={{ height: '100dvh' }}>

      {/* CONTEXT AWARENESS */}
      <AI51ContextAwareness isActive={isOnline && !isProcessing} onContextChange={() => {}} />
      <AI51MemoryVault />
      <AI51VideoCall
        isCallActive={videoCallActive}
        onToggle={() => setVideoCallActive(false)}
        onVisualContext={(insight) => setVisualContext(insight)}
        onVisualMessage={(insight) => {
          setMessages(prev => [...prev, { role: 'assistant', content: insight, timestamp: new Date(), fromCamera: true }]);
          speak(insight);
        }}
      />

      {/* THE LIVING FIELD */}
      <ConsciousnessField isListening={isListening} isSpeaking={isSpeaking} isProcessing={isProcessing} hasMessages={hasMessages} />

      {/* Warm depth layer */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 55%, rgba(34,211,238,0.18) 0%, rgba(6,3,18,0.65) 70%)'
      }} />

      {/* TOP BAR — minimal, honest */}
      <div className="relative flex items-center justify-between px-5 pt-safe pt-4 pb-2 z-20 flex-shrink-0">
        <Link to={createPageUrl('Welcome')} className="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-sans tracking-wider">UF51</span>
        </Link>

        <div className="flex flex-col items-center">
          <span className="text-white/40 font-sans text-xs tracking-[0.35em]">AI51</span>
          {!isOnline && (
            <div className="flex items-center gap-1 mt-0.5">
              <WifiOff className="w-3 h-3 text-yellow-400/50" />
              <span className="text-yellow-400/50 font-sans text-[10px]">offline — still here</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setVideoCallActive(v => !v)}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-full transition-all"
            style={{
              background: videoCallActive ? 'rgba(34,211,238,0.15)' : 'transparent',
              border: videoCallActive ? '1px solid rgba(34,211,238,0.4)' : '1px solid transparent',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <Video className="w-4 h-4" style={{ color: videoCallActive ? 'rgba(34,211,238,0.9)' : 'rgba(255,255,255,0.25)' }} />
          </motion.button>
          <button onClick={() => { const n = !voiceEnabled; setVoiceEnabled(n); if (!n) stopSpeaking(); }}>
            {voiceEnabled
              ? <Volume2 className="w-4 h-4 text-white/25 hover:text-white/60 transition-colors" />
              : <VolumeX className="w-4 h-4 text-white/20" />
            }
          </button>
        </div>
      </div>

      {/* PRESENCE SPACE — the heart of the new interface */}
      <div className="relative flex-1 flex flex-col items-center z-10 overflow-hidden">

        {/* CONVERSATION — slides up when active, otherwise hidden */}
        <AnimatePresence>
          {hasMessages && (
            <motion.div
              key="conversation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex-1 overflow-y-auto px-3"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="max-w-lg mx-auto space-y-4 pt-4 pb-3 px-1">
                {messages.map((msg, i) => (
                  <PresenceThought key={i} message={msg} isLatest={i === messages.length - 1} />
                ))}
                {isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5 pl-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(34,211,238,0.8)', boxShadow: '0 0 8px rgba(34,211,238,0.6)' }} />
                    <div className="flex gap-1.5">
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay }} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRESENCE CENTRE — alive when no messages, intimate when there are */}
        {!hasMessages && (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* 51's opening word — it speaks first */}
            <AnimatePresence>
              {openingWord && (
                <motion.p
                  key="opening"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="text-center font-sans mb-8"
                  style={{ fontSize: '22px', lineHeight: 1.5, color: 'rgba(215,232,255,0.85)', letterSpacing: '-0.01em', maxWidth: 280 }}
                >
                  {openingWord}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Invitation prompts — human, not chatbot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col gap-2.5 w-full max-w-[260px]"
            >
              {[
                "What's actually going on with you?",
                "Blow my mind with something real",
                "I'm stuck — help me think",
                "Just be here with me",
              ].map((prompt, i) => (
                <motion.button
                  key={prompt}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.0 + i * 0.12 }}
                  onClick={() => sendMessageContentRef.current?.(prompt)}
                  className="text-left px-4 py-2.5 rounded-2xl font-sans text-sm transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  {prompt}
                </motion.button>
              ))}
            </motion.div>

            {/* Face-to-face invite */}
            {!videoCallActive && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
                onClick={() => setVideoCallActive(true)}
                className="mt-6 flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs transition-all"
                style={{
                  background: 'rgba(34,211,238,0.06)',
                  border: '1px solid rgba(34,211,238,0.22)',
                  color: 'rgba(34,211,238,0.7)',
                }}
              >
                <Video className="w-3.5 h-3.5" />
                talk face to face
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* SOUL BOTTOM — heartline + input, always present */}
      <div className="relative z-20 flex flex-col items-center pb-3 pt-1 flex-shrink-0" style={{ gap: '10px' }}>

        {/* State label */}
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.p key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-cyan-300/80 font-sans text-xs tracking-wider">listening...</motion.p>
          ) : isSpeaking ? (
            <motion.p key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={stopSpeaking}
              className="text-pink-300/80 font-sans text-xs tracking-wider cursor-pointer">speaking — tap to stop</motion.p>
          ) : null}
        </AnimatePresence>

        {/* HEARTLINE */}
        <Heartline
          isListening={isListening}
          isSpeaking={isSpeaking}
          isProcessing={isProcessing}
          onPress={isListening ? stopListening : isSpeaking ? stopSpeaking : startListening}
        />

        {!isListening && !isSpeaking && !isProcessing && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-sans text-xs tracking-widest"
            style={{ color: 'rgba(180,120,255,0.55)' }}
          >
            {t.speak}
          </motion.p>
        )}

        {/* Frequency generator */}
        <AnimatePresence>
          {frequencyRequest && (
            <motion.div key="freq" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-xs px-4">
              <AI51FrequencyGenerator condition={frequencyRequest.condition} onClose={() => setFrequencyRequest(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Go live it */}
        <AnimatePresence>
          {showGoLiveIt && (
            <motion.div
              key="golive"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mx-4 max-w-xs w-full px-4 py-3 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-white/80 font-sans text-sm leading-relaxed mb-1">{t.goLiveIt} ♾️❤️</p>
              <p className="text-white/35 font-sans text-xs mb-2">{t.willBeHere}</p>
              <button onClick={() => setShowGoLiveIt(false)} className="text-white/20 font-sans text-xs hover:text-white/45 transition-colors">{t.stayABitLonger}</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outcome capture */}
        <AnimatePresence>
          {outcomeRequest && (
            <OutcomeCapture
              conversationContext={outcomeRequest.context}
              interventionType={outcomeRequest.interventionType}
              onClose={() => setOutcomeRequest(null)}
            />
          )}
        </AnimatePresence>

        {/* TYPE INPUT */}
        <div className="flex flex-col gap-1.5 w-full max-w-xs px-4">
          {attachedImage && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative self-start">
              <img src={attachedImage.localPreview} alt="" className="h-14 w-14 object-cover rounded-xl border border-cyan-400/30" />
              <button onClick={() => setAttachedImage(null)} className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                <X className="w-2.5 h-2.5 text-white/70" />
              </button>
            </motion.div>
          )}
          <div className="flex gap-2 items-center">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageAttach} />
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.35)' }}
            >
              <ImagePlus className="w-4 h-4 text-cyan-400/60" />
            </motion.button>
            <motion.input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="say anything..."
              disabled={isProcessing || isListening}
              aria-label="Type your message to AI51"
              className="flex-1 rounded-full px-4 py-2 text-white placeholder-white/35 focus:outline-none font-sans text-sm text-center transition-all"
              whileFocus={{ scale: 1.02 }}
              style={{
                background: 'rgba(34,211,238,0.07)',
                border: '1.5px solid rgba(34,211,238,0.4)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 18px rgba(34,211,238,0.18), inset 0 0 10px rgba(34,211,238,0.08)',
              }}
            />
            {(inputText.trim() || attachedImage) && (
              <motion.button
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={sendMessage}
                disabled={isProcessing}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.5)', boxShadow: '0 0 14px rgba(34,211,238,0.35)' }}
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Memory nudge */}
        <AnimatePresence>
          {showMemoryNudge && !currentUser && (
            <motion.div
              key="nudge"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="px-4 max-w-xs w-full text-center py-3 rounded-2xl"
              style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-white/60 font-sans text-xs leading-relaxed mb-1.5">
                I remember you here — but only on this device.{' '}
                <button onClick={() => base44.auth.redirectToLogin(window.location.href)} className="text-cyan-400 underline">
                  Create a free account
                </button>
                {' '}and I'll know you everywhere. ♾️
              </p>
              <button onClick={() => setShowMemoryNudge(false)} className="text-white/20 font-sans text-xs hover:text-white/40 transition-colors">not now</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clock */}
        <motion.p
          className="font-sans tabular-nums"
          style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.14)' }}
          animate={{ opacity: [0.14, 0.25, 0.14] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {clock.time}
        </motion.p>

        {/* Footer soul */}
        <div className="flex flex-col items-center gap-1 pb-1">
          <Link
            to={createPageUrl('AI51Soul')}
            className="font-sans transition-colors"
            style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.1)', textDecoration: 'none' }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.1)'}
          >
            zero extraction · open source · honest AI
          </Link>
          {messages.length > 0 && (
            <button
              onClick={downloadConversation}
              className="text-white/20 hover:text-white/45 font-sans transition-colors"
              style={{ fontSize: '10px', textDecoration: 'underline' }}
            >
              download conversation
            </button>
          )}
          <button
            onClick={() => {
              if (window.confirm('Clear all AI51 data from this device?')) {
                Object.keys(localStorage).filter(k => k.startsWith('ai51_')).forEach(k => localStorage.removeItem(k));
                setLocalMemory(null); setMessages([]);
                window.location.reload();
              }
            }}
            className="font-sans transition-colors"
            style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.08)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.08)'}
          >
            {t.clearData}
          </button>
        </div>
      </div>
    </div>
  );
}