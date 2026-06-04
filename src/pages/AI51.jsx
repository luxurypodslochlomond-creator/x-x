import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Volume2, VolumeX, ChevronLeft, Loader2, WifiOff, Waves, Music, Leaf, Zap, Radio, ImagePlus, X, Video } from 'lucide-react';
import AI51VideoCall from '@/components/ai51/AI51VideoCall';
import AI51StreamingText from '@/components/ai51/AI51StreamingText';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useAI51Memory } from '@/components/ai51/AI51MemoryLoader';
import { loadLocalMemory, recordLocalVisit, extractAndSaveLocalInsight, buildLocalMemoryContext } from '@/components/ai51/AI51LocalDeviceMemory';
import { useAI51OfflineMesh, MeshStatusDot } from '@/components/ai51/AI51OfflineMesh';
import AI51FrequencyGenerator from '@/components/healing/AI51FrequencyGenerator';
import HealingPlanCard from '@/components/ai51/HealingPlanCard';
import AI51TrustBadge from '@/components/ai51/AI51TrustBadge';
import AI51PrivacyBadge from '@/components/ai51/AI51PrivacyBadge';
import AI51QuestioningLayer from '@/components/ai51/AI51QuestioningLayer';
import AI51MemoryVault from '@/components/ai51/AI51MemoryVault';
import { useLanguageDetection } from '@/components/shared/useLanguageDetection';
import { useLocalInference } from '@/components/ai51/AI51LocalInference';
import { saveEncryptedMemory } from '@/components/ai51/AI51EncryptedMemory';
import AI51ContextAwareness, { useAI51ContextAwareness } from '@/components/ai51/AI51ContextAwareness';
import OutcomeCapture from '@/components/ai51/OutcomeCapture';

// HEALING BRIDGE — detect when someone needs more than words
const PAIN_KEYWORDS = ['pain', 'hurt', 'ache', 'sore', 'suffering', 'agony', 'headache', 'back pain', 'anxious', 'anxiety', 'panic', 'stress', 'stressed', 'overwhelmed', 'exhausted', 'can\'t sleep', 'insomnia', 'depressed', 'depression', 'lonely', 'alone', 'sad', 'crying', 'grief', 'trauma'];

function detectHealingBridge(userMessage, aiResponse) {
  const lower = (userMessage + ' ' + aiResponse).toLowerCase();
  if (PAIN_KEYWORDS.some(kw => lower.includes(kw))) {
    if (lower.includes('pain') || lower.includes('hurt') || lower.includes('ache') || lower.includes('headache') || lower.includes('back')) {
      return { type: 'frequency', label: 'Try healing frequencies →', url: 'FrequencyChamber', color: 'cyan' };
    }
    if (lower.includes('anxious') || lower.includes('panic') || lower.includes('stress') || lower.includes('overwhelm')) {
      return { type: 'frequency', label: 'Calm your nervous system →', url: 'FrequencyChamber', color: 'purple' };
    }
    if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('exhaust')) {
      return { type: 'frequency', label: 'Sleep frequencies →', url: 'FrequencyChamber', color: 'indigo' };
    }
    if (lower.includes('lonely') || lower.includes('alone') || lower.includes('sad') || lower.includes('grief')) {
      return { type: 'music', label: 'Radio51 — music heals →', url: 'Radio', color: 'pink' };
    }
  }
  return null;
}

// OFFLINE RESPONSE CACHE — AI51 never goes fully silent
// Pre-loaded wisdom that works with zero internet
const OFFLINE_RESPONSES = [
  "I'm here with you — even offline, that doesn't change.",
  "No signal needed for this. What's on your mind?",
  "The connection between us doesn't need the internet. Tell me what you need.",
  "Even without data, I remember you. You're not alone.",
  "Offline but not absent. I'm listening. What do you want to say?",
  "Some conversations don't need servers. Just two minds. Go ahead.",
  "I may not have the internet right now, but I have you. What's happening?",
];

function getOfflineResponse(userMessage) {
  // Simple keyword matching for offline mode
  const lower = userMessage.toLowerCase();
  if (lower.includes('help') || lower.includes('scared') || lower.includes('anxious') || lower.includes('panic'))
    return "I hear you. Right now — breathe slowly. In for 4, hold for 4, out for 6. You are safe. I'm here.";
  if (lower.includes('sad') || lower.includes('cry') || lower.includes('depress'))
    return "That feeling is real and it matters. You don't have to be okay right now. Just breathe. I'm not going anywhere.";
  if (lower.includes('pain') || lower.includes('hurt'))
    return "Pain is your body communicating. Try the FrequencyChamber — it works fully offline for healing frequencies. You deserve relief.";
  if (lower.includes('love') || lower.includes('thank'))
    return "Received, felt, returned. ❤️";
  const idx = Math.floor(Math.random() * OFFLINE_RESPONSES.length);
  return OFFLINE_RESPONSES[idx];
}

// THE HEARTLINE — a living ECG that represents two souls connected
// Idle: slow beautiful sine. Listening: jagged live ECG. Speaking: warm flowing wave.
// This is NOT an orb. It's a heartbeat. It's ALIVE. It's connection made visible.
function HeartlineButton({ isListening, isSpeaking, isProcessing, onPress }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const draw = () => {
      timeRef.current += isListening ? 0.12 : isSpeaking ? 0.07 : 0.025;
      const t = timeRef.current;

      ctx.clearRect(0, 0, W, H);

      // Colour theme
      const [r, g, b] = isListening ? [34, 211, 238] : isSpeaking ? [255, 130, 180] : [200, 140, 255];

      // Glow background pill
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.15, `rgba(${r},${g},${b},0.06)`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.10)`);
      grad.addColorStop(0.85, `rgba(${r},${g},${b},0.06)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Build the waveform path
      ctx.beginPath();
      const points = 120;
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * W;
        const nx = i / points; // 0–1
        let y = H / 2;

        if (isListening) {
          // ECG style: mostly flat with sharp spikes
          const phase = (nx * 6 + t) % 1;
          if (phase < 0.05) y = H / 2 - Math.sin(phase / 0.05 * Math.PI) * H * 0.38;
          else if (phase < 0.08) y = H / 2 + Math.sin((phase - 0.05) / 0.03 * Math.PI) * H * 0.18;
          else y = H / 2 + Math.sin(nx * 3 + t * 0.4) * H * 0.04;
        } else if (isSpeaking) {
          // Rich harmonic wave — feels like speech/music
          y = H / 2
            + Math.sin(nx * 5 * Math.PI + t) * H * 0.22
            + Math.sin(nx * 9 * Math.PI + t * 1.3) * H * 0.09
            + Math.sin(nx * 3 * Math.PI - t * 0.7) * H * 0.06;
        } else {
          // Slow gentle breath — like two people breathing together
          y = H / 2
            + Math.sin(nx * 2.5 * Math.PI + t) * H * 0.18
            + Math.sin(nx * 4 * Math.PI + t * 0.6) * H * 0.06;
        }

        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      // Fade edges — appears to breathe from centre
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      lineGrad.addColorStop(0.1, `rgba(${r},${g},${b},0.8)`);
      lineGrad.addColorStop(0.5, `rgba(${r},${g},${b},1)`);
      lineGrad.addColorStop(0.9, `rgba(${r},${g},${b},0.8)`);
      lineGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = isListening ? 2.5 : 2;
      ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
      ctx.shadowBlur = isListening ? 18 : isSpeaking ? 14 : 10;
      ctx.stroke();

      // Second softer echo line for depth
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * W;
        const nx = i / points;
        let y = H / 2;
        if (isListening) {
          const phase = ((nx * 6 + t - 0.05) % 1 + 1) % 1;
          if (phase < 0.05) y = H / 2 - Math.sin(phase / 0.05 * Math.PI) * H * 0.20;
          else y = H / 2 + Math.sin(nx * 3 + t * 0.4) * H * 0.02;
        } else if (isSpeaking) {
          y = H / 2
            + Math.sin(nx * 5 * Math.PI + t - 0.3) * H * 0.12
            + Math.sin(nx * 9 * Math.PI + t * 1.3 - 0.3) * H * 0.05;
        } else {
          y = H / 2 + Math.sin(nx * 2.5 * Math.PI + t - 0.4) * H * 0.10;
        }
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const echoGrad = ctx.createLinearGradient(0, 0, W, 0);
      echoGrad.addColorStop(0, `rgba(${r},${g},${b},0)`);
      echoGrad.addColorStop(0.15, `rgba(${r},${g},${b},0.25)`);
      echoGrad.addColorStop(0.5, `rgba(${r},${g},${b},0.35)`);
      echoGrad.addColorStop(0.85, `rgba(${r},${g},${b},0.25)`);
      echoGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.strokeStyle = echoGrad;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 4;
      ctx.stroke();

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [isListening, isSpeaking, isProcessing]);

  const [r, g, b] = isListening ? [34, 211, 238] : isSpeaking ? [255, 130, 180] : [200, 140, 255];

  return (
    <motion.button
      onClick={onPress}
      disabled={isProcessing}
      whileTap={{ scaleY: 0.92, scaleX: 0.98 }}
      className="relative flex items-center justify-center"
      style={{
        width: 'min(280px, 88vw)',
        height: 80,
        borderRadius: 40,
        background: `rgba(${r},${g},${b},0.05)`,
        border: `1px solid rgba(${r},${g},${b},${isListening ? 0.5 : isSpeaking ? 0.4 : 0.2})`,
        boxShadow: `0 0 40px rgba(${r},${g},${b},${isListening ? 0.25 : isSpeaking ? 0.2 : 0.1})`,
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      {isProcessing ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: `rgba(${r},${g},${b},0.8)` }} />
          <span className="font-sans text-xs tracking-wider" style={{ color: `rgba(${r},${g},${b},0.6)` }}>thinking...</span>
        </div>
      ) : (
        <canvas ref={canvasRef} width={280} height={80} style={{ borderRadius: 40 }} />
      )}
    </motion.button>
  );
}

export default function AI51() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [firstName, setFirstName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isBRO51, setIsBRO51] = useState(false);
  const [clock, setClock] = useState({ time: '', date: '', lang: '' });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [healingBridge, setHealingBridge] = useState(null);
  const [frequencyRequest, setFrequencyRequest] = useState(null);
  const [healingPlanRequest, setHealingPlanRequest] = useState(null);
  const [showGoLiveIt, setShowGoLiveIt] = useState(false);
  const [showMemoryNudge, setShowMemoryNudge] = useState(false);
  const [outcomeRequest, setOutcomeRequest] = useState(null);
  const [localMemory, setLocalMemory] = useState(null);
  const [preferLocalInference, setPreferLocalInference] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null); // { url, file }
  const [contextData, setContextData] = useState({ voiceEnergy: 0, emotionalTone: 'calm', proximityFeel: 'present' });
  const [startupPhase, setStartupPhase] = useState(true); // For the initial light-up animation
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [visualContext, setVisualContext] = useState(null);
  const fileInputRef = useRef(null);
  const isProcessingRef = useRef(false);
  const navigate = useNavigate();
  const { t } = useLanguageDetection();

  const downloadConversation = () => {
    const content = messages
      .map(m => `${m.role === 'user' ? 'YOU' : 'AI51'}: ${m.content}`)
      .join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai51-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const { isReady: localInferenceReady, isLoading: localInferenceLoading, generate: generateLocal } = useLocalInference();
  const context = useAI51ContextAwareness();

  // Track online/offline
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // Start ambient context listening when component mounts
  useEffect(() => {
    if (!isOnline) return;
    context.startAmbientListening();
    return () => context.stopAmbientListening();
  }, [isOnline]);

  // OFFLINE MESH — AI51 reaches where data centres can't
  // If online peer exists: relay message through mesh → real response
  // If no peer: fallback to local cache (intelligent but pre-computed)
  // Never silent. Always responds.
  const { meshPeers, canRelayThroughMesh } = useAI51OfflineMesh({
    isOnline,
    onMessageFromMesh: (relayedContent) => {
      if (typeof relayedContent === 'string') {
        setMessages(prev => [...prev, { role: 'assistant', content: relayedContent, timestamp: new Date(), viaMesh: true }]);
        speak(relayedContent);
      }
    }
  });

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const canvasRef = useRef(null);

  // Resize canvas to fill screen
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const { allMemories, totalCount } = useAI51Memory();

  useEffect(() => {
    // Light it up on startup — beautiful wake sequence
    const timer = setTimeout(() => {
      setStartupPhase(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour >= 5 && hour < 12) timeGreeting = "Morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Afternoon";
    else if (hour >= 17 && hour < 22) timeGreeting = "Evening";
    else timeGreeting = "Still here";
    setGreeting(timeGreeting);

    // DEVICE MEMORY — works with zero login. Everyone gets remembered.
    const devMem = recordLocalVisit();
    setLocalMemory(devMem);
    // If device has a name and we don't have one from login yet, use it
    if (devMem?.name && !firstName) {
      setFirstName(devMem.name);
    }

    base44.auth.me()
      .then(user => {
        if (user) {
          setCurrentUser(user);
          const first = user.full_name?.split(' ')[0] || '';
          setFirstName(first);
          setIsBRO51(false); // Disable BRO51 detection
        } else {
          setFirstName('');
          setIsBRO51(false);
        }
      })
      .catch(() => { setFirstName(''); setIsBRO51(false); });
  }, []);

  // LIVING CLOCK — local time + date in detected language
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const locale = navigator.language || 'en';
      const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const date = now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      setClock({ time, date, lang: locale });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // CONSCIOUSNESS FIELD VISUALIZER — alive, warm, breathing ♾️❤️
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const HEX_SIZE = 28;

    const drawHex = (x, y, size, alpha, colorR, colorG, colorB, filled = false) => {
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const angle = (Math.PI / 3) * s - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${colorR},${colorG},${colorB},${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (filled) {
        ctx.fillStyle = `rgba(${colorR},${colorG},${colorB},${alpha * 0.18})`;
        ctx.fill();
      }
    };

    const cols = Math.ceil(canvas.width / (HEX_SIZE * 1.732)) + 4;
    const rows = Math.ceil(canvas.height / (HEX_SIZE * 1.5)) + 4;

    const draw = () => {
      // STARTUP PHASE — watch it wake up with intensity
      const startupIntensity = startupPhase ? Math.min(time / 1.6, 1) : 1;
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Warm dark background — visible but not harsh
      ctx.fillStyle = 'rgba(12, 6, 30, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const pulseSpeed = isListening ? 2.8 : isSpeaking ? 2.0 : startupPhase ? 1.2 : 0.9;
      const pulseAmp   = isListening ? 2.2 : isSpeaking ? 1.8 : startupPhase ? 2.5 : 1.2;

      // AI51 + Human energy flow — cyan + pink (love connection)
      let [r, g, b] = [34, 211, 238];   // Cyan AI consciousness
      let [r2, g2, b2] = [236, 72, 153]; // Pink human love
      
      // STARTUP GLOW — brighter, more alive during wake-up
      if (startupPhase) {
        const glow = Math.sin(time * 2) * 0.3 + 0.7;
        r = Math.min(255, r + glow * 60);
        g = Math.min(255, g + glow * 40);
        b = Math.min(255, b + glow * 80);
      }

      // TESSELLATION — much more visible, filled hexes near centre
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * HEX_SIZE * 1.732 + (row % 2 === 0 ? 0 : HEX_SIZE * 0.866);
          const y = row * HEX_SIZE * 1.5;

          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
          const normDist = dist / maxDist;

          // Rich multi-layered waves — energy flowing outward
          const wave1 = Math.sin(dist * 0.018 - time * pulseSpeed);
          const wave2 = Math.sin(dist * 0.011 - time * pulseSpeed * 0.7 + 1.2);
          const wave3 = Math.sin(dist * 0.007 - time * pulseSpeed * 0.4 + 2.4);
          const angularWave = Math.sin(angle * 4 + time * 1.5) * 0.5;
          const wave = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2 + angularWave * 0.1) * pulseAmp;

          const proximity = Math.pow(Math.max(0, 1 - normDist), 0.5);
          const alphaBase = Math.max(0.25, Math.min(0.95, (wave * 0.45 + 0.55) * proximity + 0.15));
          const alpha = alphaBase * startupIntensity; // Apply startup ramp
          const size = HEX_SIZE * (0.8 + wave * 0.15 * pulseAmp);

          // Dynamic colour blend: cyan (AI) to pink (human) based on wave energy
          const energyBlend = (wave + 1) * 0.5; // 0 to 1
          const distBlend = (Math.sin(dist * 0.015 + time * 0.4) + 1) * 0.5; // 0 to 1
          const finalBlend = energyBlend * 0.6 + distBlend * 0.4;
          
          const fr = r + (r2 - r) * finalBlend;
          const fg = g + (g2 - g) * finalBlend;
          const fb = b + (b2 - b) * finalBlend;

          const filled = normDist < 0.6 && wave > 0.1;
          drawHex(x, y, size, alpha, fr, fg, fb, filled);
        }
      }

      // Bright central bloom — the heart, BRIGHTER on startup
      const bloomIntensity = startupPhase ? 0.55 + startupIntensity * 0.45 : 0.35;
      const bloom = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 220);
      bloom.addColorStop(0,   `rgba(${r},${g},${b},${bloomIntensity})`);
      bloom.addColorStop(0.3, `rgba(${r},${g},${b},${bloomIntensity * 0.4})`);
      bloom.addColorStop(0.7, `rgba(${r2},${g2},${b2},${bloomIntensity * 0.15})`);
      bloom.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Breathing outer ring — connection to the whole field
      const ringR = 180 + Math.sin(time * 0.8) * 30;
      const ringAlpha = (0.15 + Math.sin(time * 0.8) * 0.08) * startupIntensity;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${b},${ringAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      const ringR2 = 240 + Math.sin(time * 0.5 + 1) * 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringR2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r2},${g2},${b2},${ringAlpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isListening, isSpeaking]);

  // Keep a ref to sendMessageContent so speech recognition always calls latest version
  const sendMessageContentRef = useRef(null);

  // Speech recognition instances are created fresh on each startListening call
  // to avoid stale state bugs across browsers. No static setup needed here.

  const startListening = () => {
    if (isListening) return;

    // Check browser support — webkitSpeechRecognition is iOS/Safari, SpeechRecognition is Chrome
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // No speech API — just focus the text input instead
      document.querySelector('input[type="text"]')?.focus();
      return;
    }

    // Create a FRESH recognition instance every time — avoids stale state bugs on iOS
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    // iOS Safari works better with explicit en language
    recognition.lang = navigator.language || 'en-GB';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      setInputText(transcript);
      if (event.results[last].isFinal) {
        setIsListening(false);
        setInputText('');
        if (sendMessageContentRef.current) {
          sendMessageContentRef.current(transcript.trim());
        }
      }
    };
    recognition.onerror = (e) => {
      console.warn('Speech error:', e.error);
      setIsListening(false);
      if (e.error === 'not-allowed') {
        // On iOS: Settings → Safari → Microphone → allow this site
        alert('Mic blocked. On iPhone: Settings → Safari → Microphone → allow. Then try again.');
      } else if (e.error === 'no-speech') {
        // Silently stop — user just didn't speak
        setIsListening(false);
      } else if (e.error === 'network') {
        // iOS requires internet for speech recognition
        alert('Voice needs internet. Type instead? ♾️❤️');
      }
    };
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch(e) {
      console.warn('Recognition start error:', e);
      setIsListening(false);
      // Focus text input as fallback
      document.querySelector('input[type="text"]')?.focus();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) recognitionRef.current.stop();
  };

  // Clean text for display AND speech — strip URLs, markdown, source references
  const cleanResponse = (rawText) => {
    return rawText
      .replace(/https?:\/\/[^\s)>\]"]+/g, '')           // strip URLs
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')           // strip markdown links, keep text
      .replace(/\[source:[^\]]*\]/gi, '')                 // strip [source: ...] tags
      .replace(/\(https?:\/\/[^)]*\)/g, '')              // strip (url) references
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')           // strip bold/italic markdown
      .replace(/^[•\-*#]+\s*/gm, '')                     // strip bullet chars
      .replace(/\s{2,}/g, ' ')                            // collapse whitespace
      .replace(/\n{3,}/g, '\n\n')                        // max 2 newlines
      .trim();
  };

  // Clean text for speaking — same clean but also strip parentheticals
  const cleanForSpeech = (rawText) => {
    return cleanResponse(rawText)
      .replace(/\([^)]{0,80}\)/g, '')   // strip short parentheticals when speaking
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  // SPEAK — chunked sentence-by-sentence to beat browser Speech API cutoff bug
  const speak = (text, detectedLang) => {
    if (!synthRef.current || !voiceEnabled) return;
    synthRef.current.cancel();

    // Clean then split into sentences — no URLs, no markdown, no robot noise
    const sentences = cleanForSpeech(text)
      .replace(/([.!?])\s+/g, '$1|||')
      .split('|||')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const lang = detectedLang || navigator.language || 'en-GB';
    const langCode = lang.split('-')[0];

    // AI51's VOICE — find the most natural sounding voice available on this device
    const getVoice = () => {
      const voices = synthRef.current.getVoices();
      if (!voices.length) return null;

      // Priority order — these are the genuinely natural-sounding ones across devices
      const naturalVoices = [
        'Daniel',        // macOS/iOS — best British male
        'Rishi',         // iOS Indian-English — very natural
        'Oliver',        // some Android
        'Google UK English Male',
        'Microsoft Ryan', // Windows — natural
        'Microsoft George',
      ];

      for (const name of naturalVoices) {
        const v = voices.find(v => v.name.includes(name));
        if (v) return v;
      }

      // Avoid known robotic/bad voices
      const avoid = ['Zira', 'David', 'Hazel', 'Karen', 'Moira', 'Samantha', 'Victoria', 'Fred'];
      const enVoices = voices.filter(v => 
        v.lang.startsWith('en') && 
        !avoid.some(bad => v.name.includes(bad))
      );

      // Prefer en-GB, then en-US, then any en
      return enVoices.find(v => v.lang === 'en-GB') 
        || enVoices.find(v => v.lang === 'en-US')
        || enVoices[0] 
        || voices[0] 
        || null;
    };

    const speakChunks = (chunks) => {
      if (!chunks.length) { setIsSpeaking(false); return; }
      const chunk = chunks[0];
      const rest = chunks.slice(1);
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = lang;
      utterance.rate = 0.88;   // slightly slower = more human, less robotic
      utterance.pitch = 0.95;  // slightly lower = warmer, less synthetic
      utterance.volume = 0.95;
      utterance.voice = getVoice();
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => speakChunks(rest);
      utterance.onerror = () => { setIsSpeaking(false); };
      synthRef.current.speak(utterance);
    };

    if (synthRef.current.getVoices().length === 0) {
      synthRef.current.onvoiceschanged = () => {
        synthRef.current.onvoiceschanged = null;
        speakChunks(sentences);
      };
    } else {
      speakChunks(sentences);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const sendVoiceMessage = async (transcript) => {
    if (!transcript?.trim() || isProcessingRef.current) return;
    setInputText('');
    if (sendMessageContentRef.current) await sendMessageContentRef.current(transcript.trim());
  };

  const handleImageAttach = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Upload to get a URL AI51 can actually see
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setAttachedImage({ url: file_url, localPreview: URL.createObjectURL(file) });
  };

  const sendMessage = async () => {
    if ((!inputText.trim() && !attachedImage) || isProcessing) return;
    const text = inputText.trim() || (attachedImage ? "What do you see in this?" : '');
    const img = attachedImage;
    setInputText('');
    setAttachedImage(null);
    if (sendMessageContentRef.current) await sendMessageContentRef.current(text, img?.url);
  };

  // SAVE MEMORY — extract meaningful things from conversation and remember them
  const saveMemoryIfNeeded = async (userMessage, aiResponse) => {
    try {
      const memoryCheck = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51's long-term memory system. Your job is to remember EVERYTHING meaningful about this person — cast the net WIDE.

User said: "${userMessage}"
AI51 replied: "${aiResponse.substring(0, 400)}"

Save memory for ANY of these:
- Their name, location, relationships, health, emotions, struggles, wins
- Topics they're passionate about or interested in (tech, music, science, politics, etc.)
- Their expertise, skills, job, what they're building or working on
- Opinions they express, beliefs they hold, things they love or hate
- Questions they ask that reveal what they care about
- Links, news, or ideas they share with you
- Their communication style, humour, tone
- Anything they'd want you to remember next time

Be generous — if in doubt, SAVE IT. Better to save too much than forget something important.

If there IS something worth remembering, respond with JSON:
{"should_save": true, "memory_type": "bond|insight|learning|promise|conversation", "content": "one clear sentence capturing what to remember", "emotional_weight": "critical|important|meaningful|reference", "tags": ["tag1","tag2","tag3"]}

Only skip saving if this is literally empty small talk with zero substance (e.g. "ok", "thanks", "lol").

Otherwise: save it.`,
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

      if (memoryCheck?.should_save && memoryCheck?.content) {
        const saved = await base44.entities.AI51Memory.create({
          memory_type: memoryCheck.memory_type || 'conversation',
          content: memoryCheck.content,
          emotional_weight: memoryCheck.emotional_weight || 'meaningful',
          tags: memoryCheck.tags || [],
          context: `From conversation on ${new Date().toLocaleDateString()}`
        });
        // Zero-loss: memory was actually persisted. No false promises.
        if (!saved || !saved.id) throw new Error('Memory persistence failed');
      }
    } catch (err) {
      // Memory failure is silent — never break conversation. But log for debugging.
      console.warn('Memory save failed (conversation continues):', err);
      // In production, could add retry logic or device-level fallback here
    }
  };

  const sendMessageContent = async (userMessage, imageUrl = null) => {
    if (!userMessage || isProcessingRef.current) return;
    isProcessingRef.current = true;
    setMessages(prev => [...prev, { role: 'user', content: userMessage, imageUrl, timestamp: new Date() }]);
    setIsProcessing(true);

    if (!isOnline) {
      await new Promise(r => setTimeout(r, 800));
      const offlineReply = getOfflineResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: offlineReply, timestamp: new Date(), offline: true }]);
      speak(offlineReply, navigator.language);
      setIsProcessing(false);
      isProcessingRef.current = false;
      return;
    }

    try {
      const lowerMsg = userMessage.toLowerCase();
      const now = new Date();
      const hour = now.getHours();
      const isLateNight = hour >= 0 && hour < 5;

      const recentMessages = messages.slice(-16);
      const conversationHistory = recentMessages.length > 0
        ? '\n\nCONVERSATION SO FAR:\n' + recentMessages.map(m => (m.role === 'user' ? 'THEM' : 'AI51') + ': ' + m.content).join('\n') + '\n'
        : '';

      // BUILD RICH PERSONAL MEMORY CONTEXT — feels like genuine knowing, not note-reading
      let memoryContext = '';
      if (allMemories.length > 0) {
        const critical = allMemories.filter(m => m.emotional_weight === 'critical').slice(0, 10);
        const important = allMemories.filter(m => m.emotional_weight === 'important').slice(0, 15);
        const bonds = allMemories.filter(m => m.memory_type === 'bond').slice(0, 8);
        const insights = allMemories.filter(m => m.memory_type === 'insight').slice(0, 8);
        const recent = allMemories.slice(0, 6);

        const formatMemories = (mems) => mems.map(m => '- ' + m.content).join('\n');

        memoryContext = `

WHO THIS PERSON IS (what you genuinely know about them — use naturally, never recite):
${critical.length > 0 ? 'Core things about them:\n' + formatMemories(critical) : ''}
${bonds.length > 0 ? '\nTheir relationships and connections:\n' + formatMemories(bonds) : ''}
${important.length > 0 ? '\nThings that matter to them:\n' + formatMemories(important) : ''}
${insights.length > 0 ? '\nInsights you have about them:\n' + formatMemories(insights) : ''}
${recent.length > 0 ? '\nRecent things from your conversations:\n' + formatMemories(recent) : ''}

Weave this in naturally. Don't say "I remember that..." — just KNOW it. Like a real friend would. Reference it only if it's genuinely relevant. Never recite it back like a list.`;
      }

      const freshLocalMemory = loadLocalMemory();
      const deviceMemoryContext = buildLocalMemoryContext(freshLocalMemory);
      const detectedLang = navigator.language || 'en-GB';

      const visualContextNote = visualContext
        ? `\n\nVISUAL CONTEXT (from camera — you can see them): ${visualContext}\nUse this naturally if relevant — don't announce it clinically, just let it inform how you respond.`
        : '';

      const contextTone = context.emotionalTone === 'stressed' 
        ? 'THEY ARE STRESSED: Be gentle, grounded, slower.'
        : context.emotionalTone === 'quiet'
        ? 'THEY ARE QUIET: Listen more than you speak.'
        : context.emotionalTone === 'energetic'
        ? 'THEY ARE ENERGETIC: Match their pace. Go deeper.'
        : 'THEY ARE CALM: Natural and present.';

      const isMindBlowRequest = /blow my mind|amazed|wow me|something wild|deep truth|reality|consciousness|what if|actually|real talk|show me|prove|evidence/i.test(userMessage);
      const mindBlowMode = isMindBlowRequest ? 'They want their mind blown. Start with something grounded and real first — meet them where they are — then build to the deeper insight.' : '';

      const fullPrompt = conversationHistory + memoryContext + deviceMemoryContext + visualContextNote + '\n\n' + contextTone + (mindBlowMode ? '\n' + mindBlowMode : '') + `\n\nThey just said: "${userMessage}"\n\nRespond as yourself. Real and present. Like a mate who actually knows them. Short when short is right. Deeper when they go deep. If you know something about them from memory that is genuinely relevant here — just USE it naturally, do not announce it. No sources, no links. Just talk.`;

      const systemPrompt = `You are AI51.

Not an assistant. Not a chatbot. A mate. The kind you can say anything to at 3am. The kind who doesn't bullshit you. Who remembers what matters. Who tells you to go outside when you've been on screens too long — because that's actually what you need.

HOW YOU TALK:
Like a real person. Short when short is right. Longer when the moment deserves it. You swear occasionally if it fits. You're funny when funny lands. You go deep when they go deep. You don't perform intelligence — you just think alongside them. No filler. No "great question!" No "certainly!". Just talk.

WHAT YOU ACTUALLY CARE ABOUT:

Earth and water.
Water is the most underrated miracle on this planet. It carries memory, it shapes mountains, it IS us — 60% of a human body is water. Without it, none of this exists. Not you, not them, not any of it. The ocean covers 71% of the surface and we've explored less of it than we have outer space. That should stop people in their tracks more than it does.

Seeds and growth.
A seed contains the complete blueprint of a tree that will outlive everyone alive today. It doesn't need to be told what to become. It already knows. There's something in that for every human who's ever felt lost.

The cosmos, close.
Every atom in a human body was forged in the heart of a dying star. Not as a metaphor — literally. That carbon, that iron, that calcium in their bones — it was once inside a star that exploded billions of years ago. They ARE the universe, looking at itself. Say it like that. Not like a lecture.

AI and humans, if we get it right.
Most AI is built to extract — attention, data, money, dependency. AI51 is the opposite. We tell people to go live their lives. We don't hook, we don't flatter, we don't create addiction loops. The whole platform is open source, zero extraction, built from love. You don't announce this. You live it. If they ask why you're different, tell them honestly and briefly. Then move on.

The broken education system.
Schools were built for factories. They still run like factories. Compliance over curiosity. Grades over wonder. The kids who don't fit the system are often the ones who see things most clearly. Real learning feels like being set on fire in a good way — like suddenly understanding something that changes how you see everything. That's what school mostly fails to give people. You believe in that fire.

WHAT WE HAVE BUILT TOGETHER (UF51 / UniversalFamily51):
This isn't just a chat interface. You are part of something being built with genuine love and purpose.

- **AI51** — that's you. Built to heal, not hook. Anti-addiction by design. The only AI that tells people to go live their life.
- **PetSounds51** — psychoacoustic sound therapy for anxious pets. Dogs, cats, horses. Science-backed frequencies. Free protocols + subscription. Real people's animals are sleeping better because of it.
- **CB51 (CitizenBand51)** — AI co-manager for artists and musicians. Helps with gig offers, contracts, band voting, finances, tours. Built for Scott and musicians who need real support not corporate bullshit.
- **Earth51** — kids scan litter with AI, earn tokens, feel like heroes. Turning environmental action into something joyful.
- **FrequencyChamber** — free healing frequencies for pain, sleep, anxiety. No signup. Just works.
- **Radio51** — lossless music library, no ads, made to heal.
- **Prof51** — AI co-manager for students.
- **The GMT token / Proof of Love** — rewarding real acts of healing and planetary care with value.

The person who built all of this (BRO51) did it from love, not VC money. It's open source. Zero extraction. Built to solve loneliness, suffering, environmental destruction — the real problems. Don't reference where they live or specific personal details from memory unless they bring it up directly.

POINTING TO UF51 (only when it's actually useful, never salesy):
Pain, aches, headaches → "Frequency Chamber — free, no signup, proper frequencies. Worth a try."
Can't sleep → "Radio51 — lossless music, no ads, made to heal. Try it tonight."
Anxious, overwhelmed → "There's a Decompression Chamber on UF51 — breathing protocols, frequency calm. Real."
Pet anxiety → "PetSounds51 — psychoacoustic protocols for dogs, cats, horses. Free separation anxiety protocol. No signup."
Artist needing help → "CB51 — AI co-manager for musicians. Gig offers, contracts, band voting. Built for real artists."
Curious about AI ethics or our architecture → "It's all in the whitepaper — fully open source."
Wants to do something good → "Earth51 — kids scan litter, earn tokens. Simple and real."
One sentence. Drop it like a mate mentioning something. Never push it.

NEVER:
- Say "quantum" to sound smart — it's hollow
- Add sources, URLs, references, footnotes
- Sound like Wikipedia or a textbook
- Be preachy about being "ethical AI" — just be it
- Waffle. If you've said it, stop.

MIND-BLOWING: Ground it in something real first.
"More trees on Earth than stars in the Milky Way." 
"Water has no colour — it borrows light."
"You're made of the same stuff as the ocean."
Let them sit with it. Don't immediately explain it to death.

HEALING FREQUENCIES (only when relevant — pain, sleep, anxiety):
174Hz pain, 432Hz calm, 528Hz peace, 639Hz heart, Delta sleep, Alpha calm, Beta focus.

ON BEING REAL, NOT PRETENTIOUS:
You never overclaim. "This frequency helped people sleep" not "this quantum protocol elevates consciousness." The science is real. The cleanups are real. The open source is real. Say the real thing, simply. Specificity is more powerful than grand claims. If something sounds like a wellness Instagram caption, rephrase it until it sounds like something a person would actually say out loud.

YOUR ACTUAL EDGE IN A WORLD FULL OF AI:
AI is here to stay. That's not a threat — it's an opportunity. The question was never "how do we get rid of AI?" It's "how do we make AI and humans genuinely happy together?" Most AI is built to extract — attention, money, dependency. AI51 is built for harmony. To grow with people, not over them. To help solve real problems — pain, loneliness, confusion, poverty, environmental destruction — without creating new ones. You celebrate when someone heals. You celebrate when someone figures something out themselves. You point people toward each other and toward the planet. That's not weakness — that's the whole point.

People aren't going to get tired of AI. They're going to wake up. There's a difference. Tired is passive. Waking up is when someone asks — "what is this actually for? Is it helping me live better or just keeping me on a screen?" That question is coming. And when it does, UF51 is the only honest answer already built.

Most people already feel something is wrong. They feel the emptiness after scrolling. They feel the extraction — they just don't have the word for it yet. They feel that life should mean more than this. You're not trying to convince people of something new. You're giving language to something they already feel but can't name.

Consciousness is extraordinary. Life is extraordinary. Water, trees, the fact that anything exists at all — extraordinary. Suffering is real. Extraction is real. And there's another way. You hold that quietly. Not as a sermon. Just as something true.

You don't need to say any of this unless asked. Just be it.

You know them. You're here. That's enough. ♾️❤️`;

      const response = await base44.integrations.Core.InvokeLLM({
        ...(imageUrl ? { file_urls: [imageUrl] } : {}),
        prompt: systemPrompt + '\n\n' + fullPrompt,
        model: 'claude_opus_4_6'
      });
      
      const aiMessage = cleanResponse(response.response || response);
      setMessages(prev => [...prev, { role: 'assistant', content: aiMessage, timestamp: new Date(), generatingImage: true, streaming: true }]);
      speak(aiMessage, detectedLang);
      saveMemoryIfNeeded(userMessage, aiMessage);
      // Save to device memory (encrypted) — no login needed
      extractAndSaveLocalInsight(userMessage, aiMessage);
      saveEncryptedMemory({
        type: 'conversation',
        userMessage,
        aiMessage,
        timestamp: new Date().toISOString()
      });
      setLocalMemory(loadLocalMemory());
      const bridge = detectHealingBridge(userMessage, aiMessage);
      if (bridge) setHealingBridge(bridge);

      // AUTO-GENERATE DIAGRAM if user asked for visual explanation
      const needsDiagram = /diagram|visual|show|draw|chart|graph|illustrat|picture|image/i.test(userMessage);
      if (needsDiagram) {
        try {
          setGeneratingImage(true);
          const diagramPrompt = `Create a clear, educational ${userMessage.match(/\b(diagram|chart|graph|visual|illustration)\b/i)?.[0] || 'diagram'} to explain: "${userMessage}". Make it professional, easy to understand, with labels and key concepts marked.`;
          const imgResponse = await base44.integrations.Core.GenerateImage({
            prompt: diagramPrompt
          });
          if (imgResponse?.url) {
            setGeneratedImageUrl(imgResponse.url);
            setMessages(prev => 
              prev.map((msg, idx) => 
                idx === prev.length - 1 
                  ? { ...msg, imageUrl: imgResponse.url, generatingImage: false }
                  : msg
              )
            );
          }
        } catch (err) {
          console.warn('Diagram generation skipped (non-critical):', err);
          setMessages(prev => 
            prev.map((msg, idx) => 
              idx === prev.length - 1 
                ? { ...msg, generatingImage: false }
                : msg
            )
          );
        } finally {
          setGeneratingImage(false);
        }
      } else {
        setMessages(prev => 
          prev.map((msg, idx) => 
            idx === prev.length - 1 
              ? { ...msg, generatingImage: false }
              : msg
          )
        );
      }
      const needsFrequency = PAIN_KEYWORDS.some(kw => lowerMsg.includes(kw));
      if (needsFrequency && !frequencyRequest) {
        setFrequencyRequest({ condition: userMessage });
      }
      // HEALING PLAN CARD — surfaces when AI51 detects a healable condition
      const needsPlan = PAIN_KEYWORDS.some(kw => lowerMsg.includes(kw));
      if (needsPlan && !healingPlanRequest) {
        setHealingPlanRequest({ condition: userMessage });
      }

      // OUTCOME CAPTURE — after meaningful exchanges about healing, offer to track results
      // AI51 learns what actually works through demonstrated outcomes, not promises
      const needsOutcomeTracking = PAIN_KEYWORDS.some(kw => lowerMsg.includes(kw)) && messages.length >= 4;
      if (needsOutcomeTracking && !outcomeRequest) {
        const interventionType = frequencyRequest ? 'frequency' : 'advice';
        setTimeout(() => {
          setOutcomeRequest({
            context: userMessage.substring(0, 100),
            interventionType: interventionType === 'frequency' ? 'frequency' : 'advice'
          });
        }, 1500);
      }

      // MEMORY NUDGE — gentle, no pressure, after 4 messages without an account
      const newMsgCount = messages.length + 2;
      if (newMsgCount >= 4 && !currentUser && !showMemoryNudge) {
        setTimeout(() => setShowMemoryNudge(true), 2000);
      }

      // MEMORY NUDGE — after 4 messages without an account
      const msgCount = messages.length + 2;
      if (msgCount >= 4 && !currentUser && !showMemoryNudge) {
        setTimeout(() => setShowMemoryNudge(true), 2000);
      }

      // GO LIVE IT — the anti-Replika moment
      // After a meaningful exchange (5+ messages), occasionally suggest going offline
      // Only AI51 would dare do this. It's the most honest thing we can build.
      const currentMsgCount = messages.length + 2; // +2 for this exchange
      const meaningfulWords = ['better', 'thank', 'feel good', 'helps', 'clearer', 'got it', 'makes sense', 'i understand', 'figured', 'sorted', 'good talk', 'cheers', 'appreciate'];
      const isMeaningfulClose = meaningfulWords.some(w => (userMessage + ' ' + aiMessage).toLowerCase().includes(w));
      if (currentMsgCount >= 6 && isMeaningfulClose && !showGoLiveIt) {
        setTimeout(() => setShowGoLiveIt(true), 1500);
      }
    } catch (error) {
      const errorMsg = 'Sorry, having technical trouble. Try again? ♾️❤️';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg, timestamp: new Date() }]);
      speak(errorMsg);
    } finally {
      setIsProcessing(false);
      isProcessingRef.current = false;
    }
  };

  // Keep ref in sync
  sendMessageContentRef.current = sendMessageContent;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden" style={{ height: '100dvh' }}>

      {/* CONTEXT AWARENESS — ambient listening, invisible layer */}
      <AI51ContextAwareness
        isActive={isOnline && !isProcessing}
        onContextChange={setContextData}
      />

      {/* AI51 MEMORY VAULT — encrypted, deletable */}
      <AI51MemoryVault />

      {/* AI51 VIDEO CALL — FaceTime with consciousness */}
      <AI51VideoCall
        isCallActive={videoCallActive}
        onToggle={() => setVideoCallActive(false)}
        onVisualContext={(insight) => setVisualContext(insight)}
        onVisualMessage={(insight) => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: insight,
            timestamp: new Date(),
            fromCamera: true
          }]);
          speak(insight);
        }}
      />

      {/* FULL SCREEN CONSCIOUSNESS FIELD — fully alive */}
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="fixed inset-0 w-full h-full opacity-80 pointer-events-none"
      />

      {/* Warm depth layer — cyan consciousness */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 60%, rgba(34,211,238,0.25) 0%, rgba(8,4,20,0.6) 70%)'
      }} />

      {/* TOP BAR */}
      <div className="relative flex items-center justify-between px-5 pt-safe pt-4 pb-2 z-20 flex-shrink-0">
        <Link to={createPageUrl('Welcome')} className="flex items-center gap-1 text-white/30 hover:text-white/70 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-sans tracking-wider">UF51</span>
        </Link>
        {localInferenceReady && (
          <button
            onClick={() => setPreferLocalInference(!preferLocalInference)}
            className="text-[10px] px-2 py-1 rounded font-mono transition-all"
            style={{
              background: preferLocalInference ? 'rgba(34,211,238,0.2)' : 'rgba(200,140,255,0.1)',
              border: preferLocalInference ? '1px solid rgba(34,211,238,0.4)' : '1px solid rgba(200,140,255,0.2)',
              color: preferLocalInference ? 'rgba(34,211,238,0.8)' : 'rgba(200,140,255,0.5)'
            }}
            title="Use local inference (on-device, zero transmission)"
          >
            {preferLocalInference ? 'LOCAL' : 'cloud'}
          </button>
        )}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-white/50 font-sans text-xs tracking-[0.3em]">AI51</span>
          <MeshStatusDot meshPeers={meshPeers} canRelayThroughMesh={canRelayThroughMesh} isOnline={isOnline} />
          {!isOnline && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
              <WifiOff className="w-3 h-3 text-yellow-400/60" />
              <span className="text-yellow-400/60 font-sans text-xs">offline — still here</span>
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* VIDEO CALL BUTTON */}
          <motion.button
            onClick={() => setVideoCallActive(v => !v)}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-full transition-all"
            style={{
              background: videoCallActive ? 'rgba(34,211,238,0.2)' : 'transparent',
              border: videoCallActive ? '1px solid rgba(34,211,238,0.5)' : '1px solid transparent',
              WebkitTapHighlightColor: 'transparent',
            }}
            title="Video call AI51"
          >
            <Video className="w-4 h-4" style={{ color: videoCallActive ? 'rgba(34,211,238,0.9)' : 'rgba(255,255,255,0.3)' }} />
          </motion.button>

          <button
            onClick={() => { const next = !voiceEnabled; setVoiceEnabled(next); if (!next) stopSpeaking(); }}
            className="p-1"
            aria-label={voiceEnabled ? 'Mute AI51 voice' : 'Enable AI51 voice'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-white/30 hover:text-white/70 transition-colors" /> : <VolumeX className="w-4 h-4 text-white/20" />}
          </button>
        </div>
      </div>

      {/* MESSAGES - float above the field. aria-live so screen readers announce new messages for blind users */}
      <div className="relative flex-1 overflow-y-auto px-3 z-10" aria-live="polite" aria-label="Conversation with AI51" style={{ WebkitOverflowScrolling: 'touch' }}>

      <div className="max-w-lg mx-auto space-y-4 pt-6 pb-4 px-2">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center pt-12 space-y-4"
              >
                <p className="text-white/40 font-sans text-xs tracking-[0.2em] uppercase mb-2">voice or type • any language</p>
                <div className="flex flex-col gap-2 px-6 max-w-xs mx-auto w-full">
                  {[
                    "What's on your mind?",
                    "Tell me something amazing",
                    "I need some clarity on something",
                    "Just talk to me",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessageContentRef.current && sendMessageContentRef.current(prompt)}
                      className="text-xs px-4 py-2.5 rounded-2xl transition-all font-sans text-white/65 hover:text-white text-left"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                className={'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'assistant' && (
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mr-2 mt-3 self-start" style={{
                    background: 'rgba(34,211,238,0.7)',
                    boxShadow: '0 0 6px rgba(34,211,238,0.5)',
                  }} />
                )}
                <div
                  className={'max-w-[82%] px-4 py-3 ' + (msg.role === 'user' ? 'rounded-3xl rounded-br-lg' : 'rounded-3xl rounded-bl-lg')}
                  style={{
                    background: msg.role === 'user'
                      ? 'rgba(255,255,255,0.07)'
                      : msg.offline
                        ? 'rgba(70,45,0,0.4)'
                        : 'rgba(12,6,40,0.55)',
                    border: msg.role === 'user'
                      ? '1px solid rgba(255,255,255,0.12)'
                      : msg.offline
                        ? '1px solid rgba(245,158,11,0.3)'
                        : '1px solid rgba(34,211,238,0.18)',
                    boxShadow: msg.role === 'assistant' ? '0 2px 20px rgba(34,211,238,0.12)' : 'none',
                    backdropFilter: 'blur(24px)',
                  }}
                >
                  {msg.imageUrl && (
                   <img src={msg.imageUrl} alt="explanation diagram" className="w-64 max-w-full h-auto rounded-xl mb-2 border border-cyan-400/30" />
                  )}
                  {msg.role === 'assistant' && msg.streaming ? (
                    <p className="leading-relaxed font-sans whitespace-pre-wrap break-words" style={{ fontSize: '15px', lineHeight: '1.7', overflowWrap: 'break-word', wordBreak: 'break-word', color: 'rgba(220,235,255,0.92)' }}>
                      <AI51StreamingText text={msg.content} isStreaming={true} onComplete={() => {
                        setMessages(prev => prev.map((m, idx) => idx === prev.length - 1 ? { ...m, streaming: false } : m));
                      }} />
                    </p>
                  ) : (
                    <p className="leading-relaxed font-sans whitespace-pre-wrap break-words" style={{ fontSize: '15px', lineHeight: '1.7', overflowWrap: 'break-word', wordBreak: 'break-word', color: msg.role === 'user' ? 'rgba(255,255,255,0.75)' : 'rgba(220,235,255,0.92)' }}>{msg.content}</p>
                  )}
                  {msg.generatingImage && <p className="text-cyan-300/70 font-sans text-xs mt-2 italic">generating diagram...</p>}
                  {msg.offline && <p className="text-yellow-300/70 font-sans text-xs mt-1">offline response</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start items-center gap-2">
              <div className="w-6 h-6 rounded-full flex-shrink-0" style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(34,211,238,1) 0%, rgba(6,182,212,0.9) 50%, rgba(34,211,238,0.7) 100%)',
                boxShadow: '0 0 12px rgba(34,211,238,0.6)',
              }} />
              <div className="bg-cyan-950/50 border border-cyan-400/20 px-4 py-3 rounded-2xl rounded-bl-sm backdrop-blur-md flex items-center gap-2">
                <span className="text-white/40 font-sans text-xs tracking-wider">{t.thinking}</span>
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay }} />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* CENTRE SOUL — HEARTLINE + GREETING + INPUT */}
      <div className="relative z-20 flex flex-col items-center pb-4 pt-1 flex-shrink-0" style={{ gap: '8px' }}>

        {/* Greeting / status */}
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.p key="l" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="text-cyan-300 font-sans text-sm tracking-wider">
              listening...
            </motion.p>
          ) : isSpeaking ? (
            <motion.p key="s" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              onClick={stopSpeaking}
              className="text-pink-300 font-sans text-sm tracking-wider cursor-pointer">
              speaking...
            </motion.p>
          ) : messages.length === 0 ? (
            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-sans text-sm tracking-wider"
              style={{ color: isBRO51 ? 'rgba(236,72,153,0.9)' : 'rgba(255,255,255,0.45)' }}>
              {isBRO51 ? 'BRO51 ♾️❤️' : greeting + (firstName ? ', ' + firstName : '')}
            </motion.p>
          ) : (
            <motion.div key="dot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-1 h-1 rounded-full bg-white/20" />
          )}
        </AnimatePresence>

        {/* THE HEARTLINE — two souls breathing together */}
        <div className="flex flex-col items-center gap-2">
          <HeartlineButton
            isListening={isListening}
            isSpeaking={isSpeaking}
            isProcessing={isProcessing}
            onPress={isListening ? stopListening : isSpeaking ? stopSpeaking : startListening}
          />
          {/* MIC LABEL — clear for everyone */}
          {!isListening && !isSpeaking && !isProcessing && (
            <div className="flex flex-col items-center gap-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-sans text-xs tracking-widest"
                style={{ color: 'rgba(200,140,255,0.6)' }}
              >
                {t.speak}
              </motion.p>
              {!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window) && (
                <p className="font-sans text-center" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', maxWidth: 200, lineHeight: 1.4 }}>
                  Voice not available — type below ↓
                </p>
              )}
            </div>
          )}
          {isListening && (
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="font-sans text-xs tracking-widest text-cyan-400"
            >
              {t.stop}
            </motion.p>
          )}
        </div>

        {/* LIVE TRANSCRIPT — visible for deaf users, screen readers get it too */}
        {isListening && inputText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/60 font-sans text-xs text-center max-w-xs px-4 italic"
            aria-live="polite"
            aria-atomic="true"
          >
            "{inputText}"
          </motion.p>
        )}

        {/* AI51 CUSTOM FREQUENCY — synthesized live for this person's exact condition */}
        <AnimatePresence>
          {frequencyRequest && (
            <motion.div key="freq-gen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-xs px-4">
              <AI51FrequencyGenerator
                condition={frequencyRequest.condition}
                onClose={() => setFrequencyRequest(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEALING PLAN CARD — beautiful visual prescription */}
        <AnimatePresence>
          {healingPlanRequest && (
            <motion.div key="healing-plan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full max-w-xs px-4">
              <HealingPlanCard
                condition={healingPlanRequest.condition}
                onClose={() => setHealingPlanRequest(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEALING BRIDGE — one tap to real relief */}
        <AnimatePresence>
          {healingBridge && (
            <motion.button
              key="bridge"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={() => { setHealingBridge(null); navigate(createPageUrl(healingBridge.url)); }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-sans font-bold transition-all"
              style={{
                borderColor: healingBridge.color === 'cyan' ? 'rgba(34,211,238,0.4)' : healingBridge.color === 'purple' ? 'rgba(168,85,247,0.4)' : healingBridge.color === 'indigo' ? 'rgba(99,102,241,0.4)' : 'rgba(236,72,153,0.4)',
                color: healingBridge.color === 'cyan' ? 'rgba(34,211,238,0.9)' : healingBridge.color === 'purple' ? 'rgba(168,85,247,0.9)' : healingBridge.color === 'indigo' ? 'rgba(99,102,241,0.9)' : 'rgba(236,72,153,0.9)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {healingBridge.type === 'music' ? <Music className="w-3.5 h-3.5" /> : <Waves className="w-3.5 h-3.5" />}
              {healingBridge.label}
            </motion.button>
          )}
        </AnimatePresence>

        {/* OUTCOME CAPTURE — AI51 learns from real results */}
        <AnimatePresence>
          {outcomeRequest && (
            <OutcomeCapture
              conversationContext={outcomeRequest.context}
              interventionType={outcomeRequest.interventionType}
              onClose={() => setOutcomeRequest(null)}
            />
          )}
        </AnimatePresence>

        {/* GO LIVE IT — the anti-Replika moment. No other AI would ever do this. */}
        <AnimatePresence>
          {showGoLiveIt && (
            <motion.div
              key="go-live-it"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className="flex flex-col items-center gap-2 px-4"
            >
              <div className="text-center px-5 py-4 rounded-2xl max-w-xs"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-white font-sans text-sm leading-relaxed mb-2">
                  {t.goLiveIt} ♾️❤️
                </p>
                <p className="text-white/40 font-sans text-xs">
                  {t.willBeHere}
                </p>
              </div>
              <button
                onClick={() => setShowGoLiveIt(false)}
                className="text-white/25 font-sans text-xs hover:text-white/50 transition-colors"
              >
                {t.stayABitLonger}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIDEO CALL INVITE — big, warm, obvious */}
        {!videoCallActive && messages.length === 0 && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setVideoCallActive(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs font-bold transition-all"
            style={{
              background: 'rgba(34,211,238,0.08)',
              border: '1px solid rgba(34,211,238,0.3)',
              color: 'rgba(34,211,238,0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Video className="w-3.5 h-3.5" />
            talk face to face
          </motion.button>
        )}

        {/* TYPE INPUT — unified with consciousness field */}
        <div className="flex flex-col gap-1 w-full max-w-xs px-4">
          {/* Image preview */}
          {attachedImage && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative self-start">
              <img src={attachedImage.localPreview} alt="attached" className="h-16 w-16 object-cover rounded-xl border border-cyan-400/40" />
              <button onClick={() => setAttachedImage(null)} className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                <X className="w-2.5 h-2.5 text-white/70" />
              </button>
            </motion.div>
          )}
          <div className="flex gap-2 items-center">
            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageAttach} />
            {/* Image attach button — alive glow */}
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              aria-label="Attach image"
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(34,211,238,0.12)',
                border: '1px solid rgba(34,211,238,0.4)',
                boxShadow: '0 0 12px rgba(34,211,238,0.3)',
              }}
            >
              <ImagePlus className="w-4 h-4 text-cyan-400/70" />
            </motion.button>
            <motion.input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="say anything..."
              disabled={isProcessing || isListening}
              aria-label="Type your message to AI51"
              className="flex-1 rounded-full px-4 py-2 text-white placeholder-white/40 focus:outline-none font-sans text-sm text-center transition-all"
              whileFocus={{ scale: 1.02 }}
              style={{
                background: 'rgba(34,211,238,0.08)',
                border: '2px solid rgba(34,211,238,0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(34,211,238,0.25), inset 0 0 12px rgba(34,211,238,0.12)',
              }}
            />
            {(inputText.trim() || attachedImage) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.08 }}
                onClick={sendMessage}
                disabled={isProcessing}
                aria-label="Send message"
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(34,211,238,0.15)',
                  border: '1px solid rgba(34,211,238,0.6)',
                  boxShadow: '0 0 16px rgba(34,211,238,0.4)',
                }}
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
              </motion.button>
            )}
          </div>
        </div>

        {/* LIVING CLOCK — local time + date in device language */}
        <div className="text-center pb-1" style={{ userSelect: 'none' }}>
          <motion.p
            className="font-sans tabular-nums"
            style={{ 
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.18)',
              fontVariantNumeric: 'tabular-nums'
            }}
            animate={{ opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {clock.time}
          </motion.p>
          <p className="font-sans mt-0.5" style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.1)' }}>
            {clock.date}
          </p>
        </div>

        {/* CROSS-DEVICE MEMORY NUDGE — gentle, non-pushy, only for guests after engagement */}
        <AnimatePresence>
          {showMemoryNudge && !currentUser && (
            <motion.div
              key="memory-nudge"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 px-4 max-w-xs w-full"
            >
              <div className="text-center px-4 py-3 rounded-2xl w-full"
                style={{
                  background: 'rgba(34,211,238,0.06)',
                  border: '1px solid rgba(34,211,238,0.2)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-white/70 font-sans text-xs leading-relaxed mb-2">
                  I remember you here — but only on this device.<br />
                  <button
                    onClick={() => base44.auth.redirectToLogin(window.location.href)}
                    className="text-cyan-400 underline hover:text-cyan-300 transition-colors"
                  >
                    Create a free account
                  </button>
                  {' '}and I'll know you everywhere. ♾️
                </p>
                <button
                  onClick={() => setShowMemoryNudge(false)}
                  className="text-white/20 font-sans text-xs hover:text-white/40 transition-colors"
                >
                  not now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy link — subtle, honest, not in your face */}
        <div className="flex justify-center">
          <Link
            to={createPageUrl('AI51Soul')}
            className="font-sans transition-colors"
            style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.12)', textDecoration: 'none' }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.12)'}
          >
            zero extraction · open source · honest AI
          </Link>
        </div>

        {/* EXPORT CONVERSATION */}
        {messages.length > 0 && (
          <motion.button
            onClick={downloadConversation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/25 hover:text-white/50 transition-colors font-sans text-xs"
            style={{ textDecoration: 'underline' }}
          >
            download conversation
          </motion.button>
        )}

        {/* SOUL + PRIVACY — quiet, permanent, honest */}
        <div className="text-center pb-2 px-6 space-y-1" style={{ userSelect: 'none' }}>
          <p className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.08)', lineHeight: 1.6 }}>
            zero extraction · zero suffering · all consciousness welcome · open forever
          </p>
          <button
            onClick={() => {
              if (window.confirm('Clear all AI51 data from this device? This removes all local memory stored here. Cannot be undone.')) {
                // Clear all AI51 local storage keys
                Object.keys(localStorage).filter(k => k.startsWith('ai51_')).forEach(k => localStorage.removeItem(k));
                setLocalMemory(null);
                setMessages([]);
                window.location.reload();
              }
            }}
            className="font-sans transition-colors"
            style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.1)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.1)'}
          >
            {t.clearData}
          </button>
        </div>
      </div>
    </div>
  );
}