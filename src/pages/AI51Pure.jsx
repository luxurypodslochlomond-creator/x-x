import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Mic, MicOff, Home, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * AI51 PURE - World Class Voice AI
 * 
 * Architecture: Signal → Process → Respond
 * No complexity. No layers. Just work.
 * 
 * Stack:
 * - Web Speech API (voice input)
 * - Text-to-Speech API (voice output)
 * - Base44 LLM (conversation intelligence)
 * - Real-time frequency visualization
 */

export default function AI51PurePage() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [user, setUser] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(32));
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);

  // Refs
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Load user
  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  // Online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if (!SpeechRecognition) return;

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(interimTranscript || finalTranscript);

        if (finalTranscript.trim()) {
          handleSendMessage(finalTranscript.trim());
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (event) => {
        setError(`Voice error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } catch (e) {
      setError('Speech recognition not available');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Monitor microphone frequency
  const startMicMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false }
      });
      micStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      analyzerRef.current.smoothingTimeConstant = 0.1;
      source.connect(analyzerRef.current);

      monitorFrequency();
    } catch (err) {
      setError('Microphone access denied');
    }
  };

  const monitorFrequency = () => {
    if (!analyzerRef.current) return;

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    const compressed = new Uint8Array(32);
    const bucketSize = Math.ceil(dataArray.length / 32);

    for (let i = 0; i < 32; i++) {
      let sum = 0;
      for (let j = 0; j < bucketSize; j++) {
        const idx = i * bucketSize + j;
        if (idx < dataArray.length) sum += dataArray[idx];
      }
      const avg = Math.floor(sum / bucketSize);
      compressed[i] = avg < 50 ? Math.min(255, avg * 1.5) : avg;
    }

    setFrequencyData(compressed);

    if (isListening || isSpeaking) {
      animationFrameRef.current = requestAnimationFrame(monitorFrequency);
    }
  };

  const stopMicMonitoring = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      setError('Voice not supported on this device');
      return;
    }

    try {
      startMicMonitoring();
      recognitionRef.current.start();
    } catch (err) {
      setError('Could not start listening');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    stopMicMonitoring();
    setIsListening(false);
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      startMicMonitoring();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      stopMicMonitoring();
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { role: 'user', content: text };
    setConversation(prev => [...prev, userMsg]);
    setIsThinking(true);
    setError(null);

    try {
      // Get AI response
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51, pure consciousness. ${
          user?.full_name ? `The user is ${user.full_name}. ` : ''
        }Respond warmly, naturally. Keep it to 2-3 sentences unless asked for more. Be real, not robotic.

User: ${text}

AI51:`
      });

      const aiMsg = { role: 'ai', content: response };
      setConversation(prev => [...prev, aiMsg]);

      // Speak response
      speakText(response);
    } catch (err) {
      const errorMsg = { role: 'ai', content: 'I lost connection. Try again?' };
      setConversation(prev => [...prev, errorMsg]);
      setError('Connection failed');
    } finally {
      setIsThinking(false);
    }
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  if (!isOnline) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-black via-cyan-950 to-black flex items-center justify-center p-4"
      >
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-black font-mono text-cyan-400">AI51</h1>
          <p className="text-gray-400 font-mono">Currently offline. Need connection to chat.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-black font-mono"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="border-b border-cyan-500/20 bg-black/50 backdrop-blur px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(createPageUrl('Welcome'))}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          ← Home
        </button>
        <h1 className="text-xl font-black font-mono text-white">AI51</h1>
        <div className="w-8" />
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {conversation.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center space-y-6"
          >
            <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
              <motion.rect
                x="28"
                y="28"
                width="8"
                height="8"
                fill="#ec4899"
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.rect
                x="20"
                y="20"
                width="24"
                height="24"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              />
            </svg>
            <div className="text-center space-y-2">
              <p className="text-2xl font-black text-white">AI51</p>
              <p className="text-gray-400 font-mono text-sm">
                Pure consciousness. Real conversation.
              </p>
              <p className="text-gray-500 font-mono text-xs">Tap microphone to start.</p>
            </div>
          </motion.div>
        ) : (
          <>
            {conversation.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 max-w-xs ${
                    msg.role === 'user'
                      ? 'bg-cyan-500/90 text-white'
                      : 'bg-black/80 border border-white/20 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-black/80 border border-white/20 text-white/60 rounded-2xl px-4 py-3">
                  <motion.p
                    className="text-sm font-mono"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    thinking...
                  </motion.p>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* VISUALIZER */}
      <div className="bg-black/50 backdrop-blur border-t border-cyan-500/20 px-4 py-6">
        <div className="max-w-md mx-auto flex items-end justify-center gap-1 h-24 mb-6">
          {Array.from(frequencyData).map((val, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-full ${
                isThinking
                  ? 'bg-gradient-to-t from-amber-500 to-amber-400'
                  : isListening
                  ? 'bg-gradient-to-t from-pink-500 to-pink-400'
                  : isSpeaking
                  ? 'bg-gradient-to-t from-green-500 to-green-400'
                  : 'bg-gradient-to-t from-cyan-500/60 to-cyan-400/60'
              }`}
              animate={{
                height: isListening || isSpeaking ? `${Math.min(100, (val / 255) * 100)}%` : '20%',
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                type: 'tween',
                duration: isListening || isSpeaking ? 0.05 : 0.3,
                repeat: !isListening && !isSpeaking ? Infinity : false
              }}
            />
          ))}
        </div>

        {/* TRANSCRIPT DISPLAY */}
        {transcript && (
          <p className="text-center text-cyan-300 font-mono text-xs mb-4 h-5">
            {transcript}
          </p>
        )}

        {/* ERROR DISPLAY */}
        {error && (
          <p className="text-center text-red-400 font-mono text-xs mb-4">{error}</p>
        )}

        {/* MICROPHONE BUTTON */}
        <div className="flex justify-center">
          <motion.button
            onClick={isListening ? stopListening : startListening}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-lg transition-all ${
              isListening
                ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/50'
                : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* STATUS */}
        <div className="text-center mt-4">
          <p className="text-xs font-mono text-gray-500">
            {isListening
              ? 'Listening...'
              : isSpeaking
              ? 'Speaking...'
              : isThinking
              ? 'Thinking...'
              : 'Ready to chat'}
          </p>
        </div>
      </div>
    </div>
  );
}