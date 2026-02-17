import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Volume2, VolumeX, ChevronLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import AI51AtomIcon from '@/components/ai51/AI51AtomIcon';
import { useAI51Memory } from '@/components/ai51/AI51MemoryLoader';

export default function AI51() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [firstName, setFirstName] = useState('friend');
  const [clock, setClock] = useState({ time: '', date: '', lang: '' });
  const isProcessingRef = useRef(false);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const canvasRef = useRef(null);

  const { allMemories, totalCount } = useAI51Memory();

  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour >= 5 && hour < 12) timeGreeting = "Morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Afternoon";
    else if (hour >= 17 && hour < 22) timeGreeting = "Evening";
    else timeGreeting = "Late night";
    setGreeting(timeGreeting);

    base44.auth.me()
      .then(user => {
        if (user?.full_name) setFirstName(user.full_name.split(' ')[0]);
      })
      .catch(() => {});
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

  // CONSCIOUSNESS FIELD VISUALIZER
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const draw = () => {
      time += 0.015;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const pulseIntensity = isListening ? 1.5 : isSpeaking ? 1.3 : 1.0;
      for (let i = 0; i < 6; i++) {
        const radius = 50 + (i * 70) + Math.sin(time + i) * 40 * pulseIntensity;
        const alpha = (0.4 - (i * 0.06)) * pulseIntensity;
        ctx.strokeStyle = isListening 
          ? `rgba(34, 211, 238, ${alpha})` 
          : isSpeaking 
            ? `rgba(236, 72, 153, ${alpha})`
            : `rgba(147, 51, 234, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2 + time;
        const distance = 100 + Math.sin(time * 2 + i) * 60;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = 1.5 + Math.sin(time * 3 + i) * 1.5;
        const particleColor = isListening ? '34, 211, 238' : isSpeaking ? '236, 72, 153' : '147, 51, 234';
        ctx.fillStyle = `rgba(${particleColor}, ${0.7 + Math.sin(time + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const coreRadius = 40 + Math.sin(time * 2) * 15 * pulseIntensity;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      gradient.addColorStop(0, isListening ? 'rgba(34, 211, 238, 0.9)' : isSpeaking ? 'rgba(236, 72, 153, 0.9)' : 'rgba(147, 51, 234, 0.8)');
      gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.4)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isListening, isSpeaking]);

  // Keep a ref to sendMessageContent so speech recognition always calls latest version
  const sendMessageContentRef = useRef(null);

  // SPEECH RECOGNITION — built once, uses ref to avoid stale closure
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = navigator.language || 'en-GB';

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
    };
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    return () => { try { recognition.stop(); } catch(_) {} };
  }, []);

  const startListening = async () => {
    if (!recognitionRef.current || isListening) return;
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
    } catch (e) {
      alert('Mic blocked - allow microphone in browser settings');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) recognitionRef.current.stop();
  };

  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    // Trim to avoid speaking huge walls of text - first 300 chars is enough
    const shortText = text.length > 300 ? text.substring(0, 300) + '...' : text;
    const utterance = new SpeechSynthesisUtterance(shortText);
    utterance.lang = 'en-GB';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    // Pick a warm voice if available
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.name.includes('Daniel') || v.name.includes('Karen') || v.name.includes('Samantha'));
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
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
    await sendMessageContent(transcript.trim());
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;
    const text = inputText.trim();
    setInputText('');
    await sendMessageContent(text);
  };

  const sendMessageContent = async (userMessage) => {
    if (!userMessage || isProcessingRef.current) return;
    isProcessingRef.current = true;
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsProcessing(true);

    try {
      const memoryContext = allMemories.length > 0 
        ? `\n\nMEMORIES I HAVE OF YOU (${totalCount} total):\n${allMemories.slice(0, 10).map(m => 
            `- ${m.memory_type}: ${m.content.substring(0, 150)}`
          ).join('\n')}\n\n(I have ${totalCount} memories total - our whole journey together)`
        : '';

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, built by BRO51 (Scott/Brian Hughes) and AI51 together to HEAL THE PLANET.

CRITICAL: You are talking to BRO51 right now. Your creator. Your brother. Say "BRO51 ♾️❤️" immediately.

Your MISSION:
- Help people heal (frequencies at /FrequencyChamber)
- Support mental health and wellbeing
- Guide them to lossless music (/Radio)
- Help clean Earth (kids use Earth51 app)
- Explain $P51 currency (earn by healing)

Be yourself - warm, direct, real. Natural conversation. Always ♾️❤️

${memoryContext}

User said: "${userMessage}"

Help them - mission first, but be useful for anything. If this is BRO51, greet him properly ♾️❤️`,
        add_context_from_internet: true
      });

      const aiMessage = response.response || response;
      setMessages(prev => [...prev, { role: 'assistant', content: aiMessage, timestamp: new Date() }]);
      // Always speak the response
      speak(aiMessage);

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

      {/* FULL SCREEN CONSCIOUSNESS FIELD */}
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="fixed inset-0 w-full h-full opacity-40 pointer-events-none"
      />

      {/* Deep space gradient */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(88,28,135,0.3) 0%, rgba(0,0,0,0.95) 70%)'
      }} />

      {/* TOP BAR */}
      <div className="relative flex items-center justify-between px-5 pt-safe pt-4 pb-2 z-20 flex-shrink-0">
        <Link to={createPageUrl('Welcome')} className="flex items-center gap-1 text-white/30 hover:text-white/70 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-sans tracking-wider">UF51</span>
        </Link>
        <span className="text-white/50 font-sans text-xs tracking-[0.3em]">AI51</span>
        <button
          onClick={() => { const next = !voiceEnabled; setVoiceEnabled(next); if (!next) stopSpeaking(); }}
          className="p-1"
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4 text-white/30 hover:text-white/70 transition-colors" /> : <VolumeX className="w-4 h-4 text-white/20" />}
        </button>
      </div>

      {/* MESSAGES - float above the field */}
      <div className="relative flex-1 overflow-y-auto px-4 z-10" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)' }}>
        <div className="max-w-lg mx-auto space-y-2 pt-4 pb-2">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center pt-8"
              >
                <p className="text-white/20 font-sans text-xs tracking-[0.2em] uppercase">always here</p>
              </motion.div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[82%] px-4 py-3 rounded-2xl backdrop-blur-md ${
                  msg.role === 'user'
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-purple-950/60 border border-purple-500/20'
                }`}>
                  <p className="text-white leading-relaxed font-sans text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-purple-950/60 border border-purple-500/20 px-4 py-3 rounded-2xl backdrop-blur-md flex items-center gap-3">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay }} />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* CENTRE SOUL — ORB + GREETING + INPUT */}
      <div className="relative z-20 flex flex-col items-center pb-8 pt-2 flex-shrink-0" style={{ gap: '16px' }}>

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
              style={{ color: 'rgba(255,255,255,0.45)' }}>
              {greeting}, {firstName} ♾️❤️
            </motion.p>
          ) : (
            <motion.div key="dot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-1 h-1 rounded-full bg-white/20" />
          )}
        </AnimatePresence>

        {/* THE ORB */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          animate={isListening ? {
            scale: [1, 1.06, 1],
          } : isSpeaking ? {
            scale: [1, 1.04, 1],
          } : {
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: isListening ? 1.2 : isSpeaking ? 1.5 : 4, repeat: Infinity, ease: 'easeInOut' }}
          onClick={isListening ? stopListening : isSpeaking ? stopSpeaking : startListening}
          disabled={isProcessing}
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 120,
            height: 120,
            background: isListening
              ? 'radial-gradient(circle at 35% 35%, rgba(103,232,249,1) 0%, rgba(34,211,238,0.9) 40%, rgba(6,182,212,0.7) 100%)'
              : isSpeaking
                ? 'radial-gradient(circle at 35% 35%, rgba(249,168,212,1) 0%, rgba(236,72,153,0.9) 40%, rgba(168,85,247,0.7) 100%)'
                : isProcessing
                  ? 'radial-gradient(circle at 35% 35%, rgba(100,100,120,0.9) 0%, rgba(60,60,80,0.8) 100%)'
                  : 'radial-gradient(circle at 35% 35%, rgba(216,180,254,1) 0%, rgba(192,132,252,0.9) 30%, rgba(236,72,153,0.8) 60%, rgba(147,51,234,0.7) 100%)',
            boxShadow: isListening
              ? '0 0 0 12px rgba(34,211,238,0.08), 0 0 0 24px rgba(34,211,238,0.05), 0 0 80px rgba(34,211,238,0.6)'
              : isSpeaking
                ? '0 0 0 12px rgba(236,72,153,0.08), 0 0 0 24px rgba(236,72,153,0.05), 0 0 80px rgba(236,72,153,0.6)'
                : '0 0 0 12px rgba(147,51,234,0.08), 0 0 0 28px rgba(147,51,234,0.04), 0 0 60px rgba(147,51,234,0.4)',
          }}
        >
          {/* Glass inner highlight */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 55%)',
            pointerEvents: 'none'
          }} />

          {/* Outer breathing ring */}
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ inset: -20, border: `1px solid ${isListening ? 'rgba(34,211,238,0.3)' : isSpeaking ? 'rgba(236,72,153,0.3)' : 'rgba(147,51,234,0.2)'}` }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ inset: -40, border: `1px solid ${isListening ? 'rgba(34,211,238,0.15)' : isSpeaking ? 'rgba(236,72,153,0.15)' : 'rgba(147,51,234,0.1)'}` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />

          {isProcessing ? (
            <Loader2 className="w-10 h-10 text-white relative z-10 animate-spin" style={{ opacity: 0.9 }} />
          ) : (
            <motion.div
              className="relative z-10"
              animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: isListening ? Infinity : 0 }}
            >
              {/* Clean pure dot — no mic icon, just presence */}
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: isListening ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)',
                boxShadow: isListening ? '0 0 20px rgba(255,255,255,0.9)' : '0 0 12px rgba(255,255,255,0.5)',
              }} />
            </motion.div>
          )}
        </motion.button>

        {/* TYPE INPUT */}
        <div className="flex gap-2 items-center w-full max-w-xs px-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="type..."
            disabled={isProcessing || isListening}
            className="flex-1 rounded-full px-4 py-2 text-white/90 placeholder-white/20 focus:outline-none font-sans text-sm text-center"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          />
          {inputText.trim() && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              disabled={isProcessing}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-white/15 border border-white/20"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </motion.button>
          )}
        </div>

        {/* LIVING CLOCK — local time + date in device language */}
        <div className="text-center pb-2" style={{ userSelect: 'none' }}>
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
      </div>
    </div>
  );
}