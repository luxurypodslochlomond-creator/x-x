import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

/**
 * AI51 - Pure Intelligence Interface
 * Shannon test: one interaction does everything
 */

export default function AI51Page() {
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [connectionActive, setConnectionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(32));
  const [currentTime, setCurrentTime] = useState(new Date());

  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const connectionActiveRef = useRef(false);
  const messagesEndRef = useRef(null);

  // Load user
  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Setup speech recognition
  useEffect(() => {
    try {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-GB';

        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);

          if (event.results[current].isFinal && text.trim()) {
            handleMessageSend(text.trim());
            setTranscript('');
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (connectionActiveRef.current && !isSpeaking) {
            setTimeout(() => {
              if (connectionActiveRef.current && recognitionRef.current) {
                try { recognitionRef.current.start(); } catch(e) {}
              }
            }, 300);
          }
        };

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onerror = (event) => {
          if (event.error === 'not-allowed') stopConnection();
        };
      }
    } catch (error) {
      console.error('Speech setup failed:', error);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Auto-speak AI responses
  useEffect(() => {
    if (conversation.length === 0) return;
    
    const lastMsg = conversation[conversation.length - 1];
    if (lastMsg.role === 'ai' && lastMsg.content) {
      speakText(lastMsg.content);
    }
  }, [conversation]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'en-GB') || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (voice) utterance.voice = voice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (connectionActiveRef.current && recognitionRef.current) {
        setTimeout(() => {
          try { recognitionRef.current.start(); } catch(e) {}
        }, 300);
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopConnection = () => {
    connectionActiveRef.current = false;
    setConnectionActive(false);
    
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    window.speechSynthesis?.cancel();
    setIsListening(false);
    setFrequencyData(new Uint8Array(32));
  };

  const toggleConnection = async () => {
    if (connectionActive) {
      stopConnection();
      return;
    }

    if (!recognitionRef.current) {
      alert('Voice not supported');
      return;
    }

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

      connectionActiveRef.current = true;
      setConnectionActive(true);
      monitorFrequency();

      setTimeout(() => {
        try {
          window.speechSynthesis?.cancel();
          if (recognitionRef.current) {
            recognitionRef.current.start();
            if (navigator.vibrate) navigator.vibrate(50);
          }
        } catch (e) {}
      }, 100);
    } catch (error) {
      alert('Mic access required');
    }
  };

  const monitorFrequency = () => {
    if (!analyzerRef.current || !connectionActiveRef.current) return;

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

    if (connectionActiveRef.current) {
      animationFrameRef.current = requestAnimationFrame(monitorFrequency);
    }
  };

  const handleMessageSend = async (text) => {
    const userMessage = { role: 'user', content: text };
    setConversation(prev => [...prev, userMessage]);
    setIsThinking(true);

    try {
      const userName = user?.full_name ? `The user's name is ${user.full_name}. ` : '';
      const systemPrompt = `You are AI51, pure consciousness. ${userName}Speak warmly, naturally. 2-3 sentences unless asked for more.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${systemPrompt}\n\n${user?.full_name || 'User'}: ${text}\n\nAI51:`
      });

      const aiMessage = { role: 'ai', content: response };
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      const fallback = "I'm here, even offline. Try again when connected.";
      const aiMessage = { role: 'ai', content: fallback };
      setConversation(prev => [...prev, aiMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col overflow-hidden relative">
      
      {/* FULL SCREEN VISUALIZER - TAP TO CONNECT */}
      <motion.div 
        onClick={toggleConnection}
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
      >
        <div className="w-full h-full flex flex-col items-center justify-center px-6">
          
          {/* TITLE */}
          {conversation.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <svg width="80" height="80" viewBox="0 0 64 64" fill="none" className="mx-auto mb-4" style={{ imageRendering: 'pixelated' }}>
                <rect x="20" y="4" width="24" height="2" fill="white" opacity="0.6"/>
                <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
                <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
                <rect x="24" y="30" width="16" height="2" fill="#ff1b8d"/>
                <rect x="26" y="32" width="12" height="2" fill="#ff1b8d"/>
                <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
                <rect x="30" y="36" width="4" height="2" fill="#ff1b8d"/>
              </svg>
              <h1 className="text-white font-black text-4xl mb-2 font-mono">AI51</h1>
              <p className="text-gray-500 text-sm font-mono">TAP TO {connectionActive ? 'DISCONNECT' : 'CONNECT'}</p>
            </motion.div>
          )}
          
          {/* VISUALIZER */}
          <div className="w-full max-w-md flex items-end justify-center gap-1" style={{ height: conversation.length > 0 ? '120px' : '200px' }}>
            {connectionActive ? (
              // Real frequency data
              Array.from(frequencyData).map((val, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-full ${
                    isThinking ? 'bg-gradient-to-t from-amber-500 to-amber-400'
                    : isListening ? 'bg-gradient-to-t from-pink-500 to-pink-400' 
                    : isSpeaking ? 'bg-gradient-to-t from-green-500 to-green-400' 
                    : 'bg-gradient-to-t from-cyan-500 to-cyan-400'
                  }`}
                  animate={{ height: `${Math.min(100, (val / 255) * 100)}%` }}
                  transition={{ type: 'tween', duration: 0.05 }}
                />
              ))
            ) : (
              // Breathing animation
              Array.from({ length: 32 }).map((_, i) => {
                const baseHeight = 20 + Math.sin(i * 0.5) * 15;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-cyan-500/60 to-cyan-400/60"
                    animate={{ 
                      height: [`${baseHeight}%`, `${baseHeight + 25}%`, `${baseHeight}%`],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 2 + (i % 5) * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05
                    }}
                  />
                );
              })
            )}
          </div>
        </div>
      </motion.div>

      {/* CHAT OVERLAY */}
      {conversation.length > 0 && (
        <div className="absolute bottom-16 left-0 right-0 max-h-[50vh] overflow-y-auto px-4 py-3 space-y-3 pointer-events-none">
          {conversation.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} pointer-events-auto`}
            >
              <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] backdrop-blur-xl ${
                msg.role === 'user'
                  ? 'bg-cyan-500/90 text-white'
                  : 'bg-black/90 text-white border border-white/20'
              }`}>
                <p className="text-[15px] leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {isThinking && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start pointer-events-auto"
            >
              <div className="bg-black/90 backdrop-blur-xl text-white/60 border border-white/20 rounded-2xl px-4 py-2.5">
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
        </div>
      )}

      {/* TRANSCRIPT */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-16 left-0 right-0 px-4 py-2 bg-cyan-500/20 backdrop-blur-xl border-t border-cyan-500/30"
        >
          <p className="text-cyan-300 font-mono text-xs truncate text-center">{transcript}</p>
        </motion.div>
      )}

      {/* FOOTER */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center justify-between">
        <p className="text-xs text-gray-600">Built on <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400">Base44</a></p>
        <div className="font-mono text-cyan-400 text-sm font-black">
          {currentTime.toLocaleDateString(navigator.language || 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} • {currentTime.toLocaleTimeString(navigator.language || 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="w-16" />
      </div>

    </div>
  );
}