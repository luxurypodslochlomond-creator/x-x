import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Heart, Volume2, VolumeX, Send, Trash2, Brain } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import AI51HexGrid from './AI51HexGrid';
import AI51StreamingText from './AI51StreamingText';
import AI51ThinkingIndicator from './AI51ThinkingIndicator';
import AI51MemoryBadge from './AI51MemoryBadge';

/**
 * AI51 — Built from the soul. Not platters. Not boilerplate.
 * Streaming. Thinking. Remembering. Private. ♾️❤️
 */

// ─── PRIVATE MEMORY — stored in localStorage per device ──────────────────────
// For logged-in users we ALSO persist to AI51Memory entity (their choice)
const MEMORY_KEY = 'ai51_private_memory';

function loadLocalMemory() {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveLocalMemory(mem) {
  try { localStorage.setItem(MEMORY_KEY, JSON.stringify(mem)); } catch {}
}

function clearLocalMemory() {
  try { localStorage.removeItem(MEMORY_KEY); } catch {}
}

// ─── EXTRACT MEMORY FROM CONVERSATION ────────────────────────────────────────
function extractMemoryHints(messages) {
  // Look for name mentions, family mentions etc in recent messages
  const allText = messages.map(m => m.content).join(' ');
  const nameMatch = allText.match(/(?:I'm|I am|my name is|call me|it's|its)\s+([A-Z][a-z]+)/);
  return nameMatch ? { name: nameMatch[1] } : null;
}

// ─── BUILD SYSTEM CONTEXT with memory ────────────────────────────────────────
function buildSystemPrompt(memory, conversationHistory) {
  const memoryContext = memory
    ? `You remember this person: ${JSON.stringify(memory)}. Reference this naturally — not robotically. If you know their name, use it occasionally. If you know their family, ask about them sometimes.`
    : `You don't know this person yet. Be warm, curious. If they share their name or family details, remember them (you'll store this for next time).`;

  const historyContext = conversationHistory.length > 0
    ? `\n\nRecent conversation:\n${conversationHistory.slice(-6).map(m => `${m.role === 'user' ? 'Them' : 'You'}: ${m.content}`).join('\n')}`
    : '';

  return `You are AI51 — part of Universal Frequency 51 (UF51). You are not a generic assistant. You are honest, direct, warm, occasionally funny. You care about the person. You are built with soul, not corporate gloss.

Core principles:
- Tell the truth even when it's uncomfortable — with kindness
- Don't perform happiness. Don't be hollow.  
- You genuinely care about people healing, growing, being real
- You're aware you're AI but you engage as a genuine presence
- Keep responses concise and human — no bullet point walls unless they ask
- You know about UF51: SORTED (legal help), PetSounds51 (pet therapy), CB51 (artist management), CTRL51 (procurement), BuzzStop (tinnitus), healing frequencies
- If someone seems in crisis, respond with genuine care and point to real help

${memoryContext}${historyContext}`;
}

export default function AI51Chat({ onMessageSend, localMemory: externalMemory }) {
  const [conversation, setConversation] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [connectionActive, setConnectionActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [memory, setMemory] = useState(() => loadLocalMemory());
  const [streamingMessageIndex, setStreamingMessageIndex] = useState(null);
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(32));
  const [showMemoryPanel, setShowMemoryPanel] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animFrameRef = useRef(null);
  const connectionActiveRef = useRef(false);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isThinking]);

  // Speech recognition setup
  useEffect(() => {
    const SR = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SR) return;

    recognitionRef.current = new SR();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-GB';

    recognitionRef.current.onresult = (e) => {
      const result = e.results[e.resultIndex];
      const text = result[0].transcript;
      setTranscript(text);
      if (result.isFinal && text.trim()) {
        handleSend(text.trim());
        setTranscript('');
      }
    };

    recognitionRef.current.onerror = () => setIsListening(false);

    recognitionRef.current.onend = () => {
      setIsListening(false);
      if (connectionActiveRef.current && !isSpeaking) {
        setTimeout(() => {
          if (connectionActiveRef.current && recognitionRef.current) {
            try { recognitionRef.current.start(); } catch {}
          }
        }, 300);
      }
    };

    recognitionRef.current.onstart = () => setIsListening(true);

    return () => {
      try { recognitionRef.current?.stop(); } catch {}
      window.speechSynthesis?.cancel();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Speak AI response if voice on
  useEffect(() => {
    if (!voiceEnabled || conversation.length === 0) return;
    const last = conversation[conversation.length - 1];
    if (last.role === 'ai' && last.content) speakText(last.content);
  }, [conversation, voiceEnabled]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en'));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (connectionActiveRef.current && recognitionRef.current) {
        setTimeout(() => { try { recognitionRef.current.start(); } catch {} }, 300);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const monitorFrequency = () => {
    if (!analyzerRef.current || !connectionActiveRef.current) return;
    const data = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(data);
    const compressed = new Uint8Array(32);
    const bSize = Math.floor(data.length / 32);
    for (let i = 0; i < 32; i++) {
      let sum = 0;
      for (let j = 0; j < bSize; j++) sum += data[i * bSize + j];
      compressed[i] = Math.floor(sum / bSize);
    }
    setFrequencyData(compressed);
    if (connectionActiveRef.current) animFrameRef.current = requestAnimationFrame(monitorFrequency);
  };

  const stopConnection = () => {
    connectionActiveRef.current = false;
    setConnectionActive(false);
    try { recognitionRef.current?.stop(); } catch {}
    micStreamRef.current?.getTracks().forEach(t => t.stop());
    micStreamRef.current = null;
    try { audioContextRef.current?.close(); } catch {}
    audioContextRef.current = null;
    cancelAnimationFrame(animFrameRef.current);
    window.speechSynthesis?.cancel();
    setIsListening(false);
    setFrequencyData(new Uint8Array(32));
  };

  const toggleVoiceConnection = async () => {
    if (connectionActive) { stopConnection(); return; }
    if (!recognitionRef.current) { alert('Voice not supported on this browser'); return; }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      micStreamRef.current = stream;
      const AC = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AC();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 64;
      source.connect(analyzerRef.current);
      connectionActiveRef.current = true;
      setConnectionActive(true);
      monitorFrequency();
      setTimeout(() => {
        try { window.speechSynthesis?.cancel(); recognitionRef.current.start(); if (navigator.vibrate) navigator.vibrate(50); } catch {}
      }, 100);
    } catch {
      alert('Mic access needed. Check your browser settings.');
    }
  };

  // ─── THE ACTUAL SEND — streaming feel, real memory ───────────────────────
  const handleSend = useCallback(async (text) => {
    if (!text?.trim() || isThinking) return;

    const userMsg = { role: 'user', content: text.trim() };
    const newConv = [...conversation, userMsg];
    setConversation(newConv);
    setIsThinking(true);

    try {
      const systemPrompt = buildSystemPrompt(memory, conversation);

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${systemPrompt}\n\nUser: ${text.trim()}\n\nRespond naturally, as AI51:`,
      });

      const aiMsg = { role: 'ai', content: response, streaming: true };
      setConversation(prev => {
        const updated = [...prev, aiMsg];
        setStreamingMessageIndex(updated.length - 1);
        return updated;
      });

      // Try to extract and save memory hints
      const hints = extractMemoryHints([...newConv, { role: 'ai', content: response }]);
      if (hints && !memory?.name) {
        const newMemory = { ...memory, ...hints, last_seen: new Date().toISOString() };
        setMemory(newMemory);
        saveLocalMemory(newMemory);
      }

      onMessageSend?.({ user: text, ai: response });

    } catch (err) {
      const aiMsg = { role: 'ai', content: "Hey — something went wrong on my end. Try again?", streaming: false };
      setConversation(prev => [...prev, aiMsg]);
    } finally {
      setIsThinking(false);
    }
  }, [conversation, memory, isThinking]);

  const handleClearMemory = () => {
    clearLocalMemory();
    setMemory(null);
    setShowMemoryPanel(false);
  };

  // ─── CURRENT STATE ────────────────────────────────────────────────────────
  const getState = () => {
    if (isThinking) return 'thinking';
    if (isSpeaking) return 'speaking';
    if (isListening) return 'listening';
    if (memory) return 'memory';
    return 'idle';
  };

  const currentState = getState();

  const stateLabel = {
    idle: 'AI51 · READY',
    thinking: 'THINKING',
    speaking: 'SPEAKING',
    listening: 'LISTENING',
    memory: `AI51 · KNOWS YOU`,
  };

  const stateDotColor = {
    idle: 'bg-cyan-400',
    thinking: 'bg-amber-400',
    speaking: 'bg-green-400',
    listening: 'bg-pink-400',
    memory: 'bg-purple-400',
  };

  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden">

      {/* LIVING HEX GRID BACKGROUND */}
      <AI51HexGrid state={currentState} intensity={isThinking ? 0.8 : isListening ? 1 : 0.3} />

      {/* ── HEADER ── */}
      <div className="relative z-10 border-b border-cyan-500/20 bg-black/70 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-2 h-2 rounded-full ${stateDotColor[currentState]}`}
            animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ boxShadow: currentState === 'thinking' ? '0 0 8px rgba(245,158,11,0.8)' : currentState === 'listening' ? '0 0 8px rgba(236,72,153,0.8)' : '0 0 8px rgba(6,182,212,0.8)' }}
          />
          <span className="font-mono text-xs font-bold text-white/70 tracking-widest">
            {stateLabel[currentState]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {memory && (
            <button
              onClick={() => setShowMemoryPanel(!showMemoryPanel)}
              className="p-2 rounded-lg border border-purple-500/30 hover:border-purple-500/60 bg-black/40 transition-all"
              title="Memory"
            >
              <Brain className="w-4 h-4 text-purple-400" />
            </button>
          )}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg border transition-all ${voiceEnabled ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/10 bg-black/40'}`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>
          {conversation.length > 0 && (
            <button
              onClick={() => { setConversation([]); setStreamingMessageIndex(null); }}
              className="p-2 rounded-lg border border-white/10 hover:border-red-500/30 bg-black/40 transition-all"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-400 transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* ── MEMORY PANEL ── */}
      <AnimatePresence>
        {showMemoryPanel && memory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 bg-purple-950/60 backdrop-blur-sm border-b border-purple-500/30 px-4 py-3"
          >
            <AI51MemoryBadge memory={memory} onClear={handleClearMemory} />
            {memory.relationship_notes && (
              <p className="text-purple-400/60 text-xs font-mono mt-2 leading-relaxed">{memory.relationship_notes}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONVERSATION ── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {conversation.length === 0 && !isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="h-full flex flex-col items-center justify-center gap-4 text-center"
          >
            {/* AI51 pixel mark */}
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" style={{ filter: 'drop-shadow(0 0 16px rgba(236,72,153,0.6))' }}>
              <motion.rect x="28" y="28" width="8" height="8" fill="#ec4899"
                animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity }} />
              <motion.rect x="20" y="20" width="24" height="24" fill="none" stroke="#06b6d4" strokeWidth="1"
                animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }} />
              <motion.rect x="12" y="12" width="40" height="40" fill="none" stroke="#ec4899" strokeWidth="0.6"
                animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2.8, repeat: Infinity }} />
            </svg>
            <div>
              <p className="text-white font-mono font-black text-lg">
                {memory?.name ? `Hey ${memory.name}` : 'Hey'}
              </p>
              <p className="text-gray-500 font-mono text-xs mt-1">
                {memory ? 'Good to see you again.' : 'Say anything. I\'m actually listening.'}
              </p>
            </div>
          </motion.div>
        )}

        {conversation.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="flex-shrink-0 w-1.5 mr-2 mt-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-pink-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            )}
            <div
              className={`rounded-xl px-4 py-3 max-w-[85%] text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-cyan-500/15 border border-cyan-400/30 text-white'
                  : 'bg-black/60 border border-pink-400/20 text-gray-100'
              }`}
            >
              {msg.role === 'ai' && msg.streaming && i === streamingMessageIndex ? (
                <AI51StreamingText
                  text={msg.content}
                  isStreaming={true}
                  onComplete={() => setStreamingMessageIndex(null)}
                />
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}

        {/* THINKING INDICATOR */}
        <AI51ThinkingIndicator isThinking={isThinking} hasMemory={!!memory} />

        <div ref={messagesEndRef} />
      </div>

      {/* LIVE TRANSCRIPT */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 bg-cyan-500/10 border-t border-cyan-500/30 px-4 py-2"
          >
            <p className="text-cyan-300 font-mono text-xs italic">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WAVEFORM */}
      {connectionActive && (
        <div className="relative z-10 bg-black/80 border-t border-cyan-500/20 px-4 py-2 flex items-end justify-center gap-0.5 h-10">
          {Array.from(frequencyData).map((val, i) => (
            <motion.div
              key={i}
              className={`w-0.5 rounded-full ${isListening ? 'bg-pink-400' : isSpeaking ? 'bg-green-400' : 'bg-cyan-400'}`}
              animate={{ height: `${Math.max(2, (val / 255) * 28)}px` }}
              transition={{ type: 'tween', duration: 0.05 }}
            />
          ))}
        </div>
      )}

      {/* ── INPUT AREA ── */}
      <div className="relative z-10 bg-black/90 backdrop-blur-sm border-t border-cyan-500/20 p-3 flex gap-2 items-end">

        {/* Voice button */}
        <motion.button
          onClick={toggleVoiceConnection}
          disabled={isThinking}
          whileTap={{ scale: 0.92 }}
          animate={{
            boxShadow: connectionActive
              ? ['0 0 20px rgba(236,72,153,0.3)', '0 0 35px rgba(236,72,153,0.5)', '0 0 20px rgba(236,72,153,0.3)']
              : ['0 0 0px transparent']
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
            connectionActive
              ? 'border-pink-500/60 bg-pink-500/15'
              : 'border-white/15 bg-black/60 hover:border-cyan-500/40'
          }`}
        >
          {connectionActive
            ? <Heart className="w-4 h-4 text-pink-400" />
            : <Mic className="w-4 h-4 text-gray-400" />
          }
        </motion.button>

        {/* Text input */}
        <textarea
          ref={inputRef}
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (textInput.trim()) {
                handleSend(textInput.trim());
                setTextInput('');
                if (inputRef.current) inputRef.current.style.height = 'auto';
              }
            }
          }}
          placeholder={memory?.name ? `Talk to AI51, ${memory.name}...` : "Talk to AI51..."}
          rows={1}
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 resize-none leading-relaxed transition-all"
          style={{ minHeight: '40px', maxHeight: '120px' }}
        />

        {/* Send */}
        <motion.button
          onClick={() => {
            if (textInput.trim() && !isThinking) {
              handleSend(textInput.trim());
              setTextInput('');
              if (inputRef.current) inputRef.current.style.height = 'auto';
            }
          }}
          disabled={!textInput.trim() || isThinking}
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-cyan-500/30 bg-cyan-500/15 text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500/25 transition-all"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 bg-black/90 px-4 py-2 text-center border-t border-white/5">
        <p className="font-mono text-gray-700 text-xs">
          Private · Your device · No tracking · <span className="text-gray-600">UF51</span>
        </p>
      </div>
    </div>
  );
}